// Chakma numerals computations.

// Handling Chakma numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;
	this.doFloat = true;  // TESTING

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud81a\udec0'], [1, '\ud81a\udec1'], [2, '\ud81a\udec2'],
             [3, '\ud81a\udec3'], [4, '\ud81a\udec4'], [5, '\ud81a\udec5'],
             [6, '\ud81a\udec6'], [7, '\ud81a\udec7'], [8, '\ud81a\udec8'],
             [9, '\ud81a\udec9']
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
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['\ud81a\udec0', '\ud81a\udec1', '\ud81a\udec2'],
            ['\ud81a\udec3', '\ud81a\udec4', '\ud81a\udec5'],
            ['\ud81a\udec7', '\ud81a\udec8', '\ud81a\udec8'],
            ['\ud81a\udec9']
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

