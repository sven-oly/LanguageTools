# -*- coding: utf-8 -*-
# Generate the PUA codes for the Kikakui syllables

import sys

consonants = [
    'p', 'w', 'mb', 'b', 'kp', 'gb','f', 'v', 't', 'l', 'nd', 'd',
    's', 'j', 'nj', 'y', 'ŋg', 'g', 'k', 'h', '']

nasal_consonants = [
    'h\u0303', 'm', 'n', 'ny', 'ŋ', '']

vowels = [
    'i', 'ii', 'iii', 'I', 'II'
    'a', 'aa', 'aaa', 'A', 'AA',
    'u', 'uu', 'uuu', 'U', 'UU',
    'e', 'ee', 'eee', 'E', 'EE',
    'ɛ', 'ɛɛ', 'ɛɛɛ', 'Ɛ', 'ƐƐ',
    'ɔ', 'ɔɔ', 'ɔɔɔ', 'Ɔ', 'ƆƆ',
    'o', 'oo', 'ooo', 'O', 'OO'
]

nasal_vowels = [
    'ĩ', 'ĩĩ',
    'ã', 'ãã',
    'ũ', 'ũũ',
    'ẽ', 'ẽẽ',
    'ɛ\u0303', 'ɛ\u0303ɛ\u0303',
    'ɔ\u0303', 'ɔ\u0303ɔ\u0303'
]

first_codes = {
    'p': '\ue000',
    'w': '\ue00f',
    'mb': '\ue025',
    'b': '\ue03b',
    'kp': '\ue049',
    'gb': '\ue056',
    'f': '\ue061',
    'v': '\ue06c',
    't': '\ue079',
    'l': '\ue086',
    'nd': '\ue09a',
    'd': '\ue0a9',
    's': '\ue0b4',
    'j': '\ue0c2',
    'nj': '\ue0cf',
    'y': '\ue0da',
    'ŋg': '\ue0e6',
    'g': '\ue0f6',
    'k': '\ue109',
    'h': '\ue117',
    '': '\ue127',
    }

nasal_firsts = {
    'h\u0303': '\ue134',
    'm': '\ue140',
    'n': '\ue149',
    'ny': '\ue150',
    'ŋ': '\ue158',
    '': '\ue15d'
}

def make_combos(consonants, vowels, firsts):
    # Create combo lines of each consonant and vowels with the starting value
    for c in consonants:
        first = firsts[c]
        fc = ord(first)
        for v in vowels:
            print("\t\'%s%s\': \'\\%04x\'," % (c, v, fc))


def main(args):
    make_combos(consonants, vowels, first_codes)
    make_combos(nasal_consonants, nasal_vowels, nasal_firsts)


if __name__ == '__main__':
    main(sys.argv)
            
               
               
                
