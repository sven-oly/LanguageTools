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


var IG_LAYOUT = {
  'id': 'ig',
  'title': 'Igbo input for Nsibidi',
  'mappings': {
    ',c': {
      '': '{{\u0300}}1234567890-=' +
          'qw\u00e9rtyuiop[]{{\u0323}}' +
          '\u00e1sdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*(){{\u0301}}+' +
          'QW\u00e8RTYUIOP{}|' +
          '\u00e0SDFGHJKL:"' +
          'ZXCVB\u0144\u1e3f<>?'
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
    // Replace with combined characdters
    'a\u0300': '\u00e0',
    'a\u0301': '\u00e1',
    'e\u0300': '\u00e8',
    'e\u0301': '\u00ed',
    'i\u0301': '\u00ed',
    'i\u0300': '\u00ec',
    'i\u0323': '\u1ecb',
    'o\u0300': '\u00f2',
    'o\u0301': '\u00f3',
    'o\u0323': '\u1ecd',
    'u\u0300': '\u00f9',
    'u\u0301': '\u00fa',
    'u\u0323': '\u1ee5',
    'm\u0301': '\u1e3f',
    'u\u0323': '\u1ee5',
    'n\u0301': '\u0144',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(IG_LAYOUT);
ig = IG_LAYOUT;