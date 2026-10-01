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

// Caps lock is Spanish keyboard
var CTO_102_LAYOUT = {
  'id': 'cto_102',
  'title': 'Emberá Catío 102',
  'is102Keyboard': true,
  'mappings': {
    '': {  // base layer
      '': '°1234567890\'¿' +
          '\ua78cwertyuʉop\u00a8+\u0020' +
          'asd\u0257gijkl\u00f1\u007e' +
          '{{\u0289\u0303}}{{bu}}{{rr}}{{ch}}\u0253bnm,.-'
    },
    's': {  // shift layer
      '': "|!\"#$%&/()=?¡" +
          "\u00b4WERTYU\u0244OP\u0000\u0000\u0020" +
          "ASDƊGIJKLÑ\u0060" +
          "{{\u0244\u0303}}{{BU}}{{RR}}{{CH}}\u0181BNM;:_"
    },
    'c': {  // ctrl + alt layer
      '': '`1234567890-=' +
          '\ua78cwertyuiop[]\\' +
          'asdfghjk\u0142;\'' +
          'zxcvbⁿm,./'
    },
    'sc': {  // shift + ctrl + alt layer
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJK\u0141:"' +
          'ZXCVBⁿM<>?'
    },
    'l': {  // caps lock - Spanish
      '': 'º1234567890\'¡' +
          'qwertyuiop`+ç' +
          'asdfghjklñ´' +
          'zxcvbnm,.-\''
    },
    'sl': {  // caps lock shift - Spanish
      '': 'ª!"·$%&/()=?¿' +
      'QWERTYUIOP^*Ç' +
      'ASDFGHJKLÑ¨' +
      'ZXCVBNM;:_'
    },
    'cl': {  // caps lock ctrl + alt - Spanish
      '': '\|@#~€¬{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}}' +
          ''
    },
  },
  'transform': {
    '\u007e([aeiouAEIOU])': '$1\u0303',  // tilde
    '\u0303([aeiouAEIOU])': '$1\u0303',
    '\u00a8([aeiouAEIOU])': '$1\u0308',  // diaresis
    '\u00b4([aeiouAEIOU])': '$1\u0301',  // acute accent
    '\u0060([aeiouAEIOU])': '$1\u0300',  // acute accent
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CTO_102_LAYOUT);
cto_102 = CTO_102_LAYOUT;
