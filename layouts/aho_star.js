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

var AHO_STAR_LAYOUT = {
  'id': 'aho_star',
  'title': "Ahom Star",
  'mappings': {
      '': {
          '':
          '𑜾𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹𑜰-=
𑜫𑜚‌𑜦𑜍𑜄𑜊𑜤𑜢𑜨𑜆[]\
𑜡𑜏𑜓𑜂𑜕𑜑𑜖𑜀𑜎;\’
𑜼𑜅𑜋𑜚𑜈𑜃𑜉,./'
      },
      's,sc': {
          '𑜾𑜱𑜲𑜳𑜴𑜵𑜶𑜷𑜸𑜹𑜰-=
𑜫𑜚‌𑜦𑜍𑜄𑜊𑜤𑜢𑜨𑜆[]\
𑜡𑜏𑜓𑜂𑜕𑜑𑜖𑜀𑜎;\’
𑜼𑜅𑜋𑜚𑜈𑜃𑜉,./'
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
  'transform' : {
    // Move e-vowel + medial after consonant.
    '\u200c(\ud805\udf26)(\ud805[\udf1d-\udf1f])\u001d?(\ud805[\udf00-\udf19])': '$3$2$1',

    '(\ud805[\udf1d-\udf1f])(\ud805\udf26)\u001d?(\ud805[\udf00-\udf19])': '$3$1$2',

    // Reorder vowel E and medial Ra after other letters. Use \u200c as marker.
    '\u200c(\ud805[\udf26\udf1d\udf1e])(\ud805[\udf00-\udf19])': '$2$1',
    // Reorder vowel E after other letters. Use \u200c as marker.
    '\u200c(\ud805[\udf26\udf1d])(\ud805[\udf00-\udf19])': '$2$1',

    // Move e-vowel to right of other medials.
    '\u200c(\ud805[\udf26\udf1d])\u001d?(\ud805[\udf1d-\udf1f])': '$2$1',

    // Reorder medials
    '\ud805\udf1d(\ud805[\udf1e\udf1f]+)': '$1\ud805\udf1d',
    '\ud805\udf1f\ud805\udf1e': '\ud805\udf1e\ud805\udf1f',

    //
    '(\ud805\udf28)(\ud805\udf27)': '$2$1',

    // Reorder sign killer before other signs.
    '(\ud805[\udf20-\udf2a])(\ud805\udf2b)': '$2$1',

    // Reorder U/O + I signs, including AM.
    '(\ud805[\udf24\udf28])(\ud805[\udf22\udf29\udf2a])': '$2$1',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(AHO_STAR_LAYOUT);
aho = AHO_STAR_LAYOUT;
