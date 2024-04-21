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


var SO2_LAYOUT = {
  'id': 'so2',
  'title': 'Somali 2',
  'mappings': {
    ',c': {
      '': '{{\u00e4}}1234567890-=' +
          'qwertyuio{{kh}}[]\\' +
          'asdfghjkl;\u02bc' +
          '{{dh}}xc{{sh}}bnm,./'
    },
    's,sc': {
      '': '{{\u00c4}}!@#$%^&*()_+' +
          'QWERTYUIO{{Kh}}{}|' +
          'ASDFGHJKL:"' +
          '{{Dh}}XC{{Sh}}BNM<>?'
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
	// "Doubling" charaters followed by '\'
	'\u00e4\\\\': '\u00e4\u200d\u00e4',
	'a\\\\': 'a\u200da',
	'e\\\\': 'e\u200de',
	'e\\\\': 'i\u200di',
	'o\\\\': 'o\u200do',
	'u\\\\': 'u\u200du',
	'd\\\\': 'd\u200dh',
	'k\\\\': 'k\u200dh',
	's\\\\': 's\u200dh',
	'\u00c4\\\\': '\u00c4\u200d\u00c4',
	'A\\\\': 'A\u200dA',
	'E\\\\': 'E\u200dE',
	'E\\\\': 'I\u200dI',
	'O\\\\': 'O\u200dO',
	'U\\\\': 'U\u200dU',
	'D\\\\': 'D\u200dH',
	'K\\\\': 'K\u200dh',
	'S\\\\': 'S\u200dh',
    }
};

// LOAD the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(SO2_LAYOUT);
so2 = SO2_LAYOUT;
