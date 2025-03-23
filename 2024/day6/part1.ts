import { createLogger, LogLevel } from "../utils/logger";
import { convertStringIntoMatrix } from "../utils/helpers";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let totalDistinctPositions = 0;

let guardIcon = '^';
const guardStartingIcon = '^';
const obstacleIcon = '#';
const visitedIcon = 'X';
const unvisitedIcon = '.';

let mapOfRoomMatrix: string[][]
let guardCurrentPosition: number[];

function printMatrix(matrix: string[][]) {
    for (const element of matrix) {
        logger.debug(element.toString())
    }
}

function moveGuard(guard: string, currPosition: number[]): boolean {
    logger.debug("Guards current position:", currPosition)

    const directions: { [key: string]: [number, number] } = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    };

    const oppositeDirections: { [key: string]: string } = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };

    let xPos = currPosition[1];
    let yPos = currPosition[0];

    if (!['^', '>', 'v', '<'].includes(guard)) {
        logger.debug("ERROR: Guard is an unknown character at pos x:", xPos, "y:", yPos);
        return false;
    }

    const [dy, dx] = directions[guard];  // Get the direction's deltas (dy, dx)


    const newXPos = xPos + dx
    const newYPos = yPos + dy

    logger.debug("New positions of x:", newXPos, "y:", newYPos)
    logger.debug("Room is", mapOfRoomMatrix.length, "m long and ",mapOfRoomMatrix[yPos].length, "m wide")

    if (0 > newXPos || newXPos >= mapOfRoomMatrix[yPos].length || 0 > newYPos || newYPos >= mapOfRoomMatrix.length) {
        logger.debug("Guard has left the room")
        mapOfRoomMatrix[yPos][xPos] = visitedIcon;
        totalDistinctPositions += 1;
        printMatrix(mapOfRoomMatrix);
        return false;
    }

    // Check if the guard's next position has an obstacle
    if (mapOfRoomMatrix[yPos + dy][xPos + dx] === obstacleIcon) {
        guardIcon = oppositeDirections[guard];  // Change direction if obstacle
        return true;
    }

    // Mark the current position as visited
    mapOfRoomMatrix[yPos][xPos] = visitedIcon;

    // Increment the counter if the new position is unvisited
    if (mapOfRoomMatrix[yPos + dy][xPos + dx] === unvisitedIcon) {
        totalDistinctPositions += 1;
    }

    // Mark the new position with the guard's icon
    mapOfRoomMatrix[yPos + dy][xPos + dx] = guardIcon;

    // Move the guard to the new position
    guardCurrentPosition = [yPos + dy, xPos + dx];

    printMatrix(mapOfRoomMatrix);

    return true;
}


export function solvePartOne(content: string): number {
    mapOfRoomMatrix = convertStringIntoMatrix(content);
    let guardExited: boolean

    // Find the starting position of the guard
    for (let yPos = 0; yPos < mapOfRoomMatrix.length; yPos++) {
        //logger.debug("Column:",xPos)
        for (let xPos = 0; xPos < mapOfRoomMatrix[0].length; xPos++) {
            //logger.debug("Row:",yPos)
            if (mapOfRoomMatrix[yPos][xPos] === guardIcon) {
                logger.debug("Found the guard at pos x:", xPos, " y:", yPos)
                guardCurrentPosition = [yPos,xPos]
            }
        }
    }

    guardExited = moveGuard(guardIcon, guardCurrentPosition)

    while (guardExited === true) {
        guardExited = moveGuard(guardIcon, guardCurrentPosition)
    }

    return totalDistinctPositions;
}
