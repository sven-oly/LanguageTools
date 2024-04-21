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

// Mingrelian in Georgian script
// Source: https://translit.cc/ge/

var XMF_TRANS_LIT_LAYOUT = {
  'id': 'xmf_translit',
  'title': 'translit.cc/ge/',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'ყვერთyუიოფ[]\\' +
          'აბდფგჰჯქლ;\'' +
          'ზხცვბნმ,./'
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
    'ქ\'': 'კ',  // k'
    'ფ\'': 'პ',  // p'
    'ზჰ':  'ჟ',
    'ზჰ': 'ჟ',
    'თ\'': 'ტ',
    'თს': 'ც',
    'გჰ': 'ღ',
    'სჰ': 'შ',
    'ცჰ': 'ჩ',
    'ც\'': 'წ',
    'თს': 'ც',
    'დზ': 'ძ',
    'ც\'': 'წ',  // ts'
    'ჩ\'': 'ჭ',
    'ქჰ':  'ხ',
    '--': '—',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(XMF_TRANS_LIT_LAYOUT);
xmf_translit = XMF_TRANS_LIT_LAYOUT;

