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


var KPE_KPEL_LAYOUT = {
  'id': 'kpe_Kpel',
  'title': 'Kpelle script',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{}}wertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
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
    'pi': '\u00c0',
    'pa': '\u00c1',
    'pu': '\u00c2',
    'pee': '\u00c3',
    'pe': '\u00c4',
    'po': '\u00c5',
    'poo': '\u00c6',

    'bi': '\u00c7',
    'ba': '\u00c8',
    'bee': '\u00c9',
    'be': '\u00ca',
    'bo': '\u0051',  // ??
    'boo': '\u00cb',

    'kpi': '\u00cc',
    'kpa': '\u00cd',
    'kpu': '\u00ce',  // ??
    'kpee': '\u00cf',
    'kpe': '\u00d0',
    'kpo': '\u00d1',
    'kpoo': '\u00d2',

    'fi': '\u00d3',
    'fa': '\u00d4',
    'fu': '\u0051',
    'fee': '\u0051',
    'fe': '\u00d5',
    'fo': '\u00d6',  // ??
    'foo': '\u00d7',

    'ti': '\u00d8',
    'ta': '\u00da',
    'tu': '\u00db',
    'tee': '\u00dc',
    'te': '\u00dd',
    'to': '\u00de',  // ??
    'too': '\u00df',

    'di': '\u00d9',

    'li': '\u00e0',
    'la': '\u00e1',
    'lu': '\u00e2',
    'lee': '\u00e8',
    'le': '\u00e4',
    'lo': '\u00e5',
    'loo': '\u00e6',

    'hi': '\u00e7',
    'ha': '\u00e3',
    'hu': '\u00e9',
    'hee': '\u00ea',
    'he': '\u00eb',
    'ho': '\u00ec',
    'hoo': '\u00ed',

    'yi': '\u00ee',
    'ya': '\u00ef',
    'yu': '\u0051',
    'yee': '\u00f0',
    'ye': '\u00f1',

    'ki': '\u00f3',
    'ka': '\u00f4',
    'ku': '\u00f7',
    'kee': '\u00f8',
    'ke': '\u00f9',
    'ko': '\u00fa',
    'koo': '\u00fb',

    'kwi': '\u00fc',
    'kwa': '\u0051',
    'kwee': '\u00fd',
    'kwe': '\u00fe',
    'kwo': '\u00fa',
    'kwoo': '\u00fb',

    'ga': '\u00f5',

    'ghi': '\u00ff',
    'gha': '\u0100',
    'ghee': '\u00ff',  // dup?
    'ghe': '\u0101',

    'ngi': '\u0105',
    'nga': '\u0118',
    'ngu': '\u0051',
    'ngee': '\u0051',
    'nge': '\u0101',

    'ngwi': '\u0105',
    'ngwa': '\u0106',
    'ngwee': '\u0051',
    'ngwe': '\u0109',

    'nya': '\u0114',
    'nyee': '\u0115',
    'nye': '\u0116',
    'nyo': '\u0117',

    'mi': '\u010c',
    'ma': '\u010d',
    'mu': '\u010e',
    'mo': '\u010f',

    'ni': '\u0110',
    'na': '\u0111',
    'nu': '\u0112',
    'nee': '\u0113',

    'wa': '\u0107',
    'wun': '\u0108',
    'wun': '\u0108',
    'wee': '\u00c3',
    'we': '\u010b',
    'won': '\u010a',
    'woo': '\u0104',

    'ni': '\u0110',
    'na': '\u0111',
    'nu': '\u0112',
    'nee': '\u0113',

    // Sylllable lengtheners
    'm': '\u0051',  // ??
    'yny': '\u00f2',
    'ng': '\u0119',
 },
 'historyPruneRegex': 'p|b|f|t|d|l|h|y|k|kp|kw|g|n|ng|m|ny|ng|' +
    'pe|be|ke|kpe|fe|te|le|he|ye|kwe|we|ne|nge|nge|ngw|nye|po|bo|kpo|fo|to|lo|ho|yo|ko|wo'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(KPE_KPEL_LAYOUT);
en = KPE_KPEL_LAYOUT;