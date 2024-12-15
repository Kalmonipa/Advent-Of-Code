

def day1():
    with open('day1/input.txt','r') as input:
        lines = input.readlines()

        #print(lines[0])

        for line1 in lines :
            for line2 in lines :
                if (int(line1) + int(line2)) == 2020 :
                    print(int(line1) * int(line2))
                    break


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    day1()

