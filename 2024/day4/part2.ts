import { createLogger, LogLevel } from "../utils/logger";


const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let matrixOfChars: string[][] = [];

function convertStringIntoMatrix(content: string): string[][] {
    return content.split('\n').map(row => row.split(""))
}

export function solvePartTwo(content: string): number {

    matrixOfChars = convertStringIntoMatrix(content)

    return 0;
}