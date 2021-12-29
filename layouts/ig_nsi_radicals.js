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

// keys [ ] \ | add diacritics to some vowels, m, and n.
var IG_NSI_RADICAL_LAYOUT = {
  'id': 'ig_nsi_radicals',
  'title': 'Igbo radicals for Nsibidi',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{\u8449}}{{\u9060}}{{\u4eba}}{{\u7A3C}}{{\u58f1}}{{\u51f6}}{{\u6728}}{{\u5263}}{{\u4e0a}}{{\u6c34}}[]\\' +
          '{{\u4e00}}{{\u76ca}}{{\u68d2}}{{\u63a5}}{{\u5883}}{{\u5203}}{{\u5292}}{{\u86c7}}{{\u6a5f}};\'' +
          '{{\u3c28}}{{\u571f}}{{\u7901}}{{\u65e5}}{{\u3c24}}{{\u65fa}}{{\u754f}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
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
    // Combinations
    '\u4EBA\u4EBA': '\u5B50',
    '\u6728\u6728': '\u6797',
    '\u9577\u9577': '\u67CF',
    '\u6728\u5F31': '\u672C',
    '\u4EBA\u9577': '\u738B',
    // Many more...
    '人1': '女',
    '人2': '男',  // e2
    '人長刃': '宫',
    // From explanation.pdf
    '㰤㰤': '虎',
    '人人': '子',
    '木木': '林',
    '長木': '柏',
    '木': '本',
    '人長': '王',
    '人長刃': '宫',
    '女人': '自',
    '女水': '乳',
    '人刃': '家',
    '四一': '題',
    '剣剣': '斬',
    '剣凶': '若',
    '棒一': '弱',
    '劒一': '所',
    '一一㰣': '救',
    '一一': '二',
    '㰣㰣㰣': '三',
  },
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(IG_NSI_RADICAL_LAYOUT);
ig_nsi_radicals = IG_NSI_RADICAL_LAYOUT;