// Converter and sorting for Loma
// Started 12-Sep-2022

let langAsciiOrder;
let langRegSplit;

// Things needed for handling language-specific text tasks.
class textFunctions {

    constructor() {
	this.langCode = 'lom';
	this.sortAbc= false;  //true;

	// This is unused now.
	langAsciiOrder = [
	    'p', 'w', 'mb', 'b', 'kp', 'gb', 'f', 'v', 't', 'k', 'nd', 'd',
	    's', 'j', 'nj', 'y', 'ng', 'g', 'k', 'h', '-',
	    'h', 'm' ,'n', 'ny', '\u014b', 'i', 'I', 'a', 'A', 'u', 'U', 'e', 'E', 'ɛ', 'Ɛ', 'ɔ', 'Ɔ', 'o', 'O'];
	// Loma ASCII ordering, based on table.

	let r = langAsciiOrder.join('|');
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
	return ['i', 'I',
		'a', 'A', 'u', 'U', 'e', 'E', 'o', 'O'];
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

	return ignorables;
    }

    testSort() {
	// Test
	this.sortAsciiList(['ku', 'ko', 'ka', 'ki', 'mba', 'mbi', 'mbO','mbo', 'pa', 'pi']) == ['pi', 'pa', 'mbi', 'mba', 'mbo', 'mbO', 'ki', 'ka', 'ku', 'ko'];
    }
}
