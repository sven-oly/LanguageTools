# LanguageTools
Here we have tools for prototyping keyboards, fonts, and conversion needed for text support of languages.

In particular, this site supports languages that are not (yet) well represented on the internet. For example, 
a community in Africa may use characters that are not available on a default keyboard.

# Add your own language tools to this archive.
LanguageTools provides a framwork for implementing keyboards, converters, and other tools
for many languages.

The project runs using Google AppEngine. It currently uses Python2 server side routines
with Django templating. Keyboard layouts are implemented as JavaScript data files and encoding conversion
is done using JavaScript routines.

This is a GitHub project, so anyone can access and use the source code.

## Steps to add support for your language
You are welcome to download this GitHub project and create tools for your own language community.

I also welcome collaboration and would be happy to host contributions on
[languagetools-153419.appspot.com](https://languagetools-153419.appspot.com/). If you'd like to add your tools,
use the GitHub procedures to create a Pull Request and ask me to review. If all looks OK,
I will add this to the active site.

### Create a Python server-side file
The server side Python2 file handles URLs for your language and the applications you implement for the language.
There are some global variables, but most of the values should be referenced in the langInfo class.

The langInfo data is passed to HTML templates with Django. In many cases, the classes in
base.py can be used as implementations for keyboard, conversions, and several other common functions.

1. Copy template.py with a good name for your language. Save as a .py file in the same directory.

2. Fill in basics including:
* Language name and code as strings
* Range of character code points used
* Font(s) used including Unicode fonts and font encodings (see below for where to put them). Add the paths
relative to the main directory, e.g., '/fonts/lang'
  
3. Add links relevant to your implementation in the links array

Note that each link includes text displayed as well as a link to another page in LanguageTools or
an external reference. It is often useful to point to information about the language, writing system,
and other frequently needed information.

````
links = [
{'linkText': 'Keyboard',
'ref': '/' + LanguageCode + '/'
},
````
Links to other pages in this application start with '/' followed by the Language code.

4. Add references at the end of the .py file for the particular pages you wish to use for this language

In most cases, use the methods of the base class. These methods pass information from the langInfo
object to the Django template.

````
app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),

````

5. Add font references
   
Note that the formats for font descripts are different for encoding fonts and Unicode fonts:
````
# Encoding fonts:
    self.encoding_font_list = [
      {
        'font_path': '/fonts/ahom_aiton/PHAKE.TTF',
        'font_name': 'Phake',
        'display_name': 'Phake',
      },
      ...
    ]

# Unicode font list:
    self.unicode_font_list = [
      {'source': '/fonts/language/myfont.ttf',
       'family': 'theFontFamilyName',
       'longName': 'human readable font name',
       },
       ...
    ]
````

6. Add references to keyboard layouts

The kb_list value in langInfo sets up one or more keyboards as defined in layouts, below. The
shortName refers to the actual name of the file in the layouts directory.

If provided, fontFamily gives the names of the fonts to be used with each keyboard.
````buildoutcfg
    self.kb_list = [
      {'shortName': 'phkVar',
       'longName': 'Phake Variant',
       'fontFamily': 'NotoSansMyanmarRegular,arial',
       },
````

#### Add font files
In the fonts/ directory, add a new folder for the fonts needed with the name of the language.
Add any Unicode fonts or custom font encodings in that directory.

### Write a layout file in JavaScript
In the layouts directory, copy an existing layout such as en.js, renaming it to reflect the
language and particular layout option. Note that the name of the this JavaScript file is the same as
shortName in the kb_list given in the .py file for the language.

Set up the indentifying information for the layout with a variable name using the language code and "_LAYOUT".

Set the id to be the same as the layout file name (without .js).

Add an appropriate title for the layout. This often includes the name of the language in that
language.

At the bottom of the file, set the _LAYOUT variable for the loadme function.

Add a variable with the language code as used in the keyboard shortName set to the _LAYOUT name.

````buildoutcfg
var EN_LAYOUT = {
  'id': 'en',
  'title': 'English QWERTY',
  
  ...
  
google.elements.keyboard.loadme(EN_LAYOUT);
en = EN_LAYOUT;
````

#### Defining the keyboard layout
The mappings part of the JavaScript file defines values that appear on the virtual keyboard as well
as the output from each virtual key. Mappings are provided for up to 8 layers. The default layer is
is referenced by an empty string value. Shift layer is give with 's', an control-alt layer is indicated by 'c'.

The contents of each layer is give by a single string of values. By default, a single character
indicates the contents of the layer, starting from the upper left of the keyboard.

In this example, the QWERTY default and shift layers are defined. 
````buildoutcfg
mappings': {
  '': {
    '': '`1234567890-=' +
        'qwertyuiop[]\\' +
        'asdfghjkl;\'' +
        'zxcvbnm,./'
    },
    's': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    },
````

Unicode escape sequences may be used instead of a string literal. For example, '\u0041' may be sub
be used instead of 'A'. This is useful for entering characters that are not easy to type or
read.

In many cases, a single key should produce more than a single code point. In this case, a single keystroke's output
can be entered with double braces surrounding the output, e.g., {{\u0041b}} in the codes for
a layer will case a single key to produce "Ab" as its output.

#### Transforms
TODO: Add description of key transforms here, with example. Myanmar output is one example of fairly
complex transforms in use to reorder keys. See my.js.

Phonetic keyboards such as the Cherokee or Plains Cree are implemented by substitutions of Unicode output based on one or more 
ASCII characters. See chr_phone.js and crk_phonetic.js as examples.

### Add the code to app.yaml

Add the language code as a URL path, pointing to the Python server code. Here, for example,
is an entry that connects the paths starting with "/cpp/" to the file chakma.py.
````buildoutcfg
- url: /ccp/.*
  script: chakma.app
````

## Running this project on your local computer
To test your language tools, set up Google AppEngine on your local computer. Here are instructions for setting up
[AppEngine with Python 2.7](https://cloud.google.com/appengine/docs/standard/python/setting-up-environment)

[Run a local server](https://cloud.google.com/appengine/docs/standard/python/tools/using-local-server) to test
your keyboard and other parts on your local computer (Mac, Windows, Linux).

You may also create a new AppEngine project of your own using this code base. Uploading and setting
up your own AppEngine site is [documented here](https://cloud.google.com/appengine).

Next, [install the `pip` program](https://pip.pypa.io/en/stable/installation/) which is a standard program to install Python packages.

In the main directory for the project, install the dependencies by running the command:

```
pip install -t lib -r requirements.txt
```

While staying in the main directory of the project, start the development server from a command line.

```
dev_appserver.py . 
```

(You can type Control+C to quit the running development server process.)

In your favorite browser, load localhost at port 8080. Append the language code you added in the
app.yaml file. For example, for langauge code "xyz", this URL will activate your Python code for the
base page for your language. Be sure to include the trailing "/" after the language code "xyz" in the URLs.

```
http://localhost:8080/xyz/
```

Note any error messages in the terminal window where the dev_server is running. Fix any errors in the
Python code that are reported there. When the page loads, you should see at least the basics of
your languages home page.

You can (and should) use the browser's inspector to understand the code generated by the Python
server side code with Django. And you may set breakpoints to debug JavaScript code, including that for
loading keyboards and converters.

# Keyboard prototypes
LanguageTools provides a way to quickly try different layout and transform rules for your language.
A few examples of keyboard options are describe here.

## Yoruba language and extended Latin
The Yoruba language uses Latin characters beyond the A-Z on an English langauge keyboard. These include the following
with acute and grave accents, dots below E and O and S, and the macrong and accents on M and N:

> ẹ ẹ́ ẹ̀ Ẹ Ẹ́ Ẹ̀ ọ ọ́ ọ̀ Ọ́ Ọ̀ ṣ Ṣ ń ǹ n̄ Ń Ǹ N̄ ḿ m̀ m̄ Ḿ M̀ M̄

To create Yoruba text, a user needs a keyboard that can produce the characters.

[Language Tools Yoruba](http://languagetools-153419.appspot.com/yo/) on this site provides these characters on
the ctrl-alt and shift-ctrl-alt layers. With this keyboard, users can type correct Yoruba text that is portable
to websites, applications, social media, etc. because the characters are in Unicode.

Here, the ctrl-alt layer shows dotted characters and diactric keys:
![Yoruba keyboard ctrl-alt layer](/images/Yoruba_alt_layer.png)

The challenge, however, is that Unicode characters need to be drawn to be readable. This requires a font that
will show the letters correctly, including the accents and lower dot forms in the needed combination. Not all fonts
that include basic Latin letters properly show all these forms needed by Yoruba. In some cases, the accents are
incorrectly positioned when a font does not know how to place a grave or acute accent on a letter with the dot below.

This test site includes various fonts that may be applied to text, allowing the user to preview the text in a variety
of styles.

## Other scripts
Many languages are usually written with scripts that are not based on Latin. A few examples include Russian
(Cyrillic), Greek (Greek), Hindi (Devanagari), Chinese, Japanese, Arabic, Hebrew, Cherokee, Burmese, and many others.
These scripts and many other are all included in the Unicode Standard.

To use these languages, input tools are needed that produce the character codes in a natural way. For scripts with a small number of characters (fewer than 150), several layers of a keyboard can be configured to produce the required characters,
using the default, shift, ctrl-alt, shift-ctrl-alt layers to store all the keys needed.

## Virtual keyboards
It is important to understand that the physical keys on a keyboard are not actually connected to the codes that appear in
a user's document, email, or text message. In computers, there is always a programming layer that maps between the physical
key and the output desired. Because this is defined in a piece of software, the operating system of a device usually
provides ways to pick alternate mappings from keys to output text. Users can choose a *virtual layout* as needed fora particular language, then tell the operating system to switch to another layout such as QWERTY.

Selecting the keyboard is
usually quite simple, and many different virtual layouts are available for any system, including mobile devices.
Switching among the keyboards is also easily done, so users can write create documents in more than a single language
simply by selecting a different virtual layout.

Many keyboard layouts are available as installable tools for desktop, laptop, and mobile devices, including those
developed by the system vendors as well as other organizations, companies, and individuals.

## Combining characters
In some cases, it is practical to assign a distinct key for each character with modifiers. In others, however, the
number of modifiers may be too large or it may be awkward to use ctrl-alt to access commonly used combinations. In such 
situations, modifers may be added as separate characters that *combine* with the base letter to produce the combinations
such as O with a dot below (o̩ and O̩). Assigning a key that adds the lower dot makes it possible to add this modifer to
many letters, simplifying the keyboard layout and giving all the combinations needed. And an acute or grave accent can be typed after the dotted letter to indicate the sound's tone.

Combining characters are used in many scripts such as Myanmar, which uses base consonants with a number of vowel modifiers
that change the sound of the base character. On Burmese keyboards, consonants are available as a single keystroke, and one
or more vowel signs are added to produce a full cluster representing a sound.

The decision of which combinations to provide on single keys vs. using combining marks depends on the needs and desires of
those who will be writing text. Typing may be easier if commonly used characters and combining marks are provided on the
the default and shift layers, with out resorting to multiple keys to select those on the ctrl-alt and shift-ctrl-alt layers.

It is important to note that there is no one best way to type in any language, and multiple keyboards can be defined based
on user's needs and preferences. In the case of English, QWERTY is a common layout, and Dvorak layout is prefered by some.
Either produces Unicode characters, and text created by a keyboard does not depend on the particular layout used.

## Phonetic keyboards
Because a piece of software sits between the physical keys touched and the output from a keyboard, it is also possible to add rules that take multiple keystrokes to produce combined forms from more than one keystroke.

There are some writing systems in which the number of characters makes it inconvenient to assign one key per
character, or even to define diacritics for all combinations. An example is Plains Cree when written with Canadian 
Aboriginal Syllabics. About 150 separate characters are needed for this language to represent all the sounds.

This script is highly structured, however, with consonants and up to 7 vowel sounds for each consonant. For example, here are the characters for the consonant "w":
> ᐍ ᐏ ᐏ ᐘ ᐑ ᐕ ᐚ
These can be transliterated as "we", "wi", "wo", "wa", "wii", "woo", and "waa", respectively. Consonant forms include "P", "t" "k", "c", "m", "n", "s", "y", and combinations with "w" such as "pw". "tw", etc.

With such a structured system, it is straighforward to use a layout that includes the need consonants and vowels in the 
QWERTY Latin placement. Rules can be definned in the keyboard that then convert a series of keystrokes into the desired 
character. For example, the sound "wa" correspondes to "ᐘ". By typing the "w" followed by "a", the rules are applied to 
produce "ᐘ" . Typing another "a" converts this to the longer vowel form "ᐚ" (waa). Here, 3 keystrokes produce a single 
syllable unambigously. This allows the user to type all the Canadian Syllabics characters without shifting or using
ctrl-alt layers.

This is illustrated in the prototype keyboard here: http://languagetools-153419.appspot.com/cr/

![Plains Cree phonetic input](/images/PlainsCreePhonetickeyboardLayout.png)

In this prototype, additional rules provide shortcuts, such as "A", "I", "O" instead of doubled lowercase "aa".
This provides additional space on the shift layout for combinations that may be needed in writing other languages.

In addition, the caps-lock layer of the prototype keyboard selects standard English QWERTY layout, making it easy for a
user to create and edit multilingual text. Naturally, it is also possible to create a version with a French or
other language's layout for writing in a second different language.

## Additional keyboard notes
Note that many languages use multiple keyboard layouts, e.g., QWERTY and Dvorak keyboard for English. The limitation is
usually the availability on the platforms that a person uses.

# Fonts and prototyping
Many fonts are publicly downloadable without charge for personal use. Common formats include TrueType (.ttf),
OpenType (.otf), and Web Open Font Format (.woff). These can be used in most desktop applications including
word processing, spreadsheets, presentation software, simple notes, and many others.

## Creating custom fonts
It is also possible to create your own fonts using such tools as [FontForge](https://fontforge.org/en-US/), an open
source project that is free to download and use. Fonts include many concepts that may be new. Try
reading online about [font design with FontForge](http://designwithfontforge.com/en-US/Introduction.html) and other
resources such as video tutorials, e.g, [FontForge Master Class](https://www.youtube.com/watch?v=5O4bIAzbebI).

# Writing systems not yet in Unicode
LanguageTools works well with non-Unicode fonts as well as Unicode.

Just add the fonts to the encoded font list and set up keyboard layouts as needed.