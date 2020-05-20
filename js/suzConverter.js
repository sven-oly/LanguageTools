// Convert from old font-encoding of Lepcha text to Unicode forms:

// Mappings for Sunuwar font encodings
var map_encoding_names = [
  'TikamuliPUA', 'JentichaPUA'];

// Conversion to PUA
var private_use_map_combined = {
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
    '\u0044': ['\uec44', '\uec33'],
    '\u0045': ['\uec45', '\uec14'],
    '\u0046': ['\uec46', '\uec12'],
    '\u0047': ['\uec47', '\uec45'],
    '\u0048': ['\uec48', '\uec1e'],
    '\u0049': ['\uec49', '\uec15'],
    '\u004a': ['\uec4a', '\uec49'],
    '\u004b': ['\uec4b', '\uec42'],
    '\u004c': ['\uec4c', '\uec2f'],
    '\u004d': ['\uec4d', '\uec2e'],
    '\u004e': ['\uec4e', '\uec30'],
    '\u004f': ['\uec4f', '\uec26'],

    '\u0050': ['\uec50', '\uec10'],
    '\u0051': ['\uec51', '\uec18'],
    '\u0052': ['\uec52', '\uec32'],
    '\u0053': ['\uec53', '\uec21'],
    '\u0054': ['\uec54', '\uec0b'],
    '\u0055': ['\uec55', '\uec2b'],
    '\u0056': ['\uec56', '\uec35'],
    '\u0057': ['\uec57', '\uec01'],
    '\u0058': ['\uec58', '\uec2d'],
    '\u0059': ['\uec59', '\uec0f'],
    '\u005a': ['\uec5a', '\uec34'],

    '\u0060': ['\u0060', '\uec28'],
    '\u0061': ['\uec61', '\uec28'],
    '\u0062': ['\uec62', '\uec13'],
    '\u0063': ['\uec64', '\uec06'],
    '\u0064': ['\uec64', '\uec0c'],
    '\u0065': ['\uec65', '\uec2c'],
    '\u0066': ['\uec66', '\uec11'],
    '\u0067': ['\uec67', '\uec03'],

    '\u0068': ['\uec68', '\uec1d'],
    '\u0069': ['\uec69', '\uec27'],
    '\u006a': ['\uec6a', '\uec08'],
    '\u006b': ['\uec6b', '\uec00'],
    '\u006c': ['\uec6c', '\uec1c'],
    '\u006d': ['\uec6d', '\uec15'],
    '\u006e': ['\uec6e', '\uec0d'],
    '\u006f': ['\uec6f', '\uec29'],

    '\u0070': ['\uec70', '\uec0e'],
    '\u0071': ['\uec71', '\uec17'],
    '\u0072': ['\uec72', '\uec1b'],
    '\u0073': ['\uec73', '\uec20'],
    '\u0074': ['\uec74', '\uec0a'],
    '\u0075': ['\uec75', '\uec2a'],
    '\u0076': ['\uec76', '\uec1f'],
    '\u0077': ['\uec77', '\uec22'],
    '\u0078': ['\uec78', '\uec04'],
    '\u0079': ['\uec79', '\uec1a'],
    '\u007a': ['\uec7a', '\uec19'],

    '\u00b2': ['\uecb2', '\uec00\uec24'],
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