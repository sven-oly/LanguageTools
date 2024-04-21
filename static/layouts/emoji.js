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


var EMOJI_LAYOUT = {
  'id': 'emoji',
  'title': 'Emojis',
  'mappings': {
    ',c': {
      '': '`12345{{\uD83C\uDFFF}}{{\uD83C\uDFFE}}{{\uD83C\uDFFD}}{{\uD83C\uDFFC}}{{\uD83C\uDFFB}}-=' +
          '{{\uD83D\uDC08}}{{\uD83D\uDC15}}{{\uD83D\uDC01}}{{\uD83D\uDC3F}}' +
	  'tyuiop{}|' +
          '{{\uD83D\uDC77}}{{\uD83D\uDC6E}}dfghjkl:{{\uD83D\uDE00}}' +
          '{{\uD83D\uDC76}}{{\uD83D\uDC67}}' +
	  '{{\uD83E\uDDD2}}{{\uD83D\uDC66}}' +
	  '{{\uD83D\uDC69}}{{\uD83E\uDDD1}}{{\uD83D\uDC68}}' +
	  '{{\u200d}}\u2642\u2640'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    },
    'l,cl': {
      '': '`1234567890-=' +
          '{{\uD83C\uDDf6}}{{\uD83C\uDDfc}}{{\uD83C\uDDEa}}{{\uD83C\uDDf7}}{{\uD83C\uDDf9}}{{\uD83C\uDDfe}}{{\uD83C\uDDfa}}{{\uD83C\uDDEe}}{{\uD83C\uDDf4}}{{\uD83C\uDDf5}}{}|' +
          '{{\uD83C\uDDE6}}{{\uD83C\uDDf8}}{{\uD83C\uDDE9}}{{\uD83C\uDDEb}}{{\uD83C\uDDEc}}{{\uD83C\uDDEd}}{{\uD83C\uDDEf}}{{\uD83C\uDDf0}}{{\uD83C\uDDf1}}:"' +
          '{{\uD83C\uDDff}}{{\uD83C\uDDfd}}{{\uD83C\uDDE8}}{{\uD83C\uDDfb}}{{\uD83C\uDDE7}}{{\uD83C\uDDf3}}{{\uD83C\uDDf2}}<>?'
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
google.elements.keyboard.loadme(EMOJI_LAYOUT);
emoji = EMOJI_LAYOUT;