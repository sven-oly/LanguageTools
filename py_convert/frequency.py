import re
import sys

# print ('Number of arguments: %d' % (len(sys.argv)))
# print ('Argument List: %s ' % str(sys.argv))

# Get the frequency of each word in a text, sorting the list
# https://www.geeksforgeeks.org/python-count-occurrences-of-each-word-in-given-text-file-using-dictionary/

# Open the file in read mode
infile_name = '/Users/craig/Desktop/Projects/Laz_Mingrelian/Mingrelian_text.txt'
#infile_name = '/Users/craig/Desktop/Projects/Laz_Mingrelian/Sarpi_moleni_master_28.01.2021.txt'

if len(sys.argv) >= 1:
  infile_name = sys.argv[1]

text = open(infile_name, "r")

# Create an empty dictionary
d = dict()

# Loop through each line of the file
for line in text:
        # Remove the leading spaces and newline character
        line = line.strip()

        # Convert the characters in line to
        # lowercase to avoid case mismatch
        line = line.lower()

        # Split the line into words
        words = re.split("[\s\-]", line)

        # Iterate over each word in line
        for word in words:
          # If it's all digits or periods, skip.
          if re.match(r'^([\-q:\“\”\*\.\s\d]+)$', word):
            continue
          # Strip sequence of dots, digits, punctuation, etc.
          word = re.sub(r'[\.\;\!]+', '', word, 10)
          word = re.sub(r'[\-\u2013•]+', '', word, 10)
          word = re.sub(r'[²\(\)_…;:\“\,©̣~\[\]\'0-9\?\”\„\«\»]+', '', word, 10)
          # Check if the word is already in dictionary
          if not word:
            # Nothing left
            continue
          if word in d:
            # Increment count of word by 1
            d[word] = d[word] + 1
          else:
            # Add the word to dictionary with count 1
            d[word] = 1

# Print the contents of dictionary
for w in sorted(d, key=d.get, reverse=True):
    print(d[w], w)

    
