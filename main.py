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

import html
import json
import logging
import os
import sys

# Start importing language stuff. This will be replaced by database eventually.
import ahom
import aiton
import assamese
import bete
import chakma
import cherokee
import chochenyo
import cree
import fulfulde
import gurung
import khamti
import kpelle
import lepcha
import mendekikakui
import mundari
import omq
import phake
import qiang
import shan
import sunuwar
import singpho
import tangsa
import taivietscript
import taiyo
import tulu

from  wordsearch import generateDFSWordSearch
from  wordsearch import WordSearch

# Special for Assames checking.
import English_Assamese
import preconverted_assamese
import good_results_sgp

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

# Dictionary of language data
language_info_dict = {
    }

# Add in languages as we get them ready
language_info_dict['aho'] = ahom.langInfo()
language_info_dict['aio'] = aiton.langInfo()
language_info_dict['as'] = assamese.langInfo()
language_info_dict['asm'] = assamese.langInfo()
language_info_dict['bete'] = bete.langInfo()
language_info_dict['ccp'] = chakma.langInfo()
language_info_dict['chr'] = cherokee.langInfo()
language_info_dict['cr'] = cree.langInfo()
language_info_dict['cst'] = chochenyo.langInfo()
language_info_dict['ff'] = fulfulde.langInfo()
language_info_dict['gvr'] = gurung.langInfo()
language_info_dict['kht'] =  khamti.langInfo()
language_info_dict['kpe'] = kpelle.langInfo()
language_info_dict['lep'] = lepcha.langInfo()
language_info_dict['men'] =  mendekikakui.langInfo()
language_info_dict['nst'] = tangsa.langInfo()
language_info_dict['omq'] = omq.langInfo()
language_info_dict['phk'] = phake.langInfo()
language_info_dict['qiang'] = qiang.langInfo()
language_info_dict['sgp'] = singpho.langInfo()
language_info_dict['shn'] = shan.langInfo()
language_info_dict['suz'] = sunuwar.langInfo()
language_info_dict['tavt'] = taivietscript.langInfo()
language_info_dict['tcy'] = tulu.langInfo()
language_info_dict['tyj'] = taiyo.langInfo()
language_info_dict['unr'] = mundari.langInfo()


# English name, language code, name in the language.
LanguageList = [
#    (u'A\u1e49angu Yol\u014bu', 'en_anangu', 'Aṉangu-Yolngu'),
    ('Ahom', 'aho'),
    ('Assamese', 'as'),
#    ('Bamum', 'bax'),
    (u'Bété', 'bete'),
#    ('Batak Sinalungun', 'bts'),
    ('Chakma', 'ccp', '𑄌𑄋𑄴𑄟𑄳𑄦'),
    ('Chochenyo', 'cst'),
    ('Gurung', 'gvr'),
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
    ('Tai Yo', 'tyj'),
    # # ('Myanmar', 'my', 'မြန်မာဘာသာ'),
    # # ('Navajo', 'nv', 'Diné bizaad'),
    # ('Oneida', 'one', 'Onʌyoteʔa·ká·'),
    ('Otomanguean phonetic', 'omq'),
    ('Qiang', 'qiang'),
    # ('Rohingya', 'rhg', ),
    ('Singpho', 'sgp'),
    # ('Tamashek', 'tmh', 'ⵜⴰⵎⴰⵌⴰⵆ'),
    ('Tai Phake', 'phk'),
    ('Tangsa', 'nst', 'Tangsa'),
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
    ('Kpelle', 'kpe'),
    # ('Loma', 'lom'),
    ('Tai Viet script', 'tavt'),
    # ('Karen', 'ksw'),
    # ('Lampung', 'lampung'),
    ('Lepcha', 'lep'),
    # ('Mongolian', 'mn'),
    ('Mende Kikakui', 'men'),
    # ('Wancho', 'nnp'),
    # ('Ojibwe', 'oj'),
    # ('Nyiakeng Puachue Hmong', 'hnj'),
    # ('Nigerian Pidgin', 'pcm'),
    # ('Kinyarwanda', 'rw'),
    ('Shan', 'shn', 'လိၵ်ႈတႆ'),
    # ('Sora', 'srb'),
    ('Tulu', 'tcy'),
    # ('Tongan', 'to'),
    ('Sunuwar', 'suz'),
    ('Mundari', 'unr'),
    # ('Yoruba', 'yo'),
    # ('Zaghawa', 'zag'),
    # ('Burmese', 'my'),
    # ('Elfdalian', 'ovd', 'övdalsk'),  # Added 9-Nov-2021
    # ('Blackfoot', 'bla', 'ᓱᖽᐧᖿ'),  # Added 10-Nov-2021
    # ('Tamil', 'ta', 'தமிழ்'),
    # ('Santali', 'sat', 'ᱥᱟᱱᱛᱟᱲᱤ'),
    # ('Meitei (Manipuri)', 'mni', 'ꯃꯤꯇꯩ ꯃꯌꯦꯛ'),
    ('Aiton', 'aio', '(တႝ)ဢႝတွꩫ်'),
    ('Khamti', 'kht', '(တဲး)ၵမ်းတီ'),
    # ('Kalabari', 'ijn'),
    # ('Mru', 'mro'),
    # ('Sylheti', 'syl'),
   ('Pular / Fulfulde', 'ff'),
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
    logger.warning('####### Direction = %s', text_direction)

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
        showTools = request.args['tools']
    except:
        showTools = None

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

    # Old text for testing
    text = ''
    try:
        text = html.unescape(langInfo.encoding_chars)
    except:
        # TODO: Get encodedRanges
        pass

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

    grapheme_boundary_char = ''
    try:
      grapheme_boundaries = langInfo.grapheme_boundaries
      grapheme_boundary_char = langInfo.grapheme_boundary_char
    except:
      grapheme_boundaries = None

    try:
      testStringList = langInfo.testStringList
    except:
      testStringList = [
        {'name': 'Test 1', # Note: must escape the single quote.
         'string': u'\u0004\u0005\u0006\u0007\u0008\u0009' +
         '\u000a\u000b'},
      ]

    convert_word_tool = False
    try:
        convert_word_tool = langInfo.convert_word
    except:
        logger.warning("Cannot get convert_word_tool")
        pass

    try:
      unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
      unicodeCombiningChars = None

    try:
      unicodeCombiningChars = getCombiningCombos(
        langInfo.baseHexUTF16, langInfo.diacritic_list)
    except:
      unicodeCombiningChars = None

    preconverted_data = None
    try:
        preconverted_data = langInfo.preconverted_data
    except:
        preconverted_data = None

    try:
        good_results = langInfo.good_results
    except:
        good_results = None
        
    try:
        encodingLanguage = langInfo.encodingLanguage
    except:
        encodingLanguage = langInfo.Language

    return render_template(
        'translit_general.html',
        combiningChars = unicodeCombiningChars,
        convert_word_tool=convert_word_tool,
        direction = text_direction,
        encodingLanguage = encodingLanguage,
        encodingList = encodingList,
        font = font,
        good_results=good_results,
        grapheme_boundaries=grapheme_boundaries,
        grapheme_boundary_char=grapheme_boundary_char,
        isTransLit = False,
        kb_list = langInfo.kb_list,
        langTag = langInfo.LanguageCode,
        lang_list = langInfo.lang_list,
        language = langInfo.Language,
        links = langInfo.links,
        oldChars = oldChars,
        oldInput = oldInput,
        outputFont = output_font,
        preconverted_data=preconverted_data,
        showTools = showTools,
        text = text,
        textStrings = testStringList,
        unicodeChars = unicodeChars,
        unicodeFonts = langInfo.unicode_font_list,
        variation_sequence = variation_sequence,
        converters = converters,
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
        showTools = request.args['tools']
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

    try:
        conversionLanguage = langInfo.encodingLanguage
    except:
        conversionLanguage = langInfo.Language
        

    return render_template(
        'encodingConvert.html',
        converter_list = converter_list,
        converterJS = converterJS,
        conversion_data = conversion_data,
        conversion_language = conversionLanguage,
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

@app.route('/conjunct/<langcode>')
def conjuncts(langcode):

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
    try:
        base_chars = langInfo.baseChars
    except:
        base_chars = []


    try:
        conjunct = langInfo.conjunct_char
    except:
        conjunct = ''

    for x in base_chars:
        if len(x) > 1:
            utf32 = surrogate_to_utf32(ord(x[0]), ord(x[1]))
            row = ['%s (0x%x)' % (x, utf32)]
        else:
            row = [x + ' (%4x)' % ord(x)]
        row_names.append(row[0])
        for y in base_chars:
            text = x + conjunct + y
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
        'conjuncts.html',
        direction = text_direction,
        language = langInfo.Language,
        base_chars=base_chars,
        base_hex = ['%4x' % ord(x) for x in base_chars],
        conjunct_char=conjunct,
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
        logger.warning('unicodeinfo not read: %s' % err)
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
        encodingLanguage = langInfo.encodingLanguage,
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

  
@app.route('/save_converted_values/', methods=['GET', 'POST'])
def saveConvertedValues():

    converted_values = {}
    if request.method == 'POST':
        langTag = request.form['langTag']
        json_converted = request.form['json_converted']
        converted_values = json.loads(json_converted)
    else:
        langTag = request.args.get('langTag')
        json_converted = request.args.get('json_converted')
        converted_values = json.loads(json_converted)

    # TODO: put these in the database
    # Send back the count of those found
    if len(converted_values) > 0:
        return '%s values received at server' % len(converted_values)
    else:
        return ''


@app.route('/convertedlist/<langcode>')
def convertedlist(langcode):
    langInfo = getLangInfo(langcode)
    encodingList = langInfo.encoding_font_list

    return render_template('conversionList.html',
                           converters=langInfo.converters,
                           conversion_language=langInfo.conversionLanguage,
                           convert_word_tool=langInfo.convert_word_tool,
                           direction=langInfo.text_direction,
                           encodingLanguage=langInfo.encodingLanguage,
                           encoding_list=langInfo.encoding_font_list,
                           good_results=langInfo.good_results,
                           kb_list=langInfo.kb_list,
                           langTag=langInfo.LanguageCode,
                           lang_list=langInfo.lang_list,
                           language=langInfo.Language,
                           links=langInfo.links,
                           preconverted_data=langInfo.preconverted_data,
                           unicode_list=langInfo.unicode_font_list,
                           )


@app.route('/wordsearch/<langcode>/')
def wordsearch(langcode):
    langInfo = getLangInfo(langcode)

    testGridSize = 1.4
    testData = ''
    try:
        testData = request.args['testData']
    except:
        testData = ''

    charNames = None

    try:
      combiningChars = langInfo.unicodeCombiningChars
    except:
      combiningChars = None

    try:
      letterFillList = langInfo.fillChars
    except:
      letterFillList = []
    fillers = '||'.join(letterFillList)

    combiners = '||'.join(langInfo.unicodeCombiningChars)
    
    try:
        direction = langInfo.direction
    except:
        direction = 'ltr'

    return render_template('wordsearch.html',
                           language=langInfo.Language,
                           languageTag=langInfo.LanguageCode,
                           kb_list = langInfo.kb_list,
                           charTable=charNames,
                           charNameData= charNames,
                           unicodeCombiningChars= combiners,
                           letterFillList= fillers,
                           unicode_font_list= langInfo.unicode_font_list,
                           testData= testData,
                           testGridSize= testGridSize,
                           text_direction=direction,
    )


@app.route('/games/generatewordsearchDFS/')
def generatewordsearch():
    if request.method == 'POST':
        langTag = request.form['langTag']
    else:
        langTag = request.args.get('langTag')
    logger.info('GENERATEWORDSEARCH: %s', langTag)
    
    langInfo = getLangInfo(langTag)

    rawWordList = request.args.get('words', '')

    # Suggested size for the grid
    raw_size = request.args.get('size', '0')
    logger.debug('games WordSearchHandler raw_size = >%s<' % raw_size)
    if not raw_size or raw_size == '' or raw_size == ' ':
      grid_width = 0
    else:
      grid_width = int(raw_size)

    grid_directions = request.args.get('grid_directions', 'all')
    logger.debug('MAIN: Set grid_directions: %s', grid_directions)

    # A measure of when to quit the search
    max_tries =  request.args.get('max_tries', 1000)
    # How many solutions to generated
    max_solution_count =  request.args.get('max_solution_count', 1)
 
    logger.info('games WordSearchHandler langTag = %s', langTag)
    logger.debug('games WordSearchHandler rawWordList = %s', rawWordList)
    logger.debug('games WordSearchHandler max_tries = %s', max_tries)
    logger.debug('games WordSearchHandler grid_width = %s', grid_width)
    logger.debug('games WordSearchHandler max_solution_count = %s',
                 max_solution_count)
    logger.debug('games WordSearchHandler grid_directions = %s',
                 grid_directions)

    # Strip out white space.
    wordList = rawWordList.replace(",", " ").replace("\r", " ").replace("\t", " ").split()

    logger.info('games WordSearchDFS Handler size = %s' % grid_width)

    try:
        fill_list = language_info_dic[langTag].fillChars
    except:
        try:
            fill_list = request.args.get('fillList').split('||')
        except:
            fill_list = langInfo.unicodeChars

    try:
        diacritics = language_info_dict[langTag],diacritic_list
    except:
        try:
            diacritics = request.args.get('diacritics').split('||')
        except:
            diacritics = []

    logger.debug('Calling DFS WordSearch (%s) with %s', langTag, wordList)
    logger.debug('BEFORE DFS WordSearch (%s) with direction option %s',
                 langTag, grid_directions)
    ws = generateDFSWordSearch(wordList, fill_list, diacritics,
                               grid_width, max_tries, max_solution_count,
                               lang_code=langTag,
                               direction_option=grid_directions)
    logger.debug('After DFS WordSearch (%s) with direction option %s',
                 langTag, ws.direction_option)

    return_json = {
        'language': langTag,
        #'fontFamilies': main.OsageFonts,
        'grid': ws.grid,
        'answers': ws.formatAnswers(),
        'words': ws.words,
        'grid_width': ws.size,
        'maxunicode': sys.maxunicode,
        'grid_direction': ws.direction_option,
        'iterations': ws.iterations,
        'backtracks': ws.backtracks,
        'failed_inserts': ws.failed_inserts,
    }
        
    return json.dumps(return_json)



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
    app.run(host='127.0.0.1',
            port=8083, debug=True, threaded=True)
# [END gae_python37_app]



