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
      '': '~!@#$₦%&*()_+' +
          '{{\u0323}}WERTYUIOP{}?' +
          'ASDFGHJKL{{Ọ}}{{Ẹ}}' +
          'ZCVBNM<>:\"'
    },
    'c,cl': {
      '': '`1234567890-=' +
          'qwertyuiọp[]\\' +
          'aṣd{{\u030c}}g{{\u0301}}jk{{\u0300}}:"' +
          'zxcvbn{{\u0304}},./'
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
      '': '~!@#$%^&*()_+' +
          'QWẸRTYUIỌP{}|' +
          'AṢDFGHJKL;\'' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '([\u0300\u0301\u0304\u0302\u0323])([eoEO])': '$1$2',  // Placeholder
  },
    'historyPruneRegex': '\u0300|\u0301|\u0304|\u0302'

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(PCM_LAYOUT);
yo1983 = PCM_LAYOUT;