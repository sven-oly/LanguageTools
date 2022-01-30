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


var MRU_LAYOUT = {
  'id': 'mro',
  'title': 'Mru',
  'mappings': {
    ',c': {
      '': '`{{𖩡}}{{𖩢}}{{𖩣}}{{𖩤}}{{𖩥}}{{𖩦}}{{𖩧}}{{𖩨}}{{𖩩}}{{𖩠}}-=' +
          '{{𖩛}}{{𖩗}}{{𖩘}}{{𖩓}}{{𖩀}}{{𖩂}}{{𖩑}}{{𖩊}}{{𖩒}}{{𖩐}}{{𖩮}}{{𖩯}}\\' +
          '{{𖩆}}{{𖩔}}{{𖩅}}{{𖩇}}{{𖩁}}{{𖩉}}{{𖩙}}{{𖩌}}{{𖩍}}{{;}}{{’}}' +
          '{{𖩖}}{{𖩈}}{{𖩋}}{{𖩕}}{{𖩄}}{{𖩏}}{{𖩎}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{𖩞}}{{}}{{}}{{𖩝}}{{}}{{}}{{}}{{}}{{}}{{}}{}|' +
          '{{}}{{}}{{}}{{}}{{}}{{𖩜}}{{}}{{}}{{𖩚}}:"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{𖩃}}<>?'
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
google.elements.keyboard.loadme(MRU_LAYOUT);
mro = MRU_LAYOUT;