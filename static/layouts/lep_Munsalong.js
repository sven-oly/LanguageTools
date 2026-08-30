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

var LEP_MUNSALONG_LAYOUT = {
  'id': 'lep_Munsalong',
  'title': 'Munsalong Lepcha',
  'mappings': {
    '': {
      '': '`᱁᱂᱃᱄᱅᱆᱇᱈᱉᱀-=' +
          '\u1C14\u1C23\u1C36\u1C1E{{\u1C00\u1c37\u1c25}}{{\u1c1d\u1c37\u1c25\u1c2c}}{{\u1c1d\u1c37\u1c25}}\u1C2C\u1C0F\u1C12\u1C2D{{\u1C35\u200b}}\u1C37' +
          '\u1C36\u1C16{{\u1C27\u200b}}{{\u1C29\u200b}}\u1C2A\u1C2B{{\u1C34\u200b}}\u1C20\u1C22\u1C2F\u0027' +
          '{{\u1c03\u1c37\u1c25\u1c2c}}{{\u1c00\u1c37\u1c25\u1c2c}}{{\u1C28\u200B}}{{\u1C03\u1C37\u1C25}}{{\u1C26}}\u1C04\u1C01,./'
      },
    's': {
      '':  '`!@"$\u1c25\u1c36\u1c24\u1C24*\u1c25\u1c33\u1c36' +
             '\u1C15\u1C1C\u1C06\u1C17\u1C19\u1C1F\u1C1A\u1c0a\u1c11\u1c13\u1c2d%|' +
          'ᰀ\u1c18\u1c05\u1c07ᰈᰉᰋᰌᰍ\u1c2e"' +
          'ᰡᰝᰃᰛᰂ\u1c10\u1c0e\u1c31\u1c30\u1c32'
    },
    'c': {
      '': '`{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}(){{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]{{}}' +
          '{{\u1c4d}}{{\u1c4e}}{{\u1c4f}}{{}}{{}}{{}}{{}}{{}};{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}+'
    },
    'sc': {
      '': '`{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}:{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}<>?'
    },
    'sl,scl': {
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
    }
  },
  'transform' : {
    // Move signs from the left to the right.
    // For two vowel signs and a consonant
    '([\u1c27-\u1c29\u1c34\u1c35])\u200b([\u1c27-\u1c29\u1c34\u1c35])\u200b\u001d([\u1c00-\u1c23\u1c4d-\u1c4f])': '$3\u001d$1$2',
    // Reposition one consonant before the vowel sign
    '([\u1c27-\u1c29\u1c34\u1c35]+)\u200b([\u1c00-\u1c23\u1c4d-\u1c4f])': '\u001d$2$1',

    // Reorder some marks before a consonant
    '([\u1c2d-\u1c35])\u200b([\u1c27-\u1c2c])\u200b': '\u001d$2\u200b$1\u200b',

     // Move Nukta to first position and reposition the mark after the nukta
     '\u001d([\u1c26-\u1c36]+)([\u1c24\u1c25\u1c37]+)': '$2\u001d$1',
     // Move Ran to the last position
     '(\u1c36)([\u1c24-\u1c35\u1c37]+)': '$2$1',
     // Reposition some marks
     '\u001d([\u1c2d6-\u1c36]+)([\u1c24\u1c25\u1c37]+)': '$2$1',
     '([\u1c24-\u1c35\u1c36]+)(\u1c37)': '$2\u001d$1',

  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LEP_MUNSALONG_LAYOUT);
lep_Munsalong = LEP_MUNSALONG_LAYOUT;
