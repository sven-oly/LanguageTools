// Chakma numerals computations.

// Handling Chakma numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud804\udd36'], [1, '\ud804\udd37'], [2, '\ud804\udd38'],
             [3, '\ud804\udd39'], [4, '\ud804\udd3a'], [5, '\ud804\udd3b'],
             [6, '\ud804\udd3c'], [7, '\ud804\udd3d'], [8, '\ud804\udd3e'],
             [9, '\ud804\udd3f']
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
            ['\ud804\udd3d', '\ud804\udd3e', '\ud804\udd3f'],
            ['\ud804\udd3a', '\ud804\udd3b', '\ud804\udd3c'],
            ['\ud804\udd37', '\ud804\udd38', '\ud804\udd39'],
            ['\ud804\udd36']
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
}

