// Tibetan virtual keyboard, based on Monlam tibetan keyboard
// 28-Dec-2016.
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


var BO_WYLIE_LAYOUT = {
  'id': 'bo_wylie',
  'title': 'Tibetan Wylie input', // Revise this
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          '{{a}}sdfghjkl:\'' +
          'zxcvbnm<>?'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    }
  },
  'transform': {
    'ka' : 'ཀ',
    'ca' : 'ཅ',
    'ཀ\u001d?h': 'ཁ',  // kh
    'ga': 'ག',
    'ན\u001d?g': 'ང',  // ng
    'ch': 'ཆ',
    'j': 'ཇ',
    'ན\u001d?y': 'ཉ',  // ny
    't': 'ཏ',
    'ཏ\u001d?h': 'ཐ',  // th
    'd': 'ད',
    'n': 'ན',
    'p': 'པ',
    'པ\u001d?h': 'ཕ',  // ph
    'b': 'བ',
    'm': 'མ',
    'ཏ\u001d?s': 'ཙ',  //ts
    'ཙ\u001d?h': 'ཚ',  // tsh
    'dz': 'ཛ',
    'w': 'ཝ',
    'ཟ\u001d?h': 'ཞ',  // zh
    'z': 'ཟ',
    '\'a': 'འ',
    'y': 'ཡ',
    'r': 'ར',
    'l': 'ལ',
    'ས\u001d?h': 'ཤ',
    's': 'ས',
    'h': 'ཧ',
    'a': 'ཨ',
    'i': '\u0F72',
    'u': '\u0F74',
    'e': '\u0F7A',
    'o': '\u0F7C',
    'y': '\u0FB1',
    '\u0F7a\u001d?e': '\u0F7b',
    '\u0F7C\u001d?o': '\u0F7D',
    '\u0F72\u001di': '\u0f71\u0f72',
    '\u0F74\u001du': '\u0f71\u0f74',

    // TODO: Handle y, gy, g, 'g.y'??

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BO_WYLIE_LAYOUT);
