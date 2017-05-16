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


var DE_LAYOUT = {
  'id': 'de',
  'is102Keyboard': true,
  'title': 'Deutsch',
  'mappings': {
    '': {
      '': '^1234567890\u00DF\u00B4' +
          'qwertzuiop\u00FC+#' +
          'asdfghjkl\u00F6\u00E4' +
          '<yxcvbnm,.-'
    },
    's': {
      '': '\u00B0!"\u00A7$%&/()=?`' +
          'QWERTZUIOP\u00DC*\'' +
          'ASDFGHJKL\u00D6\u00C4' +
          '>YXCVBNM;:_'
    },
    'l': {
      '': '^!"\u00A7$%&/()=?\u00B4' +
          'QWERTZUIOP\u00DC*\'' +
          'ASDFGHJKL\u00D6\u00C4' +
          '>YXCVBNM;:-'
    },
    'sl': {
      '': '\u00B01234567890\u00DF`' +
          'qwertzuiop\u00FC+#' +
          'asdfghjkl\u00F6\u00E4' +
          '<yxcvbnm,._'
    },
    'c': {
      '\u00E2': '|',
      '2': '\u00B2',
      '3': '\u00B3',
      '7': '{',
      '8': '[',
      '9': ']',
      '0': '}',
      'm': '\\',
      'Q': '@',
      'E': '\u20AC',
      '\u00DD': '~',
      'M': '\u00B5'
    }
  },
  'transform': {
    '` ': '`',
    '`A': '\u00C0',
    '`E': '\u00C8',
    '`I': '\u00CC',
    '`N': '\u01F8',
    '`O': '\u00D2',
    '`U': '\u00D9',
    '`W': '\u1E80',
    '`Y': '\u1EF2',
    '`a': '\u00E0',
    '`e': '\u00E8',
    '`i': '\u00EC',
    '`n': '\u01F9',
    '`o': '\u00F2',
    '`u': '\u00F9',
    '`w': '\u1E81',
    '`y': '\u1EF3',
    '`\u00DC': '\u01DB',
    '`\u00FC': '\u01DC',
    '\u00B4 ': '\u00B4',
    '\u00B4A': '\u00C1',
    '\u00B4C': '\u0106',
    '\u00B4E': '\u00C9',
    '\u00B4G': '\u01F4',
    '\u00B4I': '\u00CD',
    '\u00B4K': '\u1E30',
    '\u00B4L': '\u0139',
    '\u00B4M': '\u1E3E',
    '\u00B4N': '\u0143',
    '\u00B4O': '\u00D3',
    '\u00B4P': '\u1E54',
    '\u00B4R': '\u0154',
    '\u00B4S': '\u015A',
    '\u00B4U': '\u00DA',
    '\u00B4W': '\u1E82',
    '\u00B4Y': '\u00DD',
    '\u00B4Z': '\u0179',
    '\u00B4a': '\u00E1',
    '\u00B4c': '\u0107',
    '\u00B4e': '\u00E9',
    '\u00B4g': '\u01F5',
    '\u00B4i': '\u00ED',
    '\u00B4k': '\u1E31',
    '\u00B4l': '\u013A',
    '\u00B4m': '\u1E3F',
    '\u00B4n': '\u0144',
    '\u00B4o': '\u00F3',
    '\u00B4p': '\u1E55',
    '\u00B4r': '\u0155',
    '\u00B4s': '\u015B',
    '\u00B4u': '\u00FA',
    '\u00B4w': '\u1E83',
    '\u00B4y': '\u00FD',
    '\u00B4z': '\u017A',
    '\u00B4\u00DC': '\u01D7',
    '\u00B4\u00FC': '\u01D8',
    '\\^ ': '^',
    '\\^A': '\u00C2',
    '\\^C': '\u0108',
    '\\^E': '\u00CA',
    '\\^G': '\u011C',
    '\\^H': '\u0124',
    '\\^I': '\u00CE',
    '\\^J': '\u0134',
    '\\^O': '\u00D4',
    '\\^S': '\u015C',
    '\\^U': '\u00DB',
    '\\^W': '\u0174',
    '\\^Y': '\u0176',
    '\\^Z': '\u1E90',
    '\\^a': '\u00E2',
    '\\^c': '\u0109',
    '\\^e': '\u00EA',
    '\\^g': '\u011D',
    '\\^h': '\u0125',
    '\\^i': '\u00EE',
    '\\^j': '\u0135',
    '\\^o': '\u00F4',
    '\\^s': '\u015D',
    '\\^u': '\u00FB',
    '\\^w': '\u0175',
    '\\^y': '\u0177',
    '\\^z': '\u1E91',
    'superka': 'Superkalifragilistikexpialigetisch,'
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(DE_LAYOUT);