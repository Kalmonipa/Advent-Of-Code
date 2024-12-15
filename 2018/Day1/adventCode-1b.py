

freq = 0
list = []

def freqLoop(freq,list = []):
	# Initialises the variables
	freq = freq
	list = list
	iterations = 0    # Number of loops through the input	
	
	file = open("AdventCode-1-input")
	lines = file.readlines()


	# Loops through the lines to add or subtract them from the frquency value
	for i in range(0, len(lines)):
		
		line = lines[i]
		symbol = line[0]
		num = line[1:]	
	
		if symbol == "-":
			freq -= int(num)
		else:
			freq += int(num)

		if freq in list:
			print freq
			break
		else:
			list.append(freq)
	
	freqLoop(freq,list)


freqLoop(freq,list)	
