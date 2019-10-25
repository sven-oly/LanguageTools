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

// \u011E2C0 -> d838 dec0

var NNP_LAYOUT = {
  'id': 'nnp',
  'title': 'Wancho',
  'mappings': {
    ',c': {
      '': '`{{\ud838\udef1}}{{\ud838\udef2}}{{\ud838\udef3}}{{\ud838\udef4}}{{\ud838\udef5}}{{\ud838\udef6}}{{\ud838\udef7}}{{\ud838\udef8}}{{\ud838\udef9}}{{\ud838\uded0}}-=' +
          '{{\ud838\ude17}}{{\ud838\ude2c}}{{\ud838\ude30}}{{\ud838\ude16}}{{\ud838\ude03}}{{\ud838\ude18}}{{\ud838\ude27}}{{\ud838\ude33}}{{\ud838\ude28}}{{\ud838\ude1a}}{{\ud838\ude3d}}{{\ud838\ude36}}\\' +
          '{{\ud838\ude24}}{{\ud838\ude26}}{{\ud838\ude0f}}{{\ud838\ude34}}{' +
	    '{\ud838\ude01}}{{\ud838\ude04}}{{\ud838\ude14}}{{\ud838\ude0e}}{{\ud838\ude09}};{{\ud838\ude39}}' +
          '{{\ud838\ude6b}}{{\ud838\ude06}}{{\ud838\ude08}}{{\ud838\ude12}}{{\ud838\ude1c}}{{\ud838\ude05}}{{\ud838\ude00}},./'
    },
    's,sc': {
      '': '~!{{\ud838\ude4f}}#{{\ud838\ude4e}}%^&*()_+' +
          '{{\ud838\ude19}}{{\ud838\ude2a}}{{\ud838\ude32}}{{\ud838\ude11}}{{\ud838\ude02}}{{\ud838\ude10}}{{\ud838\ude2b}}{{\ud838\ude31}}{{\ud838\ude29}}{{\ud838\ude21}}{{\ud838\ude3a}}{{\ud838\ude3b}}\\' +
          '{{\ud838\ude25}}{{\ud838\ude0a}}{{\ud838\ude1d}}{{\ud838\ude35}}{{\ud838\ude13}}{{\ud838\ude1f}}{{\ud838\ude0d}}{{\ud838\ude07}}{{\ud838\ude23}};\"' +
          '{{\ud838\ude38}}{{\ud838\ude1b}}{{\ud838\ude0c}}{{\ud838\ude15}}{{\ud838\ude1e}}{{\ud838\ude22}}{{\ud838\ude20}}{{\ud838\ude37}}{{\ud838\ude3c}}?'
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
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(NNP_LAYOUT);
