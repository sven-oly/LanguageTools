from __future__ import print_function

# ----------------- TESTING ------------------
# TODO: Factor out the tests.
def biggerTest(trans):
  # A little more text. Title of the ThanLWinSoft test.
  zString = u'က်န္းမာေရး နည္းလမ္း မ်ား'
  expectedU = u'ကျန်းမာရေး နည်းလမ်း များ'

  result1 = trans.transliterate(zString)
  print('in = %s' % zString)
  print('out = %s' % result1)
  
  if result1 == expectedU:
    print('ThanLWinSoft title passes')
  else:
    print('ThanLWinSoft title fails. result = %s' % result1)
    print(' Expected hex = %s' % uStringToHex(expectedU))
    print(' Result1  hex = %s' % uStringToHex(result1))


def biggerTest2(trans):
  # A little more text. 2nd paragraph of the ThanLWinSoft test.
  zString = u'က်န္းမာေရး ႏွင့္ ျပည့္စုံ ရန္ အတြက္ ေဆာင္႐ြက္ ရန္ နည္းလမ္း မ်ား ကို သိရွိ လိုက္နာ ရ ပါ မည္။ အစားအေသာက္၊ အအိပ္အေန၊ ေလ့က်င့္ခန္း ႏွင့္ သန့္႐ွင္း မႈ တို့ သည္ က်န္းမာေရး အတြက္ လိုအပ္ခ်က္ မ်ား ျဖစ္ ပါ သည္။ အစားအစာ သည္ အသက္ ႐ွင္ မႈ အတြက္ အထူး လိုအပ္ခ်က္ ျဖစ္ ပါ သည္။ ကြၽႏ္ုပ္ တို့ သည္ အသက္ ႐ွင္ ေနႏိုင္ ရန္ အစာ စား ရ ျခင္း ျဖစ္ ၿပီး စားေသာက္ ရန္ အသက္ ႐ွင္ ေန ျခင္း မ ဟုတ္ ပါ။ က်န္းမာ မႈ အတြက္ သင့္ေတာ္ သည့္ ပ⁠႐ို⁠တိန္း၊ သတၱဳ ဓာတ္ မ်ား ႏွင့္ ဗီတာမင္ မ်ား မ်ား စြာ ပါ ဝင္ သည့္ အစာ မ်ား ကို ရယူ စား သုံး ရန္'
  expectedU = u'ကျန်းမာရေး နှင့် ပြည့်စုံ ရန် အတွက် ဆောင်ရွက် ရန် နည်းလမ်း များ ကို သိရှိ လိုက်နာ ရ ပါ မည်။ အစားအသောက်၊ အအိပ်အနေ၊ လေ့ကျင့်ခန်း နှင့် သန့်ရှင်း မှု တို့ သည် ကျန်းမာရေး အတွက် လိုအပ်ချက် များ ဖြစ် ပါ သည်။ အစားအစာ သည် အသက် ရှင် မှု အတွက် အထူး လိုအပ်ချက် ဖြစ် ပါ သည်။ ကျွန်ုပ် တို့ သည် အသက် ရှင် နေနိုင် ရန် အစာ စား ရ ခြင်း ဖြစ် ပြီး စားသောက် ရန် အသက် ရှင် နေ ခြင်း မ ဟုတ် ပါ။ ကျန်းမာ မှု အတွက် သင့်တော် သည့် ပ⁠ရို⁠တိန်း၊ သတ္တု ဓာတ် များ နှင့် ဗီတာမင် များ များ စွာ ပါ ဝင် သည့် အစာ များ ကို ရယူ စား သုံး ရန်'

  result1 = trans.transliterate(zString)
  # print 'in = %s' % zString
  # print 'out = %s' % result1
  
  if result1 == expectedU:
    print('biggerTest2 passes')
  else:
    print('biggerTest2 fails. result = %s' % result1)
    # print ' Expected hex = %s' % uStringToHex(expectedU)
    # print ' Result1  hex = %s' % uStringToHex(result1)


def testPhase1a(transliterator):
  z1 = u'\u1002\u103a\u1064\u1005\u1072'
  e1 = u'င်္ဂျင်္စီင်္ဆံ'  # u'\u1004\u103A\u1039\u1002\u1038'
  result1 = transliterator.transliterate(z1)
  print('  hex = %s' % uStringToHex(result1))
  print('  text = %s' % result1.encode('utf-8'))


def testPhase1(transliterator):
  z1 = u'\u1002\u103a\u1064\u1005\u108c\u1006\u108d\u106a\u1025\u102e'
  e1 = 'င်္ဂျင်္စီင်္ဆံ'  # u'\u1004\u103A\u1039\u1002\u1038'
  result1 = transliterator.transliterate(z1)
  if result1 == e1:
    print('test#1 passes')
  else:
    print('test#1 fails. result = %s' % result1)
    print('  hex = %s' % uStringToHex(result1))


def testPhase2(transliterator):
  z1 = u'\u1006\u103a\u108c\u1033\u1044\u1039\u1025\u103a\u1036\u103b\u103c\u1004'
  e1 = 'င်္ဆျီု|၎်ဥျံြွင'
  result1 = transliterator.transliterate(z1)
  print('testPhase2 gives %s' % uStringToHex(result1))
  if result1 == e1:
    print('testPhase2 passes')
  else:
    print('testPhase2 fails. result = %s' % result1)
    print('  Result hex =   %s' % uStringToHex(result1))
    print('  Expected hex = %s' % uStringToHex(e1))


def testList(transliterator):
  zList = [
    u'\u1006\u103a\u108c\u1033\u1044\u1039\u1025\u103a\u1036\u103b\u103c\u1004',
    u'\u1002\u103a\u1064\u1005\u108c\u1006\u108d\u106a\u1025\u102e',
    u'\u1002\u103a\u1064\u1005\u1072']
  resultList = transliterator.transliterate(zList)
  
  eList = [u'င်္ဆျီု|၎်ဥျံြွင', u'င်္ဂျင်္စီင်္ဆံ', u'င်္ဂျင်္စီင်္ဆံ']
  for i in range(len(resultList)):
    if resultList[i] == eList[i]:
      print('  testList %d passes' % i)
    else:
      print('  testList %d fails' % 1)
      print('  Z input =      %s' % uStringToHex(zList[i]))
      print('  Result hex =   %s' % uStringToHex(resultList[i]))
      print('  Expected hex = %s' % uStringToHex(eList[i]))    


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
  
def main(argv=None):
 
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

  trans = Transliterate(translit_zawgyi.ZAWGYI_UNICODE_TRANSLITERATE)
  
  # New is not working yet.
  # trans = Transliterate(ZAWGYI_UNICODE_TRANSLITERATE_2)
  #trans.summary()
  #testPhase1a(trans)
  #testPhase1(trans)
  #testPhase2(trans)
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
