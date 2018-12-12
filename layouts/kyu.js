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


var KYU_LAYOUT = {
  'id': 'kyu',
  'title': 'Kayah (in process)',
  'mappings': {
    ',c': {
      '': '`\ua901\ua902\ua903\ua904\ua905\ua906\ua907\ua908\ua909\ua900-=' +
          '\ua920\ua90e\ua919\ua923\ua91a\ua924\ua925\ua91d\ua913\ua911\ua918}|' +
          '\ua90a\ua914\ua91b\ua922\ua92c\ua92d\ua912\ua91f\ua915\ua91c\ua90d' +
          '\ua921\ua90c\ua90f\ua90b\ua917\ua916\ua91d\ua910?'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWE\ua926\ua927\ua928\ua929\ua92aOP[]\\' +
          'ASD{{\ua922\ua926}}{{\ua922\ua927}}{{\ua922\ua928}}{{\ua922\ua929}}{{\ua922\ua92a}}L;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(KYU_LAYOUT);
