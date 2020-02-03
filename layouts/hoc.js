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


var HOC_LAYOUT = {
  'id': 'hoc',
  'title': 'Ho Warang Chiti',
  'mappings': {
    '': {
      '': '`{{\ud806\udce1}}{{\ud806\udce2}}{{\ud806\udce3}}{{\ud806\udce4}}{{\ud806\udce5}}' +
            '{{\ud806\udce6}}{{\ud806\udce7}}{{\ud806\udce8}}{{\ud806\udce9}}{{\ud806\udce0}}' +
            '-{{\ud806\udcff}}' +
          '{{\ud806\udcc4}}{{\ud806\udcdf}}{{\ud806\udcc8}}{{\ud806\udcdc}}{{\ud806\udcd2}}' +
            '{{\ud806\udcc5}}{{\ud806\udcc3}}{{\ud806\udcc2}}{{\ud806\udcc9}}{{\ud806\udcd8}}[]\\' +
          '{{\ud806\udcc1}}{{\ud806\udcde}}{{\ud806\udcd1}}{{}}{{\ud806\udccb}}{{\ud806\udcd9}}' +
            '{{\ud806\udcce}}{{\ud806\udccc}}{{\ud806\udcda}};\'' +
          '{{}}{{\ud806\udcdd}}{{\ud806\udccf}}{{\ud806\udcc0}}{{\ud806\udcd7}}' +
            '{{\ud806\udcd3}}{{\ud806\udcd6}},./'
    },
    's,sc': {
      '': '~{{\ud806\udcea}}{{\ud806\udceb}}{{\ud806\udcec}}{{\ud806\udced}}{{\ud806\udcee}}' +
            '{{\ud806\udcef}}{{\ud806\udcf0}}{{\ud806\udcf1}}{{\ud806\udcf2}}{{}}_+' +
          '{{\ud806\udca4}}{{\ud806\udcbf}}{{\ud806\udca8}}{{\ud806\udcbc}}{{\ud806\udcb2}}' +
            '{{\ud806\udca5}}{{\ud806\udca3}}{{\ud806\udca2}}{{\ud806\udca9}}{{\ud806\udcb8}}{}|' +
          '{{\ud806\udca1}}{{\ud806\udcbe}}{{\ud806\udcb1}}{{}}{{\ud806\udcab}}{{\ud806\udcb9}}' +
            '{{\ud806\udcae}}{{\ud806\udcac}}{{\ud806\udcba}}:"' +
          '{{}}{{\ud806\udcbd}}{{\ud806\udcaf}}{{\ud806\udca0}}{{\ud806\udcb7}}' +
            '{{\ud806\udcb3}}{{\ud806\udcb6}}<>?'
    },
    'c': { // Currently just lower case
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl:"' +
          'zxcvbnm,./'
    },
    'sc': { // Currently just upper case
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM<>?'
    },
    'l': {
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
    '^': '^',  // Lowercase rules
    '\ud806\udcd3\ud806\udccb': '\ud806\udcca',  // ng
    '\ud806\udcd3\ud806\udcce': '\ud806\udccd',  // nj
    '\ud806\udcd3\ud806\udcd3': '\ud806\udcd0',  // nn
    '\ud806\udcdc\ud806\udcdc': '\ud806\udcdb',  // rr
    '\ud806\udcc1\ud806\udcc2': '\ud806\udcc6',  // ai
    '\ud806\udcc1\ud806\udcc3': '\ud806\udcc7',  // au
    '\ud806\udcd2\ud806\udcd9': '\ud806\udcc5',  // th
    '\ud806\udcd1\ud806\udcd9': '\ud806\udcc4',  // dh

    // Upper case rules
    '\ud806\udcb3\ud806[\udcab\udccb]': '\ud806\udcaa',  // ng
    '\ud806\udcb3\ud806[\udcae\udcce]': '\ud806\udcad',  // nj
    '\ud806\udcb3\ud806[\udcb3\udcd3]': '\ud806\udcb0',  // nn
    '\ud806\udcbc\ud806[\udcbc\udcdc]': '\ud806\udcbb',  // rr
    '\ud806\udca1\ud806[\udca2\udcc2]': '\ud806\udca6',  // ai
    '\ud806\udca1\ud806[\udca3\udcc3]': '\ud806\udca7',  // au
    '\ud806\udcb2\ud806[\udcb9\udcd9]': '\ud806\udca5',  // th
    '\ud806\udcb1\ud806[\udcb9\udcd9]': '\ud806\udca4',  // dh
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(HOC_LAYOUT);
