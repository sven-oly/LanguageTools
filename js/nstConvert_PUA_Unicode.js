// Convert from Latin form of Tangsa to Lakhum Private Use Area (PUA) forms:

// Mappings for  Tangsa Lakhum
var map_encoding_names = [
  {source: 'Lakhum PUA', "target": 'Unicode', 'direction': 'both'.
];

var lakhum_PUA_Unicode = {
  // Lakhum PUA --> Lakhum Unicode
    '\u0E400':	'\U016A70',
    '\u0E401':	'\U016A71',
    '\u0E402':	'\U016A72',
    '\u0E403':	'\U016A73',
    '\u0E404':	'\U016A74',
    '\u0E405':	'\U016A75',
    '\u0E406':	'\U016A76',
    '\u0E407':	'\U016A77',
    '\u0E408':	'\U016A7C',
    '\u0E409':	'\U016A7D',
    '\u0E40A':	'\U016A7E',
    '\u0E40B':	'\U016A7F',
    '\u0E40C':	'\U016A80',
    '\u0E40D':	'\U016A81',
    '\u0E40E':	'\U016A82',
    '\u0E40F':	'\U016A83',
    '\u0E410':	'\U016A84',
    '\u0E411':	'\U016A85',
    '\u0E412':	'\U016A86',
    '\u0E413':	'\U016A87',
    '\u0E414':	'\U016A88',
    '\u0E415':	'\U016A89',
    '\u0E416':	'\U016A8B',
    '\u0E417':	'\U016A8C',
    '\u0E418':	'\U016A8D',
    '\u0E419':	'\U016A8E',
    '\u0E41A':	'\U016A8F',
    '\u0E41B':	'\U016A90',
    '\u0E41C':	'\U016A91',
    '\u0E41D':	'\U016A92',
    '\u0E41E':	'\U016A93',
    '\u0E41F':	'\U016A94',
    '\u0E420':	'\U016A95',
    '\u0E421':	'\U016A96',
    '\u0E422':	'\U016A97',
    '\u0E423':	'\U016A98',
    '\u0E424':	'\U016A99',
    '\u0E425':	'\U016A9A',
    '\u0E426':	'\U016A9B',
    '\u0E427':	'\U016A9C',
    '\u0E428':	'\U016A9D',
    '\u0E429':	'\U016A9E',
    '\u0E42A':	'\U016AB9',
    '\u0E42B':	'\U016ABA',
    '\u0E42C':	'\U016ABB',
    '\u0E42D':	'\U016ABC',
    '\u0E42E':	'\U016AA0',
    '\u0E42F':	'\U016AA1',
    '\u0E430':	'\U016AA2',
    '\u0E431':	'\U016AA3',
    '\u0E432':	'\U016AA4',
    '\u0E433':	'\U016AA5',
    '\u0E434':	'\U016AA6',
    '\u0E435':	'\U016AA7',
    '\u0E436':	'\U016AA8',
    '\u0E437':	'\U016AA9',
    '\u0E438':	'\U016AAA',
    '\u0E439':	'\U016AAB',
    '\u0E43A':	'\U016AAC',
    '\u0E43B':	'\U016AAD',
    '\u0E43C':	'\U016AAE',
    '\u0E43D':	'\U016AAF',
    '\u0E43E':	'\U016AB0',
    '\u0E43F':	'\U016AB1',
    '\u0E440':	'\U016AB2',
    '\u0E441':	'\U016AB3',
    '\u0E442':	'\U016AB4',
    '\u0E443':	'\U016AB5',
    '\u0E444':	'\U016AB6',
    '\u0E445':	'\U016AB7',
    '\u0E446':	'\U016AB8',
    '\u0E447':	'\U016AB9',
    '\u0E448':	'\U016ABA',
    '\u0E449':	'\U016AC1',
    '\u0E44A':	'\U016AC2',
    '\u0E44B':	'\U016AC3',
    '\u0E44C':	'\U016AC4',
    '\u0E44D':	'\U016AC5',
    '\u0E44E':	'\U016AC6',
    '\u0E44F':	'\U016AC7',
    '\u0E450':	'\U016AC8',
    '\u0E451':	'\U016AC9',
    '\u0E452':	'\U016AC0',
    '\u0E453':	'\U016A8A',
    '\u0E454':	'\U016A78',
    '\u0E455':	'\U016A79',
    '\u0E456':	'\U016A7A',
    '\u0E457':	'\U016A7B',
    '\u0E458':	'\U016A7E',
};

var lakhum_Unicode_PUA = {
  // Lakhum Unicode --> Lakhum PUA
    '\U016A70':	'\u0E400',
    '\U016A71',	'\u0E401':
    '\U016A72',	'\u0E402':
    '\U016A73',	'\u0E403':
    '\U016A74',	'\u0E404':
    '\U016A75',	'\u0E405':
    '\U016A76',	'\u0E406':
    '\U016A77',	'\u0E407':
    '\U016A7C',	'\u0E408':
    '\U016A7D',	'\u0E409':
    '\U016A7E',	'\u0E40A':
    '\U016A7F',	'\u0E40B':
    '\U016A80',	'\u0E40C':
    '\U016A81',	'\u0E40D':
    '\U016A82',	'\u0E40E':
    '\U016A83',	'\u0E40F':
    '\U016A84',	'\u0E410':
    '\U016A85',	'\u0E411':
    '\U016A86',	'\u0E412':
    '\U016A87',	'\u0E413':
    '\U016A88',	'\u0E414':
    '\U016A89',	'\u0E415':
    '\U016A8B',	'\u0E416':
    '\U016A8C',	'\u0E417':
    '\U016A8D',	'\u0E418':
    '\U016A8E',	'\u0E419':
    '\U016A8F',	'\u0E41A':
    '\U016A90',	'\u0E41B':
    '\U016A91',	'\u0E41C':
    '\U016A92',	'\u0E41D':
    '\U016A93',	'\u0E41E':
    '\U016A94',	'\u0E41F':
    '\U016A95',	'\u0E420':
    '\U016A96',	'\u0E421':
    '\U016A97',	'\u0E422':
    '\U016A98',	'\u0E423':
    '\U016A99',	'\u0E424':
    '\U016A9A',	'\u0E425':
    '\U016A9B',	'\u0E426':
    '\U016A9C',	'\u0E427':
    '\U016A9D',	'\u0E428':
    '\U016A9E',	'\u0E429':
    '\U016AB9',	'\u0E42A':
    '\U016ABA',	'\u0E42B':
    '\U016ABB',	'\u0E42C':
    '\U016ABC',	'\u0E42D':
    '\U016AA0',	'\u0E42E':
    '\U016AA1',	'\u0E42F':
    '\U016AA2',	'\u0E430':
    '\U016AA3',	'\u0E431':
    '\U016AA4',	'\u0E432':
    '\U016AA5',	'\u0E433':
    '\U016AA6',	'\u0E434':
    '\U016AA7',	'\u0E435':
    '\U016AA8',	'\u0E436':
    '\U016AA9',	'\u0E437':
    '\U016AAA',	'\u0E438':
    '\U016AAB',	'\u0E439':
    '\U016AAC',	'\u0E43A':
    '\U016AAD',	'\u0E43B':
    '\U016AAE',	'\u0E43C':
    '\U016AAF',	'\u0E43D':
    '\U016AB0',	'\u0E43E':
    '\U016AB1',	'\u0E43F':
    '\U016AB2',	'\u0E440':
    '\U016AB3',	'\u0E441':
    '\U016AB4',	'\u0E442':
    '\U016AB5',	'\u0E443':
    '\U016AB6',	'\u0E444':
    '\U016AB7',	'\u0E445':
    '\U016AB8',	'\u0E446':
    '\U016AB9',	'\u0E447':
    '\U016ABA',	'\u0E448':
    '\U016AC1',	'\u0E449':
    '\U016AC2',	'\u0E44A':
    '\U016AC3',	'\u0E44B':
    '\U016AC4',	'\u0E44C':
    '\U016AC5',	'\u0E44D':
    '\U016AC6',	'\u0E44E':
    '\U016AC7',	'\u0E44F':
    '\U016AC8',	'\u0E450':
    '\U016AC9',	'\u0E451':
    '\U016AC0',	'\u0E452':
    '\U016A8A',	'\u0E453':
    '\U016A78',	'\u0E454':
    '\U016A79',	'\u0E455':
    '\U016A7A',	'\u0E456':
    '\U016A7B',	'\u0E457':
    '\U016A7E',	'\u0E458':
}

function replaceMappedText(intext, mapping) {
    for (var index = 0; index < intext.length; index ++) {
       var c = parsedText[index];
       out = c;
       if (c in mapping) {
         var result = mapping[c];
         if (result) {
           out = result;
         }
       }
       outtext += out;
     }
}

// First, replace all single characters with their Unicode equivalents.
function convertLakhumPUAToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var outtext = replaceMappedText(inarea.value, lakhum_PUA_Unicode)

  if (outarea) {
    outarea.innerHTML = outarea.value = outtext;
  }
  return outtext;
}

// First, replace all single characters with their Unicode equivalents.
function convertLakhumUnicodeToPUAUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var outtext = replaceMappedText(inarea.value, lakhum_Unicode_PUYAPUA_Unicode)

  if (outarea) {
    outarea.innerHTML = outarea.value = outtext;
  }
  return outtext;
}