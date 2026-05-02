// server/db/add_lessons2.js
// Run: node server/db/add_lessons2.js
// Adds remaining A2, B1, B2 lessons

const DB = require('./database');

const existing = DB.findAll('lessons').length;
console.log(`Currently ${existing} lessons in DB. Adding more...`);

const lessons = [

// ── A2 ───────────────────────────────────────────────────────────────────────
{
  level:'A2', sort_order:21, duration_min:25, xp_reward:55,
  title:'Weather & Seasons in Canada',
  description:'Describe Canadian weather, discuss seasons, and use weather vocabulary for daily conversation.',
  content: JSON.stringify({
    intro:`Weather is one of the most common conversation topics in Canada — especially in Ontario where winters are harsh and summers are beautiful. You need weather vocabulary for TEF listening comprehension (weather reports are common) and for natural conversation.`,
    sections:[
      {type:'vocabulary',title:'Weather Expressions',items:[
        {fr:'Il fait beau.',en:'The weather is nice.',pron:'eel fay BO',note:'Most common positive weather expression'},
        {fr:'Il fait mauvais.',en:'The weather is bad.',pron:'eel fay mo-VAY',note:'General bad weather'},
        {fr:'Il fait chaud.',en:'It is hot.',pron:'eel fay SHO',note:'Temperature — NOT "il est chaud"'},
        {fr:'Il fait froid.',en:'It is cold.',pron:'eel fay FWAH',note:'Very relevant in Ontario winters!'},
        {fr:'Il pleut.',en:'It is raining.',pron:'eel PLUH',note:'From pleuvoir (irregular)'},
        {fr:'Il neige.',en:'It is snowing.',pron:'eel NEZH',note:'From neiger. Common Nov-March in Oakville'},
        {fr:'Il y a du soleil.',en:'It is sunny.',pron:'eel ee ah dü so-LAY',note:'Literally "there is some sun"'},
        {fr:'Il y a des nuages.',en:'It is cloudy.',pron:'eel ee ah day nü-AZH',note:'Nuage = cloud'},
        {fr:'Il y a du vent.',en:'It is windy.',pron:'eel ee ah dü VON',note:'Vent = wind'},
        {fr:'Il gèle.',en:'It is freezing.',pron:'eel ZHEL',note:'From geler. Common in Canadian winter'},
        {fr:'Il y a du verglas.',en:'There is black ice.',pron:'eel ee ah dü vair-GLAH',note:'Very important in Ontario winters!'},
        {fr:'La température est de -10 degrés.',en:'The temperature is -10 degrees.',pron:'',note:'Canada uses Celsius — not Fahrenheit'},
      ]},
      {type:'vocabulary',title:'Seasons & Related Vocabulary',items:[
        {fr:'le printemps',en:'spring',pron:'luh pran-TON',note:'au printemps = in spring (March-May)'},
        {fr:'l\'été',en:'summer',pron:'lay-TAY',note:'en été = in summer (June-August)'},
        {fr:'l\'automne',en:'fall / autumn',pron:'loh-TUN',note:'en automne = in fall (Sept-Nov)'},
        {fr:'l\'hiver',en:'winter',pron:'lee-VAIR',note:'en hiver = in winter (Dec-Feb)'},
        {fr:'la neige',en:'snow',pron:'lah NEZH',note:''},
        {fr:'la pluie',en:'rain',pron:'lah PLWEE',note:''},
        {fr:'le brouillard',en:'fog',pron:'luh broo-YAR',note:'Common in fall in Ontario'},
        {fr:'l\'orage',en:'thunderstorm',pron:'lo-RAZH',note:'Il y a un orage ce soir.'},
        {fr:'la canicule',en:'heat wave',pron:'lah ka-nee-KÜL',note:'Increasingly common in Ontario summers'},
        {fr:'la tempête de neige',en:'snowstorm / blizzard',pron:'lah tom-PET duh NEZH',note:'Common in Oakville, January-February'},
      ]},
      {type:'dialogue',title:'Dialogue — Talking About the Weather',lines:[
        {speaker:'Collègue',fr:'Quel temps fait-il aujourd\'hui?',en:'What\'s the weather like today?'},
        {speaker:'Vous',fr:'Il fait très froid! Il y a du verglas sur les routes ce matin.',en:'It\'s very cold! There\'s black ice on the roads this morning.'},
        {speaker:'Collègue',fr:'Oui, l\'hiver à Oakville est vraiment difficile.',en:'Yes, winter in Oakville is really difficult.'},
        {speaker:'Vous',fr:'J\'attends avec impatience le printemps. Il fait si beau en mai au bord du lac.',en:'I can\'t wait for spring. It\'s so beautiful in May by the lake.'},
        {speaker:'Collègue',fr:'Quelle est la météo pour le weekend?',en:'What\'s the forecast for the weekend?'},
        {speaker:'Vous',fr:'Il va neiger samedi, mais dimanche il fera beau.',en:'It\'s going to snow Saturday, but Sunday will be nice.'},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'Weather reports are common in TEF listening comprehension — practice with Radio-Canada météo',
        'Never say "il est chaud" for weather — always "il fait chaud"',
        'Canada uses Celsius: 0°C = freezing, -20°C = very cold Ontario winter, 30°C = hot summer',
        '"Quel temps fait-il?" is the standard question for weather — memorize it',
        'Useful for TEF oral: "En hiver au Canada, il fait souvent moins vingt degrés à Oakville."',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"It is snowing" in French:',options:['Il fait neige','Il neige','Il y a neige','Il est neige'],correct:1,explanation:'"Neiger" is an impersonal verb: IL NEIGE. Like il pleut, il gèle — no other subject.'},
      {type:'multiple_choice',question:'"The weather is nice" — correct expression:',options:['Il est beau','Il fait beau','Le temps est beau','Il y a beau'],correct:1,explanation:'"Il fait beau" — weather uses FAIRE. "Il fait beau, chaud, froid, mauvais."'},
      {type:'multiple_choice',question:'"In summer" in French:',options:['au été','en été','dans l\'été','le été'],correct:1,explanation:'"En été" — summer, fall, and winter use "en". Only spring uses "au": au printemps.'},
      {type:'multiple_choice',question:'What does "il y a du verglas" mean?',options:['It is foggy','It is snowing','There is black ice','It is windy'],correct:2,explanation:'"Le verglas" = black ice. Very important vocabulary for Canadian winter safety.'},
    ],
    quiz:[
      {question:'How do you say "It is cold" in French?',options:['Il est froid','Il fait froid','Il y a froid','Il a froid'],correct:1,explanation:'"Il fait froid" — weather temperature uses FAIRE.'},
      {question:'"In winter" in French:',options:['au hiver','en hiver','dans hiver','le hiver'],correct:1,explanation:'"En hiver" — winter/summer/fall use "en". Spring uses "au printemps".'},
      {question:'What is "la tempête de neige"?',options:['Light snow','Snowstorm/blizzard','Freezing rain','Ice storm'],correct:1,explanation:'"La tempête de neige" = snowstorm/blizzard. Common in Ontario January-February.'},
      {question:'"It is raining" in French:',options:['Il pleuve','Il pleut','Il pluie','Il fait pluie'],correct:1,explanation:'"Il pleut" — from "pleuvoir". Irregular impersonal verb.'},
      {question:'Canada uses which temperature scale?',options:['Fahrenheit','Kelvin','Celsius','Rankine'],correct:2,explanation:'Canada uses Celsius. 0°C = freezing point. Important for TEF listening passages about weather.'},
    ]
  })
},
{
  level:'A2', sort_order:22, duration_min:30, xp_reward:60,
  title:'Shopping & Money in Canada',
  description:'Handle transactions, ask prices, and shop confidently in French — essential for daily life in Ontario.',
  content: JSON.stringify({
    intro:`Shopping vocabulary is practical for daily life in Oakville and tested in TEF listening comprehension. You need to ask prices, understand totals, pay by card, and handle common shopping interactions. Canadian stores often have bilingual staff, so using French is realistic and appreciated.`,
    sections:[
      {type:'vocabulary',title:'Shopping Vocabulary',items:[
        {fr:'Combien ça coûte?',en:'How much does it cost?',pron:'kom-BYAN sa KOOT',note:'Most common way to ask price'},
        {fr:'C\'est combien?',en:'How much is it?',pron:'say kom-BYAN',note:'Shorter, informal version'},
        {fr:'Ça fait combien?',en:'What does that come to?',pron:'sa fay kom-BYAN',note:'At the register'},
        {fr:'le prix',en:'the price',pron:'luh PREE',note:'Quel est le prix?'},
        {fr:'la caisse',en:'the cash register / checkout',pron:'lah KESS',note:'Passez à la caisse = go to the checkout'},
        {fr:'le reçu',en:'the receipt',pron:'luh ruh-SÜ',note:'Puis-je avoir un reçu? = Can I have a receipt?'},
        {fr:'la monnaie',en:'the change / coins',pron:'lah mo-NAY',note:'Gardez la monnaie = Keep the change'},
        {fr:'payer par carte',en:'to pay by card',pron:'pay-YAY par KART',note:'Je paie par carte Visa/Mastercard'},
        {fr:'payer en espèces',en:'to pay in cash',pron:'pay-YAY on es-PESS',note:'Vous acceptez les espèces?'},
        {fr:'un rabais / une réduction',en:'a discount',pron:'uhn ra-BAY / ün ray-dük-SYON',note:'Il y a un rabais de 20%?'},
        {fr:'en solde / en promotion',en:'on sale',pron:'on SOLD / on pro-mo-SYON',note:'C\'est en solde cette semaine.'},
        {fr:'la pointure',en:'shoe size',pron:'lah pwan-TÜR',note:'Quelle est votre pointure?'},
        {fr:'la taille',en:'clothing size',pron:'lah TYE',note:'Quelle taille faites-vous?'},
      ]},
      {type:'dialogue',title:'Dialogue — At Loblaws in Oakville',lines:[
        {speaker:'Vous',fr:'Excusez-moi, combien coûtent ces pommes?',en:'Excuse me, how much do these apples cost?'},
        {speaker:'Employé',fr:'Elles sont à deux dollars quatre-vingt-dix-neuf le kilo.',en:'They are $2.99 per kilo.'},
        {speaker:'Vous',fr:'Je vais en prendre deux kilos, s\'il vous plaît.',en:'I\'ll take two kilos, please.'},
        {speaker:'Employé',fr:'Autre chose?',en:'Anything else?'},
        {speaker:'Vous',fr:'Non merci. Je peux payer par carte?',en:'No thank you. Can I pay by card?'},
        {speaker:'Employé',fr:'Bien sûr. Ça fait cinq dollars quatre-vingt-dix-huit au total.',en:'Of course. That comes to $5.98 in total.'},
        {speaker:'Vous',fr:'Voilà. Puis-je avoir un reçu, s\'il vous plaît?',en:'Here you go. May I have a receipt, please?'},
      ]},
      {type:'grammar',title:'Expressing Prices',rules:[
        {rule:'Dollars and cents',example:'Ça coûte vingt-quatre dollars quatre-vingt-dix-neuf.',translation:'It costs $24.99.',breakdown:''},
        {rule:'Per unit',example:'C\'est trois dollars le kilo / la pièce / le litre.',translation:'It\'s $3 per kilo / each / per litre.',breakdown:'"Le" before the unit of measurement'},
        {rule:'Reduction',example:'Il y a un rabais de vingt pour cent.',translation:'There is a 20% discount.',breakdown:'"Pour cent" = percent'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'How do you ask "How much does it cost?"',options:['Quel est le coût?','Combien ça coûte?','C\'est quel prix?','Vous avez le prix?'],correct:1,explanation:'"Combien ça coûte?" is the most natural and common way to ask for a price.'},
      {type:'multiple_choice',question:'"I\'ll pay by card" in French:',options:['Je paye en carte','Je paie par carte','Je paye avec carte','Je paye la carte'],correct:1,explanation:'"Je paie par carte" — the preposition is PAR (by). "Payer par carte" is the standard expression.'},
      {type:'multiple_choice',question:'What does "en solde" mean?',options:['Sold out','On sale/discounted','Full price','New arrival'],correct:1,explanation:'"En solde" = on sale, discounted. "C\'est en solde cette semaine" = It\'s on sale this week.'},
      {type:'multiple_choice',question:'"That comes to $15.50" — Ça fait _______.',options:['quinze dollars cinquante','quinze dollars et demi','quinze et cinquante dollars','quinze-cinquante dollars'],correct:0,explanation:'"Quinze dollars cinquante" — state dollars then cents directly.'},
    ],
    quiz:[
      {question:'What is "la monnaie"?',options:['The money','The currency','The change/coins','The wallet'],correct:2,explanation:'"La monnaie" = change/coins. "L\'argent" = money in general.'},
      {question:'"Can I have a receipt?" in French:',options:['Je veux un reçu','Puis-je avoir un reçu?','Donnez-moi le reçu','Où est le reçu?'],correct:1,explanation:'"Puis-je avoir un reçu?" is polite and correct. "Puis-je" = may I (formal).'},
      {question:'"It\'s $3.99 per kilo" in French:',options:['C\'est trois dollars quatre-vingt-dix-neuf le kilo','C\'est trois-quatre-vingt-dix-neuf par kilo','C\'est $3.99 chaque kilo','C\'est trois dollars le kilo'],correct:0,explanation:'"Trois dollars quatre-vingt-dix-neuf le kilo" — price + le + unit.'},
      {question:'"How much is your clothing size?" in French:',options:['Quelle est votre pointure?','Quelle taille faites-vous?','Quel est votre format?','Combien faites-vous?'],correct:1,explanation:'"Quelle taille faites-vous?" for clothing. "Quelle est votre pointure?" for shoes.'},
      {question:'What does "un rabais" mean?',options:['A receipt','A refund','A discount','A tax'],correct:2,explanation:'"Un rabais" = a discount. Also: "une réduction" or "une promotion".'},
    ]
  })
},
{
  level:'A2', sort_order:23, duration_min:30, xp_reward:60,
  title:'Health & At the Doctor',
  description:'Describe symptoms, make appointments, and navigate the Canadian healthcare system in French.',
  content: JSON.stringify({
    intro:`Healthcare vocabulary is essential for immigrants in Canada. You need to describe symptoms to a doctor, understand prescriptions, and navigate OHIP and clinic systems. This vocabulary also appears regularly in TEF listening comprehension passages.`,
    sections:[
      {type:'grammar',title:'Describing Pain and Symptoms',rules:[
        {rule:'J\'ai mal à + body part',example:'J\'ai mal à la tête / au dos / aux dents.',translation:'I have a headache / backache / toothache.',breakdown:'"Avoir mal à" = to hurt/ache. Use au (masc), à la (fem), aux (plural).'},
        {rule:'J\'ai + symptom',example:'J\'ai de la fièvre. / J\'ai un rhume. / J\'ai la grippe.',translation:'I have a fever. / I have a cold. / I have the flu.',breakdown:''},
        {rule:'Je me sens + adjective',example:'Je me sens fatigué(e). / Je ne me sens pas bien.',translation:'I feel tired. / I don\'t feel well.',breakdown:'"Se sentir" = to feel (reflexive verb)'},
        {rule:'Depuis + time',example:'J\'ai mal à la gorge depuis trois jours.',translation:'I\'ve had a sore throat for three days.',breakdown:'"Depuis" = for/since. Very important with present tense in French!'},
      ]},
      {type:'vocabulary',title:'Body Parts',items:[
        {fr:'la tête',en:'the head',pron:'lah TET',note:'J\'ai mal à la tête = I have a headache'},
        {fr:'la gorge',en:'the throat',pron:'lah GORZH',note:'J\'ai mal à la gorge = I have a sore throat'},
        {fr:'le dos',en:'the back',pron:'luh DOH',note:'J\'ai mal au dos = I have a backache'},
        {fr:'le ventre',en:'the stomach/belly',pron:'luh VON-truh',note:'J\'ai mal au ventre = I have a stomach ache'},
        {fr:'les dents',en:'the teeth',pron:'lay DON',note:'J\'ai mal aux dents = I have a toothache'},
        {fr:'l\'oreille',en:'the ear',pron:'lo-RAY',note:'J\'ai mal à l\'oreille = I have an earache'},
        {fr:'le bras',en:'the arm',pron:'luh BRAH',note:''},
        {fr:'la jambe',en:'the leg',pron:'lah ZHOMB',note:''},
        {fr:'le genou',en:'the knee',pron:'luh zhuh-NOO',note:''},
      ]},
      {type:'vocabulary',title:'Healthcare System Vocabulary',items:[
        {fr:'le médecin',en:'the doctor',pron:'luh mayd-SAN',note:'Prendre un rendez-vous chez le médecin'},
        {fr:'l\'infirmier/infirmière',en:'the nurse',pron:'lan-feer-MYAY',note:''},
        {fr:'l\'ordonnance',en:'the prescription',pron:'lor-do-NONS',note:'Avez-vous une ordonnance?'},
        {fr:'le médicament',en:'the medication',pron:'luh mayd-ee-ka-MON',note:'Prenez ce médicament trois fois par jour.'},
        {fr:'la pharmacie',en:'the pharmacy',pron:'lah far-ma-SEE',note:'Shoppers Drug Mart = une pharmacie'},
        {fr:'OHIP',en:'Ontario Health Insurance Plan',pron:'',note:'Avez-vous votre carte OHIP?'},
        {fr:'le cabinet médical',en:'the doctor\'s office / clinic',pron:'luh ka-bee-NAY mayd-ee-KAL',note:''},
        {fr:'l\'urgence',en:'the emergency room',pron:'lür-ZHONS',note:'Je dois aller aux urgences.'},
        {fr:'une allergie',en:'an allergy',pron:'ün a-lair-ZHEE',note:'Je suis allergique aux arachides.'},
      ]},
      {type:'dialogue',title:'Dialogue — At a Clinic in Oakville',lines:[
        {speaker:'Réceptionniste',fr:'Bonjour, en quoi puis-je vous aider?',en:'Hello, how can I help you?'},
        {speaker:'Vous',fr:'Bonjour, je voudrais un rendez-vous avec le médecin, s\'il vous plaît.',en:'Hello, I would like an appointment with the doctor, please.'},
        {speaker:'Réceptionniste',fr:'Quel est le problème?',en:'What is the problem?'},
        {speaker:'Vous',fr:'J\'ai mal à la gorge depuis quatre jours et j\'ai de la fièvre.',en:'I\'ve had a sore throat for four days and I have a fever.'},
        {speaker:'Médecin',fr:'Avez-vous des allergies aux médicaments?',en:'Do you have any medication allergies?'},
        {speaker:'Vous',fr:'Non, je n\'ai pas d\'allergies. J\'ai besoin d\'une ordonnance?',en:'No, I don\'t have any allergies. Do I need a prescription?'},
        {speaker:'Médecin',fr:'Oui, je vous prescris un antibiotique. Prenez-le deux fois par jour pendant sept jours.',en:'Yes, I\'m prescribing you an antibiotic. Take it twice a day for seven days.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I have a headache" in French:',options:['J\'ai mal de tête','J\'ai mal à la tête','Ma tête fait mal','J\'ai une douleur de tête'],correct:1,explanation:'"J\'ai mal À LA tête" — avoir mal à + body part. "À la" for feminine nouns.'},
      {type:'multiple_choice',question:'"I\'ve had a fever for two days" — J\'ai de la fièvre _______ deux jours.',options:['pour','pendant','depuis','il y a'],correct:2,explanation:'"Depuis" + present tense = for [duration] up to now. "Depuis deux jours" = for two days (and still have it).'},
      {type:'multiple_choice',question:'"I need a prescription" in French:',options:['J\'ai besoin d\'une ordonnance','Je veux une ordonnance','J\'ai une ordonnance','Il me faut ordonnance'],correct:0,explanation:'"J\'ai besoin d\'une ordonnance" — avoir besoin de = to need.'},
      {type:'multiple_choice',question:'"I feel sick" in French:',options:['Je suis malade','Je me sens mal','Je ne me sens pas bien','All of the above are correct'],correct:3,explanation:'All three work: "je suis malade" (I am sick), "je me sens mal" (I feel bad), "je ne me sens pas bien" (I don\'t feel well).'},
    ],
    quiz:[
      {question:'"I have a toothache" — J\'ai mal _______.',options:['à les dents','aux dents','à des dents','de dents'],correct:1,explanation:'"Aux dents" — à + les = aux (plural). J\'ai mal AUX dents.'},
      {question:'What is "l\'ordonnance"?',options:['The appointment','The prescription','The emergency room','The insurance card'],correct:1,explanation:'"L\'ordonnance" = prescription. "Avez-vous une ordonnance?" = Do you have a prescription?'},
      {question:'"I\'m allergic to penicillin" — Je suis allergique _______ pénicilline.',options:['de','à la','au','des'],correct:1,explanation:'"Allergique à" + article. Pénicilline is feminine → à la pénicilline.'},
      {question:'What does "les urgences" mean?',options:['The emergencies (in general)','The emergency room','Emergency services','Urgent care only'],correct:1,explanation:'"Les urgences" = the emergency room. "Je vais aux urgences" = I\'m going to the ER.'},
      {question:'"Take this medication three times a day" — Prenez ce médicament _______ par jour.',options:['trois fois','troisième','trois temps','trois moment'],correct:0,explanation:'"Trois fois par jour" = three times a day. "Une fois" (once), "deux fois" (twice), "trois fois" (three times).'},
    ]
  })
},
{
  level:'A2', sort_order:24, duration_min:30, xp_reward:60,
  title:'Travel & Transportation in Ontario',
  description:'Navigate public transit, book trips, and talk about travel using GO Transit, the TTC, and VIA Rail vocabulary.',
  content: JSON.stringify({
    intro:`Travel and transportation are core A2 topics for TEF/TCF. In Ontario, you use GO Transit, the TTC, Via Rail, and drive on 400-series highways. Knowing this vocabulary helps you in real life and in TEF listening comprehension passages, which often feature travel scenarios.`,
    sections:[
      {type:'vocabulary',title:'Transportation Vocabulary',items:[
        {fr:'le train',en:'the train',pron:'luh TRAN',note:'Je prends le train GO pour aller à Toronto.'},
        {fr:'le bus / l\'autobus',en:'the bus',pron:'luh BÜS',note:'Le bus GO relie Oakville à Toronto.'},
        {fr:'le métro',en:'the subway',pron:'luh may-TRO',note:'Le métro de Toronto = the TTC subway'},
        {fr:'la voiture',en:'the car',pron:'lah vwah-TÜR',note:'Je vais au travail en voiture.'},
        {fr:'à pied',en:'on foot',pron:'ah PYAY',note:'J\'y vais à pied. = I go there on foot.'},
        {fr:'à vélo',en:'by bike',pron:'ah VAY-lo',note:'Je vais au parc à vélo.'},
        {fr:'l\'avion',en:'the plane',pron:'lah-VYON',note:'Je prends l\'avion pour aller à Vancouver.'},
        {fr:'le taxi / l\'Uber',en:'taxi / Uber',pron:'luh TAK-see',note:'Appelez un taxi, s\'il vous plaît.'},
        {fr:'la gare',en:'the train station',pron:'lah GAR',note:'La gare d\'Oakville = Oakville GO Station'},
        {fr:'l\'arrêt de bus',en:'the bus stop',pron:'la-RAY duh BÜS',note:'L\'arrêt est à deux minutes d\'ici.'},
        {fr:'le quai',en:'the platform',pron:'luh KAY',note:'Le train part du quai numéro trois.'},
        {fr:'le billet',en:'the ticket',pron:'luh bee-YAY',note:'Je voudrais un billet aller-retour.'},
        {fr:'aller simple',en:'one-way ticket',pron:'a-LAY SOM-pluh',note:''},
        {fr:'aller-retour',en:'return ticket / round trip',pron:'a-LAY ruh-TOOR',note:''},
      ]},
      {type:'grammar',title:'Getting Around — Key Phrases',rules:[
        {rule:'Asking directions',example:'Pour aller à la gare, s\'il vous plaît?',translation:'How do I get to the train station, please?',breakdown:''},
        {rule:'How long does it take?',example:'Combien de temps dure le trajet?',translation:'How long does the journey take?',breakdown:'"Durer" = to last/take (duration)'},
        {rule:'At what time?',example:'À quelle heure part le prochain train pour Toronto?',translation:'What time does the next train to Toronto leave?',breakdown:''},
        {rule:'Buying a ticket',example:'Je voudrais un billet aller-retour pour Ottawa, s\'il vous plaît.',translation:'I would like a return ticket to Ottawa, please.',breakdown:'"Je voudrais" = I would like (conditional — polite)'},
        {rule:'Means of transport',example:'Je vais au bureau en train / en bus / en voiture / à pied.',translation:'I go to the office by train / by bus / by car / on foot.',breakdown:'"En" before vehicles. "À" before foot/bike.'},
      ]},
      {type:'dialogue',title:'Dialogue — At Oakville GO Station',lines:[
        {speaker:'Vous',fr:'Bonjour, à quelle heure part le prochain train pour Union Station?',en:'Hello, what time does the next train to Union Station leave?'},
        {speaker:'Agent',fr:'Le prochain train part à huit heures quarante-cinq du quai deux.',en:'The next train leaves at 8:45 from platform two.'},
        {speaker:'Vous',fr:'Combien de temps dure le trajet?',en:'How long does the journey take?'},
        {speaker:'Agent',fr:'Le trajet dure environ trente minutes.',en:'The journey takes approximately thirty minutes.'},
        {speaker:'Vous',fr:'Je voudrais un billet aller-retour, s\'il vous plaît.',en:'I would like a return ticket, please.'},
        {speaker:'Agent',fr:'Ça fait douze dollars cinquante. Vous payez comment?',en:'That\'s $12.50. How will you pay?'},
        {speaker:'Vous',fr:'Par carte, s\'il vous plaît.',en:'By card, please.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I go to work by train" in French:',options:['Je vais au travail avec train','Je vais au travail par train','Je vais au travail en train','Je vais au travail à train'],correct:2,explanation:'"En train" — use "en" before vehicles: en train, en bus, en voiture, en avion. Use "à" for foot/bike: à pied, à vélo.'},
      {type:'multiple_choice',question:'"A return ticket to Montreal" in French:',options:['un billet retour à Montréal','un billet aller-retour pour Montréal','un ticket aller-retour à Montréal','un billet de retour Montréal'],correct:1,explanation:'"Un billet aller-retour POUR Montréal" — use "pour" for destination with tickets.'},
      {type:'multiple_choice',question:'"How long does the journey take?" in French:',options:['Combien coûte le trajet?','Combien de temps dure le trajet?','À quelle heure arrive le train?','Où est la gare?'],correct:1,explanation:'"Combien de temps dure le trajet?" — "durer" = to last/take. "Trajet" = journey.'},
      {type:'multiple_choice',question:'What is "le quai"?',options:['The ticket','The station','The platform','The schedule'],correct:2,explanation:'"Le quai" = the platform. "Le train part du quai numéro deux."'},
    ],
    quiz:[
      {question:'"The bus stop" in French:',options:['la gare de bus','l\'arrêt de bus','le quai de bus','la station de bus'],correct:1,explanation:'"L\'arrêt de bus" = the bus stop. "La gare" is for trains.'},
      {question:'"I go on foot" in French:',options:['Je vais en pied','Je vais à pied','Je vais par pied','Je vais de pied'],correct:1,explanation:'"À pied" = on foot. "J\'y vais à pied."'},
      {question:'What is "un billet aller simple"?',options:['A round-trip ticket','A season pass','A one-way ticket','A first-class ticket'],correct:2,explanation:'"Aller simple" = one-way. "Aller-retour" = round trip.'},
      {question:'"At what time does the train leave?" — À quelle heure _______ le train?',options:['arrive','part','vient','passe'],correct:1,explanation:'"Part" from "partir" (to leave/depart). À quelle heure PART le train?'},
      {question:'"How do I get to the airport?" in French:',options:['Où est l\'aéroport?','Comment aller à l\'aéroport?','Pour aller à l\'aéroport, s\'il vous plaît?','Où puis-je trouver l\'aéroport?'],correct:2,explanation:'"Pour aller à..." is the most natural way to ask for directions to a place.'},
    ]
  })
},
// ── B1 ───────────────────────────────────────────────────────────────────────
{
  level:'B1', sort_order:32, duration_min:40, xp_reward:85,
  title:'Object Pronouns: le, la, les, lui, leur',
  description:'Replace nouns with pronouns to sound natural and fluent — essential for B1+ French.',
  content: JSON.stringify({
    intro:`Object pronouns are what separate basic French from fluent French. Instead of repeating nouns, native speakers replace them with pronouns. Mastering this is essential for TEF oral production — examiners notice when you always repeat nouns instead of using pronouns. This is a B1 grammar point tested in both written and oral TEF sections.`,
    sections:[
      {type:'grammar',title:'Direct Object Pronouns',rules:[
        {rule:'le — replaces masculine singular noun',example:'Je vois le formulaire. → Je le vois.',translation:'I see the form. → I see it.',breakdown:'"Le" replaces "le formulaire" (masculine singular direct object).'},
        {rule:'la — replaces feminine singular noun',example:'J\'étudie la grammaire. → Je l\'étudie.',translation:'I study grammar. → I study it.',breakdown:'"La" → "l\'" before vowel.'},
        {rule:'les — replaces all plural nouns',example:'Je remplis les documents. → Je les remplis.',translation:'I fill in the documents. → I fill them in.',breakdown:'"Les" for all plurals.'},
        {rule:'Position: BEFORE the verb',example:'Je le vois. / Je ne le vois pas. / Je veux le voir.',translation:'I see it. / I don\'t see it. / I want to see it.',breakdown:'Before conjugated verb. In negation: ne + pronoun + verb + pas. With infinitive: before the infinitive.'},
      ]},
      {type:'grammar',title:'Indirect Object Pronouns',rules:[
        {rule:'lui — replaces à + singular person',example:'Je parle à l\'agent. → Je lui parle.',translation:'I speak to the officer. → I speak to him/her.',breakdown:'"Lui" replaces "à + person" (singular, masculine or feminine).'},
        {rule:'leur — replaces à + plural people',example:'J\'envoie les documents aux agents. → Je leur envoie les documents.',translation:'I send the documents to the officers. → I send them the documents.',breakdown:'"Leur" replaces "à + plural people".'},
        {rule:'Common verbs with indirect objects',example:'parler à, téléphoner à, envoyer à, donner à, écrire à, demander à',translation:'to speak to, to phone, to send to, to give to, to write to, to ask',breakdown:'These verbs take indirect objects → use lui/leur.'},
      ]},
      {type:'grammar',title:'Pronouns in Passé Composé',rules:[
        {rule:'Same position — before avoir/être',example:'J\'ai vu le document. → Je l\'ai vu.',translation:'I saw the document. → I saw it.',breakdown:'Pronoun goes before the auxiliary verb (avoir/être).'},
        {rule:'Agreement with direct object pronoun',example:'J\'ai lu la lettre. → Je l\'ai lue.',translation:'I read the letter. → I read it.',breakdown:'When direct object pronoun precedes avoir, past participle agrees in gender/number with the pronoun. "La lettre" = feminine → lue.'},
      ]},
      {type:'dialogue',title:'Dialogue — Discussing IRCC Documents',lines:[
        {speaker:'Ami',fr:'Tu as reçu ta lettre d\'IRCC?',en:'Did you receive your IRCC letter?'},
        {speaker:'Vous',fr:'Oui, je l\'ai reçue hier. Je l\'ai lue attentivement.',en:'Yes, I received it yesterday. I read it carefully.'},
        {speaker:'Ami',fr:'Et les documents? Tu les as envoyés?',en:'And the documents? Did you send them?'},
        {speaker:'Vous',fr:'Oui, je les ai envoyés la semaine dernière. J\'ai aussi téléphoné à l\'agent.',en:'Yes, I sent them last week. I also called the officer.'},
        {speaker:'Ami',fr:'Et qu\'est-ce qu\'il t\'a dit?',en:'And what did he say to you?'},
        {speaker:'Vous',fr:'Il m\'a dit d\'attendre deux semaines.',en:'He told me to wait two weeks.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I see the officer" → replace "l\'agent" with a pronoun:',options:['Je lui vois','Je le vois','Je la vois','Je les vois'],correct:1,explanation:'"L\'agent" is masculine singular direct object → LE. Je LE vois.'},
      {type:'multiple_choice',question:'"I speak to Marie" → Je _______ parle.',options:['la','le','lui','leur'],correct:2,explanation:'"Parler à" takes an indirect object → LUI (singular). Je LUI parle.'},
      {type:'multiple_choice',question:'"I send the documents to the officers" → Je _______ envoie les documents.',options:['lui','leur','les','le'],correct:1,explanation:'"Envoyer à" + plural people → LEUR. Je LEUR envoie les documents.'},
      {type:'multiple_choice',question:'"I read the letter" (passé composé with pronoun) → Je _______.',options:['l\'ai lu','l\'ai lue','la ai lue','lui ai lue'],correct:1,explanation:'"La lettre" → direct object pronoun "l\'". Agreement: lettre is feminine → lue. Je L\'AI LUE.'},
      {type:'multiple_choice',question:'Where does the pronoun go with a negation? "I don\'t see it"',options:['Je le ne vois pas','Je ne vois le pas','Je ne le vois pas','Je ne vois pas le'],correct:2,explanation:'Ne + PRONOUN + verb + pas. Je NE LE VOIS PAS.'},
    ],
    quiz:[
      {question:'"I fill in the forms" → replace "les formulaires":',options:['Je lui remplis','Je le remplis','Je les remplis','Je leur remplis'],correct:2,explanation:'"Les formulaires" = plural → LES. Je LES remplis.'},
      {question:'Which pronoun replaces "à + singular person"?',options:['le/la','les','lui','leur'],correct:2,explanation:'"Lui" replaces à + one person (male or female). Je parle à l\'agent → Je LUI parle.'},
      {question:'"I want to see it (the document — masculine)" in French:',options:['Je veux le voir','Je le veux voir','Je veux voir le','Je veux lui voir'],correct:0,explanation:'With infinitive, pronoun goes before the infinitive: Je veux LE voir.'},
      {question:'Agreement rule: "I received the letter (passé composé)" → Je _______.',options:['l\'ai reçu','l\'ai reçue','la ai reçue','lui ai reçu'],correct:1,explanation:'"La lettre" = feminine → direct object pronoun causes agreement: reçuE. Je L\'AI REÇUE.'},
      {question:'"I call them (the officers)" — Je _______ téléphone.',options:['les','leur','lui','le'],correct:1,explanation:'"Téléphoner à" = indirect object. Plural → LEUR. Je LEUR téléphone.'},
    ]
  })
},
{
  level:'B1', sort_order:33, duration_min:45, xp_reward:90,
  title:'Conditional Tense: Would/Could/Should',
  description:'Express polite requests, hypotheses, and wishes using the conditional — essential for TEF oral production.',
  content: JSON.stringify({
    intro:`The conditional tense is used for polite requests ("I would like..."), hypotheses ("If I were rich, I would..."), and reported speech. It is heavily used in formal contexts — job interviews, IRCC communications, and TEF oral tasks. Using the conditional instead of the present tense instantly sounds more polished and formal.`,
    sections:[
      {type:'grammar',title:'Forming the Conditional',rules:[
        {rule:'Formation: futur simple stem + imparfait endings',example:'parler → je parlerais, tu parlerais, il parlerait, nous parlerions, vous parleriez, ils parleraient',translation:'I would speak, you would speak...',breakdown:'Same stem as futur simple + endings: -ais, -ais, -ait, -ions, -iez, -aient'},
        {rule:'Irregular stems (same as futur simple)',example:'être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, vouloir→voudr-',translation:'',breakdown:'If you know the futur simple irregular stems, the conditional uses the same ones.'},
      ]},
      {type:'grammar',title:'Key Conditional Expressions',rules:[
        {rule:'Je voudrais = I would like',example:'Je voudrais un rendez-vous, s\'il vous plaît.',translation:'I would like an appointment, please.',breakdown:'Much more polite than "je veux" (I want). Use in all formal situations.'},
        {rule:'Je pourrais = I could',example:'Pourriez-vous répéter plus lentement?',translation:'Could you repeat more slowly?',breakdown:'"Pourriez-vous" is extremely polite — use in TEF oral when you need clarification.'},
        {rule:'Je devrais = I should',example:'Je devrais étudier plus.',translation:'I should study more.',breakdown:'"Devoir" → devrais. Expresses obligation/advice.'},
        {rule:'Ce serait = It would be',example:'Ce serait formidable d\'obtenir ma résidence.',translation:'It would be wonderful to get my residency.',breakdown:'"Serait" from être → ser-.'},
        {rule:'Il faudrait = It would be necessary',example:'Il faudrait parler français couramment pour ce poste.',translation:'It would be necessary to speak French fluently for this position.',breakdown:'"Falloir" → faudrait. Impersonal.'},
      ]},
      {type:'grammar',title:'Si + Imparfait + Conditionnel — Hypotheses',rules:[
        {rule:'Structure',example:'Si + imparfait → conditionnel',translation:'',breakdown:'If [condition], [result]. Both parts have specific tenses.'},
        {rule:'Example 1',example:'Si j\'habitais à Montréal, je parlerais français tous les jours.',translation:'If I lived in Montreal, I would speak French every day.',breakdown:'Si + j\'habitais (imparfait) → je parlerais (conditionnel)'},
        {rule:'Example 2',example:'Si j\'avais plus de temps, j\'étudierais davantage.',translation:'If I had more time, I would study more.',breakdown:'Si + j\'avais (imparfait) → j\'étudierais (conditionnel)'},
        {rule:'NEVER si + conditionnel',example:'WRONG: Si j\'aurais... / CORRECT: Si j\'avais...',translation:'',breakdown:'Never use conditionnel after "si" in this structure. Always imparfait after si.'},
      ]},
      {type:'tips',title:'TEF/TCF Tips',tips:[
        'In TEF oral, replace "je veux" with "je voudrais" — it sounds much more polished',
        '"Pourriez-vous parler plus lentement?" — use this if you don\'t understand the examiner',
        'The si + imparfait + conditionnel structure is tested in TEF written production at B1-B2',
        '"Je devrais" is useful for giving advice: "À votre place, je devrais..."',
        'Common TEF oral task: "Que feriez-vous si..." — practice answering with conditionnel',
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'"I would like an appointment" — Je _______ un rendez-vous.',options:['veux','voudrais','voudrai','voulais'],correct:1,explanation:'"Je voudrais" = I would like (conditional of vouloir). Much more polite than "je veux".'},
      {type:'multiple_choice',question:'"Could you repeat?" — _______ répéter?',options:['Vous pouvez','Vous pourriez','Vous pourrez','Vous pouviez'],correct:1,explanation:'"Pourriez-vous" = could you (conditional, formal). This is the polite way to ask.'},
      {type:'multiple_choice',question:'Complete the hypothesis: "Si j\'_______ plus de temps, j\'étudierais davantage."',options:['aurais','aurai','avais','ai'],correct:2,explanation:'Si + IMPARFAIT (j\'avais). NEVER si + conditionnel. Si j\'AVAIS → j\'étudierais.'},
      {type:'multiple_choice',question:'"I should speak French more" — Je _______ parler français davantage.',options:['devrais','devrai','devais','dois'],correct:0,explanation:'"Je devrais" = I should (conditional of devoir).'},
      {type:'multiple_choice',question:'What is the conditional of "faire" for "nous"?',options:['nous ferons','nous ferions','nous faisions','nous fassions'],correct:1,explanation:'faire → fer- (irregular stem) + -ions = nous FERIONS.'},
    ],
    quiz:[
      {question:'What tense goes after "si" in a hypothesis?',options:['Conditionnel','Futur simple','Imparfait','Présent'],correct:2,explanation:'Si + IMPARFAIT → conditionnel. NEVER si + conditionnel.'},
      {question:'"It would be wonderful" in French:',options:['C\'est formidable','Ce sera formidable','Ce serait formidable','C\'était formidable'],correct:2,explanation:'"Ce serait" = it would be (conditional of être: ser- + -ait).'},
      {question:'What is the most polite way to say "I want" in French?',options:['Je veux','Je désire','Je voudrais','Je voudrai'],correct:2,explanation:'"Je voudrais" (conditional) is more polite than "je veux" (present). Use always in formal situations.'},
      {question:'Complete: "Si vous _______ (étudier) plus, vous réussiriez."',options:['étudierez','étudiez','étudiiez','étudiiez'],correct:2,explanation:'Si + imparfait: vous étudiiez. (étudier → nous étudions → stem: étudi- + -iez)'},
      {question:'"It would be necessary to..." in French:',options:['Il faut...','Il fallait...','Il faudrait...','Il faudra...'],correct:2,explanation:'"Il faudrait" = it would be necessary/one should. Conditional of "falloir".'},
    ]
  })
},
// ── B2 ───────────────────────────────────────────────────────────────────────
{
  level:'B2', sort_order:40, duration_min:50, xp_reward:110,
  title:'Advanced Subjunctive',
  description:'Master bien que, quoique, and other subjunctive triggers — essential for B2 written and oral TEF production.',
  content: JSON.stringify({
    intro:`The subjunctive (le subjonctif) is the mood that expresses doubt, emotion, necessity, and concession. At B2 level, you must use it correctly and confidently. TEF examiners specifically look for subjunctive usage as evidence of B2 proficiency. The most common errors are using the indicative where subjunctive is required.`,
    sections:[
      {type:'grammar',title:'How to Form the Subjunctive',rules:[
        {rule:'Step 1: Take the ils/elles present tense form',example:'parler → ils parlent | finir → ils finissent | prendre → ils prennent',translation:'',breakdown:''},
        {rule:'Step 2: Remove -ent',example:'parlent → parl- | finissent → finiss- | prennent → prenn-',translation:'',breakdown:''},
        {rule:'Step 3: Add subjunctive endings',example:'-e, -es, -e, -ions, -iez, -ent',translation:'',breakdown:'je parle, tu parles, il parle, nous parlions, vous parliez, ils parlent'},
        {rule:'Irregular subjunctives — must memorize',example:'être → sois/soit/soient | avoir → aie/ait/aient | aller → aille | faire → fasse | pouvoir → puisse | vouloir → veuille | savoir → sache',translation:'',breakdown:'These are the most common and must be memorized.'},
      ]},
      {type:'grammar',title:'When to Use the Subjunctive',rules:[
        {rule:'1. After expressions of necessity',example:'Il faut que vous parliez français. / Il est nécessaire que tu finisses.',translation:'It is necessary that you speak French. / It is necessary that you finish.',breakdown:'Il faut que, il est nécessaire que, il est important que'},
        {rule:'2. After expressions of emotion',example:'Je suis content que vous soyez ici. / Je regrette qu\'il ne puisse pas venir.',translation:'I am happy that you are here. / I regret that he cannot come.',breakdown:'Être content/heureux/triste/surpris que, regretter que'},
        {rule:'3. After expressions of doubt',example:'Je doute qu\'il soit bilingue. / Je ne pense pas que ce soit facile.',translation:'I doubt he is bilingual. / I don\'t think it\'s easy.',breakdown:'Douter que, ne pas penser que, ne pas croire que'},
        {rule:'4. After conjunctions of concession',example:'Bien que ce soit difficile, je persévère. / Quoiqu\'il fasse froid, je vais courir.',translation:'Although it is difficult, I persevere. / Although it is cold, I\'m going to run.',breakdown:'Bien que, quoique — always subjunctive'},
        {rule:'5. After conjunctions of purpose/condition',example:'Pour que vous compreniez. / À moins qu\'il ne vienne.',translation:'So that you understand. / Unless he comes.',breakdown:'Pour que, afin que, à moins que, avant que, bien que'},
      ]},
      {type:'vocabulary',title:'Key Subjunctive Triggers — Memorize These',items:[
        {fr:'Il faut que + subj.',en:'It is necessary that',pron:'',note:'Il faut que vous parliez français.'},
        {fr:'Bien que + subj.',en:'Although',pron:'',note:'Bien que ce soit difficile...'},
        {fr:'Quoique + subj.',en:'Even though',pron:'',note:'Quoiqu\'il soit fatigué...'},
        {fr:'Pour que + subj.',en:'So that / In order that',pron:'',note:'Je parle lentement pour que vous compreniez.'},
        {fr:'À moins que + subj.',en:'Unless',pron:'',note:'À moins qu\'il ne pleuve...'},
        {fr:'Avant que + subj.',en:'Before',pron:'',note:'Avant que vous partiez...'},
        {fr:'Je doute que + subj.',en:'I doubt that',pron:'',note:'Je doute qu\'il réussisse.'},
        {fr:'Je ne pense pas que + subj.',en:'I don\'t think that',pron:'',note:'Je ne pense pas que ce soit vrai.'},
        {fr:'Je suis content(e) que + subj.',en:'I am happy that',pron:'',note:'Je suis content que vous soyez là.'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'Complete: "Il faut que vous _______ (parler) français."',options:['parlez','parliez','parleriez','parlerez'],correct:1,explanation:'"Il faut que" triggers subjunctive. Parler → vous parliez (subjunctive, same as imparfait for nous/vous).'},
      {type:'multiple_choice',question:'Complete: "Bien que ce _______ (être) difficile, je continue."',options:['est','soit','serait','était'],correct:1,explanation:'"Bien que" always triggers subjunctive. Être → soit (subjunctive).'},
      {type:'multiple_choice',question:'Complete: "Je doute qu\'il _______ (venir) à l\'heure."',options:['vient','viendra','vienne','venait'],correct:2,explanation:'"Douter que" triggers subjunctive. Venir → vienne (irregular subjunctive).'},
      {type:'multiple_choice',question:'Complete: "Je suis content que vous _______ (être) ici."',options:['êtes','soyez','serez','étiez'],correct:1,explanation:'"Être content que" triggers subjunctive. Être → vous soyez (irregular subjunctive).'},
      {type:'translate',question:'Translate: "Although it is cold, she goes jogging every morning."',answer:'Bien qu\'il fasse froid, elle fait du jogging chaque matin.',alternatives:['Quoiqu\'il fasse froid, elle fait du jogging tous les matins.'],explanation:'"Bien que" + subjunctive. Faire (weather) → fasse (subjunctive). The main clause uses present indicative.'},
    ],
    quiz:[
      {question:'What is the subjunctive of "être" for "il"?',options:['est','était','sera','soit'],correct:3,explanation:'"Soit" is the subjunctive of être for il/elle. Memorize: je sois, tu sois, il soit, nous soyons, vous soyez, ils soient.'},
      {question:'Which conjunction ALWAYS requires subjunctive?',options:['parce que','quand','bien que','si'],correct:2,explanation:'"Bien que" (although) always triggers subjunctive. "Parce que", "quand", "si" use indicative.'},
      {question:'Complete: "Il est important que tu _______ (finir) avant midi."',options:['finis','finiras','finisses','finissais'],correct:2,explanation:'"Il est important que" → subjunctive. Finir → tu finisses.'},
      {question:'"I don\'t think he is French" — Je ne pense pas qu\'il _______ français.',options:['est','soit','sera','serait'],correct:1,explanation:'"Ne pas penser que" triggers subjunctive. Être → soit.'},
      {question:'What is the subjunctive of "avoir" for "elle"?',options:['a','avait','aura','ait'],correct:3,explanation:'"Ait" is the subjunctive of avoir for il/elle. Memorize: j\'aie, tu aies, il/elle ait.'},
    ]
  })
},
{
  level:'B2', sort_order:41, duration_min:60, xp_reward:130,
  title:'TCF Canada: Exam Strategy & Practice',
  description:'Full TCF Canada format breakdown, timing strategy, and practice for all four sections.',
  content: JSON.stringify({
    intro:`The TCF Canada (Test de Connaissance du Français pour le Canada) is one of the two main French exams accepted for Canadian immigration (along with TEF Canada). It is administered by France Éducation International and accepted by IRCC for Express Entry and provincial nominees. Understanding the exact format and strategy is as important as knowing French.`,
    sections:[
      {type:'grammar',title:'TCF Canada Format',rules:[
        {rule:'Listening Comprehension (Compréhension de l\'oral)',example:'29 questions | 3 parts | ~25 minutes | increasing difficulty',translation:'',breakdown:'Part 1: Short exchanges (A1-A2). Part 2: Documents (A2-B1). Part 3: Long passages (B1-C2).'},
        {rule:'Reading Comprehension (Compréhension des écrits)',example:'29 questions | 3 parts | 45 minutes',translation:'',breakdown:'Part 1: Short texts (A1-B1). Part 2: Medium texts (B1-B2). Part 3: Long complex texts (B2-C2).'},
        {rule:'Written Production (Expression écrite)',example:'2 tasks | 60 minutes',translation:'',breakdown:'Task 1: ~80-100 words informal. Task 2: ~200 words formal/argumentative.'},
        {rule:'Oral Production (Expression orale)',example:'3 tasks | 15 min prep + 15 min recording',translation:'',breakdown:'Task 1: Describe a document/image. Task 2: Give your opinion on a topic. Task 3: Argue a position.'},
      ]},
      {type:'grammar',title:'Scoring & What You Need',rules:[
        {rule:'TCF scale',example:'0-699 points → corresponds to CEFR levels A1-C2',translation:'',breakdown:'Each section scored separately. IRCC uses the lowest score.'},
        {rule:'For Express Entry (Federal)',example:'Usually need CLB 7 = approximately TCF score of 458-524',translation:'',breakdown:'CLB = Canadian Language Benchmark. CLB 7 is a common threshold.'},
        {rule:'For Provincial Nominee Programs',example:'Requirements vary by province — check specific PNP requirements',translation:'',breakdown:'Ontario (OINP), Quebec (different system — use TEQ), BC (BC PNP), etc.'},
        {rule:'Score validity',example:'TCF results are valid for 2 years from test date',translation:'',breakdown:'Plan your test date accordingly — don\'t take it too early.'},
      ]},
      {type:'tips',title:'TCF Strategy — Section by Section',tips:[
        'LISTENING: You hear each audio only ONCE. Read the questions BEFORE the audio plays. Focus on what is asked, not everything said.',
        'LISTENING: In Part 3, note-taking is allowed — jot key words, numbers, names as you listen.',
        'READING: Skim the text first for general idea, then read questions, then find specific answers. Never read every word first.',
        'READING: Use elimination strategy — cross out clearly wrong answers immediately.',
        'WRITING: In Task 1 (informal), use "tu" throughout. In Task 2 (formal), use "vous" and the full letter format.',
        'WRITING: Plan before writing — 5 minutes of planning saves time and improves coherence.',
        'ORAL: The 15-minute preparation time is precious — use it fully. Write an outline, not full sentences.',
        'ORAL: Speak continuously — pauses hurt your score. Use fillers: "Eh bien...", "Il me semble que...", "C\'est-à-dire..."',
        'ORAL: Structure every answer: introduction + 2-3 arguments + conclusion. Even for Task 1 (image description).',
      ]},
      {type:'dialogue',title:'Sample TCF Oral Task 2 — Practice Response',lines:[
        {speaker:'Prompt',fr:'Pensez-vous que les immigrants devraient apprendre le français pour s\'intégrer au Canada?',en:'Do you think immigrants should learn French to integrate in Canada?'},
        {speaker:'Model response',fr:'À mon avis, la maîtrise du français est fondamentale pour une intégration réussie au Canada, et ce pour plusieurs raisons.',en:'In my opinion, mastery of French is fundamental for successful integration in Canada, and this for several reasons.'},
        {speaker:'',fr:'Premièrement, le français est l\'une des deux langues officielles du pays. Être bilingue ouvre des portes sur le marché du travail, notamment dans la fonction publique fédérale.',en:'First, French is one of the two official languages of the country. Being bilingual opens doors in the job market, especially in the federal public service.'},
        {speaker:'',fr:'Deuxièmement, maîtriser le français permet de tisser des liens avec la communauté francophone, ce qui facilite l\'intégration sociale.',en:'Second, mastering French allows one to build ties with the francophone community, which facilitates social integration.'},
        {speaker:'',fr:'Cependant, il faut reconnaître que l\'apprentissage d\'une langue prend du temps. C\'est pourquoi le gouvernement devrait offrir davantage de ressources accessibles.',en:'However, one must acknowledge that learning a language takes time. This is why the government should offer more accessible resources.'},
        {speaker:'',fr:'Pour conclure, bien que ce soit un défi, l\'apprentissage du français représente un investissement précieux pour l\'avenir au Canada.',en:'To conclude, although it is a challenge, learning French represents a precious investment for the future in Canada.'},
      ]},
      {type:'vocabulary',title:'Useful Oral Production Phrases',items:[
        {fr:'Eh bien...',en:'Well...',pron:'ay BYAN',note:'Filler to buy time without saying "um"'},
        {fr:'C\'est-à-dire...',en:'That is to say...',pron:'say ta DEER',note:'To clarify or expand on an idea'},
        {fr:'En d\'autres termes...',en:'In other words...',pron:'on doh-truh TAIRM',note:'To rephrase'},
        {fr:'Pour ce qui est de...',en:'As for / Regarding...',pron:'',note:'Elegant way to introduce a subtopic'},
        {fr:'Il convient de noter que...',en:'It is worth noting that...',pron:'',note:'Formal, shows sophistication'},
        {fr:'Permettez-moi d\'ajouter que...',en:'Allow me to add that...',pron:'',note:'Oral production filler phrase'},
        {fr:'Si je comprends bien...',en:'If I understand correctly...',pron:'',note:'Useful if unsure about the task'},
      ]},
    ],
    exercises:[
      {type:'multiple_choice',question:'How many questions are in the TCF Canada listening section?',options:['20','25','29','40'],correct:2,explanation:'TCF Canada listening: 29 questions in 3 parts of increasing difficulty.'},
      {type:'multiple_choice',question:'For TCF oral production, how long is the preparation time?',options:['5 minutes','10 minutes','15 minutes','30 minutes'],correct:2,explanation:'15 minutes preparation + 15 minutes recording = 30 minutes total for oral production.'},
      {type:'multiple_choice',question:'How long are TCF Canada results valid?',options:['1 year','2 years','3 years','5 years'],correct:1,explanation:'TCF results are valid for 2 years from the test date. Plan accordingly!'},
      {type:'multiple_choice',question:'In TCF listening, how many times do you hear each audio?',options:['Once','Twice','Three times','As many times as needed'],correct:0,explanation:'You hear each audio ONLY ONCE in TCF listening. This is why reading questions before the audio plays is critical.'},
      {type:'multiple_choice',question:'Which filler phrase is best for buying time in oral production?',options:['"Um..."','"Eh bien..."','"Je sais pas..."','"Comment dire..."'],correct:1,explanation:'"Eh bien..." is an elegant French filler. "Um" is English. "Je sais pas" is too informal. "Comment dire" is okay but less smooth.'},
    ],
    quiz:[
      {question:'What does CLB stand for?',options:['Canadian Language Benchmark','Canadian Learning Base','Certified Language Bilingual','Canadian Linguistic Bureau'],correct:0,explanation:'CLB = Canadian Language Benchmark. The scale used by IRCC to evaluate language proficiency.'},
      {question:'In TCF written Task 2, approximately how many words do you write?',options:['50-80','80-100','150-200','300-400'],correct:2,explanation:'Task 2 requires approximately 180-200 words of formal writing.'},
      {question:'What is the best strategy for TCF reading comprehension?',options:['Read every word carefully first','Skim first, then read questions, then find answers','Read questions first, then read the text','Guess if unsure'],correct:1,explanation:'Skim → questions → specific answers. Never read every word first — it wastes time.'},
      {question:'For TCF oral Task 2 (opinion), what structure should you use?',options:['Just speak freely','Introduction + 2-3 arguments + conclusion','Only give one argument in detail','Ask the examiner questions'],correct:1,explanation:'Always structure: introduction + 2-3 arguments + conclusion. Even under time pressure.'},
      {question:'TCF Canada results are accepted by:',options:['IRCC only','Provinces only','Both IRCC and most provinces','Quebec only'],correct:2,explanation:'TCF Canada is accepted by IRCC for Express Entry and by most provincial nominee programs (except Quebec which has its own system).'},
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
