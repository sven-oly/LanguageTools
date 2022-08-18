// ASCII encoding input for "the new Chu Quoc Ngu"
// Hai Minh Dao is the inventor of the script.
// This uses a font originally created by Craig Cornelius
// 13-Aug-2022

var VN_DTQN_LAYOUT = {
  'id': 'vn_dtqn',
  'title': 'The new Chu Quoc Ngu',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl\'' +
          'zxcvbnm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QW{{E}}RTY{{U}}I{{O}}{{P}}{}|' +
          '{{A}}S{{D}}FGHJKL:"' +
          'ZXCV{{B}}NM<>?'
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
google.elements.keyboard.loadme(VN_DTQN_LAYOUT);
vn_dtqn = VN_DTQN_LAYOUT;