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

// Based on CLDR's Tifinagh (Extended) layout
// http://www.unicode.org/cldr/charts/latest/keyboards/layouts/tmh.html

var TMH_LAYOUT = {
  'id': 'tmh',
  'title': 'Tamashek',
  'mappings': {
    '': {
      '': '²&ⵒ\u{22}\'(-ⵤ_—\u{200C})=' +
	  'ⴰⵣⴻⵔⵜⵢⵓⵉⵄⵃⵯ$*' +
	  'ⵇⵙⴷⴼⴳⵀⵊⴽⵍⵎⵑ' +
	  '<ⵡⵅⵛⵖⴱⵏ,;:'
    },
    's': {
      '' : '\u{200D}1234567890°+' +
	  'ⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠ£µ' +
	  'ⵈⵚⴹⴵ{{ⴳⵯ}}ⵁⵋ{{ⴽⵯ}}ⴸⴺ%>ⴾⵆⴿⴴⴲⵐ?./'
    },
    'sl,l': {
      '' : '\u{200D}1234567890°+' +
	  'ⴶⵥⵗⵕⵟⵂⵌⵘⵝⵞⵠ£§' +
	  'ⵈⵚⴹⴵ{{}}ⵁⵋ{{}}ⴸⴺ%' +
	  '>ⴾⵆⴿⴴⴲⵐ?./'
    },
    'c, sc': {
      '': '{{}}{{}}~#{[|{{}}\\^@]}' +
	  '{{}}{{}}{{}}€{{}}{{}}{{}}{{}}{{}}{{}}{{}}¤'
    },
    'scl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  }
};

// Load the layout and inform the keyboard to switch layout if necessary. cibu
google.elements.keyboard.loadme(TMH_LAYOUT);
tmh = TMH_LAYOUT;