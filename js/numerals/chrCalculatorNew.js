// Number Calculator that uses external numeral definitions and
// formatting to character strings
// Based on http://jsfiddle.net/doug65536/peC3r/

let chrCalculator = null;

// TODO: Move functions here.
class calculator4Function {
    constructor () {
	this.outputArea = null;
	this.numeralClass = null;
    }
    setOutputArea(htmlArea) {
	this.outputArea = htmlArea;
    }

    setNumeralClass(obj) {
	this.numeralClass = obj;
    }
}

// Creates and implements 4 function calculator object.
// No public constructor
// Relies on globals for initializing regions
// Directly sets and gets values
// Sets up listeners on set of input buttons
(function () {
    "use strict";
    // Get doc from the ID.
    var $ = function (item) {
	return typeof item === 'string' ? document.getElementById(item) : item;
    };

    var hookEvent = window.addEventListener ? function (target, name, handler) {
	    $(target).addEventListener(name, handler);
	} : function (target, name, handler) {
	    $(target).attachEvent('on' + name, handler);
	};

    var bind = function (target, callback) {
	var self = target;
	return function (event) {
	    return callback.call(self, event);
	};
    };

    // The Finite State Machine
    const ArgState1 = Symbol(1);
    const AfterOpState1 = Symbol(2);
    const ArgState2 = Symbol(3);
    const AfterEqState = Symbol(4);
    const AccumStateDecimal = Symbol(5);
    const ErrorState = Symbol(6);

    const noOP = Symbol(4);

    // The Calculator object.
    // Constructor
    var Calc = function (container, buttons, output, outputArea,
			 test_output) {
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
	this.numeralObject = null;
	this.formatInt = null;
	this.zeroChar = null;

	this.enterOps = new Set(['=', '+', '-', '*', '/']);
	this.buttons = $(buttons);
	this.output = $(output);
	this.outputArea = $(outputArea);

	this.test_output = $(test_output);

	this.container = container;

	// Connections to characters and their values
	this.charToValueMap = null;

	// Keeping track of the inputs log
	this.inputLog = [];
	hookEvent(this.buttons, 'click', bind(this, this.on_button_pressed));
	hookEvent(window, 'keypress', bind(this, this.on_key_pressed));
    };

    Calc.prototype = {
	constructor: Calc,

	get_operand: function () {
	    return this.operand === '' ? this.result : this.operand;
	},
	trancendental: {
	    ln: Math.log,
	    sin: Math.sin,
	    cos: Math.cos,
	    tan: Math.tan
	},

	// Uses FSM to process states and inputs
	on_input: function (ch) {
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
	},

	on_button_pressed: function (ev) {
	    if (ev !== null && ev.target !== undefined && ev.target.value !== undefined) {
		this.on_input(ev.target.value);
	    } else if (ev !== null && ev.target !== undefined && ev.target.alt !== undefined) {
		this.on_input(ev.target.alt);
	    }
	},
	key_translation: {
	    '\r': '=',
	    '\n': '=',
	    'S': 'sin',
	    'O': 'cos',
	    'T': 'tan',
	    'L': 'ln',
	    '1': '\uf601',
	    '2': '\uf602',
	    '3': '\uf603',
	    '4': '\uf604',
	    '5': '\uf605',
	    '6': '\uf606',
	    '7': '\uf607',
	    '8': '\uf608',
	    '9': '\uf609',
	    '0': '\uf600',
	},
	on_key_pressed: function (ev) {
	    var ch = String.fromCharCode(ev.charCode).toUpperCase();
	    if ("0.+-*/=C".indexOf(ch) >= 0) {
		this.on_input(ch);
		return;
	    }
	    var translation = this.key_translation[ch];
	    if (translation !== undefined) {
		this.on_input(translation);
	    }
	    if (ch == "!") {
		test0();
	    }
	}
    };

    // Connect with number system.
    Calc.prototype.setNumeralObject = function(obj) {
	this.numeralObject = obj;
	this.formatInt = obj.formatIntToNumeralString;
	this.charToValueMap = obj.getCharToValueMap();
	this.valueToCharMap = obj.getCharToValueMap();
    }

    // Checks used in the FSM
    Calc.prototype.isEnterEqual = function (ch) {
	return (ch === '=');
    }
    Calc.prototype.isEnterNumeral = function (ch) {
	return (this.charToValueMap.has(ch));
    }
    Calc.prototype.isEnterOp = function (ch) {
	return (this.enterOps.has(ch));
    }

    // Operations on FSM
    Calc.prototype.doPendingOp = function (err) {
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
	    result = this.accum1 * this.accum2;
	    break;
	case '/':
	    // TODO: Check for divide by zero.
	    result = Math.floor(this.accum1 / this.accum2);
	    break;
	}
	this.accum1 = result;
	this.result = result;
	
	if (this.numeralObject.displayLog) {
	    this.numeralObject.displayLog(' --> ');
	}
	
    }

    Calc.prototype.display = function (newVal) {
	var resultString = this.numeralObject.formatInt(newVal);
	this.output.innerHTML = resultString;
	if (this.numeralObject.displayDecimal) {
	    this.numeralObject.displayDecimal(newVal);
	}
	if (this.numeralObject.displayLog) {
	    this.numeralObject.displayLog(newVal);
	}
    }

    Calc.prototype.accumulateChar1 = function (ch) {
	// Add to list of numerals
	let number = this.charToValueMap.get(ch);
	this.numeralList.push(number);
	this.accum1 =
	    this.numeralObject.numberListToInteger(this.numeralList);
    }

    Calc.prototype.accumulateChar2 = function (ch) {
	// Add to list of numerals
	let number = this.charToValueMap.get(ch);
	this.numeralList2.push(number);
	this.accum2 =
	    this.numeralObject.numberListToInteger(this.numeralList2);
    }

    Calc.prototype.updatePendingOp = function (op) {
	this.operation = op;
	if (this.numeralObject.displayLog) {
	    this.numeralObject.displayLog(op);
	}
    }

    Calc.prototype.enterEqualFn = function () {
	// Log if requested
	if (this.numeralObject.displayLog) {
	    this.numeralObject.displayLog(' = \n');
	}
	
    }

    Calc.prototype.init = function () {
	this.clearAll();
	this.state = ArgState1;
    }

    Calc.prototype.startArg1 = function (ch) {
	let number = this.charToValueMap.get(ch);
	this.numeralList = [number];
	this.accum1 =
	    this.numeralObject.numberListToInteger(this.numeralList);
    }
    Calc.prototype.startArg2 = function (ch) {
	let number = this.charToValueMap.get(ch);
	this.numeralList2 = [number];
	this.accum2 =
	    this.numeralObject.numberListToInteger(this.numeralList2);
    }

    // Clear everything
    Calc.prototype.clearAll = function() {
	this.result = 0;
	this.operand = '';
	this.operation = '';
	this.numeralList = [0];
	this.accum1 = this.accum2 = 0;
	const newVal =
	      this.numeralObject.numberListToInteger(this.numeralList);

	if (this.numeralObject.displayLog) {
	    this.numeralObject.displayLog('#clear');
	}

	this.display(newVal);

    }

	// Clear everything
    Calc.prototype.deleteChar = function(state) {
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

    // FMS state handlers
    Calc.prototype.handleArgState1 = function (ch) {
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

    Calc.prototype.handleAfterOpState1 = function (ch) {
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

    Calc.prototype.handleArgState2 = function (ch) {
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

    Calc.prototype.handleAfterEqState = function (ch) {
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

    Calc.prototype.handleErrorState = function (ch) {
	if (ch === 'clear') {
	    this.clearAll();
	    this.state = ArgState1;
	}
	// Otherwise stay in this state
    }


    let calculator;

    function test0() {
      // Tests that should pass
      calculator.on_input("C");  // Clear
      if (calculator.get_operand() == 0) {
	calculator.test_output.innerHTML = 'Clear passes';
      } else {
	calculator.test_output.innerHTML = 'Clear fails';
      }
    }


    // Set up with regions in the HTML page?
    calculator = new Calc($('chr_calculator'),
			  $('chrButtontableNew'), $('outputChr'),
			  $('test_output'));

    // Connect the calculator object.
    chrCalculator = calculator;
}());

// Not used now.
function setupCalc() {
    calculator = new Calc($('calculator'), $('chrButtonTableNew'), $('output'));
}
