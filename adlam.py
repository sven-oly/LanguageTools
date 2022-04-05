#!/usr/bin/env python

# Includes AdlamGitHub/convert.py contents

# Unicode Properties of Adlam chatacters
adlamProperties = {
    0x1E900 : ['ADLAM CAPITAL LETTER ALIF', 'Lu', '0;R;;;;;N;;;;1E922;'],
    0x1E901 : ['ADLAM CAPITAL LETTER DAALI', 'Lu', '0;R;;;;;N;;;;1E923;'],
    0x1E902 : ['ADLAM CAPITAL LETTER LAAM', 'Lu', '0;R;;;;;N;;;;1E924;'],
    0x1E903 : ['ADLAM CAPITAL LETTER MIIM', 'Lu', '0;R;;;;;N;;;;1E925;'],
    0x1E904 : ['ADLAM CAPITAL LETTER BA', 'Lu', '0;R;;;;;N;;;;1E926;'],
    0x1E905 : ['ADLAM CAPITAL LETTER SINNYIIYHE', 'Lu', '0;R;;;;;N;;;;1E927;'],
    0x1E906 : ['ADLAM CAPITAL LETTER PE', 'Lu', '0;R;;;;;N;;;;1E928;'],
    0x1E907 : ['ADLAM CAPITAL LETTER BHE', 'Lu', '0;R;;;;;N;;;;1E929;'],
    0x1E908 : ['ADLAM CAPITAL LETTER RA', 'Lu', '0;R;;;;;N;;;;1E92A;'],
    0x1E909 : ['ADLAM CAPITAL LETTER E', 'Lu', '0;R;;;;;N;;;;1E92B;'],
    0x1E90A : ['ADLAM CAPITAL LETTER FA', 'Lu', '0;R;;;;;N;;;;1E92C;'],
    0x1E90B : ['ADLAM CAPITAL LETTER I', 'Lu', '0;R;;;;;N;;;;1E92D;'],
    0x1E90C : ['ADLAM CAPITAL LETTER O', 'Lu', '0;R;;;;;N;;;;1E92E;'],
    0x1E90D : ['ADLAM CAPITAL LETTER DHA', 'Lu', '0;R;;;;;N;;;;1E92F;'],
    0x1E90E : ['ADLAM CAPITAL LETTER YHE', 'Lu', '0;R;;;;;N;;;;1E930;'],
    0x1E90F : ['ADLAM CAPITAL LETTER WAW', 'Lu', '0;R;;;;;N;;;;1E931;'],
    0x1E910 : ['ADLAM CAPITAL LETTER NUN', 'Lu', '0;R;;;;;N;;;;1E932;'],
    0x1E911 : ['ADLAM CAPITAL LETTER KAF', 'Lu', '0;R;;;;;N;;;;1E933;'],
    0x1E912 : ['ADLAM CAPITAL LETTER YA', 'Lu', '0;R;;;;;N;;;;1E934;'],
    0x1E913 : ['ADLAM CAPITAL LETTER U', 'Lu', '0;R;;;;;N;;;;1E935;'],
    0x1E914 : ['ADLAM CAPITAL LETTER JIIM', 'Lu', '0;R;;;;;N;;;;1E936;'],
    0x1E915 : ['ADLAM CAPITAL LETTER CHI', 'Lu', '0;R;;;;;N;;;;1E937;'],
    0x1E916 : ['ADLAM CAPITAL LETTER HA', 'Lu', '0;R;;;;;N;;;;1E938;'],
    0x1E917 : ['ADLAM CAPITAL LETTER QAAF', 'Lu', '0;R;;;;;N;;;;1E939;'],
    0x1E918 : ['ADLAM CAPITAL LETTER GA', 'Lu', '0;R;;;;;N;;;;1E93A;'],
    0x1E919 : ['ADLAM CAPITAL LETTER NYA', 'Lu', '0;R;;;;;N;;;;1E93B;'],
    0x1E91A : ['ADLAM CAPITAL LETTER TU', 'Lu', '0;R;;;;;N;;;;1E93C;'],
    0x1E91B : ['ADLAM CAPITAL LETTER NHA', 'Lu', '0;R;;;;;N;;;;1E93D;'],
    0x1E91C : ['ADLAM CAPITAL LETTER VA (supplementary)', 'Lu', '0;R;;;;;N;;;;1E93E;'],
    0x1E91D : ['ADLAM CAPITAL LETTER KHA (supplementary)', 'Lu', '0;R;;;;;N;;;;1E93F;'],
    0x1E91E : ['ADLAM CAPITAL LETTER GBE (supplementary)', 'Lu', '0;R;;;;;N;;;;1E940;'],
    0x1E91F : ['ADLAM CAPITAL LETTER ZAL (supplementary)', 'Lu', '0;R;;;;;N;;;;1E941;'],
    0x1E920 : ['ADLAM CAPITAL LETTER KPO (supplementary)', 'Lu', '0;R;;;;;N;;;;1E942;'],
    0x1E921 : ['ADLAM CAPITAL LETTER SHA (supplementary)', 'Lu', '0;R;;;;;N;;;;1E943;'],
    0x1E922 : ['ADLAM SMALL LETTER ALIF', 'Ll', '0;R;;;;;N;;;1E900;;1E900'],
    0x1E923 : ['ADLAM SMALL LETTER DAALI', 'Ll', '0;R;;;;;N;;;1E901;;1E901'],
    0x1E924 : ['ADLAM SMALL LETTER LAAM', 'Ll', '0;R;;;;;N;;;1E902;;1E902'],
    0x1E925 : ['ADLAM SMALL LETTER MIIM', 'Ll', '0;R;;;;;N;;;1E903;;1E903'],
    0x1E926 : ['ADLAM SMALL LETTER BA', 'Ll', '0;R;;;;;N;;;1E904;;1E904'],
    0x1E927 : ['ADLAM SMALL LETTER SINNYIIYHE', 'Ll', '0;R;;;;;N;;;1E905;;1E905'],
    0x1E928 : ['ADLAM SMALL LETTER PE', 'Ll', '0;R;;;;;N;;;1E906;;1E906'],
    0x1E929 : ['ADLAM SMALL LETTER BHE', 'Ll', '0;R;;;;;N;;;1E907;;1E907'],
    0x1E92A : ['ADLAM SMALL LETTER RA', 'Ll', '0;R;;;;;N;;;1E908;;1E908'],
    0x1E92B : ['ADLAM SMALL LETTER E', 'Ll', '0;R;;;;;N;;;1E909;;1E909'],
    0x1E92C : ['ADLAM SMALL LETTER FA', 'Ll', '0;R;;;;;N;;;1E90A;;1E90A'],
    0x1E92D : ['ADLAM SMALL LETTER I', 'Ll', '0;R;;;;;N;;;1E90B;;1E90B'],
    0x1E92E : ['ADLAM SMALL LETTER O', 'Ll', '0;R;;;;;N;;;1E90C;;1E90C'],
    0x1E92F : ['ADLAM SMALL LETTER DHA', 'Ll', '0;R;;;;;N;;;1E90D;;1E90D'],
    0x1E930 : ['ADLAM SMALL LETTER YHE', 'Ll', '0;R;;;;;N;;;1E90E;;1E90E'],
    0x1E931 : ['ADLAM SMALL LETTER WAW', 'Ll', '0;R;;;;;N;;;1E90F;;1E90F'],
    0x1E932 : ['ADLAM SMALL LETTER NUN', 'Ll', '0;R;;;;;N;;;1E910;;1E910'],
    0x1E933 : ['ADLAM SMALL LETTER KAF', 'Ll', '0;R;;;;;N;;;1E911;;1E911'],
    0x1E934 : ['ADLAM SMALL LETTER YA', 'Ll', '0;R;;;;;N;;;1E912;;1E912'],
    0x1E935 : ['ADLAM SMALL LETTER U', 'Ll', '0;R;;;;;N;;;1E913;;1E913'],
    0x1E936 : ['ADLAM SMALL LETTER JIIM', 'Ll', '0;R;;;;;N;;;1E914;;1E914'],
    0x1E937 : ['ADLAM SMALL LETTER CHI', 'Ll', '0;R;;;;;N;;;1E915;;1E915'],
    0x1E938 : ['ADLAM SMALL LETTER HA', 'Ll', '0;R;;;;;N;;;1E916;;1E916'],
    0x1E939 : ['ADLAM SMALL LETTER QAAF', 'Ll', '0;R;;;;;N;;;1E917;;1E917'],
    0x1E93A : ['ADLAM SMALL LETTER GA', 'Ll', '0;R;;;;;N;;;1E918;;1E918'],
    0x1E93B : ['ADLAM SMALL LETTER NYA', 'Ll', '0;R;;;;;N;;;1E919;;1E919'],
    0x1E93C : ['ADLAM SMALL LETTER TU', 'Ll', '0;R;;;;;N;;;1E91A;;1E91A'],
    0x1E93D : ['ADLAM SMALL LETTER NHA', 'Ll', '0;R;;;;;N;;;1E91B;;1E91B'],
    0x1E93E : ['ADLAM SMALL LETTER VA  (supplementary)', 'Ll', '0;R;;;;;N;;;1E91C;;1E91C'],
    0x1E93F : ['ADLAM SMALL LETTER KHA (supplementary)', 'Ll', '0;R;;;;;N;;;1E91D;;1E91D'],
    0x1E940 : ['ADLAM SMALL LETTER GBE (supplementary)', 'Ll', '0;R;;;;;N;;;1E91E;;1E91E'],
    0x1E941 : ['ADLAM SMALL LETTER ZAL (supplementary)', 'Ll', '0;R;;;;;N;;;1E91F;;1E91F'],
    0x1E942 : ['ADLAM SMALL LETTER KPO (supplementary)', 'Ll', '0;R;;;;;N;;;1E920;;1E920'],
    0x1E943 : ['ADLAM SMALL LETTER SHA (supplementary)', 'Ll', '0;R;;;;;N;;;1E921;;1E921'],
    0x1E945 : ['ADLAM VOWEL LENGTHENER', 'Mn', '230;NSM;;;;;N;;;;;'],
    0x1E946 : ['ADLAM GEMINATION MARK', 'Mn', '230;NSM;;;;;N;;;;;'],
    0x1E947 : ['ADLAM HAMZA', 'Mn', '230;NSM;;;;;N;;;;;'],
    0x1E948 : ['ADLAM CONSONANT MODIFIER', 'Mn', '230;NSM;;;;;N;;;;;'],
    0x1E949 : ['ADLAM GEMINATE CONSONANT MODIFIER', 'Mn', '230;NSM;;;;;N;;;;;'],
    0x1E94A : ['ADLAM NUKTA', 'Mn', '7;NSM;;;;;N;;;;;'],
    0x1E950 : ['ADLAM DIGIT ZERO', 'Nd', '0;R;;0;0;0;N;;;;;'],
    0x1E951 : ['ADLAM DIGIT ONE', 'Nd', '0;R;;1;1;1;N;;;;;'],
    0x1E952 : ['ADLAM DIGIT TWO', 'Nd', '0;R;;2;2;2;N;;;;;'],
    0x1E953 : ['ADLAM DIGIT THREE', 'Nd', '0;R;;3;3;3;N;;;;;'],
    0x1E954 : ['ADLAM DIGIT FOUR', 'Nd', '0;R;;4;4;4;N;;;;;'],
    0x1E955 : ['ADLAM DIGIT FIVE', 'Nd', '0;R;;5;5;5;N;;;;;'],
    0x1E956 : ['ADLAM DIGIT SIX', 'Nd', '0;R;;6;6;6;N;;;;;'],
    0x1E957 : ['ADLAM DIGIT SEVEN', 'Nd', '0;R;;7;7;7;N;;;;;'],
    0x1E958 : ['ADLAM DIGIT EIGHT', 'Nd', '0;R;;8;8;8;N;;;;;'],
    0x1E959 : ['ADLAM DIGIT NINE', 'Nd', '0;R;;9;9;9;N;;;;;'],
    0x1E95E : ['ADLAM INITIAL EXCLAMATION MARK', 'Pu', '0;R;;9;9;9;N;;;;;'],
    0x1E95F : ['ADLAM INITIAL QUESTION MARK', 'Pu', '0;R;;9;9;9;N;;;;;'],
}


# Sorting methods

# Sort by code point
def adlamByCodepoint():
  input = adlamCodePoints()
  return sorted(input)


# Sort by code point, interleaving by case
def adlamAlphaInterleave():
  input = adlamCodePoints()
  return sorted(input, key=alphaInterleaveKey)


# Key computer for code points for alpha interleave
def alphaInterleaveKey(v):
  if v < 0x1E922 or v > 0x1E944:
    return v
  else:
    return (v - 0x22) + 0.5  # to put lower letter after upper letter


# Create list with code point as first value.
def adlamCodePoints():
  return adlamProperties.keys()



reverseConvert = {
  0x1e900:  0x0628,
  0x1e901:  0x062a,
  0x1e902:  0x062b,
  0x1e903:  0x062c,
  0x1e904:  0x062d,
  0x1e905:  0x062e,
  0x1e906:  0x0633,
  0x1e907:  0x0634,
  0x1e908:  0x0635,
  0x1e909:  0x0636,
  0x1e90a:  0x0637,
  0x1e90b:  0x0638,
  0x1e90c:  0x0639,
  0x1e90d:  0x063a,
  0x1e90e:  0x0641,
  0x1e90f:  0x0642,
  0x1e910:  0x0643,
  0x1e911:  0x0644,
  0x1e912:  0x0645,
  0x1e913:  0x0646,
  0x1e914:  0x064a,
  0x1e915:  0x067b,
  0x1e916:  0x067e,
  0x1e917:  0x0683,
  0x1e918:  0x0684,
  0x1e919:  0x0686,
  0x1e91a:  0x0687,
  0x1e91b:  0x06a8,
  0x1e904:  0x06af,

    0x1e94a:  0x064b,
  0x1e946:  0x064c,
  0x1e945:  0x064d,
  0x1e944:  0x065d,
  0x1e948:  0x0650,
  0x1e947:  0x0651,

  0x1e950:  0x0660,
  0x1e951:  0x0661,
  0x1e952:  0x0662,
  0x1e953:  0x0663,
  0x1e954:  0x0664,
  0x1e955:  0x0665,
  0x1e956:  0x0666,
  0x1e957:  0x0667,
  0x1e958:  0x0668,
  0x1e959:  0x0669,

  0x0027:  0x064f,
}
