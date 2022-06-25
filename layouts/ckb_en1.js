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


var CKB_EN1_LAYOUT = {
  'id': 'ckb_en1',
  'title': 'کوردی - شێوازی ئینگلیزی',
  'direction': 'rtl',
  'mappings': {
    '': {
      '': '\u2013١٢٣٤٥٦٧٨٩٠-=' +
          '\u0642\u0648\u06D5\u0631\u062A\u06CC{{S||ئـ||\u0626}}\u06CE\u06C6\u067E{{S||«||»}}{{S||»||«}}\\' +
          '\u0627\u0633\u062F\u0641\u06AF{{S||\u06BE||\u0647}}\u0698\u06A9\u0644\u003A\u0022' +
            '\u0632\u062E\u062C\u06A4\u0628\u0646\u0645\u060C\u002E\u061F '
    },
    's,sc': {
      '': '~!@#$٪^&*{{S||\u0028||\u0029}}{{S||\u0029||\u0028}}_+' +
          '{{}}{{}}{{}}\u0695{{}}{{}}{{}}{{}}{{}}{{}}{{S||[||]}}{{S||]||[}}|' +
          '\u0639\u0634{{}}{{}}\u063a\u062d\u0640{{}}\u06B5\u061b\'' +
           '{{}}{{}}\u0686{{}}{{}}{{}}{{}}{{S||<||>}}{{S||>||<}}/'
    },
    'c': {
      '': '%1234567890÷×' +
          '{{}}\u06CA{{}}{{}}{{}}{{}}\u0621{{}}•{{}}{{S||\u200c{||}\u200c}}{{S||\u200c}||{\u200c}}{{}}' +
          '{{}}\u0635{{}}{{}}{{}}\u06be{{S||zwj||\u200d}}\u0643{{}}{{}}{{}}' +
          '{{}}{{}}©{{}}{{}}{{S||zwnj||\u200c}}{{}}.\u06D4?'
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
google.elements.keyboard.loadme(CKB_EN1_LAYOUT);
ckb_en1 = CKB_EN1_LAYOUT;