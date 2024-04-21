// name = {}
// name in title = Naijíriá Píjin
// name in title = Nigerian Pidgin
// Keyboard from CLDR data
//
var PCM_T_K0_WINDOWS = {
  "id": "pcm_t_k0_windows",
  "locale" : "pcm-t-k0-windows",
  "dir": "dir",
  "title": "Naijíriá Píjin CLDR",
  "mappings": {
    "": {
      "": "̀1234567890-=" +
          "́wertyuiop[]/" +
          "asdfghjklọẹ" +
          "zcvbnm,.;'"
    },
    "s": {
      "": "̀!@#$₦%&*()_+" +
          "́WERTYUIOP{}?" +
          "ASDFGHJKLỌẸ" +
          "ZCVBNM<>:\""
    },
    "sl": {
      "": "`1234567890-=" +
          "qwertyuiop[]\\" +
          "asdfghjkl;'" +
          "zxcvbnm,./"
    },
    "l": {
      "": "~!@#$%^&*()_+" +
          "QWERTYUIOP{}|" +
          "ASDFGHJKL:\"" +
          "ZXCVBNM<>?"
    },
    "sc,scl": {  // control shift and control-shift caps lock
      "": "~!@#$%^&*()_+" +
          "QWERTYUIOP{}|" +
          "ASDFGHJKL:\"" +
          "ZXCVBNM<>?"
    },
    "c,cl": {
      "": "`1234567890-=" +
          "qwertyuiop[]\\" +
          "asdfghjkl;'" +
          "zxcvbnm,./"
    },
  },
  "transform" : {
      "à": "à",
      "È": "È",
      "ó": "ó",
      "Ò": "Ò",
      "ọ": "ọ",
      "Ạ": "Ạ",
      "ạ": "ạ",
      "́́": "̀",
      "á": "á",
      "À": "À",
      "Ẹ": "Ẹ",
      "Ọ": "Ọ",
      "''": "̣",
      "Á": "Á",
      "ẹ": "ẹ",
      "Ó": "Ó",
      "é": "é",
      "è": "è",
      "É": "É",
      "ò": "ò",
  },
};

google.elements.keyboard.loadme(PCM_T_K0_WINDOWS);
var extern = PCM_T_K0_WINDOWS;
