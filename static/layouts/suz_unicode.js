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


var SUZ_UNICODE_LAYOUT = {
  'id': 'suz_unicode',
  'title': 'Kõits-Bleshe-Sunuwar Unicode',
  'mappings': {
    ',c': {
      '': '{{S||`||\u0300}}{{\ud806\udfc1}}{{\ud806\udfc2}}{{\ud806\udfc3}}{{\ud806\udfc4}}{{\ud806\udfc5}}{{\ud806\udfc6}}{{\ud806\udfc7}}{{\ud806\udfc8}}{{\ud806\udfc9}}{{\ud806\udfc0}}-=' +
          '{{\ud806\udfc1}}{{\ud806\udfc7}}{{\ud806\udfd5}}{{\ud806\udfc2}}{{\ud806\udfc4}}{{\ud806\udfc9}}{{\ud806\udfc5}}{{\ud806\udfd9}}{{\ud806\udfdF}}{{\ud806\udfc0}}[]\\' +
          '{{\ud806\udfd1}}{{\ud806\udfc3}}{{\ud806\udfcd}}{{\ud806\udfd6}}{{\ud806\udfd7}}{{\ud806\udfd8}}{{\ud806\udfdA}}{{\ud806\udfdB}}{{\ud806\udfdB}}\u003b\u0301' +
          '{{\ud806\udfcA}}{{\ud806\udfc8}}{{\ud806\udfd3}}{{\ud806\udfc6}}{{\ud806\udfc2}}{{\ud806\udfdE}}{{\ud806\udfdD}},./'
    },
    's,sc': {
      '': '{{S||~||\u0303}}!@#$%^&*()_+' +
          '{{\ud806\udfce}}{{\ud806\udfdd}}\u00b7\u00f8\u03a9\u00b1\u2264\u2265\u00a6\u2980{}|' +
          '{{\ud806\udfd6}}{{\ud806\udfce}}{{}}{{}}{{}}{{\ud806\udfd5}}{{}}{{\u0027}}:"{{S||\u0310||\u030d}}' +
          '\u221a\u2260\u2122\u00a9\u2211\u2030{{}}<>?'
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
google.elements.keyboard.loadme(SUZ_UNICODE_LAYOUT);
suz_unicode = SUZ_UNICODE_LAYOUT;
