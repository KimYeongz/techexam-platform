
const fs = require('fs');
const path = require('path');

const slug = 'iot';
const cwd = process.cwd();
console.log('CWD:', cwd);

const summaryPath = path.join(cwd, 'content', 'summaries', `${slug}.json`);
console.log('Path:', summaryPath);

try {
    if (fs.existsSync(summaryPath)) {
        console.log('File exists.');
        const content = fs.readFileSync(summaryPath, 'utf-8');
        console.log('Content length:', content.length);
        const data = JSON.parse(content);
        console.log('Parsed Title:', data.title);
    } else {
        console.error('File NOT found.');

        // List directory
        const dir = path.join(cwd, 'content', 'summaries');
        if (fs.existsSync(dir)) {
            console.log('Files in directory:', fs.readdirSync(dir));
        } else {
            console.log('Directory not found:', dir);
        }
    }
} catch (error) {
    console.error('Error:', error);
}
