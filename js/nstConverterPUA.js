// Convert from Latin form of Tangsa to Lakhum Private Use Area (PUA) forms:

// Mappings for Tangsa Lakhum
var map_encoding_names = [
  'Gam Win',
];

var private_use_map_combined = {
  // Gam Win --> Lakhum personal area code
  'mnvungz': ['\ue427\ue43a\ue454\ue410\ue41b'],
  'mznvungz': ['\ue427\ue43a\ue454\ue410\ue41b'],
  'mnaungz': ['\ue427\ue43a\ue404\ue410\ue41b'],
  'vungz': ['\ue454\ue410\ue41b'],
  'vungc': ['\ue455\ue411\ue41b'],
  'vungx': ['\ue457\ue413\ue41b'],
  'vuk': ['\ue454\ue412\ue42e'],
  'ovyz': ['\ue400\ue40c'],
  'ovyc': ['\ue401\ue40d'],
  'ovyx': ['\ue403\ue40f'],
  'ovmz': ['\ue400\ue439'],
  'ovmc': ['\ue401\ue439'],
  'ovmx': ['\ue403\ue439'],
  'oamz': ['\ue400\ue439'],
  'oamc': ['\ue401\ue439'],
  'oamx': ['\ue403\ue439'],
  'omz': ['\ue400\ue439'],
  'omc': ['\ue401\ue439'],
  'omx': ['\ue403\ue439'],
  'ovnz': ['\ue400\ue43a'],
  'ovnc': ['\ue401\ue43a'],
  'ovnx': ['\ue403\ue43a'],
  'ovlz': ['\ue400\ue43c'],
  'ovlc': ['\ue401\ue43c'],
  'ovlx': ['\ue403\ue43c'],
  'ovrz': ['\ue400\ue440'],
  'ovrc': ['\ue401\ue440'],
  'ovrx': ['\ue403\ue440'],
  'ovp': ['\ue400\ue435'],
  'ovt': ['\ue400\ue43e'],
   // Before 29-Sep-2020
   // Before 29-Sep-2020

  'mnaungz': ['\ue427\ue43a\ue404\ue410\ue41b'],
  'mznaungz': ['\ue427\ue43a\ue404\ue410\ue41b'],
  'mrvkueq': ['\ue427\ue440\ue454\ue42e\ue421'],
  'aungz': ['\ue404\ue410\ue41b'],
  'aungc': ['\ue405\ue411\ue41b'],
  'aungx': ['\ue407\ue413\ue41b'],
  'auk': ['\ue404\ue412\ue42e'],
  'uiyq': ['\ue417\ue40e'],
  'vyq': ['\ue454\ue40e'],
  'oq': ['\ue402'],
  'aq': ['\ue406'],
  'vq': ['\ue456'],
  'eq': ['\ue40a'],
  'iq': ['\ue40e'],
  'uq': ['\ue412'],
  'awq': ['\ue453'],
  'uiq': ['\ue419'],
  'ueq': ['\ue421'],
  'uiuq': ['\ue425'],
  'oayz': ['\ue400\ue40c'],
  'oayc': ['\ue401\ue40d'],
  'oayx': ['\ue403\ue40f'],
  'ayz': ['\ue404\ue40c'],
  'ayc': ['\ue405\ue40d'],
  'ayx': ['\ue407\ue40f'],
  'vyz': ['\ue454\ue40c'],
  'vyc': ['\ue455\ue40d'],
  'vyx': ['\ue457\ue40f'],
  'uyz': ['\ue410\ue40c'],
  'uyc': ['\ue411\ue40d'],
  'uyx': ['\ue413\ue40f'],
  'uiyz': ['\ue417\ue40c'],
  'uiyc': ['\ue418\ue40d'],
  'uiyx': ['\ue41a\ue40f'],
  'ueyz': ['\ue420\ue40c'],
  'ueyc': ['\ue41f\ue40d'],
  'ueyx': ['\ue422\ue40f'],
  'ongz': ['\ue400\ue41b'],
  'ongc': ['\ue401\ue41b'],
  'ongx': ['\ue403\ue41b'],
  'angz': ['\ue404\ue41b'],
  'angc': ['\ue405\ue41b'],
  'angx': ['\ue407\ue41b'],
  'vngz': ['\ue454\ue41b'],
  'vngc': ['\ue455\ue41b'],
  'vngx': ['\ue457\ue41b'],
  'engz': ['\ue408\ue41b'],
  'engc': ['\ue409\ue41b'],
  'engx': ['\ue40b\ue41b'],
  'ingz': ['\ue40c\ue41b'],
  'ingc': ['\ue40d\ue41b'],
  'ingx': ['\ue40f\ue41b'],
  'ungz': ['\ue410\ue41b'],
  'ungc': ['\ue411\ue41b'],
  'ungx': ['\ue413\ue41b'],
  'awngz': ['\ue414\ue41b'],
  'awngc': ['\ue415\ue41b'],
  'awngx': ['\ue416\ue41b'],
  'uingz': ['\ue417\ue41b'],
  'uingc': ['\ue418\ue41b'],
  'uingx': ['\ue41a\ue41b'],
  'uengz': ['\ue420\ue41b'],
  'uengc': ['\ue41f\ue41b'],
  'uengx': ['\ue422\ue41b'],
  'uiungz': ['\ue423\ue41b'],
  'uiungc': ['\ue424\ue41b'],
  'uiungx': ['\ue426\ue41b'],
  'amz': ['\ue404\ue439'],
  'amc': ['\ue405\ue439'],
  'amx': ['\ue407\ue439'],
  'vmz': ['\ue454\ue439'],
  'vmc': ['\ue455\ue439'],
  'vmx': ['\ue457\ue439'],
  'emz': ['\ue408\ue439'],
  'emc': ['\ue409\ue439'],
  'emx': ['\ue40b\ue439'],
  'imz': ['\ue40c\ue439'],
  'imc': ['\ue40d\ue439'],
  'imx': ['\ue40f\ue439'],
  'umz': ['\ue410\ue439'],
  'umc': ['\ue411\ue439'],
  'umx': ['\ue413\ue439'],
  'awmz': ['\ue414\ue439'],
  'awmc': ['\ue415\ue439'],
  'awmx': ['\ue416\ue439'],
  'uimz': ['\ue417\ue439'],
  'uimc': ['\ue418\ue439'],
  'uimx': ['\ue41a\ue439'],
  'uemz': ['\ue420\ue439'],
  'uemc': ['\ue41f\ue439'],
  'uemx': ['\ue422\ue439'],
  'uiumz': ['\ue423\ue439'],
  'uiumc': ['\ue424\ue439'],
  'uiumx': ['\ue426\ue439'],
  'oanz': ['\ue400\ue43a'],
  'oanc': ['\ue401\ue43a'],
  'oanx': ['\ue403\ue43a'],
  'anz': ['\ue404\ue43a'],
  'anc': ['\ue405\ue43a'],
  'anx': ['\ue407\ue43a'],
  'vnz': ['\ue454\ue43a'],
  'vnc': ['\ue455\ue43a'],
  'vnx': ['\ue457\ue43a'],
  'enz': ['\ue408\ue43a'],
  'enc': ['\ue409\ue43a'],
  'enx': ['\ue40b\ue43a'],
  'inz': ['\ue40c\ue43a'],
  'inc': ['\ue40d\ue43a'],
  'inx': ['\ue40f\ue43a'],
  'unz': ['\ue410\ue43a'],
  'unc': ['\ue411\ue43a'],
  'unx': ['\ue413\ue43a'],
  'awnz': ['\ue414\ue43a'],
  'awnc': ['\ue415\ue43a'],
  'awnx': ['\ue416\ue43a'],
  'uinz': ['\ue417\ue43a'],
  'uinc': ['\ue418\ue43a'],
  'uinx': ['\ue41a\ue43a'],
  'uenz': ['\ue420\ue43a'],
  'uenc': ['\ue41f\ue43a'],
  'uenx': ['\ue422\ue43a'],
  'uiunz': ['\ue423\ue43a'],
  'uiunc': ['\ue424\ue43a'],
  'uiunx': ['\ue426\ue43a'],
  'oalz': ['\ue400\ue43c'],
  'oalc': ['\ue401\ue43c'],
  'oalx': ['\ue403\ue43c'],
  'alz': ['\ue404\ue43c'],
  'alc': ['\ue405\ue43c'],
  'alx': ['\ue407\ue43c'],
  'vlz': ['\ue454\ue43c'],
  'vlc': ['\ue455\ue43c'],
  'vlx': ['\ue457\ue43c'],
  'elz': ['\ue408\ue43c'],
  'elc': ['\ue409\ue43c'],
  'elx': ['\ue40b\ue43c'],
  'ilz': ['\ue40c\ue43c'],
  'ilc': ['\ue40d\ue43c'],
  'ilx': ['\ue40f\ue43c'],
  'ulz': ['\ue410\ue43c'],
  'ulc': ['\ue411\ue43c'],
  'ulx': ['\ue413\ue43c'],
  'awlz': ['\ue414\ue43c'],
  'awlc': ['\ue415\ue43c'],
  'awlx': ['\ue416\ue43c'],
  'uilz': ['\ue417\ue43c'],
  'uilc': ['\ue418\ue43c'],
  'uilx': ['\ue41a\ue43c'],
  'uelz': ['\ue420\ue43c'],
  'uelc': ['\ue41f\ue43c'],
  'uelx': ['\ue422\ue43c'],
  'uiulz': ['\ue423\ue43c'],
  'uiulc': ['\ue424\ue43c'],
  'uiulx': ['\ue426\ue43c'],
  'oarz': ['\ue400\ue440'],
  'oarc': ['\ue401\ue440'],
  'oarx': ['\ue403\ue440'],
  'arz': ['\ue404\ue440'],
  'arc': ['\ue405\ue440'],
  'arx': ['\ue407\ue440'],
  'vrz': ['\ue454\ue440'],
  'vrc': ['\ue455\ue440'],
  'vrx': ['\ue457\ue440'],
  'erz': ['\ue408\ue440'],
  'erc': ['\ue409\ue440'],
  'erx': ['\ue40b\ue440'],
  'irz': ['\ue40c\ue440'],
  'irc': ['\ue40d\ue440'],
  'irx': ['\ue40f\ue440'],
  'urz': ['\ue410\ue440'],
  'urc': ['\ue411\ue440'],
  'urx': ['\ue413\ue440'],
  'awrz': ['\ue414\ue440'],
  'awrc': ['\ue415\ue440'],
  'awrx': ['\ue416\ue440'],
  'uirz': ['\ue417\ue440'],
  'uirc': ['\ue418\ue440'],
  'uirx': ['\ue41a\ue440'],
  'uerz': ['\ue420\ue440'],
  'uerc': ['\ue41f\ue440'],
  'uerx': ['\ue422\ue440'],
  'uiurz': ['\ue423\ue440'],
  'uiurc': ['\ue424\ue440'],
  'uiurx': ['\ue426\ue440'],
  'ok': ['\ue400\ue42e'],
  'ak': ['\ue404\ue42e'],
  'vk': ['\ue454\ue42e'],
  'ek': ['\ue408\ue42e'],
  'ik': ['\ue40c\ue42e'],
  'uk': ['\ue410\ue423'],
  'awk': ['\ue414\ue42e'],
  'uik': ['\ue417\ue42e'],  // Changed from 17, 23
  'uek': ['\ue420\ue42e'],
  'uiuk': ['\ue423\ue42e'],
  'oap': ['\ue400\ue435'],
  'op': ['\ue400\ue435'],
  'ap': ['\ue404\ue435'],
  'vp': ['\ue454\ue435'],
  'ep': ['\ue408\ue435'],
  'ip': ['\ue40c\ue435'],
  'up': ['\ue410\ue435'],
  'awp': ['\ue414\ue435'],
  'uip': ['\ue417\ue435'],
  'uep': ['\ue420\ue435'],
  'uiup': ['\ue435\ue435'],
  'oat': ['\ue400\ue43e'],
  'at': ['\ue404\ue43e'],
  'vt': ['\ue454\ue43e'],
  'et': ['\ue408\ue43e'],
  'it': ['\ue40c\ue43e'],
  'ut': ['\ue410\ue43e'],
  'awt': ['\ue414\ue43e'],
  'uit': ['\ue417\ue43e'],
  'uet': ['\ue420\ue43e'],
  'uiut': ['\ue43e\ue43e'],
  'oz': ['\ue400'],
  'oc': ['\ue401'],
  'ox': ['\ue403'],
  'az': ['\ue404'],
  'ac': ['\ue405'],
  'ax': ['\ue407'],
  'vz': ['\ue454'],
  'vc': ['\ue455'],
  'vx': ['\ue457'],
  'ez': ['\ue408'],
  'ec': ['\ue409'],
  'ex': ['\ue40b'],
  'iz': ['\ue40c'],
  'ic': ['\ue40d'],
  'ix': ['\ue40f'],
  'uz': ['\ue410'],
  'uc': ['\ue411'],
  'ux': ['\ue413'],
  'awz': ['\ue414'],
  'awc': ['\ue415'],
  'awx': ['\ue416'],
  'uiz': ['\ue417'],
  'uic': ['\ue418'],
  'uix': ['\ue41a'],
  'uez': ['\ue420'],
  'uec': ['\ue41f'],
  'uex': ['\ue422'],
  'uiuz': ['\ue423'],
  'uiuc': ['\ue424'],
  'uiux': ['\ue426'],
  'htt': ['\ue446'],
  'th': ['\ue447'],
  'ht': ['\ue43d'],
  'ch': ['\ue42d'],
  'kh': ['\ue42f'],
  'ng': ['\ue431'],
  'ny': ['\ue436'],
  'ph': ['\ue437'],
  'nh': ['\ue441'],
  'sh': ['\ue442'],
  'ts': ['\ue444'],
  'gh': ['\ue445'],
  'f': ['\ue42b'],
  'k': ['\ue42e'],
  'g': ['\ue430'],
  's': ['\ue432'],
  'y': ['\ue433'],
  'w': ['\ue434'],
  'p': ['\ue435'],
  'b': ['\ue438'],
  'm': ['\ue439'],
  'n': ['\ue43a'],
  'h': ['\ue43b'],
  'l': ['\ue43c'],
  't': ['\ue43e'],
  'd': ['\ue43f'],
  'r': ['\ue440'],
  'j': ['\ue433'],
  'v': ['\ue454'],
  '\u000a': ['\u000a'],
};


var gamwin_latin_chars =
    "mnvungz|mznvungz|vungz|vungc|vungx|vuk|ovyz|ovyc|ovyx|" +
    "oamz|oamc|oamx|omz|omc|omx|ovnz|ovnc|ovnx|ovlz|ovlc|ovlx|" +
    "ovmz|ovmc|ovmx|ovrz|ovrc|ovrx|ovp|ovt|" +
    "mnaungz|mznaungz|mrvkueq|aungz|aungc|aungx|auk|uiyq|vyq|oq|aq|" +
    "vq|eq|iq|uq|awq|uiq|ueq|uiuq|oayz|oayc|oayx|ayz|ayc|ayx|vyz|vyc|" +
    "vyx|uyz|uyc|uyx|uiyz|uiyc|uiyx|ueyz|ueyc|ueyx|ongz|ongc|ongx|" +
    "angz|angc|angx|vngz|vngc|vngx|engz|engc|engx|ingz|ingc|ingx|" +
    "ungz|ungc|ungx|awngz|awngc|awngx|uingz|uingc|uingx|uengz|" +
    "uengc|uengx|uiungz|uiungc|uiungx|oamz|oamc|oamx|amz|amc|" +
    "amx|vmz|vmc|vmx|emz|emc|emx|imz|imc|imx|umz|umc|umx|awmz|" +
    "awmc|awmx|uimz|uimc|uimx|uemz|uemc|uemx|uiumz|uiumc|uiumx|" +
    "oanz|oanc|oanx|anz|anc|anx|vnz|vnc|vnx|enz|enc|enx|inz|inc|" +
    "inx|unz|unc|unx|awnz|awnc|awnx|uinz|uinc|uinx|uenz|uenc|" +
    "uenx|uiunz|uiunc|uiunx|oalz|oalc|oalx|alz|alc|alx|vlz|vl" +
    "c|vlx|elz|elc|elx|ilz|ilc|ilx|ulz|ulc|ulx|awlz|awlc|awlx|" +
    "uilz|uilc|uilx|uelz|uelc|uelx|uiulz|uiulc|uiulx|oarz|" +
    "oarc|oarx|arz|arc|arx|vrz|vrc|vrx|erz|erc|erx|irz|irc|irx|" +
    "urz|urc|urx|awrz|awrc|awrx|uirz|uirc|uirx|uerz|uerc|uerx|" +
//    "uiurz|uiurc|uiurx|ok|ak|vk|ek|ik|uk|awk|uik|uek|uiuk|oap|" +
    "uiurz|uiurc|uiurx|ok|ak|ek|ik|uk|awk|uik|uek|uiuk|oap|" +
    "ph|op|ap|vk|ep|ip|up|awp|uip|uep|uiup|oat|at|vt|et|it|ut|awt|" +
    "uit|uet|uiut|oz|oc|ox|az|ac|ax|vz|vc|vx|ez|ec|ex|iz|ic|ix|" +
    "uz|uc|ux|awz|awc|awx|uiz|uic|uix|uez|uec|uex|uiuz|uiuc|" +
    "uiux|htt|th|ht|ch|kh|ng|ny|nh|sh|ts|gh|f|k|g|s|y|w|p|" +
    "b|m|n|h|l|t|d|r|j|v|\u0020|,|\.|\u000a";

function preParseLatin(instring) {
  //  var regex1 = new RegExp(tangsa_latin_chars, "gi");
  var regex1 = new RegExp(gamwin_latin_chars, "gi");
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
  var parsedText = preParseLatin(intext.toLowerCase());
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
