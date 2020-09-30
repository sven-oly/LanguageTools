# Convert Cree data to JS keyboard rules

plains_chart =\
"""# http://resources.atlas-ling.ca/media//Plains-Cree-Unicode-Chart.pdf
ᐁ ᐃ ᐄ ᐅ ᐆ ᐊ ᐋ ᐦ ᕽ
ê i î o ô a â h hk
1401 1403 1404 1405 1406 140A 140B 1426 157D
ᐍ ᐏ ᐑ ᐓ ᐕ ᐘ ᐚ ᐤ
wê wi wî wo wô wa wâ w
140D 140F 1411 1413 1415 1418 141A 1424
ᐯ ᐱ ᐲ ᐳ ᐴ ᐸ ᐹ ᑇ ᑊ
pê pi pî po pô pa pâ pwâ p
142F 1431 1432 1433 1434 1438 1439 1447 144A
ᑌ ᑎ ᑏ ᑐ ᑑ ᑕ ᑖ ᐟ
tê ti tî to tô ta tâ t
144C 144E 144F 1450 1451 1455 1456 141F
ᑫ ᑭ ᑮ ᑯ ᑰ ᑲ ᑳ ᐠ
kê ki kî ko kô ka kâ k
146B 146D 146E 146F 1470 1472 1473 1420
ᒉ ᒋ ᒌ ᒍ ᒎ ᒐ ᒑ ᐨ
cê ci cî co cô ca câ c
1489 148B 148C 148D 148E 1490 1491 1428
ᒣ ᒥ ᒦ ᒧ ᒨ ᒪ ᒫ ᒼ
mê mi mî mo mô ma mâ m
14A3 14A5 14A6 14A7 14A8 14AA 14AB 14BC
ᓀ ᓂ ᓃ ᓄ ᓅ ᓇ ᓈ ᐣ
nê ni nî no nô na nâ n
14C0 14C2 14C3 14C4 14C5 14C7 14C8 1423
ᓓ ᓕ ᓖ ᓗ ᓘ ᓚ ᓛ ᓫ
lê li lî lo lô la lâ l
14D3 14D5 14D6 14D7 14D8 14DA 14DB 14EB
ᓭ ᓯ ᓰ ᓱ ᓲ ᓴ ᓵ ᐢ
sê si sî so sô sa sâ s
14ED 14EF 14F0 14F1 14F2 14F4 14F5 1422
ᔐ ᔑ ᔒ ᔓ ᔔ ᔕ ᔖ ᐡ
šê ši šî šo šô ša šâ š
1510 1511 1512 1513 1514 1515 1516 1421
ᔦ ᔨ ᔩ ᔪ ᔫ ᔭ ᔮ ᐩ
yê yi yî yo yô ya yâ y
1526 1528 1529 152A 152B 152D 152E 1540
ᕃ ᕆ ᕇ ᕈ ᕉ ᕋ ᕌ ᕑ
rê ri rî ro rô ra râ r
1543 1546 1547 1548 1549 154B 154C 1551
"""

east_cree_chart =\
"""# http://resources.atlas-ling.ca/media//East-Cree-Unicode-Chart.pdf
ᐁ ᐃ ᐄ ᐅ ᐆ ᐊ ᐋ ᐤ ᐦ
e i ii u uu a aa u h
1401 1403 1404 1405 1406 140A 140B 1424 1426
ᐧᐁ ᐧᐃ ᐧᐄ ᐧᐅ ᐧᐆ ᐧᐊ ᐧᐋ
we wi wii wu wuu wa waa
140C 140E 1410 1412 1414 1417 1419
ᐯ ᐧᐯ ᐱ ᐲ ᐳ ᐴ ᐸ ᐹ ᑆ ᑉ
pe pwe pi pii pu puu pa paa pwaa p
142F 143A 1431 1432 1433 1434 1438 1439 1446 1449
ᑌ ᐧᑌ ᑎ ᑏ ᑐ ᑑ ᑕ ᑖ ᑣ ᑦ
te twe ti tii tu tuu ta taa twaa t
144C 1457 144E 144F 1450 1451 1455 1456 1463 14BC
ᑫ ᐧᑫ ᑭ ᑮ ᑯ ᑰ ᑲ ᑳ ᒀ ᒃ ᒄ
ke kwe ki kii ku kuu ka kaa kwaa k kw
146B 1474 146D 146E 146F 1470 1472 1473 1480 1483 1484
ᒉ ᐧᒉ ᒋ ᒌ ᒍ ᒎ ᒐ ᒑ ᒞ ᒡ
che chwe chi chii chu chuu cha chaa chwaa ch
1489 1492 148B 148C 148D 148E 1490 1491 149E 14A1
ᒣ ᐧᒣ ᒥ ᒦ ᒧ ᒨ ᒪ ᒫ ᒸ ᒻ ᒽ
me mwe mi mii mu muu ma maa mwaa m mw
14A3 14AC 14A5 14A6 14A7 14A8 14AA 14AB 14B8 14BB 14BD
ᓀ ᐧᓀ ᓂ ᓃ ᓄ ᓅ ᓇ ᓈ ᓍ ᓐ
ne nwe ni nii nu nuu na naa nwaa n
14C0 14C9 14C2 14C3 14C4 14C5 14C7 14C8 14CD 14D0
ᓓ ᐧᓓ ᓕ ᓖ ᓗ ᓘ ᓚ ᓛ ᓨ ᓪ
le lwe li lii lu luu la laa lwaa l
14D3 14DC 14D5 14D6 14D7 14D8 14DA 14DB 14E8 14EA
ᓭ ᐧᓭ ᓯ ᓰ ᓱ ᓲ ᓴ ᓵ ᔂ ᔅ
se swe si sii su suu sa saa swaa s
14ED 14F6 14EF 14F0 14F1 14F2 14F4 14F5 1502 1505
ᔐ ᐧᔐ ᔑ ᔒ ᔓ ᔔ ᔕ ᔖ ᔣ ᔥ
she shwe shi shii shu shuu sha shaa shwaa sh
1510 1517 1511 1512 1513 1514 1515 1516 1523 1525
ᔦ ᐧᔦ ᔨ ᔩ ᔪ ᔫ ᔭ ᔮ ᔻ ᔾ
ye ywe yi yii yu yuu ya yaa ywaa y
1526 152F 1528 1529 152A 152B 152D 152E 153B 153E
ᕃ ᣎ ᕆ ᕇ ᕈ ᕉ ᕋ ᕌ ᕎ ᕐ
re rwe ri rii ru ruu ra raa rwaa r
1543 18CE 1546 1547 1548 1549 154B 154C 154E 1550
ᕓ ᐧᕓ ᕕ ᕖ ᕗ ᕘ ᕙ ᕚ ᐧᕚ ᕝ
ve vwe vi vii vu vuu va vaa vwaa f
1553 1427+
1553
1555 1556 1557 1558 1559 155A 155B 155D
ᕞ ᐧᕞ ᕠ ᕢ ᕤ ᕥ ᕦ ᕧ ᕨ ᕪ
the thwe thi thii thu thuu tha thaa thwaa th
155E 1427+
155E
1560 1562 1564 1565 1566 1567 1568 156A
"""

def parseToRules(text):
  # Split into lines
  # Ignore those with "#" at start
  # Convert ê-->ee, î o ô a â etc.
  # Take lines 1, 2, 3 and split these
  # For each entry, create line
  #   'i': 'ᐃ',  // Hex
  lines = text.split('\n')
  line = iter(lines)
  results = []
  while line:
    try:
      l1 = next(line)
      while line and l1 and l1[0] == "#":
          l1 = next(line)
      l2 = next(line)
      l3 = next(line)

      l2 = l2.replace('ê', 'e')
      l2 = l2.replace('î', 'ii')
      l2 = l2.replace('ô', 'oo')
      l2 = l2.replace('â', 'aa')
      l1_items = l1.split()
      l2_items = l2.split()
      l3_items = l3.split()

      index = 0
      while index < len(l1_items):
        results.append("    \'%s\': \'%s\',  // %s" %\
              (l2_items[index], l1_items[index], l3_items[index]))
        index += 1
    except:
      break

  return results

result = parseToRules(plains_chart)
for r in result:
  print(r)
print('----------')

result = parseToRules(east_cree_chart)
for r in result:
  print(r)