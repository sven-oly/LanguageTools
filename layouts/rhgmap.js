// Maps from key characters to values
// Element [0] is the RHG character in unshifted layer
// Element [1] has the shifted characters
// The key itself is the value in an unmodified layer.
// Element [2] has unmodified shift characters
//
var rhg_map = [
  '`': ['\ud803\udd22','\ud803\udd27', '', '~'],
  '1': ['\ud803\udd31','', '', '!'],
  '2': ['\ud803\udd32','', '', '@'],
  '3': ['\ud803\udd33','', '', '#'],
  '4': ['\ud803\udd34','', '', '$'],
  '5': ['\ud803\udd35','', '', '%'],
  '6': ['\ud803\udd36','', '', '^'],
  '7': ['\ud803\udd37','', '', '&'],
  '8': ['\ud803\udd38','', '', '*'],
  '9': ['\ud803\udd39','', '', '('],
  '0': ['\ud803\udd30','', '', ')'],
  '-': ['\uD803\uDD08','', '', '_'],
  '=': ['\uD803\uDD16','', '', '+'],
  'q': ['\uD803\uDD1e','', '', 'Q'],
  'w': ['\uD803\uDD0c','', '', 'W'],
  'e': ['\uD803\uDD04','', '', 'E'],
  'r': ['\uD803\uDD18','\uD803\uDD25', '', 'R'],
  't': ['\uD803\uDD1f','', '', 'T'],
  'y': ['\uD803\uDD20','', '', 'Y'],
  'u': ['\uD803\uDD21','', '', 'U'],
  'i': ['\uD803\uDD02','', '', 'I'],
  'o': ['\uD803\uDD17','', '', 'O'],
  'p': ['\uD803\uDD19','', '', 'P'],
  '[': ['\uD803\uDD23','', '', '{'],
  ']': ['\uD803\uDD00','', '', '}'],
  '\\': ['\uD803\uDD0f','', '', '|'],
  'a': ['\uD803\uDD0b','\uD803\uDD26', '', 'A'],
  's': ['\uD803\uDD09','', '', 'S'],
  'd': ['\uD803\uDD12','', '', 'D'],
  'f': ['\uD803\uDD07','', '', 'F'],
  'g': ['\uD803\uDD05','', '', 'G'],
  'h': ['\uD803\uDD11','\uD803\uDD24', '', 'H'],
  'j': ['\uD803\uDD13','', '', 'J'],
  'k': ['\uD803\uDD06','', '', 'K'],
  'l': ['\uD803\uDD1b','', '', 'L'],
  ';': ['\uD803\uDD0e','', '', ':'],
  '\'': ['\uD803\uDD1a','', '', '"'],
  'z': ['\uD803\uDD10','', '', 'Z'],
  'x': ['\uD803\uDD1d','', '', 'X'],
  'c': ['\uD803\uDD01','', '', 'C'],
  'v': ['\uD803\uDD15','', '', 'V'],
  'b': ['\uD803\uDD14','', '', 'B'],
  'n': ['\uD803\uDD03','', '', 'N'],
  'm': ['\uD803\uDD0a','', '', 'M'],
  ',': ['\uD803\uDD0d','', '', '<'],
  '.': ['\ud803\udd27','', '', '>'],
  '/': ['''', '', '?'],
];

var layer = 0;
  // Function to controll output from virtual KB
  function keyDown(event) {
    var e = event;  // Global?
    var out = e.srcElement;
    if (e.code == "CapsLock") {
      inCapsLock = true;
    }
  }

  function eventPropToLayerCode(e) {
    var level = "default";
    if (!e.shiftKey) {
      if (!e.ctrlKey) {
        level = 0;
      } else {
        level = "ctrl_alt";
      }
    } else {
      // Shifted
      if (!e.ctrlKey) {
        level = 1;  // Shifted
      } else {
        level = "shift_ctrl_alt";
      }
    }
    if (inCapsLock) {
      if (level == 0) {
        level = 2;
      } else {
        level = 3;  // Shift + caps lock
      }
    }
    return level;
  }

  // Function to controll output from virtual KB
  function keyPress(event) {
    var e = event;
    var key = e.key;
    var layer = eventPropToLayerCode(e);
    var newVal = KbLayout[layer][key]['code'];
    if (newVal !== undefined) {
      out.value += newVal;
      e.preventDefault();
    }
  }

  // Function to control output from virtual KB
  function keyUp(event) {
    var e = event;  // Global?
    var out = e.srcElement;
    if (e.code == "CapsLock") {
      inCapsLock = false;
    }
  }
