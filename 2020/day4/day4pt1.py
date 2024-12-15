import json


# Removes any \n from inside the strings
def remove_newlines(passports):
    x = 0
    passports_len = len(passports)

    while x < passports_len:
        passports[x] = passports[x].replace('\n', ' ')
        x += 1

    return passports


def day4pt1():

    with open('day4/input.txt', 'r') as input_file:

        contents = input_file.read()

        passports = contents.split('\n\n')

        passports = remove_newlines(passports)

        #print(passports)

        req_fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
        valid_passports = 0

        for passport in passports:
            dict = {}

            temp_passport = passport.split()
            valid_fields = 0

            for fields in temp_passport:
                (key, value) = fields.split(':')
                dict[key] = value
                if key in req_fields:
                    valid_fields += 1
            if valid_fields >= len(req_fields):
                valid_passports += 1

        print(valid_passports)



if __name__ == '__main__':
    day4pt1()