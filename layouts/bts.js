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

// Implements Ahom keyboard based on ...
// TODO: Add reference

var KHT_LAYOUT = {
  'id': 'bts',
  'title': "Batak Simalungun In progress!!!",
  'mappings': {
    '': {
      '': '\uaa66\u1091\u1092\u1093\u1094\u1095\u1096\u1097\u1098\u1099\u1090-=' +
          '\uaa62\u1010\uaa6b\u1019\u1022\u1015' +
          '\u1bc0\u1bd9\u101d\uaa61\uaa6d\uaa68\uaa6a' +
          '\u1031{{\u1082\u103a}}\u102d\u1036\u1083\u1088\u109b\u102f\u1030\u1038\u1089' +
          '\u1078\u1011\u1075\u101c\u109b\u1087\u1062\u101a\u104b/'
    },
    's, sc': {
      '': '\uaa67!@#$%^&*()\uaa68+' +
          '\u107c\u107b\u201c\u201d\uaa63\u107f' +
          '\uaa71\uaa64\u1084\uaa63[]\u1002' +
          '\uaa70\u103b\u102e\u1085\u103d\u1036\u109a\uaa75\uaa76\u108a\u1079' +
          '\uaa6f\u1080\u103c\u101b\uaa74\uaa65\uaa6e\uaa6c\u104a?'
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

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(KHT_LAYOUT);
