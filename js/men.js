// Converter and sorting for Mende Kikakui
// Started 10-Sep-2022

let mendeAsciiOrder;
let mendeRegSplit;

// Things needed for handling language-specific text tasks.
class textFunctions {

    constructor() {
	mendeAsciiOrder = [
	    'p', 'w', 'mb', 'b', 'kp', 'gb', 'f', 'v', 't', 'l', 'k',
	    'nd', 'd', 's', 'j', 'nj', 'y', 'ng', 'g', 'k', 'h', '-',
	    'h', 'm' ,'n', 'ny', '\u014b', 'i', 'I',
	    'a', 'A', 'u', 'U', 'e', 'E', 'ɛ', 'Ɛ', 'ɔ', 'Ɔ', 'o', 'O', 'r',
	    'X',
	    '0'];
	// Mende ASCII ordering, based on table.

	let r = mendeAsciiOrder.join('|');
	mendeRegSplit = new RegExp('(' + r + ')');
    }
    
    // Tells function how to compare these
    compareMendeAscii(a, b) {
	const sA = a.split(mendeRegSplit);
	const sB = b.split(mendeRegSplit);
	// look up each member of sA and sB as long as they are the same
	const minSize = Math.min(sA.length, sB.length);
	for (let i = 0; i < minSize; i++) {
	    const comp =
		  (mendeAsciiOrder.indexOf(sA[i]) - mendeAsciiOrder.indexOf(sB[i]));
	    if (comp != 0) return comp;  // They differ at this point
	}
	
	// Which is the longest?
	return sA.length - sB.length;
    }

    // Divide into parts based on the strings above, removing empty strings.
    splitText(text) {
	return text.split(mendeRegSplit).filter(function (el) {
	    return el != '';
	});
    }

    getVowels() {
	return ['i', 'I',
		'a', 'A', 'u', 'U', 'e', 'E', 'ɛ', 'Ɛ', 'ɔ', 'Ɔ', 'o', 'O'];
    }

    sortAsciiList(words) {
	return words.sort(this.compareMendeAscii);
    }

    ignoreInPhonetics() {
	let ignorables = new Set();
	// TODO: fill in.
	ignorables.add('$1');  // Output of regex

	ignorables.add('\ud83a\udcd0');  // Numbers
	ignorables.add('\ud83a\udcd1');
	ignorables.add('\ud83a\udcd2');
	ignorables.add('\ud83a\udcd3');
	ignorables.add('\ud83a\udcd4');
	ignorables.add('\ud83a\udcd5');
	ignorables.add('\ud83a\udcd6');
	ignorables.add('\ud83a\udcd7');
	ignorables.add('\ud83a\udcd8');
	ignorables.add('\ud83a\udcd9');
	return ignorables;
    }
    
    testSort() {
	// Test
	this.sortAsciiList(['ku', 'ko', 'ka', 'ki', 'mba', 'mbi', 'mbO','mbo', 'pa', 'pi']) == ['pi', 'pa', 'mbi', 'mba', 'mbo', 'mbO', 'ki', 'ka', 'ku', 'ko'];
    }
}
