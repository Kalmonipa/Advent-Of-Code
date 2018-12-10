file = open("AdventCode-1")

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
		minus(freq,num)
	else:
		plus(freq,num)

	print freq

	
