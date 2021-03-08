# -*- coding: utf-8 -*-
import csv

with open("GamWin_convert_test.tsv") as fd:
  rd = csv.reader(fd, delimiter="\t", quotechar='"')

  in_items = []
  for row in rd:
    if row[0][0] != "!":
      new_row = (row[1], row[3], row[5])
      in_items.append(new_row)
      print("['%s', '%s', '%s']," % (new_row[0], new_row[1], new_row[2]))
    # print(row[0], row[1])
