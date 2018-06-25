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

// TODO: decide if there should be capital letters with accents,
// capital turned V (and with accent), or others.
// Perhaps on cntr-alt level?

var ONE3_LAYOUT = {
  'id': 'one3',
  'title': 'Onʌyoteʔa·ká· V3',
  'mappings': {
    ',': {
      '': '\u03011234567890-=' +
          'qwertyuiop-\u0332/' +   // Combining low line ??
          'asdfghjkl;\'' +
          'zxcvbnmʌʔ.'
    },
    'c': {
      '': '`{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{}|' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}[]'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}\u0320' +
          'ASDFGHJKL:"' +
          'ZXCVBNM\u0245?,'
    },
    'l,cl': {
      '': '`1234567890-=' +
          '{{q\u0332}}{{w\u0332}}{{e\u0332}}{{r\u0332}}{{t\u0332}}{{y\u0332}}{{u\u0332}}{{i\u0332}}{{o\u0332}}e{}|' +
          '{{a\u0332}}{{s\u0332}}{{d\u0332}}{{f\u0332}}{{g\u0332}}{{h\u0332}}{{j\u0332}}{{k\u0332}}{{l\u0332}}:"' +
          '{{z\u0332}}{{x\u0332}}{{c\u0332}}{{v\u0332}}{{b\u0332}}{{n\u0332}}{{m\u0332}}<>?'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          '{{Q\u0332}}{{W\u0332}}{{E\u0332}}{{R\u0332}}{{T\u0332}}{{Y\u0332}}{{U\u0332}}{{I\u0332}}{{O\u0332}}{{P\u0332}}[]\\' +
          '{{A\u0332}}{{S\u0332}}{{D\u0332}}{{F\u0332}}{{G\u0332}}{{H\u0332}}{{J\u0332}}{{K\u0332}}{{L\u0332}};\'' +
          '{{Z\u0332}}{{X\u0332}}{{C\u0332}}{{V\u0332}}{{B\u0332}}{{N\u0332}}{{M\u0332}},./'
    }
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(ONE3_LAYOUT);
