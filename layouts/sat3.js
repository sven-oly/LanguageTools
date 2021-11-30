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

var SAT3_LAYOUT = {
  'sources': [
    'olchikidr.blogspot.in',
    'https://wesanthals.tripod.com/id19.html',
    'https://www.mediawiki.org/wiki/Help:Extension:UniversalLanguageSelector/Input_methods/sat-Sarjom_baha',
  ],
  'id': 'sat3',
  'title': 'ᱥᱟᱱᱛᱟᱲᱤ Olchiki DR',
  'mappings': {
    ',c': {
      '': '₹᱑᱒᱓᱔᱕᱖᱗᱘᱙᱐-=' +
          '\u1c67\u1c63\u1c6e\u1c68\u1c74\u1c6d\u1c69\u1c64\u1c5a\u1c6f[]\\' +
          '\u1c5f\u1c65\u1c6b\u1c5d\u1c5c\u1c66\u1c61\u1c60\u1c5eᱺ\'' +
          '\u1c72\u1c7d\u1c6a\u1c76\u1c75\u1c71\u1c62᱿᱾/'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}\u1c73{{}}{}|' +
          '`{{}}{{}}{{}}{{}}\u1c77<>;:\"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}\u1c6c,.?'
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
google.elements.keyboard.loadme(SAT3_LAYOUT);
sat3 = SAT3_LAYOUT;