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

// TODO: decide if there should be capital letters with accents,
// capital turned V (and with accent), or others.
// Perhaps on cntr-alt level?

var ONE_LAYOUT = {
  'id': 'one',
  'title': 'Onʌyoteʔa·á·',
  'mappings': {
    ',c': {
      '': '`1234567890-\u00b7' +
          '\u0245wertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!\u00e1\u00e9\u00ed\u00f3{{\u028c\u0301}}\u00fa*()_+' +
          '{{\u0245\u0301}}WERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM\u0294\u028c?'
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
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(ONE_LAYOUT);
