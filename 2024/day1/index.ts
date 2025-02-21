import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    console.log(content)

    return content;
}

export default function solve() {
    // Actual data file
    //const fileName = "day01-test-input.txt"
    // Test data file
    const fileName = "day01-test-input.txt"

    const data = readFile(fileName)
}