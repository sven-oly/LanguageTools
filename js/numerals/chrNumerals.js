// Cherokee numerals computations.

// Increasing values
const numeralValuesInc = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 30, 40, 50, 60 ,70, 80, 90, 100, 1000, 1e6, 1e9, 1e12,
    1e15, 1e18];


// Biggest values first for lookup.
const numeralValues = numeralValuesInc.slice().reverse();

// Code points in Unicode PUA.
const codePts = [
    // 0 - 19
    0xf600, 0xf601, 0xf602, 0xf603, 0xf604, 0xf605, 0xf606, 0xf607,
    0xf608, 0xf609, 0xf60a, 0xf60b, 0xf60c, 0xf60d, 0xf60e, 0xf60f,
    0xf610, 0xf611, 0xf612, 0xf613,
    0xf614, 0xf615, 0xf616, 0xf617, 0xf618, 0xf619, 0xf61a, 0xf61b,
    0xf61c, 0xf61d, 0xf61e, 0xf61f, 0xf620, 0xf621, 0xf622, 0xf623
];

const charPoints = [];
const valueToCodePoint = {};
const valueToChar = new Map();
const codePointToValue = {};
const charToValue = new Map();
for (let i = 0; i < numeralValuesInc.length; i++) {
    const char = String.fromCharCode(codePts[i]);
    const num = numeralValuesInc[i];
    charPoints.push(char);
    valueToChar.set(num, char);
    valueToCodePoint[num] = codePts[i];
    codePointToValue[codePts[i]] = num;
    charToValue.set(char, num);
};

function cleanUpListDeletions(l1, l2) {
    // Remove items where l1[i] === -1.
    var i = l1.length - 1;
    while (i >= 0) {
	if (l1[i] === -1) {
	    l1.splice(i, 1);
	    l2.splice(i, 1);
	}
	i -= 1;
    }
}

function numListToInteger(numList) {
    // a. scan for add small
    // b. scan for multiply by hundreds
    // c. scan for add to hundreds
    // d. multiply 10^N from left
    // e. add all
    var working = numList.slice();
    var tags = numList.slice();

    //# a. scan for add small
    var start = 0;
    var limit = working.length;
    var sum = 0;
    while (start < limit) {
	end = start;
	while (end < limit && working[end] < 100) {
	    sum += working[end];
	    end += 1;
	}
	if (end > start) {
	    working[start] = sum;
	    for (i = start + 1; i < end; i ++) {
		tags[i] = -1;
	    }
	    sum = 0;
	}
	start += 1;
    }
    cleanUpListDeletions(tags, working);

    // b. scan for multiply hundreds
    start = 1;
    limit = working.length;
    while (start < limit) {
	if (working[start - 1] < 100 && working[start] == 100) {
	    working[start] = working[start - 1] * working[start];
	    tags[start-1] = -1;
	}
	start += 1;
    }
    cleanUpListDeletions(tags, working);

    // c. scan for add to hundreds
    start = 1;
    limit = working.length;
    while (start < limit) {
	if (tags[start - 1] == 100 && tags[start] < 100) {
	    working[start] = working[start - 1] + working[start];
	    tags[start-1] = -1;
	}
	start += 1
    }
    cleanUpListDeletions(tags, working);

    // d. scan for multiply 10^N
    start = 0;
    limit = working.length;
    while (start < limit) {
	if (tags[start - 1] <= 100 && tags[start] > 100) {
	    working[start] = working[start - 1] * working[start];
	    tags[start-1] = -1;
	}
	start += 1;
    }
    cleanUpListDeletions(tags, working);

    // Add the results if needed
    var grandSum = 0;
    for (i = 0; i < working.length; i ++) {
	grandSum += working[i];
    }
    return grandSum;
}


// Process the input numeralinteger, outputting a list of numerals.
// Returns a list of (value) of the decoded number in Sequoyah's numerals
function formatToSequoah(decimalNum) {
    var result = [];
    var remaining;

    if (decimalNum == 0) {
	result = [0];
	return result;
    }

    if (decimalNum < 0) {
	remaining = -decimalNum;
	result.push(-1);
    } else {
	remaining = decimalNum;
    }

    var index = 0;
    var count = 0;
    while (remaining > 0 && index < numeralValues.length && count < 100) {
	let divisor = numeralValues[index]
	if (remaining > 0 && remaining < 1) {
	    result.push(-10);
	    break;
	}
	if (remaining >= divisor && divisor !== 0) {
	    count = Math.floor(remaining / numeralValues[index]);
	    remaining -= count * numeralValues[index];
	}
	if (count > 0) {
	    if (count > 1) {
		// Recurse with the hundreds.
		var prefix = this.formatToSequoah(count);
		for (var j = 0; j < prefix[0].length; j++) {
		    result.push(prefix[0][j]);
		}
	    }
	    result.push(numeralValues[index]);
	}
	count = 0;
	index += 1;
    }
    return result;  // Both the numbers and the strings.
}

// In progress - class for CherokeeNumeral handling
class ChrNumerals {
    constructor() {
	this.numeralValuesInc = [
	    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	    20, 30, 40, 50, 60 ,70, 80, 90,
	    100, 1000, 1e6, 1e9, 1e12, 1e15, 1e18];
	this.numeralValues = this.numeralValuesInc.slice().reverse();

	// PUA code points corresponding to numeralValuesInt.
	this.codePts = [
	    // 0 - 19
	    0xf600, 0xf601, 0xf602, 0xf603, 0xf604, 0xf605, 0xf606, 0xf607,
	    0xf608, 0xf609, 0xf60a, 0xf60b, 0xf60c, 0xf60d, 0xf60e, 0xf60f,
	    0xf610, 0xf611, 0xf612, 0xf613,
	    // 20 - 90
	    0xf614, 0xf615, 0xf616, 0xf617, 0xf618, 0xf619, 0xf61a, 0xf61b,
	    // 100, 1000, 10^6, etc.
	    0xf61c, 0xf61d, 0xf61e, 0xf61f, 0xf620, 0xf621, 0xf622, 0xf623
	];

	const chrToValueMap = {
	    0xf600: 0, 0xf601: 1, 0xf602: 2, 0xf603: 3, 0xf605: 4,0xf605: 5,
	    0xf606: 6, 0xf607: 7, 0xf608: 8, 0xf609: 9,
	    0xf60a: 10, 0xf60b: 11, 0xf60c: 12, 0xf60d: 13, 0xf60e: 14,
	    0xf60f: 15, 0xf610: 16, 0xf611: 17, 0xf612: 18, 0xf613: 19,
	    0xf614: 20, 0xf615: 30, 0xf616: 40, 0xf617: 50, 0xf618: 60,
	    0xf619: 70, 0xf61a: 80, 0xf61b: 80, 0xf61c: 90, 0xf61d: 100,
	    0xf61e: 1000, 0xf61f: 1e6, 0xf620: 1e9, 0xf621: 1e12,
	    0xf622:1e15, 0xf623:1e18
	};

	const valueToCharMap = {
	    0: 0xf600, 1: 0xf601, 2: 0xf602, 3: 0xf603, 4: 0xf605,5: 0xf605,
	    6: 0xf606, 7: 0xf607, 8: 0xf608, 9: 0xf609,
	    10: 0xf60a, 11: 0xf60b, 12: 0xf60c, 13: 0xf60d, 14: 0xf60e,
	    15: 0xf60f, 16: 0xf610, 17: 0xf611, 18: 0xf612, 19: 0xf613,
	    20: 0xf614, 30: 0xf615, 40: 0xf616, 50: 0xf617, 60: 0xf618,
	    70: 0xf619, 80: 0xf61a, 80: 0xf61b, 90: 0xf61c, 100: 0xf61d,
	    1000: 0xf61e, 1e6: 0xf61f, 1e9: 0xf620, 1e12: 0xf621,
	    1e15:0xf622, 1e18:0xf623
	};

	this.charPoints = [];
	this.valueToCodePoint = {};
	this.valueToChar = new Map();
	this.codePointToValue = new Map();
	this.charToValue = new Map();
	for (let i = 0; i < numeralValuesInc.length; i++) {
	    const char = String.fromCharCode(codePts[i]);
	    const num = numeralValuesInc[i];
	    this.charPoints.push(char);
	    this.valueToChar.set(num, char);
	    this.valueToCodePoint[num] = codePts[i];
	    this.codePointToValue.set(codePts[i], num);
	    this.charToValue.set(char, num);
	};

	// special outputs
	this.decimalOutputFn = null;
	this.logOutputFn = null;
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
	return numListToInteger(numList);
    }

    formatInt(num) {
	return this.formatIntToNumeralString(num);
    }

    intToNumeralsList(intVal) {
	// This is Cherokee-specific
	// set big numeral to 1000.
	// Get remainder with 100.
	// If 1 <= 19, use that numeral
	// else get decade numeral +
	// remainder if > 0
	// Divide by 1000. If a reminder, push next
	// add big numeral. Increment big numeral to next
	// power of 10^3.
	// repeat with 100 line.
	let numList = [];
	if (intVal === 0) {
	    return [0];
	}

	// Take the number in groups of 3 decades.
	let bigPower = 1;
	while (intVal > 0) {
	    // Get the lowest 1000.
	    let rem1000 = intVal % 1000;
	    if (rem1000 > 0) {
		if (bigPower > 1) {
		    // Push the big power
		    numList.unshift(bigPower);
		}
		let times100 = Math.floor(rem1000 /100);
		let rem100 = rem1000 % 100;
		if (rem100 > 0) {
		    if (rem100 <= 19) {
			numList.unshift(rem100);
		    } else {
			const decade = Math.floor(rem100/10) * 10;
			const unit = rem100 - decade;
			if (unit > 0) {
			    numList.unshift(unit);
			}
			if (decade > 0) {
			    numList.unshift(decade);
			}
		    }
		}
		if (times100 > 0) {
		    // Handle 100s
		    numList.unshift(100);
		    numList.unshift(times100);
		}
	    }
	    // Get the next power of 1000.
	    intVal = Math.floor(intVal / 1000);
	    bigPower *= 1000;
	}
	return numList;
    }

    formatIntToNumeralString(decimalNum) {
	let numList = this.intToNumeralsList(decimalNum);
	return this.formatNumeralListToString(numList);
    }
}

// For testing conversions in Cherokee numerals.
class TestChrNumerals {
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
