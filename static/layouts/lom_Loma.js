// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var LOM_LOMA_LAYOUT = {
  'id': 'lom_Loma',
  'title': 'Loma script',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{}}wertyuiop[]\\' +
          'asdfgh{{}}kl;\'' +
          'z{{}}{{}}vbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {  // These are to Font encodings.
    'pa': '\u00a3',
    'pee': '\u00a7',
    'pe': '\u00a8',
    'peh': '\u00ae',
    'pi': '\u00a2',
    'poo': '\u00ac',
    'pooi': '\u00af',
    'po': '\u00a9',
    'pu': '\u00a5',
    'wi': '\u00b0',
    'wa': '\u00b5',
    'we': '\u00ba',
    'wee': '\u00b8',
    'wo': '\u00bc',
    'woo': '\u00bd',

    'bi': '\u00c5',
    'ba': '\u00c7',
    'bu': '\u00c8',
    'bee': '\u00cc',
    'be': '\u00ce',
    'bo': '\u00d1',
    'boo': '\u00d4',
    'bhi': '\u00e3',
    'bha': '\u00e4',
    'bhu': '\u00e5',
    'bhu2': '\u00ca',
    'bhee': '\u00e6',
    'bhe': '\u00e7',
    'bho': '\u00e9',
    'bhoo': '\u00ea',
    'bheen': '\u00d9',
    'bhih': '\u00da',
    'bhooh': '\u00db',
    'bhah': '\u00dc',
    'bheh': '\u00df',
    'bhuee': '\u00e0',
    'bhoi': '\u00e1',
    'bhi': '\u00c5',
    'kpe': '\u00f0',
    'fi': '\u00fd',
    'fa': '\u00fe',
    'fu': '\u0101',
    'fee': '\u0104',
    'fo': '\u0107',
    'foo': '\u0108',
    'vi': '\u010b',
    'va': '\u010c',
    'vee': '\u010e',
    've': '\u0111',
    'vo': '\u0115',
    'voo': '\u0116',
    'gbi': '\u00f2',
    'gba': '\u00f3',
    'gbee': '\u00f4',
    'gbe': '\u00f5',
    'gbo': '\u00f6',
    'gboo': '\u00f9',
    'ui': '\u00fb',
    'ua': '\u00fc',
    'ti': '\u011b',
    'ta': '\u011c',
    'tu': '\u011d',
    'tee': '\u0120',
    'te': '\u0121',
    'to': '\u0123',
    'too': '\u0124',

    'li': '\u0128',
    'la': '\u0129',
    'lu': '\u012a',
    'lee': '\u012b',
    'le': '\u012c',
    'lo': '\u012d',
    'loo': '\u012f',
    'di': '\u0136',
    'da': '\u0137',
    'du': '\u0138',
    'dee': '\u013a',
    'de': '\u013c',
    'do': '\u013d',
    'doo': '\u013f',
    'si': '\u0145',
    'sa': '\u0148',
    'su': '\u0149',
    'see': '\u014a',
    'se': '\u014c',
    'so': '\u014e',
    'soo': '\u0150',
    'zi': '\u0157',
    'za': '\u0159',
    'zu': '\u015a',
    'zee': '\u015b',
    'ze': '\u015e',
    'zo': '\u015f',
    'zoo': '\u0161',

    'yi': '\u0169',
    'ya': '\u016a',
    'yu': '\u016b',
    'yee': '\u016d',
    'ye': '\u016e',
    'yo': '\u0170',
    'yoo': '\u0171',
    'ki': '\u0177',
    'ka': '\u0179',
    'ku': '\u017a',
    'kee': '\u017c',
    'ke': '\u017f',
    'ko': '\u0182',
    'koo': '\u0185',
    'ggi': '\u0190',
    'gga': '\u0191',
    'ggee': '\u0192',

    'gi': '\u0195',
    'ga': '\u0194',
    'gu': '\u0198',
    'gee': '\u0199',
    'ge': '\u019a',
    'go': '\u019d',
    'ngi': '\u01a1',

    // Vowels
    'i': '\u01a6',
    'a': '\u01a2',
    'u': '\u01a7',
    'ee': '\u01aa',
    'e': '\u01ab',
    'o': '\u0108',
    'oo': '\u01ac',
    // Nasal syllables
    'mi': '\u01ae',
    'ma': '\u01af',
    'mu': '\u01b1',
    'mee': '\u01b3',
    'me': '\u01b4',
    'mo': '\u01b9',
    'moo': '\u01b7',

    'ni': '\u00cb',
    'na': '\u01c1',
    'nu': '\u01c2',
    'nee': '\u01c4',
    'ne': '\u01c5',
    'noo': '\u01ca',

    'nhi': '\u01cc',
    'nha': '\u01cf',
    'nhu': '\u01d1',
    'nho': '\u01d2',

    // Nasal vowels
    'wne': '\u00c1',
    'wnu': '\u00c2',
    'bne': '\u00d9',
    'gbu': '\u00fa',
    'zne': '\u0164',
    'zno': '\u0165',
    'gne': '\u019e',
    'nge': '\u01a5',
    'ngni': '\u01d3',

    // Long vowels
    'pE': '\u00ae',
    'bI': '\u00da',
    'bA': '\u00dc',
    'bE': '\u00df',
    'bO': '\u00db',
    'fA': '\u010a',
    'vA': '\u011a',
    'lE': '\u0130',
    'sA': '\u0152',
    'sE': '\u0154',
    'sO': '\u0155',
    'kA': '\u0187',
    'gE': '\u019f',
    'mI': '\u01b8',
    'mU': '\u01bb',
    'mE': '\u01bc',
    'nE': '\u01cb',
    'ngE': '\u01d4',

    // Dipthongs
    'poi': '\u00af',
    'woi': '\u00c4',
    'bue': '\u00e0',
    'boi': '\u00e1',
    'bai': '\u00ec',
    'bhai': '\u00ee',
    'bhue': '\u00ed',

    'tie': '\u0126',
    'tui': '\u0127',
    'lea': '\u0132',
    'lui': '\u0133',
    'luo': '\u0134',
    'lue': '\u0135',
    'dio': '\u0141',

    'diu': '\u0142',
    'duo': '\u0143',
    'suo': '\u0156',
    'zie': '\u0166',
    'zuo': '\u0167',
    'yie': '\u0172',
    'yai': '\u0175',

    'kai': '\u0188',
    'koi': '\u018a',
    'kue': '\u018e',
    'kuee': '\u018c',
    'kui': '\u018f',
    'gie': '\u01a0',
    'moi': '\u01bd',
    'nie': '\u01d5',
  },
  'historyPruneRegex': 'e|p|b|ba|baa|be|bn|bo|bu|bh|bha|bhe|bhee|bhi|bho|bhoo|bhu|bhue|' +
    'f|fo|fu|g|ge|gee|gi|gb|gbe|gbn|gbo|gg|gh|t|d|di|du|l|h|y|kp|kw|g|n|ng|ni|m|ny|o|' +
    've|vo|' +
    'pe|be|ka|ke|ko|kpe|fe|te|le|he|ye|kwe|we|ne|nge|po|bo|kpo|kue|ku|k|fo|to|le|lo|lu|ho|w|wn|wo|yo|' +
    'poo|se|so|su|ti|tu|u|y|ya|yi|zi|zo|zu|z'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LOM_LOMA_LAYOUT);
lom_Loma = LOM_LOMA_LAYOUT;