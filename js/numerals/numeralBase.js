// Define functions for computubg using various numeral systems.

// In progress - class for Numeral System handling
class NumeralBase {
    constructor() {
	// special outputs
	this.decimalOutputFn = null;
	this.logOutputFn = null;
	this.isBase10 = true;

	// Options for output formatting
	this.doFloat = false;  //
	this.doGrouping = false;
	this.groupSeparator = ',';
	this.radixSeparator = '.';
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

    cleanUpListDeletions(l1, l2) {
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

    // Converting list of numbers into single integer
    numberListToInteger(numList) {
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
	this.cleanUpListDeletions(tags, working);

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
	this.cleanUpListDeletions(tags, working);

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
	this.cleanUpListDeletions(tags, working);

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
	this.cleanUpListDeletions(tags, working);

	// Add the results if needed
	var grandSum = 0;
	for (i = 0; i < working.length; i ++) {
	    grandSum += working[i];
	}
	return grandSum;
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

    // Creates an inverse map from the input map.
    makeCharToValueMap(valueToChar) {
        let charToValue = new Map();
        const iterator1 = valueToChar.keys();
        let val;
        do {
            val = iterator1.next().value;
            if (val !== undefined) {
                let char = valueToChar.get(val);
                charToValue.set(char, val);
            }
        } while (val !== undefined);
	// 
	return charToValue;
    }	

   // Given a list of numeral values, return the string
    formatNumeralListToString(numList, valueToChar) {
        let result = [];  // List of characters
        for (let i = 0; i < numList.length; i ++) {
            let val = numList[i];
            if (val !== undefined) {
                let char = valueToChar.get(val);
                result.push(char);
            }
        }
        return result.join('');
    }

    // Base 10 placeholder
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

    // Base 10 placeholder
    formatIntBase10(intVal, valueToCharMap) {
        if (intVal == 0) {
            let chr = valueToCharMap.get(0);
            return chr;
        }
        let result = [];
        while (intVal) {
            let val = intVal % 10;
            let chr = valueToCharMap.get(val);
            result.unshift(chr);
            intVal = Math.floor(intVal / 10);
        }
        return result.join('');
    }

    replaceAsciiDigits(asciiIn, valueToCharMap) {
	// For each ASCII digit, replace with the Adlam
	let chars = [];
	for (let i = 0; i < asciiIn.length; i ++) {
	    let charCode = asciiIn.charCodeAt(i) - 0x30;
	    if (charCode >= 0 && charCode <= 9) {
		chars.push(valueToCharMap.get(charCode));
	    } else {
		chars.push(asciiIn.charAt(i));
	    }
	}
	const result = chars.join('');
	return result;
    }

    formatFloat(floatVal, afterDecimal, valueToCharMap) {
	// Need to figure out how many decimal places
	// TODO: replace ASCII with Adlam characters
	
	// TESTING. Find fraction.

	const fractParts = this.findFractionParts(floatVal);
	
	let places = this.numberFractionPlaces(floatVal);
	places = Math.min(places, 7);
	const asciiVal = Number(floatVal).toFixed(places);  // Try 3 places
	return this.replaceAsciiDigits(asciiVal, valueToCharMap);
    }

    numberFractionPlaces(x) {
	// Return number of  digits right of decimal
	
	let y = Math.floor(Math.abs(x));
	let fract = x - y;
	let numPlaces = 0;
	while (fract !== 0.0) {
	    fract *= 10.0;
	    fract = fract - Math.floor(fract);
	    numPlaces += 1;
	}
	return numPlaces;
    }

    findFractionParts(x) {
	// Get fraction part
	// Abs?
	let wholePart = Math.floor(Math.abs(x));
	let fract = x - wholePart;

	let maxShift = 20;
	let shift = 1
	let power = 10;
	while (shift < maxShift) {
	    let diff = fract * power - fract;
	    if (diff === Math.floor(diff)) {
		// We have an integer as the difference.
		// Compute the fraction, indicating exact.
		return [wholePart, diff, power, true];
	    }
	    power *= 10;
	    shift += 1;
	}
	// Did not find the result in max digits
	// Compute the closest fraction, indicating inexact.
	return [wholePart, diff, power, false];
    }
}


// For testing conversions in Cherokee numerals.
class BaseTestNumerals {
    constructor (numeralsObj) {
	this.numObj = numeralsObj;
    }

    // Do these have the same contents in same order?
    compareLists(l1, l2) {
	let matched = true;
	if (l1.length === l2.length) {
	    for (let j = 0; j < l2.length; ++j) {
		if (l1[j] !== l2[j]) {
		    matched = false;
		}
	    }
	} else {
	    matched = false;
	}
    }

    assertEquals(equal, expected, actual, input) {
	if (expected !== actual) {
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

	    const matched = this.compareLists(result, expected);
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

    parseNumeralStringToNumeralList(numString, charToValue) {
        let result = [];
        for (let i = 0; i < numString.length; i ++) {
            let char = numString.charAt(i);
            if (charToValue.has(char)) {
                result.push(charToValue.get(char));
            }
        }
        return result;
    }
}
