import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const advocateCode = searchParams.get("advocateCode") || "29694";
  const city = searchParams.get("city") || "khi";
  const caseNum = searchParams.get("caseNum") || "";
  const caseYear = searchParams.get("caseYear") || "";

  try {
    const targetUrl = `https://cases.shc.gov.pk/${city}/web/index.php?r=cases%2Fsearch-result&CasesSearch%5BCASENO%5D=${caseNum}&CasesSearch%5BCASEYEAR%5D=${caseYear}&CasesSearch%5BADVOCATECODE%5D=${advocateCode}&CasesSearch%5BisPending%5D=3&page=1`;

    console.log("🔗 Fetching:", targetUrl);

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: "SHC site not reachable" });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Find case table rows
    const rows = $("table.table tbody tr");
    if (rows.length === 0) {
      return NextResponse.json({ success: true, data: [], count: 0, message: "No record found" });
    }

    // Extract first matched case
    const firstRow = rows.first();
    const caseLink = firstRow.find("a").attr("href") || "";
    const caseIdMatch = caseLink.match(/id=(\d+)/);
    const caseId = caseIdMatch ? caseIdMatch[1] : null;

    if (!caseId) {
      return NextResponse.json({ success: false, error: "Case ID not found" });
    }

    return NextResponse.json({ success: true, data: { caseId }, message: "Case found" });

  } catch (err) {
    console.error("❌ Error fetching SHC data:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch SHC data" });
  }
}
