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


var RAD1_LAYOUT = {
  'id': 'rad1',
  'title': 'Rhade 1',
  'mappings': {
    ',c': {
      '': '{{S||\u00a0\u0302\u0306||\u0302\u0306}}1234567890-=' +
          '{{S||\u02D8||\u0306}}wertyuiop[]\\' +
          'asd{{\u0111}}{{\u00f1}}hjkl;\'' +
          '{{S||\u00a0\u031b||\u031b}}{{\u010d}}c{{\u0180}}bnm,./'
    },
    's,sc': {
      '': '{{S||\u00a0\u0311||\u0311}}!@#$%^&*()_+' +
          '{{S||^||\u0302}}WERTYUIOP{}|' +
          'ASD{{\u0110}}{{\u00d1}}HJKL:"' +
          '{{S||\u00a0\u0306\u031b||\u0306\u031b}}CB{{\u0243}}NM<>?'
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
    'u\u0306': '\u016d',  // u with breve
    'U\u0306': '\u016c',  // u with breve
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(RAD1_LAYOUT);
rad1 = RAD1_LAYOUT;
