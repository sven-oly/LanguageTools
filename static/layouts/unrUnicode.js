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


var UNR_UNICODE_LAYOUT = {
  'id': 'unrUnicode',
  'title': 'Mundari Bani Unicode',
  'mappings': {
    ',c': {
	'': '`{{\ud839\udcf1}}{{\ud839\udcf2}}{{\ud839\udcf3}}{{\ud839\udcf4}}' +
	      '{{\ud839\udcf5}}{{\ud839\udcf6}}{{\ud839\udcf7}}{{\ud839\udcf8}}{{\ud839\udcf9}}{{\ud839\udcf0}}-=' +
          '{{}}{{\ud839\udcee}}{{\ud839\udce4}}{{\ud839\udce3}}{{\ud839\udcdd}}{{\ud839\udcd3}}{{\ud839\udcdf}}{{\ud839\udcda}}{{\ud839\udcd0}}{{\ud839\udcd1}}[]\\' +
          '{{\ud839\udcd5}}{{\ud839\udcdb}}{{\ud839\udcdc}}{{}}{{\ud839\udce6}}{{\ud839\udcde}}{{\ud839\udcd6}}{{\ud839\udce2}}{{\ud839\udcd2}};\'' +
          '{{\ud839\udceb}}{{\ud839\udced}}{{\ud839\udce0}}{{\ud839\udcec}}{{\ud839\udcd7}}{{\ud839\udce8}}{{\ud839\udce7}},./'
    },
    's,sc': {
      '': '{{\ud839\udcef}}!@#$%^&*()_+' +
          'QWER{{\ud839\udce9}}YUIOP{}|' +
          'AS{{\ud839\udceb}}F{{\ud839\udcd4}}{{\ud839\udcd9}}{{\ud839\udcd8}}{{}}{{\ud839\udcea}}:"' +
          'Z{{\ud839\udcef}}CVB{{\ud839\udce5}}M<>?'
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
google.elements.keyboard.loadme(UNR_UNICODE_LAYOUT);
unrUnicode = UNR_UNICODE_LAYOUT;
