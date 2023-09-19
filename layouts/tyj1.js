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


var TYJ1_LAYOUT = {
  'id': 'tyj1',
  'title': 'Tai Yo 1',
  'mappings': {
    '': {
      '': '`{{\ud839\udee7}}{{\ud839\udeEE}}{{\ud839\udeED}}{{\ud839\udeEB}}{{\ud839\udeEA}}{{\ud839\udeE4}}{{\ud839\udeE8}}{{\ud839\udeE9}}{{\ud839\udec6}}{{\ud839\udeec}}-=' +
          '{{\ud839\udecc}}{{\ud839\udecd}}{{\ud839\udecb}}{{\ud839\udee5}}{{\ud839\udee1}}{{\ud839\udee0}}{{\ud839\udec9}}{{\ud839\uded7}}{{\ud839\uded1}}{{\ud839\uded2}}[]\\' +
          '{{\ud839\udec2}}{{\ud839\udec7}}{{\ud839\udec0}}{{\ud839\udec1}}{{\ud839\udee3}}{{\ud839\udee6}}{{\ud839\udeda}}{{\ud839\udedb}}{{\ud839\uded3}}{{\ud839\uded8}};' +
          '{{\ud839\udedc}}{{\ud839\uded9}}{{\ud839\uded0}}{{\ud839\udefc}}{{\ud839\udefd}}{{\ud839\udecf}}{{\ud839\uded6}}{{\ud839\udec5}}{{\u3002}}{{\u3001}}'
    },
    's': {
      '': '`1234567890-=' +
          '{{\ud839\udece}}{{\ud839\udef6}}{{\ud839\udef3}}{{\ud839\udef5}}{{\ud839\udef9}}{{\ud839\udef8}}{{\ud839\udeca}}{{\ud839\udefa}}{{\ud839\uded4}}{{\ud839\uded5}}{}|' +
          '{{\ud839\udec3}}{{\ud839\udec8}}{{\ud839\udedd}}{{\ud839\udede}}{{\ud839\udee2}}{{\ud839\udedf}}{{\ud839\udef2}}{{\ud839\udec4}}{{\ud839\udef7}}{{\ud839\udefe}}"' +
          '{{\ud839\udefb}}{{\ud839\udeff}}{{\ud839\udef4}}{{\ud839\udf09}}{{\ud839\udf0a}}{{\ud839\udef0}}{{\ud839\udeef}}{{\ud839\udef1}}<>'
    },
    'c,l,cl': {
      '': '~!@#$%^&*()_+' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(TYJ1_LAYOUT);
tyj1 = TYJ1_LAYOUT;
