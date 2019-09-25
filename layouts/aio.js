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

var AIO_LAYOUT = {
  'id': 'aio',
  'title': "Aiton *** NOT STARTED!!!",
  'mappings': {
    '': {
      '': '`\ua841\ua842\ua843\ua844\ua845\ua846\ua847\ua848\ua849\ua840-=' +
          '\ua806\ua810\ua814\ua819\ua821\ua81a' +
          '\ua81b\ua81E\ua805\ua81F{\\' +
          '\ua837\ua836\ua862\ua82e\ua82d\ua832\ua815\ua863\ua864\ua862\ua838\ua812' +
          '\ua804\ua811\ua801\ua818\ua803\ua816\ua82c,./'
    },
    's, sc': {
      '': '~!@#$%^&*()_+' +
          '\ua804\ua804\ua804\ua804' +
          '\ua804\ua804\ua804\ua81c\ua81D\ua861\ua827}|' +
          '\ua83c\ua83e\ua83b\ua860\ua83dH\ua82f\ua830\ua82b:"' +
          '\ua807XCVB\ua80aM<>?'
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
google.elements.keyboard.loadme(AIO_LAYOUT);
