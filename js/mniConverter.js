// Convert from old font-encoding of Oneida text to Unicode forms:
const langConverter = new langConverterClass('mni', 'Meitei');

langConverter.addOne2OneTransforms(
  "ABCDEFGIKMNORSTWXZ",
  "ꯝꯎꯓ꯭ꯟꯊꯠꯪꯁꯜꯞꯣꯙꯈꯏꯐꯘꯉ", 0
);

langConverter.addOne2OneTransforms(
  "abcdefgijklmopqrsvwxyz",
  "ꯃꯨꯖꯛꯅꯇꯤꯡꯔꯥꯦꯂꯍꯩꯕꯗꯀꯆꯄꯒꯧꯚ", 0
);

langConverter.addOne2OneTransforms(
  "1234567890[]\\",
  "꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰ꯑꯢꯌ",
  0
);


// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'RATHA99': {index:0, outputEncoding:'Unicode', outputScript:'Meitei'},
    'RATHA': {index:0, outputEncoding:'Unicode', outputScript:'Meitei'},
    'rathayek': {index:0, outputEncoding:'Unicode', outputScript:'Meitei'},
};

const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];
const translit_source = 'Santali';

const map_translit_sources = [
    "https://wesanthals.tripod.com/id19.html",
];

