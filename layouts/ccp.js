//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Chakma, 3-May-2017
var CCP_LAYOUT = {
  'id': 'ccp',
  'title': 'Chaka prototype',
  'mappings': {
    ',c': {
      '': '`{{\ud804\udd37}}{{\ud804\udd38}}{{\ud804\udd39}}{{\ud804\udd3a}}' +
	        '{{\ud804\udd3b}}{{\ud804\udd3c}}{{\ud804\udd3d}}{{\ud804\udd3e}}' +
	        '{{\ud804\udd3f}}{{\ud804\udd36}}-=' +
          '{{\uD804\uDD0B}}{{\uD804\uDD21}}{{\uD804\uDD13}}{{\uD804\uDD1b}}' +
	        '{{\uD804\uDD11}}{{\uD804\uDD0c}}{{\uD804\uDD0e}}{{\uD804\uDD26}}' +
	        '{{\uD804\uDD09}}{{\uD804\uDD24}}\u005B\u005D{{\uD804\uDD42}}' +
          '{{\uD804\uDD2D}}{{\uD804\uDD2A}}{{\uD804\uDD28}}{{\uD804\uDD27}}' +
	        '{{\uD804\uDD33}}{{\uD804\uDD1D}}{{\uD804\uDD07}}{{\uD804\uDD16}}' +
	        '{{\uD804\uDD18}}{{\uD804\uDD34}}\u0022' +
          '{{\uD804\uDD04}}{{\uD804\uDD2E}}{{\uD804\uDD2C}}{{\uD804\uDD22}}' +
	        '{{\uD804\uDD1A}}{{\uD804\uDD25}}{{\uD804\uDD1F}}{{\u002c}}' +
            '{{\u002e}}{{\u002f}}'
    },
    's,sc': {
      '': '~\u0021\u0040\u0023\u0024\u0025\u005e{{\uD804\uDD00}}' +
            '\u002a\u0028\u0029\u005f\u003b' +
          '{{\uD804\uDD01}}{{\uD804\uDD20}}{{\uD804\uDD14}}{{\uD804\uDD1c}}' +
	        '{{\uD804\uDD12}}{{\uD804\uDD0d}}{{\uD804\uDD0f}}{{\uD804\uDD10}}' +
	        '{{\uD804\uDD0a}}{{\uD804\uDD05}}\u007b\u007d{{\uD804\uDD02}}' +
          '{{\uD804\uDD31}}{{\uD804\uDD2B}}{{\uD804\uDD28}}{{\uD804\uDD03}}' +
            '{{\uD804\uDD41}}{{\uD804\uDD1e}}{{\uD804\uDD08}}{{\uD804\uDD17}}' +
            '{{\uD804\uDD19}}\u003A\u0022' +
          '{{\uD804\uDD40}}{{\uD804\uDD2F}}{{\uD804\uDD30}}{{\uD804\uDD23}}' +
            '{{\uD804\uDD15}}{{\uD804\uDD32}}{{\uD804\uDD06}}\u003C\u003E{{\uD804\uDD43}}'
    },
    'l': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '\uD804\uDD2c(\uD804\uDD07)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD08)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD09)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0a)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0b)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0c)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0d)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0e)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD0f)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD10)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD11)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD12)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD13)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD14)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD15)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD16)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD17)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD18)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD19)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1a)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1b)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1c)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1d)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1e)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD1f)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD20)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD21)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD22)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD23)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD24)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD25)': '$1\uD804\uDD2c',  // consonants and E
    '\uD804\uDD2c(\uD804\uDD26)': '$1\uD804\uDD2c',  // consonants and E
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CCP_LAYOUT);
