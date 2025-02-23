export function convertToNumber(strArray: string[]): number[] {
    let numArray: number[] = [];



    strArray.forEach((str) => {
        numArray.push(Number(str))
    })

    return numArray;
}
