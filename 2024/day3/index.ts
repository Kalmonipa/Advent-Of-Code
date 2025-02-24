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

function parseMul(content: string, ind: number): number {
    // Identify if it's a valid mul() phrase
    let mulPhrase: string = content.substring(ind+4, content.indexOf(")", ind));

    logger.debug(mulPhrase)

    let strValues: string[] = mulPhrase.split(',');

    logger.debug(strValues)

    for (const str of strValues) {
        if (/^\d+$/.test(str) === false) {
            logger.debug("mul phrase does not meet requirements")
            return 0;
        }
    }

    let values: number[] = convertToNumber(strValues);
    if (values.length !== 2) {
        logger.debug("mul phrase does not meet requirements")
        return 0;
    }

    const mulValue: number = values[0] * values[1]
    logger.debug("Multiplying", values[0], "by", values[1], "to get", mulValue);

    return mulValue;
}


function solvePartOne(content: string): number {
    let totalValue: number = 0;
    var mulCount = (content.match(/mul\(/g) || []).length
    let ind: number = 0

    for (let i = 0; i < mulCount; i++) {
        ind = content.indexOf("mul(", ind)

        totalValue += parseMul(content, ind)

        ind = ind + 4;
    }

    logger.debug(totalValue.toString())
    return totalValue;
}

function solvePartTwo(content: string): number {
    let totalValue: number = 0;
    var mulCount = (content.match(/mul\(/g) || []).length
    let ind: number = 0
    let enableInstructions: boolean = true;
    let mulIdentifier: string = "mul(";
    let disableIdentifier: string = "don't()";
    let enableIdentifier: string = "do()";

    for (let i = 0; i < content.length; i++) {
        let currentChar: string = content[i]

        // If most recent instruction is do(), look for a don't()
        if (enableInstructions) {
            if (content.substring(i, i + 7) === disableIdentifier) {
                logger.debug("Disabling instructions. Found",content.substring(i, i + 7))
                enableInstructions = false;
                i = i + 7
            }
        // If most recent instruction is a don't(), look out for a do()
        } else if (enableInstructions === false) {
            if (content.substring(i, i + 4) === enableIdentifier) {
                logger.debug("Enabling instructions. Found", content.substring(i, i + 4))
                enableInstructions = true;
                i = i + 5
            }
        }

        //ind = content.indexOf(mulIdentifier, i)

        if (enableInstructions) {
            totalValue += parseMul(content, i)
        } else {
            logger.debug("Instructions disabled. Not processing", content.substring(i, i+10))
        }
    }

    logger.debug(totalValue.toString())
    return totalValue;
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";
    const content: string = readFile(fileName)

    logger.debug(content)

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

    // Answers tried:
    // 111087209

}