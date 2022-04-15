// Mro numerals computations.

// Handling Nru numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;
	this.doFloat = true;  // TESTING

        //  Map numeral values to corresponding code points
	// d81a de61
        this.valueToChar = new Map(
            [[0, '\u1040'], [1, '\u1041'], [2, '\u1042'],
             [3, '\u1043'], [4, '\u1044'], [5, '\u1045'],
             [6, '\u1046'], [7, '\u1047'], [8, '\u1048'],
             [9, '\u1049']
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
            ['\u1040', '\u1041', '\u1042'],
            ['\u1043', '\u1044', '\u1045'],
            ['\u1046', '\u1047', '\u1048'],
            ['\u1049']
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

