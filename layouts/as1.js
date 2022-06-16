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


var AS1_LAYOUT = {
  'id': 'as1',
  'title': 'Assamese fonatic',
  'mappings': {
    ',c': {
      '': '\u09f9১২৩৪৫৬৭৮৯০-=' +
          '\u09a6\u09c2\u09c0\u09f0\u099F\u098f\u09c1\u09bf\u0993\u09AA\u09c7\u09cb\u09F1' +
          '\u09be\u09B8\u09A1\u09A4\u0997\u09B9\u099C\u09B2\u0995;\'' +
          '{{\u09AF\u09BC}}\u09B6\u099A\u099D\u09AC\u09A8\u09AE,\u09f7\u09cd'
    },
    's,sc': {
      '': '~!@#$%\u099E&*()_+' +
          '\u09A7\u098A\u0988{{\u09A1\u09BC}}\u09A0\u0990\u0989\u0987\u0994\u09AB\u09c8\u09cc|' +
          '\u0985\u09B7\u09A2\u09A5\u0998\u0983\u099D\u0996\u0982:"' +
          '\u09AF{{\u09A2\u09BC}}\u099B\u098B\u09AD\u09A3\u0999\u09e2\u0981?'
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
google.elements.keyboard.loadme(AS1_LAYOUT);
as1 = AS1_LAYOUT;