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


var LOM_LOMA_PUA_LAYOUT = {
  'id': 'lom_Loma_PUA',
  'title': 'Loma script PUA',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{}}wertyuiop[]\\' +
          'asdfgh{{}}kl;\'' +
          'z{{}}{{}}vbnm,./'
    },
    's,sc': {
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
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {  // These are PUA values in the JG Loma PUA font.
    // TODO: Finish this by adding 0xf15f to each value.
    'pa': '\uf202',
    'pee': '\uf206',
    'pe': '\uf207',
    'peh': '\uf20d',
    'pi': '\uf201',
    'poo': '\uf20b',
    'pooi': '\uf20e',
    'po': '\uf208',
    'pu': '\uf204',
    'wi': '\uf20f',
    'wa': '\uf214',
    'we': '\uf219',
    'wee': '\uf217',
    'wo': '\uf21b',
    'woo': '\uf21c',

    'bi': '\uf224',
    'ba': '\uf226',
    'bu': '\uf227',
    'bee': '\uf22b',
    'be': '\uf22d',
    'bo': '\uf230',
    'boo': '\uf233',
    'bhi': '\uf242',
    'bha': '\uf243',
    'bhu': '\uf244',
    'bhu2': '\uf229',
    'bhee': '\uf245',
    'bhe': '\uf246',
    'bho': '\uf248',
    'bhoo': '\uf249',
    'bheen': '\uf238',
    'bhih': '\uf239',
    'bhooh': '\uf23a',
    'bhah': '\uf23b',
    'bheh': '\uf23e',
    'bhuee': '\uf23f',
    'bhoi': '\uf240',
    'bhi': '\uf224',
    'kpe': '\uf24f',
    'fi': '\uf25c',
    'fa': '\uf25d',
    'fu': '\uf260',
    'fee': '\uf263',
    'fo': '\uf266',
    'foo': '\uf267',
    'vi': '\uf26a',
    'va': '\uf26b',
    'vee': '\uf26d',
    've': '\uf270',
    'vo': '\uf274',
    'voo': '\uf275',
    'gbi': '\uf251',
    'gba': '\uf252',
    'gbee': '\uf253',
    'gbe': '\uf254',
    'gbo': '\uf255',
    'gboo': '\uf258',
    'ui': '\uf25a',
    'ua': '\uf25b',
    'ti': '\uf27a',
    'ta': '\uf27b',
    'tu': '\uf27c',
    'tee': '\uf27f',
    'te': '\uf280',
    'to': '\uf282',
    'too': '\uf283',

    'li': '\uf287',
    'la': '\uf288',
    'lu': '\uf289',
    'lee': '\uf28a',
    'le': '\uf28b',
    'lo': '\uf28c',
    'loo': '\uf28e',
    'di': '\uf295',
    'da': '\uf296',
    'du': '\uf297',
    'dee': '\uf299',
    'de': '\uf29b',
    'do': '\uf29c',
    'doo': '\uf29e',
    'si': '\uf2a4',
    'sa': '\uf2a7',
    'su': '\uf2a8',
    'see': '\uf2a9',
    'se': '\uf2ab',
    'so': '\uf2ad',
    'soo': '\uf2af',
    'zi': '\uf2b6',
    'za': '\uf2b8',
    'zu': '\uf2b9',
    'zee': '\uf2ba',
    'ze': '\uf2bd',
    'zo': '\uf2be',
    'zoo': '\uf2c0',

    'yi': '\uf2c8',
    'ya': '\uf2c9',
    'yu': '\uf2ca',
    'yee': '\uf2cc',
    'ye': '\uf2cd',
    'yo': '\uf2cf',
    'yoo': '\uf2d0',
    'ki': '\uf2d6',
    'ka': '\uf2d8',
    'ku': '\uf2d9',
    'kee': '\uf2db',
    'ke': '\uf2de',
    'ko': '\uf2e1',
    'koo': '\uf2e4',
    'ggi': '\uf2ef',
    'gga': '\uf2f0',
    'ggee': '\uf2f1',

    'gi': '\uf2f4',
    'ga': '\uf2f3',
    'gu': '\uf2f7',
    'gee': '\uf2f8',
    'ge': '\uf2f9',
    'go': '\uf2fc',
    'ngi': '\uf300',

    // Vowels
    'i': '\uf305',
    'a': '\uf301',
    'u': '\uf306',
    'ee': '\uf309',
    'e': '\uf30a',
    'o': '\uf267',
    'oo': '\uf30b',
    // Nasal syllables
    'mi': '\uf30d',
    'ma': '\uf30e',
    'mu': '\uf310',
    'mee': '\uf312',
    'me': '\uf313',
    'mo': '\uf318',
    'moo': '\uf316',

    'ni': '\uf22a',
    'na': '\uf320',
    'nu': '\uf321',
    'nee': '\uf323',
    'ne': '\uf324',
    'noo': '\uf328',

    'nhi': '\uf32a',
    'nha': '\uf32d',
    'nhu': '\uf32f',
    'nho': '\uf330',

    // Nasal vowels
    'wne': '\uf220',
    'wnu': '\uf221',
    'bne': '\uf238',
    'gbu': '\uf259',
    'zne': '\uf2c3',
    'zno': '\uf2c4',
    'gne': '\uf2fd',
    'nge': '\uf304',
    'ngni': '\uf331',

    // Long vowels
    'pE': '\uf20d',
    'bI': '\uf239',
    'bA': '\uf23b',
    'bE': '\uf23e',
    'bO': '\uf23a',
    'fA': '\uf269',
    'vA': '\uf279',
    'lE': '\uf28f',
    'sA': '\uf2b1',
    'sE': '\uf2b3',
    'sO': '\uf2b4',
    'kA': '\uf2e6',
    'gE': '\uf2fe',
    'mI': '\uf317',
    'mU': '\uf31a',
    'mE': '\uf31b',
    'nE': '\uf329',
    'ngE': '\uf332',

    // Dipthongs
    'poi': '\uf20e',
    'woi': '\uf223',
    'bue': '\uf23f',
    'boi': '\uf240',
    'bai': '\uf24b',
    'bhai': '\uf24d',
    'bhue': '\uf24c',

    'tie': '\uf285',
    'tui': '\uf286',
    'lea': '\uf291',
    'lui': '\uf292',
    'luo': '\uf293',
    'lue': '\uf294',
    'dio': '\uf2a0',

    'diu': '\uf2a1',
    'duo': '\uf2a2',
    'suo': '\uf2b5',
    'zie': '\uf2c5',
    'zuo': '\uf2c6',
    'yie': '\uf2d1',
    'yai': '\uf2d4',

    'kai': '\uf2e7',
    'koi': '\uf2e9',
    'kue': '\uf2ed',
    'kuee': '\uf2eb',
    'kui': '\uf2ee',
    'gie': '\uf2ff',
    'moi': '\uf31c',
    'nie': '\uf333',
  },
  'historyPruneRegex': 'e|p|b|ba|baa|be|bn|bo|bu|bh|bha|bhe|bhee|bhi|bho|bhoo|bhu|bhue|' +
    'f|fo|fu|g|ge|gee|gi|gb|gbe|gbn|gbo|gg|gh|t|d|di|du|l|h|y|kp|kw|g|n|ng|ni|m|ny|o|' +
    've|vo|' +
    'pe|be|ka|ke|ko|kpe|fe|te|le|he|ye|kwe|we|ne|nge|po|bo|kpo|kue|ku|k|fo|to|le|lo|lu|ho|w|wn|wo|yo|' +
    'poo|se|so|su|ti|tu|u|y|ya|yi|zi|zo|zu|z'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LOM_LOMA_PUA_LAYOUT);
lom_Loma_PUA = LOM_LOMA_PUA_LAYOUT;