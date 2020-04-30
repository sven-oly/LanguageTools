var CHR_LAYOUT = {
  'id': 'chr',
  'title': '\u13E3\u13B3\u13A9',
  'mappings': {
    '': {
      '': '`12\u13fd\uaba9\uabb6\uabac\uab9b\uaba6\uaba2\uab94\uab8f\u13fb' +
          '\uab7a\uab83\uab71\uabab\uaba4\uabbf\uab74\uab72\uab73' +
          '\uab91\uaba5\uab86\uabb9' +
          '\uab70\uab9d\uaba7\uab79\uab76\uab7f\uabaa\uab88\uab85\uabb8\'' +
          '\uab7c\u13fc\uaba3\uab75\uab88\uab8e\uab95,.\uab92'
    },
    's': {
      '': '\uab9a\uab81\uab97\uabb7\uab80\uab89\uabad\uabb1\uab8a()' +
          '\uab8c\uab8d' +
          '\uab96\uabbb\uabb3\uab9f\uaba8\u13fa\uab7d\u13f9\uabbc' +
          '\uabba\uaba1\uabb4\uabbe' +
          '\uab9c\uab9e\uaba0\uab98\uabb5\uab82\uab7b\uab77\uab7e\uabb0"' +
          '\uab93\uabbd\uabaf\uabae\u13f8\uab8b\uab87\uabb2\uab84\uab99'
    },
    'c': {
      '': '`12\u13f5\u13d9\u13e6\u13dc\u13cb\u13d6\u13d2\u13c4\u13bf\u13f3' +
          '\u13aa\u13b3\u13a1\u13db\u13d4\u13ef\u13a4\u13a2\u13a3' +
          '\u13c1\u13d5\u13b6\u13e9' +
          '\u13a0\u13cd\u13d7\u13a9\u13a6\u13af\u13da\u13b8\u13b5\u13e8\'' +
          '\u13ac\u13f4\u13d3\u13a5\u13a8\u13be\u13c5,.\u13c2'
    },
    'cl': {
      '': '{{\u0300}}1234567890-=' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{\u0294}}{}{{\u030b}}' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}:{{\u0301}}' +
          '{{\u0323}}{{\u0304}}{{\u0302}}{{}}{{\u030c}}{{\u0330}}{{\u0324}}{{\u0331}}'
},
    'sc': {
      '': '\u13ca\u13b1\u13c7\u13e7\u13b0\u13b9\u13dd\u13e1\u13ba()' +
          '\u13bc\u13bd' +
          '\u13c6\u13eb\u13e3\u13cf\u13d8\u13f2\u13ad\u13f1\u13ec' +
          '\u13ea\u13d1\u13e4\u13ee' +
          '\u13cc\u13ce\u13d0\u13c8\u13e5\u13b2\u13ab\u13a7\u13ae\u13e0"' +
          '\u13c3\u13ed\u13df\u13de\u13f0\u13bb\u13b7\u13e2\u13b4\u13c9'
    },
    'l': {
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
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CHR_LAYOUT);
chr = CHR_LAYOUT;