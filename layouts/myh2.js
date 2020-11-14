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

// Includes capitals for letters in top row.
// Uses diacritics for caron letters
// Uses rules for H with lower dot.
var MYH2_LAYOUT = {
  'id': 'myh2',
  'title': 'qʷi·qʷi·diččaq 2',
  'source': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
  'mappings': {
    '': {
      '': '`{{\u030c}}234{{ƛ}}678{{ʔ}}0-=' +
          'qwertyuiop‘’\\' +
          'asdfghjkl{{S||mod||\u00B7}}{{\u0313}}' +
          'zxcvbnm,./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP“”|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'c,l,cl': {
      '': '`1234567890«»' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,scl': {
      '': '~!@#$%^&*()‹›' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
    '\u00B7w': 'ʷ',
    '\u00B7W': 'ᵂ',
    '\u00B7h': 'ħ',
    '\u00B7H': 'Ħ',
    '\u00B7l': 'ɫ',
    '\u00B7L': 'Ɫ',
    '\u00B7n': 'ŋ',
    '\u00B7N': 'Ŋ',

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MYH2_LAYOUT);
myh2 = MYH2_LAYOUT;