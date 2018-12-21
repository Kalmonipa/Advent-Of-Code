
def main():
    twoSame = 0
    threeSame = 0

    file = open("actualInput")

    lines = file.readlines()

    for line in lines:
        chars = []
        counter = []

        for char in line:
            counter.append(line.count(char))

        print "Line: " + line
        print "Counter: " + str(counter)

        if 2 in counter:
            twoSame += 1
        if 3 in counter:
            threeSame += 1

        print "twoSame: " + str(twoSame)
        print "threeSame: " + str(threeSame)
        print "------------------"

    print "Final twoSame: " + str(twoSame)
    print "Final threeSame: " + str(threeSame)

    checkSum = twoSame * threeSame

    print "checkSum: " + str(checkSum)


main()
