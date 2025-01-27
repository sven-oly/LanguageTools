# -*- coding: utf-8 -*-
# !/usr/bin/env python
#
# Copyright 2007 Google Inc.
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

from flask import Flask, render_template, stream_with_context, request, Response, send_file

import logging
import os

# Start importing language stuff. This will be replaced by database eventually.
import ahom
import assamese
import bete
import chakma
import cherokee
import cree
import khamti
import mendekikakui
import omq
import phake
import qiang
import sunuwar


# Special for Assames checking.
import English_Assamese

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

# Dictionary of language data
language_info_dict = {
    }

# Add in languages as we get them ready
language_info_dict['aho'] = ahom.langInfo()
language_info_dict['as'] = assamese.langInfo()
language_info_dict['bete'] = bete.langInfo()
language_info_dict['ccp'] = chakma.langInfo()
language_info_dict['cr'] = cree.langInfo()
language_info_dict['chr'] = cherokee.langInfo()
language_info_dict['kht'] =  khamti.langInfo()
language_info_dict['men'] =  mendekikakui.langInfo()
language_info_dict['omq'] = omq.langInfo()
language_info_dict['phk'] = phake.langInfo()
language_info_dict['qiang'] = qiang.langInfo()
language_info_dict['suz'] = sunuwar.langInfo()


# English name, language code, name in the language.
LanguageList = [
#    (u'A\u1e49angu Yol\u014bu', 'en_anangu', 'Aṉangu-Yolngu'),
    ('Ahom', 'aho'),
    ('Assamese', 'as'),
#    ('Bamum', 'bax'),
    (u'Bété', 'bete'),
#    ('Batak Sinalungun', 'bts'),
    ('Chakma', 'ccp', '𑄌𑄋𑄴𑄟𑄳𑄦'),
    # ('Gondi', 'gon', 'Gōndi family'),
    # ('Gondi Northern (Gunjala)', 'gno', 'Northern Gōndi (Gunjala)'),
    # ('Gondi Aheri (Masaram)', 'esg', 'Aheri Gōndi Masaram'),
    # ('Igbo Nsibidi', 'ig'),
    # ('Nyaikeng Puachue Hmong', 'Igbo Nsibidi'),
    ('Cherokee', 'chr', 'ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ'),
    # ('Hoocąk (Ho-chunk)', 'win', 'Hoocąk'),
    # ('Laz', 'lzz'),
    # ('Makah', 'myh'),
    # ('Menoninee', 'mez', 'Oma͞eqnomenew'),
    # ('Mende', 'men', 'Mɛnde yia'),
    # ('Mingrelian', 'xmf'),
    # ('Kuṛmāli / Kudmali', 'kyw'),
    # ('Tai Yo', 'tyj'),
    # # ('Myanmar', 'my', 'မြန်မာဘာသာ'),
    # # ('Navajo', 'nv', 'Diné bizaad'),
    # ('Oneida', 'one', 'Onʌyoteʔa·ká·'),
    ('Otomanguean phonetic', 'omq'),
    ('Qiang', 'qiang'),
    # ('Rohingya', 'rhg', ),
    # ('Tamashek', 'tmh', 'ⵜⴰⵎⴰⵌⴰⵆ'),
    ('Tai Phake', 'phk'),
    # ('Tangsa', 'nst', 'Tangsa'),
    # ('Tibetan', 'bod'),
    # ('Wolof', 'wo'),
    # ('Bangali', 'bn'),
    # ('Bassa', 'bsq'),
    # ('Choctaw', 'cho'),
    ('Cree', 'cr'),
    # ('Lenape', 'del'),
    # ('Ho', 'hoc'),
    # ('Igbo', 'ig'),
    # ('Kaingang', 'kgp'),
    # ('Kpelle', 'kpe'),
    # ('Loma', 'lom'),
    # ('Tai Viet script', 'tavt'),
    # ('Karen', 'ksw'),
    # ('Lampung', 'lampung'),
    # ('Lepcha', 'lep'),
    # ('Mongolian', 'mn'),
    ('Mende Kikakui', 'men'),
    # ('Wancho', 'nnp'),
    # ('Ojibwe', 'oj'),
    # ('Nyiakeng Puachue Hmong', 'hnj'),
    # ('Nigerian Pidgin', 'pcm'),
    # ('Kinyarwanda', 'rw'),
    # ('Shan', 'shn', 'လိၵ်ႈတႆ'),
    # ('Sora', 'srb'),
    # ('Tulu', 'tcy'),
    # ('Tongan', 'to'),
    ('Sunuwar', 'suz'),
    # ('Mundari', 'unr'),
    # ('Yoruba', 'yo'),
    # ('Zaghawa', 'zag'),
    # ('Burmese', 'my'),
    # ('Elfdalian', 'ovd', 'övdalsk'),  # Added 9-Nov-2021
    # ('Blackfoot', 'bla', 'ᓱᖽᐧᖿ'),  # Added 10-Nov-2021
    # ('Tamil', 'ta', 'தமிழ்'),
    # ('Santali', 'sat', 'ᱥᱟᱱᱛᱟᱲᱤ'),
    # ('Meitei (Manipuri)', 'mni', 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ'),
#    ('Aiton', 'aio', '(တႝ)ဢႝတွꩫ်'),
    ('Khamti', 'kht', '(တဲး)ၵမ်းတီ'),
    # ('Kalabari', 'ijn'),
    # ('Mru', 'mro'),
    # ('Sylheti', 'syl'),
    # ('Fulfulde', 'ff'),
    # ('Rhade', 'rad', 'klei Êđê'),
    # ('Mahasu', 'bfz'),
    # ('Vietnamese', 'vn', 'tiếng Việt'),
    # ('Inupiaq', 'ik', 'Iñupiaq'),
    # ('Lakota', 'lkt', 'Lakȟótiyapi'),
    # ('Kihunde', 'hke'),
    # ('Comanche', 'com', 'Nʉmʉ Tekwapʉ'),
    # ('Kurmanji Yezidi', 'ku'),
]


def getLangInfo(langcode):
    if langcode not in language_info_dict:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    return language_info_dict[langcode]
    

@app.route('/')
def MainHandler():
    return  render_template(
        'languagetools.html',
        langlist = sorted(LanguageList, key=lambda lang: lang[0])
        )


@app.route('/langbase/<langcode>/')
def topLangHandler(langcode):
    # Put up starting page for this language

    # Get the language info
    if langcode not in language_info_dict:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    langInfo = language_info_dict[langcode]

    try:
        encoded_ranges = langInfo.encoded_ranges
    except:
        encoded_ranges = None
        
    try:
        allFonts = langInfo.allFonts
    except:
        allFonts = True

    try:
      text_direction = langInfo.direction
    except AttributeError:
      text_direction = 'ltr'
    logging.warning('####### Direction = %s', text_direction)

    return render_template('demo_general.html',
                           langTag = langcode,
                           direction = text_direction,
                           language = langInfo.Language,
                           font_list = langInfo.unicode_font_list,
                           kb_list = langInfo.kb_list,
                           # Fill in other things here
                           encoded_ranges = encoded_ranges,
                           lang_list = langInfo.lang_list,
                           langInfo = langInfo,
                           links = langInfo.links,
                           allFonts = allFonts,
                           test_data = '',
    )
    
@app.route('/downloads/<langcode>')
def downloadsHandler(langcode):
    # Show downloads for this language code.
    if langcode not in language_info_dict:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    langInfo = language_info_dict[langcode]
    
    public_unicode_fonts = []
    try:
        public_unicode_fonts = langInfo.public_font_resources
    except:
        public_unicode_fonts = langInfo.unicode_font_list

    try:
        text_file_list = langInfo.text_file_list
    except:
        text_file_list = None

    return render_template(
        'downloads.html',
        language = langInfo.Language,
        language_native = langInfo.Language_native,
        unicode_font_list = public_unicode_fonts,
        file_list = text_file_list,
        showTools = True   # Make an optional parameter
    )

@app.route('/convert/<langcode>')
def convertHandler(langcode):
    # Show downloads for this language code.
    langInfo = getLangInfo(langcode)
    
    if not langInfo:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    try:
      converters = langInfo.converters
    except:
      converters = None

    font = None
    
    try:
        text_direction = langInfo.direction
    except AttributeError:
        # Default
        text_direction = 'ltr'
    
    # Needed?
    oldChars = ''
    oldInput = ''
    # Handle non-Unicode output.
    try:
      output_font = langInfo.outputFont
    except:
      output_font = 'Unicode'
    text = ''

    try:
      encodingList = langInfo.encoding_font_list
    except:
      encodingList = None
    
    try:
      unicodeChars = langInfo.unicodeChars
    except:
      unicodeChars = None

    try:
      variation_sequence = langInfo.variation_sequence
    except:
      variation_sequence = None

    try:
      testStringList = langInfo.testStringList
    except:
      testStringList = [
        {'name': 'Test 1', # Note: must escape the single quote.
         'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
         '\u000a\u000b'},
      ]
      
    showTools = False
    
    try:
      unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
      unicodeCombiningChars = None
    
    return render_template(
        'translit_general.html',
        converters = converters,
        isTransLit = False,
        font = font,
        language = langInfo.Language,
        langTag = langInfo.LanguageCode,
        encodingList = encodingList,
        lang_list = langInfo.lang_list,
        kb_list = langInfo.kb_list,
        direction = text_direction,
        unicodeFonts = langInfo.unicode_font_list,
        links = langInfo.links,
        oldChars = oldChars,
        oldInput = oldInput,
        outputFont = output_font,
        text = text,
        textStrings = testStringList,
        showTools = showTools,
        unicodeChars = unicodeChars,
        combiningChars = unicodeCombiningChars,
        variation_sequence = variation_sequence
    )

@app.route('/kbtransforms/<langcode>')
def kbtransformstHandler(langcode):

    langInfo = getLangInfo(langcode)
    
    if not langInfo:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    try:
        converter_list = langInfo.converters
    except:
        converter_list = None

    try:
        text_functions = langInfo.text_functions
    except:
        text_functions = None

    try:
        showTools = request.args('tools', None)
    except:
        showTools = False

    return render_template(
        'kbTransforms2.html',
        converterJS = '/js/' + langInfo.LanguageCode + 'Converter.js',
        converter_list = converter_list,
        language = langInfo.Language,
        lang_list = langInfo.lang_list,
        encoding_list = langInfo.encoding_font_list,
        unicode_list = langInfo.unicode_font_list,
        kb_list = langInfo.kb_list,
        links = langInfo.links,
        showTools = showTools,
        text_functions = text_functions
    )

@app.route('/allFonts/<langcode>')
def allFonts(langcode):

    langInfo = getLangInfo(langcode)

    # Text from the args
    utext = request.args['utext']
    try:
        encoded_text = request.args['encodedText']
    except:
        encoded_text = None

    try:
        unicode_fonts = langInfo.unicode_font_list
    except:
        unicode_fonts = []

    return render_template(
        'allFonts.html',
        scriptName = langInfo.Language,
        fontFamilies = unicode_fonts,
        encodedText = encoded_text,
        utext = utext,
        language = langInfo.Language,
        LanguageTag = langInfo.LanguageCode,
        kb_list = langInfo.kb_list
    )
                  
@app.route('/encodingRules/<langcode>')
def encodingRules(langcode):

    langInfo = getLangInfo(langcode)

    try:
      encoding_tables = langInfo.encoding_tables
    except:
      encoding_tables = None

    try:
        converter_list = langInfo.converters
    except:
        converter_list = None
    try:
        conversion_data = langInfo.conversion_data
    except:
        conversion_data = None

    try:
        variation_sequence = langInfo.variation_sequence
    except:
        variation_sequence = None

    converterJS = '/static/js/' + langInfo.LanguageCode + 'Converter.js'
    
    return render_template(
        'encodingConvert.html',
        converter_list = converter_list,
        converterJS = converterJS,
        conversion_data = conversion_data,
        language = langInfo.Language,
        lang_list = langInfo.lang_list,
        encoding_list = langInfo.encoding_font_list,
        encoding_tables = encoding_tables,
        unicode_list = langInfo.unicode_font_list,
        kb_list = langInfo.kb_list,
        links = langInfo.links,
        showTools = False,
        variation_sequence = variation_sequence
    )

@app.route('/diacritic/<langcode>')
def diacritics(langcode):

    langInfo = getLangInfo(langcode)
    
    try:
        base_num = request.args['base']
        base_char = unichr(int(base_num, base=16))
    except:
        base_char = langInfo.base_consonant

    # Generate combinations of base + diacritic pairs
    combos = []
    table = []
    row_names = []
    for x in langInfo.diacritic_list:
        if len(x) > 1:
            utf32 = surrogate_to_utf32(ord(x[0]), ord(x[1]))
            row = ['%s (0x%x)' % (x, utf32)]
        else:
            row = [x + ' (%4x)' % ord(x)]
        row_names.append(row[0])
        for y in langInfo.diacritic_list:
            text = base_char + x + y
            combos.append({'text': text,
                           'codes': ['%4x ' % ord(c) for c in text]})
            row.append(text)
        table.append(row)

    try:
        text_direction = langInfo.direction
    except AttributeError:
        text_direction = 'ltr'

    try:
        showTools = request.args['tools']
    except:
        showTools = False

    return render_template(
        'diacritics.html',
        direction = text_direction,
        language = langInfo.Language,
        base_char = base_char.encode('utf-8'),
        base_hex = ['%4x' % ord(x) for x in langInfo.base_consonant],
        diacritics = [x for x in langInfo.diacritic_list],
        diacritics_hex = row_names,  # ['%4x ' % ord(y) for y in langInfo.diacritic_list],
        combinations = combos,
        showTools = showTools,
        table = table,
        unicode_font_list = langInfo.unicode_font_list,
    )

@app.route('/phonetickb/<langcode>')
def phonetic_kb(langcode):
    langInfo = getLangInfo(langcode)

    try:
        converter_list = langInfo.converters
    except:
        converter_list = None

    try:
        text_functions = langInfo.text_functions
    except:
        text_functions = None

    try:
        showTools = request.args['tools']
    except:
        showTools = False

    try:
        unicode_info = unicodeinfo.UnicodeData(langInfo.unicode_database)
        unicode_data = unicode_info.numTextString()
    except BaseException as err:
        print('unicodeinfo not read: %s' % err)
        unicode_data = ''
        
    return render_template(
        'phoneticTable.html',
        converterJS = '/js/' + langInfo.LanguageCode + 'Converter.js',
        converter_list = converter_list,
        language = langInfo.Language,
        lang_list = langInfo.lang_list,
        encoding_list = langInfo.encoding_font_list,
        unicode_list = langInfo.unicode_font_list,
        kb_list = langInfo.kb_list,
        links = langInfo.links,
        showTools = showTools,
        text_functions = text_functions,
        unicode_data = unicode_data,        
        )


@app.route('/checkconversion/<langcode>')
def check_conversion(langcode):
    langInfo = getLangInfo(langcode)

    if not langInfo:
        return render_template(
            'language_not_defined.html',
            langcode = langcode
        )

    try:
      converters = langInfo.converters
    except:
      converters = None

    font = None
    
    try:
        text_direction = langInfo.direction
    except AttributeError:
        # Default
        text_direction = 'ltr'
    
    # Special for Assamese
    raw_data = English_Assamese.en_as_raw_data

    
    # Needed?
    oldChars = ''
    oldInput = ''
    # Handle non-Unicode output.
    try:
      output_font = langInfo.outputFont
    except:
      output_font = 'Unicode'
    text = ''

    try:
      encodingList = langInfo.encoding_font_list
    except:
      encodingList = None
    
    try:
      unicodeChars = langInfo.unicodeChars
    except:
      unicodeChars = None

    try:
      variation_sequence = langInfo.variation_sequence
    except:
      variation_sequence = None

    try:
      testStringList = langInfo.testStringList
    except:
      testStringList = [
        {'name': 'Test 1', # Note: must escape the single quote.
         'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
         '\u000a\u000b'},
      ]
      
    showTools = False
    
    try:
      unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
      unicodeCombiningChars = None

      # Get the Assamese conversion data

      return render_template(
        'translit_assamese.html',
        converters = converters,
        isTransLit = False,
        font = font,
        language = langInfo.Language,
        langTag = langInfo.LanguageCode,
        encodingList = encodingList,
        lang_list = langInfo.lang_list,
        kb_list = langInfo.kb_list,
        direction = text_direction,
        unicodeFonts = langInfo.unicode_font_list,
        links = langInfo.links,
        oldChars = oldChars,
        oldInput = oldInput,
        outputFont = output_font,
        text = text,
        textStrings = testStringList,
        showTools = showTools,
        unicodeChars = unicodeChars,
        combiningChars = unicodeCombiningChars,
          variation_sequence = variation_sequence,
          en_as_raw = raw_data
    )


# class DownloadKBText(webapp2.RequestHandler):
#     def get(self):
#         infile = self.request.get("infile", "")
#         outfile = self.request.get("outfile", "")
#         template_values = {
#           'infile': infile,
#           'outfile': outfile,
#         }
#         path = os.path.join(os.path.dirname(__file__), 'HTML/keyboardTemplate.html')

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True, threaded=True)
# [END gae_python37_app]

