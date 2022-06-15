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

// Based on 2015 paper "Design and Evaluation of Unicode compliance
// Meitei/Meetei Mayek keyboard layout
// by Amika Achom Choa888@gmail.com, Anupam Basu anupambas@gmail.com

var MNI2015_LAYOUT = {
  'id': 'mni2015',
  'title': 'Meitei 2015',
  'mappings': {
    ',c': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰-=' +
          'ꯕꯄꯁꯗ{{}}ꯧ{{}}ꯡꯍ{{ꯩ}}ꯑꯢꯌ' +
          'ꯑꯁꯗꯇ{{ꯤ}}{{}}ꯔꯥꯦ;\'' +
          'ꯚꯒꯆꯈꯕ{{}}ꯂ,./'
    },
    's,sc': {
      '': '~꯫@#$%^&*()ꯋ+' +
          '{{}}ꯐꯟꯙꯏ{{}}{{}}{{ꯪ}}{{ꯣ}}{{}}{}|' +
          'ꯝꯈ{{꯭}}ꯊꯠ{{}}{{}}ꯁ{{}}:"' +
          'ꯉꯘꯓ{{}}ꯎꯞꯜ<>?'
    },
    'l,cl': {
      '': '`1234567890-=' +




          'qwertyuiop[]\\' +
          'asdfghjkl;\'' +
          'zxcvbnm,./'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP{}|' +
          'ASDFGHJKL:"' +
          'ZXCVBNM<>?'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(MNI2015_LAYOUT);
mni2015 = MNI2015_LAYOUT;
