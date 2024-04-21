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


var COM_LAYOUT = {
  'id': 'com',
  'title': 'Nʉmʉ Tekwapʉ̲ QWERTY',
  'reference': 'https://www.languagegeek.com/usw/keyboards/keymap_comanche.html',
    'mappings': {
	'': {
	    '': '‘1234567890-=' +
		'qwertyuiop{{S||_||\u0331}}{{S||\u00B4||\u0301}}{{\u0301\u0331}}' +
		'asdfghjklʉ\’' +
		'zxcvbnm,.ʔ'
	},
	'c': {
	    '': '‘12345678«»-=' +
		'qwertyuiop[]\\' +
		'asdfghjklʉ\’' +
		'zxcvbnm,./'
	},
	's': {
	    '': '~!@#$%^&*()_+' +
		'QWERTYUIOP{{\u201C}}{{\u201D}}|' +
		'ASDFGHJKLɄ"' +
		'ZXCVBNM;:?'
	},
	'sc': {
	    '': '~!@#$%^&*‹›_+' +
		'QWERTYUIOP{{\u201C}}{{\u201D}}|' +
		'ASDFGHJKLɄ"' +
		'ZXCVBNM;:?'
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
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(COM_LAYOUT);
com = COM_LAYOUT;
