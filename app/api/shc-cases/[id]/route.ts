import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(
  request: NextRequest,
  context: { params: { id: number } }
) {
  const { id } = await context.params;

  const caseId = id;

  const url = `https://cases.shc.gov.pk/khi/web/index.php?r=cases%2Fview&id=${caseId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract case profile information
    const caseTitle = $('.panel-title').text().trim();
    const statusLabel = $('.label.label-success').text().trim() || $('.label.label-danger').text().trim();
    
    // Parse the detail table
    const caseInfo: any = {
      caseId,
      title: caseTitle,
      status: statusLabel
    };
    
    // Helper function to clean and format text
    const cleanText = (html: string | null | undefined) => {
      if (!html) return '';
      const $ = cheerio.load(html);
      return $.root().text().replace(/\s+/g, ' ').trim();
    };
    
    // Helper function to format hearing details
    const formatHearingDetail = (html: string | null | undefined) => {
      if (!html) return 'N/A';
      const $ = cheerio.load(html);
      const text = $('*').html() || '';
      
      // Parse individual fields
      const dateMatch = text.match(/<b>Date:\s*<\/b>([^<]*)/);
      const listMatch = text.match(/<b>List:\s*<\/b>([^<]*)/);
      const srMatch = text.match(/<b>@\s*Sr\s*#\s*<\/b>([^<]*)/);
      const stageMatch = text.match(/<b>Stage:\s*<\/b>([^<]*)/);
      const benchMatch = text.match(/<b>Bench:\s*<\/b>([^<]*)/);
      const infoMatch = text.match(/<b>Other Info:\s*<\/b>([^<]*)/);
      const statusMatch = text.match(/<b>(Adjourned|Disposed|Pending)<\/b>/);
      
      let result = '';
      if (dateMatch) result += `Date: ${dateMatch[1].trim()}\n`;
      if (listMatch) result += `List: ${listMatch[1].trim()}`;
      if (srMatch) result += ` @ Sr # ${srMatch[1].trim()}\n`;
      if (stageMatch) result += `Stage: ${stageMatch[1].trim()}\n`;
      if (benchMatch) result += `Bench: ${benchMatch[1].trim()}\n`;
      if (infoMatch) result += `Other Info: ${infoMatch[1].trim()}\n`;
      if (statusMatch) result += `Status: ${statusMatch[1].trim()}`;
      
      return result.trim() || cleanText(html);
    };
    
    // Extract case number and type
    $('table.detail-view tbody tr').each((i, row) => {
      const $row = $(row);
      const th = $row.find('th').text().trim();
      const td = $row.find('td');
      
      if (th.includes('Case No.')) {
        caseInfo.caseNumber = cleanText(td.eq(0).html());
      }
      if (th.includes('Institution')) {
        const datesHtml = td.eq(0).html() || '';
        caseInfo.dates = datesHtml
          .replace(/<br\s*\/?>/g, '\n')
          .replace(/<span[^>]*>/g, '')
          .replace(/<\/span>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/<[^>]*>/g, '')
          .trim();
      }
      if (th.includes('Case Title')) {
        caseInfo.caseTitle = cleanText(td.eq(0).html());
      }
      if (th.includes('Stay Grant')) {
        caseInfo.stayDate = cleanText(td.eq(0).html()) || 'N/A';
      }
      if (th.includes('Last Hearing')) {
        caseInfo.lastHearing = formatHearingDetail(td.eq(0).html());
      }
      if (th.includes('Next Hearing')) {
        caseInfo.nextHearing = formatHearingDetail(td.eq(0).html());
      }
      if (th.includes('Last Roster')) {
        const html = td.eq(0).html() || '';
        const dateMatch = html.match(/<b>Date:\s*<\/b>([^<]*)/);
        const reasonMatch = html.match(/<b>Reason:\s*<\/b>([^<]*)/);
        
        let result = '';
        if (dateMatch) result += `Date: ${cleanText(dateMatch[1])}\n`;
        if (reasonMatch) result += `Reason: ${cleanText(reasonMatch[1])}`;
        
        caseInfo.lastRoster = result.trim() || cleanText(html) || 'N/A';
      }
      if (th.includes('Future Fixation')) {
        caseInfo.futureFixation = cleanText(td.eq(0).html()) || 'N/A';
      }
      if (th.includes('FIR No')) {
        caseInfo.firNo = cleanText(td.eq(0).html());
        caseInfo.underSections = cleanText(td.eq(1).html());
      }
      if (th.includes('Disposal Date')) {
        caseInfo.disposalDate = cleanText(td.eq(0).html());
        caseInfo.disposingBench = cleanText(td.eq(1).html());
        caseInfo.natureOfDisposal = cleanText(td.eq(2).html());
      }
    });
    
    // Extract first note/remark
    const firstNote = $('td[style*="font-weight:bold"] .kv-attribute').first().text().trim();
    if (firstNote) {
      caseInfo.remarks = firstNote;
    }
    
    return NextResponse.json({ 
      success: true, 
      data: caseInfo
    });
    
  } catch (error) {
    console.error('Error fetching case details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch case details' },
      { status: 500 }
    );
  }
}
