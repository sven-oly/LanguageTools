// Convert from old font-encoding of Ahom text to Unicode forms:
const langConverter = new langConverterClass('aho', 'Tai Ahom');

// Mappings for Ahom old ASCII encoding to Unicode font
// Source: Stephen Morey
// Started 8-Nov-2017
langConverter.map_encoding_names = map_encoding_names = ['Assam New'];

langConverter.encoding_data = {
    'Assam New': {index:0, outputEncoding:'Unicode', outputScript:'Beng'}
};

// 
private_use_map_combined = {
    "¡": 'ক',
    "¢": 'খ',
    "¤": 'গ',
    "¦": 'ঘ',
    "§": 'ঙ',
    "¨": 'চ',
    "©": 'ছ',
    "ª": 'জ',
    "¬": 'ঝ',
    "\u00AD": 'ঞ',  // Soft hyphen
    '¯': 'ট',
    '°': 'ঠ',
    '±': 'ড',
    '²': 'ঢ',
    '³': 'ণ',
    '´': 'ৎ',
    'µ': 'ত',
    '¶': 'থ',
    '·': 'দ',
    '¸': 'ধ',
    '¹': 'ন',
    '»': 'প',
    '¼': 'ফ',
    '¾': 'ব',
    'À': 'ভ',
    'Á': 'ম',
    'Â': 'য',
    'Ã': 'ৰ',
    'Å': 'ল',
    'Ç': 'ৱ',
    'Æ': 'র',
    'È': 'শ',
    'É': 'ষ',
    'Ê': 'স',
    'Ë': 'হ',
    'V': '',
    '×': 'ং',
    'Ð': 'ঃ',
    'í': 'ঁ',
    'Ä': 'ড়',
    'Ì': 'ঢ়',
    '¿': 'য়',
    'Í': 'অ',
    'ÍÒ': 'আ',
    'b': 'ই',
    'u': 'ঈ',
    '6': 'উ',
    '^': 'ঊ',
    '7': 'ঋ',
    'g': 'এ',
    'c': 'ঐ',
    'F': 'ও',
    'w': 'ঔ',

    'Ò': 'া',
    'Ô': 'ি',
    'å': 'ি',
    'Õ': 'ী',
    'Ø': 'ু',
    'Ù': 'ূ',
    'Ö': 'ৃ',
    'à': 'ে',
    'á': 'ৈ',
    'ä': 'ৗ',
    'ì': '\u09cd',
    'p': '\u09cd\u09af',
    'x': '\u09aa',
};

langConverter.one2oneMap = langConverter.dictionaryToMap(private_use_map_combined);


langConverter.convertEncodingToUnicode = function(inbox, outbox, encodingIndex) {
    var inarea = document.getElementById(inbox);
    var outarea = document.getElementById(outbox);

    // First, replace all single characters with their Unicode equivalents.
    var intext = inarea.value;
    var outtext = "";
    var out;
    for (var index = 0; index < intext.length; index ++) {
        var c = intext[index];
        out = c;
        if (c in private_use_map_combined) {
            var result = private_use_map_combined[c]; // Only one entry for each key.
            if (result) {
                out = result;
            }
        } else  {
            let unconverted = c;
        }
        outtext += out;
    }
    var newText = outtext;

    // Change 9cc to a 9c7 if before a consonant
    let ePattern = /([\u09cc])([\u0985-\u09b9\u09dc-\u09fd])/gi;
    let eReplace = "\u09c7$2";
    newText = outtext = newText.replaceAll(ePattern, eReplace);

    ePattern = /([\u09bf\u09c7-\u09cc])([\u09af\u0985-\u09b9\u09dc-\u09fd])/gi;
    eReplace = "$2$1";
    newText = outtext = newText.replaceAll(ePattern, eReplace);

    // to laugh
    ePattern = /([\u0981])([\u09be])/gi;
    eReplace = "$2$1";
    newText = outtext = newText.replaceAll(ePattern, eReplace);
    
    // 0985 9be - insert 200d between these
    ePattern = /\u0985\u09bE/gi;
    eReplace = "\u0985\u200d\u09be";
    newText = outtext = newText.replaceAll(ePattern, eReplace);

    // 0997 09c1 - insert 200d between these
    // Turbid, mud mixed with water
    ePattern = /\u0997\u09c1/gi;
    eReplace = "\u0997\u200d\u09c1";
    newText = outtext = newText.replaceAll(ePattern, eReplace);
    
    // 09cd 09a1 - insert 200b between these
    ePattern = /\u09cd([\u09a1-\u09a5\u0997\u099f\u09ae\u09b2])/gi;
    eReplace = "\u09cd\u200b$1";
    newText = outtext = newText.replaceAll(ePattern, eReplace);

    // Doubled charaacter
    ePattern = /([\u09cc])([\u09cc])"/gi;
    eReplace = "$1";
    newText = outtext = newText.replaceAll(ePattern, eReplace);

    if (outarea) {
        outarea.innerHTML = outarea.value = newText;
    }
    return newText;
}
