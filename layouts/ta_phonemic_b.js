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


var TA_PHONEMIC_B_LAYOUT = {
  'id': 'ta_phonemic_b',
  'title': 'தமிழ் phonemic B',
  'source': 'https://elangocheran.com/2021/02/11/d-pub-for-keyboards-for-agglutinative-languages-and-abugidas/',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{ண்}}{{ஞ்}}{{ங்}}{{எ}}{{ஏ}}{{ஊ}}{{உ}}{{ந்}}{{ம்}}{{ய்}}[]\\' +
          '{{ட்}}{{ச்}}{{க்}}{{அ}}{{ஆ}}{{ஈ}}{{இ}}{{த்}}{{ப்}}{{வ்}}\'' +
          '{{ழ்}}{{ள்}}{{ல்}}{{ஒ}}{{ஓ}}{{ஐ}}{{ன்}}{{ற்}}{{ர்}}{{ஔ}}'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{ஶ்ரீ}}{{ஸ்}}{{ஷ்}}{{ஏ}}TY{{ஊ}}IO{{ஃ}}{}|' +
          '{{ஜ்}}{{ஹ்}}{{க்ஷ்}}{{ஆ}}GH{{ஈ}}KL:"' +
          'ZXC{{ஓ}}BNM{{,}}{{.}}?'
    },
    'l,cl': {
      '': '`{{௧}}{{௨}}{{௩}}{{௪}}{{௫}}{{௬}}{{௭}}{{௮}}{{௯}}{{௦}}-=' +
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
    'அஅ': 'ஆ',
    'இஇ': 'ஈ',
    'உஉ': 'ஊ',
    'எஎ': 'ஏ',
    'ஒஒ': 'ஓ',
  },
//  'historyPruneRegex': '[ptkcmnsywlrš]?w?[ioaIOA]?'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(TA_PHONEMIC_B_LAYOUT);
let ta_phonemic_b = TA_PHONEMIC_B_LAYOUT;