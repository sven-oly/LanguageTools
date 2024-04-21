// Using JG Mende PUA font for Mende Kikakui, 13-Aug-2022
//  Based on observation that Unicode for this script is incomplete

// Before updates for more Mende Kikakui syllables.
var MEN_PHONE2_OLD_LAYOUT = {
    'id': 'menphone2_old',
    'dir': 'rtl',
    'title': 'Mende Kikakui Phonetic 2',
    'mappings': {
	',c': {
	    '':  '!{{\uD83A\uDCC7}}{{\uD83A\uDCC8}}{{\uD83A\uDCC9}}{{\uD83A\uDCCa}}' +
		'{{\uD83A\uDCCb}}{{\uD83A\uDCcc}}{{\uD83A\uDCCd}}{{\uD83A\uDCCe}}' +
		'{{\uD83A\uDCCf}}0-=' +
		'{{ɛ}}wertyuiop[]\\' +
		'asdfghjkl;\'' +
		'{{ɔ}}{{}}cvbnm,./'
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
	'ba': '\ue03d',
	'baa': '\ue03c',
	'bc': '\ue044',
	'bcc': '\ue044',
	'be': '\ue041',
	'bee': '\ue042',
	'bi':  '\ue03c',    
	'bo': '\ue048',
	'boo': '\ue046',
	'booo': '\ue047',
	'br': '\ue043',
	'bu': '\ue03f',
	'buu': '\ue040',
	'c':  '\ue130',
	'cc': '\ue131',
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
	'kpa': '\ue046',
	'kpaa': '\ue04a',
	'kpaaa': '\ue04c',
	'kpc': '\ue053',
	'kpcc': '\ue054',
	'kpe': '\ue04f',
	'kpo': '\ue055',
	'kpr': '\ue052',
	'kprr': '\ue051',
	'kprrr': '\ue050',
	'kpu': '\ue04d',
	'kpuu': '\ue04e',
	'l':   '\ue088',
	'li':  '\ue087',
	'lii': '\ue086',
	'm':   '\ue140',
	'mb':  '\ue025',
	'mba': '\ue028',
	'mbaa': '\ue027',
	'mbc': '\ue02f',
	'mbcc': '\ue030',
	'mbccc': '\ue038',
	'mbcccc': '\ue038',
	'mbe': '\ue02c',
	'mbee': '\ue02b',
	'mbeee': '\ue035',
	'mbi': '\ue026',
	'mbo': '\ue03a',
	'mbr': '\ue02c',
	'mbrr': '\ue02e',
	'mbrrr': '\ue036',
	'mbrrrr': '\ue037',
	'mbu': '\ue029',
	'mbuu': '\ue02a',
	'mbuu': '\ue033',
	'mbuuu': '\ue034',
	'n':   '\ue149',
	'nd':  '\ue09a',
	'ndi': '\ue09b',
	'ng':  '\ue0e6',
	'ngi': '\ue0e7',
	'ny':  '\ue150',
	'o':  '\ue132',
	'p':    '\ue001',
	'pA':   '\ue004',	
	'pa':   '\ue002',
	'paa':  '\ue003',
	'paaa':   '\ue004',	
	'pc': '\ue00c',
	'pcc': '\ue025', 
	'pe':   '\ue007',
	'pee':  '\ue021',
	'pi':   '\ue000',
	'po': '\ue00e',
	'poo': '\ue00d',
	'pr': '\ue023',
	'pr': '\ue023',
	'prr': '\ue024',
	'pu':   '\ue005',
	'puu':  '\ue006',
	'pɔ':	  '\ue00b',
	'pɔɔ':  '\ue00c',
	'pɛ':   '\ue009',
	'pɛɛ':  '\ue00a',
	'r':  '\ue12e',
	'rr': '\ue12f',
	's':   '\ue0b5',
	'si':  '\ue0b4',
	't':   '\ue079',
	'ti':  '\ue07a',
	'u':  '\ue12a',
	'uu': '\ue12b',
	'v':   '\ue06c',
	'w': '\ue010', 
	'wa': '\ue012',
	'waa': '\ue011',
	'waaa': '\ue021',
	'waaaa': '\ue020',
	'we': '\ue015',
	'wee': '\ue016',
	'weee': '\ue022',
	'wi': '\ue00f',
	'wii': '\ue01f',
	'wu': '\ue014',
	'wuu': '\ue013',
	'y': '\ue0da',
    },
    'historyPruneRegex':
    'mbccc|mbrrr|waaa|mbcc|mbee|mbrr|mbuu|kpaa|kprr|waa|wee|paa|mba|mbc|mbe|mbi|mbr|mbu|kpa|kpc|kpr|kpu|boo|wa|we|wi|wu|pa|pc|pe|po|pr|pu|pɔ|pɛ|nd|ng|mb|li|kp|ii|hi|ba|bc|be|bi|bo|bu|w|u|t|s|r|p|n|m|l|k|j|i|h|g|e|d|c|b|a'
}
// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MEN_PHONE2_LAYOUT);
menphone2_old = MEN_PHONE2_OLD_LAYOUT;
