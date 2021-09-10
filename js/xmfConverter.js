// Mappings for Georgian script to Latin for Caucasian languages
// ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ — « »
// a b g d e v z t i k' l m n o p' zh r s t' u p k gh q sh ch ts dz ts' ch' kh j h — « »
// https://translit.cc/ge/

// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2

// https://en.wikipedia.org/wiki/Mingrelian_language#Alphabet
// Mkhedruli     Transliteration IPA transcription
const map_encoding_names = ['Latin', 'Latin', 'IPA'];

const sources = [
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
//  '\u0020': [' '],
//  'პ': "p'",
//};

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

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  const inarea = document.getElementById(inbox);
  const outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  const intext = inarea.value;
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    out = c;
    if (c in private_use_map_combined) {
      // Only one mapping is implemented as of 25-Oct-2019
      var result = private_use_map_combined[c][encodingIndex];
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
