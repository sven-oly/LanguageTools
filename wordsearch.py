#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Starting with
#   https://codereview.stackexchange.com/questions/98247/wordsearch-generator
from __future__ import print_function
#from builtins import range
#from builtins import object
import itertools
import logging
import math
import random
import sys
from random import randint

# Set up fill letters, including those with diacritics.
# Should we done something with statistics?
# Check for bad words?

try:
  unichr
except NameError:
  unichr = chr

upper_letters = u'ꠞꠔꠂꠥꠤꠧꠙꠣꠡꠖ?ꠉꠢꠎꠇꠟꠐꠌꠥꠛꠘꠝ'
lower_letters = u'ꠞꠔꠂꠥꠤꠧꠙꠣꠡꠖ?ꠉꠢꠎꠇꠟꠐꠌꠥꠛꠘꠝ'

letters = lower_letters

debug = True

# Characters that combine with neighboring values to make grapheme clusters
combiningChars = set([unichr(x) for x in range(0x300, 0x365)] + ['\u2018'])

# Constants for word from the starting point
RIGHT, DOWN, DOWNRIGHT, UPRIGHT, LEFT, UP, UPLEFT, DOWNLEFT = 0, 1, 2, 3, 4, 5, 6, 7
DIRECTIONS = [RIGHT, DOWN, DOWNRIGHT, UPRIGHT, LEFT, UP, UPLEFT, DOWNLEFT]
DIR_OFFSETS = {
  RIGHT: [0,1],
  DOWN: [1, 0],
  DOWNRIGHT:[1, 1],
  UPRIGHT:[1, -1],
  LEFT: [0, -1],
  UP: [-1, 0],
  UPLEFT: [-1, -1],
  DOWNLEFT: [1, -1],
}
DIR_WORDS = ['right', 'down', 'down right', 'up right', 'left', 'up', 'up left', 'down left']


#### THE NEW IMPLEMENTATION.
class Position(object):
  def __init__(self, x=0, y=0, dir=RIGHT):
    self.tokens = []
    self.word = ''
    self.x = x
    self.y = y
    self.positions = []  # The grid locations for all
    self.direction = dir
    self.reversed = dir > UPRIGHT # Are the tokens in inverse order?
    self.clue = None  # For crossword, show this

  def genPositions(self, length):
    # Creates the positions from the start, size, direction, reverse
    offset = DIR_OFFSETS[self.direction]
    self.positions = [(self.x, self.y)]
    for i in range(1, length):
      self.positions.append((self.positions[i-1][0] + offset[0],
                             self.positions[i-1][1] + offset[1]))
    return

  def setTokens(self, tokens):
    self.tokens = tokens
    self.word = ''.join(tokens)

class WordSearch(object):
  def __init__(self, words=None):
    # Get the fill characters
    self.grid = None
    self.words = words  # The original inputs
    self.token_list = None  # The tokenized word lists.
    self.do_diagonal = True
    self.do_reverse = True
    self.size = 0
    self.width = 0
    self.height = 0
    self.wordlist = None
    self.answers = None
    self.current_level = 0
    self.max_level = 0

    self.max_solutions = 2  # Maximum number of solutions to be returned.

    self.all_directions = ['r', 'd', 'dr', 'ur']
    self.level_answer = []  # Levels with tentative inserts
    self.setFillLetters(letters)  # The tokens for the language

    self.current_solution = []  # List of the positions for the tokens in order.
    self.solutions_list = []  # For storing multiple results
    self.optimize_flag = False  # Set if the "best" one is desired
    self.total_tests = 0  # How many testWordInsert calls made
    self.backtracks = 0  # Number of failed word inserts
    self.failed_inserts = 0  # Number of failed word inserts
    self.cells_filled = 0  # Now many filled with words.

    if self.words:
      self.token_list = []
      for word in self.words:
        self.token_list.append(self.getTokens(word, None))
    # By reversed length of token list.
    self.token_list.sort(key=len, reverse=True)
      #self.token_list = [self.getTokens(x) for x in self.words].sort(key=len, reverse=True)
    self.max_level = len(self.token_list)

    self.size = len(self.token_list[0])
    logging.info('INIT self.size = %s' % self.size)
    self.width = self.height = self.size


  def generate(self, size=0, tries=None, num_solutions=None):
    logging.info('generate size = %s' % size)
    logging.info('generate self.size = %s' % self.size)
    if size > 0:
      self.size = self.width = self.height = max(size, self.size)
      self.generateGrid()

    result = self.generateLevel()

    self.finishGrid()

  def setFillLetters(self, fill_letters):
    self.fill_tokens = self.getTokens(fill_letters, None)

  def generateGrid(self):
    # set it up based on the
    if not self.token_list:
      return None

    self.grid = [[' ' for _ in range(self.size)] for __ in range(self.size)]

  def generateLevel(self):
    # A depth first search for positioning the word at current level
    # Are we done?
    this_level = self.current_level
    if this_level >= self.max_level:
      # This one is OK.
      self.rememberSolution()
      return True

    # Otherwise, this level needs to be searched.
    # Generate the possible positions for this word
    these_tokens = self.token_list[this_level]
    possible_positions = self.generateOptions(these_tokens)
    # Randomize the order of these.
    random.shuffle(possible_positions)

    # Take the last one and try to position it. If it fits, then go to next level.
    while len(possible_positions) > 0:
      test_position = possible_positions[-1]  # The last one
      placed_ok = self.testWordInsert(these_tokens, test_position)
      if placed_ok:
        self.insertToGrid(these_tokens, test_position)
        self.current_level += 1
        self.current_solution.append(test_position)
        test_position.setTokens(these_tokens)
        result = self.generateLevel()  # The recursive call.
        if result == True:
          # Should we continue?
          num_solutions_found = len(self.solutions_list)
          # TODO: decide if we replace the solution, keep it in the list, or just end
          return True
        else:
          # Next level didn't work
          # Remove from grid if set at this level
          self.backtracks += 1
          for pos in test_position.positions:
            y, x = pos[0], pos[1]
            value = self.grid[y][x]
            if value[-1] == self.current_level:
              self.grid[y][x] = ' '  # Clear/

      # Remove this possible position and try again
      self.failed_inserts += 1
      possible_positions.pop()

      # TODO: Remove from the grid.
    self.current_solution.pop()

    self.current_level -= 1
    return False  # At this point, all the possibilites are exhausted at this level.

  def rememberSolution(self):
    # Keep this solution as
    # TODO: Get the solution as a list of all the placements.
    self.solutions_list.append(self.current_solution)
    # TODO: evaluate this solution?

  def generateOptions(self, tokens):
    # Given the grid and the token, find all the places
    # where it could be placed, given grid size and
    # number of tokens in the word
    positions = []
    length1 = len(tokens) - 1
    for dir in DIRECTIONS:
      offset = (DIR_OFFSETS[dir][0] * length1, DIR_OFFSETS[dir][1] * length1)
      for x in range(0, self.width):
        for y in range(0, self.height):
          xend, yend = x + offset[0], y + offset[1]
          if xend >= 0 and xend < self.width and yend >= 0 and yend < self.height:
            pos = Position(x, y, dir)
            pos.genPositions(length1 + 1)
            positions.append(pos)
    return positions

  def insertToGrid(self, tokens, position):
    # Put the word at the next level
    for i in range(len(position.positions)):
      pos = position.positions[i]
      current_val = self.grid[pos[0]][pos[1]]
      if current_val and current_val == ' ':
        # Add at this level
        self.grid[pos[0]][pos[1]] = [tokens[i], self.current_level]
      else:
        # Value is already set at a previous level
        pass

  def testWordInsert(self, tokens, position):
    self.total_tests += 1
    fits = True
    for i in range(len(position.positions)):
      pos = position.positions[i]
      current_val = self.grid[pos[0]][pos[1]]
      if current_val and current_val != ' ' and current_val[0] != tokens[i]:
        return False
    return fits

  def revertWordAtLevel(self):
    return True

  def evaluateGrid(self):
    # Returns something about the compactness and overlap
    return

  def finishGrid(self):
    # Fills in the blank spaces as needed
    self.cells_filled = 0

    numTokens = len(self.fill_tokens)
    for i, j in itertools.product(list(range(self.width)), list(range(self.height))):
      if self.grid[i][j] == ' ' or self.grid[i][j] == '':
        self.grid[i][j] = self.fill_tokens[randint(0, numTokens - 1)]
      else:
        self.cells_filled += 1
    return

  def deliverHints(self):
    # Either the words in the list or the clues
    return

  def getTokens(self, word, diacriticSet):
    '''Get the tokens, not code points.'''
    # TODO: make this smarter utf-16 and diacritics.
    vals = list(word)
    retval = []
    index = 0
    while index < len(vals):
      item = ''
      char = vals[index]
      v = ord(vals[index])

      if v >= 0xd800 and v < + 0xdbff:
        item += vals[index] + vals[index + 1]
        index += 2
      else:
        item += vals[index]
        index += 1

      # TODO!!! Consider diacritics as well as
      if index < len(vals):
        logging.info('Next = %s, in set = %s' % (vals[index], vals[index in DiacriticSet]))
      while (index < len(vals) and
        (vals[index] in DiacriticSet or vals[index] in combiningChars)):
        # It's a combining character. Add to the growing item.
        item += vals[index]
        index += 1
      retval.append(item)
    return retval

  def printGrid(self):
    print('GRID SOLUTION of size %s' % self.size)
    for row in self.grid:
      for item in row:
        if type(item) is list:
          print(' %s%s ' % (item[0].encode('utf-8'), item[1]), end=' ')
        else:
          # Put in a flag to print _ in the fill spaces.
          print(' %s  ' % item, end=' ')  # '_'.encode('utf-8'),
      print()

  def formatAnswers(self):
    answers = {}
    for sol in self.solutions_list:
      for pos in sol:
        answers[pos.word] = (pos.positions, pos.word, pos.reversed, DIR_WORDS[pos.direction])
    return answers

  def printSolution(self):
    print('Solution:')
    for sol in self.solutions_list:
      for pos in sol:
        print('%s, %s, reversed = %s' % (''.join(pos.tokens),
          DIR_WORDS[pos.direction], pos.reversed))
        print('  %s' % pos.positions)

  def printStats(self):
    # Output information about the last run.
    print('%s solutions' % len(self.solutions_list))
    print('%s total tests' % self.total_tests)
    print('%s total backtracks' % self.backtracks)
    print('%s failed insert' % self.failed_inserts)
    print('%s cells filled by words' % self.cells_filled)

#### THE OLD IMPLEMENTATION.

def makeGrid(words, fillList, diacritics, size=[10, 10], attempts=10, is_wordsearch=True):
  '''Run attemptGrid trying attempts number of times.

    Size contains the height and width of the board.
    Word is a list of words it should contain.'''

  if debug:
    logging.info('makeGrid: size = %s, is_wordsearch = %s' %
                 (size, is_wordsearch))
  diacriticsSet = set(diacritics)

  tokenList = [getTokens(x, diacriticsSet) for x in words].sort(key=len, reverse=True)
  for attempt in range(attempts):
    if debug:
      logging.info('makeGrid: try = %s' % (attempt))
    try:
      return attemptGrid(words, size, fillList, diacriticsSet, is_wordsearch)
    except RuntimeError as e:
      logging.error('AttemptGrid error %s' % e)
      pass
  logging.info("ERROR - Couldn't create valid board")
  return None, None


def attemptGrid(words, size, fillList, diacriticSet, is_wordsearch=True):
  '''Attempt a grid of letters to be a wordsearch

    Size contains the height and width of the board.
    Word is a list of words it should contain.
    Returns the 2D list grid and a dictionary of the words as keys and
    lists of their co-ordinates as values.'''

  #logging.info('fillList = %s' % fillList)
  #logging.info('diacriticSet = %s' % diacriticSet)

  # Make sure that the board is bigger than even the biggest set of tokens
  tokenList = []
  for w in words:
    newTokens = getTokens(w, diacriticSet)
    tokenList.append(newTokens)

  sizeCap = (size[0] if size[0] >= size[1] else size[1])
  sizeCap -= 1
  if any(len(tokens) > sizeCap for tokens in tokenList):
    logging.info("ERROR: Too small a grid for supplied words: %s" % words)
    return None, None

  grid = [[' ' for _ in range(size[0])] for __ in range(size[1])]

  # Insert answers and store their locations
  answers = {}
  for index in range(0, len(words)):
    word = words[index]
    tokens = tokenList[index]
    grid, answer, reversed = insertWord(tokens, grid, None, is_wordsearch)
    if answer[0][0] == answer[-1][0]:
      direction = 'row'
    elif answer[0][1] == answer[-1][1]:
      direction = 'column'
    else:
      direction = 'diagonal'

    if reversed:
      # Put the coordinates in the right order
      answer.reverse()

    answers[word] = [answer, reversed, word, direction]

  # Add other characters to fill the empty space, if needed.
  if is_wordsearch:
    fillEmptyGridSlots(fillList, grid, size)

  return grid, answers


def fillEmptyGridSlots(letters, grid, size):
  # Add other characters to fill the empty space
  if isinstance(letters, list):
    fillChars = letters
  else:
    fillChars = letters.split(',')

  numTokens = len(fillChars)
  for i, j in itertools.product(list(range(size[1])), list(range(size[0]))):
    if grid[i][j] == ' ':
      rInt = randint(0, numTokens - 1)
      grid[i][j] = fillChars[rInt]


def insertWord(tokens, grid, invalid, is_wordsearch):
  '''Insert a word into the letter grid

    'word' will be inserted into the 2D list grid.
    invalid is either None or a list of coordinates
    These coordinates are denote starting points that don't work.
    Returns an updated grid as well as a list of the added word's indices.'''

  height, width = len(grid), len(grid[0])
  # TODO: Use the number of combined characters, not just length.
  length = len(tokens)

  if is_wordsearch:
    max_dir = 3
  else:
    max_dir = 1  # For crossword

  # Detect whether the word can fit horizontally or vertically.
  hori = width >= length + 1
  vert = height >= length + 1
  diag = False
  if hori and vert:
    # If both can be true, flip a coin to decide which it will be
    rint = randint(0, max_dir)
    hori = vert = diag = False
    if rint == 0:
      hori = True
      direction = 'x'
    elif rint == 1:
      vert = True
      direction = 'y'
    elif rint == 2:
      diag = True
      direction = 'dd'
    else:
      diag = True
      direction = 'du'

  line = []  # For storing the letters' locations
  if invalid is None:
    invalid = [[None, None, True], [None, None, False]]

  # new: Generate all the positions at which this word can start.
  positions = []
  for x in range(0, width - length):
    for y in range(0, height - length):
      positions.append([x, y])

  # Now generate a starting coordinate from the above.
  num_positions = len(positions)
  if num_positions < 1:
    print('only one position')
  rand_pos = randint(0, num_positions - 1)
  x = positions[rand_pos][0]
  y = positions[rand_pos][1]

  # Height * width is an approximation of how many attempts we need
  # Get a random position that fits
  for _ in range(height * width):
    if direction == 'x':
      x = randint(0, width - 1 - length)
      y = randint(0, height - 1)
    elif direction == 'y':
      x = randint(0, width - 1)
      y = randint(0, height - 1 - length)
    elif direction == 'dd':
      x = randint(0, width - 1 - length)
      y = randint(0, height - 1 - length)
    else:
      # Diagonal up
      x = randint(0, width - 1 - length)
      y = randint(length - 1, height - 1)

    if not is_wordsearch:
      # Make sure x and y are even values, so the grid is more open
      if x % 2:
        x -= 1
      if y %2:
        y -= 1

    if [y, x, direction] not in invalid:
      break

  else:
    # Probably painted into a corner, raise an error to retry.
    raise (RuntimeError)

  start = [y, x, direction]  # Saved in case of invalid placement
  # logging.info('Start = %s' % start)
  if is_wordsearch:
    do_reverse = bool(randint(0, 1))
  else:
    do_reverse = False  # Not for crossword

  # Now attempt to insert each letter
  if do_reverse:
    tokens.reverse()
  line = tryPlacingWord(tokens, x, y, direction, grid)

  if line:
    for i, cell in enumerate(line):
      grid[cell[0]][cell[1]] = tokens[i]
    return grid, line, do_reverse
  else:
    # If it didn't work, we could try the reversed word.
    # But for now, just quit.

    invalid.append(start)
    return insertWord(tokens, grid, invalid, is_wordsearch)


# Returns True if the word fits at the given spot with given direction.
# Returns False if it doesn't fit.
def tryPlacingWord(tokens, x, y, direction, grid):
  line = []  # For storing the letters' locations

  for letter in tokens:
    try:
      if grid[y][x] in (' ', letter):  # Check if it's the letter or a blank.
        line.append([y, x])
        if direction == 'x':
          x += 1
        elif direction == 'y':
          y += 1
        elif direction == 'dd':
          # And handle diagonal down, too!
          x += 1
          y += 1
        else:
          # And handle diagonal up!
          x += 1
          y -= 1
      else:
        return False
    except IndexError:
      print('IndexError x,y: [%s, %s]' % (x, y))

  return line


def getTokens(word, diacriticSet=None):
  '''Get the tokens, not code points.'''
  vals = list(word)
  retval = []
  index = 0
  while index < len(vals):
    item = ''
    v = ord(vals[index])

    if v >= 0xd800 and v < + 0xdbff:
      item += vals[index] + vals[index + 1]
      index += 2
    else:
      item += vals[index]
      index += 1
    keepOn = True
    while keepOn and index < len(vals):
      char = vals[index]
      if char in diacriticSet or char in combiningChars:
          # It's a combining character. Add to the growing item.
          item += vals[index]
          index += 1
      else:
        keepOn = False
    retval.append(item)
  return retval


def printGrid(grid):
  '''Print the grid in a friendly format.'''

  width = len(grid[0])
  print ("+" + ('---+' * width))

  for i, line in enumerate(grid):
    print (u"| " + u" | ".join(line) + u" |")
    print ("+" + ('---+' * width))


def printAnswers(answers):
  for answer in answers:
    # print(' %s: %s' % answer, answers[answer])
    print(answer, answers[answer])


# Runs with an array of words
def generateWordsGrid(words, fillList=None, diacritics=None):
  # Set the size to us bot the maximum word length and total tokens .
  diacriticSet = set(diacritics)
  wordTokens = [getTokens(w, diacriticSet) for w in words]
  tokenSizes = [len(s) for s in wordTokens]
  max_xy = max(tokenSizes)
  totalTokens = sum(tokenSizes)
  # Grid width/height should be at least a factor times the number of tokens
  factor = 1.2
  grid_size = int(math.ceil(max(max_xy, factor * math.sqrt(totalTokens))))
  grid, answers = makeGrid(words, fillList, diacritics, [grid_size, grid_size], 10, True)
  return grid, answers, words, grid_size


# Use the new Depth First Search method with size suggestion, etc.
def generateDFSWordSearch(words, size=0, tries=None, num_solutions=1):
  ws = WordSearch(words)
  logging.info('words = %s' % words)
  logging.info('size = %s, tries = %s, num_solutions = %s' % (size, tries, num_solutions))
  ws.generate(size, tries, num_solutions)

  return ws


def generateCrosswordsGrid(words):
  # Make a grid with no reversals, no diagonals

  # Don't fill in the empty spaces
  max_xy = 0
  total_tokens = 0

  for word in words:
    # logging.info(word)
    logging.info("*** GET TOKENS ***")
    tokens = getTokens(word, None)
    total_tokens += len(tokens)
    if len(tokens) > max_xy:
      max_xy = len(tokens)
  # Updated max_xy since it will be an open grid.
  max_xy = int(1.5 * max_xy)
  logging.info('generateCrosswordsGrid max size = %s ' % (max_xy))
  logging.info('fillList  = %s ' % (fillList))

  grid, answers = makeGrid(words, fillList, diacritics, [max_xy + 1, max_xy + 1], 10, False)
  return grid, answers, words, max_xy + 1


# Runs with a set grid
def testGrid():
  words = [u'𐓣𐓟𐓷𐓣͘', u' 𐓡𐓪𐓷𐓘͘𐓤', u'𐓏𐒰𐓓𐒰𐓓𐒷', u'𐒻𐒷𐓏𐒻͘ ', u'𐓈𐒻𐓍𐒷', u'𐒹𐓂𐓏𐒷͘𐒼𐒻',
           u'𐓇𐓈𐓂͘𐓄𐒰𐓄𐒷', u'𐒰̄𐓍𐓣𐓟𐓸𐓟̄𐓛𐓣̄𐓬', u'𐒼𐒰𐓆𐒻𐓈𐒰͘', u'𐓏𐒰𐓇𐒵𐒻͘𐒿𐒰 ',
           u'𐒻𐓏𐒻𐒼𐒻', u'𐓂𐓍𐒰𐒰𐒾𐓎𐓓𐓎𐒼𐒰']
  max_xy = 0
  total_tokens = 0

  longest_word = None
  for word in words:
    tokens = getTokens(word)
    # logging.info('word, tokens = %s, %s ' % (word, len(tokens)))
    total_tokens += len(tokens)

    if len(tokens) > max_xy:
      longest_word = word
      max_xy = len(tokens)
  # logging.info('max size = %s, %s ' % (max_xy, longest_word))
  grid, answers = makeGrid(words, fillList, diacritics, [max_xy + 1, max_xy + 1], 10, False)
  return grid, answers, words, max_xy + 1


def testNewWordSearch(words, args):
  print('args = %s' % args)
  if args > 1:
    size = int(args[1])
  else:
    size = 13
  max_tries = 1000
  num_solutions = 1
  ws = generateDFSWordSearch(words, size, max_tries, num_solutions)

  print('%s words = %s' % (len(ws.token_list), [len(x) for x in ws.token_list]))
  print('max tokens = %s' % ws.size)
  print()
  ws.printGrid()
  print('%s solutions found' % len(ws.solutions_list))
  print('Statistics\n')
  ws.printStats()
  ws.printSolution()

def testSyl():
  words = 'ꠗꠣꠞꠣ ꠢꠇꠟ ꠝꠣꠘꠥꠡ ꠡꠣꠗꠤꠘꠜꠣꠛꠦ ꠢꠝꠣꠘ ꠁꠎ꠆ꠎꠔ ꠀꠞ ꠢꠇ ꠟꠁꠀ ꠙꠄꠖꠣ ‘ꠅꠄ ꠔꠣꠁꠘꠔꠣꠁꠘꠞ ꠛꠤꠛꠦꠇ ꠀꠞ ꠀꠇꠟ ꠀꠍꠦ ꠅꠔꠣꠞ ꠟꠣꠉꠤ ꠢꠇꠟꠞ ꠄꠇꠎꠘꠦ ꠀꠞꠇꠎꠘꠞ ꠟꠉꠦ ꠛꠤꠞꠣꠖꠞꠤꠞ ꠝꠘ ꠟꠁꠀ ꠀꠌꠞꠘ ꠇꠞꠣ ꠃꠌꠤꠔ'.split(' ')
  fillList = 'ꠀ,ꠁ,ꠃ,ꠄ,ꠅ,ꠇ,ꠈ,ꠉ,ꠊ,ꠌ,ꠍ,ꠎ,ꠏ,ꠐ,ꠑ,ꠒ,ꠓ,ꠔ,ꠕ,ꠖ,ꠗ,ꠘ,ꠙ,ꠚ,ꠛ,ꠜ,ꠝ,ꠞ,ꠟ,ꠠ,ꠡ,ꠢ'.split(',')
  diacritics = set([u'\ua802',u'\ua806', u'\ua80b', u'\ua823', u'\ua824', u'\ua825', u'\ua826', u'\ua827'])
  generateWordsGrid(words, fillList, diacritics)

def main(args):
  testSyl()

if __name__ == "__main__":
  print('ARGS = %s' % sys.argv)
  sys.exit(main(sys.argv))
