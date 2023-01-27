# -*- coding: utf-8 -*-

#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import webapp2

import base

# For Python 2.x. and Python 3
try:
    unichr
except NameError:
    unichr = chr

Language = 'Comanche'
Language_native = 'Nʉmʉ Tekwapʉ̲'
LanguageCode = 'com'
ScriptCode = 'Latn'

links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
     },
    # {'linkText': 'Word search',
    #  'ref': '/' + LanguageCode + '/wordsearch/'
    # },
    # {'linkText': 'Converter',
    #  'ref': '/' + LanguageCode + '/convertUI/'},
    # {'linkText': 'Font conversion summary',
    #   'ref': '/' + LanguageCode + '/encodingRules/'
    # },
    #{'linkText': 'Resources',
    # 'ref': '/' + LanguageCode + '/downloads/'
    # },
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Comanche_language'
     },
    {'linkText': 'LanguageGeek keyboard',
     'ref': 'https://www.languagegeek.com/usw/keyboards/keymap_comanche.html'
     },
    {'linkText': 'Omniglot',
     'ref': 'https://omniglot.com/writing/comanche.htm'
     },
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
          {'shortName': 'com',
           'longName': LanguageCode,
           },
        ]

        self.links = links

        # Unicode range
        self.unicodeRanges = [('\u0020', '\u007f')]
        # TODO: Fill in with diacritics
        self.diacritic_list = [unichr(x) for x in range(0x300, 0x330)]
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [

        ]

        self.fillChars = [unichr(x) for x in range(0x61, 0x7b)]
        self.unicodeCombiningChars = self.diacritic_list

        resource_list = [
        ]
        self.text_file_list = resource_list


langInstance = langInfo()

app = webapp2.WSGIApplication([
  ('/' + LanguageCode + '/', base.LanguagesHomeHandler),
  ('/' + LanguageCode + '/convertUI/', base.ConvertUIHandler),
  ('/' + LanguageCode + '/downloads/', base.Downloads),
  ('/' + LanguageCode + '/encodingRules/', base.EncodingRules),
  ('/' + LanguageCode + '/diacritic/', base.DiacriticHandler),
  # ('/' + langInstance.LanguageCode + '/wordsearch/', base.WordSearchHandler),
  ('/' + langInstance.LanguageCode + '/keyman/', base.KeyManHandler),
], debug=True,
  config={'langInfo': langInstance}
)
