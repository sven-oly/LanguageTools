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


var AS1_LAYOUT = {
  'id': 'as1',
  'title': 'Assamese fonatic',
  'mappings': {
    ',c': {
      '': '{{\u09F0\u09CD}}১২৩৪৫৬৭৮৯০-=' +
          'ডৱেৰতয়ুিোপ[]্' + // \u09a6\u09c2\u09c0\u09f0\u099F\u098f\u09c1\u09bf\u0993\u09AA\u09c7\u09cb\u09F1' +
          '\u09beসদটগহজকল;\'' +
          '{{\u09AF\u09BC}}ষচৱবনম,\u09f7\u09cd'
    },
    's,sc': {
      '': '{{্ৰৰ}}!@#$%ঁ&*()_+' +
          '{{ঢ}}{{্ব}}{{ৈ}}{{ঋ}}{{থ}}{{য}}{{ূ}}{{ী}}{{ৌ}}{{ফ}}{}|' + // \u09A7\u098A\u0988{{\u09A1\u09BC}}\u09A0\u0990\u0989\u0987\u0994\u09AB\u09c8\u09cc\u0965' +
          '{{আ}}{{শ}}{{ধ}}{{ঠ}}{{ঘ}}{{ঃ}}{{ঝ}}{{খ}}{{্ল}}:"' +
          '{{\u09CD\u09AF}}{{ক্ষ}}{{ছ}}{{্ৱ}}{{ভ}}{{ণ}}{{ঙ}}<>?'
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
    // Reorder leading vowels after consonants
    '([\u09bf\u09c7\u09c8\u09cb\u09cc])([\u0995-\u09f2])': '$2$1',
    '([\u09cd])([\u09be-\u09cd])': '$2$1',  // Reorder virama
    '([\u0981-\u0983])([\u09be-\u09cd])': '$2$1',  // Reorder virama
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(AS1_LAYOUT);
as1 = AS1_LAYOUT;