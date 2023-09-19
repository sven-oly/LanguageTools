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


var QIANG_UNICODE_LAYOUT = {
    'id': 'qiang_unicode',
    'title': 'Qiang Unicode',
    'mappings': {
        ',c': {
            '': '`1234567890-=' +
                '{{\ud818\udd55}}{{\ud818\udd45}}{{\ud818\udd6e}}{{\ud818\udd73}}{{\ud818\udd48}}{{\ud818\udd57}}{{\ud818\udd6d}}{{\ud818\udd6f}}{{\ud818\udd71}}{{\ud818\udd41}}{{\ud818\udd7e}}{{\ud818\udd7f}}\\' +
                '{{\ud818\udd6a}}{{\ud818\udd62}}{{\ud818\udd47}}{{\ud818\udd5a}}{{\ud818\udd4e}}{{\ud818\udd52}}{{\ud818\udd54}}{{\ud818\udd4f}}{{\ud818\udd4c}}{{\ud818\udd69}}\'' +
                '{{\ud818\udd5f}}{{\ud818\udd58}}{{\ud818\udd60}}{{\ud818\udd5d}}{{\ud818\udd40}}{{\ud818\udd4a}}{{\ud818\udd43}}{{\ud818\udd79}}{{\ud818\udd78}}/'
        },
        's,sc': {
            '': '~{{\ud818\udd7a}}@#$%^&*()_+' +
                '{{\ud818\udd77}}{{\ud818\udd66}}{{\ud818\udd6c}}{{\ud818\udd68}}{{\ud818\udd64}}{{\ud818\udd4d}}{{\ud818\udd67}}{{\ud818\udd70}}{{\ud818\udd69}}{{\ud818\udd46}}{{\ud818\udd7c}}{{\ud818\udd7d}}|' +
                '{{\ud818\udd6b}}{{\ud818\udd63}}{{\ud818\udd49}}{{\ud818\udd44}}{{\ud818\udd50}}{{\ud818\udd53}}{{\ud818\udd56}}{{\ud818\udd5b}}{{\ud818\udd4b}}:"' +
                '{{\ud818\udd61}}{{\ud818\udd59}}{{\ud818\udd65}}{{\ud818\udd5e}}{{\ud818\udd43}}{{\ud818\udd72}}{{\ud818\udd51}}<>{{\ud818\udd7b}}'
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
google.elements.keyboard.loadme(QIANG_UNICODE_LAYOUT);
qiang_unicode = QIANG_UNICODE_LAYOUT;
