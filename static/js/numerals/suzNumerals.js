// Sunuwar numerals computations.

// Handling Sunuwar numerals - base 10
class Numerals {
    constructor(numeralBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud806\udff0'], [1, '\ud806\udff1'], [2, '\ud806\udff2'],
             [3, '\ud806\udff3'], [4, '\ud806\udff4'], [5, '\ud806\udff5'],
             [6, '\ud806\udff6'], [7, '\ud806\udff7'], [8, '\ud806\udff8'],
             [9, '\ud806\udff9']
            ]
        );

	if (this.numeralBase !== undefined) {
	    this.charToValue =
		numeralBase.makeCharToValueMap(this.valueToChar);
	} else {
	    alert('NumberBase not found');
	}

        // special outputs
        this.decimalOutputFn = true;
        this.logOutputFn = null;

        this.digitKeyInput = true;  // Allow keyboard digits 0-9?
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['\ud806\udff7', '\ud806\udff8', '\ud806\udff9'],
            ['\ud806\udff4', '\ud806\udff5', '\ud806\udff6'],
            ['\ud806\udff1', '\ud806\udff2', '\ud806\udff3'],
            ['\ud806\udff0']
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

