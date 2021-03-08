// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and∂402
// limitations under the License.


var NST_PUA_LAYOUT = {
  'id': 'nstPUA',
  'title': 'Tangsa PUA',
  'mappings': {
    '': {
      '': '`{{\ue449}}{{\ue44a}}{{\ue44b}}{{\ue44c}}{{\ue44e}}{{\ue43f}}{{\ue44f}}{{\ue450}}{{\ue451}}{{\ue452}}-=' +
          '{{\ue420}}{{\ue414}}{{\ue408}}{{\ue427}}{{\ue43e}}{{\ue433}}{{\ue410}}{{\ue40c}}{{\ue400}}{{\ue435}}{{\u21D3||\u21D3||\u21D3}}]\\' +
          '{{\ue404}}{{\ue432}}{{\ue43f}}{{\ue42b}}{{\ue430}}{{\ue43b}}{{\ue417}}{{\ue42e}}{{\ue43c}};\'' +
          '{{\ue423}}{{\ue444}}{{\ue443}}{{\ue454}}{{\ue438}}{{\ue43a}}{{\ue439}},./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          '{{\ue41f}}{{\ue415}}{{\ue409}}{{\ue428}}{{\ue43d}}{{\ue458}}{{\ue411}}{{\ue40d}}{{\ue401}}{{\ue437}}{}|' +
          '{{\ue405}}{{\ue442}}{{\ue42c}}{{\ue41b}}{{\ue431}}{{\ue445}}{{\ue418}}{{\ue42f}}{{\ue440}}:"' +
          '{{\ue424}}{{\ue448}}{{\ue42d}}{{\ue455}}{{\ue434}}{{\ue436}}{{\ue441}}<>?'
    },
    'c': {
      '': '`1234567890-=' +
          '{{\ue421}}{{\ue453}}{{\ue40a}}{{\ue429}}{{\ue447}}{{\ue41e}}{{\ue412}}{{\ue40e}}{{\ue402}}p[]\\' +
          '{{\ue406}}sdfgh{{\ue419}}kl;\'' +
          '{{\ue425}}{{\ue41c}}c{{\ue456}}bnm,./'
    },

    'sc': {
      '': '~!@#$%^&*()_+' +
          '{{\ue422}}{{\ue416}}{{\ue406}}{{\ue42a}}{{\ue446}}Y{{\ue413}}{{\ue40f}}{{\ue403}}P{}|' +
          '{{\ue407}}SDFGH{{\ue41a}}KL:"' +
          '{{\ue426}}{{\ue41d}}C{{\ue457}}BNM<>?'
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
    '\u21D3\ue400': '\ue402',  // o
    '\u21D3\ue401': '\ue403',  // O
    '\u21D3\ue404': '\ue406',  // a
    '\u21D3\ue405': '\ue407',  // A
    '\u21D3\ue454': '\ue456',  // v
    '\u21D3\ue455': '\ue457',  // V
    '\u21D3\ue408': '\ue40a',  // e
    '\u21D3\ue409': '\ue40b',  // E
    '\u21D3\ue40c': '\ue40e',  // i
    '\u21D3\ue40d': '\ue40f',  // I
    '\u21D3\ue410': '\ue412',  // u
    '\u21D3\ue411': '\ue413',  // U
    '\u21D3\ue414': '\ue453',  // w
    '\u21D3\ue415': '\ue416',  // W
    '\u21D3\ue417': '\ue419',  // j
    '\u21D3\ue418': '\ue41a',  // J
    '\u21D3\ue444': '\ue41c',  // x
    '\u21D3\ue448': '\ue41d',  // X
    '\u21D3\ue433': '\ue41e',  // X
    '\u21D3\ue420': '\ue421',  // q
    '\u21D3\ue41f': '\ue422',  // Q
    '\u21D3\ue423': '\ue425',  // z
    '\u21D3\ue424': '\ue426',  // Z
    '\u21D3\ue427': '\ue429',  // r
    '\u21D3\ue428': '\ue42a',  // R
    '\u21D3\ue43d': '\ue446',  // T
    '\u21D3\ue43e': '\ue447',  // t

    '\u21D3\u21D3': '[',  // Cancel the dead key
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(NST_PUA_LAYOUT);
nstPUA = NST_PUA_LAYOUT;