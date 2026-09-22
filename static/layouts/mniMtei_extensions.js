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

// Includes Unicode Meitei Mayak extension characters
// https://www.unicode.org/Public/18.0.0/charts/PDF/UAAE0.pdf

var MNIMTEI_EXT_LAYOUT = {
  'id': 'mniMtei_extensions',
  'title': 'Meitei KM with extensions',
  'mappings': {
    '': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰-=' +
          'ꯕꯄꯅꯗ{{}}ꯧ{{}}ꯡꯍ{{ꯩ}}ꯑꯢꯌ' +
          'ꯃꯀꯛꯇ{{ꯤ}}{{}}ꯔꯥꯦ;\'' +
          'ꯚꯒꯖꯆ{{ꯨ}}{{}}ꯂ,./'
    },
    'c': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰-=' +
          '{{}}{{}}\uaae0{{}}{{}}{{}}\uaaec\uaaeb\uaae1{{ꯩ}}ꯑꯢꯌ' +
          'ꯃꯀꯛꯇ{{ꯤ}}{{}}ꯔꯥꯦ;\'' +
          '{{}}{{}}\uaae2ꯖꯆ{{ꯨ}}{{}}ꯂ,./'
    },
    's,sc': {
      '': '~꯫@#$%^&*()ꯋ+' +
          '{{}}ꯐꯟꯙꯏ{{}}{{}}{{ꯪ}}{{ꯣ}}{{}}{}|' +
          'ꯝꯈ{{꯭}}ꯊꯠ{{}}{{}}ꯁ{{}}:"' +
          'ꯉꯘꯓ{{}}ꯎꯞꯜ<>?'
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
google.elements.keyboard.loadme(MNIMTEI_EXT_LAYOUT);
mniMtei_extensions = MNIMTEI_EXT_LAYOUT;