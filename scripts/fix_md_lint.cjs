const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/kok_knowledge_base.md');

if (!fs.existsSync(targetFile)) {
    console.error(`Target file not found: ${targetFile}`);
    process.exit(1);
}

console.log(`Starting cleanup for: ${targetFile}`);

let content = fs.readFileSync(targetFile, 'utf8');

// 1. Replace hard tabs with 2 spaces (MD010)
content = content.replace(/\t/g, '  ');

// 2. Remove trailing whitespace (MD009)
content = content.split('\n').map(line => line.trimEnd()).join('\n');

// 3. Collapse multiple blank lines (MD012)
// This regex replaces 3 or more newlines with 2 newlines (one blank line)
content = content.replace(/\n{3,}/g, '\n\n');

// 4. Convert duplicate H1 headings to H2 (MD025)
// We keep the first H1 and convert subsequent ones to H2
let h1Count = 0;
content = content.replace(/^#\s+(.+)$/gm, (match, title) => {
    if (title.includes('ΚΩΔΙΚΑΣ ΟΔΙΚΗΣ ΚΥΚΛΟΦΟΡΙΑΣ')) h1Count++;
    if (h1Count > 1) {
        return `## ${title}`;
    }
    return match;
});

// 5. Remove redundant text and headings
// Remove the repeated title and law citation lines, and trim all lines
content = content.split('\n').map(line => line.trim()).filter(line => {
    if (line === 'ΚΩΔΙΚΑΣ ΟΔΙΚΗΣ ΚΥΚΛΟΦΟΡΙΑΣ Οn-line') return false;
    if (line.startsWith('(Νόμος Ν.2696/')) return false;
    if (line === '---') return false;
    return true;
}).join('\n');

// 6. Convert Articles to H2 headings and fix special spaces
// Use a regex that catches various space characters and ensures single space
content = content.replace(/^Άρθρο\s*(?:&nbsp;|\u00a0|\s)*(\d+.+)$/gm, '## Άρθρο $1');

// 7. Collapse multiple blank lines
content = content.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(targetFile, content, 'utf8');

console.log('Cleanup complete.');
