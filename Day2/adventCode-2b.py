
def main():
    file = open("actualInput")

    lines = file.readlines()

    firstChar = ""
    secondChar = ""
    firstLine = []
    secLine = []

    for line in lines:

        for char in line:
            firstLine.append(char)



main()
