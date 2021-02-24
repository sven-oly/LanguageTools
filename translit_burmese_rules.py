#!/usr/local/bin/python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Includes the text for the 3 transliteration starting points.

TRANSLIT_MY_OKELL_JW = u"""
# Burmese to Okell transliteration, with modifications by Julian Wheatley

#
# Definitions
#

# Dependent vowel signs
$vs_AA = \u102B;
$vs_aa = \u102C;
$vs_i = \u102D;
$vs_ii = \u102E;
$vs_u = \u102F;
$vs_uu = \u1030;
$vs_e = \u1031;
$vs_ai = \u1032;

# Various signs
$anusvara = \u1036;
$visarga = \u1038;
$virama = \u1039;
$asat = \u103A;

# Dependent (medial) consonant signs
$med_y = \u103B;
$med_r = \u103C;
$med_w = \u103D;
$med_h = \u103E;

# Independent letters and letter-like punctuation symbols
$independent = [\u1000-\u102A \u103F \u104C-\u104F \u1050-\u1055];

$creaky = \u0330;
$high = \u0301;
$low = \u0300;
#$coda = [$creaky $high $low -h ou' a];  # TODO: remove if unused

#
# Preprocessing
#

::NFC;

# Replace U+102B TALL AA with U+102C AA. Their pronunciation is identical.
$vs_AA → $vs_aa;

# Unstack kinzi (င် plus U+1039 VIRAMA) into plain င်.
# Hmm, what would happen if the syllable ending in kinzi had non-low tone?
င် $virama → င်;

# Unstack everything else, i.e. replace U+1039 VIRAMA with U+103A ASAT.
$virama → $asat;

# Unstack U+103F GREAT SA.
ဿ → သ်သ;

# Insert a syllable boundary marker /./ before every independent letter.
::Null;
[^.$] { } $independent ([\u1037\u103B-\u103E])* [^\u103A] → .;

# Insert default inherent vowel: /a̰/ at the end, /a/ everywhere else.
::Null;
([\u1000-\u1021\u103F] [\u103B-\u103E]*) } [$] → $1 a $creaky;
([\u1000-\u1021\u103F] [\u103B-\u103E]*) } .  → $1 a;

# Allow for additional coda consonants.
#
# This only covers a few of the cases in which full coda consonants
# can appear in loanwords. The general situation is somewhat rare and
# is more easily dealt with in a formalism that can impose structural
# constraints on syllables more easily.
::Null;
$asat ($visarga)? [\u1000-\u102A] { $asat → ;

# Deal with ၎င်း early.
၎င်း → la.ɡa $high ʊ̯-h;

#
# Rhymes
#

::Null;

က် → ehou';

ဂ် → ehou';  # in မဂ္ဂဇင်း ~ မဂ်ဂဇင်း /mɛou'.ɡa.zɪ́-h/

င့် → ɪ $creaky -h;
င်း → ɪ $high -h;
င် → ɪ $low -h;

စ် → ɪou';  # maybe sometimes /eɪ̯ou'/

ဉ့် → ɪ $creaky -h;
ဉ်း → ɪ $high -h;
ဉ် → ɪ $low -h;

ည့် → eh $creaky;
ည်း → eh $high;
ည် → eh $low;

ဏ့် → a $creaky -h;
ဏ်း → a $high -h;
ဏ် → a $low -h;

တ် → aou';

န့် → a $creaky -h;
န်း → a $high -h;
န် → a $low -h;

ပ် → aou';

မ့် → a $creaky -h;
မ်း → a $high -h;
မ် → a $low -h;

ယ့် → eh $creaky;
ယ်း → eh $high;
ယ် → eh $low;

သ် → aou';

$vs_aa ဉ့် → ɪ $creaky -h;
$vs_aa ဉ်း → ɪ $high -h;
$vs_aa ဉ် → ɪ $low -h;
$vs_aa တ် → aou';
$vs_aa ဏ့် → a $creaky -h;
$vs_aa ဏ်း → a $high -h;
$vs_aa ဏ် → a $low -h;
$vs_aa န့် → a $creaky -h;
$vs_aa န်း → a $high -h;
$vs_aa န် → a $low -h;
$vs_aa ပ် → aou';  # in ကလာပ်စည်း /ka.laou'.sɛ́/ (club cell)
$vs_aa ယ့် → eh $creaky;
$vs_aa ယ်း → eh $high;
$vs_aa ယ် → eh $low;
$vs_aa ့ → a $creaky;  # redundant creaky tone
$vs_aa း → a $high;
$vs_aa → a $low;

$vs_i က် → eɪ̯ou';
$vs_i စ် → eɪ̯ou';
$vs_i တ် → eɪ̯ou';
$vs_i န့် → ei $creaky ɪ̯-h;
$vs_i န်း → ei $high ɪ̯-h;
$vs_i န် → ei $low ɪ̯-h;
$vs_i ပ် → eɪ̯ou';
$vs_i မ့် → ei $creaky ɪ̯-h;
$vs_i မ်း → ei $high ɪ̯-h;
$vs_i မ် → ei $low ɪ̯-h;
$vs_i $vs_u က် → aɪ̯ou';
$vs_i $vs_u င့် → a $creaky ɪ̯-h;
$vs_i $vs_u င်း → a $high ɪ̯-h;
$vs_i $vs_u င် → a $low ɪ̯-h;
$vs_i $vs_u ဏ့် → a $creaky ɪ̯-h;
$vs_i $vs_u ဏ်း → a $high ɪ̯-h;
$vs_i $vs_u ဏ် → a $low ɪ̯-h;
$vs_i $vs_u ယ့် → ou $creaky;
$vs_i $vs_u ယ်း → ou $high;
$vs_i $vs_u ယ် → ou $low;  # in ကိုယ် /kò/
$vs_i $vs_u ့ → ou $creaky;
$vs_i $vs_u း → ou $high;
$vs_i $vs_u → ou $low;
$vs_i $anusvara ့ → ei $creaky ɪ̯-h;
$vs_i $anusvara း → ei $high ɪ̯-h;
$vs_i $anusvara → ei $low ɪ̯-h;
$vs_i → i $creaky;

$vs_ii ့ → i $creaky;  # this does not usually occur
$vs_ii း → i $high;
$vs_ii → i $low;

$vs_u က် → ou̯ou';
$vs_u ဂ် → ou̯ou';
$vs_u ဏ့် → ou $creaky ʊ̯-h;
$vs_u ဏ်း → ou $high ʊ̯-h;
$vs_u ဏ် → ou $low ʊ̯-h;
$vs_u တ် → ou̯ou';
$vs_u န့် → ou $creaky ʊ̯-h;
$vs_u န်း → ou $high ʊ̯-h;
$vs_u န် → ou $low ʊ̯-h;
$vs_u ပ် → ou̯ou';
$vs_u မ့် → ou $creaky ʊ̯-h;
$vs_u မ်း → ou $high ʊ̯-h;
$vs_u မ် → ou $low ʊ̯-h;
$vs_u $anusvara ့ → ou $creaky ʊ̯-h;
$vs_u $anusvara း → ou $high ʊ̯-h;
$vs_u $anusvara → ou $low ʊ̯-h;
$vs_u → u $creaky;

$vs_uu ့ → u $creaky;  # this does not usually occur
$vs_uu း → u $high;
$vs_uu → u $low;

$vs_e တ် → ɪou';
$vs_e $vs_aa က် → au̯ou';
$vs_e $vs_aa င့် → a $creaky ʊ̯-h;
$vs_e $vs_aa င်း → a $high ʊ̯-h;
$vs_e $vs_aa င် → a $low ʊ̯-h;
$vs_e $vs_aa ့ → aq $creaky;
$vs_e $vs_aa း → aq $high;  # redundant high tone; this does not usually occur
$vs_e $vs_aa ် → aq $low;
$vs_e $vs_aa → aq $high;
$vs_e ့ → ei $creaky;
$vs_e း → ei $high;
$vs_e → ei $low;

$vs_ai ့ → eh $creaky;
$vs_ai း → eh $high;  # redundant high tone; this does not usually occur
$vs_ai → eh $high;

$anusvara ့ → a $creaky -h;
$anusvara း → a $high -h;
$anusvara → a $low -h;

$med_w တ် → ʊou';
$med_w န့် → ʊ $creaky -h;
$med_w န်း → ʊ $high -h;
$med_w န် → ʊ $low -h;
$med_w ပ် → ʊou';
$med_w မ့် → ʊ $creaky -h;
$med_w မ်း → ʊ $high -h;
$med_w မ် → ʊ $low -h;

#
# Medials
#

::Null;

# Palatalization of the velar stops before MEDIAL YA and MEDIAL RA:
# velar + /j/ ==> modern palatals.

ကျ → c-;
ချ → ch-;
# d͡ʑ;
ဂျ → j-;
ဃျ → j-;  # d͡ʑ;

ကြ → c-;
ခြ → ch-;
ဂြ → d͡ʑ;
ဃြ → d͡ʑ;

# Remove redundant MEDIAL YA and MEDIAL RA after initial YA.
ယ { [$med_y $med_r] → ;

# Reorder the medials so that U+103E SIGN MEDIAL HA comes before any
# other medials.

# First, push U+103E MEDIAL HA before U+103D MEDIAL WA.
\u103D \u103E → \u103E \u103D;
::Null;
# Now MEDIAL WA comes last.

# Produce the palatal ʃ sh- from (SA|LA)+YA+HA.
သျှ → sh-;
လျှ → sh-;

# Second, push U+103E MEDIAL HA before U+103C MEDIAL RA.
\u103C \u103E → \u103E \u103C;
::Null;

# Finally, push U+103E MEDIAL HA before U+103B MEDIAL YA.
\u103B \u103E → \u103E \u103B;
::Null;

# Consume MEDIAL HA and apply devoicing.

ငှ → hng-;
ဉှ → hny-;
ညှ → hny-;
ဏှ → hn-;
နှ → hn-;
မှ → hm-;
ယှ → sh-;
ရှ → sh-;
လှ → hl-;
ဝှ → w̥;
ဠှ → hl-;

# Drop any remaining U+103E MEDIAL HA.
\u103E → ;

# Simplify medial cluster /jw/ to /w/, i.e. drop U+103B MEDIAL YA and
# U+103C MEDIAL RA before U+103D MEDIAL WA.  # TODO: revisit this
\u103B } \u103D → ;
\u103C } \u103D → ;

\u103B → y-;  #j;
\u103C → y-;  #j;
\u103D → w-;

#
# Initials
#

# Velars
က → k-;
ခ → kʰ-;
ဂ → ɡ-;
ဃ → ɡ-;
င → ng-;

# Historic palatals
စ → s-;
ဆ → hs-;
ဇ → z-;
ဈ → z-;
ဉ → ny-;
ည → ny-;

# Alveolars
ဋ → t-;
ဌ → ht-;
ဍ → d-;
ဎ → d-;
ဏ → n-;

# Historic dentals ==> alveolars
တ → t-;
ထ → ht-;
ဒ → d-;
ဓ → d-;
န → n-;

# Labials
ပ → p-eh;
ဖ → hp-eh;
ဗ → b-eh;
ဘ → b-eh;
မ → m-;

# Other letters
ယ → y-;
# historic /r/
ရ → y-;
လ် → ;  # final, typically not pronounced in native words
လ → l-;
ဝ → w-;
သ → dh-; # historic /s/ ==> modern dental
ဟ → h-;
ဠ → l-;
အ → ou';

# Independent vowels

ဣ့ → ou'ḭ;  # redundant creaky tone; this does not usually occur
ဣး → ou'í;  # this does not usually occur
ဣ → ou'ḭ;

ဤ့ → ou'ḭ;  # this does not usually occur
ဤး → ou'í;  # this does not usually occur
ဤ → ou'ì;

ဥ့ → ou'ṵ;  # redundant creaky tone; this does not usually occur
ဥး → ou'ú;  # this does not usually occur
ဥ → ou'ṵ;

ဦ့ → ou'ṵ;  # this does not usually occur
ဦး → ou'ú;
ဦ → ou'ù;

ဧ့ → ou'ḛ;  # this does not usually occur
ဧး → ou'é;
ဧ → ou'è;

ဩ့ → ou'aq̰;  # this does not usually occur
ဩး → ou'aq́;  # redundant high tone; this does not usually occur
ဩ → ou'aq́;

ဪ့ → ou'aq̰;  # this does not usually occur
ဪး → ou'aq́;  # this does not usually occur
ဪ → ou'aq̀;

# Various signs

၌ → n̥aɪ̯ou';
၍ → jwḛ;
# ၎င်း was handled earlier.
၏ → ou'ḭ;

#
# Postprocessing
#

# Delete any remaining U+103A ASAT.
$asat → ;

# Delete zero-width space, non-joiner, joiner.
[\u200B-\u200D] → ;

::NFC;
"""

TRANSLIT_MY_FONIPA = """
# Pronunciation rules for Burmese.
#
# The following rules are lexical and heuristic: lexical in the sense
# that they generate phoneme strings which may further undergo
# post-lexical phonological processes, in particular voicing, to
# result in actual surface forms; heuristic in the sense that they try
# to resolve ambiguities, especially around reduced vowels, in a
# systematic way that may be incorrect in many situations. Vowel
# reduction depends on many factors, such as morphemic structure,
# which are not available here.

#
# Definitions
#

# See https://en.wikipedia.org/wiki/Help:IPA/Burmese

# Dependent vowel signs
$vs_AA = \u102B;
$vs_aa = \u102C;
$vs_i = \u102D;
$vs_ii = \u102E;
$vs_u = \u102F;
$vs_uu = \u1030;
$vs_e = \u1031;
$vs_ai = \u1032;

# Various signs
$anusvara = \u1036;
$visarga = \u1038;
$virama = \u1039;
$asat = \u103A;

# Dependent (medial) consonant signs
$med_y = \u103B;
$med_r = \u103C;
$med_w = \u103D;
$med_h = \u103E;

# Independent letters and letter-like punctuation symbols
$independent = [\u1000-\u102A \u103F \u104C-\u104F \u1050-\u1055];

$creaky = \u0330;
$high = \u0301;
$low = \u0300;
# $coda = [$creaky $high $low ɴ ʔ ə];  # TODO: remove if unused

#
# Preprocessing
#

::NFC;

# Replace U+102B TALL AA with U+102C AA. Their pronunciation is identical.
$vs_AA → $vs_aa;

# Unstack kinzi (င် plus U+1039 VIRAMA) into plain င်.
# Hmm, what would happen if the syllable ending in kinzi had non-low tone?
င် $virama → င်;

# Unstack everything else, i.e. replace U+1039 VIRAMA with U+103A ASAT.
$virama → $asat;

# Unstack U+103F GREAT SA.
ဿ → သ်သ;

# Insert a syllable boundary marker /./ before every independent letter.
::Null;
[^.$] { } $independent ([\u1037\u103B-\u103E])* [^\u103A] → .;

# Insert default inherent vowel: /a̰/ at the end, /ə/ everywhere else.
::Null;
([\u1000-\u1021\u103F] [\u103B-\u103E]*) } [$] → $1 a $creaky;
([\u1000-\u1021\u103F] [\u103B-\u103E]*) } .  → $1 ə;

# Allow for additional coda consonants.
#
# This only covers a few of the cases in which full coda consonants
# can appear in loanwords. The general situation is somewhat rare and
# is more easily dealt with in a formalism that can impose structural
# constraints on syllables more easily.
::Null;
$asat ($visarga)? [\u1000-\u102A] { $asat → ;

# Deal with ၎င်း early.
၎င်း → lə.ɡa $high ʊ̯ɴ;

#
# Rhymes
#

::Null;

က် → ɛʔ;

ဂ် → ɛʔ;  # in မဂ္ဂဇင်း ~ မဂ်ဂဇင်း /mɛʔ.ɡə.zɪ́ɴ/

င့် → ɪ $creaky ɴ;
င်း → ɪ $high ɴ;
င် → ɪ $low ɴ;

စ် → ɪʔ;  # maybe sometimes /eɪ̯ʔ/

ဉ့် → ɪ $creaky ɴ;
ဉ်း → ɪ $high ɴ;
ဉ် → ɪ $low ɴ;

ည့် → ɛ $creaky;
ည်း → ɛ $high;
ည် → ɛ $low;

ဏ့် → a $creaky ɴ;
ဏ်း → a $high ɴ;
ဏ် → a $low ɴ;

တ် → aʔ;

န့် → a $creaky ɴ;
န်း → a $high ɴ;
န် → a $low ɴ;

ပ် → aʔ;

မ့် → a $creaky ɴ;
မ်း → a $high ɴ;
မ် → a $low ɴ;

ယ့် → ɛ $creaky;
ယ်း → ɛ $high;
ယ် → ɛ $low;

သ် → aʔ;

$vs_aa ဉ့် → ɪ $creaky ɴ;
$vs_aa ဉ်း → ɪ $high ɴ;
$vs_aa ဉ် → ɪ $low ɴ;
$vs_aa တ် → aʔ;
$vs_aa ဏ့် → a $creaky ɴ;
$vs_aa ဏ်း → a $high ɴ;
$vs_aa ဏ် → a $low ɴ;
$vs_aa န့် → a $creaky ɴ;
$vs_aa န်း → a $high ɴ;
$vs_aa န် → a $low ɴ;
$vs_aa ပ် → aʔ;  # in ကလာပ်စည်း /kə.laʔ.sɛ́/ (club cell)
$vs_aa ယ့် → ɛ $creaky;
$vs_aa ယ်း → ɛ $high;
$vs_aa ယ် → ɛ $low;
$vs_aa ့ → a $creaky;  # redundant creaky tone
$vs_aa း → a $high;
$vs_aa → a $low;

$vs_i က် → eɪ̯ʔ;
$vs_i စ် → eɪ̯ʔ;
$vs_i တ် → eɪ̯ʔ;
$vs_i န့် → e $creaky ɪ̯ɴ;
$vs_i န်း → e $high ɪ̯ɴ;
$vs_i န် → e $low ɪ̯ɴ;
$vs_i ပ် → eɪ̯ʔ;
$vs_i မ့် → e $creaky ɪ̯ɴ;
$vs_i မ်း → e $high ɪ̯ɴ;
$vs_i မ် → e $low ɪ̯ɴ;
$vs_i $vs_u က် → aɪ̯ʔ;
$vs_i $vs_u င့် → a $creaky ɪ̯ɴ;
$vs_i $vs_u င်း → a $high ɪ̯ɴ;
$vs_i $vs_u င် → a $low ɪ̯ɴ;
$vs_i $vs_u ဏ့် → a $creaky ɪ̯ɴ;
$vs_i $vs_u ဏ်း → a $high ɪ̯ɴ;
$vs_i $vs_u ဏ် → a $low ɪ̯ɴ;
$vs_i $vs_u ယ့် → o $creaky;
$vs_i $vs_u ယ်း → o $high;
$vs_i $vs_u ယ် → o $low;  # in ကိုယ် /kò/
$vs_i $vs_u ့ → o $creaky;
$vs_i $vs_u း → o $high;
$vs_i $vs_u → o $low;
$vs_i $anusvara ့ → e $creaky ɪ̯ɴ;
$vs_i $anusvara း → e $high ɪ̯ɴ;
$vs_i $anusvara → e $low ɪ̯ɴ;
$vs_i → i $creaky;

$vs_ii ့ → i $creaky;  # this does not usually occur
$vs_ii း → i $high;
$vs_ii → i $low;

$vs_u က် → oʊ̯ʔ;
$vs_u ဂ် → oʊ̯ʔ;
$vs_u ဏ့် → o $creaky ʊ̯ɴ;
$vs_u ဏ်း → o $high ʊ̯ɴ;
$vs_u ဏ် → o $low ʊ̯ɴ;
$vs_u တ် → oʊ̯ʔ;
$vs_u န့် → o $creaky ʊ̯ɴ;
$vs_u န်း → o $high ʊ̯ɴ;
$vs_u န် → o $low ʊ̯ɴ;
$vs_u ပ် → oʊ̯ʔ;
$vs_u မ့် → o $creaky ʊ̯ɴ;
$vs_u မ်း → o $high ʊ̯ɴ;
$vs_u မ် → o $low ʊ̯ɴ;
$vs_u $anusvara ့ → o $creaky ʊ̯ɴ;
$vs_u $anusvara း → o $high ʊ̯ɴ;
$vs_u $anusvara → o $low ʊ̯ɴ;
$vs_u → u $creaky;

$vs_uu ့ → u $creaky;  # this does not usually occur
$vs_uu း → u $high;
$vs_uu → u $low;

$vs_e တ် → ɪʔ;
$vs_e $vs_aa က် → aʊ̯ʔ;
$vs_e $vs_aa င့် → a $creaky ʊ̯ɴ;
$vs_e $vs_aa င်း → a $high ʊ̯ɴ;
$vs_e $vs_aa င် → a $low ʊ̯ɴ;
$vs_e $vs_aa ့ → ɔ $creaky;
$vs_e $vs_aa း → ɔ $high;  # redundant high tone; this does not usually occur
$vs_e $vs_aa ် → ɔ $low;
$vs_e $vs_aa → ɔ $high;
$vs_e ့ → e $creaky;
$vs_e း → e $high;
$vs_e → e $low;

$vs_ai ့ → ɛ $creaky;
$vs_ai း → ɛ $high;  # redundant high tone; this does not usually occur
$vs_ai → ɛ $high;

$anusvara ့ → a $creaky ɴ;
$anusvara း → a $high ɴ;
$anusvara → a $low ɴ;

$med_w တ် → ʊʔ;
$med_w န့် → ʊ $creaky ɴ;
$med_w န်း → ʊ $high ɴ;
$med_w န် → ʊ $low ɴ;
$med_w ပ် → ʊʔ;
$med_w မ့် → ʊ $creaky ɴ;
$med_w မ်း → ʊ $high ɴ;
$med_w မ် → ʊ $low ɴ;

#
# Medials
#

::Null;

# Palatalization of the velar stops before MEDIAL YA and MEDIAL RA:
# velar + /j/ ==> modern palatals.

ကျ → t͡ɕ;
ချ → t͡ɕʰ;
ဂျ → d͡ʑ;
ဃျ → d͡ʑ;

ကြ → t͡ɕ;
ခြ → t͡ɕʰ;
ဂြ → d͡ʑ;
ဃြ → d͡ʑ;

# Remove redundant MEDIAL YA and MEDIAL RA after initial YA.
ယ { [$med_y $med_r] → ;

# Reorder the medials so that U+103E SIGN MEDIAL HA comes before any
# other medials.

# First, push U+103E MEDIAL HA before U+103D MEDIAL WA.
\u103D \u103E → \u103E \u103D;
::Null;
# Now MEDIAL WA comes last.

# Produce the palatal ʃ from (SA|LA)+YA+HA.
သျှ → ʃ;
လျှ → ʃ;

# Second, push U+103E MEDIAL HA before U+103C MEDIAL RA.
\u103C \u103E → \u103E \u103C;
::Null;

# Finally, push U+103E MEDIAL HA before U+103B MEDIAL YA.
\u103B \u103E → \u103E \u103B;
::Null;

# Consume MEDIAL HA and apply devoicing.

ငှ → ŋ̊;
ဉှ → ɲ̥;
ညှ → ɲ̥;
ဏှ → n̥;
နှ → n̥;
မှ → m̥;
ယှ → ʃ;
ရှ → ʃ;
လှ → l̥;
ဝှ → w̥;
ဠှ → l̥;

# Drop any remaining U+103E MEDIAL HA.
\u103E → ;

# Simplify medial cluster /jw/ to /w/, i.e. drop U+103B MEDIAL YA and
# U+103C MEDIAL RA before U+103D MEDIAL WA.  # TODO: revisit this
\u103B } \u103D → ;
\u103C } \u103D → ;

\u103B → j;
\u103C → j;
\u103D → w;

#
# Initials
#

# Velars
က → k;
ခ → kʰ;
ဂ → ɡ;
ဃ → ɡ;
င → ŋ;

# Historic palatals
စ → s;
ဆ → sʰ;
ဇ → z;
ဈ → z;
ဉ → ɲ;
ည → ɲ;

# Alveolars
ဋ → t;
ဌ → tʰ;
ဍ → d;
ဎ → d;
ဏ → n;

# Historic dentals ==> alveolars
တ → t;
ထ → tʰ;
ဒ → d;
ဓ → d;
န → n;

# Labials
ပ → p;
ဖ → pʰ;
ဗ → b;
ဘ → b;
မ → m;

# Other letters
ယ → j;
ရ → j;  # historic /r/
လ် → ;  # final, typically not pronounced in native words
လ → l;
ဝ → w;
သ → θ;  # historic /s/ ==> modern dental
ဟ → h;
ဠ → l;
အ → ʔ;

# Independent vowels

ဣ့ → ʔḭ;  # redundant creaky tone; this does not usually occur
ဣး → ʔí;  # this does not usually occur
ဣ → ʔḭ;

ဤ့ → ʔḭ;  # this does not usually occur
ဤး → ʔí;  # this does not usually occur
ဤ → ʔì;

ဥ့ → ʔṵ;  # redundant creaky tone; this does not usually occur
ဥး → ʔú;  # this does not usually occur
ဥ → ʔṵ;

ဦ့ → ʔṵ;  # this does not usually occur
ဦး → ʔú;
ဦ → ʔù;

ဧ့ → ʔḛ;  # this does not usually occur
ဧး → ʔé;
ဧ → ʔè;

ဩ့ → ʔɔ̰;  # this does not usually occur
ဩး → ʔɔ́;  # redundant high tone; this does not usually occur
ဩ → ʔɔ́;

ဪ့ → ʔɔ̰;  # this does not usually occur
ဪး → ʔɔ́;  # this does not usually occur
ဪ → ʔɔ̀;

# Various signs

၌ → n̥aɪ̯ʔ;
၍ → jwḛ;
# ၎င်း was handled earlier.
၏ → ʔḭ;

#
# Postprocessing
#

# Delete any remaining U+103A ASAT.
$asat → ;

# Delete zero-width space, non-joiner, joiner.
[\u200B-\u200D] → ;

::NFC;
"""

TRANSLIT_MY_LATIN = """
# Author: Arne Mauser, Moe Aung Naing
# Description: Myanmar Romanization

$consonants = [\u1000-\u1021];

# Character combinations: "1 consonant 5 vowels"
# ($consonants) ြောင့် > | $1 yount;
($consonants) \u103C\u1031\u102C\u1004\u103A\u1037 > | $1 yount;

# ($consonants) ျောင့် > | $1 yount;
($consonants)  \u103B\u1031\u102C\u1004\u103A\u1037 > | $1 yount;

# ($consonants) ြောင်း > | $1 yaungg;
($consonants) \u103C\u1031\u102C\u1004\u103A\u1038 > | $1 yaungg;

# ($consonants) ျောင်း > | $1 yaungg;
($consonants) \u103B\u1031\u102C\u1004\u103A\u1038  > | $1 yaungg;



#  Character combinations: "1 consonant 4 vowels"
# ိုင်း > ine;
 \u102D\u102F\u1004\u103A\u1038 > ine;

# ($consonants) ြောင် > | $1 yaung;
($consonants) \u103C\u1031\u102C\u1004\u103A  > | $1 yaung;

# ($consonants) ျောင် > | $1 yaung;
($consonants) \u103B\u1031\u102C\u1004\u103A  > | $1 yaung;



#  Character combinations: "1 consonant 3 vowels"
# ောက် > out; # 1c3v
\u1031\u102C\u1000\u103A > out;

# ေါက် > out; # 1c3v
\u1031\u102B\u1000\u103A > out;

# ိုက် > ite; # 1c3v
\u102D\u102F\u1000\u103A > ite;

# ိုင် > ine; # 1c3v
\u102D\u102F\u1004\u103A > ine;

# ိုယ် > o; # 1c3v
\u102D\u102F\u101A\u103A > o;

# ျင်း > yinn;
\u103B\u1004\u103A\u1038 > yinn;

# ျိန် > yane;
\u103B\u102D\u1014\u103A > yane;

# ($consonants) ောင်း > | $1 aungg;
($consonants) \u1031\u102C\u1004\u103A\u1038 > | $1 aungg;

# ($consonants) ေါင်း > | $1 aungg;
($consonants) \u1031\u102B\u1004\u103A\u1038 > | $1 aungg;

# ($consonants) ောင် > | $1 aung;
($consonants) \u1031\u102C\u1004\u103A > | $1 aung;

# ($consonants) ေါင် >  | $1 aung;
($consonants) \u1031\u102B\u1004\u103A > | $1 aung;

# ($consonants) ြင့် > | $1 yint;
($consonants) \u103C\u1004\u103A\u1037 > | $1 yint;

# ($consonants) ြင်း > | $1 yinn;
($consonants) \u103C\u1004\u103A\u1038 > | $1 yinn;

# ($consonants) ြင် > | $1 yin;
($consonants) \u103C\u1004\u103A > | $1 yin;

# ($consonants) ျင့် > | $1 yint;
($consonants) \u103B\u1004\u103A\u1037 > | $1 yint;

# ($consonants) ျင်း > | $1 yinn;
($consonants) \u103B\u1004\u103A\u1038 > | $1 yinn;

# ($consonants) ျင် > | $1 yin;
($consonants) \u103B\u1004\u103A > | $1 yin;

# ($consonants) ြစ် > | $1 yit;
($consonants) \u103C\u1005\u103A > | $1 yit;

# ($consonants) ျစ် > | $1 yit;
($consonants)  \u103B\u1005\u103A > | $1 yit;

# ($consonants) ြည် > | $1 yi;
($consonants) \u103C\u100A\u103A > | $1 yi;

# ($consonants) ြန် > | $1 yan;
($consonants) \u103C\u1014\u103A > | $1 yan;

# ($consonants) ြန်း > | $1 yann;
($consonants) \u103C\u1014\u103A\u1038 > | $1 yann;

# ($consonants) ျန်း > | $1 yann;
($consonants) \u103B\u1014\u103A\u1038 > | $1 yann;

# ိမ်း > aim;
\u102D\u1019\u103A\u1038 > aim;

# ိန်း > ein;
\u102D\u1014\u103A\u1038 > ein;



#  Character combinations: "4 vowels"
# ျိုး > yoe;
\u103B\u102D\u102F\u1038 > yoe;

# ($consonants) ြော် > | $1 yaw;
($consonants) \u103C\u1031\u102C\u103A > | $1 yaw;

# ($consonants) ျော် > | $1 yaw;
($consonants) \u103B\u1031\u102C\u103A > | $1 yaw;



# Character combinations: "1 consonant 2 vowels"
# ဦး > u;
\u1025\u102E\u1038 > u;  # this is a misspelling of \u1026

# ွက် > wat;
\u103D\u1000\u103A > wat;

# ွင် > win;
\u103D\u1004\u103A > win;

# န်း > ann;
\u1014\u103A\u1038 > ann;

# န့် > ant;
\u1014\u103A\u1037 > ant;

# င်း > inn;
\u1004\u103A\u1038 > inn;

# င့် > int;
\u1004\u103A\u1037 > int;

# ည်း > ee;
\u100A\u103A\u1038 > ee;

# ည့် > eet; # 1c2v
\u100A\u103A\u1037 > eet;

# ိတ် > ate; # 1c2v
\u102D\u1010\u103A > ate;

# ုတ် > ote; # 1c2v
\u102F\u1010\u103A > ote;

# ုန် > one; # 1c2v
\u102F\u1014\u103A > one;

# ုပ် > ote; # 1c2v
\u102F\u1015\u103A > ote;

# ိမ် > aim; # 1c2v
\u102D\u1019\u103A > ain;

# ိန် > ein;
\u102D\u1014\u103A > ein;

# ယ့် > ae; # 1c2v
\u101A\u103A\u1037 > ae;

# သျှ > sh; # 1c2v
\u101E\u103B\u103E > sh;

# လျှ > sh; # 1c2v
\u101C\u103B\u103E > sh;

# ရွှ > shw; # 1c2v
\u101B\u103D\u103E > shw;

# ြတ် > yat;
\u103C\u1010\u103A > yat;

# ျတ် > yat;
\u103B\u1010\u103A > yat;

# ြက်  > yet;
\u103C\u1000\103A > yet;

# ျက် > yet;
\u103B\u1000\u103A > yet;

# ျင် > yin;
\u103B\u1004\u103A > yin;

# ြင် > yin;
\u103C\u1004\u103A > yin;




#  Character combinations: "3 vowels"
# ော့ > ot;
\u1031\u102C\u1037 > ot;

# ေါ့ > ot;
\u1031\u102B\u1037 > ot;

# ော် > aw;
\u1031\u102C\u103A > aw;

# ေါ် > aw;
\u1031\u102B\u103A > aw;

# ို့ > hoet; # 3v
\u102D\u102F\u1037 > hoet;

# ိုး > oe;
\u102D\u102F\u1038 > oe;

# ုံး > one; # 3v
\u102F\u1036\u1038 > one;

# ျား > yarr;
\u103B\u102C\u1038 > yarr;

# ြား > yarr;
\u103C\u102C\u1038 > yarr;

# ြီး > yee;
\u103C\u102E\u1038 > yee;

# ($consonants) ြော  > | $1 yaww;
($consonants) \u103C\u1031\u102C > | $1 yaww;

# ($consonants) ျော  > | $1 yaww;
($consonants) \u103B\u1031\u102C > | $1 yaww;

# ွား > warr;
\u103D\u102C\u1038 > warr;

# ွေ့ > wae;
\u103D\u1031\u1037 > wae;




#  Character combinations: "1 consonant 1 vowel"
#က် > at;
\u1000\u103A > at;

# င် > in;
\u1004\u103A > in;

# စ် > it;
\u1005\u103A > it;

# ဥ် > in;
\u1009\u103A > in;
\u1025\u103A > in;  # \u1025 is a misspelling of \u1009

# ည် > i;
\u100A\u103A > i;

# ပ် > ut;
\u1015\u103A > ut;

# ယ် > al;
\u101A\u103A > al;

# တ် > at;
\u1010\u103A > at;

# န် > an;
\u1014\u103A > an;

# ရှ > sh; # 1c1v
\u101B\u103E > sh;

#  Character combinations: "2 vowel"
# ြီ > ye;
\u103C\u102E > ye;

# ြု > yu;
\u103C\u102F > yu;

# ြေ > yay;
\u103C\u1031 > yay;

# ွေ > way;
\u103D\u1031 > way;

# ွဲ > wal;
\u103D\u1032 > wal;

# ှု > hu;
\u103E\u102F > hu;

# ူ့ > hu;
\u1030\u1037 > hu;

# ူး > uu;
\u1030\u1038 > uu;

# ါး > arr;
\u102B\u1038 > arr;

# ား > arr;
\u102C\u1038 > arr;

# ီး > ee;
\u102E\u1038 > ee;

# ေး > ayy;
\u1031\u1038 > ayy;

# ေ့ > ae;
\u1031\u1037 > ae;

# ဲ့ > ae;
\u1032\u1037 > ae;

# ော > aw;
\u1031\u102C > aw;

# ေါ > aw;
\u1031\u102B > aw;

# ို > o;
\u102D\u102F > o;

# ုံ > one;
\u102F\u1036 > one;

# ှာ > har;
\u103E\u102C > har;





# Character combinations: "1 vowel"

# ါ > ar;
\u102B > ar;

# ာ  > ar;
\u102C > ar;

# ိ > i;
\u102D > i;

# ီ  > e;
\u102E > e;

# ု  > u;
\u102F > u;

# ူ > uu;
\u1030 > uu;

# ေ  > ay;
\u1031 > ay;

# ဲ  > ell;
\u1032 > ell;

# ံ  > an;
\u1036 > an;

# ျ > ya;
\u103B > ya;

# ြ  > ya;
\u103C > ya;

#  ှ  > ha;
\u103E > ha;


# Modern Myanmar digits
\u1040 > 0 ;
\u1041 > 1 ;
\u1042 > 2 ;
\u1043 > 3 ;
\u1044 > 4 ;
\u1045 > 5 ;
\u1046 > 6 ;
\u1047 > 7 ;
\u1048 > 8 ;
\u1049 > 9 ;

# Myanmar Punctuation

\u104A > \, ; # MYANMAR SIGN LITTLE SECTION
\u104B > \. ; # MYANMAR SIGN SECTION
\u104C > ; # MYANMAR SYMBOL LOCATIVE
\u104D > ; # MYANMAR SYMBOL COMPLETED

# Inserting 'a' in between to consonants.

($consonants) ($consonants) > | $1 a $2 ;

# Consonant clusters
# က္က > kk ;
# က္ခ > khk ;
# ဂ္ဂ > gg ;
# ဂ္ဃ > ggh ;
# င်္ဂ > ngg ;

# Fundamental Burmese Consonants:
# က > k;
\u1000 > k;

# ခ > hk;
\u1001 > hk;

# ဂ > g;
\u1002 > g;

# ဃ > gh;
\u1003 > gh;

# င > ng;
\u1004 > ng;

# စ > hc;
\u1005 > hc;

# ဆ > s;
\u1006 > s;

# ဇ > j;
\u1007 > j;

# ဈ > jh;
\u1008 > jh;

# ဉ > ny;
\u1009 > ny;

# ည > ny;
\u100A > ny;

# ဋ > t;
\u100B > t;

# ဌ > ht;
\u100C > ht;

# ဍ > d;
\u100D > d;

# ဎ > dh;
\u100E > dh;

# ဏ > n;
\u100F > n;

# တ > t;
\u1010 > t;

# ထ > ht;
\u1011 > ht;

# ဒ > d;
\u1012 > d;

# ဓ > dh;
\u1013 > dh;

# န > n;
\u1014 > n;

# ပ > p;
\u1015 > p;

# ဖ > hp;
\u1016 > hp;

# ဗ > b;
\u1017 > b;

# ဘ > bh;
\u1018 > bh;

# မ > m;
\u1019 > m;

# ယ > y;
\u101A > y;

# ရ > r;
\u101B > r;

# လ > l;
\u101C > l;

# ဝ > w;
\u101D > w;

# သ > s;
\u101E > s;

# ဟ > h;
\u101F > h;

# ဠ > l;
\u1020 > l;

# အ > a;
\u1021 > a;

# ဣ > i;
\u1023 > i;

# ဤ > i;
\u1024 > i;

# ဥ > u;
\u1025 > u;

# ဦ > u;
\u1026 > u;

# ဧ > e;
\u1027 > e;

# ဩ > au;
\u1029 > au;

# ဪ > au;
\u102A > au;

# TODO: this character repeats the previous romanized letter
# း > ;
\u1038 > ;

# ့  > ;
\u1037 > ;

#  ်  > ;
\u103A > ;

# ၏ > eat ;
\u104F > eat;

# ္  > ;
\u1039 > ;

# Leftovers

\u103D > w;

::NFC;
"""