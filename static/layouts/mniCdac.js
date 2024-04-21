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


var MNICDACGTIST_LAYOUT = {
  'id': 'mniCdac',
  'title': 'Meitei Mayek',
  'mappings': {
    '': {
      '': '`1234567890-=' +
          '{{ꯧ}}{{ꯩ}}{{ꯥ}}{{}}{{}}ꯕꯍꯒꯗꯖ{{}}{{꯬}}\\' +
          '{{ꯣ}}{{ꯦ}}{{꯭}}{{ꯤ}}{{ꯨ}}{{ꯄ}}{{ꯔ}}{{ꯀ}}{{ }}{{ }}\'' +
          '{{ꯪ}}{{ꯃ}}{{ꯅ}}{{ꯋ}}{{ꯂ}}{{ꯁ}}{{,}}{{.}}{{ꯌ}}{{}}'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}ꯚꯉꯘꯙꯓ{{}}{{}}|' +
          '{{}}{{}}ꯑꯏꯎꯐ{{}}ꯈꯊ{{}}\"' +
          '{{}}{{}}{{}}{{}}{{}}{{}},꯫{{}}'
    },
    'c': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰-=' +
          'ꯛꯜꯝꯞꯟꯠꯡꯢ{{}}{{}}{{}}{{}}{{}}' +
          '{{S||zwnj||\u200C}}{{S||zwj||\u200D}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
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
google.elements.keyboard.loadme(MNICDACGTIST_LAYOUT);
mniCdac = MNICDACGTIST_LAYOUT;
