// Sylheti numerals computations.

// Handling Sylheti numerals - base 10
class Numerals {
    constructor() {
        //  Map numeral values to corresponding PUA code points
        this.valueToChar = new Map([
            [0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5'],
            [6, '6'], [7, '7'], [8, '8'], [9, '9'],
            [1e1, String.fromCharCode(0xf300)],
            [1e2, String.fromCharCode(0xf301)],
            [1e3, String.fromCharCode(0xf302)],
            [1e4, String.fromCharCode(0xf303)],
            [1e5, String.fromCharCode(0xf304)],
            [1e6, String.fromCharCode(0xf305)],
            [1e7, String.fromCharCode(0xf306)],
            [1e8, String.fromCharCode(0xf307)],
            [1e9, String.fromCharCode(0xf308)],
            [1e10, String.fromCharCode(0xf309)],
            [1e11, String.fromCharCode(0xf400)],
            [1e12, String.fromCharCode(0xf401)],
            [1e13, String.fromCharCode(0xf402)],
            [1e14, String.fromCharCode(0xf403)],  // Limit of 
            [1e15, String.fromCharCode(0xf405)],
            [1e16, String.fromCharCode(0xf406)],
            [1e17, String.fromCharCode(0xf407)],
            [1e18, String.fromCharCode(0xf408)],
            [1e19, String.fromCharCode(0xf409)],
            [1e20, String.fromCharCode(0xf500)],
            [1e21, String.fromCharCode(0xf501)],
            [1e22, String.fromCharCode(0xf502)],
            [1e23, String.fromCharCode(0xf503)],
            [1e24, String.fromCharCode(0xf504)],
            [1e25, String.fromCharCode(0xf505)],
            [1e26, String.fromCharCode(0xf506)],
            [1e27, String.fromCharCode(0xf507)],
            [1e28, String.fromCharCode(0xf508)],
            [1e29, String.fromCharCode(0xf509)],
            [1e30, String.fromCharCode(0xf600)],
            [1e31, String.fromCharCode(0xf601)],
            [1e32, String.fromCharCode(0xf602)],
            [1e33, String.fromCharCode(0xf603)],
            [1e34, String.fromCharCode(0xf604)],
        ]);

	if (numeralBase !== undefined) {
	    this.charToValue =
		numeralBase.makeCharToValueMap(this.valueToChar);
	} else {
	    alert('NumberBase not found');
	}
	
        // special outputs
        this.decimalOutputFn = null;
        this.logOutputFn = null;

	// For operator symbols used for the controls.
	// If defined, this can be used to create custom characters
	// in the system font for the calculator.
	this.operatorMap = new Map(
	    [
		['*', '*'], ['/', '/'], ['+', '+'], ['-', '-'], ['=', '='],
		['clr', 'clr']
	    ]
	);
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['0', '1', '2', '3', '4'],
            ['5', '6', '7', '8',  '9'],
            ['\uf300', '\uf301', '\uf302', '\uf303', '\uf304'],
            ['\uf305', '\uf306', '\uf307', '\uf308', '\uf309'],
            ['\uf400', '\uf402', '\uf403', '\uf404', '\uf405'],
	    ['\uf406', '\uf407', '\uf408', '\uf409', '\uf500'],
	    ['\uf501', '\uf502', '\uf503', '\uf504', '\uf505'],
	    ['\uf506', '\uf507', '\uf508', '\uf509', '\uf600'],
	    ['\uf601', '\uf602', '\uf603', '\uf604'],
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
        let result = [];
        for (let i = 0; i < numString.length; i ++) {
            let char = numString.charAt(i);
            if (this.charToValue.has(char)) {
                result.push(this.charToValue.get(char));
            }
        }
        return result;
    }

    // Given a list of numeral values, return the string
    formatNumeralListToString(numList) {
        let result = [];  // List of characters
        for (let i = 0; i < numList.length; i ++) {
            let val = numList[i];
            if (val !== undefined) {
                let char = this.valueToChar.get(val);
                result.push(char);
            }
        }
        return result.join('');
    }

    numberListToInteger(numList) {
        // Implements decimal placeholder
        let working = numList;

        let start = 0;
        let limit = working.length;
        let sum = 0;
        let multiplier = 1;
        let startIncrement = 1;
        while (start < limit) {
            multiplier = 1;
            if (numList[start] > 9) {
                // It's a power 10, 100, 1000
                if (start + 1 < limit) {
                    if (numList[start +1] < 10) {
                        // We have a power and a digit 0-9
                        multiplier = numList[start+1];
                        startIncrement = 2;
                    }
                }
            }
            sum = sum + numList[start] * multiplier;
            start += startIncrement;
        }
        return sum;
    }

    formatInt(intValStart) {
	let intVal = intValStart;
        let result = [];
        let rem = intVal % 10;
        let char;

        if (rem > 0) {
            let char = String.fromCharCode(rem + 0x30);
            result.unshift(char);
        }

        let power = 10;
        intVal = Math.floor(intVal / 10);

        while (intVal > 0) {
            rem = intVal % 10;
            if (rem > 0) {
                char = String.fromCharCode(rem + 0x30);
                result.unshift(char);
                const powerChar = this.valueToChar.get(power)
                result.unshift(powerChar);
            }
            power *= 10;
            intVal = Math.floor(intVal / 10);
        }           
        return result.join('');
    }
}

// For testing conversions in numerals.
class TestNumerals {
    constructor (numeralsObj) {
        this.numObj = numeralsObj;
    }

    assertEquals(equal, expected, actual, input) {
        if (expected !== actual) {
//            alert(
//                `!! Expected = ${expected}\u000a, actual = ${actual}, input = ${input}`);
            let x = -17;
        }
    }

    // !!! This needs to be updated for Umwero numerals.
    testFormat() {
        const pairs = [[7 ,''], [17, ''], [42, ''],
                [126, ''], [3099, '']
                ];

        for (let i = 0; i < pairs.length; i ++) {
            let pair = pairs[i];
            let formatted = this.numObj.formatIntToNumeralString(pair[0]);
            let matched = (pair[1] === formatted);
            this. assertEquals(matched, pair[1], formatted, pair[0]);
        }
    }

    testIntToList() {
        const pairs = [
            [0, [0]],
            [1, [1]],
            [2, [2]],
            [12, [12]],
            [19, [19]],
            [20, [20]],
            [42, [40, 2]],
            [100, [1, 100]],
            [107, [1, 100, 7]],
            [126, [1, 100, 20, 6]],
            [200, [2, 100]],
            [201, [2, 100, 1]],
            [1024, [1, 1000, 20, 4]],
            [65536, [60, 5, 1000, 5, 100, 30, 6]],
            [1002003004017, [1, 1e12, 2, 1e9, 3, 1e6, 4, 1e3, 17]],
        ];
        for (let i = 0; i < pairs.length; i ++) {
            let pair = pairs[i];
            let result = this.numObj.intToNumeralsList(pair[0]);
            let expected = pair[1];
            // TODO: check if lists match.
            let matched = true;
            if (result.length === expected.length) {
                for (let j = 0; j < expected.length; ++j) {
                    if (result[j] !== expected[j]) {
                        matched = false;
                    }
                }
            } else {
                matched = false;
            }
            if (!matched) {
                this.assertEquals(matched, expected, result, pair[0]);
            }
        }
    }

    testParse() {
        // Check string to numList to int.
        const pairs = [[7 ,''], [17, ''], [42, ''],
                [126, ''], [3099, '']
                      ];
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            let str = pair[1];
            let expected = pair[0];
            let numList = this.numObj.parseNumeralStringToNumeralList(str);

            let intResult = this.numObj.numberListToInteger(numList);
            let matched = (expected === intResult);
            if (!matched) {
                this.assertEquals(matched, expected, intResult, pair[1]);
            }
        }
    }
}
