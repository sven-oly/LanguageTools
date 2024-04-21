// Converter and sorting for Kpelle
// Started 19-Sep-2022

let kpelleAsciiOrder;
let kpelleRegSplit;

// Things needed for handling language-specific text tasks.
class textFunctions {

    constructor() {
	kpelleAsciiOrder = [
	    'p', 'w', 'mb', 'b', 'kp', 'gb', 'f', 'v', 't', 'l', 'k',
	    'nd', 'd', 's', 'j', 'nj', 'y', 'ng', 'g', 'k', 'h', '-',
	    'h', 'm' ,'n', 'ny', '\u014b', 'i', 'I',
	    'a', 'A', 'u', 'U', 'e', 'E', 'ɛ', 'Ɛ', 'ɔ', 'Ɔ', 'o', 'O', 'r',
	    'X', 'x',
	    '0'];
	// Kpelle ASCII ordering, based on table.

	let r = kpelleAsciiOrder.join('|');
	kpelleRegSplit = new RegExp('(' + r + ')');
    }
    
    // Tells function how to compare these
    compareKpelleAscii(a, b) {
	const sA = a.split(kpelleRegSplit);
	const sB = b.split(kpelleRegSplit);
	// look up each member of sA and sB as long as they are the same
	const minSize = Math.min(sA.length, sB.length);
	for (let i = 0; i < minSize; i++) {
	    const comp =
		  (kpelleAsciiOrder.indexOf(sA[i]) - kpelleAsciiOrder.indexOf(sB[i]));
	    if (comp != 0) return comp;  // They differ at this point
	}
	
	// Which is the longest?
	return sA.length - sB.length;
    }

    // Divide into parts based on the strings above, removing empty strings.
    splitText(text) {
	return text.split(kpelleRegSplit).filter(function (el) {
	    return el != '';
	});
    }

    getVowels() {
	return ['i', 'I',
		'a', 'A', 'u', 'U', 'ee', 'e', 'o', 'oo' ];
    }

    sortAsciiList(words) {
	return words.sort(this.compareKpelleAscii);
    }

    ignoreInPhonetics() {
	let ignorables = new Set();
	// TODO: fill in.
	ignorables.add('$1');  // Output of regex

	ignorables.add('x');  // Unassigned
	ignorables.add('X');  // Unassigned

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
