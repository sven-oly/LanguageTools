// Convert from old font-encoding Anangu/Yolngu text to Unicode forms:

var anangu_private_use_map = {
  '\u0025' : '\u00c4',
  '\u002b' : '\u1e6f',
  '\u003d' : '\u1e0e',
  '\u005b' : '\u1e0f',
  '\u005c' : '\u014b',
  '\u005d' : '\u1e49',
  '\u005e' : '\u00e4',
  '\u0060' : '\u1e3b',
  '\u007b' : '\u1e0e',
  '\u007c' : '\u014a',
  '\u007d' : '\u1e48',
  '\u007e' : '\u1e3a',
};

function convertOldAnanguToUnicode(inbox, outbox) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  var intext = inarea.value;
  var outtext = "";
  var out;
  for (var index = 0; index < intext.length; index ++) {
    var c = intext[index];
    var result = anangu_private_use_map[c];
    if (result) {
      out = result;
    } else {
      out = c;
    }
    outtext += out;
  }
  if (outarea) {
    outarea.innerHTML = outarea.value = outtext;
  }
  return outtext;
}
