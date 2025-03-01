#!/bin/bash

DAYNUM=$1

if [ $DAYNUM = "-h" ]; then
  echo "Usage: ./provision-day.sh X"
  echo "    Replace X with the day number you want to create files for"
  echo "    It will copy files from the base dir into a new dir for that day"
fi

DIRECTORY="day${DAYNUM}"

if [ -d "$DIRECTORY" ]; then
  echo "$DIRECTORY already exists. Exiting"
  exit 0
fi

echo "Creating $DIRECTORY dir"

mkdir $DIRECTORY

# Copy ts files
cp base/*.ts $DIRECTORY/

# Copy input files
cp base/*.txt $DIRECTORY/
