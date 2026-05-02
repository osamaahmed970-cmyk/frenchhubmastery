// server/db/add_content.js
// ONE-TIME: Adds all missing lessons, reading, writing, speaking, listening, vocab, drills
// Run: node server/db/add_content.js

const DB = require('./database');

console.log('🇫🇷 Building complete French Mastery Hub content...');
console.log(`Starting with ${DB.findAll('lessons').length} lessons`);

// ═══════════════════════════════════════════════════════════════════════════
// MISSING LESSONS (B1 + B2 completion)
// ═══════════════════════════════════════════════════════════════════════════

const newLessons = [
{
  level:'B1', sort_order:34, duration_min:35, xp_reward:80,
  title:'Relative Clauses: qui, que, où, dont',
  description:'Connect ideas elegantly using relative clauses — a key B1 grammar structure.',
  content: JSON.stringify({
    intro:`Relative clauses allow you to give more information about a noun without starting a new sentence. They are essential for B1+ French and heavily used in TEF written production. The four main relative pronouns are qui, que, où, and dont — each with a specific grammatical function.`,
    sections:[
      {type:'grammar',title:'QUI — subject of the clause',rules:[
        {rule:'Qui = who / that / which (subject)',example:'La personne qui parle français est mon collègue.',translation:'The person who speaks French is my colleague.',breakdown:'"Qui" replaces the subject of the relative clause. It can refer to people or things.'},
        {rule:'More examples',example:'Le formulaire qui est sur la table. / L\'agent qui m\'a aidé.',translation:'The form that is on the table. / The officer who helped me.',breakdown:'Qui is always followed directly by a verb.'},
      ]},
      {type:'grammar',title:'QUE — direct object of the clause',rules:[
        {rule:'Que = whom / that / which (object)',example:'Le formulaire que j\'ai rempli. / La ville que j\'aime.',translation:'The form that I filled in. / The city that I love.',breakdown:'"Que" replaces the direct object. It is followed by a subject + verb.'},
        {rule:'Elision before vowel',example:'L\'agent qu\'elle a rencontré.',translation:'The officer whom she met.',breakdown:'"Que" → "qu\'" before a vowel.'},
        {rule:'Agreement in passé composé',example:'Les documents qu\'il a envoyés.',translation:'The documents that he sent.',breakdown:'When "que" precedes avoir in passé composé, the past participle agrees with "que" (= the noun it refers to).'},
      ]},
      {type:'grammar',title:'OÙ — place or time',rules:[
        {rule:'Où = where / when (place/time)',example:'La ville où j\'habite s\'appelle Oakville.',translation:'The city where I live is called Oakville.',breakdown:'"Où" refers to a place. Very common and easy to use.'},
        {rule:'With time',example:'Le jour où j\'ai reçu ma résidence permanente était inoubliable.',translation:'The day when I received my permanent residency was unforgettable.',breakdown:'"Où" can also refer to a moment in time.'},
      ]},
      {type:'grammar',title:'DONT — of which / whose / about which',rules:[
        {rule:'Dont replaces de + noun',example:'Le livre dont j\'ai besoin. (= J\'ai besoin DE ce livre)',translation:'The book that I need.',breakdown:'"Dont" = de + relative pronoun. Used when the verb takes "de": avoir besoin de, parler de, se souvenir de.'},
        {rule:'Whose',example:'La femme dont le mari est médecin.',translation:'The woman whose husband is a doctor.',breakdown:'"Dont" also expresses possession: whose.'},
        {rule:'Common verbs with dont',example:'parler de, avoir besoin de, se souvenir de, être fier de, avoir peur de',translation:'to talk about, to need, to remember, to be proud of, to be afraid of',breakdown:'If the verb uses "de", use "dont" in relative clauses.'},
      ]},
      {type:'dialogue',title:'Dialogue — Using Relative Clauses Naturally',lines:[
        {speaker:'Collègue',fr:'Tu as trouvé l\'appartement dont tu avais besoin?',en:'Did you find the apartment that you needed?'},
        {speaker:'Vous',fr:'Oui! C\'est un appartement qui est près du lac, dans un quartier où tout le monde est sympa.',en:'Yes! It\'s an apartment that is near the lake, in a neighbourhood where everyone is friendly.'},
        {speaker:'Collègue',fr:'Et le propriétaire que tu avais contacté?',en:'And the landlord that you had contacted?'},
        {speaker:'Vous',fr:'C\'est quelqu\'un dont la famille habite à Oakville depuis 30 ans.',en:'He\'s someone whose family has lived in Oakville for 30 years.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"The officer _______ helped me was very kind."',options:['que','qui','où','dont'],correct:1,explanation:'"Qui" = subject of relative clause. The officer (subject) helped me → qui.'},
      {type:'multiple_choice',question:'"The form _______ I filled in was long."',options:['qui','que','où','dont'],correct:1,explanation:'"Que" = direct object. I filled in THE FORM (object) → que.'},
      {type:'multiple_choice',question:'"The city _______ I live is beautiful."',options:['qui','que','dont','où'],correct:3,explanation:'"Où" = place. The city WHERE I live → où.'},
      {type:'multiple_choice',question:'"The document _______ I need is missing."',options:['qui','que','où','dont'],correct:3,explanation:'"Avoir besoin de" → dont. The document THAT I NEED (avoir besoin DE) → dont.'},
      {type:'translate',question:'Translate: "Oakville is a city where life is pleasant."',answer:'Oakville est une ville où la vie est agréable.',alternatives:['Oakville est une ville où il fait bon vivre.'],explanation:'"Où" for place. "La vie est agréable" = life is pleasant.'},
    ],
    quiz:[
      {question:'Which relative pronoun is always followed by a verb?',options:['que','qui','dont','où'],correct:1,explanation:'"Qui" (subject) is always directly followed by a verb: la personne qui PARLE.'},
      {question:'Complete: "C\'est le film _______ je t\'ai parlé."',options:['qui','que','dont','où'],correct:2,explanation:'"Parler de" → dont. C\'est le film DONT je t\'ai parlé.'},
      {question:'Complete: "La lettre _______ j\'ai reçue vient d\'IRCC."',options:['qui','que','dont','où'],correct:1,explanation:'"Que" = direct object (j\'ai reçu LA LETTRE). Note agreement: reçuE (feminine).'},
      {question:'Complete: "Le jour _______ je suis arrivé au Canada était en janvier."',options:['qui','que','dont','où'],correct:3,explanation:'"Où" for time reference. Le jour OÙ je suis arrivé.'},
      {question:'"The person whose passport is missing" — La personne _______ le passeport est perdu.',options:['qui','que','dont','où'],correct:2,explanation:'"Dont" expresses possession (whose). La personne DONT le passeport est perdu.'},
    ]
  })
},
{
  level:'B1', sort_order:35, duration_min:35, xp_reward:80,
  title:'Reflexive Verbs',
  description:'Master verbs that use se — essential for daily routines, feelings, and natural conversation.',
  content: JSON.stringify({
    intro:`Reflexive verbs (verbes pronominaux) use a reflexive pronoun (me, te, se, nous, vous, se) to show that the subject performs the action on itself. They are extremely common in French — daily routines, feelings, and many expressions use them. They always use ÊTRE in the passé composé.`,
    sections:[
      {type:'grammar',title:'Reflexive Pronouns',rules:[
        {rule:'je → me (m\')',example:'Je me lève à 7h.',translation:'I get up at 7.',breakdown:''},
        {rule:'tu → te (t\')',example:'Tu te couches tard?',translation:'Do you go to bed late?',breakdown:''},
        {rule:'il/elle/on → se (s\')',example:'Il se rase. / Elle s\'habille.',translation:'He shaves. / She gets dressed.',breakdown:''},
        {rule:'nous → nous',example:'Nous nous réveillons tôt.',translation:'We wake up early.',breakdown:''},
        {rule:'vous → vous',example:'Vous vous appelez comment?',translation:'What is your name?',breakdown:''},
        {rule:'ils/elles → se (s\')',example:'Ils se parlent en français.',translation:'They speak to each other in French.',breakdown:''},
      ]},
      {type:'vocabulary',title:'Essential Reflexive Verbs',items:[
        {fr:'se lever',en:'to get up',pron:'suh luh-VAY',note:'Je me lève à 6h30 pour prendre le GO Train.'},
        {fr:'se coucher',en:'to go to bed',pron:'suh koo-SHAY',note:'Je me couche à 23h après le cours de français.'},
        {fr:'se réveiller',en:'to wake up',pron:'suh ray-vay-YAY',note:'Je me réveille sans alarme le weekend.'},
        {fr:'se doucher',en:'to shower',pron:'suh doo-SHAY',note:'Je me douche le matin.'},
        {fr:'s\'habiller',en:'to get dressed',pron:'sa-bee-YAY',note:'Je m\'habille en cinq minutes.'},
        {fr:'se brosser les dents',en:'to brush teeth',pron:'',note:'Je me brosse les dents deux fois par jour.'},
        {fr:'se rappeler / se souvenir',en:'to remember',pron:'',note:'Je me souviens de mon premier jour au Canada.'},
        {fr:'se sentir',en:'to feel',pron:'suh son-TEER',note:'Je me sens bien aujourd\'hui.'},
        {fr:'s\'appeler',en:'to be called',pron:'sa-play',note:'Je m\'appelle Osama.'},
        {fr:'se trouver',en:'to be located',pron:'',note:'Oakville se trouve à l\'ouest de Toronto.'},
        {fr:'s\'intéresser à',en:'to be interested in',pron:'',note:'Je m\'intéresse au français depuis deux ans.'},
        {fr:'se débrouiller',en:'to manage / get by',pron:'suh day-broo-YAY',note:'Je me débrouille bien en français maintenant!'},
      ]},
      {type:'grammar',title:'Reflexive Verbs in Passé Composé',rules:[
        {rule:'Always use ÊTRE',example:'Je me suis levé(e) à 7h. / Elle s\'est couchée tard.',translation:'I got up at 7. / She went to bed late.',breakdown:'Reflexive verbs ALWAYS use être as auxiliary.'},
        {rule:'Agreement with subject',example:'Il s\'est levé. / Elle s\'est levée. / Ils se sont levés. / Elles se sont levées.',translation:'He got up. / She got up. / They got up.',breakdown:'Past participle agrees with the subject (like other être verbs).'},
        {rule:'Negation',example:'Je ne me suis pas levé tôt ce matin.',translation:'I didn\'t get up early this morning.',breakdown:'ne comes before the reflexive pronoun: je NE me suis PAS levé.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Complete: "Je _______ lève à six heures."',options:['me','te','se','nous'],correct:0,explanation:'Je → me. Je ME lève.'},
      {type:'multiple_choice',question:'"She got dressed" in passé composé:',options:['Elle a habillé','Elle s\'a habillée','Elle s\'est habillée','Elle est habillée'],correct:2,explanation:'Reflexive → être. Elle S\'EST habillée. Agreement: habillÉE (feminine).'},
      {type:'multiple_choice',question:'"We wake up early" in French:',options:['Nous réveillons tôt','Nous nous réveillons tôt','Nous se réveillons tôt','On se réveille tôt'],correct:1,explanation:'Nous → nous. Nous NOUS réveillons tôt. (Note: "On se réveille tôt" also correct for spoken French)'},
      {type:'multiple_choice',question:'"I didn\'t go to bed late" in French:',options:['Je me suis couché pas tard','Je ne suis pas couché tard','Je ne me suis pas couché tard','Je me suis pas couché tard'],correct:2,explanation:'Je NE ME SUIS PAS couché tard. ne wraps the auxiliary: ne + me suis + pas.'},
    ],
    quiz:[
      {question:'Reflexive verbs always use _______ in passé composé.',options:['avoir','être','aller','faire'],correct:1,explanation:'ALL reflexive verbs use ÊTRE: je me suis levé, elle s\'est habillée, etc.'},
      {question:'Complete: "Il _______ appelle Mohammed."',options:['me','te','se','nous'],correct:2,explanation:'Il → se. Il SE rappelle.'},
      {question:'"They (f) went to bed" in passé composé:',options:['Elles se sont couchées','Elles ont couchées','Elles se sont couché','Elles sont couchées'],correct:0,explanation:'Elles se sont couchÉES — être auxiliary + feminine plural agreement (-ées).'},
      {question:'"Oakville is located west of Toronto" — Oakville _______ à l\'ouest de Toronto.',options:['se trouve','se trouver','est trouvé','trouve'],correct:0,explanation:'"Se trouver" = to be located. Oakville SE TROUVE à l\'ouest de Toronto.'},
      {question:'What does "se débrouiller" mean?',options:['To get lost','To manage / get by','To ask for help','To complain'],correct:1,explanation:'"Se débrouiller" = to manage, to get by. "Je me débrouille bien en français!"'},
    ]
  })
},
{
  level:'B1', sort_order:36, duration_min:35, xp_reward:80,
  title:'Comparatives & Superlatives',
  description:'Compare people, places, and things — essential for TEF descriptions and opinions.',
  content: JSON.stringify({
    intro:`Comparatives and superlatives are used constantly in real conversation and in TEF oral/written tasks. You need to compare cities, options, advantages, and people. These structures are straightforward in French once you know the patterns.`,
    sections:[
      {type:'grammar',title:'Comparatives',rules:[
        {rule:'More than: plus + adjective + que',example:'Le Canada est plus grand que la France.',translation:'Canada is bigger than France.',breakdown:'plus + adjective + que + comparison'},
        {rule:'Less than: moins + adjective + que',example:'L\'hiver est moins froid à Oakville qu\'à Ottawa.',translation:'Winter is less cold in Oakville than in Ottawa.',breakdown:'moins + adjective + que'},
        {rule:'As...as: aussi + adjective + que',example:'Mon français est aussi bon que mon anglais maintenant.',translation:'My French is as good as my English now.',breakdown:'aussi + adjective + que'},
        {rule:'Comparing nouns: plus de / moins de / autant de',example:'Il y a plus de francophones à Montréal qu\'à Toronto.',translation:'There are more French speakers in Montreal than in Toronto.',breakdown:'plus de / moins de / autant de + noun'},
        {rule:'Comparing verbs: plus / moins / autant',example:'Je travaille plus qu\'avant. / Il étudie autant que moi.',translation:'I work more than before. / He studies as much as me.',breakdown:'verb + plus/moins/autant + que'},
        {rule:'IRREGULAR: bon → meilleur',example:'Mon français est meilleur qu\'il y a un an.',translation:'My French is better than a year ago.',breakdown:'"Meilleur" = better (comparative of bon). Never "plus bon".'},
        {rule:'IRREGULAR: bien → mieux',example:'Je parle mieux qu\'avant.',translation:'I speak better than before.',breakdown:'"Mieux" = better (comparative of bien — adverb). Never "plus bien".'},
      ]},
      {type:'grammar',title:'Superlatives',rules:[
        {rule:'The most: le/la/les plus + adjective',example:'C\'est la plus belle ville du Canada.',translation:'It\'s the most beautiful city in Canada.',breakdown:'Article agrees with noun. "Du/de la/des" after superlative.'},
        {rule:'The least: le/la/les moins + adjective',example:'C\'est le moins cher des appartements.',translation:'It\'s the least expensive of the apartments.',breakdown:''},
        {rule:'IRREGULAR: bon → le meilleur',example:'C\'est le meilleur restaurant d\'Oakville.',translation:'It\'s the best restaurant in Oakville.',breakdown:'"Le meilleur" = the best. Never "le plus bon".'},
        {rule:'IRREGULAR: bien → le mieux',example:'C\'est lui qui parle le mieux français.',translation:'He\'s the one who speaks French the best.',breakdown:'"Le mieux" = the best (adverb).'},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'Never say "plus bon" — always "meilleur" (better) and "le meilleur" (the best)',
        'Never say "plus bien" — always "mieux" (better adverb) and "le mieux" (the best adverb)',
        'Comparatives are essential for TEF oral Task 2 (giving opinions): "Cette option est meilleure parce que..."',
        'In essays, use: "D\'une part... D\'autre part..." then compare with plus/moins/autant',
        'After superlative, use "de" not "dans": la plus grande ville DU Canada (not dans le Canada)',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"Canada is bigger than France" in French:',options:['Le Canada est plus grand que la France','Le Canada est plus grande que la France','Le Canada est meilleur grand que la France','Le Canada est très grand que la France'],correct:0,explanation:'"Plus + adjective + que". Grand (masculine) → grand (no change). Plus GRAND que.'},
      {type:'multiple_choice',question:'"My French is better than before" — Mon français est _______ qu\'avant.',options:['plus bon','meilleur','mieux','le meilleur'],correct:1,explanation:'"Meilleur" = better (comparative of BON adjective). Never "plus bon".'},
      {type:'multiple_choice',question:'"I speak better than before" — Je parle _______ qu\'avant.',options:['meilleur','plus bien','mieux','le mieux'],correct:2,explanation:'"Mieux" = better (comparative of BIEN adverb). Never "plus bien".'},
      {type:'multiple_choice',question:'"It\'s the best restaurant in Oakville" — C\'est _______ restaurant d\'Oakville.',options:['le plus bon','le meilleur','le mieux','le plus meilleur'],correct:1,explanation:'"Le meilleur" = the best (superlative of bon). Never "le plus bon".'},
      {type:'multiple_choice',question:'"There are more parks in Oakville than in Burlington" — Il y a _______ parcs à Oakville qu\'à Burlington.',options:['plus de','plus des','plus que','autant de'],correct:0,explanation:'"Plus de" + noun for comparing quantities.'},
    ],
    quiz:[
      {question:'What is the comparative of "bon"?',options:['plus bon','meilleur','mieux','plus meilleur'],correct:1,explanation:'"Meilleur" = better (comparative of bon). Irregular!'},
      {question:'Complete: "C\'est _______ ville du Canada." (the most beautiful)',options:['la plus belle','le plus beau','la plus beau','les plus belles'],correct:0,explanation:'"La plus belle" — article agrees with "ville" (feminine singular).'},
      {question:'After a superlative, which preposition means "in"?',options:['dans','en','de','à'],correct:2,explanation:'"De" after superlative: la plus grande ville DU Canada (de + le = du).'},
      {question:'"He works as much as me" — Il travaille _______ moi.',options:['plus que','moins que','autant que','aussi que'],correct:2,explanation:'"Autant que" = as much as (for verbs and nouns).'},
      {question:'"Mieux" is the comparative of:',options:['bon (adjective)','beau','bien (adverb)','grand'],correct:2,explanation:'"Mieux" = better, comparative of "bien" (adverb). "Meilleur" = better, comparative of "bon" (adjective).'},
    ]
  })
},
{
  level:'B2', sort_order:42, duration_min:50, xp_reward:110,
  title:'Passive Voice & Nominalisation',
  description:'Advanced structures that distinguish B2 writing — used in formal letters, official documents, and TEF essays.',
  content: JSON.stringify({
    intro:`The passive voice and nominalisation are hallmarks of formal, sophisticated French writing. They are used extensively in news articles, official documents, and formal essays — exactly the type of texts you encounter in TEF/TCF reading and must produce in writing. Mastering these structures will significantly boost your written production score.`,
    sections:[
      {type:'grammar',title:'Passive Voice: être + past participle',rules:[
        {rule:'Formation',example:'être (conjugated) + past participle + par + agent',translation:'',breakdown:'The object of an active sentence becomes the subject of a passive sentence.'},
        {rule:'Active → Passive',example:'IRCC a traité ma demande. → Ma demande a été traitée par IRCC.',translation:'IRCC processed my application. → My application was processed by IRCC.',breakdown:'Past participle agrees with the new subject (demande = feminine → traitéE).'},
        {rule:'Present passive',example:'Le français est parlé par millions de Canadiens.',translation:'French is spoken by millions of Canadians.',breakdown:'être (present) + past participle.'},
        {rule:'Future passive',example:'Votre dossier sera examiné dans les deux semaines.',translation:'Your file will be examined within two weeks.',breakdown:'être (future) + past participle. Common in official IRCC communications.'},
        {rule:'When to omit "par"',example:'La décision a été prise. (no agent mentioned)',translation:'The decision was made.',breakdown:'If the agent is unknown or unimportant, omit "par + agent".'},
      ]},
      {type:'grammar',title:'Nominalisation — Turning Verbs into Nouns',explanation:'Nominalisation (turning verbs/adjectives into nouns) is a key feature of formal French writing. It makes your writing more concise and sophisticated.',rules:[
        {rule:'verb → noun pattern',example:'décider → la décision | immigrer → l\'immigration | intégrer → l\'intégration',translation:'to decide → the decision | to immigrate → immigration | to integrate → integration',breakdown:'Many verbs have corresponding nouns — learn them in pairs.'},
        {rule:'Instead of verb clause, use noun',example:'INFORMAL: Parce qu\'il a immigré... → FORMAL: En raison de son immigration...',translation:'Because he immigrated → Due to his immigration',breakdown:'Nominalisation sounds more formal and concise.'},
        {rule:'Common nominalisations',example:'augmenter → l\'augmentation | améliorer → l\'amélioration | développer → le développement',translation:'to increase → the increase | to improve → improvement | to develop → development',breakdown:''},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'Passive voice appears frequently in TEF reading passages — recognise: "est/sont + past participle"',
        'Using passive in your TEF essays shows sophisticated register: "Il a été décidé que..." instead of "On a décidé que..."',
        'Nominalisation is the #1 marker of formal French — "l\'augmentation du chômage" vs "le chômage augmente"',
        'In TEF Task 2 (formal letter), use at least 2-3 nominalisations for higher marks',
        'Watch agreement: passive past participle always agrees with the subject',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Change to passive: "IRCC a accepté ma demande."',options:['Ma demande a été acceptée par IRCC.','Ma demande est acceptée par IRCC.','IRCC a été accepté ma demande.','Ma demande était acceptée par IRCC.'],correct:0,explanation:'Passé composé passive: a été + past participle. "Demande" (feminine) → acceptÉE.'},
      {type:'multiple_choice',question:'"Your file will be examined" in French:',options:['Votre dossier est examiné','Votre dossier a été examiné','Votre dossier sera examiné','Votre dossier serait examiné'],correct:2,explanation:'Future passive: sera (futur of être) + examiné. Common in official correspondence.'},
      {type:'multiple_choice',question:'Which is a nominalisation of "améliorer"?',options:['améliorement','l\'amélioration','l\'améliorisation','amélioré'],correct:1,explanation:'"L\'amélioration" = improvement (noun). Améliorer (to improve) → l\'amélioration.'},
      {type:'multiple_choice',question:'Formal version of "parce qu\'il a décidé de partir":',options:['En raison de sa décision de partir','Parce que sa décision est partir','À cause qu\'il décide de partir','Du fait de partir'],correct:0,explanation:'"En raison de sa décision de partir" — nominalisation of "décider" → "la décision".'},
    ],
    quiz:[
      {question:'Passive voice uses which verb as auxiliary?',options:['avoir','faire','être','aller'],correct:2,explanation:'Passive = être + past participle. Always être, never avoir.'},
      {question:'Complete: "Les documents _______ envoyés la semaine prochaine." (will be sent)',options:['sont','seront','ont été','étaient'],correct:1,explanation:'"Seront" = futur of être. Les documents SERONT envoyés (future passive).'},
      {question:'What is the nominalisation of "intégrer"?',options:['intégrement','intégration','intégrité','intégré'],correct:1,explanation:'"L\'intégration" = integration. Intégrer → l\'intégration.'},
      {question:'In passive voice, the past participle agrees with:',options:['The agent (par...)','The subject of the passive sentence','The auxiliary être','Nothing — no agreement'],correct:1,explanation:'Past participle agrees with the subject of the passive sentence: La demande a été acceptÉE.'},
      {question:'"It was decided that..." (passive, formal) in French:',options:['On a décidé que...','Il a été décidé que...','Ils ont décidé que...','La décision que...'],correct:1,explanation:'"Il a été décidé que..." — impersonal passive. Very formal, common in official documents.'},
    ]
  })
},
{
  level:'B2', sort_order:43, duration_min:55, xp_reward:120,
  title:'Formal Letter Writing: Complete Guide',
  description:'Master the complete format of French formal letters — essential for TEF Task 2 and professional life in Canada.',
  content: JSON.stringify({
    intro:`Formal letter writing (la lettre formelle) is tested directly in TEF Canada Task 2. A properly formatted letter with correct register, structure, and closing formula can earn maximum marks. This lesson gives you the complete formula used by native French speakers in professional and official contexts.`,
    sections:[
      {type:'grammar',title:'Complete Letter Format',rules:[
        {rule:'1. Your location and date (top right)',example:'Oakville, le 1er mai 2026',translation:'',breakdown:'City + le + date. Month in lowercase. Use "1er" for the 1st, numbers for others.'},
        {rule:'2. Recipient (top left)',example:'Monsieur le Directeur / Madame la Responsable / À qui de droit',translation:'',breakdown:'"À qui de droit" = To whom it may concern. Use when you don\'t know the specific person.'},
        {rule:'3. Object line',example:'Objet: Demande de rendez-vous / Candidature au poste de...',translation:'Subject: Request for appointment / Application for the position of...',breakdown:'"Objet:" is mandatory in French formal letters. Underline or bold it.'},
        {rule:'4. Opening salutation',example:'Madame, / Monsieur, / Madame, Monsieur,',translation:'',breakdown:'Never "Cher Monsieur" in formal business letters. Just "Monsieur," or "Madame,". Add a comma after.'},
        {rule:'5. Opening sentence',example:'Je me permets de vous contacter afin de... / J\'ai l\'honneur de vous soumettre...',translation:'I take the liberty of contacting you in order to... / I have the honour of submitting...',breakdown:'Formal openings — never start with "Je veux vous écrire pour..."'},
        {rule:'6. Body paragraphs',example:'En effet... / À cet égard... / C\'est pourquoi... / Par conséquent...',translation:'',breakdown:'Use connectors. 2-3 body paragraphs. Formal vocabulary throughout.'},
        {rule:'7. Closing sentence',example:'Je reste à votre disposition pour tout renseignement complémentaire. / Dans l\'attente de votre réponse...',translation:'I remain at your disposal for any further information. / Awaiting your reply...',breakdown:''},
        {rule:'8. Closing formula (mandatory)',example:'Veuillez agréer, Madame/Monsieur, l\'expression de mes salutations distinguées.',translation:'Please accept, Madam/Sir, the expression of my distinguished greetings.',breakdown:'This exact formula is expected in formal French letters. Memorize it word for word.'},
        {rule:'9. Signature',example:'[Prénom Nom] / Osama Al-Ahmed',translation:'',breakdown:''},
      ]},
      {type:'grammar',title:'Model Letter: Job Application',rules:[
        {rule:'Full model',example:`Oakville, le 15 mai 2026

Monsieur le Directeur des Ressources Humaines
Entreprise Bilingue Canada Inc.
123, rue Bay
Toronto (Ontario) M5H 1S3

Objet: Candidature au poste de Responsable Marketing

Monsieur,

J'ai l'honneur de vous soumettre ma candidature pour le poste de Responsable Marketing, tel qu'annoncé sur votre site web le 10 mai 2026.

Fort d'une expérience de cinq ans en marketing numérique et d'une maîtrise du français et de l'anglais, je suis convaincu de pouvoir apporter une contribution significative à votre équipe. En effet, j'ai géré avec succès plusieurs campagnes bilingues pour des entreprises canadiennes, ce qui m'a permis de développer une solide compréhension du marché québécois et franco-ontarien.

Je serais honoré de vous rencontrer afin de vous exposer plus en détail mes compétences et ma motivation. Je reste à votre entière disposition pour un entretien à votre convenance.

Veuillez agréer, Monsieur, l'expression de mes salutations distinguées.

Osama Al-Ahmed`,translation:'',breakdown:'This is a complete, exam-ready formal letter. Study every element.'},
      ]},
      {type:'tips',title:'TEF/TCF Common Mistakes to Avoid',tips:[
        'NEVER start with "Cher Monsieur" — use just "Monsieur," (with comma)',
        'NEVER use "tu" — always "vous" throughout',
        'NEVER forget the Objet line — it\'s mandatory',
        'NEVER use bullet points — continuous formal prose only',
        'NEVER end with "Cordialement" in a very formal letter — use the full closing formula',
        '"Cordialement" and "Bien cordialement" are acceptable for semi-formal emails but not TEF formal letters',
        'The closing formula must MATCH the opening: "Madame" in opening → "Madame" in closing (not "Monsieur")',
        'TEF Task 2 is 200 words minimum — count carefully',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Which opening is correct for a French formal letter?',options:['Cher Monsieur Dupont,','Monsieur,','Bonjour Monsieur,','À Monsieur Dupont,'],correct:1,explanation:'"Monsieur," — just the title with a comma. Never "Cher" in formal business letters.'},
      {type:'multiple_choice',question:'What is the "Objet" line?',options:['The closing formula','The date','The subject line','The recipient\'s address'],correct:2,explanation:'"Objet:" = subject line. Mandatory in French formal letters. Written after the recipient\'s address.'},
      {type:'multiple_choice',question:'Which closing formula is correct for TEF?',options:['"Cordialement"','"À bientôt"','"Veuillez agréer, Madame, l\'expression de mes salutations distinguées."','"Merci de votre attention"'],correct:2,explanation:'The full formal closing formula is expected on TEF. Memorize it exactly.'},
      {type:'multiple_choice',question:'The date in a French formal letter is written:',options:['May 15, 2026','15/05/26','Oakville, le 15 mai 2026','15 mai 2026'],correct:2,explanation:'"Oakville, le 15 mai 2026" — city + le + day + month (lowercase) + year.'},
    ],
    quiz:[
      {question:'In TEF Task 2, approximately how many words minimum?',options:['100','150','180-200','300'],correct:2,explanation:'TEF Task 2 requires 180-200 words minimum. Too short loses marks.'},
      {question:'Which is the correct register for TEF formal letter?',options:['Tu throughout','Vous throughout','Mix of tu and vous','Either is fine'],correct:1,explanation:'Always "vous" in formal letters. Never mix.'},
      {question:'What comes immediately after the date in a French letter?',options:['The opening salutation','The object line','The recipient\'s address','The body'],correct:2,explanation:'Layout: date → recipient\'s address → Objet line → salutation → body → closing.'},
      {question:'"Je reste à votre disposition" means:',options:['I am leaving','I remain at your disposal','I have a question','I am writing to you'],correct:1,explanation:'"Rester à la disposition de quelqu\'un" = to remain available to someone. Standard formal closing sentence.'},
      {question:'After "Monsieur," in the opening, the closing must say:',options:['"Madame"','"Monsieur"','Match the opening exactly','Either is fine'],correct:2,explanation:'The closing formula must mirror the opening exactly: "Monsieur," → "Veuillez agréer, MONSIEUR, l\'expression..."'},
    ]
  })
},
];

let lessonsAdded = 0;
newLessons.forEach(l => { DB.insert('lessons', l); lessonsAdded++; });
console.log(`✅ Added ${lessonsAdded} lessons. Total: ${DB.findAll('lessons').length}`);

// ═══════════════════════════════════════════════════════════════════════════
// READING PASSAGES (10 per level = 40 total)
// ═══════════════════════════════════════════════════════════════════════════

// Check if reading table exists, add to vocab_cards with type='reading' as workaround
// Store in a new collection approach using the existing DB
const readings = [
// A1 Readings
{level:'A1',title:'Bonjour à Oakville',text:'Bonjour! Je m\'appelle Sophie. J\'habite à Oakville, en Ontario. C\'est une belle ville près du lac Ontario. Dans ma rue, il y a une épicerie, un café et un parc. J\'aime beaucoup mon quartier. Le matin, je vais au café. L\'après-midi, je vais au parc avec mon chien. Le soir, je regarde la télévision. C\'est ma journée typique à Oakville.',questions:[{q:'Où habite Sophie?',options:['À Toronto','À Oakville','À Ottawa','À Montréal'],correct:0,note:'À Oakville, en Ontario'},
{q:'Qu\'est-ce qu\'il y a dans sa rue?',options:['Une école','Une épicerie, un café et un parc','Un hôpital','Un supermarché'],correct:1,note:'une épicerie, un café et un parc'},
{q:'Qu\'est-ce qu\'elle fait le matin?',options:['Elle va au parc','Elle va au café','Elle regarde la télé','Elle travaille'],correct:1,note:'Le matin, elle va au café'},
{q:'Avec qui va-t-elle au parc?',options:['Avec ses enfants','Avec son mari','Avec son chien','Seule'],correct:2,note:'avec mon chien'},
{q:'Qu\'est-ce qu\'elle fait le soir?',options:['Elle va au café','Elle va au parc','Elle regarde la télévision','Elle étudie'],correct:2,note:'le soir, je regarde la télévision'}]},

{level:'A1',title:'Ma Famille',text:'Je m\'appelle Osama. J\'ai une femme et deux enfants. Ma femme s\'appelle Fatima. Elle est médecin. Mon fils s\'appelle Youssef. Il a sept ans. Ma fille s\'appelle Nour. Elle a cinq ans. Nous habitons dans une maison à Oakville. Nous aimons le Canada. C\'est un beau pays.',questions:[{q:'Combien d\'enfants a Osama?',options:['Un','Deux','Trois','Quatre'],correct:1,note:'J\'ai deux enfants'},{q:'Quelle est la profession de Fatima?',options:['Professeure','Avocate','Médecin','Infirmière'],correct:2,note:'Elle est médecin'},{q:'Quel âge a Youssef?',options:['5 ans','6 ans','7 ans','8 ans'],correct:2,note:'Il a sept ans'},{q:'Comment s\'appelle la fille d\'Osama?',options:['Fatima','Sophie','Nour','Marie'],correct:2,note:'Ma fille s\'appelle Nour'},{q:'Où habitent-ils?',options:['Dans un appartement à Toronto','Dans une maison à Oakville','Dans un condo à Mississauga','À Ottawa'],correct:1,note:'une maison à Oakville'}]},

{level:'A1',title:'Au Tim Hortons',text:'Le matin, je vais au Tim Hortons près de chez moi. Je commande un café et un muffin. Le café coûte deux dollars cinquante. Le muffin coûte deux dollars. En total, je paie quatre dollars cinquante. Je paye par carte. La caissière est très sympa. Elle parle anglais et un peu français. Je dis "Merci, bonne journée!" Elle répond "De rien, à bientôt!"',questions:[{q:'Où va la personne le matin?',options:['Au café français','Au Tim Hortons','Au Starbucks','À l\'épicerie'],correct:1,note:'je vais au Tim Hortons'},{q:'Combien coûte le café?',options:['1,50$','2,00$','2,50$','3,00$'],correct:2,note:'deux dollars cinquante'},{q:'Quel est le total?',options:['3,50$','4,00$','4,50$','5,00$'],correct:2,note:'quatre dollars cinquante'},{q:'Comment paye-t-il?',options:['En espèces','Par chèque','Par carte','En ligne'],correct:2,note:'Je paye par carte'},{q:'Que dit la caissière à la fin?',options:['"Merci"','"Bonne journée"','"De rien, à bientôt"','"Au revoir"'],correct:2,note:'De rien, à bientôt'}]},

// A2 Readings
{level:'A2',title:'Une Journée Typique à Oakville',text:'Je m\'appelle Ahmed. Je travaille comme ingénieur à Burlington. Tous les matins, je me lève à six heures. Je prends une douche, je m\'habille et je prends le petit-déjeuner. À sept heures et quart, je prends le bus GO jusqu\'à Burlington. Le trajet dure vingt minutes. À midi, je mange à la cafétéria avec mes collègues. Après le travail, à dix-sept heures trente, je rentre à Oakville. Le soir, j\'étudie le français pendant une heure. C\'est important pour ma carrière et pour ma résidence permanente.',questions:[{q:'Quelle est la profession d\'Ahmed?',options:['Médecin','Ingénieur','Professeur','Avocat'],correct:1,note:'ingénieur à Burlington'},{q:'À quelle heure se lève-t-il?',options:['5h','6h','7h','8h'],correct:1,note:'à six heures'},{q:'Comment va-t-il à Burlington?',options:['En voiture','À pied','En bus GO','En train'],correct:2,note:'le bus GO jusqu\'à Burlington'},{q:'Combien de temps dure le trajet?',options:['10 minutes','20 minutes','30 minutes','45 minutes'],correct:1,note:'vingt minutes'},{q:'Pourquoi étudie-t-il le français?',options:['Pour le plaisir','Pour ses enfants','Pour sa carrière et sa résidence permanente','Pour voyager'],correct:2,note:'pour ma carrière et pour ma résidence permanente'}]},

{level:'A2',title:'La Météo en Ontario',text:'En Ontario, les quatre saisons sont très différentes. En hiver, il fait très froid. La température descend souvent à moins vingt degrés. Il neige beaucoup en janvier et février. Au printemps, il fait plus doux. Il pleut souvent en avril. En été, il fait chaud et ensoleillé. La température monte jusqu\'à trente degrés. L\'automne est ma saison préférée. Les arbres sont rouges, oranges et jaunes. Il fait frais mais agréable. Je préfère l\'automne à l\'hiver!',questions:[{q:'Quelle est la température en hiver?',options:['0 degrés','Moins 10 degrés','Moins 20 degrés','Plus 5 degrés'],correct:2,note:'moins vingt degrés'},{q:'Quand est-ce qu\'il neige beaucoup?',options:['En automne','En mars et avril','En janvier et février','En été'],correct:2,note:'janvier et février'},{q:'Quelle est la température en été?',options:['15 degrés','20 degrés','25 degrés','30 degrés'],correct:3,note:'trente degrés'},{q:'Quelle saison préfère l\'auteur?',options:['L\'hiver','Le printemps','L\'été','L\'automne'],correct:3,note:'L\'automne est ma saison préférée'},{q:'De quelle couleur sont les arbres en automne?',options:['Verts','Rouges, oranges et jaunes','Blancs','Bruns'],correct:1,note:'rouges, oranges et jaunes'}]},

// B1 Readings
{level:'B1',title:'L\'Immigration au Canada: Mon Parcours',text:'Lorsque j\'ai décidé d\'immigrer au Canada, je ne savais pas à quoi m\'attendre. J\'avais entendu dire que le Canada était un pays accueillant, mais la réalité de l\'immigration est bien plus complexe. Les démarches administratives auprès d\'IRCC ont pris plus d\'un an. Pendant cette période, j\'ai dû rassembler de nombreux documents: passeport valide, relevés de compte bancaire, diplômes traduits, et bien d\'autres. Cependant, l\'effort en valait la peine. Depuis mon arrivée à Oakville en 2023, je me suis bien intégré. J\'ai trouvé un emploi dans mon domaine et mes enfants vont à l\'école francophone. L\'apprentissage du français a été déterminant pour mon intégration.',questions:[{q:'Combien de temps ont pris les démarches avec IRCC?',options:['Quelques semaines','Quelques mois','Plus d\'un an','Deux ans'],correct:2,note:'plus d\'un an'},{q:'Lequel de ces documents n\'est PAS mentionné?',options:['Passeport','Relevés de compte','Diplômes traduits','Lettre de recommandation'],correct:3,note:'Non mentionné dans le texte'},{q:'Depuis quand est-il à Oakville?',options:['2021','2022','2023','2024'],correct:2,note:'depuis mon arrivée à Oakville en 2023'},{q:'Où vont ses enfants?',options:['À l\'école anglophone','À l\'école francophone','Ils n\'ont pas d\'école','À l\'université'],correct:1,note:'à l\'école francophone'},{q:'Qu\'est-ce qui a été "déterminant" pour son intégration?',options:['Trouver un emploi','L\'apprentissage du français','Ses enfants','Son passeport'],correct:1,note:'L\'apprentissage du français a été déterminant'}]},

{level:'B1',title:'Le Bilinguisme au Canada',text:'Le Canada est officiellement bilingue depuis l\'adoption de la Loi sur les langues officielles en 1969. Cette loi garantit aux Canadiens le droit de recevoir des services fédéraux dans la langue officielle de leur choix, que ce soit l\'anglais ou le français. En pratique, le bilinguisme varie considérablement d\'une province à l\'autre. Au Québec, le français domine largement. En Ontario, la situation est plus nuancée: environ 600 000 personnes parlent français comme langue maternelle, principalement dans l\'Est et le Nord de la province. Pour les immigrants qui cherchent à s\'établir au Canada, maîtriser le français constitue un avantage indéniable sur le marché du travail, en particulier pour accéder aux emplois dans la fonction publique fédérale.',questions:[{q:'En quelle année a été adoptée la Loi sur les langues officielles?',options:['1959','1969','1979','1989'],correct:1,note:'en 1969'},{q:'Combien de personnes parlent français en Ontario?',options:['100 000','300 000','600 000','1 million'],correct:2,note:'600 000 personnes'},{q:'Où se trouve la communauté francophone en Ontario?',options:['Ouest et Sud','Est et Nord','Centre et Ouest','Partout également'],correct:1,note:'principalement dans l\'Est et le Nord'},{q:'Quel avantage offre le français sur le marché du travail?',options:['Un salaire plus élevé','Accès aux emplois fédéraux','Des vacances supplémentaires','Un visa plus rapide'],correct:1,note:'accéder aux emplois dans la fonction publique fédérale'},{q:'Quelle province a le plus de francophones?',options:['Ontario','Colombie-Britannique','Québec','Alberta'],correct:2,note:'Au Québec, le français domine largement'}]},

// B2 Readings
{level:'B2',title:'Les Défis de l\'Intégration Linguistique',text:'L\'intégration linguistique des nouveaux arrivants au Canada soulève des questions complexes qui mettent en jeu des considérations économiques, sociales et identitaires. D\'un point de vue économique, il est établi que la maîtrise du français ou de l\'anglais constitue un facteur déterminant dans l\'accès à l\'emploi qualifié et dans la progression professionnelle. Des études menées par Statistique Canada démontrent que les immigrants maîtrisant l\'une des deux langues officielles gagnent en moyenne 20% de plus que ceux qui ne maîtrisent ni l\'une ni l\'autre. Néanmoins, l\'apprentissage d\'une nouvelle langue à l\'âge adulte représente un défi considérable, d\'autant plus que les cours de langue financés par l\'État sont souvent insuffisants pour atteindre un niveau de compétence professionnelle. Par conséquent, certains experts préconisent une refonte complète des politiques d\'intégration linguistique, notamment en augmentant le financement des programmes de formation linguistique en milieu de travail.',questions:[{q:'Selon Statistique Canada, de combien les immigrants maîtrisant une langue officielle gagnent-ils de plus?',options:['10%','15%','20%','25%'],correct:2,note:'20% de plus'},{q:'Quel problème est mentionné concernant les cours de langue financés par l\'État?',options:['Ils coûtent trop cher','Ils sont insuffisants pour atteindre un niveau professionnel','Ils ne sont pas disponibles','Ils sont trop faciles'],correct:1,note:'souvent insuffisants pour atteindre un niveau de compétence professionnelle'},{q:'Quelle solution proposent certains experts?',options:['Rendre le français obligatoire','Augmenter le financement des programmes de formation en milieu de travail','Exclure les immigrants sans compétences linguistiques','Réduire l\'immigration'],correct:1,note:'augmentant le financement des programmes de formation linguistique en milieu de travail'},{q:'Quelles considérations sont mentionnées dans ce texte?',options:['Économiques seulement','Économiques et sociales','Économiques, sociales et identitaires','Politiques et économiques'],correct:2,note:'économiques, sociales et identitaires'},{q:'Le mot "préconisent" dans le texte signifie:',options:['Critiquent','Recommandent','Interdisent','Étudient'],correct:1,note:'préconiser = to recommend/advocate'}]},

{level:'B2',title:'Le Marché du Travail Canadien et le Bilinguisme',text:'Dans un contexte de pénurie de main-d\'œuvre sans précédent, le Canada fait face à un paradoxe: d\'une part, de nombreux postes demeurent vacants dans des secteurs clés tels que la santé, l\'éducation et les technologies de l\'information; d\'autre part, bon nombre d\'immigrants qualifiés peinent à intégrer le marché du travail à la hauteur de leurs compétences. La non-reconnaissance des diplômes étrangers et les barrières linguistiques constituent les obstacles les plus fréquemment cités. À cet égard, les employeurs qui investissent dans la formation linguistique de leurs employés immigrants bénéficient non seulement d\'une main-d\'œuvre plus compétente, mais aussi d\'une fidélisation accrue du personnel. Force est de constater que le bilinguisme, loin d\'être un simple atout, est devenu une nécessité structurelle pour l\'économie canadienne du XXIe siècle.',questions:[{q:'Quel paradoxe est décrit dans ce texte?',options:['Le Canada a trop d\'employés','Des postes vacants coexistent avec des immigrants sans emploi qualifié','Le Canada refuse les immigrants','Le bilinguisme nuit à l\'économie'],correct:1,note:'postes demeurent vacants... immigrants qualifiés peinent à intégrer'},{q:'Quels sont les deux obstacles les plus fréquents?',options:['Le froid et la distance','Non-reconnaissance des diplômes et barrières linguistiques','Le coût de la vie et les taxes','Le manque de logements et de transport'],correct:1,note:'Non-reconnaissance des diplômes étrangers et les barrières linguistiques'},{q:'Que gagnent les employeurs qui investissent dans la formation linguistique?',options:['Des subventions gouvernementales','Une meilleure réputation','Main-d\'œuvre compétente et fidélisation du personnel','Des réductions fiscales'],correct:2,note:'main-d\'œuvre plus compétente... fidélisation accrue du personnel'},{q:'Que signifie "Force est de constater"?',options:['Il est impossible de voir','On doit reconnaître','On refuse d\'admettre','Il est difficile de comprendre'],correct:1,note:'"Force est de constater que..." = One must acknowledge that...'},{q:'Selon le texte, le bilinguisme est devenu:',options:['Un simple avantage','Une option intéressante','Une nécessité structurelle','Un problème économique'],correct:2,note:'une nécessité structurelle pour l\'économie canadienne'}]},
];

// Store readings as a special type in vocab_cards table with level prefix
// Actually let's create a proper structure by storing in the DB directly
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (!data.readings) data.readings = [];
if (!data.writing_prompts) data.writing_prompts = [];
if (!data.speaking_prompts) data.speaking_prompts = [];
if (!data.listening_tracks) data.listening_tracks = [];

readings.forEach(r => data.readings.push({ id: Date.now() + Math.random(), ...r }));

// ═══════════════════════════════════════════════════════════════════════════
// WRITING PROMPTS (10 per level)
// ═══════════════════════════════════════════════════════════════════════════

const writingPrompts = [
// A1
{level:'A1',prompt:'Présentez-vous en quelques phrases. Donnez votre nom, votre ville, votre profession et votre famille.',min_words:40,max_words:70,type:'description',model:'Je m\'appelle Osama Ahmed. J\'habite à Oakville, en Ontario. Je suis ingénieur en marketing. J\'ai une femme et deux enfants. Ma femme s\'appelle Fatima. Mon fils a sept ans et ma fille a cinq ans. J\'aime le Canada. C\'est un beau pays.'},
{level:'A1',prompt:'Décrivez votre maison ou appartement. Combien de pièces? Où est-il situé?',min_words:40,max_words:70,type:'description',model:'J\'habite dans une maison à Oakville. Ma maison a cinq pièces: un salon, une cuisine, trois chambres et deux salles de bain. Ma maison est dans un quartier tranquille, près du lac Ontario. J\'ai aussi un jardin. J\'aime beaucoup ma maison.'},
{level:'A1',prompt:'Qu\'est-ce que vous mangez au petit-déjeuner? Décrivez votre repas du matin.',min_words:35,max_words:65,type:'description',model:'Le matin, je mange du pain avec du beurre et de la confiture. Je bois un café et un jus d\'orange. Quelquefois, je mange des œufs. Mon petit-déjeuner préféré, c\'est des crêpes avec du sirop d\'érable, comme au Québec!'},
{level:'A1',prompt:'Décrivez votre quartier à Oakville. Qu\'est-ce qu\'il y a près de chez vous?',min_words:45,max_words:75,type:'description',model:'Mon quartier est très agréable. Il y a un supermarché Loblaws, un parc et une bibliothèque près de chez moi. Le lac Ontario est à dix minutes à pied. Il y a aussi un arrêt de bus GO. Mon quartier est calme et propre. J\'aime habiter ici.'},
{level:'A1',prompt:'Écrivez un message court à un ami pour lui donner votre nouvelle adresse au Canada.',min_words:35,max_words:60,type:'message',model:'Salut Karim! J\'ai une nouvelle adresse. J\'habite maintenant au 82, rue Lakeshore, Oakville, Ontario, L6J 1H8. C\'est une belle maison! Viens me rendre visite! À bientôt, Osama.'},
// A2
{level:'A2',prompt:'Décrivez votre journée typique au Canada. Utilisez des expressions de temps (d\'abord, ensuite, enfin).',min_words:70,max_words:110,type:'description',model:'Ma journée typique commence à six heures. D\'abord, je me lève et je prends une douche. Ensuite, je prends le petit-déjeuner avec ma famille. À sept heures et quart, je prends le bus GO pour aller à Burlington. Le trajet dure vingt minutes. À midi, je mange à la cafétéria. Après le travail, à dix-sept heures trente, je rentre à Oakville. Le soir, j\'aide mes enfants avec leurs devoirs et j\'étudie le français pendant une heure. Enfin, je me couche vers vingt-trois heures.'},
{level:'A2',prompt:'Écrivez un email à votre employeur pour expliquer que vous serez absent demain. Donnez une raison.',min_words:60,max_words:100,type:'email',model:'Bonjour Madame Johnson,\n\nJe vous écris pour vous informer que je ne pourrai pas venir au bureau demain, le mercredi 15 mai. En effet, j\'ai un rendez-vous médical important à la clinique d\'Oakville à dix heures du matin.\n\nJe travaillerai depuis chez moi l\'après-midi si cela est possible.\n\nJe suis désolé pour ce contretemps.\n\nCordialement,\nOsama Ahmed'},
{level:'A2',prompt:'Décrivez la météo typique à Oakville en hiver et en été. Quels vêtements portez-vous?',min_words:70,max_words:110,type:'description',model:'En hiver à Oakville, il fait très froid. La température descend souvent à moins quinze ou moins vingt degrés. Il neige beaucoup. Je porte un manteau chaud, des bottes, un chapeau et des gants. En été, c\'est complètement différent. Il fait chaud et ensoleillé. La température monte à trente degrés. Je porte des vêtements légers: un t-shirt, un short et des sandales. J\'aime l\'été mais l\'hiver est difficile!'},
{level:'A2',prompt:'Vous avez visité un restaurant français à Toronto. Écrivez un avis (positif ou négatif) pour un site web.',min_words:70,max_words:110,type:'review',model:'J\'ai visité le restaurant "La Belle Province" à Toronto la semaine dernière. C\'était excellent! Le service était très professionnel et le personnel parlait français. J\'ai commandé une soupe à l\'oignon et un steak frites. Les plats étaient délicieux. La soupe était chaude et savoureuse. Le steak était parfaitement cuit. Le prix était raisonnable: quarante dollars pour deux personnes avec du vin. Je recommande ce restaurant à tous les francophones de Toronto!'},
{level:'A2',prompt:'Écrivez un message à votre ami pour l\'inviter à faire une activité à Oakville ce weekend.',min_words:60,max_words:95,type:'message',model:'Salut Mohammed!\n\nComment tu vas? J\'ai une idée pour ce weekend. On pourrait aller au Festival du bord du lac samedi? Il y a des concerts, des stands de nourriture et des activités pour les enfants. C\'est gratuit et vraiment sympa!\n\nOn se retrouve à dix heures au parc du lac? Réponds-moi vite!\n\nÀ bientôt,\nOsama'},
// B1
{level:'B1',prompt:'Racontez votre premier jour au Canada. Utilisez le passé composé et l\'imparfait.',min_words:120,max_words:180,type:'narrative',model:'Je me souviens encore de mon premier jour au Canada comme si c\'était hier. C\'était un matin de janvier 2023. Il faisait un froid glacial — moins vingt degrés — et il neigeait abondamment.\n\nL\'avion a atterri à l\'aéroport Pearson à six heures du matin. J\'étais fatigué après un vol de dix heures, mais aussi très excité. J\'ai récupéré mes bagages et j\'ai passé la douane. L\'agent des frontières m\'a posé plusieurs questions en anglais et en français.\n\nEnsuite, j\'ai pris un taxi jusqu\'à Oakville. En regardant par la fenêtre, j\'étais impressionné par l\'immensité du pays et par la beauté des paysages enneigés.\n\nCe jour-là, j\'ai compris que ma nouvelle vie commençait vraiment.'},
{level:'B1',prompt:'Comparez la vie au Canada avec la vie dans votre pays d\'origine. Quels sont les avantages et les inconvénients?',min_words:130,max_words:190,type:'comparison',model:'Après deux ans au Canada, je peux comparer ma vie ici avec celle que j\'avais au Maroc.\n\nD\'un côté, le Canada offre de nombreux avantages. Le système de santé est accessible à tous, les écoles sont excellentes et les opportunités professionnelles sont nombreuses. De plus, le Canada est un pays sûr et stable.\n\nD\'un autre côté, la vie au Canada présente aussi des défis. L\'hiver est long et difficile pour quelqu\'un qui vient d\'un pays chaud. Le coût de la vie est également très élevé — le loyer à Oakville est beaucoup plus cher qu\'à Casablanca.\n\nCependant, je ne regrette pas ma décision. Le Canada m\'a donné des opportunités que je n\'aurais jamais eues ailleurs.'},
{level:'B1',prompt:'Écrivez une lettre à votre enfant qui commence l\'école française à Oakville pour l\'encourager.',min_words:120,max_words:175,type:'letter',model:'Mon cher Youssef,\n\nAujourd\'hui, tu commences ta nouvelle école francophone à Oakville. Je sais que tu es peut-être un peu nerveux, et c\'est tout à fait normal.\n\nJe voudrais te dire quelque chose d\'important: apprendre le français, c\'est un cadeau extraordinaire que tu te fais pour toute ta vie. Au Canada, parler français et anglais te donnera des opportunités incroyables.\n\nAu début, ce sera peut-être difficile. Tu ne comprendras pas tout. Mais ne t\'inquiète pas — tes camarades de classe et tes professeurs seront là pour t\'aider.\n\nJe suis très fier de toi. Tu es courageux et intelligent. Bonne chance, mon fils!\n\nTon papa qui t\'aime,\nOsama'},
// B2
{level:'B2',prompt:'L\'immigration est-elle bénéfique pour l\'économie canadienne? Rédigez un texte argumentatif (200 mots).',min_words:180,max_words:240,type:'argumentative',model:'L\'immigration constitue l\'un des piliers fondamentaux de l\'économie canadienne et son impact positif ne saurait être remis en question.\n\nPremièrement, les immigrants contribuent directement à combler la pénurie de main-d\'œuvre qui affecte de nombreux secteurs clés, notamment la santé, l\'ingénierie et les technologies de l\'information. Sans cette contribution, plusieurs industries canadiennes seraient incapables de maintenir leur niveau de productivité.\n\nDeuxièmement, les nouveaux arrivants stimulent la consommation et l\'entrepreneuriat. Des études de Statistique Canada démontrent que les immigrants créent davantage d\'entreprises que la moyenne de la population canadienne, générant ainsi des emplois pour tous.\n\nCependant, certains critiques soulignent que l\'intégration des immigrants qualifiés reste insuffisante, notamment en raison de la non-reconnaissance des diplômes étrangers. C\'est pourquoi il convient d\'améliorer les mécanismes d\'intégration plutôt que de remettre en question la politique d\'immigration elle-même.\n\nEn conclusion, bien que des défis subsistent, l\'immigration demeure un moteur essentiel de la croissance économique canadienne, à condition que des politiques d\'intégration efficaces l\'accompagnent.'},
{level:'B2',prompt:'Rédigez une lettre formelle à votre propriétaire pour signaler des problèmes dans votre appartement.',min_words:180,max_words:230,type:'formal_letter',model:'Oakville, le 1er mai 2026\n\nMonsieur le Propriétaire,\n\nObjet: Signalement de problèmes dans l\'appartement du 82, rue Lakeshore\n\nMonsieur,\n\nJe me permets de vous contacter afin de vous signaler plusieurs problèmes qui affectent la qualité de vie dans l\'appartement que je loue depuis janvier 2024.\n\nEn premier lieu, le système de chauffage fonctionne de manière irrégulière depuis le mois de mars. Par temps froid, la température intérieure descend en dessous de 18 degrés, ce qui est inférieur aux normes fixées par le Code du bâtiment de l\'Ontario.\n\nPar ailleurs, des infiltrations d\'eau ont été constatées dans la salle de bain depuis deux semaines, causant des dommages visibles sur le plafond.\n\nJe vous serais reconnaissant de bien vouloir prendre les mesures nécessaires dans les meilleurs délais afin de remédier à ces problèmes.\n\nJe reste à votre disposition pour convenir d\'un rendez-vous.\n\nVeuillez agréer, Monsieur, l\'expression de mes salutations distinguées.\n\nOsama Al-Ahmed'},
];

writingPrompts.forEach(p => data.writing_prompts.push({ id: Date.now() + Math.random(), ...p }));

// ═══════════════════════════════════════════════════════════════════════════
// SPEAKING PROMPTS (10 per level)
// ═══════════════════════════════════════════════════════════════════════════

const speakingPrompts = [
// A1
{level:'A1',prompt:'Présentez-vous: votre nom, votre ville, votre famille et votre profession.',duration_sec:60,model_response:'Bonjour! Je m\'appelle Osama Ahmed. J\'habite à Oakville, en Ontario, au Canada. J\'ai une femme et deux enfants. Je suis ingénieur en marketing. Je travaille à Burlington. J\'étudie le français pour ma résidence permanente. Enchanté!',tips:['Speak slowly and clearly','Use je m\'appelle not je suis + name','Remember: J\'ai [age] ans for age, not je suis']},
{level:'A1',prompt:'Décrivez votre famille. Combien de personnes? Quels âges? Quelles professions?',duration_sec:60,model_response:'Dans ma famille, nous sommes quatre. Ma femme s\'appelle Fatima. Elle est médecin. Elle a trente-deux ans. Mon fils Youssef a sept ans. Il va à l\'école primaire. Ma fille Nour a cinq ans. Elle va à la maternelle. Et moi, j\'ai trente-cinq ans. Je travaille comme ingénieur.',tips:['Use avoir for age','Use être for profession (no article)','Practice numbers clearly']},
{level:'A1',prompt:'Décrivez votre maison à Oakville: combien de pièces, où est-elle située?',duration_sec:60,model_response:'Ma maison est à Oakville, dans l\'Ontario. C\'est une grande maison. Il y a cinq pièces: un salon, une cuisine, trois chambres et deux salles de bain. Il y a aussi un jardin. Ma maison est dans un quartier calme, près du lac Ontario. J\'aime beaucoup ma maison.',tips:['Use il y a for "there is/are"','Practice room vocabulary','près de = near']},
{level:'A1',prompt:'Qu\'est-ce que vous aimez faire le weekend?',duration_sec:60,model_response:'Le weekend, j\'aime aller au parc avec mes enfants. Nous aimons jouer au foot et faire du vélo. Le samedi, ma femme et moi allons au marché. Nous achetons des légumes et des fruits frais. Le soir, nous regardons des films en français. C\'est une bonne façon de pratiquer le français!',tips:['Use j\'aime + infinitive','Use nous for activities with family','Present tense throughout']},
{level:'A1',prompt:'Décrivez le temps qu\'il fait aujourd\'hui et votre saison préférée.',duration_sec:60,model_response:'Aujourd\'hui, il fait froid et il neige. C\'est typique en hiver à Oakville. La température est de moins dix degrés. Ma saison préférée, c\'est l\'été. En été, il fait beau et chaud. Je vais souvent au lac Ontario avec ma famille. J\'aime le soleil!',tips:['il fait + weather','Use il fait for temperature feelings, il y a du soleil for sun','Practice numbers for temperature']},
// A2
{level:'A2',prompt:'Parlez de votre travail ou de vos études. Qu\'est-ce que vous faites? Où? Avec qui?',duration_sec:90,model_response:'Je travaille comme responsable marketing dans une entreprise de technologie à Burlington. Je travaille avec une équipe de dix personnes. Mon équipe est très internationale — nous venons de cinq pays différents. Mes responsabilités incluent la gestion des réseaux sociaux et la création de contenu bilingue. J\'aime mon travail parce qu\'il est varié et créatif. Le seul inconvénient, c\'est le trajet — je prends le bus GO chaque matin pendant vingt minutes.',tips:['Use present tense throughout','Include details: numbers, places, people','Mention both positives and negatives for balance']},
{level:'A2',prompt:'Racontez ce que vous avez fait hier. Utilisez le passé composé.',duration_sec:90,model_response:'Hier, j\'ai eu une journée très chargée. Le matin, je me suis levé à six heures et j\'ai pris le bus GO à sept heures. Au bureau, j\'ai eu plusieurs réunions importantes. À midi, j\'ai mangé avec mes collègues à la cafétéria. L\'après-midi, j\'ai terminé un rapport pour mon directeur. Le soir, je suis rentré à dix-sept heures trente. Après le dîner, j\'ai étudié le français pendant une heure et je me suis couché à vingt-trois heures.',tips:['Use passé composé for completed actions','Remember être verbs: je me suis levé, je suis rentré','Add time markers: le matin, à midi, le soir']},
{level:'A2',prompt:'Décrivez Oakville à quelqu\'un qui ne connaît pas cette ville.',duration_sec:90,model_response:'Oakville est une belle ville située dans la région de Halton, à l\'ouest de Toronto, en Ontario. C\'est une ville de deux cent mille habitants environ. Oakville est connue pour ses jolies rues, ses parcs magnifiques et son bord du lac Ontario. Il y a de nombreux restaurants, boutiques et cafés dans le centre-ville historique. Les transports sont pratiques — on peut facilement aller à Toronto en train GO en moins de trente minutes. C\'est une ville très sûre et agréable pour les familles.',tips:['Use il y a for what the city has','Add adjectives to describe','Give numbers and distances for precision']},
// B1
{level:'B1',prompt:'Comparez la vie au Canada avec votre pays d\'origine. Donnez des exemples concrets.',duration_sec:120,model_response:'Quand je compare ma vie au Canada avec ma vie au Maroc, je vois des différences importantes. D\'un côté, le Canada offre plus d\'opportunités professionnelles et un système d\'éducation excellent pour mes enfants. Le système de santé est aussi beaucoup mieux organisé. D\'un autre côté, le coût de la vie est beaucoup plus élevé ici. Par exemple, le loyer à Oakville coûte deux fois plus cher qu\'à Casablanca. L\'hiver est aussi un grand choc culturel — je n\'avais jamais vu autant de neige! Cependant, les Canadiens sont très accueillants et j\'ai fait beaucoup d\'amis depuis mon arrivée.',tips:['Use comparatives: plus... que, moins... que','Use d\'un côté... d\'un autre côté structure','Give concrete examples with numbers']},
{level:'B1',prompt:'Parlez d\'un défi que vous avez eu au Canada et comment vous l\'avez surmonté.',duration_sec:120,model_response:'Un des plus grands défis que j\'ai rencontrés au Canada était la barrière linguistique. Quand je suis arrivé en 2023, mon français était très limité. Je ne pouvais pas suivre les conversations au travail et je me sentais souvent isolé. Pour surmonter ce défi, j\'ai pris des cours de français deux fois par semaine. J\'ai aussi commencé à regarder des séries télévisées en français et à lire le journal en français chaque matin. Six mois plus tard, ma situation s\'était améliorée considérablement. Aujourd\'hui, je me débrouille bien en français et je prépare mon examen TEF pour obtenir ma résidence permanente.',tips:['Use imparfait for background: je ne pouvais pas','Use passé composé for actions taken: j\'ai pris des cours','Show progression over time']},
// B2
{level:'B2',prompt:'Donnez votre opinion sur le bilinguisme obligatoire dans la fonction publique canadienne.',duration_sec:180,model_response:'Le bilinguisme dans la fonction publique fédérale est, à mon sens, une nécessité fondamentale qui découle directement du caractère officiel des deux langues du Canada.\n\nD\'une part, le fait que des millions de Canadiens soient francophones légitime pleinement l\'exigence que les fonctionnaires fédéraux puissent les servir dans leur langue. Il s\'agit d\'un droit constitutionnel que l\'État se doit de garantir.\n\nD\'autre part, certains avancent que cette exigence crée des inégalités dans l\'accès à la fonction publique. En effet, les candidats unilingues anglophones peuvent se voir refuser des postes pour lesquels ils seraient autrement hautement qualifiés.\n\nCependant, force est de constater que dans un pays qui se définit comme officiellement bilingue, il est cohérent d\'exiger que ses représentants le soient également. Des mesures d\'accompagnement, comme la formation linguistique financée par l\'État, permettraient d\'atténuer les inégalités tout en maintenant l\'exigence du bilinguisme.\n\nPour conclure, je suis convaincu que le bilinguisme institutionnel, bien que perfectible dans sa mise en œuvre, demeure un pilier indispensable de l\'identité canadienne.',tips:['Open with clear position','Use D\'une part... D\'autre part structure','Include Cependant to show nuance','End with Pour conclure + restate position','Use subjunctive where appropriate: bien que... soit']},
{level:'B2',prompt:'Décrivez votre projet professionnel au Canada dans les cinq prochaines années.',duration_sec:180,model_response:'Dans les cinq prochaines années, j\'ai des ambitions professionnelles clairement définies au Canada.\n\nÀ court terme, mon objectif prioritaire est d\'obtenir ma résidence permanente d\'ici la fin de l\'année et de consolider ma maîtrise du français au niveau B2, ce qui me permettra d\'accéder à des postes bilingues plus valorisants.\n\nÀ moyen terme, je souhaite obtenir une promotion au sein de mon entreprise actuelle. J\'envisage également de poursuivre une formation certifiante en marketing numérique pour rester compétitif sur le marché canadien.\n\nÀ plus long terme, j\'aimerais créer ma propre agence de marketing spécialisée dans les marchés bilingues francophones et anglophones. Le Canada offre un environnement idéal pour ce type d\'entreprise, compte tenu de la dualité linguistique du pays.\n\nPour atteindre ces objectifs, je m\'engage à travailler rigoureusement, à continuer mes études de français, et à développer mon réseau professionnel au sein de la communauté d\'affaires d\'Oakville et de Toronto.',tips:['Structure: court terme, moyen terme, long terme','Use conditional: j\'aimerais, je souhaiterais','Use futur simple: permettra, serai','Show ambition + concrete steps']},
];

speakingPrompts.forEach(p => data.speaking_prompts.push({ id: Date.now() + Math.random(), ...p }));

// ═══════════════════════════════════════════════════════════════════════════
// LISTENING TRACKS (5 per level = 20 total, 5 questions each)
// ═══════════════════════════════════════════════════════════════════════════

const listeningTracks = [
// A1
{level:'A1',title:'Au café — Dialogue simple',type:'dialogue',script:'Serveur: Bonjour! Qu\'est-ce que vous désirez?\nClient: Bonjour! Je voudrais un café et un croissant, s\'il vous plaît.\nServeur: Très bien. Vous prenez du sucre?\nClient: Oui, un sucre, merci.\nServeur: Et voilà. Ça fait trois euros cinquante.\nClient: Voilà. Merci beaucoup!\nServeur: Bonne journée!',questions:[{q:'Qu\'est-ce que le client commande?',options:['Un thé et un pain','Un café et un croissant','Un chocolat et un muffin','Un jus et un croissant'],correct:1},{q:'Est-ce que le client prend du sucre?',options:['Non','Oui, deux sucres','Oui, un sucre','Il ne répond pas'],correct:2},{q:'Combien ça coûte?',options:['2,50€','3,00€','3,50€','4,00€'],correct:2},{q:'Qu\'est-ce que le serveur dit à la fin?',options:['Au revoir','Merci','Bonne journée','À bientôt'],correct:2},{q:'Comment le client répond à la question sur le sucre?',options:['Non merci','Oui s\'il vous plaît','Un sucre merci','Deux sucres'],correct:2}]},

{level:'A1',title:'Se présenter — Monologue',type:'monologue',script:'Bonjour, je m\'appelle Marie Dubois. J\'ai trente ans. J\'habite à Oakville, en Ontario. Je suis professeure de français dans une école primaire. J\'ai un mari et un enfant. Mon mari s\'appelle Pierre et mon fils s\'appelle Lucas. Lucas a cinq ans. J\'aime la musique et la lecture. Mon livre préféré est "Le Petit Prince".',questions:[{q:'Quel est le prénom de la personne?',options:['Pierre','Lucas','Marie','Dubois'],correct:2},{q:'Quel est son âge?',options:['25 ans','28 ans','30 ans','35 ans'],correct:2},{q:'Quelle est sa profession?',options:['Médecin','Avocate','Infirmière','Professeure de français'],correct:3},{q:'Quel âge a son fils?',options:['3 ans','4 ans','5 ans','6 ans'],correct:2},{q:'Quel est son livre préféré?',options:['Harry Potter','Le Petit Prince','Astérix','Les Misérables'],correct:1}]},

{level:'A1',title:'Les nombres — Annonces',type:'announcement',script:'Bienvenue au supermarché Loblaws d\'Oakville. Les promotions du jour: les pommes rouges sont à deux dollars quatre-vingt-dix-neuf le kilo. Les oranges sont à trois dollars cinquante le filet. Le pain de campagne est à deux dollars vingt-cinq. La caisse numéro cinq est maintenant ouverte. Bonne journée!',questions:[{q:'Combien coûtent les pommes rouges?',options:['1,99$ le kilo','2,99$ le kilo','3,99$ le kilo','4,99$ le kilo'],correct:1},{q:'Combien coûtent les oranges?',options:['2,50$ le filet','3,00$ le filet','3,50$ le filet','4,00$ le filet'],correct:2},{q:'Combien coûte le pain?',options:['1,25$','2,25$','2,75$','3,25$'],correct:1},{q:'Quelle caisse est ouverte?',options:['Numéro 3','Numéro 4','Numéro 5','Numéro 6'],correct:2},{q:'Où est ce supermarché?',options:['Toronto','Burlington','Mississauga','Oakville'],correct:3}]},

// A2
{level:'A2',title:'La météo — Radio Ontario',type:'news',script:'Bonjour, voici la météo pour la région de Toronto et Halton pour ce mercredi. Ce matin, il fait froid avec des températures de moins cinq degrés. Il y a des nuages mais pas de neige. L\'après-midi, les températures vont monter à deux degrés. Ce soir, attention: une tempête de neige est prévue. On attend entre dix et quinze centimètres de neige entre vingt heures et minuit. Demain matin, les routes seront glissantes. Prudence sur la route 403 et la QEW.',questions:[{q:'Quelle est la température ce matin?',options:['Moins 2 degrés','Moins 5 degrés','Moins 10 degrés','Plus 2 degrés'],correct:1},{q:'Y a-t-il de la neige ce matin?',options:['Oui, beaucoup','Oui, un peu','Non','Il y a de la pluie'],correct:2},{q:'Quand est prévue la tempête de neige?',options:['Ce matin','Ce midi','Ce soir entre 20h et minuit','Demain matin'],correct:2},{q:'Combien de centimètres de neige attend-on?',options:['5-10 cm','10-15 cm','15-20 cm','20-25 cm'],correct:1},{q:'Quelle route sera glissante demain?',options:['Route 400 et 401','Route 403 et QEW','Route 410 et DVP','Route 427 et Gardiner'],correct:1}]},

{level:'A2',title:'Au bureau — Conversation téléphonique',type:'dialogue',script:'Réceptionniste: Cabinet médical d\'Oakville, bonjour.\nPatient: Bonjour, je voudrais prendre un rendez-vous avec le docteur Tremblay, s\'il vous plaît.\nRéceptionniste: Oui, bien sûr. C\'est pour quel motif?\nPatient: J\'ai mal à la gorge depuis trois jours et j\'ai un peu de fièvre.\nRéceptionniste: D\'accord. Le docteur Tremblay a une disponibilité jeudi à quatorze heures trente. Ça vous convient?\nPatient: Oui, c\'est parfait.\nRéceptionniste: Votre nom, s\'il vous plaît?\nPatient: Ahmed. Osama Ahmed.\nRéceptionniste: Très bien, Monsieur Ahmed. Apportez votre carte OHIP. À jeudi!',questions:[{q:'Avec quel médecin le patient veut-il un rendez-vous?',options:['Docteur Martin','Docteur Tremblay','Docteur Bernard','Docteur Lavoie'],correct:1},{q:'Depuis combien de temps a-t-il mal à la gorge?',options:['Un jour','Deux jours','Trois jours','Une semaine'],correct:2},{q:'À quelle heure est le rendez-vous?',options:['13h30','14h00','14h30','15h00'],correct:2},{q:'Quel jour est le rendez-vous?',options:['Mardi','Mercredi','Jeudi','Vendredi'],correct:2},{q:'Qu\'est-ce que le patient doit apporter?',options:['Son passeport','Sa carte de crédit','Sa carte OHIP','Son ordonnance'],correct:2}]},

// B1
{level:'B1',title:'Interview — Arriver au Canada',type:'interview',script:'Journaliste: Bonjour Karim. Vous êtes arrivé au Canada il y a deux ans. Pouvez-vous nous parler de votre expérience?\nKarim: Bien sûr. Quand je suis arrivé à Toronto en janvier 2024, je ne parlais pas du tout français. Je travaillais comme ingénieur en Algérie, mais ici, personne ne reconnaissait mon diplôme au début.\nJournaliste: Comment avez-vous surmonté ces difficultés?\nKarim: J\'ai pris des cours de français et d\'anglais en même temps. C\'était épuisant mais nécessaire. Après six mois, j\'ai trouvé un emploi dans une petite entreprise. Ils cherchaient quelqu\'un de bilingue.\nJournaliste: Et maintenant, êtes-vous satisfait de votre vie ici?\nKarim: Absolument. Ma femme et mes enfants sont venus me rejoindre l\'année dernière. Nous avons acheté une maison à Oakville. Je ne reviendrais pas en arrière.',questions:[{q:'Quand Karim est-il arrivé au Canada?',options:['Janvier 2022','Janvier 2023','Janvier 2024','Janvier 2025'],correct:2},{q:'Quelle était sa profession en Algérie?',options:['Médecin','Avocat','Ingénieur','Professeur'],correct:2},{q:'Quel problème a-t-il rencontré avec ses qualifications?',options:['Ses diplômes étaient faux','Personne ne reconnaissait son diplôme','Il n\'avait pas de diplôme','Son diplôme était insuffisant'],correct:1},{q:'Comment a-t-il trouvé un emploi?',options:['Par un ami','Via IRCC','L\'entreprise cherchait quelqu\'un de bilingue','Par une agence de placement'],correct:2},{q:'Où a-t-il acheté une maison?',options:['Toronto','Burlington','Mississauga','Oakville'],correct:3}]},

{level:'B1',title:'Émission radio — Les avantages du français au Canada',type:'news',script:'Bonjour à tous. Aujourd\'hui, nous parlons des avantages du français sur le marché du travail canadien. Selon une étude récente de l\'Université d\'Ottawa, les travailleurs bilingues gagnent en moyenne dix-huit pour cent de plus que leurs collègues unilingues. De plus, la demande pour des employés bilingues a augmenté de vingt-cinq pour cent en cinq ans dans le secteur des services gouvernementaux. Les provinces qui offrent les meilleures perspectives pour les francophones sont, dans l\'ordre: le Québec, l\'Ontario, le Nouveau-Brunswick et la Colombie-Britannique. Si vous êtes immigrant et que vous apprenez le français, vous faites le bon choix!',questions:[{q:'De combien les bilingues gagnent-ils de plus?',options:['8%','13%','18%','25%'],correct:2},{q:'De combien la demande de bilingues a-t-elle augmenté?',options:['10%','15%','20%','25%'],correct:3},{q:'Dans quel secteur la demande a-t-elle augmenté?',options:['La santé','Les services gouvernementaux','L\'éducation','La technologie'],correct:1},{q:'Quelle province offre les meilleures perspectives?',options:['Ontario','Nouveau-Brunswick','Colombie-Britannique','Québec'],correct:3},{q:'D\'où vient cette étude?',options:['Statistique Canada','Université de Montréal','Université d\'Ottawa','IRCC'],correct:2}]},

// B2
{level:'B2',title:'Débat — L\'immigration économique au Canada',type:'debate',script:'Animateur: Bonsoir. Ce soir, nous débattons de l\'immigration économique au Canada. Madame Leclerc, vous pensez que le Canada devrait accueillir plus d\'immigrants?\nLeclerc: Absolument. Le Canada vieillit. Sans immigration, notre économie ne peut pas maintenir son niveau de croissance. Nous avons besoin de travailleurs qualifiés dans des domaines comme la santé et la technologie.\nAnimateur: Et vous, Monsieur Bergeron, vous n\'êtes pas d\'accord?\nBergeron: Ce n\'est pas que je suis contre l\'immigration. Je pense simplement que le rythme actuel dépasse notre capacité d\'intégration. Les villes manquent de logements, les hôpitaux sont surchargés.\nLeclerc: Mais ces problèmes existaient avant l\'immigration! Ce sont des problèmes d\'investissement public, pas d\'immigration.\nAnimateur: Pour conclure: comment améliorer le système?\nBergeron: En investissant davantage dans les services d\'intégration, les cours de langue, et la reconnaissance des diplômes étrangers.',questions:[{q:'Quel est le thème principal du débat?',options:['La politique linguistique','L\'immigration économique','Le système de santé','Le logement'],correct:1},{q:'Selon Madame Leclerc, pourquoi le Canada a-t-il besoin d\'immigrants?',options:['Pour payer moins de taxes','Parce que le Canada vieillit et a besoin de travailleurs','Pour diversifier la culture','Pour augmenter la population'],correct:1},{q:'Quelle est l\'inquiétude principale de Monsieur Bergeron?',options:['Trop de coûts','Le rythme dépasse la capacité d\'intégration','La langue','La culture'],correct:1},{q:'Selon Madame Leclerc, d\'où viennent les problèmes de logement et de santé?',options:['De l\'immigration','Du manque d\'investissement public','Des immigrants eux-mêmes','Du gouvernement fédéral'],correct:1},{q:'Quelle solution propose Monsieur Bergeron?',options:['Arrêter l\'immigration','Investir dans les services d\'intégration et la reconnaissance des diplômes','Imposer un quota strict','Favoriser l\'immigration francophone'],correct:1}]},

{level:'B2',title:'Conférence — L\'avenir du bilinguisme canadien',type:'lecture',script:'Mesdames et Messieurs, le bilinguisme canadien est à un tournant décisif. D\'une part, le nombre de francophones hors Québec continue de diminuer en proportion de la population totale. D\'autre part, on observe un intérêt croissant pour l\'apprentissage du français parmi les nouveaux immigrants, qui voient dans le bilinguisme une voie d\'accès privilégiée au marché du travail et à la citoyenneté. Plusieurs études démontrent que les immigrants qui maîtrisent le français s\'intègrent mieux, trouvent des emplois plus rapidement et contribuent davantage à l\'économie nationale. La question n\'est donc plus de savoir si le français est utile au Canada — c\'est indéniable — mais comment le gouvernement peut mieux soutenir son apprentissage, notamment par un financement accru des cours de langue pour les nouveaux arrivants.',questions:[{q:'Quelle tendance préoccupante est mentionnée?',options:['Le français disparaît au Québec','Les francophones hors Québec diminuent en proportion','Moins d\'immigrants parlent français','Le bilinguisme coûte trop cher'],correct:1},{q:'Qui montre un intérêt croissant pour le français?',options:['Les anglophones','Les étudiants','Les nouveaux immigrants','Les fonctionnaires'],correct:2},{q:'Selon les études mentionnées, les immigrants bilingues s\'intègrent:',options:['Moins bien','Pareil','Mieux et plus rapidement','Plus lentement mais mieux'],correct:2},{q:'Quelle est la question principale selon le conférencier?',options:['Si le français est utile','Comment mieux soutenir l\'apprentissage du français','Si le Canada devrait avoir deux langues','Combien coûte le bilinguisme'],correct:1},{q:'Quelle mesure concrète est proposée?',options:['Rendre le français obligatoire','Créer plus d\'écoles françaises','Augmenter le financement des cours de langue pour nouveaux arrivants','Exiger le français pour la citoyenneté'],correct:2}]},
];

listeningTracks.forEach(t => data.listening_tracks.push({ id: Date.now() + Math.random(), ...t }));

// ═══════════════════════════════════════════════════════════════════════════
// ADDITIONAL VOCAB CARDS (200+ cards by theme)
// ═══════════════════════════════════════════════════════════════════════════

const additionalVocab = [
// IMMIGRATION & GOVERNMENT
{level:'A2',word:'le dossier',word_type:'noun (m)',translation:'the file / case',example_fr:'Mon dossier IRCC est en cours de traitement.',example_en:'My IRCC file is being processed.'},
{level:'A2',word:'le formulaire',word_type:'noun (m)',translation:'the form',example_fr:'Je dois remplir ce formulaire en français.',example_en:'I must fill in this form in French.'},
{level:'A2',word:'valide',word_type:'adjective',translation:'valid',example_fr:'Mon passeport est valide jusqu\'en 2028.',example_en:'My passport is valid until 2028.'},
{level:'A2',word:'la citoyenneté',word_type:'noun (f)',translation:'citizenship',example_fr:'Je veux obtenir la citoyenneté canadienne.',example_en:'I want to obtain Canadian citizenship.'},
{level:'B1',word:'soumettre',word_type:'verb',translation:'to submit',example_fr:'J\'ai soumis ma demande hier.',example_en:'I submitted my application yesterday.'},
{level:'B1',word:'le délai',word_type:'noun (m)',translation:'the deadline / delay',example_fr:'Le délai de traitement est de six mois.',example_en:'The processing time is six months.'},
{level:'B1',word:'approuver',word_type:'verb',translation:'to approve',example_fr:'Ma demande a été approuvée.',example_en:'My application was approved.'},
{level:'B1',word:'refuser',word_type:'verb',translation:'to refuse / reject',example_fr:'Sa demande a été refusée pour manque de documents.',example_en:'His application was refused for lack of documents.'},
{level:'B2',word:'l\'admissibilité',word_type:'noun (f)',translation:'eligibility',example_fr:'Je vérifie mon admissibilité à Entrée express.',example_en:'I am checking my eligibility for Express Entry.'},
{level:'B2',word:'la convocation',word_type:'noun (f)',translation:'the summons / invitation to apply',example_fr:'J\'ai reçu une convocation à présenter une demande.',example_en:'I received an invitation to apply.'},
// WORK & CAREER
{level:'A2',word:'le bureau',word_type:'noun (m)',translation:'the office',example_fr:'Je travaille dans un bureau à Burlington.',example_en:'I work in an office in Burlington.'},
{level:'A2',word:'le salaire',word_type:'noun (m)',translation:'the salary',example_fr:'Mon salaire est de soixante mille dollars par an.',example_en:'My salary is sixty thousand dollars per year.'},
{level:'A2',word:'la réunion',word_type:'noun (f)',translation:'the meeting',example_fr:'J\'ai une réunion à neuf heures.',example_en:'I have a meeting at nine o\'clock.'},
{level:'B1',word:'les avantages sociaux',word_type:'noun (m pl)',translation:'employee benefits',example_fr:'Cette entreprise offre d\'excellents avantages sociaux.',example_en:'This company offers excellent employee benefits.'},
{level:'B1',word:'le télétravail',word_type:'noun (m)',translation:'remote work / working from home',example_fr:'Je fais du télétravail deux jours par semaine.',example_en:'I work from home two days a week.'},
{level:'B1',word:'une promotion',word_type:'noun (f)',translation:'a promotion',example_fr:'J\'espère obtenir une promotion cette année.',example_en:'I hope to get a promotion this year.'},
{level:'B2',word:'le curriculum vitae (CV)',word_type:'noun (m)',translation:'the CV / resume',example_fr:'J\'ai mis mon CV à jour en français et en anglais.',example_en:'I updated my CV in French and English.'},
{level:'B2',word:'la lettre de motivation',word_type:'noun (f)',translation:'the cover letter',example_fr:'Ma lettre de motivation est en français.',example_en:'My cover letter is in French.'},
// HEALTH
{level:'A2',word:'la fièvre',word_type:'noun (f)',translation:'fever',example_fr:'J\'ai de la fièvre depuis hier.',example_en:'I\'ve had a fever since yesterday.'},
{level:'A2',word:'l\'ordonnance',word_type:'noun (f)',translation:'the prescription',example_fr:'Le médecin m\'a donné une ordonnance.',example_en:'The doctor gave me a prescription.'},
{level:'A2',word:'la pharmacie',word_type:'noun (f)',translation:'the pharmacy',example_fr:'Je vais à la pharmacie chercher mes médicaments.',example_en:'I\'m going to the pharmacy to get my medications.'},
{level:'B1',word:'être allergique à',word_type:'expression',translation:'to be allergic to',example_fr:'Je suis allergique aux arachides.',example_en:'I am allergic to peanuts.'},
{level:'B1',word:'se remettre',word_type:'verb (reflexive)',translation:'to recover',example_fr:'Je me remets lentement de mon opération.',example_en:'I am slowly recovering from my operation.'},
// EDUCATION
{level:'A2',word:'l\'école primaire',word_type:'noun (f)',translation:'elementary school',example_fr:'Mes enfants vont à l\'école primaire française.',example_en:'My children go to the French elementary school.'},
{level:'A2',word:'le collège',word_type:'noun (m)',translation:'middle school / junior high',example_fr:'Elle entre au collège en septembre.',example_en:'She starts middle school in September.'},
{level:'B1',word:'les frais de scolarité',word_type:'noun (m pl)',translation:'tuition fees',example_fr:'Les frais de scolarité à l\'université sont élevés.',example_en:'University tuition fees are high.'},
{level:'B1',word:'une bourse',word_type:'noun (f)',translation:'a scholarship',example_fr:'Il a obtenu une bourse pour ses études.',example_en:'He obtained a scholarship for his studies.'},
// HOUSING
{level:'A2',word:'le loyer',word_type:'noun (m)',translation:'the rent',example_fr:'Mon loyer est de deux mille dollars par mois.',example_en:'My rent is two thousand dollars per month.'},
{level:'A2',word:'le propriétaire',word_type:'noun (m)',translation:'the landlord / owner',example_fr:'Mon propriétaire est très sympathique.',example_en:'My landlord is very friendly.'},
{level:'B1',word:'le contrat de location',word_type:'noun (m)',translation:'the lease agreement',example_fr:'J\'ai signé un contrat de location d\'un an.',example_en:'I signed a one-year lease agreement.'},
{level:'B1',word:'les charges',word_type:'noun (f pl)',translation:'utility costs / service charges',example_fr:'Le loyer est de 2000$ charges comprises.',example_en:'The rent is $2000 including utilities.'},
// EMOTIONS & OPINIONS
{level:'B1',word:'être fier/fière de',word_type:'expression',translation:'to be proud of',example_fr:'Je suis fier de mes progrès en français.',example_en:'I am proud of my progress in French.'},
{level:'B1',word:'être inquiet/inquiète',word_type:'adjective',translation:'worried / anxious',example_fr:'Je suis inquiet pour mon examen TEF.',example_en:'I am worried about my TEF exam.'},
{level:'B2',word:'souligner',word_type:'verb',translation:'to highlight / underline / point out',example_fr:'Il convient de souligner l\'importance du bilinguisme.',example_en:'It is important to highlight the importance of bilingualism.'},
{level:'B2',word:'reconnaître',word_type:'verb',translation:'to acknowledge / recognize',example_fr:'Il faut reconnaître que l\'intégration prend du temps.',example_en:'One must acknowledge that integration takes time.'},
{level:'B2',word:'préconiser',word_type:'verb',translation:'to recommend / advocate',example_fr:'Les experts préconisent une réforme du système.',example_en:'Experts advocate a reform of the system.'},
];

additionalVocab.forEach(v => DB.insert('vocab_cards', v));
console.log(`✅ Added ${additionalVocab.length} vocab cards. Total: ${DB.findAll('vocab_cards').length}`);

// ═══════════════════════════════════════════════════════════════════════════
// ADDITIONAL GRAMMAR DRILLS (5 per new category)
// ═══════════════════════════════════════════════════════════════════════════

const additionalDrills = [
// Relative pronouns
{level:'B1',category:'relative_pronouns',question:'La ville _______ j\'habite s\'appelle Oakville.',options:JSON.stringify(['qui','que','où','dont']),correct_idx:2,explanation:'"Où" pour le lieu: la ville OÙ j\'habite.'},
{level:'B1',category:'relative_pronouns',question:'Le formulaire _______ j\'ai rempli était long.',options:JSON.stringify(['qui','que','où','dont']),correct_idx:1,explanation:'"Que" = objet direct: le formulaire QUE j\'ai rempli.'},
{level:'B1',category:'relative_pronouns',question:'L\'agent _______ m\'a aidé était très sympa.',options:JSON.stringify(['qui','que','où','dont']),correct_idx:0,explanation:'"Qui" = sujet: l\'agent QUI m\'a aidé (qui est suivi d\'un verbe).'},
{level:'B1',category:'relative_pronouns',question:'C\'est le document _______ j\'ai besoin.',options:JSON.stringify(['qui','que','où','dont']),correct_idx:3,explanation:'"Avoir besoin de" → dont. Le document DONT j\'ai besoin.'},
{level:'B1',category:'relative_pronouns',question:'Le jour _______ je suis arrivé au Canada était mémorable.',options:JSON.stringify(['qui','que','dont','où']),correct_idx:3,explanation:'"Où" pour le temps aussi: le jour OÙ je suis arrivé.'},
// Comparatives
{level:'B1',category:'comparatives',question:'Mon français est _______ qu\'il y a un an. (better)',options:JSON.stringify(['plus bon','meilleur','mieux','plus meilleur']),correct_idx:1,explanation:'"Meilleur" = better (comparatif de BON adjectif). Jamais "plus bon"!'},
{level:'B1',category:'comparatives',question:'Je parle _______ qu\'avant. (better — adverb)',options:JSON.stringify(['meilleur','plus bien','mieux','le mieux']),correct_idx:2,explanation:'"Mieux" = better (comparatif de BIEN adverbe). Jamais "plus bien"!'},
{level:'B1',category:'comparatives',question:'Il y a _______ parcs à Oakville qu\'à Burlington. (more)',options:JSON.stringify(['plus','plus de','plus des','autant de']),correct_idx:1,explanation:'"Plus de" + nom pour comparer des quantités.'},
{level:'B1',category:'comparatives',question:'C\'est _______ restaurant de la ville. (the best)',options:JSON.stringify(['le plus bon','le meilleur','le mieux','plus meilleur']),correct_idx:1,explanation:'"Le meilleur" = the best (superlatif de bon). Jamais "le plus bon"!'},
{level:'B1',category:'comparatives',question:'Oakville est _______ grande _______ Toronto.',options:JSON.stringify(['aussi/que','plus/de','moins/que','aussi/de']),correct_idx:2,explanation:'"Moins grande que" = less big than. Structure: moins + adjectif + que.'},
// Conditional
{level:'B1',category:'conditional',question:'Si j\'_______ plus de temps, j\'étudierais davantage.',options:JSON.stringify(['aurais','aurai','avais','ai']),correct_idx:2,explanation:'Si + IMPARFAIT: j\'avais. JAMAIS si + conditionnel!'},
{level:'B1',category:'conditional',question:'Je _______ un rendez-vous, s\'il vous plaît. (I would like)',options:JSON.stringify(['veux','voudrais','voudrai','voulais']),correct_idx:1,explanation:'"Je voudrais" = conditionnel de vouloir. Plus poli que "je veux".'},
{level:'B1',category:'conditional',question:'_______ -vous répéter plus lentement? (Could you)',options:JSON.stringify(['Pouvez','Pourriez','Pourrez','Pouviez']),correct_idx:1,explanation:'"Pourriez-vous" = conditionnel de pouvoir. Très poli.'},
// Subjunctive
{level:'B2',category:'subjunctive',question:'Il faut que vous _______ (parler) français.',options:JSON.stringify(['parlez','parliez','parlerez','parleriez']),correct_idx:1,explanation:'"Il faut que" → subjonctif. Parler → vous parliez.'},
{level:'B2',category:'subjunctive',question:'Bien que ce _______ (être) difficile, je continue.',options:JSON.stringify(['est','sera','soit','serait']),correct_idx:2,explanation:'"Bien que" → subjonctif TOUJOURS. Être → soit.'},
{level:'B2',category:'subjunctive',question:'Je doute qu\'il _______ (venir) à l\'heure.',options:JSON.stringify(['vient','viendra','vienne','venait']),correct_idx:2,explanation:'"Douter que" → subjonctif. Venir → vienne (irrégulier).'},
// Passive voice
{level:'B2',category:'passive',question:'Ma demande _______ (traiter) par IRCC. (has been)',options:JSON.stringify(['a traité','a été traitée','est traitée','était traitée']),correct_idx:1,explanation:'Passé composé passif: a été + participe passé. "Demande" (féminin) → traitÉE.'},
{level:'B2',category:'passive',question:'Le document _______ envoyé demain. (will be)',options:JSON.stringify(['est','a été','sera','serait']),correct_idx:2,explanation:'Futur passif: sera + participe passé. "Sera envoyé" = will be sent.'},
];

additionalDrills.forEach(d => DB.insert('grammar_drills', d));
console.log(`✅ Added ${additionalDrills.length} grammar drills. Total: ${DB.findAll('grammar_drills').length}`);

// Save all new content (readings, writing, speaking, listening) to data.json
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('\n🎉 Complete content build finished!');
console.log(`📚 Lessons: ${DB.findAll('lessons').length}`);
console.log(`🗂 Vocab cards: ${DB.findAll('vocab_cards').length}`);
console.log(`📝 Grammar drills: ${DB.findAll('grammar_drills').length}`);
console.log(`📖 Reading passages: ${data.readings.length}`);
console.log(`✍️  Writing prompts: ${data.writing_prompts.length}`);
console.log(`🎙️  Speaking prompts: ${data.speaking_prompts.length}`);
console.log(`🎧 Listening tracks: ${data.listening_tracks.length}`);
console.log('\nNow update your App.jsx to display this content!');
