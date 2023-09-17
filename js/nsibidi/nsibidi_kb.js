/* File: nsibidi_kb.js Processes nsibidi keyboard input Started
 * 14-May-2021, cwc Updated 11-June-2023 using dictionary output.json
 * data
 */

/* Works with data in file English2utf.js */
/* Raw list is in variable utfArr */

/* Namespace */
let nsibidi = function() {
    this.version = '2023-06-18 v1';
    this.new_list = [];
    let tree = new Map();
    let igTree = new Map();
    this.currentResults = null;
    this.currentBase = 0;
    this.fontName = "Akagu2020";
    //this.wordSeparator = '\u200b';  // ZWSP
    this.wordSeparator = ' ';  // ASCII space
    this.partialMatchValue = null;
    // To use data from output_json June 2023.
    this.dictionary = null;
    this.dictionary_firsts = null;
    this.use_dictionary = false;  //false;
}

nsibidi.prototype.getVersion = function() {
    return this.version;
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

/* Point to JSON dictionary of symbol with pro, form, and defs for each */
nsibidi.prototype.setDictionary = function(new_dict, dict_firsts) {
    this.dictionary = new_dict;
    if (dict_firsts) {
        this.dictionary_firsts = dict_firsts;
    }
}

nsibidi.prototype.useDictionary = function(new_value) {
    this.use_dictionary = new_value;  // A boolean
}


/* Get the array of dictionary contents for a symbol */
nsibidi.prototype.lookupSym = function(sym) {
    if (sym in this.dictionary) {
        // Put it in the output region.
        return this.dictionary[sym];
    } else {
        return null;
    }
}

/* Igbo Latin to Nsib struture */
nsibidi.prototype.ig2nsi = function(data_in) {
    // Create an index based on the first letter of each key in this input.
    this.igTree = new Map();
    for (const property in data_in) {
        let x = data_in[property];
        if (property.substring(0,1) == 'ò') {
            // Catch this case for checking NFD
            let z = 10;
        }
        let nfd_property = property.normalize("NFD").toLowerCase();
        let first = nfd_property.substring(0,1);
        let item = [nfd_property, x];
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

let nsi = new nsibidi();

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
    const test_input = input.toLowerCase();
    // This should be selectable from the UI
    let data = this.use_dictionary ? this.dictionary_firsts : this.igTree;
    return this.lookupMatches(test_input, data);
}

// Search values not starting from the first.
nsibidi.prototype.partialMatchLookup = function (input, data) {
    const x = 1;
    let results = [];

    const keys = data.keys();
    while (keys.next()) {
        for (let word in keys.value) {
            if (word.search(input) >= 0) {
                results.push(word);
            }
        }
    }
    //data.forEach((value, key) => { results.push(value)});
    // const wordList;
    // Check each of the words with search()
    // word.search(input)
    // if search >= 0, found it
    //results.push(word);
    return results;
}


// Given a tree of data and an input, return the matches
nsibidi.prototype.lookupMatches = function(input, data) {
    if (!data || !input) return null;
    let result;

    // TODO: use partialMatchValue to determine how to match
    if (this.partialMatchValue) {
        result = this.partialMatchLookup(input,data);
    }
    // Match from first character.
    let first = input.substring(0,1);  // First character for lookup
    let match_element = data.get(first);
    if (match_element) {
    //if (first in data) {
        const sublist = match_element;  //
        const insize = input.length;
        // Look for how many with this string.
        result = [];
        for (item of sublist) {
            let isObject = (data.constructor == Object);
            let test;
            if (isObject) {
                test = item['pro'];
            } else {
                test = item[0];
            }
            if (test.substring(0,insize) === input) {
                if (isObject){
                    // Done?? 
                    result.push([item['pro'], item['sym'], ' ', item['defs'] ]);
                } else {
                    if (Array.isArray(item[1])) {
                        // TODO: unpack multiple items??
                        // Or handle at display time?
                        for (let second in item[1]) {
                            result.push([item[0], item[1][second] ]);
                        }
                    } else {
                        // Just one, so add this combo the output.
                        result.push([item[0], item[1]]);
                    }
                }
            }
        }
    }
    return result;  // List of possible matches
}

nsibidi.prototype.nsiSelectItem = function(output_area, raw_input, result, input_area, info_area) {
    // Insert the Nsibii character when you select it.
    if (result) {
        output_area.value = output_area.value + result[1] + this.wordSeparator;
    } else {
        output_area.value = output_area.value + raw_input + this.wordSeparator;
    }
    input_area.innerHTML = info_area.innerHTML = "";
    input_area.focus();
}

nsibidi.prototype.nsiSelectIndexedItem = function(output_area, relativeItemNum, input_area, info_area) {
    // Insert the Nsibii character when you select it.
    const item = this.currentResults[relativeItemNum + this.currentBase];
    if (item) {
        output_area.value = output_area.value + item[1] + this.wordSeparator;
    }
    info_area.innerHTML = input_area.value = "";
    input_area.focus();
    this.currentResults = null;
    this.currentBase = 0;
}

nsibidi.prototype.handleMatching = function(
    input_id, input_lang_id, output_id, info_id, choice_table_id, partial_match_id) {
    const e = window.event;
    const key = e.key;

    const limit = 10;
    this.pageSize = limit;
    const input_area = document.getElementById(input_id);
    this.input_area = input_area;
    const output_area = document.getElementById(output_id);
    const choice_table = document.getElementById(choice_table_id);
    const info_area = document.getElementById(info_id);
    // Get the current toggle setting.
    this.partialMatchValue = document.getElementById(partial_match_id).checked;

    if (!input_area) return null;

    const input_lang_selector = document.getElementById(input_lang_id);
    const input_lang = input_lang_selector.value;
    // Decomposed for matchin
    const input_nfd_value =
          input_area.value.normalize("NFD").toLowerCase();        

    
    // Insert some characters directly including punctuation, space, return.
    if (key !== "'" && key >= " " && key < "0" ) {
        this.nsiSelectItem(output_area, input_nfd_value, null, input_area, info_area);
    }
    if (key >= "0" && key <= "9" ) {
        if (this.currentResults) {
            const itemNum = parseInt(key);
            this.nsiSelectIndexedItem(output_area, itemNum, input_area, info_area);
            this.clearChoiceTable(choice_table)
        }
    }
    if (key === "PageDown") {
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

    if (key == " ") {
        // Add a space to the output.
    }

    let results = null;
    switch (input_lang) {
    case 'en':
        results = nsi.lookupEng(input_nfd_value);
        break;
    case 'ig':
        results = nsi.lookupIgbo(input_nfd_value);
        break;
    }
    if (!results) {
        return null;
    }

    // Maybe move these up?
    // Check for return or tab. Accept what's typed.
    if (key === 'Enter' || key == "Tab") {
        this.nsiSelectItem(output_area, input_nfd_value, results[0], input_area, info_area);
        this.clearChoiceTable(choice_table)
        return results;
    }

    /* Show number of results found total */
    if (info_area) {
        info_area.innerHTML = info_area.value = results.length + " matches";
    }

    /* If the number of results is small enough, show and allow selection */
    this.currentResults = results;
    this.currentBase = 0;

    // Fill in the choice area with numbered items.
    this.fillChoiceTable(choice_table);

    // Make sure we are getting correct input area.
    input_area.focus();
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
    row.insertCell(0).innerHTML = this.currentBase + '...';
    rowNum += 1;
    const maxToShow =
          Math.min(this.currentResults.length - this.currentBase, 10);
    let stringResults = [];
    stringResults.push('==' + this.currentBase + '==\u000a');
    let index;
    for (let i = 0; i < maxToShow; i++) {
        index = i + this.currentBase;
        let result = this.currentResults[index];
        let result_size = result.length;
        row = choice_table.insertRow(rowNum);
        row.insertCell(0).innerHTML = i;
        let cell = row.insertCell(1);
        cell.innerHTML = result[1];
        cell.style.fontFamily = this.fontName;
        row.insertCell(2).innerHTML = result[0];
        // If more data, add columns to the table.
        if (result_size > 2) {
            for (let col = 2; col < result_size; col++) {
                cell = row.insertCell(col + 1);
                cell.innerHTML = result[col];
                if (col == 2) {
                    cell.style.fontFamily = this.fontName;
                }
            }
        }
        rowNum += 1;
    }
    if (index < this.currentResults.length - 1) {
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
nsibidi.prototype.lookupNsi2En = function(en_word, word_list) {
    for (let i in word_list) {
        if ((typeof word_list[i][1] == Array && word_list[i][1] === en_word) ||
            (word_list[i][1] === en_word)) {
            return word_list[i][0];
        }
    }
    return '';
}

/* Look up text for a single nsibidi character */
nsibidi.prototype.lookupNsi2Ig = function(nsi_word, word_list) {
    for (let i in word_list) {
        if ((word_list[i] === nsi_word) ||
            (typeof word_list[i] === 'object' && word_list[i].includes(nsi_word))) {
            return i;
        }
    }
    return '';
}
nsibidi.prototype.nsibidi2Words = function(nsi_source_id, output_area_id, input_lang_id) {
    /* Lookup each Nsibidi character and output Latin words */
    /* Check if Latin output area is hidden */
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
    const words = nsi_text.split(/[\s\u200b]/);  // Use ZWSP and other white space
    for (let i in words) {
        eng_array.push(lookup_funct(words[i], word_list));
    }
    output_area.value = eng_array.join(' ');
    // Turn on div about the textarea.
    output_area.parentElement.style.display = 'block';
}
