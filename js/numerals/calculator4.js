// Number Calculator that uses external numeral definitions and
// formatting to character strings
// Based on http://jsfiddle.net/doug65536/peC3r/
// Changed to Finite State Machine.

// The Finite State Machine constants
const ArgState1 = Symbol(1);
const AfterOpState1 = Symbol(2);
const ArgState2 = Symbol(3);
const AfterEqState = Symbol(4);
const AccumStateDecimal = Symbol(5);
const ErrorState = Symbol(6);

const noOP = Symbol(7);

// Creates and implements 4 function calculator object.
// Sets up listeners on set of input buttons
class calculator4 {

    "use strict";
    // Get doc object from the ID.
    getItemObject(item) {
        if (typeof item === 'string') {
            const element = document.getElementById(item);
            return element;
        } else {
            return item;
        }
    }

    // The Calculator object.
    // Constructor
    constructor (numeralInfoOjb, output) {
        this.numeralObject = numeralInfoOjb;

        this.output = this.getItemObject(output);

        this.accum1 = 0;  // The accumulator
        this.numeralList = [];  // Stores the integer form of each position
        this.accum2 = 0;  // The 2nd register
        this.numeralList2 = [];

        this.state = ArgState1;

        this.result = 0;
        this.operand = '';
        this.operation = '';
        this.memory = 0;

        // Handling data and functions for numeral system.
        this.formatInt = null;
        this.zeroChar = null;

        this.enterOps = new Set(['=', '+', '-', '*', '×', '÷', '/']);

        // Connections to characters and their values
        this.charToValueMap = null;

        this.init();
    }

    get_operand () {
        return this.operand === '' ? this.result : this.operand;
    }
    
    // Uses FSM to process states and inputs
    onInput (ch) {
        // Implement the FSM

        // !! This is where we switch on the states.
        switch (this.state) {
        case ArgState1:
            this.handleArgState1(ch);
            break;
        case AfterOpState1:
            this.handleAfterOpState1(ch);
            break;
        case ArgState2:
            this.handleArgState2(ch);
            break;
        case AfterEqState:
            this.handleAfterEqState(ch);
            break;
        case ErrorState:
            this.handleErrorState(ch);
            break;
        };
    }

    // Handles buttons on user interface
    on_button_pressed(ev) {
        if (ev !== null && ev.target !== undefined && ev.target.value !== undefined) {
            this.onInput(ev.target.value);
        } else if (ev !== null && ev.target !== undefined && ev.target.alt !== undefined) {
            this.onInput(ev.target.alt);
        }
    }
    
    key_translation(ch) {
        switch (ch) {
        case '\r': return '=';
        case '\n': return '=';
        case 'S': return 'sin';
        case 'O': return 'cos';
        case 'T': return 'tan';
        case 'L': return 'ln';
        }
    }
    
    // Handle keys on keyboard
    onKeyPressed(ev) {
        var ch = String.fromCharCode(ev.charCode).toUpperCase();
        if ("0123456789.+-*×÷/=C".indexOf(ch) >= 0) {
            this.onInput(ch);
            return;
        }
	/* TODO: Translate key
        let translation = this.key_translation(ch);
        if (translation !== undefined) {
            this.onInput(translation);
        }
        if (ch == "!") {
            test0();
        }
	*/
    }

    // Connect with number system.
    setNumeralObject(obj) {
        this.numeralObject = obj;
        this.formatInt = obj.formatIntToNumeralString;
        this.charToValueMap = obj.getCharToValueMap();
        // Not actually used
        this.valueToCharMap = obj.getValueToCharMap();
    }

    // Checks used in the FSM
    isEnterEqual (ch) {
        return (ch === '=');
    }
    isEnterNumeral (ch) {
        return (this.charToValueMap.has(ch));
    }
    isEnterOp (ch) {
        return (this.enterOps.has(ch));
    }

    // Operations on FSM
    doPendingOp (err) {
        // Perform the arithmetic on the accumulator values.
        let result = 0;
        switch (this.operation) {
        case '':
            break;
        case '+':
            result = this.accum1 + this.accum2;
            break;
        case '-':
            result = this.accum1 - this.accum2;
            break;
        case '*':
        case '×':
            result = this.accum1 * this.accum2;
            break;
        case '÷':
        case '/':
            // TODO: Check for divide by zero.
	    if (this.accum !== 0) { 
		const rawResult = this.accum1 / this.accum2;
		result = rawResult;  // Try this
		// result = Math.floor(rawResult);
	    } else {
		// TODO: Display an error
	    }
            break;
        }
        this.accum1 = result;
        this.result = result;
        
        if (this.numeralObject.displayLog) {
            this.numeralObject.displayLog(' --> ');
        }
        
    }

    display(newVal) {
        let resultString;
	if ((this.numeralObject.doFloat !== undefined) &&
	    this.numeralObject.doFloat &&
	    (this.numeralObject.formatFloat !== undefined)) {
	    resultString = this.numeralObject.formatFloat(newVal);
	} else  {
	    // Integer only
	    resultString = this.numeralObject.formatInt(newVal);
	}
        this.output.innerHTML = resultString;

        if (this.numeralObject.displayDecimal) {
            this.numeralObject.displayDecimal(newVal);
        }
        if (this.numeralObject.displayLog) {
            this.numeralObject.displayLog(newVal);
        }
    }

    accumulateChar1 (ch) {
        // Add to list of numerals
        let number = this.charToValueMap.get(ch);
        this.numeralList.push(number);
        this.accum1 =
            this.numeralObject.numberListToInteger(this.numeralList);
    }

    accumulateChar2 (ch) {
        // Add to list of numerals
        let number = this.charToValueMap.get(ch);
        this.numeralList2.push(number);
        this.accum2 =
            this.numeralObject.numberListToInteger(this.numeralList2);
    }

    updatePendingOp (op) {
        this.operation = op;
        if (this.numeralObject.displayLog) {
            this.numeralObject.displayLog(op);
        }
    }

    enterEqualFn () {
        // Log if requested
        if (this.numeralObject.displayLog) {
            this.numeralObject.displayLog(' = \n');
        }
        
    }

    init () {
        this.clearAll();
        this.state = ArgState1;
    }

    startArg1 (ch) {
        let number = this.charToValueMap.get(ch);
        this.numeralList = [number];
        this.accum1 =
            this.numeralObject.numberListToInteger(this.numeralList);
    }
    startArg2 (ch) {
        let number = this.charToValueMap.get(ch);
        this.numeralList2 = [number];
        this.accum2 =
            this.numeralObject.numberListToInteger(this.numeralList2);
    }

    // Clear everything
    clearAll() {
        this.result = 0;
        this.operand = '';
        this.operation = '';
        this.numeralList = [];
        this.accum1 = this.accum2 = 0;
        const newVal =
              this.numeralObject.numberListToInteger(this.numeralList);

        if (this.numeralObject.displayLog) {
            this.numeralObject.displayLog('\n#clear\n');
        }

        this.display(newVal);
        this.state = ArgState1;
    }

    // Clear everything
    deleteChar(state) {
        switch (state){
        case ArgState1:
            this.numeralList.pop();
            var newVal =
                this.numeralObject.numberListToInteger(this.numeralList);
            this.accum1 = newVal;
            break;
        case ArgState2:
            this.numeralList2.pop();
            var newVal =
                this.numeralObject.numberListToInteger(this.numeralList2);
            this.accum2 = newVal;
            break;
        }
        // TODO: other states?
    }

    // Special function to clear state and set accumulator to given value
    insertAccumValue(val) {
        this.clearAll();
        this.accum1 = val;
        this.numeralList = this.numeralObject.formatIntToNumeralString;(val);
        this.display(this.accum1);
    }

    // FMS state handlers
    handleArgState1 (ch) {
        if (this.isEnterEqual(ch)) {
            this.enterEqualFn();
            this.state = AfterEqState;
            return;
        }
        if (this.isEnterNumeral(ch)) {
            this.accumulateChar1(ch);
            this.display(this.accum1);
            return;
        }
        if (this.isEnterOp(ch)) {
            this.updatePendingOp(ch);
            this.state = AfterOpState1;
            return;
        }
        if (ch === 'clear') {
            this.clearAll();
            this.state = ArgState1;
            return;
        }
        if (ch == 'delete') {
            this.deleteChar(ArgState1);
            return;
        }
    }

    handleAfterOpState1 (ch) {
        if (this.isEnterEqual(ch)) {
            this.enterEqualFn();
            return;
        }
        if (ch === 'clear') {
            this.clearAll();
            this.state = ArgState1;
            return;
        }
        if (this.isEnterNumeral(ch)) {
            this.startArg2(ch);
            this.display(this.accum2);
            this.state = ArgState2;
            return;
        }
        if (this.isEnterOp(ch)) {
            this.updatePendingOp(ch);
            this.doPendingOp();
            this.display(this.accum1);
            return;
        }
    }

    handleArgState2 (ch) {
         if (this.isEnterEqual(ch)) {
            this.enterEqualFn();
            this.doPendingOp();
            this.display(this.accum1);
            this.state = AfterEqState;
            return;
        }
        if (this.isEnterOp(ch)) {
            this.doPendingOp();
            this.display(this.accum1);
            this.updatePendingOp(ch);
            this.state = AfterOpState1;
            return;
        }
        if (this.isEnterNumeral(ch)) {
            this.accumulateChar2(ch);
            this.state = ArgState2;  // Same state
            this.display(this.accum2);
            return;
        }
        if (ch === 'clear') {
            this.clearAll();
            this.state = ArgState1;
            return;
        }
        if (ch == 'delete') {
            this.deleteChar(ArgState2);
            return;
        }
    }

    handleAfterEqState (ch) {
        if (this.isEnterNumeral(ch)) {
            this.startArg1(ch);
            this.display(this.accum1);
            this.state = ArgState1;
            return;
        }
        if (ch === 'clear') {
            this.clearAll();
            this.state = ArgState1;
            return;
        }
         if (this.isEnterEqual(ch)) {
            this.enterEqualFn();
            return;
        }
        if (this.isEnterOp(ch)) {
            this.updatePendingOp(ch);
            this.state = AfterOpState1;
        }
    }

    handleErrorState (ch) {
        if (ch === 'clear') {
            this.clearAll();
            this.state = ArgState1;
        }
        // Otherwise stay in this state
    }

}
