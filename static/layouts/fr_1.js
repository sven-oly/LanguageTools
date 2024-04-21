
// Keyboard from CLDR data
//

var FR_T_K0_WINDOWS = {
  "id": "fr",
  "dir": "rtl",
  "title": "Fr",
  "mappings": {
    "": {
      "": "&é\u{22}'(-è_çà)=" +
            "azertyuiop^$" +
            "qsdfghjklm" +
            "wxcvbn,;:"
    },
    "s": {
      "": "1234567890°+" +
            "AZERTYUIOP¨£" +
            "QSDFGHJKLM" +
            "WXCVBN?./"
    },
    "l": {
      "": "1234567890°+" +
            "AZERTYUIOP¨£" +
            "QSDFGHJKLM" +
            "WXCVBN?./"
    },
    "sl": {
      "": "&é\u{22}'(-è_çà)=" +
            "azertyuiop^$" +
            "qsdfghjklm" +
            "wxcvbn,;:"
    },
    "cl": {
      "": " ~#{[|`\^@]}" +
            "  €        ¤" +
            "          " +
            "         "
    },
    "c,cl": {
      "": "            " +
            "          \u{1B}\u{1D}" +
            "          " +
            "         "
    },
  },
}

google.elements.keyboard.loadme(FR_T_K0_WINDOWS);
var extern = FR_T_K0_WINDOWS;
