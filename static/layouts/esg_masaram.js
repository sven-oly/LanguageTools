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


var ESG_MASARAM_LAYOUT = {
  'id': 'esg_masaram',
  'title': 'Gondi Masaram 2',
  'mappings': {
    ',c': {
      '': '`{{\ud807\udd51}}{{\ud807\udd52}}{{\ud807\udd53}}{{\ud807\udd54}}{{\ud807\udd55}}{{\ud807\udd56}}' +
            '{{\ud807\udd57}}{{\ud807\udd58}}{{\ud807\udd59}}{{\ud807\udd50}}-=' +
          '{{\ud807\udd1b}}{{\ud807\udd15}}{{\ud807\udd06}}{{\ud807\udd26}}{{\ud807\udd16}}' +
            '{{\ud807\udd25}}{{\ud807\udd04}}{{\ud807\udd02}}{{\ud807\udd00}}{{\ud807\udd20}}{{\ud807\udd1d}}{{\ud807\udd43}}\\' +
          '{{\ud807\udd00}}{{\ud807\udd28}}{{\ud807\udd18}}{{\ud807\udd42}}{{\ud807\udd0e}}{{\ud807\udd2c}}' +
            '{{\ud807\udd13}}{{\ud807\udd0c}}{{\ud807\udd27}};{{\u2019}}' +
          '{{\ud807\udd29}}{{\ud807\udd11}}{{\ud807\udd28}}{{\ud807\udd22}}{{\ud807\udd1f}}{{\ud807\udd24}}' +
            '{{\ud807\udd1d}},./'
    },
    's,sc': {
      '': '~!@{{\ud807\udd30}}{{\ud807\udd46}}{{\ud807\udd2f}}^{{\ud807\udd2e}}*()_+' +
          '{{\ud807\udd1c}}{{\ud807\udd10}}{{\ud807\udd06}}{{\ud807\udd36}}{{\ud807\udd17}}{{\ud807\udd08}}' +
            '{{\ud807\udd05}}{{\ud807\udd03}}{{\ud807\udd09}}{{\ud807\udd21}}{{\ud807\udd1e}} |' +
          '{{\ud807\udd01}} {{\ud807\udd19}}{{\ud807\udd47}}{{\ud807\udd0f}}{{\ud807\udd41}}{{\ud807\udd14}}' +
            '{{\ud807\udd0d}}{{\ud807\udd2d}};\"' +
          '{{\ud807\udd2A}}{{\ud807\udd44}}{{\ud807\udd12}}{{\ud807\udd0B}}{{\ud807\udd23}}{{\ud807\udd1A}}' +
          '{{\ud807\udd40}}{{\u2018}}{{\u2019}}?'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl:"' +
          'zxcvbnm,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(ESG_MASARAM_LAYOUT);
gon_masaram = ESG_MASARAM_LAYOUT;