// Navajo virtual keyboard.
// Based on http://www.languagegeek.com/dene/keyboards/Keymaps/Navajo.pdf

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

var NV_LAYOUT = {
  'id' : 'nv',
  'title' : 'Diné bizaad - Modern',
  'mappings' : {
    '' : {
      '' : '{{\u0301}}1234567890-=' +
          'qwertyuiop{{\u0328}}{{\u0328\u0301}}\\' +
          'asdfghjkl{{\u0142}}ʼ' +
          'zxcvbnm,.{{\u0301}}'
    },
    's' : {
        '' : '{{\u0300}}!@#$%^&*()_+' +
          'QWERTYUIOP{{\u201c}}{{\u201d}}|' +
              'ASDFGHJKL{{\u0141}}/' +
          'ZXCVBNM;:?'
    },
    'c,l,cl' : {  // Lock
      '' : '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,scl' : {  // Shift lock
      '' : '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },

  // To handle tilde-N and accented characters
  'transform' : {
    'a\u0301' : '\u00e1',  // a with accent
    'a\u0328' : '\u0105',  // a with ogonek
    'a\u0328\u0301' : '\u0105\u0301',  // a with accent and ogenek
    'e\u0301' : '\u00e9',  // e with accent
    'e\u0328' : '\u0119',  // e with ogonek
    'e\u0328\u0301' : '\u0119\u0301',  // e with accent and ogenek
    'i\u0301' : '\u00ed',  // i with accent
    'i\u0328' : '\u012f',  // e with ogonek
    'i\u0328\u0301' : '\u012f\u0301',  // i with accent and ogenek
    'o\u0301' : '\u00f3',  // o with accent
    'o\u0328' : '\u01eb',  // o with ogonek
    'o\u0328\u0301' : '\u01eb\u0301',  // o with accent and ogenek
    'n\u0301': '\u0144',  // n with accent
    'n\u0328\u0301': '\u0144\u0328',  // n with accent and ogenek
    'n~': '\u00f1',  // n with tilde

    'A\u0301' : '\u00c1',  // A with accent
    'A\u0328' : '\u0104',  // A with ogonek
    'A\u0328\u0301' : '\u0104\u0301',  // A with accent and ogenek
    'E\u0301' : '\u00c9',  // E with accent
    'E\u0328' : '\u0118',  // E with ogonek
    'E\u0328\u0301' : '\u0118\u0301',  // E with accent and ogenek
    'I\u0301' : '\u00cd',  // I with accent
    'I\u0328' : '\u012e',  // I with ogonek
    'I\u0328\u0301' : '\u012e\u0301',  // I with accent and ogenek
    'O\u0301' : '\u00d3',  // O with accent
    'O\u0328' : '\u01ea',  // O with ogonek
    'O\u0328\u0301' : '\u01ea\u0301',  // O with accent and ogenek
    'N\u0301': '\u0143',  // N with accent
    'N\u0328\u0301': '\u0143\u0328',  // N with accent and ogenek
    'N~': '\u00d1'  // N with tilde
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(NV_LAYOUT);