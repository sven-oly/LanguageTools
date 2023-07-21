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

// Implements keyboard with phonetic characters for Otomanguean languages.
// https://en.wikipedia.org/wiki/Oto-Manguean_languages

var OMQ_ACCENTS_LAYOUT = {
  'id': 'omq_accents',
  'title': 'Acentos fonéticos otomangues, teclado español',
  'mappings': {
    '': {
      '': '{{S||\u200b\u0346||\u0346}}{{S||\u005e||\u0302}}{{S||\u00af||\u0304}}{{S||\u00b4||\u0301}}{{S||\u0060||\u0300}}{{S||\u02d8||\u0306}}{{S||\u200b\u030F||\u030f}}{{S||\u200b\u0303||\u0303}}{{S||\u200b\u0311||\u0311}}{{S||\u200b\u030b||\u030b}}{{S||\u200b\u030c||\u030c}}{{S||\u200b\u030a||\u030a}}¡' +
          'qwertyuiop`+ç' +
          'asdfghjklñ´' +
          'zxcvbnm,.-'
    },
    's': {
      '': 'ª!"·$%&/()=?¿' +
          'QWERTYUIOP^*Ç' +
          'ASDFGHJKLÑ¨' +
          'ZXCVBNM;:_'
    },
    'c, sc': {
      '': '\|@#~€¬{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '1234567890[]}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
    },
    'l,cl': {
      '': 'º1234567890-=' +
          'qwertyuiop`+ç' +
          'asdfghjklñ´' +
          'zxcvbnm,.-'
    },
    'sl,scl': {
      '': 'ª!"·$%&/()=?¿' +
          'QWERTYUIOP^*Ç' +
          'ASDFGHJKLÑ¨' +
          'ZXCVBNM;:_'
    }
  },

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(OMQ_ACCENTS_LAYOUT);
omq_accents = OMQ_ACCENTS_LAYOUT;
