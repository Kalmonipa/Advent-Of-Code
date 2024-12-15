with open("input.txt", "r") as input_file:
    for c in input_file.readlines():
        opcodes = c.split(',')

    for i in range(0, len(opcodes)):
        opcodes[i] = int(opcodes[i])

    index = 0
    continuing = True

    print(opcodes)
    #print(type(opcodes[index]))

    while continuing:
        if opcodes[index] == 99:
            print("Stopping")
            continuing = False

        elif opcodes[index] == 1:
            print(f"opcodes before change: {opcodes}")
            pos_one = opcodes[index + 1]
            pos_two = opcodes[index + 2]
            pos_three = opcodes[index + 3]
            print(f"pos_one == {pos_one} , pos_two == {pos_two} , pos_three == {pos_three} , index == {index}")

            opcodes[pos_three] = opcodes[pos_one] + opcodes[pos_two]
            print(f"opcodes after change: {opcodes}")

            index += 4

        elif opcodes[index] == 2:
            print(f"opcodes before change: {opcodes}")
            pos_one = opcodes[index + 1]
            pos_two = opcodes[index + 2]
            pos_three = opcodes[index + 3]
            print(f"pos_one == {pos_one} , pos_two == {pos_two} , pos_three == {pos_three} , index == {index}")


            opcodes[pos_three] = opcodes[pos_one] * opcodes[pos_two]
            print(f"opcodes after change: {opcodes}")

            index += 4

    print(f"Final opcodes: {opcodes}")