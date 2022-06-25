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

// Variation of AZERTY with combining diacritics
var HKE1_LAYOUT = {
  'id': 'hke1',
  'title': 'Kihunde/AZERTY',
  'mappings': {
    '': {
      '': '<&{{S||\u00b4||\u0301}}\"\'(-{{}}!{{}}{{S||\u02d8||\u0306}})=' +
          'azertyuiop{{S||^||\u0302}}${{S||\u0060||\u0300}}' +
          'qsdfghjklm{{}}' +
          'wxcvbn,;:!'
    },
    's,sc': {
      '': '>1234567890°+' +
          'AZERTYUIOP{{S||\u00a8||\u0308}}*£' +
          'QSDFGHJKLM%' +
          'WXCVBN?./§'
    },
    'c': {
      '': '{{}}{{}}~#{[|`\\^@]}' +
          '{{}}{{}}€{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}¤'
    },
    'l,cl': {
      '': '<&é"\'(§è!çà)-' +
          'azertyuiop^$`' +
          'qsdfghjklmù' +
          'wxcvbn,;:='
    },
    'sl,scl': {
      '': '>1234567890°_' +
          'AZERTYUIOP{{S||\u00a8|\u0308}}¨£' +
          'QSDFGHJKLM%' +
          'WXCVBN?./+'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(HKE1_LAYOUT);
khe1 = HKE1_LAYOUT;