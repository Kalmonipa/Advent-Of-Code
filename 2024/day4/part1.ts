import { createLogger, LogLevel } from "../utils/logger";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

const validCharacters: string[] = ['X', 'M', 'A', 'S'];
let totalPartOneWordsFound: number = 0;

let matrixOfChars: string[][] = [];


function printMatrixOfChars() {
    for (let y = 0; y < matrixOfChars.length; y++) {
        logger.debug(matrixOfChars[y].toString())
    }
}

// Start the process by finding instances of the beginning character
function findValidChars(targetChar: string) {

    // printMatrixOfChars()

    // Validate that the char we're searching for is a single char and one of:
    //  X,M,A,S
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

// Checks to see if the surrounding characters are next in the wordsearch (i.e. if we found an X, then look for M)
// We use compass notation here (N, E, S, W) to make directions easier
function checkSurroundingCharacters(indices: number[], nextChar: string): number[] {
    let y: number = indices[0]
    let x: number = indices[1]

    let topRow: boolean = y === 0
    let bottomRow: boolean = y === matrixOfChars.length - 1
    let leftRow: boolean = x === 0
    let rightRow: boolean = x === matrixOfChars[0].length - 1

    logger.debug("x:", x, ", y:", y)
    logger.debug("topRow:", topRow, ", bottomRow:", bottomRow, ",leftRow:", leftRow, ", rightRow:", rightRow)

    // If we're in the top left corner, only check S, SE, E
    if (topRow && leftRow) {
        // Check south
        checkCharInDirection(indices, "S", nextChar)
        // Check south east
        checkCharInDirection(indices, "SE", nextChar)
        // Check east
        checkCharInDirection(indices, "E", nextChar)
    } // Top right corner, only check S, SW, W
    else if (topRow && rightRow) {
        // Check south
        checkCharInDirection(indices, "S", nextChar)
        // Check south west
        checkCharInDirection(indices, "SW", nextChar)
        // Check west
        checkCharInDirection(indices, "W", nextChar)
    } // Bottom left corner, only check N, NE, E
    else if (bottomRow && leftRow) {
        // Check north
        checkCharInDirection(indices, "N", nextChar)
        // Check north east
        checkCharInDirection(indices, "NE", nextChar)
        // Check east
        checkCharInDirection(indices, "E", nextChar)
    } // Bottom right corner, only check N, NW, W
    else if (bottomRow && rightRow) {
        // Check north
        checkCharInDirection(indices, "N", nextChar)
        // Check north west
        checkCharInDirection(indices, "NW", nextChar)
        // Check west
        checkCharInDirection(indices, "W", nextChar)
    } else if (topRow) {
        logger.debug("Char is on the top row")
        // Check east
        checkCharInDirection(indices, "E", nextChar)
        // Check south east
        checkCharInDirection(indices, "SE", nextChar)
        // Check south
        checkCharInDirection(indices, "S", nextChar)
        // Check south west
        checkCharInDirection(indices, "SW", nextChar)
        // Check west
        checkCharInDirection(indices, "W", nextChar)
    } else if (rightRow) {
        // Check south
        checkCharInDirection(indices, "S", nextChar)
        // Check south west
        checkCharInDirection(indices, "SW", nextChar)
        // Check west
        checkCharInDirection(indices, "W", nextChar)
        // Check north west
        checkCharInDirection(indices, "NW", nextChar)
        // Check north
        checkCharInDirection(indices, "N", nextChar)
    } else if (bottomRow) {
        // Check west
        checkCharInDirection(indices, "W", nextChar)
        // Check north west
        checkCharInDirection(indices, "NW", nextChar)
        // Check north
        checkCharInDirection(indices, "N", nextChar)
        // Check north east
        checkCharInDirection(indices, "NE", nextChar)
        // Check east
        checkCharInDirection(indices, "E", nextChar)
    } else if (leftRow) {
        // Check north
        checkCharInDirection(indices, "N", nextChar)
        // Check north east
        checkCharInDirection(indices, "NE", nextChar)
        // Check east
        checkCharInDirection(indices, "E", nextChar)
        // Check south east
        checkCharInDirection(indices, "SE", nextChar)
        // Check south
        checkCharInDirection(indices, "S", nextChar)
    } else {
        // Check north
        checkCharInDirection(indices, "N", nextChar)
        // Check north east
        checkCharInDirection(indices, "NE", nextChar)
        // Check east
        checkCharInDirection(indices, "E", nextChar)
        // Check south east
        checkCharInDirection(indices, "SE", nextChar)
        // Check south
        checkCharInDirection(indices, "S", nextChar)
        // Check south west
        checkCharInDirection(indices, "SW", nextChar)
        // Check west
        checkCharInDirection(indices, "W", nextChar)
        // Check north west
        checkCharInDirection(indices, "NW", nextChar)
    }

    return []
}

function checkCharInDirection(indices: number[], direction: string, desiredChar: string): boolean {
    let y: number = indices[0]
    let x: number = indices[1]

    if (["NW","N","NE"].includes(direction) && y === 0) {
        logger.debug("Reached the top row. Cannot continue")
        return false
    } else if (["SW","S","SE"].includes(direction) && y === matrixOfChars.length - 1) {
        logger.debug("Reached the bottom row. Cannot continue")
        return false
    } else if (["NE","E","SE"].includes(direction) && x === matrixOfChars[0].length - 1) {
        logger.debug("Reached the far right row. Cannot continue")
        return false
    } else if (["SW","W","NW"].includes(direction) && x === 0) {
        logger.debug("Reached the far left row. Cannot continue")
        return false
    }

    let nextDesiredChar: string = validCharacters[validCharacters.indexOf(desiredChar) + 1];
    logger.debug("Current position: x", x, "y",y)
    logger.debug("Looking", direction, "for", desiredChar)

    switch (direction) {
        case "N": 
            if (matrixOfChars[y-1][x] === desiredChar) {
                logger.debug("Found", desiredChar, "to the north", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y-1, x], "N", nextDesiredChar)) {
                    return true 
                } else return false
            }
            break
        case "NE":
            if (matrixOfChars[y-1][x+1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the north east", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y-1, x+1], "NE", nextDesiredChar)) {
                    return true 
                } else return false
            } 
            break
        case "E":
            if (matrixOfChars[y][x+1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the east, at position x:", x+1, "y:", y)
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y, x+1], "E", nextDesiredChar)) {
                    return true 
                } else return false
            }
            break
        case "SE":
            if (matrixOfChars[y+1][x+1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the south east, at position", x+1, y+1)
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y+1,x+1], "SE", nextDesiredChar)) {
                    return true 
                } else return false
            }
            break
        case "S":
            if (matrixOfChars[y+1][x] === desiredChar) {
                logger.debug("Found", desiredChar, "to the south", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y+1, x], "S", nextDesiredChar)) {
                    return true 
                } else return false 
            }
            break
        case "SW":
            if (matrixOfChars[y+1][x-1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the south west", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y+1, x-1], "SW", nextDesiredChar)) {
                    return true 
                } else return false 
            }
            break
        case "W":
            if (matrixOfChars[y][x-1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the west", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y, x-1], "W", nextDesiredChar)) {
                    return true 
                } else return false 
            }
            break
        case "NW":
            if (matrixOfChars[y-1][x-1] === desiredChar) {
                logger.debug("Found", desiredChar, "to the north west", )
                if (desiredChar === "S") {
                    logger.debug("Found XMAS, coming", direction, "and ending at x:", x, "y:", y)
                    totalPartOneWordsFound += 1
                    return true
                } else if (checkCharInDirection([y-1, x-1], "NW", nextDesiredChar)) {
                    return true 
                } else return false
            }
            break
        }
    logger.debug("Did not find", desiredChar,"to the", direction)

    return false
}

function convertStringIntoMatrix(content: string): string[][] {
    return content.split('\n').map(row => row.split(""))
}

export function solvePartOne(content: string): number {
    matrixOfChars = convertStringIntoMatrix(content)

    findValidChars("X")

    return totalPartOneWordsFound;
}

