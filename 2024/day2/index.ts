import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createLogger, LogLevel } from "../utils/logger";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let partIdentifier: number = 0;

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

function getNumArray(fileName: string): number[][] {
    let numArray: number[][] = [];
    const content = readFile(fileName)

    const lines = content.split('\n');

    logger.debug(lines)

    lines.forEach((line) => {
        let reports: string[] = line.split(" ");

        numArray.push(convertToNumber(reports));
    })

    logger.debug(numArray)

    return numArray
}

function dampenReport(report: number[], indexToRemove: number): number[] {
    const newNumbers = report.filter((_, index) => index !== indexToRemove);
    return newNumbers;
}

function checkConditions(report: number[]): boolean {
    let isSafe: boolean = false;
    let increasingOrDecreasing: number = 0;
    for (let i = 0; i < report.length - 1; i++) {
        let levelA: number = report[i];
        let levelB: number = report[i+1]

        const passesFirstCondition: {isSafe: boolean, increasingOrDecreasing: number} = testFirstCondition(levelA, levelB, increasingOrDecreasing)
        if (passesFirstCondition.isSafe === false) {
            return false;
        }

        const passesSecCondition: boolean = testSecondCondition(levelA, levelB)
        if (passesSecCondition === false) {
            return false;
        } else isSafe = true

        increasingOrDecreasing = passesFirstCondition.increasingOrDecreasing
    }
    return isSafe;
}

// Tests whether the level is increasing or decreasing consistently
function testFirstCondition(levelA: number, levelB: number, previousState: number): { isSafe: boolean, increasingOrDecreasing: number } {
    let currentState: number = 0; // If this is 1 the level is increasing, if -1 level is decreasing

    // Set the initial state increasing or decreasing
    if (previousState === 0) {
        if (levelA < levelB) {
            currentState = 1
            previousState = currentState
        } else if (levelA > levelB) {
            currentState = -1
            previousState = currentState
        }
        logger.debug("Initial state:", currentState)
    }

    if (levelA < levelB) {
        currentState = 1
    } else if (levelA > levelB) {
        currentState = -1
    }
    
    if (currentState !== previousState) {
        logger.debug("State is changing. Was", previousState, "is now", currentState);
        logger.debug(levelA.toString(), "and", levelB, "is unsafe for first cond")
        return { isSafe: false, increasingOrDecreasing: currentState };
    } else logger.debug(levelA.toString(), "and", levelB, "is safe for first cond")

    
    return { isSafe: true, increasingOrDecreasing: currentState };
}

//   - Any two adjacent levels differ by at least one and 
//     at most three
function testSecondCondition(levelA: number, levelB: number): boolean {
    const comparison = levelA - levelB;

    if ((3 >= comparison && comparison >= 1) || (-3 <= comparison && comparison <= -1)) {
        logger.debug(levelA.toString(), "and", levelB, "is safe for second cond")
        return true;
    } else {
        logger.debug(levelA.toString(), "and", levelB, "is unsafe for second cond")
        return false;
    }
}

function solvePartOne(content: number[][]): number {
    // Both of the following must be true
    //   - Levels are all increasing or all decreasing
    //   - Any two adjacent levels differ by at least one and 
    //     at most three

    let totalSafeLevels: number = 0;

    content.forEach(report => {
        logger.debug(report)
        let isSafe = false;

        //logger.debug("isSafe value is:", isSafe)

        isSafe = checkConditions(report)

        if (isSafe) {
            //logger.debug("Report is safe");
            totalSafeLevels += 1;
        } else {
            //logger.debug("Report is unsafe");
        }
    })

    return totalSafeLevels;
}

function solvePartTwo(content: number[][]): number {
    let totalSafeLevels: number = 0;

    content.forEach(report => {
        let dampeningChecks: number = 0;

        logger.debug(report)
        let isSafe = false;

        isSafe = checkConditions(report)
        //logger.debug("Report is", report.length,"items long")
        while (isSafe === false && dampeningChecks < report.length) {
            //logger.debug("Attempted to dampen", dampeningChecks, "times.")
            let newReport: number[] = dampenReport(report, dampeningChecks);

            isSafe = checkConditions(newReport)

            dampeningChecks += 1;
        }

        if (isSafe) {
            logger.debug("Report is safe");
            totalSafeLevels += 1;
        } else {
            logger.debug("Report is unsafe");
        }
    })

    return totalSafeLevels
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";

    const content: number[][] = getNumArray(fileName);

    partIdentifier = 1
    const partOneAnswer: number = solvePartOne(content);
    logger.info("=======")
    logger.info("Answer to Part", partIdentifier)
    logger.info(partOneAnswer.toString())
    logger.info("=======")

    const expectedNumber = mode === "test" ? 2 : 390;
    if (partOneAnswer !== expectedNumber) {
        console.error("Part One is longer correct");
        process.exit(1);
    }

    partIdentifier = 2
    const partTwoAnswer: number = solvePartTwo(content)

    logger.info("=======")
    logger.info("Answer to Part", partIdentifier)
    logger.info(partTwoAnswer.toString())
    logger.info("=======")

}