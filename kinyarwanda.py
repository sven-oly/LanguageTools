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
  {'linkText': 'KB transforms',
   'ref': '/' + LanguageCode + '/kbtransforms/'
   },
  {'linkText': 'Unwero calculator',
   'ref': '/' + LanguageCode + '/numerals/'
   },
  {'linkText': 'Calendar',
   'ref': '/' + LanguageCode + '/calendar/'
   },
  {'linkText': 'Unwero Word search',
   'ref': '/' + LanguageCode + '/wordsearch/'
  },
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
            'family': 'UMWERO_PUAnumbers',
            'longName': 'UMWERO PUA Numbers 7 Mar  2022',
            'source': '/fonts/Kinyarwanda/UMWEROPUAnumbers.otf',
          },
          {  # This is a font encoding for testing.
            'family': 'UMWEROalphaPUA3',
            'longName': 'UMWERO PUA 2 Mar 2022',
            'source': '/fonts/Kinyarwanda/UMWEROalphaPUA3.otf',
          },

          {  # This is a font encoding for testing.
            'family': 'UMWERO',
            'longName': 'UMWERO February 2022',
            'source': '/fonts/Kinyarwanda/NZELA567.otf',
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
        self.unicodeCombiningChars = self.diacritic_list
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

        self.fillChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ{}'

        self.charNames = """Umwero	Name	ASCII
(	(	(
+	+	+
,	, or ;	,
-	-	-
.	.	.
1	1	1
2	2	2
3	3	3
4	4	4
5	5	5
6	6	6
7	7	7
8	8	8
9	9	9
=	=	=
?	?	?
:	Uh	:
{	Oh	{
|	Eh	|
}	Ih	}
A	Mba	A
AG	Mbga	AG
AGW	Agw (!)	AGW
AL	Mbgya	AL
AYGW	Aygw (!)	AYGW
B	Ba	B
BB	Nb	BB
BBG	Bga	BBG
BBL	Bgya	BBL
BBYGW	Bygwa	BBYGW
C	Cha	C
CC	Nca	CC
CCKW	Nckwa	CCKW
CKW	Ckwa	CKW
D	Da	D
DGW	Dgwa	DGW
DL	Dgya	DL
E	NKHA	E
EE	NKA	EE
EEW	Nkwa	EEW
EW	Nkh-Wa	EW
F	Fa	F
FF	MFA	FF
FFK	Mfka	FFK
FFKK	Mfkya	FFKK
FK	Fka	FK
FKK	Fkya	FKK
G	Ga	G
GW	Gwa	GW
H	Ha	H
HH	Sha	HH
HHH	Nsh	HHH
HHHKW	Nshkwa	HHHKW
HHKW	Shkwa	HHKW
I	PFA	I
IK	Pfka	IK
IKK	Pfkya	IKK
J	Ja	J
JGW	Jgwa	JGW
JJ	DJA	JJ
K	Ka	K
KK	Kya	KK
KKK	NKYA	KKK
KW	Kwa	KW
L	Gya	L
LL	Ngya	LL
M	Ma	M
ME	M-Nkha	ME
MW	Mw (!)	MW
MYY	Mnya	MYY
MYYEW	M+Ny+Nkh-Wa	MYYEW
N	Na	N
ND	Nda	ND
NDGW	Ndgwa	NDGW
NDL	Ndgya	NDL
NEW	N-Nkh-Wa	NEW
NG	Nga	NG
NGW	Ngwa	NGW
NN	Nha	NN
NNEW	Nhu-Nkwa	NNEW
NNYY	Nh-Nya	NNYY
NYY	N-Nya	NYY
NZ	Nza	NZ
NZGW	Nzgwa	NZGW
O	MVA	O
OG	Mvga	OG
OGW	Mvgwa	OGW
OL	Mvgya	OL
P	Pa	P
PK	Pka	PK
PKK	Pkya	PKK
PP	Mpa	PP
PPK	Mpka	PPK
PPKK	Mpkya	PPKK
Q	Shya	Q
QKW	Shykwa	QKW
QQ	Nshya	QQ
QQKW	Nshykwa	QQKW
R	Ra	R
RGW	Rgwa	RGW
RL	Rgya	RL
S	Sa	S
SKK	Skya	SKK
SKW	Skwa	SKW
SS	Nsa	SS
SSKK	Nskya	SSKK
SSKW	Nskwa	SSKW
SW	Sw	SW
T	Ta	T
TKK	Tkya	TKK
TKW	Tkwa	TKW
TT	Nta	TT
TTEEW	Tteew (!)	TTEEW
TTKW	Ttkw (!)	TTKW
U	Nja	U
UGW	Njgwa	UGW
V	Va	V
VG	Vga	VG
VL	Vgya	VL
W	Wa	W
X	Tsa	X
XKW	Tskwa	XKW
Y	Ya	Y
YY	Nya	YY
YYEW	Ny-Nkh-Wa	YYEW
Z	Za	Z
ZGW	Zgwa	ZGW
ZZ	Dza	ZZ
	Times10	Times10
	Times100	Times100
	Times1000	Times1000
	Times10000	Times10000
	Times10^5	Times10^5
	Times10^6	Times10^6
	Times10^7	Times10^7
	Times10^8	Times10^8
	Times10^9	Times10^9"""

        # For numeral values
        self.numbersImage = 'rw/umwero/Umwero_img.png'


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + langInstance.LanguageCode + '/kbtransforms/', base.KeyboardTransforms),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  ('/' + LanguageCode + '/charTable/', base.CharacterTableHandler),
  ('/' + LanguageCode + '/about/', AboutPageHandler),
  ('/' + langInstance.LanguageCode + '/numerals/', base.NumeralsHandler),
  ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),

  ('/' + langInstance.LanguageCode + '/calendar/', base.CalendarHandler),
], debug=True,
  config={'langInfo': langInstance}
)
