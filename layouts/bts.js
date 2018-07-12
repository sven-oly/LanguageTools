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

var BTS_LAYOUT = {
  'id': 'bts',
  'title': "Batak Simalungun (prototype)",
  'mappings': {
    '': {
      '': '`1234567890-=' +
          '{{}}\u1bcc{{\u1bc0\u1be9}}\u1bd3\u1bd6\u1bdc\u1be5' +
          '\u1be4{{\u1bc0\u1bec}}\u1bc8[]\\' +
          '\u1bc0\u1bd9\u1bd1{{}}\u1bcf\u1bc3\u1bd0\u1bc3\u1bdf;\'' +
          '\u1bdd\u1be0{{}}{{}}\u1bc5\u1bc9\u1bd5,./'
    },
    's, sc': {
      '': '~!@#$%^&*()\uaa68+' +
          '\u1bf0{{}}\u1be9{{}}{{}}{{}}\u1bee\u1beb\u1bec{{}}{}|' +
          '\u1bf3{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}:\"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}<>?'
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
google.elements.keyboard.loadme(BTS_LAYOUT);
