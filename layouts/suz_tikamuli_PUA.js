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

// Uses private use area U+ec31 ... for Tikamula script (not yet encoded)
var SUZ_TIKAMULI_PUA_LAYOUT = {
  'id': 'suz_tikamuli_PUA',
  'title': 'Kõinch PUA',
  'mappings': {
    ',c': {
      '': '`\uec31\uec32\uec33\uec34\uec35\uec36\uec37\uec38\uec39\uec30-=' +
          '\uec71\uec77\uec65\uec72\uec74\uec79\uec75\uec69\uec6F\uec70[]\\' +
          '\uec41\uec73\uec73\uec64\uec66\uec67\uec68\uec6A\uec6B\uec3b\u0027' +
          '\uec7A\uec78\uec63\uec76\uec62\uec6E\uec6D,|/'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '\uec71\uec77\uec45\uec72\uec74\uec79\uec55\uec49\uec4F\uec70{}|' +
          '\uec41\uec73\uec73\uec64\uec66\uec67\uec68\uec6A\uec6B:"' +
          '\uec7A\uec78\uec63\uec76\uec62\uec6E\uec6D<>?'
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
google.elements.keyboard.loadme(SUZ_TIKAMULI_PUA_LAYOUT);
en = SUZ_TIKAMULI_PUA_LAYOUT;
