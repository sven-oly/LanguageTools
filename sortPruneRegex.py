# -*- coding: utf-8 -*-
# Sort a regex in reverse order by length.

import ast
#import demjson
import re

import sys

class keyboard_data ():
    def __init__(self, filename):
        print('FILE = %s' % filename)
        file = open(filename, mode='r', encoding='utf-8')
        try:
            self.raw_data = file.read()
        except BaseException as err:
            print('Error = %s' % err)
            self.raw_data = None

        #print('KB = %s' % self.raw_data)


    # Parse a keyboard definition
    def fields(self):
        # Find the LAYOUT = line
        line_num = 0
        pattern = r'(var|const) ([A-Z_]+)_LAYOUT = (.+)(google\.elements.*)'
        layout_eq = re.compile(
            pattern, re.DOTALL)
        layout_pos = layout_eq.match(self.raw_data)
        matches = layout_pos.groups()

        for match in matches:
            print('MATCH : %s' % match)
        content = matches[2].replace('};', '}')
        # print(content)

        # Turn the Javascript into a Python strucdture
        try:
            self.data_dict = ast.literal_eval(content)
            #print(self.data_dict['title'])
        except BaseException as err:
            print('Error = %s' % err)
            
    def process_transform(self):
        # For each transform, all those beyond the first character
        try:
            transform_dict = self.data_dict['transform']
            print('%d transforms found' % len(transform_dict))
            keys = list(transform_dict.keys())
            if keys[-1] == '':
                keys = keys[0:1]
            keys_shortened = {x[:-1] for x in keys if len(x) > 1}
            # Sort that list by decreasing size.
            key_list = sorted(sorted(list(keys_shortened)),
                              key=len, reverse=True)
            print('%d history prune items found' % len(key_list))
            # print(key_list)
            return '"%s"' % '|'.join(key_list)
        except:
            print('No transforms')
            return None
            
            
        
        return
# rev = in_parsed.sort(key=sortRevN, reverse=True)

#print(in_parsed)

#out = '|'.join(in_parsed)
#print(out)

def sortRevN(a):
    
    return len(a)*10000 + ord(a[0])

def processRules(rules):
    keys = list(rules.keys())
    keys.sort(key=sortRevN, reverse=True)

    weights = [sortRevN(a) for a in keys]
    print(weights)

    print('|'.join(keys).replace('',''))
    print(28*'-')
    
    # The elements in history for pruning
    historyPruneRegex = set()
    for key in keys:
        if len(key) > 1:
            historyPruneRegex.add(key[0:-1])
    allHistory = sorted(historyPruneRegex)
    allHistory.sort(key=sortRevN, reverse=True)
    print('|'.join(allHistory))
            
def sortHistory(hist):
    # Break into sections by "|"
    hist_list = hist.split('|')
    
    # Sort in reverse order by size and alpha"
    sorted_list = sorted(hist_list, key=len, reverse=True)

    # Create new string
    new_hist = '|'.join(sorted_list)
    
    return new_hist

fort_severn_hist = " |a|b|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|ii|oo|aa|be|bi|bo|ba|bii|boo|baa|pe|pi|po|pa|pii|poo|paa|bwe|bwi|bwo|bwa|bwii|bwoo|bwaa|pwe|pwi|pwo|pwa|pwii|pwoo|pwaa|de|di|do|da|dii|doo|daa|te|ti|to|ta|tii|too|taa|dwe|dwi|dwo|dwa|dwii|dwoo|dwaa|twe|twi|two|twa|twii|twoo|twaa|ge|gi|go|ga|gii|goo|gaa|ke|ki|ko|ka|kii|koo|kaa|gwe|gwi|gwo|gwa|gwii|gwoo|gwaa|kwe|kwi|kwo|kwa|kwii|kwoo|kwaa|je|ji|jo|ja|jii|joo|jaa|ce|ci|co|ca|cii|coo|caa|jwe|jwi|jwo|jwa|jwii|jwoo|jwaa|cwe|cwi|cwo|cwa|cwii|cwoo|cwaa|ne|ni|no|na|nii|noo|naa|nwe|nwi|nwo|nwa|nwii|nwoo|nwaa|me|mi|mo|ma|mii|moo|maa|mwe|mwi|mwo|mwa|mwii|mwoo|mwaa|se|si|so|sa|sii|soo|saa|swe|swi|swo|swa|swii|swoo|swaa|ze|zi|zo|za|zwe|zwi|zwo|zwa|zwii|zwoo|zwaa|re|ri|ro|ra|rii|roo|raa|X|she|shi|sho|sha|shii|shoo|shaa|sh|zhe|zhi|zho|zha|zhii|zhoo|zhaa|zh|shwe|shwi|shwo|shwa|shwii|shwoo|shwaa|zhwe|zhwi|zhwo|zhwa|zhwii|zhwoo|zhwaa|ye|yi|yo|ya|le|li|lo|la|lii|loo|laa|lwe|lwi|lwo|lwa|lwii|lwoo|lwaa|we|wi|wo|wa|wii|woo|waa"

james_bay_hist =     " |a|b|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|ii|oo|aa|be|bi|bo|ba|bii|boo|baa|pe|pi|po|pa|pii|poo|paa|bwe|bwi|bwo|bwa|bwii|bwoo|bwaa|pwe|pwi|pwo|pwa|pwii|pwoo|pwaa|de|di|do|da|dii|doo|daa|te|ti|to|ta|tii|too|taa|dwe|dwi|dwo|dwa|dwii|dwoo|dwaa|twe|twi|two|twa|twii|twoo|twaa|ge|gi|go|ga|gii|goo|gaa|ke|ki|ko|ka|kii|koo|kaa|gwe|gwi|gwo|gwa|gwii|gwoo|gwaa|kwe|kwi|kwo|kwa|kwii|kwoo|kwaa|je|ji|jo|ja|jii|joo|jaa|ce|ci|co|ca|cii|coo|caa|jwe|jwi|jwo|jwa|jwii|jwoo|jwaa|cwe|cwi|cwo|cwa|cwii|cwoo|cwaa|ne|ni|no|na|nii|noo|naa|nwe|nwi|nwo|nwa|nwii|nwoo|nwaa|me|mi|mo|ma|mii|moo|maa|mwe|mwi|mwo|mwa|mwii|mwoo|mwaa|se|si|so|sa|sii|soo|saa|swe|swi|swo|swa|swii|swoo|swaa|ze|zi|zo|za|zwe|zwi|zwo|zwa|zwii|zwoo|zwaa|re|ri|ro|ra|rii|roo|raa|X|she|shi|sho|sha|shii|shoo|shaa|sh|zhe|zhi|zho|zha|zhii|zhoo|zhaa|zh|shwe|shwi|shwo|shwa|shwii|shwoo|shwaa|zhwe|zhwi|zhwo|zhwa|zhwii|zhwoo|zhwaa|ye|yi|yo|ya|le|li|lo|la|lii|loo|laa|lwe|lwi|lwo|lwa|lwii|lwoo|lwaa|we|wi|wo|wa|wii|woo|waa"

obj_hist = " |a|b|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|ii|oo|aa|be|bi|bo|ba|bii|boo|baa|pe|pi|po|pa|pii|poo|paa|bwe|bwi|bwo|bwa|bwii|bwoo|bwaa|pwe|pwi|pwo|pwa|pwii|pwoo|pwaa|de|di|do|da|dii|doo|daa|te|ti|to|ta|tii|too|taa|dwe|dwi|dwo|dwa|dwii|dwoo|dwaa|twe|twi|two|twa|twii|twoo|twaa|ge|gi|go|ga|gii|goo|gaa|ke|ki|ko|ka|kii|koo|kaa|gwe|gwi|gwo|gwa|gwii|gwoo|gwaa|kwe|kwi|kwo|kwa|kwii|kwoo|kwaa|je|ji|jo|ja|jii|joo|jaa|ce|ci|co|ca|cii|coo|caa|jwe|jwi|jwo|jwa|jwii|jwoo|jwaa|cwe|cwi|cwo|cwa|cwii|cwoo|cwaa|ne|ni|no|na|nii|noo|naa|nwe|nwi|nwo|nwa|nwii|nwoo|nwaa|me|mi|mo|ma|mii|moo|maa|mwe|mwi|mwo|mwa|mwii|mwoo|mwaa|se|si|so|sa|sii|soo|saa|swe|swi|swo|swa|ze|zi|zo|za|zwe|zwi|zwo|zwa|re|ri|ro|ra|rii|roo|raa|X|she|shi|sho|sha|shii|shoo|shaa|sh|zhe|zhi|zho|zha|zhii|zhoo|zhaa|zh|shwe|shwi|shwo|shwa|shwii|shwoo|shwaa|zhwe|zhwi|zhwo|zhwa|zhwii|zhwoo|zhwaa|ye|yi|yo|ya|le|li|lo|la|lii|loo|laa|we|wi|wo|wa|wii|woo|waa"

def main(argv):
    #obj_out = sortHistory(james_bay_hist)
    #print(obj_out)

    #return
    # TODO: get the file and open it
    if len(argv) > 1:
        kb_data = keyboard_data(argv[1])
        kb_data.fields()
        history_prune = kb_data.process_transform()
        print('History pruned:\n %s' % (history_prune))
    else:
        print('No filename given')

    return

if __name__ == '__main__':
    main(sys.argv)
