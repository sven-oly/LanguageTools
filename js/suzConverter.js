const langConverter = new langConverterClass('suz', 'Sunuwar');

// Mappings for Sunuwar font encodings
var map_encoding_names = [
  'TikamuliPUA', 'Jenticha'];

let langConvertClass = function() {
  this.langCode = 'suz';
  this.langName = 'Sunuwar';

  // Each element includes input, output, and compute options.
  this.transforms = [
    {input: 'Mukdum ASCII', output:'Unicode Sunuwar',
      'compute': this.mukdum2Unicode},
    {input: 'Mukdum Final', output:'Unicode Sunuwar',
      'compute': this.mukdum2Unicode},
  ];
};

langConverter.map_encoding_names = map_font_to_encoding = {
    'Kirat1': 1,
    'Kirat2': 1,
    'Mukdum' : 2,
    'MukdumFinal' : 2,
    'Kaatich1': 1,
    'Lonkuch': 0,
    'Prem': 0
};

langConverter.getTransforms = function() {
    return [
	{input: 'Mukdum ASCII', output:'Unicode Sunuwar',
	 'compute': this.mukdum2Unicode},
	{input: 'Devanagari Unicode', output:'Unicode Sunuwar',
	 'compute': this.bengali2SuZUnicode},
	{input: 'Preeti', output:'Mukdum Sunuwar',
	 'compute': this.preeti2Mukdum},
	{input: 'Preeti', output:'Sunuwar Unicode',
	 'compute': this.preeti2Unicode},
    ];
}

langConverter.mukdum2Unicode = function(text_in) {
    const encodingIndex = 2;
    const unicodeOut = convertEncoding(text_in, encodingIndex);
    return unicodeOut;
}

langConverter.bengali2SuZUnicode = function(intext) {
    let suzUnicodeOut = [];
    for (var index = 0; index < intext.length; index ++) {
	let c = intext[index];
	let out = c;
	if (c in bengali2SuzUnicodeMapping) {
	    out = bengali2SuzUnicodeMapping[c][0];  // only the character
	}
	suzUnicodeOut.push(out);
    }
    return suzUnicodeOut.join('');
}

langConverter.preeti2Mukdum = function(intext) {
    const parsedText = intext.match(preetiChars);
    let mukdumOut = [];
    for (let index = 0; index < parsedText.length; index ++) {
	let c = parsedText[index];
	let out = c;
	if (c in preetiToMukdum) {
	    out = preetiToMukdum[c];  // only the character
	}
	mukdumOut.push(out);
    }
    return mukdumOut.join('');
}

langConverter.preeti2Unicode = function(intext) {
    const mukdum = langConverter.preeti2Mukdum(intext);
    const unicode = langConverter.mukdum2Unicode(mukdum);
    return unicode;
}


// From proposal
const bengali2SuzUnicodeMapping = {
'द': ['𑯀', 'DEVI'],
'ड': ['𑯀', 'DEVI'],
'त': ['𑯁', 'TASLA'],
'ट': ['𑯁', 'TASLA'],
'ए': ['𑯂', 'EKO'],
'इ': ['𑯃', 'IMAR'],
'ड़': ['𑯄', 'REU'],
'उ': ['𑯅', 'UTTHI'],
'क': ['𑯆', 'KIK'],
'म': ['𑯇', 'MAMA'],
'अ': ['𑯈', 'APPHO'],
'प': ['𑯉', 'PIP'],
'ग': ['𑯊', 'GIL'],
'ह': ['𑯋', 'HAMSO'],
'च': ['𑯌', 'CARMI'],
'न': ['𑯍', 'NAH'],
'ण': ['𑯍', 'NAH'],
'ब': ['𑯎', 'BUR'],
'ज': ['𑯏', 'JYAH'],
'ल': ['𑯐', 'LOACHA'],
'ओ': ['𑯑', 'OTTHI'],
'स': ['𑯜', 'SHYELE'],
'व': ['𑯓', 'VARCA'],
'य': ['𑯔', 'YAT'],
// 'ब': ['𑯕', 'AVA'], // ???
'आ': ['𑯖', 'AAL'],
'ड': ['𑯗', 'DONGA'],
'थ': ['𑯘', 'THARI'],
'फ': ['𑯙', 'PHAR'],
'ङ': ['𑯚', 'NGAR'],
'ख': ['𑯛', 'KHA'],
'श': ['𑯒', 'SHYER'],
'ष': ['𑯒', 'SHYER'],
'छ': ['𑯝', 'CHELAP'],
'ट': ['𑯞', 'TENTU'],
'ठ': ['𑯟', 'THELE'],
    'अ': ['𑯠', 'KLOKO'],
    'र': ['\ud806\udfc4', 'REUDI'],  // R
    'ु' : ['\ud806\udfc5', 'UTTHI'],  // U
    'े' : ['\ud806\udfc2', 'EKO'],  // E
    '्' : ['', ''],  // Virama
    'ो' : ['\ud806\udfd1', 'OTTHI'],
    'ि': ['\ud806\udfc3', 'IMAR'],
    'ी': ['\ud806\udfc3', 'IMAR'],
    'ा': ['\ud806\udfd6', 'AAL'],
    'भ': ['\ud806\udfce\ud806\udfcb', 'AAL'],
    'ः': [':', 'colon'],
    'ँ': ['\u0303', 'Combining tilde'],
};


const preetiChars =
      /cf\]|c\|cf|c|O|p|P|KjÞ|AjÞ|s\|v\|u\|r\|5\|h\|6\|7\|8\|t|y|b|g|k|m|a\|d\|o\|r\|n\|j\|z\|s;|x|./;

const preetiRegEx = new RegExp(preetiChars, "gi");

const preetiToMukdum = {
    'c': 'a',
    'cf': 'A',
    'O': 'i',
    'p': 'u',
    'P': 'e',
    'cf]': 'o',
    'KjÞ': 'P',
    'AjÞ': 'B',
    'c\\':'v',
    's\\':'k',
    'v\\':'K',
    'u\\':'g',
    'a\\':'N',
    'r\\':'c',
    '5\\':'C',
    'h\\':'j',
    '6\\':'q',
    '7\\':'Q',
    '8\\':'D',
    't':'t',
    'y':'T',
    'b':'d',
    'g':'n',
    'k':'p',
    'm':'f',
    'a\\':'b',
    'd\\':'m',
    'o\\':'y',
    'r\\':'r',
    'n\\':'l',
    'j\\':'w',
    'z\\':'S',
    's;':'s',
    'x': 'h'
};



langConverter.encoding_data = {
    'Mukdum': {index:0, outputEncoding:'PUA', outputScript:'Sunuwar'},
    'MukdumFinal': {index:0, outputEncoding:'PUA', outputScript:'Sunuwar'},
    'Kirat2': {index:1, outputEncoding:'PUA', outputScript:'Sunuwar'},
    'Kaatich1': {index:1, outputEncoding:'PUA', outputScript:'Sunuwar'},
    'Kirat1': {index:1, outputEncoding:'PUA', outputScript:'Sunuwar'},
    'Lonkuch': {index:1, outputEncoding:'PUA', outputScript:'Sunuwar'},
};

// Conversion to PUA
// Columsn for 'TikamuliPUA', 'Jenticha' to PUA
// 3rd column is Mukdum to Unicode
const private_use_map_combined = {
    '\u0030': ['\uec30', '\ued30', '\ud806\udff0'],
    '\u0031': ['\uec31', '\ued31', '\ud806\udff1'],
    '\u0032': ['\uec32', '\ued32', '\ud806\udff2'],
    '\u0033': ['\uec33', '\ued33', '\ud806\udff3'],
    '\u0034': ['\uec34', '\ued34', '\ud806\udff4'],
    '\u0035': ['\uec35', '\ued35', '\ud806\udff5'],
    '\u0036': ['\uec36', '\ued36', '\ud806\udff6'],
    '\u0037': ['\uec37', '\ued37', '\ud806\udff7'],
    '\u0038': ['\uec38', '\ued38', '\ud806\udff8'],
    '\u0039': ['\uec39', '\ued39', '\ud806\udff9'],
    '\u003a': ['\uec3a', '\ued27\uec35', '\u003a'],
    '\u003b': ['\uec3b', '\u003b', '\u003b'],
    '\u003c': ['\u003c', '\u003c', '\u003c'],
    '\u003d': ['=', '\u003d', '\u003d'],
    '\u003e': ['\uec3e', '\u003e', '\u003e'],
    '\u003f': ['?', '\ued25', '\u003f'],

    '\u0040': ['@', '\ued40',],
    '\u0041': ['\uec41', '\ued41', '\ud806\udfd6'],
    '\u0042': ['\uec42', '\ued42', '\ud806\udfd5'],
    '\u0043': ['\uec43', '\u0043', '\ud806\udfdd'],
    '\u0044': ['\uec44', '\u0044', '\ud806\udfd7'],
    '\u0045': ['\uec45', '\u0045', ],
    '\u0046': ['\uec46', '\u0046', ],
    '\u0047': ['\uec47', '\u0047', ],
    '\u0048': ['\uec48', '\u0048', ],
    '\u0049': ['\uec49', '\u0049', ],
    '\u004a': ['\uec4a', '\u004a', ],
    '\u004b': ['\uec4b', '\u004b', '\ud806\udfdb'],
    '\u004c': ['\uec4c', '\u004c', ],
    '\u004d': ['\uec4d', '\u004d', ],
    '\u004e': ['\uec4e', '\u004e', '\ud806\udfda'],
    '\u004f': ['\uec4f', '\u004f', ],

    '\u0050': ['\uec50', '\u0050', '\ud806\udfe1'],
    '\u0051': ['\uec51', '\u0051', '\ud806\udfdf'],
    '\u0052': ['\uec52', '\u0052', ],
    '\u0053': ['\uec53', '\u0053', '\ud806\udfdc'],
    '\u0054': ['\uec54', '\u0054', '\ud806\udfd8'],
    '\u0055': ['\uec55', '\u0055', ],
    '\u0056': ['\uec56', '\u0056', ],
    '\u0057': ['\uec57', '\ued57', '\ud806\udfd3'],
    '\u0058': ['\uec58', '\ued58', '\u0300'],  // High to low tone
    '\u0059': ['\uec59', '\ued59', ],
    '\u005a': ['\uec5a', '\ued5a', '\u030d'],
    '\u005e': ['\uec5a', '\ued5e', ],

    '\u0060': ['\u0060', '\ued60', ],
    '\u0061': ['\uec61', '\ued61', '\ud806\udfc8'],
    '\u0062': ['\uec62', '\ued62', '\ud806\udfce'],
    '\u0063': ['\uec64', '\ued63', '\ud806\udfcc'],
    '\u0064': ['\uec64', '\ued64', '\ud806\udfc0'],
    '\u0065': ['\uec65', '\ued65', '\ud806\udfc2'],
    '\u0066': ['\uec66', '\ued66', '\ud806\udfd9'],
    '\u0067': ['\uec67', '\ued67', '\ud806\udfca'],

    '\u0068': ['\uec68', '\ued68', '\ud806\udfcb'],
    '\u0069': ['\uec69', '\ued69', '\ud806\udfc3'],
    '\u006a': ['\uec6a', '\ued6a', '\ud806\udfdf'],
    '\u006b': ['\uec6b', '\ued6b', '\ud806\udfc6'],
    '\u006c': ['\uec6c', '\ued6c', '\ud806\udfd0'],
    '\u006d': ['\uec6d', '\ued6d', '\ud806\udfc7'],
    '\u006e': ['\uec6e', '\ued6e', '\ud806\udfcd'],
    '\u006f': ['\uec6f', '\ued6f', '\ud806\udfd1'],

    '\u0070': ['\uec70', '\ued70', '\ud806\udfc9'],
    '\u0071': ['\uec71', '\ued71', '\ud806\udfde'],
    '\u0072': ['\uec72', '\ued72', '\ud806\udfc4'],
    '\u0073': ['\uec73', '\ued73', '\ud806\udfd2'],
    '\u0074': ['\uec74', '\ued74', '\ud806\udfc1'],
    '\u0075': ['\uec75', '\ued75', '\ud806\udfc5'],
    '\u0076': ['\uec76', '\ued76', '\ud806\udfe0'],
    '\u0077': ['\uec77', '\ued77', '\ud806\udfd3'],
    '\u0078': ['\uec78', '\ued78', '\u0301'],       // Low to high tone
    '\u0079': ['\uec79', '\ued79', '\ud806\udfd4'],
    '\u007a': ['\uec7a', '\ued7a', '\u0303'],       // Combining tilde
    '\u007b': ['\u007b', '\ued7b', ],
    '\u007c': ['\u007c', '\ued7c', ],
    '\u007d': ['\u007d', '\ued7d', ],
    '\u007e': ['\u007e', '\ued7e', ],

    '\u00b2': ['\uecb2', '\u00b2', ],
    '\u00b3': ['\uecb3', '\u00b3', ],
    '\u00bc': ['\uec31/\uec34', '\u00bc', ],
    '\u00bd': ['\uec31/\uec32', '\u00bd', ],
    '\u00be': ['\uec33/\uec34', '\u00be', ],
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var start = inarea.selectionStart;
  // obtain the index of the last selected character
  var finish = inarea.selectionEnd;
  // obtain the selected text

  if (start != finish && finish != 0) {
    var intext = inarea.value.substring(start, finish);
  } else {
    // Otherwise, the whole text.
    var intext = inarea.value;
  }

  var newText = convertEncoding(intext, encodingIndex);
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
};

function convertEncoding(intext, encodingIndex) {
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    var out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
	if (result == '\u0000') {
          out = '';
        } else {
	out = result;
        }
      }
    }
    outtext += out;
  }

  // Insert more complex replacements here.
  var newText = outtext;

  // Fix AA sign before letter to O sign
  // pattern = /\uec26([\uec00-\uec23])/gi;
  // replace = "\uec28$1";
  // newText = outtext.replace(pattern, replace);
  // outtext = newText;

  return outtext;
};


// Things to test when a change is made.
// TODO: Add tests for different encoding indices.
var  regression_tests = [
    ];

// TODO: add details about the test failure. Add encoding index, too.
function regression(encodingIndex) {
   // test each of these
   var passing = 0;
   for (var i=0; i < regression_tests.length; i++) {
     var result = convertEncoding(regression_tests[i][0], encodingIndex);
     if (result != regression_tests[i][1]) {
       alert("test " + i + " fails!\r" + regression_tests[i][1] + "  Expected"+
       "\r" +
        result + "  Actual");
     } else {
       passing ++;
     }
   }
   alert(passing + " tests pass out of " + regression_tests.length);
 }
