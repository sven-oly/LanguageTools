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

// Laz in Latin script
// Source: https://keyman.com/keyboards/lazuri

var LZZ_LATN_LAYOUT = {
  'id': 'lzz_Latn',
  'title': 'lazuri nena',
  'mappings': {
    ',c': {
      '': '\"1234567890*-' +
          'q{{ʒ}}er{{t}}yuıo{{p}}{{ğ}}{{ü}},' +
          'asdfghj{{k}}l{{ş}}i' +
          '{{z}}xcvbnm{{ö}}{{ç}},'
    },
    's,sc': {
      '': '{{S||\u02d8||\u0306}}!\'^+%&/()=?_' +
          'Q{{Ʒ}}ERTYUIOP{{Ğ}}{{Ü}};' +
          'ASDFGHJKLŞİ' +
          '{{Z}}XCVBNM{{Ö}}{{Ç}}:'
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
    // Doubled letters adds
    'ʒ(ʒ)': '$1\u0306',
    'k(k)': '$1\u0306',
    'p(p)': '$1\u0306',
    't(t)': '$1\u0306',
    'z(z)': '$1\u0306',
    'ç(ç)': '$1\u0306',
    'Ʒ(Ʒ)': '$1\u0306',
    'K(K)': '$1\u0306',
    'P(P)': '$1\u0306',
    'T(T)': '$1\u0306',
    'Z(Z)': '$1\u0306',
    'Ç(Ç)': '$1\u0306',
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(LZZ_LATN_LAYOUT);
lzz_Latn = LZZ_LATN_LAYOUT;
