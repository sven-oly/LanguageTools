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

// Implements keyboard with phonetic characters for Otomanguean languages.
// https://en.wikipedia.org/wiki/Oto-Manguean_languages

var OMQ5_LAYOUT = {
  'id': 'omq5',
  'title': 'Chatino z-deadkey for superscripts',
  'mappings': {
    '': {
      '': '{{\u0363}}{{\u1de8}}{{\u0368}}{{\u0369}}{{\u0364}}{{\u1deb}}{{\u1dda}}{{\u036a}}' +
           '{{\u0365}}{{\u0365}}{{\u1ddc}}{{\u1ddd}}{{\u036b}}' +
          'qwertyuiop[]\\' +
          'asdfg{{ch}}jkl;\'' +
          '↑xcvbnm,./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFG{{Ch}}JKL:"' +
          'ZXCVBNM<>?'
    },
    'c': {
      '': '`1234567890-=' +
          'qwᵉrᵗᵞᵘiᵒᵖ[]\\' +
          'ᵃsᵈfᵍhjᵏl;\'' +
          'zxcᵛᵇnᵐ,./'
    },
    'sc': {
      '': '~!@#$%^&*()_+' +
          'QᵂᴱᴿᵀYᵁᴵᴼᴾ{}|' +
          'ᴬSᴰFᴳᴴᴶᴷᴸ:"' +
          'ZXCVᴮᴺᴹ<>?'
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
    // Up arrow followed by letter gives superscripted version.
    '↑a' : 'ᵃ',
    '↑b': 'ᵇ',
    '↑c': 'ᶜ',
    '↑d': 'ᵈ',
    '↑e': 'ᵉ',
    '↑f': 'ᶠ',
    '↑g': 'ᵍ',
    '↑h': 'ʰ',
    '↑i': 'ⁱ',
    '↑j': 'ʲ',
    '↑k': 'ᵏ',
    '↑l': 'ˡ',
    '↑m': 'ᵐ',
    '↑A': 'ᴬ',
    '↑B': 'ᴮ',
    '↑C': 'ᶜ',
    '↑D': 'ᴰ',
    '↑E': 'ᴱ',
    '↑F': 'ᶠ',
    '↑G': 'ᴳ',
    '↑H': 'ᴴ',
    '↑I': 'ᴵ',
    '↑J': 'ᴶ',
    '↑K': 'ᴷ',
    '↑L': 'ᴸ',
    '↑M': 'ᴹ',
  }

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(OMQ5_LAYOUT);
