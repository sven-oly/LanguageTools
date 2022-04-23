// Mro numerals computations.

// Handling Nru numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;
	this.doFloat = true;  // TESTING

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud81a\ude60'], [1, '\ud81a\ude61'], [2, '\ud81a\ude62'],
             [3, '\ud81a\ude63'], [4, '\ud81a\ude64'], [5, '\ud81a\ude65'],
             [6, '\ud81a\ude66'], [7, '\ud81a\ude67'], [8, '\ud81a\ude68'],
             [9, '\ud81a\ude69']
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
            ['\ud81a\ude60', '\ud81a\ude61', '\ud81a\ude62'],
            ['\ud81a\ude63', '\ud81a\ude64', '\ud81a\ude65'],
            ['\ud81a\ude66', '\ud81a\ude67', '\ud81a\ude68'],
            ['\ud81a\ude69']
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

