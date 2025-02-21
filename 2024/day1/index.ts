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

function calculateDistances(numOne: number, numTwo: number): number {
    // console.log("numOne:", numOne)
    // console.log("numTow:", numTwo)

    let dist: number = 0

    if (numOne > numTwo) {
        dist = numOne - numTwo
    } else if (numTwo > numOne) {
        dist = numTwo - numOne
    } else dist = 0

    return dist;
}

export default function solve() {
    // Actual data file
    const fileName = "day01-input.txt"
    // Test data file
    //const fileName = "day01-test-input.txt"

    let firstArray: string[] = [];
    let secArray: string[] = [];

    const content = readFile(fileName)

    const lines = content.split('\n');

    lines.forEach((line) => {
        let nums: string[] = line.split("   ");
        firstArray.push(nums[0])
        secArray.push(nums[1])
    })

    // console.log(firstArray)
    // console.log(secArray)

    let firstNumArray: number[] = convertToNumber(firstArray).sort();
    let secNumArray: number[] = convertToNumber(secArray).sort();

    // console.log(firstNumArray)
    // console.log(secNumArray)

    let distancesArray: number[] = [];

    firstNumArray.forEach(function (num, index) {
        distancesArray.push(calculateDistances(firstNumArray[index], secNumArray[index]));
    })

    //console.log(distancesArray)

    let totalDistance: number = 0;

    distancesArray.forEach((num) => {
        totalDistance = totalDistance + num
    })

    console.log(totalDistance)

}