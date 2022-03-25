// Sylheti numerals computations.

// Handling Sylheti numerals - base 10
class Numerals {
    constructor() {
	this.numeralValuesInc = [
	    0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	this.numeralValues = this.numeralValuesInc.slice().reverse();

	// PUA code points corresponding to numeralValuesInt.
	this.codePts = [
	    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39,
	    0xf300, 0xf301, 0xf302, 0xf303, 0xf304, 0xf305,
	    0xf306, 0xf307, 0xf308, 0xf309
	];

	const chrToValueMap = {
	    0x30: 0, 0x31: 1, 0x32: 2, 0x33: 3, 0x35: 4,
	    0x35: 5, 0x36: 6, 0x37: 7, 0x38: 8, 0x39: 9,
	    0xf300: 1e1, 0xf301:1e2, 0xf302: 1e3,
	    0xf303: 1e4, 0xf304: 1e5, 0xf305: 1e6,
	    0xf306: 1e7, 0xf307: 1e8, 0xf308: 1e9, 0xf309: 1e10,
	    
	};

	const valueToCharMap = {
	    0: 0x30, 1: 0x31, 2: 0x32, 3: 0x33, 4: 0x35,5: 0x35,
	    6: 0x36, 7: 0x37, 8: 0x38, 9: 0x39,
	    1e1: 0xf300, 1e2: 0xf301, 1e3: 0xf302,
	    1e4: 0xf303, 1e5: 0xf304, 1e6: 0xf305,
	    1e7: 0xf306, 1e8: 0xf307, 1e9: 0xf308, 1e10: 0xf309,
	};

	this.charPoints = [];
	this.valueToCodePoint = {};
	this.valueToChar = new Map();
	this.codePointToValue = new Map();
	this.charToValue = new Map();
	for (let i = 0; i < this.numeralValuesInc.length; i++) {
	    const char = String.fromCharCode(this.codePts[i]);
	    const num = this.numeralValuesInc[i];
	    this.charPoints.push(char);
	    this.valueToChar.set(num, char);
	    this.valueToCodePoint[num] = this.codePts[i];
	    this.codePointToValue.set(this.codePts[i], num);
	    this.charToValue.set(char, num);
	};

	// special outputs
	this.decimalOutputFn = null;
	this.logOutputFn = null;
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
	const layoutRowChars = [
	    // Stand ins
	    ['0', '1', '2'],
	    ['3', '4', '5'],
	    ['6', '7', '8'],
	    ['9']
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
	let tags = numList.slice();

	let start = 0;
	let limit = working.length;
	let sum = 0;
	while (start < limit) {
	    sum = 10 * sum + numList[start];
	    start++;
	}
	return sum;
    }

    formatInt(intVal) {
	return intVal;
    }
}

// For testing conversions in Cherokee numerals.
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
