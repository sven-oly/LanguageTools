// Convert from old font-encoding of Oneida text to Unicode forms:

let langConverterClass = function(langCode, langName) {
  this.langCode = langCode;
  this.langName = langName;
  this.one2oneMap = {};  // For 1-to-1 replacements
  this.transformRules = [];  // For more complex regex matching.
  this.translit_source = '';
  this.map_translit_output = null;
  this.map_translit_sources = null;
  this.encodingData = null;
  this.encodingNames = null;
};

// Two arrays of characters for conversion
langConverterClass.prototype.addOne2OneTransforms = function (inChars, outChars) {
  // If there's a set of 1-to-1 conversions, add them to the
  // Private use map.

  if (inChars.length != outChars.length) {
    alert("1-to-1 mapping lengths are different: " + inChars.length +
     " != " + outChars.length);
  }

  for (var i = 0; i < inChars.length; i++) {
    const inChar = inChars[i];
    const outChar = outChars[i];
    this.one2oneMap[inChar] = outChar;
  }
}

// Adding a single conversion. The input and output may be multiple characters.
langConverterClass.prototype.addSingleTransform = function (inChars, outChars) {
  this.one2oneMap[inChars] = outChars;
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
    if (c in this.one2oneMap) {
      // Null replacements are possible
      out = this.one2oneMap[c][encodingIndex];
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