// Copyright 2018 Google Inc.
// All Rights Reserved.

// Prototype for Bassa, 18-Dec-2018
var BSQ2_LAYOUT = {
  'id': 'bsq2',
  'title': '𖫔𖫧𖫳𖫒𖫨𖫰𖫨𖫱-𖫛𖫪𖫱𖫞𖫪𖫱 2 (Ɓǎsɔ́ɔ̀-wùɖù 2)',
  'mappings': {
    ',c': {
      '':  '`1234567890-=' +
          '{{\uD81A\udee6}}{{\uD81A\uded6}}{{\uD81A\udeeb}}{{\uD81A\udee8}}' +
	        '{{\uD81A\udee1}}{{\uD81A\uded5}}{{\uD81A\udeea}}{{\uD81A\udeed}}' +
	        '{{\uD81A\udee9}}{{\uD81A\udee5}}{{\uD81A\udeec}}{{\uD81A\udee0}}\\' +
          '{{\uD81A\udee7}}{{\ud81a\uded2}}{{\uD81A\uded7}}{{\uD81A\uded3}}' +
	        '{{\uD81A\udedd}}{{\uD81A\udee0}}{{\uD81A\uded9}}{{\uD81A\uded8}}' +
	        '{{\uD81A\udede}};\'' +
          '{{\uD81A\udedc}}{{\uD81A\udeda}}{{\uD81A\udedf}}{{\uD81A\udee3}}' +
	        '{{\uD81A\udee2}}{{\uD81A\uded0}}{{\uD81A\uded4}},' +
            './'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}' +
          '{{}}{{}}{{}}{{}}{{\uD81A\uded6}}{{\uD81A\udee4}}{{\ud81a\udef0}}{{\uD81A\uded1}}{{}}:\"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}<>?'
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
google.elements.keyboard.loadme(BSQ2_LAYOUT);
