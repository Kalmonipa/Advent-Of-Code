import { createLogger, LogLevel } from "../utils/logger";
import { convertStringIntoMatrix } from "../utils/helpers";

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

let totalDistinctPositions = 0;
let totalObstaclePlacements = 0;
let obstaclePlacements: number[][] = [];

let guardIcon = '^';
const obstacleIcon = '#';
const visitedIcon = 'X';
const unvisitedIcon = '.';
const newObstacleIcon = 'O';

let isInfiniteLoop = false;
let baseRoomMatrix: string[][]; // The original map without visited positions
let guardCurrentPosition: number[];

let previousObstacleLocations: number[][] = [];
let visitedPositions: number[][] = [];
let copyOfTravelledRoomMatrix: string[][] = [];

function printMatrix(matrix: string[][]) {
    for (const element of matrix) {
        logger.debug(element.toString())
    }
}

function checkIfInfiniteLoop(previousObstacles: number[][], currentObstacle: number[]): boolean {
    const yPos = currentObstacle[0]
    const xPos = currentObstacle[1]

    logger.debug("Checking if",currentObstacle, "has been hit before")
    if (previousObstacles.length < 4) {
        logger.debug("There aren't enough previous obstacles. Exiting")
        return false
    } else if (previousObstacles.some(
        ([y, x]) => x === xPos && y === yPos
      )) {
        logger.debug("Found this obstacle previously")
        let index = previousObstacles.findLastIndex(
            ([y, x]) => x === xPos && y === yPos
          );
        let previousObstacle = previousObstacles[index-1] || previousObstacles[index]
        logger.debug("Previous obstacle is:", previousObstacle)
        logger.debug("Last touched obstacle is:", previousObstacles[previousObstacles.length-1])
        if (previousObstacle[0] === previousObstacles[previousObstacles.length-1][0] && 
            previousObstacle[1] === previousObstacles[previousObstacles.length-1][1] &&
            previousObstacle[2] === previousObstacles[previousObstacles.length-1][2] &&
            previousObstacle[3] === previousObstacles[previousObstacles.length-1][3]) {
            logger.debug("The last obstacle we visited is also seen before")
            return true;
        }
        logger.debug("Not an infinite loop. Continuing")
      }

    return false;
}

function moveGuard(guard: string, currPosition: number[], mapMatrix: string[][], firstMap: boolean, placedObstacle: number[]): boolean {

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

    if (0 > newXPos || newXPos >= mapMatrix[yPos].length || 0 > newYPos || newYPos >= mapMatrix.length) {
        logger.debug("Guard has left the room")
        if (firstMap) {
            totalDistinctPositions += 1;
            visitedPositions.push([yPos,xPos])
        }
        printMatrix(mapMatrix);
        return false;
    }

    // Check if the guard's next position has an obstacle
    if (mapMatrix[newYPos][newXPos] === obstacleIcon || mapMatrix[newYPos][newXPos] === newObstacleIcon) {
        logger.debug("Guard has hit an obstacle located at x:", newXPos, "y:", newYPos)
        logger.debug("Last obstacles are located at", previousObstacleLocations)
        guardIcon = oppositeDirections[guard];  // Change direction if obstacle
        let nextObstaclePosition = [newYPos,newXPos]

        // Checks to see if we've entered an infinite loop
        isInfiniteLoop = checkIfInfiniteLoop(previousObstacleLocations, [newYPos,newXPos]);
        if (isInfiniteLoop) {
            logger.debug("Guard has entered an infinite loop")
            totalObstaclePlacements += 1;
            obstaclePlacements.push(placedObstacle)
            return false;
        }

        // Add the new obstacle
        previousObstacleLocations.push(nextObstaclePosition)
        return true;
    }

    // Mark the current position as visited
    mapMatrix[yPos][xPos] = visitedIcon;
    logger.debug("Checking if this location is already recorded")
    if (!visitedPositions.some(([y, x]) => y === yPos && x === xPos)) {
        logger.debug("Not recorded. Adding to array")
        logger.debug("There are",visitedPositions.length,"Last visited position:", visitedPositions[visitedPositions.length-1])
        logger.debug("The full list:",visitedPositions)
        if (firstMap) {    
            visitedPositions.push([yPos,xPos])
        }
    }

    // Increment the counter if the new position is unvisited
    if (mapMatrix[yPos + dy][xPos + dx] === unvisitedIcon && firstMap) {
        totalDistinctPositions += 1;
    }

    // Mark the new position with the guard's icon
    mapMatrix[yPos + dy][xPos + dx] = guardIcon;

    // Move the guard to the new position
    guardCurrentPosition = [yPos + dy, xPos + dx];

    return true;
}

function findGuardPosition(roomMatrix: string[][]) {
    // Find the starting position of the guard
    for (let yPos = 0; yPos < roomMatrix.length; yPos++) {
        for (let xPos = 0; xPos < roomMatrix[0].length; xPos++) {
            if (roomMatrix[yPos][xPos] === guardIcon) {
                logger.debug("Found the guard at pos x:", xPos, " y:", yPos)
                guardCurrentPosition = [yPos,xPos]
                return [yPos,xPos]
            }
        }
    }
    return [0,0]
}

function placeObstacle(roomMatrix: string[][], coords: number[]): string[][] {
    logger.debug("Coords:", coords)
    let yPos = coords[0]
    let xPos = coords[1]
    logger.debug("Adding obstacle at", yPos, xPos)
    roomMatrix[yPos][xPos] = newObstacleIcon
    return roomMatrix
}

function removeObstacle(roomMatrix: string[][], coords: number[]): string[][] {
    let yPos = coords[0]
    let xPos = coords[1]
    logger.debug("Removing obstacle at", yPos, xPos)
    roomMatrix[yPos][xPos] = visitedIcon
    return roomMatrix
}

export function solvePartTwo(content: string): number {
    let isGuardInRoom: boolean

    let mapOfRoomMatrix = convertStringIntoMatrix(content);
    baseRoomMatrix = mapOfRoomMatrix.map(row => [...row]);
    
    const guardStartingPosition = findGuardPosition(mapOfRoomMatrix)

    isGuardInRoom = moveGuard(guardIcon, guardCurrentPosition, mapOfRoomMatrix, true, [])

    while (isGuardInRoom && !isInfiniteLoop) {
        isGuardInRoom = moveGuard(guardIcon, guardCurrentPosition, mapOfRoomMatrix, true, [])
    }

    copyOfTravelledRoomMatrix = mapOfRoomMatrix.map(row => [...row]);

    logger.debug("Copy is:")

    let i = 0;
    const numberPositionsForObstacles = totalDistinctPositions
    logger.debug("Trying out",numberPositionsForObstacles,"different placements")
    while (i < totalDistinctPositions) {
        //Reset guard
        isGuardInRoom = true;
        isInfiniteLoop = false;
        logger.debug("Placing guard back to position", guardStartingPosition)
        guardCurrentPosition = guardStartingPosition
        guardIcon = '^'
        mapOfRoomMatrix = baseRoomMatrix.map(row => [...row])
        previousObstacleLocations = []

        logger.debug("There are",visitedPositions.length,"Last visited position:", visitedPositions[visitedPositions.length-1])
        logger.debug("The full list:",visitedPositions)

        logger.debug("index is:", i)
        mapOfRoomMatrix = placeObstacle(mapOfRoomMatrix, visitedPositions[i])

        logger.debug("isIfiniteloop:", isInfiniteLoop, "isGuardinRoom:", isGuardInRoom)
        while (isGuardInRoom && !isInfiniteLoop) {
            isGuardInRoom = moveGuard(guardIcon, guardCurrentPosition, mapOfRoomMatrix, false, visitedPositions[i])
        }

        mapOfRoomMatrix = removeObstacle(mapOfRoomMatrix, visitedPositions[i])

        i++;
    }

    logger.debug("Objects are being placed:", obstaclePlacements)

    return totalObstaclePlacements;
}
