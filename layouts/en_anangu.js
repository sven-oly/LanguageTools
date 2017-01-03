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

// Implements AuSIL keyboard for Aṉangu Yolŋu Australian languages.
// Reference: http://learnline.cdu.edu.au/yolngustudies/resourcesKeyboard.html
// http://www.ausil.org.au/node/3719

var EN_ANANGU_LAYOUT = {
  'id': 'en_anangu',
  'title': 'A\u1e49angu Yol\u014bu',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
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
  'transform': {
    ';j' : '\u014b',
    ';J' : '\u014a',
    ';a' : '\u00E4',
    ';A' : '\u00C4',
    ';d' : '\u1e0f',
    ';D' : '\u1e0e',
    ';l' : '\u1e3b',
    ';L' : '\u1e3a',
    ';n' : '\u1e49',
    ';N' : '\u1e48',
    ';r' : '\u1e5f',
    ';R' : '\u1e5e',
    ';t' : '\u1e6f',
    ';T' : '\u1e6e',
    ';;' : ';',
    '; ' : ';',
    '< ' : '\u2018',
    '<<' : '\u201c',
    '<{' : '<',
    '> ' : '\u2019',
    '>>' : '\u201d',
    '>}' : '>',

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(EN_ANANGU_LAYOUT);
