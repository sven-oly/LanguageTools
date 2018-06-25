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

var ONE2_LAYOUT = {
  'id': 'one2',
  'title': 'Onʌyoteʔa·á· V2',
  'mappings': {
    ',': {
      '': '\u00e1\u00e9\u00ed\u00f3{{\u028c\u0301}}\u00fa\u00c1\u00c9\u00cd\u00d3\u00da{{\u0245\u0301}}\u00b7' +
          'qwertyuiop-\u0332/' +   // Combining low line ??
          'asdfghjkl;\'' +
          'zxcvbnmʌʔ.'
    },
    'c': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{}|' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]'
    },
    's,sc': {
      '': '!1234567890()' +
          'QWERTYUIOP{}\u0320' +  // Combining macron below ??
          'ASDFGHJKL:"' +
          'ZXCVBNM\u0245?,'
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
google.elements.keyboard.loadme(ONE2_LAYOUT);
