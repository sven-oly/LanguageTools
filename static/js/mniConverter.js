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
  "1234567890[]\\=",
  "꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰ꯑꯢꯌꯆ",
  0
);

// TODO: Add E-pao conversions
langConverter.addOne2OneTransforms(
  "=ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]",
  "=\uabd1\uabdaC\uabd9\uabe9F\uabd8\uabe1\uabcf\uabd3\uabc8\uabdc\uabdd\uabdf\uabe7\uabde\uabdbRS\uabca\uabceVWX\uabe0\uabc9[\\]",
  1
);
langConverter.addOne2OneTransforms(
  "abcdefghijklmnopqrstuvwxyz",
  "\uabe5\uabd5\uabc6\uabd7\uabe6\uabd0\uabd2\uabcd\uabe4\uabd6\uabc0\uabc2\uabc3\uabc5\uabe3\uabc4\uabea\uabd4\uabc1\uabc7\uabe8\uabda\uabcbx\uabccz",
  1
);
langConverter.addOne2OneTransforms(
  "0123456789",
  "\uabf0\uabf1\uabf2\uabf3\uabf4\uabf5\uabf6\uabf7\uabf8\uabf9",
  1
);

// For Eeyek font - TODO: finish
langConverter.addOne2OneTransforms(
  "=ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]",
  "=\uabe5\uabd5C\uabd9\uabe9F\uabd8\uabe1\uabcf\uabd3\uabc8\uabdc\uabdd\uabdf\uabe7\uabde\uabdb\u20B9S\uabca\uabceVWX\uabe0\uabc9[\\]",
  2
);
langConverter.addOne2OneTransforms(
  "abcdefghijklmnopqrstuvwxyz",
  "\uabd1\uabd5\uabc6\uabd7\uabe6\uabd0\uabd2\uabcd\uabe4\uabd6\uabc0\uabc2\uabc3\uabc5\uabe3\uabc4\uabea\uabd4\uabc1\uabc7\uabe8\uabda\uabcbx\uabcc\uabeb",
  2
);
langConverter.addOne2OneTransforms(
  "0123456789",
  "\uabf0\uabf1\uabf2\uabf3\uabf4\uabf5\uabf6\uabf7\uabf8\uabf9",
  2
);

langConverter.addOne2OneTransforms(
  "ABCDEFGIKMNORSTWXZ",
  "ꯝꯎꯓ꯭ꯟꯊꯠꯪꯁꯜꯞꯣꯙꯈꯏꯐꯘꯉ",
  3
);

// Rathayek - almost the same as RATHA99 and RATHA
langConverter.addOne2OneTransforms(
  "abcdefgijklmopqrsvwxyz",
  "ꯃꯨꯖꯛꯅꯇꯤꯡꯔꯥꯦꯂꯍꯩꯕꯗꯀꯆꯄꯒꯧꯚ", 3
);

langConverter.addOne2OneTransforms(
  "1234567890[]\\=",
  "꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰ꯑꯢꯌ=",
  3
);
// Font encoding information.
// Map by font name, index in lookup table, output encoding, output script.
langConverter.encoding_data = {
    'RATHA99': {index:0, outputEncoding:'Unicode', outputScript:'Meitei'},
    'RATHA': {index:0, outputEncoding:'Unicode', outputScript:'Meitei'},
    'rathayek': {index:3, outputEncoding:'Unicode', outputScript:'Meitei'},
    'epomayek': {index:1, outputEncoding:'Unicode', outputScript:'Meitei'},
    'EyekPro-Regular': {index:2, outputEncoding:'Unicode', outputScript:'Meitei'},  // TODO: complete
};

const map_translit_output = ['Wiki Latin', 'Oxford Handbook Latin', 'Wiki IPA'];
const translit_source = 'Santali';

const map_translit_sources = [
    "https://wesanthals.tripod.com/id19.html",
];

