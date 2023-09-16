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

// Implements Ahom keyboard based on ...
// TODO: Add reference
// Uses variation selector to select dotted forms of Myanmar script characters
// U+fe00
// \ufe00\ufe00 for \ufe00

var PHK_VAR_LAYOUT = {
    'id': 'phkVar',
    'title': "Phake Variant",
    'mappings': {
        '': {  // U+200c marks an e-vowel that is not yet moved across a consonant
            '': '`\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049\u1040{{\u1014}}=' +
                '{{်}}{{ဝ\ufe00}}{{\u200c\u1031\ufe00}}{{\uAA7A\ufe00}}{{တ\ufe00}}{{ယ\ufe00}}{{ု}}' +
                '{{ိ}}{{ွ}}{{ပ\ufe00}}{{}}{{}}{{\u104a}}' +
                '{{ႃ}}{{\uaa6c\ufe00}}{{ဒ}}{{ၸ\ufe00}}{{င\ufe00}}{{\uaa6d}}{{\u109d}}' +
                '{{က\ufe00}}{{လ\ufe00}}\u1064\u1062' +
                '{{\uAA78}}{{ၵ\ufe00}}{{ꩡ\ufe00}}{{ထ\ufe00}}{{\u1017}}{{ꩫ\ufe00}}{{မ\ufe00}},.{{\u104b}}'
        },
        's, sc': {
            '': '~{{\uaa78}}{{\uaa79}}{{\u1036\u1036}}{{\u102e\u102e}}{{\u103a\u103a}}{{\u102c}}{{\u109d\u109d}}*(){{\u101b}}+' +
                '{{\ua9e5}}{{ွ်}}{{\u105e\u103a}}{{ြ}}{{\u1039\u1010\ufe00}}{{ျ}}' +
                '{{\u1030}}{{ီ}}{{\u1089}}{{\u1039\u1015\ufe00}}{{\u105C}}{{\u103A}}{{\u102f}}' +
                '{{ဢ\ufe00}}{{꩷}}{{ꩰ}}{{\u103a\u1036}}\u1087\u1088{{ို}}' +
                '{{\u1039\u1000\ufe00}}\u1038:"' +
                '{{ၞ}}{{ႜ}}{{\u108a}}{{\ua9f2}}{{ꩰ}}{{\u107a\ufe00}}{{ံ}}<>?' + '\u200b'
        },
        'c': {
            '': '`1234567890-=' +
                'qwertyuiop[]\\' +
                'asdfghjkl;\'' +
                'zxcvbnm,./' +
                '\u00a0'
        },    'l,cl': {
            '': '`1234567890-=' +
                'QWERTYUIOP[]\\' +
                'ASDFGHJKL;\'' +
                'ZXCVBNM,./'
        },
        'sl,scl': {
            '': '~!@#$%^&*()_+' +
                'qwertyuiop{}|' +
                'asdfghjkl:"' +
                'zxcvbnm<>?'
        }
    },

    'transform' : {
        // Remove duplicates
        '\u103c\u001d?\u103c' : '\u103c',
        '\u103b\u001d?\u103b' : '\u103b',
        '\u105e\u001d?\u105e' : '\u105e',
        
        // Reorder vowel E after consonant
        '\u200c(\u1031\ufe00)\u001d?([\u1000-\u102a\u103f\u104e\u1075\u1078\u107a\u109d\uaa61-\uaa7f\ua9f2]\ufe00?)': '$2$1',

        // Compact multiple vowels
        '(\u200c\u1031\ufe00)\u001d?\u200c(\u1031\ufe00)': '$1',

        '\ua9e5\u001d?([\u103b\u105e\u105f])': '$1\ua9e5',

        // Reorder e-vowel + medial ra/ya after consonant.
        '(\u1031\ufe00)\u001d?([\u103a-\u103e\u105e])': '$2$1',

        // 102f follows 109d
        '\u102f\u001d?([\u109d])': '$1\u102f',
        // 1036 follows 102f & 103a
        '\u1036\u001d?([\u102f\u103a\u103d\ua9e5])': '$1\u1036',

        // Doubled 'n' - test
        'ꩫ\ufe00ꩫ\ufe00': '\ua9e7\ufe00',
        // Move diacritics
        '([\u102d\u102e])\u001d?([\u103a\u103b\u103c\u103d\u105e])' : '$2$1',
        '([\u102f\u1030\u1036])\u001d?([\u103a\u103b\u103c\u103d\u105e\u109d\ua935])' : '$2$1',
        '([\u103b\u103c\u103d])\u001d?(\u105e)' : '$2$1'
    },
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(PHK_VAR_LAYOUT);
phkVar = PHK_VAR_LAYOUT;
