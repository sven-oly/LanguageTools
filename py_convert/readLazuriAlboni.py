# Read PDF file to extract text

# https://stackoverflow.com/questions/25665/python-module-for-converting-pdf-to-text

import io

import PyPDF2

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

infile_name = 'MingrelianData/Lazuri-Alboni_master2015.pdf'
outfile_name = 'MingrelianData/Lazuri-Alboni_master2015.txt'
#infile_name = 'MingrelianData/Sarpi_moleni_master_28.01.2021.pdf'
#outfile_name = 'MingrelianData/Sarpi_moleni_master_28.01.2021.txt'

fp = open(infile_name, 'rb')
rsrcmgr = PDFResourceManager()
retstr = io.StringIO()

laparams = LAParams()
codec = 'utf-8'
device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
# Create a PDF interpreter object.
interpreter = PDFPageInterpreter(rsrcmgr, device)

for page in PDFPage.get_pages(fp):
    interpreter.process_page(page)
    data = retstr.getvalue()

print(data)


