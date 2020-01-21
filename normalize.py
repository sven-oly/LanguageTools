#
import unicodedata

# Testing normalization of Yoruba strings using built in Python 3

# E with lower dot and grave
e_nfd = '\u0045\u0323\u0300'
e_nfc = '\u1EB8\u0300'

e_line_below = 'e̩'
e_line_below_acute = "é̩"

def print_details(s, id):
  print('%s (%d): %s' % (id, len(s), s))
  for i in s:
    print('  %0x, %s' % (ord(i), unicodedata.name(i)))

print_details(e_nfd, 'e_nfd')
result1 = unicodedata.normalize('NFD', e_nfd)
#print('NFD of e_nfd = %s, length = %s' % (result1, len(result1)))
print_details(result1,'NDF of e_nfd')

result2 = unicodedata.normalize('NFC', e_nfd)
#print('NFC of e_nfd = %s, length = %s' % (result2, len(result2)))
print_details(result2, 'NCF of e_nfd')

print()
print_details(e_nfc, 'e_nfc')
result3 = unicodedata.normalize('NFD', e_nfc)
#print('NFD of e_nfc = %s, length = %s' % (result3, len(result3)))
print_details(result3, 'NFD of e_nfc')

result4 = unicodedata.normalize('NFC', e_nfc)
#print('NFC of e_nfc = %s, length = %s' % (result4, len(result4)))
print_details(result4, 'NFC of e_nfc')


print()
print_details(e_line_below, 'e_line_below')

print_details(unicodedata.normalize('NFC', e_line_below), 'NFC e_line_below')
print_details(unicodedata.normalize('NFD', e_line_below), 'NFD e_line_below')

print()
print_details(e_line_below_acute, 'e_line_below_acute')
print_details(unicodedata.normalize('NFC', e_line_below_acute), 'NFC e_line_below_acute')

print_details(unicodedata.normalize('NFD', e_line_below_acute), 'NFD e_line_below_acute')
print_details(unicodedata.normalize('NFKC', e_line_below_acute), 'NFCK e_line_below_acute')
print_details(unicodedata.normalize('NFKD', e_line_below_acute), 'NFDK e_line_below_acute')
