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


var BFZ1_LAYOUT = {
  'id': 'bfz1',
  'title': 'Mahasu-Takri test keyboard ',
  'mappings': {
    ',c': {
      '': '{{\ud805\udeb6}}{{\ud805\udec1}}{{\ud805\udec2}}{{\ud805\udec3}}{{\ud805\udec4}}{{\ud805\udec5}}{{\ud805\udec6}}{{\ud805\udec7}}{{\ud805\udec8}}{{\ud805\udec9}}{{\ud805\udec0}}{{\ud805\udeb9}}{{\ud805\udeb7}}' +
          '{{\ud805\udead}}{{\ud805\udeae}}{{\ud805\ude86}}{{\ud805\udea4}}{{\ud805\ude94}}{{\ud805\udea3}}{{\ud805\ude84}}{{\ud805\ude82}}{{\ud805\ude88}}{{\ud805\ude9e}}[]{{\ud805\udeb7}}' +
          '{{\ud805\ude80}}{{\ud805\udea8}}{{\ud805\ude96}}{{\ud805\udeb2}}{{\ud805\ude8c}}{{\ud805\udea9}}{{\ud805\ude91}}{{\ud805\ude8a}}{{\ud805\udea5}}{{\ud805\udeac}}{{\ud805\udeab}}' +
          '{{\ud805\udeb0}}{{\ud805\udeb4}}{{\ud805\ude8f}}{{\ud805\udea6}}{{\ud805\udea0}}{{\ud805\ude98}}{{\ud805\udea2}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{\ud805\udeb5}}{{\ud805\udeaf}}{{\ud805\ude87}}{{\ud805\udeaa}}{{\ud805\ude95}}Y{{\ud805\ude85}}{{\ud805\ude83}}{{\ud805\ude89}}{{\ud805\ude9f}}{}|' +
          '{{\ud805\ude81}}{{\ud805\udea7}}{{\ud805\ude97}}{{\ud805\ude8d}}{{}}{{\ud805\ude92}}{{\ud805\ude8b}}{{}}{{}}:"' +
          '{{\ud805\udeb1}}{{}}{{\ud805\ude90}}{{}}{{\ud805\udea1}}{{\ud805\ude93}}{{}}<>?'
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
google.elements.keyboard.loadme(BFZ1_LAYOUT);
bfz1 = BFZ1_LAYOUT;