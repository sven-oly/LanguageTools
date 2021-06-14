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


var SUZ_JENTICHA_PUA_LAYOUT = {
  'id': 'suz_jenticha_PUA',
  'title': 'Kõits-Bleshe-Sunuwar PUA',
  'mappings': {
    ',c': {
      '': '\ued4f\ued31\ued32\ued33\ued34\ued35\ued36\ued37\ued38\ued39\ued30-=' +
          '\ued71\ued77\ued65\ued72\ued74\ued79\ued75\ued69\ued6F\ued70[]\\' +
          '\ued61\ued73\ued7d\ued66\ued67\ued68\ued6A\ued6B\ued6B\u003b\u0027' +
          '\ued7A\ued78\ued63\ued76\ued2c\ued6E\ued6D,./'
    },
    's,sc': {
      '': '\ued3c!@#$%^&*()_+' +
          '\ued7e\ued57\u00b7\u00f8\u03a9\u00b1\u2264\u2265\u00a6\u2980{}|' +
          '\ued41\ued73\ued2e\ued27\ued2d\ued59\ued3f\ued3e:"' +
          '\u221a\u2260\u2122\u00a9\u2211\u2030\ued2f<>?'
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
google.elements.keyboard.loadme(SUZ_JENTICHA_PUA_LAYOUT);
suz_jenticha_PUA = SUZ_JENTICHA_PUA_LAYOUT;