import { createLogger, LogLevel } from "../utils/logger";
import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { solvePartOne } from './part1';
import { solvePartTwo } from "./part2";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    return content;
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";
    const content: string = readFile(fileName)

    console.time("execution time")
    const partOneAnswer: number = solvePartOne(content)

    logger.info("=======")
    logger.info("Answer to Part 1")
    logger.info(partOneAnswer.toString())
    logger.info("=======")

    const partTwoAnswer: number = solvePartTwo(content)

    logger.info("=======")
    logger.info("Answer to Part 2")
    logger.info(partTwoAnswer.toString())
    logger.info("=======")

    console.timeEnd("execution time")

}
