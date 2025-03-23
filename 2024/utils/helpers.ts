import { createLogger, LogLevel } from "../utils/logger";
const logger = createLogger(LogLevel.DEBUG);

// Converts a string array to a number array
export function convertToNumber(strArray: string[]): number[] {
    let numArray: number[] = [];

    strArray.forEach((str) => {
        numArray.push(Number(str))
    })

    return numArray;
}

// Converts a string to an array of strings based on new lines
export function convertStringToArray(strArray: string): string[] {
    return strArray.split("\n")
}

/**
 * @description Converts a string into a matrix to be traversed etc
 * @description NOTE: 0,0 is the top left corner
 * @description NOTE: Due to the way it gets parsed, the axis notation is in y,x format. Not the usual x,y
 * @description NOTE: To get to the element at position X:1,Y:2, you'd need to use matrix[2][1]
 * @param content the input string for the challenge
 * @returns {string[][]}
 */
export function convertStringIntoMatrix(content: string): string[][] {
    return content.split('\n').map(row => row.split(""))
}

export function printMatrix(matrix: string[][]) {
    for (const element of matrix) {
        logger.debug(element.toString())
    }
}
