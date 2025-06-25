// Convert from Latin form of Tangsa to Lakhum Unicode forms:
const langConverter = new langConverterClass('nst', 'Tangsa Lakhum');

// Mappings for Tangsa Lakhum
const map_encoding_names = [
  'Gam Win Unicode',  // Gam Win and PUA to Unicode
  'Gam Win PUA',      // Gam Win to PUA
];

// Used to stand as a 1-byte replacement for special processing.
const temp_replace_char = '¡';

langConverter.encoding_data = {
    'LakhumP': {index:0, outputEncoding:'Unicode', outputScript:'Tangsa'},
    'GamWinPUA': {index:0, outputEncoding:'Unicode', outputScript:'Tangsa'},
};
langConverter.one2oneMap =  private_use_map_combined = {
    'mnvungz': ['𖪜𖪬𖩸𖪄𖪐', ''],
    'mznvungz': ['𖪜𖪬𖩸𖪄𖪐', ''],
    'mnaungz': ['𖪜𖪬𖩴𖪄𖪐', ''],
    'mznaungz': ['𖪜𖪬𖩴𖪄𖪐', ''],
    'mrvkueq': ['𖪫𖪲𖪒𖪠𖪖', ''],
    'vungz': ['𖩸𖪄𖪐', ''],
    'vungc': ['𖩹𖪅𖪐', ''],
    'vungx': ['𖩻𖪇𖪐', ''],
    'vuk': ['𖩸𖪄𖪠', ''],
    'aungz': ['𖩴𖪄𖪐', ''],
    'aungc': ['𖩵𖪅𖪐', ''],
    'aungx': ['𖩷𖪇𖪐', ''],
    'auk': ['𖩴𖪄𖪠', ''],
    'auz': ['𖩴𖪄', ''],
    'auc': ['𖩵𖪅', ''],
    'aux': ['𖩷𖪇', ''],
    'vuq': ['𖩸𖪆', ''],
    'auq': ['𖩴𖪆', ''],
    'ovrz': ['𖩰𖩸𖪲', ''],
    'ovrc': ['𖩱𖩹𖪲', ''],
    'ovrx': ['𖩳𖩻𖪲', ''],
    'uiyq': ['𖪌𖪂', ''],
    'vyq': ['𖩸𖪂', ''],
    'oq': ['𖩲', ''],
    'aq': ['𖩶', ''],
    'vq': ['𖩺', ''],
    'eq': ['𖩾', ''],
    'iq': ['𖪂', ''],
    'uq': ['𖪆', ''],
    'awq': ['𖪊', ''],
    'uiq': ['𖪎', ''],
    'ueq': ['𖪖', ''],
    'uiuq': ['𖪚', ''],
    'ovyz': ['𖩰𖩸𖪀', ''],
    'ovyc': ['𖩱𖩹𖪁', ''],
    'ovyx': ['𖩳𖩻𖪃', ''],
    'oayz': ['𖩰𖪀', ''],
    'oayc': ['𖩱𖪁', ''],
    'oayx': ['𖩳𖪃', ''],
    'oyc': ['𖩱𖪁', ''],
    'oyx': ['𖩳𖪃', ''],
    'oyz': ['𖩰𖪀', ''],
    'ayz': ['𖩴𖪀', ''],
    'ayc': ['𖩵𖪁', ''],
    'ayx': ['𖩷𖪃', ''],
    'vyz': ['𖩸𖪀', ''],
    'vyc': ['𖩹𖪁', ''],
    'vyx': ['𖩻𖪃', ''],
    'uyz': ['𖪄𖪀', ''],
    'uyc': ['𖪅𖪁', ''],
    'uyx': ['𖪇𖪃', ''],
    'uiyz': ['𖪌𖪀', ''],
    'uiyc': ['𖪍𖪁', ''],
    'uiyx': ['𖪏𖪇', ''],
    'ueyz': ['𖪕𖪀', ''],
    'ueyc': ['𖪔𖪁', ''],
    'ueyx': ['𖪗𖪃', ''],
    'ongz': ['𖩰𖪐', ''],
    'ongc': ['𖩱𖪐', ''],
    'ongx': ['𖩳𖪐', ''],
    'angz': ['𖩴𖪐', ''],
    'angc': ['𖩵𖪐', ''],
    'angx': ['𖩷𖪐', ''],
    'vngz': ['𖩸𖪐', ''],
    'vngc': ['𖩹𖪐', ''],
    'vngx': ['𖩻𖪐', ''],
    'engz': ['𖩼𖪐', ''],
    'engc': ['𖩽𖪐', ''],
    'engx': ['𖩿𖪐', ''],
    'ingz': ['𖪀𖪐', ''],
    'ingc': ['𖪁𖪐', ''],
    'ingx': ['𖪃𖪐', ''],
    'ungz': ['𖪄𖪐', ''],
    'ungc': ['𖪅𖪐', ''],
    'ungx': ['𖪇𖪐', ''],
    'awngz': ['𖩼𖪐', ''],
    'awngc': ['𖪉𖪐', ''],
    'awngx': ['𖪋𖪐', ''],
    'uingz': ['𖪌𖪐', ''],
    'uingc': ['𖪍𖪐', ''],
    'uingx': ['𖪏𖪐', ''],
    'uengz': ['𖪕𖪐', ''],
    'uengc': ['𖪔𖪐', ''],
    'uengx': ['𖪗𖪐', ''],
    'uiungz': ['𖪘𖪐', ''],
    'uiungc': ['𖪙𖪐', ''],
    'uiungx': ['𖪛𖪐', ''],
    'ovmz': ['𖩰𖩸𖪫', ''],
    'ovmc': ['𖩱𖩹𖪫', ''],
    'ovmx': ['𖩳𖩻𖪫', ''],
    'orz': ['𖩰𖪲', '\ue400\ue440'],
    'orc': ['𖩱𖪲', '\ue401\ue440'],
    'orx': ['𖩳𖪲', '\ue403\ue440'],
    'onz': ['𖩰𖪬', '\ue400\ue43a'],
    'onc': ['𖩱𖪬', '\ue401\ue43a'],
    'onx': ['𖩳𖪬', '\ue403\ue43a'],
    'olz': ['𖩰𖪮', '\ue400\ue43c'],
    'olc': ['𖩱𖪮', '\ue401\ue43c'],
    'olx': ['𖩳𖪮', '\ue403\ue43c'],
    'omz': ['𖩰𖪫', ''],
    'omc': ['𖩱𖪫', ''],
    'omx': ['𖩳𖪫', ''],
    'oamz': ['𖩰𖪫', ''],
    'oamc': ['𖩱𖪫', ''],
    'oamx': ['𖩳𖪫', ''],
    'ot': ['𖩰𖪰', '\ue400\ue43e'],
    'amz': ['𖩴𖪫', ''],
    'amc': ['𖩵𖪫', ''],
    'amx': ['𖩷𖪫', ''],
    'vmz': ['𖩸𖪫', ''],
    'vmc': ['𖩹𖪫', ''],
    'vmx': ['𖩻𖪫', ''],
    'emz': ['𖩼𖪫', ''],
    'emc': ['𖩽𖪫', ''],
    'emx': ['𖩿𖪫', ''],
    'imz': ['𖪀𖪫', ''],
    'imc': ['𖪁𖪫', ''],
    'imx': ['𖪃𖪫', ''],
    'umz': ['𖪄𖪫', ''],
    'umc': ['𖪅𖪫', ''],
    'umx': ['𖪇𖪫', ''],
    'awmz': ['𖩼𖪫', ''],
    'awmc': ['𖪉𖪫', ''],
    'awmx': ['𖪋𖪫', ''],
    'uimz': ['𖪌𖪫', ''],
    'uimc': ['𖪍𖪫', ''],
    'uimx': ['𖪏𖪫', ''],
    'uemz': ['𖪕𖪫', ''],
    'uemc': ['𖪔𖪫', ''],
    'uemx': ['𖪗𖪫', ''],
    'uiumz': ['𖪘𖪫', ''],
    'uiumc': ['𖪙𖪫', ''],
    'uiumx': ['𖪛𖪫', ''],
    'ovnz': ['𖩰𖩸𖪬', ''],
    'ovnc': ['𖩱𖩹𖪬', ''],
    'ovnx': ['𖩳𖩻𖪬', ''],
    'oanz': ['𖩰𖪬', ''],
    'oanc': ['𖩱𖪬', ''],
    'oanx': ['𖩳𖪬', ''],
    'anz': ['𖩴𖪬', ''],
    'anc': ['𖩵𖪬', ''],
    'anx': ['𖩷𖪬', ''],
    'vnz': ['𖩸𖪬', ''],
    'vnc': ['𖩹𖪬', ''],
    'vnx': ['𖩻𖪬', ''],
    'enz': ['𖩼𖪬', ''],
    'enc': ['𖩽𖪬', ''],
    'enx': ['𖩿𖪬', ''],
    'inz': ['𖪀𖪬', ''],
    'inc': ['𖪁𖪬', ''],
    'inx': ['𖪃𖪬', ''],
    'unz': ['𖪄𖪬', ''],
    'unc': ['𖪅𖪬', ''],
    'unx': ['𖪇𖪬', ''],
    'awnz': ['𖩼𖪬', ''],
    'awnc': ['𖪉𖪬', ''],
    'awnx': ['𖪋𖪬', ''],
    'uinz': ['𖪌𖪬', ''],
    'uinc': ['𖪍𖪬', ''],
    'uinx': ['𖪏𖪬', ''],
    'uenz': ['𖪕𖪬', ''],
    'uenc': ['𖪔𖪬', ''],
    'uenx': ['𖪗𖪬', ''],
    'uiunz': ['𖪘𖪬', ''],
    'uiunc': ['𖪙𖪬', ''],
    'uiunx': ['𖪛𖪬', ''],
    'ovlz': ['𖩰𖩸𖪮', ''],
    'ovlc': ['𖩱𖩹𖪮', ''],
    'ovlx': ['𖩳𖩻𖪮', ''],
    'oalz': ['𖩰𖪮', ''],
    'oalc': ['𖩱𖪮', ''],
    'oalx': ['𖩳𖪮', ''],
    'alz': ['𖩴𖪮', ''],
    'alc': ['𖩵𖪮', ''],
    'alx': ['𖩷𖪮', ''],
    'vlz': ['𖩸𖪮', ''],
    'vlc': ['𖩹𖪮', ''],
    'vlx': ['𖩻𖪮', ''],
    'elz': ['𖩼𖪮', ''],
    'elc': ['𖩽𖪮', ''],
    'elx': ['𖩿𖪮', ''],
    'ilz': ['𖪀𖪮', ''],
    'ilc': ['𖪁𖪮', ''],
    'ilx': ['𖪃𖪮', ''],
    'ulz': ['𖪄𖪮', ''],
    'ulc': ['𖪅𖪮', ''],
    'ulx': ['𖪇𖪮', ''],
    'awlz': ['𖩼𖪮', ''],
    'awlc': ['𖪉𖪮', ''],
    'awlx': ['𖪋𖪮', ''],
    'uilz': ['𖪌𖪮', ''],
    'uilc': ['𖪍𖪮', ''],
    'uilx': ['𖪏𖪮', ''],
    'uelz': ['𖪕𖪮', ''],
    'uelc': ['𖪔𖪮', ''],
    'uelx': ['𖪗𖪮', ''],
    'uiulz': ['𖪘𖪮', ''],
    'uiulc': ['𖪙𖪮', ''],
    'uiulx': ['𖪛𖪮', ''],
    'ovrz': ['𖩰𖪲', ''],
    'ovrc': ['𖩱𖪲', ''],
    'ovrx': ['𖩳𖪲', ''],
    'oarz': ['𖩰𖪲', ''],
    'oarc': ['𖩱𖪲', ''],
    'oarx': ['𖩳𖪲', ''],
    'arz': ['𖩴𖪲', ''],
    'arc': ['𖩵𖪲', ''],
    'arx': ['𖩷𖪲', ''],
    'vrz': ['𖩸𖪲', ''],
    'vrc': ['𖩹𖪲', ''],
    'vrx': ['𖩻𖪲', ''],
    'erz': ['𖩼𖪲', ''],
    'erc': ['𖩽𖪲', ''],
    'erx': ['𖩿𖪲', ''],
    'irz': ['𖪀𖪲', ''],
    'irc': ['𖪁𖪲', ''],
    'irx': ['𖪃𖪲', ''],
    'urz': ['𖪄𖪲', ''],
    'urc': ['𖪅𖪲', ''],
    'urx': ['𖪇𖪲', ''],
    'awrz': ['𖩼𖪲', ''],
    'awrc': ['𖪉𖪲', ''],
    'awrx': ['𖪋𖪲', ''],
    'uirz': ['𖪌𖪲', ''],
    'uirc': ['𖪍𖪲', ''],
    'uirx': ['𖪏𖪲', ''],
    'uerz': ['𖪕𖪲', ''],
    'uerc': ['𖪔𖪲', ''],
    'uerx': ['𖪗𖪲', ''],
    'uiurz': ['𖪘𖪲', ''],
    'uiurc': ['𖪙𖪲', ''],
    'uiurx': ['𖪛𖪲', ''],
    'ok': ['𖩰𖪠', ''],
    'ak': ['𖩴𖪠', ''],
    'vk': ['𖩸𖪠', ''],
    'ek': ['𖩼𖪠', ''],
    'ik': ['𖪀𖪠', ''],
    'uk': ['𖪄𖪠', ''],
    'awk': ['𖪈𖪠', ''],
    'uik': ['𖪌𖪠', ''],
    'uek': ['𖪒𖪠', ''],
    'uiuk': ['𖪘𖪠', ''],
    'ovp': ['𖩰𖩸𖪧', ''],
    'oap ~ op': ['𖩰𖪧', ''],
    'op': ['𖩰𖪧', ''],
    'ap': ['𖩴𖪧', ''],
    'vp': ['𖩸𖪧', ''],
    'ep': ['𖩼𖪧', ''],
    'ip': ['𖪀𖪧', ''],
    'up': ['𖪄𖪧', ''],
    'awp': ['𖪈𖪧', ''],
    'uip': ['𖪌𖪧', ''],
    'uep': ['𖪒𖪧', ''],
    'uiup': ['𖪘𖪧', ''],
    'ovt': ['𖩰𖩸𖪰', ''],
    'oat': ['𖩰𖪰', ''],
    'at': ['𖩴𖪰', ''],
    'th': ['𖪹', ''],  // Maybe
    'vt': ['𖩸𖪰', ''],
    'et': ['𖩼𖪰', ''],
    'it': ['𖪀𖪰', ''],
    'ut': ['𖪄𖪰', ''],
    'awt': ['𖪈𖪰', ''],
    'uit': ['𖪌𖪰', ''],
    'uet': ['𖪒𖪰', ''],
    'uiut': ['𖪘𖪰', ''],
    'oz': ['𖩰', ''],
    'oc': ['𖩱', ''],
    'ox': ['𖩳', ''],
    'az': ['𖩴', ''],
    'ac': ['𖩵', ''],
    'ax': ['𖩷', ''],
    'vz': ['𖩸', ''],
    'vc': ['𖩹', ''],
    'vx': ['𖩻', ''],
    'ez': ['𖩼', ''],
    'ec': ['𖩽', ''],
    'ex': ['𖩿', ''],
    'iz': ['𖪀', ''],
    'ic': ['𖪁', ''],
    'ix': ['𖪃', ''],
    'uz': ['𖪄', ''],
    'uc': ['𖪅', ''],
    'ux': ['𖪇', ''],
    'awz': ['𖪈', '\ue414'],
    'awc': ['𖪉', ''],
    'awx': ['𖪋', ''],
    'uiz': ['𖪌', ''],
    'uic': ['𖪍', ''],
    'uix': ['𖪏', ''],
    'uez': ['𖪕', ''],
    'uec': ['𖪔', ''],
    'uex': ['𖪗', ''],
    'uiuz': ['𖪘', ''],
    'uiuc': ['𖪙', ''],
    'uiux': ['𖪛', ''],
    'htt': ['𖪸', ''],
    'th': ['𖪹', ''],
    'ht': ['𖪯', ''],
    'ch': ['𖪼', ''],
    'kh': ['𖪡', ''],
    'ng': ['𖪣', ''],
    'ny': ['𖪨', ''],
    'ph': ['𖪩', ''],
    'nh': ['𖪳', ''],
    'sh': ['𖪴', ''],
    'ts': ['𖪶', ''],
    'gh': ['𖪷', ''],
    'mz': ['\ud81a\ude9c', '\ue427'],
    'mc': ['\ud81a\ude9d', '\ue428'],
    'mq': ['\ud81a\ude9e', '\ue429'],
    'mx': ['\ud81a\ude9f', '\ue42a'],
    'f': ['𖪺', ''],
    'k': ['𖪠', ''],
    'g': ['𖪢', ''],
    's': ['𖪤', ''],
    'y': ['𖪥', ''],
    'w': ['𖪦', ''],
    'p': ['𖪧', ''],
    'b': ['𖪪', ''],
    'm': ['𖪫', ''],
    'n': ['𖪬', ''],
    'h': ['𖪭', ''],
    'l': ['𖪮', ''],
    't': ['𖪰', ''],
    'd': ['𖪱', ''],
    'r': ['𖪲', ''],
    'j': ['𖪵', ''],
    'v': ['𖩸', ''],
    'x': ['𖪺', '\ue448'],
    'z': ['𖪾', '\ue458'],
    'dh': ['𖪼','\ue42c'],
    ' ': [' ', ' '],
    '.': ['.', '.'],
    ',': [',', ','],
    '¡': '𖪒',  // Hack around special case for \U016A92
    // PUA to Unicode here.
    '\uE400':   '\ud81a\ude70',
    '\uE401':   '\ud81a\ude71',
    '\uE402':   '\ud81a\ude72',
    '\uE403':   '\ud81a\ude73',
    '\uE404':   '\ud81a\ude74',
    '\uE405':   '\ud81a\ude75',
    '\uE406':   '\ud81a\ude76',
    '\uE407':   '\ud81a\ude77',
    '\uE408':   '\ud81a\ude7C',
    '\uE409':   '\ud81a\ude7D',
    '\uE40A':   '\ud81a\ude7E',
    '\uE40B':   '\ud81a\ude7F',
    '\uE40C':   '\ud81a\ude80',
    '\uE40D':   '\ud81a\ude81',
    '\uE40E':   '\ud81a\ude82',
    '\uE40F':   '\ud81a\ude83',
    '\uE410':   '\ud81a\ude84',
    '\uE411':   '\ud81a\ude85',
    '\uE412':   '\ud81a\ude86',
    '\uE413':   '\ud81a\ude87',
    '\uE414':   '\ud81a\ude88',
    '\uE415':   '\ud81a\ude89',
    '\uE416':   '\ud81a\ude8B',
    '\uE417':   '\ud81a\ude8C',
    '\uE418':   '\ud81a\ude8D',
    '\uE419':   '\ud81a\ude8E',
    '\uE41A':   '\ud81a\ude8F',
    '\uE41B':   '\ud81a\ude90',
    '\uE41C':   '\ud81a\ude91',
    '\uE41D':   '\ud81a\ude92',
    '\uE41E':   '\ud81a\ude93',
    '\uE41F':   '\ud81a\ude94',
    '\uE420':   '\ud81a\ude95',
    '\uE421':   '\ud81a\ude96',
    '\uE422':   '\ud81a\ude97',
    '\uE423':   '\ud81a\ude98',
    '\uE424':   '\ud81a\ude99',
    '\uE425':   '\ud81a\ude9A',
    '\uE426':   '\ud81a\ude9B',
    '\uE427':   '\ud81a\ude9C',
    '\uE428':   '\ud81a\ude9D',
    '\uE429':   '\ud81a\ude9e',
    '\uE42A':   '\ud81a\ude9f',
    '\uE42B':   '\ud81a\udeBe',
    '\uE42C':   '\ud81a\udeBc',
    '\uE42D':   '\ud81a\udeBd',
    '\uE42E':   '\ud81a\udeA0',
    '\uE42F':   '\ud81a\udeA1',
    '\uE430':   '\ud81a\udeA2',
    '\uE431':   '\ud81a\udeA3',
    '\uE432':   '\ud81a\udeA4',
    '\uE433':   '\ud81a\udeA5',
    '\uE434':   '\ud81a\udeA6',
    '\uE435':   '\ud81a\udeA7',
    '\uE436':   '\ud81a\udeA8',
    '\uE437':   '\ud81a\udeA9',
    '\uE438':   '\ud81a\udeAA',
    '\uE439':   '\ud81a\udeAB',
    '\uE43A':   '\ud81a\udeAC',
    '\uE43B':   '\ud81a\udeAD',
    '\uE43C':   '\ud81a\udeAE',
    '\uE43D':   '\ud81a\udeAF',
    '\uE43E':   '\ud81a\udeB0',
    '\uE43F':   '\ud81a\udeB1',
    '\uE440':   '\ud81a\udeB2',
    '\uE441':   '\ud81a\udeB3',
    '\uE442':   '\ud81a\udeB4',
    '\uE443':   '\ud81a\udeB5',
    '\uE444':   '\ud81a\udeB6',
    '\uE445':   '\ud81a\udeB7',
    '\uE446':   '\ud81a\udeB8',
    '\uE447':   '\ud81a\udeB9',
    '\uE448':   '\ud81a\udeBA',
    '\uE449':   '\ud81a\udeC1',
    '\uE44A':   '\ud81a\udeC2',
    '\uE44B':   '\ud81a\udeC3',
    '\uE44C':   '\ud81a\udeC4',
    '\uE44D':   '\ud81a\udeC5',
    '\uE44E':   '\ud81a\udeC6',
    '\uE44F':   '\ud81a\udeC7',
    '\uE450':   '\ud81a\udeC8',
    '\uE451':   '\ud81a\udeC9',
    '\uE452':   '\ud81a\udeC0',
    '\uE453':   '\ud81a\ude8A',
    '\uE454':   '\ud81a\ude78',
    '\uE455':   '\ud81a\ude79',
    '\uE456':   '\ud81a\ude7A',
    '\uE457':   '\ud81a\ude7B',
    '\uE458':   '\ud81a\udebE',  };

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);


const gamwin_latin_chars =
    "mnvungz|mznvungz|mnaungz|mznaungz|mrvkueq|vungz|vungc|vungx|vuk|aungz|aungc|aungx|auk|auz|auc|aux|"+
    "vuq|auq|ovrz|ovrc|ovrx|uiyq|vyq|oq|aq|vq|eq|iq|uq|awq|uiq|ueq|uiuq|ovyz|ovyc|ovyx|oayz|oayc|oayx|" +
    "ayz|ayc|ayx|vyz|vyc|vyx|uyz|uyc|uyx|uiyz|uiyc|uiyx|ueyz|ueyc|ueyx|ongz|ongc|ongx|angz|angc|angx|vngz|vngc|" +
    "vngx|engz|engc|engx|ingz|ingc|ingx|ungz|ungc|ungx|awngz|awngc|awngx|uingz|uingc|uingx|uengz|uengc|uengx|uiungz" +
    "|uiungc|uiungx|ovmz|ovmc|ovmx|omz|omc|omx|oamz|oamc|oamx|amz|amc|amx|vmz|vmc|vmx|emz|emc|emx|imz|imc|imx|umz|" +
    "umc|umx|awmz|awmc|awmx|uimz|uimc|uimx|uemz|uemc|uemx|uiumz|uiumc|uiumx|ovnz|ovnc|ovnx|oanz|oanc|oanx|anz|anc|" +
    "anx|vnz|vnc|vnx|enz|enc|enx|inz|inc|inx|unz|unc|unx|awnz|awnc|awnx|uinz|uinc|uinx|uenz|uenc|uenx|uiunz|uiunc|" +
    "uiunx|oyc|oyx|oyz|ovlz|ovlc|ovlx|oalz|oalc|oalx|alz|alc|alx|vlz|vlc|vlx|elz|elc|elx|ilz|ilc|ilx|ulz|ulc|ulx|awlz|awlc|awlx|" +
    "uilz|uilc|uilx|uelz|uelc|uelx|uiulz|uiulc|uiulx|ovrz|ovrc|ovrx|oarz|oarc|oarx|arz|arc|arx|vrz|vrc|vrx|erz|erc|" +
    "erx|irz|irc|irx|olc|olx|olz|onc|onx|onz|orc|orx|orz|urz|urc|urx|awrz|awrc|awrx|uirz|uirc|uirx|uerz|uerc|uerx|uiurz|" +
    "uiurc|uiurx|ok|ak|ek|ik|uk|dh|" +
    "awk|uik|uek|uiuk|ovp|oap ~ op|op|ap|ep|ip|up|awp|uip|uep|uiup|ovt|oat|at|et|it|ut|awt|uit|uet|uiut|oz|" +
    "oc|ot|ox|oy|az|ac|ax|vz|vc|vx|ez|ec|ex|iz|ic|ix|uz|uc|ux|awz|awc|awx|uiz|uic|uix|uez|uec|uex|uiuz|uiuc|uiux|htt|th|" +
    "ht|ch|kh|ng|ny|ph|nh|sh|ts|gh|mz|mc|mq|mx|f|k|g|s|y|w|p|b|m|n|h|l|t|d|r|j|v|x|z|,|\.|\u000a|.";

const regex1 = new RegExp(gamwin_latin_chars, "gi");

function preParseLatin(instring) {
    //  var regex1 = new RegExp(tangsa_latin_chars, "gi");
    const outList = instring.match(regex1);
    return outList;
}

// For special GamWin case of vowel v. In context of consonant-v-consonant-vowel,
// Conversion of the "v" is specialized to "𖪒" U+16A92 instead of the
// regular conversion to U+16A78.
const consonant = "((htt|ht|ng|ny|ts|[gknpst]h*|[bdfhjlmnprstwy])[cxz]?)";
const vowel = "(aw|ue|ui|uiu|[aeiouv])";

const cvcv_regex = new RegExp(consonant + "v" + consonant + vowel, "g");

function handleCvCV(intext, encoding_index) {
  if (intext.match(cvcv_regex)) {
    if (encoding_index == 0) {
       return intext.replace(cvcv_regex, "$1¡$3$5");   // Unicode
    } else {
       return intext.replace(cvcv_regex, "$1¡$3$5");   // PUA
    }
   } else {
   return intext;
   }
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  const inarea = document.getElementById(inbox);
  const outarea = document.getElementById(outbox);

  const out_text = nst_convertText(inarea.value, encodingIndex);
  if (outarea) {
    outarea.innerHTML = outarea.value = out_text;
  }
}

  // First, replace all single characters with their PUA or Unicode equivalents.
function nst_convertText(intext, encodingIndex) {
  let out;
  let word_mode = langConverter.word_mode;

  // Handle special case of "v" vowel in pattern consonant-v-consonant-vowel.
  //const low_text = intext.toLowerCase();
  const low_text = intext;
    let words;  // May be a list of words
    if (word_mode) {
        const split_regex = /\w+\s+/g;
        words = intext.match(/\S+\s*/g);
    } else {
        // Just one big block of all the input.
        words = [intext];
    }
    /* WORDS: for each word:
      a. preParseLatin on the word
      b. Try converting. Keep track if any character doesn't convert
      c. At end of word, if all have converted, save the converted string
      d. If there was something not converted, keep the original word.
         Flag these and return to the caller.
     */
  // Break into the blocks tht can be individually transformed.
    let outtext_list = [];
    for (let segment of words) {
        let segment_out = [];
        const original_word = segment;
        // Perform special conversion first.
        // Convert to lower case unconditionally.
        segment = segment.toLowerCase();
        Segment = handleCvCV(segment, encodingIndex);

        let num_unconverted = 0;
        const parsedText = preParseLatin(segment);
        let result = "";
        for (let index = 0; index < parsedText.length; index ++) {
            const c = parsedText[index];
            let out = c;
            if (c in private_use_map_combined) {
                if (private_use_map_combined[c] instanceof Array) {
                    result = private_use_map_combined[c][encodingIndex];
                } else {
                    // It's a single value. Convert only for PUA to Unicode
                    if (encodingIndex == 0) {
                        result = private_use_map_combined[c];
                    } else {
                        num_unconverted += 1;
                        result = null;
                    }
                }
                if (result) {
                    out = result;
                }
            } else {
                num_unconverted += 1;
            }
            segment_out.push(out);
        }
        if (word_mode && num_unconverted > 0) {
            outtext_list.push(original_word);
        } else {
            // Take what the converter produced
            outtext_list.push(segment_out.join(''));
        }
    }
    // If needed, add more post-processing conversions here
    // Put it all together with spaces for now.
    return outtext_list.join('');
}


// Create a object describing conversions in this file converter.
const nstConverter_obj = {
  conversions: {
    'GW_to_PUA' : {
        'from': 'GamWin', 'to': "Lakhum PUA",
        'convert': function(intext) {
        return nst_convertText(intext, 1);
      }
    },
    'GW_to_Unicode': {
      'from': 'GamWin', 'to': "Lakhum Unicode",
      'convert': function(intext) {
        return nst_convertText(intext, 0);
      }
    },
    'PUA_to_Unicode': {
      'from': 'Lakhum PUA', 'to': "Lakhum Unicode",
      'convert': function(intext) {
        return nst_convertText(intext, 0);
      }
    },
  }
}

