# LanguageTools
Here we have tools for prototyping keyboards, fonts, and conversion needed for text support of languages.

In particular, this site supports languages that are not (yet) well represented on the internet. For example, 
a community in Africa may use characters that are not available on a default keyboard.

# Keyboard prototypes

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

In additiona, the caps-lock layer of the prototype keyboard selects standard English QWERTY layout, making it easy for a
user to create and edit multilingual text. Naturally, it is also possible to create a version with a French or
other language's layout for writing in a second different language.

## Additional keyboard notes

# Fonts and prototyping

# Writing systems not yet in Unicode

## TODO: include text for this.
