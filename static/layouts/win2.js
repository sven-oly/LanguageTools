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


var WIN2_LAYOUT = {
  'id': 'win2',
  'title': 'Hoocąk 2',
  'mappings': {
    ',': {
      '': '{{S||\u02db||\u0328}}1234567890{{S||\u02c7||\u030c}}=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'c': {
      '': '{{S||\u02db||\u0328}}1234567890{{S||\u02c7||\u030c}}=' +
          'qw{{ę}}rty{{ų}}{{į}}op[]\\' +
          '{{ą}}{{š}}df{{ǧ}}hjkl;\'' +
          '{{ž}}xcvbnm,./'
    },
    's': {
      '': '{{S||\u00af||\u0304}}!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'sc': {
      '': '{{S||\u00af||\u0304}}!@#$%^&*()_+' +
          'QW{{Ę}}RTY{{Ų}}{{Į}}OP{}|' +
          '{{Ą}}{{Š}}DF{{Ǧ}}HJKL:"' +
          '{{Ž}}XCVBNM<>?'
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
    'a\u0328': '\u0105',  // a with ogonek
    'e\u0328': '\u0119',  // e with ogonek
    'i\u0328': '\u012f',  // i with ogonek
    'u\u0328': '\u0173',  // e with ogonek
    'A\u0328': '\u0104',  // A with ogonek
    'E\u0328': '\u0118',  // E with ogonek
    'I\u0328': '\u012e',  // I with ogonek
    'U\u0328': '\u0172',  // U with ogonek
    'a\u0304': '\u0101',  // a with macron
    'e\u0304': '\u0113',  // e with macron
    'i\u0304': '\u012b',  // i with macron
    'o\u0304': '\u014d',  // i with macron
    'u\u0304': '\u016b',  // e with macron
    'A\u0304': '\u0100',  // A with macron
    'E\u0304': '\u0112',  // E with macron
    'I\u0304': '\u012a',  // I with macron
    'O\u0304': '\u014c',  // I with macron
    'U\u0304': '\u016a',  // U with macron    'g\u030c': '\u01e7',  // g with caron
    'g\u030c': '\u01e7',  // G with caron
    'G\u030c': '\u01e6',  // G with caron
    's\u030c': '\u0161',  // s with caron
    'S\u030c': '\u0160',  // S with caron
    'z\u030c': '\u017e',  // Z with caron
    'Z\u030c': '\u017d',  // Z with caron
    '\u030c\u030c': '-',  // two carons to minus sign
    '\u0328\u0328': '`',  // two ogoneks to grave accent
    '\u0304\u0304': '~',  // two macrons to a tilde
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(WIN2_LAYOUT);
win2 = WIN2_LAYOUT;