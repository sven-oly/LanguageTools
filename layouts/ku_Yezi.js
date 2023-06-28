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


var KU_YEZI_LAYOUT = {
  'id': 'ku_Yezi',
  'title': 'Kurdish Yezidi',
  'direction': 'rtl',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{\ud803\ude9c}}{{\ud803\udea4}}{{\ud803\udea6}}{{\ud803\ude8d}}{{\ud803\ude95}}{{\ud803\udea8}}{{\ud803\udea3}}{{\ud803\udeab}}{{\ud803\udea5}}{{\ud803\ude82}}[]\\' +
          '{{\ud803\ude80}}{{\ud803\ude85}}{{\ud803\ude8b}}{{\ud803\ude99}}{{\ud803\ude9f}}{{\ud803\ude89}}{{\ud803\ude90}}{{\ud803\ude9d}}{{\ud803\udea0}}\u061B{{\ud803\udead}}' +
          '{{\ud803\ude8f}}{{\ud803\ude8a}}{{\ud803\ude86}}{{\ud803\ude9a}}{{\ud803\ude81}}{{\ud803\udea2}}{{\ud803\udea1}}\u060C./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{\ud803\ude97}}{{\ud803\ude93}}{{\ud803\udea9}}{{\ud803\ude8e}}{{\ud803\ude84}}{{\ud803\udeb1}}{{}}{{}}{{}}{{\ud803\ude83}}{}|' +
          '{{\ud803\ude92}}{{\ud803\ude91}}{{\ud803\ude88}}{{\ud803\ude94}}{{}}{{\ud803\udea7}}{{\ud803\ude96}}{{\ud803\ude9e}}{{\ud803\udeb0}}:{{\ud803\udeac}}' +
          '{{\ud803\ude8c}}{{\ud803\ude98}}{{\ud803\ude87}}{{\ud803\ude9b}}{{}}{{}}{{}}<>\u061F'
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
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(KU_YEZI_LAYOUT);
ku_Yezi = KU_YEZI_LAYOUT;
