// TODO: Fill in the Hochunk mappings
var WIN_LATN_LAYOUT = {
  'id': 'win_latn',
  'title': 'Hoocąk',
  'mappings': {
    '': {
      '': '`\u00e1\u0105{{\u0105\u0301}}\u00e9\u0119' +
      '{{\u0119\u0301}}\u00ed\u012f{{\u012F\u0301}}\u00f3{{\u01eb}}' +
      '{{\u01eb\u0301}}' +
      'qwertyuiop\u0142\u0144\\' +
      'asdfghjkl;ʼ' +
          'zxcvbnm,./'
    },
    's': {
      '': '~\u00c1\u0104{{\u0104\u0301}}\u00c9\u0118{{\u0118\u0301}}' +
          '\u00Cd\u012e{{\u012e\u0301}}\u00d3\u01ea{{\u01ea\u0301}}' +
          'QWERTYUIOP\u0141\u0143|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
    'c,l,cl' : {  // Lock
      '' : '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,sl,scl' : {  // Shift lock
      '' : '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(WIN_LATN_LAYOUT);
