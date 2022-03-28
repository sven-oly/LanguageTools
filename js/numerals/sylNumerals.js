// Sylheti numerals computations.

// Handling Sylheti numerals - base 10
class Numerals {
    constructor(numberalBase) {
	// Used for basic functions
	this.numeralBase = numeralBase;

        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\uef30'], [1, '\uef31'], [2, '\uef32'],
             [3, '\uef33'], [4, '\uef34'], [5, '\uef35'],
             [6, '\uef36'], [7, '\uef37'], [8, '\uef38'],
             [9, '\uef39'],
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
            // Standin PUA characters. Not Unicode
            ['\uef37', '\uef38', '\uef39'],
            ['\uef34', '\uef35', '\uef36'],
            ['\uef31', '\uef32', '\uef33'],
            ['\uef30']
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

    // Base 10 using numberalBase class
    formatInt(intVal) {
	return this.numeralBase.formatIntBase10(intVal, this.valueToChar);
    }
}

