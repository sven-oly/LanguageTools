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

var AIO_LAYOUT = {
  'id': 'aio',
  'title': "Tai Aiton ",
  'mappings': {
    '': {
      '': '`\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040{{\u1014}}=' +
          '{{်}}{{ဝ\ufe00}}{{ေ\ufe00}}{{\uAA7A\ufe00}}{{တ\ufe00}}{{ယ\ufe00}}{{ု}}' +
            '{{ိ}}{{ွ}}{{ပ\ufe00}}{{}}{{\u104a}}|' +
          '{{ႃ}}{{\uaa6c\ufe00}}{{ဒ}}{{ၸ\ufe00}}{{င\ufe00}}{{\uaa6d}}{{\u109d}}' +
          '{{က\ufe00}}{{လ\ufe00}}\u1064\u1062' +
          '{{\uAA78}}{{ၵ\ufe00}}{{ꩡ\ufe00}}{{ထ\ufe00}}{{ပ\ufe00}}{{ꩫ\ufe00}}{{မ\ufe00}},./'
    },
    's, sc': {
      '': '~{{\uaa78}}{{\uaa79}}{{\u1036\u00a0\u1036}}{{\u102e\u00a0\u102e}}{{\u103a\u00a0\u103a}}{{\u102c}}{{\u109d\u00a0\u109d}}*(){{\u101b}}+' +
          '{{\uaa77}}{{ွ်}}{{\u105e\u103a}}{{ြ}}{{\u1039\u1010\ufe00}}{{ျ}}' +
            '{{\u1030}}{{ီ}}{{\u1089}}{{\u1039\u1015\ufe00}}{{\u105C}}{{\u103A}}{{\u102f}}' +
          '{{ဢ\ufe00}}{{꩷}}{{ꩰ}}{{\u103a\u1036}}\u1087\u1088{{ို}}' +
            '{{\u1039\u1000\ufe00}}\u1038:"' +
          '{{ၞ}}{{ႜ}}{{\u108a}}{{\ua9f2}}{{ꩰ}}{{\u107a\ufe00}}{{ံ}}<>?' + '\u200b'
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
google.elements.keyboard.loadme(AIO_LAYOUT);
