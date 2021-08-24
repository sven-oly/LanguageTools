/* File: nsibidi_kb.js
 * Processes nsibidi keyboard input
 * Started 14-May-2021, cwc
 */

/* Works with data in file English2utf.js */
/* Raw list is in variable utfArr */

/* Namespace */
let nsibidi = function() {
    this.new_list = [];
    let tree = new Map();
    let igTree = new Map();
    this.currentResults = null;
    this.currentBase = 0;
    this.fontName = "Akagu2020";
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

/*Igbo Latin to Nsib struture */
nsibidi.prototype.ig2nsi = function(data_in) {
  // Create an index based on the first letter of each key in this input.
    this.igTree = new Map();
    // TODO: unpack multiple items
    for (const property in data_in) {
        let x = data_in[property];
        let first = property.substring(0,1);
        let item = [property, x];
        // let propNormalized = this.matchToBase(property);
        first = property.substring(0,1);
        if (this.igTree.has(first)) {
            let y = this.igTree.get(first);
            y.push(item);
        } else {
            this.igTree.set(first, [item]);
        }
    }
    let end = this.igTree.size;
}

nsibidi.matchList = {
    '' : 'a',
    '' : 'e'
}

// Returns string without diacritic marks.
nsibidi.prototype.matchToBase = function (str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
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
        if (this.tree.has(first)) {
            let y = this.tree.get(first);
            y.push(list_in[i]);
        } else {
            this.tree.set(first, [list_in[i]]);
        }
//        if (this.tree[first]) {
//            this.tree[first].push(list_in[i]);  // Remove first element of eng?
//        } else {
//            this.tree[first] = [list_in[i]];  // Remove first element of eng?
//        }
      }
    }
    // ?? Should I do this recursively?
}

var nsi = new nsibidi();

// Start looking at latin igbo input. Create tree
nsi.ig2nsi(latn2nsib);

nsi.sortInput(utfArr);
nsi.createTree(nsi.new_list);

// Returns possible matches with current prefix.
nsibidi.prototype.lookupEng = function(input) {
  return this.lookupMatches(input, this.tree);
}

// Returns possible matches with current prefix.
nsibidi.prototype.lookupIgbo = function(input) {
  return this.lookupMatches(input, this.igTree);
}

// Given a tree of data and an input, return the matches
nsibidi.prototype.lookupMatches = function(input, data) {
    if (!data || !input) return null;
    let result;

    let first = input.substring(0,1);  // First character for lookup
    const sublist = data.get(first);
    if (sublist) {
        const insize = input.length;
        // Look for how many with this string.
        result = [];
        for (i in sublist) {
          let test = sublist[i][0].substring(0,insize);
          if (test === input) {
              if (Array.isArray(sublist[i][1])) {
                  // TODO: unpack multiple items??
                  // Or handle at display time?
                  for (let second in sublist[i][1]) {
                      result.push([sublist[i][0], sublist[i][1][second] ]);
                  }
              } else {
                // Just one item.
                result.push(sublist[i]);
                }
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

nsibidi.prototype.nsiSelectIndexedItem = function(output_area, relativeItemNum, input_area, input_div) {
    // Insert the Nsibii character when you select it.
    const item = this.currentResults[relativeItemNum + this.currentBase];
    if (item) {
        output_area.value = output_area.value + item[1];
    }
    // Clear drop down after selection. UNDO?
    clearDiv(input_div);
    input_area.innerHTML = input_area.value = "";
    input_area.focus();
    this.currentResults = null;
    this.currentBase = 0;
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

nsibidi.prototype.handleMatching = function(
  input_id, input_lang_id, output_id, div_id, info_id, choice_table_id) {
  const e = window.event;
  const key = e.key;

  const limit = 10;
  this.pageSize = limit;
  const input_area = document.getElementById(input_id);
  this.input_area = input_area;
  const output_area = document.getElementById(output_id);
  const choice_table = document.getElementById(choice_table_id);
  let div = document.getElementById(div_id);
  if (!input_area) return null;

  const input_lang_selector = document.getElementById(input_lang_id);
  const input_lang = input_lang_selector.value;

  // Insert some characters directly including punctuation, space, return.
  if (key !== "'" && key >= " " && key < "0" ) {
    nsiSelectItem(output_area, input_area.value, null, div, input_area);
  }
  if (key >= "0" && key <= "9" ) {
    if (this.currentResults) {
        const itemNum = parseInt(key);
        this.nsiSelectIndexedItem(output_area, itemNum, input_area, div);
        this.clearChoiceTable(choice_table)
    }
  }
  if (key === "PageDown") {
    // TODO: change the contents
    if (this.currentBase + this.pageSize <= this.currentResults.length) {
        this.currentBase = Math.min(this.currentResults.length, this.currentBase + this.pageSize);
        this.fillChoiceTable(choice_table);
    }
    return;
  }
  if (key === "PageUp") {
    this.currentBase = Math.max(0, this.currentBase - this.pageSize);
    this.fillChoiceTable(choice_table);
    return;
  }

  let results = null;
  switch (input_lang) {
    case 'en':
    results = nsi.lookupEng(input_area.value);
    break;
    case 'ig':
    results = nsi.lookupIgbo(input_area.value);
    break;
  }
  if (!results) {
    return null;
  }

  // Check for return or tab. Accept what's typed.
  if (key === 'Enter' || key == "Tab") {
    nsiSelectItem(output_area, input_area.value, results[0], div, input_area);
    this.clearChoiceTable(choice_table)
    return results;
  }
  clearDiv(div);

  /* Show number of results found total */
  if (info_id) {
    info_area = document.getElementById(info_id);
    info_area.innerHTML = info_area.value = results.length + " matches";
  }

  /* If the number of results is small enough, show and allow selection */
  this.currentResults = results;
  this.currentBase = 0;

  // Fill in the choice area with numbered items.
  this.fillChoiceTable(choice_table);

  // Make sure we are getting correct input area.
  input_area.focus();

/*  if (results.length <= limit) {
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
  }*/
  return results;
}

nsibidi.prototype.fillChoiceArea = function(choice_area_id) {
  const choiceArea = document.getElementById(choice_area_id);
  utils.clearText(choice_area_id, true);
  const maxToShow =
      Math.min(this.currentResults.length - this.currentBase, 10);
  let stringResults = [];
  stringResults.push('==' + this.currentBase + '==\u000a')
  for (let i = 0; i < maxToShow; i++) {
    const index = i + this.currentBase;
    stringResults.push(i);
    stringResults.push(': ' + this.currentResults[index][1] + '\u000a');
  }
  choiceArea.value = stringResults.join('');
  this.input_area.focus();
}

nsibidi.prototype.clearChoiceTable = function(choice_table) {
  while(choice_table.hasChildNodes()) {
     choice_table.removeChild(choice_table.firstChild);
  }
}

nsibidi.prototype.fillChoiceTable = function(choice_table) {
  this.clearChoiceTable(choice_table);
  let rowNum = 0;
  let header = choice_table.createTHead();
  let row = header.insertRow(0);
  row.insertCell(0).innerHTML = 'Start: ' + this.currentBase;
  rowNum += 1;
  const maxToShow =
      Math.min(this.currentResults.length - this.currentBase, 10);
  let stringResults = [];
  stringResults.push('==' + this.currentBase + '==\u000a');
  let index;
  for (let i = 0; i < maxToShow; i++) {
   index = i + this.currentBase;
   row = choice_table.insertRow(rowNum);
   row.insertCell(0).innerHTML = i;
   let cell = row.insertCell(1);
   cell.innerHTML = this.currentResults[index][1];
   cell.style.fontFamily = this.fontName;
   row.insertCell(2).innerHTML = this.currentResults[index][0];
   rowNum += 1;
  }
  if (index < this.currentResults.length) {
    row = header.insertRow(rowNum);
    row.insertCell(0).innerHTML = '...';
  }
  this.input_area.focus();
}


/* Look up English text for a single nsibidi character */
nsibidi.prototype.lookupNsi2English = function(nsi_char) {
  let size = utfArr.length;
  for (let i in utfArr) {
    if (utfArr[i][1] === nsi_char) {
        return utfArr[i][0];
    }
  }
  return '';
}

/* Look up text for a single nsibidi character */
nsibidi.prototype.lookupNsi2En = function(nsi_char, word_list) {
  let size = utfArr.word_list;
  for (let i in word_list) {
    if ((typeof word_list[i][1] == Array && word_list[i][1].has(nsi_char)) ||
        (word_list[i][1] === nsi_char )) {
          return word_list[i][0];
    }
  }
  return '';
}

/* Look up text for a single nsibidi character */
nsibidi.prototype.lookupNsi2Ig = function(nsi_char, word_list) {
  let size = utfArr.word_list;
  for (let i in word_list) {
    if ((typeof word_list[i] == Array && word_list[i].has(nsi_char)) ||
        (word_list[i] === nsi_char )) {
          return i;
    }
  }
  return '';
}
nsibidi.prototype.nsibidi2Words = function(nsi_source_id, output_area_id, input_lang_id) {
    /* Lookup each Nsibidi character and output English */
    /* Check if English area is hidden */
    let output_area = document.getElementById(output_area_id);
    let nsi_source = document.getElementById(nsi_source_id);

    const input_lang_selector = document.getElementById(input_lang_id);
    const input_lang = input_lang_selector.value;

    let word_list;
    let lookup_funct = this.lookupNsi2Ig;
    switch (input_lang) {
        case 'en':
          word_list = utfArr;
          lookup_funct = this.lookupNsi2En;
          break;
        default:
        case 'ig':
          word_list = latn2nsib;
          lookup_funct = this.lookupNsi2Ig;
        break;
    }

    let nsi_text = nsi_source.value;
    let eng_array = [];
    for (let c in nsi_text) {
      eng_array.push(lookup_funct(nsi_text[c], word_list));
    }
    output_area.value = eng_array.join(' ');
    // Turn on div about the textarea.
    output_area.parentElement.style.display = 'block';
}