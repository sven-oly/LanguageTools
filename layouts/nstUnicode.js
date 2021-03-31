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


var NST_UNICODE_LAYOUT = {
  'id': 'nstUnicode',
  'title': 'Tangsa Unicode',
  'langCode': 'nst',

  'mappings': {
    '': {
      '': '`{{\ud81a\udec1}}{{\ud81a\udec2}}{{\ud81a\udec3}}{{\ud81a\udec4}}{{\ud81a\udec5}}{{\ud81a\udec6}}' +
             '{{\ud81a\udec7}}{{\ud81a\udec8}}{{\ud81a\udec9}}{{\ud81a\udec0}}-=' +
          '{{\ud81a\ude95}}{{\ud81a\ude88}}{{\ud81a\ude7c}}{{\ud81a\ude9c}}{{\ud81a\udeb0}}{{\ud81a\udea5}}' +
             '{{\ud81a\ude84}}{{\ud81a\ude80}}{{\ud81a\ude70}}{{\ud81a\udea7}}{{\u21D3}}]\\' +
          '{{\ud81a\ude74}}{{\ud81a\udea4}}{{\ud81a\ude94}}{{\ud81a\udebb}}{{\ud81a\udea2}}{{\ud81a\udead}}' +
            '{{\ud81a\ude8c}}{{\ud81a\udea0}}{{\ud81a\udeae}};\'' +
          '{{\ud81a\ude98}}{{\ud81a\udeb6}}{{\ud81a\udeb5}}{{\ud81a\ude78}}{{\ud81a\udeaa}}{{\ud81a\udeac}}' +
            '{{\ud81a\udeab}},./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          '{{\ud81a\ude94}}{{\ud81a\ude89}}{{\ud81a\ude7d}}{{\ud81a\ude9d}}{{\ud81a\udeaf}}{{\ud81a\udebe}}' +
            '{{\ud81a\ude85}}{{\ud81a\ude81}}{{\ud81a\ude71}}{{\ud81a\udea9}}{}|' +
          '{{\ud81a\ude75}}{{\ud81a\udeb4}}{{\ud81a\udebc}}{{\ud81a\ude90}}{{\ud81a\udea3}}{{\ud81a\udeb7}}' +
            '{{\ud81a\ude8d}}{{\ud81a\udea1}}{{\ud81a\udeb2}}:"' +
          '{{\ud81a\ude99}}{{\ud81a\udeba}}{{\ud81a\udebd}}{{\ud81a\ude79}}{{\ud81a\udea6}}{{\ud81a\udea8}}' +
            '{{\ud81a\udeb3}}<>?'
    },
    'c': {
      '': '`1234567890-=' +
          '{{\ud81a\ude96}}{{\ud81a\ude8a}}{{\ud81a\ude7e}}{{\ud81a\ude9e}}{{\ud81a\udeb9}}{{\ud81a\ude93}}' +
            '{{\ud81a\ude86}}{{\ud81a\ude90}}{{\ud81a\ude72}}p[]\\' +
          '{{\ud81a\ude76}}sdfgh{{\ud81a\ude8e}}kl;\'' +
          '{{\ud81a\ude9a}}{{\ud81a\ude91}}c{{\ud81a\ude7a}}bnm,./'
    },

    'sc': {
      '': '~!@#$%^&*()_+' +
          '{{\ud81a\ude97}}{{\ud81a\ude8b}}{{\ud81a\ude76}}{{\ud81a\ude9f}}{{\ud81a\udeb8}}Y{{\ud81a\ude87}}' +
            '{{\ud81a\ude83}}{{\ud81a\ude73}}P{}|' +
          '{{\ud81a\ude77}}SDFGH{{\ud81a\ude8f}}KL:"' +
          '{{\ud81a\ude9b}}{{\ud81a\ude92}}C{{\ud81a\ude7b}}BNM<>?'
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
    '\u21D3\ud81a\ude70': '\ud81a\ude72',  // o
    '\u21D3\ud81a\ude71': '\ud81a\ude73',  // O
    '\u21D3\ud81a\ude74': '\ud81a\ude76',  // a
    '\u21D3\ud81a\ude75': '\ud81a\ude77',  // A
    '\u21D3\ud81a\ude78': '\ud81a\ude7a',  // v
    '\u21D3\ud81a\ude7c': '\ud81a\ude7e',  // e
    '\u21D3\ud81a\ude7d': '\ud81a\ude7f',  // E
    '\u21D3\ud81a\ude79': '\ud81a\ude7b',  // V
    '\u21D3\ud81a\ude80': '\ud81a\ude82',  // i
    '\u21D3\ud81a\ude81': '\ud81a\ude83',  // I
    '\u21D3\ud81a\ude84': '\ud81a\ude86',  // u
    '\u21D3\ud81a\ude85': '\ud81a\ude87',  // U
    '\u21D3\ud81a\ude88': '\ud81a\ude8a',  // w
    '\u21D3\ud81a\ude89': '\ud81a\ude8b',  // W
    '\u21D3\ud81a\ude8c': '\ud81a\ude8e',  // j
    '\u21D3\ud81a\ude8d': '\ud81a\ude8f',  // J
    '\u21D3\ud81a\udeb6': '\ud81a\ude91',  // x
    '\u21D3\ud81a\udeba': '\ud81a\ude92',  // X
    '\u21D3\ud81a\udea5': '\ud81a\ude93',  // y
    '\u21D3\ud81a\ude95': '\ud81a\ude96',  // q
    '\u21D3\ud81a\ude94': '\ud81a\ude97',  // Q
    '\u21D3\ud81a\ude98': '\ud81a\ude9a',  // z
    '\u21D3\ud81a\ude99': '\ud81a\ude9b',  // Z
    '\u21D3\ud81a\ude9c': '\ud81a\ude9e',  // r
    '\u21D3\ud81a\ude9d': '\ud81a\ude9f',  // R
    '\u21D3\ud81a\udeb0': '\ud81a\udeb9',  // t
    '\u21D3\ud81a\udeaf': '\ud81a\udeb8',  // T

    '\u21D3\u21D3': '[',  // Cancel the dead key
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(NST_UNICODE_LAYOUT);
nstUnicode = NST_UNICODE_LAYOUT;