def int_code(opcodes):
    in_pointer = 0
    continuing = True

    # print(opcodes)
    # print(type(opcodes[index]))

    while continuing:
        if opcodes[in_pointer] == 99:
            print("in_pointer == 99. Stopping")
            continuing = False
            return opcodes[0]
        elif opcodes[in_pointer] == 1:
            #print(f"opcodes before change: {opcodes}")
            pos_one = opcodes[in_pointer + 1]
            pos_two = opcodes[in_pointer + 2]
            pos_three = opcodes[in_pointer + 3]
            #print(f"pos_one == {pos_one} , pos_two == {pos_two} , pos_three == {pos_three} , index == {in_pointer}")
            opcodes[pos_three] = opcodes[pos_one] + opcodes[pos_two]
            #print(f"opcodes after change: {opcodes}")
            in_pointer += 4
        elif opcodes[in_pointer] == 2:
            #print(f"opcodes before change: {opcodes}")
            pos_one = opcodes[in_pointer + 1]
            pos_two = opcodes[in_pointer + 2]
            pos_three = opcodes[in_pointer + 3]
            #print(f"pos_one == {pos_one} , pos_two == {pos_two} , pos_three == {pos_three} , index == {in_pointer}")
            opcodes[pos_three] = opcodes[pos_one] * opcodes[pos_two]
            #print(f"opcodes after change: {opcodes}")
            in_pointer += 4


def main():
    noun = 0
    verb = 0

    while noun <= 99:
        verb = 0
        while verb <= 99:
            with open("input.txt", "r") as input_file:
                for c in input_file.readlines():
                    opcodes = c.split(',')

                for i in range(0, len(opcodes)):
                    opcodes[i] = int(opcodes[i])

                print(f"noun == {noun} , verb == {verb}")
                opcodes[1] = noun
                opcodes[2] = verb

                pos_zero = int_code(opcodes)
                if pos_zero == 19690720:
                    print(f"Noun == {noun} , Verb == {verb}")
                    print(f"Answer is {(100 * noun) + verb}")
                    noun = 100
                    verb == 100
                elif pos_zero != 19690720:
                    verb += 1
        noun += 1



    print(f"Final opcodes: {opcodes}")


main()