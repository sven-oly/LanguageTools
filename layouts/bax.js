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

// Implements Batak Simalungun keyboard based on request,
// TODO: Add reference

var BAX_LAYOUT = {
  'id': 'bax',
  'title': "Bamum (prototype)",
  'mappings': {
    '': {
      '': '^\ua6f2\ua6f5\ua6f3\ua6f6\ua6f4\ua6f7{{}}{{}}{{}}{{}}\ua6e2\ua6e4' +
          '\ua6a0\ua6a2\ua6a4\ua6a6\ua6a8\ua6aa\ua6ac\ua6ae\ua6b0\ua6b2\ua6b4\ua6b6@' +
          '\ua6b8\ua6ba\ua6bc\ua6be\ua6c0\ua6c2\ua6c4\ua6c6\ua6c8\ua6ca\ua6cc' +
          '\ua6ce\ua6d0\ua6d2\ua6d4\ua6d6\ua6d8\ua6da\ua6dc\ua6de\ua6e0/'
    },
    's, sc': {
      '': '\ua6f1\ua6e6\ua6e7\ua6e8\ua6e9\ua6ea\ua6eb\ua6ec\ua6ed\ua6ee\ua6ef\ua6d3\ua6e5' +
          '\ua6a1\ua6a3\ua6a5\ua6a7\ua6a9\ua6ab\ua6ad\ua6af\ua6b1\ua6b3\ua6b5\ua6b7\\' +
          '\ua6b9\ua6bb\ua6bd\ua6bf\ua6c1\ua6c3\ua6c5\ua6c7\ua6c9\ua6cb\ua6cd' +
          '\ua6cf\ua6d1\ua6d3\ua6d5\ua6d7\ua6d9\ua6db\ua6dd\ua6df\ua6e1'
    },
    'c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },    'l,cl': {
      '': '`1234567890-=' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\"' +
          'ZXCVBNM,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    }
  },

  // May need rules to reorder, especially U+1be9, which is visually left of the consonant.

};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BAX_LAYOUT);
