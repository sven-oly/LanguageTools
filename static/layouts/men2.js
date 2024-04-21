// Using JG Mende PUA font for Mende Kikakui, 13-Aug-2022
//  Based on observation that Unicode for this script is incomplete
var MEN_PHONE2_LAYOUT = {
    'id': 'menPhone2',
    'dir': 'rtl',
    'title': 'Mende Kikakui Phonetic 2',
    'mappings': {
	',c': {
	    '':  '!{{\uD83A\uDCC7}}{{\uD83A\uDCC8}}{{\uD83A\uDCC9}}{{\uD83A\uDCCa}}' +
		'{{\uD83A\uDCCb}}{{\uD83A\uDCcc}}{{\uD83A\uDCCd}}{{\uD83A\uDCCe}}' +
		'{{\uD83A\uDCCf}}0-=' +
		'{{ɛ}}wertyuiop[]\\' +
		'asdfghjkl;\'' +
		'{{}}{{}}ɔvbnm,./'
	},
	's,sc': {
	    '': '~!@#$%^&*()_+' +
		'QWERTYUIOP{}|' +
		'ASDFGHJKL:"' +
		'ZXCVBNM<>?'
	},
	'l': { // ZWNB Space before signals to not transform
	    '': '`1234567890-=' +
		'{{\ufeffq}}{{\ufeffw}}{{\ufeffe}}{{\ufeffr}}{{\ufefft}}{{\ufeffy}}{{\ufeffu}}{{\ufeffi}}{{\ufeffo}}{{\ufeffp}}[]\\' +
		'{{\ufeffa}}{{\ufeffs}}{{\ufeffd}}{{\ufefff}}{{\ufeffg}}{{\ufeffh}}{{\ufeffj}}{{\ufeffk}}{{\ufeffl}};\'' +
		'{{\ufeffz}}{{\ufeffx}}{{\ufeffc}}{{\ufeffv}}{{\ufeffb}}{{\ufeffn}}{{\ufeffm}},./'
	},
	'sl': {
	    '': '~!@#$%^&*()_+' +
		'{{\ufeffQ}}{{\ufeffW}}{{\ufeffE}}{{\ufeffR}}{{\ufeffT}}{{\ufeffY}}{{\ufeffU}}{{\ufeffI}}{{\ufeffO}}{{\ufeffP}}{}|' +
		'{{\ufeffA}}{{\ufeffS}}{{\ufeffD}}{{\ufeffF}}{{\ufeffG}}{{\ufeffH}}{{\ufeffJ}}{{\ufeffK}}{{\ufeffL}}:"' +
		'{{\ufeffZ}}{{\ufeffX}}{{\ufeffC}}{{\ufeffV}}{{\ufeffB}}{{\ufeffN}}{{\ufeffM}}<>?'
	},
    },
    'transform' : {
	'I':   '\ue15f',
	'a':  '\ue128',
	'aa': '\ue129',
	'b':   '\ue03b',
	'bi':  '\ue03c',    
	'c':  '\ue130',
	'cc': '\ue311',
	'd':   '\ue0a9',
	'di':  '\ue0aa',
	'e':  '\ue12d',
	'ee': '\ue12c',
	'f':   '\ue061',
	'g':   '\ue0f6',
	'gb':  '\ue056',
	'gi':  '\ue0f7',
	'h':   '\ue117',
	'hi':  '\ue134',
	'hii': '\ue135',
	'i':  '\ue127',
	'ii':  '\ue15d',
	'iii': '\ue15e',
	'j':   '\ue0c2',
	'ji':  '\ue0c3',
	'k':   '\ue019',
	'ki':  '\ue10a',
	'kp':  '\ue049',
	'l':   '\ue088',
	'li':  '\ue087',
	'lii': '\ue086',
	'm':   '\ue140',
	'mb':  '\ue025',
	'mbi': '\ue026',
	'n':   '\ue149',
	'nd':  '\ue09a',
	'ndi': '\ue09b',
	'ng':  '\ue0e6',
	'ngi': '\ue0e7',
	'ny':  '\ue150',
	'o':  '\ue132'
	'p':   '\ue001',
	'pi':  '\ue000',
	'r':  '\ue12e',
	'rr': '\ue12f',
	's':   '\ue0b5',
	'si':  '\ue0b4',
	't':   '\ue079',
	'ti':  '\ue07a',
	'u':  '\ue12a',
	'uu': '\ue12b',
	'v':   '\ue06c',
	'w':   '\ue010',
	'wi':  '\ue00f',
	'wii': '\ue01f',
	'y':   '\ue0da',
    }
    'historyPruneRegex':
    'wi|nd|ng|mb|li|ii|hi|w|u|t|s|r|p|n|m|l|k|j|i|h|g|e|d|c|b|a'
}
    // 'paa|pi|pa|pu|pe|pɛ|pɔ|po|pA|' +
    // 	'k|ke|ko|ku|' +
    // 	'wi|wa|we|wɛ|wo|wɔ|wu|wv|' +
    // 	'mu|b|be|bo|s|se|so|si|le|lo|l|L|' +
    // 	'de|do|t|te|to|j|je|jj|jo|J|y|ye|yo|' +
    // 	'f|fa|fe|fo|fu|n|h|he|hE|hi|ho|hoo|hO|' +
    // 	'hee|ha|hu|ngg|ngga|ngge|nggE|nggo|nggO|Ngg|NGg|nggu|' +
    // 	'g|ge|gu|ng|p|pe|po|mb|' +
    // 	'p|w||m|d|' +
    // 	'mbe|mbo|mbE|mbO|mbu|kp|kpe|kpo|gb|gbe|gbo|' +
    // 	'nd|nde|ndo|nj|nje|njo|v|ve|vo|ny|' +
    // 	'i|in|a|e|o|'
}
// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_PHONE2_LAYOUT);
menPhone2 = MEN_PHONE2_LAYOUT;
