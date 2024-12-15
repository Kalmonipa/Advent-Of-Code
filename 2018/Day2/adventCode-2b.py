
def main():
    file = open("testInput")

    lines = file.read().splitlines()

    firstChar = ""
    secondChar = ""
    firstLine = []
    secLine = []
    firstElement = 0
    secElement = 1
    char = 0
    loopCounter = 0
    diffChar = 0 # Counts the number of different characters in the strings. If more than one then it moves on to the next string

    while firstElement < len(lines) and secElement < len(lines):
        #print "firstEle: " + str(firstElement)
        #print "secEle: " + str(secElement)
        if lines[firstElement][char] == lines[secElement][char] and diffChar <= 1:
            print "Char " + lines[firstElement][char] + " matches in element " + lines[firstElement] + " and " + lines[secElement]
            if char < len(lines[firstElement]):
	    	    char += 1
	            loopCounter += 1
        else:
	        #firstElement += 1
            diffChar += 1
            secElement += 1
            char = 0
            loopCounter += 1
        if secElement == len(lines):
            firstElement += 1

    print "loopCounter: " + str(loopCounter)
    print lines


main()
