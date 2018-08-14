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

// Implements Mon keyboard based on:
// https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/mon2uni/Mon%20Unicode%20Keyboard.pdf

var MNW__MUL_LAYOUT = {
  'id': 'mnw_mul',
  'title': "MUL Unicode Mono/Burmese - in progress",
  'mappings': {
    '': {
      '': '?\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040\u1028\u1025' +
          '\u101b\u1010\u1014\u1019\u1021\u1025' +
          '\u1000\u101e\u1005\u102f\u106c\u1011' +
          '\u1021\u1005\u1012\u1016\u1002\u101f\u103a\u1000\u101c\u100d\u104a' +
          '\u1007\u1006\u105a\u1018\u1017\u1014\u1019\u1036\u102c\u105c'
    },
    's, sc': {
      '': '\u104e\u103f\u1003\u100c\u100f\u1008\u1029\u105d\u1034()\u1027\u1023' +
          '\u1009\u103d{{\u1035\u102f}}\u100a{{\u1039\u1010}}\u1032\u1030\u1033' +
          '{{\u1039\u1001}}{{\u1039\u1015}}\u103b{{\u1039\u1013}}\u100e' +
          '{{\u1039\u1021}}{{\u1039\u1005}}{{\u1039\u1012}}\u1039{{\u1039\u1002}}' +
          '\u103e{{}}{{\u1039\u1000}}\u1060{{\u1039\u100b}}\u104b' +
          '{{\u1039\u1007}}{{\u1039\u1006}}{{\u1039\u105a}}{{\u1039\u1018}}{{\u1039\u1017}}' +
          '\u105e\u105f\u1038\u102b{{\u1039\u105c}}'
    },
    'c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },    'l,cl': {
      '': '`1234567890-=' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  },
  'transform' : {
    // NEW 13-Aug-2018.
    // Reorder e-vowel + medial ra after consonant.
    '\u200c\u1031\u103c': '\u200c\u103c\u1031',
    '\u200c\u103c\u1031\u001d?([\u1000-\u102a\u103f\u104e])': '$1\u103c\u1031',

    // Reorder medial ra after consonant.
    '\u103c([\u1000-\u102a\u103f\u104e])': '$1\u103c',

    // Reorder vowel E after consonant
    '\u200c\u1031([\u1000-\u102a\u103f\u104e])': '$1\u1031',

    // Keep E after medials
    '([\u103c-\u103e]*\u1031)\u001d\u103b': '\u103b$1',
    '([\u103b]*)([\u103d-\u103e]*)\u1031\u001d\u103c': '$1\u103c$2\u1031',
    '([\u103b\u103c]*)([\u103e]*)\u1031\u001d\u103d': '$1\u103d$2\u1031',
    '([\u103b-\u103d]*)\u1031\u001d\u103e': '$1\u103e\u1031',

    // Reorder medials without E vowel
    '([\u103c-\u103e]+)\u001d?\u103b': '\u103b$1',
    '([\u103b]*)([\u103d-\u103e]+)\u001d?\u103c': '$1\u103c$2',
    '([\u103b\u103c]*)([\u103e]+)\u001d?\u103d': '$1\u103d$2',

    // Move E after kinzi in steps.
    '\u1004\u1031\u001d\u103a': '\u1004\u103a\u1031',
    '\u1004\u103a\u1031\u001d\u1039': '\u1004\u103a\u1039\u1031',
    '\u1004\u103a\u1039\u1031\u001d([\u1000-\u102a\u103f\u104e])':
    '\u1004\u103a\u1039$1\u1031',

    // Move E after subscripted consonant in two steps.
    '([\u1000-\u102a\u103f\u104e])\u1031\u001d\u1039': '$1\u1039\u1031',
    '\u1039\u1031\u001d([\u1000-\u1019\u101c\u101e\u1020\u1021])' :
    '\u1039$1\u1031',

    // Move vowel anusvara relative to vowel signs
    '\u1036([\u102d|\u102e\u1030|\u102f|\u1030])': '$1\u1036',

    // Move vowel anusvara relative to medials signs
    '\u1036([\u103b|\u103c\u103d|\u103e])': '$1\u1036'
  },
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MNW__MUL_LAYOUT);
