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


var QIANG_PUA_LAYOUT = {
    'id': 'qiang_pua',
    'title': 'Qiang Private Use Area ',
    'mappings': {
        ',c': {
            '': '{{\ue174}}1234567890-=' +
                '\uE155\uE145\uE16E\uE173\uE148\uE157\uE16D\uE16F\uE171\uE141\uE17E\uE17F|' +
                '\uE16A\uE162\uE147\uE15A\uE14E\uE152\uE154\uE14F\uE14C\uE169\'' +
                '\uE15F\uE158\uE160\uE15D\uE140\uE14A\uE143\uE179\uE178/'
        },
        's,sc': {
            '': '\uE175{{\uE17A}}@#$%^&*()_+' +
                '\uE177\uE166\uE16C\uE168\uE164\uE14D\uE167\uE170\uE15C\uE146\uE17C\uE17D|' +
                '\uE16B\uE163\uE149\uE144\uE150\uE153\uE156\uE15B\uE14B\uE169"' +
                '\uE161\uE159\uE165\uE15E\uE142\uE172\uE151<>\uE17B'
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
google.elements.keyboard.loadme(QIANG_PUA_LAYOUT);
qiang_pua = QIANG_PUA_LAYOUT;
