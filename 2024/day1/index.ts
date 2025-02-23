import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createLogger, LogLevel } from "../utils/logger";

const logger = createLogger(LogLevel.INFO);


function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    // logger.debug("== Content")
    // logger.debug(content)

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
    // logger.debug("numOne:", numOne)
    // logger.debug("numTow:", numTwo)

    let dist: number = 0

    if (numOne > numTwo) {
        dist = numOne - numTwo
    } else if (numTwo > numOne) {
        dist = numTwo - numOne
    } else dist = 0

    return dist;
}

function getNumArrays(fileName: string) {
    let firstArray: string[] = [];
    let secArray: string[] = [];

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


function getNumOfAppearances(totalScore: number, leftListItem: number, rightList: number[]): number {
    let counter: number = 0;
    rightList.forEach((num) => {
        if (num === leftListItem) {
            counter += 1
        }
    })
    totalScore = leftListItem * counter

    return totalScore
}

function solvePartOne(fileName: string) {
    const arrays = getNumArrays(fileName)
    const firstNumArray: number[] = arrays[0]
    const secNumArray: number[] = arrays[1]

    // logger.debug(firstNumArray)
    // logger.debug(secNumArray)

    let distancesArray: number[] = [];

    firstNumArray.forEach(function (num, index) {
        distancesArray.push(calculateDistances(firstNumArray[index], secNumArray[index]));
    })

    //logger.debug(distancesArray)

    let totalDistance: number = 0;

    distancesArray.forEach((num) => {
        totalDistance = totalDistance + num
    })

    logger.info("=======")
    logger.info("Answer to Part 1:")
    logger.info(totalDistance.toString())
    logger.info("=======")
}


function solvePartTwo(fileName: string) {
    // Gather a list of how many times each left
    // list item appears in the right list.
    // Multiply each item by it's appearance count
    // Sum all the results

    const content = readFile(fileName)

    let totalScore: number = 0;

    const arrays = getNumArrays(fileName)
    const leftList: number[] = arrays[0]
    const rightList: number[] = arrays[1]

    leftList.forEach((leftNum) => {
        totalScore = totalScore + getNumOfAppearances(totalScore, leftNum, rightList)
    })


    logger.info("=======")
    logger.info("Answer to Part 2:")
    logger.info(totalScore.toString())
    logger.info("=======")
}

export default function solve(mode?: string) {
    logger.setLevel(LogLevel.INFO);
    
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";

    solvePartOne(fileName)

    solvePartTwo(fileName)

}
