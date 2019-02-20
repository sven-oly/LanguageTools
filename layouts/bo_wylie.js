// Tibetan virtual keyboard, based on Monlam tibetan keyboard
// 28-Dec-2016.
//
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


var BO_WYLIE_LAYOUT = {
  'id': 'bo_wyline',
  'title': 'Tibetan Wylie input', // Revise this
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          '{{ཨ}}sdfghjkl:"' +
          'zxcvbnm<>?'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    }
  },
  'transform': {
    'ka' : 'ཀ',
    'ca' : 'ཅ',
    'kha': 'ཁ',
    'ga': 'ག',
    'nga': 'ང',
    'ca': 'ཅ',
    'cha': 'ཆ',
    'ja': 'ཇ',
    'nya': 'ཉ',
    'ta': 'ཏ',
    'tha': 'ཐ',
    'da': 'ད',
    'na': 'ན',
    'pa': 'པ',
    'pha': 'ཕ',
    'ba': 'བ',
    'ma': 'མ',
    'tsa': 'ཙ',
    'tsha': 'ཚ',
    'dza': 'ཛ',
    'wa': 'ཝ',
    'zha': 'ཞ',
    'za': 'ཟ',
    "'a": 'འ',
    'ya': 'ཡ',
    'ra': 'ར',
    'la': 'ལ',
    'sha': 'ཤ',
    'sa': 'ས',
    'ha': 'ཧ',
    'a': 'ཨ',
    'i': 'ི',
    'u': 'ུ',
    'e': 'ེ',
    'o': 'ོ',
    'y', 'ྱ'
    // TODO: Handle y, gy, g, 'g.y'??
    // Handle doubled ee and oo

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BO_UNICODE_LAYOUT);
