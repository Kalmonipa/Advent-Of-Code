package main

import (
	"errors"
	"fmt"
	"strconv"
)

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).

// How many different values meet this criteria in the range 125730-579381?

func CheckLength(number int) bool {
	if len(strconv.Itoa(number)) != 6 {
		fmt.Printf("Number %d is not 6 chars long\n", number)
		return false
	}
	//fmt.Printf("Number %d is 6 chars long\n", number)
	return true
}

func CheckAdjacent(number int) bool {
	numString := strconv.Itoa(number)
	match := false

	for ind := 0; ind < 5; ind++ {
		if numString[ind] == numString[ind+1] {
			match = true
		}
	}
	//fmt.Printf("Number %d has 2 adjacent chars: %t\n", number, match)
	return match
}

func CheckNotDecreasing(number int) bool {
	numString := strconv.Itoa(number)
	compFirst := 0
	compSec := 0

	for ind := 0; ind < 5; ind++ {
		num, err := strconv.Atoi(string(numString[ind]))
		if err != nil {
			fmt.Println("Error:", err)
			return false
		}
		compFirst = num

		num, err = strconv.Atoi(string(numString[ind+1]))
		if err != nil {
			fmt.Println("Error:", err)
			return false
		}
		compSec = num

		//fmt.Printf("First: %d, Sec: %d\n", compFirst, compSec)

		// If the number decreases at any point, return false immediately
		if compFirst > compSec {
			return false
		}
	}

	return true
}

func CheckDigit(i int) (int, error) {
	if CheckLength(i) && CheckAdjacent(i) && CheckNotDecreasing(i) {
		fmt.Println(i)
		return i, nil
	}

	//fmt.Printf("%d is not valid\n", i)
	return 0, errors.New("Number is not valid")
}

func main() {
	validNums := []int{}

	for i := 125730; i <= 579381; i++ {
		num, err := CheckDigit(i)
		if err == nil {
			validNums = append(validNums, num)
		}
	}

	//fmt.Println(validNums)

	fmt.Printf("Number of possible passwords: %d", len(validNums))
}
