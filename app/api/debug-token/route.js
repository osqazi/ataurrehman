import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const mainResponse = await fetch('https://cases.districtcourtssindh.gos.pk/high-court-cases/list', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
    });

    if (!mainResponse.ok) {
      throw new Error(`Failed to fetch main page: ${mainResponse.status}`);
    }

    const mainHtml = await mainResponse.text();
    const $ = cheerio.load(mainHtml);

    // Look for all possible token locations
    const tokenLocations = {
      'input[name="_token"]': $('input[name="_token"]').val(),
      'meta[name="csrf-token"]': $('meta[name="csrf-token"]').attr('content'),
      'input[name="csrf-token"]': $('input[name="csrf-token"]').val(),
      'input[name*="token"]': $('input[name*="token"]').val(),
    };

    // Look for any form that might contain token
    const forms = [];
    $('form').each((i, form) => {
      const formHtml = $(form).html();
      if (formHtml && formHtml.includes('token')) {
        forms.push({
          action: $(form).attr('action'),
          method: $(form).attr('method'),
          html: formHtml.substring(0, 500) // First 500 chars
        });
      }
    });

    // Look for script tags with token
    const scriptsWithToken = [];
    $('script').each((i, script) => {
      const scriptContent = $(script).html();
      if (scriptContent && scriptContent.includes('token')) {
        scriptsWithToken.push(scriptContent.substring(0, 300)); // First 300 chars
      }
    });

    return NextResponse.json({
      success: true,
      tokenLocations,
      formsFound: forms.length,
      forms: forms,
      scriptsWithToken: scriptsWithToken.length,
      scriptSamples: scriptsWithToken,
      htmlSample: mainHtml.substring(0, 2000) // First 2000 chars of HTML
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}