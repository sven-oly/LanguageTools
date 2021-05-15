/* File: nsibibi_kb.js
 * Processes Nsibibi keyboard input
 * Started 14-May-2021, cwc
 */

/* Works with data in file English2utf.js */
/* Raw list is in variable utfArr */

/* Namespace */
let Nsibibi = function() {
    let new_list;
    let tree = new Map();
}

Nsibibi.prototype.sortFirst = function(a,b) {
  if (a[0] < b[0]) {
    return -1;
  } else if (a[0] > b[0]) {
    return 1;
  } else {
    return 0;
  }
}

/* Create better data structures for handling input */
Nsibibi.prototype.sortInput = function(list_in) {
  /* First, sort by the first field */
  this.new_list = list_in.sort(this.sortFirst)
}

Nsibibi.prototype.createTree = function(list_in) {
    // Start by making a map based on first character
    this.tree = new Map();
    for (i in list_in) {
      let eng = list_in[i][0];
      let nsibibi = list_in[i][1];
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


var nsi = new Nsibibi();

nsi.sortInput(utfArr);
nsi.createTree(nsi.new_list);