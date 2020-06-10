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

// Layout suggested by 1983 technical report to the Federal Ministry of Education,
// Science and Technology for the National Language Centre,
// by Victor Manfredi, 23 July 1985, Lagos

// Includes dead keys for acute, grave, macron, circumflex

var PCM_LAYOUT = {
  'id': 'pcm',
  'title': 'Naijíriá Píjin',
  'mappings': {
    '': {
      '': '{{\u0300}}1234567890-=' +
          '{{\u0301}}wertyuiop[]/' +
          'asdfghjkl{{ọ}}{{ẹ}}' +
          'zcvbnm,.;\''
    },
    's': {
      '': '{{\u0300}}!@#$₦%&*()_+' +
          '{{\u0301}}WERTYUIOP{}?' +
          'ASDFGHJKL{{Ọ}}{{Ẹ}}' +
          'ZCVBNM<>:\"'
    },
    'c,cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'l': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'sc,scl': {
      '':  '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
      'a\u0300': 'à',
      'e\u0300': 'è',
      'o\u0300': 'ò',

      'A\u0300': 'À',
      'E\u0300': 'È',
      'O\u0300': 'Ò',

      'a\u0301': 'á',
      'e\u0301': 'é',
      'o\u0301': 'ó',

      'A\u0301': 'Á',
      'E\u0301': 'É',
      'O\u0301': 'Ó',

      'a\u0323': 'ạ',
      'e\u0323': 'ẹ',
      'o\u0323': 'ọ',

      'A\u0323': 'Ạ',
      'E\u0323': 'Ẹ',
      'O\u0323': 'Ọ',
      // Doubled single quote --> lower dot combining mark
      "\'\'": '\u0323'
  },
  'historyPruneRegex': '\u0300|\u0301|\u0323'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(PCM_LAYOUT);
yo1983 = PCM_LAYOUT;