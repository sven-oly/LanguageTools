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

// \u011E2C0 -> d838 dec0

var NNP_LAYOUT = {
  'id': 'nnp',
  'title': 'Wancho',
  'mappings': {
    '': {
      '': '`{{\ud838\udef1}}{{\ud838\udef2}}{{\ud838\udef3}}{{\ud838\udef4}}{{\ud838\udef5}}{{\ud838\udef6}}{{\ud838\udef7}}{{\ud838\udef8}}{{\ud838\udef9}}{{\ud838\uded0}}-=' +
          '{{𞋮}}{{𞋒}}{{𞋛}}{{𞋗}}{{𞋋}}{{𞋆}}{{𞋞}}{{𞋜}}{{𞋕}}{{𞋊}}[]\\' +
          '{{𞋀}}{{𞋎}}{{𞋄}}{{𞋍}}' +
	    '{{𞋅}}{{𞋚}}{{𞋐}}{{𞋔}}{{𞋈}};\'' +
          '{{𞋣}}{{𞋫}}{{𞋃}}{{𞋓}}{{𞋂}}{{𞋉}}{{𞋘}},./'
    },
    's,sc': {
      '': '~!@#$%^&*()_+' +
          '{{𞋯}}{{€}}{{𞋧}}{{𞋡}}{{𞋌}}{{𞋩}}{{𞋪}}{{𞋥}}{{𞋖}}{{𞋇}}{}|' +
          '{{𞋁}}{{𞋏}}{{}}{{𞋿}}{{𞋝}}{{𞋦}}{{𞋑}}{{𞋙}}{{𞋟}}:\"' +
          '{{𞋤}}{{}}{{𞋠}}{{}}{{\}}{{𞋢}}{{𞋨}}<>?'
    },
    'c': {
      '': '§1234567890-≠' +
	  '{{}}¢£®™¥₹{{}}•¶\“\‘«' +
	  '{{}}{{}}°ƒ{{}}{{}}{{}}±—…‹' +
	  '`{{}}×©{{}}{{}}{{}}{{„}}≤≥÷'
    },
    'sc': {
      '': '±{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}—±' +
	  '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}̦\”’»' +
	  '{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}›' +
	  '~{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}{{}}'
    },
    'l,cl': {
      '': '`1234567890-=' +
          'qwertyuiop{}|' +
          'asdfghjkl:"' +
          'zxcvbnm<>?'
    },
    'sl,scl': {
      '': '~!@#$%^&*()_+' +
          'QWERTYUIOP[]\\' +
          'ASDFGHJKL;\'' +
          'ZXCVBNM,./'
    }
  },
  'transform': {
    '^': '^',  // Placeholder
  }
};

// Load the layout and inform the keyboard to switch layout if necessary.
google.elements.keyboard.loadme(NNP_LAYOUT);
