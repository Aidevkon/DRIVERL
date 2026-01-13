
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.glavopoulos.com";
const INDEX_URL = "https://www.glavopoulos.com/el/kok-index/";
// Adjust output path relative to scripts folder
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'yme_manuals.html');

async function fetchUrl(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return await response.text();
    } catch (e) {
        console.error(`Error fetching ${url}:`, e);
        return null;
    }
}

async function scrapeKok() {
    console.log(`Fetching index from ${INDEX_URL}...`);
    const indexHtml = await fetchUrl(INDEX_URL);
    if (!indexHtml) return;

    const $ = cheerio.load(indexHtml);
    const articleLinks = new Set();


    // Find links containing 'kok-'
    $('a[href]').each((_, el) => {
        let href = $(el).attr('href');
        if (!href) return;

        // Clean href
        href = href.trim();

        // Pattern for KOK articles: kok-001, kok-002, or relative paths
        if (href.match(/kok-\d+[a-z]?/)) {
            let fullUrl;
            if (href.startsWith('http')) {
                fullUrl = href;
            } else {
                // Handle ../ and simple relative
                // The index is at /el/kok-index/ or /ell/kok-index/
                // Most links in debug were "kok-001" or "../kok-020/"
                // We'll normalize to /ell/kok-XXX/
                const match = href.match(/(kok-\d+[a-z]?)/);
                if (match) {
                    fullUrl = `https://www.glavopoulos.com/ell/${match[1]}/`;
                }
            }

            if (fullUrl) articleLinks.add(fullUrl);
        }
    });

    const sortedLinks = Array.from(articleLinks).sort();
    console.log(`Found ${sortedLinks.length} potential article links.`);

    let fullContent = `
    <!DOCTYPE html>
    <html lang="el">
    <head>
        <meta charset="UTF-8">
        <title>Κώδικας Οδικής Κυκλοφορίας (ΚΟΚ)</title>
        <style>
            body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            h2 { color: #2980b9; margin-top: 30px; }
            p { margin-bottom: 10px; }
            .article-container { margin-bottom: 50px; border-bottom: 1px dashed #ccc; padding-bottom: 20px; }
        </style>
    </head>
    <body>
    <h1>Κώδικας Οδικής Κυκλοφορίας</h1>
    <p>Scraped from Glavopoulos.com</p>
    <hr>
    `;

    let count = 0;
    for (const link of sortedLinks) {
        console.log(`Scraping ${link}...`);
        const html = await fetchUrl(link);
        if (!html) continue;

        const $art = cheerio.load(html);

        // Remove junk
        $art('script, style, nav, footer, header').remove();

        // Heuristic: Find H2 containing "Άρθρο"
        // In the parsed chunk we saw h2 text "Άρθρο 1: Σκοπός"
        // Let's find that element
        let header = null;
        $art('h1, h2, h3').each((_, el) => {
            if ($art(el).text().includes('Άρθρο')) {
                header = $art(el);
                return false; // break
            }
        });

        let articleContent = "";
        if (header) {
            // Add header
            articleContent += $.html(header);

            // Add siblings until we hit something that looks like footer or navigation
            let curr = header.next();
            while (curr.length > 0) {
                // If we hit a div that looks like navigation, stop
                // or if we hit hr
                if (curr.is('hr')) break;
                // Simple check for nav class
                if (curr.attr('class') && curr.attr('class').includes('nav')) break;

                // remove hrefs from links
                curr.find('a').removeAttr('href');

                articleContent += $.html(curr);
                curr = curr.next();
            }
        } else {
            // Fallback: try .entry-content
            const content = $art('.entry-content').html() || $art('article').html();
            if (content) {
                articleContent = content;
            } else {
                console.log(`  - Warning: Could not find content for ${link}`);
            }
        }

        fullContent += `<div class='article-container'>${articleContent}</div>\n`;
        count++;

        // Polite delay
        await new Promise(r => setTimeout(r, 500));
    }

    fullContent += "</body></html>";

    const outDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, fullContent, 'utf-8');
    console.log(`Done. Saved ${count} articles to ${OUTPUT_FILE}`);
}

scrapeKok();
