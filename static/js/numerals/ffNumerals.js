// Sunuwar numerals computations.

// Handling Sunuwar numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;

	this.doFloat = true;  // TESTING

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud83a\udd50'], [1, '\ud83a\udd51'], [2, '\ud83a\udd52'],
             [3, '\ud83a\udd53'], [4, '\ud83a\udd54'], [5, '\ud83a\udd55'],
             [6, '\ud83a\udd56'], [7, '\ud83a\udd57'], [8, '\ud83a\udd58'],
             [9, '\ud83a\udd59']
            ]
        );

	if (this.numeralBase !== undefined) {
	    this.charToValue =
		numeralBase.makeCharToValueMap(this.valueToChar);
	} else {
	    alert('NumberBase not found');
	}

        // special outputs
        this.decimalOutputFn = null;
        this.logOutputFn = null;
        this.digitKeyInput = true;  // Allow keyboard digits 0-9?
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['\ud83a\udd57', '\ud83a\udd58', '\ud83a\udd59'],
            ['\ud83a\udd54', '\ud83a\udd55', '\ud83a\udd56'],
            ['\ud83a\udd51', '\ud83a\udd52', '\ud83a\udd53'],
            ['\ud83a\udd50']
        ];      
        return layoutRowChars;
    }

    setDisplayDecimal(newFn) {
        // A callback for decimal results.
        this.decimalOutputFn = newFn;
    }

    displayDecimal(value) {
        if (this.decimalOutputFn) {
            this.decimalOutputFn(value);
        }
    }
    
    setLoggingFn(newFn) {
        // A callback for decimal results.
        this.logOutputFn = newFn;
    }
    
    displayLog(value) {
        if (this.logOutputFn) {
            this.logOutputFn(value);
        }
    }

    getCharToValueMap() {
        return this.charToValue;
    }

    getValueToCharMap() {
        return this.valueToChar;
    }

    parseNumeralStringToNumeralList(numString) {
	return this.numeralBase.parseNumeralStringToNumeralList(
	    numString, this.charToValue);
    }

    // Given a list of numeral values, return the string
    formatNumeralListToString(numList) {
	return this.numeralBase.formatNumeralListToString(
	    numList, this.valueToChar);
    }

    // Base 10 uses numeralBase
    numberListToInteger(numList) {
	return this.numeralBase.numberListToInteger(numList);
    }

    // Base 10 using numeralBase class
    formatInt(intVal) {
	return this.numeralBase.formatIntBase10(intVal, this.valueToChar);
    }

    formatFloat(floatVal) {
	// Need to figure out how many decimal places
	return this.numeralBase.formatFloat(floatVal, 3, this.valueToChar);
    }
}
