# Utilities used by converter routines

import argparse

def infileToList(fileIn):
  # Reads filenames from input, one file per line.
  # Return list of content for each line.
  infile = open(fileIn, 'r')
  result = [path.strip() for path in infile]
  print '%d FILES: %s' % (len(result), result)
  infile.close()
  return result


def infileToList2(infile):
  # Reads filenames from input, one file per line.
  # Return list of content for each line.
  result = [path.strip() for path in infile]
  print '%d FILES: %s' % (len(result), result)
  infile.close()
  return result


# Process command line arguments for conversion.
def parseArgs():
  parser = argparse.ArgumentParser(description='Convert font-encoded text in Office documents to Unicode')
  parser.add_argument('filenames', nargs='*', default=[],  # Zero or more
                      help='names of files to convert')
  parser.add_argument('-font', metavar='unicodeFont', nargs='?', default='NotoSansChakma-Regular',
                      help='The name of a Unicode font for the converted text')
  parser.add_argument('-file_list', metavar='filelist', type=argparse.FileType('r'), nargs='?',
                      help='File containing filenames to be converted, one per line')
  parser.add_argument('-output_dir', metavar='output_dir', nargs='?', default='',
                      help='Directory where converted files are stored')
  parser.add_argument('-debug', metavar='debug', nargs='?', default=False,
                      help='Show debug info if given.')
  parser.add_argument('-encoding', metavar='encoding', nargs='?', default=None,
                      help='The expected encoding of the input data.')
  args = parser.parse_args()

  # Get the filenames from the input file list, if available.
  if args.file_list:
    print '*****FILE LIST'
    args.filenames = infileToList2(args.file_list)

  return args
