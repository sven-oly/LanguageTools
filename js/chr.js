// Converter and sorting for Loma
// Started 12-Sep-2022

let langAsciiOrder;
let langRegSplit;
let langSplit;

// Things needed for handling language-specific text tasks.
class textFunctions {

    constructor() {
	this.langCode = 'lom';
	this.sortAbc= false;  //true;

	// The characters that split 
	langAsciiOrder = [
	    'a', 'e', 'i', 'o', 'u', 'v',
	    'g', 'k', 'h', 'l', 'm', 'n', 'nh',
	    'hn', 'qu', 's', 'd', 't', 'tl', 'dl', 'ts', 'w', 'y'
	];
	langSplit = [
	    'g', 'k', 'hn', 'h', 'tl', 'dl', 'l', 'm', 'nh', 'n',
	    'qu', 'ts', 's', 'd', 't', 'w', 'y',
	    'a', 'e', 'i', 'o', 'u', 'v'
	];
	// Loma ASCII ordering, based on table.

	let r = langSplit.join('|');
	langRegSplit = new RegExp('(' + r + ')');
    }
    
    // Tells function how to compare these
    compareLangAscii(a, b) {
	const sA = a.split(langRegSplit);
	const sB = b.split(langRegSplit);
	// look up each member of sA and sB as long as they are the same
	const minSize = Math.min(sA.length, sB.length);
	for (let i = 0; i < minSize; i++) {
	    const comp =
		  (langAsciiOrder.indexOf(sA[i]) - langAsciiOrder.indexOf(sB[i]));
	    if (comp != 0) return comp;  // They differ at this point
	}
	
	// Which is the longest?
	return sA.length - sB.length;
    }

    getVowels() {
	return ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U', 'v', 'V'];
    }
    
    // Divide into parts based on the strings above.
    splitText(text) {
	return text.split(langRegSplit).filter(function (el) {
	    return el != '';
	});
	return text.split(this.langRegSplit);
    }

    sortAsciiList(words) {
	if (this.sortAbc) {
	    // Normal abc order
	    return words.sort();
	} else {
	    return words.sort(this.compareLangAscii);
	}
    }

    ignoreInPhonetics() {
	let ignorables = new Set();
	// TODO: fill in.
	for (let i = 0xf600; i < 0xf625; i++) {
	    ignorables.add(String.fromCharCode(i));  // Numerals
	}
	ignorables.add('$1');  // Output of regex

	return ignorables;
    }

    testSort() {
	// Test
	this.sortAsciiList(['ku', 'ko', 'ka', 'ki', 'mba', 'mbi', 'mbO','mbo', 'pa', 'pi']) == ['pi', 'pa', 'mbi', 'mba', 'mbo', 'mbO', 'ki', 'ka', 'ku', 'ko'];
    }
}
