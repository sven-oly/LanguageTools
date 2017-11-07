# Transliteration rules for Chakma ASCII to Chakma

Description = u'Chakma ASCII to Unicode conversion'

TRANS_LIT_RULES = CCP_UNICODE_TRANSLITERATE = u"""

  $letter = [\u11103-\u11126];
  $evowel = \u1112C;
  $virama = \u11133;

  \u0000 > \u0020 ; # null
  \u000D > \u000D ; # Carriage return
  \u0020 > \u0020 ; # space
  \u0021 > \0u0021 ; # !
  #\u0023 > \u11142 ; # # PROBLEM
  #\u0024 > \u11141 ; # $ PROBLEM
  \u0025 > \u0025 ; # %
  \u0026 > \u11100 ; # &
  #  \u002a > \u11133 \u11123 ; # *
   # \u002e > \u1063 \u103a ; # .
  \u0030 > \u11136 ; # 0
  \u0031 > \u11137 ; # 1
  \u0032 > \u11138 ; # 2
  \u0033 > \u11139 ; # 3
  \u0034 > \u1113a ; # 4
  \u0035 > \u1113b ; # 5
  \u0036 > \u1113c ; # 6
  \u0037 > \u1113d ; # 7
  \u0038 > \u1113e ; # 8
  \u0039 > \u1113f ; # 9
  \u0040 > \u11104 ; # @
  \u0041 > \u11106 ; # A
  \u0042 > \u11133\u11123 ; # B
  \u0043 > \u1110d ; # C
  \u0044 > \u11119 ; # D
  \u0045 > \u11129 ; # E
  \u0046 > \u11103 ; # F
  \u0047 > \u103d ; # G
  \u0048 > \u11133\u11126 ; # H
  \u0049 > \u1112d ; # I
  \u004a > \u1110f ; # J
  \u004b > \u11108 ; # K
  \u004c > \u111126\u11133\u11123 ; # L
  \u004d > \u11134 ; # M
  \u004e > \u11115 ; #N
  \u004f > \u11127\u11132 ; # O
  \u0050 > \u11104 ; #P
  \u0051 > \u11112 ; #Q
  \u0052 > \u11133\u11122 ; # R
  \u0053 > \u11105 ; # S
  \u0054 > \u11117 ; #T
  \u0055 > \u1112b ; # U
  \u0056 > \u1110b ; # V
  \u0057 > \u11131 ; #W
  \u0058 > \u11114 ; # X
  \u0059 > \u11110 ; #Y
  \u005a > \u11133\u11120 ; # Z
  \u005e > \u11133\u1111a ; # ^
  \u005f > \u11134 ; # _
  \u0060 > \u11101 ; # `
  \u0061 > \u1112c ; #a
  \u0062 > \u1111d ; # b
  \u0063 > \u1110c ; # c
  \u0064 > \u11118 ; # d
  \u0065 > \u11128 ; # e
  \u0066 > \u1111c ; # f
  \u0067 > \u11109 ; # g
  \u0068 > \u11126 ; # h
  \u0069 > \u11127 ; # i
  \u006a > \u1110e ; # j
  \u006b > \u11107 ; # k
  \u006c > \u11123 ; # l
  \u006d > \u1111f ; # m
  \u006e > \u1111a ; # n
  \u006f > \u1112e ; # o
  \u0070 > \u1111b ; # p
  \u0071 > \u11111 ; # q
  \u0072 > \u11122 ; # r
  \u0073 > \u11125 ; # s
  \u0074 > \u11116 ; # t
  \u0075 > \u1112a ; # u
  \u0076 > \u1111e ; # v
  \u0077 > \u11124 ; # w
  \u0078 > \u11113 ; # x
  \u0079 > \u11120 ; # y
  \u007a > \u11121 ; # z
  \u007c > \u11133\u11103 ; # |

##### STAGE (2): POST REORDERING RULES FOR UNICODE RENDERING
::Null;

  $evowel ($letter) > $1 $evowel ;

##### STAGE (3): Move evowel over virama.
::Null;

  $evowel $virama ($letter) > $virama $1 $evowel ;
"""
