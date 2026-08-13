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

var MNI_KANGLEI = {
  'id': 'mni_kanglei',
  'title': 'Meitei Kanglei',
  'mappings': {
    ',c': {
      '': '`꯱꯲꯳꯴꯵꯶꯷꯸꯹꯰-=' +
          '\uabd1\uabcb\uabe7\uabd4\uabc7\uabcc\uabe8\uabe4\uabe3\uabc4[]\\' +
          '\uabe5\uabc1\uabd7\uabd0\uabd2\uabcd\uabd6\uabc0\uabc2;\'' +
          '\uabc9\uabea\uabc6\uabda\uabd5\uabc5\uabc3,./'
    },
    's,sc': {
      '': '~!@#$%^√*()_+' +
          '\uabe8\u0301\uabe7\√\uabe0÷\uabce\uabcf\uabe7\uabde{}|' +
          '\uabd1\uabc8\uabd9\uabd7\uabd8\uabca\uabd3\uabdb\uabdc:"' +
          '\uABE1X\uabed\u276F\uabed\uabdf\uabdd:\uabeb?'
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
google.elements.keyboard.loadme(MNI_KANGLEI);
mni_kanglei = MNI_KANGLEI;
