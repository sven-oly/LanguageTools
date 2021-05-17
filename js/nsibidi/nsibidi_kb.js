/* File: nsibidi_kb.js
 * Processes nsibidi keyboard input
 * Started 14-May-2021, cwc
 */

/* Works with data in file English2utf.js */
/* Raw list is in variable utfArr */

/* Namespace */
let nsibidi = function() {
    let new_list;
    let tree = new Map();
}

nsibidi.prototype.sortFirst = function(a,b) {
  if (a[0] < b[0]) {
    return -1;
  } else if (a[0] > b[0]) {
    return 1;
  } else {
    return 0;
  }
}

/* Create better data structures for handling input */
nsibidi.prototype.sortInput = function(list_in) {
  /* First, sort by the first field */
  this.new_list = list_in.sort(this.sortFirst)
}

nsibidi.prototype.createTree = function(list_in) {
    // Start by making a map based on first character
    this.tree = new Map();
    for (i in list_in) {
      let eng = list_in[i][0];
      let nsibidi = list_in[i][1];
      let first = '';
      if (eng.length > 0) {
        let first = eng.substring(0, 1);
        if (this.tree[first]) {
            this.tree[first].push(list_in[i]);  // Remove first element of eng?
        } else {
            this.tree[first] = [list_in[i]];  // Remove first element of eng?
        }
      }
    }
    // ?? Should I do this recursively?
}

var nsi = new nsibidi();

nsi.sortInput(utfArr);
nsi.createTree(nsi.new_list);

// Returns possible matches with current prefix.
nsibidi.prototype.lookupEng = function(input) {
    if (!this.tree || !input) return null;
    let result;

    let first = input.substring(0,1);  // First character for lookup
    if (this.tree[first]) {
        let insize = input.length;
        // Look for how many with this string.
        result = [];
        let sublist = this.tree[first];
        for (i in sublist) {
          let test = sublist[i][0].substring(0,insize);
          if (test === input) {
            result.push(sublist[i]);
          }
        }
    }
    return result;  // List of possible matches
}

nsiSelectItem = function(output_area, raw_input, result, input_div, input_area) {
    // Insert the Nsibii character when you select it.
    if (result) {
        output_area.value = output_area.value + result[1];
    } else {
        output_area.value = output_area.value + raw_input;
    }
    // Clear drop down after selection. UNDO?
    clearDiv(input_div);
    input_area.innerHTML = input_area.value = "";
    input_area.focus();
}

clearDiv = function(input_div) {
    // Clear drop down after selection. UNDO?
    buttons = input_div.getElementsByTagName("button");
    spans = input_div.getElementsByTagName("span");
    let length = buttons.length;
    for (i = length-1; i >= 0; i--) {
      buttons[i].remove();
      spans[i].remove();
    }
}

nsibidi.prototype.handleMatching = function(input_id, output_id, div_id, info_id) {
  const e = window.event;
  const key = e.key;

  const limit = 10;
  let input_area = document.getElementById(input_id);
  const output_area = document.getElementById(output_id);
  let div = document.getElementById(div_id);
  if (!input_area) return null;

  // Insert some characters directly including punctuation, space, return.
  if (key >= " " && key < "0" ) {
    nsiSelectItem(output_area, input_area.value, null, div, input_area);
  }
//  if (key === 'Enter' && input_area.value === "") {
//    nsiSelectItem(output_area, '\r\n', null, div, input_area);
//  }
  let results = nsi.lookupEng(input_area.value);
  if (!results) {
    return null;
  }

  // Check for return or tab. Accept what's typed.
  if (key === 'Enter' || key == "Tab") {
    nsiSelectItem(output_area, input_area.value, results[0], div, input_area);
    return results;
  }
  clearDiv(div);

  /* Show number of results found total */
  if (info_id) {
    info_area = document.getElementById(info_id);
    info_area.innerHTML = info_area.value = results.length + " matches";
  }

  /* If the number of results is small enough, show and allow selection */
  if (results.length <= limit) {
    // Populate and show results
    let div = document.getElementById(div_id);
    for (let i in results) { // put parts of the text in each
        let button = document.createElement("button");
        let span = document.createElement("span");
        span.innerHTML = " " + results[i][0];
        button.innerHTML = button.value = results[i][1];
        button.className = 'nsi_button';
        button.onclick = button.onclick = function() {
            nsiSelectItem(output_area, input_area.value, results[i], div, input_area);
        };
        div.appendChild(span);
        div.appendChild(button);
    };
  }
  return results;
}

let m0 = nsi.lookupEng('l');
let m1 = nsi.lookupEng('le');
let m2 = nsi.lookupEng('leopard');