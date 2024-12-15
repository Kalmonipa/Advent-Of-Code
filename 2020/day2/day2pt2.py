import pandas as pd


def day2pt2():
    num_valid = 0
    with open('day2/input.txt','r') as input:
        lines = input.readlines()

        for line in lines :
            # Splits the input so we know the rules and the given password
            line_split = line.split(": ")
            policy = line_split[0]
            passwd = line_split[1]

            # Splits the policy so we know the required count and the letter that must reach the required count
            policy_split = policy.split(" ")

            policy_minmax = policy_split[0]
            policy_letter = policy_split[1]

            policy_minmax_split = policy_minmax.split("-")
            position_a = int(policy_minmax_split[0]) - 1
            position_b = int(policy_minmax_split[1]) - 1

            letter_count = 0

            if (passwd[position_a] == policy_letter and passwd[position_b] != policy_letter) or (passwd[position_b] == policy_letter and passwd[position_a] != policy_letter):
                num_valid += 1




            #print("Policy min: {} - Policy max: {} - Policy letter: {} - Password: {} - Letter count: {}".format(policy_min,policy_max,policy_letter,passwd, letter_count))
    print("Number of valid passwords: {}".format(num_valid))




# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    day2pt2()