#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function

import difflib
import os
import sys

import transliterate

# ----------------- TESTING ------------------
def createTest():
  sampleRule = u"""
$consonant = [A-Z];
A > E;
#($consonant) > X;
(x)(yz) > $2 | $1;
N > Y|es;
es > y\=;
"""
  trans = transliterate.Transliterate(sampleRule, True)
  intext = \
    """A CY cy H 3AH. က\n Now is the time for All conscious people coming to califHorniA.
    xyz
    """
  out_text = trans.transliterate(intext)
  print('createText: output = %s' % (out_text))

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
  try:
    xml_transliterator = transliterate.TranslitXML(file_path)
  except FileNotFoundError:
    xml_transliterator = None
  # TODO: Now what to do with it!
  return xml_transliterator

kaalden_latin_data_1 = [u'Goonga;', u'Kaalden Goonga.',
                        u'Winndannde',
                        u'Winndannde Malal Sammba Gise Ñalnde 23 mars 2019, ',
                        u'golle kaantoriɗɗe mbaɗaama leydi Mali.',
                        u'Mboɗo sikki jojjaani ko eɗen ngarta heen, ',
                        u'so en tuugniima e konngi ɗi Pulaar wiyi e mumen ',
                        u'« ko gumɗo yiyi weejii, kono kadi ko paho nani saaktiima ».']


expected_output_1 = [u"𞤘𞤮𞥅𞤲'𞤺𞤢⁏",
                     "𞤑𞤢𞥄𞤤𞤣𞤫𞤲 𞤘𞤮𞥅𞤲'𞤺𞤢.",
                     "𞤏𞤭𞤲𞤣𞤢𞤲𞤣𞤫",
                      "‮𞤏𞤭𞤲𞤣𞤢𞤲𞤣𞤫 𞤃𞤢𞤤𞤢𞤤 𞤅𞤢𞤥𞤦𞤢 𞤘𞤭𞤧𞤫 𞤙𞤢𞤤𞤲'𞤣𞤫 𞥒𞥓 𞤥𞤢𞤪𞤧 𞥒𞥐𞥑𞥙⹁ ",
                      "‮𞤺𞤮𞤤𞥆𞤫 𞤳𞤢𞥄𞤲𞤼𞤮𞤪𞤭𞤯𞥆𞤫 𞤲'𞤦𞤢𞤯𞤢𞥄𞤥𞤢 𞤤𞤫𞤴𞤣𞤭 𞤃𞤢𞤤𞤭.",
                      "‮𞤐'𞤄𞤮𞤯𞤮 𞤧𞤭𞤳𞥆𞤭 𞤶𞤮𞤶𞥆𞤢𞥄𞤲𞤭 𞤳𞤮 𞤫𞤯𞤫𞤲 𞤲'𞤺𞤢𞤪𞤼𞤢 𞤸𞤫𞥅𞤲⹁ ",
                      "‮𞤧𞤮 𞤫𞤲 𞤼𞤵𞥅𞤻𞤭𞥅𞤥𞤢 𞤫 𞤳𞤮𞤲𞤺𞤭 𞤯𞤭 𞤆𞤵𞤤𞤢𞥄𞤪 𞤱𞤭𞤴𞤭 𞤫 𞤥𞤵𞤥𞤫𞤲 ",
                      "‮« 𞤳𞤮 𞤺𞤵𞤥𞤯𞤮 𞤴𞤭𞤴𞤭 𞤱𞤫𞥅𞤶𞤭𞥅⹁ 𞤳𞤮𞤲𞤮 𞤳𞤢𞤣𞤭 𞤳𞤮 𞤨𞤢𞤸𞤮 𞤲𞤢𞤲𞤭 𞤧𞤢𞥄𞤳𞤼𞤭𞥅𞤥𞤢 ».",
                      ]
kaalden_latin_data =[
"""Kaalden Goonga. Winndannde Malal Sammba Gise
Ñalnde 23 mars 2019, golle kaantoriɗɗe mbaɗaama leydi Mali. Mboɗo sikki jojjaani ko eɗen ngarta heen, so en tuugniima 
e konngi ɗi Pulaar wiyi e mumen « ko gumɗo yiyi weejii, kono kadi ko paho nani saaktiima ». Gila fuɗnaange haa 
hiirnaange, rewo haa worgo, wulaango ko wooto. E nder ɗuum, Al Hajji Baaba Maal ene yettee, sabu o tabitinii ko o 
wiyi diɗɗal makko « Daande Leñol » koo. Tawde so ɓalndu memaama tan daande joom mum nanete, waɗde nde leñol memaa, 
Daande Leñol nanaama. Pulaar kay ene wiya « hay ɗuurnaade ko e hare jeyaa, saka noon yoɓtoraade ɗemngal mum ». 
Ene siftina en ɗo Joomiraaɗo wiynoo « so a yiyii ko boni ene waɗee, haɗir junngu maa. So a hattanaano, haɗir ɗemngal 
maa. So tawii kadi ɗuum ne nafaani, haɗir ɓernde maa, woni ɗuurnaade baɗɗo ɗum mo a waawanaa oo ». 
Won kadi ko teski-ɗen e kaaɗoo haala, so won e fulɓe wiyde, « tawde Makki Sal ko pullo, tee kañum tolnondiri e 
Ibiraahiima Buubakar Keytaa, waɗde, kañum yoo haal heen ». Kono tan dee, o haalaani, walla mbiyen en nanaani.
 E nder ɗuum, ene moƴƴi citinen anndunooɓe, kadi nganndinen ɓe, ceɓor-ɗen to humpito, no ardiiɓe leyɗeele liggododirtoo
Makki Sal ko mawɗo Leydi Senegaal, mo Senegaalnaaɓe koolii totti ɗum lefol laamu. Kanko fof e wonde pullo, 
o laamanaaki fulɓe tan. Yanti heen, Senegaal ko leydi njogiindi ndimaagu mum, ngu hay gooto alaa hattan ñaayde. 
Ko noon ne kadi, leydi Mali ko leydi ndimɗundi, jogiindi jojjanɗe mum ɗe hay gooto alaa hakke ñaayde. So en 
njerondirii e galleeji, so koɗdiiɗo maa waɗii ajaande e galle mum, woodan maa tan ko arde paabo-ɗaa, paaboro-ɗaa 
waaju e maslahaa, so a ronkii ngullitoyo-ɗaa to ɓuri toowde. Kono wonaa kay huutoraade doole, walla yooɓaade daande 
aɗa wulla, mbele ene wiyee « Ii kanko dee o haali ». Njiɗ-mi siftinde en, ko so tawii mawɗo waɗii ko boni, so mawɗo 
ene waajoo ɗum, waajotaako ɗum e mbedda. Sikke alaa, Makki welaaka ko waɗi koo. Kono mbele ene aaɓnotonoo, yooɓaade 
mo daande omo wiya «Ibiraahiima, faabo leñol am leeɓteteengol ngol». Jaabawol ngol kay ko « alaa ». Tawde Hammee Lih 
rokkiino deftere mum tiitoonde « Ɗalee mawɓe ndeena », enen ne, so ko wayi nii waɗii, pot-ɗen wiyde ko « Ɗalee ardiiɓe 
kaalda ». So en ngummiima to Makki, ngarten e Muritani, ɗo innitortooɓe « Sukaaɓe Tabital Pulaagu » njuɓɓinnoo seppo
 e yeeso Ammbaasad Mali. Pulaar ene wiya, « so hunuko tuƴƴii konngol moƴƴol heewaani yaltude e mum ». Kono neɗɗo kadi, 
 so baawɗo ɗum fiyii ɗum, tawde waawaa fiytaade kam, maa haal ko sikki ene yaltina mette mum. Ko ɗuum waɗi ko haalaa 
 koo haalaa, ko dukaa koo dukaa. Njiɗ-ɗen ko etaade faamde ko cikku-ɗen saabinoo dadiiɓe Laamu Muritani ene kaɗa seppo 
 ngoo waɗde e laawol gadanol ngol, haa woodi gaañiiɓe heen. Hay sinno noon, caggal ɗuum, ɓe ɗalii ngo waɗi. Mbele eɓe 
 mbelaa walla eɓe mettaa ko waɗi Mali koo, ɗuum ko naamnal ngal miin kam mi alaanaa jaabawol, sabu Pulaar ene wiya 
 « reedu ko fayannde, kono ko joom mum tan anndi ko defaa e mayre ». Ko mbaaw-ɗen wiyde tan, ko so tawii leyɗeele 
 ngostondirii ammbaasduuji, ko haa ngootiri heen fof daña mo ene lijitana ɗum haajuuji mum e leydi ngoɗndi ndii. 
 Ene e ɗiin haajuuji, habrude laamɗo mum kala ko haaletee e kala ko waɗatee e leydi ndi jooɗanii ɗum ndii. E nder 
 ɗuum noon, won ko gooto heen fof waawaa waɗde, so ɗum alaa oya wiyata ko tooñannge. Ko ɗuum waɗi, Laamu jaɓataa 
 ɓesngu mum ene yenna laamu koɗdiiɗo mum. Sabu ene waawi jibinde fitinaaji goɗɗi. Ko ɗuum waɗi, so tawii dadiiɓe 
 Muritani njiyii sukaaɓe mum ene njenna laamu leydi ngoɗndi, kaɗat woto oya wiyde « aan kay ma a taw ko onon ngondi 
 e ko ɓe mbaɗata koo ». Rewa heen noon « maa laaɓ, ñamlel ko joɓel ». Tawde noon eɗen nganndi laamɓe, baɗoowo heen 
 ko alaa ella woodaani, gooto e maɓɓe fof hulata ko so nde mum yontii, woto oya ne waɗdde ko wayi noon. Tonngirten 
 kaaɗoo haala ko naamnal: mbele en cikkaani, potno-ɗen ko waɗde sete ñaago-ɗen mawɗo leydi oo nde waajotoo nanndo mum, 
 tawa eɗen nawori doggol yimɓe jaɓɓe miijo men ngoo ciifi ?"""
]


def testAdlam(xml_transliterator):
  item_index = 0
  for inline, expected in zip(kaalden_latin_data_1, expected_output_1):
    expected = expected.replace("\u202E", "")
    outline = xml_transliterator.transliterate(inline)
    print('Test %d:\n     >>%s<<\n  %4d   >>%s<<\n %4d   >>%s<<' % (
      item_index, inline, len(expected), expected, len(outline), outline))
    if outline != expected:
      print('Difference in expected data 1')
      diffs = difflib.context_diff(expected, outline, fromfile='before.py', tofile='after.py')
      sys.stdout.writelines(diffs)
    item_index += 1

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


def testMyanmarLatin(xml_transliterator):
  item_index = 0
  for inline, expected in zip(my_myanmar_data, my_latin_expected):
    outline = xml_transliterator.transliterate(inline)
    print('Test %d:\n     >>%s<<\n  %4d   >>%s<<\n %4d   >>%s<<' % (
      item_index, inline, len(expected), expected, len(outline), outline))
    if outline != expected:
      print('Difference in expected data 1')
      diffs = difflib.context_diff(expected, outline, fromfile='before.py', tofile='after.py')
      sys.stdout.writelines(diffs)
    item_index += 1

def testBasic():
    test_input = ['cxyzd']
    expected = ['cyzqd']
    raw_rules ="""\
(x)(yz) > $2 | $1;
x > q;
a { b } c > B;
{ b } d > BD;
b } d > BD-;
a { b > AB;
a { b } > AB-;
"""
    translit = transliterate.Transliterate(raw_rules, 'Testing new ')
    item_index = 0
    for inline, expected in zip(test_input, expected):
      outline = translit.transliterate(inline)
      print('Test %d:\n     >>%s<<\n  %4d   >>%s<<\n %4d   >>%s<<' % (
        item_index, inline, len(expected), expected, len(outline), outline))
      if outline != expected:
        print('Difference in expected data 1')
        diffs = difflib.context_diff(expected, outline, fromfile='before.py', tofile='after.py')
        sys.stdout.writelines(diffs)
      item_index += 1


def testContext():
  print('*** Context Rules')
  ContextRules = \
    """{γ } γ > n;
    {γ } κ > n;
    {γ } ξ > n;
    {γ } χ > n;
    γ > g;
    γ > g;
    κ > k;
    ξ > x;
    χ > ch;
"""
  test_input = ['γγ', 'γκ', 'γξ', 'γχ', 'γ']
  expected = ['ng', 'nk', 'nx', 'nch', 'g']

  translit = transliterate.Transliterate(ContextRules, 'Testing new ')
  item_index = 0
  for inline, expected in zip(test_input, expected):
    outline = translit.transliterate(inline)
    print('Test %d:\n     >>%s<<\n  %4d   >>%s<<\n %4d   >>%s<<' % (
      item_index, inline, len(expected), expected, len(outline), outline))
    if outline != expected:
      print('Difference in expected data 1')
      diffs = difflib.context_diff(expected, outline, fromfile='before.py', tofile='after.py')
      sys.stdout.writelines(diffs)
    item_index += 1


def main(argv=None):

  # TODO: Test XML input and parsing

  if len(argv) > 1:
    path = os.path.splitext(argv[1])
    base_file_name = os.path.basename(argv[1])

    if path[1] == '.xml':
      xml_transliterator = testXmlInput(argv[1])

    if base_file_name == 'Latin_Adlam.xml':
      testAdlam(xml_transliterator)
      return
    if base_file_name == 'Myanmar-Latin.xml':
      testMyanmarLatin(xml_transliterator)
      return
  else:
    # Basic test
    #testBasic()
    createTest()
#    testContext()
  return

  # Old testss
  if len(argv) > 1:
    print(argv)
    inType = argv[1]
    inFile = argv[2]
    print(inType, inFile)

    if inType == 'knu':
      trans = Transliterate(translit_knu.TRANS_LIT_RULES)
      encoding = 'knu'
    elif inType == 'zawgyi':
      trans = Transliterate(translit_zawgyi.TRANS_LIT_RULES)
      encoding = 'zawgyi'
    elif inType == 'uni_mon':
      trans = Transliterate(translit_zawgyi.UNIMON_UNICODE_TRANSLITERATE)
      encoding = 'uni_mon'
    elif inType == 'shanthai':
      trans =  None  # Transliterate(translit_zawgyi.SHANTHAI_TRANSLITERATE)
      encoding = 'shanthai'
  
    transliterateFile(trans, encoding, inFile)
    return

  trans = transliterate.Transliterate(translit_zawgyi.ZAWGYI_UNICODE_TRANSLITERATE)
  
  # New is not working yet.
  trans = Transliterate(ZAWGYI_UNICODE_TRANSLITERATE_2)
  trans.summary()
  testPhase1a(trans)
  testPhase1(trans)
  testPhase2(trans)
  biggerTest(trans)
  biggerTest2(trans)

  #return
  
  test1 = u'ေျခႀက'  # 1031 103b 1001 1080 1000
  result1 = trans.transliterate(test1)
  print('Output is %s' % result1)

  print('-------------\n')
  test2 = uStringsToText(u'\u1000\u1064')
  result2 = trans.transliterate(test2)

  print('Output 2 is %s' % result2)
  
  print('-------------\n')

  # biggerTest()
  
  return


if __name__ == "__main__":
    print('ARGS = %s' % sys.argv) 
    sys.exit(main(sys.argv))
