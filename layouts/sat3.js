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

// From GBoard
var SAT2_LAYOUT = {
  'id': 'sat2',
  'title': 'ᱥᱟᱱᱛᱟᱲᱤ GBoard',
  'mappings': {
    ',c': {
      '': '₹᱑᱒᱓᱔᱕᱖᱗᱘᱙᱐-=' +
          'ᱣᱮᱨᱛᱭᱩᱤᱳᱯᱹ৳,' +
          'ᱟᱥᱫᱝᱜᱷᱦᱡᱠᱞᱢᱴ' +
          'ᱲᱰᱪᱶᱵᱱᱬ᱿᱾ᱽ'
    },
    's,sc': {
      '': '~{{}}{{}}{{}}₹{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}ᱝ{{}}{{}}{{}}ᱲᱧ{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}ᱺ{{}}' +
          'ᱽ ᱬ ᱶ  ᱿᱾'
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
google.elements.keyboard.loadme(SAT2_LAYOUT);
sat2 = SAT2_LAYOUT;