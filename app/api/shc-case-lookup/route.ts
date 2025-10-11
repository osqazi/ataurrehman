import { chromium } from "playwright";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const caseNo = searchParams.get("caseNo") || "";
  const caseYear = searchParams.get("caseYear") || "";
  const advocateCode = searchParams.get("advocateCode") || "29694";
  const city = searchParams.get("city") || "khi";

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    let caseId: string | null = null;

    // Intercept network responses
    page.on("response", async (response) => {
      const url = response.url();
      if (url.includes("cases/search-result")) {
        const text = await response.text();
        const match = text.match(/id=(\d+)/);
        if (match) caseId = match[1];
      }
    });

    await page.goto(`https://cases.shc.gov.pk/${city}/web/index.php?r=cases%2Fsearch`, {
      waitUntil: "domcontentloaded",
    });

    if (caseNo) await page.fill('input[name="CasesSearch[CASENO]"]', caseNo);
    if (caseYear) await page.fill('input[name="CasesSearch[CASEYEAR]"]', caseYear);
    if (advocateCode) await page.fill('input[name="CasesSearch[ADVOCATECODE]"]', advocateCode);

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForTimeout(3000), // wait for XHR to complete
    ]);

    await browser.close();

    if (!caseId) {
      return NextResponse.json({ success: false, error: "No matching case found" });
    }

    return NextResponse.json({ success: true, caseId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to fetch caseId" });
  }
}
