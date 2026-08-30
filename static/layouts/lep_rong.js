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

// Implements Lepcha keyboard based on ...
// Rong - Lepcha)Cheatsheet.pdf
// http://www.siblac.org/doc/Rong_Kit_Introduction.pdf

var LEP_RONG_LAYOUT = {
  'id': 'lep_rong',
  'title': 'Rong_Lepcha',
  'mappings': {
    '': {
      '': '`\u1c41\u1c42\u1c43\u1c44\u1c45\u1c46\u1c47\u1c48\u1c49\u1c40{{\u1c32\u1c31}}{{}}' +
          '\u1c23\u1c22\u1c2c\u1c1b\u1c0a\u1c1a' +
            '\u1c2a{{\u1c27\u200b}}{{\u1c28\u200b}}\u1c0e\u1c09\u1c4d{{}}' +
          '{{\u1c26}}\u1c20\u1c0c\u1c11\u1c03\u1c1D{{\u1c08}}\u1c00\u1c1c{{\u1c17}}{{\u1c05}}' +
            '\u1c19{{\u1c21\u1c24}}\u1c06\u1c1f\u1c13\u1c0d\u1c15\u1c3d\u1c3f\u0964'
    },
    's': {
      '': ':{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}-{{}}' +
             '{{}}{{}}{{}}{{\u1c32}}{{\u1c33}}{{}}{{\u1c2b}}{{}}{{\u1c29\u200b}}{{\u1c31}}{{\u1c34\u200b}}\u1c4f{{}}' +
          '\u1c36{{}}{{}}{{}}{{}}{{}}{{}}\u1c2d\u1c2f{{}}{{\u1c35\u200b}}' +
          '{{}}{{}}{{}}{{}}{{}}\u1c30\u1c2e\u1c3e\u1c37\u0965'
    },
    'c,sc': {
      '': '`{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}\u1c25{{}}\u1c24{{}}{{}}{{}}\u1c0f{{}}{{}}{{}}' +
          '{{}}{{}}{{}}\u1c12\u1c04\u1c1e{{}}\u1c01{{}}!\"' +
          '{{}}{{}}{{}}{{}}\u1c14{{}}\u1c16,.?'
    },
    'sl,scl': {
      '': '`1234567890-=' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  },
  'transform' : {
 // Move signs from the left to the right.
    // For two vowel signs and a consonant
    '([\u1c27-\u1c29\u1c34\u1c35])\u200b([\u1c27-\u1c29\u1c34\u1c35])\u200b\u001d([\u1c00-\u1c23\u1c4d-\u1c4f])': '$3\u001d$1$2',
    // Reposition one consonant before the vowel sign
    '([\u1c27-\u1c29\u1c34\u1c35]+)\u200b([\u1c00-\u1c23\u1c4d-\u1c4f])': '$2\u001d$1',

    // Reorder some marks before a consonant
    '([\u1c2d-\u1c35])\u200b([\u1c27-\u1c2c])\u200b': '\u001d$2\u200b$1\u200b',

     // Move Nukta to first position and reposition the mark after the nukta
     '\u001d([\u1c26-\u1c36]+)([\u1c24\u1c25\u1c37]+)': '$2\u001d$1',
     // Move Ran to the last position
     '(\u1c36)([\u1c24-\u1c35\u1c37]+)': '$2$1',
     // Reposition some marks
     '\u001d([\u1c26-\u1c36]+)([\u1c24\u1c25\u1c37]+)': '$2$1',
     '([\u1c24-\u1c35\u1c36]+)(\u1c37)': '$2\u001d$1',
     }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LEP_RONG_LAYOUT);
lep_rong = LEP_RONG_LAYOUT;
