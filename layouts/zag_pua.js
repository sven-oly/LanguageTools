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

// Implements Ahom keyboard based on ...
// TODO: Add reference

var ZAG_PUA_LAYOUT = {
  'id': 'zag_pua',
  'title': "Zaghawa Beria Private Use Area",
  'mappings': {
    '': {
      '': '{{\u0300}}1234567890-=' +
          '{{\u0301}}{{\udb80\udc77}}{{\udb80\udc65}}{{\udb80\udc72}}' +
	    '{{\udb80\udc74}}{{\udb80\udc78}}{{\udb80\udc75}}{{\udb80\udc69}}' +
	    '{{\udb80\udc6f}}{{\udb80\udc70}}[]\\' +
          '{{\udb80\udc61}}{{\udb80\udc73}}{{\udb80\udc64}}{{\udb80\udc66}}' +
	    '{{\udb80\udc67}}{{\udb80\udc68}}{{\udb80\udc6a}}{{\udb80\udc6b}}' +
	    '{{\udb80\udc6c}};\'' +
          '{{\udb80\udc79}}{{\udb80\udc78}}{{\udb80\udc63}}{{\udb80\udc76}}' +
	    '{{\udb80\udc62}}{{\udb80\udc6e}}{{\udb80\udc6d}},./'
    },
    's, sc': {
      '': '~!@#$%^&*(){{\u0304}}+' +
          '{{\u0307}}{{\udb80\udc57}}{{\udb80\udc45}}{{\udb80\udc52}}' +
	    '{{\udb80\udc54}}{{\udb80\udc58}}{{\udb80\udc55}}{{\udb80\udc49}}' +
	    '{{\udb80\udc4f}}{{\udb80\udc50}}[]\\' +
          '{{\udb80\udc41}}{{\udb80\udc53}}{{\udb80\udc44}}{{\udb80\udc46}}' +
	    '{{\udb80\udc47}}{{\udb80\udc48}}{{\udb80\udc4a}}{{\udb80\udc4b}}' +
	    '{{\udb80\udc4c}};\'' +
          '{{\udb80\udc59}}{{\udb80\udc58}}{{\udb80\udc43}}{{\udb80\udc56}}' +
	    '{{\udb80\udc42}}{{\udb80\udc4e}}{{\udb80\udc4d}}<>?'
    },
    'c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl,scl': {
      '': '`1234567890-=' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  },

  // Deal with the encoded characters and diacritics
  'transform' : {
    // Special representations of acute/accent/macron/
    // These should really be using base character + modifier in the font
    // A
    '\udb80\udc41\u0300': '\udb80\udcc0',
    '\udb80\udc41\u0301': '\udb80\udcc1',
    '\udb80\udc41\u0304': '\udb80\udcc2',
    '\udb80\udc41\u0307': '\udb80\udd41',

    '\udb80\udc61\u0300': '\udb80\udce0',
    '\udb80\udc61\u0301': '\udb80\udce1',
    '\udb80\udc61\u0304': '\udb80\udce2',
    '\udb80\udc61\u0307': '\udb80\udd42',

    // E
    '\udb80\udc45\u0300': '\udb80\udcc8',
    '\udb80\udc45\u0301': '\udb80\udcc9',
    '\udb80\udc45\u0304': '\udb80\udcca',
    '\udb80\udc45\u0307': '\udb80\udd16',

    '\udb80\udc65\u0301': '\udb80\udce8',
    '\udb80\udc65\u0302': '\udb80\udce9',
    '\udb80\udc65\u0304': '\udb80\udcea',
    '\udb80\udc65\u0307': '\udb80\udd17',

    // I
    '\udb80\udc49\u0300': '\udb80\udccc',
    '\udb80\udc49\u0301': '\udb80\udccd',
    '\udb80\udc49\u0304': '\udb80\udcce',
    '\udb80\udc49\u0307': '\udb80\udd30',

    '\udb80\udc69\u0300': '\udb80\udcec',
    '\udb80\udc69\u0301': '\udb80\udced',
    '\udb80\udc69\u0304': '\udb80\udcee',
    '\udb80\udc69\u0307': '\udb80\udd43',

    // O
    '\udb80\udc4f\u0300': '\udb80\udcd2',
    '\udb80\udc4f\u0301': '\udb80\udcd3',
    '\udb80\udc4f\u0304': '\udb80\udcd4',
    '\udb80\udc4f\u0307': '\udb80\udd44',

    '\udb80\udc6f\u0300': '\udb80\udcf2',
    '\udb80\udc6f\u0301': '\udb80\udcf3',
    '\udb80\udc6f\u0304': '\udb80\udcf4',
    '\udb80\udc6f\u0307': '\udb80\udd46',

    // U
    '\udb80\udc55\u0300': '\udb80\udcd9',  // ??
    '\udb80\udc55\u0301': '\udb80\udcda',
    '\udb80\udc55\u0304': '\udb80\udcdb',
    '\udb80\udc55\u0307': '\udb80\udd45',

    '\udb80\udc75\u0300': '\udb80\udcf9',
    '\udb80\udc75\u0301': '\udb80\udcfa',
    '\udb80\udc75\u0304': '\udb80\udcfb',
    '\udb80\udc75\u0307': '\udb80\udd47',


    // Dot above - Not done yet
    '(A\u0307)': '\u00a5',
    '(a\u0307)': '\u00a6',
    '(E\u0307)': '\u0089',
    '(e\u0307)': '\u008a',
    '(I\u0307)': '\u008b',
    '(i\u0307)': '\u00a7',
    '(O\u0307)': '\u00a8',
    '(o\u0307)': '\u00a9',
    '(U\u0307)': '\u00a9',
    '(u\u0307)': '\u00ab',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(ZAG_PUA_LAYOUT);
zag_pua = ZAG_PUA_LAYOUT;