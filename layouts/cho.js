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


var CHO_LAYOUT = {
  'id': 'cho',
  'title': 'Chahta traditional',
  'mappings': {
    '': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjklʋ\'' +
          'zxcvbnm,.{{S||_||\u0331}}'
    },
    'c': {
      '': '`1234567890-=' +
          'q\u1ea1ertyuiop[]\\' +
          'asdfghjk\u0142;\'' +
          'zxcvbⁿm,./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKLƲ"' +
          'ZXCVBNM;:?'
    },
    'sc': {
      '': '~!@#$%^&*()_+' +
          'Q\u1ea0ERTYUIOP{}|' +
          'ASDFGHJK\u0141:"' +
          'ZXCVBⁿM<>?'
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
google.elements.keyboard.loadme(CHO_LAYOUT);
cho = CHO_LAYOUT;