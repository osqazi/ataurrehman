import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    
    const response = await axios.get('https://cases.districtcourtssindh.gos.pk/high-court-cases/list', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const cases = [];

    $('tbody tr').each((index, element) => {
      const $row = $(element);
      
      const caseDetailText = $row.find('td:nth-child(2)').text().trim();
      const caseNoMatch = caseDetailText.match(/Suit \(Received from HC\) (\d+\/\d+)/);
      const caseNo = caseNoMatch ? caseNoMatch[1] : '';
      
      const caseId = $row.find('button.pview').attr('id');
      
      const caseData = {
        id: index + 1,
        caseId: caseId,
        caseNo: caseNo,
        caseDetail: caseDetailText.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'),
        courtName: $row.find('td:nth-child(3)').text().trim(),
        districtName: $row.find('td:nth-child(4)').text().trim(),
        oldCaseNo: $row.find('td:nth-child(5)').text().trim().replace(/View$/, '').trim(),
        viewLink: $row.find('td:nth-child(5) a').attr('href') || ''
      };

      if (caseData.caseId) {
        cases.push(caseData);
      }
    });

    return NextResponse.json({
      success: true,
      data: cases,
      total: cases.length
    });

  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}