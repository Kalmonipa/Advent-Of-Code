twoSame = 0
threeSame = 0

def checkLines(line):
    chars = []
    counter = []

    for char in line:
        chars.append(char)
        counter.append(0)

        


def main():

    file = open("testInput")

    lines = file.readlines()

    for line in lines:
        checkLines(line)
