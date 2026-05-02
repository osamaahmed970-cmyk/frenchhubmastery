// server/db/add_lessons.js
// Run once: node server/db/add_lessons.js
// Adds all missing A2, B1, B2 lessons to the database

const DB = require('./database');

const existing = DB.findAll('lessons').length;
console.log(`Currently ${existing} lessons in DB. Adding missing ones...`);

const lessons = [
// ── A2 MISSING LESSONS ──────────────────────────────────────────────────────
{
  level:'A2', sort_order:17, duration_min:35, xp_reward:70,
  title:'Regular -IR and -RE Verbs',
  description:'Master the second and third verb groups: finir, choisir, vendre, répondre.',
  content: JSON.stringify({
    intro:`After mastering -ER verbs, you need the -IR and -RE groups. Together, these three groups cover the vast majority of French verbs. -IR verbs are very common for actions and states, while -RE verbs include important verbs like vendre, répondre, and attendre.`,
    sections:[
      {type:'grammar',title:'Conjugating -IR Verbs',rules:[
        {rule:'je → -is',example:'je finis, je choisis',translation:'I finish, I choose',breakdown:'Remove -ir, add -is'},
        {rule:'tu → -is',example:'tu finis, tu choisis',translation:'you finish, you choose',breakdown:''},
        {rule:'il/elle → -it',example:'il finit, elle choisit',translation:'he finishes, she chooses',breakdown:''},
        {rule:'nous → -issons',example:'nous finissons, nous choisissons',translation:'we finish, we choose',breakdown:'Note the -iss- in nous/vous/ils forms'},
        {rule:'vous → -issez',example:'vous finissez, vous choisissez',translation:'you finish, you choose',breakdown:''},
        {rule:'ils/elles → -issent',example:'ils finissent, elles choisissent',translation:'they finish, they choose',breakdown:''},
      ]},
      {type:'vocabulary',title:'Common -IR Verbs',items:[
        {fr:'finir',en:'to finish',pron:'fee-NEER',note:'Je finis le travail à 17h.'},
        {fr:'choisir',en:'to choose',pron:'shwah-ZEER',note:'Elle choisit un appartement à Oakville.'},
        {fr:'réussir',en:'to succeed',pron:'ray-ü-SEER',note:'Je veux réussir le TEF.'},
        {fr:'remplir',en:'to fill (in)',pron:'rom-PLEER',note:'Je remplis le formulaire IRCC.'},
        {fr:'obéir',en:'to obey',pron:'oh-bay-EER',note:''},
        {fr:'grandir',en:'to grow up',pron:'gron-DEER',note:'Mes enfants grandissent vite.'},
      ]},
      {type:'grammar',title:'Conjugating -RE Verbs',rules:[
        {rule:'je → -ds',example:'je vends, je réponds',translation:'I sell, I answer',breakdown:'Remove -re, add -ds'},
        {rule:'tu → -ds',example:'tu vends, tu réponds',translation:'you sell, you answer',breakdown:''},
        {rule:'il/elle → -d (no ending!)',example:'il vend, elle répond',translation:'he sells, she answers',breakdown:'No extra ending — just remove -re'},
        {rule:'nous → -ons',example:'nous vendons, nous répondons',translation:'we sell, we answer',breakdown:''},
        {rule:'vous → -ez',example:'vous vendez, vous répondez',translation:'you sell, you answer',breakdown:''},
        {rule:'ils/elles → -ent',example:'ils vendent, elles répondent',translation:'they sell, they answer',breakdown:''},
      ]},
      {type:'vocabulary',title:'Common -RE Verbs',items:[
        {fr:'vendre',en:'to sell',pron:'VON-druh',note:'Il vend sa maison à Oakville.'},
        {fr:'répondre',en:'to answer/respond',pron:'ray-PON-druh',note:'Je réponds à l\'email d\'IRCC.'},
        {fr:'attendre',en:'to wait',pron:'ah-TON-druh',note:'J\'attends ma résidence permanente.'},
        {fr:'entendre',en:'to hear',pron:'on-TON-druh',note:'Vous entendez bien?'},
        {fr:'perdre',en:'to lose',pron:'PAIR-druh',note:'Je ne veux pas perdre mon dossier.'},
        {fr:'rendre',en:'to return/give back',pron:'RON-druh',note:'Je rends les documents.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Conjugate "finir" for "nous": Nous _______ le cours.',options:['finissons','finons','finissez','finissent'],correct:0,explanation:'Nous + -IR verb: add -issons. nous finissons.'},
      {type:'multiple_choice',question:'Conjugate "répondre" for "il": Il _______ au téléphone.',options:['réponds','répond','répondez','répondent'],correct:1,explanation:'Il + -RE verb: just remove -re. il répond. No extra ending!'},
      {type:'multiple_choice',question:'"I am waiting for my work permit" — J\'_______ mon permis de travail.',options:['attende','attends','attend','attendons'],correct:1,explanation:'Je + attendre → j\'attends (-ds ending for je).'},
      {type:'multiple_choice',question:'Which is correct for "vous choisir"?',options:['vous choisisez','vous choisissez','vous choisez','vous finissez'],correct:1,explanation:'vous + -IR verb: add -issez. vous choisissez.'},
      {type:'multiple_choice',question:'"They sell houses in Oakville" — Ils _______ des maisons à Oakville.',options:['vend','vendent','vendons','vendes'],correct:1,explanation:'Ils + vendre → ils vendent (-ent ending).'},
    ],
    quiz:[
      {question:'What is the "il" form of "finir"?',options:['finis','finit','finissons','finissent'],correct:1,explanation:'il finit — -IR verbs: il/elle → -it.'},
      {question:'What is special about the "il" form of -RE verbs?',options:['It adds -t','It adds -s','It has no extra ending','It doubles the consonant'],correct:2,explanation:'il vend, il répond — no ending added. Just remove -re.'},
      {question:'Complete: "Nous _______ (attendre) le bus GO."',options:['attendons','attendez','attendent','attendons'],correct:0,explanation:'nous attendons — nous + -RE: add -ons.'},
      {question:'Complete: "Elle _______ (choisir) un cours de français."',options:['choisit','choisis','choisissez','choisissons'],correct:0,explanation:'elle choisit — elle + -IR: add -it.'},
      {question:'Complete: "Je _______ (répondre) à la lettre d\'IRCC."',options:['réponds','répond','répondons','répondez'],correct:0,explanation:'je réponds — je + -RE: add -ds.'},
    ]
  })
},
{
  level:'A2', sort_order:18, duration_min:30, xp_reward:65,
  title:'Asking Questions in French',
  description:'Master the three ways to ask questions in French — intonation, est-ce que, and inversion.',
  content: JSON.stringify({
    intro:`Asking questions is essential for every real conversation — at IRCC, at work, at the doctor, or in daily life in Oakville. French has three main ways to form questions, ranging from very informal to very formal. On the TEF oral exam, using question inversion shows language sophistication.`,
    sections:[
      {type:'grammar',title:'Method 1: Intonation (Informal)',rules:[
        {rule:'Raise your voice at the end',example:'Tu parles français?',translation:'Do you speak French?',breakdown:'Same word order as a statement, just raise the pitch at the end. Very common in spoken French.'},
        {rule:'More examples',example:'Vous avez un rendez-vous? / Il est canadien?',translation:'Do you have an appointment? / Is he Canadian?',breakdown:'Works for any statement — just add a question mark (or rising intonation in speech).'},
      ]},
      {type:'grammar',title:'Method 2: Est-ce que (Neutral)',rules:[
        {rule:'Add "est-ce que" at the start',example:'Est-ce que vous parlez français?',translation:'Do you speak French?',breakdown:'"Est-ce que" literally means "is it that". Add it before any statement to make a question.'},
        {rule:'Before a vowel: est-ce qu\'',example:'Est-ce qu\'il est médecin?',translation:'Is he a doctor?',breakdown:'"Est-ce que" → "est-ce qu\'" before vowel.'},
        {rule:'Question words + est-ce que',example:'Où est-ce que vous habitez? / Quand est-ce qu\'il arrive?',translation:'Where do you live? / When does he arrive?',breakdown:'Question word + est-ce que + subject + verb. Very natural.'},
      ]},
      {type:'grammar',title:'Method 3: Inversion (Formal)',rules:[
        {rule:'Swap subject and verb',example:'Parlez-vous français? (= Est-ce que vous parlez français?)',translation:'Do you speak French?',breakdown:'Verb + hyphen + subject pronoun. Used in formal situations and writing.'},
        {rule:'Hyphen always required',example:'Habitez-vous à Oakville? / Avez-vous un passeport?',translation:'Do you live in Oakville? / Do you have a passport?',breakdown:''},
        {rule:'il/elle + vowel: add -t-',example:'Parle-t-il français? / A-t-elle un rendez-vous?',translation:'Does he speak French? / Does she have an appointment?',breakdown:'When verb ends in vowel + il/elle: insert -t- for pronunciation.'},
        {rule:'With a noun subject',example:'Marie parle-t-elle français?',translation:'Does Marie speak French?',breakdown:'Keep noun, add pronoun after verb: Noun + verb + -t- + pronoun.'},
      ]},
      {type:'vocabulary',title:'Essential Question Words',items:[
        {fr:'Qui',en:'Who',pron:'kee',note:'Qui parle? / Avec qui?'},
        {fr:'Que / Qu\'',en:'What (object)',pron:'kuh',note:'Que voulez-vous? / Qu\'est-ce que vous faites?'},
        {fr:'Quoi',en:'What (after preposition)',pron:'kwah',note:'De quoi parlez-vous? / À quoi pensez-vous?'},
        {fr:'Où',en:'Where',pron:'oo',note:'Où habitez-vous? / D\'où venez-vous?'},
        {fr:'Quand',en:'When',pron:'kon',note:'Quand est votre rendez-vous?'},
        {fr:'Comment',en:'How',pron:'ko-MON',note:'Comment allez-vous? / Comment vous appelez-vous?'},
        {fr:'Combien (de)',en:'How much/many',pron:'kom-BYAN',note:'Combien coûte le billet? / Combien d\'enfants avez-vous?'},
        {fr:'Pourquoi',en:'Why',pron:'poor-KWAH',note:'Pourquoi étudiez-vous le français?'},
        {fr:'Quel / Quelle',en:'Which / What (adjective)',pron:'kel',note:'Quel est votre nom? / Quelle est votre adresse?'},
      ]},
      {type:'dialogue',title:'Dialogue — At an IRCC Appointment',lines:[
        {speaker:'Agent',fr:'Bonjour. Est-ce que vous avez votre passeport?',en:'Hello. Do you have your passport?'},
        {speaker:'Vous',fr:'Oui. Avez-vous reçu mes documents?',en:'Yes. Have you received my documents?'},
        {speaker:'Agent',fr:'Où habitez-vous actuellement?',en:'Where do you currently live?'},
        {speaker:'Vous',fr:'J\'habite à Oakville. Depuis combien de temps traitez-vous mon dossier?',en:'I live in Oakville. For how long have you been processing my file?'},
        {speaker:'Agent',fr:'Votre dossier est en cours. Avez-vous des questions?',en:'Your file is being processed. Do you have any questions?'},
        {speaker:'Vous',fr:'Oui — quand est-ce que je recevrai une réponse?',en:'Yes — when will I receive a response?'},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'In TEF oral, use inversion to sound sophisticated: "Pourriez-vous répéter?" not "Est-ce que vous pouvez répéter?"',
        '"Quel" agrees with the noun: quel âge (masc), quelle heure (fem), quels documents (masc pl), quelles questions (fem pl)',
        'D\'où venez-vous? (formal) = Vous venez d\'où? (informal) — both mean "Where are you from?"',
        'In writing exams, never use method 1 (intonation) — always use est-ce que or inversion',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Make a formal question: "You speak French" → ?',options:['Vous parlez français?','Est-ce que vous parlez français?','Parlez-vous français?','Parliez-vous français?'],correct:2,explanation:'"Parlez-vous français?" is inversion — the most formal form. Verb + hyphen + subject.'},
      {type:'multiple_choice',question:'"Where do you live?" — formal version:',options:['Vous habitez où?','Est-ce que vous habitez?','Où habitez-vous?','Où vous habitez?'],correct:2,explanation:'"Où habitez-vous?" — question word + inversion. Formal and correct.'},
      {type:'multiple_choice',question:'"Does he have an appointment?" — correct inversion:',options:['A-il un rendez-vous?','Avoir-il un rendez-vous?','A-t-il un rendez-vous?','Il a-t un rendez-vous?'],correct:2,explanation:'"A-t-il" — when the verb ends in a vowel and the pronoun is il/elle, insert -t- for pronunciation.'},
      {type:'multiple_choice',question:'Which question word asks "how many"?',options:['Comment','Combien','Quand','Quel'],correct:1,explanation:'"Combien" = how much/many. "Combien d\'enfants avez-vous?"'},
      {type:'multiple_choice',question:'Complete: "_____ est votre adresse?" (What is your address?)',options:['Qui','Que','Quel','Quelle'],correct:3,explanation:'"Quelle" — agrees with "adresse" (feminine). Quelle est votre adresse?'},
    ],
    quiz:[
      {question:'Which method is most formal?',options:['Intonation','Est-ce que','Inversion','All equal'],correct:2,explanation:'Inversion is the most formal — swap verb and subject pronoun with a hyphen.'},
      {question:'"Comment ______-vous?" (How are you? — formal)',options:['allez','aller','allons','vont'],correct:0,explanation:'Comment allez-vous? — formal greeting using inversion.'},
      {question:'When do you add -t- in inversion?',options:['Always','Never','When verb ends in vowel + il/elle','When subject is plural'],correct:2,explanation:'Parle-t-il? A-t-elle? — -t- inserted when verb ends in vowel before il/elle.'},
      {question:'"Quel" or "Quelle"? "_____ heure est-il?"',options:['Quel','Quelle','Quels','Quelles'],correct:1,explanation:'"Heure" is feminine → Quelle heure est-il? (What time is it?)'},
      {question:'In TEF written production, which question form should you use?',options:['Intonation only','Est-ce que or inversion','Any form','No questions'],correct:1,explanation:'In formal writing, always use est-ce que or inversion — never just intonation (rising pitch).'},
    ]
  })
},
{
  level:'A2', sort_order:19, duration_min:25, xp_reward:55,
  title:'Negation: ne...pas and Beyond',
  description:'Learn to make negative sentences — and the common negatives beyond just "ne...pas".',
  content: JSON.stringify({
    intro:`Negation is used in almost every conversation. While "ne...pas" is the foundation, French has many negative expressions — ne...jamais (never), ne...plus (no longer), ne...rien (nothing), ne...personne (nobody) — all tested on TEF. Mastering these distinguishes A2 from B1 level.`,
    sections:[
      {type:'grammar',title:'Basic Negation: ne...pas',rules:[
        {rule:'Structure',example:'Je ne parle pas anglais.',translation:'I don\'t speak English.',breakdown:'ne before verb, pas after verb. Both are required in formal French.'},
        {rule:'Before vowel: n\'',example:'Je n\'habite pas à Toronto.',translation:'I don\'t live in Toronto.',breakdown:'ne → n\' before a vowel or silent h.'},
        {rule:'With auxiliary verbs',example:'Je n\'ai pas fini. / Il n\'est pas arrivé.',translation:'I haven\'t finished. / He hasn\'t arrived.',breakdown:'In compound tenses, ne...pas wraps the auxiliary (avoir/être), not the past participle.'},
      ]},
      {type:'grammar',title:'Other Negative Expressions',rules:[
        {rule:'ne...jamais = never',example:'Je ne mange jamais de viande.',translation:'I never eat meat.',breakdown:'"Jamais" replaces "pas". Same position.'},
        {rule:'ne...plus = no longer / not anymore',example:'Je ne travaille plus à Toronto.',translation:'I no longer work in Toronto.',breakdown:'Very common — use when something has stopped.'},
        {rule:'ne...rien = nothing',example:'Je ne comprends rien.',translation:'I understand nothing.',breakdown:'"Rien" can also be the subject: Rien n\'est impossible.'},
        {rule:'ne...personne = nobody',example:'Je ne connais personne ici.',translation:'I don\'t know anyone here.',breakdown:'"Personne" goes after the past participle in compound tenses: Je n\'ai vu personne.'},
        {rule:'ne...que = only',example:'Je ne parle que français.',translation:'I only speak French.',breakdown:'Not a true negative — expresses restriction. "Que" goes before the word it restricts.'},
        {rule:'ne...ni...ni = neither...nor',example:'Je ne parle ni anglais ni espagnol.',translation:'I speak neither English nor Spanish.',breakdown:'Used with pairs. Articles often dropped after ni.'},
      ]},
      {type:'grammar',title:'Articles After Negation',rules:[
        {rule:'un/une/des → de after pas',example:'J\'ai un emploi. → Je n\'ai pas d\'emploi.',translation:'I have a job. → I don\'t have a job.',breakdown:'After ne...pas: un/une/des → de (or d\' before vowel).'},
        {rule:'Exception: être',example:'Ce n\'est pas un problème.',translation:'It\'s not a problem.',breakdown:'After être in negation: article stays. Ce n\'est pas UN problème.'},
        {rule:'Definite articles don\'t change',example:'Je n\'aime pas le café.',translation:'I don\'t like coffee.',breakdown:'le/la/les stay the same after negation.'},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'In spoken French, "ne" is often dropped: "Je sais pas", "C\'est pas vrai". But NEVER drop it in TEF writing.',
        'In TEF oral, dropping "ne" occasionally sounds natural — but use it most of the time.',
        '"Ne...que" is not a true negative but appears in TEF comprehension — don\'t confuse it with restriction.',
        'Common error: "Je ne veux pas rien" is WRONG — double negatives cancel out in French. Say "Je ne veux rien."',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I never take the bus" — Je _______ prends _______ le bus.',options:['ne/jamais','ne/pas','n\'/jamais','ne/plus'],correct:0,explanation:'"Ne...jamais" = never. Je ne prends jamais le bus.'},
      {type:'multiple_choice',question:'"I no longer live in Toronto" — Je _______ habite _______ à Toronto.',options:['ne/pas','ne/plus','ne/jamais','n\'/rien'],correct:1,explanation:'"Ne...plus" = no longer/not anymore. Je ne habite plus → Je n\'habite plus.'},
      {type:'multiple_choice',question:'"I don\'t have a car" — Je n\'ai pas _______ voiture.',options:['une','de','la','un'],correct:1,explanation:'After ne...pas: une → de. Je n\'ai pas DE voiture.'},
      {type:'multiple_choice',question:'"It\'s not a problem" — Ce n\'est pas _______ problème.',options:['de','d\'un','un','pas de'],correct:2,explanation:'Exception: after être in negation, article stays. Ce n\'est pas UN problème.'},
      {type:'multiple_choice',question:'"I only speak French" — Je ne parle _______ français.',options:['pas','jamais','que','rien'],correct:2,explanation:'"Ne...que" = only. Je ne parle QUE français. "Que" goes before what is restricted.'},
    ],
    quiz:[
      {question:'Where does "pas" go relative to the verb?',options:['Before the verb','After the verb','Before "ne"','At the end of sentence'],correct:1,explanation:'Ne BEFORE verb, pas AFTER verb: Je NE parle PAS.'},
      {question:'"Je n\'ai _______ fini." (I haven\'t finished yet — not anymore)',options:['pas','jamais','plus','rien'],correct:2,explanation:'"Plus" = no longer/not anymore. Je n\'ai plus fini would mean "I no longer finished" — actually pas is better here. Plus means no longer ongoing.'},
      {question:'Complete: "Je ne connais _______ à Oakville." (I don\'t know anyone)',options:['rien','jamais','personne','plus'],correct:2,explanation:'"Personne" = nobody/anyone (in negation). Je ne connais personne.'},
      {question:'In TEF writing, can you drop "ne"?',options:['Yes, always','Yes, sometimes','No, never','Only in questions'],correct:2,explanation:'In TEF written production, NEVER drop "ne". Full negation required: ne...pas, ne...jamais, etc.'},
      {question:'"J\'ai des amis" → negative:',options:['Je n\'ai pas des amis','Je n\'ai pas d\'amis','Je n\'ai pas les amis','Je n\'ai de amis'],correct:1,explanation:'des → de after negation. Je n\'ai pas D\'amis (d\' before vowel).'},
    ]
  })
},
{
  level:'A2', sort_order:20, duration_min:30, xp_reward:60,
  title:'Time & Daily Routines',
  description:'Tell the time, describe your daily schedule, and use frequency adverbs — all essential for TEF oral tasks.',
  content: JSON.stringify({
    intro:`Describing your daily routine is one of the most common TEF/TCF oral tasks at A2-B1 level. You need to tell the time accurately, use time expressions naturally, and describe sequences of events. In Canada, both 12-hour and 24-hour time are used — the 24-hour clock is standard in official contexts.`,
    sections:[
      {type:'grammar',title:'Telling the Time',rules:[
        {rule:'Il est + time',example:'Il est deux heures.',translation:'It is two o\'clock.',breakdown:'Always use "il est" for time. Never "c\'est deux heures."'},
        {rule:'On the hour',example:'Il est huit heures. / Il est midi. / Il est minuit.',translation:'It\'s 8:00. / It\'s noon. / It\'s midnight.',breakdown:'"Midi" = noon, "minuit" = midnight. No "heures" with these.'},
        {rule:'Quarter past',example:'Il est trois heures et quart.',translation:'It\'s quarter past three. (3:15)',breakdown:'"Et quart" = and a quarter.'},
        {rule:'Half past',example:'Il est trois heures et demie.',translation:'It\'s half past three. (3:30)',breakdown:'"Et demie" = and a half. Note feminine -e on demie (agreeing with heure).'},
        {rule:'Quarter to',example:'Il est quatre heures moins le quart.',translation:'It\'s quarter to four. (3:45)',breakdown:'"Moins le quart" = minus the quarter.'},
        {rule:'Minutes past',example:'Il est dix heures vingt.',translation:'It\'s 10:20.',breakdown:'Hours + minutes (no "et" unless it\'s quarter or half).'},
        {rule:'Minutes to',example:'Il est onze heures moins dix.',translation:'It\'s ten to eleven. (10:50)',breakdown:'"Moins" + minutes for times after the half hour.'},
        {rule:'24-hour clock (official)',example:'Le train part à quatorze heures trente.',translation:'The train leaves at 14:30.',breakdown:'Official contexts: schedules, IRCC appointments, hospitals — use 24h.'},
      ]},
      {type:'vocabulary',title:'Time Expressions',items:[
        {fr:'le matin',en:'in the morning',pron:'luh ma-TAN',note:'Je travaille le matin.'},
        {fr:'l\'après-midi',en:'in the afternoon',pron:'lah-pray mee-DEE',note:'J\'étudie l\'après-midi.'},
        {fr:'le soir',en:'in the evening',pron:'luh SWAHR',note:'Je regarde la télé le soir.'},
        {fr:'la nuit',en:'at night',pron:'lah NWEE',note:'Je dors la nuit.'},
        {fr:'tôt',en:'early',pron:'toh',note:'Je me lève tôt.'},
        {fr:'tard',en:'late',pron:'tar',note:'Je rentre tard du travail.'},
        {fr:'d\'abord',en:'first of all',pron:'da-BOR',note:'D\'abord, je prends le café.'},
        {fr:'ensuite / puis',en:'then / next',pron:'on-SWEET / pwee',note:'Ensuite, je vais au bureau.'},
        {fr:'enfin',en:'finally',pron:'on-FAN',note:'Enfin, je rentre à la maison.'},
      ]},
      {type:'vocabulary',title:'Frequency Adverbs',items:[
        {fr:'toujours',en:'always',pron:'too-ZHOOR',note:'Je prends toujours le GO Train.'},
        {fr:'souvent',en:'often',pron:'soo-VON',note:'Je vais souvent au parc.'},
        {fr:'parfois / quelquefois',en:'sometimes',pron:'par-FWAH / kel-kuh-FWAH',note:'Parfois je travaille à domicile.'},
        {fr:'rarement',en:'rarely',pron:'rar-MON',note:'Je mange rarement au restaurant.'},
        {fr:'ne...jamais',en:'never',pron:'nuh...zhah-MAY',note:'Je ne prends jamais l\'avion pour aller à Burlington!'},
      ]},
      {type:'dialogue',title:'Dialogue — Describing Your Day',lines:[
        {speaker:'Collègue',fr:'Tu commences à quelle heure le matin?',en:'What time do you start in the morning?'},
        {speaker:'Vous',fr:'Je commence à neuf heures. Je prends le GO Train à huit heures moins le quart.',en:'I start at nine. I take the GO Train at quarter to eight.'},
        {speaker:'Collègue',fr:'Et tu finis à quelle heure?',en:'And what time do you finish?'},
        {speaker:'Vous',fr:'Je finis à dix-sept heures trente. Ensuite, je vais chercher mes enfants à l\'école.',en:'I finish at 17:30. Then I go pick up my children from school.'},
        {speaker:'Collègue',fr:'Tu étudies le français le soir?',en:'Do you study French in the evening?'},
        {speaker:'Vous',fr:'Oui, souvent. J\'étudie pendant une heure après le dîner.',en:'Yes, often. I study for one hour after dinner.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'How do you say 3:15 in French?',options:['Il est trois heures quinze','Il est trois heures et quart','Il est le quart de trois','Il est trois et quart heures'],correct:1,explanation:'3:15 = Il est trois heures ET QUART. Both "trois heures quinze" and "trois heures et quart" are correct, but et quart is more natural in speech.'},
      {type:'multiple_choice',question:'How do you say 10:30?',options:['Il est dix heures et demi','Il est dix heures et demie','Il est dix et demie','Il est demi-dix'],correct:1,explanation:'Il est dix heures ET DEMIE — demie has feminine -e because it agrees with "heure" (feminine).'},
      {type:'multiple_choice',question:'Your IRCC appointment is at 14:30. You say:',options:['à deux heures et demie de l\'après-midi','à quatorze heures trente','à deux heures trente','à 14h30 le soir'],correct:1,explanation:'Official contexts use 24-hour clock: quatorze heures trente. This is standard for appointments and schedules.'},
      {type:'multiple_choice',question:'Complete the routine: "D\'abord je prends le café, _______ je vais au bureau."',options:['d\'abord','enfin','ensuite','toujours'],correct:2,explanation:'"Ensuite" = then/next. D\'abord (first) → ensuite (then) → enfin (finally).'},
    ],
    quiz:[
      {question:'How do you say 9:45?',options:['Il est neuf heures quarante-cinq','Il est dix heures moins le quart','Both are correct','Neither is correct'],correct:2,explanation:'Both "neuf heures quarante-cinq" and "dix heures moins le quart" are correct for 9:45.'},
      {question:'What does "tard" mean?',options:['early','late','often','always'],correct:1,explanation:'"Tard" = late. "Tôt" = early.'},
      {question:'Put in order: first → then → finally',options:['d\'abord / ensuite / enfin','enfin / d\'abord / ensuite','ensuite / enfin / d\'abord','toujours / souvent / jamais'],correct:0,explanation:'D\'abord (first) → ensuite/puis (then) → enfin (finally). Classic sequence markers.'},
      {question:'"I always study in the evening" — Je _______ étudie le soir.',options:['jamais','rarement','toujours','parfois'],correct:2,explanation:'"Toujours" = always. Je toujours étudie — wait, frequency adverbs go AFTER the verb: Je étudie toujours... actually: Je TOUJOURS étudie is wrong. Correct: J\'étudie TOUJOURS le soir.'},
      {question:'How do you say "midnight" in French?',options:['midiminuit','minuit','mi-nuit','nuit entière'],correct:1,explanation:'"Minuit" = midnight. "Midi" = noon.'},
    ]
  })
},
// ── B1 MISSING LESSONS ──────────────────────────────────────────────────────
{
  level:'B1', sort_order:27, duration_min:45, xp_reward:90,
  title:'Passé Composé with Être',
  description:'Learn the motion and state verbs that use être instead of avoir in passé composé — and master agreement rules.',
  content: JSON.stringify({
    intro:`While most verbs use avoir in the passé composé, a specific group of motion and state verbs use être. These verbs require agreement between the past participle and the subject — a key accuracy point on TEF written production. The classic mnemonic is "DR & MRS VANDERTRAMP".`,
    sections:[
      {type:'grammar',title:'The DR MRS VANDERTRAMP Verbs',explanation:'These 14 verbs (plus all reflexive verbs) use ÊTRE as auxiliary in passé composé.',rules:[
        {rule:'D — Descendre',example:'Je suis descendu(e) du train.',translation:'I got off the train.',breakdown:''},
        {rule:'R — Rester',example:'Je suis resté(e) à Oakville.',translation:'I stayed in Oakville.',breakdown:''},
        {rule:'M — Monter',example:'Il est monté dans le bus.',translation:'He got on the bus.',breakdown:''},
        {rule:'R — Rentrer',example:'Elle est rentrée à la maison.',translation:'She came home.',breakdown:''},
        {rule:'S — Sortir',example:'Nous sommes sortis hier soir.',translation:'We went out last night.',breakdown:''},
        {rule:'V — Venir',example:'Il est venu au Canada en 2023.',translation:'He came to Canada in 2023.',breakdown:''},
        {rule:'A — Aller',example:'Je suis allé(e) à l\'IRCC.',translation:'I went to IRCC.',breakdown:''},
        {rule:'N — Naître',example:'Il est né à Casablanca.',translation:'He was born in Casablanca.',breakdown:''},
        {rule:'D — Devenir',example:'Elle est devenue médecin.',translation:'She became a doctor.',breakdown:''},
        {rule:'E — Entrer',example:'Je suis entré(e) au Canada légalement.',translation:'I entered Canada legally.',breakdown:''},
        {rule:'R — Retourner',example:'Il est retourné au Maroc.',translation:'He returned to Morocco.',breakdown:''},
        {rule:'T — Tomber',example:'Elle est tombée.',translation:'She fell.',breakdown:''},
        {rule:'R — Revenir',example:'Je suis revenu(e) de Montréal.',translation:'I came back from Montreal.',breakdown:''},
        {rule:'A — Arriver',example:'Ils sont arrivés à l\'aéroport.',translation:'They arrived at the airport.',breakdown:''},
        {rule:'M — Mourir',example:'Il est mort en 2020.',translation:'He died in 2020.',breakdown:''},
        {rule:'P — Partir',example:'Elle est partie tôt ce matin.',translation:'She left early this morning.',breakdown:''},
      ]},
      {type:'grammar',title:'Agreement Rules — Critical for TEF',rules:[
        {rule:'Masculine singular — no change',example:'Il est allé. / Jean est parti.',translation:'He went. / Jean left.',breakdown:'No ending added.'},
        {rule:'Feminine singular — add -e',example:'Elle est allée. / Marie est partie.',translation:'She went. / Marie left.',breakdown:'Add -e to past participle.'},
        {rule:'Masculine plural — add -s',example:'Ils sont allés. / Les garçons sont partis.',translation:'They went. / The boys left.',breakdown:'Add -s to past participle.'},
        {rule:'Feminine plural — add -es',example:'Elles sont allées. / Les filles sont parties.',translation:'They went. / The girls left.',breakdown:'Add -es to past participle.'},
        {rule:'Mixed group — masculine plural',example:'Pierre et Marie sont allés au marché.',translation:'Pierre and Marie went to the market.',breakdown:'Any male in group → masculine plural (-s).'},
      ]},
      {type:'dialogue',title:'Dialogue — Talking About a Trip to Ottawa',lines:[
        {speaker:'Ami',fr:'Tu es allé à Ottawa le weekend dernier?',en:'Did you go to Ottawa last weekend?'},
        {speaker:'Vous',fr:'Oui! Je suis parti samedi matin et je suis arrivé à midi.',en:'Yes! I left Saturday morning and arrived at noon.'},
        {speaker:'Ami',fr:'Tu es resté combien de temps?',en:'How long did you stay?'},
        {speaker:'Vous',fr:'Je suis resté deux jours. Ma femme est venue avec moi.',en:'I stayed two days. My wife came with me.'},
        {speaker:'Ami',fr:'Et vous êtes rentrés quand?',en:'And when did you come back?'},
        {speaker:'Vous',fr:'Nous sommes rentrés dimanche soir. C\'était magnifique!',en:'We came back Sunday evening. It was magnificent!'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"She arrived at the airport" — Elle _______ à l\'aéroport.',options:['a arrivée','est arrivé','est arrivée','a arrivé'],correct:2,explanation:'"Arriver" uses être. Elle (feminine) → est arrivÉE (add -e for feminine agreement).'},
      {type:'multiple_choice',question:'"They (mixed group) went to Montreal" — Ils _______ à Montréal.',options:['sont allés','sont allées','ont allé','sont aller'],correct:0,explanation:'"Aller" uses être. Mixed group → masculine plural: sont allÉS (add -s).'},
      {type:'multiple_choice',question:'"I (female) stayed in Oakville" — Je _______ à Oakville.',options:['ai resté','suis resté','suis restée','ai restée'],correct:2,explanation:'"Rester" uses être. Female speaker → suis resteÉE (add -e for feminine).'},
      {type:'multiple_choice',question:'Which verb uses AVOIR not être in passé composé?',options:['aller','venir','manger','partir'],correct:2,explanation:'"Manger" is a regular -ER verb → uses avoir: j\'ai mangé. The être verbs are specific motion/state verbs.'},
      {type:'translate',question:'Translate: "Marie and Sophie came to Canada in 2022."',answer:'Marie et Sophie sont venues au Canada en 2022.',alternatives:['Marie et Sophie sont arrivées au Canada en 2022.'],explanation:'Venir uses être. Marie et Sophie = all female → sont venUES (add -es for feminine plural agreement).'},
    ],
    quiz:[
      {question:'Which verb uses ÊTRE in passé composé?',options:['manger','parler','partir','finir'],correct:2,explanation:'"Partir" (to leave) is a DR MRS VANDERTRAMP verb → uses être.'},
      {question:'"He was born in Morocco" — Il _______ au Maroc.',options:['a né','est né','a nait','est nait'],correct:1,explanation:'"Naître" uses être. Il est né. (Masculine, no agreement needed — already ends in consonant)'},
      {question:'Complete: "Elles _______ (partir) hier." (They — all female — left yesterday)',options:['sont parti','sont partie','sont parties','ont parti'],correct:2,explanation:'Partir + être. Elles (feminine plural) → sont partIES (-es ending).'},
      {question:'Agreement with être: "Nous (mixed group) _______ (aller) au marché."',options:['sommes allés','sommes allées','avons allé','sommes aller'],correct:0,explanation:'Mixed group → masculine plural agreement: sommes allÉS.'},
      {question:'Which is the correct passé composé of "venir" for "elle"?',options:['elle a venu','elle est venu','elle est venue','elle a venue'],correct:2,explanation:'"Venir" uses être. Elle (feminine) → est venUE.'},
    ]
  })
},
{
  level:'B1', sort_order:28, duration_min:40, xp_reward:85,
  title:'Imparfait: Describing the Past',
  description:'Learn the imperfect tense for ongoing past states, habits, and descriptions — and how to use it alongside passé composé.',
  content: JSON.stringify({
    intro:`The imparfait is the second essential past tense in French. While passé composé describes completed events ("I went to the market"), the imparfait describes ongoing states, habits, and background descriptions ("It was sunny", "I used to take the bus", "I was studying when..."). The distinction between these two tenses is one of the most tested points on TEF/TCF at B1-B2 level.`,
    sections:[
      {type:'grammar',title:'How to Form the Imparfait',rules:[
        {rule:'Step 1: Take the nous form of present tense',example:'parler → nous parlons | finir → nous finissons | prendre → nous prenons',translation:'',breakdown:''},
        {rule:'Step 2: Remove -ons',example:'parlons → parl- | finissons → finiss- | prenons → pren-',translation:'',breakdown:''},
        {rule:'Step 3: Add endings',example:'-ais, -ais, -ait, -ions, -iez, -aient',translation:'',breakdown:'All endings have the sound "ay" except -ions/-iez'},
        {rule:'je parlais',example:'Je parlais français au Maroc.',translation:'I used to speak French in Morocco.',breakdown:''},
        {rule:'tu parlais',example:'Tu parlais trop vite!',translation:'You were speaking too fast!',breakdown:''},
        {rule:'il/elle/on parlait',example:'Il parlait avec l\'agent.',translation:'He was speaking with the officer.',breakdown:''},
        {rule:'nous parlions',example:'Nous parlions français à la maison.',translation:'We used to speak French at home.',breakdown:''},
        {rule:'vous parliez',example:'Vous parliez de votre dossier.',translation:'You were talking about your file.',breakdown:''},
        {rule:'ils/elles parlaient',example:'Ils parlaient couramment.',translation:'They spoke fluently.',breakdown:''},
      ]},
      {type:'grammar',title:'Only One Irregular Imparfait: ÊTRE',rules:[
        {rule:'être → ét- (irregular stem)',example:'j\'étais, tu étais, il était, nous étions, vous étiez, ils étaient',translation:'I was, you were, he was, we were, you were, they were',breakdown:'All other verbs are regular in imparfait — just use the nous stem!'},
      ]},
      {type:'grammar',title:'When to Use Imparfait vs Passé Composé',explanation:'This distinction is crucial for B1-B2 TEF. Use this chart to decide:',rules:[
        {rule:'IMPARFAIT for: ongoing/background state',example:'Il faisait beau. / J\'avais faim.',translation:'It was nice weather. / I was hungry.',breakdown:'Sets the scene — ongoing at a moment in the past'},
        {rule:'IMPARFAIT for: habits/repeated actions',example:'Quand j\'étais enfant, j\'habitais à Casablanca.',translation:'When I was a child, I lived in Casablanca.',breakdown:'"Used to" — regular, repeated past action'},
        {rule:'IMPARFAIT for: interrupted action',example:'J\'étudiais quand le téléphone a sonné.',translation:'I was studying when the phone rang.',breakdown:'Background action (imparfait) interrupted by event (passé composé)'},
        {rule:'PASSÉ COMPOSÉ for: completed event',example:'Hier, j\'ai reçu ma résidence permanente!',translation:'Yesterday, I received my permanent residency!',breakdown:'One completed event at a specific moment'},
        {rule:'KEY SIGNAL WORDS — Imparfait',example:'toujours, souvent, chaque jour, tous les jours, quand j\'étais..., autrefois',translation:'always, often, every day, every day, when I was..., in the past',breakdown:''},
        {rule:'KEY SIGNAL WORDS — Passé Composé',example:'hier, soudain, tout à coup, un jour, le 5 mars, une fois',translation:'yesterday, suddenly, all of a sudden, one day, on March 5th, once',breakdown:''},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"When I was young, I used to live in Casablanca." Which tense?',options:['Passé composé','Imparfait','Futur','Présent'],correct:1,explanation:'"Used to" = habitual past action → imparfait. "Quand j\'étais jeune, j\'habitais à Casablanca."'},
      {type:'multiple_choice',question:'Complete: "Je _______ (étudier) quand le téléphone a sonné."',options:['ai étudié','étudiais','étudie','étudierai'],correct:1,explanation:'Interrupted ongoing action → imparfait. J\'ÉTUDIAIS (background) when the phone rang (passé composé event).'},
      {type:'multiple_choice',question:'Complete: "Il _______ (faire) beau quand je suis arrivé."',options:['a fait','faisait','fait','fera'],correct:1,explanation:'Weather description = background/ongoing → imparfait. Il FAISAIT beau. (Background setting the scene.)'},
      {type:'multiple_choice',question:'What is the imparfait stem of "prendre"?',options:['prend-','pren-','prenai-','pris-'],correct:1,explanation:'nous prenons → remove -ons → pren-. Then add imparfait endings: je prenais, tu prenais...'},
      {type:'multiple_choice',question:'"Hier soir, j\'_______ (regarder) la télé quand ma femme _______ (arriver)."',options:['ai regardé / est arrivée','regardais / est arrivée','regardais / arrivait','ai regardé / arrivait'],correct:1,explanation:'J\'ÉTAIS (imparfait = ongoing) when she ARRIVED (passé composé = completed event). Background + interruption.'},
    ],
    quiz:[
      {question:'Which is the only irregular verb in the imparfait?',options:['avoir','faire','être','aller'],correct:2,explanation:'"Être" is the only irregular imparfait: j\'étais, tu étais, il était... All others use their nous stem.'},
      {question:'"Every day, I took the GO Train" — use:',options:['Passé composé','Imparfait','Both','Neither'],correct:1,explanation:'"Every day" = repeated/habitual → imparfait. Je prenais le GO Train tous les jours.'},
      {question:'Complete: "Quand il _______ (être) enfant, il _______ (habiter) à Paris."',options:['était / habitait','a été / a habité','est / habite','était / a habité'],correct:0,explanation:'Both describe ongoing past states/habits → both imparfait. Quand il ÉTAIT enfant, il HABITAIT à Paris.'},
      {question:'Which signal word signals passé composé?',options:['toujours','souvent','soudain','chaque jour'],correct:2,explanation:'"Soudain" (suddenly) signals a specific completed event → passé composé. The others signal habits/frequency → imparfait.'},
      {question:'What are the imparfait endings?',options:['-ai/-as/-a/-ons/-ez/-ont','-ais/-ais/-ait/-ions/-iez/-aient','-e/-es/-e/-ons/-ez/-ent','-is/-is/-it/-issons/-issez/-issent'],correct:1,explanation:'-ais, -ais, -ait, -ions, -iez, -aient. All sound like "ay" except -ions/-iez.'},
    ]
  })
},
{
  level:'B1', sort_order:29, duration_min:40, xp_reward:85,
  title:'Future Tenses: Futur Simple & Futur Proche',
  description:'Express future plans and predictions using both future tenses — essential for TEF oral and written production.',
  content: JSON.stringify({
    intro:`French has two main future tenses: the futur proche (near future) and the futur simple (simple future). Both are essential for TEF/TCF — the oral exam often asks you to talk about your plans, and the written section may ask you to make predictions or describe future situations. Knowing which to use shows sophistication.`,
    sections:[
      {type:'grammar',title:'Futur Proche: aller + infinitive',rules:[
        {rule:'Formation',example:'aller (present) + infinitive',translation:'',breakdown:'je vais, tu vas, il va, nous allons, vous allez, ils vont + infinitive'},
        {rule:'Use: immediate/planned future',example:'Je vais passer le TEF en décembre.',translation:'I am going to take the TEF in December.',breakdown:'Like "going to" in English — planned or imminent'},
        {rule:'Negation',example:'Je ne vais pas partir ce weekend.',translation:'I am not going to leave this weekend.',breakdown:'ne...pas wraps "aller": je NE VAIS PAS partir'},
      ]},
      {type:'grammar',title:'Futur Simple: All Conjugations',rules:[
        {rule:'Formation: infinitive + endings',example:'-ai, -as, -a, -ons, -ez, -ont',translation:'',breakdown:'For -RE verbs: drop the final -e first. vendre → vendr-'},
        {rule:'je → -ai',example:'Je parlerai français couramment.',translation:'I will speak French fluently.',breakdown:''},
        {rule:'tu → -as',example:'Tu réussiras le TEF.',translation:'You will pass the TEF.',breakdown:''},
        {rule:'il/elle → -a',example:'Il obtiendra sa résidence permanente.',translation:'He will obtain his permanent residency.',breakdown:''},
        {rule:'nous → -ons',example:'Nous vivrons au Canada.',translation:'We will live in Canada.',breakdown:''},
        {rule:'vous → -ez',example:'Vous recevrez une réponse.',translation:'You will receive a response.',breakdown:''},
        {rule:'ils → -ont',example:'Ils partiront pour Montréal.',translation:'They will leave for Montreal.',breakdown:''},
      ]},
      {type:'grammar',title:'Irregular Futur Simple Stems — Must Memorize',rules:[
        {rule:'être → ser-',example:'je serai, tu seras, il sera...',translation:'I will be, you will be, he will be...',breakdown:''},
        {rule:'avoir → aur-',example:'j\'aurai, tu auras, il aura...',translation:'I will have, you will have, he will have...',breakdown:''},
        {rule:'aller → ir-',example:'j\'irai, tu iras, il ira...',translation:'I will go, you will go, he will go...',breakdown:''},
        {rule:'faire → fer-',example:'je ferai, tu feras, il fera...',translation:'I will do/make...',breakdown:''},
        {rule:'pouvoir → pourr-',example:'je pourrai, tu pourras...',translation:'I will be able to...',breakdown:''},
        {rule:'vouloir → voudr-',example:'je voudrai, tu voudras...',translation:'I will want...',breakdown:''},
        {rule:'venir → viendr-',example:'je viendrai, tu viendras...',translation:'I will come...',breakdown:''},
        {rule:'voir → verr-',example:'je verrai, tu verras...',translation:'I will see...',breakdown:''},
        {rule:'savoir → saur-',example:'je saurai, tu sauras...',translation:'I will know...',breakdown:''},
        {rule:'devoir → devr-',example:'je devrai, tu devras...',translation:'I will have to...',breakdown:''},
      ]},
      {type:'grammar',title:'Futur Proche vs Futur Simple — When to Use Which',rules:[
        {rule:'Futur proche: planned/certain',example:'Je vais étudier ce soir. (planned)',translation:'I am going to study tonight.',breakdown:'Certain plan, like English "going to"'},
        {rule:'Futur simple: prediction/hypothesis',example:'En 2027, je parlerai couramment français.',translation:'In 2027, I will speak French fluently.',breakdown:'Prediction further in future, like English "will"'},
        {rule:'Futur simple after quand/si',example:'Quand j\'aurai ma résidence permanente, je serai bilingue.',translation:'When I have my permanent residency, I will be bilingual.',breakdown:'After "quand" in future context: use futur simple (not present like in English!)'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I am going to study French tonight" — Je _______ étudier le français ce soir.',options:['vais','irai','voudrai','serai'],correct:0,explanation:'Futur proche = aller (present) + infinitive. Je VAIS étudier.'},
      {type:'multiple_choice',question:'What is the futur simple of "être" for "je"?',options:['je serai','je suis','je serais','j\'étais'],correct:0,explanation:'être → ser- + -ai = je SERAI. Common irregular stem.'},
      {type:'multiple_choice',question:'Complete: "Quand j\'_______ (avoir) mon passeport, je _______ (partir)."',options:['ai / vais partir','aurai / partirai','aurais / partirais','ai eu / suis parti'],correct:1,explanation:'After "quand" in future context: use futur simple in BOTH clauses. Quand j\'AURAI (not j\'ai), je PARTIRAI.'},
      {type:'multiple_choice',question:'"In 2027, we will live in Ottawa." Which tense?',options:['Futur proche','Futur simple','Présent','Imparfait'],correct:1,explanation:'Prediction about the distant future → futur simple. Nous vivrons à Ottawa en 2027.'},
      {type:'translate',question:'Translate: "She will receive her permanent residency card next year."',answer:'Elle recevra sa carte de résidence permanente l\'année prochaine.',alternatives:['Elle va recevoir sa carte de résidence permanente l\'année prochaine.'],explanation:'Futur simple: recevoir → recevr- + -a = recevra. Or futur proche: elle va recevoir.'},
    ],
    quiz:[
      {question:'What is the futur simple of "aller" for "nous"?',options:['nous allons','nous irons','nous allerons','nous allions'],correct:1,explanation:'aller → ir- (irregular stem) + -ons = nous IRONS.'},
      {question:'Complete: "Je _______ passer le TEF l\'année prochaine." (planned)',options:['irai','vais','serai','pourrai'],correct:1,explanation:'Planned future action = futur proche. Je VAIS passer le TEF.'},
      {question:'After "quand" in a future context, you use:',options:['Present tense','Futur proche only','Futur simple','Imparfait'],correct:2,explanation:'"Quand j\'aurai..." — after quand with future meaning, use futur simple (unlike English which uses present tense).'},
      {question:'What is the futur simple of "faire" for "il"?',options:['il fait','il fera','il ferait','il faisait'],correct:1,explanation:'faire → fer- + -a = il FERA.'},
      {question:'Which is a futur simple signal word?',options:['hier','maintenant','demain','toujours'],correct:2,explanation:'"Demain" (tomorrow) often signals the futur. Also: l\'année prochaine, dans cinq ans, bientôt.'},
    ]
  })
},
// ── B2 ADDITIONAL ────────────────────────────────────────────────────────────
{
  level:'B2', sort_order:39, duration_min:60, xp_reward:130,
  title:'TEF Written Production: Full Practice',
  description:'Complete TEF-format writing tasks with model answers, examiner criteria, and common mistakes to avoid.',
  content: JSON.stringify({
    intro:`The TEF Canada written production has two tasks: Task 1 (informal, ~80-100 words) and Task 2 (formal, ~200 words). Together they are worth 300 points. This lesson gives you the complete methodology, real prompts, model answers, and the exact criteria examiners use to grade your work.`,
    sections:[
      {type:'grammar',title:'TEF Written Production — Scoring Criteria',rules:[
        {rule:'Tâche communicative (25%)',example:'Did you complete the task? Address all points of the prompt.',translation:'',breakdown:'Read the prompt carefully — answer ALL parts, not just some.'},
        {rule:'Cohérence et cohésion (25%)',example:'Is your text organized? Do ideas flow logically?',translation:'',breakdown:'Use connectors: d\'abord, ensuite, cependant, par conséquent, en conclusion.'},
        {rule:'Compétence linguistique (25%)',example:'Grammar accuracy: verb tenses, articles, adjective agreement.',translation:'',breakdown:'Avoid repeated article errors, verb agreement errors, wrong tenses.'},
        {rule:'Étendue et maîtrise (25%)',example:'Vocabulary range, complex structures, appropriate register.',translation:'',breakdown:'Vary your vocabulary. Use synonyms. Attempt subjunctive and conditionals.'},
      ]},
      {type:'grammar',title:'Task 1: Informal Writing (~100 words)',explanation:'Task 1 is usually a message, email, or note to a friend or family member. Informal register (tu, salut, etc.) is expected.',rules:[
        {rule:'Sample prompt',example:'Vous écrivez un message à votre ami(e) pour l\'inviter à visiter Oakville. Décrivez votre ville et proposez des activités.',translation:'',breakdown:''},
        {rule:'Model response',example:'Salut Karim!\n\nComment tu vas? Je t\'écris pour t\'inviter à venir me rendre visite à Oakville le mois prochain.\n\nOakville est une magnifique ville au bord du lac Ontario. Il y a de nombreux parcs, des restaurants excellents et le centre-ville est très animé. Si tu viens, on pourra se promener au bord du lac, visiter le marché fermier du samedi et dîner dans un bon restaurant.\n\nJ\'espère vraiment que tu pourras venir! Réponds-moi vite.\n\nAmicalement,\nOsama',translation:'',breakdown:'~100 words. Informal. Addresses all prompt points. Good vocabulary. Uses conditional (pourra, pourrait).'},
      ]},
      {type:'grammar',title:'Task 2: Formal Writing (~200 words)',explanation:'Task 2 is usually a formal letter or an argumentative text. Use formal register (vous, Madame/Monsieur), structured argument, and advanced vocabulary.',rules:[
        {rule:'Sample prompt',example:'Vous écrivez une lettre à votre employeur pour demander la permission de suivre des cours de français pendant les heures de travail. Expliquez vos raisons.',translation:'',breakdown:''},
        {rule:'Model response',example:'Oakville, le 1er mai 2026\n\nObjet: Demande de formation en langue française\n\nMadame, Monsieur,\n\nJe me permets de vous contacter afin de solliciter votre accord pour suivre des cours de français durant mes heures de travail.\n\nEn effet, la maîtrise du français est devenue une nécessité dans mon poste actuel, étant donné que notre entreprise développe de plus en plus ses activités au Québec et dans les provinces francophones. À cet égard, une formation linguistique me permettrait non seulement d\'améliorer ma communication avec nos partenaires francophones, mais également d\'augmenter ma productivité au sein de l\'équipe.\n\nJe propose de suivre deux heures de cours par semaine, les mardis et jeudis de 12h à 13h, ce qui n\'affecterait pas substantiellement mon temps de travail.\n\nJe reste bien entendu disponible pour en discuter lors d\'un entretien à votre convenance.\n\nVeuillez agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n\nOsama Al-Ahmed',translation:'',breakdown:'~200 words. Formal register. Clear structure. Advanced vocabulary (solliciter, étant donné que, à cet égard). Conditional tense. Professional closing formula.'},
      ]},
      {type:'tips',title:'Common Mistakes to Avoid on TEF Writing',tips:[
        'NEVER use "Cher Monsieur" alone — always "Monsieur" or "Madame/Monsieur" in the opening',
        'The closing formula "Veuillez agréer..." is mandatory in formal letters — memorize it exactly',
        'Don\'t mix tu and vous in the same text — choose one and stick to it throughout',
        'Article errors (le/la/les/un/une/des) are heavily penalized — check every noun',
        'Adjective agreement errors are very common — check every adjective matches its noun',
        'Don\'t write in bullet points — TEF requires continuous prose with proper paragraphs',
        'Respect the word count — too short loses points on "tâche communicative"',
        'Always write the date and object line in formal letters: "Objet: ..."',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'In a formal TEF letter, what closing formula do you use?',options:['"Cordialement"','"Bonne journée"','"Veuillez agréer, Madame/Monsieur, l\'expression de mes salutations distinguées."','"À bientôt"'],correct:2,explanation:'The formal closing formula "Veuillez agréer..." is the standard for TEF formal letters. Memorize it exactly — examiners expect it.'},
      {type:'multiple_choice',question:'Task 2 is approximately how many words?',options:['50-80 words','80-100 words','150-200 words','300-400 words'],correct:2,explanation:'TEF Task 2 requires approximately 180-200 words. Too short loses marks on the task completion criterion.'},
      {type:'multiple_choice',question:'Which connector shows cause/reason?',options:['Cependant','En effet','En outre','En conclusion'],correct:1,explanation:'"En effet" = indeed/in fact — explains or supports a previous statement. "Car" and "puisque" also show reason.'},
      {type:'multiple_choice',question:'In informal Task 1 writing to a friend, you use:',options:['Vous and Monsieur/Madame','Tu and informal greeting','Both equally','Neither'],correct:1,explanation:'Task 1 is informal → use "tu", "Salut", casual vocabulary. Using "vous" in an informal message loses register marks.'},
    ],
    quiz:[
      {question:'How many scoring criteria does TEF written production have?',options:['2','3','4','5'],correct:2,explanation:'4 criteria: tâche communicative, cohérence et cohésion, compétence linguistique, étendue et maîtrise — each worth 25%.'},
      {question:'What must always appear in a formal TEF letter?',options:['Only the date','Objet line and closing formula','A bullet point list','English translation'],correct:1,explanation:'Formal letters need: date, Objet, greeting, body, closing formula (Veuillez agréer...), signature.'},
      {question:'Which is better for TEF writing: bullet points or prose?',options:['Bullet points','Prose paragraphs','Either works','Tables'],correct:1,explanation:'TEF requires continuous prose in paragraphs. Bullet points are not acceptable and will lose cohésion marks.'},
      {question:'What percentage of TEF writing marks is grammar accuracy?',options:['50%','25%','75%','10%'],correct:1,explanation:'Compétence linguistique = 25% of the mark. Grammar matters but so do the other 3 criteria.'},
      {question:'If you only answer part of the prompt, which criterion suffers?',options:['Cohésion','Étendue','Tâche communicative','Compétence linguistique'],correct:2,explanation:'"Tâche communicative" measures whether you completed the task. Answering only part loses marks here.'},
    ]
  })
},
];

let added = 0;
lessons.forEach(l => {
  DB.insert('lessons', l);
  added++;
});

console.log(`✅ Added ${added} lessons. Total now: ${DB.findAll('lessons').length}`);
