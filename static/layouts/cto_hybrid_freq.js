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


var CTO_LAYOUT_HYBRID_FREQ = {
  'id': 'cto_hybrid_freq',
  'title': 'Emberá Catío hybrid frequencies',
  'mappings': {
    '': {
      '': '°1234567890\'¿' +
          'qwertyu\u0289op{{\u0289\u0303}}¨+' +
          'asd\u0257gikl\u00f1\u0303{' +
          '{{bu}}{{rr}}{{ch}}\u0253bnm,.-'
    },
    'c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjk\u0142;\'' +
          'zxcvbⁿm,./'
    },
    's': {
      '': '|!"#$%&/()_?¡' +
          'QWERTYU\u0244OP{{\u0244\u0303}}¨*]' +
          'ASD\u018aGIJKL\u00d1' +
          '{{BU}}{{RR}}{{CH}}\u1181BNM;:_'
    },
    'sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJK\u0141:"' +
          'ZXCVBⁿM<>?'
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
google.elements.keyboard.loadme(CTO_LAYOUT_HYBRID_FREQ);
cho = CTO_LAYOUT_HYBRID_FREQ;