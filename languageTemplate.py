class languageTemplate:
  def __init__(self):
    self.LanguageCode = 'base'
    self.Language = 'General'
    self.Language_native = 'Base Language'

    self.encoding_font_list = [
        {'font_name': self.Language + 'Font',
         'display_name': self.Language,
         'font_path': '/fonts/',
         },
    ]

    self.unicode_font_list = [
        {
            'source': '/fonts/NotoSans-Regular.ttf',
            'family': 'NotoSans',
            'longName': 'Noto Sans',
        },
    ]

    self.lang_list = []
    self.links = [
        {'linkText': 'Keyboard',
         'ref': '/' + self.LanguageCode + '/'},
        {'linkText': 'Converter',
         'ref': self.LanguageCode + '/converter/'},
        {'linkText': 'Font conversion summary',
         'ref': self.LanguageCode + 'encodingRules/'},
        {'linkText': 'Resources',
         'ref': self.LanguageCode + '/downloads/'},
    ]

    self.kb_list = [
        {'shortName':  self.LanguageCode,
         'longName': self.Language
         }
    ]

    self.text_file_list = [
    ]

    # Controls display of toggle for variation sequence.
    self.variation_sequence = False

    self.baseHexUTF16 = u''

    return
