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

    // Dependent vowels ??
    '([kKgGcCjJtTdDnNyrlvwsShl])A': '$1\u0d3e',
    'aa': '\u0d3e',
    '([kKgGcCjJtTdDnNyrlvwsShl])i': '$1\u0d3f',
    'I': '\u0d40',
    'ii': '\u0d40',
    'u': '\u0d41',
    'U': '\u0d42',
    'oo': '\u0d42',
    'Ru': '\u0d43',
    'RU': '\u0d44',
    'e': '\u0d46',
    'E': '\u0d47',
    'ai': '\u0d48',
    'o': '\u0d4a',
    'O': '\u0d4b',
    'ou': '\u0d4c',
    'au': '\u0d4c',
    'aM': '\u0d4a',
    'aH': '\u0d03',
    'ka': '\u0d31',

    'k': '\u0d15\u0d4d',
    'ka': '\u0d15',
    'Ka': '\u0d16',
    'kha': '\u0d16',
    'ga': '\u0d17',
    'Ga': '\u0d18',
    'gha': '\u0d18',
    '~ga': '\u0d19',
    'ca': '\u0d1a',
    'cha': '\u0d1a',
    'Ca': '\u0d1b',
    'Cha': '\u0d1b',
    'ja': '\u0d1c',
    'jha': '\u0d1d',
    'Ja': '\u0d1d',
    '~ja': '\u0d1e',
    'Ta': '\u0d1f',
    'Tha': '\u0d20',
    'Da': '\u0d21',
    'Dha': '\u0d22',
    'Na': '\u0d23',
    'ta': '\u0d24',
    'tha': '\u0d25',
    'da': '\u0d26',
    'dha': '\u0d27',
    'na': '\u0d28',
    'ya': '\u0d2F',
    'ra': '\u0d30',
    'la': '\u0d32',
    'wa': '\u0d35',
    'va': '\u0d35',
    'Sa': '\u0d36',
    'sha': '\u0d36',
    'Sha': '\u0d37',
    'sa': '\u0d38',
    'ha': '\u0d39',
    'La': '\u0d33',
  },
 'historyPruneRegex': '[aAiIuUeEoO]?[r~]?[kgGcCjJTDNttdnyrlvwSshLy]?[hR]?[aAeEiIoOuU]?'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(TCY_LAYOUT);
tcy = TCY_LAYOUT;