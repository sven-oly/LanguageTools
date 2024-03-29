//javascript/keyboard/api/layouts/cpp.js
// Copyright 2017 Google Inc.
// All Rights Reserved.

// Prototype for Mende Kikakui, 6-Nov-2018
var MEN_LAYOUT = {
  'id': 'men',
  'dir': 'rtl',
  'title': 'Mende Kikakui',
  'mappings': {
    ',c': {
      '':  '`{{\uD83A\uDCC8}}{{\uD83A\uDCC9}}{{\uD83A\uDCCa}}{{\uD83A\uDCCb}}{{\uD83A\uDCCc}}{{\uD83A\uDCCd}}{{\uD83A\uDCCe}}{{\uD83A\uDCCf}}0-=' +
          '{{\uD81A\uded8}}{{\uD81A\udedb}}{{\uD81A\udee6}}{{\uD81A\udeed}}' +
	        '{{\uD81A\udee1}}{{\uD81A\uded5}}{{\uD81A\udeea}}{{\uD81A\udeed}}' +
	        '{{\uD81A\udee9}}{{\uD81A\udee5}}{{\uD81A\udeec}}{{\uD81A\udee0}}\\' +
          '{{\uD81A\udee7}}{{\ud81a\uded2}}{{\uD81A\udedd}}{{\uD81A\uded3}}' +
	        '{{\uD81A\uded6}}{{\uD81A\udee4}}{{\uD81A\uded9}}{{\uD81A\uded1}}' +
	        '{{\uD81A\udede}}{{\uD81A\uded7}}{{\uD81A\udee8}}' +
          '{{\uD81A\udedc}}{{\uD81A\udee6}}{{\uD81A\udedf}}{{\uD81A\udee3}}' +
	        '{{\uD81A\udee2}}{{\uD81A\uded0}}{{\uD81A\uded4}},' +
            '{{\uD81A\udef5}}/'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{\ud81a\udef2}}{{\ud81a\udef3}}{{\ud81a\udef4}}{{\ud81a\udef0}}{{\ud81a\udef1}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
    },
    'l': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
  },
}

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_LAYOUT);
men = MEN_LAYOUT;