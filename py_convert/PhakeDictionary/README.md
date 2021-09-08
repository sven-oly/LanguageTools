### Convert Phake Dictionary to Unicode
This code converts entries in a dictionary file from a font encoding into Unicode.
This version is specifically for PhakeTai to Myanmar. It also converts some text 
in certain fields and within angle brackets from Banchob font encoding into
Unicode characters.

Note that the conversion is done in two phases. The first takes the input file and makes one long line out of
each tagged line, i.e., combining multiple definitions into a single line separated by Zero Width Joiner
ZWJ U+200b. This done in dictionaryjoin.py.

The second phase takes the joined lines in file joined.txt, reading one line at a time. Some lines are converted
to Myanmar code points (tags 'lx', 'le', 'pl', 'xv'). The output is Unicode in the Myanmar block.

Some tags are Banchob encoding 'ph', 'pd', 'xr', converted using a simple lookup table.

And lines are scanned for regular expressions containing text within angle brackets. That content is
also converted via the Banchob lookup table.

Note that the Phake conversion uses the Javascript converter phkConverter.js
that has been turned into phkConverter.py using js2py, found at
[Js2Py](https://github.com/PiotrDabkowski/Js2Py).

To run:
```
python3 dictionaryjoin.py
python3 convertDictionary.py
```
Note that you may need to install js2py first.

Also note that the file names are hardcoded in these .py modules. Making them
command line parameters would be better.