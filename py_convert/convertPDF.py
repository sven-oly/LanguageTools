# Read PDF file to extract text

import PyPDF2

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

def convert_pdf_to_string(file_path):

        output_string = StringIO()
        with open(file_path, 'rb') as in_file:
            parser = PDFParser(in_file)
            doc = PDFDocument(parser)
            rsrcmgr = PDFResourceManager()


infile_name ='/Users/craig/Documents/GEORGIAN-MEGRELIAN-LAZ-SVAN-ENGLISH_DICTIONARY.pdf'       

reader = PyPDF2.PdfFileReader(infile_name)

print(reader.documentInfo)

print('%d pages found' % reader.numPages)


for pageNum in range(13,246):
    writer = PyPDF2.PdfFileWriter()
    my_page = reader.getPage(pageNum)
    writer.addPage(my_page)

    output_filename = 'page%s.pdf' % pageNum
    with open(output_filename, 'wb') as output:
        writer.write(output)
    



