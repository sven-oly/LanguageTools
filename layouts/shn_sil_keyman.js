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

// Implements Shan keyboard based on Keyman Shan implementation.

var SHN3_LAYOUT = {
  'id': 'shn_sil_keyman',
  'title': "Shan SIL Keyman",
  'mappings': {
    '': {
      '': '`\u1091\u1092\u1093\u1094\u1095\u1096\u1097\u1098\u1099\u1090-=' +
          'ၸတၼမဢပၵငဝႁ[]\\' +
          '{{\u200cေ}}{{\u200cႄ}}်ွိႉႇုူႈ\'' +
          'ၽထၶလယၺၢ,./'
    },
    's, sc': {
      '': '~!@#$%^&*()_+' +
          'ꩡၻꧣ႞ြၿၷရသႀ{}|' +
          'ဵႅီႂ{{ႂ့}}်ႆ”ႊး“' +
          '{{}}ꩪꧠꩮျ႟ႃ၊။??'
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
    '\u200c([\u1031\u1084])\u103c': '\u200c\u103c$1',
    '\u200c\u103c([\u1031\u1084])\u001d?([\u1000-\u102a\u103f\u104e\u1075-\u1081])': '$2\u103c$1',

    // Reorder medial ra after consonant.
    '\u103c([\u1000-\u102a\u103f\u104e])': '$1\u103c',

    // Reorder vowel E after consonant
    '\u200c([\u1031\u1084])([\u1000-\u102a\u103f\u104e\u1075-\u1081])': '$2$1',

    // Keep E after medials
    '([\u103c-\u103e]*([\u1031\u1084]))\u001d\u103b': '\u103b$1$2',
    '([\u103b]*)([\u103d-\u103e]*)([\u1031\u1084])\u001d\u103c': '$1\u103c$2$3',
    '([\u103b\u103c]*)([\u103e]*)([\u1031\u1084])\u001d\u103d': '$1\u103d$2$3',
    '([\u103b-\u103d]*)([\u1031\u1084])\u001d\u103e': '$1\u103e$2',

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
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(SHN3_LAYOUT);
shn_sil_keyman = SHN3_LAYOUT;