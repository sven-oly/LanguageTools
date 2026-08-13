#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import base

Language = 'Čočenyo (Chochenyo)'
Language_native = 'Čočenyo'
LanguageCode = 'cst'
ScriptCode = 'Latn'

links = [
    {'linkText': 'Word search',
     'ref': '/wordsearch/' + LanguageCode + '/'
    },
    {'linkText': 'Resources',
      'ref': '/downloads/' + LanguageCode
    },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
    # {'linkText': 'THIS SCRIPT',
    #  'ref': 'https://en.wikipedia.org/wiki/XYZ_alphabet'
    # },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Chochenyo_language',
    },
    {'linkText': 'Čočenyo in ELP',
     'ref': 'https://www.endangeredlanguages.com/elp-language/7409'
     },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/XYZ'
    # },
    # {'linkText': 'Combiners',
    #  'ref': '/lep/diacritic/'
    #  },
]


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
          {'family': 'NotoSerif',
           'longName': 'Noto Serif',
           'source': '/fonts/NotoSerif-Regular.ttf',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
        ]

        self.encoding_font_list = [
        ]

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': Language,
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\u0020', '\u007f')]

        self.unicodeChars = [chr(x) for x in range(0x61, 0x7b)]
        self.unicodeChars.extend(['c\u0306', 's\u0306', '\u1E6D'])

        # TODO: Fill in with diacritics
        self.diacritic_list = [chr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [
        ]

        self.fillChars = [chr(x) for x in range(0x61, 0x7b)]
        self.fillChars.extend(['s̆', 'ṭ', 'c̆'])
        self.unicodeCombiningChars = self.diacritic_list

        resource_list = [
            {
                'name': 'Keyman Chochenyo v1.12',
                'source': '/resources/cst/cst_1.12.kmp',
                'description': '1.12 (03-Aug-2026). Add acute accent'
            },
            {
                'name': 'Keyman Chochenyo v1.11',
                'source': '/resources/cst/cst_1.1.kmp',
                'description': 'Keyman Chochenyo 1.11 (03-Aug-2026). Fix shift in alt layer'
            },
            {
              'name': 'Keyman Chochenyo v1.1',
              'source': '/resources/cst/cst_1.1.kmp',
              'description': 'Keyman Chochenyo 1.1'
          },
          {
              'name': 'Keyman Chochenyo v1.0',
              'source': '/resources/cst/cst.kmp',
              'description': 'Keyman Chochenyo 1.0'
          }
        ]
        self.text_file_list = resource_list

langInstance = langInfo()
