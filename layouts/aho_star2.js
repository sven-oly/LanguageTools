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

var AHO_STAR2_LAYOUT = {
  'id': 'aho_star2',
  'title': "Ahom Star2: e/R/L before consonants",
  'mappings': {
      '': {
          '':
         '{{\ud805\udf3E}}{{\ud805\udf31}}{{\ud805\udf32}}{{\ud805\udf33}}{{\ud805\udf34}}{{\ud805\udf35}}{{\ud805\udf36}}{{\ud805\udf37}}{{\ud805\udf38}}{{\ud805\udf39}}{{\ud805\udf30}}\u002D\u003D{{\ud805\udf2B}}{{\ud805\udf1A}}{{\u200c\ud805\udf26}}{{\ud805\udf0D}}{{\ud805\udf04}}{{\ud805\udf0A}}{{\ud805\udf24}}{{\ud805\udf22}}{{\ud805\udf28}}{{\ud805\udf06}}\u005B\u005D\u005C{{\ud805\udf21}}{{\ud805\udf0F}}{{\ud805\udf13}}{{\ud805\udf02}}{{\ud805\udf15}}{{\ud805\udf11}}{{\ud805\udf16}}{{\ud805\udf00}}{{\ud805\udf0E}}\u003B\u0027{{\ud805\udf3C}}{{\ud805\udf05}}{{\ud805\udf0B}}{{\ud805\udf1A}}{{\ud805\udf08}}{{\ud805\udf03}}{{\ud805\udf09}}\u002C\u002E\u002F'
      },
      's': {
          '':
          '\u007E\u0021\u0040{{\ud805\udf41}}{{\ud805\udf42}}\u0025{{\ud805\udf45}}\u0026\u002A\u0028\u0029\u005F\u002B{{\ud805\udf29}}{{\ud805\udf3B}}{{\ud805\udf1F}}{{\ud805\udf1E}}{{\ud805\udf0C}}{{}}{{\ud805\udf25}}{{\ud805\udf23}}{{\ud805\udf27}}{{\ud805\udf07}}\u007B\u007D\{{\ud805\udf26\ud805\udf21}}{{\ud805\udf12}}{{\ud805\udf46}}{{\ud805\udf14}}{{}}{{\ud805\udf17}}{{\ud805\udf20}}{{\ud805\udf19}}{{\ud805\udf01}}{{\u200c\ud805\udf1D}}\u003A\u0022{{\ud805\udf3D}}{{\ud805\udf3A}}{{\ud805\udf40}}{{\ud805\udf3F}}{{\ud805\udf18}}{{\ud805\udf10}}{{\ud803\udf3a}}{{\ud805\udf43}}{{\ud805\udf44}}\u003F'
      },
    'c,l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
      'sc,sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
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
google.elements.keyboard.loadme(AHO_STAR2_LAYOUT);
aho_star2 = AHO_STAR2_LAYOUT;
