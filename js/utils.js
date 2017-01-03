
function toggleDiv(id, toggle) {
    var obj = document.getElementById(id);
    var checkBox = document.getElementById(toggle);
    var showIt = checkBox.checked;
    if (showIt)
      obj.style.display = 'block';
    else
      obj.style.display = 'none';
}
    
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
              res += "<b>" + prefix + tmp + suffix + "</b>";
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
        res += "<b>" + prefix + tmp + suffix + "</b>";
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
    return utf16common(text, "U+", " ", true, diff_list)
  }

  // Simple tests to indicate Zawgyi encoding
  function detectZawgyi(testString) {
    var confidence = 0;

    // Count characters out of normal Unicode range
    var prev = 0;
    var prev2 = 0;
    var prev3 = 0;
    for (var i = 0; i < testString.length; i ++) {
      var ccode = testString.charCodeAt(i);
      // Uses characters out of normal Burmese range.
      if (ccode > 0x104f && ccode < 0x109f) {
        confidence += 10;
        diff_rules[0] += 1;
      }
      if (ccode == 0x1033 || ccode == 0x1034 || ccode == 0x1022 || ccode == 0x1035) {
        confidence += 10;
        diff_rules[1] += 1;
      }
      // At the start
      if ((i == 0) && ( ccode == 0x1031 || ccode == 0x103b || ccode == 0x1039)) {
        confidence += 1;
        diff_rules[2] += 1;
      }
      // 2 letter patterns not expected in Unicode text
      if (prev == 0x1038 && ccode == 0x1031) {
        confidence += 1;
        diff_rules[3] += 1;
      }
      if (prev == 0x1038 && ccode == 0x1028) {
        confidence += 1;
        diff_rules[4] += 1;
      }
      if (prev == 0x1038 && ccode == 0x1039) {
        confidence += 1;
        diff_rules[5] += 1;
      }
      if (prev == 0x1038 && isMedial(ccode)) {
        confidence += 1;
        diff_rules[6] += 1;
      }

      if (prev == 0x1032 && isMedial(ccode)) {
        confidence += 1;
        diff_rules[7] += 1;
      }

      // Wrong orders of vowel signs
      if (((ccode == 0x102d) || (ccode == 0x102e) || (ccode == 0x1032)) &&
          ((prev == 0x102f) || (prev == 0x1030) || (prev == 0x102b) || (prev == 0x102c))) {
        confidence += 1;
        diff_rules[8] += 1;
      }

      // Vowel signs before medials
      if (isVowelSign(prev) && isMedial(ccode)) {
        confidence += 1;
        diff_rules[9] += 1;
      }

      // 0x1031 before medials
      if (prev == 0x1031 && isMedial(ccode)) {
        confidence += 1;
        diff_rules[10] += 1;
      }

      // 0x1037 before 0x1031 or medials
      if (prev == 0x1037 && (isMedial(ccode) || ccode == 0x1031 ||
			     ccode == 0x1039)) {
        confidence += 1;
        diff_rules[11] += 1;
      }

      // 0x1036 before voxel signs, etc.  TOO AGRESSIVE
      //if ((prev >= 0x1036 && prev <= 0x1038) && (ccode >= 0x1022 && ccode < 0x103a)) {
       // confidence += 1;
      //  diff_rules[12] += 1;
      //}

      // Current 0x1039
      if (ccode == 0x1039) {
        if ((prev > 0x102a && prev < 0x103a) || (prev > 0x103a && prev < 0x103f) ||
	    (prev > 0x103f && prev < 0x104e)) {
          confidence += 1;
          diff_rules[13] += 1;
        }
        if (i == testString.length - 1) {
          confidence += 1;
          diff_rules[14] += 1;
        }
      }

      // Previous 0x1039
      if (prev == 0x1039 && !isConsonant(ccode)) {
        confidence += 1;
        diff_rules[15] += 1;
      }

      if (prev2 == 0x1004 && prev != 0x103a && ccode == 0x1039) {
        confidence += 1;
        diff_rules[16] += 1;
      }

      if (prev == 0x1039) {
        if (isMedial(ccode)) {
          confidence += 1;
        diff_rules[17] += 1;
        }
        if (ccode >= 0x104a && ccode <= 0x104b) {
          confidence += 1;
        diff_rules[18] += 1;
	}
        if (ccode == 0x1038 || ccode == 0x1031
//          || (ccode >= 0x1000 && ccode <= 0x1021)
	   ) {
          confidence += 1;
        diff_rules[19] += 1;
        }
        // Second 1039 with bad followers
        if (isConsonant(prev2)) {
          if ((ccode == 0x101a) || (ccode == 0x101b) || (ccode == 0x101d) || (ccode == 0x101f) ||
              (ccode > 0x1021)) {
            confidence += 1;
            diff_rules[20] += 1;
	  }
	}
      }

      // Two consonants flanking 0x1039
      // This is too strong - this pattern is legal unicode too.
      //if (prev == 0x1039 && (prev2 >= 0x1000 && prev2 <= 0x102a) && (ccode >= 0x1000 && ccode <= 0x1019)) {
      //    confidence += 1;
      //  diff_rules[21] += 1;
      //}

      if (prev == 0x103a) {
        if ((ccode == 0x102d) || (ccode == 0x102e) || (ccode == 0x1032)) {
          confidence += 1;
        diff_rules[22] += 1;
        }
        if (ccode == 0x1033) {
          confidence += 1;
        diff_rules[23] += 1;
        }
      }

      if ((prev == 0x103d) &&
          ((ccode == 0x103a) || (ccode == 0x103b) || (ccode == 0x103c))) {
        confidence += 1;
        diff_rules[24] += 1;
      }

      // Digit followed by diacritic
      if ((prev >= 0x1040 && prev <= 0x1049) && (ccode >= 0x102b && ccode <= 0x1030)) {
        confidence += 1;
        diff_rules[25] += 1;
      }

      // Space before some medials or vowel e
      if (prev == 0x0020 && (ccode == 0x1031 || ccode == 0x1039)) {
        confidence += 1;
        diff_rules[26] += 1;
      }
      if (prev == 0x0020 && (ccode == 0x103b || (ccode >= 0x107e && ccode <= 0x1084))) {
        confidence += 1;
        diff_rules[27] += 1;
      }

      // Check on 1039 followed by bad values
      // Now not strict enough.
      if (prev2 == 0x103a && prev == 0x1039 && !isConsonant(ccode)) {
        confidence += 1;
        diff_rules[28] += 1;
      }

      // non-unicode medial combos
      if (prev2 == 0x103b && prev == 0x103c && ccode == 0x103d) {
        confidence += 1;
        diff_rules[29] += 1;
      }
      if (prev2 == 0x103b && prev == 0x103c && isConsonant(ccode)) {
        confidence += 1;
        diff_rules[30] += 1;
      }

      // Consonant, 1031, medial
      if (isConsonant(prev2) && prev == 0x1031 && isMedial(ccode)) {
        confidence += 1;
        diff_rules[31] += 1;
      }
      // Bad combos of consonant, subscript, consonant,  medial ( or vowel)
      // consonant, 103a, 1039, consonant
      if (isConsonant(prev3) && prev2 == 0x1039 && isConsonant(prev) && isVowelSign(ccode)) {
        confidence += 1;
        diff_rules[32] += 1;
      }
      if (isConsonant(prev3) && prev2 == 0x1039 && isConsonant(prev) && isMedial(ccode)) {
        confidence += 1;
        diff_rules[33] += 1;
      }

      // Vowel sign before 1031
      if (isVowelSign(prev) && ccode == 0x1031) {
        confidence += 1;
        diff_rules[34] += 1;
      }

      // This may be too strong
      if (prev2 == 0x1004 && prev == 0x1039 && isConsonant(ccode)) {
        confidence += 1;
        diff_rules[35] += 1;
      }

      // This may be too strong
      if (prev2 == ccode && isConsonant(prev2) && prev == 0x1039) {
        //confidence += 1;
        //diff_rules[36] += 1;
      }

      // This may be too strong
      //if (isConsonant(prev2) && prev == 0x103a && isVowelSign(ccode)) {
      //  confidence += 1;
      //  diff_rules[37] += 1;
      //}

      if (prev == 0x1036 && isVowelSign(ccode)) {
        confidence += 1;
        diff_rules[38] += 1;
     }

      // Vowel order conflict
      if (prev == 0x102d && ccode == 0x102e) {
        confidence += 1;
        diff_rules[39] += 1;
      }
      if (prev == 0x102d && ccode == 0x1032) {
        confidence += 1;
        diff_rules[40] += 1;
      }
      if (prev == 0x102e && ccode == 0x1032) {
        confidence += 1;
        diff_rules[41] += 1;
      }
      if (prev == 0x102f && ccode == 0x1030) {
        confidence += 1;
        diff_rules[42] += 1;
      }
      if (prev == 0x102b && ccode == 0x102c) {
        confidence += 1;
        diff_rules[43] += 1;
      }

      // Unexpected combination
      if (prev == 0x103b && ccode == 0x103a) {
        confidence += 1;
        diff_rules[44] += 1;
      }

      // Unexpected combination
      if (prev == 0x103b && ccode == 0x103c) {
        confidence += 1;
        diff_rules[45] += 1;
      }

      // Unexpected combination
      if (prev == 0x103c && ccode == 0x103b) {
        confidence += 1;
        diff_rules[46] += 1;
      }

      // Unexpected combination
      if (prev2 == 0x1025 && prev == 0x1039 && isConsonant(ccode)) {
        confidence += 1;
        diff_rules[47] += 1;
      }
      // Unexpected combinations
      if (prev == 0x1007 && ccode == 0x103c) {
        confidence += 1;
        diff_rules[48] += 1;
      }
      // Unexpected combinations
      if (prev == 0x101b && ccode == 0x103c) {
        confidence += 1;
        diff_rules[49] += 1;
      }
      // Unexpected combinations
      if (isConsonant(prev3) && prev2 == 0x1039 && isConsonant(prev) && ccode == 0x1036) {
        confidence += 1;
        diff_rules[50] += 1;
      }
      // Unexpected combinations
      if (isConsonant(prev3) && prev2 == 0x1039 && isConsonant(prev) && ccode == 0x103a) {
        confidence += 1;
        diff_rules[51] += 1;
      }
      // Unexpected combinations
      if (isConsonant(prev3) && prev2 == 0x1039 && isConsonant(prev) && ccode == 0x1039) {
        confidence += 1;
        diff_rules[52] += 1;
      }

      prev3 = prev2;
      prev2 = prev;
      prev = ccode;
    }
    return confidence;
  }

  function isConsonant(num) {
    return (0x1000 <= num && num <= 0x102a) || num == 0x103f || num == 0x104e;
  }

  function isSubscriptConsonant(num) {
    return (0x1000 <= num && num <= 0x1019) || num == 0x101c || num == 0x101e ||
            num == 0x1020 || num == 0x1021;
  }

  function isMedial(num) {
    return (0x103b <= num && num <= 0x103e);
  }

  function isVowelSign(num) {
    return (0x102b <= num && num <= 0x1030) || num == 0x1032;
  }

  // Takes hex text and converts to characters, displaying in another field.
  function convertToText() {
    var textinput = document.getElementById('textInput');
    var textoutput = document.getElementById('textOutput');
    var inChars = textinput.value;
    var outCharacters = uhexToChars(inChars)
    textoutput.innerHTML = outCharacters;
    return outCharacters;
  }

  function  uhexToChars(textinput) {
   // blanks delimit
   var removed_uslash = textinput.replace(/\\u/g, " ");
   var hexSplit = removed_uslash.split(" ");
   // var hexSplit = textinput.split(" ");
   var charsOut = new Array(hexSplit.length);
   for (i = 0; i < hexSplit.length; i++) {
     var hex = hexSplit[i].replace("U+", "").trim();
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
