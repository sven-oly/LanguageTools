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


var AS_INDIC3_LAYOUT = {
  'id': 'as_indic3',
  'title': 'Assamese Indic3',
  'source': 'https://www.microsoft.com/en-in/images/downloads/Assamese%20Indic%20Input%203-User%20Guide.pdf',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'qweৰটyuiop[]\\' +
          'অsdfghjকl;\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZকCVBNM<>?'
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
    'অঅ': 'আ',  // aa
    'কৰ': 'ক',  // reph typed after
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(AS_INDIC3_LAYOUT);
as_indic3 = AS_INDIC3_LAYOUT;