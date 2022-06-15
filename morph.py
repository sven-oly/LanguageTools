# Some first ideas on data structures for representing the morpology of a language's
# verbs (conjugation) and nouns (declension)

# Zero: what's the goal?
# To create the forms of verbs, given the root and informaiton
# about the type of irregularity

# Must consider etre, avoir
# Classes of vers: -er, -ir, -re

# First, what to represent

# e.g., French verbs
# person, number, tense, mood

# infinitive, gerund, particple

# Le form passive

# Le form pronominal

# First try for data structures and rules

# How to deal with irregularities

# For each mood, there are tensese

verbesIrregular = {
    'etre': 'how',
    'faire': 'how'  # what tense, mooe
}

class Mood():
    def _init_(self);
      self.tenses = []
    
class Tense():
    def _init_(self, name, endings, mood='indicatif'):
        self.label = name
        self.auxiliary = ''
        # Present
        self.endings = endings  # '-er', '-ir', ... with exceptions
        self.mood = mood
        
    def stem(self):
        # For present subjonttif
        # third person plural of present indicatif
        return stemmingBase(5, 'presentIndicative')
        

class presentTense = class(Tense):
    def _init_(self):
        self.label = 'present',
        self.endings = { '-er' : ['-e', '-es', '-e', '-ons', '-ez', '-ent'],  # for -er
                         '-ir' : ['-is', '-is', '-it', '-issons', '-issez', '-issen'],  # for -er
                         '-re':  ['-s',  '-s', '-' , '-ons', '-ez', '-ent']
        }
        self.mood = 'indicatif'

    def stemBase(self):
        return 'infinitive;

    def provideStem(self):
        # What it gives to other tenses
        return 

     def personNumber(person, number, verb):
        index = person + number * 3
        verbClass = verb.class
        result = verb.stem(self.label) + self.endings[verbClass][index]
        return result

class verb():
    def _init_(self, vClass, infinitive  ):
        self.verbClass = vClass
        self.regular = True
        self.exceptions = None

# How to attach specific processing to each 

imparfaitTense = Tense(
    'imparfait',
    { '*': ['-ais', '-ais', '-ait', '-ions', '-iez', '-aient']
      }
    )

passeComposeTense = Tense(
    'passeCompose',
    {
        }
    )

presentSubjonctif = Tense(
    'present'
    { '*': '-e', '-es', '-e', '-ions', '-iez', '-ent',
    },
    'subjonctif'
)
                    
class verb():
    def _init_(self):
        infinitive = ''
        stem = ''
        class = 'er'  # or 'ir' or 're'
        regular = True
        auxiliaryVerb = ''  # either avoir or etre

    def present(self):
        match self.class:
          case 'er':
          return
        case 'ir':
          return
        case 're':
          return
        default:
          return
    
        
        return
    def passeCompose():
        return
    
    def imparfait():
        return

    def futureSimple():
        return

    def plusQueParfait():
        return

    def passeSimple():
        return

    def futurAnterieur():
        return

    def conditionnelPresent():
        return

    def conditionnelPasse():
        return

    def subjontifPresent():
        return

    def subjontifPasse():
        return
    
    def subjontifImparfait():
        return

    def subjontifPlusQueParfait():
        return

    def imperatif(tense):
        return

    def infinitif(tense):
        return

    def participe(tense):
        

    
