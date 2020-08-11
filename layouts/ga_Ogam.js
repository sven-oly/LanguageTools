
// Keyboard from CLDR data
//

var GA_OGAM_T_K0_WINDOWS_LAYOUT = {
  "id": "ga_Ogam",
  "dir": "rtl",
  "title": "Irish Ogam",
  "mappings": {
    ",c": {
      "": "            " +
            "ᚊᚕᚓᚏᚈᚘᚒᚔᚑᚚ  " +
            "ᚐᚄᚇᚃᚌᚆᚗᚖᚂ " +
            "ᚎᚙᚉᚍᚁᚅᚋ  "
    },
    "s,sl": {
      "": "            " +
            "            " +
            "          " +
            "         "
    },
    'cl': {
      '': '`1234567890-=' +
          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sc,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  }
}

google.elements.keyboard.loadme(GA_OGAM_T_K0_WINDOWS_LAYOUT);
var extern = GA_OGAM_T_K0_WINDOWS_LAYOUT;
