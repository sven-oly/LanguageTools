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


var MNIMTEI_LEMIAREN_LAYOUT = {
  'id': 'mni_leimaren',
  'title': 'Meitei Leimaren',
  'mappings': {
    ',c': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰\uabf0=' +
          '\uabc9\uabc6\uabe6\uabd4\uabc7\uabcc\uabec\uabe4\uabe3\uabc4[]\\' +
          '\uabe5\uabc1\uabd7{{}}\uabd2\uabcd\uabd6\uabc0\uabc2\.\'' +
          '\u20b9\uabea\uabc6{{}}\uabd5\uabc5\uabc3,\uabec/'
    },
    's': {
      '': '~!@#$%^&*()\uabed+' +
          '\uabe1{{}}\uabe7\uabe0\uabca\uabe2\uabce\uabe2\uabe7\uabde{}|' +
          '\uabd1{{}}\uabd9\uabd0\uabd8{{}}\uabd3\uabc8\uabdc:"' +
          '\uaaf2{{}}\uabdb{{}}\uabda\uabdf\uabdd;\uabeb\uaaf1'
    },
    'sc': {
      '': '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{S||zwnj||\u200c}}{{S||zwj||\u200d}}' +
          '\uaaee\uaaef\uaae0\uaaed\uaae4\uaae5\uaaec\uaaee\uaae1{{}}{{}}{{}}{{}}' +
          '{{S||\u25CC\u031f||\uaafb}}\uaae9\uaae6\uaae7{{}}{{}}{{}}{{}}{{}}\uaaf0{{}}' +
          '\uaaf3\uaaf4\uaae2{{}}{{}}\uaae3\uaae8\uaaea\uaaf5{{}}'
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
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MNIMTEI_LEMIAREN_LAYOUT);
mni_leimaren = MNIMTEI_LEMIAREN_LAYOUT;