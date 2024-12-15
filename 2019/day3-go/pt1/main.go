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
	fileName         = "../short-input.txt"
	firstWireMapping []Coordinate
	currPos          = Coordinate{X: 0, Y: 0}
	crossoverPoints  []Coordinate
)

type Coordinate struct {
	X, Y int
}

func mapFirstWire(instrLine string) {

	instr := strings.Split(instrLine, ",")

	//fmt.Println("Instructions are: ", instr)

	for _, i := range instr {
		//fmt.Println(i)

		dir := string(i[0])
		steps, err := strconv.Atoi(i[1:])
		if err != nil {
			log.Fatal(err)
		}

		// fmt.Println(string(dir))
		// fmt.Println(steps)

		switch dir {
		case "U":
			fmt.Printf("Moving up by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosY := currPos.Y + 1
				firstWireMapping = append(firstWireMapping, Coordinate{X: currPos.X, Y: newPosY})
				currPos = Coordinate{X: currPos.X, Y: newPosY}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "D":
			fmt.Printf("Moving down by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosY := currPos.Y - 1
				firstWireMapping = append(firstWireMapping, Coordinate{X: currPos.X, Y: newPosY})
				currPos = Coordinate{X: currPos.X, Y: newPosY}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "R":
			fmt.Printf("Moving right by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosX := currPos.X + 1
				firstWireMapping = append(firstWireMapping, Coordinate{X: newPosX, Y: currPos.Y})
				currPos = Coordinate{X: newPosX, Y: currPos.Y}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "L":
			fmt.Printf("Moving left by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosX := currPos.X - 1
				firstWireMapping = append(firstWireMapping, Coordinate{X: newPosX, Y: currPos.Y})
				currPos = Coordinate{X: newPosX, Y: currPos.Y}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		}
	}
}

func mapSecondWire(instrLine string) {

	currPos = Coordinate{X: 0, Y: 0}

	instr := strings.Split(instrLine, ",")

	for _, i := range instr {

		dir := string(i[0])
		steps, err := strconv.Atoi(i[1:])
		if err != nil {
			log.Fatal(err)
		}

		switch dir {
		case "U":
			fmt.Printf("Moving up by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosY := currPos.Y + 1
				newCoord := Coordinate{X: currPos.X, Y: newPosY}
				if contains(firstWireMapping, newCoord) {
					crossoverPoints = append(crossoverPoints, newCoord)
				}
				currPos = Coordinate{X: currPos.X, Y: newPosY}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "D":
			fmt.Printf("Moving down by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosY := currPos.Y - 1
				newCoord := Coordinate{X: currPos.X, Y: newPosY}
				if contains(firstWireMapping, newCoord) {
					crossoverPoints = append(crossoverPoints, newCoord)
				}
				currPos = Coordinate{X: currPos.X, Y: newPosY}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "R":
			fmt.Printf("Moving right by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosX := currPos.X + 1
				newCoord := Coordinate{X: newPosX, Y: currPos.Y}
				if contains(firstWireMapping, newCoord) {
					crossoverPoints = append(crossoverPoints, newCoord)
				}
				currPos = Coordinate{X: newPosX, Y: currPos.Y}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		case "L":
			fmt.Printf("Moving left by %d steps\n", steps)
			for count := 0; count < steps; count++ {
				newPosX := currPos.X - 1
				newCoord := Coordinate{X: newPosX, Y: currPos.Y}
				if contains(firstWireMapping, newCoord) {
					crossoverPoints = append(crossoverPoints, newCoord)
				}
				currPos = Coordinate{X: newPosX, Y: currPos.Y}
			}
			fmt.Printf("New position is X: %d, Y: %d\n", currPos.X, currPos.Y)
		}
	}
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

func calculateClosestCrossover() int {
	closestDistance := 1000000

	for _, c := range crossoverPoints {
		absX := absInt(c.X)
		absY := absInt(c.Y)

		distance := absX + absY

		if closestDistance > distance {
			closestDistance = distance
		}
	}

	return closestDistance
}

func contains(s []Coordinate, elem Coordinate) bool {
	for _, v := range s {
		if v == elem {
			return true
		}
	}
	return false
}

func absInt(n int) int {
	if n < 0 {
		return -n
	}
	return n
}

func main() {
	firstLine, secondLine := getWireInstructions(fileName)

	// fmt.Println(firstLine)
	// fmt.Println(secondLine)

	fmt.Println("Mapping first line")
	mapFirstWire(firstLine)
	fmt.Println("---------------------------\nMapping second line")
	mapSecondWire(secondLine)

	fmt.Print(crossoverPoints)

	closestDistance := calculateClosestCrossover()

	fmt.Print(closestDistance)

}
