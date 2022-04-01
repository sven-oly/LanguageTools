// Sunuwar numerals computations.

// Handling Sunuwar numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud806\uddf0'], [1, '\ud806\uddf1'], [2, '\ud806\uddf2'],
             [3, '\ud806\uddf3'], [4, '\ud806\uddf4'], [5, '\ud806\uddf5'],
             [6, '\ud806\uddf6'], [7, '\ud806\uddf7'], [8, '\ud806\uddf8'],
             [9, '\ud806\uddf9']
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
            ['\ud806\uddf7', '\ud806\uddf8', '\ud806\uddf9'],
            ['\ud806\uddf4', '\ud806\uddf5', '\ud806\uddf6'],
            ['\ud806\uddf1', '\ud806\uddf2', '\ud806\uddf3'],
            ['\ud806\uddf0']
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

