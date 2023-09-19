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


var SO1_LAYOUT = {
  'id': 'so1',
  'title': 'Somali 1',
  'mappings': {
    ',c': {
      '': '`{{aa}}{{\u00e4\u00e4}}{{ee}}{{ii}}{{oo}}{{uu}}7890-=' +
          'qwertyuio{{kh}}[]\\' +
          'asdfghjkl;\u02bc' +
          '{{dh}}xc{{sh}}bnm,./'
    },
    's,sc': {
      '': '~{{AA}}{{\u00c4\u00c4}}{{EE}}{{II}}{{OO}}{{UU}}&*()_+' +
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
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(SO1_LAYOUT);
so1 = SO1_LAYOUT;
