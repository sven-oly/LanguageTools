// Attempt to transliterate Devangari into Sunuwar script

// Preeti ASCII input
const devAscii = "a b c d e f g h i j k l m n o p q r s t u v w x y z \
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z \
~ ! @ # $ % ^ & * ( ) _ + { } | : " < > ? \
[ ] \ ; ' , . /";

const devOutput = "ब द अ म भ ा न ज ष् व प  िm ल य उ त्र च क त ग ख ध ह थ श \
ब् द्य ऋ म् भ् ँ न् ज् क्ष् व् प् ी ः ल् इ ए त्त च् क् त् ग् ख् ध् ह् थ् श् \
ञ् १ २ ३ ४ ५ ६ ७ ८ ९ ० र्) ं  ै ्र स् ू ? श्र रु \
ृ े ् स ु , । र";

// Single conversions DevASCII -> Mukdum
const devAsciiToMukdum = {
'/': 'r',
';': 's',
'\'': 'u',
']': 'e',
'J': 'g',
'M': ':',  // 'v'
'a': 'b',
'b': 'd',
'd': 'r',
'f': 'A',
'g': 'n',
'h': 'j',
'j': 'w',  // 'b'
'l': 'r',
'n': 'l',
'o': 'o',
'r': 'c',
's': 'k',
'u': 'g',
'z': 'S',
'{': 'i',
};

// Use Mukdum converter 

// From proposal
const convertInfo = {
'द': ['𑯀', 'DEVI'],
'ड': ['𑯀', 'DEVI'],
'त': ['𑯁', 'TASLA'],
'ट': ['𑯁', 'TASLA'],
'ए': ['𑯂', 'EKO'],
'इ': ['𑯃', 'IMAR'],
'ड़': ['𑯄', 'REU'],
'उ': ['𑯅', 'UTTHI'],
'क': ['𑯆', 'KIK'],
'म': ['𑯇', 'MAMA'],
'अ': ['𑯈', 'APPHO'],
'प': ['𑯉', 'PIP'],
'ग': ['𑯊', 'GIL'],
'ह': ['𑯋', 'HAMSO'],
'च': ['𑯌', 'CARMI'],
'न': ['𑯍', 'NAH'],
'ण': ['𑯍', 'NAH'],
'ब': ['𑯎', 'BUR'],
'ज': ['𑯏', 'JYAH'],
'ल': ['𑯐', 'LOACHA'],
'ओ': ['𑯑', 'OTTHI'],
'स': ['𑯜', 'SHYELE'],
'व': ['𑯓', 'VARCA'],
'य': ['𑯔', 'YAT'],
'ब': ['𑯕', 'AVA'],
'आ': ['𑯖', 'AAL'],
'ड': ['𑯗', 'DONGA'],
'थ': ['𑯘', 'THARI'],
'फ': ['𑯙', 'PHAR'],
'ङ': ['𑯚', 'NGAR'],
'ख': ['𑯛', 'KHA'],
'श': ['𑯒', 'SHYER'],
'ष': ['𑯒', 'SHYER'],
'छ': ['𑯝', 'CHELAP'],
'ट': ['𑯞', 'TENTU'],
'ठ': ['𑯟', 'THELE'],
'अ': ['𑯠', 'KLOKO'],
'ु' :[''],
};
