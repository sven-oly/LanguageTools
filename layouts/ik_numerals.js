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


var IK_NUM_LAYOUT = {
  'id': 'ik_numerals',
    'title': 'Iñupiaq with Kaktovik numerals',
    'source': 'https://www.languagegeek.com/inu/keyboard/keymaps/Inupiaq.pdf',
  'mappings': {
    ',c': {
      '': '{{̣ }}{{\ud834\udec1}}{{\ud834\udec2}}{{\ud834\udec3}}{{\ud834\udec4}}{{\ud834\udec5}}{{\ud834\udec6}}{{\ud834\udec7}}{{\ud834\udec8}}{{\ud834\udec9}}{{\ud834\udec0}}-=' +
          'qwertyuiopñł/' +
          'asdfghjkl{{ġ}}’' +
          'zxcvbnm,.ŋ'
    },
    's': {
      '': '‘{{\ud834\udecb}}{{\ud834\udecc}}{{\ud834\udecd}}{{\ud834\udece}}{{\ud834\udecf}}{{\ud834\uded0}}{{\ud834\uded1}}{{\ud834\uded2}}{{\ud834\uded3}}{{\ud834\udeca}}_+' +
          'QWERTYUIOPÑŁ?' +
          'ASDFGHJKL{{Ġ}}"' +
          'ZXCVBNM;:Ŋ'
    },
    'sc': {
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
      // Backslash before each of the lower values gives
      // the numberal + 10
      '\\\\\ud834\udec0': '\ud834\udeca', 
      '\\\\\ud834\udec1': '\ud834\udecb', 
      '\\\\\ud834\udec2': '\ud834\udecc', 
      '\\\\\ud834\udec3': '\ud834\udecd', 
      '\\\\\ud834\udec4': '\ud834\udece', 
      '\\\\\ud834\udec5': '\ud834\udecf', 
      '\\\\\ud834\udec6': '\ud834\uded0', 
      '\\\\\ud834\udec7': '\ud834\uded1', 
      '\\\\\ud834\udec8': '\ud834\uded2', 
      '\\\\\ud834\udec9': '\ud834\uded3'
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(IK_NUM_LAYOUT);
ik_numerals = IK_NUM_LAYOUT;
