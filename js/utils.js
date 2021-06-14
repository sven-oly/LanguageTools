/* Namespace */
let Utils = function() {
}

function toggleDiv(id, toggle) {
    var obj = document.getElementById(id);
    var checkBox = document.getElementById(toggle);
    var showIt = checkBox.checked;
    if (showIt)
      obj.style.display = 'block';
    else
      obj.style.display = 'none';
}

function toggleVisible(id) {
    var obj = document.getElementById(id);
    if (obj.style.display == 'none')
      obj.style.display = 'block';
    else
      obj.style.display = 'none';
}

// Copy text contents from area1 to area2.
function copyText(area1Id, area2Id) {
  var obj1 = document.getElementById(area1Id);
  var obj2 = document.getElementById(area2Id);
  obj2.innerHTML = obj2.value = obj1.value;
}

function utf16common(text, prefix, suffix, asciitoo, highlight_list)
{
  var res = "";
  for(var i=0;i<text.length;i++)
  {
    var ccode = text.charCodeAt(i);
    const orig_code = ccode;
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
          res += "<b>" + prefix + tmp + suffix + "</b>";
        } else {
          res += prefix + tmp + suffix;
        }
        if (orig_code == 0x0a) {
          res += "\n";  // Put Newline in the output
        }
      } else  {
      res += text.charAt(i);
    }
  }
  return res;
}

  function uplus(text)
  {
    return utf16common(text, "", " ", true, diff_list)
  }

  function isBurmeseConsonant(num) {
    return (0x1000 <= num && num <= 0x102a) || num == 0x103f || num == 0x104e;
  }

  function isBurmeseSubscriptConsonant(num) {
    return (0x1000 <= num && num <= 0x1019) || num == 0x101c || num == 0x101e ||
	    num == 0x1020 || num == 0x1021;
  }

  function isBurmeseMedial(num) {
    return (0x103b <= num && num <= 0x103e);
  }

  function isBurmeseVowelSign(num) {
    return (0x102b <= num && num <= 0x1030) || num == 0x1032;
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
var burmese_consonant = "[\u1000-\u1021]";
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

function charsToHexString(text) {
  var nums = "";
  for (i = 0; i < text.length; i++) {
    v = text.charCodeAt(i);
    var xout = v.toString(16)
    nums = nums + xout + " ";
  }
  return nums;
}

// Take hex and put it into the fields.
function hexToOutput(infield, outfield) {
  // Get the hex values, converted to Unicode.
  // Then set in the
  var inHexElem = document.getElementById(infield);
  var textHex = intArrayFromHexString(inHexElem.value);
  var uChars = fromCodePointHex(textHex);

  var outField = document.getElementById(outfield);
  outField.value = uChars;
}

// Input is string of hex values, separated by spaces.
// Also accept 0x, u+, and \u for each hex value.
function intArrayFromHexString(inString) {
  // Remove U+ or 0x. Split at space.
  var newString = inString.replace(/(U\+)|(u\+)|(0x)|(0X)|( 0x)|( 0X)|\\u|\\U/g, " ")
  var hStrings = newString.split(" ");
  var intList = [];
  var outIndex = 0;
  for (var i=0; i < hStrings.length; i ++) {
    if (hStrings[i] != "" && hStrings[i] != "\u0000") {
      intList[outIndex] = parseInt(hStrings[i], 16);
      outIndex ++;
    }
  }
  return intList;
}

// Create Unicode chars from array of hex characters.
function fromCodePointHex(arguments) {
  var chars = [], point, offset, units, i;
  for (i = 0; i < arguments.length; ++i) {
    point = arguments[i];
    offset = point - 0x10000;
    units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
    chars.push(String.fromCharCode.apply(null, units));
  }
  return chars.join("");
}

/* Selects new keyboard */
Utils.prototype.onLayoutSelected = function(layoutCode, area_id, instruction_id) {
  controller.activateLayout(layoutCode);
    var info = kb_info[layoutCode];
    if (info && instruction_id) {
        var area = document.getElementById(instruction_id);
        if (area) {
            area.innerHTML = area.value = info[1];
        }
    }
  document.getElementById(area_id).focus();
}

/* Clears area and optionally sets focus */
Utils.prototype.clearText = function(area_id, setfocus) {
  var field = document.getElementById(area_id);
  field.value = '';
  if (setfocus) {
    field.focus();
  }
}

Utils.prototype.setKeyCapsFont = function(newFontFamily) {
  // All the buttons reset the the font.
  var buttons = document.getElementsByClassName("vk-btn");
  for (var i = 0; i < buttons.length; i++ ) {
    buttons[i].style.fontFamily = newFontFamily;
  }
  var keycaps = document.getElementsByClassName("vk-cap");
  for (var i = 0; i < keycaps.length; i++ ) {
    keycaps[i].style.fontFamily = newFontFamily;
  }
}

Utils.prototype.setFontFamily = function (newFontFamily, area_id) {
  this.setKeyCapsFont(newFontFamily);
  var t1_element = document.getElementById(area_id);
  t1_element.style.fontFamily = newFontFamily;
}

Utils.prototype.onLanguageSelected = function(newLangTag, textArea) {
  var t1_element = document.getElementById(textArea);
  t1_element.lang = newLangTag['shortName'];
}

Utils.prototype.onSizeSelected = function(newSize, textArea) {
  var t1_element = document.getElementById(textArea);
  t1_element.style.fontSize = newSize;
}

/* Finds selected code point values and outputs to designated area */
Utils.prototype.showCodePoints = function(source_id, dest_id) {
  const src_field = document.getElementById(source_id);
  let input_text = "";
  const selObj = window.getSelection();
  const selected = selObj.toString();
  if (!selected) {
    input_text = src_field.value;  // All
  } else {
    input_text = selected;  // Only highlighted
  }
  const code_text = uplus(input_text);
  const dest_field = document.getElementById(dest_id);
  dest_field.value = code_text;
  document.getElementById('t1').focus();
}

Utils.prototype.toggleConvertedVS = function(text_area_id, toggle) {
  // TODO: Change variation sequence content of text.
  var text_area = document.getElementById(text_area_id);
  var text = text_area.value;
  var new_text;
  if (toggle.checked) {
      new_text = add_variation_modifiers(text);
  } else {
      new_text =remove_variation_modifiers(text);
  }
  text_area.innerHTML = text_area.value = new_text;
}
