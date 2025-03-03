// Converts a string array to a number array
export function convertToNumber(strArray: string[]): number[] {
    let numArray: number[] = [];

    strArray.forEach((str) => {
        numArray.push(Number(str))
    })

    return numArray;
}

// Converts a string to an array of strings based on new lines
export function convertStringToArray(strArray: string): string[] {
    return strArray.split("\n")
}
