//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Chakma, 3-May-2017
var RHG_LAYOUT = {
  'id': 'rhg',
  'title': 'Rohingya Hanifi - Work in progress',
  'direction': 'rtl',
  'mappings': {
    ',c': {
      '': '{{\ud803\udd21}}{{\ud803\udd31}}{{\ud803\udd32}}{{\ud803\udd33}}{{\ud803\udd34}}' +
	        '{{\ud803\udd35}}{{\ud803\udd36}}{{\ud803\udd37}}{{\ud803\udd38}}' +
	        '{{\ud803\udd39}}{{\ud803\udd30}}-=' +
          '{{\uD803\uDD0B}}{{\uD803\uDD0d}}{{\uD803\uDD02}}{{\uD803\uDD1a}}' +
	        '{{\uD803\uDD09}}{{\uD803\uDD12}}{{\uD803\uDD18}}{{\uD803\uDD07}}' +
	        '{{\uD803\uDD08}}{{\uD803\uDD06}}{{\uD803\uDD05}}{{\uD803\uDD0a}}\\' +
          '{{\uD803\uDD10}}{{\uD803\uDD0f}}{{\uD803\uDD18}}{{\uD803\uDD01}}' +
	        '{{\uD803\uDD13}}{{\uD803\uDD00}}{{\uD803\uDD07}}{{\uD803\uDD15}}' +
	        '{{\uD803\uDD1d}}{{\uD803\uDD11}}{{\uD803\uDD04}}' +
          '{{\uD803\uDD22}}{{\uD803\uDD20}}{{\uD803\uDD1e}}{{\uD803\uDD0c}}' +
	        '{{\uD803\uDD1d}}{{\uD803\uDD1f\u065c}}{{\uD803\uDD03}}{{\uD803\uDD16}}' +
            '{{\uD803\uDD0e}}{{\uD803\uDD09}}'
    },
    's,sc': {
      '': '{{\ud803\udd1f}}\u0021\u0040\u0023\u0024\u0025^&' +
            '\u002a\u0028\u0029\u005f\u003b' +
          '{{\uD803\uDD26}}{{\uD803\uDD24}}{{\uD803\uDD1f}}{{\uD803\uDD23}}' +
	        '{{}}{{}}{{}}{{}}' +
	        '{{}}{{}}\u007b\u007d|' +
          '{{\uD803\uDD14}}{{\uD803\uDD25}}{{\uD803\uDD23}}{{\uD803\uDD19}}' +
            '{{\uD803\uDD1d}}{{}}{{}}{{}}' +
            '{{}};\u0022' +
          '{{}}{{}}{{}}{{}}' +
            '{{}}{{}}{{}}<>?'
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
    // Doubled ekaara
    '\uD803\uDD2c\uD803\uDD2c\uD803([\uDD03-\uDD26])': '\uD803$1\uD803\uDD2c\uD803\uDD2c',
    '\uD803\uDD2c\uD803([\uDD03-\uDD26])': '\uD803$1\uD803\uDD2c',
    // Move E after the virama/consonant. \u001d marks the end point of a previous output.
    '\uD803\uDD2c\uD803\uDD2c\u001d\uD803\uDD33\uD803([\uDD03-\uDD26])': '\uD803\uDD33\uD803$1\uD803\uDD2c\uD803\uDD2c',
    '\uD803\uDD2c\u001d\uD803\uDD33\uD803([\uDD03-\uDD26])': '\uD803\uDD33\uD803$1\uD803\uDD2c',
    // Reorder upper vs. lower diacritics
    '\ud803([\udd2a\udd2b\udd31\udd32])\ud803([\udd27-\udd29\udd2d\udd30\udd34])':
      '\ud803$2\ud803$1',
    // Question: Should we convert doubled signs to the separate Unicode values?
    // e.g., 11127 11127 -> 11127 11134?
    '\uD803\uDD27\uD803\udd27': '\uD803\udd27\uD803\uDD34',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(RHG_LAYOUT);
