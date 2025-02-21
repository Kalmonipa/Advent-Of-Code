import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    // console.log("== Content")
    // console.log(content)

    return content;
}

function convertToNumber(strArray: string[]): number[] {
    let numArray: number[] = [];

    strArray.forEach((str) => {
        numArray.push(Number(str))
    })

    return numArray;
}

function getNumArrays(fileName: string) {


    const content = readFile(fileName)

    const lines = content.split('\n');

    lines.forEach((line) => {
        let nums: string[] = line.split("   ");
        firstArray.push(nums[0])
        secArray.push(nums[1])
    })

    let firstNumArray: number[] = convertToNumber(firstArray).sort();
    let secNumArray: number[] = convertToNumber(secArray).sort();

    return [firstNumArray, secNumArray]
}

function solvePartOne(fileName: string) {
    // Both of the following must be true
    //   - Levels are all increasing or all decreasing
    //   - Any two adjacent levels differ by at least one and 
    //     at most three

    let totalSafeLevels: number = 0;

    const content: string = readFile(fileName);



}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";

    solvePartOne(fileName)

}