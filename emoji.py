# -*- coding: utf-8 -*-
#!/usr/bin/env python
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

import base

# import transliterate
# import transrule_ccp

import json
import logging
import os
import sys
import urllib
import webapp2

from google.appengine.ext.webapp import template

encoding_font_list = [
]

unicode_font_list = [
  {
      'family': 'NotoColorEmoji',
      'longName': 'Noto Color Emoji',
      'source': '/fonts/NotoColorEmoji.ttf',
      'attribution': 'https://www.google.com/get/noto/help/emoji/',
  },
  {
      'family': 'NotoEmoji',
      'longName': 'Noto Emoji',
      'source': '/fonts/NotoEmoji-Regular.ttf',
      'attribution': 'https://www.google.com/get/noto/',
  },
  {
      'family': 'EmojiOneColor',
      'longName': 'Adobe EmojiOne',
      'source': '/fonts/EmojiOneColor.otf',
      'attribution': 'https://github.com/adobe-fonts/emojione-color',
  },
  {
      'family': 'blobmojiNotoColorEmoji',
      'longName': 'blobmoji',
      'source': '/fonts/blobmoji_NotoColorEmoji.ttf',
      'attribution': 'https://github.com/C1710/blobmoji/blob/master/fonts/NotoColorEmoji.ttf',
  },
]

links = [
    {'linkText': 'Keyboard',
     'ref': '/emoji/'
    },
    {'linkText': 'Emoji copy',
     'ref': 'https://www.emojicopy.com/',
    },
    {'linkText': 'Emoji Tracker',
     'ref': 'http://www.emojitracker.com/'},
    {'linkText': 'Full emoji list',
     'ref': 'http://www.unicode.org/emoji/charts/full-emoji-list.html'
    },
    {'linkText': 'Released',
     'ref': 'http://www.unicode.org/emoji/charts/emoji-released.html'
    },
    {'linkText': 'Unicode Emoji FAQ',
     'ref': 'http://unicode.org/faq/emoji_dingbats.html'
    },
    {'linkText': 'Adopt a Character',
     'ref': 'https://unicode.org/consortium/adopt-a-character.html'
    },
    {'linkText': 'Emoji Wikipedia',
     'ref': 'https://en.wikipedia.org/wiki/Emoji#Unicode_blocks'
    },
]

class langInfo():
  def __init__(self):
    self.LanguageCode = 'emoji'
    self.Language = 'Emoji'
    self.Language_native = ''
    self.direction = 'ltr'

    # NOT DEFINED YET
    if sys.maxunicode >= 0x10000:
      logging.info('WIDE SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(x) for x in range(0x10D22, 0x10D27)]
    else:
      logging.info('NARROW SYSTEM BUILD!!!')
      self.diacritic_list = [unichr(0xd803) + unichr(0xdd00 + x) for x in range(0x22, 0x27)]

    self.base_consonant = u'\ud803\udd01'
    self.baseHexUTF16 = u'\ud803\udd01'

    self.lang_list = [
      { 'shortName': self.LanguageCode,
        'longName': self.Language,
        }
    ]
    self.encoding_font_list = encoding_font_list
    self.kb_list = [
      {
        'shortName': self.LanguageCode,
        'longName': 'Emoji',
        'jsName': self.LanguageCode,
        'instructions': None,
        'font': 'NotoColorEmoji',
      },
    ]
    self.links = links
    self.text_file_list = []
    self.unicode_font_list = unicode_font_list

    # Lists of test characters for the various encodings
    test_range = [unichr(x) for x in xrange(0x1F230, 0x1F49F)]
    test_range.extend(unichr(x) for x in xrange(0x1f4a0, 0x1fa9f))
    test_range.extend(unichr(x) for x in xrange(0x00c8, 0x00cf))
    # Plus some others in the U+26XX and other ranges.

    self.test_chars = [' '.join(test_range)]

# Global in this file.
langInstance = langInfo()

app = webapp2.WSGIApplication(
    [('/emoji/', base.LanguagesHomeHandler),
     ('/emoji/convertUI/', base.ConvertUIHandler),
     ('/emoji/downloads/', base.Downloads),
     ('/emoji/converter/', base.ConvertHandler),
     ('/emoji/encodingRules/', base.EncodingRules),
     ('/emoji/diacritic/', base.DiacriticHandler),
    ], debug=True,
    config={'langInfo': langInstance}
)
