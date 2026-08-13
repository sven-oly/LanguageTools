#!/usr/bin/python3
# -*- coding: utf-8 -*-

import logging
import re
import sys

import grapheme

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Preprocess strings for inserting into word search depending on
# the language code

def insert_with_space(m):
    try:
        return '|' + m.group(1) + '|'
    except AttributeError:
        return m.string


def reverse_with_spaces(m):
    return m.group(2) + m.group(1)


def combine_codes(m):
    return m.group(1) + m.group(2)


def combine_codes_marked(m):
    return '|' + m.group(1) + m.group(2)


class word_search_strings:

    def __init__(self, lang_code=None):
        self.lang_code = lang_code

        self.move_before_consonants = re.compile(
            r'([\u1000-\u1020\u1075-\u1080\uaa60-\uaa7a]\ufe00*)([\u1031\u103c\u1084]\ufe00*)')
        self.reunite_fe00 = re.compile(r'(.)\|(\ufe00)')
        self.kill_combos = re.compile(r'(\u103a)\|([\u1036\u103d\u105e])')
        self.u102d_combos = re.compile(r'(\u102d)\|([u102f])')
        self.u103d_combos = re.compile(r'(\u103d)\|([\u102f\u109d])')
        self.killer_consonant_combos = re.compile(
            r'([\u1000-\u1020\u1075-\u1080\uaa60-\uaa7a]\ufe00*)\|(\u103a)')

        return

    def word_parse(self, input_string, lang_code=None):
        logger.debug('word_parse( %s): %s', input_string, lang_code)

        if lang_code == 'phk' or lang_code == 'kht':
            return self.tai_script_parse(input_string)
        else:
            lower_case_word = input_string.lower()
            graphemes_in_word = grapheme.graphemes(lower_case_word)
            return list(graphemes_in_word)

    def tai_script_parse(self, input_string):
        # First, move some things before vowels
        fix1 = re.sub(self.move_before_consonants, reverse_with_spaces, input_string)
        # Next, split into code points and create a string with "|" between these
        fix2 = list(fix1)
        fix3 = '|'.join(fix2)
        # Now, start joining things.
        # Combine code points U+FE00
        fix4 = re.sub(self.reunite_fe00, combine_codes, fix3)
        # Combine killers and others
        fix5 = re.sub(self.kill_combos, combine_codes_marked, fix4)

        fix6 = re.sub(self.u102d_combos, combine_codes, fix5)
        fix7 = re.sub(self.u103d_combos, combine_codes, fix6)
        # Combine consonants with remaining killers
        fix8 = re.sub(self.killer_consonant_combos, combine_codes, fix7)

        # Fix double '||'
        fix9 = fix8.replace('||', '|')
        # Split again by '|'
        fixa = fix9.split('|')

        # Are we done?

        return fixa


def test_tai(s):
    tests = [
        '\u1000\ufe00\u103a\u1036',
        '\u1000\ufe00\u102d\uaa6b\ufe00\u103a\u1000',
        '\u1000\ufe00\u103a',
        '\u1000\ufe00\u1031\ufe00',
        '\u1000\ufe00\u103c\u1083',
        '\u1019\ufe00\u103a\u105e',
        '\u1000\ufe00\u103b\u1083',
        '\u1000\ufe00\u103c\u1083',
        '\u1000\ufe00\u1084\u1083',
        '\u1000\ufe00\u105e\u1083',
        '\u1019\ufe00\u102d\u102f\u1004\ufe00\u103a',
    ]

    output = []
    for test in tests:
        ws1 = s.tai_script_parse(test)
        output.append([test, ws1])

    return output


def main(_args):
    s = word_search_strings()
    test_tai(s)


if __name__ == '__main__':
    main(sys.argv)
