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

function getNumArray(fileName: string): number[][] {
    let numArray: number[][] = [];
    const content = readFile(fileName)

    const lines = content.split('\n');

    console.log(lines)

    lines.forEach((line) => {
        let reports: string[] = line.split(" ");

        numArray.push(convertToNumber(reports));
    })

    console.log(numArray)

    return numArray
}

// Tests whether the level is increasing or decreasing consistently
function testFirstCondition(report: number[]): boolean {
    let previousState: number = 0;
    let currentState: number = 0; // If this is 1 the level is increasing, if -1 level is decreasing

    // Set the initial state increasing or decreasing
    if (report[0] < report[1]) {
        currentState = 1
        previousState = currentState
    } else if (report[0] > report[1]) {
        currentState = -1
        previousState = currentState
    }

    console.log("Initial state:", currentState)

    for (let i = 0; i < report.length - 1; i++) {
        let levelOne: number = report[i]
        let levelTwo: number = report[i+1]        

        if (levelOne < levelTwo) {
            currentState = 1
        } else if (levelOne > levelTwo) {
            currentState = -1
        }
        
        if (currentState !== previousState) {
            console.log("State is changing. Was", previousState, "is now", currentState);
            console.log("Line is unsafe")
            return false;
        }
        previousState = currentState;
    }
    console.log("First condition is safe")
    return true;
}

//   - Any two adjacent levels differ by at least one and 
//     at most three
function testSecondCondition(level: number[]): boolean {
    let isSafe: boolean = false;

    for (let i = 0; i < level.length - 1; i++) {
        let numOne: number = level[i]
        let numTwo: number = level[i+1]
        let comparison: number = numOne - numTwo

        if ((3 >= comparison && comparison >= 1) || (-3 <= comparison && comparison <= -1)) {
            console.log(level[i], "and", level[i+1], "is safe")
            isSafe = true
        } else {
            console.log(level[i], "and", level[i+1], "is unsafe")
            isSafe = false
            break;
        }
    }
    return isSafe;
}

function solvePartOne(fileName: string) {
    // Both of the following must be true
    //   - Levels are all increasing or all decreasing
    //   - Any two adjacent levels differ by at least one and 
    //     at most three

    let totalSafeLevels: number = 0;

    const content: number[][] = getNumArray(fileName);

    content.forEach(report => {
        console.log(report)
        let isSafe = false;

        console.log("isSafe value is:", isSafe)

        const passesFirstCondition: boolean = testFirstCondition(report)
        console.log("Passed first condition:", passesFirstCondition)


        if (passesFirstCondition === true) {
            isSafe = true;
        } else {
            isSafe = false;
        }

        if (isSafe && testSecondCondition(report) === false) {
            isSafe = false
        }

        if (isSafe) {
            console.log("Level is safe");
            totalSafeLevels += 1;
        } else {
            console.log("Level is unsafe");
        }
    })

    

    console.log("=======")
    console.log("Answer to Part 1:")
    console.log(totalSafeLevels)
    console.log("=======")
}

function solvePartTwo(fileName: string) {
    let totalSafeLevels: number = 0;

    const content: number[][] = getNumArray(fileName);

    content.forEach((level) => {
        let isSafe = false;
        let previousState: number = 0;
        let currentState: number = 0; // If this is 1 the level is increasing, if -1 level is decreasing
        let problemDampened: boolean = false;

        // Set the initial state increasing or decreasing
        if (level[0] < level[1]) {
            currentState = 1
            previousState = currentState
        } else if (level[0] > level[1]) {
            currentState = -1
            previousState = currentState
        }
        console.log("Initial state: ", currentState)

        for (let i = 0; i < level.length - 1; i++) {
            let numOne: number = level[i]
            let numTwo: number = level[i+1]
            let comparison: number = numOne - numTwo
            

            if (numOne < numTwo) {
                currentState = 1
            } else if (numOne > numTwo) {
                currentState = -1
            }
            
            if (currentState !== previousState) {
                console.log("State is changing. Was", previousState, "is now", currentState);
                if (problemDampened) {
                    isSafe = false;
                    break;
                } else {
                    problemDampened = true;
                }
            }

            // This checks the second condition
            if ((3 >= comparison && comparison >= 1) || (-3 <= comparison && comparison <= -1)) {
                console.log(level[i], "and", level[i+1], "is safe")
                isSafe = true
            } else {
                console.log(level[i], "and", level[i+1], "is unsafe")
                if (problemDampened) {
                    isSafe = false
                    break;
                } else problemDampened = true
            }
            previousState = currentState;
        }
        if (isSafe) {
            console.log("Line is", isSafe);
            totalSafeLevels += 1;
        }
    })

    

    console.log("=======")
    console.log("Answer to Part 2:")
    console.log(totalSafeLevels)
    console.log("=======")
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";

    solvePartOne(fileName)

    //solvePartTwo(fileName)

}