package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

var (
	fileName = "../input.txt"
)

type Coordinate struct {
	X, Y, Steps int
}

type Steps struct {
	firstStep, secStep int
}

// Creates a slice of the first wires coordinates at each step
func mapWire(instrLine string, wire []Coordinate, currPos Coordinate) []Coordinate {

	instr := strings.Split(instrLine, ",")

	for _, i := range instr {

		dir := string(i[0])
		steps, err := strconv.Atoi(i[1:])
		if err != nil {
			log.Fatal(err)
		}

		currPos, wire = moveWire(steps, dir, wire, currPos, wire)

	}

	return wire
}

func moveWire(steps int, dir string, wire []Coordinate, currPos Coordinate, wireMap []Coordinate) (Coordinate, []Coordinate) {
	fmt.Printf("Moving %s by %d steps\n", dir, steps)

	dx, dy := 0, 0
	nextPos := Coordinate{X: currPos.X, Y: currPos.Y}

	if dir == "U" {
		dy = 1
	} else if dir == "D" {
		dy = -1
	} else if dir == "L" {
		dx = -1
	} else if dir == "R" {
		dx = 1
	}
	for count := 0; count < steps; count++ {
		nextPos = Coordinate{X: currPos.X + dx, Y: currPos.Y + dy, Steps: currPos.Steps + 1}
		wire = append(wire, currPos)
		currPos = nextPos
	}

	fmt.Printf("New position is X: %d, Y: %d\n", nextPos.X, nextPos.Y)

	return currPos, wire
}

func getWireInstructions(filename string) (string, string) {
	// Open the file
	file, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	// Ensure the file gets closed after this function finishes
	defer file.Close()

	scanner := bufio.NewScanner(file)

	lineNumber := 1
	var firstLine string
	var secondLine string

	// Loop through each line in the file
	for scanner.Scan() {
		if lineNumber == 1 {
			firstLine = scanner.Text()
			lineNumber += 1
		}
		if lineNumber == 2 {
			secondLine = scanner.Text()
		}
	}

	return firstLine, secondLine
}

func calculateClosestCrossover(crossoverPoints []Steps) int {
	closestDistance := 1000000

	for _, c := range crossoverPoints {

		distance := c.firstStep + c.secStep

		fmt.Printf("Distance is %d\n", distance)

		if closestDistance > distance {
			closestDistance = distance
		}
	}

	return closestDistance
}

func contains(s []Coordinate, elem Coordinate) (bool, Coordinate) {
	for _, v := range s {
		if v.X == elem.X && v.Y == elem.Y {
			return true, v
		}
	}
	return false, Coordinate{}
}

func main() {

	firstWireMapping := []Coordinate{}
	secondWireMapping := []Coordinate{}
	startPos := Coordinate{X: 0, Y: 0}
	stepsSlice := []Steps{}

	firstLine, secondLine := getWireInstructions(fileName)

	fmt.Println("Mapping first line")
	firstWire := mapWire(firstLine, firstWireMapping, startPos)
	fmt.Println("---------------------------\nMapping second line")
	secondWire := mapWire(secondLine, secondWireMapping, startPos)

	for _, coord := range firstWire {
		b, c := contains(secondWire, coord)
		if b && coord != startPos {
			stepsSlice = append(stepsSlice, Steps{firstStep: coord.Steps, secStep: c.Steps})
		}
	}

	closestDistance := calculateClosestCrossover(stepsSlice)

	fmt.Print(closestDistance)

}
