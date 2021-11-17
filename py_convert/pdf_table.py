import camelot
import matplotlib

#infile_name ='/Users/craig/Documents/GEORGIAN-MEGRELIAN-LAZ-SVAN-ENGLISH_DICTIONARY.pdf'
infile_name ='page20.pdf'

for pageNum in range(21,246):
    infile_name= 'page%d.pdf' % pageNum
    tables = camelot.read_pdf(infile_name, split_text=True, flavor='stream',
                              row_tol=40)

    num_tables = tables.n
    print('Table page %d' % pageNum)
    print("Total tables extracted:", tables.n)

    #    print('tables = %s' % tables)

    #  print(tables[0].df)

    tables[0].to_csv('foo%d.csv' % pageNum)

