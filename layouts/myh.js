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
  'source': 'http://www.makahmuseum.com/makah-keyboard/',
  'mappings': {
    '': {
      '': '{{ḥ}}!{{ʷ}}{{š}}{{č}}{{ƛ}}{{ŋ}}{{x\u030c}}{{ɫ}}{{ʔ}}{{\u00B0}}-=' +
          'qwertyuiop‘’\\' +
          'asdfghjkl{{\u00B7}}{{\u0313}}' +
          'zxcvbnm,./'
    },
    's': {
      '': 'Ḥ!{{ᵂ}}{{Š}}{{Č}}%{{Ŋ}}{{X\u030c}}{{Ɫ}}()_+' +
          'QWERTYUIOP“”|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'c': {
      '': '`1234567890«»' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]\\' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}};\'' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}},./'
    },
    'sc': {
      '': '~!@#$%^&*(){{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{}|' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}:"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}<>?'
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
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MYH_LAYOUT);
myh = MYH_LAYOUT;
