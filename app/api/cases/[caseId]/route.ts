
// import { NextResponse } from 'next/server';
// import * as cheerio from 'cheerio';

// export async function GET(request, { params }) {
//   try {
//     // AWAIT the params in Next.js 15
//     const { caseId } = await params;

//     console.log('API - Fetching with session management for case:', caseId);

//     // Create a custom fetch function that maintains cookies
//     let cookies = [];

//     // Step 1: Get the main page and extract CSRF token WITH cookies
//     const mainResponse = await fetch('https://cases.districtcourtssindh.gos.pk/high-court-cases/list', {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
//       },
//     });

//     if (!mainResponse.ok) {
//       throw new Error(`Failed to fetch main page: ${mainResponse.status}`);
//     }

//     // Store cookies from the main page response
//     if (mainResponse.headers.get('set-cookie')) {
//       const setCookieHeader = mainResponse.headers.get('set-cookie');
//       if (setCookieHeader) {
//         cookies = setCookieHeader.split(',').map(cookie => cookie.split(';')[0].trim());
//       }
//     }

//     const mainHtml = await mainResponse.text();
//     const $ = cheerio.load(mainHtml);

//     // Extract CSRF token from JavaScript
//     let csrfToken = null;
//     $('script').each((i, script) => {
//       const scriptContent = $(script).html();
//       if (scriptContent && scriptContent.includes('_token')) {
//         const tokenMatch = scriptContent.match(/"_token"\s*:\s*"([^"]+)"/);
//         if (tokenMatch && tokenMatch[1]) {
//           csrfToken = tokenMatch[1];
//           console.log('CSRF token found:', csrfToken.substring(0, 10) + '...');
//           return false;
//         }
//       }
//     });

//     if (!csrfToken) {
//       throw new Error('CSRF token not found');
//     }

//     // Step 2: Make the case profile request WITH the same cookies
//     const formData = new URLSearchParams();
//     formData.append('_token', csrfToken);
//     formData.append('casecode', caseId);

//     // Build cookie header for the second request
//     const cookieHeader = cookies.join('; ');

//     const response = await fetch('https://cases.districtcourtssindh.gos.pk/case-profile', {
//       method: 'POST',
//       headers: {
//         'accept': '*/*',
//         'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
//         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//         'priority': 'u=1, i',
//         'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"Windows"',
//         'sec-fetch-dest': 'empty',
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'same-origin',
//         'x-requested-with': 'XMLHttpRequest',
//         'referer': 'https://cases.districtcourtssindh.gos.pk/high-court-cases/list',
//         'cookie': cookieHeader, // Include cookies from first request
//       },
//       body: formData.toString(),
//     });

//     console.log('Case profile response status:', response.status);

//     if (response.status === 200) {
//       const html = await response.text();
//       const $detail = cheerio.load(html);

//       // Extract case details
//       const caseDetail = {
//         caseNo: $detail('table.table-bordered tbody tr:first-child td:first-child').text().trim() || 'Not available',
//         court: $detail('table.table-bordered tbody tr:first-child td:last-child').text().trim() || 'Not available',
//         advocate1: $detail('table.table-bordered tbody tr:nth-child(2) td:first-child').text().trim() || 'Not available',
//         advocate2: $detail('table.table-bordered tbody tr:nth-child(2) td:nth-child(3)').text().trim() || 'Not available',
//         underSection: $detail('table.table-bordered tbody tr:nth-child(3) td').text().trim() || 'Not available',
//         hcCaseNumber: $detail('table.table-bordered tbody tr.bg-warning td:first-child').text().trim() || 'Not available',
//         caseValue: $detail('table.table-bordered tbody tr.bg-warning td:last-child').text().trim() || 'Not available',
//         diaryEntries: []
//       };

//       // Extract diary entries
//       $detail('.table-bordered:last tbody tr').each((index, element) => {
//         const $row = $detail(element);
//         const entry = {
//           serialNo: $row.find('td:first-child').text().trim(),
//           diary: $row.find('td:nth-child(2)').text().trim(),
//           date: $row.find('td:last-child').text().trim().replace(/<kbd>/g, '').replace(/<\/kbd>/g, '')
//         };
        
//         if (entry.serialNo && entry.diary && entry.date) {
//           caseDetail.diaryEntries.push(entry);
//         }
//       });

//       console.log('Success! Found', caseDetail.diaryEntries.length, 'diary entries');

//       return NextResponse.json({
//         success: true,
//         data: caseDetail,
//         source: 'live-api',
//         message: 'Real case data fetched successfully'
//       });

//     } else {
//       console.log('Request failed with status:', response.status);
//       return NextResponse.json({
//         success: false,
//         error: `Request failed with status ${response.status}`,
//         message: 'Unable to fetch case details from the website'
//       }, { status: response.status });
//     }

//   } catch (error) {
//     console.error('API error:', error.message);
    
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch case details',
//       message: error.message
//     }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import * as cheerio from 'cheerio';

// export async function GET(request, { params }) {
//   try {
//     const { caseId } = await params;

//     console.log('Session API - Fetching for case:', caseId);

//     // Use a single session with credentials
//     const fetchOptions = {
//       credentials: 'include' as RequestCredentials,
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//       }
//     };

//     // Step 1: Get main page with credentials
//     const mainResponse = await fetch('https://cases.districtcourtssindh.gos.pk/high-court-cases/list', fetchOptions);
    
//     if (!mainResponse.ok) {
//       throw new Error(`Failed to fetch main page: ${mainResponse.status}`);
//     }

//     const mainHtml = await mainResponse.text();
//     const $ = cheerio.load(mainHtml);

//     // Extract CSRF token
//     let csrfToken = null;
//     $('script').each((i, script) => {
//       const scriptContent = $(script).html();
//       if (scriptContent && scriptContent.includes('_token')) {
//         const tokenMatch = scriptContent.match(/"_token"\s*:\s*"([^"]+)"/);
//         if (tokenMatch && tokenMatch[1]) {
//           csrfToken = tokenMatch[1];
//           console.log('CSRF token found');
//           return false;
//         }
//       }
//     });

//     if (!csrfToken) {
//       throw new Error('CSRF token not found');
//     }

//     // Step 2: Make case profile request with same credentials
//     const formData = new URLSearchParams();
//     formData.append('_token', csrfToken);
//     formData.append('casecode', caseId);

//     const profileResponse = await fetch('https://cases.districtcourtssindh.gos.pk/case-profile', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//         'x-requested-with': 'XMLHttpRequest',
//         'referer': 'https://cases.districtcourtssindh.gos.pk/high-court-cases/list',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//       },
//       body: formData.toString(),
//     });

//     console.log('Profile response status:', profileResponse.status);

//     if (profileResponse.status === 200) {
//       const html = await profileResponse.text();
//       const $detail = cheerio.load(html);

//       const caseDetail = {
//         caseNo: $detail('table.table-bordered tbody tr:first-child td:first-child').text().trim(),
//         court: $detail('table.table-bordered tbody tr:first-child td:last-child').text().trim(),
//         advocate1: $detail('table.table-bordered tbody tr:nth-child(2) td:first-child').text().trim(),
//         advocate2: $detail('table.table-bordered tbody tr:nth-child(2) td:nth-child(3)').text().trim(),
//         underSection: $detail('table.table-bordered tbody tr:nth-child(3) td').text().trim(),
//         hcCaseNumber: $detail('table.table-bordered tbody tr.bg-warning td:first-child').text().trim(),
//         caseValue: $detail('table.table-bordered tbody tr.bg-warning td:last-child').text().trim(),
//         diaryEntries: []
//       };

//       $detail('.table-bordered:last tbody tr').each((index, element) => {
//         const $row = $detail(element);
//         const entry = {
//           serialNo: $row.find('td:first-child').text().trim(),
//           diary: $row.find('td:nth-child(2)').text().trim(),
//           date: $row.find('td:last-child').text().trim().replace(/<kbd>/g, '').replace(/<\/kbd>/g, '')
//         };
        
//         if (entry.serialNo && entry.diary && entry.date) {
//           caseDetail.diaryEntries.push(entry);
//         }
//       });

//       return NextResponse.json({
//         success: true,
//         data: caseDetail
//       });

//     } else {
//       throw new Error(`HTTP ${profileResponse.status}`);
//     }

//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: error.message
//     }, { status: 500 });
//   }
// }

export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { NextRequest } from 'next/server';

interface DiaryEntry {
  serialNo: string;
  diary: string;
  date: string;
}

interface CaseDetail {
  caseNo: string;
  court: string;
  advocate1: string;
  advocate2: string;
  underSection: string;
  hcCaseNumber: string;
  caseValue: string;
  diaryEntries: DiaryEntry[];
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
  try {
    const { caseId } = await params;

    console.log('Session API - Fetching for case:', caseId);

    // Use a single session with credentials
    const fetchOptions: RequestInit = {
      credentials: 'include' as RequestCredentials,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      }
    };

    // Step 1: Get main page with credentials
    const mainResponse = await fetch('https://cases.districtcourtssindh.gos.pk/high-court-cases/list', fetchOptions);
    
    if (!mainResponse.ok) {
      throw new Error(`Failed to fetch main page: ${mainResponse.status}`);
    }

    const mainHtml = await mainResponse.text();
    const $ = cheerio.load(mainHtml);

    // Extract CSRF token
    let csrfToken: string | null = null;
    $('script').each((i, script) => {
      const scriptContent = $(script).html();
      if (scriptContent && scriptContent.includes('_token')) {
        const tokenMatch = scriptContent.match(/"_token"\s*:\s*"([^"]+)"/);
        if (tokenMatch && tokenMatch[1]) {
          csrfToken = tokenMatch[1];
          console.log('CSRF token found');
          return false;
        }
      }
    });

    if (!csrfToken) {
      throw new Error('CSRF token not found');
    }

    // Step 2: Make case profile request with same credentials
    const formData = new URLSearchParams();
    formData.append('_token', csrfToken);
    formData.append('casecode', caseId);

    const profileResponse = await fetch('https://cases.districtcourtssindh.gos.pk/case-profile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'referer': 'https://cases.districtcourtssindh.gos.pk/high-court-cases/list',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
      body: formData.toString(),
    });

    console.log('Profile response status:', profileResponse.status);

    if (profileResponse.status === 200) {
      const html = await profileResponse.text();
      const $detail = cheerio.load(html);

      const caseDetail: CaseDetail = {
        caseNo: $detail('table.table-bordered tbody tr:first-child td:first-child').text().trim(),
        court: $detail('table.table-bordered tbody tr:first-child td:last-child').text().trim(),
        advocate1: $detail('table.table-bordered tbody tr:nth-child(2) td:first-child').text().trim(),
        advocate2: $detail('table.table-bordered tbody tr:nth-child(2) td:nth-child(3)').text().trim(),
        underSection: $detail('table.table-bordered tbody tr:nth-child(3) td').text().trim(),
        hcCaseNumber: $detail('table.table-bordered tbody tr.bg-warning td:first-child').text().trim(),
        caseValue: $detail('table.table-bordered tbody tr.bg-warning td:last-child').text().trim(),
        diaryEntries: []
      };

      $detail('.table-bordered:last tbody tr').each((index: number, element: cheerio.Element) => {
        const $row = $detail(element);
        const entry: DiaryEntry = {
          serialNo: $row.find('td:first-child').text().trim(),
          diary: $row.find('td:nth-child(2)').text().trim(),
          date: $row.find('td:last-child').text().trim().replace(/<kbd>/g, '').replace(/<\/kbd>/g, '')
        };
        
        if (entry.serialNo && entry.diary && entry.date) {
          caseDetail.diaryEntries.push(entry);
        }
      });

      return NextResponse.json({
        success: true,
        data: caseDetail
      });

    } else {
      throw new Error(`HTTP ${profileResponse.status}`);
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
