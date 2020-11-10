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

// Includes capitals for letters in top row.
var MYH_LAYOUT = {
  'id': 'myh',
  'title': 'qʷi·qʷi·diččaq',
  'source': 'http://www.languagegeek.com/nwc/keymaps/WakashanCanada/MakahNum.pdf',
  'mappings': {
    '': {
      '': '`{{\u030c}}{{ʷ}}{{š}}{{č}}{{ƛ}}{{ŋ}}{{x\u030c}}{{ɫ}}{{ʔ}}{{\u00B0}}-=' +
          'qwertyuiop‘’\\' +
          'asdfghjkl{{\u00B7}}{{\u0313}}' +
          'zxcvbnm,./'
    },
    's': {
      '': '~!{{ᵂ}}{{Š}}{{Č}}%{{Ŋ}}{{X\u030c}}{{Ɫ}}()_+' +
          'QWERTYUIOP“”|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'c,l,cl': {
      '': '`1234567890«»' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,scl': {
      '': '~!@#$%^&*()‹›' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MYH_LAYOUT);
en = MYH_LAYOUT;