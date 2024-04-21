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


var BN2_LAYOUT = {
  'id': 'bn_b2',
  'title': 'বাংলা',
  'mappings': {
    '': {
      '': '{{\u2018}}১২৩৪৫৬৭৮৯০-=' +
          'ঙযডপটচজহগড়[]ৎ' +
          '{{ৃ}}{{ু}}{{ি\u200C}}{{\u09be}}{{্}}বকতদ;{{\u2019}}' +
          '{{\u09CD\u09b0}}ও{{ে\u200C}}রনসম,./'
    },
    's': {
      '': '{{\u201c}}!@#{{৳}}%{{\u09F0}}{{ঁ}}*()_+' +
          '{{ং}}য়ঢফঠছঝঞঘঢ়{}{{ঃ}}' +
          '{{র্}}{{ূ}}{{ী}}অ।ভখথধ:{{\u201d}}' +
          '{{\u09cd\u09AF}}{{ৗ}}{{ৈ\u200C}}লণষশ<>?' +
          '\u200c'  // To support special cases.
    },
    'c': {
      '': '`1234567890-=' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}\\' +
          '{{\u098b}}{{\u0989}}{{\u0987}}{{\u0986}}{{}}{{}}{{}}{{}}{{}}{{}}\'' +
          '{{}}{{}}{{\u098f}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
    },
    'sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}|' +
          '{{}}{{\u098a}}{{\u0988}}{{}}{{\u2016}}{{}}{{}}{{}}{{}}{{}}\"' +
          '{{}}{{\u0994}}{{\u0990}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          ' '
    },
    'l,cl': {
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
    },
    'scl': {  // Special for testing with additional characters
      '': '~!@#$%^&*()_+' +
          'QWE{{\u09c4}}TYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    // Vowel combos
    '\u09cd\u09be': '\u0986',
    '\u09bf\u09be': '\u0986',

    '\u09cd\u09bf\u200C': '\u0987',
    '\u09cd\u09c0': '\u0988',
    '\u09cd\u09c1': '\u0989',
    '\u09cd\u09c2': '\u098a',
    '\u09cd\u09c3': '\u098b',
    '\u09cd\u09c7\u200C': '\u098f',
    '\u09cd\u09c8\u200C': '\u0990',
    '\u09cd\u09d7': '\u0994',

    '\u09cd\u002c': '\u09f1',
    '\u09cd\u003b': '\u09fa',
    '\u09cd\u003a': '\u09bd',
    '\u09cd\\.': '\u09bc',
    '\u09cd\u003c': '\u09e1',
    '\u09cd\u003e': '\u09e0',
    '\u09cd\\+': '\u09f0',

    // Special case of ra - virama - ya
    '([\u09b0])\u09cd([\u09af])': '$1\u200c\u09cd$2',

    // 8-Apr-2020 challenge. ?? 9be-9c4 ?? Sanskrit too?
    '([\u09be-\u09c4\u09c7-\u09c8])\u001d?(\u09cd)([\u09a5\u09af\u09b0])':
      '$2$3$1',

    // Move front vowel signs over consonants.
    '([\u09c7\u09c8\u09bf\u09c8\u09cb\u09cc])\u200C([\u0993-\u09b9\u09ce\u09dc-\u09df])([\u09cd]?)': '$2$1$3',

    '\u0981\u09c3': '\u09c3\u0981',  // reorder
    // Combinations of front and back
    '\u09c7\u09cb': '\u09cb',
    '\u09c7\u09cc': '\u09cc',
    '\u09c7\u09be': '\u09cb',
    '\u09c7\u001d\u09be': '\u09cb',
    '\u09c7\u001d\u09d7': '\u09cc',

    // Move vowel across consonant-virama-la
    '([\u0995\u0997-\u099f\u09a1-\u09a4\u09a6\u09a8-\u09ae\u09b0\u09b2-\u09b9])([\u09bf\u09c7])\u001d\u09cd\
([\u0995\u0997-\u099f\u09a1-\u09a4-u09a6\u09a8-\u09ae\u09b2-\u09b9])':
      '$1\u09cd$3$2',
     '\u09C8\u09CD\u001d\u09AF': '\u200d\u09CD\u09AF\u09C8',  // Unsure of this one
    '//': '\u2016',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BN2_LAYOUT);
bn_b2 = BN2_LAYOUT;