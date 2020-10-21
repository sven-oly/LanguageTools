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


var YO_LAYOUT = {
  'id': 'yo',
  'title': 'Yorùbá',
  'mappings': {
    ',l': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    's,sl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'c, cl': {
      '': '`1234567890-=' +
          'qwẹrtyuiọp[]\\' +
          'aṣd{{\u030c}}g{{\u0301}}jk{{\u0300}}:{{\u0329}}' +
          'zxcvbn{{\u0304}},./'
    },
    'sc, scl': {
      '': '~!@#$%^&*()_+' +
          'QWẸRTYUIỌP{}|' +
          'AṢDFGHJKL;\'' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(YO_LAYOUT);
yo = YO_LAYOUT;