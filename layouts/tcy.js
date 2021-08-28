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


var TCY_LAYOUT = {
  'id': 'tcy',
  'title': 'Tulu Experimental Phonetic',
  'mappings': {
    ',c': {
      '': '`\u0d67\u0d68\u0d69\u0d6a\u0d6b\u0d6c\u0d6d\u0d6e\u0d6f0-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
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
    'a': '\u0d05',
    'aa': '\u0d06',
    'A': '\u0d06',
    'i': '\u0d07',
    'I': '\u0d08',
    'ee': '\u0d08',
    'u': '\u0d09',
    'U': '\u0d0a',
    'oo': '\u0d0a',
    'Ru': '\u0d0b',
    'RU': '\u0d0c',
    'e': '\u0d0e',
    'E': '\u0d0f',
    'ai': '\u0d11',
    'o': '\u0d12',
    'O': '\u0d13',
    'au': '\u0d14',
    'ou': '\u0d14',
    'M': '\u0d02',
    'H': '\u0d03',

    // Dependent vowels
    'A': '\u0d3e',
    'aa': '\u0d3e',
    'i': '\u0d3f',

    'k': '\u0d15\u0d4d',
    'ka': '\u0d15',
    'Ka': '\u0d16',
    'kha': '\u0d16',
    'g': '\u0d17',
    'Ga': '\u0d18',
    'gha': '\u0d18',
    '~ga': '\u0d19',
    'ca': '\u0d1a',
    'cha': '\u0d1a',
    'Ca': '\u0d1b',
    'Cha': '\u0d1b',
  },
 'historyPruneRegex': '[aAiIuUeEoO]?[r~]?[kgGcCjJTDNttdnyrlvwSshL]?[hR]?[aAeEiIoOuU]?'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(TCY_LAYOUT);
tcy = TCY_LAYOUT;