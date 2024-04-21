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


var GON_GUNJALA_LAYOUT = {
  'id': 'gon_gunjala',
  'title': 'Gondi Gunjala',
  'mappings': {
    ',c': {
      '': '`{{\ud807\udda1}}{{\ud807\udda2}}{{\ud807\udda3}}{{\ud807\udda4}}{{\ud807\udda5}}' +
             '{{\ud807\udda6}}{{\ud807\udda7}}{{\ud807\udda8}}{{\ud807\udda9}}{{\ud807\udda0}}-=' +
          '{{\ud807\udd73}}{{\ud807\udd90}}{{\ud807\udd67}}{{\ud807\udd88}}{{\ud807\udd7d}}{{\ud807\udd6C}}' +
            '{{\ud807\udd64}}{{\ud807\udd62}}{{\ud807\udd6A}}{{\ud807\udd85}}{{\ud807\udd78}}[\\' +
          '{{\ud807\udd60}}{{\ud807\udd89}}{{\ud807\udd82}}{{\ud807\udd91}}{{\ud807\udd76}}{{\ud807\udd87}}' +
            '{{\ud807\udd80}}{{\ud807\udd71}}{{\ud807\udd75}};\'' +
          '{{\ud807\udd93}}{{\ud807\udd97}}{{\ud807\udd7B}}{{\ud807\udd6D}}{{\ud807\udd6E}}{{\ud807\udd7A}}{{\ud807\udd70}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{\ud807\udd74}}{{\ud807\udd84}}{{\ud807\udd67}}{{\ud807\udd8a}}{{\ud807\udd7E}}{{\ud807\udd68}}' +
             '{{\ud807\udd65}}{{\ud807\udd63}}{{\ud807\udd6A}}{{\ud807\udd86}}{{\ud807\udd79}}]|' +
          '{{\ud807\udd61}}{{\ud807\udd8b}}{{\ud807\udd83}}{{\ud807\udd8c}}{{\ud807\udd77}}{{\ud807\udd96}}{{\ud807\udd81}}' +
          '{{\ud807\udd72}}{{\ud807\udd7F}}:\"' +
          '{{\ud807\udd8d}}{{\ud807\udd8c}}{{\ud807\udd7C}}{{\ud807\udd6B}}{{\ud807\udd6F}}{{\ud807\udd84}}{{\ud807\udd95}}' +
          '‘’?'
    },
    'l,cl': {
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
google.elements.keyboard.loadme(GON_GUNJALA_LAYOUT);
gon_gunjala = GON_GUNJALA_LAYOUT;