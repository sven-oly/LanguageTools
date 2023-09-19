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

// Base is U+16d80 == \ud818\udd80

var KYW3_LAYOUT = {
  'id': 'kyw3',
  'title': 'Kurmail Chisoi Unicode 1 layer',
  'mappings': {
    ',c': {
      '': '{{\ud81b\udd82}}{{\ud81b\udda1}}{{\ud81b\udda2}}{{\ud81b\udda3}}{{\ud81b\udda4}}{{\ud81b\udda5}}{{\ud81b\udda6}}{{\ud81b\udda7}}{{\ud81b\udda8}}{{\ud81b\udda9}}{{\ud81b\udda0}}-=' +
          '{{\ud81b\udd8e}}{{\ud81b\udd9b}}{{\ud81b\udd86}}{{\ud81b\udd8b}}{{\ud81b\udd83}}{{\ud81b\udd99}}{{\ud81b\udd8f}}{{\ud81b\udd89}}{{\ud81b\udd80}}{{\ud81b\udd97}}[]\\' +
          '{{\ud81b\udd83}}{{\ud81b\udd87}}{{\ud81b\udd90}}{{\ud81b\udd93}}{{\ud81b\udd84}}{{\ud81b\udd8d}}{{\ud81b\udd96}}{{\ud81b\udd8a}}{{\ud81b\udd91}};{{\ud81b\udd9c}}{{\ud81b\udd98}}' +
          '{{\ud81b\udd92}}{{\ud81b\udd9d}}{{\ud81b\udd95}}{{\ud81b\udd9a}}{{\ud81b\udd81}}{{\ud81b\udd88}}{{\ud81b\udd8c}}{{\ud81b\udd9d}}{{\ud81b\udd9e}}'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{\ud81b\udd82}}{{\ud81b\udd8e}}{{\ud81b\udd9b}}{{\ud81b\udd93}}{{}}{{}}{{\ud81b\udd92}}{{}}{}|' +
          '{{}}{{}}{{\ud81b\udd9a}}{{}}{{}}{{\ud81b\udd9c}}{{}}{{}}{{}}:"' +
          '{{}}{{\ud81b\udd98}}{{}}{{}}{{}}{{\ud81b\udd95}}{{}}<>?'
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
    '\u0964\u0964': '\u0965',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(KYW3_LAYOUT);
kyw3 = KYW3_LAYOUT;
