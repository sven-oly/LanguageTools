from Projects.LANGUAGETOOLS_GIT.LanguageTools.py_convert import translit_zawgyi

import
def main(argv=None):

    inType = 'zawgyi'
    trans = Transliterate(translit_zawgyi.TRANS_LIT_RULES)
    encoding = 'zawgyi'

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
    print ('ARGS = %s' % sys.argv)
    sys.exit(main(sys.argv))