package main

import (
	"testing"
)

func TestCheckLength(t *testing.T) {
	validNum := 111111
	invalidNum := 1234

	if !CheckLength(validNum) {
		t.Fatalf("Num %d should be valid", validNum)
	}
	if CheckLength(invalidNum) {
		t.Fatalf("Num %d should be invalid", invalidNum)
	}
}

func TestAdjacent(t *testing.T) {
	validNum := 122345
	invalidNum := 123456

	if !CheckAdjacent(validNum) {
		t.Fatalf("Num %d should be valid", validNum)
	}
	if CheckAdjacent(invalidNum) {
		t.Fatalf("Num %d should be invalid", invalidNum)
	}
}

func TestNeverDecrease(t *testing.T) {
	validNum := []int{123456, 112233, 111111}
	invalidNum := []int{654321, 223450}

	for _, num := range validNum {
		if !CheckNotDecreasing(num) {
			t.Fatalf("Num %d should be valid", num)
		}
	}
	for _, num := range invalidNum {
		if CheckNotDecreasing(num) {
			t.Fatalf("Num %d should be invalid", num)
		}
	}
}

func TestCheckDigit(t *testing.T) {
	validNum := []int{122345, 111111}
	invalidNum := []int{223450, 123789}

	for _, num := range validNum {
		n, err := CheckDigit(num)

		if n != num && err != nil {
			t.Fatalf("Num %d should be valid", num)
		}
	}

	for _, num := range invalidNum {
		n, err := CheckDigit(num)

		if n != 0 && err == nil {
			t.Fatalf("Num %d should be valid", num)
		}
	}
}

// TestHelloName calls greetings.Hello with a name, checking
// for a valid return value.
// func TestHelloName(t *testing.T) {
// 	name := "Gladys"
// 	want := regexp.MustCompile(`\b` + name + `\b`)
// 	msg, err := Hello("Gladys")
// 	if !want.MatchString(msg) || err != nil {
// 		t.Fatalf(`Hello("Gladys") = %q, %v, want match for %#q, nil`, msg, err, want)
// 	}
// }

// // TestHelloEmpty calls greetings.Hello with an empty string,
// // checking for an error.
// func TestHelloEmpty(t *testing.T) {
// 	msg, err := Hello("")
// 	if msg != "" || err == nil {
// 		t.Fatalf(`Hello("") = %q, %v, want "", error`, msg, err)
// 	}
// }
