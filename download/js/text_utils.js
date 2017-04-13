// Keeping track of which detector rules are used.
var diff_rules = new Array(100);

// 3435 has Mon character, not Zawgyi.
var bad_data_ids = [ 1999, 2017, 2116, 2132, 2137, 3354, 3435, 3436, 6181, 6182, 6268, 11250 ];

// Zawgyi positions the lower dot to the left of the consonant, which is different
// TODO: investigate how to render this.
var lower_dot_before_consonant_ids = [8671, 8640, 8880];


function clear_rules_counts() {
  var i;
  for (i = 0; i < diff_rules.length; i += 1) {
    diff_rules[i] = 0;
  }
}

function utf16common(text, prefix, suffix, asciitoo, highlight_list)
{
  var res = "";
  for(var i=0;i<text.length;i++)
  {
    var ccode = text.charCodeAt(i);
    if (!asciitoo && (ccode == 0x005c)) {
      res += "\\\\";
    } else if ((ccode >= 0xd800) && (ccode < 0xdc00)) {
      // high surrogate
        if ( i+1 >= text.length ) {
          res += "[error Surrogate High only]";
        } else {
          i++;
          var nextcode = text.charCodeAt(i);
          if ((nextcode >= 0xdc00) && (nextcode < 0xe000)) {
            var ucs4 = ((ccode - 0xd800) << 10) + ((nextcode - 0xdc00)) + 0x10000;
            var tmp = "";
            for (var j = 0; j < 6; j++) {
              var cur = ucs4 & 0x000f;
              if (cur > 9) {
                tmp = "ABCDEF".charAt(cur-10) + tmp;
              } else {
                tmp = "0123456789".charAt(cur) + tmp;
              }
              ucs4 >>= 4;
            }
            if (i < highlight_list.length && highlight_list[i]) {
              res += prefix + tmp + suffix;
            } else {
              res += prefix + tmp + suffix;
            }
          } else {
            res += "[error Surrogate High only]";
            i--;
          }
       }
    } else if ((ccode >= 0xdc00) && (ccode < 0xe000)) {
      res += "[error Surrogate Low only]";
    } else if (asciitoo || (ccode > 0x007F) || (ccode < 0x0020)) {
      var tmp = "";
      for (var j = 0; j < 4; j++) {
        var cur = ccode & 0x000f;
        if (cur > 9) {
          tmp = "ABCDEF".charAt(cur-10) + tmp;
        } else {
          tmp = "0123456789".charAt(cur) + tmp;
        }
        ccode >>= 4;

      }
      if (i < highlight_list.length && highlight_list[i]) {
        res += prefix + tmp + suffix;
      } else {
        res += prefix + tmp + suffix;
      }
    } else  {
      res += text.charAt(i);
    }
  }
  return res;
}

  function uplus(text)
  {
    return utf16common(text, "u+", " ", true, diff_list)
  }


  // Takes hex text and converts to characters, displaying in another field.
  function convertToText() {
    var textinput = document.getElementById('textInput');
    var textoutput = document.getElementById('textOutput');
    var inChars = textinput.value;
    var outCharacters = uhexToChars(inChars)
    textoutput.innerHTML = outCharacters;
    textoutput.value = outCharacters;
    return outCharacters;
  }

  function  uhexToChars(textinput) {
   // blanks delimit
   var removed_uslash = textinput.replace(/\\u/g, " ");
   var hexSplit = removed_uslash.split(" ");
   // var hexSplit = textinput.split(" ");
   var charsOut = new Array(hexSplit.length);
   for (i = 0; i < hexSplit.length; i++) {
     var hex = hexSplit[i].replace("u+", "").trim();
     var charCode = parseInt(hex, 16);
     charsOut[i] = String.fromCharCode(charCode);
   }
   size = textinput.length
   return charsOut.join("");
  }

  function allConvertDiffs() {
    // Find all where the Google conversion is different from
    // the MyanmarITPro conversion.
    var allConvertDiffs = new Array(0);
    var ITconverted;
    var testpos;
    for (testpos = 0; testpos < data.length; testpos ++) {
      ITconverted = Z1_Uni(data[testpos][1]);
      if (ITconverted != data[testpos][2]) {
	allConvertDiffs.push(testpos);
      }
    }
    return allConvertDiffs;
  }

  function findAllDetectorDiffs() {
    // Differences between the C++ detector any my simple Javascript version.
    var diff_ids = new Array(0);
    var diff_ids2 = new Array(0);
    var index;
    var myz_detect;
    for (index = 0; index < data.length; index ++) {
      myz_detect = (detectZawgyi(data[index][1]) > 0);
      if (data[index][4] != myz_detect) {
        if (myz_detect) {
            diff_ids.push(index);
        } else {
          diff_ids2.push(index);
        }
      }
    }
      return diff_ids + ' ||| ' + diff_ids2;
  }
  
function identifyBadOriginalData() {
    var bad_ids = new Array(0);
    var index;
    for (index = 0; index < data.length; index ++) {
	if (orig_font[index][1] > 1 && orig_font[index][2] > 0) {
	    bad_ids.push(index);
	}
    }
    return bad_ids;
}

function identifyBadDetection() {
    var orig_not_Z = new Array(0);
    var orig_not_U = new Array(0);
    var index;
    for (index = 0; index < data.length; index ++) {
	if (data[index][4] && orig_font[index][1] > 0) {
	    // detected as Z but bad Z rendering
	    orig_not_Z.push(index);
	}
	if (!data[index][4] && orig_font[index][2] > 0) {
	    // detected as Z but bad Z rendering
	    orig_not_U.push(index);
	}
    }
    return orig_not_Z + ' | ' + orig_not_U;
}

function identifyBadConversion() {
    var bad_U_render = new Array(0);
    var converted_is_Z = new Array(0);
    var index;
    for (index = 0; index < data.length; index ++) {

	if (data[index][4] && orig_font[index][1] == 0 && converted_font[index][2] > 0) {
	    // detected as Z but bad Z rendering
	    bad_U_render.push(index);
	}
	if (data[index][4] && orig_font[index][1] > 0 && detectZawgyi(data[index][2])) {
	    // detected as Z but bad Z rendering
	    converted_is_Z.push(index);
	}
    }
	return bad_U_render + ' | ' +converted_is_Z;
}

// Using the ordering expecdted for Unicode code points, parse a string into syllables.
function parseSyllable(text) {
  var index = 0;
  var ccode;
  var sylStart, sylEnd;
  sylStart = 0;
  sylEnd = 0;

  var prev = 0;
  var prev2 = 0;

  while (index < text.length) {
    ccode =  text.charCodeAt(i);
    index += 1;

    if (ccode == 0x1004) {

    }
  }
}

// Constants
var nondigits = "[^\u1040-\u1049]";
var consonant = "[\u1000-\u1021]";
var vowelsign = "[\u102d, \u102e, \u1032, \u102f, \u1030, \u102b, \u102c]";

// ZAWGYI MYANMAR CONSONANT SIGN MEDIAL RA
// This character has multiple representations in the Zawgyi font.
var zawgyi_medialra = "[\u103B\u107E-\u1084]";

// Translation of transliteration-based 5 pass conversion into Javascript.
function g3ZawgyiConverter(zawgyi_in) {

  // output = output.replace(patttern, replacement);

}


// Returns list of encoding detection rules that match the text.
function matchG3DetectRules(text) {
  var detect_diffs = new Array(0);
  var index;
  for (index = 0; index < data.length; index ++) {
    var text = data[index][1];
    var g3_detect = data[index][4];
    if (matchZawgyiRegEx(text) != data[index][4]) {
      detect_diffs.push(index);
    }
  }
  return detect_diffs;
}

// Returns list of encoding detection rules that match the text.
function matchG3Conversion(text) {
  var detect_diffs = new Array(0);
  var index;
  for (index = 0; index < data.length; index ++) {
    var js_converted_text =  convertZawgyiToUnicode(data[index][1]);
    if (js_converted_text != data[index][2]) {
      detect_diffs.push(index);
    }
  }
  return detect_diffs;
}
