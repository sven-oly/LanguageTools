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
      '': '`\ued31\ued32\ued33\ued34\ued35\ued36\ued37\ued38\ued39\ued30-=' +
          '\ued71\ued77\ued65\ued72\ued74\ued79\ued75\ued69\ued6F\ued70[]\\' +
          '\ued41\ued73\ued73\ued64\ued66\ued67\ued68\ued6A\ued6B\ued3b\u0027' +
          '\ued7A\ued78\ued63\ued76\ued62\ued6E\ued6D,|/'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '\ued71\ued77\ued45\ued72\ued74\ued79\ued55\ued49\ued4F\ued70{}|' +
          '\ued41\ued73\ued73\ued64\ued66\ued67\ued68\ued6A\ued6B:"' +
          '\ued7A\ued78\ued63\ued76\ued62\ued6E\ued6D<>?'
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
en = SUZ_JENTICHA_PUA_LAYOUT;