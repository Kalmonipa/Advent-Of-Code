import { createLogger, LogLevel } from "../utils/logger";
import {convertToNumber} from '../utils/helpers'
import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    return content;
}

function solvePartOne(content: string): number {
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