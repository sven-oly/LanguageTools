// Convert from old font-encoding of Cherokee text to Unicode forms:

// Mappings for  Tangsa Lakhum
var map_encoding_names = [
  'Gam Win',
];

var private_use_map_combined = {
        ' ': ' ',
        "A": ["\ue405", "ဢ\ufe00", "ဢ"],
        "B": ["ꩰ", "ꩰ", "ꩰ"],
        "C": ["C", "ဢ\ufe00", "\u109c"],
        "D": ["ꩰ", "ꩰ", "ꩰ"],
        "E": ["\ue408", "\u105e\u103a", "\u105e\u103a"],
        "F": ["\ue41b", "\u103a\u1036", "\u103a\u1036"],
        "G": ["\u1087", "\u1087", "\u1087"],
        "H": ["\u1088", "\u1088", "\u1088"],
        "I": ["\u102e", "ီ", "ီ"],
        "J": ["ို", "ို", "ို"],
        "K": ["ue40f", "\u1039\u1000\ufe00", "\u1039\u1000\ufe00"],
  "L": ["\u1038", "\u1038", ""],
        "M": ["ံ", "ံ", "ံ"],
        "N": ["\u107a\ufe00", "\u107a\ufe00", "\u107a\ufe00"],
        "O": ["\u1089", "\u1089", "\u103d"],
        "P": ["\u1039\u1015\ufe00", "\u1039\u1015\ufe00", "\u1039\u1015\ufe00"],
        "Q": ["\ue41f", "\uaa77", "\uaa77"],
        "R": ["ြ", "ြ", "ြ"],
        "S": ["꩷", "꩷", "꩷"],
        "T": ["\u1039\u1010\ufe00", "\u1039\u1010\ufe00", "\u1039\u1010\ufe00"],
        // TODO: Resolve V for Aiton
        "U": ["\u1030", "\u1030", "\u1030"],
        "V": ["\ua9f2", "\ua9f2", "\u1030"],
        "W": ["ွ်", "ွ်", "ွ်"],
        "X": ["ႜ", "ႜ", "ႜ"],
        "Y": ["ျ", "ျ", "ျ"],
        "Z": ["ၞ", "ၞ", "ၞ"],
        "az": ["\ue404", "ႃ", "ႃ"],
        "ac": ["\ue405", "ႃ", "ႃ"],
        "aq": ["\ue406", "ႃ", "ႃ"],
        "ax": ["\ue407", "ႃ", "ႃ"],
        "awz": ["\ue414", "ႃ", "ႃ"],
        "awc": ["\ue415", "ႃ", "ႃ"],
        "awq": ["\ue453", "ႃ", "ႃ"],
        "awx": ["\ue416", "ႃ", "ႃ"],
        "b": ["\ue438", "ပ\ufe00", "ပ\ufe00"],
        "ch": ["\ue42d", "ꩡ\ufe00", "ꩡ\ufe00"],
        "d": ["\ue43F", "ဒ", "ဒ"],
        "dd": ["\ue42c", "ဒ", "ဒ"],
        "ec": ["\ue408", "ေ\ufe00", "ေ\ufe00"],
        "ec": ["\ue409", "ေ\ufe00", "ေ\ufe00"],
        "eq": ["\ue40a", "ေ\ufe00", "ေ\ufe00"],
        "ex": ["\ue40b", "ေ\ufe00", "ေ\ufe00"],
        "ez": ["\ue408", "ေ\ufe00", "ေ\ufe00"],
        "f": ["\ue42b", "ၸ\ufe00", "ၸ\ufe00"],
        "g": ["\ue430", "င\ufe00", "င\ufe00"],
        "gh": ["\ue445", "င\ufe00", "င\ufe00"],
        "h": ["\ue43B", "\uaa6d", "\uaa6d"],
        "ht": ["\ue43d", "\uaa6d", "\uaa6d"],
        "htt": ["\ue446", "\uaa6d", "\uaa6d"],
        "iz": ["\ue40e", "ႃ", "ႃ"],
        "ic": ["\ue40d", "ႃ", "ႃ"],
        "iq": ["\ue40e", "ႃ", "ႃ"],
        "ix": ["\ue40f", "ႃ", "ႃ"],
        "j": ["\uE443", "\u109d", "\u109d"],
        "k": ["\ue42e", "က\ufe00", "က\ufe00"],
        "kh": ["\ue42f", "က\ufe00", "က\ufe00"],
        "l": ["\ue43C", "လ\ufe00", "လ\ufe00"],
        "m": ["\ue427", "မ\ufe00", "မ\ufe00"],
        "n": ["\ue43A", "ꩫ\ufe00", "ꩫ\ufe00"],
        "-ng": ["\ue41b", "\u103a\u1036", "\u103a\u1036"],
        "ng": ["\ue431", "\u103a\u1036", "\u103a\u1036"],
        "nh": ["\ue441", "\u103a\u1036", "\u103a\u1036"],
        "ny": ["\ue436", "\u103a\u1036", "\u103a\u1036"],
        "oz": ["\ue400"],
        "oc": ["\ue401"],
        "oq": ["\ue402"],
        "ox": ["\ue403"],
        "p": ["\ue435", "ပ\ufe00", "ပ\ufe00"],
        "ph": ["\ue437", "ပ\ufe00", "ပ\ufe00"],
        "q": ["်", "်", "်"],
        "r": ["\ue440", "\uAA7A\ufe00", "\uAA7A\ufe00"],
        "s": ["\ue432", "\uaa6c\ufe00", "\uaa6c\ufe00"],
        "sh": ["\ue442", "\uaa6c\ufe00", "\uaa6c\ufe00"],
        "t": ["\ue43E", "တ\ufe00", "တ\ufe00"],
        "th": ["\ue447", "တ\ufe00", "တ\ufe00"],
        "ts": ["\ue444", "တ\ufe00", "တ\ufe00"],
        "uz": ["\ue410", "ႃ", "ႃ"],
        "uc": ["\ue411", "ႃ", "ႃ"],
        "uq": ["\ue412", "ႃ", "ႃ"],
        "ux": ["\ue413", "ႃ", "ႃ"],
        "uez": ["\ue420", "ႃ", "ႃ"],
        "uec": ["\ue41f", "ႃ", "ႃ"],
        "uex": ["\ue422", "ႃ", "ႃ"],
        "ueq": ["\ue421", "ႃ", "ႃ"],
        "uiz": ["\ue417", "ႃ", "ႃ"],
        "uic": ["\ue418", "ႃ", "ႃ"],
        "uiq": ["\ue419", "ႃ", "ႃ"],
        "uix": ["\ue41a", "ႃ", "ႃ"],
        "uiuz": ["\ue423", "ႃ", "ႃ"],
        "uiuc": ["\ue424", "ႃ", "ႃ"],
        "uiuq": ["\ue425", "ႃ", "ႃ"],
        "uiux": ["\ue426", "ႃ", "ႃ"],
        "vz": ["\ue454", "ထ\ufe00", "ထ\ufe00"],
        "vc": ["\ue455", "ထ\ufe00", "ထ\ufe00"],
        "vq": ["\ue456", "ထ\ufe00", "ထ\ufe00"],
        "vx": ["\ue457", "ထ\ufe00", "ထ\ufe00"],
        "w": ["\ue434", "ဝ\ufe00", "ဝ\ufe00"],
        "x": ["ၵ\ufe00", "ၵ\ufe00", "ၵ\ufe00"],
        "xx": ["\ue448", "ဝ\ufe00", "ဝ\ufe00"],
        "y": ["\ue433", "ယ\ufe00", "ယ\ufe00"],
        "yy": ["\ue458", "ယ\ufe00", "ယ\ufe00"],
        "z": ["\uAA78", "ႃ", "ႃ"],
        "@": ["\ua9f2", "\ua9f2", "\u1092"],
        "(": ["(", "(", ", "],
        ")": [")", ")", ", "],
        "/": ["/", "\u104b", "\u104b"],
        "\\": ["\\", "\u104a", "\u104a"],
        "1": ["\ue449", "၁", "၁"],
        "2": ["\ue44a", "၂", "၂"],
        "3": ["\ue44b", "၃", "၃"],
        "4": ["\ue44c", "၄", "၄"],
        "5": ["\ue44d", "၅", "၅"],
        "6": ["\ue44e", "၆", "၆"],
        "7": ["\ue44f", "၇", "၇"],
        "8": ["\ue450", "၈", "၈"],
        "9": ["\ue451", "၉", "၉"],
        "0": ["\ue452", "၀", "၀"],
        "#": ["#", "\u1036", "\u1036"],
        "$": ["$", "\u102e", "\u102e"],
        "^": ["_", "\u102c", "\u102c"],
        "_": ["_", "\u103a\u105e", "\u103a\u105e"],
        "%": ["%", "\u00a0\u103a", "\u00a0\u103a"],
        "&": ["&", "&", "\u00a0\u109d"],
        "`": ["`", "`",  "\u1039ꩡ\ufe00"],
        "~": ["~", "~", "~"]
};

function toLower(instring) {
  return instring();  // Check if this actually works.
}

var tangsa_latin_chars =
    "htt|ue[zcqx]|uiu[zcqx]|" +
    "ue[zqx]|aw[zcqx]|ui[zcqx]|" +
    "-ng|" +
    "a[zcqx]|ch|dd|e[zcqx]|" +
    "ch|dd|gh|h[kt]|i[zcqx]|kh|n[ghy]|o[zcqx]|ph|sh|t[hs]|u[zcqx]|v[zcqx]|xx|yy|" +
    "b|d|f|g|h|j|k|l|m|n|p|r|s|t|w|x|y|[0-9]|" +
    "C|R|S|H|Y|\u0020";

function preParseLatin(instring) {
  var regex1 = new RegExp(tangsa_latin_chars, "gi");
  var outList = instring.match(regex1);
  return outList;
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var intext = inarea.value;
  var outtext = "";
  var out;
  var parsedText = preParseLatin(intext);
  for (var index = 0; index < parsedText.length; index ++) {
    var c = parsedText[index];
    out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
        out = result;
      }
    }
    outtext += out;
  }

  var newText = outtext;
  // Insert more complex replacements here.

  //  ePattern = /([\u1031\u103c]\ufe00?)([\u1000-\u1029\u1075-\u1081\uaa60-\uaa76]\uf300?)/gi;
  //  eReplace = "$2$1";
  //  newText = outtext.replace(ePattern, eReplace);


  // Consider doubled combiners, e.g., 103a twice.
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
