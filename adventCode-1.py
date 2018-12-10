file = open("AdventCode-1-input")

freq = 0

lines = file.readlines()

def minus(freq,num):
        freq = freq - int(num)

def plus(freq,num):
        freq = freq + int(num)

for i in range(0, len(lines)):
	
	line = lines[i]
	symbol = line[0]
	num = line[1:]	
	
	if symbol == "-":
		freq -= int(num)
	else:
		freq += int(num)

print freq

	
