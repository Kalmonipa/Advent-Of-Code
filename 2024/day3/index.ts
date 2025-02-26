import { createLogger, LogLevel } from "../utils/logger";
import {convertToNumber} from '../utils/helpers'
import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let mulIdentifier: string = "mul(";
let disableIdentifier: string = "don't()";
let enableIdentifier: string = "do()";

let bigLargeNum: number = 100000000;

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    return content;
}

// Takes in the string `mul(xxx,xxx`, removes the `mul(` and processes the following characters
// If they are not valid numbers, returns 0
// If it is a valid mul phrase, processes it and returns the multiplication and where to start from in the next loop
function parseMul(content: string, ind: number): {value: number, startingInd: number} {
    let instrEnd: number = content.indexOf(")", ind)
    let mulPhrase: string = content.substring(ind, instrEnd);

    logger.debug("String to parse:", mulPhrase)

    if (mulPhrase.startsWith(mulIdentifier) === false) {
        logger.debug(mulPhrase,"is not a mul phrase")
        return {value: 0, startingInd: ind};
    }
    mulPhrase = content.substring(ind+4, instrEnd);


    let strValues: string[] = mulPhrase.split(',');

    //logger.debug(strValues)

    for (const str of strValues) {
        if (/^\d+$/.test(str) === false) {
            logger.debug("mul phrase does not meet requirements")
            return {value: 0, startingInd: ind};
        }
    }

    let values: number[] = convertToNumber(strValues);
    if (values.length !== 2) {
        logger.debug("mul phrase does not meet requirements")
        return {value: 0, startingInd: ind};
    }

    const mulValue: number = values[0] * values[1]
    logger.debug("Multiplying", values[0], "by", values[1], "to get", mulValue);

    return {value: mulValue, startingInd: instrEnd};
}


function solvePartOne(content: string): number {
    let totalValue: number = 0;
    var mulCount = (content.match(/mul\(/g) || []).length
    let ind: number = 0
    let instrEnd: number = 0;

    for (let i = 0; i < mulCount; i++) {
        ind = content.indexOf("mul(", ind)

        totalValue += parseMul(content, ind).value

        ind = ind + 4;
    }

    return totalValue;
}

function findNextIndex(content: string, identifer: string, ind: number): number {
    let i: number = content.indexOf(identifer, ind) === -1 ? bigLargeNum : content.indexOf(identifer, ind)
    logger.debug("Setting next", identifer, "index to", i)
    return i
}


// We keep track of whether instructions are enabled or disabled with enableInstructions
// Continuosly check whether instructions should be enabled or disabled by seeing which flag (do or don't) is more recent
// If we reach 
//     - an enable or disable flag: enable/disable and then find the next instance
//     - a mul phrase, parse it, validate it and add it to the total
function solvePartTwo(content: string): number {
    let totalValue: number = 0;
    let enableInstructions: boolean = true;
    const contentLength: number = content.length;

    // Upcoming mul(), don't() and do()
    let nextMulIndex: number = content.indexOf(mulIdentifier)
    let nextDontIndex: number = content.indexOf(disableIdentifier) + 7
    let nextDoIndex: number = content.indexOf(enableIdentifier);

    // Most recent don't() and do()
    let prevDontIndex: number = -20;
    let prevDoIndex: number = 0; 


    for (let i = 0; i < contentLength; i++) {
        logger.debug("Looping through", contentLength, "times")

        logger.debug("Instructions are enabled:", enableInstructions)
        logger.debug("Next:")
        logger.debug("Mul():", nextMulIndex, "; dont():", nextDontIndex, "; do():", nextDoIndex, "; i:", i)

        // We only want to update these values if we have passed a do() or a dont()
        if (i >= nextDontIndex) {
            prevDontIndex = i
            logger.debug("Setting prev dont index", prevDontIndex)
        }
        if (i >= nextDoIndex) {
            prevDoIndex = i
            logger.debug("Setting prev do index", prevDoIndex)
        }

        let distanceFromDont: number = i - prevDontIndex
        let distanceFromDo: number = i - prevDoIndex

        logger.debug("Distance from do()", distanceFromDo, "dont()", distanceFromDont)

        if (distanceFromDo < distanceFromDont && !enableInstructions) {
            logger.debug("Enabling instructions")
            enableInstructions = true;
            nextDoIndex = findNextIndex(content, enableIdentifier, i)
        } else if (distanceFromDo > distanceFromDont && enableInstructions) {
            logger.debug("Disabling instructions")
            enableInstructions = false;
            nextDontIndex = findNextIndex(content, disableIdentifier, i)
        }

        if (i === nextMulIndex && enableInstructions) {
            let parseMulResult: {value: number, startingInd: number} = parseMul(content, i)
            totalValue += parseMulResult.value

            if (parseMulResult.startingInd === -1) {
                logger.debug("Somehow got -1. Breaking")
                break;
            }

            logger.debug("Total value is now", totalValue)
            logger.debug("i is", i, ". Jumping ahead to", parseMulResult.startingInd)
            i = parseMulResult.startingInd;
            nextMulIndex = findNextIndex(content, mulIdentifier, i)
            nextDontIndex = findNextIndex(content, disableIdentifier, i)
            nextDoIndex = findNextIndex(content, enableIdentifier, i)

        } else if (i > nextMulIndex) {
            nextDontIndex = findNextIndex(content, disableIdentifier, i)
            nextDoIndex = findNextIndex(content, enableIdentifier, i)
            nextMulIndex = findNextIndex(content, mulIdentifier, i)
        }

    }

    return totalValue;
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";
    const content: string = readFile(fileName)

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

}