__all__ = ['phkConverter']

# Don't look below, you will not understand this Python code :) I don't.

from js2py.pyjs import *
# setting scope
var = Scope( JS_BUILTINS )
set_global_object(var)

# Code follows:
var.registers(['remove_variation_modifiers', 'add_variation_modifiers', 'variation_sequence_code_points', 'vsReplacer', 'convertEncodingToUnicode', 'convertPhkToUnicode', 'toLower', 'variation_modifier', 'private_use_map_combined', 'map_encoding_names'])
@Js
def PyJsHoisted_vsReplacer_(match, match_char, offset, string, this, arguments, var=var):
    var = Scope({'match':match, 'match_char':match_char, 'offset':offset, 'string':string, 'this':this, 'arguments':arguments}, var)
    var.registers(['match_char', 'match', 'offset', 'string'])
    return (var.get('match_char')+var.get('variation_modifier'))
PyJsHoisted_vsReplacer_.func_name = 'vsReplacer'
var.put('vsReplacer', PyJsHoisted_vsReplacer_)
@Js
def PyJsHoisted_add_variation_modifiers_(text, this, arguments, var=var):
    var = Scope({'text':text, 'this':this, 'arguments':arguments}, var)
    var.registers(['text'])
    var.put('size', var.get('text').get('length'))
    var.put('index', Js(0.0))
    var.put('out_text', var.get('text').callprop('replace', var.get('variation_sequence_code_points'), var.get('vsReplacer')))
    return var.get('out_text')
PyJsHoisted_add_variation_modifiers_.func_name = 'add_variation_modifiers'
var.put('add_variation_modifiers', PyJsHoisted_add_variation_modifiers_)
@Js
def PyJsHoisted_remove_variation_modifiers_(text, this, arguments, var=var):
    var = Scope({'text':text, 'this':this, 'arguments':arguments}, var)
    var.registers(['text', 'char'])
    var.put('size', var.get('text').get('length'))
    var.put('index', Js(0.0))
    var.put('out_text', Js(''))
    while (var.get('index')<var.get('size')):
        var.put('char', var.get('text').get(var.get('index')))
        if (var.get('char')!=var.get('variation_modifier')):
            var.put('out_text', var.get('char'), '+')
        (var.put('index',Js(var.get('index').to_number())+Js(1))-Js(1))
    return var.get('out_text')
PyJsHoisted_remove_variation_modifiers_.func_name = 'remove_variation_modifiers'
var.put('remove_variation_modifiers', PyJsHoisted_remove_variation_modifiers_)
@Js
def PyJsHoisted_toLower_(instring, this, arguments, var=var):
    var = Scope({'instring':instring, 'this':this, 'arguments':arguments}, var)
    var.registers(['instring'])
    return var.get('instring')()
PyJsHoisted_toLower_.func_name = 'toLower'
var.put('toLower', PyJsHoisted_toLower_)
@Js
def PyJsHoisted_convertEncodingToUnicode_(inbox, outbox, encodingIndex, this, arguments, var=var):
    var = Scope({'inbox':inbox, 'outbox':outbox, 'encodingIndex':encodingIndex, 'this':this, 'arguments':arguments}, var)
    var.registers(['outarea', 'outbox', 'encodingIndex', 'outtext', 'inbox', 'inarea', 'intext'])
    var.put('inarea', var.get('document').callprop('getElementById', var.get('inbox')))
    var.put('outarea', var.get('document').callprop('getElementById', var.get('outbox')))
    var.put('intext', var.get('inarea').get('value'))
    var.put('outtext', var.get('convertPhkToUnicode')(var.get('intext'), var.get('encodingIndex')))
    if var.get('outarea'):
        var.get('outarea').put('innerHTML', var.get('outarea').put('value', var.get('outtext')))
PyJsHoisted_convertEncodingToUnicode_.func_name = 'convertEncodingToUnicode'
var.put('convertEncodingToUnicode', PyJsHoisted_convertEncodingToUnicode_)
@Js
def PyJsHoisted_convertPhkToUnicode_(intext, encodingIndex, this, arguments, var=var):
    var = Scope({'intext':intext, 'encodingIndex':encodingIndex, 'this':this, 'arguments':arguments}, var)
    var.registers(['newText', 'encodingIndex', 'out', 'c', 'outtext', 'result', 'intext', 'index'])
    var.put('outtext', Js(''))
    pass
    #for JS loop
    var.put('index', Js(0.0))
    while (var.get('index')<var.get('intext').get('length')):
        try:
            var.put('c', var.get('intext').get(var.get('index')))
            var.put('out', var.get('c'))
            if var.get('private_use_map_combined').contains(var.get('c')):
                var.put('result', var.get('private_use_map_combined').get(var.get('c')).get(var.get('encodingIndex')))
                if var.get('result'):
                    var.put('out', var.get('result'))
            var.put('outtext', var.get('out'), '+')
        finally:
                (var.put('index',Js(var.get('index').to_number())+Js(1))-Js(1))
    var.put('newText', var.get('outtext'))
    var.put('ePattern', JsRegExp('/([\\u1031\\u103c]\\ufe00?)([\\u1000-\\u1029\\u1075-\\u1081\\uaa60-\\uaa7a]\\ufe00?)/gi'))
    var.put('eReplace', Js('$2$1'))
    var.put('newText', var.get('outtext').callprop('replace', var.get('ePattern'), var.get('eReplace')))
    var.put('spaceCombPattern', JsRegExp('/ ([\\u102f\\u103d])/gi'))
    var.put('spaceCombReplace', Js('$1 '))
    var.put('newText', var.get('newText').callprop('replace', var.get('spaceCombPattern'), var.get('spaceCombReplace')))
    var.put('spaceCombPattern', JsRegExp('/([\\u103b\\u103d]) \\u102f/gi'))
    var.put('spaceCombReplace', Js('$1ု '))
    var.put('newText', var.get('newText').callprop('replace', var.get('spaceCombPattern'), var.get('spaceCombReplace')))
    var.put('pattern', JsRegExp('/([\\u1031]\\ufe00?)([\\u103a\\u103d]+)/gi'))
    var.put('replacement', Js('$2$1 '))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    var.put('pattern', JsRegExp('/\\u103a\\u103a/gi'))
    var.put('replacement', Js('်\xa0်'))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    var.put('pattern', JsRegExp('/\\u102e\\u102e/gi'))
    var.put('replacement', Js('ီ\xa0ီ'))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    var.put('pattern', JsRegExp('/\\u1036\\u1036/gi'))
    var.put('replacement', Js('ံ\xa0ံ'))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    var.put('pattern', JsRegExp('/\\u109d\\u109d/gi'))
    var.put('replacement', Js('ႝ\xa0ႝ'))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    var.put('pattern', JsRegExp('/\\.\\.\\./gi'))
    var.put('replacement', Js('…'))
    var.put('newText', var.get('newText').callprop('replace', var.get('pattern'), var.get('replacement')))
    return var.get('newText')
PyJsHoisted_convertPhkToUnicode_.func_name = 'convertPhkToUnicode'
var.put('convertPhkToUnicode', PyJsHoisted_convertPhkToUnicode_)
var.put('map_encoding_names', Js([Js('Phake Script'), Js('Phake Ramayana'), Js('Aiton Script'), Js('Shan')]))
var.put('variation_sequence_code_points', JsRegExp('/([\\u1000\\u1002\\u1004\\u1010\\u1011\\u1015\\u1019\\u101a\\u101c\\u101d\\u1022\\u1031\\u1075\\u1078\\u1080\\uaa60\\uaa61\\uaa62\\uaa63\\uaa64\\uaa65\\uaa66\\uaa6b\\uaa6c\\uaa6f\\uaa7a])/g'))
var.put('variation_modifier', Js('︀'))
pass
pass
pass
var.put('private_use_map_combined', Js({'A':Js([Js('ဢ︀'), Js('ဢ︀'), Js('ဢ')]),'B':Js([Js('ꩰ'), Js('ꩰ'), Js('ꩰ')]),'C':Js([Js('ႊ'), Js(':'), Js('ႊ')]),'D':Js([Js('ꩰ'), Js('ꩰ'), Js('ꩰ')]),'E':Js([Js('ၞ်'), Js('ၞ်'), Js('ၞ်')]),'F':Js([Js('်ံ'), Js('်ံ'), Js('်ံ')]),'G':Js([Js('ႇ'), Js('ႇ'), Js('ႇ')]),'H':Js([Js('ႈ'), Js('ႈ'), Js('ႈ')]),'I':Js([Js('ီ'), Js('ီ'), Js('ီ')]),'J':Js([Js('ို'), Js('ို'), Js('ို')]),'K':Js([Js('္က︀'), Js('္က︀'), Js('္က︀')]),'L':Js([Js('း'), Js('း'), Js('')]),'M':Js([Js('ံ'), Js('ံ'), Js('ံ')]),'N':Js([Js('ၺ︀'), Js('ၺ︀'), Js('ၺ︀')]),'O':Js([Js('ႉ'), Js('ႉ'), Js('ွ')]),'P':Js([Js('္ပ︀'), Js('္ပ︀'), Js('္ပ︀')]),'Q':Js([Js('꩷'), Js('꩷'), Js('꩷')]),'R':Js([Js('ြ'), Js('ြ'), Js('ြ')]),'S':Js([Js('꩷'), Js('꩷'), Js('꩷')]),'T':Js([Js('္တ︀'), Js('္တ︀'), Js('္တ︀')]),'U':Js([Js('ူ'), Js('ူ'), Js('ူ')]),'V':Js([Js('꧲'), Js('꧲'), Js('ူ')]),'W':Js([Js('ွ်'), Js('ွ်'), Js('ွ်')]),'X':Js([Js('ႜ'), Js('ႜ'), Js('ႜ')]),'Y':Js([Js('ျ'), Js('ျ'), Js('ျ')]),'Z':Js([Js('ၞ'), Js('ၞ'), Js('ၞ')]),'a':Js([Js('ႃ'), Js('ႃ'), Js('ႃ')]),'b':Js([Js('ပ︀'), Js('ပ︀'), Js('ပ︀')]),'c':Js([Js('ꩡ︀'), Js('ꩡ︀'), Js('ꩡ︀')]),'d':Js([Js('ဒ'), Js('ဒ'), Js('ဒ')]),'e':Js([Js('ေ︀'), Js('ေ︀'), Js('ေ︀')]),'f':Js([Js('ၸ︀'), Js('ၸ︀'), Js('ၸ︀')]),'g':Js([Js('င︀'), Js('င︀'), Js('င︀')]),'h':Js([Js('ꩭ'), Js('ꩭ'), Js('ꩭ')]),'i':Js([Js('ိ'), Js('ိ'), Js('ိ')]),'j':Js([Js('ႝ'), Js('ႝ'), Js('ႝ')]),'k':Js([Js('က︀'), Js('က︀'), Js('က︀')]),'l':Js([Js('လ︀'), Js('လ︀'), Js('လ︀')]),'m':Js([Js('မ︀'), Js('မ︀'), Js('မ︀')]),'n':Js([Js('ꩫ︀'), Js('ꩫ︀'), Js('ꩫ︀')]),'o':Js([Js('ွ'), Js('ွ'), Js('ွ')]),'p':Js([Js('ပ︀'), Js('ပ︀'), Js('ပ︀')]),'q':Js([Js('်'), Js('်'), Js('်')]),'r':Js([Js('ꩺ︀'), Js('ꩺ︀'), Js('ꩺ︀')]),'s':Js([Js('ꩬ︀'), Js('ꩬ︀'), Js('ꩬ︀')]),'t':Js([Js('တ︀'), Js('တ︀'), Js('တ︀')]),'u':Js([Js('ု'), Js('ု'), Js('ု')]),'v':Js([Js('ထ︀'), Js('ထ︀'), Js('ထ︀')]),'w':Js([Js('ဝ︀'), Js('ဝ︀'), Js('ဝ︀')]),'x':Js([Js('ၵ︀'), Js('ၵ︀'), Js('ၵ︀')]),'y':Js([Js('ယ︀'), Js('ယ︀'), Js('ယ︀')]),'z':Js([Js('꩸'), Js('꩸'), Js('꩸')]),'@':Js([Js('꧲'), Js('꧲'), Js('႒')]),'(':Js([Js('('), Js('('), Js(', ')]),')':Js([Js(')'), Js(')'), Js(', ')]),'/':Js([Js('။'), Js('။'), Js('။')]),'\\':Js([Js('၊'), Js('၊'), Js('၊')]),'[':Js([Js('ြ'), Js('ြ'), Js('ြ')]),'|':Js([Js('ြ'), Js('ြ'), Js('္လ︀')]),']':Js([Js('ြ'), Js('ြ'), Js('ြ')]),'{':Js([Js('ြ'), Js('ြ'), Js('ြ')]),'}':Js([Js('်ွ'), Js('်ွ'), Js('ၬ')]),'~':Js([Js(''), Js(''), Js('္ယ︀')]),'1':Js([Js('၁'), Js('၁'), Js('၁')]),'2':Js([Js('၂'), Js('၂'), Js('၂')]),'3':Js([Js('၃'), Js('၃'), Js('၃')]),'4':Js([Js('၄'), Js('၄'), Js('၄')]),'5':Js([Js('၅'), Js('၅'), Js('၅')]),'6':Js([Js('၆'), Js('၆'), Js('၆')]),'7':Js([Js('၇'), Js('၇'), Js('၇')]),'8':Js([Js('၈'), Js('၈'), Js('၈')]),'9':Js([Js('၉'), Js('၉'), Js('၉')]),'0':Js([Js('၀'), Js('၀'), Js('၀')]),' ':Js([Js(' '), Js(' '), Js(' ')]),'#':Js([Js('ံ'), Js('ံ'), Js('ံ')]),'$':Js([Js('ီ'), Js('ီ'), Js('ီ')]),'^':Js([Js('ာ'), Js('ာ'), Js('ာ')]),'_':Js([Js('်ၞ'), Js('်ၞ'), Js('်ၞ')]),'%':Js([Js('\xa0်'), Js('\xa0်'), Js('\xa0်')]),'&':Js([Js('\xa0ႝ'), Js('&'), Js('\xa0ႝ')]),'`':Js([Js('`'), Js('`'), Js('္ꩡ︀')]),'~':Js([Js('~'), Js('~'), Js('~')])}))
pass
pass
pass
pass


# Add lib to the module scope
phkConverter = var.to_python()