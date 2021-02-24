# -*- coding: utf-8 -*-
#!/usr/bin/env python

import csv

# Conversion from Tangsa PUA to Tangsa Unicode
lakhum_PUA_Unicode = {
  # Lakhum PUA --> Lakhum Unicode
  '\ue400':	'\U00016A70',
  '\ue401':	'\U00016A71',
  '\ue402':	'\U00016A72',
  '\ue403':	'\U00016A73',
  '\ue404':	'\U00016A74',
  '\ue405':	'\U00016A75',
  '\ue406':	'\U00016A76',
  '\ue407':	'\U00016A77',
  '\ue408':	'\U00016A7C',
  '\ue409':	'\U00016A7D',
  '\ue40A':	'\U00016A7E',
  '\ue40B':	'\U00016A7F',
  '\ue40C':	'\U00016A80',
  '\ue40D':	'\U00016A81',
  '\ue40E':	'\U00016A82',
  '\ue40F':	'\U00016A83',
  '\ue410':	'\U00016A84',
  '\ue411':	'\U00016A85',
  '\ue412':	'\U00016A86',
  '\ue413':	'\U00016A87',
  '\ue414':	'\U00016A88',
  '\ue415':	'\U00016A89',
  '\ue416':	'\U00016A8B',
  '\ue417':	'\U00016A8C',
  '\ue418':	'\U00016A8D',
  '\ue419':	'\U00016A8E',
  '\ue41A':	'\U00016A8F',
  '\ue41B':	'\U00016A90',
  '\ue41C':	'\U00016A91',
  '\ue41D':	'\U00016A92',
  '\ue41E':	'\U00016A93',
  '\ue41F':	'\U00016A94',
  '\ue420':	'\U00016A95',
  '\ue421':	'\U00016A96',
  '\ue422':	'\U00016A97',
  '\ue423':	'\U00016A98',
  '\ue424':	'\U00016A99',
  '\ue425':	'\U00016A9A',
  '\ue426':	'\U00016A9B',
  '\ue427':	'\U00016A9C',
  '\ue428':	'\U00016A9D',
  '\ue429':	'\U00016A9E',
  '\ue42A':	'\U00016AB9',
  '\ue42B':	'\U00016ABA',
  '\ue42C':	'\U00016ABB',
  '\ue42D':	'\U00016ABC',
  '\ue42E':	'\U00016AA0',
  '\ue42F':	'\U00016AA1',
  '\ue430':	'\U00016AA2',
  '\ue431':	'\U00016AA3',
  '\ue432':	'\U00016AA4',
  '\ue433':	'\U00016AA5',
  '\ue434':	'\U00016AA6',
  '\ue435':	'\U00016AA7',
  '\ue436':	'\U00016AA8',
  '\ue437':	'\U00016AA9',
  '\ue438':	'\U00016AAA',
  '\ue439':	'\U00016AAB',
  '\ue43A':	'\U00016AAC',
  '\ue43B':	'\U00016AAD',
  '\ue43C':	'\U00016AAE',
  '\ue43D':	'\U00016AAF',
  '\ue43E':	'\U00016AB0',
  '\ue43F':	'\U00016AB1',
  '\ue440':	'\U00016AB2',
  '\ue441':	'\U00016AB3',
  '\ue442':	'\U00016AB4',
  '\ue443':	'\U00016AB5',
  '\ue444':	'\U00016AB6',
  '\ue445':	'\U00016AB7',
  '\ue446':	'\U00016AB8',
  '\ue447':	'\U00016AB9',
  '\ue448':	'\U00016ABA',
  '\ue449':	'\U00016AC1',
  '\ue44A':	'\U00016AC2',
  '\ue44B':	'\U00016AC3',
  '\ue44C':	'\U00016AC4',
  '\ue44D':	'\U00016AC5',
  '\ue44E':	'\U00016AC6',
  '\ue44F':	'\U00016AC7',
  '\ue450':	'\U00016AC8',
  '\ue451':	'\U00016AC9',
  '\ue452':	'\U00016AC0',
  '\ue453':	'\U00016A8A',
  '\ue454':	'\U00016A78',
  '\ue455':	'\U00016A79',
  '\ue456':	'\U00016A7A',
  '\ue457':	'\U00016A7B',
  '\ue458':	'\U00016A7E',
}

# Read file and convert to data for nstConverterPUA.js
def pua_to_unicode(pua_text):
  unicode_out = []
  missing = []
  for p in pua_text:
    if p in lakhum_PUA_Unicode:
      u = lakhum_PUA_Unicode[p]
      unicode_out.append(u)
    else:
      missing.append(p)
  return ''.join(unicode_out)


with open("GamWinPUA_05Feb2002.tsv") as fd:
  rd = csv.reader(fd, delimiter="\t", quotechar='"')

  in_items = []
  for row in rd:
    if row[0] != "#":
      in_items.append((row[0], row[1]))
    # print(row[0], row[1])

  map_list = ['var private_use_map_combined = {']
  for item in in_items:
    unicode = pua_to_unicode(item[1])
    # Unicode output first, then PUA
    map_list.append("    '%s': ['%s', '%s']," % (item[0], unicode, item[1]))
    #print('%s = %s ' % (item[1], unicode))
  map_list.append("    ' ': [' '],")
  map_list.append("  }")
  print('\n'.join(map_list))

  print('------------')

  reg_ex = ['var gamwin_latin_chars =\n    "']
  for item in in_items:
    reg_ex.append(item[0])
  reg_ex.append("\u0020")
  reg_ex.append(",")
  reg_ex.append("\.")
  reg_ex.append(".")

  print('|'.join(reg_ex))


lakhum_PUA_Unicode = {
  # Lakhum PUA --> Lakhum Unicode
  '\ue400':	'\U00016A70',
  '\ue401':	'\U00016A71',
  '\ue402':	'\U00016A72',
  '\ue403':	'\U00016A73',
  '\ue404':	'\U00016A74',
  '\ue405':	'\U00016A75',
  '\ue406':	'\U00016A76',
  '\ue407':	'\U00016A77',
  '\ue408':	'\U00016A7C',
  '\ue409':	'\U00016A7D',
  '\ue40A':	'\U00016A7E',
  '\ue40B':	'\U00016A7F',
  '\ue40C':	'\U00016A80',
  '\ue40D':	'\U00016A81',
  '\ue40E':	'\U00016A82',
  '\ue40F':	'\U00016A83',
  '\ue410':	'\U00016A84',
  '\ue411':	'\U00016A85',
  '\ue412':	'\U00016A86',
  '\ue413':	'\U00016A87',
  '\ue414':	'\U00016A88',
  '\ue415':	'\U00016A89',
  '\ue416':	'\U00016A8B',
  '\ue417':	'\U00016A8C',
  '\ue418':	'\U00016A8D',
  '\ue419':	'\U00016A8E',
  '\ue41A':	'\U00016A8F',
  '\ue41B':	'\U00016A90',
  '\ue41C':	'\U00016A91',
  '\ue41D':	'\U00016A92',
  '\ue41E':	'\U00016A93',
  '\ue41F':	'\U00016A94',
  '\ue420':	'\U00016A95',
  '\ue421':	'\U00016A96',
  '\ue422':	'\U00016A97',
  '\ue423':	'\U00016A98',
  '\ue424':	'\U00016A99',
  '\ue425':	'\U00016A9A',
  '\ue426':	'\U00016A9B',
  '\ue427':	'\U00016A9C',
  '\ue428':	'\U00016A9D',
  '\ue429':	'\U00016A9E',
  '\ue42A':	'\U00016AB9',
  '\ue42B':	'\U00016ABA',
  '\ue42C':	'\U00016ABB',
  '\ue42D':	'\U00016ABC',
  '\ue42E':	'\U00016AA0',
  '\ue42F':	'\U00016AA1',
  '\ue430':	'\U00016AA2',
  '\ue431':	'\U00016AA3',
  '\ue432':	'\U00016AA4',
  '\ue433':	'\U00016AA5',
  '\ue434':	'\U00016AA6',
  '\ue435':	'\U00016AA7',
  '\ue436':	'\U00016AA8',
  '\ue437':	'\U00016AA9',
  '\ue438':	'\U00016AAA',
  '\ue439':	'\U00016AAB',
  '\ue43A':	'\U00016AAC',
  '\ue43B':	'\U00016AAD',
  '\ue43C':	'\U00016AAE',
  '\ue43D':	'\U00016AAF',
  '\ue43E':	'\U00016AB0',
  '\ue43F':	'\U00016AB1',
  '\ue440':	'\U00016AB2',
  '\ue441':	'\U00016AB3',
  '\ue442':	'\U00016AB4',
  '\ue443':	'\U00016AB5',
  '\ue444':	'\U00016AB6',
  '\ue445':	'\U00016AB7',
  '\ue446':	'\U00016AB8',
  '\ue447':	'\U00016AB9',
  '\ue448':	'\U00016ABA',
  '\ue449':	'\U00016AC1',
  '\ue44A':	'\U00016AC2',
  '\ue44B':	'\U00016AC3',
  '\ue44C':	'\U00016AC4',
  '\ue44D':	'\U00016AC5',
  '\ue44E':	'\U00016AC6',
  '\ue44F':	'\U00016AC7',
  '\ue450':	'\U00016AC8',
  '\ue451':	'\U00016AC9',
  '\ue452':	'\U00016AC0',
  '\ue453':	'\U00016A8A',
  '\ue454':	'\U00016A78',
  '\ue455':	'\U00016A79',
  '\ue456':	'\U00016A7A',
  '\ue457':	'\U00016A7B',
  '\ue458':	'\U00016A7E',
  }
