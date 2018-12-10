file = open("AdventCode-1-input")

# Initialises the variables
freq = 0          # Frequency of the device
iterations = 0    # Number of loops through the input
list = []

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




print freq

	
