// Keyboard from CLDR data
//
var FR_CH_T_K0_WINDOWS = {
  "id": "fr",
  "locale" : "fr-CH-t-k0-windows",
  "dir": "rtl",
  "title": "Swiss French",
  "mappings": {
    "": {
      "": "§1234567890'^" +
          "qwertzuiopè¨$" +
          "asdfghjkléà" +
          "yxcvbnm,.-"
    },
    "s": {
      "": "°+\u{22}*ç%&/()=?`" +
          "QWERTZUIOPü!£" +
          "ASDFGHJKLöä" +
          "YXCVBNM;:_"
    },
    "l": {
      "": "§1234567890'^" +
          "QWERTZUIOPè¨$" +
          "ASDFGHJKLéà" +
          "YXCVBNM,.-"
    },
    "sl": {
      "": "°+\u{22}*ç%&/()=?`" +
          "qwertzuiopü!£" +
          "asdfghjklöä" +
          "yxcvbnm;:_"
    },
    "cl": {
      "": " ¦@#°§¬|¢  ´~" +
          "  €       []}" +
          "          {" +
          "          "
    },
    "c,cl": {
      "": "             " +
          "          \u{1B}\u{1D}\u{1C}" +
          "           " +
          "          "
    },
  },
  "transform" : {
      "` ": "`",
      "`a": "à",
      "`A": "À",
      "`e": "è",
      "`E": "È",
      "`i": "ì",
      "`I": "Ì",
      "`o": "ò",
      "`O": "Ò",
      "`u": "ù",
      "`U": "Ù",
      "´ ": "´",
      "´a": "á",
      "´A": "Á",
      "´e": "é",
      "´E": "É",
      "´i": "í",
      "´I": "Í",
      "´o": "ó",
      "´O": "Ó",
      "´u": "ú",
      "´U": "Ú",
      "´y": "ý",
      "´Y": "Ý",
      "\\^ ": "^",
      "\\^a": "â",
      "\\^A": "Â",
      "\\^e": "ê",
      "\\^E": "Ê",
      "\\^i": "î",
      "\\^I": "Î",
      "\\^o": "ô",
      "\\^O": "Ô",
      "\\^u": "û",
      "\\^U": "Û",
      "¨ ": "\u{22}",
      "¨a": "ä",
      "¨A": "Ä",
      "¨e": "ë",
      "¨E": "Ë",
      "¨i": "ï",
      "¨I": "Ï",
      "¨o": "ö",
      "¨O": "Ö",
      "¨u": "ü",
      "¨U": "Ü",
      "¨y": "ÿ",
      "~ ": "~",
      "~a": "ã",
      "~A": "Ã",
      "~n": "ñ",
      "~N": "Ñ",
      "~o": "õ",
      "~O": "Õ",
  },
};

google.elements.keyboard.loadme(FR_CH_T_K0_WINDOWS);
var extern = FR_CH_T_K0_WINDOWS;
