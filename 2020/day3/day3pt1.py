# I accidentally did pt2 in this file instead of creating a new one
# To do part 1, just call calc_slope_trajectory(3,1) in main

def get_file_len(input):
    with open('day3/input.txt','r') as input:
        for i, l in enumerate(input):
            pass
    return i + 1


def read_file_into_matrix(input_file):

    slope = []

    lines = input_file.readlines()
    line_count = 0

    for line in lines:
        temp = []
        for char in line:
            if char != '\n':
                temp.append(char)
        slope.append(temp)
        line_count += 1

    #print("Slope: {}".format(slope))
    return slope


def calc_slope_trajectory(x_moves, y_moves):
    with open('day3/input.txt','r') as input_file:
        slope = read_file_into_matrix(input_file)
        num_lines = get_file_len(input_file)

        x = 0
        y = 0

        tree_counter = 0

        while y < num_lines:
            #print("y({}) is less than num_lines({})".format(y,num_lines))
            if x >= len(slope[y]):
                x %= len(slope[y])
                #print("x = {}".format(x))

            if slope[y][x] == '#':
                tree_counter += 1
            #print("Slope[{}][{}]: {}".format(y,x,slope[y][x]))
            x += x_moves
            y += y_moves

    print(tree_counter)
    return tree_counter



def day3pt1():
    run1 = calc_slope_trajectory(1, 1)
    run2 = calc_slope_trajectory(3, 1)
    run3 = calc_slope_trajectory(5, 1)
    run4 = calc_slope_trajectory(7, 1)
    run5 = calc_slope_trajectory(1, 2)

    final_answer = run1 * run2 * run3 * run4 * run5

    print("Final answer: {}".format(final_answer))




# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    day3pt1()