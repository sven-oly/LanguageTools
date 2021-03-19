# -*- coding: utf-8 -*-
#!/usr/bin/env python

collation_columns = ['English term', 'Phonemic', 'GamWin', 'Lakhum PUA', 'Unicode char names']

# PUA to Unicode here.
tangsa_PUA_to_Unicode = {
  '\uE400':	'\ud81a\ude70',
  '\uE401':	'\ud81a\ude71',
  '\uE402':	'\ud81a\ude72',
  '\uE403':	'\ud81a\ude73',
  '\uE404':	'\ud81a\ude74',
  '\uE405':	'\ud81a\ude75',
  '\uE406':	'\ud81a\ude76',
  '\uE407':	'\ud81a\ude77',
  '\uE408':	'\ud81a\ude7C',
  '\uE409':	'\ud81a\ude7D',
  '\uE40A':	'\ud81a\ude7E',
  '\uE40B':	'\ud81a\ude7F',
  '\uE40C':	'\ud81a\ude80',
  '\uE40D':	'\ud81a\ude81',
  '\uE40E':	'\ud81a\ude82',
  '\uE40F':	'\ud81a\ude83',
  '\uE410':	'\ud81a\ude84',
  '\uE411':	'\ud81a\ude85',
  '\uE412':	'\ud81a\ude86',
  '\uE413':	'\ud81a\ude87',
  '\uE414':	'\ud81a\ude88',
  '\uE415':	'\ud81a\ude89',
  '\uE416':	'\ud81a\ude8B',
  '\uE417':	'\ud81a\ude8C',
  '\uE418':	'\ud81a\ude8D',
  '\uE419':	'\ud81a\ude8E',
  '\uE41A':	'\ud81a\ude8F',
  '\uE41B':	'\ud81a\ude90',
  '\uE41C':	'\ud81a\ude91',
  '\uE41D':	'\ud81a\ude92',
  '\uE41E':	'\ud81a\ude93',
  '\uE41F':	'\ud81a\ude94',
  '\uE420':	'\ud81a\ude95',
  '\uE421':	'\ud81a\ude96',
  '\uE422':	'\ud81a\ude97',
  '\uE423':	'\ud81a\ude98',
  '\uE424':	'\ud81a\ude99',
  '\uE425':	'\ud81a\ude9A',
  '\uE426':	'\ud81a\ude9B',
  '\uE427':	'\ud81a\ude9C',
  '\uE428':	'\ud81a\ude9D',
  '\uE429':	'\ud81a\ude9E',
  '\uE42A':	'\ud81a\udeB9',
  '\uE42B':	'\ud81a\udeBA',
  '\uE42C':	'\ud81a\udeBB',
  '\uE42D':	'\ud81a\udeBC',
  '\uE42E':	'\ud81a\udeA0',
  '\uE42F':	'\ud81a\udeA1',
  '\uE430':	'\ud81a\udeA2',
  '\uE431':	'\ud81a\udeA3',
  '\uE432':	'\ud81a\udeA4',
  '\uE433':	'\ud81a\udeA5',
  '\uE434':	'\ud81a\udeA6',
  '\uE435':	'\ud81a\udeA7',
  '\uE436':	'\ud81a\udeA8',
  '\uE437':	'\ud81a\udeA9',
  '\uE438':	'\ud81a\udeAA',
  '\uE439':	'\ud81a\udeAB',
  '\uE43A':	'\ud81a\udeAC',
  '\uE43B':	'\ud81a\udeAD',
  '\uE43C':	'\ud81a\udeAE',
  '\uE43D':	'\ud81a\udeAF',
  '\uE43E':	'\ud81a\udeB0',
  '\uE43F':	'\ud81a\udeB1',
  '\uE440':	'\ud81a\udeB2',
  '\uE441':	'\ud81a\udeB3',
  '\uE442':	'\ud81a\udeB4',
  '\uE443':	'\ud81a\udeB5',
  '\uE444':	'\ud81a\udeB6',
  '\uE445':	'\ud81a\udeB7',
  '\uE446':	'\ud81a\udeB8',
  '\uE447':	'\ud81a\udeB9',
  '\uE448':	'\ud81a\udeBA',
  '\uE449':	'\ud81a\udeC1',
  '\uE44A':	'\ud81a\udeC2',
  '\uE44B':	'\ud81a\udeC3',
  '\uE44C':	'\ud81a\udeC4',
  '\uE44D':	'\ud81a\udeC5',
  '\uE44E':	'\ud81a\udeC6',
  '\uE44F':	'\ud81a\udeC7',
  '\uE450':	'\ud81a\udeC8',
  '\uE451':	'\ud81a\udeC9',
  '\uE452':	'\ud81a\udeC0',
  '\uE453':	'\ud81a\ude8A',
  '\uE454':	'\ud81a\ude78',
  '\uE455':	'\ud81a\ude79',
  '\uE456':	'\ud81a\ude7A',
  '\uE457':	'\ud81a\ude7B',
  '\uE458':	'\ud81a\ude7E'
}

# ignore	GamWin	GamWin	Lakhum Unicode	GamWin	Lakhum PUA
gamwin_test_data = """
0x61	ac	ac	𖩵	ac	
0x61	ak	ak	𖩴𖪠	ak	
0x61	alc	alc	𖩵𖪮	alc	
0x61	alx	alx	𖩷𖪮	alx	
0x61	alz	alz	𖩴𖪮	alz	
0x61	amc	amc	𖩵𖪫	amc	
0x61	amx	amx	𖩷𖪫	amx	
0x61	amz	amz	𖩴𖪫	amz	
0x61	anc	anc	𖩵𖪬	anc	
0x61	angc	angc	𖩵𖪐	angc	
0x61	angx	angx	𖩷𖪐	angx	
0x61	angz	angz	𖩴𖪐	angz	
0x61	anx	anx	𖩷𖪬	anx	
0x61	anz	anz	𖩴𖪬	anz	
0x61	ap	ap	𖩴𖪧	ap	
0x61	aq	aq	𖩶	aq	
0x61	arc	arc	𖩵𖪲	arc	
0x61	arx	arx	𖩷𖪲	arx	
0x61	arz	arz	𖩴𖪲	arz	
0x61	at	at	𖩴𖪰	at	
0x61	auc	auc	𖩵𖪅	auc	
0x61	auk	auk	𖩴𖪄𖪠	auk	
0x61	aungc	aungc	𖩵𖪅𖪐	aungc	
0x61	aungx	aungx	𖩷𖪇𖪐	aungx	
0x61	aungz	aungz	𖩴𖪄𖪐	aungz	
0x61	auq	auq	𖩴𖪆	auq	
0x61	aux	aux	𖩷𖪇	aux	
0x61	auz	auz	𖩴𖪄	auz	
0x61	awc	awc	𖪉	awc	
0x61	awk	awk	𖪈𖪠	awk	
0x61	awlc	awlc	𖪉𖪮	awlc	
0x61	awlx	awlx	𖪋𖪮	awlx	
0x61	awlz	awlz	𖩼𖪮	awlz	
0x61	awmc	awmc	𖪉𖪫	awmc	
0x61	awmx	awmx	𖪋𖪫	awmx	
0x61	awmz	awmz	𖩼𖪫	awmz	
0x61	awnc	awnc	𖪉𖪬	awnc	
0x61	awngc	awngc	𖪉𖪐	awngc	
0x61	awngx	awngx	𖪋𖪐	awngx	
0x61	awngz	awngz	𖩼𖪐	awngz	
0x61	awnx	awnx	𖪋𖪬	awnx	
0x61	awnz	awnz	𖩼𖪬	awnz	
0x61	awp	awp	𖪈𖪧	awp	
0x61	awq	awq	𖪊	awq	
0x61	awrc	awrc	𖪉𖪲	awrc	
0x61	awrx	awrx	𖪋𖪲	awrx	
0x61	awrz	awrz	𖩼𖪲	awrz	
0x61	awt	awt	𖪈𖪰	awt	
0x61	awx	awx	𖪋	awx	
0x61	awz	awz	𖩼	awz	
0x61	ax	ax	𖩷	ax	
0x61	ayc	ayc	𖩵𖪁	ayc	
0x61	ayx	ayx	𖩷𖪃	ayx	
0x61	ayz	ayz	𖩴𖪀	ayz	
0x61	az	az	𖩴	az	
0x62	b	b	𖪪	b	
0x63	ch	ch	𖪼	ch	
0x64	d	d	𖪱	d	
0x65	ec	ec	𖩽	ec	
0x65	ek	ek	𖩼𖪠	ek	
0x65	elc	elc	𖩽𖪮	elc	
0x65	elx	elx	𖩿𖪮	elx	
0x65	elz	elz	𖩼𖪮	elz	
0x65	emc	emc	𖩽𖪫	emc	
0x65	emx	emx	𖩿𖪫	emx	
0x65	emz	emz	𖩼𖪫	emz	
0x65	enc	enc	𖩽𖪬	enc	
0x65	engc	engc	𖩽𖪐	engc	
0x65	engx	engx	𖩿𖪐	engx	
0x65	engz	engz	𖩼𖪐	engz	
0x65	enx	enx	𖩿𖪬	enx	
0x65	enz	enz	𖩼𖪬	enz	
0x65	ep	ep	𖩼𖪧	ep	
0x65	eq	eq	𖩾	eq	
0x65	erc	erc	𖩽𖪲	erc	
0x65	erx	erx	𖩿𖪲	erx	
0x65	erz	erz	𖩼𖪲	erz	
0x65	et	et	𖩼𖪰	et	
0x65	ex	ex	𖩿	ex	
0x65	ez	ez	𖩼	ez	
0x66	f	f	𖪺	f	
0x67	g	g	𖪢	g	
0x67	gh	gh	𖪷	gh	
0x68	h	h	𖪭	h	
0x68	ht	ht	𖪯	ht	
0x68	htt	htt	𖪸	htt	
0x69	ic	ic	𖪁	ic	
0x69	ik	ik	𖪀𖪠	ik	
0x69	ilc	ilc	𖪁𖪮	ilc	
0x69	ilx	ilx	𖪃𖪮	ilx	
0x69	ilz	ilz	𖪀𖪮	ilz	
0x69	imc	imc	𖪁𖪫	imc	
0x69	imx	imx	𖪃𖪫	imx	
0x69	imz	imz	𖪀𖪫	imz	
0x69	inc	inc	𖪁𖪬	inc	
0x69	ingc	ingc	𖪁𖪐	ingc	
0x69	ingx	ingx	𖪃𖪐	ingx	
0x69	ingz	ingz	𖪀𖪐	ingz	
0x69	inx	inx	𖪃𖪬	inx	
0x69	inz	inz	𖪀𖪬	inz	
0x69	ip	ip	𖪀𖪧	ip	
0x69	iq	iq	𖪂	iq	
0x69	irc	irc	𖪁𖪲	irc	
0x69	irx	irx	𖪃𖪲	irx	
0x69	irz	irz	𖪀𖪲	irz	
0x69	it	it	𖪀𖪰	it	
0x69	ix	ix	𖪃	ix	
0x69	iz	iz	𖪀	iz	
0x6a	j	j	𖪵	j	
0x6b	k	k	𖪠	k	
0x6b	kh	kh	𖪡	kh	
0x6c	l	l	𖪮	l	
0x6d	m	m	𖪫	m	
0x6d	mnaungz	mnaungz	𖪜𖪬𖩴𖪄𖪐	mnaungz	
0x6d	mnvungz	mnvungz	𖪜𖪬𖩸𖪄𖪐	mnvungz	
0x6d	mrvkueq	mrvkueq		mrvkueq	
0x6d	mznaungz	mznaungz	𖪜𖪬𖩴𖪄𖪐	mznaungz	
0x6d	mznvungz	mznvungz	𖪜𖪬𖩸𖪄𖪐	mznvungz	
0x6e	n	n	𖪬	n	
0x6e	ng	ng	𖪣	ng	
0x6e	nh	nh	𖪳	nh	
0x6e	ny	ny	𖪨	ny	
0x6f	oalc	oalc	𖩱𖪮	oalc	
0x6f	oalx	oalx	𖩳𖪮	oalx	
0x6f	oalz	oalz	𖩰𖪮	oalz	
0x6f	oamc	oamc	𖩱𖪫	oamc	
0x6f	oamx	oamx	𖩳𖪫	oamx	
0x6f	oamz	oamz	𖩰𖪫	oamz	
0x6f	oanc	oanc	𖩱𖪬	oanc	
0x6f	oanx	oanx	𖩳𖪬	oanx	
0x6f	oanz	oanz	𖩰𖪬	oanz	
0x6f	oap ~ op	oap ~ op	𖩰𖪧	oap ~ op	
0x6f	oarc	oarc	𖩱𖪲	oarc	
0x6f	oarx	oarx	𖩳𖪲	oarx	
0x6f	oarz	oarz	𖩰𖪲	oarz	
0x6f	oat	oat	𖩰𖪰	oat	
0x6f	oayc	oayc	𖩱𖪁	oayc	
0x6f	oayx	oayx	𖩳𖪃	oayx	
0x6f	oayz	oayz	𖩰𖪀	oayz	
0x6f	oc	oc	𖩱	oc	
0x6f	ok	ok	𖩰𖪠	ok	
0x6f	omc	omc	𖩱𖪫	omc	
0x6f	omx	omx	𖩳𖪫	omx	
0x6f	omz	omz	𖩰𖪫	omz	
0x6f	ongc	ongc	𖩱𖪐	ongc	
0x6f	ongx	ongx	𖩳𖪐	ongx	
0x6f	ongz	ongz	𖩰𖪐	ongz	
0x6f	op	op	𖩰𖪧	op	
0x6f	oq	oq	𖩲	oq	
0x6f	ovlc	ovlc	𖩱𖩹𖪮	ovlc	
0x6f	ovlx	ovlx	𖩳𖩻𖪮	ovlx	
0x6f	ovlz	ovlz	𖩰𖩸𖪮	ovlz	
0x6f	ovmc	ovmc	𖩱𖩹𖪫	ovmc	
0x6f	ovmx	ovmx	𖩳𖩻𖪫	ovmx	
0x6f	ovmz	ovmz	𖩰𖩸𖪫	ovmz	
0x6f	ovnc	ovnc	𖩱𖩹𖪬	ovnc	
0x6f	ovnx	ovnx	𖩳𖩻𖪬	ovnx	
0x6f	ovnz	ovnz	𖩰𖩸𖪬	ovnz	
0x6f	ovp	ovp	𖩰𖩸𖪧	ovp	
0x6f	ovrc	ovrc	𖩱𖪲	ovrc	
0x6f	ovrx	ovrx	𖩳𖪲	ovrx	
0x6f	ovrz	ovrz	𖩰𖪲	ovrz	
0x6f	ovt	ovt	𖩰𖩸𖪰	ovt	
0x6f	ovyc	ovyc	𖩱𖩹𖪁	ovyc	
0x6f	ovyx	ovyx	𖩳𖩻𖪃	ovyx	
0x6f	ovyz	ovyz	𖩰𖩸𖪀	ovyz	
0x6f	ox	ox	𖩳	ox	
0x6f	oz	oz	𖩰	oz	
0x70	p	p	𖪧	p	
0x70	ph	ph	𖪩	ph	
0x72	r	r	𖪲	r	
0x73	s	s	𖪤	s	
0x73	sh	sh	𖪴	sh	
0x74	t	t	𖪰	t	
0x74	th	th	𖪹	th	
0x74	ts	ts	𖪶	ts	
0x75	uc	uc	𖪅	uc	
0x75	uec	uec	𖪔	uec	
0x75	uek	uek	𖪒𖪠	uek	
0x75	uelc	uelc	𖪔𖪮	uelc	
0x75	uelx	uelx	𖪗𖪮	uelx	
0x75	uelz	uelz	𖪕𖪮	uelz	
0x75	uemc	uemc	𖪔𖪫	uemc	
0x75	uemx	uemx	𖪗𖪫	uemx	
0x75	uemz	uemz	𖪕𖪫	uemz	
0x75	uenc	uenc	𖪔𖪬	uenc	
0x75	uengc	uengc	𖪔𖪐	uengc	
0x75	uengx	uengx	𖪗𖪐	uengx	
0x75	uengz	uengz	𖪕𖪐	uengz	
0x75	uenx	uenx	𖪗𖪬	uenx	
0x75	uenz	uenz	𖪕𖪬	uenz	
0x75	uep	uep	𖪒𖪧	uep	
0x75	ueq	ueq	𖪖	ueq	
0x75	uerc	uerc	𖪔𖪲	uerc	
0x75	uerx	uerx	𖪗𖪲	uerx	
0x75	uerz	uerz	𖪕𖪲	uerz	
0x75	uet	uet	𖪒𖪰	uet	
0x75	uex	uex	𖪗	uex	
0x75	ueyc	ueyc	𖪔𖪁	ueyc	
0x75	ueyx	ueyx	𖪗𖪃	ueyx	
0x75	ueyz	ueyz	𖪕𖪀	ueyz	
0x75	uez	uez	𖪕	uez	
0x75	uic	uic	𖪍	uic	
0x75	uik	uik	𖪌𖪠	uik	
0x75	uilc	uilc	𖪍𖪮	uilc	
0x75	uilx	uilx	𖪏𖪮	uilx	
0x75	uilz	uilz	𖪌𖪮	uilz	
0x75	uimc	uimc	𖪍𖪫	uimc	
0x75	uimx	uimx	𖪏𖪫	uimx	
0x75	uimz	uimz	𖪌𖪫	uimz	
0x75	uinc	uinc	𖪍𖪬	uinc	
0x75	uingc	uingc	𖪍𖪐	uingc	
0x75	uingx	uingx	𖪏𖪐	uingx	
0x75	uingz	uingz	𖪌𖪐	uingz	
0x75	uinx	uinx	𖪏𖪬	uinx	
0x75	uinz	uinz	𖪌𖪬	uinz	
0x75	uip	uip	𖪌𖪧	uip	
0x75	uiq	uiq	𖪎	uiq	
0x75	uirc	uirc	𖪍𖪲	uirc	
0x75	uirx	uirx	𖪏𖪲	uirx	
0x75	uirz	uirz	𖪌𖪲	uirz	
0x75	uit	uit	𖪌𖪰	uit	
0x75	uiuc	uiuc	𖪙	uiuc	
0x75	uiuk	uiuk	𖪘𖪠	uiuk	
0x75	uiulc	uiulc	𖪙𖪮	uiulc	
0x75	uiulx	uiulx	𖪛𖪮	uiulx	
0x75	uiulz	uiulz	𖪘𖪮	uiulz	
0x75	uiumc	uiumc	𖪙𖪫	uiumc	
0x75	uiumx	uiumx	𖪛𖪫	uiumx	
0x75	uiumz	uiumz	𖪘𖪫	uiumz	
0x75	uiunc	uiunc	𖪙𖪬	uiunc	
0x75	uiungc	uiungc	𖪙𖪐	uiungc	
0x75	uiungx	uiungx	𖪛𖪐	uiungx	
0x75	uiungz	uiungz	𖪘𖪐	uiungz	
0x75	uiunx	uiunx	𖪛𖪬	uiunx	
0x75	uiunz	uiunz	𖪘𖪬	uiunz	
0x75	uiup	uiup	𖪘𖪧	uiup	
0x75	uiuq	uiuq	𖪎𖪆	uiuq	
0x75	uiurc	uiurc	𖪙𖪲	uiurc	
0x75	uiurx	uiurx	𖪛𖪲	uiurx	
0x75	uiurz	uiurz	𖪘𖪲	uiurz	
0x75	uiut	uiut	𖪘𖪰	uiut	
0x75	uiux	uiux	𖪛	uiux	
0x75	uiuz	uiuz	𖪘	uiuz	
0x75	uix	uix	𖪏	uix	
0x75	uiyc	uiyc	𖪍𖪁	uiyc	
0x75	uiyq	uiyq	𖪌𖪂	uiyq	
0x75	uiyx	uiyx	𖪏𖪇	uiyx	
0x75	uiyz	uiyz	𖪌𖪀	uiyz	
0x75	uiz	uiz	𖪌	uiz	
0x75	uk	uk	𖪄𖪠	uk	
0x75	ulc	ulc	𖪅𖪮	ulc	
0x75	ulx	ulx	𖪇𖪮	ulx	
0x75	ulz	ulz	𖪄𖪮	ulz	
0x75	umc	umc	𖪅𖪫	umc	
0x75	umx	umx	𖪇𖪫	umx	
0x75	umz	umz	𖪄𖪫	umz	
0x75	unc	unc	𖪅𖪬	unc	
0x75	ungc	ungc	𖪅𖪐	ungc	
0x75	ungx	ungx	𖪇𖪐	ungx	
0x75	ungz	ungz	𖪄𖪐	ungz	
0x75	unx	unx	𖪇𖪬	unx	
0x75	unz	unz	𖪄𖪬	unz	
0x75	up	up	𖪄𖪧	up	
0x75	uq	uq	𖪆	uq	
0x75	urc	urc	𖪅𖪲	urc	
0x75	urx	urx	𖪇𖪲	urx	
0x75	urz	urz	𖪄𖪲	urz	
0x75	ut	ut	𖪄𖪰	ut	
0x75	ux	ux	𖪇	ux	
0x75	uyc	uyc	𖪅𖪁	uyc	
0x75	uyx	uyx	𖪇𖪃	uyx	
0x75	uyz	uyz	𖪄𖪀	uyz	
0x75	uz	uz	𖪄	uz	
0x76	v	v	𖩸	v	
0x76	vc	vc	𖩹	vc	
0x76	vk	vk	𖩸𖪠	vk	
0x76	vlc	vlc	𖩹𖪮	vlc	
0x76	vlx	vlx	𖩻𖪮	vlx	
0x76	vlz	vlz	𖩸𖪮	vlz	
0x76	vmc	vmc	𖩹𖪫	vmc	
0x76	vmx	vmx	𖩻𖪫	vmx	
0x76	vmz	vmz	𖩸𖪫	vmz	
0x76	vnc	vnc	𖩹𖪬	vnc	
0x76	vngc	vngc	𖩹𖪐	vngc	
0x76	vngx	vngx	𖩻𖪐	vngx	
0x76	vngz	vngz	𖩸𖪐	vngz	
0x76	vnx	vnx	𖩻𖪬	vnx	
0x76	vnz	vnz	𖩸𖪬	vnz	
0x76	vp	vp	𖩸𖪧	vp	
0x76	vq	vq	𖩺	vq	
0x76	vrc	vrc	𖩹𖪲	vrc	
0x76	vrx	vrx	𖩻𖪲	vrx	
0x76	vrz	vrz	𖩸𖪲	vrz	
0x76	vt	vt	𖩸𖪰	vt	
0x76	vuk	vuk	𖩸𖪄𖪠	vuk	
0x76	vungc	vungc	𖩹𖪅𖪐	vungc	
0x76	vungx	vungx	𖩻𖪇𖪐	vungx	
0x76	vungz	vungz	𖩸𖪄𖪐	vungz	
0x76	vuq	vuq	𖩸𖪆	vuq	
0x76	vx	vx	𖩻	vx	
0x76	vyc	vyc	𖩹𖪁	vyc	
0x76	vyq	vyq	𖩸𖪂	vyq	
0x76	vyx	vyx	𖩻𖪃	vyx	
0x76	vyz	vyz	𖩸𖪀	vyz	
0x76	vz	vz	𖩸	vz	
0x77	w	w	𖪦	w	
0x79	y	y	𖪥	y	
0x74  tvghuiyz tvghuiyz  tvghuiyz 
0x74  tvguiyz tvguiyz  tvguiyz 
0x7f  vthuimx vthuimx 𖩸𖪹𖪏𖪫  vthuimx 
0x7f  thuimx  thuimx  𖪹𖪏𖪫 thuimx  𖪹𖪏𖪫
"""

collation_data = """
#CALMSEA List – comparing Gam Win and Lakhum Mossang
#Nouns
!CALMSEA	Phonemic (following Gam Win)	Muishvung (Gam Win’s system)	Muishvung PUA (Lakhum Mossang’s system)	Name of Unicode characters (consonants without final -a)	Notes
belly (exterior)	βuk	wuk		w uz k	
breast	pɯ²	puix		p uix	
blood	təɣɯi¹	tvghuiyz		t short.uez gh uiz iz	
bone	ərɔ¹	vrawz		vz r awz	
ear	na³	nac		n ac	
egg	əti¹	vtiz		vz t iz	
eye	mɯk	muik		m uiz k	
fat/grease	əpɯ¹	vpuiz		vz p uiz	
foot	ja¹	yaz		y az	
guts	pe¹	pez		p ez	
hair/head	kʰu² mul¹	khux mulz	 	kh ux m uz l	
hair/body	ɣən¹ mul¹	ghvnz mulz	 	gh vz n m uz l	Lakhum writes initial /ɣ/
hand/arm	jəuk	yvuk	 	y vz uq k	
head	kʰu²	khux		kh ux	
heart	muŋ² po¹	mungx poz	 	m ux -ng p oz 	
horn	əruŋ²	vrungx		vz r ux –ng	
leg	ja¹	yaz		y az	
liver	t̪ɯn¹	thuinz		th uiz n	
mouth	nɯ²	nuix		n uix	
neck	dɯŋ²	duingx		d uix –ng	
nose	kʰɯ¹	khuiz		kh uiz	
skin/bark	kʰɯ²	khuix		khu uix	
spit	tʰo¹	htoz		ht oz	
tail	mi¹	miz		m iz	
tongue	təli²	tvlix		t short.uez l ix	
tooth	βa³	wac		w ac	
wing	rəuŋ²	rvungx	 	r vx ux -ng	
(finger) nail	t̪ʰɯn³	vhttuinc		vz htt uic n	
finger/toe	ʃi²	shix		sh ix	
palm 	pʰa³	phac		ph ac	
penis 	ji³	yic		y ic	
vagina	pʰa¹	phaz		ph az	
brain	kʰu² t̪ɯi¹	khux thuiyz	 	kh ux th uix ix	Lakhum writes the second syllable with tone 2 (-uiyx in Gam Win’s system)
navel	pe¹ kʰur²	pez khurx	 	p ez kh ux r	
faeces	diʔ	diq		d iq	
urine	ʃɔ¹	shawz		sh awz	
sweat	rəuŋ² lɯm³ ti²	rvungx luimc tix	   	r vx ux -ng l uic m t ix	
vomit	pʰai¹	phayz	 	ph az iz	
breath/life	əʃup əʰa²	vshup vhax	 	vz sh uq p vz h ax	
corpse	məuŋ²	mvungx	 	m vx ux –ng	
person	miʔ	miq		m iq	
I	ŋa¹	ngaz		ng az	
you (singular))	m̩¹no¹, m̩¹nəuŋ¹	mznoz, mznvungz	, 	mz n oz, mz n vz uz -ng	also written mnoz and mnvungz 
he/she	vpiʔ	vpiq	 	vz p iq	
we (inclusive)	nəuŋ¹ ʃiʔ (ʰe¹)	nvungz shiq (hez)	  ()	n vz uz -ng sh iq	
we (exclusive)	nɯi¹ ʃiʔ	nuiyz shiq	 	nh uiz iz sh iq	
you (plural)	nɯm¹ ʃiʔ	nuimz shiq	 	n uiz m sh iq	
they	tsɯŋ³ ʃiʔ	tsuingc shiq	 	ts uic -ng sh iq	
child/son	əsa¹	vsaz		vz s az	
grandchild 	əsɯu¹	vsuiuz	 	vz s uiuz	
father	əβa¹	vwaz		vz w az	
mother	əɲɯu¹	vnyuiuz		vz ny uiuz	
grandfather	əʨi²	vjix		vz j ix	
grandmother	əβi¹	vwiz		vz w iz	
elder brother	əpʰu¹	vphuz		vz ph uz	
younger brother	əno²	vnox		vz n ox	
mother’s brother	əgu¹	vghuz		vz gh uz	
father’s brother	əβəuŋ²	vwvungx		vz w ax ux -ng	
father’s sister	əŋɯi¹	vnguiyz		vz ng uiz iz	
mother’s sister	əsɯi¹	vsuiyz		vz s uiz iz	
daughter-in-law	nəm² ɲɯu¹	nvmx nyuiuz	  	n vx m ny uiz uz	
name	mɯŋ³	muingc		m uic –ng	
poison, venom	əɣəi²	vghvyx	 	vz gh vx ix	
poison (chemical)	əjaŋ²	vyangx		vz y ax –ng	
mushroom / fungus	gɤn² tsɯm¹	ghuenx tsuimx		gh uex n ts uix m	
liquor	ʨol¹	jovlz	 	j oz vz l	
banana	ɲəp ŋak	nyvp ngak	 	ny vz p ng az g	(-g is used following the vowel a) as in vphak vlak
yam, taro	tɯ¹	tuiz		t uiz	
medicine	pʰum¹	phumz		ph uz m	
juice	ti²	tix		t ix	
water (for drinking)	jɯ²	yuix		y uix	
rice (in fields, paddy)	tsəm¹	tsvmz		ts vz n	
rice (husked)	βuŋ²	wungx		w ux –ng	
rice (cooked)	duŋ³	dungc		d uc –ng	
salt	ʃum¹	shumz		sh uz m	
meat / animal	ŋəm² sa¹	ngvmx saz	 	ng vz m s az	
bird	βu¹ ʃɔ²	wuz shawx	 	w uz sh awx	
dog	ɣui¹ he²	ghuyzhex		gh uz iz h ex	
fish	ŋaʔ	ngaq		ng aq	
louse	t̪ʰɯk	httuik		htt uiz k	
snake	pɯu³	puiuc		p uiuc	
frog	lukbur²	lukburx	 	l uz k b ux r	
insect	əjuŋ¹	vyungz		vz y uz –ng	
bee	ɲaʔ	nyaq		ny aq	
dove 	hi¹tɯu³	hixtuiuc		h ix t uiuc	
monkey	βir² sɯl²	wirx suilx	 	w ix s uix l	
pig	βauk	wauk		w az uq k 	
otter	tərəm²	tvrvmx		t short.uez r ax m ix	
horse	məre¹	mvrez		m short.uez r ez 	
horse	kum²rɔ²	kumxrawx	 	k ux m r awx	
ant	sɯi¹sɔ²	suiyzsawx		s uiz iz s awx	
tiger	ʨaʔ	jaq		j aq	
elephant	ʨɔ¹	jawz		j awz	
deer	ʨuk	juk		j uq k	
deer (small)	kʰi³ji²	khicyix		kh ic y ix	
bear	ʨapbɔ²	jvpbawx		j vz p b awx	
cattle	man²sɯu²	manxsuiux		m az n s uiux	
buffalo	ŋa³	ngac		ng ac	
leech	təβət	tvwvt		t short.uez w vz t	
rat 	jɯuʔpʰɯuʔ	yuiuqphuiuq		y uiuq ph uiuq	
crab	hen¹	henz		h ez n	
crow	βu¹kʰa²	wuzkhax		w uz kh ax	
eagle	lɔ²	lawx		l awx	
hornbill	βu¹rɔ²	wuzrawx		w uz r awx	
parrot	βu¹kɯiʔ	wuzkuiyq		w uz k uiz iq	
bat	loklɔ²	loklawx		l oz k l awx	here the final stop is written with a tone 1 vowel plus final stop
bat (smaller)	lok tet	loktet		l oz k t ez t	
bat (smaller)	pʰəuksɯiʔ	phvuksuiyq		ph sz uz k s uiz q	
ashes	βər¹ pɯ³	wvrz puic	 	w vz r iz	this word means the sparks while burning
ashes	βər¹ bɤn²	wvrz buenx	 	w vz r iz b uex n	
cloud	pʰɤm²	phuemx		ph uex m	
earth	gʰaʔ	ghaq		gh aq	
fire	βər¹	wvrz		w vz r iz	
flower	pul² pɯ³	pulx puic	 	p ux l p uic	
forest	lɯŋ²	luingx		l uix –ng	
fruit	pul² t̪ɤi¹	pulx thueyz	 	p ux l th uiz iz	
grass	ren³t̪ʰɯŋ²	renchttuingx		r ec n htt uix –ng	
leaf	pul²jəuk	pulxyvuk		p ux l y vz uq k	
lightning	rəuŋ²lep	rvungxlep		r vx ux -ng l ez p	
moon	ja³ pi²	yacpix		y ax p ix	
mountain	kan²	kanx		k ax n	
mountain	ku¹	kuz		k uz	
rain	rəuŋ² jun³	rvungx yunc	 	r vx ux -ng y uc n	
river / valley	jɯ² rɯl²	yuix ruilx	 	y uix r uix l	
road	ləm²	lvmx		l ax m ix	
root	ərɯŋ²	vruingx		vz r uix -ng	
sky	rəuŋ²	rvungx		r vx ux -ng	
sky	rəuŋ²βəl²βan³	rvungxwuilxwanc		r vx ux -ng  w uix l w ac n	
smoke	βər¹ kʰɯuʔ	wvrz khuiuq	 	w az r iz kh uiuq	
star	rɯi¹sɯiʔ	ruiyzsuiyq		r uiz iz s uiz iq	
stone	luŋ¹	lungz		l uz -ng	
sun	ʃal²	shalx		r vx ux -ng sh ax l	
day	rəuŋ²nɯiʔ	rvungxnuiyq		r vx ux -ng nh uiz iq	
thunder	rəuŋ²muk	rvungxmuk		r vx ux -ng m uz k	
tree	pul² ʨuŋ²	pulxjungx		p ux l j ux -ng	
wood	pul²	pulx		p ux l	
wind	rəuŋ²ɣɯl¹	rvungxghuilz		r vx ux -ng gh iuz l	
branch	pul²pʰak	pulxphak		p ux l ph az g	
branch	pul²no¹	pulxnoz		p ux l n oz	
silver	kɯm²pʰo²	kuimxphox		k uix m ph ox	
gold	kɯm² ʃɔ²	kuimx shawx	 	k uix m sh awx	
gold	ʨaʔ	jaq		j aq	
bamboo	βɔ²	wawx		w awx	
shadow	ja³kʰɔ²	yackhawx		y ac b awx 	
shadow under sun	ja³bɔ²	yacbawx			
shadow	bɯŋ³	buingc		b uic -ng 	‘shadow of a tree’
thorn 	ʃɯuʔ	shuiuq		sh uiuq	
night	rəuŋ²βər²	rvungxwvrx		r vz ux -ng w vx r	
night	rəuŋ²ɲauk	rvungxnyauk		r vx ux -ng ny az uq k	
iron	jan²	yanx		y ax n	
paddy field, wet field	na²	nax		n ax	
field	βɯk	wuik		w uiz k	
arrow	laʔ sən¹	laq svnz	 	l aq s vz n	
needle	mi¹kʰi²	mizkhix		m iz kh ix	
house	jɯm²	yuimx		y uix m	
bow	laʔ	laq		l aq	
boat	li²	lix		l ix	
mortar	tʰɯm¹	htuimz		ht uiz m	
village	gʰaʔʃuŋ³	ghaqshungc		gh aq sh uc –ng	
spear	paʔ	paq		p aq	
cooking pot	tɯk	tuik		t uiz k	
plate	pan²	panx		p ax n	
mat	dəm²	dvmx		d ax m ix	
bed	ʨɯŋ¹	juingz		j uiz –ng	
steps	hi kʰu²	hixkhux phac	 	h ix kh ux ph ac	
door	ka³lɯ²	kacluix		k ac l uix	
fireplace	təp	tvp		t vz p	
firewood	ʨan²	janx		j ax n	
festival	mol²	moalx	ox	m ox l	
drum	nuŋ²	nungx		n ux –ng	
gong	ɲam²	nyamx		ny ax –ng	
cymbal	ʨok	jok		j oz k	
left side	jauk pʰər²	yauk phvrx	 	y az uq k ph ax r ix	
right side	jauk keʔ	yauk keq	 	y az uq k k eq  	
far (v.)	əlu¹	vluz		vz l uz	
near (v.)	əɲek	vnyek		vz ny ez k	
year	rəuŋ² βɔ³	rvungx wawc	 	r vx ux -ng w awc	
today	məi¹ʨɯu³ rəuŋ²n̪ɯiʔ	mvyzjuiuc rvungxnhuiyq	 	m iz iz j uiuc r vx ux -ng ng uiz nh uiz iq 	
today	tən̪ɯiʔ	tvnhuiyq		t short-uez nh uiz iq	
today	m̩¹n̪ɯiʔ	mznhuiyq		mz nh uiz iq	
tomorrow	i¹nəp	invp		iz n vz p	
day after tomorrow	ʃɯm¹ nəp	shuimz nvp	 	sh uiz m n vz p	
second day after tomorrow	t̪ɯm² nəp	thuimx nvp	 	th uix m n vz p	
yesterday	m¹ja³	mzyac		mz y ac	
day before yesterday	t̪ʰa¹ra³	httazrac		htt az r ac	
one	əʃi¹	vshiz		vz sh iz	
two	ən̪ɯi³	vnhuiyc		vz nh uic ic	
three	ət̪ɯm²	vthuimx		vz th uix m	
four	bəli³	bvlic		b short.uez l ic	
five	bəŋa³	bvngac		b short.uez n ac	
six	təruk	tvruk		t short.uez r uq k	
seven	məʃi²	mvshix		m short.uez sh ix	
eight	təʨət	tvjvt		t short.uez j vz t	
nine	təkɯu¹	tvkuiuz		t short.uez k uiz	
ten	rokʃi¹	rokshiz	 	r oz k sh iz	
twenty	rokn̪ɯi³	roknhuiyc		r oz k nh uic ic	
hundred	ʃa³ ʃi¹	shac shiz	 	sh ac sh iz	
(be) many (v.)	pəuŋ³ həl³	pvungc hvlc	 	p ac uc -ng h vc l	
be born	ʨɔ²	jawx		j awx	
be born.NOMZ	əʨɔ³	vjawc		az j awc	
sleep	kətsoəl²	kvtsovlx		k short.uez ts ox vx l	
sleep.NOMZ	əkətsoəl²	vkvtsovlx		vz k short.uez ts ox vx l	
weep	kʰoər²	khovrz		kh ox vx r	
weep.NOMZ	əkʰoər²	vkhovrc		vz kh ox vx r	
laugh	n̪ɯi²	nhuiyx		n uix ix	
laugh.NOMZ	ən̪ɯi¹	vnhuiyz		vz n uiz iz	
die	t̪ɯi³	thuiyc		th uic ic	
die.NOMZ	ət̪ɯi³	vthuiyc		vz th uic ic	
awaken	kəten³	kvtenc		k short.uez t ec n	
cough	səu¹	svuz		s vz uz	
cough.NOMZ	əsəu¹	vsvuz		vz s vz uz	
stand	ʨəp	jvp		j vq p	
stand.NOMZ	əʨəp	vjvp		vz j vq p	
sit	ŋəuŋ³	ngvungc		ng vc uc -ng	
sit.NOMZ	əŋəuŋ³	vngvungc		vz ng vc uc -ng	
urinate	ʃi¹	shiz		sh iz	
urinate.NOMZ	əʃi¹	vshiz		vz sh iz	
go	ka¹	kaz		k az	
go.NOMZ	əkai¹	vkayz 		vz k az iz	also vkaz
come	βəuŋ¹	wvungz		w vz uz -ng	
come.NOMZ	əβəuŋ³	vwvungc		vz w vc uc -ng	also vwvungz
fall	dəi¹	dvyz		d vz iz 	
fall.NOMZ	ədəi¹	vdvyz		vz d vz iz 	
roll (as ball)	kɯ²	kuix		k uiz	
roll.NOMZ	əkɯ³	vkuic		vz k uic	
fall	kətʰɯu³	kvhtuiuc		k short.uez ht uiuc	
fall.NOMZ	əkətʰɯu³	vkvhtuiuc		vz k short.uez ht uiuc	
go up	dɯ¹	duiz		d uiz	
go up.NOMZ	ədɯ³	vduic		vz d uic	
go down	sət	svt		s vz t 	
go down.NOMZ	əsət	vsvt		vz s vz t 	
fly	ba¹	baz		b az	
fly,NOMZ	əba¹	vbaz		vz b az	
hidden	t̪ʰɯiʔ	httuiyq		htt uiz iq	
hide	kət̪ʰɯiʔ	kvhtuiyq		k short.uez htt uiz iq	
hide (something)	tət̪ʰɯiʔ	tvhttuiyq	 	t short.uez htt uiz iq	
run	ju¹	yuz		y uz	
run.NOMZ	əju¹	vyuz		vz y uz	
emerge	duŋ¹	dungz		d uz -ng	
emerge.NOMZ	əduŋ³	vdungc		vz d uc -ng	
enter	ɲɯp	nyuip		ny uiz p	
enter.NOMZ	əɲɯp	vnyuip		vz ny uiz p	
dive	dok	dok		d oq k	
dive.NOMZ	ədok	vdok		vz d oq k	
afraid	hi¹	hiz		h iz	
afraid.NOMZ	əhi¹	vhiz		vz h iz	
know (a fact), to 	ələm¹ tɯu¹	tuiuz		t uiuz	
know (understand), to	ətɯu¹ ətai¹	vtuiuz vtayz	 	vz t uiuz vz t az iz	
ashamed, shy	jəl³	yvlc		y vc l	
ashamed.NOMZ	əjəl³	vyvlc		vz y vc l	
forget	ləuk	lvuk		l vz uz k	
forget.NOMZ	ələuk	vlvuk	 	vz l vz uz k	
dream	məuŋ¹	mvungz		m vz uz -ng	
dream.NOMZ	əməuŋ¹	vmvungz		vz m vz uz -ng	
see	kʰi¹	khiz		kh iz	
see.NOMZ	əkʰi³	vkhic		vz kh iz	
look	lɔ³, lɔ³ ʃɯu¹	lawc, lawc shuiuz	,  	l awc, l awc sh uiuc	
look.NOMZ	əlɔ³	vlawc		vz l awc	
hear	tai¹	tayz		t az iz	
hear.NOMZ	ətai¹	vtayz		vz t az iz	
sing	ʃi²	shix		sh ix	
sing.NOMZ	əʃi³	vshic		vz sh ix	
smell	t̪ɯŋ²	thuingx		th uix -ng	
smell.NOMZ	ət̪ɯŋ³	vthuingc		vz th uic -ng	
smell	ʃe³	shec		sh ec	
smell.NOMZ	əʃe³	vshec		vz sh ec	
ask	βi¹	wiz		w iz	
ask.NOMZ	əβi¹	vwiz		vz wi z	
speak	kəʨak	kvyak		k short.uez y aq g	
speak.NOMZ	kəʨa¹	kvyaz		k short.uez y az	
tell	ʨuŋ²	jungx		j ux -ng	
tell.NOMZ	əʨuŋ³	vjungc		vz j uc -ng	
thin	əβar²	vwarx		vz w ax r	
thin 	əre²	vrex		vz r ex	
old	əke¹	vkez		vz k ez	
alive	ət̪ərəuŋ²	vthvrvungx		vz th short.uez r vz uz ng	
ill	ət̪ɯu¹	vthuiuz		vz th uiuz	
fat	əpɯ¹	vpuiz		vz p uiz	
itchy	ətsɯk	vtsuik		vz ts uiq k	
new	əɲal²	vnyalx		vz ny ax l	
full	mər²	mvrx		m vx r	
full.NOMZ	əmər²	vmvrx		vz m vx r	
long	əlu¹	vluz		vz l uz	
big	əjuŋ²	vyungx		vz y ux -ng	
small	ərɯn²	vruinx		vz r uix n	
good	əhəl²	vhvlx		vz h vx l	
bad	əba³	vbac		vz  b ac	
short	ətut	vtut		vz t uz t	
sweet	ərɯm²	vruimx		vz r uix m	
bitter	əkʰɯp	vkhuip		vz kh uiz p	
sour	əhi²	vhix		vz h ix	
cold (weather)	rəuŋ² suŋ³	rvungxsungc		r vx ux -ng s uc -ng
cold	əkɯiʔ	vkuiyq		vz k uiz iq	
hot	əkal²	vkalx		vz k ax l	
hot (weather)	rəuŋ² lɯm³	rvungx luimc	 	r vx ux -ng l uic m	
ripe	əmɯn²	vmuinx		vz m uix n	
soft (to touch)	əɲen¹	vnyenz		vz ny ez n	
hard	ətsan¹	vtsanz		vz ts az n	
white	əlɯ¹	vluiz		vz l uiz	
black	əɲəuk	vnyvuk		vz ny vz uz k	
red	əʃɔ²	vshawx		vz sh awx	
green	əβɯl¹	vwuilz		vz w uiz l	
thick	ətʰəi¹	vhtvyz		vz ht vz iz	
sharp	ət̪ʰɯi²	vhttuiyx		v htt uix ix	
heavy	əliʔ	vliq		v l iq	
lightweight	əʨɔ¹	vjawz		v j awz	
eat (rice)	saʔ	saq		s aq	
eat (rice).NOMZ	əsəi¹	vsvyz		vz s vz iz	
eat (dishes)	pʰəuk	phvuk		ph vz uz k	
eat (dishes).NOMZ	əpʰɯu¹	vphuiuz		vz ph uiuz	
drink	nɯŋ²	nuingx		n uix -ng	
drink.NOMZ	ənɯŋ³	vnuingc		vz n uic -ng	
give	kuʔ	kuq		k uq	
give.NOMZ	əkui¹	vkuyz		vz k uz iz	
tie	kʰər³	khvrc		kh vc r	
tie.NOMZ	əkʰər³	vkhvrc		vz kh vc r	
steal	ɣɯuʔ 	ghuiuq		gh uiuq	sometimes with gh-
steal.NOMZ	əɣɯuʔ	vghuiuq		vz gh uiuq	
lick	pʰet	phet		ph ez t	fast licking
lick.NOMZ	əpʰet	vphet		vz ph ez t	
lick	mel¹	melz		m ez l	long slow licking
lick.NOMZ	əmel¹	vmelz		vz m ez l	
bite	kauk	kauk		k az uz k	
bite.NOMZ	əkɯu¹	vkuiuz		vz k uiuz	
squeeze	ɲet	nyet		ny ez t	
squeeze.NOMZ	əɲet	vnyet		vz ny ez t	
cook	ʃuŋ³ lum³	shungc lumc	 	sh ux -ng l uc m	
cook rice	jəuŋ³	yvungc		y vc uc -ng	
cook dishes	lum³	lumc		l uc m	
dishes	əlum³	vlumc		vz l uc m	
roast	ʃu¹	shuz		sh uz	
roast.NOMZ	əʃoi¹	vshoayz		vz sh oz iz	
roast	ɣəuŋ³	ghvungc		gh vc uc -ng	
roast.NOMZ	əɣəuŋ³	vghvungc		vz gh vc uc -ng	
grind	nut	nut		n uz t	‘rub soap onto clothes before washing’
grind.NOMZ	ənut	vnut		n uz t	
wash	hoəl¹	hovlz		h oz vz l	
wash.NOMZ	əhoəl³	vhovlc		vz h oc vc l	
dig	tʰu¹	htuz		ht uz	
dig.NOMZ	ətʰoi¹	vhtoayz		vz ht oz iz	
release	duŋ¹	dungz		d uz -ng	
release.NOMZ 	əduŋ³	vdungc		vz d uc -ng	
extinguish	təmut	tvmut		t short.uez m uz t	
blow	gɯl¹	guilz		g uiz l	
pull.out.NOMZ	əmoi¹	vmoayz		vz m oz iz	
blow.NOMZ	əmui¹	vmuyz		vz m uz iz	
blow	mui¹	muyz		m uz iz	
buy	rɯi²	ruiyx		r uix ix	
thread	rɯi²	ruiyz		r uiz iz	
cane	rɯi¹	ruiyx		r uix ix	
cane	het	het		h ez t	
buy.NOMZ	əre¹	vrez		vz r ez	
type of pin	mi¹ kʰi³	miz khic	 	miz khic	
kill	t̪ət	thvt		th vz t	
kill.NOMZ	ət̪əi¹	vthvyz		vz th vz iz	
weave	kʰəi¹ tɯu¹	khvyz tuiuz	 	kh vz iz t uiuz	
weave.NOMZ	ətɯu¹	vtuiuz		vz t uiuz	
rub	t̪ʰut	httut		htt uz t	
rub.NOMZ	ət̪ʰut	vhttut		vz htt uz t	
squeeze	ɲet	nyet		ny ez t	
squeeze.NOMZ	əɲet	vnyet		vz ny ez t	
shoot	ɣap	ghap		gh az p	
shoot.NOMZ	əɣap	vghap		vz gh az p	
kick	hɯp	huip		h uiz p	
kick.NOMZ	əhɯp	vhuip		vz h uiz p	
sell	ʃəuŋ¹	shvungz		sh vz uz -ng	
sell.NOMZ	əʃəuŋ³	vshvungc		vz sh vc uc -ng	
put	taʔ	taq		t aq	
put.NOMZ	ətəi¹	vtvyz		vz t vz iz	
hunt	ŋəm² ləm³	ngvmx lvmc	 	ng vx m l vc m	
burn	kʰam³	khamc		kh ac m	
burn.NOMZ	əkʰam³	vkhamc		vz kh ac m	
cut	soəl³	sovlc		s oc vc l	
cut.NOMZ	əsoəl³	vsovlc		vz s oc vc l
cut	ʨum¹	jumz		j uz m
cut.NOMZ	əʨum³	vjumc		vz j uc m	
cut	ʨum¹	jumz		j uz m	
cut.NOMZ	əʨum³	vjumc		vz j uc m	
boil	boəm²	bovmx		b ox vx m	‘bubbling’
boil.NOMZ	əboəm²	vbovmx		vz b ox vx m	
hold	ʃɯm²	shuimx		sh uix m	
hold.NOMZ	əʃɯm³	vshuimc		vz sh uic m	
roll	kɯ²	kuix		k uix	
roll.NOMZ	əkɯ³	vkuic		vz k uic
"""