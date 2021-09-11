// Mappings for Georgian script to Latin for Caucasian languages
// ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ — « »
// a b g d e v z t i k' l m n o p' zh r s t' u p k gh q sh ch ts dz ts' ch' kh j h — « »
// https://translit.cc/ge/


let langConverter = function() {
  this.langCode = 'xmf';
  this.langName = 'Mingrelian';
};

langConverter.prototype.translitInfo = function() {
  return (map_translit_output, map_translit_sources, private_use_map_combined);
}

// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2

// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet
// Mkhedruli     Transliteration IPA transcription
const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];

const map_translit_sources = [
    "// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet",
    "// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2",
    "// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet",
];

const private_use_map_combined = {
    "ა": ["a", "a", "ɑ"],
    "ბ": ["b", "b", "b"],
    "გ": ["g", "g", "ɡ"],
    "დ": ["d", 'd', "d"],
    "ე": ["e", 'e', "ɛ"],
    "ვ": ["v", 'v', "v"],
    "ზ": ["z", 'z', "z"],
    "თ": ["t", 't', "t"],
    "ი": ["i", 'i', "i"],
    "კ": ["ǩ", 'ḳ', "kʼ"],
    "ლ": ["l", 'l', "l"],
    "მ": ["m", "m", "m"],
    "ნ": ["n", 'n', "n"],
    "ჲ": ["y", "j"],
    "ო": ["o", 'o', "ɔ"],
    "პ": ["p̌", 'p\'', "pʼ"],
    "ჟ": ["Ⱬ", 'ǯ', "ʒ"],  // j as alternative
    "რ": ["r", 'r', "r"],
    "ს": ["s", 's', "s"],
    "ტ": ["t̆", 'ṭ', "tʼ"],
    "უ": ["u", 'u', "u"],
    "ჷ": ["ƨ", "ə"],
    "ფ": ["p", 'p', "p"],
    "ქ": ["k", 'k', "k"],
    "ღ": ["ɣ", "ɣ"],
    "ყ": ["ɥ", 'gh', "qʼ"],
    "ჸ": ["ꞇ", "ʔ"],
    "შ": ["ş", 'š', "ʃ"],
    "ჩ": ["ç", 'č', "t͡ʃ"],
    "ც": ["ʒ", 'c', "t͡s"],  // ts as alternative
    "ძ": ["ž", "d͡z"],
    "წ": ["ǯ", 'ts\'', "t͡sʼ"], // tz as alternative
    "ჭ": ["ç̌", "t͡ʃʼ"],
    "ხ": ["x", 'x', "x"],
    "ჯ": ["ʤ", 'j', "d͡ʒ"],
    "ჰ": ["h", 'h', "h"],
    'აა': ['aa', 'ā', "ɑɑ"],
};

langConverter.prototype.decodingInfo = function() {
  return (map_translit_output, map_translit_sources, encoding_lookup);
}
// For font AkolkhetyN to Georgian Unicode.
const encoding_names = [['Akolkhety', 'Unicode']];
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
const georSample = `
აჟამ ჟიუშთი დო ჟინუა ნჟილაგარიში არიკი ართი ქევანას ცხოვრენც აჟამ ჟიუშთი
დო მაჟირას ჟინუა ნჟილაგარი. ათე ჟინუა ნჟილაგარი ორე თინერი კოჩი, მუდგას
მეჩანს კოცნი მუში სიცოხლეს ვეუაფე თინა ქაატუას, ოკო გინაგაფუას. აჟამ
ჟიუშთი ორე თინერი - მუთუნს ვემეჩანს კოცს. ქეშეხვადეს თენენქ ართიანს.`;

const latnSample = `
aǯam ǯiušti do ǯinua nǯilagariši ariḳi arti kevanas cxovrenc aǯam ǯiušti
do mažiras ǯinua nǯilagari. ate ǯinua nǯilagari ore tineri ḳoči, mudgas
mečans ḳocni muši sicoxles ve՚uape tina kāṭuas, oḳo ginagapuas. aǯam
ǯiušti ore tineri - mutuns vemečans ḳocs. kešexvades tenenk artians.`;


function toLower(instring) {
  // If code in range 13a0-1eef, add ab70-13a0
  // If code in range 1ef0-1ef5, add 8
  return instring.toLowerCase();  // Check if this actually works for CHR.
}

// TODO: Finish connecting these
langConverter.prototype.transliterate = function() {
}

langConverter.prototype.toUnicode = function() {
}

function transliterate(inbox, outbox, tranlitIndex) {
  transformText(inbox, outbox, private_use_map_combined, encodingIndex);
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  transformText(inbox, outbox, encoding_lookup, encodingIndex);
}

function transformText(inbox, outbox, transformer, encodingIndex) {
  const inarea = document.getElementById(inbox);
  const outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  const intext = inarea.value;
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

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
