DESCRIPTION = u'Convert ASCII Chakma encoded text to Unicode.  28-May-2017'
TRANS_LIT_RULES = KNU_UNICODE_TRANSLITERATE = u"""
# Ignore inserted invisible spaces
#\u200b > ;

# From Ben's conversion.
#  \u0020 > \u0020 ; # space
  \u0021 > \u100a ; # !
  \u0022 > \u103a \u102c ; # "
  # \u0023 > \u1042 ; # # PROBLEM
  # \u0024 > \u1043 ; # # PROBLEM
  #  \u0024 > \u002e ; # $
  \u0025 > \u101b ; # %
  \u0026 > \u101b ; # &
  \u0027 > \u1012 ; # '
 #  \u002a > \u1002 ; # *
 #  \u002b > \u102f \u103e ; # +
 #\u002c > \u101a ; # ,
 \u002d > \u103c ; # -
 # \u002e > \u1063 \u103a ; # .
 \u002f > \u201d ; # /
 \u0030 > \u1040 ; # 0
 \u0031 > \u1041 ; # 1
 \u0032 > \u1042 ; # 2
 \u0033 > \u1043 ; # 3
 \u0034 > \u1044 ; # 4
 \u0035 > \u1045 ; # 5
 \u0036 > \u1046 ; # 6
 \u0037 > \u1047 ; # 7
 \u0038 > \u1048 ; # 8
 \u0039 > \u1049 ; # 9
 # \u003a > \u2605 ; # colon
 # \u003b > \u1038 ; # semicolon
 #  \u003c > \u002c ; # <
 \u003d > \u002d ; # =
 #  \u003e > \u1062 \u103a ; # >
 #  \u003f > \u201c ; # ?
 \u0040 > \u102c ; # @
 \u0041 > \u0020 ; # A
 \u0042 > \u1039 \u1018 ; # B
 \u0043 > \u1003 ; # C
 \u0044 > \u102e ; # D
 \u0045 > \u1014 ; # E
 \u0046 > \u1060 ; # F
 \u0047 > \u103d ; # G
 \u0048 > \u1036 ; # H
 \u0049 > \u002e ; # I
 \u004a > \u1032 ; # J
 \u004b > \u102f ; # K
 \u004c > \u1030 ; # L
 \u004d > \u1014 \u1037 ; # M
 \u004e > \u1039 \u1012 ; #N
 \u004f > \u103e \u1037 ; # O
 \u0050 > \u1039 \u1005 ; #P
 \u0051 > \u1039 \u1001 ; #Q
 \u0052 > \u1064 ; # R
 \u0053 > \u103e ; # S
 \u0054 > \u103a \u102f ; #T
 \u0055 > \u103d \u1037 ; # U
 \u0056 > \u103b \u1037 ; # V
 \u0057 > \u1039 \u1010; #W
 \u0058 > \u1062 ; # X
 \u0059 > \u100b \u103a ; #Y
 \u005a > \u1007 ; # Z
 #  \u005b > \u101f ; # [
 #  \u005d > \u003d ; # ]
 \u005f > \u103c ; # _
 \u0061 > \u1031 ; #a
 \u0062 > \u1018 ; # b
 \u0063 > \u1001 ; # c
 \u0064 > \u102d ; # d
 \u0065 > \u1014 ; # e
 \u0066 > \u103a ; # f
 \u0067 > \u102b ; # g
 \u0068 > \u1037 ; # h
 \u0069 > \u1004 ; # i
 \u006a > \u103c ; # j
 \u006b > \u102f ; # k
 \u006c > \u1030 ; # l
 \u006d > \u1065 \u103a ; # m  ?? Is this the right character?
 \u006e > \u100a ; # n
 \u006f > \u101e ; # o
 \u0070 > \u1005 ; # p
 \u0071 > \u1006 ; # q
 \u0072 > \u1019 ; # r
 \u0073 > \u103b ; # s
 \u0074 > \u1021 ; # t
 \u0075 > \u1000 ; # u
 \u0076 > \u101c ; # v
 \u0077 > \u1010 ; # w
 \u0078 > \u1011 ; # x
 \u0079 > \u1015 ; # y
 \u007a > \u1016 ; # z
##### STAGE (2): POST REORDERING RULES FOR UNICODE RENDERING
::Null;
\u1044 \u103a > | \u104E \u103A ;
($nondigits) \u1040 ([\u102B-\u103F]) > $1 \u101D $2;
\u1031 \u1040 ($nondigits) > \u1031 \u101D $1;
\u1025 \u103A > \u1009 \u103A;
\u1025 \u102E > \u1026;
\u1037\u103A > \u103A\u1037;
\u1036 ($umedial*) ($vowelsign+) > $1 $2 \u1036 ;
([\u102B\u102C\u102F\u1030]) ([\u102D\u102E\u1032]) > $2 $1;
\u103C ($consonant) > $1 \u103C;
\u102f \u103c ($consonant) > $1 \u103c \u102f ;
##### Stage 3
::Null;
([\u1031]+) $ukinzi ($consonant) > $ukinzi $2 \u1031;
\u1031 ($consonant) ($umedial+) > $1 $2 \u1031;
# MAYTBE FIX THIS FOR CURSOR POSITION
\u1031 ($consonant) ([^\u103B-\u103E]) > $1 \u1031 $2;
\u103C \u103A \u1039 ($consonant) > \u103A \u1039 $1 \u103C;
\u1036 ($umedial+) > $1 \u1036;
\u1038 ([\u1036\u1037\u103A\u102d\u102f\u1032\u103d]) > $1 \u1038;
##### Stage 4
::Null;
([\u103C\u103D\u103E]+) \u103B > \u103B $1;
([\u103D\u103E]+) \u103C > \u103C $1;
\u103E\u103D > \u103D\u103E ;
([\u1031]+) ($vowelsign*) \u1039 ($consonant) > \u1039 $3 $1 $2;
($vowelsign+) \u1039 ($consonant) > \u1039 $2 $1;
($umedial) ([\u1031]+) ($umedial*) > $1 $3 $2;
\u1037 ([\u102D-\u1030\u1032\u1036]) > $1 \u1037;
\u1037 ($umedial+) > $1 \u1037;
($vowelsign+) ($umedial+) > $2 $1;
($consonant) ([\u102B-\u1032\u1036\u103B-\u103E]) \u103A ($consonant)> $1 \u103A $2 $3;
# Karen
\u102c \u103a > \u103a \u102c;
\u1038 ([\u1036\u1037\u103A\u102d\u102e\u102f\u1032\u103d]) > $1 \u1038;
\u1032 \u103d > \u103d \u1032 ;
##### Stage 5.  More reorderings
::Null;
([\u1031]+) ($umedial+) > $2 $1;
($vowelsign) ($umedial) > $2 $1;
([\u103C\u103D\u103E]) \u103B > \u103B $1;
([\u103D\u103E]) \u103C > \u103C $1;
\u103E\u103D > \u103D\u103E ;
\u1038 ([$vowelmedial]) > $1 \u1038;
# NEW 5-May-2016
\u1036 \u102f > \u102f \u1036;
\u103c \u102f ($consonant) > $1 \u103c \u102f;
\u1038 ([\u1036\u1037\u103A\u102d\u102f\u1032\u103d]) > $1 \u1038 ;
\u102c \u102f > \u102f \u102c ;
\u103a \u102e > \u102e \u103a ;
\u1030 \u102d > \u102d \u1030 ;
#### Stage 6
::Null;
($consonant) \u103B \u103A > $1 \u103A \u103B;
([\u103C\u103D\u103E]) \u103B > \u103B $1;
([\u103D\u103E]) \u103C > \u103C $1;
\u103E\u103D > \u103D\u103E ;
([\u102D-\u1030\u1032]) \u103A ($consonant) \u103A > $1 $2 \u103A;

\u102D \u103A > \u102D;
\u102E \u103A > \u102E;
\u102F \u103A > \u102F;
\u102D \u102E > \u102E;
\u102F \u1030 > \u102F;
\u102B \u102B+ > \u102B;
\u102C \u102C+ > \u102C;
\u102D \u102D+ > \u102D;
\u102E \u102E+ > \u102E;
\u102F \u102F+ > \u102F;
\u1030 \u1030+ > \u1030;
\u1031 \u1031+ > \u1031;
\u1032 \u1032+ > \u1032;
\u103A \u103A+ > \u103A;
\u103B \u103B+ > \u103B;
\u103C \u103C+ > \u103C;
\u103D \u103D+ > \u103D;
\u103E \u103E+ > \u103E;
# NEW 5-May-2016
\u1036 \u1036+ > \u1036;
\u103c \u102f ($consonant) > $1 \u103c \u102f;
# Sep-2016
\u1063 (\u102e) > $1 \u1063 ;
\u1064 (\u102f)  > $1 \u1064 ;
\u1032 \u1032 > \u1032 \u1032 ;
\u1032 \u103d > \u103d \u1032 ;

#
#Try to correctly render diacritics after a space.
#
($space)([\u102e\u1037\u103a]) > $2 \u00A0;
"""