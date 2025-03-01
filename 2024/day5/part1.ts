import { createLogger, LogLevel } from "../utils/logger";

const logger = createLogger(LogLevel.DEBUG); // Change this to DEBUG to view debugging logs

function parseFile(content: string): string[] {
    let orderRulesAndUpdates: string[] = content.split(" ")

    if (orderRulesAndUpdates.length === 3) {
        orderRulesAndUpdates.splice(2)
    }

    return orderRulesAndUpdates
}

export function solvePartOne(content: string): number {
    let pageOrderRules: string = ""
    let updates: string = ""

    const orders: string[] = parseFile(content)
    pageOrderRules = orders[0]
    updates = orders[1]

    return 0;
}
