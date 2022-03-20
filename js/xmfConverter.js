// Mappings for Georgian script to Latin for Caucasian languages
// https://translit.cc/ge/
const langConverter = new langConverterClass('xmf', 'Latn');

let langConvertClass = function() {
  this.langCode = 'xmf';
  this.langName = 'Mingrelian';

  // Each element includes input, output, and compute options.
  this.transforms = [
    {input: 'Unicode Georgian', output:'Unicode Latin',
      'compute': this.Georgian2Latin},
    {input: 'ASCII Georgian', output:'Unicode Georgian',
      'compute': langConvertClass.prototype.ascii2Georgian},
    {input: 'ASCII Georgian', output:'Unicode Latin',
      'compute': this.ascii2Latin},
    {input: 'Unicode Georgian', output:'1930s Unicode Latin',
      'compute': this.Georgian2Latin1930},
        ];
};

// Entries for several different transliteration schemes from Georgian
// to Latin
// The 4th column is that used by keyboards in the 1930s

const private_use_map_combined = {
    "ა": ["a", "a", "ɑ", "a"],
    "ბ": ["b", "b", "b", "b"],
    "გ": ["g", "g", "ɡ", "g"],
    "დ": ["d", 'd', "d", "d"],
    "ე": ["e", 'e', "ɛ", "e"],
    "ვ": ["v", 'v', "v", "v"],
    "ზ": ["z", 'z', "z", "z"],
    "თ": ["t", 't', "t", "t"],
    "ი": ["i", 'i', "i", "i"],
    "კ": ["ǩ", 'ḳ', "kʼ", "k"],
    "ლ": ["l", 'l', "l", "l"],
    "მ": ["m", "m", "m", "m"],
    "ნ": ["n", 'n', "n", "n"],
    "ჲ": ["y", "j", "y", "y"],
    "ო": ["o", 'o', "ɔ", "o"],
    "პ": ["p̌", 'p\'', "pʼ", "p"],
    "ჟ": ["Ⱬ", 'ǯ', "ʒ", "ⱬ"],  // j as alternative
    "რ": ["r", 'r', "r", "r"],
    "ს": ["s", 's', "s", "s"],
    "ტ": ["t̆", 'ṭ', "tʼ", "ṫ"],
    "უ": ["u", 'u', "u", "u"],
    "ჷ": ["ƨ", "ə", "", "ƨ"],
    "ფ": ["p", 'p', "p", "f"],
    "ქ": ["k", 'k', "k", "q"],
    "ღ": ["ɣ", "ɣ", "", "gh"],
    "ყ": ["ɥ", 'gh', "qʼ", "ɣ"],
    "ჸ": ["ꞇ", "ʔ", "", "ꞇ"],
    "შ": ["ş", 'š', "ʃ", "sh"],
    "ჩ": ["ç", 'č', "t͡ʃ", "ch"],
    "ც": ["ʒ", 'c', "t͡s", "c"],  // ts as alternative
    "ძ": ["ž", "d͡z", "", "dz"],
    "წ": ["ǯ", 'ts\'', "t͡sʼ", "ʒ"], // tz as alternative
    "ჭ": ["ç̌", "t͡ʃʼ", "çh", "çh"],
    "ხ": ["x", 'x', "x", "x"],
    "ჯ": ["ʤ", 'j', "d͡ʒ", "j"],
    "ჰ": ["h", 'h', "h", "h"],
    'აა': ['aa', 'ā', "ɑɑ", "aa"],
};

// The object returned.

langConvertClass.prototype.getTransforms = function() {
    return this.transforms;
}

langConvertClass.prototype.getLangCode = function() {
  return this.langCode;
}

langConvertClass.prototype.translitInfo = function() {
  return [translit_source,
          map_translit_output,
          map_translit_sources,
          private_use_map_combined];
}

// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2

// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet
// Mkhedruli     Transliteration IPA transcription
const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];
const translit_source = 'Georgian';

const map_translit_sources = [
    "// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet",
    "// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2",
    "// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet",
];

langConvertClass.prototype.decodingInfo = function() {
}

langConvertClass.prototype.getTransforms = function() {
    return this.transforms;
}

langConvertClass.prototype.translitInfo = function() {
  return [translit_source,
          map_translit_output,
          map_translit_sources,
          this.private_use_map_combined];
}

langConverter.encoding_data = {
    'akolkhn': {index:0, outputEncoding:'Unicode', outputScript:'Latin'},
    'AcadMtavr': {index:1, outputEncoding:'Unicode', outputScript:'Latin'},
    'LitNusx': {index:2, outputEncoding:'Unicode', outputScript:'Latin'},
    'LitNusx': {index:2, outputEncoding:'Unicode', outputScript:'Latin'},
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

langConvertClass.prototype.decodingInfo = function() {
  return encoding_data;
}

// Font encoding information.
// Map by font name, index in lookup table, output encoding, output scrit. AkolkhetyN to Georgian Unicode.
const encoding_data = {
    'Akolkhety': [0, 'Unicode', 'Georgian'],
    'AcadMtavr': [0, 'Unicode', 'Georgian'],
    'LitNusx': [0, 'Unicode', 'Georgian'],
    };
const encoding_lookup = {
    '\u0021': ['!'],
    '\u0022': ['\"'],
    '\u0023': ['#'],
    '\u0024': ['$'],
    '\u0025': ['%'],
    '\u0026': [''],
    '\u0027': ['\''],
    '\u0028': ['('],
    '\u0029': [')'],
    '\u002a': ['*'],
    '\u002b': ['+'],
    '\u002c': [','],
    '\u002d': ['-'],
    '\u002e': ['.'],
    '\u002f': ['/'],
    '\u0030': ['\u09e6'],
    '\u0031': ['\u09e7'],
    '\u0032': ['\u09e8'],
    '\u0033': ['\u09e9'],
    '\u0034': ['\u09ea'],
    '\u0035': ['\u09eb'],
    '\u0036': ['\u09ec'],
    '\u0037': ['\u09ed'],
    '\u0038': ['\u09ee'],
    '\u0039': ['\u09ef'],
    '\u0040': ['\u201D'],
    '\u0041': ['A'],
    '\u0042': ['B'],
    '\u0043': ['\u10e9'],
    '\u0044': ['D'],
    '\u0045': ['E'],
    '\u0046': ['\u10f6'],
    '\u0047': ['\u10e9'],
    '\u0048': ['\u10f1'],
    '\u0049': ['I'],
    '\u004a': ['\u10df'],
    '\u004b': ['\u10f3'],
    '\u004c': ['\u10f7'],
    '\u004d': ['M'],
    '\u004e': ['N'],
    '\u004f': ['\u10f5'],

    '\u0050': ['\u10f4'],
    '\u0051': ['\u10f8'],
    '\u0052': ['\u10e6'],
    '\u0053': ['\u10e8'],
    '\u0054': ['\u10d7'],
    '\u0055': ['\u10e3\u030c'],  // Combining caron
    '\u0056': ['V'],
    '\u0057': ['\u10ed'],
    '\u0058': ['X'],
    '\u0059': ['\u10f2'],
    '\u005a': ['\u10eb'],
    '\u0060': ['\u201E'],
    '\u0061': ['\u10d0'],
    '\u0062': ['\u10d1'],
    '\u0063': ['\u10ea'],
    '\u0064': ['\u10d3'],
    '\u0065': ['\u10d4'],
    '\u0066': ['\u10e4'],
    '\u0067': ['\u10d2'],
    '\u0068': ['\u10f0'],
    '\u0069': ['\u10d8'],
    '\u006a': ['\u10ef'],
    '\u006b': ['\u10d9'],
    '\u006c': ['\u10da'],
    '\u006d': ['\u10db'],
    '\u006e': ['\u10dc'],
    '\u006f': ['\u10dd'],

    '\u0070': ['\u10de'],
    '\u0071': ['\u10e5'],
    '\u0072': ['\u10e0'],
    '\u0073': ['\u10e1'],
    '\u0074': ['\u10e2'],
    '\u0075': ['\u10e3'],
    '\u0076': ['\u10d5'],
    '\u0077': ['\u10ec'],
    '\u0078': ['\u10ee'],
    '\u0079': ['\u10e7'],
    '\u007a': ['\u10d6'],
    '\u00a1': ['\u10f2'],
    '\u00a2': ['\u10f3'],
    '\u00a3': ['\u10f4'],
    '\u00a5': ['\u10f5'],
    };

// Source of the data below: https://omniglot.com/writing/mingrelian.htm
const georSample =
`აჟამ ჟიუშთი დო ჟინუა ნჟილაგარიში არიკი ართი ქევანას ცხოვრენც აჟამ ჟიუშთი
დო მაჟირას ჟინუა ნჟილაგარი. ათე ჟინუა ნჟილაგარი ორე თინერი კოჩი, მუდგას
მეჩანს კოცნი მუში სიცოხლეს ვეუაფე თინა ქაატუას, ოკო გინაგაფუას. აჟამ
ჟიუშთი ორე თინერი - მუთუნს ვემეჩანს კოცს. ქეშეხვადეს თენენქ ართიანს.`;

const latnSample =
`aǯam ǯiušti do ǯinua nǯilagariši ariḳi arti kevanas cxovrenc aǯam ǯiušti
do mažiras ǯinua nǯilagari. ate ǯinua nǯilagari ore tineri ḳoči, mudgas
mečans ḳocni muši sicoxles ve՚uape tina kāṭuas, oḳo ginagapuas. aǯam
ǯiušti ore tineri - mutuns vemečans ḳocs. kešexvades tenenk artians.`;


function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

// TODO: Finish connecting these

langConvertClass.prototype.ascii2Georgian = function(text_in) {
    const encodingIndex = 0;
    return transformText(text_in, encoding_lookup, encodingIndex);
}

langConvertClass.prototype.ascii2Latin = function(text_in) {
    const encodingIndex = 0;
    const georgianOut = transformText(text_in, encoding_lookup, encodingIndex);
    return transformText(georgianOut, private_use_map_combined, encodingIndex);
}

langConvertClass.prototype.Georgian2Latin = function(text_in) {
    const encodingIndex = 0;
    return transformText(text_in, private_use_map_combined, encodingIndex);
}

// Implementation of 1930s style transliteration from Georgian into
// Latin script. Includes sentence capitalization.
langConvertClass.prototype.Georgian2Latin1930 = function(text_in, option, langCode) {
    // TODO: Implement this version.
    const encodingIndex = 3;
    const lowerText = transformText(text_in, private_use_map_combined, encodingIndex);
    return langConverter.capitalizeSentence(lowerText, langCode);
}

langConverter.transforms = [
    {input: 'ASCII Georgian', output:'Unicode Georgian',
     compute: langConvertClass.prototype.ascii2Georgian},
    {input: 'ASCII Georgian', output:'Unicode Latin',
      compute: langConvertClass.prototype.ascii2Latin},
    {input: 'Unicode Georgian', output:'Unicode Latin',
      compute: langConvertClass.prototype.Georgian2Latin},
    {input: 'Unicode Georgian', output:'Unicode Latin 1930s',
      compute: langConvertClass.prototype.Georgian2Latin1930},
];

langConvertClass.prototype.transliterate = function() {
}

langConvertClass.prototype.toUnicode = function() {
}

function transliterate(inbox, outbox, tranlitIndex) {
  transformText(inbox, outbox, private_use_map_combined, encodingIndex);
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  transformTextBox(inbox, outbox, encoding_lookup, encodingIndex);
}

function transformTextBox(inbox, outbox, transformer, encodingIndex) {
  const inarea = document.getElementById(inbox);
  const outarea = document.getElementById(outbox);
  const intext = inarea.value;
  const newText = transformText(intext, transformer, encodingIndex);

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
}

function transformText(intext, transformer, encodingIndex) {
  // First, replace all single characters with their Unicode equivalents.
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    out = c;
    if (c in transformer) {
      // Only one mapping is implemented as of 25-Oct-2019
      var result = transformer[c][encodingIndex];
      if (result) {
	out = result;
      }
    }
    outtext += out;
  }

  // Insert more complex replacements here.
  var newText = outtext;

  return newText;
}
