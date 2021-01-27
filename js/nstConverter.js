// Convert from Latin form of Tangsa to Lakhum Unicode forms:

// Mappings for  Tangsa Lakhum
var map_encoding_names = [
  'Gam Win',
];

var private_use_map_combined = {
  // Gam Win --> Lakhum personal area code
  'mnvungz': ['\ud81a\ude9c\ud81a\udeac\ud81a\ude7a\ud81a\ude84\ud81a\ude90'],
  'mznvungz': ['\ud81a\ude9c\ud81a\udeac\ud81a\ude7a\ud81a\ude84\ud81a\ude90'],
  'mnaungz': ['\ud81a\ude9c\ud81a\udeac\ud81a\ude74\ud81a\ude84\ud81a\ude90'],
  'vungz': ['\ud81a\ude7a\ud81a\ude84\ud81a\ude90'],
  'vungc': ['\ud81a\ude79\ud81a\ude85\ud81a\ude90'],
  'vungx': ['\ud81a\ude7b\ud81a\ude87\ud81a\ude90'],
  'vuk': ['\ud81a\ude7a\ud81a\ude86\ud81a\udea0'],
  'ovyz': ['\ud81a\ude70\ud81a\ude80'],
  'ovyc': ['\ud81a\ude71\ud81a\ude81'],
  'ovyx': ['\ud81a\ude73\ud81a\ude83'],
  'ovmz': ['\ud81a\ude70\ud81a\udeab'],
  'ovmc': ['\ud81a\ude71\ud81a\udeab'],
  'ovmx': ['\ud81a\ude73\ud81a\udeab'],
  'oamz': ['\ud81a\ude70\ud81a\udeab'],
  'oamc': ['\ud81a\ude71\ud81a\udeab'],
  'oamx': ['\ud81a\ude73\ud81a\udeab'],
  'omz': ['\ud81a\ude70\ud81a\udeab'],
  'omc': ['\ud81a\ude71\ud81a\udeab'],
  'omx': ['\ud81a\ude73\ud81a\udeab'],
  'ovnz': ['\ud81a\ude70\ud81a\udeac'],
  'ovnc': ['\ud81a\ude71\ud81a\udeac'],
  'ovnx': ['\ud81a\ude73\ud81a\udeac'],
  'ovlz': ['\ud81a\ude70\ud81a\udeae'],
  'ovlc': ['\ud81a\ude71\ud81a\udeae'],
  'ovlx': ['\ud81a\ude73\ud81a\udeae'],
  'ovrz': ['\ud81a\ude70\ud81a\udeb2'],
  'ovrc': ['\ud81a\ude71\ud81a\udeb2'],
  'ovrx': ['\ud81a\ude73\ud81a\udeb2'],
  'ovp': ['\ud81a\ude70\ud81a\udea7'],
  'ovt': ['\ud81a\ude70\ud81a\udeb0'],
  'mnaungz': ['\ud81a\ude9c\ud81a\udeac\ud81a\ude74\ud81a\ude84\ud81a\ude90'],
  'mznaungz': ['\ud81a\ude9c\ud81a\udeac\ud81a\ude74\ud81a\ude84\ud81a\ude90'],
  'mrvkueq': ['\ud81a\ude9c\ud81a\udeb2\ud81a\ude7a\ud81a\udea0\ud81a\ude96'],
  'aungz': ['\ud81a\ude74\ud81a\ude84\ud81a\ude90'],
  'aungc': ['\ud81a\ude75\ud81a\ude85\ud81a\ude90'],
  'aungx': ['\ud81a\ude77\ud81a\ude87\ud81a\ude90'],
  'auk': ['\ud81a\ude74\ud81a\ude86\ud81a\udea0'],
  'uiyq': ['\ud81a\ude8c\ud81a\ude82'],
  'vyq': ['\ud81a\ude7a\ud81a\ude82'],
  'oq': ['\ud81a\ude72'],
  'aq': ['\ud81a\ude76'],
  'vq': ['\ud81a\ude7a'],
  'eq': ['\ud81a\ude7e'],
  'iq': ['\ud81a\ude82'],
  'uq': ['\ud81a\ude86'],
  'awq': ['\ud81a\ude8a'],
  'uiq': ['\ud81a\ude8e'],
  'ueq': ['\ud81a\ude96'],
  'uiuq': ['\ud81a\ude9a'],
  'oayz': ['\ud81a\ude70\ud81a\ude80'],
  'oayc': ['\ud81a\ude71\ud81a\ude81'],
  'oayx': ['\ud81a\ude73\ud81a\ude83'],
  'ayz': ['\ud81a\ude74\ud81a\ude80'],
  'ayc': ['\ud81a\ude75\ud81a\ude81'],
  'ayx': ['\ud81a\ude77\ud81a\ude83'],
  'vyz': ['\ud81a\ude7a\ud81a\ude80'],
  'vyc': ['\ud81a\ude79\ud81a\ude81'],
  'vyx': ['\ud81a\ude7b\ud81a\ude83'],
  'uyz': ['\ud81a\ude84\ud81a\ude80'],
  'uyc': ['\ud81a\ude85\ud81a\ude81'],
  'uyx': ['\ud81a\ude87\ud81a\ude83'],
  'uiyz': ['\ud81a\ude8c\ud81a\ude80'],
  'uiyc': ['\ud81a\ude8d\ud81a\ude81'],
  'uiyx': ['\ud81a\ude8f\ud81a\ude83'],
  'ueyz': ['\ud81a\ude95\ud81a\ude80'],
  'ueyc': ['\ud81a\ude94\ud81a\ude81'],
  'ueyx': ['\ud81a\ude97\ud81a\ude83'],
  'ongz': ['\ud81a\ude70\ud81a\ude90'],
  'ongc': ['\ud81a\ude71\ud81a\ude90'],
  'ongx': ['\ud81a\ude73\ud81a\ude90'],
  'angz': ['\ud81a\ude74\ud81a\ude90'],
  'angc': ['\ud81a\ude75\ud81a\ude90'],
  'angx': ['\ud81a\ude77\ud81a\ude90'],
  'vngz': ['\ud81a\ude7a\ud81a\ude90'],
  'vngc': ['\ud81a\ude79\ud81a\ude90'],
  'vngx': ['\ud81a\ude7b\ud81a\ude90'],
  'engz': ['\ud81a\ude7c\ud81a\ude90'],
  'engc': ['\ud81a\ude7d\ud81a\ude90'],
  'engx': ['\ud81a\ude7f\ud81a\ude90'],
  'ingz': ['\ud81a\ude80\ud81a\ude90'],
  'ingc': ['\ud81a\ude81\ud81a\ude90'],
  'ingx': ['\ud81a\ude83\ud81a\ude90'],
  'ungz': ['\ud81a\ude84\ud81a\ude90'],
  'ungc': ['\ud81a\ude85\ud81a\ude90'],
  'ungx': ['\ud81a\ude87\ud81a\ude90'],
  'awngz': ['\ud81a\ude88\ud81a\ude90'],
  'awngc': ['\ud81a\ude89\ud81a\ude90'],
  'awngx': ['\ud81a\ude8b\ud81a\ude90'],
  'uingz': ['\ud81a\ude8c\ud81a\ude90'],
  'uingc': ['\ud81a\ude8d\ud81a\ude90'],
  'uingx': ['\ud81a\ude8f\ud81a\ude90'],
  'uengz': ['\ud81a\ude95\ud81a\ude90'],
  'uengc': ['\ud81a\ude94\ud81a\ude90'],
  'uengx': ['\ud81a\ude97\ud81a\ude90'],
  'uiungz': ['\ud81a\ude98\ud81a\ude90'],
  'uiungc': ['\ud81a\ude99\ud81a\ude90'],
  'uiungx': ['\ud81a\ude9b\ud81a\ude90'],
  'amz': ['\ud81a\ude74\ud81a\udeab'],
  'amc': ['\ud81a\ude75\ud81a\udeab'],
  'amx': ['\ud81a\ude77\ud81a\udeab'],
  'vmz': ['\ud81a\ude7a\ud81a\udeab'],
  'vmc': ['\ud81a\ude79\ud81a\udeab'],
  'vmx': ['\ud81a\ude7b\ud81a\udeab'],
  'emz': ['\ud81a\ude7c\ud81a\udeab'],
  'emc': ['\ud81a\ude7d\ud81a\udeab'],
  'emx': ['\ud81a\ude7f\ud81a\udeab'],
  'imz': ['\ud81a\ude80\ud81a\udeab'],
  'imc': ['\ud81a\ude81\ud81a\udeab'],
  'imx': ['\ud81a\ude83\ud81a\udeab'],
  'umz': ['\ud81a\ude84\ud81a\udeab'],
  'umc': ['\ud81a\ude85\ud81a\udeab'],
  'umx': ['\ud81a\ude87\ud81a\udeab'],
  'awmz': ['\ud81a\ude88\ud81a\udeab'],
  'awmc': ['\ud81a\ude89\ud81a\udeab'],
  'awmx': ['\ud81a\ude8b\ud81a\udeab'],
  'uimz': ['\ud81a\ude8c\ud81a\udeab'],
  'uimc': ['\ud81a\ude8d\ud81a\udeab'],
  'uimx': ['\ud81a\ude8f\ud81a\udeab'],
  'uemz': ['\ud81a\ude95\ud81a\udeab'],
  'uemc': ['\ud81a\ude94\ud81a\udeab'],
  'uemx': ['\ud81a\ude97\ud81a\udeab'],
  'uiumz': ['\ud81a\ude98\ud81a\udeab'],
  'uiumc': ['\ud81a\ude99\ud81a\udeab'],
  'uiumx': ['\ud81a\ude9b\ud81a\udeab'],
  'oanz': ['\ud81a\ude70\ud81a\udeac'],
  'oanc': ['\ud81a\ude71\ud81a\udeac'],
  'oanx': ['\ud81a\ude73\ud81a\udeac'],
  'anz': ['\ud81a\ude74\ud81a\udeac'],
  'anc': ['\ud81a\ude75\ud81a\udeac'],
  'anx': ['\ud81a\ude77\ud81a\udeac'],
  'vnz': ['\ud81a\ude7a\ud81a\udeac'],
  'vnc': ['\ud81a\ude79\ud81a\udeac'],
  'vnx': ['\ud81a\ude7b\ud81a\udeac'],
  'enz': ['\ud81a\ude7c\ud81a\udeac'],
  'enc': ['\ud81a\ude7d\ud81a\udeac'],
  'enx': ['\ud81a\ude7f\ud81a\udeac'],
  'inz': ['\ud81a\ude80\ud81a\udeac'],
  'inc': ['\ud81a\ude81\ud81a\udeac'],
  'inx': ['\ud81a\ude83\ud81a\udeac'],
  'unz': ['\ud81a\ude84\ud81a\udeac'],
  'unc': ['\ud81a\ude85\ud81a\udeac'],
  'unx': ['\ud81a\ude87\ud81a\udeac'],
  'awnz': ['\ud81a\ude88\ud81a\udeac'],
  'awnc': ['\ud81a\ude89\ud81a\udeac'],
  'awnx': ['\ud81a\ude8b\ud81a\udeac'],
  'uinz': ['\ud81a\ude8c\ud81a\udeac'],
  'uinc': ['\ud81a\ude8d\ud81a\udeac'],
  'uinx': ['\ud81a\ude8f\ud81a\udeac'],
  'uenz': ['\ud81a\ude95\ud81a\udeac'],
  'uenc': ['\ud81a\ude94\ud81a\udeac'],
  'uenx': ['\ud81a\ude97\ud81a\udeac'],
  'uiunz': ['\ud81a\ude98\ud81a\udeac'],
  'uiunc': ['\ud81a\ude99\ud81a\udeac'],
  'uiunx': ['\ud81a\ude9b\ud81a\udeac'],
  'oalz': ['\ud81a\ude70\ud81a\udeae'],
  'oalc': ['\ud81a\ude71\ud81a\udeae'],
  'oalx': ['\ud81a\ude73\ud81a\udeae'],
  'alz': ['\ud81a\ude74\ud81a\udeae'],
  'alc': ['\ud81a\ude75\ud81a\udeae'],
  'alx': ['\ud81a\ude77\ud81a\udeae'],
  'vlz': ['\ud81a\ude7a\ud81a\udeae'],
  'vlc': ['\ud81a\ude79\ud81a\udeae'],
  'vlx': ['\ud81a\ude7b\ud81a\udeae'],
  'elz': ['\ud81a\ude7c\ud81a\udeae'],
  'elc': ['\ud81a\ude7d\ud81a\udeae'],
  'elx': ['\ud81a\ude7f\ud81a\udeae'],
  'ilz': ['\ud81a\ude80\ud81a\udeae'],
  'ilc': ['\ud81a\ude81\ud81a\udeae'],
  'ilx': ['\ud81a\ude83\ud81a\udeae'],
  'ulz': ['\ud81a\ude84\ud81a\udeae'],
  'ulc': ['\ud81a\ude85\ud81a\udeae'],
  'ulx': ['\ud81a\ude87\ud81a\udeae'],
  'awlz': ['\ud81a\ude88\ud81a\udeae'],
  'awlc': ['\ud81a\ude89\ud81a\udeae'],
  'awlx': ['\ud81a\ude8b\ud81a\udeae'],
  'uilz': ['\ud81a\ude8c\ud81a\udeae'],
  'uilc': ['\ud81a\ude8d\ud81a\udeae'],
  'uilx': ['\ud81a\ude8f\ud81a\udeae'],
  'uelz': ['\ud81a\ude95\ud81a\udeae'],
  'uelc': ['\ud81a\ude94\ud81a\udeae'],
  'uelx': ['\ud81a\ude97\ud81a\udeae'],
  'uiulz': ['\ud81a\ude98\ud81a\udeae'],
  'uiulc': ['\ud81a\ude99\ud81a\udeae'],
  'uiulx': ['\ud81a\ude9b\ud81a\udeae'],
  'oarz': ['\ud81a\ude70\ud81a\udeb2'],
  'oarc': ['\ud81a\ude71\ud81a\udeb2'],
  'oarx': ['\ud81a\ude73\ud81a\udeb2'],
  'arz': ['\ud81a\ude74\ud81a\udeb2'],
  'arc': ['\ud81a\ude75\ud81a\udeb2'],
  'arx': ['\ud81a\ude77\ud81a\udeb2'],
  'vrz': ['\ud81a\ude7a\ud81a\udeb2'],
  'vrc': ['\ud81a\ude79\ud81a\udeb2'],
  'vrx': ['\ud81a\ude7b\ud81a\udeb2'],
  'erz': ['\ud81a\ude7c\ud81a\udeb2'],
  'erc': ['\ud81a\ude7d\ud81a\udeb2'],
  'erx': ['\ud81a\ude7f\ud81a\udeb2'],
  'irz': ['\ud81a\ude80\ud81a\udeb2'],
  'irc': ['\ud81a\ude81\ud81a\udeb2'],
  'irx': ['\ud81a\ude83\ud81a\udeb2'],
  'urz': ['\ud81a\ude84\ud81a\udeb2'],
  'urc': ['\ud81a\ude85\ud81a\udeb2'],
  'urx': ['\ud81a\ude87\ud81a\udeb2'],
  'awrz': ['\ud81a\ude88\ud81a\udeb2'],
  'awrc': ['\ud81a\ude89\ud81a\udeb2'],
  'awrx': ['\ud81a\ude8b\ud81a\udeb2'],
  'uirz': ['\ud81a\ude8c\ud81a\udeb2'],
  'uirc': ['\ud81a\ude8d\ud81a\udeb2'],
  'uirx': ['\ud81a\ude8f\ud81a\udeb2'],
  'uerz': ['\ud81a\ude95\ud81a\udeb2'],
  'uerc': ['\ud81a\ude94\ud81a\udeb2'],
  'uerx': ['\ud81a\ude97\ud81a\udeb2'],
  'uiurz': ['\ud81a\ude98\ud81a\udeb2'],
  'uiurc': ['\ud81a\ude99\ud81a\udeb2'],
  'uiurx': ['\ud81a\ude9b\ud81a\udeb2'],
  'ok': ['\ud81a\ude70\ud81a\udea0'],
  'ak': ['\ud81a\ude74\ud81a\udea0'],
  'vk': ['\ud81a\ude7a\ud81a\udea0'],
  'ek': ['\ud81a\ude7c\ud81a\udea0'],
  'ik': ['\ud81a\ude80\ud81a\udea0'],
  'uk': ['\ud81a\ude84\ud81a\ude98'],
  'awk': ['\ud81a\ude88\ud81a\udea0'],
  'uik': ['\ud81a\ude8c\ud81a\udea0'],  // Changed from 17, 23
  'uek': ['\ud81a\ude95\ud81a\udea0'],
  'uiuk': ['\ud81a\ude98\ud81a\udea0'],
  'oap': ['\ud81a\ude70\ud81a\udea7'],
  'op': ['\ud81a\ude70\ud81a\udea7'],
  'ap': ['\ud81a\ude74\ud81a\udea7'],
  'vp': ['\ud81a\ude7a\ud81a\udea7'],
  'ep': ['\ud81a\ude7c\ud81a\udea7'],
  'ip': ['\ud81a\ude80\ud81a\udea7'],
  'up': ['\ud81a\ude84\ud81a\udea7'],
  'awp': ['\ud81a\ude88\ud81a\udea7'],
  'uip': ['\ud81a\ude8c\ud81a\udea7'],
  'uep': ['\ud81a\ude95\ud81a\udea7'],
  'uiup': ['\ud81a\udea7\ud81a\udea7'],
  'oat': ['\ud81a\ude70\ud81a\udeb0'],
  'at': ['\ud81a\ude74\ud81a\udeb0'],
  'vt': ['\ud81a\ude7a\ud81a\udeb0'],
  'et': ['\ud81a\ude7c\ud81a\udeb0'],
  'it': ['\ud81a\ude80\ud81a\udeb0'],
  'ut': ['\ud81a\ude84\ud81a\udeb0'],
  'awt': ['\ud81a\ude88\ud81a\udeb0'],
  'uit': ['\ud81a\ude8c\ud81a\udeb0'],
  'uet': ['\ud81a\ude95\ud81a\udeb0'],
  'uiut': ['\ud81a\udeb0\ud81a\udeb0'],
  'oz': ['\ud81a\ude70'],
  'oc': ['\ud81a\ude71'],
  'ox': ['\ud81a\ude73'],
  'az': ['\ud81a\ude74'],
  'ac': ['\ud81a\ude75'],
  'ax': ['\ud81a\ude77'],
  'vz': ['\ud81a\ude7a'],
  'vc': ['\ud81a\ude79'],
  'vx': ['\ud81a\ude7b'],
  'ez': ['\ud81a\ude7c'],
  'ec': ['\ud81a\ude7d'],
  'ex': ['\ud81a\ude7f'],
  'iz': ['\ud81a\ude80'],
  'ic': ['\ud81a\ude81'],
  'ix': ['\ud81a\ude83'],
  'uz': ['\ud81a\ude84'],
  'uc': ['\ud81a\ude85'],
  'ux': ['\ud81a\ude87'],
  'awz': ['\ud81a\ude88'],
  'awc': ['\ud81a\ude89'],
  'awx': ['\ud81a\ude8b'],
  'uiz': ['\ud81a\ude8c'],
  'uic': ['\ud81a\ude8d'],
  'uix': ['\ud81a\ude8f'],
  'uez': ['\ud81a\ude95'],
  'uec': ['\ud81a\ude94'],
  'uex': ['\ud81a\ude97'],
  'uiuz': ['\ud81a\ude98'],
  'uiuc': ['\ud81a\ude99'],
  'uiux': ['\ud81a\ude9b'],
  'htt': ['\ud81a\udeb8'],
  'th': ['\ud81a\udeb9'],
  'ht': ['\ud81a\udeaf'],
  'ch': ['\ud81a\udebd'],
  'kh': ['\ud81a\udea1'],
  'ng': ['\ud81a\udea3'],
  'ny': ['\ud81a\udea8'],
  'ph': ['\ud81a\udea9'],
  'nh': ['\ud81a\udeb3'],
  'sh': ['\ud81a\udeb4'],
  'ts': ['\ud81a\udeb6'],
  'gh': ['\ud81a\udeb7'],
  'f': ['\ud81a\udebb'],
  'k': ['\ud81a\udea0'],
  'g': ['\ud81a\udea2'],
  's': ['\ud81a\udea4'],
  'y': ['\ud81a\udea5'],
  'w': ['\ud81a\udea6'],
  'p': ['\ud81a\udea7'],
  'b': ['\ud81a\udeaa'],
  'm': ['\ud81a\udeab'],
  'n': ['\ud81a\udeac'],
  'h': ['\ud81a\udead'],
  'l': ['\ud81a\udeae'],
  't': ['\ud81a\udeb0'],
  'd': ['\ud81a\udeb1'],
  'r': ['\ud81a\udeb2'],
  'j': ['\ud81a\udea5'],
  'v': ['\ud81a\ude7a'],
  '\u000a': ['\u000a'],
};


var gamwin_latin_chars =
    "mnvungz|mznvungz|vungz|vungc|vungx|vuk|ovyz|ovyc|ovyx|" +
    "oamz|oamc|oamx|omz|omc|omx|ovnz|ovnc|ovnx|ovlz|ovlc|ovlx|" +
    "ovmz|ovmc|ovmx|ovrz|ovrc|ovrx|ovp|ovt|" +
    "mnaungz|mznaungz|mrvkueq|aungz|aungc|aungx|auk|uiyq|vyq|oq|aq|" +
    "vq|eq|iq|uq|awq|uiq|ueq|uiuq|oayz|oayc|oayx|ayz|ayc|ayx|vyz|vyc|" +
    "vyx|uyz|uyc|uyx|uiyz|uiyc|uiyx|ueyz|ueyc|ueyx|ongz|ongc|ongx|" +
    "angz|angc|angx|vngz|vngc|vngx|engz|engc|engx|ingz|ingc|ingx|" +
    "ungz|ungc|ungx|awngz|awngc|awngx|uingz|uingc|uingx|uengz|" +
    "uengc|uengx|uiungz|uiungc|uiungx|oamz|oamc|oamx|amz|amc|" +
    "amx|vmz|vmc|vmx|emz|emc|emx|imz|imc|imx|umz|umc|umx|awmz|" +
    "awmc|awmx|uimz|uimc|uimx|uemz|uemc|uemx|uiumz|uiumc|uiumx|" +
    "oanz|oanc|oanx|anz|anc|anx|vnz|vnc|vnx|enz|enc|enx|inz|inc|" +
    "inx|unz|unc|unx|awnz|awnc|awnx|uinz|uinc|uinx|uenz|uenc|" +
    "uenx|uiunz|uiunc|uiunx|oalz|oalc|oalx|alz|alc|alx|vlz|vl" +
    "c|vlx|elz|elc|elx|ilz|ilc|ilx|ulz|ulc|ulx|awlz|awlc|awlx|" +
    "uilz|uilc|uilx|uelz|uelc|uelx|uiulz|uiulc|uiulx|oarz|" +
    "oarc|oarx|arz|arc|arx|vrz|vrc|vrx|erz|erc|erx|irz|irc|irx|" +
    "urz|urc|urx|awrz|awrc|awrx|uirz|uirc|uirx|uerz|uerc|uerx|" +
//    "uiurz|uiurc|uiurx|ok|ak|vk|ek|ik|uk|awk|uik|uek|uiuk|oap|" +
    "uiurz|uiurc|uiurx|ok|ak|ek|ik|uk|awk|uik|uek|uiuk|oap|" +
    "ph|op|ap|vk|ep|ip|up|awp|uip|uep|uiup|oat|at|vt|et|it|ut|awt|" +
    "uit|uet|uiut|oz|oc|ox|az|ac|ax|vz|vc|vx|ez|ec|ex|iz|ic|ix|" +
    "uz|uc|ux|awz|awc|awx|uiz|uic|uix|uez|uec|uex|uiuz|uiuc|" +
    "uiux|htt|th|ht|ch|kh|ng|ny|nh|sh|ts|gh|f|k|g|s|y|w|p|" +
    "b|m|n|h|l|t|d|r|j|v|\u0020|,|\.|\u000a";

function preParseLatin(instring) {
  //  var regex1 = new RegExp(tangsa_latin_chars, "gi");
  var regex1 = new RegExp(gamwin_latin_chars, "gi");
  var outList = instring.match(regex1);
  return outList;
}

function convertEncodingToUnicode(inbox, outbox, encodingIndex) {
  var inarea = document.getElementById(inbox);
  var outarea = document.getElementById(outbox);

  // First, replace all single characters with their Unicode equivalents.
  var intext = inarea.value;
  var outtext = "";
  var out;
  var parsedText = preParseLatin(intext.toLowerCase());
  for (var index = 0; index < parsedText.length; index ++) {
    var c = parsedText[index];
    out = c;
    if (c in private_use_map_combined) {
      var result = private_use_map_combined[c][encodingIndex];
      if (result) {
        out = result;
      }
    }
    outtext += out;
  }

  var newText = outtext;
  // Insert more complex replacements here.

  //  ePattern = /([\u1031\u103c]\ufe00?)([\u1000-\u1029\u1075-\u1081\uaa60-\uaa76]\uf300?)/gi;
  //  eReplace = "$2$1";
  //  newText = outtext.replace(ePattern, eReplace);


  // Consider doubled combiners, e.g., 103a twice.
  if (outarea) {
    outarea.innerHTML = outarea.value = newText;
  }
  return newText;
}
