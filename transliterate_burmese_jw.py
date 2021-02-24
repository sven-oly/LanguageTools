#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function

import difflib
import os
import sys

import transliterate
import translit_burmese_rules

# ----------------- TESTING ------------------
def createTest():
  return

def transliterateFile(trans, encoding, fileName):
  # Open a file, read the text, and transliterate it, line by line.
  print('** transliterateFile %s for file %s' % (encoding, fileName))
  infile = codecs.open(fileName, "rb") #, "utf-8")
  print('infile = %s' % (infile))
  lineNum = 0
  for line in infile:
    print(lineNum)
    outline = trans.transliterate(line)
    print('%s\t%s' % (lineNum, outline))
    lineNum += 1
  return


def testXmlInput(file_path):
  xml_transliterator = transliterate.TranslitXML(file_path)
  # TODO: Now what to do with it!
  return xml_transliterator



my_myanmar_data = ['\u1000ြောင့်',
                   '\u1021ောင်း',
                   'သတင်း',
                   'နယ်မြေရှင်းလင်းရေး',
                   'သတင်းကြောင့် ရခိုင်မှာ',
                   'ရွာလုံးကျွတ် ထွက်ပြေးတာတွေ ရှိနေ']

my_latin_expected = ['kyount',
                     'aaungg',
                     'stinn',
                     'nalmyayshinnlinnrayy',
                     'stinnkyount rhkinemhar',
                     'rwarlonekyawat htwatpyaytartway shinay']


class TestData:
  def __init__(self, trans):
    self.translit = trans  # The transliterator to be applied

    # Burmese, Google Latin translit, Okell+ expected, English translation
    self.test_data = [
      [u'ဘဲ ဓာတ် ဂျင် သား', '', '', '', ''],
      [u'ဘဲ ', 'bhell', 'b-eh', 'yes', 'bɛ́'],
      [u' ဓာတ်', 'dharat', 'd-', 'battery', 'daʔ'],
      [u'ဂျင်', 'gyin', 'j-', 'gin', 'dʑɪ̀ɰ̃'],
      [u'သား', 'sarr', 'dh-', 'son', 'ðá'],
      [u'ဂုဏ်', 'gun', 'g-', 'honor', 'ɡòʊɰ̃'],

      [u'ဟုတ်', '', 'h-', '', 'hoʊʔ'],
      [u'ယား', '', 'y-', '', 'já'],
      [u'ကုန်', '', 'k-', '', 'kòʊɰ̃'],
      [u'ခုန်', '', 'hk-', '', 'kʰòʊɰ̃'],
      [u'လုပ်', '', 'l-', '', 'loʊʔ'],
      [u'လှုပ်', '', 'hl-', '', 'l̥oʊʔ'],

      [u'မတ်', '', '', '', 'maʔ'],
      [u'မှတ်', '', '', '', 'm̥aʔ'],
      [u'နမ်း', '', '', '', 'náɰ̃'],
      [u'နှမ်း', '', '', '', 'n̥áɰ̃'],
      [u'ခန်း', '', '', '', 'kʰàɰ̃'],
      [u'ညစ်', '', '', '', 'ɲɪʔ'],
      [u'ညှစ်', '', '', '', 'ɲ̥ɪʔ'],
      [u'ငါး', '', '', '', 'ŋá'],
      [u'ငှါး', '', '', '', 'ŋ̊á'],
      [u'ပဲ', '', '', '', 'pɛ́'],
      [u'ဖဲ', '', '', '', 'pʰɛ́'],
      [u'စာ', '', '', '', 'sà'],
      [u'ဆာ', '', '', '', 'sʰà'],
      [u'ရှာ', '', '', '', 'ʃà'],
      [u'တတ်', '', '', '', 'taʔ'],
      [u'ထပ်', '', '', '', 'tʰaʔ'],
      [u'ကြဉ်', '', '', '', 'tɕɪ̀ɰ̃'],
      [u'ချင်', '', '', '', 'tɕʰɪ̀ɰ̃'],
      [u'သတ်', '', '', '', 'θaʔ'],
      [u'ဝါး', '', '', '', 'wá'],
      [u'လက်ဝှေ့', '', '', '', 'lɛʔʍḛ'],
      [u'ဇာ', '', '', '', 'zà'],
      [u'အုတ်', '', '', '', 'ʔoʊʔ'],
      # Vowels
      [u'ီ', '', 'i', '', 'i'],
      [u'ိ', '', 'i', '', 'ḭ'],
      [u'ေ', '', 'ei', '', 'e'],
      [u'လက်', '', 'eh', '', 'ɛ'],
      [u'ာ', '', 'a', '', 'a'],
      [u'ါ', '', 'a', '', 'a̰'],
      [u'ော်', '', 'o', '', 'ɔ'],
      [u'ော', '', 'o', '', 'ɔ'],
      [u'ို', '', 'ou', '', 'o'],
      [u'ု', '', 'u', '', 'u'],
      [u'ူ', '', 'u', '', 'ṵ'],
      [u'လောက် ကောင်း', '', 'au', '', 'aʊ'],
      [u'ရိုက် တိုင်း', '', 'ai', '', 'ai'],
      [u'ကုတ် ကုန်', '', 'ou', '', 'oʊ'],
      [u'အခု', '', 'ə', '', 'əhku'],

    ]

    # Burmese, Google Latin translit, Okell+ expected, English translation
    self.test_data_long = [
      # https://www.bbc.com/burmese/live/burma-56091207
      ['အာဏာသိမ်း', 'aarnarsaim', '', 'coup', ''],
      ['စစ်ကောင်စီ', 'hcaitkaunghce', '', 'military council', ''],
      ['ချုပ်ကိုင်ထားတဲ့', 'hkyaotekine htarrtae', '', 'controlled', ''],
      ['င်တာနက်၀က်ဘ်ဆိုက်', 'ng tar naat 0 at bh site', '', 'Internet Website', ''],
      ['စာမျက်နှာတွေ အတိုက်အခိုက်', 'hcarmyetnhartway aatiteaahkite', '' 'pages attack'],
      ['ခံခဲ့ရပြီးတဲ့နောက်', 'hkanhkaer pyeetaenout', '', 'after suffering', ''],
      ['ညပိုင်းမှာတော့ ၄ ည', 'nyapinemhartot 4 ny', '', 'in the evening, 4 nights', ''],
      ['ဆက်', 'saat', '', 'continue', ''],
      ['အဖြစ်', 'aahpyit', '', 'as', ''],
      ['တတိုင်းပြည်လုံးကို', 'tatinepyilone ko', '', 'the whole country', ''],
      ['စစ်တပ်က', 'hcaittautk', '', 'the military', ''],
      ['အင်တာနက်', 'aaintarnaat', '', 'the Internet', ''],
      ['ဖြတ်တောက်ပါတယ်။', 'hpyattout partaal', '', 'Cut', ''],
    ]

  def test(self):
    results = []
    for item in self.test_data:
      input = item[0]
      result = self.translit.transliterate(input)
      results.append([item, result])

    return results

def main(argv=None):

  # The transliterator object
  trans = None

  # TODO: Test XML input and parsing
  if len(argv) > 1:
    path = os.path.splitext(argv[1])
    base_file_name = os.path.basename(argv[1])

    if path[1] == '.xml':
      cwd = os.getcwd()
      trans = xml_transliterator = testXmlInput(argv[1])


  # Get the transliterator data
  if not trans:
    trans = transliterate.Transliterate(translit_burmese_rules.TRANSLIT_MY_OKELL_JW,
                                        'description', debug=True)

  if not trans:
    print('Cannot create transliterator')
    return

  #trans.printSummary()

  test_data = TestData(trans)
  output = test_data.test()

  for out in output:
    print('%s → %s' % (out[0][0].encode('utf-8'), out[-1].encode('utf-8')))
#    print('%s' % (out[-1]))  # Just the transliterated result

  # Start testing the transliterator with Burmese text.
  
  return

if __name__ == "__main__":
    print('ARGS = %s' % sys.argv) 
    sys.exit(main(sys.argv))
