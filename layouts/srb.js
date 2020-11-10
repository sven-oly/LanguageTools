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


var SRB_LAYOUT = {
  'id': 'srb',
  'title': 'Sora Sompeng',
  'mappings': {
    ',c': {
      '': '`{{\ud804\udcf1}}{{\ud804\udcf2}}{{\ud804\udcf3}}{{\ud804\udcf4}}{{\ud804\udcf5}}' +
            '{{\ud804\udcf6}}{{\ud804\udcf7}}{{\ud804\udcf8}}{{\ud804\udcf9}}{{\ud804\udcf0}}-=' +
          '{{\ud804\udce1}}{{\ud804\udcd7}}{{\ud804\udce3}}{{\ud804\udcdd}}{{\ud804\udcd1}}' +
            '{{\ud804\udcdc}}{{\ud804\udce5}}{{\ud804\udce4}}{{\ud804\udce6}}{{\ud804\udcdb}}[]\\' +
          '{{\ud804\udce2}}{{\ud804\udcd0}}{{\ud804\udcd4}}{{\ud804\udce7}}{{\ud804\udcdf}}' +
            '{{\ud804\udcde}}{{\ud804\udce0}}{{\ud804\udcd5}}{{\ud804\udcd8}};\'' +
          '{{}}{{\ud804\udce8}}{{\ud804\udcd3}}{{\ud804\udcda}}{{\ud804\udcd2}}' +
            '{{\ud804\udcd9}}{{\ud804\udcd6}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
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
google.elements.keyboard.loadme(SRB_LAYOUT);
srb = SRB_LAYOUT;