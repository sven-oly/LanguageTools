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
var viewIdPrefix_ = '102kbd-k-';

// Caps lock is Spanish keyboard
var CTO_LAYOUT = {
  'id': 'cto',
  'title': 'Emberá Catío',
  //'is102Keyboard': true,
  'mappings': {
    '': {  // base layer
      '': '°1234567890\'¿' +
          '{{\ua78c}}wertyu\u0289op{{S||\u00a8||\u0308}}+-' +
          'asd\u0257gijkl\u00f1{{S||\u007e||\u0303}}' +
          '{{\u0289\u0303}}{{bu}}{{rr}}{{ch}}\u0253bnm,.-'
    },
    's': {  // shift layer
      '': '|!"#$%&/()=?¡' +
          '{{}}WERTYU\u0244OP{{}}{{}}_' +
          'ASD\u018aGIJKL\u00d1{{\u0060}}' +
          '{{\u0244\u0303}}{{BU}}{{RR}}{{CH}}\u0181BNM;:'
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
    'l': {  // caps lock
      '': 'º1234567890\'¡' +
          'qwertyuiop`+ç' +
          'asdfghjklñ´' +
          'zxcvbnm,.-\''
    },
    'sl': {  // caps lock shift
      '': 'ª!"·$%&/()=?¿' +
      'QWERTYUIOP^*Ç' +
      'ASDFGHJKLÑ¨' +
      'ZXCVBNM;:_'
    },
    'cl': {  // caps lock ctrl + alt
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
    '\u0308([aeiouAEIOU])': '$1\u0308',  // diaresis
    '\u00b4([aeiouAEIOU])': '$1\u0301',  // acute accent
    '\u0301([aeiouAEIOU])': '$1\u0301',  // acute accent
    '\u0060([aeiouAEIOU])': '$1\u0300',  // acute accent
    '\u0300([aeiouAEIOU])': '$1\u0300',  // acute accent
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CTO_LAYOUT);
cto = CTO_LAYOUT;
