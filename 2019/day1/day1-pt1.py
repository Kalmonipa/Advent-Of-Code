
def main():

    filepath = 'input'
    inputFile = open(filepath)

    total = 0

    for line in inputFile.readlines():
        line = int(line)
        divideThree = int(line / 3)
        minusTwo = (divideThree - 2)
        
        total = total + minusTwo

        print('Line: ' + str(line))
        print('Divided by 3: ' + str(divideThree))
        print('Minus 2: ' + str(minusTwo))

    print(total)
main()


