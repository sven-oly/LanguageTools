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
          '\u1C36\u1C16{{\u1C27\u200b}}{{\u1C29\u200b}}\u1C2A\u1C2B\u1C20{{\u1C34\u200b}}\u1C22\u1C2F\u0027' +
          '{{\u1c03\u1c37\u1c25\u1c2c}}{{\u1c00\u1c37\u1c25\u1c2c}}\u1C4F{{\u1C28\u200b}}\u1C26\u1C04\u1C01,./'
      },
    's': {
      '':  '`\u1c41\u1c42\u1c43\u1c44\u1c45\u1c46\u1c47\u1c48\u1c49\u1c40-=' +
             '\u1C15\u1C1C\u1C06\u1C17\u1C19\u1C1F\u1C1A\u1c0a\u1c11\u1c13\u1c2d|%' +
          'ᰀᰂᰃᰅᰈᰉᰋᰌᰍ\u1c2f\'' +
          'ᰡᰝᰃᰛᰂᰐᰎᰱ,./'
    },
    'c': {
      '': '`{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}(){{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}};{{}}{{}}' +
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
    '([\u1c27-\u1c29\u1c34\u1c35])\u200b([\u1c00-\u1c23\u1c4d-\u1c4f])': '$2$1',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LEP_MUNSALONG_LAYOUT);
lep_Munsalong = LEP_MUNSALONG_LAYOUT;
