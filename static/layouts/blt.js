// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Implements Tai Dam keyboard based on ...
// https://keyman.com/keyboards/sil_tai_dam

var BLT_LAYOUT = {
  'id': 'blt',
  'title': "Tai Dam",
    'mappings': {
    '': {
        '': 'ꫜ1234567890-=' +
            'ꪖꪐꪵ꪿ꪔꪼꪴꪲꪶꪜꪷꪽ\\' +
            'ꪱꪎꪒꪠꪈꪬꪤꪀꪨ;\'' +
            'ꪮꪄꪊꪪꪚꪘꪢ,./'
    },
    's, sc': {
        '': 'ꫛꫀꫂ#$%^&*◌_+' +
            'ꪗꪑꪹ꫁ꪕꪻꪳꪸꪺꪝꪾꫝ|' +
            'ꪰꪏꪓꪡꪉꪥꪁꪩ:\"' +
            'ꪯꪅꪋꪫꪛꪙꪣ꫞꫟?'
    }
    },
    'transform': {    
        'ꪜꪜ': 'ꪞ',
        'ꪈ': 'ꪆ',
        'ꪀ': 'ꪂ',
        'ꪊ': 'ꪌ',
        'ꪝ': 'ꪟ',
        'ꪉ': 'ꪇ',
        'ꪁ': 'ꪃ',
        'ꪋ': 'ꪍ',
    }};
// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(BLT_LAYOUT);
blt = BLT_LAYOUT;
