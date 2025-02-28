import { createLogger, LogLevel } from "../utils/logger";
import {convertToNumber} from '../utils/helpers'
import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const logger = createLogger(LogLevel.DEBUG); // Change this to DEBUG to view debugging logs

export interface Character {
    name: string;
    xPos: number;
    yPos: number;
  }

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    return content;
}

function printMapOfChars(mapOfChars: Character[]) {
    for (let char of mapOfChars) {
        logger.debug(char.name, "- x:", char.xPos, "y:", char.yPos)
    }
}

function mapWordSearch(content: string): string[][] {
    let matrixOfChars: string[][] = content.split('\n').map(row => row.split(""))

    logger.debug(matrixOfChars[3][8])

    //printMapOfChars(mapOfChars)

    return matrixOfChars;
}

function solvePartOne(content: string): number {
    const matrix: string[][] = mapWordSearch(content)

    return 0
}

function solvePartTwo(content: string): number {
    return 0
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";
    const content: string = readFile(fileName)

    const partOneAnswer: number = solvePartOne(content)

    logger.info("=======")
    logger.info("Answer to Part 1")
    logger.info(partOneAnswer.toString())
    logger.info("=======")

    // const partTwoAnswer: number = solvePartTwo(content)

    // logger.info("=======")
    // logger.info("Answer to Part 2")
    // logger.info(partTwoAnswer.toString())
    // logger.info("=======")

}