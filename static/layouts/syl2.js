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

var SYL_LAYOUT2 = {
  'id': 'syl2',
  'title': "Sylothi PUA Numerals",
  'mappings': {
    '': {
      '': '`\uef31\uef32\uef33\uef34\uef35\uef36\uef37\uef38\uef39\uef30-=' +
          '\ua828\ua829\ua826\ua81e\ua814\ua802' +
            '\ua825\ua824\ua827\ua819[]\\' +
          '\ua823\ua821\ua816{{?}}\ua809\ua822\ua80e\ua807\ua81f;\u201C' +
          '\ua812\ua810\ua80c\ua825\ua81b\ua818\ua81d,./'
    },
    's, sc': {
      '': '~!@#$%{{\ua806}}&*()_+' +
          '\ua82a\ua82b\ua804\ua820\ua815{{}}\ua803\ua801\ua805\ua81a{}|' +
          '\ua800{{}}\ua817\{{?}}\ua80a{{}}\ua80f\ua80c{{}}:\u201d' +
          '\ua813\ua811{{}}{{}}\ua81c{{}}{{}}<>?'
    },
    'c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },    'l,cl': {
      '': '`1234567890-=' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  },

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(SYL_LAYOUT2);
syl2 = SYL_LAYOUT2;
