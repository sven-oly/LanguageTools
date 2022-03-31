// Functions and data for wordsearch in Javascript

class wordListData {
    constructor (language, langTag) {
        this.language = language;
        this.langTag = langTag;
        this.fillList = null;
        this.diacritics = null;
        // The variables of the data.
        this.whole_grid = null;
        this.all_answers = null;
        this.all_words = null;
        this.gridFactor = -1; // Not set
	this.lastAttempt = -1
    }

    setGridFactor(newFactor) {
        this.gridFactor = newFactor;
    }

    // Code to request {{language}} data at index with optional filter.
    sendWords(wordData, resultArea, answerArea, useDfs) {
        // Save the object's pointer
        const wordSearchObj = this;

        // Prepare for the call to the backend
        let xmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }

        // Testing grapheme splits
        let wordTokenGroups = [];
        let words = wordData.split(/[ ,\u000a]/);
        for (let i = 0; i < words.length; i ++) {
            let group = gsplitter.splitGraphemes(words[i]);
            wordTokenGroups.push(group);
        }

        // Deal with the results
        xmlhttp.onreadystatechange=function() {
            if(xmlhttp.readyState==4) {
                // Handle results
                const returned_json = xmlhttp.responseText;
                const json_obj = JSON.parse(returned_json);
                if (json_obj.grid == null) {
                    alert("Cannot build a grid of size " + json_obj.grid_width);
                    return;
                }
                const outputArea = document.getElementById(resultArea);
                const answersArea = document.getElementById(answerArea);

                words = json_obj.answers;  // get the keys

                // Any messages for me?
                const message = json_obj.message;
                // Globals
                wordSearchObj.whole_grid = json_obj.grid;
                wordSearchObj.all_words = words;
                wordSearchObj.all_answers = json_obj.answers;
		wordSearchObj.lastAttempt = json_obj.attempts;

                createGameGrid(wordSearchObj.whole_grid,
                               wordSearchObj.all_words,
                               wordSearchObj.all_answers,
                               wordSearchObj
                              );
            }
        }

        let target;
        if (useDfs) {
            target = "/games/generatewordsearchDFS/";
        } else {
            // Prepare and send data.
            target = "/games/generatewordsearch/";
        }
        target += "?language=" + this.language;
        target += "&langTag=" + this.langTag;
        target += "&words=" + wordData;
        target += "&tokenGroups=" + wordTokenGroups;
        target += "&gridFactor" + this.gridFactor;
        target += '&diacritics=' + this.diacritics;
        target += '&fillList=' + this.fillList;
        target += "&size=" + document.getElementById("grid_size").value;
        target += "&max_tries=" + document.getElementById("max_tries").value;
        target += "&num_solutions=" + document.getElementById("num_solutions").value;

        xmlhttp.open("GET", target, true);  // GET?
        const size = target.length;
        xmlhttp.send(null);
    }
}

function createGameGrid(grid, words, answers, info) {
    // Create table.
    let table = document.getElementById('gridTable');
    clearTableRows('gridTable');

    const fontSelector = document.getElementById('selectFont');
    const fontFamily = fontSelector.value;
    grid_width = grid.length;

    // Insert New Row for table at index '0'.

    for (let row = 0; row < grid_width; row ++) {
        const row1 = table.insertRow(row);
        // Insert New Columns for Row1 at index '0'.
        for (let col = 0; col < grid_width; col ++) {
            const row1col1 = row1.insertCell(col);
            row1col1.style.fontFamily = fontFamily;
            if (Array.isArray(grid[row][col])) {
                row1col1.innerHTML = "\u00a0" + grid[row][col][0] + "\u00a0";
            } else {
                row1col1.innerHTML = "\u00a0" + grid[row][col] + "\u00a0";
            }
        }
    }

    // Add the words to find.
    const wordArea = document.getElementById('wordsToFind');
    let wordList = "";
    for (word in words) {
        wordList += " " + word + "\u00a0\u00a0\u00a0";
    }
    wordArea.innerHTML = wordList;

    // Prepare answers region
    clearChildNodes('answerList');
    const answerArea = document.getElementById('answerList');
    let font = document.getElementById("selectFont").value;

    for (let word in words) {
        const answer = answers[word];
        const positions = answer[0].concat();
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.style.fontFamily = font;

        const t = document.createTextNode(word);

        // Test smarter casing.
        var this_lower = word.toLocaleLowerCase(info.langTag);
        btn.append(t);
        btn.onclick = onAnswerClickEvent;

        li.appendChild(btn);
        var ans_text = document.createTextNode(
            " : (" + positions[0] + ') (' + answer[3] + ')');
        li.appendChild(ans_text);
        answerArea.appendChild(li);
    }
    showAnswerGrid('gridTable', grid, answers);
}


function showAnswerGrid(tableId, whole_grid, answers) {
    var colorTheGrid = false;
    if (colorTheGrid) {
        var table = document.getElementById(tableId);
        var rows = table.getElementsByTagName("tr")
        const grid = whole_grid;
        const grid_width = grid.length;

        for (var row = 0; row < grid_width; row ++) {
            // Insert New Columns for Row1 at index '0'.
            row1 = rows[row];

            for (var col = 0; col < grid_width; col ++) {
                var row1col1 = row1.cells[col];
                row1col1.bgColor = "gray"
            }
        }

        // Set all the background to gray.
        // Then highlight each answer, with color on the first letter.
        for (let answer in answers) {
            // Get each cell and highlight.
            const cells = answers[answer][0];
            for (let i = 0; i < cells.length; i++) {
                row1 = rows[cells[i][0]];
                if (cells[i][1].isArray()) {
                    rowcol = row1.cells[cells[i][1][0]];
                } else {
                    rowcol = row1.cells[cells[i][1]];
                }
                rowcol.bgColor = "white";
                if (i == 0) {
                    rowcol.bgColor = "yellow";
                }

            }
        }
    }
    drawLines(whole_grid, answers);
}


function drawLines(grid, answers) {
    const grid_size = grid.length;

    const canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    let font = document.getElementById("selectFont").value;
    ctx.font = "30px " + font;
    const xfactor = 50; xoff = 15; xlineoff = 25;
    const yfactor = 50; yoff = 35; ylineoff = 25;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    // Draw the outline:
    ctx.strokeStyle="#FF0000";
    ctx.moveTo(0, 0);
    ctx.lineTo(xfactor * grid_size, 0);
    ctx.lineTo(xfactor * grid_size, yfactor * grid_size);
    ctx.lineTo(0, yfactor * grid_size);
    ctx.lineTo(0, 0);

    ctx.strokeStyle= "#DCDCDC";
    for (let i = 1; i < grid_size; i ++) {
        ctx.moveTo(i * xfactor, 0);
        ctx.lineTo(i * xfactor, yfactor * grid_size);
    }
    for (let i = 1; i < grid_size; i ++) {
        ctx.moveTo(0, i * yfactor);
        ctx.lineTo(xfactor * grid_size, i * yfactor);
    }
    ctx.strokeStyle="#000000";

    for (let answer in answers) {
        let thisAnswer = answers[answer];
        // Get each cell and highlight.
        const cells = thisAnswer[0];
        const word = thisAnswer[2];
        const last = cells.length - 1;
        const y = cells[0][0] * yfactor;
        const x = cells[0][1] * xfactor;
        // The endpoints of the line for this word
        ctx.moveTo(cells[last][1] * xfactor + xlineoff,
                   cells[last][0] * yfactor + ylineoff);
        ctx.lineTo(x + xlineoff, y + ylineoff);
        ctx.stroke();

        for (let i = 0; i < cells.length; i++) {
            const row = cells[i][0];
            const col = cells[i][1];
            let text;
            if (Array.isArray(grid[row][col])) {
                text = grid[row][col][0];
            } else {
                text = grid[row][col];
            }
            const y = cells[i][0] * yfactor;
            const x = cells[i][1] * xfactor;
            ctx.fillText(text, x + xoff, y+yoff);
        }
    }
}

// Showing answers
function highlightAnswer(word, answer) {
    // Clear the highlighting of 'gridTable';
    const table = document.getElementById('gridTable');
    const rows = table.getElementsByTagName("tr")

    clearGridHighlighting(table);

    const this_answer = wordListInfo.all_answers[word][0];
    // For each position in the answer, highlight the cell with a color.
    const count = this_answer.length;
    for (let i = 0; i < count; i++) {
        pos = answer[i];
        var x = pos[0];
        var y = pos[1];
        var row = rows[x];
        var col = row.cells[y];
        col.style.backgroundColor = "yellow";
    }
}

function clearGridHighlighting(table) {
    const rows = table.getElementsByTagName("tr");
    for (let rownum  = 0; rownum < rows.length; rownum ++) {
        const row = rows[rownum];
        for (let col = 0; col < row.cells.length; col++) {
            const column = row.cells[col];
            if (column) {
                column.style.backgroundColor = "white";
            }
        }
    }

}
