# -*- coding: utf-8 -*-
#!/usr/bin/env python

import re

# Convert Osage text to Unicode.

debug = True  #False

accent = u'\u0301'
doubleAccent = u'\u030B'
macron = u"\u0304"
combiningDotAboveRight = u'\u0358'
osageCaseOffset = 40  # Amount to add to get lower case from upper.
firstOsageUpper = 0x104B0
lastOsageUpper = 0x104D3

minOsageU = unichr(0xd801)+unichr(0xdcb0)
maxOsageU = unichr(0xd801)+unichr(0xdcd8)
lowerCaseOffset = 0x28
oldOsageDot = u'\uf02e'

osage_private_use_map = {
  u'\uf020': ' ',
  u'\uf021': '!',
  u'\uf022': unichr(0xd801)+unichr(0xdcc7),
  u'\uf023': '#',
  u'\uf024': '$',
  u'\uf025': '%',
  u'\uf026': '&',
  u'\uf027': "\'",
  u'\uf028': '(',
  u'\uf029': ')',
  u'\uf02a': '*',
  u'\uf02b': '+',
  u'\uf02c': unichr(0xd801)+unichr(0xdcba),
  u'\uf02d': '-',
  u'\uf02e': '.',
  u'\uf02f': unichr(0xd801)+unichr(0xdcbe),
  u'\uf030': '0',
  u'\uf031': '1',
  u'\uf032': '2',
  u'\uf033': '3',
  u'\uf034': '4',
  u'\uf035': '5',
  u'\uf036': '6',
  u'\uf037': '7',
  u'\uf038': '8',
  u'\uf039': '9',
  u'\uf03a': ':',
  u'\uf03b': unichr(0xd801)+unichr(0xdcC6) + unichr(0xd801)+unichr(0xdcBC),  # Character is no longer used.
  u'\uf03c': '<',
  u'\uf03d': '=',
  u'\uf03e': '>',
  u'\uf03f': unichr(0xd801)+unichr(0xdcbe),
  u'\uf040': '@',
  u'\uf041\uf041': unichr(0xd801)+unichr(0xdcb0)+macron,
  u'\uf041^': unichr(0xd801)+unichr(0xdcb0)+combiningDotAboveRight,
  u'\uf041': unichr(0xd801)+unichr(0xdcb0),

  u'\uf041\uf05e': unichr(0xd801)+unichr(0xdcb0)+combiningDotAboveRight,
  u'\uf041\uf059': unichr(0xd801)+unichr(0xdcb1),
  u'\uf042': unichr(0xd801)+unichr(0xdcb4),
  u'\uf043': unichr(0xd801)+unichr(0xdcb5),
  u'\uf044': unichr(0xd801)+unichr(0xdcc8),
  u'\uf045\uf045': unichr(0xd801)+unichr(0xdcb7)+macron,
  u'\uf045^': unichr(0xd801)+unichr(0xdcb7)+combiningDotAboveRight,
  u'\uf045': unichr(0xd801)+unichr(0xdcb7),

  u'\uf045\uf05e': unichr(0xd801)+unichr(0xdcb7)+combiningDotAboveRight,
  u'\uf048': unichr(0xd801)+unichr(0xdcb9),
  # The eh-consonants
  u'\uf048\uf043': unichr(0xd801)+unichr(0xdcb6),
  u'\uf048\uf04b': unichr(0xd801)+unichr(0xdcbd),
  u'\uf048\uf050': unichr(0xd801)+unichr(0xdcc5),
  u'\uf048\uf044': unichr(0xd801)+unichr(0xdcc9),
  u'\uf048\uf05d': unichr(0xd801)+unichr(0xdccb),
  
  u'\uf049': unichr(0xd801)+unichr(0xdcb1),
  u'\uf04a': unichr(0xd801)+unichr(0xdcb3),
  u'\uf04b': unichr(0xd801)+unichr(0xdcbc),
  u'\uf04c': unichr(0xd801)+unichr(0xdcbf),
  u'\uf04d': unichr(0xd801)+unichr(0xdcc0),
  u'\uf04e': unichr(0xd801)+unichr(0xdcc1),
  u'\uf04f^': unichr(0xd801)+unichr(0xdcc2)+combiningDotAboveRight,
  u'\uf04f\uf04f': unichr(0xd801)+unichr(0xdcc2)+macron,
  u'\uf04f': unichr(0xd801)+unichr(0xdcc2),
  u'\uf04f\uf05e': unichr(0xd801)+unichr(0xdcc2)+combiningDotAboveRight,
  u'\uf050': unichr(0xd801)+unichr(0xdcc4),
  u'\uf051': ' ',  # Space characters
  u'\uf052': ' ',
  u'\uf053': unichr(0xd801)+unichr(0xdcc6),
  u'\uf054': unichr(0xd801)+unichr(0xdccd),
  u'\uf055\uf055': unichr(0xd801)+unichr(0xdcce)+macron,
  u'\uf055': unichr(0xd801)+unichr(0xdcce),
  u'\uf055\uf05e': unichr(0xd801)+unichr(0xdcce)+combiningDotAboveRight,
  u'\uf056': unichr(0xd801)+unichr(0xdcc7),
  u'\uf057': unichr(0xd801)+unichr(0xdccf),
  u'\uf058': unichr(0xd801)+unichr(0xdcd0),
  u'\uf059\uf059': unichr(0xd801)+unichr(0xdcbb)+macron,
  u'\uf059': unichr(0xd801)+unichr(0xdcbb),
  u'\uf059^': unichr(0xd801)+unichr(0xdcbb)+combiningDotAboveRight,
  u'\uf059\uf059': unichr(0xd801)+unichr(0xdcbb)+macron,
  u'\uf059\uf05e': unichr(0xd801)+unichr(0xdcbb)+combiningDotAboveRight,
  u'\uf05a': unichr(0xd801)+unichr(0xdcd2),  # ??
  u'\uf05b': unichr(0xd801)+unichr(0xdcd3),  # ??
  u'\uf05c': unichr(0xd801)+unichr(0xdcc6) + unichr(0xd801)+unichr(0xdcc8),  # Character is no longer used.
  u'\uf05d': unichr(0xd801)+unichr(0xdcca),  # ??],
  u'\uf05e': '^',  # '^',
  u'\uf05f': '_',
  u'\uf060': '`',
  u'\uf061': unichr(0xd801)+unichr(0xdcb2),
  u'\uf061\uf061': unichr(0xd801)+unichr(0xdcb2) + macron,
  u'\uf065': unichr(0xd801)+unichr(0xdcb8),
  u'\uf065\uf065': unichr(0xd801)+unichr(0xdcb8) + macron,
  u'\uf06f': unichr(0xd801)+unichr(0xdcc3),
  u'\uf06f\uf06f': unichr(0xd801)+unichr(0xdcc3) + macron,
  u'\uf07b': '{',
  u'\uf07c': '|',
  u'\uf07d': '}',
  u'\uf07e': '~',
  u'\uf0b6': '\u00b6',
  # Some older combination codes
  u'\ue000': unichr(0xd801)+unichr(0xdcb0) + combiningDotAboveRight,
}

osage_latin_to_unicode_map = {
  'á': unichr(0xd801)+unichr(0xdcd8) + accent,
  'a': unichr(0xd801)+unichr(0xdcb2),
  'aa': unichr(0xd801)+unichr(0xdcd8)+macron,
  'aa': unichr(0xd801)+unichr(0xdcd8)+macron,
  'ā': unichr(0xd801)+unichr(0xdcd8)+macron,
  'ą̄': unichr(0xd801)+unichr(0xdcd8)+macron,
  'a\'': unichr(0xd801)+unichr(0xdcd9),
  'b':  unichr(0xd801)+unichr(0xdcdc),
  'br': unichr(0xd801)+unichr(0xdcdc),
  'hc': unichr(0xd801)+unichr(0xdcde),
  'c':  unichr(0xd801)+unichr(0xdcdd),
  'ch': unichr(0xd801)+unichr(0xdcde),
  'd':  unichr(0xd801)+unichr(0xdcf0),
  'é':  unichr(0xd801)+unichr(0xdcdf) + accent,
  'e':  unichr(0xd801)+unichr(0xdcb8),
  'ee': unichr(0xd801)+unichr(0xdcdf)+macron,
  'ē': unichr(0xd801)+unichr(0xdcdf)+macron,
  'eE': unichr(0xd801)+unichr(0xdcdf)+macron,
  'g':  unichr(0xd801)+unichr(0xdcf9),
  'h':  unichr(0xd801)+unichr(0xdce1),
  'hd':  unichr(0xd801)+unichr(0xdcf1),
  'í':  unichr(0xd801)+unichr(0xdce3) + accent,
  'i':  unichr(0xd801)+unichr(0xdcd9),
  'ii': unichr(0xd801)+unichr(0xdcd9)+macron,
  'ī': unichr(0xd801)+unichr(0xdcd9)+macron,
  'iI': unichr(0xd801)+unichr(0xdcd9)+macron,
  'j':  unichr(0xd801)+unichr(0xdcdb),
  'k':  unichr(0xd801)+unichr(0xdce4),
  'hk': unichr(0xd801)+unichr(0xdce5),
  'h]': unichr(0xd801)+unichr(0xdce5),
  'l':  unichr(0xd801)+unichr(0xdce7),
  'm':  unichr(0xd801)+unichr(0xdcf8),
  'n':  unichr(0xd801)+unichr(0xdce9),
  'ó': unichr(0xd801)+unichr(0xdcea) + accent,
  'o': unichr(0xd801)+unichr(0xdcc3),
  'oo': unichr(0xd801)+unichr(0xdcea)+macron,
  'ō': unichr(0xd801)+unichr(0xdcea)+macron,
  'oO': unichr(0xd801)+unichr(0xdcea)+macron,
  'p':  unichr(0xd801)+unichr(0xdcec),
  'hp': unichr(0xd801)+unichr(0xdced),
  's':  unichr(0xd801)+unichr(0xdcee),
  'sh': unichr(0xd801)+unichr(0xdcef),
  't':  unichr(0xd801)+unichr(0xdcf5),
  'ht': unichr(0xd801)+unichr(0xdcf1),
  'ts': unichr(0xd801)+unichr(0xdcf2),
  'ts\'': unichr(0xd801)+unichr(0xdcf4),
  'hts': unichr(0xd801)+unichr(0xdcf3),
  'tsh': unichr(0xd801)+unichr(0xdcf4),
  'ú':  unichr(0xd801)+unichr(0xdcf6) + accent,
  'u':  unichr(0xd801)+unichr(0xdcf6),
  'uh': unichr(0xd801)+unichr(0xdcdb),
  'uH': unichr(0xd801)+unichr(0xdcdb),
  'uH': unichr(0xd801)+unichr(0xdcdb),
  'uhd': unichr(0xd801)+unichr(0xdcf6)+unichr(0xd801)+unichr(0xdcf1),
  'uu': unichr(0xd801)+unichr(0xdcf6)+macron,
  'ū': unichr(0xd801)+unichr(0xdcf6)+macron,
  'uU': unichr(0xd801)+unichr(0xdcf6)+macron,
  'v':  unichr(0xd801)+unichr(0xdcef),
  'w':  unichr(0xd801)+unichr(0xdcf7),
  'x':  unichr(0xd801)+unichr(0xdcf8),
  'y':  unichr(0xd801)+unichr(0xdce3),
  'yy':  unichr(0xd801)+unichr(0xdce3)+macron,
  'yY':  unichr(0xd801)+unichr(0xdce3)+macron,
  'z':  unichr(0xd801)+unichr(0xdcfa),
  'zh': unichr(0xd801)+unichr(0xdcfb),
  # Upper case input.
  'A': unichr(0xd801)+unichr(0xdcb0),
  'Aa': unichr(0xd801)+unichr(0xdcb0)+macron,
  u'\u0100\u0328': unichr(0xd801)+unichr(0xdcb0)+macron,
  'AA': unichr(0xd801)+unichr(0xdcb0)+macron,
  'A\'': unichr(0xd801)+unichr(0xdcb1),
  'Á': unichr(0xd801)+unichr(0xdcb0) + accent,
  'Ā': unichr(0xd801)+unichr(0xdcb0) + macron,
  'B':  unichr(0xd801)+unichr(0xdcb4),
  'Br': unichr(0xd801)+unichr(0xdcb4),
  'BR': unichr(0xd801)+unichr(0xdcb4),
  'Hc':unichr(0xd801)+unichr(0xdcb6),
  'HC':unichr(0xd801)+unichr(0xdcb6),
  'C':  unichr(0xd801)+unichr(0xdcb5),
  'Ch': unichr(0xd801)+unichr(0xdcb6),
  'CH': unichr(0xd801)+unichr(0xdcb6),
  'D':  unichr(0xd801)+unichr(0xdcc8),
  'É':  unichr(0xd801)+unichr(0xdcb7) + accent,
  'E':  unichr(0xd801)+unichr(0xdcb7),
  'Ee': unichr(0xd801)+unichr(0xdcb7)+macron,
  'Ē': unichr(0xd801)+unichr(0xdcb7)+macron,
  'EE': unichr(0xd801)+unichr(0xdcb7)+macron,
  'G':  unichr(0xd801)+unichr(0xdcd1),
  'H':  unichr(0xd801)+unichr(0xdcb9),
  'Hd': unichr(0xd801)+unichr(0xdcf1),
  'HD': unichr(0xd801)+unichr(0xdcc9),
  'H]': unichr(0xd801)+unichr(0xdcc9),
  'HK': unichr(0xd801)+unichr(0xdcc3),
  'Í':  unichr(0xd801)+unichr(0xdcb1) + accent,
  'I':  unichr(0xd801)+unichr(0xdcb1),
  'Ī': unichr(0xd801)+unichr(0xdcb1)+macron,
  'II': unichr(0xd801)+unichr(0xdcb1)+macron,
  'J':  unichr(0xd801)+unichr(0xdcb3),
  'K':  unichr(0xd801)+unichr(0xdcbc),
  'Hk': unichr(0xd801)+unichr(0xdcbd),
  'HK': unichr(0xd801)+unichr(0xdcbd),
  'L':  unichr(0xd801)+unichr(0xdcbf),
  'M':  unichr(0xd801)+unichr(0xdcc0),
  'N':  unichr(0xd801)+unichr(0xdcc1),
  'Ó':  unichr(0xd801)+unichr(0xdcc2) + accent,
  'O':  unichr(0xd801)+unichr(0xdcc2),
  'Ō': unichr(0xd801)+unichr(0xdcc2)+macron,
  'Oo': unichr(0xd801)+unichr(0xdcc2)+macron,
  'OO': unichr(0xd801)+unichr(0xdcc2)+macron,
  'P':  unichr(0xd801)+unichr(0xdcc4),
  'Hp': unichr(0xd801)+unichr(0xdcc5),
  'HP': unichr(0xd801)+unichr(0xdcc5),
  'S':  unichr(0xd801)+unichr(0xdcc6),
  'Sh': unichr(0xd801)+unichr(0xdcc7),
  'SH': unichr(0xd801)+unichr(0xdcc7),
  'T':  unichr(0xd801)+unichr(0xdccd),
  'Ht': unichr(0xd801)+unichr(0xdcc9),
  'HT': unichr(0xd801)+unichr(0xdcc9),
  'Ts': unichr(0xd801)+unichr(0xdcca),
  'TS': unichr(0xd801)+unichr(0xdcca),
  'TS\'': unichr(0xd801)+unichr(0xdccc),
  'Ts\'': unichr(0xd801)+unichr(0xdccc),
  'Hts': unichr(0xd801)+unichr(0xdccb),
  'HTs': unichr(0xd801)+unichr(0xdccb),
  'HTS': unichr(0xd801)+unichr(0xdccb),
  'Tsh': unichr(0xd801)+unichr(0xdccc),
  'TSh': unichr(0xd801)+unichr(0xdccc),
  'TSH': unichr(0xd801)+unichr(0xdccc),
  'Ú':  unichr(0xd801)+unichr(0xdcce) + accent,
  'U':  unichr(0xd801)+unichr(0xdcce),
  'Uh': unichr(0xd801)+unichr(0xdcb3),
  'UH': unichr(0xd801)+unichr(0xdcb3),
  'Uu': unichr(0xd801)+unichr(0xdcce)+macron,
  'Ū': unichr(0xd801)+unichr(0xdcce)+macron,
  'UU': unichr(0xd801)+unichr(0xdcce)+macron,
  'UHD': unichr(0xd801)+unichr(0xdcce)+unichr(0xd801)+unichr(0xdcc9),
  'V':  unichr(0xd801)+unichr(0xdcc7),
  'W':  unichr(0xd801)+unichr(0xdccf),
  'X':  unichr(0xd801)+unichr(0xdcd0),
  'Y':  unichr(0xd801)+unichr(0xdcbb),
  'Yy':  unichr(0xd801)+unichr(0xdcbb)+macron,
  'YY':  unichr(0xd801)+unichr(0xdcbb)+macron,
  'Z':  unichr(0xd801)+unichr(0xdcd2),
  'Zh': unichr(0xd801)+unichr(0xdcd3),
  'ZH': unichr(0xd801)+unichr(0xdcd3),
  ';':  unichr(0xd801)+unichr(0xdcC6) + unichr(0xd801)+unichr(0xdcBC),
  '^':  combiningDotAboveRight,
  ',':  unichr(0xd801)+unichr(0xdcba),  # HYA character

  # Handle comma and period special cases
  ', ':  ', ',
  ',\u000a':  ',\u000a',
  '. ':  '. ',
  '.\u000a': '.\u000a',
  '.\u2008': '.',

  '[': unichr(0xd801)+unichr(0xdcd3),
  '[': unichr(0xd801)+unichr(0xdcd3),
  '{': '{',
  ']': unichr(0xd801)+unichr(0xdcca),
  'h]': unichr(0xd801)+unichr(0xdccb),
  'H]': unichr(0xd801)+unichr(0xdccb),
  '}': '}',
  '\/': unichr(0xd801)+unichr(0xdcbe),
  '|': unichr(0xd801)+unichr(0xdcc6) + unichr(0xd801)+unichr(0xdcc8),
  '\\': unichr(0xd801)+unichr(0xdcc6) + unichr(0xd801)+unichr(0xdcc8),
  '\"': unichr(0xd801)+unichr(0xdcbe),
  # 20-Feb-2017
  # Schwa, etc.
  'Ə': unichr(0xd801)+unichr(0xdcb3),
  'ə': unichr(0xd801)+unichr(0xdcdb),
  'Ą': unichr(0xd801)+unichr(0xdcb0) + accent,
  'ą': unichr(0xd801)+unichr(0xdcd8) + accent,
  'Ə̨': unichr(0xd801)+unichr(0xdcb3) + combiningDotAboveRight,
  'ə̨': unichr(0xd801)+unichr(0xdcdb) + combiningDotAboveRight,
  'Į': unichr(0xd801)+unichr(0xdcbb) + combiningDotAboveRight,
  'į': unichr(0xd801)+unichr(0xdce3) + combiningDotAboveRight,
  'Ǫ': unichr(0xd801)+unichr(0xdcc2) + combiningDotAboveRight,
  'ǫ': unichr(0xd801)+unichr(0xdcea) + combiningDotAboveRight,
  'Ai': unichr(0xd801)+unichr(0xdcb1),
  'ai': unichr(0xd801)+unichr(0xdcd9),
  'Aį': unichr(0xd801)+unichr(0xdcb2),
  'aį': unichr(0xd801)+unichr(0xdcda),
  'Eį': unichr(0xd801)+unichr(0xdcb8),
  'eį': unichr(0xd801)+unichr(0xdce0),
  'Oį': unichr(0xd801)+unichr(0xdcc3),
  'oį': unichr(0xd801)+unichr(0xdceb),
  # Accent + cedilla
  u'\ue0b0': unichr(0xd801)+unichr(0xdcb0) + accent + combiningDotAboveRight,
  u'Á\u0328': unichr(0xd801)+unichr(0xdcb0) + accent + combiningDotAboveRight,
  u'\ue0b2': unichr(0xd801)+unichr(0xdcbb) + accent + combiningDotAboveRight,
  u'\u00e1\u0328': unichr(0xd801)+unichr(0xdcbb) + accent + combiningDotAboveRight,
  u'\ue0b1': unichr(0xd801)+unichr(0xdcd8) + accent + combiningDotAboveRight,
  u'\ue0b1': unichr(0xd801)+unichr(0xdcd8) + accent + combiningDotAboveRight,
  u'\ue0b3': unichr(0xd801)+unichr(0xdce3) + accent + combiningDotAboveRight,
  u'\ue0b3': unichr(0xd801)+unichr(0xdce3) + accent + combiningDotAboveRight,
  # Accent + i + cedilla
  #   Áį áį,   Éį éį,   Óį Óį;   Ái ái
  'Áį': unichr(0xd801)+unichr(0xdcb2) + accent,
  'áį': unichr(0xd801)+unichr(0xdcda) + accent,
  'Éį': unichr(0xd801)+unichr(0xdcb8) + accent,
  'éį': unichr(0xd801)+unichr(0xdce0) + accent,
  'Óį': unichr(0xd801)+unichr(0xdcc3) + accent,
  'óį': unichr(0xd801)+unichr(0xdceb) + accent,
  'Ái': unichr(0xd801)+unichr(0xdcb1) + accent,
  'ái': unichr(0xd801)+unichr(0xdcd9) + accent,
  # Accent + macron --> double accent 
  u'\ue070': unichr(0xd801)+unichr(0xdcb0) + doubleAccent,
  u'\ue071': unichr(0xd801)+unichr(0xdcd8) + doubleAccent,
  u'\ue072': unichr(0xd801)+unichr(0xdcb7) + doubleAccent,
  u'\ue073': unichr(0xd801)+unichr(0xdcdf) + doubleAccent,
  u'\ue074': unichr(0xd801)+unichr(0xdcbb) + doubleAccent,
  u'\ue075': unichr(0xd801)+unichr(0xdce3) + doubleAccent,
  u'\ue076': unichr(0xd801)+unichr(0xdcc2) + doubleAccent,
  u'\ue077': unichr(0xd801)+unichr(0xdcea) + doubleAccent,
  u'\ue078': unichr(0xd801)+unichr(0xdcce) + doubleAccent,
  u'\ue079': unichr(0xd801)+unichr(0xdcf6) + doubleAccent,
  # Accent + macron + cedilla --> double accent + dot
  u'\ue090': unichr(0xd801)+unichr(0xdcb0) + doubleAccent + combiningDotAboveRight,
  u'\ue091': unichr(0xd801)+unichr(0xdcd8) + doubleAccent + combiningDotAboveRight,
  u'\ue092': unichr(0xd801)+unichr(0xdcbb) + doubleAccent + combiningDotAboveRight,
  u'\ue093': unichr(0xd801)+unichr(0xdce3) + doubleAccent + combiningDotAboveRight,
  u'\ue094': unichr(0xd801)+unichr(0xdcc2) + doubleAccent + combiningDotAboveRight,
  u'\ue095': unichr(0xd801)+unichr(0xdcea) + doubleAccent + combiningDotAboveRight,
  # Cedilla combining
  u'\u0328': combiningDotAboveRight,
}

# For parsing input
osage_latin_chars = u"[ÁÍÓ\u00e1\u00ed\u00f3\u0100]\u0328|"  # Vowel followed by ogonek
osage_latin_chars += u"[AÁáEÉéOÓó]į|[ÁAá]i|"  # Vowel + i-ogonek or i.
osage_latin_chars += u"[aeouy]\uf05e|aa|ee|ii|oo|uu|yy|h\]|a\'|ts\'|br|[cs]h|hch|hts|h[cdkpt]|"
osage_latin_chars += u"iu|tsh|t[hs]|zh|"

# Comma and period special cases
osage_latin_chars += u", |,\u000a|\. |\.\u000a|\.|\;$"
    
old_osage_chars = u"\uf041\uf041|\uf045\uf045|\uf04f\uf04f|\uf055\uf055|\uf059\uf059|"
old_osage_chars += u"\uf061\uf061|\uf065\uf065|\uf06f\uf06f|" 
old_osage_chars += u"\uf041\uf059|\uf048[\uf043\uf04b\uf050\uf044\uf05d]|"
old_osage_chars += u"[\uf041\uf045\uf04f][\^\uf05e]|"
old_osage_chars += u"[\\^\uf05e]"
old_osage_chars += u"[\uf020-\uf0b6]"
# old_osage_chars += u"[\uf020-\uf045\uf048-\uf050\uf053-\uf061\uf065\uf07b-\uf07e\uf0b6]"

combined_chars = old_osage_chars + "|" + osage_latin_chars + "|."
regex2 = re.compile(combined_chars, flags=re.I)

def preParseOldOsage(instring):
    outList = regex2.findall(instring)
    return outList;

def oldOsageToUnicode(textIn, convertToLower=True, convertLatin=True,
                      clearOsageDot=True, fontIndex=0):
  convertResult = u''
  outputIsUTF16 = True

  parsedInput = preParseOldOsage(textIn)
  if debug:
    print('&&&& Text in = >%s<' % textIn)
    print('&&& Convert parsed input = %s' % parsedInput)

  if not parsedInput:
    return ''

  for index in xrange(len(parsedInput)):
    c = parsedInput[index];
    #if debug:
    #  print 'c = %s' % c
    # Handle ASCII period between two non-white space characters
    #  as if it were an oldOsageDot.
    if c == oldOsageDot and clearOsageDot:
      continue

    out = c
    if c in osage_private_use_map:
      out = osage_private_use_map[c]
    else:
      # It's not in the map.
      if convertLatin:
        if c in osage_latin_to_unicode_map:
          out = osage_latin_to_unicode_map[c]
    convertResult += out

  return convertResult
  

def testConvertOld():
  # Debug!
  print '\nOLD OSAGE'
  oldOsageText = u'\uf044\uf041\uf04e\uf059\uf020\uf057\uf041\uf04c\uf059\uf05e'  # u'\'
  expected = u'𐓈𐒰𐓁𐒻 𐓏𐒰𐒿𐒻͘'

  result = oldOsageToUnicode(oldOsageText)

  if result != expected:
    print 'Old Osage = %s' % oldOsageText.encode('utf-8')
    print '** Not converting Old Osage: expected(%d) >%s<. Result(%d) = >%s<' % (len(expected), expected, len(result), result)

  print '\nOLD OSAGE Punctuation'
  oldOsagePunctuation = [(u'\uf02d' '-'), (u'\uf020', ' '),
                         (u'\uf05e', '^'), (u'\uf02e', '.')]

  for punct in oldOsagePunctuation:
    result = oldOsageToUnicode(punct[0])
    expected = punct[1]
    if result == expected:
      print '  Punctuation is as expected = %s' % result
    else:
      print '  Punctuation is *NOT* as expected(%d) = >%s< vs. result(%d) = >%s<' % (
          len(expected), expected, len(result), result)


def testConvertLatin():
  #intext = u"MYY^O^PA WEDOO ^PA AAIIHT UU oouuaa^iiee a\' A'Áįoi ts\' TS\' A\' \uf048"
  intext = u"] [a\' A'ÁįAįáįÉįÓįOįoi ts\' TS\' A\' \uf048"
  expected = u"𐓀𐒻̄͘𐓂͘𐓄𐒰 𐓏𐒷𐓈𐓂̄𐓄𐒰"

  result = oldOsageToUnicode(intext)
  print('TEST      in = %s' % intext.encode("utf-8"))
  print('TEST parsed = %s' %
        [c for c in preParseOldOsage(intext)])
  print('TEST      out = %s' % result.encode("utf-8"))
  print('TEST expected = %s' % expected.encode("utf-8"))
  if result != expected:
    print(' NOT CONVERTED CORRECTLY')
  else:
    print(' Test passes')
  intext2 = u""
  expected = u" !𐓇#$%&'()*+𐒺-𐒾0123456789:𐓆𐒼<=>𐒾@𐒰𐒴𐒵𐓈𐒷𐒹𐒱𐒳𐒼𐒿𐓀𐓁𐓂𐓄𐓆𐓍𐓎𐓇𐓏𐓐𐒻𐓒𐓓𐓆𐓈𐓊͘_`𐒲𐒸𐓃{|}~¶"



def testCommaPeriod():
  print '!!!! testCommanPeriod'
  intext = 'A,B A,'
  expected = u'\ud801\udcb0\ud801\udcba\u0042\u0020\ud801\udcb0\u002c'
  result = oldOsageToUnicode(intext)
  if result != expected:
    print('textCommaPeriod fails on input %s' % intext)

  intext = 'A.B.C A.\u000aD.'
  expected = u'𐒰𐒴C 𐒰.\u000a𐓈.'
  result = oldOsageToUnicode(intext)
  if result != expected:
    print('textCommaPeriod fails on input %s' % intext)


def main():
  testConvertLatin()

  testConvertOld()

  testCommaPeriod()


if __name__ == '__main__':
    main()
