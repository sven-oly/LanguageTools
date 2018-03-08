//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Chakma, 3-May-2017
var CCP_LAYOUT = {
  'id': 'ccp',
  'title': '\ud804\udd0c\ud804\udd0b\ud804\udd34\ud804\udd1f\ud804\udd33\ud804\udd26',
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
	        '{{\uD804\uDD18}}{{\uD804\uDD34}}\u0027' +
          '{{\uD804\uDD04}}{{\uD804\uDD2E}}{{\uD804\uDD2C}}{{\uD804\uDD22}}' +
	        '{{\uD804\uDD1A}}{{\uD804\uDD25}}{{\uD804\uDD1F}}{{\u002c}}' +
            '{{\u002e}}{{\uD804\uDD44}}'
    },
    's,sc': {
      '': '~\u0021\u0040\u0023\u0024\u0025{{\uD804\uDD40}}{{\uD804\uDD00}}' +
            '\u002a\u0028\u0029\u005f\u003b' +
          '{{\uD804\uDD01}}{{\uD804\uDD20}}{{\uD804\uDD14}}{{\uD804\uDD1c}}' +
	        '{{\uD804\uDD12}}{{\uD804\uDD0d}}{{\uD804\uDD0f}}{{\uD804\uDD10}}' +
	        '{{\uD804\uDD0a}}{{\uD804\uDD05}}\u007b\u007d{{\uD804\uDD02}}' +
          '{{\uD804\uDD31}}{{\uD804\uDD2B}}{{\uD804\uDD29}}{{\uD804\uDD03}}' +
            '{{\uD804\uDD41}}{{\uD804\uDD1e}}{{\uD804\uDD08}}{{\uD804\uDD17}}' +
            '{{\uD804\uDD19}}{{\uD804\uDD45}}\u0022' +
          '{{\uD804\uDD46}}{{\uD804\uDD2F}}{{\uD804\uDD30}}{{\uD804\uDD23}}' +
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
    // consonants, independent vowels, and E
    '\uD804\uDD2c\uD804([\uDD03-\uDD26])': '\uD804$1\uD804\uDD2c',
    // Move E after the virama/consonant. \u001d marks the end point of a previous output.
    '\uD804\uDD2c\u001d\uD804\uDD33\uD804([\uDD03-\uDD26])': '\uD804\uDD33\uD804$1\uD804\uDD2c',
    // Reorder upper vs. lower diacritics
    '\ud804([\udd2a\udd2b\udd31\udd32])\ud804([\udd27-\udd29\udd2d\udd30\udd34])':
      '\ud804$2\ud804$1',
    // Question: Should we convert doubled signs to the separate Unicode values?
    // e.g., 11127 11127 -> 11127 11134?
    '\uD804\uDD27\uD804\udd27': '\uD804\udd27\uD804\uDD34',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CCP_LAYOUT);
