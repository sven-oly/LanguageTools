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
      '': '`{{\ud806\udce1}}{{\ud806\udce2}}{{\ud806\udce3}}{{\ud806\udce4}}{{\ud806\udce5}}{{\ud806\udce6}}{{\ud806\udce7}}{{\ud806\udce8}}{{\ud806\udce9}}{{\ud806\udce0}}-=' +
          '{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}[]\\' +
          '{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}:"' +
          '{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}},./'
    },
    's,sc': {
      '': '~{{\ud806\udcea}}{{\ud806\udceb}}{{\ud806\udcec}}{{\ud806\udced}}{{\ud806\udcee}}{{\ud806\udcef}}{{\ud806\udcf0}}{{\ud806\udcf1}}{{\ud806\udcf2}}{{\ud806\udcc1}}_+' +
          '{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc0}}{{\ud806\udcc1}}{}|' +
          '{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}};\'' +
          '{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}{{\ud806\udcc1}}<>?'
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
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(HOC_LAYOUT);
