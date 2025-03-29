import { createLogger, LogLevel } from "../utils/logger";
import { convertStringToNumber, convertToNumber } from "../utils/helpers";

const logger = createLogger(LogLevel.DEBUG); // Change this to DEBUG to view debugging logs

const multiOperator = '*';
const addOperator = '+';

function parse(content: string) {
    const testValueStr = content.split(':')[0]
    const numbersStr = content.split(':')[1].split(" ").filter(num => num !== "")

    const testValue = convertStringToNumber(testValueStr)
    const numbers = convertToNumber(numbersStr)

    for (const num of numbers) {
        if (num === 0) {
            numbers.slice
        }
    }

    return [testValue, numbers] as const
}

function addNumbers(numOne: number, numTwo: number): number {
    return numOne + numTwo
}

function multiNumbers(numOne: number, numTwo: number): number {
    return numOne * numTwo
}

function checkTestValAgainstEquation(numbersResult: number, testValue: number): boolean {
    if (numbersResult === testValue) {
        return true
    } else return false
}

export function solvePartOne(content: string): number {
    let totalCalibrationResult = 0;
    const equations = content.split(/\r?\n/);
    
    for (const equation of equations) { 
        const [testValue, numbers] = parse(equation)
        logger.debug(testValue.toString(), "with", numbers)

        const numOne = numbers[0]
        const numTwo = numbers[1]
        logger.debug("Testing numbers", numOne, "and", numTwo)

        let numbersResult = addNumbers(numOne, numTwo)

        if (numbersResult === testValue) {
            totalCalibrationResult += testValue
            break;
        } else {
            numbersResult = multiNumbers(numOne, numTwo)
            if (numbersResult === testValue) {
                totalCalibrationResult += testValue
            }
        }
    }

    return totalCalibrationResult;
}
