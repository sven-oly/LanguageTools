// Fula (Fulah/Fulani) virtual keyboard prototype, using Adlam script.
// Craig Cornelius, 2017
//
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

// TODO: Name of keyboard in Adlam characters
// Unicode output

var FF_ADLAM_LAYOUT = {
  'id': 'ff_Adlm',
  'title': '𞤆𞤵𞤤𞤢𞤪/𞤊𞤵𞤤𞤬𞤵𞤤𞤣𞤫',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '\u0640' +
          '{{\uD83A\uDD51}}{{\uD83A\uDD52}}{{\uD83A\uDD53}}{{\uD83A\uDD54}}' +
          '{{\uD83A\uDD55}}{{\uD83A\uDD56}}{{\uD83A\uDD57}}{{\uD83A\uDD58}}' +
          '{{\uD83A\uDD59}}{{\uD83A\uDD50}}-=',
      'q': '{{\uD83A\udd3B}}{{\uD83A\udd31}}{{\uD83A\udd2B}}{{\uD83A\udd2a}}' +
          '{{\uD83A\udd3c}}{{\uD83A\udd34}}{{\uD83A\udd35}}{{\uD83A\udd2d}}' +
          '{{\uD83A\udd2e}}{{\uD83A\udd28}}{{\uD83A\udd3d}}{{\uD83A\udd39}}',
      'a': '{{\uD83A\udd22}}{{\uD83A\udd27}}{{\uD83A\udd23}}{{\uD83A\udd2c}}' +
          '{{\uD83A\udd3a}}{{\uD83A\udd38}}{{\uD83A\udd36}}{{\uD83A\udd33}}' +
          '{{\uD83A\udd24}}\u204f{{\uD83A\udd4B}}',
      'z': '{{\uD83A\udd2f}}{{\uD83A\udd30}}{{\uD83A\udd37}}{{\uD83A\udd29}}' +
          '{{\uD83A\udd26}}{{\uD83A\udd32}}{{\uD83A\udd25}}\u2e41./'
    },
    's': {
      '': '~!@#$%{{\uD83A\udd48}}&*()_+',
      'q': '{{\uD83A\udd19}}{{\uD83A\udd0F}}{{\uD83A\udd09}}{{\uD83A\udd08}}' +
          '{{\uD83A\udd1A}}{{\uD83A\udd12}}{{\uD83A\udd13}}{{\uD83A\udd0B}}' +
          '{{\uD83A\udd0C}}{{\uD83A\udd06}}{{\uD83A\udd1b}}{{\uD83A\udd17}}|',
      'a': '{{\uD83A\udd00}}{{\uD83A\udd05}}{{\uD83A\udd01}}{{\uD83A\udd0A}}' +
          '{{\uD83A\udd18}}{{\uD83A\udd16}}{{\uD83A\udd14}}{{\uD83A\udd11}}' +
          '{{\uD83A\udd02}}:"',
      'z': '{{\uD83A\udd0D}}{{\uD83A\udd0E}}{{\uD83A\udd15}}{{\uD83A\udd07}}' +
          '{{\uD83A\udd04}}{{\uD83A\udd10}}{{\uD83A\udd03}}<' +
          '>\u061f'
    },
   'c': {  // alt-control
     '': '{{\uD83A\uDD5E}}1234567890^',
     'qwe': '{{ud83a\udd46}}{{ud83a\udd47}}{{ud83a\udd45}}',
     'r': '{{ud83a\udd49}}',
     't': '{{ud83a\udd4a}}',
     'p': '{{\uD83A\uDD42}}[]\\',
     'a': '{{ud83a\udd44}}',
     '\'': '\'',
     'sh': '{{\uD83A\uDD43}}{{\uD83A\uDD3f}}',
     'l': '{{ud83a\udd48}}',
     'zvb/': '{{\uD83A\uDD41}}{{\uD83A\uDD3e}}{{\uD83A\uDD40}}{{\uD83A\udd5f}}'
    },
   'sc': {  // shift-alt-control
     '': '`{{\uD83A\uDD5e}}€{{\u00be}}¼½†‡·„‚—±',
     'p': '{{\uD83A\uDD20}}[]\\',
     'sh': '{{\uD83A\uDD21}}{{\uD83A\uDD1d}}',
     'zvb/': '{{\uD83A\uDD1f}}{{\uD83A\uDD1c}}{{\uD83A\uDD1e}}{{?}}'
    },
    'l': {  // caps lock. qwerty
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl': {  // shift-caps lock. QWERTY
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '\uD83A\udd22\uD83A\udd00': '\uD83A\udd22\uD83A\udd44',  // Alif lengthener
    '\uD83A\udd22\uD83A\udd22': '\uD83A\udd22\uD83A\udd44',  // Alif lengthener
    '\uD83A\udd00\uD83A\udd00': '\uD83A\udd00\uD83A\udd44',  // Alif lengthener
    '\uD83A\udd00\uD83A\udd22': '\uD83A\udd00\uD83A\udd44',  // Alif lengthener

    '\uD83A\udd09\uD83A\udd09': '\uD83A\udd09\uD83A\udd45',  // Vowel lengthener
    '\uD83A\udd09\uD83A\udd09': '\uD83A\udd09\uD83A\udd45',  // Vowel lengthener
    '\uD83A\udd2b\uD83A\udd2b': '\uD83A\udd2b\uD83A\udd45',  // Vowel lengthener
    '\uD83A\udd2b\uD83A\udd2b': '\uD83A\udd2b\uD83A\udd45',  // Vowel lengthener

    '\uD83A([\udd0b\udd2d])\uD83A[\udd0b\udd2d]': '\uD83A$1\uD83A\udd45',
    '\uD83A([\udd0c\udd2e])\uD83A[\udd0c\udd2e]': '\uD83A$1\uD83A\udd45',
    '\uD83A([\udd13\udd35])\uD83A[\udd13\udd35]': '\uD83A$1\uD83A\udd45',

    '\uD83A([\udd01\udd23])\uD83A[\udd01\udd23]': '\uD83A$1\ud83a\udd46',  // Double consonants
    '\uD83A([\udd02\udd24])\uD83A[\udd02\udd24]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd03\udd25])\uD83A[\udd03\udd25]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd04\udd26])\uD83A[\udd04\udd26]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd05\udd27])\uD83A[\udd05\udd27]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd06\udd28])\uD83A[\udd06\udd28]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd07\udd29])\uD83A[\udd07\udd29]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd08\udd2a])\uD83A[\udd08\udd2a]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd0a\udd2c])\uD83A[\udd0a\udd2c]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd0d\udd2f])\uD83A[\udd0d\udd2f]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd0e\udd30])\uD83A[\udd0e\udd30]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd0f\udd31])\uD83A[\udd0f\udd31]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd10\udd32])\uD83A[\udd10\udd32]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd11\udd33])\uD83A[\udd11\udd33]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd12\udd34])\uD83A[\udd12\udd34]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd14\udd36])\uD83A[\udd14\udd36]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd15\udd37])\uD83A[\udd15\udd37]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd16\udd38])\uD83A[\udd16\udd38]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd17\udd39])\uD83A[\udd17\udd39]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd18\udd3a])\uD83A[\udd18\udd3a]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd19\udd3b])\uD83A[\udd19\udd3b]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1a\udd3c])\uD83A[\udd1a\udd3c]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1b\udd3d])\uD83A[\udd1b\udd3d]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1c\udd3e])\uD83A[\udd1c\udd3e]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1d\udd3f])\uD83A[\udd1d\udd3f]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1e\udd40])\uD83A[\udd1e\udd40]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd1f\udd41])\uD83A[\udd1f\udd41]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd20\udd42])\uD83A[\udd20\udd42]': '\uD83A$1\ud83a\udd46',
    '\uD83A([\udd21\udd43])\uD83A[\udd21\udd43]': '\uD83A$1\ud83a\udd46',

    // Typing letter again undoes the lengthener.
    '\uD83A\udd00\uD83A\udd44\ud83a\udd00': '\uD83A\udd00\ud83a\udd00',
    '\uD83A\udd22\uD83A\udd44\ud83a\udd22': '\uD83A\udd22\ud83a\udd22',
    '\uD83A\udd00\uD83A\udd44\ud83a\udd22': '\uD83A\udd00\ud83a\udd22',
    '\uD83A\udd22\uD83A\udd44\ud83a\udd00': '\uD83A\udd22\ud83a\udd00',

    // Undo vowel lengthener
    '\uD83A([\udd09\udd2b])\uD83A\udd45\ud83a([\udd09\udd2b])': '\uD83A$1\uD83A$2',
    '\uD83A([\udd0b\udd2d])\uD83A\udd45\ud83a([\udd0b\udd2d])': '\uD83A$1\uD83A$2',
    '\uD83A([\udd0c\udd2e])\uD83A\udd45\ud83a([\udd0c\udd2e])': '\uD83A$1\uD83A$2',
    '\uD83A([\udd13\udd35])\uD83A\udd45\ud83a([\udd13\udd35])': '\uD83A$1\uD83A$2',

    // Undo double consonants
    '\uD83A([\udd01\udd23])\uD83A\udd46\ud83a([\udd01\udd23])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd02\udd24])\uD83A\udd46\ud83a([\udd02\udd24])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd03\udd25])\uD83A\udd46\ud83a([\udd03\udd25])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd04\udd26])\uD83A\udd46\ud83a([\udd04\udd26])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd05\udd27])\uD83A\udd46\ud83a([\udd05\udd27])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd06\udd28])\uD83A\udd46\ud83a([\udd06\udd28])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd07\udd29])\uD83A\udd46\ud83a([\udd07\udd29])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd08\udd2a])\uD83A\udd46\ud83a([\udd08\udd2a])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd0a\udd2c])\uD83A\udd46\ud83a([\udd0a\udd2c])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd0d\udd2f])\uD83A\udd46\ud83a([\udd0d\udd2f])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd0e\udd30])\uD83A\udd46\ud83a([\udd0e\udd30])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd0f\udd31])\uD83A\udd46\ud83a([\udd0f\udd31])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd10\udd32])\uD83A\udd46\ud83a([\udd10\udd32])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd11\udd33])\uD83A\udd46\ud83a([\udd11\udd33])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd12\udd34])\uD83A\udd46\ud83a([\udd12\udd34])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd14\udd36])\uD83A\udd46\ud83a([\udd14\udd36])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd15\udd37])\uD83A\udd46\ud83a([\udd15\udd37])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd16\udd38])\uD83A\udd46\ud83a([\udd16\udd38])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd17\udd39])\uD83A\udd46\ud83a([\udd17\udd39])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd18\udd3a])\uD83A\udd46\ud83a([\udd18\udd3a])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd19\udd3b])\uD83A\udd46\ud83a([\udd19\udd3b])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1a\udd3c])\uD83A\udd46\ud83a([\udd1a\udd3c])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1b\udd3d])\uD83A\udd46\ud83a([\udd1b\udd3d])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1c\udd3e])\uD83A\udd46\ud83a([\udd1c\udd3e])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1d\udd3f])\uD83A\udd46\ud83a([\udd1d\udd3f])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1e\udd40])\uD83A\udd46\ud83a([\udd1e\udd40])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd1f\udd41])\uD83A\udd46\ud83a([\udd1f\udd41])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd20\udd42])\uD83A\udd46\ud83a([\udd20\udd42])': '\uD83A$1\ud83a$2',
    '\uD83A([\udd21\udd43])\uD83A\udd46\ud83a([\udd21\udd43])': '\uD83A$1\ud83a$2',
    }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(FF_ADLAM_LAYOUT);
