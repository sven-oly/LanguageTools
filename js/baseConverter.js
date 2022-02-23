// Convert from old font-encoding of Oneida text to Unicode forms:

let langConverterClass = function(langCode, langName) {
  this.langCode = langCode;
  this.langName = langName;
  this.one2oneMap = new Map();  // For 1-to-1 replacements
  this.transformRules = [];  // For more complex regex matching.
  this.translit_source = '';
  this.map_translit_output = null;
  this.map_translit_sources = null;
  this.encodingData = null;
  this.encodingNames = null;
};

// Two arrays of characters for conversion
langConverterClass.prototype.addOne2OneTransforms = function (inChars, outChars, index) {
  // If there's a set of 1-to-1 conversions, add them to the
  // Private use map.
  const outSymbols = [...outChars];

  if (index == undefined) {
    index = 0;
  }
  if (inChars.length != outSymbols.length) {
    alert("1-to-1 mapping lengths are different: " + inChars.length +
     " != " + outChars.length);
  }

  // Need to index code points > 0xFFFF
  // fromCodePoint
  for (var i = 0; i < inChars.length; i++) {
    const inChar = inChars[i];

    const outCharCode = outSymbols[i];
    const outChar = outSymbols[i];
    let tested = this.one2oneMap.has(inChar);
    if (!this.one2oneMap.has(inChar)) {
      this.one2oneMap.set(inChar, []);
    }
    let current = this.one2oneMap.get(inChar);
    current[index] = outChar;
    this.one2oneMap.set(inChar, current);
  }
}

langConverterClass.prototype.dictionaryToMap = function(dict) {
  const map = new Map();
  const keys = Object.keys(dict);
  for (let i = 0; i < keys.length; i++) {
    map.set(keys[i], dict[keys[i]]);
  }
  return map;
}

// Adding a single conversion. The input and output may be multiple characters.
langConverterClass.prototype.addSingleTransform = function (inChars, outChars, index) {
  if (index == undefined) {
    index = 0;
  }
  if (!this.one2oneMap.has(inChar)) {
      this.one2oneMap.set(inChar, []);
  }
  this.one2oneMap[inChars][index] = outChars;
}

langConverterClass.prototype.convertEncodingToUnicode = function (inbox, outbox, encodingIndex) {
  const inarea = document.getElementById(inbox);
  const outarea = document.getElementById(outbox);
  const selObj = window.getSelection();
  const selected = selObj.toString();
  let intext;
  if (!selected) {
    intext = inarea.value;  // All
  } else {
    intext = selected;  // Only highlighted
  }

  // First, replace all single characters with their Unicode equivalents.
  let outtext = "";
  let out;
  for (let index = 0; index < intext.length; index ++) {
    const c = intext[index];
    out = c;
    if (this.one2oneMap.has(c)) {
      // Null replacements are possible
      const charList = this.one2oneMap.get(c);
      out = charList[encodingIndex];
    }
    outtext += out;
  }

  // Insert more complex replacements here.
  let newText = outtext;
  if (this.transformRules) {
    for (let rule in this.transformRules) {
      const transform = this.transformRules[rule];
      newText = newText.replace(transform[0], transform[1]);
    }
  }

  // Any final processing
  newText = this.postProcessing(newText);

  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}

// These need to be finished
// Is any of this needed?
langConverterClass.prototype.translitInfo = function() {
  return [this.translit_source,
          this.map_translit_output,
          this.map_translit_sources,
          this.private_use_map_combined];
}

langConverterClass.prototype.getTransforms = function() {
    return this.transforms;
}

langConverterClass.prototype.decodingInfo = function() {
  return this.encodingData;
}

// Post processing if needed
langConverterClass.prototype.postProcessing = function(text) {
  return text;
}

// Capitalizes sentences for scripts that have case.
langConverterClass.prototype.capitalizeSentence = function(text) {
    let size = text.length;
    let i = 0;
    let done = false;
    // Skip verse number and spaces to find first word letter.
    while (i < size && !done) {
      let c = text.charAt(i);
      if (c == ' ' || (c >= '0' && c <= '9')) {
        i++;
      } else {
        // Capitalize this one
        const upper = text.substring(i, i+1).toUpperCase();
        const replaced =
          text.substring(0, i) +
          upper +
          text.substring(i + 1);
        text = replaced;
        done = true;
      }
    }
    return text;
}