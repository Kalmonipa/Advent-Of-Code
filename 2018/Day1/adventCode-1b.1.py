

freq = 0
list = []
dupes = []
	
file = open("AdventCode-1-input")
lines = file.readlines()

def frequency(freq,list):
	freq = freq
	list = list
	# Loops through the lines to add or subtract them from the frquency value
	for i in range(0, len(lines)):
		line = lines[i]
		symbol = line[0]
		num = line[1:]	
	
		if symbol == "-":
			freq -= int(num)
		else:
			freq += int(num)

		if freq not in list:
			list.append(freq)
		else:
			dupes.append(freq)
			break

	
	if len(dupes) == 0:
		frequency(freq,list)
	else: 
		print dupes[0]

frequency(freq,list)
