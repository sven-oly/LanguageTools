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

// keys [ ] \ | add diacritics to some vowels, m, and n.
var IG_LAYOUT = {
  'id': 'ig',
  'title': 'Igbo input for Nsibidi',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '{{S||~||\u0303}}!@#$%^&*()_+' +
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
  'transform': {
    // Replace with combined characters
    'a\\[': '\u00e1',
    'a\\]': '\u00e0',
    'a\\\\': '\u1ea1',
    'e\\]': '\u00e8',
    'e\\[': '\u00e9',
    'e\\\\': '\u1eb9',
    'i\\]': '\u00ec',
    'i\\[': '\u00ed',
    'i\\\\': '\u1ecb',
    'o\\]': '\u00f2',
    'o\\[': '\u00f3',
    'o\\\\': '\u1ecd',
    'u\\]': '\u00f9',
    'u\\[': '\u00fa',
    'u\\\\': '\u1ee5',
    'm\\[': '\u1e3f',
    'm\\]': 'm\u0300',
    'm\\|': '\u1E41',
    'm\\\\': '\u1e43',
    'n\\[': '\u0144',
    'n\\\\': '\u1e47',
    'n\\]': '\u01F9',
    'n\\|': '\u00F1',
  },
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(IG_LAYOUT);
ig = IG_LAYOUT;
