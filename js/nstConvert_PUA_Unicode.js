// Convert from Latin form of Tangsa to Lakhum Private Use Area (PUA) forms:

// Mappings for  Tangsa Lakhum
var map_encoding_names = [
  {source: 'Lakhum PUA', "target": 'Unicode', 'direction': 'both'.
];

var lakhum_PUA_Unicode = {
  // Lakhum PUA --> Lakhum Unicode
    '\uE400':	'\U016A70',
    '\uE401':	'\U016A71',
    '\uE402':	'\U016A72',
    '\uE403':	'\U016A73',
    '\uE404':	'\U016A74',
    '\uE405':	'\U016A75',
    '\uE406':	'\U016A76',
    '\uE407':	'\U016A77',
    '\uE408':	'\U016A7C',
    '\uE409':	'\U016A7D',
    '\uE40A':	'\U016A7E',
    '\uE40B':	'\U016A7F',
    '\uE40C':	'\U016A80',
    '\uE40D':	'\U016A81',
    '\uE40E':	'\U016A82',
    '\uE40F':	'\U016A83',
    '\uE410':	'\U016A84',
    '\uE411':	'\U016A85',
    '\uE412':	'\U016A86',
    '\uE413':	'\U016A87',
    '\uE414':	'\U016A88',
    '\uE415':	'\U016A89',
    '\uE416':	'\U016A8B',
    '\uE417':	'\U016A8C',
    '\uE418':	'\U016A8D',
    '\uE419':	'\U016A8E',
    '\uE41A':	'\U016A8F',
    '\uE41B':	'\U016A90',
    '\uE41C':	'\U016A91',
    '\uE41D':	'\U016A92',
    '\uE41E':	'\U016A93',
    '\uE41F':	'\U016A94',
    '\uE420':	'\U016A95',
    '\uE421':	'\U016A96',
    '\uE422':	'\U016A97',
    '\uE423':	'\U016A98',
    '\uE424':	'\U016A99',
    '\uE425':	'\U016A9A',
    '\uE426':	'\U016A9B',
    '\uE427':	'\U016A9C',
    '\uE428':	'\U016A9D',
    '\uE429':	'\U016A9E',
    '\uE42A':	'\U016AB9',
    '\uE42B':	'\U016ABA',
    '\uE42C':	'\U016ABB',
    '\uE42D':	'\U016ABC',
    '\uE42E':	'\U016AA0',
    '\uE42F':	'\U016AA1',
    '\uE430':	'\U016AA2',
    '\uE431':	'\U016AA3',
    '\uE432':	'\U016AA4',
    '\uE433':	'\U016AA5',
    '\uE434':	'\U016AA6',
    '\uE435':	'\U016AA7',
    '\uE436':	'\U016AA8',
    '\uE437':	'\U016AA9',
    '\uE438':	'\U016AAA',
    '\uE439':	'\U016AAB',
    '\uE43A':	'\U016AAC',
    '\uE43B':	'\U016AAD',
    '\uE43C':	'\U016AAE',
    '\uE43D':	'\U016AAF',
    '\uE43E':	'\U016AB0',
    '\uE43F':	'\U016AB1',
    '\uE440':	'\U016AB2',
    '\uE441':	'\U016AB3',
    '\uE442':	'\U016AB4',
    '\uE443':	'\U016AB5',
    '\uE444':	'\U016AB6',
    '\uE445':	'\U016AB7',
    '\uE446':	'\U016AB8',
    '\uE447':	'\U016AB9',
    '\uE448':	'\U016ABA',
    '\uE449':	'\U016AC1',
    '\uE44A':	'\U016AC2',
    '\uE44B':	'\U016AC3',
    '\uE44C':	'\U016AC4',
    '\uE44D':	'\U016AC5',
    '\uE44E':	'\U016AC6',
    '\uE44F':	'\U016AC7',
    '\uE450':	'\U016AC8',
    '\uE451':	'\U016AC9',
    '\uE452':	'\U016AC0',
    '\uE453':	'\U016A8A',
    '\uE454':	'\U016A78',
    '\uE455':	'\U016A79',
    '\uE456':	'\U016A7A',
    '\uE457':	'\U016A7B',
    '\uE458':	'\U016A7E',
};

var lakhum_Unicode_PUA = {
  // Lakhum Unicode --> Lakhum PUA
    '\U016A70':	'\uE400',
    '\U016A71',	'\uE401':
    '\U016A72',	'\uE402':
    '\U016A73',	'\uE403':
    '\U016A74',	'\uE404':
    '\U016A75',	'\uE405':
    '\U016A76',	'\uE406':
    '\U016A77',	'\uE407':
    '\U016A7C',	'\uE408':
    '\U016A7D',	'\uE409':
    '\U016A7E',	'\uE40A':
    '\U016A7F',	'\uE40B':
    '\U016A80',	'\uE40C':
    '\U016A81',	'\uE40D':
    '\U016A82',	'\uE40E':
    '\U016A83',	'\uE40F':
    '\U016A84',	'\uE410':
    '\U016A85',	'\uE411':
    '\U016A86',	'\uE412':
    '\U016A87',	'\uE413':
    '\U016A88',	'\uE414':
    '\U016A89',	'\uE415':
    '\U016A8B',	'\uE416':
    '\U016A8C',	'\uE417':
    '\U016A8D',	'\uE418':
    '\U016A8E',	'\uE419':
    '\U016A8F',	'\uE41A':
    '\U016A90',	'\uE41B':
    '\U016A91',	'\uE41C':
    '\U016A92',	'\uE41D':
    '\U016A93',	'\uE41E':
    '\U016A94',	'\uE41F':
    '\U016A95',	'\uE420':
    '\U016A96',	'\uE421':
    '\U016A97',	'\uE422':
    '\U016A98',	'\uE423':
    '\U016A99',	'\uE424':
    '\U016A9A',	'\uE425':
    '\U016A9B',	'\uE426':
    '\U016A9C',	'\uE427':
    '\U016A9D',	'\uE428':
    '\U016A9E',	'\uE429':
    '\U016AB9',	'\uE42A':
    '\U016ABA',	'\uE42B':
    '\U016ABB',	'\uE42C':
    '\U016ABC',	'\uE42D':
    '\U016AA0',	'\uE42E':
    '\U016AA1',	'\uE42F':
    '\U016AA2',	'\uE430':
    '\U016AA3',	'\uE431':
    '\U016AA4',	'\uE432':
    '\U016AA5',	'\uE433':
    '\U016AA6',	'\uE434':
    '\U016AA7',	'\uE435':
    '\U016AA8',	'\uE436':
    '\U016AA9',	'\uE437':
    '\U016AAA',	'\uE438':
    '\U016AAB',	'\uE439':
    '\U016AAC',	'\uE43A':
    '\U016AAD',	'\uE43B':
    '\U016AAE',	'\uE43C':
    '\U016AAF',	'\uE43D':
    '\U016AB0',	'\uE43E':
    '\U016AB1',	'\uE43F':
    '\U016AB2',	'\uE440':
    '\U016AB3',	'\uE441':
    '\U016AB4',	'\uE442':
    '\U016AB5',	'\uE443':
    '\U016AB6',	'\uE444':
    '\U016AB7',	'\uE445':
    '\U016AB8',	'\uE446':
    '\U016AB9',	'\uE447':
    '\U016ABA',	'\uE448':
    '\U016AC1',	'\uE449':
    '\U016AC2',	'\uE44A':
    '\U016AC3',	'\uE44B':
    '\U016AC4',	'\uE44C':
    '\U016AC5',	'\uE44D':
    '\U016AC6',	'\uE44E':
    '\U016AC7',	'\uE44F':
    '\U016AC8',	'\uE450':
    '\U016AC9',	'\uE451':
    '\U016AC0',	'\uE452':
    '\U016A8A',	'\uE453':
    '\U016A78',	'\uE454':
    '\U016A79',	'\uE455':
    '\U016A7A',	'\uE456':
    '\U016A7B',	'\uE457':
    '\U016A7E',	'\uE458':
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