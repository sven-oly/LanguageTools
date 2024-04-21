# Convert set of rules to Keyman rules with chaining
import re
import sys

# from mende_rules.py import in_rules

in_rules = {
        '\ufeff(.)': '$1',
        'pi/?': '\ue000',
        'pii': '\ue001',
        'pa/?': '\ue002',
        'paa/?': '\ue003',
        'paaa': '\ue004',
        'pu/?': '\ue005',
        'puu': '\ue006',
        'pe/?': '\ue007',
        'pee': '\ue008',
        'pɛ/?': '\ue009',
        'pɛɛ': '\ue00a',
        'pɔ/?': '\ue00b',
        'pɔɔ': '\ue00c',
        'po/?': '\ue00d',
        'poo': '\ue00e',

        'wi/?': '\ue00f',
        'wii': '\ue010',
        'wI': '\ue01f',
        'wa/?': '\ue011',
        'waa': '\ue012',
        'wA/?': '\ue020',
        'wAA': '\ue021',
        'wu/?': '\ue013',
        'wuu': '\ue014',
        'we/?': '\ue015',
        'wee': '\ue016',
        'wE': '\ue022',
        'wɛ/?': '\ue017',
        'wɛɛ': '\ue018',
        'wƐ/?': '\ue023',
        'wƐƐ': '\ue024',
        'wɔ/?': '\ue019',
        'wɔɔ': '\ue01a',
        'wo/?': '\ue01b',
        'woo': '\ue01c',

        'mbi/?': '\ue025',
        'mbii': '\ue026',
        'mba/?': '\ue027',
        'mbaa': '\ue028',
        'mbu/?': '\ue029',
        'mbuu': '\ue02a',
        'mbU/?': '\ue033',
        'mbUU': '\ue034',
        'Mbu/?': '\ue033',
        'Mbuu': '\ue034',
        'mbe/?': '\ue02b',
        'mbee': '\ue02c',
        'Mbe': '\ue035',
        'mbE': '\ue035',
        'mbɛ/?': '\ue02d',
        'mbɛɛ': '\ue02e',
        'mbƐ/?': '\ue036',
        'mbƐƐ': '\ue037',
        'mbɔ/?': '\ue02f',
        'mbɔɔ': '\ue030',
        'mbƆ/?': '\ue038',
        'mbƆƆ': '\ue039',  # This doesn't work
        'MbƆ': '\ue039',   # This does.
        'mbo/?': '\ue031',
        'mboo': '\ue032',
        'mbO': '\ue03a',

        'bi/?': '\ue03b',
        'bii': '\ue03c',
        'ba/?': '\ue03d',
        'baa': '\ue03e',
        'bu/?': '\ue03f',
        'buu': '\ue040',
        'be/?': '\ue041',
        'bee': '\ue042',
        'bɛ/?': '\ue043',
        'bɔ/?': '\ue044',
        'bɔɔ': '\ue045',
        'bo/?': '\ue046',
        'boo/?': '\ue047',
        'booo': '\ue048',

        'kpi': '\ue049',
        'kpa/?': '\ue04a',
        'kpaa/?': '\ue04b',
        'kpaaa': '\ue04c',
        'kpu/?': '\ue04d',
        'kpuu': '\ue04e',
        'kpe/?': '\ue04f',
        'kpɛ/?': '\ue050',
        'kpɛɛ/?': '\ue051',
        'kpɛɛɛ': '\ue052',
        'kpɔ/?': '\ue053',
        'kpɔɔ': '\ue054',
        'kpo': '\ue055',

        'gbi': '\ue056',
        'gba/?': '\ue057',
        'gbaa': '\ue058',
        'gbu': '\ue059',
        'gbe': '\ue05a',
        'gbɛ/?': '\ue05b',
        'gbɛɛ': '\ue05c',
        'gbɔ/?': '\ue05d',
        'gbɔɔ': '\ue05e',
        'gbo/?': '\ue05f',
        'gboo': '\ue060',
        
        'fi': '\ue061',
        'fa': '\ue062',
        'fu': '\ue063',
        'fe/?': '\ue064',
        'fee': '\ue065',
        'fɛ/?': '\ue066',
        'fɛɛ': '\ue067',
        'fɔ': '\ue068',
        'fo': '\ue069',

        'vi': '\ue06c',
        'va/?': '\ue06d',
        'vaa': '\ue06e',
        'vu/?': '\ue06f',
        'vuu': '\ue070',
        've/?': '\ue071',
        'vee': '\ue072',
        'vɛ/?': '\ue073',
        'vɛɛ': '\ue074',
        'vɔ/?': '\ue075',
        'vɔɔ': '\ue076',
        'vo/?': '\ue077',
        'voo': '\ue078',

        'ti/?': '\ue079',
        'tii': '\ue07a',
        'ta/?': '\ue07b',
        'taa': '\ue07c',
        'tu/?': '\ue07d',
        'tuu': '\ue07e',
        'te/?': '\ue07f',
        'tee': '\ue080',
        'tɛ/?': '\ue081',
        'tɛɛ': '\ue082',
        'tɔ': '\ue083',
        'to/?': '\ue084',
        'too': '\ue085',

        'li/?': '\ue086',
        'lii/?': '\ue087',
        'liii': '\ue088',
        'la/?': '\ue089',
        'laa/?': '\ue08a',
        'laaa': '\ue08b',
        'lA': '\ue08c',
        'lu/?': '\ue08d',
        'luu': '\ue08e',
        'le/?': '\ue08f',
        'lee/?': '\ue090',
        'lɛ/?': '\ue091',
        'lɛɛ/?': '\ue092',
        'lɛɛɛ': '\ue093',
        'lɔ/?': '\ue094',
        'lɔɔ': '\ue095',
        'lo/?': '\ue096',
        'loo': '\ue097',
        
        'ndi/?': '\ue09a',
        'ndii': '\ue09b',
        'nda/?': '\ue09c',
        'ndaa': '\ue09d',
        'ndu/?': '\ue09e',
        'nduu': '\ue09f',
        'nde/?': '\ue0a0',
        'ndee': '\ue0a1',
        'ndɛ/?': '\ue0a2',
        'ndɛɛ/?': '\ue0a3',
        'ndƐ': '\ue0a4',
        'ndɔ/?': '\ue0a5',
        'ndɔɔ': '\ue0a6',
        'ndo': '\ue0a7',
        'ndO': '\ue0a8',

        'di/?': '\ue0aa',
        'dii': '\ue0a9',
        'da/?': '\ue0ab',
        'daa': '\ue0ac',
        'du/?': '\ue0ad',
        'duu': '\ue0ae',
        'de/?': '\ue0af',
        'dee': '\ue0b0',
        'dɔ/?': '\ue0b1',
        'dɔɔ': '\ue0b2',
        'do': '\ue0b3',

        'si/?': '\ue0b4',
        'sii': '\ue0b5',
        'sa/?': '\ue0b6',
        'saa': '\ue0b7',
        'su/?': '\ue0b8',
        'suu': '\ue0b9',
        'se/?': '\ue0ba',
        'see': '\ue0bb',
        'sɛ/?': '\ue0bc',
        'sɛɛ': '\ue0bd',
        'sɔ/?': '\ue0be',
        'sɔɔ': '\ue0bf',
        'so/?': '\ue0c0',
        'soo': '\ue0c1',

        'ji/?': '\ue0c2',
        'jii': '\ue0c3',
        'ja/?': '\ue0c4',
        'jaa': '\ue0c5',
        'ju/?': '\ue0c6',
        'juu': '\ue0c7',
        'je/?': '\ue0c8',
        'jee': '\ue0c9',
        'jɛ/?': '\ue0ca',
        'jɛɛ': '\ue0cb',
        'jɔ/?': '\ue0cc',
        'jɔɔ': '\ue0cd',
        'jo': '\ue0ce',

        'nja/?': '\ue0cf',
        'njaa': '\ue0d0',
        'nju/?': '\ue0d1',
        'njuu': '\ue0d2',
        'nje/?': '\ue0d3',
        'njee/?': '\ue0d4',
        'njeee': '\ue0d5',
        'Nje': '\ue0d5',
        'njɔ/?': '\ue0d6',
        'njɔɔ': '\ue0d7',
        'njo/?': '\ue0d8',
        'Njo': '\ue0d9',   # This works
        'njoo': '\ue0d9',  # This doesn't

        'yi/?': '\ue0da',
        'ya/?': '\ue0db',
        'yu/?': '\ue0dc',
        'ye/?': '\ue0dd',
        'yee/?': '\ue0de',
        'yeee': '\ue0df',
        'yɛ/?': '\ue0e0',
        'yɛɛ': '\ue0e1',
        'yɔ/?': '\ue0e2',
        'yɔɔ': '\ue0e3',
        'yo/?': '\ue0e4',
        'yoo': '\ue0e5',

        'ngi/?': '\ue0e6',
        'ngii': '\ue0e7',
        'nga/?': '\ue0e8',
        'ngaa': '\ue0e9',
        'ngu/?': '\ue0ea',
        'nguu': '\ue0eb',
        'nge/?': '\ue0ec',
        'ngee/?': '\ue0ed',
        'ngeee': '\ue0ee',
        'ngE': '\ue0ee',
        'ngɛ/?': '\ue0ef',
        'ngɔ/?': '\ue0f0',
        'ngɔɔ': '\ue0f1',
        'ngo/?': '\ue0f2',
        'ngoo': '\ue0f3',

        'gi/?': '\ue0f6',
        'gii': '\ue0f7',
        'ga/?': '\ue0f8',
        'gaa/?': '\ue0f9',
        'gaaa': '\ue0fa',
        'gu/?': '\ue0fb',
        'guu': '\ue0fc',
        'ge/?': '\ue0fd',
        'gee': '\ue0fe',
        'gɛ/?': '\ue0ff',
        'gɛɛ': '\ue100',
        'gɔ/?': '\ue101',
        'gɔɔ': '\ue102',
        'go/?': '\ue103',
        'goo': '\ue104',

        'ki/?': '\ue109',
        'kii': '\ue10a',
        'ka/?': '\ue10b',
        'kaa': '\ue10c',
        'ku/?': '\ue10d',
        'kuu': '\ue10e',
        'ke/?': '\ue10f',
        'kee': '\ue110',
        'kɛ/?': '\ue111',
        'kɔ/?': '\ue112',
        'kɔɔ': '\ue113',
        'ko/?': '\ue114',
        'koo': '\ue115',

        'hi': '\ue117',
        'ha': '\ue118',
        'hu/?': '\ue119',
        'huu/?': '\ue11a',
        'huuu': '\ue11b',
        'he': '\ue11c',
        'hɛ/?': '\ue11d',
        'hɛɛ': '\ue11e',
        'hɔ/?': '\ue11f',
        'hɔɔ/?': '\ue120',
        'hɔɔɔ': '\ue121',
        'ho/?': '\ue122',

        'i': '\ue127',
        'a/?': '\ue128',
        'aa': '\ue129',
        'u/?': '\ue12a',
        'uu': '\ue12b',
        'e/?': '\ue12c',
        'ee': '\ue12d',
        'ɛ/?': '\ue12e',
        'ɛɛ': '\ue12f',
        'ɔ/?': '\ue130',
        'ɔɔ': '\ue131',
        'o': '\ue132',

        'Hi/?': '\ue134',
        'Hii': '\ue135',
        'Ha/?': '\ue136',
        'Haa': '\ue137',
        'Hu/?': '\ue138',
        'Huu': '\ue139',
        'Hɛ/?': '\ue13a',
        'Hɛɛ': '\ue13b',
        'Hɔ/?': '\ue13c',
        'nHɔ': '\ue13d',
        'Hɔɔ': '\ue13d',
        'HƆ/?': '\ue13e',
        'HƆƆ': '\ue13f',
        
        'Mi': '\ue140',
        'Ma': '\ue141',
        'Mu/?': '\ue142',
        'Mɛ/?': '\ue143',
        'Mɛɛ': '\ue143',
        'Mɔ/?': '\ue144',
        'Mɔɔ': '\ue144',

        'Ni': '\ue149',
        'Na': '\ue14a',
        'Nu': '\ue14b',
        'Nɛ/?': '\ue14d',
        'Nɛɛ': '\ue14e',
        'Nɔ': '\ue14f',

        'Nyi': '\ue150',
        'Nya': '\ue151',
        'Nyu/?': '\ue152',
        'Nyuu': '\ue153',
        'Nyɛ/?': '\ue154',
        'Nyɛɛ': '\ue155',
        'Nyɔ/?': '\ue156',
        'Nyɔɔ': '\ue157',

        'Ŋa/?': '\ue158',
        'Ŋaa': '\ue159',
        'Ŋɛ/?': '\ue15a',
        'Ŋɛɛ': '\ue15b',

        'I/?': '\ue15d',
        'II/?': '\ue15e',
        'III': '\ue15f',
        'E': '\ue160',
        'Ɛ/?': '\ue161',
        'ƐƐ': '\ue162',

        'nhɔ': '\ue13d',
        'nnɛ': '\ue14c',
        
        'wɛi/?': '\ue01d',
        'wɛii': '\ue01e',
        'gɛi/?': '\ue107',
        'gɛii': '\ue108',
        'ɛi': '\ue133',
        'ŋgua/?': '\ue0f4',
        'ŋguaa': '\ue0f5',
        'nngua/?': '\ue0f4',
        'nnguaa': '\ue0f5',
        'gua/?': '\ue105',
        'guaa': '\ue106',
        'kua': '\ue116',
        'hua/?': '\ue13e',
        'huaa': '\ue13f',
        'Mua/?': '\ue145',
        'Muaa': '\ue146',
        'ŋua': '\ue15c',
        'Ŋua': '\ue15c',


        'fA/?': '\ue06a',
        'fAA': '\ue06b',
        'lƐ/?': '\ue098',
        'lƐƐ': '\ue099',
        'hei/?': '\ue123',
        'heii': '\ue124',
        'hou/?': '\ue125',
        'houu': '\ue126',
        'Mc/?': '\ue147',
        'Mcc': '\ue148'
    }

in_rules_keys = in_rules.keys()

def find_related_rules(key):
    next = []
    key_out = in_rules[key]
    key_len = len(key)
    slash_pos = key.find('/?')
    key_compare = key
    if slash_pos > 0:
        key_compare = key[0:slash_pos]
    # print('%s %s %s' % (key, key_compare, slash_pos))
    for k in in_rules_keys:
        rule_out = in_rules[k]
        k_sl_pos = k.find('/?')
        if k_sl_pos > 0:
            k = k[0:k_sl_pos]
        if key_compare != key and k[0:slash_pos] == key_compare and len(k) == len(key_compare) + 1:
            new_sub = k.replace(key_compare, key_out)
            next.append([key_compare, key_out, k, rule_out, new_sub])
    return next

def find_all_related():
    all_related = []
    for k in in_rules_keys:
        result = find_related_rules(k)
        if result:
            all_related.append(result)
        else:
            all_related.append([k, in_rules[k]])
    return all_related


def output_km_rules(all_info):
    km_rules = []

    prev = ''
    for r in all_info:
        #print('INFO: %s' % r)
        if len(r) == 2 and not isinstance(r[0], list):
            #print('TERM: %s' % r)
            # Try an ordinary rule
            context = r[0][0:-1]
            stroke = r[0][-1]
            
            output = r[1]  # TODO! .replace('\\u', 'U+')
            if len(output) == 1:
                x = hex(ord(output)).replace('0x', 'U+')
                output = x.upper()
            if context:
                rule = '"%s" + "%s" > %s' % (context, stroke, output)
            else:
                rule = '"%s" > %s' % (stroke, output)
            #print(rule)
            km_rules.append(rule)
        else:
            # A list of [prev_ascii, prev PUA, next ascci, next PUA, combo for next PUA]
            #print(': %s' % r)
            if isinstance(r[0], list):
                rule = create_rule(r[0])
#                context = prev[0][0][0:-1]
#                stroke = prev[0][0][-1]
#                output = U_out(prev[0][1])
#                rule = '"%s" + "%s" > %s' % (context, stroke, output)
                print(rule)

                if len(r[0]) > 2:
                    rule2 = create_rule([r[0][4], r[0][3]])
                    print(rule2)
                                        
        prev = r  
    return


def create_rule(prev):
    context = U_out(prev[0][0:-1])  # First part of input
    stroke = prev[0][-1]  # Last character in
    output = U_out(prev[1])  # The output
    rule = '%s + "%s" > %s' % (context, stroke, output)
    return rule


def U_out(v):
    if len(v) == 1:
        vo = ord(v)
        if vo < 0x21 or vo > 0x80:
            return hex(vo).replace('0x', 'U+').upper()
        else:
            return '"%s"' % v
    else:
        return '"%s"' % v

def expanded_rules(raw_rules):
    slash_question = '/?'
    expanded = {}
    for key, output in raw_rules.items():
        to_terminate = False
        if key.find(slash_question) >= 0:
            to_terminate = True
            without_slash = key.replace(slash_question, '')
        else:
            without_slash = key

        entry = ''
        if len(without_slash) >= 2:
            entry = without_slash[-1]
        if key:
            first = key[0]
            base = without_slash[0:-1]
        else:
            first = ''
            base = ''
        expanded[without_slash] = [key, first, base, entry, to_terminate,  output]

    return expanded

def main():
    # x = find_related_rules('pa/?')
    # print('returned: %s' % x)
    # return

    # List of outputs that can take the '/' to terminate
    take_slash = []
    rules = []

    expanded = expanded_rules(in_rules)

    keys = expanded.keys()
    for key, items in expanded.items():
        keystroke = items[3]
        last = items[-1]
        if items[4]:
            take_slash.append(U_out(last))
        context = items[2]
        if not context:
            #print("!!!", key, items)
            keystroke = items[1]
            new_rule = '+ %s > %s' % (U_out(keystroke), U_out(last))
        else:    
            if context in keys:
                # replace the context with the conversion of the context
                context = expanded[context][-1]

            new_rule = '%s + "%s" > %s' % (U_out(context), keystroke, U_out(last))
        #print(key, expanded[key])
        print(new_rule)
    # Next, transform each into a rule.
    # if the base (item[2]) is a key, then context is the output of base's item[s]
    print(' take slash: %s' % ' '.join(take_slash))
    return

    all = find_all_related()
    #for a in all:
    #    print(a)

    output_km_rules(all)


main()        
    
