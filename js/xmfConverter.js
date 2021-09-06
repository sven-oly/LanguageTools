// Mappings for Georgian script to Latin for Caucasian languages
// ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ — « »
// a b g d e v z t i k' l m n o p' zh r s t' u p k gh q sh ch ts dz ts' ch' kh j h — « »
// https://translit.cc/ge/

// https://www.oxfordhandbooks.com/view/10.1093/oxfordhb/9780190690694.001.0001/oxfordhb-9780190690694-appendix-2
const map_encoding_names = [
  'Georgian', 'Latin'];

const private_use_map_combined = {
  '\u0020': [' '],
  'ა': 'a',
  'ბ': 'b',
  'ჟ': 'ǯ',
  'მ': 'm',
  'ი': 'i',
  'შ': 'š',
  'უ': 'u',
  'თ': 't',
  'დ': 'd',
  'ო': 'o',
  'ნ': 'n',
  'ლ': 'l',
  'რ': 'r',
  'გ': 'g',
  'კ': 'ḳ',
  'ქ': 'k',
  'ს': 's',
  'ც': 'c',
  'ჩ': 'č',
  'ე': 'e',
  'ხ': 'x',
  'აა': 'ā',
  'ტ': 'ṭ',
  'ფ': 'p',
  'ზ': 'z',
  'ვ': 'v',
  'წ': "ts'",
  'ყ': 'gh',
  'ჰ': 'h',
  'ჯ': 'j',
  'პ': "p'",
    // TODO: Sort these.
  // ...
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
      var result = private_use_map_combined[c];  // [encodingIndex];
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
