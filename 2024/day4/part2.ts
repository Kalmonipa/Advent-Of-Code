import { createLogger, LogLevel } from "../utils/logger";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let matrixOfChars: string[][] = [];
const validCharacters: string[] = ['M', 'A', 'S'];
let totalPartTwoWordsFound: number = 0;


function convertStringIntoMatrix(content: string): string[][] {
    return content.split('\n').map(row => row.split(""))
}

// Start the process by finding instances of the beginning character
function searchMatrixFor(targetChar: string) {
    // Validate that the char we're searching for is a single char and one of:
    // M,A,S
    if (!validCharacters.includes(targetChar)) {
        logger.error("Found unexpected character:", targetChar)
        return;
    }

    // NOTE ON COORDINATES
    // We parse the file by line (Y axis) and then by character in the line (X axis)
    // Meaning that when accessing an element, we need to use matrix[y][x]
    // Due to that, throughout this program I provide coordinates in the {y,x} format 
    // as opposed to the more conventional {x,y} format
    // Comments will specify which coordinate is x and y

    // Traverse through each row in the input (Y axis)
    for (let y = 0; y < matrixOfChars.length; y++) {

        // Traverse through each column of each row (X axis)
        for (let x = 0; x < matrixOfChars[y].length; x++) {
            if (matrixOfChars[y][x] === targetChar) {
                logger.debug("Found", targetChar, "at x", x, ", y", y)
                checkSurroundingCharacters([y,x], "M")
            }
        }
    }
}

// Starts the search from the center A character and checks NW, NE, SE and SW
// to see if they are valid M, M, S, S chars in the correct order
function checkSurroundingCharacters(indices: number[], nextChar: string) {
    let y: number = indices[0]
    let x: number = indices[1]

    let validCombinations: string[][] = [["M","M","S","S"],["M","S","M","S"],["S","S","M","M"],["S","M","S","M"]]

    let topRow: boolean = y === 0
    let bottomRow: boolean = y === matrixOfChars.length - 1
    let leftRow: boolean = x === 0
    let rightRow: boolean = x === matrixOfChars[0].length - 1

    logger.debug("x:", x, ", y:", y)
    logger.debug("topRow:", topRow, ", bottomRow:", bottomRow, ",leftRow:", leftRow, ", rightRow:", rightRow)

    if (topRow || rightRow || bottomRow || leftRow) {
        logger.debug("A cannot be on an edge. Skipping")
    } else {
        let foundCombination: string[] = getSurroundingChars(indices, ["NW","NE","SW","SE"], nextChar)
        for (let combo of validCombinations) {
            if (combo.toString() === foundCombination.toString()) {
                logger.debug("Found valid X combination", foundCombination, "surrounding A at x", x, ", y", y)
                totalPartTwoWordsFound += 1
                break
            } else {
                logger.debug("Found combination", foundCombination, "not in", validCombinations)
            }
        }
    }
}


function getSurroundingChars(indices: number[], directions: string[], desiredChar: string): string[] {
    let y: number = indices[0]
    let x: number = indices[1]

    let foundCombination: string[] = []

    for (let direction of directions) {

        logger.debug("Current position: x", x, "y",y)
        logger.debug("Looking", direction, "for", desiredChar)

        switch (direction) {
            case "NW":
                logger.debug("Found", desiredChar, "to the north west")
                foundCombination.push(matrixOfChars[y-1][x-1])
                break
            case "NE":
                logger.debug("Found", desiredChar, "to the north east")
                foundCombination.push(matrixOfChars[y-1][x+1])
                break
            case "SE":
                logger.debug("Found", desiredChar, "to the south east")
                foundCombination.push(matrixOfChars[y+1][x+1])
                break
            case "SW":
                logger.debug("Found", desiredChar, "to the south west")
                foundCombination.push(matrixOfChars[y+1][x-1])
                break
            }
        logger.debug("Current combination:",foundCombination)
    }
    return foundCombination
}


export function solvePartTwo(content: string): number {

    matrixOfChars = convertStringIntoMatrix(content)

    searchMatrixFor("A")

    return totalPartTwoWordsFound;
}