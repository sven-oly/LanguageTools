# -*- coding: utf-8 -*-
# !/usr/bin/env python
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
import webapp2

import base

from google.appengine.ext.webapp import template

Language = 'Kinyarwanda'
Language_native = 'Kinyarwanda'
LanguageCode = 'rw'
ScriptCode = 'Latn'

links = [
  {'linkText': 'Keyboard',
   'ref': '/' + LanguageCode + '/'
   },
  {'linkText': 'Character List',
   'ref': '/' + LanguageCode + '/charTable/'},
  {'linkText': 'About Umwero',
   'ref': '/' + LanguageCode + '/about/'},
  # {'linkText': 'Font conversion summary',
  #   'ref': '/' + LanguageCode + '/encodingRules/'
  # },
  # {'linkText': 'Resources',
  #   'ref': '/' + LanguageCode + '/downloads/'
  # },
  # {'linkText': 'Unicode page',
  #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
  # },
  # {'linkText': 'Lepcha script',
  #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_alphabet'
  # },
  # {'linkText': 'Wikipedi page',
  #  'ref': 'https://en.wikipedia.org/wiki/Lepcha_language'
  # },
  # {'linkText': 'Ethnolog',
  #  'ref': 'https://www.ethnologue.com/language/lep'
  # },
  # {'linkText': 'Combiners',
  #  'ref': '/lep/diacritic/'
  #  },
]

class AboutPageHandler(webapp2.RequestHandler):
  def get(self):
    langInfo = self.app.config.get('langInfo')

    template_values = {
      'language': langInfo.Language,
    }
    path = os.path.join(os.path.dirname(__file__), 'HTML/Umwero/umwero.html')
    self.response.out.write(template.render(path, template_values))

class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {  # This is a font encoding for testing.
            'family': 'UMWERO',
            'longName': 'UMWERO Jan 2022',
            'source': '/fonts/Kinyarwanda/UMWERO.otf',
          },
          {  # This is a font encoding for testing.
            'family': 'Kernedumwero',
            'longName': 'Kernedumwero',
            'source': '/fonts/Kinyarwanda/Kernedumwero.otf',
          },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/xyz.ttf',
            'font_name': 'xyz',
            'display_name': 'xyz',
          },
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': LanguageCode,
           },
        ]

        self.links = links

        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = []

        # TODO: Fill in the rest of the common data.
        self.charNameData = {
            'file': '/resources/rw/Umwero_character_names.tsv',
            'info': 'Umwero glpyh names'
        }

        self.charNames = """Umwero	ASCII	Charname
\"	\"	Ah
:	:	Uh
{	{	Oh
|	|	Eh
}	}	Ih
R	R	Ra
B	B	Ba
N	N	Na
M	M	Ma
T	T	Ta
K	K	Ka
S	S	Sa
G	G	Ga
Z	Z	Za
C	C	Cha
J	J	Ja
D	D	Da
H	H	Ha
Y	Y	Ya
W	W	Wa
V	V	Va
P	P	Pa
F	F	Fa
A	A	Mba
U	U	Nja
YY	YY	Nya
SS	SS	Nsa
KK	KK	Kya
ZZ	ZZ	Dza
HH	HH	Sha
L	L	Gya
LL	LL	Ngya
CC	CC	Nca
BB	BB	Nb
Q	Q	Shya
QQ	QQ	Nshya
HHH	HHH	Nsh
NN	NN	Nha
TT	TT	Nta
PP	PP	Mpa
X	X	Tsa
E	E	NKHA
EE	EE	NKA
JJ	JJ	DJA
O	O	MVA
FF	FF	MFA
I	I	PFA
KKK	KKK	NKYA
=	=	=
(	(	(
.	.	.
?	?	?
,	,	, or ;
+	+	+
-	-	-
1	1	1
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
ND	ND	Nda
NG	NG	Nga
NZ	NZ	Nza
HHKW	HHKW	Shkwa
QKW	QKW	Shykwa
HHHKW	HHHKW	Nshkwa
QQKW	QQKW	Nshykwa
AG	AG	Mbga
AL	AL	Mbgya
BBL	BBL	Bgya
BBG	BBG	Bga
BBYGW	BBYGW	Bygwa
NYY	NYY	N-Nya
NNYY	NNYY	Nh-Nya
TKW	TKW	Tkwa
TKK	TKK	Tkya
NNEW	NNEW	Nhu-Nkwa
SKW	SKW	Skwa
SKK	SKK	Skya
KW	KW	Kwa
EW	EW	Nkh-Wa
EEW	EEW	Nkwa
CKW	CKW	Ckwa
CCKW	CCKW	Nckwa
XKW	XKW	Tskwa
SSKW	SSKW	Nskwa
SSKK	SSKK	Nskya
MYY	MYY	Mnya
ME	ME	M-Nkha
MYYEW	MYYEW	M+Ny+Nkh-Wa
DGW	DGW	Dgwa
NDGW	NDGW	Ndgwa
DL	DL	Dgya
NDL	NDL	Ndgya
JGW	JGW	Jgwa
UGW	UGW	Njgwa
ZGW	ZGW	Zgwa
YYEW	YYEW	Ny-Nkh-Wa
GW	GW	Gwa
NZGW	NZGW	Nzgwa
NEW	NEW	N-Nkh-Wa
NGW	NGW	Ngwa
IK	IK	Pfka
IKK	IKK	Pfkya
PKK	PKK	Pkya
FK	FK	Fka
FKK	FKK	Fkya
VG	VG	Vga
VL	VL	Vgya
OG	OG	Mvga
OL	OL	Mvgya
OGW	OGW	Mvgwa
PK	PK	Pka
PPKK	PPKK	Mpkya
PPK	PPK	Mpka
FFK	FFK	Mfka
FFKK	FFKK	Mfkya
RGW	RGW	Rgwa
RL	RL	Rgya"""

langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/charTable/', base.CharacterTableHandler),
  ('/' + LanguageCode + '/about/', AboutPageHandler),

], debug=True,
  config={'langInfo': langInstance}
)
