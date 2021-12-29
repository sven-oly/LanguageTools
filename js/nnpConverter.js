const langConverter = new langConverterClass('nnp', 'Wancho');

// Mappings for Wancho
langConverter.map_encoding_names = map_encoding_names = [
  'Wancho'];

langConverter.encoding_data = {
    'WanchoDipangkar': {index:0, outputEncoding:'Unicode', outputScript:'Wancho'},
};

private_use_map_combined = {
  '\u0024':  ['\ud838\udeFF'],
  'a':  ['\ud838\udeC0'],
  'A':  ['\ud838\udeC1'],
  'b':  ['\ud838\udeC2'],
  'c':  ['\ud838\udeC3'],
  'd':  ['\ud838\udeC4'],
  'g':  ['\ud838\udeC5'],
  'y':  ['\ud838\udeC6'],
  'P':  ['\ud838\udeC7'],
  'l':  ['\ud838\udeC8'],
  'n':  ['\ud838\udeC9'],
  'p':  ['\ud838\udeCA'],
  't':  ['\ud838\udeCB'],
  'T':  ['\ud838\udeCC'],
  'f':  ['\ud838\udeCD'],
  's':  ['\ud838\udeCE'],
  'S':  ['\ud838\udeCF'],
  'j':  ['\ud838\udeD0'],
  'J':  ['\ud838\udeD1'],
  'w':  ['\ud838\udeD2'],
  'v':  ['\ud838\udeD3'],
  'k':  ['\ud838\udeD4'],
  'o':  ['\ud838\udeD5'],
  'O':  ['\ud838\udeD6'],
  'r':  ['\ud838\udeD7'],
  'm':  ['\ud838\udeD8'],
  'K':  ['\ud838\udeD9'],
  'h':  ['\ud838\udeDA'],
  'e':  ['\ud838\udeDB'],
  'i':  ['\ud838\udeDC'],
  'G':  ['\ud838\udeDD'],
  'u':  ['\ud838\udeDE'],
  'L':  ['\ud838\udeDF'],
  'C':  ['\ud838\udeE0'],
  'R':  ['\ud838\udeE1'],
  'N':  ['\ud838\udeE2'],
  'z':  ['\ud838\udeE3'],
  'Z':  ['\ud838\udeE4'],
  'I':  ['\ud838\udeE5'],
  'H':  ['\ud838\udeE6'],
  'E':  ['\ud838\udeE7'],
  'M':  ['\ud838\udeE8'],
  'Y':  ['\ud838\udeE9'],
  'U':  ['\ud838\udeEA'],
  'x':  ['\ud838\udeEB'],
  '`':  ['\ud838\udeEC'],
  '~':  ['\ud838\udeED'],
  'q':  ['\ud838\udeEE'],
  'Q':  ['\ud838\udeEF'],
  '0':  ['\ud838\udeF0'],
  '1':  ['\ud838\udeF1'],
  '2':  ['\ud838\udeF2'],
  '3':  ['\ud838\udeF3'],
  '4':  ['\ud838\udeF4'],
  '5':  ['\ud838\udeF5'],
  '6':  ['\ud838\udeF6'],
  '7':  ['\ud838\udeF7'],
  '8':  ['\ud838\udeF8'],
  '9':  ['\ud838\udeF9'],
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);

function toLower(instring) {
  return instring.toLowerCase();
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var intext = inarea.value;
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
