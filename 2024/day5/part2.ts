import { createLogger, LogLevel } from "../utils/logger";
import { convertStringToArray, convertToNumber } from "../utils/helpers"

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let ruleMap = new Map<number, number[]>();
let totalPartTwo: number = 0

function parseFile(content: string): string[] {
    let orderRulesAndUpdates: string[] = content.split("\n\n")

    logger.debug("Content:",orderRulesAndUpdates.length)

    if (orderRulesAndUpdates.length === 3) {
        orderRulesAndUpdates.splice(2)
    }

    return orderRulesAndUpdates
}

function buildRuleDictionary(orderRules: number[][]) {
    for (let rule of orderRules) {
        let pageA: number = rule[0]
        let pageB: number = rule[1]

        if (ruleMap.has(pageA)) {
            logger.debug("Rule map contains", pageA)
            let pageRules = ruleMap.get(pageA)
            logger.debug("Current pages in array:", pageRules)
            pageRules.push(pageB)
            ruleMap.set(pageA, pageRules)
            logger.debug("Pages in array after update:", pageRules)

        } else {
            logger.debug("Rule map does not contain", pageA)
            ruleMap.set(pageA, [pageB])
            logger.debug("Added value", pageB, "to key", pageA)
        }

    }
    logger.debug("Map:", ruleMap)
}

function validateUpdate(numOne: number, numTwo: number): boolean {
    logger.debug("Comparing", numOne, "and", numTwo)
    if (ruleMap.has(numOne)) {
        logger.debug("Rule found for", numOne)
        if (ruleMap.get(numOne)?.includes(numTwo)) {
            logger.debug("+ Key", numOne, "must come before", numTwo)
            return true
        } else {
            logger.debug("x Key", numOne, "cannot come before", numTwo)
            return false
        }
    } 
    logger.debug("No rule found for", numOne)
    return false
}

function checkUpdate(updates: number[], hasBeenCorrected: boolean): boolean {
    let isValidUpdate: boolean = false
    let correctlyOrdered: boolean = false
    
    for (let updateA = 0; updateA < updates.length - 1; updateA++) {
        for (let updateB = updateA+1; updateB < updates.length; updateB++) {
            isValidUpdate = validateUpdate(updates[updateA], updates[updateB])
            //hasBeenCorrected = false
            if (!isValidUpdate) {
                // Switch the two elements to see if that works
                const index = updates.indexOf(updates[updateA]);
                if (index !== -1) {
                    const [movedItem] = updates.splice(index, 1);
                    updates.splice(updateB, 0, movedItem);
                }
                logger.debug("Switched places of", updates[updateB], "and", updates[updateA])
                logger.debug("Trying new updates:", updates)
                if (checkUpdate(updates, true)) {
                    isValidUpdate = true
                    hasBeenCorrected = true
                }
                logger.debug("Update is now valid:", isValidUpdate)
                //correctlyOrdered = true;
            }
            break
        }
    }
    if (isValidUpdate && hasBeenCorrected) {
        logger.debug(updates.toString(), "is a valid update after a change")
        return true
    } else if (isValidUpdate) {
        logger.debug(updates.toString(), "is a valid update without edits")
        return false
    }
    return false   
}

function findMiddlePage(update: number[]): number {
    let middle: number = update[Math.round((update.length - 1) / 2)]
    logger.debug("Middle page in", update,"is", middle)
    return middle
}

function convertStringArrayToNumArray(update: string, delimiter: string): number[] {
    let splitUpdate: string[] = update.split(delimiter)
    return convertToNumber(splitUpdate)
}

export function solvePartTwo(content: string): number {
    let pageOrderRulesStr: string[] = []
    let pageOrderRules: number[][] = []
    let updatesStr: string[] = []
    let updates: number[][] = []

    const orders: string[] = parseFile(content)
    pageOrderRulesStr = convertStringToArray(orders[0])
    updatesStr = convertStringToArray(orders[1])

    // Convert order rules from string arrays to num arrays
    for (let orderRule of pageOrderRulesStr) {
        pageOrderRules.push(convertStringArrayToNumArray(orderRule, "|"))
    }
    
    // Convert updates as well
    for (let update of updatesStr) {
        updates.push(convertStringArrayToNumArray(update, ","))
    }

    buildRuleDictionary(pageOrderRules)

    for (let update of updates) {
        logger.debug("=== Checking", update)
        if (checkUpdate(update)) {
            totalPartTwo += findMiddlePage(update)
        }
    }
    
    return totalPartTwo;
}
