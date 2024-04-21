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


var CKB_ARB1_LAYOUT = {
  'id': 'ckb_ar1',
  'title': 'کوردی - شێوازی عەرەبی',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '\u2013١٢٣٤٥٦٧٨٩٠-=' +
      '\u0686\u06A4\u067E\u0642\u0641\u063A\u0639{{S||\u06BE||\u0647}}\u062E\u062D\u062C\u062F\u005C' +
         '\u0634\u0633\u06CC\u0628\u0644\u0627\u062A\u0646\u0645\u06A9\u06AF' +
         '{{S||ئـ||\u0626}}\u0695\u06C6\u0631\u06B5\u06CE\u06D5\u0648\u0632\u0698'
    },
    's,sc': {
      '': '~!@#$%^&*{{S||\u0028||\u0029}}{{S||\u0029||\u0028}}_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}÷×\u061b{{S||«||»}}{{S||»||«}}|' +
          '{{}}{{}}{{S||[||]}}{{S||]||[}}{{}}{{}}\u0640{{}}/:\"' +
           '{{}}{{}}{{}}{{S||\u200c{||}\u200c}}{{S||\u200c}||{\u200c}}{{}}{{}}\u060C.\u061f'
    },
    'c': {
      '': '%1234567890•≈' +
          '{{}}\u0635{{}}{{}}{{}}{{}}{{}}\u06BE{{}}{{}}{{S||<||>}}{{S||>||<}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{S||zwj||\u200d}}{{}}{{}}\u0643\'' +
          '{{}}\u0621©{{}}{{}}{{S||zwnj||\u200c}}{{}}\u066C\u06CA\u06D4{{}}'
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
    '}\u200c': '}',  // Fix closing brace
    '{\u200c': '{',  // Fix opening brace
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CKB_ARB1_LAYOUT);
ckb_ar1 = CKB_ARB1_LAYOUT;