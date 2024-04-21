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


var RW_LAYOUT = {
  'id': 'rw',
  'title': 'Kernedumwero ASCII',
  'mappings': {
    's,sc': {  // Shifted for unmapped characters
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    ',c': {  // default upper case ASCII for Kernedumwero
      '': '`1234567890-=' +
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
    '\uf300\uf300': '\uf302',  // For Numerals 1000
    '\uf300\uf301': '\uf303',  // For Numerals 10^4
    '\uf301\uf301': '\uf304',  // 10^5
    '\uf301\uf300': '\uf309',  // 10^10
    '\uf302\u001d\uf300': '\uf305',  // For Numerals 10^6
    '\uf302\u001d\uf301': '\uf306',  // For Numerals 10^7
    '\uf303\u001d\uf300': '\uf307',  // For Numerals 10^8
    '\uf303\u001d\uf301': '\uf308',  // For Numerals 10^9
    '\uf309\u001d\uf300': '\uf400',  // 10^11
    '\uf309\u001d\uf301': '\uf401',  // 10^12
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(RW_LAYOUT);
rw = RW_LAYOUT;
