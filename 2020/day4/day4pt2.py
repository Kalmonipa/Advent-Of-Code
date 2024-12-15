import re

# Removes any \n from inside the strings
def remove_newlines(passports):
    x = 0
    passports_len = len(passports)

    while x < passports_len:
        passports[x] = passports[x].replace('\n', ' ')
        x += 1

    return passports


def check_field_valid(key, value):
    is_valid = False

    if key == 'byr':
        if 1920 <= int(value) <= 2002:
            is_valid = True
            return is_valid

    elif key == 'iyr':
        if 2010 <= int(value) <= 2020:
            is_valid = True
            return is_valid

    elif key == 'eyr':
        if 2020 <= int(value) <= 2030:
            is_valid = True
            return is_valid

    elif key == 'hgt':
        #print("Key: {} - value: {}".format(key, value))
        if value[-2:] == 'cm':
            if value[:3].isdigit():
                if 150 <= int(value[:3]) <= 193:
                    is_valid = True
                    return is_valid
        elif value[-2:] == 'in':
            if value[:2].isdigit():
                if 59 <= int(value[:2]) <= 76 :
                    is_valid = True
                    return is_valid

    elif key == 'hcl':
        if value[0] == '#':
            #print(value[1:5])
            for char in value[1:5]:
                if re.match("[0-9a-f]", char):
                    is_valid = True
                    return is_valid

    elif key == 'ecl':
        eye_colours = ['amb','blu','brn','gry','grn','hzl','oth']
        if value in eye_colours:
            is_valid = True
            return is_valid

    elif key == 'pid':
        count = 0
        for char in value:
            if re.match('[0-9]', char):
                count += 1
        if count == 9 and len(value) == 9:
            is_valid = True
            return is_valid

    elif key == 'cid':
        is_valid = True
        return is_valid

    print("Key {} with value {} is not valid".format(key, value))
    return is_valid

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
            passport_contains_cid = False

            for fields in temp_passport:
                (key, value) = fields.split(':')
                dict[key] = value

                if (key in req_fields or key == 'cid') and check_field_valid(key, value):
                    if key == 'cid':
                        passport_contains_cid = True
                    #print("We're finding valid fields")
                    valid_fields += 1
                else:
                    break
            print("Dictionary: {}".format(dict))
            print("Dictionary length: {}".format(len(dict)))
            if passport_contains_cid == False:
                if valid_fields >= len(req_fields):
                    print("Increasing the number of valid passports")
                    valid_passports += 1
            elif passport_contains_cid == True:
                if valid_fields >= len(req_fields) + 1:
                    print("Increasing the number of valid passports")
                    valid_passports += 1

        print(valid_passports)



if __name__ == '__main__':
    day4pt1()