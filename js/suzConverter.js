// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Sunuwar font encodings
var map_encoding_names = [
  'TikamuliPUA', 'Jenticha'];

const map_font_to_encoding = {
    'Kirat1': 1,
    'Lonkuch': 0,
    'Prem': 0
};

// Conversion to PUA
var private_use_map_combined = {
    '\u0030': ['\uec30', '\ued30'],
    '\u0031': ['\uec31', '\ued31'],
    '\u0032': ['\uec32', '\ued32'],
    '\u0033': ['\uec33', '\ued33'],
    '\u0034': ['\uec34', '\ued34'],
    '\u0035': ['\uec35', '\ued35'],
    '\u0036': ['\uec36', '\ued36'],
    '\u0037': ['\uec37', '\ued37'],
    '\u0038': ['\uec38', '\ued38'],
    '\u0039': ['\uec39', '\ued39'],
    '\u003a': ['\uec3a', '\ued27\uec35'],
    '\u003b': ['\uec3b', '\u003b'],
    '\u003c': ['\u003c', '\u003c'],
    '\u003d': ['=', '\u003d'],
    '\u003e': ['\uec3e', '\u003e'],
    '\u003f': ['?', '\ued25'],

    '\u0040': ['@', '\ued40'],
    '\u0041': ['\uec41', '\ued41'],
    '\u0042': ['\uec42', '\ued42'],
    '\u0043': ['\uec43', '\u0043'],
    '\u0044': ['\uec44', '\u0044'],
    '\u0045': ['\uec45', '\u0045'],
    '\u0046': ['\uec46', '\u0046'],
    '\u0047': ['\uec47', '\u0047'],
    '\u0048': ['\uec48', '\u0048'],
    '\u0049': ['\uec49', '\u0049'],
    '\u004a': ['\uec4a', '\u004a'],
    '\u004b': ['\uec4b', '\u004b'],
    '\u004c': ['\uec4c', '\u004c'],
    '\u004d': ['\uec4d', '\u004d'],
    '\u004e': ['\uec4e', '\u004e'],
    '\u004f': ['\uec4f', '\u004f'],

    '\u0050': ['\uec50', '\u0050'],
    '\u0051': ['\uec51', '\u0051'],
    '\u0052': ['\uec52', '\u0052'],
    '\u0053': ['\uec53', '\u0053'],
    '\u0054': ['\uec54', '\u0054'],
    '\u0055': ['\uec55', '\u0055'],
    '\u0056': ['\uec56', '\u0056'],
    '\u0057': ['\uec57', '\u0057'],
    '\u0058': ['\uec58', '\u0058'],
    '\u0058': ['\uec59', '\u0058'],
    '\u005a': ['\uec5a', '\u005a'],
    '\u005e': ['\uec5a', '\ued5e'],

    '\u0060': ['\u0060', '\u0060'],
    '\u0061': ['\uec61', '\ued61'],
    '\u0062': ['\uec62', '\ued62'],
    '\u0063': ['\uec64', '\ued63'],
    '\u0064': ['\uec64', '\ued64'],
    '\u0065': ['\uec65', '\ued65'],
    '\u0066': ['\uec66', '\ued66'],
    '\u0067': ['\uec67', '\ued67'],

    '\u0068': ['\uec68', '\ued68'],
    '\u0069': ['\uec69', '\ued69'],
    '\u006a': ['\uec6a', '\ued6a'],
    '\u006b': ['\uec6b', '\ued6b'],
    '\u006c': ['\uec6c', '\ued6c'],
    '\u006d': ['\uec6d', '\ued6d'],
    '\u006e': ['\uec6e', '\ued6e'],
    '\u006f': ['\uec6f', '\ued6f'],

    '\u0070': ['\uec70', '\ued70'],
    '\u0071': ['\uec71', '\ued71'],
    '\u0072': ['\uec72', '\ued72'],
    '\u0073': ['\uec73', '\ued73'],
    '\u0074': ['\uec74', '\ued74'],
    '\u0075': ['\uec75', '\ued75'],
    '\u0076': ['\uec76', '\ued76'],
    '\u0077': ['\uec77', '\ued77'],
    '\u0078': ['\uec78', '\ued78'],
    '\u0079': ['\uec79', '\ued79'],
    '\u007a': ['\uec7a', '\ued7a'],
    '\u007b': ['\u007b', '\ued7b'],
    '\u007c': ['\u007c', '\ued7c'],
    '\u007d': ['\u007d', '\ued7d'],

    '\u00b2': ['\uecb2', '\u00b2'],
    '\u00b3': ['\uecb3', '\u00b3'],
    '\u00bc': ['\uecbc', '\u00bc'],
    '\u00bd': ['\uecbd', '\u00bd'],
    '\u00be': ['\uecbe', '\u00be'],
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