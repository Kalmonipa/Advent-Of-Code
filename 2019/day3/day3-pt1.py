with open('input','r') as input_file:

    wire_paths = []
    intersections = []

    for path in input_file.read().splitlines():
        #print(path)

        movements =[]
        orig_x = 0
        orig_y = 0
        curr_x = 0
        curr_y = 0

        for coord in path.split(','):
            #print(coord)
            direction = coord[0]
            movement = int(coord[1:])

            #print(f"Currently at {curr_y} Y and {curr_x} X")

            if direction == "U":
                #print(f"Moving up {movement} spaces")
                while curr_y < (orig_y + movement):
                    movements.append([curr_x,curr_y])
                    curr_y += 1
                orig_y = curr_y
            elif direction == "D":
                #print(f"Moving down {movement} spaces")
                while curr_y > (orig_y - movement):
                    movements.append([curr_x,curr_y])
                    curr_y -= 1
                orig_y = curr_y
            elif direction == "R":
                #print(f"Moving right {movement} spaces")
                while curr_x < (orig_x + movement):
                    movements.append([curr_x, curr_y])
                    curr_x += 1
                orig_x = curr_x
            elif direction == "L":
                #print(f"Moving left {movement} spaces")
                while curr_x > (orig_x - movement):
                    movements.append([curr_x, curr_y])
                    curr_x -= 1
                orig_x = curr_x
            #print(movements)

        wire_paths.append(movements)

    #print(wire_paths)

    path_one = wire_paths[0]
    path_two = wire_paths[1]
    path_one_ind = 0
    path_two_ind = 0

    #print(f"path one is {len(path_one)} , path two is {len(path_two)}")

    while path_one_ind < len(path_one):

        path_two_ind = 0
        while path_two_ind < len(path_two):
            #print(f"Path one index is {path_one_ind} , Path two index is {path_two_ind}")
            if path_one[path_one_ind] == [0,0]:
                path_one_ind += 1
            elif path_two[path_two_ind] == [0,0]:
                path_two_ind += 1
            elif path_one[path_one_ind] == path_two[path_two_ind]:
                intersections.append(path_one[path_one_ind])
                path_two_ind += 1
            elif path_one[path_one_ind] != path_two[path_two_ind]:
                path_two_ind += 1
        path_one_ind += 1

    print(intersections)


    closest_int_dist = 1000000
    closest_int = [0,0]

    start_x = 0
    start_y = 0
    for point in intersections:
        int_x = point[0]
        int_y = point[1]

        if int_x < 0:
            int_x = int_x * -1
        if int_y < 0:
            int_y = int_y * -1

        distance = int_x + int_y
        print(f"Point {point} is {distance} away from origin. Current closest is {closest_int_dist}")

        if distance < closest_int_dist:
            closest_int_dist = distance
            closest_int = point

    print(f"Point {closest_int} is {closest_int_dist} away from origin")