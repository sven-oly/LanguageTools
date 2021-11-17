# https://towardsdatascience.com/scraping-table-data-from-pdf-files-using-a-single-line-in-python-8607880c750

import tabula

infile_name ='/Users/craig/Documents/GEORGIAN-MEGRELIAN-LAZ-SVAN-ENGLISH_DICTIONARY.pdf'       

table = tabula.read_pdf(infile_name,pages=1)
table[0]
