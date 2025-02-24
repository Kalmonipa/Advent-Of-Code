import { createLogger, LogLevel } from "../utils/logger";
import {convertToNumber} from '../utils/helpers'
import * as fs from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const logger = createLogger(LogLevel.DEBUG); // Change this to DEBUG to view debugging logs

function readFile(filename: string): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = join(__filename, '..');

    const content = fs.readFileSync(join(__dirname, filename), 'utf8')

    return content;
}

function parseMul(content: string, ind: number): number {
    // Identify if it's a valid mul() phrase
    let mulPhrase: string = content.substring(ind+4, content.indexOf(")", ind));

    //logger.debug("Phrase found:",mulPhrase)

    let strValues: string[] = mulPhrase.split(',');

    //logger.debug(strValues)

    for (let i = 0; i < strValues.length; i++) {
        if (strValues[i].includes("mul(")) {
            //logger.debug("Phrase contains another mul phrase", strValues[i])
            
            strValues[i] = strValues[i].substring(strValues[i].indexOf("mul(") + 4)
            //logger.debug("New str is", strValues[i])
            //logger.debug("New strValues:", strValues)
            return 0;
        }
        if (/^\d+$/.test(strValues[i]) === false) {
            //logger.debug("Phrase", strValues[i], "does not meet requirements")
            return 0;
        }
    }

    let values: number[] = convertToNumber(strValues);
    if (values.length !== 2) {
        //logger.debug("mul phrase has too many values")
        return 0;
    }

    logger.debug(values)
    let multipliedValue: number = values[0] * values[1]
    //logger.debug("Multiplied value is", multipliedValue)

    return multipliedValue;
}

function removeDisabledInstructions(content: string, indexOfDisableFlag: number, indexOfEnableFlag: number){
    //logger.debug("Start of cut:", indexOfDisableFlag)
    //logger.debug("End of cut:", indexOfEnableFlag)
    logger.debug("Cut instructions:", content.substring(indexOfDisableFlag, indexOfEnableFlag))

    return content.substring(0,indexOfDisableFlag) + content.substring(indexOfEnableFlag+1);
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

    return totalValue;
}

function solvePartTwo(content: string): number {
    // Current thinking is just to cut out the substrings between `don't()` and `do()`
    // and then process the remaining like in part 1
    let totalValue: number = 0;
    var mulCount: number = 0;
    var disabledFlagsRemoved: number = 0;
    let ind: number = 0

    // Remove don't() and do() sections
    let indexOfDisableFlag: number = content.indexOf("don't()");

    while (indexOfDisableFlag !== -1) {
        let indexOfEnableFlag: number = content.indexOf("do()") + 4; // Add 4 to remove the do() as well

        if (indexOfDisableFlag === -1) {
            logger.debug("Found no more instances of don't()")
            continue;
        }
        while (indexOfEnableFlag < indexOfDisableFlag) {
            indexOfEnableFlag = content.indexOf('do()', indexOfEnableFlag) + 4;
            logger.debug("Index of disable flag:", indexOfDisableFlag)
            logger.debug("Index of enable flag:", indexOfEnableFlag)
        }

        content = removeDisabledInstructions(content, indexOfDisableFlag, indexOfEnableFlag)
 
        indexOfDisableFlag = content.indexOf("don't()");
        logger.debug("Index of next disable flag", indexOfDisableFlag)

        disabledFlagsRemoved += 1;

        //logger.debug("New substring:", content)
    }

    logger.debug("Number of disable/enable groups removed:", disabledFlagsRemoved)

    //logger.debug("New substring:", content)


    mulCount = (content.match(/mul\(/g) || []).length

    for (let i = 0; i < mulCount; i++) {
        ind = content.indexOf("mul(", ind)

        totalValue = totalValue + parseMul(content, ind)
        //logger.debug("Total value:", totalValue)

        ind = ind + 4;
    }

    return totalValue;
}

export default function solve(mode?: string) {
    const fileName = mode === "test" ? "test-input.txt" : "input.txt";
    const content: string = readFile(fileName)

    //logger.debug(content)

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