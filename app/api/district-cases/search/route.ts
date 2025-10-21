import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import * as puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';

interface SearchRequest {
  caseNo: string;
  caseYear: string;
  district: string;
}

interface DistrictCase {
  id: number;
  caseId: string;
  caseNo: string;
  caseDetail: string;
  courtName: string;
  districtName: string;
  oldCaseNo: string;
  viewLink: string;
  status?: string;
  hearingDate?: string;
}

interface ApiResponse {
  success: boolean;
  data: DistrictCase[];
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  let browser: puppeteer.Browser | undefined;
  try {
    const { caseNo, caseYear, district }: SearchRequest = await request.json();

    if (!caseNo || !caseYear || !district) {
      return NextResponse.json(
        { success: false, data: [], error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    console.log('Performing search for:', { caseNo, caseYear, district });

    const cases = await performSearchWithBrowser({ caseNo, caseYear, district });

    return NextResponse.json({
      success: true,
      data: cases
    });

  } catch (error: unknown) {
    console.error('Search API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      { 
        success: false, 
        data: [],
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

async function performSearchWithBrowser(params: { caseNo: string; caseYear: string; district: string }) {
  const { caseNo, caseYear, district } = params;

  let browser;

  if (process.env.NODE_ENV === 'production') {
    // Production setup (for Vercel, etc.)
    console.log('Launching production browser...');
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: null,
      executablePath: await chromium.executablePath(),
      headless: true, // Set headless mode to true explicitly
    });
  } else {
    // Local development setup
    console.log('Launching local browser...');
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
  }
  

  const page = await browser.newPage();
  
  // Set realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  try {
    console.log('Loading search page...');
    await page.goto('https://cases.districtcourtssindh.gos.pk/case-search', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    console.log('Filling search form...');
    
    // Fill in the form fields
    await page.select('select[name="district"]', district);
    await page.type('input[name="caseno"]', caseNo);
    await page.type('input[name="caseyear"]', caseYear);
    
    // Optional: Select specific status if needed
    await page.click('input[name="status[]"]', { clickCount: 1 });

    console.log('Submitting form...');
    
    // Wait for navigation after form submission
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
      page.click('button[type="submit"]'),
    ]);

    console.log('Waiting for results to load...');
    
    // Wait for table to appear
    await page.waitForSelector('table.table-striped tbody tr', { timeout: 15000 });

    // Extract case data
    const cases = await page.evaluate(() => {
      const caseArray: DistrictCase[] = [];
      let id = 1;

      const rows = document.querySelectorAll('table.table-striped tbody tr');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        
        if (cells.length >= 5) {
          const caseDetail = cells[1]?.textContent?.trim() || '';
          const courtName = cells[2]?.textContent?.trim() || '';
          const status = cells[3]?.textContent?.trim() || '';
          const hearingDate = cells[4]?.textContent?.trim() || '';
          const viewBtn = cells[5]?.querySelector('button.pview');
          const caseId = viewBtn?.id || '';

          if (caseDetail && courtName) {
            const caseNoMatch = caseDetail.match(/(\d+\/\d+)/);
            const extractedCaseNo = caseNoMatch ? caseNoMatch[1] : '';

            caseArray.push({
              id: id++,
              caseId: caseId || `case-${id}`,
              caseNo: extractedCaseNo,
              caseDetail,
              courtName,
              districtName: '', // Will be set after
              oldCaseNo: '',
              viewLink: '',
              status,
              hearingDate,
            });
          }
        }
      });

      return caseArray;
    });

    // Add district name
    const districtName = getDistrictName(district);
    cases.forEach(c => c.districtName = districtName);

    console.log(`Found ${cases.length} cases`);
    return cases;

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Browser search error:', errorMsg);
    
    // Take screenshot for debugging
    try {
      const screenshot = await page.screenshot({ encoding: 'base64' });
      console.log('Screenshot captured for debugging');
    } catch (e) {
      console.log('Could not capture screenshot');
    }

    throw new Error(`Browser search failed: ${errorMsg}`);
  } finally {
    await page.close();
  }
}

function getDistrictName(districtCode: string): string {
  const districts: { [key: string]: string } = {
    '2': 'Karachi (South)',
    '3': 'Karachi (West)',
    '4': 'Karachi (East)',
    '5': 'Karachi (Central)',
    '6': 'Karachi (Malir)',
    '7': 'Hyderabad',
    '8': 'Thatta',
    '9': 'Badin',
    '10': 'Dadu',
    '90': 'Jamshoro @ Kotri',
    '11': 'Tharparkar @ Mithi',
    '12': 'Mirpurkhas',
    '93': 'Umerkot',
    '13': 'Sanghar',
    '14': 'Naushahro Feroze',
    '15': 'Shaheed Benazirabad',
    '16': 'Sukkur',
    '17': 'Khairpur',
    '18': 'Ghotki',
    '19': 'Larkana',
    '92': 'KAMBER-SHAHDADKOT @ KAMBER',
    '20': 'Shikarpur',
    '21': 'Jacobabad',
    '91': 'Kashmore @ Kandhkot',
  };
  
  return districts[districtCode] || 'Unknown District';
}