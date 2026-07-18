#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

Language = 'Gurung'
Language_native = 'गुरुङ'
LanguageCode = 'gvr'
ScriptCode = 'Gukh'


class langInfo:
    def __init__(self):
        self.LanguageCode = LanguageCode
        self.Language = Language
        self.Language_native = Language_native
        self.test_data = u''
        self.unicode_font_list = [
            {'family': 'Khema 2019 final',
             'longName': 'Khema 2019 final',
             'source': '/fonts/Gurung/Khema_2019 final.ttf',
             },
            {'family': 'Khema extended',
             'longName': 'Khema extended',
             'source': '/fonts/Gurung/Khema_extended.ttf',
             },
            {'family': 'NotoSansGurung',
             'longName': 'Noto Sans Gurung Khema',
             'source': '/fonts/Gurung/NotoSansGurungKhema.ttf',
             },
            {'family': 'Khema',
             'longName': 'Khema',
             'source': '/fonts/Gurung/Khema.ttf',
             },
            {'family': 'NotoSans',
             'longName': 'Noto Sans Latin',
             'source': '/fonts/NotoSans-Regular.ttf',
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

        self.links = [
            {'linkText': 'Keyboard',
             'ref': '/langbase/%s' % LanguageCode
             },
            {'linkText': 'Word search',
             'ref': '/wordsearch/%s' % LanguageCode
            },
            # {'linkText': 'Converter',
            #  'ref': '/' + LanguageCode + '/convertUI/'},
            # {'linkText': 'Font conversion summary',
            #   'ref': '/' + LanguageCode + '/encodingRules/'
            # },
    {'linkText': 'Resources',
     'ref': '/downloads/' + LanguageCode
    },
            {'linkText': 'Khema Unicode',
             'ref': 'https://www.unicode.org/charts/PDF/U16100.pdf'
            },
]

        # Unicode range
        self.unicodeRanges = [(chr(0x16100), chr(0x16139))]
        self.digits = [(chr(0x16130), chr(0x16139))]

        self.diacritic_list = [chr(x) for x in range(0x1611e, 0x1612f)]

        # TODO: Fill in base consonant
        self.default_base_consonant = chr(0x16101)

        self.encodedRanges = [
            (0x20, 0xff),
        ]

        # For additional resources for download
        self.text_file_list = [

        ]

        self.fillChars = [chr(x) for x in range(0x61, 0x7b)]
        self.unicodeCombiningChars = self.diacritic_list

        resource_list = [
          {
              'name': 'Keyman Gurung Khema keyboards (2) 2025-11-20',
              'source': '/resources/gvr/gurung_khema.kmp',
              'description': 'Keyman Gurung Khema'
          }
        ]
        self.text_file_list = resource_list


langInstance = langInfo()
