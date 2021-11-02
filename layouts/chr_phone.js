var CHR_PHONE_LAYOUT = {
  'id': 'chr_phone',
  'title': 'ᏣᎳᎩ ᏗᎧᏁᎢᏍᏗ ᏚᏃᏴᎬ',
  'mappings': {
    'c,': {
      '': '{{\u0300}}1234567890-=' +
          'qwe{{}}tyuio{{\u0294}}[]\\' +
          'asd{{}}gh{{}}kl;\{{\u0301}}' +
          '{{\u0323}}{{\u0304}}{{\u0302}}v{{\u030c}}nm,./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          'QWE{{}}TYUIO{{\u030b}}{}|' +
          'ASD{{}}GH{{}}KL:"' +
          '{{\u0330}}{{\u0324}}{{\u0331}}V{{}}NM<>?'
    },
    'l,cl': {
      '': '`1234567890-=' +
          '{{q\u200B}}{{w\u200B}}{{e\u200B}}{{r\u200B}}{{t\u200B}}{{y\u200B}}' +
          '{{u\u200B}}{{i\u200B}}{{o\u200B}}{{p\u200B}}[]\\' +
          '{{a\u200B}}{{s\u200B}}{{d\u200B}}{{f\u200B}}{{g\u200B}}{{h\u200B}}' +
          '{{j\u200B}}{{k\u200B}}{{l\u200B}};\'' +
          '{{z\u200B}}{{x\u200B}}{{c\u200B}}{{v\u200B}}{{b\u200B}}{{n\u200B}}' +
          '{{m\u200B}},./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          '{{Q\u200B}}{{W\u200B}}{{E\u200B}}{{R\u200B}}{{T\u200B}}{{Y\u200B}}' +
	  '{{U\u200B}}{{I\u200B}}{{O\u200B}}{{P\u200B}}{}|' +
          '{{A\u200B}}{{S\u200B}}{{D\u200B}}{{F\u200B}}{{G\u200B}}{{H\u200B}}' +
	  '{{J\u200B}}{{K\u200B}}{{L\u200B}}:"' +
          '{{Z\u200B}}{{X\u200B}}{{C\u200B}}{{V\u200B}}{{B\u200B}}{{N\u200B}}' +
	  '{{M\u200B}}\<\>?'
    }
  },
  'transform' : {
    // Based on transliteration of Cherokee to English.
    'a' : '\uab70', // Ꭰ lower
    'A' : '\u13A0', // Ꭰ
    'e' : '\uab71',  // Ꭱ
    'E' : '\u13A1',  // Ꭱ
    'i' : '\uab72',  // Ꭲ
    'I' : '\u13A2',  // Ꭲ
    'o' : '\uab73',  // Ꭳ
    'O' : '\u13A3',  // Ꭳ
    'u' : '\uab74',  // Ꭴ
    'U' : '\u13A4',  // Ꭴ
    'v' : '\uab75',  // Ꭵ
    'V' : '\u13A5',  // Ꭵ

    'ga' : '\uab76',  // Ꭶ
    'G[aA]' : '\u13A6',  // Ꭶ
    'gwa' : '\uab96',  // Ꮖ
    'G[wW][aA]' : '\u13C6',  // Ꮖ

    // TODO: Finish upper case mappings. If first is caps, so is result.
    'gwe' : '\uab97',  // Ꮗ
    'G[wW][eE]' : '\u13C7',  // Ꮗ
    'gwi' : '\uab98',  // Ꮘ
    'G[wW][iI]' : '\u13C8',  // Ꮘ
    'gwo' : '\uab99',  // Ꮙ
    'G[wW][oO]' : '\u13C9',  // Ꮙ
    'gwu' : '\uab9A',  // Ꮚ
    'G[wW][uU]' : '\u13CA',  // Ꮚ
    'gwv' : '\uab9B',  // Ꮛ
    'G[wW][vV]' : '\u13CB',  // Ꮛ
    'ka' : '\uab77',  // Ꭷ
    'K[aA]' : '\u13A7',  // Ꭷ
    'ge' : '\uab78',  // Ꭸ
    'G[eE]' : '\u13A8',  // Ꭸ
    'gi' : '\uab79',  // Ꭹ
    'G[iI]' : '\u13A9',  // Ꭹ
    'go' : '\uab7a',  // Ꭺ
    'G[oO]' : '\u13AA',  // Ꭺ
    'gu' : '\uab7b',  // Ꭻ
    'G[uU]' : '\u13AB',  // Ꭻ
    'gv' : '\uab7c',  // Ꭼ
    'G[vV]' : '\u13AC',  // Ꭼ
    'ha' : '\uab7D',  // Ꭽ
    'H[aA]' : '\u13AD',  // Ꭽ
    'he' : '\uab7E',  // Ꭾ
    'H[eE]' : '\u13AE',  // Ꭾ
    'hi' : '\uab7F',  // Ꭿ
    'H[iI]' : '\u13AF',  // Ꭿ
    'ho' : '\uab80',  // Ꮀ
    'H[oO]' : '\u13B0',  // Ꮀ
    'hu' : '\uab81',  // Ꮁ
    'H[uU]' : '\u13B1',  // Ꮁ
    'hv' : '\uab82',  // Ꮂ
    'H[vV]' : '\u13B2',  // Ꮂ
    'kwa' : '\uab96',  // Ꮖ
    'K[wW][aA]' : '\u13C6',  // Ꮖ
    'kwe' : '\uab97',  // Ꮗ
    'K[wW][eE]' : '\u13C7',  // Ꮗ
    'kwi' : '\uab98',  // Ꮘ
    'K[wW][iI]' : '\u13C8',  // Ꮘ
    'kwo' : '\uab99',  // Ꮙ
    'K[wW][oO]' : '\u13C9',  // Ꮙ
    'kwu' : '\uab9A',  // Ꮚ
    'K[wW][uU]' : '\u13CA',  // Ꮚ
    'kwv' : '\uab9B',  // Ꮛ
    'K[wW][vV]' : '\u13CB',  // Ꮛ
    'la' : '\uab83',  // Ꮃ
    'L[aA]' : '\u13B3',  // Ꮃ
    'le' : '\uab84',  // Ꮄ
    'L[eE]' : '\u13B4',  // Ꮄ
    'li' : '\uab85',  // Ꮅ
    'L[iI]' : '\u13B5',  // Ꮅ
    'lo' : '\uab86',  // Ꮆ
    'L[oO]' : '\u13B6',  // Ꮆ
    'lu' : '\uab87',  // Ꮇ
    'L[uU]' : '\u13B7',  // Ꮇ
    'lv' : '\uab88',  // Ꮈ
    'L[vV]' : '\u13B8',  // Ꮈ
    'ma' : '\uab89',  // Ꮉ
    'M[aA]' : '\u13B9',  // Ꮉ
    'me' : '\uab8A',  // Ꮊ
    'M[eE]' : '\u13BA',  // Ꮊ
    'mi' : '\uab8B',  // Ꮋ
    'M[iI]' : '\u13BB',  // Ꮋ
    'mo' : '\uab8C',  // Ꮌ
    'M[oO]' : '\u13BC',  // Ꮌ
    'mu' : '\uab8D',  // Ꮍ
    'M[uU]' : '\u13BD',  // Ꮍ

    // New character in Unicode 8.0
    'mv' : '\u13fd',  // ᏽ
    'M[vV]' : '\u13f5',  // Ᏽ

    'na' : '\uab8e',  // Ꮎ
    'N[aA]' : '\u13be',  // Ꮎ

    'hna' : '\uab8F',  // Ꮏ
    'H[nN][aA]' : '\u13BF',  // Ꮏ

    // ''' finish below
    'nh' : '\uab90',  // Ꮐ -- different from source prescribing 'nah'
    'N[hH]' : '\u13C0',  // Ꮐ -- different from source prescribing 'nah'
    'ne' : '\uab91',  // Ꮑ
    'N[eE]' : '\u13C1',  // Ꮑ
    'ni' : '\uab92',  // Ꮒ
    'N[iI]' : '\u13C2',  // Ꮒ
    'no' : '\uab93',  // Ꮓ
    'N[oO]' : '\u13C3',  // Ꮓ
    'nu' : '\uab94',  // Ꮔ
    'N[uU]' : '\u13C4',  // Ꮔ
    'nv' : '\uab95',  // Ꮕ
    'N[vV]' : '\u13C5',  // Ꮕ
    'qua' : '\uab96',  // Ꮖ
    'Q[uU][aA]' : '\u13C6',  // Ꮖ
    'que' : '\uab97',  // Ꮗ
    'Q[uU][eE]' : '\u13C7',  // Ꮗ
    'qui' : '\uab98',  // Ꮘ
    'Q[uU][iI]' : '\u13C8',  // Ꮘ
    'quo' : '\uab99',  // Ꮙ
    'Q[uU][oO]' : '\u13C9',  // Ꮙ
    'quu' : '\uab9a',  // Ꮚ
    'Q[uU][uU]' :'\u13CA',  // Ꮚ
    'quv' : '\uab9B',  // Ꮛ
    'Q[uU][vV]' : '\u13CB',  // Ꮛ
    'sa' : '\uab9C',  // Ꮜ
    'S[aA]' : '\u13CC',  // Ꮜ
    's' : '\uab9D',  // Ꮝ
    'S' : '\u13CD',  // Ꮝ
    'se' : '\uab9E',  // Ꮞ
    'S[eE]' : '\u13CE',  // Ꮞ
    'si' : '\uab9F',  // Ꮟ
    'S[iI]' : '\u13CF',  // Ꮟ
    'so' : '\uaba0',  // Ꮠ
    'S[oO]' : '\u13D0',  // Ꮠ
    'su' : '\uaba1',  // Ꮡ
    'S[uU]' : '\u13D1',  // Ꮡ
    'sv' : '\uaba2',  // Ꮢ
    'S[vV]' : '\u13D2',  // Ꮢ
    'da' : '\uaba3',  // Ꮣ
    'D[aA]' : '\u13D3',  // Ꮣ
    'ta' : '\uaba4',  // Ꮤ
    'T[aA]' : '\u13D4',  // Ꮤ
    'de' : '\uaba5',  // Ꮥ
    'D[eE]' : '\u13D5',  // Ꮥ
    'te' : '\uaba6',  // Ꮦ
    'T[eE]' : '\u13D6',  // Ꮦ
    'di' : '\uaba7',  // Ꮧ
    'D[iI]' : '\u13D7',  // Ꮧ
    'ti' : '\uaba8',  // Ꮨ
    'T[iI]' : '\u13D8',  // Ꮨ
    'do' : '\uaba9',  // Ꮩ
    'D[oO]' : '\u13D9',  // Ꮩ
    'du' : '\uabAA',  // Ꮪ
    'D[uU]' : '\u13DA',  // Ꮪ
    'dv' : '\uabaB',  // Ꮫ
    'D[vV]' : '\u13DB',  // Ꮫ
    'dla' : '\uabaC',  // Ꮬ
    'D[lL][aA]' : '\u13DC',  // Ꮬ
    'tla' : '\uabaD',  // Ꮭ
    'T[lL][aA]' : '\u13DD',  // Ꮭ
    'tle' : '\uabaE',  // Ꮮ
    'T[lL][eE]' : '\u13DE',  // Ꮮ
    'tli' : '\uabaF',  // Ꮯ
    'T[lL][iI]' : '\u13dF',  // Ꮯ
    'tlo' : '\uabb0',  // Ꮰ
    'T[lL][oO]' : '\u13E0',  // Ꮰ
    'tlu' : '\uabb1',  // Ꮱ
    'T[lL][uU]' : '\u13E1',  // Ꮱ
    'tlv' : '\uabb2',  // Ꮲ
    'T[lL][vV]' : '\u13E2',  // Ꮲ
    'tsa' : '\uabb3',  // Ꮳ
    'T[sS][aA]' : '\u13E3',  // Ꮳ
    'tse' : '\uabb4',  // Ꮴ
    'T[sS][eE]' : '\u13E4',  // Ꮴ
    'tsi' : '\uabb5',  // Ꮵ
    'T[sS][iI]' : '\u13E5',  // Ꮵ
    'tso' : '\uabb6',  // Ꮶ
    'T[sS][oO]' : '\u13E6',  // Ꮶ
    'tsu' : '\uabb7',  // Ꮷ
    'T[sS][uU]' : '\u13E7',  // Ꮷ
    'tsv' : '\uabb8',  // Ꮸ
    'T[sS][vV]' : '\u13E8',  // Ꮸ
    'wa' : '\uabb9',  // Ꮹ
    'W[aA]' : '\u13E9',  // Ꮹ
    'we' : '\uabbA',  // Ꮺ
    'W[eE]' : '\u13EA',  // Ꮺ
    'wi' : '\uabbB',  // Ꮻ
    'W[iI]' : '\u13EB',  // Ꮻ
    'wo' : '\uabbC',  // Ꮼ
    'W[oO]' : '\u13EC',  // Ꮼ
    'wu' : '\uabbD',  // Ꮽ
    'W[uU]' : '\u13ED',  // Ꮽ
    'wv' : '\uabbE',  // Ꮾ
    'W[vV]' : '\u13EE',  // Ꮾ
    'ya' : '\uabbf',  // Ꮿ
    'Y[aA]' : '\u13EF',  // Ꮿ
    'ye' : '\u13f8',  // Ᏸ
    'Y[eE]' : '\u13F0',  // Ᏸ
    'yi' : '\u13F9',  // Ᏹ
    'Y[iI]' : '\u13F1',  // Ᏹ
    'yo' : '\u13fa',  // Ᏺ
    'Y[oO]' : '\u13F2',  // Ᏺ
    'yu' : '\u13fB',  // Ᏻ
    'Y[uU]' : '\u13f3',  // Ᏻ
    'yv' : '\u13FC',   // Ᏼ
    'Y[vV]' : '\u13F4',   // Ᏼ
    '([A-'a' : '\uab70', // Ꭰ lower
         'A' : '\u13A0', // Ꭰ
         'e' : '\uab71',  // Ꭱ
         'E' : '\u13A1',  // Ꭱ
         'i' : '\uab72',  // Ꭲ
         'tsa' : '\uabb3',  // Ꮳ
         'T[sS][aA]' : '\u13E3',  // Ꮳ
         'la' : '\uab83',  // Ꮃ
         'L[aA]' : '\u13B3',  // Ꮃ
         'gi' : '\uab79',  // Ꭹ

Za-z])\u200B': '$1' // Avoid transform of capslock letters.
  },
  'historyPruneRegex': 's|n|u|a|S|N|U|A'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CHR_PHONE_LAYOUT);
chr_phone = CHR_PHONE_LAYOUT;