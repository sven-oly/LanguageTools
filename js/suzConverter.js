// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Sunuwar font encodings
var map_encoding_names = [
  'TikamuliPUA', 'JentichaPUA'];

// Conversion to PUA
var private_use_map_combined = {
    '\u0021': ['', '\uec29\uec2d'],
    '\u0022': ['', '\uec29\uec2e'],
    '\u0023': ['', '\uec29\uec2f'],
    '\u0024': ['', '\uec29\uec30'],
    '\u0025': ['', '\uec29\uec31'],
    '\u0026': ['', '\uec29\uec32'],
    '\u0027': ['\uaa89', '\uec29\uec33'],
    '\u0028': ['', '\uec2d\uec36'],
    '\u0029': ['\uec25', '\uec2e\uec36'],
    '\u002a': ['\uec24', '\uec2f\uec36'],
    '\u002b': ['\uec36', '\uec30\uec36'],
    '\u002c': ['', '\uec25'],
    '\u002d': ['??', '\uec31\uec36'],
    '\u002e': ['\uaabb', '\uec3f'],
    '\u002e': ['\uaa8c', '\uec3f'],
    '\u0030': ['\uec30', '\uec40'],
    '\u0031': ['\uec31', '\uec31'],
    '\u0032': ['\uec32', '\uec32'],
    '\u0033': ['\uec33', '\uec33'],
    '\u0034': ['\uec34', '\uec34'],
    '\u0035': ['\uec35', '\uec35'],
    '\u0036': ['\uec36', '\uec36'],
    '\u0037': ['\uec37', '\uec37'],
    '\u0038': ['\uec38', '\uec38'],
    '\u0039': ['\uec39', '\uec39'],
    '\u003a': ['\uec3a', '\uec27\uec35'],
    '\u003b': ['\uec3b', '\uec37'],
    '\u003c': ['\u003c', '\uec25'],
    '\u003d': ['=', '\uec25'],
    '\u003e': ['\uec3e', '\uec25'],
    '\u003f': ['?', '\uec25'],

    '\u0040': ['@', '\uec32\uec36'],
    '\u0041': ['\uec41', '\uec23'],
    '\u0042': ['\uec42', '\uec31'],
    '\u0043': ['\uec43', '\uec47'],
    '\u0044': ['\uec45', '\uec33'],
    '\u0045': ['\uec46', '\uec14'],
    '\u0046': ['\uec47', '\uec12'],
    '\u0047': ['\uec48', '\uec45'],
    '\u0048': ['\uec49', '\uec1e'],
    '\u0049': ['\uec4a', '\uec15'],
    '\u004a': ['\uec4b', '\uec49'],
    '\u004b': ['\uec4c', '\uec42'],
    '\u004c': ['\uec4d', '\uec2f'],
    '\u004d': ['\uec4e', '\uec2e'],
    '\u004e': ['\uec10', '\uec30'],
    '\u004f': ['\uec11', '\uec26'],

    '\u0050': ['\uec13', '\uec10'],
    '\u0051': ['\uec15', '\uec18'],
    '\u0052': ['\uec17', '\uec32'],
    '\u0053': ['\uec18', '\uec21'],
    '\u0054': ['\uec19', '\uec0b'],
    '\u0055': ['\uec1a', '\uec2b'],
    '\u0056': ['\uec1b', '\uec35'],
    '\u0057': ['\uec1c', '\uec01'],
    '\u0058': ['\uec1d', '\uec2d'],
    '\u0059': ['\uec1f', '\uec0f'],
    '\u005a': ['\uec21', '\uec34'],
    '\u005b': ['\uec2d', '\u0000'],
    '\u005c': ['\uec37', '\u0000'],
    '\u005d': ['\uec35', '\u0000'],
    '\u005e': ['', '\uec33\uec36'],
    '\u005f': ['\uec33', '\uec36'],

    '\u0061': ['\uec41', '\uec28'],
    '\u0062': ['\uec28', '\uec13'],
    '\u0063': ['\uec26', '\uec06'],
    '\u0064': ['\uec27', '\uec0c'],
    '\u0065': ['\uec36', '\uec2c'],
    '\u0066': ['\uec29', '\uec11'],
    '\u0067': ['\uec2a', '\uec03'],

    '\u0068': ['\uec2b', '\uec1d'],
    '\u0069': ['\uec2c', '\uec27'],
    '\u006a': ['\uec34', '\uec08'],
    '\u006b': ['\uec20', '\uec00'],
    '\u006c': ['\uec22', '\uec1c'],
    '\u006d': ['\uec01?', '\uec15'],
    '\u006e': ['\uec04', '\uec0d'],
    '\u006f': ['\uec01?', '\uec29'],

    '\u0070': ['\uec12', '\uec0e'],
    '\u0071': ['\uec14', '\uec17'],
    '\u0072': ['\uec1e', '\uec1b'],
    '\u0073': ['\uec16', '\uec20'],
    '\u0074': ['\uec4d', '\uec0a'],
    '\u0075': ['\uec4e', '\uec2a'],
    '\u0076': ['\uec4f', '\uec1f'],
    '\u0077': ['\uec23', '\uec22'],
    '\u0078': ['', '\uec04'],
    '\u0079': ['', '\uec1a'],
    '\u007a': ['', '\uec19'],
    '\u007b': ['\uec2d', '\uec19'],

    '\u00c0': ['', '\uec00\uec24'],
    '\u00c1': ['', '\uec02\uec24'],
    '\u00c2': ['', '\uec03\uec24'],
    '\u00c3': ['', '\uec0a\uec24'],
    '\u00c4': ['', '\uec0b\uec24'],
    '\u00c5': ['', '\uec0c\uec24'],
    '\u00c8': ['', '\uec0e\uec24'],
    '\u00c9': ['', '\uec10\uec24'],
    '\u00ca': ['', '\uec11\uec24'],
    '\u00cb': ['', '\uec13\uec24'],
    '\u00cc': ['', '\uec15\uec24'],
    '\u00cd': ['', '\uec16\uec24'],
    '\u00ce': ['', '\uec1c\uec24'],
    '\u00cf': ['', '\uec1d\uec24'],

    '\u00d2': ['', '\uec1f\uec24'],
    '\u00d3': ['', '\uec01\uec24'],
    '\u00d4': ['', '\uec04\uec24'],
    '\u00d5': ['', '\uec0f\uec24'],
    '\u00d6': ['', '\uec12\uec24'],
    '\u00d9': ['', '\uec13\uec24'],
    '\u00da': ['', '\uec15\uec24'],
    '\u00db': ['', '\uec1e\uec24'],
    '\u00dc': ['', '\uec23\uec24'],
    '\u00dd': ['', '\uec00\uec25'],

    '\u00e0': ['', '\uec03\uec25'],
    '\u00e1': ['', '\uec05\uec25'],
    '\u00e2': ['', '\uec1e\uec25'],
    '\u00e3': ['', '\uec11\uec25'],
    '\u00e4': ['', '\uec13\uec25'],
    '\u00e5': ['', '\uec15\uec25'],
    '\u00e8': ['', '\uec1d\uec25\uec24 '],
    '\u00e9': ['', '\uec00\uec25\uec24'],
    '\u00ea': ['', '\uec04\uec25\uec24'],
    '\u00eb': ['', '\uec05\uec25\uec24'],
    '\u00ec': ['', '\uec0e\uec25\uec24'],
    '\u00ed': ['', '\uec11\uec25\uec24'],
    '\u00ee': ['', '\uec13\uec25\uec24'],
    '\u00ef': ['', '\uec15\uec25\uec24'],

    '\u00f2': ['', '\uec1d\uec25\uec24'],
    '\u00f3': ['', '\uec21\uec25\uec24'],
};


function toLower(instring) {
  return instring.toLowerCase();
}

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
  pattern = /\uec26([\uec00-\uec23])/gi;
  replace = "\uec28$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Fix left modifiers before space
  pattern = /([\uec27-\uec29\uec34-\uec35]+)(u0020)/gi;
  replace = "$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Fix right letters after space before comma
  pattern = /(\u0020)([\uec24-\uec26]+)(\u002c)/gi;
  replace = "$2$3";
  newText = outtext.replace(pattern, replace);
  outtext = newText;
  // Fix right letters after space
  pattern = /(\u0020)([\uec24-\uec26]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move left diacritics to right of letter
  pattern = /([\uec27-\uec29\uec34-\uec35]+)([\uec00-\uec23\uec4d-\uec4f])/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move first group left side diacritics to left of others
  pattern = /([\uec26-\uec36]+)([\uec24\uec25\uec37]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move next group
  pattern = /([\uec26\uec2a-\uec36]+)([\uec27-\uec29\u]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move next group left side diacritics to left of others
  pattern = /([\uec26\uec2d-\uec36]+)([\uec2a-\uec2c]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Move next group left side diacritics to left of others
  pattern = /([\uec2d-\uec36]+)([\uec26]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Repeat: move first group left side diacritics to left of others
  pattern = /([\uec26-\uec36]+)([\uec24\uec25\uec37]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // 1c35 < 1c32
  pattern = /([\uec32-\uec33\uec36\uec37]+)([\uec34-\uec35]+)/gi;
  replace = "$2$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  // Fix diacritics after space.
  pattern = /\u0020([\uec24-\uec2f\uec31\uec33])/gi;
  replace = "$1";
  newText = outtext.replace(pattern, replace);
  outtext = newText;

  return outtext;
};


// Things to test when a change is made.
// TODO: Add tests for different encoding indices.
var  regression_tests = [
    ["AcUgkc ]W&cAc Zi:]kh ]Igk>cVi:* dY[cZ.",
     "ᰀᰚᰨᰪᰠᰦ ᰜᰤᰵᰀᰨᰦ ᰡᰬᰮᰠᰫᰵ ᰊᰪᰵᰠᰰᰛᰤᰨᰬᰮ ᰟᰧᰭᰡᰨ."],
    ["dH>a QdH>, W[g A_c, dPeCh Hi_, dX[ k: ), IdC\\e)",
     "ᰉᰧᰰᰶ ᰕᰉᰧᰰ, ᰜᰪᰭ ᰀᰦᰳ, ᰓᰧᰶᰃᰫ ᰉᰬᰳ, ᰝᰧᰭ ᰠᰥᰮ, ᰊᰃ᰷ᰥᰧᰶ"],
    ["OdWe, dWe ODh, AfA[&Ji< ODh k]dVe, fC&A_c WccY.",
      "ᰑᰜᰧᰶ, ᰜᰧᰶ ᰑᰅᰫ, ᰀᰀᰤᰩᰭᰋᰬᰱ ᰑᰅᰫ ᰠᰛᰧᰵᰶ, ᰃᰤᰩᰀᰦᰳ ᰜᰦᰟᰨ."],
     ["]fEWc, V*hWc, V:*cWc, fT[Wc, kJcWc, wcjW,",
       "ᰆᰩᰵᰜᰦ, ᰛᰤᰫᰜᰦ, ᰛᰤᰮᰜᰨᰦ, ᰙᰩᰭᰜᰦ, ᰠᰋᰜᰨᰦ, ᰣᰦᰜᰴ,"],
     ["I[aWc, wccW>, kPc, cwdPe, wfP_ wcViIi_",
      "ᰊᰭᰶᰜᰦ, ᰣᰦᰜᰨᰰ, ᰠᰓᰦ, ᰣᰨᰓᰧᰶ, ᰣᰓᰩᰳ ᰣᰛᰨᰬᰊᰬᰳ"],
      ["I[aWc, wccW>, kPc, cwdPe, wfP_ wcViIi_",
      "ᰊᰭᰶᰜᰦ, ᰣᰦᰜᰨᰰ, ᰠᰓᰦ, ᰣᰨᰓᰧᰶ, ᰣᰓᰩᰳ ᰣᰛᰨᰬᰊᰬᰳ"],
      ["(]fA&k:c), (A\\)h OdWe ), (wcY?c), (wecY;), (A<\\)hdGe ), (dMVcdC\\)), A?g, I[gfL:, cdC\\)), MV.",
      "(ᰀᰤᰩᰵᰠᰥᰦᰮ, (ᰀ᰷ᰥᰫ ᰑᰜᰥᰧᰶ, (ᰣᰟᰥᰨᰦᰲ, (ᰣᰶᰟᰥᰨᰯ, (ᰀ᰷ᰥᰫᰱᰈᰥᰧᰶ, (ᰎᰧᰛᰦᰃ᰷ᰥᰥᰧ, ᰀᰪᰲ, ᰊᰪᰭᰍᰩᰮ,ᰦ ᰃ᰷ᰥᰥᰧ, ᰎᰛ."],
      ["wcJ[&c, wcdQ[, wccA, wc]cJ, IfP[, A?gCh, I[gM:h, I[gI[h, I[gfL:, ]dI]dCe,I[gdZ:, AgfG:, wfH?, wcdY[.",
        "ᰣᰋᰤᰨᰦᰭ, ᰣᰦᰕᰧᰭ, ᰣᰦᰀᰨ, ᰣᰦᰋᰨᰵ, ᰊᰓᰩᰭ, ᰀᰪᰲᰃᰫ, ᰊᰪᰭᰎᰫᰮ, ᰊᰪᰭᰊᰫᰭ, ᰊᰪᰭᰍᰩᰮ, ᰊᰧᰵᰃᰧᰵᰶ,ᰊᰪᰭᰡᰧᰮ, ᰀᰪᰈᰩᰮ, ᰣᰉᰩᰲ, ᰣᰦᰟᰧᰭ."],
      ["XicW, XcU, CgC\\) fQ?]dLe.",
        "ᰝᰬᰜᰨ, ᰝᰚᰨ, ᰃᰪᰃ᰷ᰥ ᰕᰩᰲᰍᰧᰵᰶ."]

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