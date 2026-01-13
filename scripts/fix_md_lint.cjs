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
    h1Count++;
    if (h1Count > 1) {
        return `## ${title}`;
    }
    return match;
});

fs.writeFileSync(targetFile, content, 'utf8');

console.log('Cleanup complete.');
console.log(`Total H1 headings found: ${h1Count}`);
if (h1Count > 1) {
    console.log(`Converted ${h1Count - 1} duplicate H1 headings to H2.`);
}
