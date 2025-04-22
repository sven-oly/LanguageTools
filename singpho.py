# -*- coding: utf-8 -*-
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import base

# 
import preconverted_assamese
# Strings that are verified as correct
import good_results_sgp

# For Python 2.x. and Python
try:
    unichr
except NameError:
    unichr = chr

Language = 'Singpho'
Language_native = 'ဈိာင်ဖေါစ်'
LanguageCode = 'sgp'
ScriptCode = 'Beng'
links = [
    {'linkText': 'Keyboard',
     'ref': '/' + LanguageCode + '/'
    },
    {'linkText': 'Converter',
     'ref': '/convert/' + LanguageCode + '?tools=1'
    },
    {'linkText': 'Font conversion summary',
     'ref': '/encodingRules/' + LanguageCode
    },
    {'linkText': 'Resources',
     'ref': '/' + LanguageCode + '/downloads/'
    },
    {'linkText': 'Conjuncts',
     'ref': '/conjunct/' + LanguageCode
    },
    # {'linkText': 'Unicode page',
    #  'ref': 'https://www.unicode.org/charts/PDF/U1C00.pdf'
    # },
    # {'linkText': 'THIS SCRIPT',
    #  'ref': 'https://en.wikipedia.org/wiki/XYZ_alphabet'
    {'linkText': 'Wikipedi page',
     'ref': 'https://en.wikipedia.org/wiki/Singpho_dialect'
    },
    # {'linkText': 'Ethnolog',
    #  'ref': 'https://www.ethnologue.com/language/XYZ'
    # },
    {'linkText': 'Combiners',
     'ref': '/diacritic/' + LanguageCode
    },
]


class langInfo:
    def __init__(self):
        # Special case 
        self.preconverted_data = preconverted_assamese.sgp_assamese_info
        self.good_results = good_results_sgp.good_results_sgp

        print('SGP preconverted %d items' % (len(self.preconverted_data)))

        self.LanguageCode = LanguageCode
        self.Language = Language
        self.encodingLanguage = 'Assamese'
        self.Language_native = Language_native

        self.conversionLanguage = 'Assamese'

        self.test_data = u''
        self.unicode_font_list = [
          {'family': 'NotoSerif',
           'longName': 'Noto Serif Bengali',
           'source':
           '/fonts/Assamese/NotoSerifBengali-Regular.ttf',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans Bengali',
           'source':
           '/fonts/Assamese/NotoSansBengali-Regular.ttf',
           },
          {'family': 'NotoSans',
           'longName': 'Noto Sans',
           'source': '/fonts/NotoSans-Regular.ttf',
           },
        ]

        self.encoding_font_list = [
          {
            'font_path': '/fonts/Singpho/tboishkh-2001.ttf',
            'font_name': 'Tanmatra Boishakhi',
            'display_name': 'Tanmatra Boishakhi',
          },
            # !!!! TEMPORARY
            # {
            #     'font_path': '/fonts/NotoSans-Regular.ttf',
            #     'font_name': 'NotoSans-Regular, arial',
            #     'display_name': 'Noto Sans',
            # },
        ]

        self.encoding_chars = """!  $ % ( ) * + , - . /  0 1 2 3 4 5 6 7 8 9 : ;  ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~    ¡ ¢ £ ¤ ¥ ¦ § ¨ © ª « ¬ ­ ® ¯  ° ± ² ³ ´ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿ À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö × Ø Ù Ú Û Ü Ý Þ ß à á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ÷ ø ù ú û ü ý þ ÿ """
        added_chars = []
        self.encoding_chars += ' '.join(added_chars)

        self.lang_list = [LanguageCode]  # This may be extended

        self.kb_list = [
          {'shortName': LanguageCode,
           'longName': LanguageCode,
           },
        ]

        self.links = links

        # Non-diacritics
        self.unicodeRanges = [('\u0993', '\u09a8'),
                              ('\u09aa', '\u09b0'),
                              ('\u09b2', '\u09b2'),
                              ('\u09b6', '\u09b9'),
                              ('\u09dc', '\u09dd'),
                              ('\u09df', '\u09df'),
                              ('\u09f0', '\u09f1'),
        ]
        # Compute the full set of letters
        self.baseChars = []
        for item in self.unicodeRanges:
            start = ord(item[0])
            end = ord(item[1])
            for n in range(start, end+1):
                self.baseChars.append(chr(n))
        
        self.base_consonant = '\u099a'
        # TODO: Fill in with diacritics
        self.diacritic_list = ['\u0981', '\u0982', '\u0983',
                               '\u09bc', '\u09be', '\u09bf',
                               '\u09cb', '\u09cc', '\u09cd',
                               '\u09c1', '\u09c2', '\u09c3',
                               '\u09c4', '\u09c7', '\u09c8',
                               '\u09cb', '\u09cc', '\u09cd',
                               '\u09d7', '\u09e2', '\u09e3',
                               ]
        self.conjunct_char = '\u09cd'
        # TODO: Fill in base consonant
        self.default_base_consonant = u'\0x61'

        self.encodedRanges = [
            (0x20, 0x7f),
            (0xa0, 0xff)
        ]

        # For additional resources for download
        self.text_file_list = [

        ]

        self.fillChars = [chr(x) for x in range(0x61, 0x7b)]
        self.unicodeCombiningChars = self.diacritic_list

        resource_list = [
          {
            'name': 'Unicode 72 pre-release ICU4C *.tgz',
            'source': '/resources/unicode/icu-r37e2956-x86_64-pc-linux-gnu-Ubuntu-22.04.tgz',
            'description': 'Unicode 72 pre-release ICU4C *.tgz',
          }
        ]
        self.text_file_list = resource_list


langInstance = langInfo()

