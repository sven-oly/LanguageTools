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


var AS2_LAYOUT = {
  'id': 'as2',
  'title': 'AS Script',
  'mappings': {
    ',c': {
      '': '\u09f9১২৩৪৫৬৭৮৯০-=' +
          '\u09cc\u09c8\u09be\u09c0\u09c2বহগদজড\u09bc\u09b7' +
          '\u09cb\u09c7\u09cd\u09bf\u09c1প\u09f0কত;\'' +
          '\u09ce\u0982মনৱলস,\u0964/'
    },
    's,sc': {
      '': '{{\u09CD\u09F0}}!@#ঋ%\u0981{{\u0995\u09cd\u09b7}}{{\u09B6\u09CD\u09F0}}()_+' +
          'ঔঐ\u0986ঈঊভঙঘধঝঢঞ{{য়}}' +
          '\u0993\u098f\u0985ইউফটখথ:"' +
          '\u0983{{\u09FA}}ণচছঠশ<>?'
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
google.elements.keyboard.loadme(AS2_LAYOUT);
as2 = AS2_LAYOUT;