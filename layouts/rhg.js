//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Chakma, 3-May-2017
var RHG_LAYOUT = {
  'id': 'rhg',
  'title': 'Rohingya Hanifi - Work in progress',
  'mappings': {
    ',c': {
      '': '{{\ud803\udd20}}{{\ud803\udd31}}{{\ud803\udd32}}{{\ud803\udd33}}{{\ud803\udd34}}' +
	        '{{\ud803\udd35}}{{\ud803\udd36}}{{\ud803\udd37}}{{\ud803\udd38}}' +
	        '{{\ud803\udd39}}{{\ud803\udd30}}-=' +
          '{{\uD803\uDD0B}}{{\uD803\uDD21}}{{\uD803\uDD13}}{{\uD803\uDD1b}}' +
	        '{{\uD803\uDD11}}{{\uD803\uDD0c}}{{\uD803\uDD0e}}{{\uD803\uDD26}}' +
	        '{{\uD803\uDD09}}{{\uD803\uDD24}}\u005B\u005D{{\uD803\uDD42}}' +
          '{{\uD803\uDD2D}}{{\uD803\uDD2A}}{{\uD803\uDD28}}{{\uD803\uDD27}}' +
	        '{{\uD803\uDD33}}{{\uD803\uDD1D}}{{\uD803\uDD07}}{{\uD803\uDD16}}' +
	        '{{\uD803\uDD18}}{{\uD803\uDD34}}\u0027' +
          '{{\uD803\uDD04}}{{\uD803\uDD2E}}{{\uD803\uDD2C}}{{\uD803\uDD22}}' +
	        '{{\uD803\uDD1A}}{{\uD803\uDD25}}{{\uD803\uDD1F}}{{\u002c}}' +
            '{{\u002e}}{{\uD803\uDD44}}'
    },
    's,sc': {
      '': '{{\ud803\udd1e}}\u0021\u0040\u0023\u0024\u0025{{\uD803\uDD40}}{{\uD803\uDD00}}' +
            '\u002a\u0028\u0029\u005f\u003b' +
          '{{\uD803\uDD01}}{{\uD803\uDD20}}{{\uD803\uDD14}}{{\uD803\uDD1c}}' +
	        '{{\uD803\uDD12}}{{\uD803\uDD0d}}{{\uD803\uDD0f}}{{\uD803\uDD10}}' +
	        '{{\uD803\uDD0a}}{{\uD803\uDD05}}\u007b\u007d{{\uD803\uDD02}}' +
          '{{\uD803\uDD31}}{{\uD803\uDD2B}}{{\uD803\uDD29}}{{\uD803\uDD03}}' +
            '{{\uD803\uDD41}}{{\uD803\uDD1e}}{{\uD803\uDD08}}{{\uD803\uDD17}}' +
            '{{\uD803\uDD19}}{{\uD803\uDD45}}\u0022' +
          '{{\uD803\uDD46}}{{\uD803\uDD2F}}{{\uD803\uDD30}}{{\uD803\uDD23}}' +
            '{{\uD803\uDD15}}{{\uD803\uDD32}}{{\uD803\uDD06}}\u003C\u003E{{\uD803\uDD43}}'
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
