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


var CHO2_LAYOUT = {
  'id': 'cho2',
  'title': 'Chahta 2',
  'mappings': {
    '': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'c': {
      '': '`1234567890-=' +
          'q\u1ea1ertyuiop[]\\' +
          'asdfghjk\u0142;\'' +
          'zxcvbⁿm,./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'sc': {
      '': '~!@#$%^&*()_+' +
          'Q\u1ea0ERTYUIOP{}|' +
          'ASDFGHJK\u0141:"' +
          'ZXCVBⁿM<>?'
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
    '\"a': '\u028A',  // latin upsilon
    '\"A': '\u01B1',  // latin upsilon
    '\"e': '\u028A\u0331',  // latin upsilon with line below
    '\"E': '\u01B1\u0331',  // latin upsilon
    '\"i': '\u028A\u0301',  // latin upsilon with line below
    '\"I': '\u01B1\u0301 ',  // latin upsilon
    '\"o': '\u028A\u0301\u0331',  // latin upsilon with acute
    '\"O': '\u01B1\u0301\u0331',  // latin upsilon
    '\"y': '\u00B7',  // latin upsilon
    '\'a': 'a\u0331',
    '\'e': 'e\u0331',
    '\'i': 'i\u0331',
    '\'o': 'o\u0331',
    '\'u': 'u\u0331',
    '\'A': 'A\u0331',
    '\'E': 'E\u0331',
    '\'I': 'I\u0331',
    '\'O': 'O\u0331',
    '\'U': 'U\u0331',
    '`a': 'a\u0301',
    '`e': 'e\u0301',
    '`i': 'i\u0301',
    '`o': 'o\u0301',
    '`u': 'u\u0301',
    '`A': 'A\u0301',
    '`E': 'E\u0301',
    '`I': 'I\u0301',
    '`O': 'O\u0301',
    '`U': 'U\u0301',
    ';a': 'a\u0301\u0331',
    ';e': 'e\u0301\u0331',
    ';i': 'i\u0301\u0331',
    ';o': 'o\u0301\u0331',
    ';u': 'u\u0301\u0331',
    ';A': 'A\u0301\u0331',
    ';E': 'E\u0301\u0331',
    ';I': 'I\u0301\u0331',
    ';O': 'O\u0301\u0331',
    ';U': 'U\u0301\u0331'
  },
  'historyPruneRegex': '\"\'`;",'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CHO2_LAYOUT);
cho2 = CHO2_LAYOUT;