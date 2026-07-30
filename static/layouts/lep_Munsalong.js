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
      '': '`\u1c41\u1c42\u1c43\u1c44\u1c45\u1c46\u1c47\u1c48\u1c49\u1c40-=' +
          'ᰕᰜᰆᰗᰙᰟᰚᰊᰓ{{}}ᰭ{{}}{{}}' +
          'ᰑᰠᰅ᰽ᰈᰉ\u1c0b\u1c0cᰍ{{}}"' +
          'ᰡᰝᰃᰛᰂᰗᰎ,./'
      },
    's': {
      '':  '`\u1c41\u1c42\u1c43\u1c44\u1c45\u1c46\u1c47\u1c48\u1c49\u1c40-=' +
             'ᰔᰣ$᰽{{ᰑ\u1c2c}}{{ᰝ\u1c2c}}{{ᰝ\u1c37}}{{\u1c37}}{{\u1c01}}{{\u1c12}}{{}}\u1c2d{{}}{{}}' +
          '\u1c36{{}}{{}}{{}}{{}}{{}}{{}}\u1c2d\u1c2f{{}}\u1c35' +
          '{{}}{{}}{{}}{{}}{{}}\u1c30\u1c2e\u1c3e\u1c37\u0965'
    },
    'c': {
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

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LEP_MUNSALONG_LAYOUT);
lep_Munsalong = LEP_MUNSALONG_LAYOUT;
