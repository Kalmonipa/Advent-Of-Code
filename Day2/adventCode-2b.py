
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

    while secElement < len(lines):
   	if lines[firstElement][char] == lines[secElement][char]:
            print "Char " + lines[firstElement][char] + " matches in element " + lines[firstElement] + " and " + lines[secElement+1]
	    if char == len(lines[firstElement]):
	    	break
	    else:
	    	char += 1
	    loopCounter += 1 
	else:
	    firstElement += 1
	    secElement += 1
	    char = 0
	    loopCounter += 1
    
    print "loopCounter: " + str(loopCounter)
    print lines


main()
