// Converter and sorting for Cree languages
// Started 9-Dec-2023, from Loma example.

let langAsciiOrder;
let langRegSplit;

// Things needed for handling language-specific text tasks.
class textFunctions {

    constructor() {
        this.langCode = 'cr';
        this.sortAbc= false;  //true;

        // Cree ASCII ordering, based on table.
        langAsciiOrder = [
            'b', 'p', 'bw', 'pw', 'd', 't', 'dw', 'tw',
            'g', 'k', 'gw', 'kw', 'j', 'c', 'ch', 'jw', 'cw', 'n', 'nw',
            'm', 'mw', 's', 'z', 'sw', 'zw', 'sh', 'zh', 'shw', 'zhw',
            'y', 'k' ,'l', 'lw', 'w', 'v', 'r', 'h', 'x'];

        try {
            let sortedRevLen = langAsciiOrder.sort(function(a, b) {
                return b.length - a.length
            });
            let r = sortedRevLen.join('|');
            //        let r = langAsciiOrder.join('|');
            langRegSplit = new RegExp('(' + r + ')');
        } catch (error) {
        }
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
        return ['e', 'E', 'i', 'I', 'o', 'O', 
                'a', 'A', 'ii', 'II', 'oo', 'OO', 'aa', 'AA', ''];
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

        return ignorables;
    }

    testSort() {
        // Test
        this.sortAsciiList(['ku', 'ko', 'ka', 'ki', 'mba', 'mbi', 'mbO','mbo', 'pa', 'pi']) == ['pi', 'pa', 'mbi', 'mba', 'mbo', 'mbO', 'ki', 'ka', 'ku', 'ko'];
    }
}
