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


var GON_MASARAM_LAYOUT = {
  'id': 'gon_masaram',
  'title': 'Gondi Masaram',
  'mappings': {
    ',c': {
      '': '`{{\ud807\udd51}}{{\ud807\udd52}}{{\ud807\udd53}}{{\ud807\udd54}}{{\ud807\udd55}}{{\ud807\udd56}}' +
            '{{\ud807\udd57}}{{\ud807\udd58}}{{\ud807\udd59}}{{\ud807\udd50}}{{\ud807\udd42}}{{\ud807\udd30}}' +
          '{{\ud807\udd34}}{{\ud807\udd35}}{{\ud807\udd24\ud807\udd45}}{{\ud807\udd18}}{{\ud807\udd13}}' +
            '{{\ud807\udd27}}{{\ud807\udd1f}}{{\ud807\udd20}}{{\ud807\udd0d}}{{\ud807\udd11}}{{\ud807\udd0d\ud807\udd45}},?' +
          '{{\ud807\udd40}}{{\ud807\udd3a}}{{\ud807\udd0c}}{{\ud807\udd32}}{{\ud807\udd2c}}{{\ud807\udd33}}' +
            '{{\ud807\udd26}}{{\ud807\udd31}}{{\ud807\udd26}}{{\ud807\udd40\ud807\udd45}}{{\ud807\udd29\ud807\udd45}}' +
          '{{\ud807\udd36}}{{\ud807\udd0e}}{{\ud807\udd22}}{{\ud807\udd00}}{{\ud807\udd02}}{{\ud807\udd1d}}' +
            '{{\ud807\udd1d}}{{\ud807\udd04}}{{???}}{{\ud807\udd1e}}'
    },
    's,sc': {
      '': '~!\\{{\ud807\udd26\ud807\udd45}}+{{\ud807\udd41}}^-}*()_+' +
          '{{\ud807\udd21}}{{\ud807\udd21\ud807\udd45}}ERTYUIOP{}|' +
          '{{\ud807\udd40}}{{\ud807\udd3c}}DFGHJKL;\'' +
          'ZXCVBNM{{\ud807\udd27\ud807\udd45}}{{\ud807\udd2e}}?'
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
google.elements.keyboard.loadme(GON_MASARAM_LAYOUT);
