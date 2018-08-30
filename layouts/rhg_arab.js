// All Rights Reserved.

// Prototype for Rohnigya in Arabic script
// Layout from https://sites.google.com/site/rohingyafonna/
var RHG_ARAB_LAYOUT = {
  'id': 'rhg_arab',
  'title': 'Rohingya Arab',
  'mappings': {
    ',c': {
      '': '`{{\u06f1}}{{\u06f2}}{{\u06f3}}{{\u06f4}}{{\u06f5}}' +
	        '{{\u06f6}}{{\u06f7}}{{\u06f8}}{{\u06f9}}' +
	        '{{\u0640}}-=' +
          '{{\u0642}}{{\u0648}}\u08e6\u0631\u062a\u064a' +
	        '{{\u064f}}{{\u0650}}{{\u08e4}}\u06e1\u08ec\u08ea\u08eb' +
          '{{\u064e}}{{\u0633}}{{\u062f}}{{\u0641}}' +
	        '{{\u06af}}{{\u0647}}{{\u062c}}{{\u0643}}' +
	        '{{\u0644}}{{\u061b}}/' +
          '{{\u0632}}{{\u0635}}{{\u0686}}{{\u08ac}}' +
	        '{{\u0628}}{{\u0646}}{{\u0645}}{{\u060c}}' +
            '{{\u06d4}}.'
    },
    's,sc': {
      '': '~!{{}}\u08ec\u08ea\u08eb^&' +
            '\u002a\u0028\u0029\u005f\u003b' +
          '\u06a0\u0651\u06d2{{\u0691}}' +
	        '\u0679\u0649\u08aa{{}}\u08e5\u067e' +
	        '{{}}{{}}' +
          '{{\u0627}}{{\u0634}}{{\u0688}}{{\u0637}}' +
            '{{\u0639}}\u062d\u062b\u062e\u0622:\u201d\u201c' +
          '\u0630\u0636\u063a\u08ab\u0638\u06ba\u0621\u0654\u0655\u061f'
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
    '\u08e6\u08e6': '\u08e9',
    '\u064f\u064f': '\u064c',
    '\u0650\u0650': '\u064d',
    '\u08e4\u08e4': '\u08e7',
    '\u064e\u064e': '\u064b',
    '\u08e5\u08e5': '\u08e8'

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(RHG_ARAB_LAYOUT);
