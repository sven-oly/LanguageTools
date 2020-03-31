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


var BN3_LAYOUT = {
  'id': 'bn_b3',
  'title': 'Bangali',
  'mappings': {
    ',c': {
      '': '`১২৩৪৫৬৭৮৯০-=' +
          'য়ৃেরটয়ুিোপ[]॥' +
          'াসডফগহজকল;\'' +
          'য{{ক্স}}চভবনম,।/'
    },
    's,sc': {
      '': '~‍!@#৳%^্*()_্' +
          '     যউইওচ{}।' +
          'আষদঋঘঃঝখখ:\"' +
          'তঢছঠইণগ<>?'
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
    '[\u09c7\u09c8\u09bf\u09cb\u09cc][\u0995-\u09b9]'
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BN3_LAYOUT);
