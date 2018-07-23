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

// Implements Shan keyboard based on ...
// TODO: Add reference

var SHN2_LAYOUT = {
  'id': 'shn_keyman',
  'title': "Shan Keyman",
  'mappings': {
    '': {
      '': '`\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040-=' +
          '\u1035\u101d{{\u200c\u1031}}\u103a\u1011\u101a\u102f\u102d\u1086\u107d[]\\' +
          '\u1022\u101e\u1010\u1082\u1075\u1081\u1078\u1076\u101c\u1088\'' +
          '\u103d{{}}\u1004\u1083\u1015\u107c\u1019\u1087\u1089\u1062'
    },
    's, sc': {
      '': '~!@#$%^&*()_+' +
          '\u1085{{}}{{\u200c\u1084}}\u101b{{\u1082\u103a}}\u107a\u1030\u102e\u108a{{}}{}|' +
          '{{}}\u1080\u107b\u107e{{}}{{}}{{}}{{}}\u103b\u1038"' +
          '{{}}{{}}\u103c{{}}{{}}\u109f\u1036\u104a\u104b?'
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
    // Reorder vowel E after consonant
    '\u200c([\u1031\u1084])([\u1000-\u102a\u103f\u104e])': '$2$1',

    // TODO: reorder others, including 103c
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(SHN2_LAYOUT);