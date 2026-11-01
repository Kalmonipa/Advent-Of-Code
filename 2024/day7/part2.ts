import { createLogger, LogLevel } from "../utils/logger";
import { convertStringToNumber, convertToNumber } from "../utils/helpers";

/**
 * Issues I faced:
 * - On the initial call of canReachTestValue in solvePartTwo, I passed in 0
 * which meant the first result (using test input) was 0 + 10 * 19 = 190. That is fine
 * for most cases but some cases would multiply the first actual number by 0 and that threw
 * off my results.
 */

const logger = createLogger(LogLevel.INFO); // Change this to DEBUG to view debugging logs

function parse(content: string): [number, number[]] {
  const testValueStr = content.split(":")[0];
  const numbersStr = content
    .split(":")[1]
    .split(" ")
    .filter((num) => num !== "");

  const testValue = convertStringToNumber(testValueStr);
  const numbers = convertToNumber(numbersStr);

  for (const num of numbers) {
    if (num === 0) {
      numbers.slice;
    }
  }

  return [testValue, numbers] as const;
}

function addTwoNumbers(numOne: number, numTwo: number): number {
  let result = numOne + numTwo;
  logger.debug("Adding numbers:", numOne, "+", numTwo);
  return result;
}

function multiTwoNumbers(numOne: number, numTwo: number): number {
  let result = numOne * numTwo;
  logger.debug("Multiplying numbers:", numOne, "*", numTwo);
  return result;
}

function combineTwoNumbers(numOne: number, numTwo: number): number {
  let result = Number(numOne.toString() + numTwo.toString());
  logger.debug("Combining numbers:", numOne, "||", numTwo);
  return result;
}

/**
 * Recursively goes through the expression to find whihc operator (if any) get the desired result
 * @param target
 * @param currentResult
 * @param remainingNumbers
 * @param expression
 * @returns
 */
function canReachTestValue(
  target: number,
  currentResult: number,
  remainingNumbers: number[],
  expression?: string,
): boolean {
  logger.debug("== Current result:", currentResult);
  logger.debug("Remaining nums left:", remainingNumbers);
  logger.debug("Number of nums left:", remainingNumbers.length);
  // If currentResult
  if (remainingNumbers.length === 0) {
    if (currentResult === target) {
      logger.info(`✅ ${target}: ${expression}`);
      return true;
    }
    logger.debug("Returning", currentResult);
    return false;
  }

  if (currentResult > target) {
    return false;
  }

  let nextNumber = remainingNumbers[0];
  logger.debug("Next number is", nextNumber);

  // Try addition
  if (
    canReachTestValue(
      target,
      addTwoNumbers(currentResult, nextNumber),
      remainingNumbers.slice(1),
      expression,
    )
  ) {
    return true;
  }

  // Try multiplication
  if (
    canReachTestValue(
      target,
      multiTwoNumbers(currentResult, nextNumber),
      remainingNumbers.slice(1),
      expression,
    )
  ) {
    return true;
  }

  // Try combining the two numbers
  if (
    canReachTestValue(
      target,
      combineTwoNumbers(currentResult, nextNumber),
      remainingNumbers.slice(1),
      expression,
    )
  ) {
    return true;
  }

  logger.debug("Result", currentResult, "not equal to test value", target);
  return false;
}

export function solvePartTwo(content: string): number {
  let totalCalibrationResult = 0;
  const equations = content.trim().split(/\r?\n/);

  for (const equation of equations) {
    const [testValue, numbers] = parse(equation);
    logger.debug(testValue.toString(), "with", numbers);

    const numOne = numbers[0];
    const numTwo = numbers[1];
    logger.debug("Testing numbers", numOne, "and", numTwo);

    if (canReachTestValue(testValue, numOne, numbers.slice(1), `${numOne}`)) {
      logger.debug("Found satisfying result", testValue);
      totalCalibrationResult += testValue;
      continue;
    }
  }

  // Failed attempts:
  // 492383931656533
  return totalCalibrationResult;
}
