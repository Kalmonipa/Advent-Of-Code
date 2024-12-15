def main():
    filepath = 'input'
    inputFile = open(filepath)

    total = 0

    for line in inputFile.readlines():

        module_mass = int(line)

        while module_mass > 6:
            module_fuel = int(module_mass / 3) - 2
            total += module_fuel

            module_mass = module_fuel

    print("Final total: " + str(total))

main()
