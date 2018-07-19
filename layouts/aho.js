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

var AHO_LAYOUT = {
  'id': 'aho',
  'title': "Ahom",
  'mappings': {
    '': {
      '': '`{{\ud805\udf31}}{{\ud805\udf34}}{{\ud805\udf33}}{{\ud805\udf34}}' +
            '{{\ud805\udf35}}{{\ud805\udf36}}{{\ud805\udf37}}{{\ud805\udf38}}' +
            '{{\ud805\udf39}}{{\ud805\udf30}}-=' +
          '{{\ud805\udf2b}}{{}}{{\u200c\ud805\udf26}}{{\ud805\udf0d}}' +
            '{{\ud805\udf04}}{{\ud805\udf0a}}{{\ud805\udf24}}{{\ud805\udf22}}' +
            '{{\ud805\udf28}}{{\ud805\udf06}}{{\ud805\udf02}}{{\ud805\udf27}}\\' +
          '{{\ud805\udf21}}{{\ud805\udf0f}}{{\ud805\udf13}}{{\ud805\udf07}}' +
            '{{\ud805\udf16}}{{\ud805\udf11}}{{\ud805\udf29}}{{\ud805\udf00}}' +
            '{{\ud805\udf0e}}{{\ud805\udf20}}\'' +
          '{{}}{{\ud805\udf01}}{{\ud805\udf0b}}{{\ud805\udf0c}}' +
            '{{\ud805\udf08}}{{\ud805\udf03}}{{\ud805\udf09}}{{\ud805\udf3c}}' +
            '{{\ud805\udf3d}}/'
    },
    's, sc': {
      '': '~!{{\ud805\udf3e}}#$%^&*()_+' +
          '{{}}\u00A3\u20AC{{\ud805\udf1d}}' +
            '{{\ud805\udf1f}}{{}}{{\ud805\udf25}}{{\ud805\udf23}}{{}}{{}}{}|' +
          '{{\ud805\udf12}}{{\ud805\udf1e}}{{\ud805\udf14}}{{\ud805\udf15}}' +
            '{{\ud805\udf17}}{{\ud805\udf3f}}{{\ud805\udf19}}{{\ud805\udf15}}' +
            '{{}}:"' +
          '{{}}{{}}{{}}{{}}{{\ud805\udf18}}{{\ud805\udf10}}{{\ud805\udf2a}}<>?' + '\u200b'
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
    // Reorder vowel E and medial Ra after other letters. Use \u200c as marker.
    '\u200c(\ud805[\udf26\udf1e])(\ud805[\udf00-\udf19])': '$2$1',

    // Move e-vowel to right ot other medials.
    '(\ud805\udf26)(\ud805[\udf1d-\udf1f])': '$2$1',

    // Reorder medials
    '\ud805\udf1d(\ud805[\udf1e\udf1f]+)': '$1\ud805\udf1d',
    '\ud805\udf1f\ud805\udf1e': '\ud805\udf1e\ud805\udf1f',

    // Reorder sign killer before other signs.
    '(\ud805[\udf20-\udf2a])(\ud805\udf2b)': '$2$1',

    // Reorder U/O + I signs.
    '(\ud805[\udf24\udf28])(\ud805\udf22)': '$2$1',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(AHO_LAYOUT);
