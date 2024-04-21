/* Namespace */
let keymanOutput = function() {
    this.new_list = [];
    let tree = new Map();
}

var keymanCreator = new keymanOutput();

// Routines for creating Keyman output from Keyboard data.
keymanOutput.prototype.createKeymanData = function(
        outArea, layout, outputCtrlAlt, outputMobile, outputTransforms) {
    const results = map_en_to_x(layout, outputCtrlAlt, outputMobile, outputTransforms);
    outArea.innerHTML = results;
}

// TODO: Fix this to avoid globals.
const en_qwerty = EN_LAYOUT['mappings'];
let en_qwerty_map = en_qwerty[""];
if (!en_qwerty_map) {
// Need to generalize this. Find the one with '' in it.
en_qwerty_map = en_qwerty[',c'];
}
const en_qwerty_keys = en_qwerty_map[""];
enQwertyRowSize = [13, 13, 11, 10];
    
let T_items = [];  // Stores identifiers that need to be added.
let t_number = 0;

function initTValues() {
    T_items = [];  // Stores identifiers that need to be added.
    t_number = 0;
}

function mapnames() {
    // Create a map from the keys to the Keyman names.
    var en_map = {};
    for (var k = 0x30; k < 0x3a; k++) {
        var char = String.fromCharCode(k);
        en_map[char] = "K_" + char;
    }
    for (var k = 0x41; k < 0x5b; k++) {
        let char = String.fromCharCode(k);
        en_map[char] = "K_" + char;
    }
    en_map['`'] = 'K_BKQUOTE';
    en_map[','] = 'K_COMMA';
    en_map['.'] = 'K_PERIOD';
    en_map[';'] = 'K_COLON';
    en_map['\''] = 'K_QUOTE'
    en_map['['] = 'K_LBRKT';
    en_map[']'] = 'K_RBRKT';
    en_map['\\'] = 'K_BKSLASH';
    en_map['`'] = 'K_BKQUOTE';
    en_map['-'] = 'K_HYPHEN';
    en_map['='] = 'K_EQUAL';
    en_map['/'] = 'K_SLASH';
    return en_map;
}

function map_qwerty(layer_values, layer_txt, querty_names) {
  // Given a layer and a name, create a mapping from those keys to
  // the values, plus the layer text.
  // + [SHIFT K_5] > 'ᶠ'

  let layer_list = [];
  let layer_items = parselayerstring(layer_values);
  for (let index = 0; index < en_qwerty_keys.length; index++) {
    let upper = en_qwerty_keys[index].toUpperCase();
    // Option - output some as characters (code <= 0xffff)
    if (layer_items[index]) {
        let item = layer_items[index];
        if (item[0] === 'S' && item[1] == '|' && item[2] == '|') {
            // Skip over the 2nd ||.
            // TODO: Put in the keycap string
            let lastPartLoc = item.indexOf('||');
            lastPartLoc = item.indexOf('||', lastPartLoc+ 1);
            item = item.substring(lastPartLoc+ 2);
        }
        let hex = utf16common(item, "U+", " ", true, []);
        layer_list.push("+ [" + layer_txt + querty_names[upper] + "] > " + hex);
    } else {
      alert('Missing value for index ' + index + ' layer ' + layer_txt + " " + layer_items);
    }
  }
  return layer_list;
}

function mapTouch(layer_values, layer_text, names, layerName) {
    // Given a layer, compute the keys on the layer
    // for touch output
    let layer_list = [];
    let layer_items = parselayerstring(layer_values);

    // Separated out symbols and numerals
    for (let index = 0; index < en_qwerty_keys.length; index++) {
        let upper = en_qwerty_keys[index].toUpperCase();
        // Option - output some as characters (code <= 0xffff)
        if (index < layer_items.length && layer_items[index]) {
            let item = layer_items[index];
            if (item[0] === 'S' && item[1] == '|' && item[2] == '|') {
                // Skip over the 2nd ||.
                let lastPartLoc = item.indexOf('||');
                lastPartLoc = item.indexOf('||', lastPartLoc+ 1);
                item = item.substring(lastPartLoc+ 2);
            }
            // !!! If item has more than one code point, need to create an identifier T_
            if (item.length > 1) {
                let t_name = 'T_' + t_number;
                t_number += 1;  // Global
                T_items.push({t_name, item});
            } else {
                if (item.length <= 0) {
                    alert("item["+index+"].length= " + item.length);
                }
            }
            if (item != "\u0000") {
                // Skip empty keys
                let hex = utf16common(item, "U+", " ", true, []);
                layer_list.push('{ "id": "' + names[upper] +  '", "text": "' + hex + '"},');
            }
        } else {
            alert('Missing value for index ' + index + ' layer ' + layer_text +
                  " " + layer_items);
            // TODO Something
            layer_list.push('{ "id": "' + names[upper] +  '", "text": "' + hex + '"},');
        }
    }
  return layer_list;
}

function parselayerstring(layerstring) {
  // Get the characters for each key as an array.
  let ret = [];
  let index = 0;
  let layerdata = layerstring;
  let splits = layerdata.split("}}");  // Get each chunk.
  for (var i in splits) {
    var has_double_brace = splits[i].indexOf("{{");
    var last_index = splits[i].length;
    var saved = null;
    if (has_double_brace >= 0) {
      last_index = has_double_brace;
      saved = splits[i].substring(has_double_brace + 2);
    }
    for (var k = 0; k < last_index; k++) {
      ret.push(splits[i][k]);
    }
    if (saved) {
      ret.push(saved);
    } else {
        ret.push(String.fromCharCode(0x00));  // An empty position
    }
  }
  return ret;
}

// Given a field such as "", "s", "l", find the property containing that one.
function propContaining(props, field) {
  for (let i in props) {
    if (props[i] == field) {
      return props[i];
    }
    let splits = props[i].split(",");
    for (let k in splits) {
      if (splits[k].trim() == field) {
        return props[i];
      }
    }
    // TODO: consider orders such as sc, cs, lsc, scl, etc.
  }
  return null;
}

function map_en_to_x(layout, outputCtrlAlt, outputMobile, outputTransforms, options) {
    // Compute the full mapping from QWERTY keys to the layout values.
    const qwerty_names = mapnames();

    // For each layer, map the values and add the text
    // for empty, s, c, sc, l, ls, lc, lsc layers
    // Check if there is any duplicate.
    let vals = layout['mappings'];
    let layers = []
    let keys = Object.getOwnPropertyNames(vals);

    let comments = getComments(layout);
    let storeInfo = getStore(layout);

    // Need to generalize this to get layer with "".
    let base = propContaining(keys, "");

    if (outputMobile) {
        initTValues();
        let layer = 'default';
        let mappedTouch;
         mappedTouch = mapTouch(vals[base][""], "", qwerty_names, layer);
        Array.prototype.push.apply(layers, mappedTouch);
        layers.push("\n");

        base = propContaining(keys, "s");
        layer = 'shift';
        mappedTouch = mapTouch(vals[base][""], "", qwerty_names, layer);
        Array.prototype.push.apply(layers, mappedTouch);
        layers.push("\n");

        base = propContaining(keys, "");
        layer = 'numsymbols';
        mappedTouch = mapTouch(vals[base][""], "", qwerty_names, layer);
        Array.prototype.push.apply(layers, mappedTouch);
        layers.push("\n");

        // Now try for Symbols and Numerals
        return generateMobile(qwerty_names, vals, layers, keys, options);
    } else {
        // Append
        Array.prototype.push.apply(layers, map_qwerty(vals[base][""], "", qwerty_names))
        layers.push("\n");

        base = propContaining(keys, "s");
        Array.prototype.push.apply(layers, map_qwerty(vals[base][""], "SHIFT ", qwerty_names));
        layers.push("\n");

        if (outputCtrlAlt) {
            base = propContaining(keys, "c");
            Array.prototype.push.apply(layers, map_qwerty(vals[base][""], "CTRL ", qwerty_names));
            layers.push("\n");

            base = propContaining(keys, "sc");
            Array.prototype.push.apply(layers, map_qwerty(vals[base][""], "SHIFT CTRL ", qwerty_names));

            // !!! TODO: Add T_ identifiers.
        }
        // Add Lock levels as needed.

        let transforms = '';
        if (outputTransforms) {
            transforms = getTransforms(layout);
        }

        return comments + "\n" + storeInfo + "\n" + layers.join('\n') + "\n" + transforms;
    }
}


function generateMobile(qwerty_names, vals, layers, keys) {
    let layerId = 'default';  // Get from data
    let result = [];
    result.push('// KEYMAN Mobile result');
    // Push the devices
    let devices = ['phone'];
    // For each device
    let i = 0;
    result.push(`{ \"${devices[i]}\": {`);
    result.push('  "displayUnderlying": false,');
    let rowId = 1;  // For each row of the output
    for (let i = 0; i < layers.length; i++) {
    // !!! Add device
    // !!! Add layers
        result.push('   "layer": [');
        result.push('     {');
        result.push(`       \"id\": ": \"${layerId}"`);

        // Rows
        result.push('       \"row\": " [');
        result.push(`         {\"id\": \"${rowId}\". "key": [`);
        // PUSH KEYS (id, text, long press*)

        // End of row
        result.push('                          ]');
        // End of layer
        result.push('              ]');
        
        // End of device
        result.push('   }');
        
    }
    //...
    return result.join('\n');
}


function getComments(layout) {
    let comment_list = [];
    comment_list.push("c KeyMan keyboard generated from Google Input Tools format");
    comment_list.push("c " + Date());
    comment_list.push('c Source Keyboard File: ' + layout.id + '.js');
    comment_list.push("c");
    comment_list.push(" ");

    return comment_list.join("\n");
}

function getStore(layout) {
    let store_list = [];
    store_list.push("store(&VERSION) '10.0'");
    store_list.push("store(&NAME) " + "'" + layout['title'] + "'");
    if (layout['language']) {
        store_list.push("store(&LANGUAGE) " + layout['language']);
    }
    store_list.push("store(&KEYBOARDVERSION) '1.0'");
    store_list.push(" ");

    return store_list.join("\n");
}

function findKeyPartsInMaps(key) {
  // Look up each part of the transform in the mappings to fin
  // the key + modifier.
  // TODO: Check for a regex. If it has ?, *, +, [], (), etc., then it will need expansion.
  // Also, check for SMP values split
  let parts = []
  for (let codePoint of key) {
    c = codePoint.codePointAt(0);
    parts.push(String.fromCodePoint(c));  // This works for simple replacement
  }
  // Look up each in the mapping to find original key value.
  return parts;
}

function leftMatchToContext(left_parts, reverse_map) {
  // TODO: Add option to
  let out_list = [];
  for (index in left_parts) {
    let part = left_parts[index];
    let context = reverse_map[part];
    if (context) {
        let v = context.codePointAt();
        if (v > 0x20 && v < 0xff) {
        out_list.push('"' + context + '"');
      } else {
        hex_form = utf16common(context, "U+", " ", true, []);
        out_list.push(hex_form);
      }
    }
  }
  return out_list.join(" + ");
}

function rightMatchToContext(right) {
  // TODO
  let hex = utf16common(right, "U+", " ", true, []);
  return " " + hex;
}

// Given a key to a map, find the level of the en map that has the characters
function get_en_layer(map, en_mappings) {
  let map_keys = map.split(',');
  for (key in en_mappings) {
    let en_levels = key.split(',');
    for (level in en_levels) {
      if (map_keys[0] == en_levels[level]) {
        return key;  // This are the EN keys where the output is defined.
      }
    }
  }
}

// Can this identify dead keys?
function getTransforms(layout) {
    let transform_list = [];
    if (!transform_list) return transform_list;

    const en_qwerty = EN_LAYOUT['mappings'];
    const mappings = layout['mappings'];
    let reverse_map = {};
    for (let map in mappings) {
      let en_map = get_en_layer(map, en_qwerty);
      let en_items = parselayerstring(en_qwerty[en_map][''])
      let index = 0;

      let map_string = parselayerstring(mappings[map]['']);
      for (index = 0; index < map_string.length; index++) {
        let place = map_string[index];
        reverse_map[place] = en_items[index];
      }
    }

    transform_list.push("c Transforms");
    let transforms = layout['transform'];
    // For each key in the transforms dictionary:
    // 1. map each part of the key to the qwerty keys lower, upper, control, etc.
    // 2. create KM rule
    // TODO: Fill in
    for (const key in transforms) {
      let left_match = findKeyPartsInMaps(key);
      let right_side = transforms[key];
      let left_format = leftMatchToContext(left_match, reverse_map);
      let right_format = rightMatchToContext(right_side);

      transform_list.push(left_format + " > " + right_format);
    }
    return transform_list.join("\n");
}
