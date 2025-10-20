// import { NextRequest, NextResponse } from 'next/server';
// import * as cheerio from 'cheerio';

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const advocateCode = searchParams.get('advocateCode') || '29694';
//   const page = parseInt(searchParams.get('page') || '1');
//   const city = searchParams.get('city') || 'khi';
//   const caseNum = searchParams.get('caseNum') || '';
//   const caseYear = searchParams.get('caseYear') || '';

//  const params = new URLSearchParams();

//   if (caseNum) params.append('CasesSearch[CASENO]', caseNum);
//   if (caseYear) params.append('CasesSearch[CASEYEAR]', caseYear);
  
//   params.append('CasesSearch[ADVOCATECODE]', advocateCode);
//   params.append('CasesSearch[isPending]', '3');
//   params.append('page', page.toString());

//   // ✅ Construct final URL safely
//   const url = `https://cases.shc.gov.pk/${city}/web/index.php?r=cases%2Fsearch-result&${params.toString()}`;

//   console.log('🔍 Final SHC URL:', url);

  
//   try {
//     const response = await fetch(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
    
//     const html = await response.text();
//     const $ = cheerio.load(html);
    
//     const cases: any[] = [];
    
//     // Parse the table rows
//     $('table tbody tr').each((index, element) => {
//       const row = $(element);
//       const cells = row.find('td');
      
//       if (cells.length > 0) {
//         // Extract the case ID from the View button link
//         const viewLink = cells.last().find('a').attr('href') || '';
//         const idMatch = viewLink.match(/id=(\d+)/);
//         const caseId = idMatch ? idMatch[1] : null;
        
//         cases.push({
//           srNo: cells.eq(0).text().trim(),
//           caseType: cells.eq(1).text().trim(),
//           caseNo: cells.eq(2).text().trim(),
//           caseYear: cells.eq(3).text().trim(),
//           bench: cells.eq(4).text().trim(),
//           circuit: cells.eq(5).text().trim(),
//           parties: cells.eq(6).text().trim(),
//           matter: cells.eq(7).text().trim(),
//           institutionDate: cells.eq(8).text().trim(),
//           lastDate: cells.eq(9).text().trim(),
//           nextDate: cells.eq(10).text().trim(),
//           status: cells.eq(11).text().trim(),
//           caseId: caseId
//         });
//       }
//     });
    
//     // Check for pagination info
//     const paginationText = $('.pagination .active').text().trim();
//     const summaryText = $('.summary').text().trim();
    
//     // Try to extract total count from summary text like "Showing 1-20 of 150 results"
//     let totalCount = 0;
//     const totalMatch = summaryText.match(/of\s+(\d+)/i);
//     if (totalMatch) {
//       totalCount = parseInt(totalMatch[1]);
//     }
    
//     // Check if there's a next page
//     const hasNextPage = $('ul.pagination li.next:not(.disabled)').length > 0;
//     const hasPrevPage = $('ul.pagination li.prev:not(.disabled)').length > 0;
    
//     return NextResponse.json({ 
//       success: true, 
//       data: cases,
//       count: cases.length,
//       currentPage: page,
//       hasNextPage,
//       hasPrevPage,
//       totalCount: totalCount || null
//     });
    
//   } catch (error) {
//     console.error('Error fetching SHC cases:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch cases' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const advocateCode = searchParams.get('advocateCode') || '29694';
  const city = searchParams.get('city') || 'khi';
  const caseNum = searchParams.get('caseNum') || '';
  const caseYear = searchParams.get('caseYear') || '';

  const params = new URLSearchParams();

  if (caseNum) params.append('CasesSearch[CASENO]', caseNum);
  if (caseYear) params.append('CasesSearch[CASEYEAR]', caseYear);
  
  params.append('CasesSearch[ADVOCATECODE]', advocateCode);
  params.append('CasesSearch[isPending]', '3');
  params.append('_togc9414601', 'all'); // This parameter shows all records

  // ✅ Construct final URL safely
  const url = `https://cases.shc.gov.pk/${city}/web/index.php?r=cases%2Fsearch-result&${params.toString()}`;

  console.log('🔍 Final SHC URL:', url);

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
    
    const cases: any[] = [];
    
    // Parse the table rows
    $('table tbody tr').each((index, element) => {
      const row = $(element);
      const cells = row.find('td');
      
      if (cells.length > 0) {
        // Extract the case ID from the View button link
        const viewLink = cells.last().find('a').attr('href') || '';
        const idMatch = viewLink.match(/id=(\d+)/);
        const caseId = idMatch ? idMatch[1] : null;
        
        cases.push({
          srNo: cells.eq(0).text().trim(),
          caseType: cells.eq(1).text().trim(),
          caseNo: cells.eq(2).text().trim(),
          caseYear: cells.eq(3).text().trim(),
          bench: cells.eq(4).text().trim(),
          circuit: cells.eq(5).text().trim(),
          parties: cells.eq(6).text().trim(),
          matter: cells.eq(7).text().trim(),
          institutionDate: cells.eq(8).text().trim(),
          lastDate: cells.eq(9).text().trim(),
          nextDate: cells.eq(10).text().trim(),
          status: cells.eq(11).text().trim(),
          caseId: caseId
        });
      }
    });
    
    // Get total count from summary text
    const summaryText = $('.summary').text().trim();
    let totalCount = 0;
    const totalMatch = summaryText.match(/of\s+(\d+)/i);
    if (totalMatch) {
      totalCount = parseInt(totalMatch[1]);
    }
    
    return NextResponse.json({ 
      success: true, 
      data: cases,
      count: cases.length,
      totalCount: totalCount || cases.length,
      message: `Retrieved all ${cases.length} cases at once`
    });
    
  } catch (error) {
    console.error('Error fetching SHC cases:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}