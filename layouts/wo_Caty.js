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


var WO_CAT_LAYOUT = {
  'id': 'wo_Caty',
  'title': 'Wolof Catya script',
  'direction': 'ltr',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{\u030a}}wertyuio{{}}[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}E{{}}{{}}{{}}{{}}{{}}{{}}{{}}{}|' +
          '{{}}{{}}D{{}}G{{}}J{{}}{{}}:"' +
          '{{}}{{}}C{{}}{{}}{{}}M<>?'
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
    'bb': 'b\u030a',  // Doubled consonants
    'cc': 'c\u030a',  // Doubled consonants
    'dd': 'd\u030a',  // Doubled consonants
    'ff': 'f\u030a',  // Doubled consonants
    'gg': 'g\u030a',  // Doubled consonants
    'hh': 'h\u030a',  // Doubled consonants
    'jj': 'j\u030a',  // Doubled consonants
    'kk': 'k\u030a',  // Doubled consonants
    'll': 'l\u030a',  // Doubled consonants
    'm': 'm\u030a',  // Doubled consonants
    'nn': 'n\u030a',  // Doubled consonants
    'pp': 'p\u030a',  // Doubled consonants
    'rr': 'r\u030a',  // Doubled consonants
    'ss': 's\u030a',  // Doubled consonants
    'tt': 't\u030a',  // Doubled consonants
    'vv': 'v\u030a',  // Doubled consonants
    'ww': 'w\u030a',  // Doubled consonants
    'xx': 'x\u030a',  // Doubled consonants
    'yy': 'y\u030a',  // Doubled consonants
    'zz': 'z\u030a',  // Doubled consonants
    'CC': 'C\u030a',  // Doubled consonants
    'DD': 'D\u030a',  // Doubled consonants
    'GG': 'G\u030a',  // Doubled consonants
    'JJ': 'J\u030a',  // Doubled consonants
    'MM': 'M\u030a',  // Doubled consonants
}
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(WO_CAT_LAYOUT);
wo_Caty = WO_CAT_LAYOUT;