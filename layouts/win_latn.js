// TODO: Fill in the Hochunk mappings
var WIN_LATN_LAYOUT = {
  'id': 'win_latn',
  'title': 'Hoocąk',
  'mappings': {
    '': {
      '': '\u20181234567890-=' +
      'qwertyuiop[]\\' +
      'asdfghjkl\u0306\u2019' +
          'zxcvbnm,.\u02b9'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP\u201c\u201d|' +
          'ASDFGHJKL\u030c\u2019' +
          'ZXCVBNM;:?'
    },
    'c' : {  // Control
      '' : '\u0300123\u023c5678\u00ab\u00bb\u0304=' +
          'qw\u0259r\u03b8yuiop[]\\' +
          'as\u00f0\u0111\u0263\u02b0jkl\u030c\u0301' +
          'z\u03c7\u00e7vb\u019e\u014b \u0307\u0328'
    },
    'sc' : {  // Shift lock
      '' : '\u0303!@#\u023b%^&*()_+' +
          'QW\u018fR\u0398YUIOP{}|' +
          'AS\u00d0\u0110\u0194HJKL:\u0308' +
          'Z\u03a7\u00c7VB\u207f\u014a \u0323\u0294'
    },
    'l,cl' : {  // Shift lock
      '' : '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl,scl' : {  // Shift lock
      '' : '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(WIN_LATN_LAYOUT);
