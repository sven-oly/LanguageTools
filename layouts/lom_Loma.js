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
  'transform': {
    'a': '\u01a2',
    'e': '\u01ab',
    'ee': '\u01aa',
    'pi': '\u00a2'
  },
  'historyPruneRegex': 'e|p|b|ba|baa|be|bo|bu|bh|bha|bhe|bhee|bho|bhu|bhue|' +
    'f|fo|fu|g|ge|gee|gi|gb|gbe|bgo|gh|t|d|l|h|y|kp|kw|g|n|ng|m|ny|ng' +
    'pe|be|ke|kpe|fe|te|le|he|ye|kwe|we|ne|nge|nge|po|bo|kpo|fo|to|lo|ho|yo|ko|wo'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LOM_LOMA_LAYOUT);
en = LOM_LOMA_LAYOUT;