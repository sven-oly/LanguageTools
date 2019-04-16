var rhg_map = {
  '`': ['\ud803\udd22','\ud803\udd27'],
  '~': ['\ud803\udd22','\ud803\udd27'],
  '1': ['\ud803\udd31',''],
  '2': ['\ud803\udd32',''],
  '3': ['\ud803\udd33',''],
  '4': ['\ud803\udd34',''],
  '5': ['\ud803\udd35',''],
  '6': ['\ud803\udd36',''],
  '7': ['\ud803\udd37',''],
  '8': ['\ud803\udd38',''],
  '9': ['\ud803\udd39',''],
  '0': ['\ud803\udd30',''],
  '-': ['\uD803\uDD08',''],
  '=': ['\uD803\uDD16',''],
  'q': ['\uD803\uDD1e',''],
  'w': ['\uD803\uDD0c',''],
  'e': ['\uD803\uDD04',''],
  'r': ['\uD803\uDD18','\uD803\uDD25'],
  'R': ['\uD803\uDD18','\uD803\uDD25'],
  't': ['\uD803\uDD1f',''],
  'y': ['\uD803\uDD20',''],
  'u': ['\uD803\uDD21',''],
  'i': ['\uD803\uDD02',''],
  'o': ['\uD803\uDD17',''],
  'p': ['\uD803\uDD19',''],
  '[': ['\uD803\uDD23',''],
  ']': ['\uD803\uDD00',''],
  '\\': ['\uD803\uDD0f',''],
  'a': ['\uD803\uDD0b','\uD803\uDD26'],
  'A': ['\uD803\uDD0b','\uD803\uDD26'],
  's': ['\uD803\uDD09',''],
  'd': ['\uD803\uDD12',''],
  'f': ['\uD803\uDD07',''],
  'g': ['\uD803\uDD05',''],
  'h': ['\uD803\uDD11','\uD803\uDD24'],
  'H': ['\uD803\uDD11','\uD803\uDD24'],
  'j': ['\uD803\uDD13',''],
  'k': ['\uD803\uDD06',''],
  'l': ['\uD803\uDD1b',''],
  ';': ['\uD803\uDD0e',''],
  '\'': ['\uD803\uDD1a',''],
  'z': ['\uD803\uDD10',''],
  'x': ['\uD803\uDD1d',''],
  'c': ['\uD803\uDD01',''],
  'v': ['\uD803\uDD15',''],
  'b': ['\uD803\uDD14',''],
  'n': ['\uD803\uDD03',''],
  'm': ['\uD803\uDD0a',''],
  ',': ['\uD803\uDD0d',''],
  '.': ['\ud803\udd27',''],
  '/': ['/'],
  ' ': [' '],
};


var inCapsLock = false;

// Function to control output from virtual KB
  function keyDown(event) {
    var e = event;  // Global?
    var out = e.srcElement;
    if (e.code == "CapsLock") {
      inCapsLock = true;
    }
  }

  function eventPropToLayerCode(e) {
    var level = 0;
    if (!e.shiftKey) {
      if (!e.ctrlKey) {
        level = 0;
      } else {
        level = 2;
      }
    } else {
      // Shifted
      if (!e.ctrlKey) {
        level = 1;
      } else {
        level = 3;
      }
    }
    if (inCapsLock) {
      level += 4;
    }
    return level;
  }

  // Function to controll output from virtual KB
  function keyPress(event) {
    var e = event;
    var key = e.key;
    var out = e.srcElement;
    var layer = eventPropToLayerCode(e);
    var newVal = '';
    if (key in rhg_map) {
      newVal = rhg_map[key][layer];
    }

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
