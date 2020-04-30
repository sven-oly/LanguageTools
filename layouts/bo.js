// Tibetan virtual keyboard, based on Monlam tibetan keyboard
// 28-Dec-2016.
//
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


// TODO: Resolve questions between PDF pictures and code points.
// TODO: Figure out which code points cannot be typed, e.g, U+0fcf

var BO_UNICODE_LAYOUT = {
  'id': 'bo',
  'title': 'Tibetan Unicode', // Revise this
  'mappings': {
    '': {
      '': '{{\u0F0C}}{{\u0F21}}{{\u0F22}}{{\u0F23}}' +
        '{{\u0F24}}{{\u0F25}}{{\u0F26}}{{\u0F27}}' +
        '{{\u0F28}}{{\u0F29}}{{\u0F20}}{{\u0F80}}{{\u0F7E}}' +
	  '{{\u0F4A}}{{\u0F5D}}{{\u0F7A}}{{\u0F62}}' +
	    '{{\u0F4F}}{{\u0F61}}{{\u0F74}}{{\u0F72}}' +
	    '{{\u0F7C}}{{\u0F54}}{{\u0F37}}{{\u0F84}}{{\u0F14}}' +
	  '{{S||\u0F40\u0F84||\u21d3}}{{\u0F66}}{{\u0F51}}{{\u0F44}}' +
	    '{{\u0F42}}{{\u0F67}}{{\u0F47}}{{\u0F40}}' +
	    '{{\u0F63}}{{\u0F4D}}{{\u0F60}}' +
	  '{{\u0F5F}}{{\u0F59}}{{\u0F45}}{{\u0F4C}}' +
	    '{{\u0F56}}{{\u0F53}}{{\u0F58}}{{\u0FB1}}' +
	    '{{\u0FB2}}{{\u0F0D}}{{\u0F0B}}'
    },
    's': {
      '': '{{\u0F38}}{{\u0F11}}{{\u0F04}}{{\u0F05}}{{\u201C}}{{\u201D}}{{\u0F08}}{{\u0F3C}}{{\u0F3D}}{{\u0028}}{{\u0029}}{{\u0F81}}{{\u0F83}}' +
	  '{{\u0F4B}}{{\u0FAD}}{{\u0F7B}}{{\u0F6A}}{{\u0F50}}{{\u0FB1}}{{\u0F75}}{{\u0F80}}{{\u0F7D}}{{\u0F55}}{{\u0F82}}{{\u0F35}}{{\u0F85}}' +
	  '{{\u0f68}}{{\u0F64}}{{\u0F5B}}{{\u0F52}}{{\u0F43}}{{\u0FB7}}{{\u0F5C}}{{\u0F41}}{{\u0FB3}}{{\u0F7F}}' +
	  '{{\u0F71}}{{\u0F5E}}{{\u0F5A}}{{\u0F46}}{{\u0F4E}}{{\u0F57}}{{\u0F49}}{{\u0F65}}{{\u2019}}{{\u0FB3}}{{\u201E}}'
    },
    'c': {  // alt-control and shift-alt-control
      ' ':  '\u0F0C'
    },
    'sc': {  // alt-control and shift-alt-control
    },
    'l': {  // cap slock. qwerty
      '':  '{{\u0F09}}{{\u0F2A}}{{\u0F2B}}{{\u0F2C}}{{\u0F2D}}{{\u0F2E}}{{\u0F2F}}{{\u0F30}}{{\u0F31}}{{\u0F32}}{{\u0F33}}{{\u0F18}}{{\u0F73}}' +
	  '{{\u0F3A}}{{\u0F3B}}{{\u0FBF}}{{\u0F86}}{{\u0F87}}{{\u0F01}}{{\u0F02}}{{\u0F3F}}{{\u0F3E}}{{\u0F06}}{{\u0F07}}{{\u0F13}}{{\u0f02}}' +
	  '{{a}}{{\u0FCA}}{{\u0FCB}}{{\u0fcc}}{{\u0F0A}}{{\u0F0F}}{{\u0F10}}{{\u0F88}}{{\u0F12}}{{\u0F13}}{{\u0F15}}{{\u0F17}}' +
	  '{{\u0F19}}{{\u0F1A}}{{\u0F1B}}{{\u0F1C}}{{\u0F1D}}{{\u0F1E}}{{\u0F1F}}{{\u0F89}}{{\u0F0D}}{{}}'
    },
    'sl': {  // shift-caps lock. QWERTY
     '':  '{{༕}}{{༖}}{{࿀}}{{࿁}}{{࿂}}{{࿄}}{{࿅}}{{\u0fc6}}{{࿈}}{{࿉}}{{࿊}}{{࿃}}{{\u0fcf}}'
    }
  },
  'transform': {
    // Replace doubled vowels with equivalent long forms.
    '\u0f7a\u0f7a': '\u0f7b',  // EE
    '\u0f7c\u0f7c': '\u0f7d',  // OO
    // 'a' is the dead key for transformations.
    '\u21d3\u0f40' : '\u0f90',
    '\u21d3\u0f41' : '\u0f91',
    '\u21d3\u0f42' : '\u0f92',
    '\u21d3\u0f44' : '\u0f94',
    '\u21d3\u0f45' : '\u0f95',
    '\u21d3\u0f46' : '\u0f96',
    '\u21d3\u0f47' : '\u0f97',
    '\u21d3\u0f49' : '\u0f99',
    '\u21d3\u0f4a' : '\u0f9a',
    '\u21d3\u0f4b' : '\u0f9b',
    '\u21d3\u0f4b' : '\u0f9b',
    '\u21d3\u0f4c' : '\u0f9c',
    '\u21d3\u0f4e' : '\u0f9e',
    '\u21d3\u0f4f' : '\u0f9f',
    '\u21d3\u0f50' : '\u0fa0',
    '\u21d3\u0f51' : '\u0fa1',
    '\u21d3\u0f53' : '\u0fa3',
    '\u21d3\u0f54' : '\u0fa4',
    '\u21d3\u0f55' : '\u0fa5',
    '\u21d3\u0f58' : '\u0fa8',
    '\u21d3\u0f59' : '\u0fa9',
    '\u21d3\u0f5a' : '\u0faa',
    '\u21d3\u0f5b' : '\u0fab',
    '\u21d3\u0f5d' : '\u0fad',
    '\u21d3\u0f5e' : '\u0fae',
    '\u21d3\u0f5f' : '\u0faf',
    '\u21d3\u0f60' : '\u0f71',
    '\u21d3\u0f61' : '\u0fb1',
    '\u21d3\u0f62' : '\u0fb2',
    '\u21d3\u0f63' : '\u0fb3',
    '\u21d3\u0f64' : '\u0fb4',
    '\u21d3\u0f65' : '\u0fb5',
    '\u21d3\u0f66' : '\u0fb6',
    '\u21d3\u0f67' : '\u0fb7',
    '\u21d3\u0f68' : '\u0fb8',
    '\u21d3\u0f71' : '\u0fb0',
    '\u21d3\u0fad' : '\u0fba',
    '\u21d3\u0fb1' : '\u0fbb',
    '\u21d3\u0fb1' : '\u0fbb',
    '\u21d3\u0fb2' : '\u0fbc',
    '\u21d3\u0fb3' : '\u0fb3',
    '\u21d3\u0fb3' : '\u0fb3',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BO_UNICODE_LAYOUT);
bo = BO_UNICODE_LAYOUT;