// Source: https://codepen.io/andyydna/details/VwYRVQE

// Use Intl.DateTimeFormat() to get the number of the day, month, etc
// const en = new Intl.DateTimeFormat('en-US', {calendar: 'chinese', day:'numeric'});
// const en = new Intl.DateTimeFormat('en-US', {calendar: cal, day:'numeric'});
// const enMonth = new Intl.DateTimeFormat('en-US', {calendar: cal, month:'numeric'});
// const enYear = new Intl.DateTimeFormat('en-US', {calendar: cal, year:'numeric'});

// console.log(en.format(t));
// console.log(enMonth.format(t));
// console.log(enYear.format(t));

const calendarOptions = ["buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "gregory", "hebrew", "indian", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "iso8601", "japanese", "persian", "roc"];
    
function generate_calendar_types(start, end) {
    let calendars = "";
    for (let cal = 0; cal <= calendarOptions.length; cal++) {
        calendars += "<option value='" + calendarOptions[cal] + "'>" +
            calendarOptions[cal]+ "</option>";
    }
    return calendars;
}

function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        let yearText = numeralInfo.formatInt(year);
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;
document.getElementById("calendarType").innerHTML = generate_calendar_types();

const calendar = document.getElementById("calendar");
const lang = calendar.getAttribute('data-lang');

let months = "";
let days = "";

let monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
    if (monthNames.length == 12) {
        months = monthNames;
    } else {
        months = monthDefault;
    }
    if (weekdays.length == 7) {
        days = weekdays;
    } else {
        days = dayDefault;
    }
}


var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
yearHeader = document.getElementById("yearHeader");

// console.log(en.format(t));
// console.log(enMonth.format(t));
// console.log(enYear.format(t));

showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    
    tbl.innerHTML = "";

    
    let yearString = numeralInfo.formatInt(year);
    monthAndYear.innerHTML = months[month] + " " + yearString;
    //yearHeader.innerHTML = yearString;
    monthAndYear.style.fontFamily = defaultFont;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        let row = document.createElement("tr");

        
        for (let j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                cell.style.fontFamily = defaultFont;    
                row.appendChild(cell);

            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                // Formatted for the language
                const dateString = numeralInfo.formatInt(date);
                cell = document.createElement("td");
                // Compute the string for the current date.
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";

                // Set the font for the cell.
                cell.style.fontFamily = defaultFont;    
                cell.innerHTML = "<span>" + dateString + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
