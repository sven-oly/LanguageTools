# -*- coding: utf-8 -*-

from __future__ import print_function
import transrule_my_wwburn

import transliterate

import sys

debug = False  #True

def apply(input, trans, subst):
  if debug:
    print('Apply on >%s<' % input.encode('utf-8'))

  text = input
  for rep in subst:
    text = input.replace(rep[0], rep[1])
    input = text

  if debug:
    print('Result after substitions >%s<' % text.encode('utf-8'))

  result = trans.transliterate(text, 2)
  if debug:
    print('Final result = >%s<' % result.encode('utf-8'))
  return result

def compare(result, expected):
  if result != expected:
    print('** FAILURE:')
    print('  expected = >%s<' % expected)
    print('  result   = >%s<' % result)
  else:
    print(' TEST PASSED')


def test1(trans, subst):
  input = 'ta-umif;jycsuf'
  expected = u'အေ—ကာင်းပြချက်'
  result = input(*trans, **subst)
  compare(result, expected)

  input = '-opa-w;vsm;vlrsKd;'
  expected = u'—သစေ—တးလျားလူမျိုး'
  result = input(*trans, **subst)
  compare(result, expected)

  input = 'tjyefvufrSwf'
  expected = u'အပြန်လက်မှတ်'
  result = input(*trans, **subst)
  compare(result, expected)


def main(args):
  trans = transliterate.Transliterate(
      transrule_my_wwburn.MY_WWBURN_UNICODE_TRANSLITERATE)
  subst = transrule_my_wwburn.Substitutions

  test1(trans, subst);

if __name__ == "__main__":
    print('ARGS = %s' % sys.argv)
    print('Testing WW Burn conversions')

    sys.exit(main(sys.argv))
