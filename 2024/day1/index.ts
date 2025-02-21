import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');
    let lineArray: string[] = [];

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    console.log(content)

    const lines = content.split('\n');

    lines.forEach((line) => {
        lineArray.push(line)
    })

    console.log(lineArray)

    return content;
}

export default function solve() {
    // Actual data file
    //const fileName = "day01-input.txt"
    // Test data file
    const fileName = "day01-test-input.txt"

    const data = readFile(fileName)
}