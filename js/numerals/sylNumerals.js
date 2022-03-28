// Sylheti numerals computations.

// Handling Sylheti numerals - base 10
class Numerals {
    constructor() {
        //  Map numeral values to corresponding code points
        this.valueToChar = new Map(
            [[0, '\uef30'], [1, '\uef31'], [2, '\uef32'],
             [3, '\uef33'], [4, '\uef35'],[5, '\uef35'],
             [6, '\uef36'], [7, '\uef37'], [8, '\uef38'],
             [9, '\uef39'],
            ]
        );

        // Map chars to numeral values.
        this.charToValue = new Map();
        const iterator1 = this.valueToChar.keys();
        let val;
        do {
            val = iterator1.next().value;
            if (val !== undefined) {
                let char = this.valueToChar.get(val);
                this.charToValue.set(char, val);
            }
        } while (val !== undefined);

        // special outputs
        this.decimalOutputFn = null;
        this.logOutputFn = null;
    }

    // Returns list of lists, each describing one row of the layout.
    keyLayoutArray() {
        const layoutRowChars = [
            // Stand ins
            ['\uef30', '\uef31', '\uef32'],
            ['\uef33', '\uef34', '\uef35'],
            ['\uef36', '\uef37', '\uef38'],
            ['\uef39']
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
        if (intVal == 0) {
            let chr = this.valueToChar.get(0);
            return chr;
        }
        let result = [];
        while (intVal) {
            let val = intVal % 10;
            let chr = this.valueToChar.get(val);
            result.unshift(chr);
            intVal = Math.floor(intVal / 10);
        }
        return result.join('');
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
