twoSame = 0
threeSame = 0


def checkLines(line, twoSame, threeSame):
    chars = []
    counter = []

    for char in line:
        counter.append(line.count(char))

    print line
    print counter

    if 2 in counter:
        twoSame += 1
    if 3 in counter:
        threeSame += 1

    print twoSame
    print threeSame




def main():


    file = open("testInput")

    lines = file.readlines()

    for line in lines:
        checkLines(line, twoSame, threeSame)

    print twoSame
    print threeSame

main()
