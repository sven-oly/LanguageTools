// Inupiaq numerals computations.

// Handling Kaktovik numerals - base 20
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;
	this.doFloat = false;  // TESTING
	this.base = 20;       // For
        this.isBase10 = false;
	this.decimalSeparator = '.';
        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\ud834\udec0'], [1, '\ud834\udec1'], [2, '\ud834\udec2'],
             [3, '\ud834\udec3'], [4, '\ud834\udec4'], [5, '\ud834\udec5'],
             [6, '\ud834\udec6'], [7, '\ud834\udec7'], [8, '\ud834\udec8'],
             [9, '\ud834\udec9'],
	     [10, '\ud834\udeca'], [11, '\ud834\udecb'], [12, '\ud834\udecc'],
             [13, '\ud834\udecd'], [14, '\ud834\udece'], [15, '\ud834\udecf'],
             [16, '\ud834\uded0'], [17, '\ud834\uded1'], [18, '\ud834\uded2'],
             [19, '\ud834\uded3']	     
            ]
        );

	if (this.numeralBase !== undefined) {
	    this.charToValue =
		numeralBase.makeCharToValueMap(this.valueToChar);
	} else {
	    alert('NumberBase not found');
	}

        // special outputs
        this.decimalOutputFn = this.formatInt;
        this.logOutputFn = null;
        this.digitKeyInput = true;  // Allow keyboard digits 0-9?
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['\ud834\udec0', '\ud834\udec1', '\ud834\udec2', '\ud834\udec3', '\ud834\udec4'],
            ['\ud834\udec5', '\ud834\udec6', '\ud834\udec7', '\ud834\udec8', '\ud834\udec9'],
            ['\ud834\udeca', '\ud834\udecb', '\ud834\udecc', '\ud834\udecd', '\ud834\udece'],
            ['\ud834\udecf', '\ud834\uded0', '\ud834\uded1', '\ud834\uded2', '\ud834\uded3'],
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

    // Base N uses numeralBase
    numberListToInteger(numList) {
	return this.numeralBase.numberListToIntegerBaseN(numList, this.base);
    }

    // Base 20 using numeralBase class
    formatInt(intVal) {
	return this.numeralBase.formatIntBaseN(intVal,
					       this.valueToChar,
					       this.base);
    }

    formatFloat(floatVal) {
	// Need to figure out how many decimal places
	return this.numeralBase.formatFloat(floatVal, 3, this.valueToChar, this.base);
    }
}
