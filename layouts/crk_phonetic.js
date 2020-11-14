// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var CRK_PHONETIC_LAYOUT = {
  'id': 'crk_phonetic',
  'title': 'ᓀᐦᐃᔭᐍᐏᐣ phonetic',
  'source': 'https://www.altlab.dev/plains-cree-syllabics-key-sequences/',
  'mappings': {
    ',c': {
      '': '`1234567890-=' +
          '{{}}werty{{}}iop[]\\' +
          'as{{}}{{}}{{}}h{{}}kl{{\u00ab}}{{\u00bb}}' +
          '{{}}{{ᕽ}}c{{}}{{}}nm,{{᙮}}/'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{}}{{}}E{{}}{{}}{{}}{{}}IO{{}}{}|' +
          'Aš{{}}{{}}{{}}{{}}{{}}{{}}{{}}:"' +
          '{{}}{{}}{{}}{{}}{{}}{{}}{{}}<>?' +
          '{{S||ᐊᐱᓯ||\u202f}}'  // Keycap for shift-space ᐁᐱᓯ = "short"
    },
    'l,cl': {
      '': '`1234567890-=' +
          '{{\u200cq}}{{\u200cw}}{{\u200ce}}{{\u200cr}}{{\u200ct}}{{\u200cy}}{{\u200cu}}{{\u200ci}}{{\u200co}}{{\u200cp}}[]\\' +
          '{{\u200ca}}{{\u200cs}}{{\u200cd}}{{\u200cf}}{{\u200cg}}{{\u200ch}}{{\u200cj}}{{\u200ck}}{{\u200cl}};\'' +
          '{{\u200cz}}{{\u200cx}}{{\u200cc}}{{\u200cv}}{{\u200cb}}{{\u200cn}}{{\u200cm}},./'
    },
    'sl,scl': {
      // Note that these contain \u200c ZWNJ in the {{}} to prevent conversion into syllabics
      '': '~!@#$%^&*()_+' +
          'QW{{‌E}}RTYU{{‌I}}{{‌O}}P{}|' +
          '{{‌A}}SDFGHJKL:"' +
          '{{Z}}X{{‌C}}VB{{‌N}}{{‌M}}<>?'
    }
  },
  'transform': {
    'e': 'ᐁ',  // 1401
    'ee|E': 'ᐁ',  // 1401
    'i': 'ᐃ',  // 1403
    'ii': 'ᐄ',  // 1404
    'I': 'ᐄ',  // 1404
    'o': 'ᐅ',  // 1405
    'oo': 'ᐆ',  // 1406
    'O': 'ᐆ',  // 1406
    'a': 'ᐊ',  // 140A
    'aa': 'ᐋ',  // 140B
    'A': 'ᐋ',  // 140B
    'h': 'ᐦ',  // 1426
    'we': 'ᐍ',  // 140D
    'wee|wE': 'ᐍ',  // 140D
    'wi': 'ᐏ',  // 140F
    'wii': 'ᐑ',  // 1411
    'wI': 'ᐑ',  // 1411
    'wo': 'ᐓ',  // 1413
    'woo': 'ᐕ',  // 1415
    'wO': 'ᐕ',  // 1415
    'wa': 'ᐘ',  // 1418
    'waa': 'ᐚ',  // 141A
    'wA': 'ᐚ',  // 141A
    'w': 'ᐤ',  // 1424
    'pe': 'ᐯ',  // 142F
    'pee|pE': 'ᐯ',  // 142F
    'pi': 'ᐱ',  // 1431
    'pii': 'ᐲ',  // 1432
    'pI': 'ᐲ',  // 1432
    'po': 'ᐳ',  // 1433
    'poo': 'ᐴ',  // 1434
    'pO': 'ᐴ',  // 1434
    'pa': 'ᐸ',  // 1438
    'paa': 'ᐹ',  // 1439
    'pA': 'ᐹ',  // 1439
    'pwe|pwE': '\u143b',  // 143b
    'pwi': '\u143d',  // 143d
    'pwii': '\u143f',  // 143f
    'pwo': '\u1441',  // 1441
    'pwoo': '\u1443',  // 1443
    'pwa': '\u1445',  // 1445
    'pwaa': '\u1447',  // 1447
    'p': 'ᑊ',  // 144A
    'te|tE': 'ᑌ',  // 144C
    'ti': 'ᑎ',  // 144E
    'tii|tI': 'ᑏ',  // 144F
    'to': 'ᑐ',  // 1450
    'too|tO': 'ᑑ',  // 1451
    'ta': 'ᑕ',  // 1455
    'taa|tA': 'ᑖ',  // 1456
    't': 'ᐟ',  // 141F
    'twe|twE': '\u1458',  // 1458
    'twi': '\u145a',  // 145a
    'twii|twI': '\u145c',  // 145c
    'two': '\u145e',  // 145e
    'twoo': '\u1460',  // 1460
    'twa': '\u1462',  // 1462
    'twaa|twA': '\u1464',  // 1464
    'ke': 'ᑫ',  // 146B
    'ki': 'ᑭ',  // 146D
    'kii|kI': 'ᑮ',  // 146E
    'ko': 'ᑯ',  // 146F
    'koo|kO': 'ᑰ',  // 1470
    'ka': 'ᑲ',  // 1472
    'kaa|kA': 'ᑳ',  // 1473
    'k': 'ᐠ',  // 1420
    'kwe|kwE': 'ᑵ',  // 1475
    'kwi': 'ᑷ',  // 1477
    'kwii|kI': '\u1479',  // 1479
    'kwo': '\u147b',  // 147b
    'kwoo|kwO': 'ᑽ',  // 147d
    'kwa': 'ᑿ',  // 147f
    'kwaa|kwA': '\u1481',  // 1481
    'ce': 'ᒉ',  // 1489
    'ci': 'ᒋ',  // 148B
    'cii|cI': 'ᒌ',  // 148C
    'co': 'ᒍ',  // 148D
    'coo|cO': 'ᒎ',  // 148E
    'ca': 'ᒐ',  // 1490
    'caa|cA': 'ᒑ',  // 1491
    'c': 'ᐨ',  // 1428
    'cwe|cwE': '\u1493',  // 1493
    'cwi': '\u1495',  // 1495
    'cwii|cwI': '\u1497',  // 1497
    'cwo': '\u1499',  // 1499
    'cwoo|cwO': '\u149b',  // 149b
    'cwa': '\u149d',  // 149d
    'cwaa|cwA': '\u149f',  // 149f
    'me|mE': 'ᒣ',  // 14A3
    'mi': 'ᒥ',  // 14A5
    'mii|mI': 'ᒦ',  // 14A6
    'mo': 'ᒧ',  // 14A7
    'moo|mO': 'ᒨ',  // 14A8
    'ma': 'ᒪ',  // 14AA
    'maa|mA': 'ᒫ',  // 14AB
    'm': 'ᒼ',  // 14BC
    'mwe|mwE': '\u14ad',  // 14ad
    'mwi': '\u14af',  // 14af
    'mwii|mwI': '\u14b1',  // 14b1
    'mwo': '\u14b3',  // 14b3
    'mwoo|mwO': '\u14b5',  // 14b5
    'mwa': '\u14b7',  // 14b7
    'mwaa|mwA': '\u14b9',  // 14b9
    'ne|nE': 'ᓀ',  // 14C0
    'ni': 'ᓂ',  // 14C2
    'nii|nI': 'ᓃ',  // 14C3
    'no': 'ᓄ',  // 14C4
    'noo|nO': 'ᓅ',  // 14C5
    'na': 'ᓇ',  // 14C7
    'naa|nA': 'ᓈ',  // 14C8
    'n': 'ᐣ',  // 1423
    'nwe|nwE': '\u14ca',  // 14ca
    'nwi': '\u18c7',  // 14c7
    'nwii|nwI': '\u18c9',  // 14c0
    'nwo': '\u18cb',  // 147cb
    'nwoo|nwO': '\u18cd',  // 14cd
    'nwa': '\u14cc',  // 14cc
    'nwaa|nwA': '\u14ce',  // 14ce
    'le|lE': 'ᓓ',  // 14D3
    'li': 'ᓕ',  // 14D5
    'lii|lI': 'ᓖ',  // 14D6
    'lo': 'ᓗ',  // 14D7
    'loo|lO': 'ᓘ',  // 14D8
    'la': 'ᓚ',  // 14DA
    'laa|lA': 'ᓛ',  // 14DB
    'l': 'ᓬ',  // 14EC
    'se|sE': 'ᓭ',  // 14ED
    'si': 'ᓯ',  // 14EF
    'sii|sI': 'ᓰ',  // 14F0
    'so': 'ᓱ',  // 14F1
    'soo|sO': 'ᓲ',  // 14F2
    'sa': 'ᓴ',  // 14F4
    'saa|sA': 'ᓵ',  // 14F5
    's': 'ᐢ',  // 1422
    'swe|swE': '\u14f7',  // 14f7
    'swi': '\u14f9',  // 14f9
    'swii|swI': '\u14fb',  // 147fb
    'swo': '\u14fd',  // 14fd
    'swoo|swO': '\u14ff',  // 14ff
    'swa': '\u1501',  // 1501
    'swaa|swA': '\u1503',  // 1503
    'še|šE': 'ᔐ',  // 1510
    'ši': 'ᔑ',  // 1511
    'šii|šI': 'ᔒ',  // 1512
    'šo': 'ᔓ',  // 1513
    'šoo|šO': 'ᔔ',  // 1514
    'ša': 'ᔕ',  // 1515
    'šaa|šA': 'ᔖ',  // 1516
    'š': 'ᐡ',  // 1421
    'ye|yE': 'ᔦ',  // 1526'
    'yi': 'ᔨ',  // 1528
    'yii|yI': 'ᔩ',  // 1529
    'yo': 'ᔪ',  // 152A
    'yoo|yO': 'ᔫ',  // 152B
    'ya': 'ᔭ',  // 152D
    'yaa|yA': 'ᔮ',  // 152E
    'y': 'ᐩ',  // 1540
    'ywe|ywE': '\u1530',  // 1475
    'ywi': '\u1532',  // 1477
    'ywii|ywI': '\u1534',  // 1479
    'ywo': '\u1536',  // 147a
    'ywoo|ywO': '\u1538',  // 147c
    'ywa': '\u153a',  // 147e
    'ywaa|ywA': '\u153c',  // 1481
    're|rE': 'ᕃ',  // 1543
    'ri': 'ᕆ',  // 1546
    'rii|rI': 'ᕇ',  // 1547
    'ro': 'ᕈ',  // 1548
    'roo|rO': 'ᕉ',  // 1549
    'ra': 'ᕋ',  // 154B
    'raa|rA': 'ᕌ',  // 154C
    'r': 'ᕒ',  // 1552
    // After hk. No special rules are needed.

    // Remove ZWNJ from Latin input with caps lock
    '\u200c([a-zA-Z])' : '$1',
  },
 'historyPruneRegex': '[ioaIOA]|[ptkcmnsywlrš][ioaIOA]?|[ptkcmnsylrš]w[ioaIOA]?'
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(CRK_PHONETIC_LAYOUT);
let crk_phonetic = CRK_PHONETIC_LAYOUT;