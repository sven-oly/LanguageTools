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


var LOM_LOMA_LAYOUT = {
  'id': 'lom_Loma',
  'title': 'Loma script',
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
  'transform': {  // These are to Font encodings.
    'a': '\u01a2',
    'bhi': '\u00c5',
    'bha': '\u00c7',
    'bhu': '\u00c8',
    'bhu2': '\u00ca',
    'bhi': '\u00c5',
    'bhee': '\u00cc',
    'bhe': '\u00ce',
    'bho': '\u00d1',
    'bhoo': '\u00d4',
    'bheen': '\u00d9',
    'bhih': '\u00da',
    'bhooh': '\u00db',
    'bhah': '\u00dc',
    'bheh': '\u00df',
    'bhuee': '\u00e0',
    'bhoi': '\u00e1',
    'bhi': '\u00c5',
    'e': '\u01ab',
    'ee': '\u01aa',
    'pa': '\u00a3',
    'pee': '\u00a7',
    'pe': '\u00a8',
    'peh': '\u00ae',
    'pi': '\u00a2',
    'poo': '\u00ac',
    'pooi': '\u00af',
    'po': '\u00a9',
    'pu': '\u00a5',
  },
  'historyPruneRegex': 'e|p|b|ba|baa|be|bo|bu|bh|bha|bhe|bhee|bhi|bho|bhoo|bhu|bhue|' +
    'f|fo|fu|g|ge|gee|gi|gb|gbe|bgo|gh|t|d|l|h|y|kp|kw|g|n|ng|m|ny|ng' +
    'pe|be|ke|kpe|fe|te|le|he|ye|kwe|we|ne|nge|nge|po|bo|kpo|fo|to|lo|ho|yo|ko|wo|' +
    'poo|see|soo|suo|tie|zie|zoo|zuo/'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LOM_LOMA_LAYOUT);
lom_Loma = LOM_LOMA_LAYOUT;