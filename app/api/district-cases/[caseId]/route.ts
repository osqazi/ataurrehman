import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as puppeteer from 'puppeteer';

interface CaseDetail {
  caseNo: string;
  court: string;
  advocate1: string;
  advocate2: string;
  underSection: string;
  hcCaseNumber: string;
  caseValue: string;
  diaryEntries: Array<{
    serialNo: string;
    diary: string;
    date: string;
  }>;
}

interface ApiResponse {
  success: boolean;
  data?: CaseDetail;
  error?: string;
}

interface RouteParams {
  caseId: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
): Promise<NextResponse<ApiResponse>> {
  let browser: puppeteer.Browser | undefined;
  try {
    const { caseId } = await params;

    console.log('Fetching case details for:', caseId);

    const caseDetail = await fetchCaseDetailsWithBrowser(caseId);

    console.log('Successfully fetched case details');

    return NextResponse.json({
      success: true,
      data: caseDetail
    });

  } catch (error: unknown) {
    console.error('Case Detail API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function fetchCaseDetailsWithBrowser(caseId: string): Promise<CaseDetail> {
  console.log('Launching browser for case details...');
  
  // Detect if we're in a serverless environment
  const isVercel = !!process.env.VERCEL;
  
  let browser;
  
  if (isVercel) {
    // Use chromium for serverless (Vercel)
    const chromium = await import('@sparticuz/chromium');
    browser = await puppeteer.launch({
      args: chromium.default.args,
      defaultViewport: null,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });

    
  } else {
    // Use local Chrome for development
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
  }

  const page = await browser.newPage();
  
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  try {
    console.log('Loading search page to establish session...');
    await page.goto('https://cases.districtcourtssindh.gos.pk/case-search', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    console.log('Making case details request from browser context...');

    // Use page.evaluate to make the AJAX call from within the browser context
    // This way, the browser automatically handles cookies and CSRF tokens
    const caseDetailsHTML = await page.evaluate(async (id) => {
      // Get CSRF token from the page
      const tokenInput = document.querySelector('input[name="_token"]') as HTMLInputElement;
      const token = tokenInput?.value || '';

      if (!token) {
        throw new Error('CSRF token not found');
      }

      // Make the AJAX request just like the website does
      const formData = new URLSearchParams();
      formData.append('_token', token);
      formData.append('casecode', id);

      const response = await fetch('https://cases.districtcourtssindh.gos.pk/case-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return await response.text();
    }, caseId);

    console.log('Parsing case details HTML...');
    
    // Parse the HTML response using page.evaluate
    const caseDetail = await page.evaluate((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const detail: CaseDetail = {
        caseNo: '',
        court: '',
        advocate1: '',
        advocate2: '',
        underSection: '',
        hcCaseNumber: '',
        caseValue: '',
        diaryEntries: []
      };

      // Extract from the first table (case information)
      const mainTable = doc.querySelector('table.table-bordered');
      if (mainTable) {
        const rows = mainTable.querySelectorAll('tbody tr');
        
        if (rows[0]) {
          const cells = rows[0].querySelectorAll('td');
          detail.caseNo = cells[0]?.textContent?.trim() || '';
          detail.court = cells[1]?.textContent?.trim() || '';
        }
        
        if (rows[1]) {
          const cells = rows[1].querySelectorAll('td');
          detail.advocate1 = cells[0]?.textContent?.trim() || '';
          detail.advocate2 = cells[2]?.textContent?.trim() || '';
        }
        
        if (rows[2]) {
          const cells = rows[2].querySelectorAll('td');
          detail.underSection = cells[0]?.textContent?.trim() || '';
        }
        
        // Look for HC case number and case value
        rows.forEach(row => {
          if (row.classList.contains('bg-warning') || row.classList.contains('table-warning')) {
            const cells = row.querySelectorAll('td');
            detail.hcCaseNumber = cells[0]?.textContent?.trim() || '';
            detail.caseValue = cells[1]?.textContent?.trim() || '';
          }
        });
      }

      // Extract diary entries from the second table
      const tables = doc.querySelectorAll('table.table-bordered');
      if (tables.length > 1) {
        const diaryTable = tables[1];
        const diaryRows = diaryTable.querySelectorAll('tbody tr');
        
        diaryRows.forEach(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 3) {
            const entry = {
              serialNo: cells[0]?.textContent?.trim() || '',
              diary: cells[1]?.textContent?.trim() || '',
              date: cells[2]?.textContent?.trim() || ''
            };
            
            if (entry.serialNo || entry.diary || entry.date) {
              detail.diaryEntries.push(entry);
            }
          }
        });
      }

      return detail;
    }, caseDetailsHTML);

    console.log(`Extracted case details with ${caseDetail.diaryEntries.length} diary entries`);
    return caseDetail;

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Browser case details error:', errorMsg);

    throw new Error(`Failed to fetch case details: ${errorMsg}`);
  } finally {
    await page.close();
    await browser.close();
  }
}