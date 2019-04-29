// Copyright 2019 Google Inc.
// All Rights Reserved.

// Arabic punctuation marks?  Comma (60c), semicolon (61b), question mark (61f), full stop (6d4)
// also double angle quotation 0xab 0xbb
// Doubled vowels or other vowel combos?
// Prototype for Rohingya, April 2019
var RHG_LAYOUT3 = {
  'id': 'rhg3',
  'title': '𐴌𐴟𐴇𐴥𐴝𐴚𐴒𐴙𐴝',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '{{\ud803\udd22}}{{\ud803\udd31}}{{\ud803\udd32}}{{\ud803\udd33}}{{\ud803\udd34}}' +
	        '{{\ud803\udd35}}{{\ud803\udd36}}{{\ud803\udd37}}{{\ud803\udd38}}' +
	        '{{\ud803\udd39}}{{\ud803\udd30}}-=' +
          '{{\uD803\uDD08}}{{\uD803\uDD16}}{{\uD803\uDD1e}}{{\uD803\uDD0c}}' +
	        '{{\uD803\uDD04}}{{\uD803\uDD18}}{{\uD803\uDD1f}}{{\uD803\uDD20}}' +
	        '{{\uD803\uDD21}}{{\uD803\uDD02}}{{\uD803\uDD17}}{{\uD803\uDD19}}{{\uD803\uDD23}}' +
          '{{\uD803\uDD00}}{{\uD803\uDD0f}}{{\uD803\uDD0b}}{{\uD803\uDD09}}' +
	        '{{\uD803\uDD12}}{{\uD803\uDD07}}{{\uD803\uDD05}}{{\uD803\uDD11}}' +
	        '{{\uD803\uDD13}}{{\uD803\uDD06}}{{\uD803\uDD1b}}' +
          '{{\uD803\uDD0e}}{{\uD803\uDD1a}}{{\uD803\uDD10}}{{\uD803\uDD1d}}' +
	        '{{\uD803\uDD01}}{{\uD803\uDD15}}{{\uD803\uDD14}}{{\uD803\uDD03}}' +
            '{{\uD803\uDD0a}}{{\uD803\uDD0d}} '
    },
    's': {
      '': '{{\ud803\udd27}}\u0021\u0040\u0023\u0024\u0025^&' +
            '\u002a\u0028\u0029\u005f+' +
          '{{}}{{}}{{}}{{}}' +
	    '{{\uD803\uDD25}}{{}}{{}}{{}}{{}}' +
	        '{{}}\u007b\u007d|' +
          '{{\uD803\uDD26}}{{}}{{}}{{}}' +
            '{{}}{{\uD803\uDD24}}{{}}{{}}\u061b' +
            ':\u0022' +
          '{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}\u060C\u06d4\u061f' +
	  '{{\ud803\udd22}}'  // Shift-space -> sakin
    },
    'l,c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,slc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    // Try suggestions made 16-Apr-2019
    // letter + 'ss' -> letter + tassi  U+10D27
    // Update to all letters, including vowels
    '\uD803([\uDD00-\uDD21])\uD803\uDD0F\uD803\uDD0F': '\uD803$1\uD803\uDD27',

    // vowel + 'hh' -> vowel + haraby  U+10D24
    '\uD803([\uDd1d-\uDD21])\uD803\uDD07\uD803\uDD07': '\uD803$1\uD803\uDD24',
    // vowel + 'nn' -> vowel + tana  U+10D26
    '\uD803([\uDd1d-\uDD21])\uD803\uDD15\uD803\uDD15': '\uD803$1\uD803\uDD26',
    // vowel + 'tt' -> vowel + tahala  U+10D25
    '\uD803([\uDd1d-\uDD21])\uD803\uDD04\uD803\uDD04': '\uD803$1\uD803\uDD25',

    // double space -> sakin  U+10D22
    '\u0020\u001d\u0020': '\uD803\uDD22',

    // doubled consonants to consonant + gemination
    '\uD803(\uDD00)\uD803\uDD00': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD01)\uD803\uDD01': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD02)\uD803\uDD02': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD03)\uD803\uDD03': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD04)\uD803\uDD04': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD05)\uD803\uDD05': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD06)\uD803\uDD06': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD07)\uD803\uDD07': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD08)\uD803\uDD08': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD09)\uD803\uDD09': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0a)\uD803\uDD0a': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0b)\uD803\uDD0b': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0c)\uD803\uDD0c': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0d)\uD803\uDD0d': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0e)\uD803\uDD0e': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD0f)\uD803\uDD0f': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD10)\uD803\uDD10': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD11)\uD803\uDD11': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD12)\uD803\uDD12': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD13)\uD803\uDD13': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD14)\uD803\uDD14': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD15)\uD803\uDD15': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD16)\uD803\uDD16': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD17)\uD803\uDD17': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD18)\uD803\uDD18': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD19)\uD803\uDD19': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD1a)\uD803\uDD1a': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD1b)\uD803\uDD1b': '\uD803$1\uD803\uDD27',
    '\uD803(\uDD1c)\uD803\uDD1c': '\uD803$1\uD803\uDD27',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(RHG_LAYOUT3);
