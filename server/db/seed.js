// server/db/seed.js
// Seeded from Osama's actual class notes (A1 → prepositions)

const DB = require('./database');

function seedIfEmpty() {
  if (DB.findAll('lessons').length > 0) return;
  console.log('🌱 Seeding Osama\'s class notes as lessons...');

  const lessons = [

// ─────────────────────────────────────────────────────────────────
// LESSON 1 — Greetings & Identity
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 1, duration_min: 25, xp_reward: 50,
  title: 'Greetings & Identity',
  description: 'Salutations, how to introduce yourself, ask/answer identity questions.',
  content: JSON.stringify({
    intro: `The first things you need in any French conversation: how to say hello, goodbye, introduce yourself, and answer basic questions about who you are. These also appear in every TEF/TCF oral exam opener.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Salutations',
        items: [
          { fr: 'Bonjour', en: 'Hello / Good day', pron: 'bohn-zhoor', note: 'Formal & informal — any time of day' },
          { fr: 'Bonsoir', en: 'Good evening', pron: 'bohn-swar', note: 'Use after ~6pm' },
          { fr: 'Salut', en: 'Hi / Bye (informal)', pron: 'sah-loo', note: 'Friends only — never with strangers or officials' },
          { fr: 'Au revoir', en: 'Goodbye', pron: 'oh ruh-vwahr', note: 'Any context' },
          { fr: 'À bientôt', en: 'See you soon', pron: 'ah bee-en-toe', note: '' },
          { fr: 'Bonne nuit', en: 'Good night', pron: 'bun nwee', note: 'Before bed' },
          { fr: 'À demain', en: 'See you tomorrow', pron: 'ah duh-man', note: '' },
          { fr: 'Enchanté(e)', en: 'Nice to meet you', pron: 'ahn-shahn-tay', note: 'Add -e if you are female' },
        ]
      },
      {
        type: 'grammar',
        title: 'Identity Questions & Answers',
        rules: [
          { rule: 'What is your name?', example: 'Comment tu t\'appelles ? → Je m\'appelle Osama.', translation: '', breakdown: 'Formal version: Comment vous appelez-vous ?' },
          { rule: 'How are you?', example: 'Comment ça va ? → Ça va bien, merci. / Pas mal.', translation: '', breakdown: 'Formal: Comment allez-vous ? → Je vais bien, merci.' },
          { rule: 'Where are you from?', example: 'D\'où viens-tu ? → Je viens du Canada.', translation: '', breakdown: '' },
          { rule: 'What is your nationality?', example: 'Quelle est ta nationalité ? → Je suis canadien(ne).', translation: '', breakdown: 'Nationalities are lowercase in French' },
          { rule: 'How old are you?', example: 'Quel âge as-tu ? → J\'ai vingt ans.', translation: '', breakdown: '⚠️ Use AVOIR not être. Never say "Je suis vingt ans".' },
          { rule: 'What do you do?', example: 'Qu\'est-ce que tu fais ? → Je suis étudiant(e).', translation: '', breakdown: '' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Nationalities (change ending for feminine)',
        items: [
          { fr: 'canadien / canadienne', en: 'Canadian', pron: '', note: '' },
          { fr: 'français / française', en: 'French', pron: '', note: 'Lowercase when used as adjective' },
          { fr: 'anglais / anglaise', en: 'English', pron: '', note: '' },
          { fr: 'marocain / marocaine', en: 'Moroccan', pron: '', note: '' },
          { fr: 'espagnol / espagnole', en: 'Spanish', pron: '', note: '' },
        ]
      },
      {
        type: 'tips',
        title: 'TEF/TCF Tips',
        tips: [
          'Always greet the examiner with "Bonjour" + "Comment allez-vous?" — never "Salut"',
          'Age uses AVOIR: J\'ai vingt ans — this is a classic exam trap',
          'Nationalities are lowercase as adjectives: je suis canadien — but uppercase as nouns: un Canadien',
          'Bounce questions back: "Très bien, merci. Et vous?" shows conversational awareness',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'You meet your French teacher for the first time. You say:', options: ['Salut!', 'Bonjour, enchanté(e)!', 'Coucou!', 'Hey!'], correct: 1, explanation: '"Bonjour, enchanté(e)" is formal and appropriate for a first meeting. "Salut" is too informal.' },
      { type: 'multiple_choice', question: 'How do you say "How old are you?" in French?', options: ['Tu es combien d\'ans?', 'Quel âge es-tu?', 'Quel âge as-tu?', 'Tu as quel année?'], correct: 2, explanation: 'French uses AVOIR (to have) for age: Quel âge as-tu? Never use être.' },
      { type: 'fill_blank', question: 'Complete: "Bonjour, je _______ appelle Osama."', options: ['me', 'm\'', 'te', 'se'], correct: 1, explanation: '"Je m\'appelle" — me contracts to m\' before the vowel in appelle (elision).' },
      { type: 'multiple_choice', question: 'A colleague asks "Comment ça va?" You reply "Bien, merci." What should you add?', options: ['Au revoir!', 'Et toi?', 'Bonjour!', 'Pardon'], correct: 1, explanation: 'Always bounce the question back with "Et toi?" (informal) or "Et vous?" (formal).' },
      { type: 'translate', question: 'Translate: "My name is Osama, I am from Canada."', answer: 'Je m\'appelle Osama, je viens du Canada.', alternatives: ['Je m\'appelle Osama et je viens du Canada.'], explanation: 'Je m\'appelle = my name is. Je viens de + country = I am from.' },
      { type: 'multiple_choice', question: 'It\'s 8pm. You leave a meeting. You say:', options: ['Bonne journée!', 'Bonjour!', 'Bonne soirée!', 'À demain!'], correct: 2, explanation: '"Bonne soirée" is the correct parting phrase in the evening. "Bonne journée" is for daytime.' },
    ],
    quiz: [
      { question: 'How do you say "I am 30 years old" in French?', options: ['Je suis trente ans.', 'J\'ai trente ans.', 'J\'ai trente années.', 'Je suis âgé trente.'], correct: 1, explanation: 'Age uses AVOIR: J\'ai trente ans.' },
      { question: '"Enchanté(e)" means:', options: ['Goodbye', 'Please', 'Nice to meet you', 'Excuse me'], correct: 2, explanation: 'Enchanté(e) = pleased/nice to meet you. Said when meeting someone for the first time.' },
      { question: 'Nationalities in French are:', options: ['Always capitalised', 'Never capitalised', 'Capitalised as adjectives only', 'Capitalised as nouns only'], correct: 3, explanation: 'Lowercase as adjectives (je suis canadien), uppercase as nouns (un Canadien).' },
      { question: '"D\'où viens-tu?" means:', options: ['Where do you work?', 'Where are you going?', 'Where are you from?', 'Where do you live?'], correct: 2, explanation: 'D\'où = from where. Viens-tu = do you come. → Where are you from?' },
      { question: 'Which is the formal version of "Comment tu t\'appelles?"', options: ['Comment vous appelez-vous?', 'C\'est quoi ton nom?', 'Tu as quel nom?', 'Comment t\'appelles-tu vous?'], correct: 0, explanation: 'Formal = vous form: Comment vous appelez-vous?' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 2 — Days of the Week
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 2, duration_min: 20, xp_reward: 40,
  title: 'Days of the Week',
  description: 'Les jours de la semaine — names, spelling, and how to use them in sentences.',
  content: JSON.stringify({
    intro: `Days of the week are used constantly — in dates, appointments, schedules, and conversation. In French they are never capitalised and work differently from English in some situations.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Les jours de la semaine',
        items: [
          { fr: 'lundi', en: 'Monday', pron: 'lun-dee', note: 'Never capitalised in French' },
          { fr: 'mardi', en: 'Tuesday', pron: 'mar-dee', note: '' },
          { fr: 'mercredi', en: 'Wednesday', pron: 'mehr-cruh-dee', note: '' },
          { fr: 'jeudi', en: 'Thursday', pron: 'zhuh-dee', note: '' },
          { fr: 'vendredi', en: 'Friday', pron: 'von-druh-dee', note: '' },
          { fr: 'samedi', en: 'Saturday', pron: 'sam-dee', note: 'Mon jour préféré !' },
          { fr: 'dimanche', en: 'Sunday', pron: 'dee-monsh', note: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'How to use days in sentences',
        rules: [
          { rule: 'Say what day it is today', example: 'Aujourd\'hui, c\'est lundi.', translation: 'Today is Monday.', breakdown: '' },
          { rule: 'Day before / after', example: 'Quel jour vient avant samedi ? → vendredi', translation: 'Which day comes before Saturday?', breakdown: '' },
          { rule: 'Favourite day', example: 'Quel est ton jour préféré ? → Mon jour préféré est samedi.', translation: '', breakdown: '' },
          { rule: 'On a specific day (no article)', example: 'Le cours est lundi.', translation: 'The class is on Monday.', breakdown: 'No "on" translation needed — just say the day' },
          { rule: 'Every week on that day (use le)', example: 'Le cours est le lundi.', translation: 'The class is every Monday.', breakdown: 'Le + day = every/each that day' },
        ]
      },
      {
        type: 'tips',
        title: 'Key Rules',
        tips: [
          'Days are NEVER capitalised in French: lundi not Lundi',
          'No article for a single occurrence: "Je travaille lundi" = I work on Monday',
          '"Le lundi" (with article) = every Monday / Mondays in general',
          'The week starts on Monday (lundi) in France, not Sunday',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Quel jour vient après mardi ?', options: ['lundi', 'mercredi', 'jeudi', 'vendredi'], correct: 1, explanation: 'The order is: lundi, mardi, MERCREDI, jeudi, vendredi, samedi, dimanche.' },
      { type: 'multiple_choice', question: 'How do you write "Today is Friday" in French?', options: ['Aujourd\'hui, c\'est Vendredi.', 'Aujourd\'hui, c\'est vendredi.', 'Aujourd\'hui est vendredi.', 'Aujourd\'hui, vendredi.'], correct: 1, explanation: 'Days are not capitalised. The correct phrase is "Aujourd\'hui, c\'est vendredi."' },
      { type: 'translate', question: 'Translate: "My favourite day is Saturday."', answer: 'Mon jour préféré est samedi.', alternatives: ['Mon jour préféré, c\'est samedi.'], explanation: 'Mon jour préféré = my favourite day. est = is. samedi = Saturday (not capitalised).' },
      { type: 'multiple_choice', question: '"Le lundi, je travaille." means:', options: ['On Monday I work (just once)', 'I work every Monday', 'I worked last Monday', 'I will work on Monday'], correct: 1, explanation: '"Le" + day = every/each occurrence of that day. Without "le" it refers to a single Monday.' },
      { type: 'multiple_choice', question: 'Quel jour vient avant mercredi ?', options: ['jeudi', 'vendredi', 'mardi', 'lundi'], correct: 2, explanation: 'The order is: lundi, MARDI, mercredi. So mardi comes before mercredi.' },
    ],
    quiz: [
      { question: 'How do you write "Wednesday" in French?', options: ['Mercredi', 'mercredi', 'mercrédi', 'Mercredi'], correct: 1, explanation: 'Days are never capitalised in French: mercredi.' },
      { question: '"Dimanche" is which day?', options: ['Saturday', 'Sunday', 'Friday', 'Monday'], correct: 1, explanation: 'Dimanche = Sunday.' },
      { question: 'Which day comes after jeudi?', options: ['mercredi', 'samedi', 'vendredi', 'lundi'], correct: 2, explanation: 'jeudi → VENDREDI → samedi.' },
      { question: '"Le mardi, elle a cours de français." means:', options: ['She had class last Tuesday', 'She has French class every Tuesday', 'She will have class on a Tuesday', 'She has class on Tuesday (just once)'], correct: 1, explanation: '"Le" + day = every occurrence of that day.' },
      { question: 'How many days are in the French week starting from Monday?', options: ['5', '6', '7', '8'], correct: 2, explanation: '7 days: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 3 — Numbers 1–100
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 3, duration_min: 30, xp_reward: 55,
  title: 'Numbers 1–100',
  description: 'Les chiffres — including the tricky 70s, 80s and 90s. Essential for dates, age, prices.',
  content: JSON.stringify({
    intro: `Numbers are used everywhere — age, prices, addresses, dates, times. The 70–99 range is uniquely French and trips up every beginner. Master the logic and you'll never forget it.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Numbers 1–20 (must memorise individually)',
        items: [
          { fr: 'un / une', en: '1', pron: 'uh(n)', note: 'Masculine / feminine' },
          { fr: 'deux', en: '2', pron: 'duh', note: '' },
          { fr: 'trois', en: '3', pron: 'trwah', note: '' },
          { fr: 'quatre', en: '4', pron: 'katr', note: '' },
          { fr: 'cinq', en: '5', pron: 'sank', note: '' },
          { fr: 'six', en: '6', pron: 'sees', note: '' },
          { fr: 'sept', en: '7', pron: 'set', note: '' },
          { fr: 'huit', en: '8', pron: 'weet', note: '' },
          { fr: 'neuf', en: '9', pron: 'nuhf', note: '' },
          { fr: 'dix', en: '10', pron: 'dees', note: '' },
          { fr: 'onze', en: '11', pron: 'onz', note: '' },
          { fr: 'douze', en: '12', pron: 'dooz', note: '' },
          { fr: 'treize', en: '13', pron: 'trehz', note: '' },
          { fr: 'quatorze', en: '14', pron: 'ka-torz', note: '' },
          { fr: 'quinze', en: '15', pron: 'kanz', note: '' },
          { fr: 'seize', en: '16', pron: 'sehz', note: '' },
          { fr: 'dix-sept', en: '17', pron: 'dees-set', note: '10+7' },
          { fr: 'dix-huit', en: '18', pron: 'dees-wheet', note: '10+8' },
          { fr: 'dix-neuf', en: '19', pron: 'dees-nuhf', note: '10+9' },
          { fr: 'vingt', en: '20', pron: 'van', note: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Tens 30–60 (regular pattern)',
        rules: [
          { rule: '30', example: 'trente — trente et un, trente-deux…', translation: '', breakdown: '' },
          { rule: '40', example: 'quarante — quarante et un…', translation: '', breakdown: '' },
          { rule: '50', example: 'cinquante', translation: '', breakdown: '' },
          { rule: '60', example: 'soixante — soixante et un…', translation: '', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: '⚠️ The tricky part: 70–99',
        rules: [
          { rule: '70 = 60 + 10', example: 'soixante-dix', translation: '70', breakdown: '71 = soixante et onze, 72 = soixante-douze … 79 = soixante-dix-neuf' },
          { rule: '80 = 4 × 20', example: 'quatre-vingts', translation: '80', breakdown: '81 = quatre-vingt-un (no "et"!), 82 = quatre-vingt-deux…' },
          { rule: '90 = 80 + 10', example: 'quatre-vingt-dix', translation: '90', breakdown: '91 = quatre-vingt-onze … 99 = quatre-vingt-dix-neuf' },
          { rule: '100', example: 'cent', translation: '100', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tricks',
        tips: [
          '70s: think "sixty-ten, sixty-eleven…" — soixante + the teens',
          '80s: think "four-twenties" — quatre-vingts (like "four score" in old English)',
          '90s: think "four-twenties-ten, four-twenties-eleven…"',
          'No "et" in 81, 91 — only trente et un, quarante et un, etc. have "et"',
          '80 (quatre-vingts) has an s. 81+ (quatre-vingt-un…) drops the s.',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'How do you say 75 in French?', options: ['soixante-cinq', 'soixante-quinze', 'septante-cinq', 'quatre-vingt-cinq'], correct: 1, explanation: '75 = 60 + 15 = soixante-quinze.' },
      { type: 'multiple_choice', question: 'How do you say 80 in French?', options: ['huitante', 'octante', 'quatre-vingts', 'quatre-vingt'], correct: 2, explanation: '80 = quatre-vingts (4 × 20). Note the -s at the end.' },
      { type: 'multiple_choice', question: 'How do you say 91 in French?', options: ['quatre-vingt-onze', 'quatre-vingt-et-onze', 'nonante-un', 'soixante-dix-onze'], correct: 0, explanation: '91 = 80 + 11 = quatre-vingt-onze. No "et" after vingt.' },
      { type: 'translate', question: 'Write the number 67 in French words.', answer: 'soixante-sept', alternatives: [], explanation: '67 = 60 + 7 = soixante-sept.' },
      { type: 'multiple_choice', question: '"J\'ai quatre-vingt-deux ans." means:', options: ['I am 72 years old.', 'I am 82 years old.', 'I am 92 years old.', 'I am 80 years old.'], correct: 1, explanation: 'quatre-vingt-deux = 4×20+2 = 82.' },
      { type: 'translate', question: 'Write 99 in French words.', answer: 'quatre-vingt-dix-neuf', alternatives: [], explanation: '99 = 80 + 19 = quatre-vingt-dix-neuf.' },
    ],
    quiz: [
      { question: 'What is "soixante-dix" in numbers?', options: ['60', '67', '70', '76'], correct: 2, explanation: 'soixante-dix = 60 + 10 = 70.' },
      { question: 'How do you say 81 in French?', options: ['quatre-vingts-un', 'quatre-vingt-et-un', 'quatre-vingt-un', 'huitante-un'], correct: 2, explanation: '81 = quatre-vingt-un. No "s" on vingt when followed by a number, no "et".' },
      { question: 'Which number is "quatre-vingt-quinze"?', options: ['85', '90', '95', '99'], correct: 2, explanation: 'quatre-vingt-quinze = 80 + 15 = 95.' },
      { question: '"trente et un" is:', options: ['13', '30', '31', '41'], correct: 2, explanation: 'trente = 30, et un = and one → 31.' },
      { question: '100 in French is:', options: ['mille', 'cent', 'centi', 'cents'], correct: 1, explanation: '100 = cent.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 4 — Articles & Gender
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 4, duration_min: 30, xp_reward: 55,
  title: 'Articles & Gender',
  description: 'le, la, l\', les, un, une, des — and how to work out the gender of French nouns.',
  content: JSON.stringify({
    intro: `Every French noun has a gender — masculine or feminine — and this affects the article you use. There is no perfect rule, but there are patterns. Mastering articles is foundational for everything else in French grammar.`,
    sections: [
      {
        type: 'grammar',
        title: 'Definite Articles — "the"',
        rules: [
          { rule: 'le', example: 'le livre', translation: 'the book (masculine singular)', breakdown: '' },
          { rule: 'la', example: 'la table', translation: 'the table (feminine singular)', breakdown: '' },
          { rule: 'l\'', example: 'l\'hôtel / l\'arbre', translation: 'the hotel / the tree (before vowel or mute h)', breakdown: '' },
          { rule: 'les', example: 'les livres', translation: 'the books (plural — all genders)', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Indefinite Articles — "a / an / some"',
        rules: [
          { rule: 'un', example: 'un stylo', translation: 'a pen (masculine singular)', breakdown: '' },
          { rule: 'une', example: 'une table', translation: 'a table (feminine singular)', breakdown: '' },
          { rule: 'des', example: 'des livres', translation: 'some books (plural)', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Gender patterns (helpful but not perfect)',
        rules: [
          { rule: 'Often feminine', example: 'Words ending in -e: table, maison, bouteille', translation: '', breakdown: '' },
          { rule: 'Often feminine', example: 'Words ending in -tion: nation, organisation', translation: '', breakdown: '' },
          { rule: 'Often masculine', example: 'Words ending in -age: voyage, fromage', translation: '', breakdown: '' },
          { rule: 'Use l\' before vowel or mute h', example: 'l\'été (summer), l\'hôpital (hospital)', translation: '', breakdown: 'Even if feminine: l\'école (feminine)' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Common nouns with articles (drinks & objects from notes)',
        items: [
          { fr: 'un stylo', en: 'a pen', pron: 'stee-lo', note: 'masculine' },
          { fr: 'un livre', en: 'a book', pron: 'leev-ruh', note: 'masculine' },
          { fr: 'une table', en: 'a table', pron: 'tah-bluh', note: 'feminine' },
          { fr: 'une chaise', en: 'a chair', pron: 'shez', note: 'feminine' },
          { fr: 'l\'eau (de l\'eau)', en: 'water', pron: 'oh', note: 'feminine — de l\'eau' },
          { fr: 'un café', en: 'a coffee', pron: 'kah-fay', note: 'masculine' },
          { fr: 'un thé', en: 'a tea', pron: 'tay', note: 'masculine' },
          { fr: 'du lait', en: 'milk', pron: 'lay', note: 'masculine (partitive du)' },
          { fr: 'du vin', en: 'wine', pron: 'van', note: 'masculine (partitive du)' },
          { fr: 'une bière', en: 'a beer', pron: 'byair', note: 'feminine' },
          { fr: 'un croissant', en: 'a croissant', pron: 'kwa-sahn', note: 'masculine' },
          { fr: 'une maison', en: 'a house', pron: 'meh-zon', note: 'feminine' },
        ]
      },
      {
        type: 'tips',
        title: 'Tips',
        tips: [
          'Always learn the article WITH the noun — not "livre" but "un livre"',
          'l\' is used before any vowel sound regardless of gender',
          'The gender of a noun never changes — it\'s fixed',
          'des (plural indefinite) disappears after negation: Je n\'ai pas de livres.',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Which article goes with "hôtel"?', options: ['le', 'la', 'l\'', 'un'], correct: 2, explanation: 'Hôtel starts with a vowel sound → l\'hôtel. (It\'s also masculine, so definite = l\'hôtel, indefinite = un hôtel.)' },
      { type: 'multiple_choice', question: 'Which article is correct? "___ table est grande."', options: ['Le', 'La', 'L\'', 'Les'], correct: 1, explanation: '"Table" is feminine → La table.' },
      { type: 'fill_blank', question: 'Choose the correct article: "J\'ai ___ stylo."', options: ['un', 'une', 'des', 'le'], correct: 0, explanation: '"Stylo" is masculine singular → un stylo (indefinite article).' },
      { type: 'multiple_choice', question: 'Words ending in -tion in French are usually:', options: ['masculine', 'feminine', 'neuter', 'it depends'], correct: 1, explanation: '-tion endings are almost always feminine: nation, organisation, information.' },
      { type: 'translate', question: 'Translate: "I have a book and some chairs."', answer: 'J\'ai un livre et des chaises.', alternatives: [], explanation: 'un livre (masc. singular), des chaises (plural indefinite).' },
    ],
    quiz: [
      { question: 'What is the article for "école" (school)?', options: ['le', 'la', 'l\'', 'les'], correct: 2, explanation: 'École starts with a vowel → l\'école (also feminine).' },
      { question: '"Les" is used for:', options: ['masculine singular', 'feminine singular', 'any plural', 'before vowels'], correct: 2, explanation: '"Les" is the definite article for all plural nouns regardless of gender.' },
      { question: 'Which ending is usually feminine?', options: ['-age', '-eur', '-tion', '-ment'], correct: 2, explanation: 'Words ending in -tion are almost always feminine.' },
      { question: 'Correct sentence?', options: ['J\'ai un eau.', 'Je bois de l\'eau.', 'Je bois le eau.', 'J\'ai une eau.'], correct: 1, explanation: '"Eau" is feminine and uses the partitive "de l\'" for an unspecified quantity: de l\'eau.' },
      { question: '"Un" is used for:', options: ['feminine singular nouns', 'masculine singular nouns', 'all plural nouns', 'nouns starting with a vowel'], correct: 1, explanation: '"Un" is the masculine singular indefinite article.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 5 — Possessive Adjectives
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 5, duration_min: 25, xp_reward: 50,
  title: 'Possessive Adjectives',
  description: 'Mon, ma, mes, ton, ta, tes… Agree with the NOUN, not the owner.',
  content: JSON.stringify({
    intro: `Possessive adjectives (my, your, his/her…) in French agree with the gender of the NOUN they describe — not the gender of the owner. This is the most important rule and the most common mistake.`,
    sections: [
      {
        type: 'grammar',
        title: 'The full possessive adjective table',
        rules: [
          { rule: 'Je (I)', example: 'mon (masc) / ma (fem) / mes (plural)', translation: 'my', breakdown: 'mon before any vowel: mon amie (not ma amie)' },
          { rule: 'Tu (you)', example: 'ton / ta / tes', translation: 'your (informal)', breakdown: 'ton before vowel: ton adresse' },
          { rule: 'Il/Elle (he/she)', example: 'son / sa / ses', translation: 'his / her', breakdown: 'son/sa = same form regardless of owner\'s gender' },
          { rule: 'Nous (we)', example: 'notre / notre / nos', translation: 'our', breakdown: '' },
          { rule: 'Vous (you pl.)', example: 'votre / votre / vos', translation: 'your (formal/plural)', breakdown: '' },
          { rule: 'Ils/Elles (they)', example: 'leur / leur / leurs', translation: 'their', breakdown: 'leurs (with s) for plural nouns' },
        ]
      },
      {
        type: 'grammar',
        title: 'The vowel rule — critical!',
        rules: [
          { rule: 'Before feminine noun starting with vowel or mute h', example: 'mon amie (not ma amie)', translation: 'my (female) friend', breakdown: 'Use mon/ton/son even for feminine nouns before a vowel' },
          { rule: 'Before feminine noun starting with vowel or mute h', example: 'ton adresse', translation: 'your address', breakdown: 'adresse is feminine but starts with a vowel → ton, not ta' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Examples from notes',
        items: [
          { fr: 'mon livre', en: 'my book', pron: '', note: 'livre is masculine → mon' },
          { fr: 'ma maison', en: 'my house', pron: '', note: 'maison is feminine → ma' },
          { fr: 'mes livres', en: 'my books', pron: '', note: 'plural → mes' },
          { fr: 'mon école', en: 'my school', pron: '', note: 'école is feminine but starts with vowel → mon' },
          { fr: 'son père', en: 'his/her father', pron: '', note: 'père is masculine → son (regardless of owner\'s gender)' },
          { fr: 'leur maison', en: 'their house', pron: '', note: 'singular noun → leur' },
          { fr: 'leurs enfants', en: 'their children', pron: '', note: 'plural noun → leurs (with s)' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Fill in: "___ livre" (my book — livre is masculine)', options: ['ma', 'mon', 'mes', 'sa'], correct: 1, explanation: 'Livre is masculine singular → mon.' },
      { type: 'multiple_choice', question: 'Fill in: "___ enfants" (their children — plural)', options: ['leur', 'leurs', 'son', 'ses'], correct: 1, explanation: 'Plural noun → leurs (with s).' },
      { type: 'multiple_choice', question: 'Fill in: "___ amie" (my female friend — amie starts with a vowel)', options: ['ma', 'mon', 'mes', 'sa'], correct: 1, explanation: 'Even though amie is feminine, it starts with a vowel → mon (not ma).' },
      { type: 'fill_blank', question: '"___ père travaille." Complete with "his/her father" (père = masculine).', options: ['Sa', 'Son', 'Ses', 'Leur'], correct: 1, explanation: 'Père is masculine → son père. Note: son = his OR her (no difference in French).' },
      { type: 'translate', question: 'Translate: "my house, your books, their school"', answer: 'ma maison, tes livres, leur école', alternatives: ['ma maison, vos livres, leur école'], explanation: 'maison (fem) = ma, livres (plural) = tes or vos, école (starts with vowel, fem) = leur.' },
    ],
    quiz: [
      { question: 'What is "her book" in French? (livre = masculine)', options: ['sa livre', 'son livre', 'ses livres', 'leur livre'], correct: 1, explanation: 'Livre is masculine → son. In French, son can mean his OR her.' },
      { question: '"Nos enfants" means:', options: ['Your children', 'Their children', 'Our children', 'My children'], correct: 2, explanation: 'nos = our (plural noun). Nous → nos.' },
      { question: 'Why do we say "mon amie" not "ma amie"?', options: ['amie is masculine', 'amie starts with a vowel', 'amie is plural', 'ma is only for objects'], correct: 1, explanation: 'Before a feminine noun starting with a vowel or mute h, use mon/ton/son instead of ma/ta/sa.' },
      { question: '"Vos" is the possessive for:', options: ['nous — plural nouns', 'vous — plural nouns', 'ils — plural nouns', 'tu — plural nouns'], correct: 1, explanation: 'Vous → votre (singular noun) / vos (plural noun).' },
      { question: '"Sa maison" — the owner is:', options: ['definitely male', 'definitely female', 'could be male or female', 'always plural'], correct: 2, explanation: 'Sa = his or her. French possessives agree with the noun, not the owner.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 6 — Months, Seasons & Dates
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 6, duration_min: 25, xp_reward: 50,
  title: 'Months, Seasons & Dates',
  description: 'Les mois, les saisons, les dates — essential for any date-related question on TEF/TCF.',
  content: JSON.stringify({
    intro: `Dates, birthdays, appointments — you need these in every real-life context. Key rule: months and seasons are lowercase in French, and dates use a different format from English.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Les mois (months)',
        items: [
          { fr: 'janvier', en: 'January', pron: 'zhon-vyay', note: 'Never capitalised' },
          { fr: 'février', en: 'February', pron: 'fay-vryay', note: '' },
          { fr: 'mars', en: 'March', pron: 'mars', note: '' },
          { fr: 'avril', en: 'April', pron: 'ah-vreel', note: '' },
          { fr: 'mai', en: 'May', pron: 'may', note: '' },
          { fr: 'juin', en: 'June', pron: 'zhwan', note: '' },
          { fr: 'juillet', en: 'July', pron: 'zhwee-yay', note: '' },
          { fr: 'août', en: 'August', pron: 'oot', note: '' },
          { fr: 'septembre', en: 'September', pron: 'sep-tom-bruh', note: '' },
          { fr: 'octobre', en: 'October', pron: 'ok-to-bruh', note: '' },
          { fr: 'novembre', en: 'November', pron: 'no-vom-bruh', note: '' },
          { fr: 'décembre', en: 'December', pron: 'day-som-bruh', note: '' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Les saisons (seasons)',
        items: [
          { fr: 'le printemps', en: 'spring', pron: '', note: 'au printemps' },
          { fr: 'l\'été', en: 'summer', pron: '', note: 'en été' },
          { fr: 'l\'automne', en: 'autumn', pron: '', note: 'en automne' },
          { fr: 'l\'hiver', en: 'winter', pron: '', note: 'en hiver' },
        ]
      },
      {
        type: 'grammar',
        title: 'Date format & birthday questions',
        rules: [
          { rule: 'Date format', example: 'le + number + month', translation: 'le quinze mars = 15 March', breakdown: 'Exception: the 1st = le premier (not le un)' },
          { rule: 'When is your birthday?', example: 'Quand est ton anniversaire ? → Mon anniversaire est le 5 mai.', translation: '', breakdown: '' },
          { rule: 'When were you born?', example: 'Tu es né(e) quand ? → Je suis né(e) le 10 juin 2000.', translation: '', breakdown: 'Add -e if female: née' },
          { rule: 'In which month?', example: 'En quel mois ? → En décembre.', translation: '', breakdown: 'Use "en" before months' },
        ]
      },
      {
        type: 'tips',
        title: 'Key rules',
        tips: [
          'Months and seasons are NEVER capitalised: en janvier, not en Janvier',
          'Use "en" before months and most seasons: en juillet, en été',
          'Exception: spring uses "au": au printemps',
          'Date format: le + cardinal number + month. Only the 1st uses "premier"',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'How do you say "in July" in French?', options: ['au juillet', 'en juillet', 'le juillet', 'de juillet'], correct: 1, explanation: 'Use "en" before months: en juillet.' },
      { type: 'multiple_choice', question: 'How do you say "March 1st" in French?', options: ['le un mars', 'le premier mars', 'le primo mars', 'mars premier'], correct: 1, explanation: 'The 1st uses "premier" not "un": le premier mars.' },
      { type: 'multiple_choice', question: '"En automne" means:', options: ['in spring', 'in summer', 'in autumn', 'in winter'], correct: 2, explanation: 'automne = autumn. en automne = in autumn.' },
      { type: 'translate', question: 'Translate: "My birthday is on June 15th."', answer: 'Mon anniversaire est le 15 juin.', alternatives: ['Mon anniversaire, c\'est le 15 juin.'], explanation: 'le + number + month. Months are not capitalised.' },
      { type: 'multiple_choice', question: '"Au printemps" means:', options: ['in summer', 'in winter', 'in spring', 'in autumn'], correct: 2, explanation: 'printemps = spring. Uniquely uses "au" (not "en").' },
    ],
    quiz: [
      { question: '"Août" is which month?', options: ['June', 'July', 'August', 'September'], correct: 2, explanation: 'août = August.' },
      { question: 'How do you say "in December"?', options: ['au décembre', 'en Décembre', 'en décembre', 'le décembre'], correct: 2, explanation: 'en + month (lowercase): en décembre.' },
      { question: 'What is special about "le premier"?', options: ['It means Monday', 'It\'s used for the 1st of the month', 'It means morning', 'It\'s used for January'], correct: 1, explanation: '"Le premier" = the 1st. All other dates use cardinal numbers.' },
      { question: '"Je suis née le 3 avril." — the speaker is:', options: ['male', 'female', 'could be either', 'a child'], correct: 1, explanation: '"née" (with extra e) = female. "né" (no e) = male.' },
      { question: '"Au printemps" — why "au" and not "en"?', options: ['Printemps is masculine', 'It\'s an exception for spring only', 'All seasons use au', 'Printemps starts with a consonant'], correct: 1, explanation: 'Spring (printemps) uses "au" — it\'s an exception. All other seasons use "en".' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 7 — Avoir & Être
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 7, duration_min: 30, xp_reward: 60,
  title: 'Core Verbs: Avoir & Être',
  description: 'The two most important verbs in French — conjugation, uses, and avoir expressions.',
  content: JSON.stringify({
    intro: `Avoir (to have) and être (to be) are the foundation of French. Both are irregular — you must memorise them. They are also auxiliary (helping) verbs used to form past tenses. Avoir is also used in expressions where English uses "to be".`,
    sections: [
      {
        type: 'grammar',
        title: 'Avoir — to have',
        rules: [
          { rule: 'Je / J\'', example: 'ai', translation: 'J\'ai un chien. (I have a dog.)', breakdown: '' },
          { rule: 'Tu', example: 'as', translation: 'Tu as faim ? (Are you hungry?)', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'a', translation: 'Elle a vingt ans. (She is twenty.)', breakdown: '' },
          { rule: 'Nous', example: 'avons', translation: 'Nous avons une voiture.', breakdown: '' },
          { rule: 'Vous', example: 'avez', translation: 'Vous avez raison. (You are right.)', breakdown: '' },
          { rule: 'Ils / Elles', example: 'ont', translation: 'Ils ont faim. (They are hungry.)', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Avoir expressions — learn these as fixed phrases',
        rules: [
          { rule: 'avoir faim', example: 'J\'ai faim.', translation: 'I am hungry.', breakdown: 'Literally: I have hunger' },
          { rule: 'avoir soif', example: 'Tu as soif ?', translation: 'Are you thirsty?', breakdown: '' },
          { rule: 'avoir froid', example: 'Il a froid.', translation: 'He is cold.', breakdown: '' },
          { rule: 'avoir chaud', example: 'Nous avons chaud.', translation: 'We are hot.', breakdown: '' },
          { rule: 'avoir raison', example: 'Vous avez raison.', translation: 'You are right.', breakdown: '' },
          { rule: 'avoir tort', example: 'Il a tort.', translation: 'He is wrong.', breakdown: '' },
          { rule: 'avoir ___ ans', example: 'J\'ai vingt ans.', translation: 'I am twenty years old.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Être — to be',
        rules: [
          { rule: 'Je', example: 'suis', translation: 'Je suis étudiant. (I am a student.)', breakdown: '' },
          { rule: 'Tu', example: 'es', translation: 'Tu es prêt ? (Are you ready?)', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'est', translation: 'Il est médecin. (He is a doctor.)', breakdown: '' },
          { rule: 'Nous', example: 'sommes', translation: 'Nous sommes ici. (We are here.)', breakdown: '' },
          { rule: 'Vous', example: 'êtes', translation: 'Vous êtes prêts ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'sont', translation: 'Elles sont jolies.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Tips',
        tips: [
          'Être and avoir are both irregular — no shortcuts, must memorise',
          'Both are auxiliary verbs used to form the passé composé (past tense)',
          'Use avoir for age: J\'ai vingt ans — NEVER "Je suis vingt ans"',
          'Avoir expressions use "avoir" where English uses "to be": avoir faim = to be hungry',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Nous ___ une voiture." Complete with avoir.', options: ['avons', 'avez', 'ont', 'a'], correct: 0, explanation: 'Nous → avons.' },
      { type: 'multiple_choice', question: '"Ils ___ faim." Complete with avoir.', options: ['a', 'avons', 'ont', 'avez'], correct: 2, explanation: 'Ils/Elles → ont.' },
      { type: 'multiple_choice', question: '"Vous ___ prêts ?" Complete with être.', options: ['sommes', 'êtes', 'est', 'sont'], correct: 1, explanation: 'Vous → êtes.' },
      { type: 'fill_blank', question: 'Complete: "J\'___ soif." (I am thirsty)', options: ['suis', 'est', 'ai', 'as'], correct: 2, explanation: '"Avoir soif" = to be thirsty. J\'ai soif (I have thirst → I am thirsty).' },
      { type: 'translate', question: 'Translate: "She is right and he is wrong."', answer: 'Elle a raison et il a tort.', alternatives: [], explanation: 'avoir raison = to be right, avoir tort = to be wrong. Both use avoir.' },
      { type: 'multiple_choice', question: '"Elles ___ jolies." Complete with être.', options: ['est', 'êtes', 'suis', 'sont'], correct: 3, explanation: 'Elles → sont.' },
    ],
    quiz: [
      { question: '"J\'ai vingt ans" — which verb is used?', options: ['être', 'avoir', 'aller', 'faire'], correct: 1, explanation: 'French uses avoir for age: J\'ai vingt ans.' },
      { question: '"Nous sommes ici" — which verb is this?', options: ['avoir', 'aller', 'être', 'faire'], correct: 2, explanation: 'sommes is the nous form of être.' },
      { question: 'What does "avoir tort" mean?', options: ['to be right', 'to be wrong', 'to be late', 'to be tired'], correct: 1, explanation: 'avoir tort = to be wrong. avoir raison = to be right.' },
      { question: '"Vous avez" comes from which verb?', options: ['être', 'aller', 'avoir', 'faire'], correct: 2, explanation: 'avez = vous form of avoir.' },
      { question: 'How do you say "They (feminine) are here"?', options: ['Ils sont ici.', 'Elles est ici.', 'Elles sont ici.', 'Ils est ici.'], correct: 2, explanation: 'Elles (feminine they) + sont (être, elles form).' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 8 — Aller & Near Future
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 8, duration_min: 25, xp_reward: 55,
  title: 'Aller & the Near Future',
  description: 'To go + aller + infinitive = the near future tense. One of the most useful constructions.',
  content: JSON.stringify({
    intro: `Aller (to go) is irregular and essential. Beyond meaning "to go", it creates the futur proche (near future): aller + infinitive = "going to do something". This is the most commonly used future tense in spoken French.`,
    sections: [
      {
        type: 'grammar',
        title: 'Aller — to go',
        rules: [
          { rule: 'Je', example: 'vais', translation: 'Je vais à l\'école. (I go to school.)', breakdown: '' },
          { rule: 'Tu', example: 'vas', translation: 'Tu vas bien ? (Are you well?)', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'va', translation: 'Elle va au café.', breakdown: '' },
          { rule: 'Nous', example: 'allons', translation: 'Nous allons au marché.', breakdown: '' },
          { rule: 'Vous', example: 'allez', translation: 'Vous allez où ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'vont', translation: 'Ils vont à la banque.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Near Future — aller + infinitive',
        rules: [
          { rule: 'Structure', example: 'aller (conjugated) + infinitive verb', translation: '= going to do something', breakdown: '' },
          { rule: 'Example 1', example: 'Je vais manger.', translation: 'I am going to eat.', breakdown: '' },
          { rule: 'Example 2', example: 'Nous allons partir.', translation: 'We are going to leave.', breakdown: '' },
          { rule: 'Example 3', example: 'Elle va étudier demain.', translation: 'She is going to study tomorrow.', breakdown: '' },
          { rule: 'Negative', example: 'Je ne vais pas travailler.', translation: 'I am not going to work.', breakdown: 'ne...pas wraps around the aller form' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Elle ___ au café." Complete with aller.', options: ['vais', 'vas', 'va', 'vont'], correct: 2, explanation: 'Il/Elle/On → va.' },
      { type: 'multiple_choice', question: '"Nous ___ au marché." Complete with aller.', options: ['vont', 'allez', 'allons', 'vas'], correct: 2, explanation: 'Nous → allons.' },
      { type: 'multiple_choice', question: '"Je vais manger." means:', options: ['I ate.', 'I eat.', 'I am going to eat.', 'I was eating.'], correct: 2, explanation: 'aller + infinitive = near future: "going to do".' },
      { type: 'translate', question: 'Translate: "We are going to study tomorrow."', answer: 'Nous allons étudier demain.', alternatives: ['On va étudier demain.'], explanation: 'allons (nous form of aller) + étudier (infinitive) + demain (tomorrow).' },
      { type: 'multiple_choice', question: 'How do you say "I am not going to work"?', options: ['Je vais ne pas travailler.', 'Je ne vais pas travailler.', 'Je ne va pas travailler.', 'Je ne vais travailler pas.'], correct: 1, explanation: 'ne...pas wraps around the conjugated form of aller: Je ne vais pas travailler.' },
    ],
    quiz: [
      { question: '"Ils vont" — which subject?', options: ['Je', 'Nous', 'Vous', 'Ils/Elles'], correct: 3, explanation: 'vont = ils/elles form of aller.' },
      { question: 'How do you say "She is going to work"?', options: ['Elle va travailler.', 'Elle vais travailler.', 'Elle aller travailler.', 'Elle va travaille.'], correct: 0, explanation: 'Elle + va (aller conjugated) + travailler (infinitive).' },
      { question: '"Vous allez où?" means:', options: ['You go often?', 'Where are you going?', 'When are you going?', 'How are you going?'], correct: 1, explanation: 'Où = where. Vous allez = you go/are going.' },
      { question: '"Je ne vais pas sortir." means:', options: ['I am going out.', 'I am not going to go out.', 'I went out.', 'I don\'t like going out.'], correct: 1, explanation: 'ne...pas around vais = negation of aller. Ne vais pas sortir = not going to go out.' },
      { question: 'Near future is formed with:', options: ['être + infinitive', 'avoir + infinitive', 'aller + infinitive', 'faire + infinitive'], correct: 2, explanation: 'aller (conjugated) + infinitive = futur proche.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 9 — The Three Verb Groups
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 9, duration_min: 30, xp_reward: 60,
  title: 'The Three Verb Groups',
  description: '-er, -ir, -re verbs — how they conjugate in the present tense.',
  content: JSON.stringify({
    intro: `French verbs are divided into three groups based on their infinitive ending. Group 1 (-er) is the largest and most regular. Groups 2 and 3 are smaller. Understanding these groups lets you conjugate hundreds of verbs from the same pattern.`,
    sections: [
      {
        type: 'grammar',
        title: 'Group 1 — Parler model (-er)',
        rules: [
          { rule: 'Je', example: 'parle', translation: 'I speak', breakdown: 'stem + -e' },
          { rule: 'Tu', example: 'parles', translation: 'you speak', breakdown: 'stem + -es' },
          { rule: 'Il / Elle', example: 'parle', translation: 'he/she speaks', breakdown: 'stem + -e' },
          { rule: 'Nous', example: 'parlons', translation: 'we speak', breakdown: 'stem + -ons' },
          { rule: 'Vous', example: 'parlez', translation: 'you speak', breakdown: 'stem + -ez' },
          { rule: 'Ils / Elles', example: 'parlent', translation: 'they speak', breakdown: 'stem + -ent (SILENT!)' },
        ]
      },
      {
        type: 'grammar',
        title: '⚠️ Manger spelling rule (-ger verbs)',
        rules: [
          { rule: 'Add -e before -ons', example: 'nous mangeons (NOT mangons)', translation: '', breakdown: 'Keeps the soft \'g\' sound. Same for: voyager, plonger, nager.' },
        ]
      },
      {
        type: 'grammar',
        title: 'Group 2 — Finir model (-ir with -iss-)',
        rules: [
          { rule: 'Je', example: 'finis', translation: 'I finish', breakdown: '' },
          { rule: 'Tu', example: 'finis', translation: '', breakdown: '' },
          { rule: 'Il / Elle', example: 'finit', translation: '', breakdown: '' },
          { rule: 'Nous', example: 'finissons', translation: '', breakdown: '-iss- inserted in plural forms' },
          { rule: 'Vous', example: 'finissez', translation: '', breakdown: '' },
          { rule: 'Ils / Elles', example: 'finissent', translation: '', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Key irregular verbs (Group 3)',
        rules: [
          { rule: 'Venir (to come)', example: 'viens, viens, vient, venons, venez, viennent', translation: '', breakdown: 'viennent ⚠️ (not venent)' },
          { rule: 'Pouvoir (can)', example: 'peux, peux, peut, pouvons, pouvez, peuvent', translation: '', breakdown: '' },
          { rule: 'Vouloir (to want)', example: 'veux, veux, veut, voulons, voulez, veulent', translation: '', breakdown: '' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Nous mang___ ensemble." Which ending?', options: ['-ons (mangons)', '-eons (mangeons)', '-ez', '-ent'], correct: 1, explanation: '-ger verbs add an e before -ons to keep the soft g: mangeons.' },
      { type: 'fill_blank', question: '"Ils parle___." Which ending for -er verbs with ils/elles?', options: ['-ons', '-ez', '-e', '-ent'], correct: 3, explanation: 'Ils/Elles + -er verb = -ent (silent): parlent.' },
      { type: 'multiple_choice', question: '"Nous finiss___." Group 2 (-ir) nous ending?', options: ['-ons', '-issons', '-isons', '-issez'], correct: 1, explanation: 'Group 2 inserts -iss- in plural forms: finissons.' },
      { type: 'multiple_choice', question: '"Ils viennent souvent." Viennent comes from:', options: ['venir', 'vouloir', 'voir', 'vendre'], correct: 0, explanation: 'viennent = ils/elles form of venir (to come). Irregular.' },
      { type: 'translate', question: 'Conjugate "parler" for "vous".', answer: 'parlez', alternatives: [], explanation: 'Stem "parl" + -ez (vous ending for -er verbs) = parlez.' },
      { type: 'multiple_choice', question: 'What are the endings for Group 1 (-er) verbs with "je"?', options: ['-is', '-e', '-s', '-it'], correct: 1, explanation: 'Group 1 (-er) verbs: je + stem + -e. Example: je parle, je mange.' },
    ],
    quiz: [
      { question: 'The -ent ending in "ils parlent" is:', options: ['pronounced like "on"', 'silent', 'pronounced "ent"', 'pronounced "ay"'], correct: 1, explanation: 'The -ent ending for ils/elles is always silent in French.' },
      { question: 'Which verbs add -iss- in the plural?', options: ['Group 1 (-er)', 'Group 2 (-ir)', 'Group 3 (-re)', 'All irregular verbs'], correct: 1, explanation: 'Group 2 (-ir) verbs like finir insert -iss- in plural forms: finissons, finissez, finissent.' },
      { question: '"Nous mangeons" has an extra "e" because:', options: ['manger is irregular', 'to keep the soft g sound before -ons', 'all -ger verbs are feminine', 'it\'s a spelling mistake'], correct: 1, explanation: '-ger verbs add e before endings starting with a or o to keep the soft g.' },
      { question: '"Ils peuvent" comes from:', options: ['pouvoir', 'pouver', 'pouler', 'peuvoir'], correct: 0, explanation: 'peuvent = ils/elles form of pouvoir (can/to be able to).' },
      { question: 'What is the vous form of "finir"?', options: ['finissez', 'finisez', 'finissons', 'finissent'], correct: 0, explanation: 'finissez = vous form of finir (Group 2).' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 10 — Irregular Verbs: Faire, Boire, Dire
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 10, duration_min: 30, xp_reward: 60,
  title: 'Irregular Verbs: Faire, Boire, Dire',
  description: 'Three high-frequency irregular verbs — with their notorious irregular vous forms.',
  content: JSON.stringify({
    intro: `Faire (to do/make), boire (to drink), and dire (to say/tell) are all irregular and appear constantly in French. Each has a surprising "vous" form that students often get wrong. Learn them carefully.`,
    sections: [
      {
        type: 'grammar',
        title: 'Faire — to do / to make',
        rules: [
          { rule: 'Je / J\'', example: 'fais', translation: 'Je fais mes devoirs.', breakdown: '' },
          { rule: 'Tu', example: 'fais', translation: 'Tu fais quoi ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'fait', translation: 'Il fait beau aujourd\'hui.', breakdown: 'Weather expressions use faire' },
          { rule: 'Nous', example: 'faisons', translation: 'Nous faisons un gâteau.', breakdown: '' },
          { rule: 'Vous', example: 'faites ⚠️', translation: 'Vous faites du sport ?', breakdown: 'NOT faisez — irregular!' },
          { rule: 'Ils / Elles', example: 'font', translation: 'Ils font la cuisine.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Boire — to drink',
        rules: [
          { rule: 'Je / J\'', example: 'bois', translation: 'Je bois de l\'eau.', breakdown: 'stem: boi-' },
          { rule: 'Tu', example: 'bois', translation: 'Tu bois du café ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'boit', translation: 'Elle boit du lait.', breakdown: '' },
          { rule: 'Nous', example: 'buvons ⚠️', translation: 'Nous buvons du jus.', breakdown: 'Stem changes to buv-' },
          { rule: 'Vous', example: 'buvez ⚠️', translation: 'Vous buvez quoi ?', breakdown: 'Stem changes to buv-' },
          { rule: 'Ils / Elles', example: 'boivent', translation: 'Ils boivent du vin.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Dire — to say / to tell',
        rules: [
          { rule: 'Je / J\'', example: 'dis', translation: 'Je dis bonjour.', breakdown: '' },
          { rule: 'Tu', example: 'dis', translation: 'Tu dis la vérité ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'dit', translation: 'Il dit non.', breakdown: '' },
          { rule: 'Nous', example: 'disons', translation: 'Nous disons merci.', breakdown: '' },
          { rule: 'Vous', example: 'dites ⚠️', translation: 'Vous dites quoi ?', breakdown: 'NOT disez — irregular! Same pattern as faites.' },
          { rule: 'Ils / Elles', example: 'disent', translation: 'Ils disent oui.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Key things to memorise',
        tips: [
          'faites (not faisez) — vous form of faire',
          'dites (not disez) — vous form of dire',
          'boire changes stem: boi- (singular & ils) vs buv- (nous & vous)',
          'faire + weather: Il fait chaud (hot), Il fait froid (cold), Il fait beau (nice weather)',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Vous ___ du sport ?" (faire)', options: ['faisez', 'faites', 'font', 'faisons'], correct: 1, explanation: 'Vous form of faire = faites (irregular, NOT faisez).' },
      { type: 'multiple_choice', question: '"Nous ___ du jus." (boire)', options: ['buvons', 'buvez', 'boivent', 'buvons'], correct: 0, explanation: 'Nous form of boire = buvons (stem changes to buv-).' },
      { type: 'multiple_choice', question: '"Vous ___ quoi ?" (dire)', options: ['disez', 'dites', 'disent', 'dit'], correct: 1, explanation: 'Vous form of dire = dites (irregular, NOT disez).' },
      { type: 'fill_blank', question: '"Il ___ beau aujourd\'hui." (faire — weather)', options: ['fais', 'faites', 'fait', 'font'], correct: 2, explanation: 'Il/Elle/On → fait. Il fait beau = the weather is nice.' },
      { type: 'translate', question: 'Translate: "They (mixed) drink wine."', answer: 'Ils boivent du vin.', alternatives: [], explanation: 'Ils (mixed group) + boivent (ils form of boire) + du vin (partitive for wine).' },
      { type: 'multiple_choice', question: '"Ils ___ la cuisine." (faire)', options: ['faites', 'font', 'fais', 'faisons'], correct: 1, explanation: 'Ils/Elles → font (faire).' },
    ],
    quiz: [
      { question: 'What is the vous form of faire?', options: ['faisez', 'font', 'faites', 'faisont'], correct: 2, explanation: 'faites — irregular vous form of faire.' },
      { question: '"Nous buvons" — why "buv" not "boi"?', options: ['boire is feminine', 'The stem changes for nous and vous', 'It\'s a typo', 'All -oire verbs use buv-'], correct: 1, explanation: 'Boire has two stems: boi- (singular + ils) and buv- (nous + vous).' },
      { question: '"Il fait froid" means:', options: ['He made cold.', 'The weather is cold.', 'He is cold.', 'It will be cold.'], correct: 1, explanation: 'Il fait + weather adjective = weather expression. faire is used for weather.' },
      { question: 'What is the vous form of dire?', options: ['disez', 'dites', 'disont', 'disons'], correct: 1, explanation: 'dites — irregular vous form of dire (same pattern as faites).' },
      { question: '"Je dis bonjour" comes from which verb?', options: ['faire', 'boire', 'dire', 'aller'], correct: 2, explanation: 'dis = je form of dire (to say/tell).' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 11 — The Prendre Family
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 11, duration_min: 25, xp_reward: 55,
  title: 'The Prendre Family',
  description: 'Prendre, comprendre, apprendre — one pattern covers all three.',
  content: JSON.stringify({
    intro: `Prendre (to take), comprendre (to understand), and apprendre (to learn) all follow the same irregular pattern. Learn prendre and you get the other two for free — just swap the prefix.`,
    sections: [
      {
        type: 'grammar',
        title: 'Prendre — to take (model verb)',
        rules: [
          { rule: 'Je / J\'', example: 'prends', translation: 'Je prends le bus.', breakdown: '' },
          { rule: 'Tu', example: 'prends', translation: 'Tu prends un café ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'prend', translation: 'Il prend son temps.', breakdown: '' },
          { rule: 'Nous', example: 'prenons', translation: 'Nous prenons le train.', breakdown: '' },
          { rule: 'Vous', example: 'prenez', translation: 'Vous prenez quoi ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'prennent ⚠️', translation: 'Ils prennent leurs livres.', breakdown: 'Double n — not prenent' },
        ]
      },
      {
        type: 'grammar',
        title: 'Full comparison table — all three verbs',
        rules: [
          { rule: 'Je / J\'', example: 'prends / comprends / apprends', translation: '', breakdown: '' },
          { rule: 'Tu', example: 'prends / comprends / apprends', translation: '', breakdown: '' },
          { rule: 'Il / Elle', example: 'prend / comprend / apprend', translation: '', breakdown: '' },
          { rule: 'Nous', example: 'prenons / comprenons / apprenons', translation: '', breakdown: '' },
          { rule: 'Vous', example: 'prenez / comprenez / apprenez', translation: '', breakdown: '' },
          { rule: 'Ils / Elles', example: 'prennent / comprennent / apprennent ⚠️', translation: '', breakdown: 'Double n in all three' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Ils ___ leurs livres." (prendre)', options: ['prennent', 'prenent', 'prends', 'prend'], correct: 0, explanation: 'prennent — double n in the ils/elles form.' },
      { type: 'multiple_choice', question: '"Je ___ le français." (apprendre)', options: ['apprend', 'apprends', 'apprennent', 'apprenons'], correct: 1, explanation: 'J\'apprends — je form of apprendre.' },
      { type: 'fill_blank', question: '"Vous ___ le train." (prendre)', options: ['prenez', 'prennez', 'prenons', 'prend'], correct: 0, explanation: 'Vous → prenez.' },
      { type: 'multiple_choice', question: '"Elle ___ bien le français." (comprendre)', options: ['comprend', 'comprends', 'comprennent', 'comprenez'], correct: 0, explanation: 'Il/Elle → comprend (no final -s).' },
      { type: 'translate', question: 'Translate: "We are learning French together."', answer: 'Nous apprenons le français ensemble.', alternatives: ['On apprend le français ensemble.'], explanation: 'apprenons = nous form of apprendre.' },
      { type: 'multiple_choice', question: 'What is unusual about "prennent" (ils form)?', options: ['It has no ending', 'It doubles the n', 'It drops the e', 'It adds -iss-'], correct: 1, explanation: 'The ils/elles form of prendre (and comprendre/apprendre) doubles the n: prennent, comprennent, apprennent.' },
    ],
    quiz: [
      { question: 'What is the ils/elles form of prendre?', options: ['prenent', 'prends', 'prennent', 'prend'], correct: 2, explanation: 'prennent — double n. This is the irregular part.' },
      { question: '"J\'apprends" comes from:', options: ['prendre', 'comprendre', 'apprendre', 'prends'], correct: 2, explanation: 'apprends = je form of apprendre.' },
      { question: '"Vous comprenez la règle?" means:', options: ['Do you understand the rule?', 'Do you take the rule?', 'Do you learn the rule?', 'Do you know the rule?'], correct: 0, explanation: 'comprendre = to understand. comprenez = vous form.' },
      { question: 'Comprendre = com + ___', options: ['venir', 'prendre', 'apprendre', 'entendre'], correct: 1, explanation: 'Comprendre = com + prendre. Apprendre = ap + prendre. Same pattern.' },
      { question: 'Nous form of apprendre:', options: ['apprenons', 'apprennons', 'apprenez', 'apprendent'], correct: 0, explanation: 'apprenons — no double n in the nous form.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 12 — Article Contractions & Places in Town
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 12, duration_min: 25, xp_reward: 50,
  title: 'Contractions & Places',
  description: 'à + le = AU, de + le = DU — and how to talk about locations in town.',
  content: JSON.stringify({
    intro: `In French, à and de must contract with le and les — giving you au, aux, du, des. This happens automatically and is not optional. Knowing your town vocabulary alongside these contractions is essential for TEF oral and written tasks.`,
    sections: [
      {
        type: 'grammar',
        title: 'The four contractions',
        rules: [
          { rule: 'à + le → AU', example: 'Je vais au marché.', translation: 'I\'m going to the market.', breakdown: '' },
          { rule: 'à + les → AUX', example: 'Je vais aux musées.', translation: 'I\'m going to the museums.', breakdown: '' },
          { rule: 'de + le → DU', example: 'Je viens du café.', translation: 'I come from the café.', breakdown: '' },
          { rule: 'de + les → DES', example: 'Je reviens des magasins.', translation: 'I\'m back from the shops.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'No contraction — these stay as-is',
        rules: [
          { rule: 'à + la → à la', example: 'Je vais à la banque.', translation: '', breakdown: '' },
          { rule: 'à + l\' → à l\'', example: 'Je vais à l\'école.', translation: '', breakdown: '' },
          { rule: 'de + la → de la', example: 'Je viens de la pharmacie.', translation: '', breakdown: '' },
          { rule: 'de + l\' → de l\'', example: 'Je viens de l\'hôpital.', translation: '', breakdown: '' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Places in town (with correct article)',
        items: [
          { fr: 'le marché', en: 'the market', pron: '', note: 'au marché / du marché' },
          { fr: 'le café', en: 'the café', pron: '', note: 'au café / du café' },
          { fr: 'le parc', en: 'the park', pron: '', note: 'au parc / du parc' },
          { fr: 'la banque', en: 'the bank', pron: '', note: 'à la banque / de la banque' },
          { fr: 'la maison', en: 'the house', pron: '', note: 'à la maison / de la maison' },
          { fr: 'la gare', en: 'the station', pron: '', note: 'à la gare / de la gare' },
          { fr: 'l\'école', en: 'the school', pron: '', note: 'à l\'école / de l\'école' },
          { fr: 'l\'hôpital', en: 'the hospital', pron: '', note: 'à l\'hôpital / de l\'hôpital' },
          { fr: 'le supermarché', en: 'the supermarket', pron: '', note: 'au supermarché / du supermarché' },
          { fr: 'le musée', en: 'the museum', pron: '', note: 'au musée / du musée' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Je vais ___ marché." (à + le)', options: ['à le', 'au', 'du', 'de le'], correct: 1, explanation: 'à + le = AU (mandatory contraction).' },
      { type: 'multiple_choice', question: '"Je viens ___ café." (de + le)', options: ['de le', 'du', 'des', 'de'], correct: 1, explanation: 'de + le = DU (mandatory contraction).' },
      { type: 'multiple_choice', question: '"Je vais ___ banque." (banque = feminine)', options: ['au', 'à la', 'à le', 'du'], correct: 1, explanation: 'à + la = à la (no contraction — la stays).' },
      { type: 'translate', question: 'Translate: "She is going to the hospital."', answer: 'Elle va à l\'hôpital.', alternatives: [], explanation: 'à + l\' = à l\' (no contraction before l\'). Hôpital is masculine.' },
      { type: 'multiple_choice', question: '"Je reviens ___ magasins." (de + les)', options: ['de les', 'du', 'des', 'de'], correct: 2, explanation: 'de + les = DES (mandatory contraction).' },
      { type: 'translate', question: 'Translate: "I am going to the park and the museum."', answer: 'Je vais au parc et au musée.', alternatives: [], explanation: 'au parc = à + le parc (masc). au musée = à + le musée (masc). Both mandatory contractions.' },
    ],
    quiz: [
      { question: 'à + le =', options: ['à le', 'au', 'aux', 'du'], correct: 1, explanation: 'à + le → AU. Mandatory contraction.' },
      { question: 'de + les =', options: ['de les', 'du', 'des', 'de'], correct: 2, explanation: 'de + les → DES. Mandatory contraction.' },
      { question: '"à + la" contracts to:', options: ['au', 'aux', 'à la (no change)', 'de la'], correct: 2, explanation: 'à + la does NOT contract. It stays as "à la".' },
      { question: '"Je vais au parc." — parc has which article?', options: ['la', 'le', 'l\'', 'les'], correct: 1, explanation: '"Au" = à + le, so parc is masculine: le parc.' },
      { question: '"de + l\'" contracts to:', options: ['du', 'de l\' (no change)', 'des', 'de la'], correct: 1, explanation: 'de + l\' does NOT contract. It stays as "de l\'".' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 13 — Prepositions
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 13, duration_min: 30, xp_reward: 65,
  title: 'Prepositions',
  description: 'à, sur, avec, chez, en, de, depuis, derrière, devant, à côté de — uses and examples.',
  content: JSON.stringify({
    intro: `Prepositions link nouns, pronouns and phrases to other words in a sentence. French prepositions often don't translate directly to English — especially chez and depuis. Learn each one with its specific uses and examples.`,
    sections: [
      {
        type: 'grammar',
        title: 'À — to / at / in',
        rules: [
          { rule: 'Direction or location', example: 'Je vais à Paris.', translation: 'I\'m going to Paris.', breakdown: 'Contracts: à + le = AU, à + les = AUX' },
          { rule: 'Time', example: 'Le cours commence à 9h.', translation: 'Class starts at 9.', breakdown: '' },
          { rule: 'Belonging', example: 'C\'est à moi.', translation: 'It\'s mine.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'À côté de — next to / beside',
        rules: [
          { rule: 'Position relative to another thing', example: 'La banque est à côté de la pharmacie.', translation: 'The bank is next to the pharmacy.', breakdown: 'de contracts normally after: à côté du, à côté de la, à côté de l\'' },
        ]
      },
      {
        type: 'grammar',
        title: 'Sur — on / on top of',
        rules: [
          { rule: 'Physical position (on top of)', example: 'Le livre est sur la table.', translation: 'The book is on the table.', breakdown: '' },
          { rule: 'On a street', example: 'J\'habite sur la rue principale.', translation: 'I live on the main street.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Avec — with',
        rules: [
          { rule: 'Accompaniment', example: 'Je vais au cinéma avec Sophie.', translation: 'I\'m going to the cinema with Sophie.', breakdown: 'Never contracts' },
          { rule: 'Manner', example: 'Il travaille avec soin.', translation: 'He works with care.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Chez — at the home/place of',
        rules: [
          { rule: 'At someone\'s home', example: 'Je suis chez Marie.', translation: 'I am at Marie\'s place.', breakdown: 'No article after chez — directly followed by a person' },
          { rule: 'At a professional\'s', example: 'Elle va chez le médecin.', translation: 'She\'s going to the doctor\'s.', breakdown: '' },
          { rule: 'At my place', example: 'Chez moi, on mange à 19h.', translation: 'At my place, we eat at 7pm.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'En — in / to (countries, months, seasons, transport)',
        rules: [
          { rule: 'Countries (feminine)', example: 'Je vis en France.', translation: 'I live in France.', breakdown: 'Use en for feminine countries; au for masculine' },
          { rule: 'Months', example: 'Nous partons en juillet.', translation: 'We leave in July.', breakdown: '' },
          { rule: 'Transport', example: 'Elle voyage en train.', translation: 'She travels by train.', breakdown: '' },
          { rule: 'Seasons (except spring)', example: 'En été, en hiver, en automne.', translation: '', breakdown: 'Spring = au printemps' },
        ]
      },
      {
        type: 'grammar',
        title: 'De — from / of / about',
        rules: [
          { rule: 'Origin', example: 'Je viens du Canada.', translation: 'I come from Canada.', breakdown: 'Contracts: de + le = DU, de + les = DES' },
          { rule: 'Possession', example: 'Le livre de Marie.', translation: 'Marie\'s book.', breakdown: '' },
          { rule: 'Topic', example: 'Il parle de son voyage.', translation: 'He talks about his trip.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: '⚠️ Depuis — since / for (ongoing actions)',
        rules: [
          { rule: 'CRITICAL: use PRESENT tense (not past)', example: 'J\'apprends le français depuis six mois.', translation: 'I have been learning French for six months.', breakdown: 'English uses past tense. French uses PRESENT tense with depuis.' },
          { rule: 'Since a specific point', example: 'Il habite ici depuis 2019.', translation: 'He has been living here since 2019.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Derrière — behind / at the back of',
        rules: [
          { rule: 'Physical position', example: 'Le jardin est derrière la maison.', translation: 'The garden is behind the house.', breakdown: 'Opposite of devant. Does not contract.' },
        ]
      },
      {
        type: 'grammar',
        title: 'Devant — in front of / before',
        rules: [
          { rule: 'Physical position', example: 'Il attend devant l\'école.', translation: 'He waits in front of the school.', breakdown: 'Opposite of derrière. Does not contract.' },
        ]
      },
      {
        type: 'tips',
        title: 'Key things to remember',
        tips: [
          'Depuis + PRESENT tense for ongoing actions (not past like in English)',
          'Chez = at the home/place of — directly followed by a person, no article',
          'À contracts (au, aux) but avec, en, sur, devant, derrière do NOT contract',
          'En for feminine countries: en France, en Italie — Au for masculine: au Canada, au Maroc',
          'Depuis vs pour: depuis = since/for ongoing | pour = for (a future duration)',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Je suis ___ Marie." (at Marie\'s place)', options: ['à', 'chez', 'avec', 'en'], correct: 1, explanation: '"Chez" = at the home/place of. Je suis chez Marie.' },
      { type: 'multiple_choice', question: '"J\'apprends le français ___ six mois." (for, ongoing)', options: ['pour', 'depuis', 'pendant', 'il y a'], correct: 1, explanation: '"Depuis" for ongoing actions still in progress. And crucially — the verb stays in PRESENT tense.' },
      { type: 'multiple_choice', question: '"Le livre est ___ la table." (on top of)', options: ['sous', 'devant', 'sur', 'dans'], correct: 2, explanation: '"Sur" = on / on top of. Le livre est sur la table.' },
      { type: 'fill_blank', question: '"Je vis ___ France." (in France — feminine country)', options: ['au', 'à', 'en', 'dans'], correct: 2, explanation: '"En" is used with feminine countries: en France.' },
      { type: 'translate', question: 'Translate: "The garden is behind the house."', answer: 'Le jardin est derrière la maison.', alternatives: [], explanation: 'derrière = behind/at the back of.' },
      { type: 'multiple_choice', question: '"La banque est ___ la pharmacie." (next to)', options: ['devant', 'derrière', 'à côté de', 'avec'], correct: 2, explanation: '"À côté de" = next to / beside.' },
    ],
    quiz: [
      { question: '"Depuis" requires which tense when describing ongoing actions?', options: ['past tense', 'future tense', 'present tense', 'conditional'], correct: 2, explanation: 'French uses the PRESENT tense with depuis for ongoing actions. English uses the past ("have been").' },
      { question: '"Chez" is followed by:', options: ['a place name', 'a person or pronoun', 'an article + noun', 'a country name'], correct: 1, explanation: 'Chez is always directly followed by a person or pronoun: chez Marie, chez moi, chez le médecin.' },
      { question: '"En" is used for countries that are:', options: ['masculine', 'feminine', 'plural', 'starting with a vowel'], correct: 1, explanation: 'En is used with feminine countries: en France, en Italie, en Espagne.' },
      { question: '"Devant" means:', options: ['behind', 'beside', 'in front of', 'above'], correct: 2, explanation: 'devant = in front of / before. Opposite of derrière (behind).' },
      { question: '"Il parle de son voyage." — de here means:', options: ['from', 'of', 'about', 'with'], correct: 2, explanation: 'de = about/on the subject of when used with verbs like parler de, rêver de, etc.' },
    ]
  })
},

// ─────────────────────────────────────────────────────────────────
// LESSON 14 — Essential Verbs & Conjugation
// ─────────────────────────────────────────────────────────────────
{
  level: 'A1', sort_order: 14, duration_min: 40, xp_reward: 75,
  title: 'Essential Verbs & Conjugation',
  description: 'Vouloir, pouvoir, devoir, savoir, voir, partir, sortir, dormir, mettre, lire, écrire, connaître — 12 key irregular verbs with full conjugation tables.',
  content: JSON.stringify({
    intro: `These 12 verbs are among the most frequently used in French. All are irregular — their stems or endings do not follow standard patterns. This lesson gives you the full present-tense conjugation for each verb, highlights the tricky forms, and gives memory tips to lock them in.`,
    sections: [
      {
        type: 'grammar',
        title: 'Vouloir — to want',
        rules: [
          { rule: 'Je', example: 'veux', translation: 'Je veux un café.', breakdown: '' },
          { rule: 'Tu', example: 'veux', translation: 'Tu veux sortir ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'veut', translation: 'Elle veut apprendre.', breakdown: '' },
          { rule: 'Nous', example: 'voulons', translation: 'Nous voulons partir.', breakdown: '' },
          { rule: 'Vous', example: 'voulez', translation: 'Vous voulez du thé ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'veulent ⚠️', translation: 'Ils veulent rester.', breakdown: 'NOT voulont — stem changes back to veu- for ils/elles' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — vouloir',
        tips: [
          'Two stems: veu- (je/tu/il/ils) and voul- (nous/vous)',
          '"Je voudrais" (I would like) is the polite conditional — essential in restaurants and shops',
          'veulent rhymes with veut — both use the veu- stem',
        ]
      },
      {
        type: 'grammar',
        title: 'Pouvoir — can / to be able to',
        rules: [
          { rule: 'Je', example: 'peux', translation: 'Je peux t\'aider.', breakdown: '' },
          { rule: 'Tu', example: 'peux', translation: 'Tu peux venir ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'peut', translation: 'Il peut rester.', breakdown: '' },
          { rule: 'Nous', example: 'pouvons', translation: 'Nous pouvons y aller.', breakdown: '' },
          { rule: 'Vous', example: 'pouvez', translation: 'Vous pouvez entrer.', breakdown: '' },
          { rule: 'Ils / Elles', example: 'peuvent ⚠️', translation: 'Ils peuvent partir.', breakdown: 'NOT pouvont — same irregular ils pattern as vouloir' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — pouvoir',
        tips: [
          'Mirrors vouloir: veut/peut, voulons/pouvons, veulent/peuvent',
          'Two stems: peu- (singular + ils) and pouv- (nous/vous)',
          '"Puis-je ?" is the formal inverted question form of "Est-ce que je peux ?" (May I?)',
        ]
      },
      {
        type: 'grammar',
        title: 'Devoir — must / to have to',
        rules: [
          { rule: 'Je', example: 'dois', translation: 'Je dois travailler.', breakdown: '' },
          { rule: 'Tu', example: 'dois', translation: 'Tu dois étudier.', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'doit', translation: 'Elle doit partir.', breakdown: '' },
          { rule: 'Nous', example: 'devons', translation: 'Nous devons y aller.', breakdown: '' },
          { rule: 'Vous', example: 'devez', translation: 'Vous devez vous dépêcher.', breakdown: '' },
          { rule: 'Ils / Elles', example: 'doivent ⚠️', translation: 'Ils doivent rester.', breakdown: 'doi- stem for singular + ils; dev- for nous/vous' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — devoir',
        tips: [
          'Two stems: doi- (singular + ils) and dev- (nous/vous)',
          'devoir + infinitive = obligation: Je dois partir = I must leave',
          'Devoir can also mean "to owe": Je te dois dix euros = I owe you ten euros',
        ]
      },
      {
        type: 'grammar',
        title: 'Savoir — to know (a fact or skill)',
        rules: [
          { rule: 'Je', example: 'sais', translation: 'Je sais nager.', breakdown: '' },
          { rule: 'Tu', example: 'sais', translation: 'Tu sais où c\'est ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'sait', translation: 'Il sait conduire.', breakdown: '' },
          { rule: 'Nous', example: 'savons', translation: 'Nous savons la réponse.', breakdown: '' },
          { rule: 'Vous', example: 'savez', translation: 'Vous savez cuisiner ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'savent', translation: 'Ils savent la vérité.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Connaître — to know (a person or place)',
        rules: [
          { rule: 'Je', example: 'connais', translation: 'Je connais Marie.', breakdown: '' },
          { rule: 'Tu', example: 'connais', translation: 'Tu connais Paris ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'connaît ⚠️', translation: 'Elle connaît bien le quartier.', breakdown: 'Circumflex î in il/elle form — a defining feature of -aître verbs' },
          { rule: 'Nous', example: 'connaissons', translation: 'Nous connaissons la ville.', breakdown: '' },
          { rule: 'Vous', example: 'connaissez', translation: 'Vous connaissez cet endroit ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'connaissent', translation: 'Ils connaissent bien le pays.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Savoir vs Connaître — critical difference',
        tips: [
          'SAVOIR = to know a fact, information, or how to do something: Je sais parler français.',
          'CONNAÎTRE = to know / be familiar with a person or place: Je connais Paris.',
          'Quick test: if you can replace "know" with "be familiar with" → connaître.',
          'If you can replace "know" with "know that / know how to" → savoir.',
          'connaît has a circumflex î — picture a little hat on the i of il/elle',
        ]
      },
      {
        type: 'grammar',
        title: 'Voir — to see',
        rules: [
          { rule: 'Je', example: 'vois', translation: 'Je vois la tour.', breakdown: '' },
          { rule: 'Tu', example: 'vois', translation: 'Tu vois ce que je veux dire ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'voit', translation: 'Elle voit ses amis.', breakdown: '' },
          { rule: 'Nous', example: 'voyons ⚠️', translation: 'Nous voyons un film.', breakdown: 'Stem changes: voi- → voy- for nous/vous' },
          { rule: 'Vous', example: 'voyez ⚠️', translation: 'Vous voyez le problème ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'voient ⚠️', translation: 'Ils voient tout.', breakdown: 'voi- + -ent (the -ent is silent as always)' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — voir',
        tips: [
          'Stem voi- in je/tu/il/ils — changes to voy- in nous/vous only',
          '"On verra" = we\'ll see (future tense) — a very common expression',
          'voient (ils) — do not confuse with veulent; voi + -ent, the ending is silent',
        ]
      },
      {
        type: 'grammar',
        title: 'Partir — to leave / to go away',
        rules: [
          { rule: 'Je', example: 'pars', translation: 'Je pars à 8h.', breakdown: 'Drop last 3 letters: partir → par- → pars' },
          { rule: 'Tu', example: 'pars', translation: 'Tu pars maintenant ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'part', translation: 'Le train part à midi.', breakdown: '' },
          { rule: 'Nous', example: 'partons', translation: 'Nous partons en vacances.', breakdown: 'Full stem restored in plural' },
          { rule: 'Vous', example: 'partez', translation: 'Vous partez demain ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'partent', translation: 'Ils partent tôt.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Sortir — to go out',
        rules: [
          { rule: 'Je', example: 'sors', translation: 'Je sors ce soir.', breakdown: 'Drop last 3 letters: sortir → sor- → sors' },
          { rule: 'Tu', example: 'sors', translation: 'Tu sors avec qui ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'sort', translation: 'Elle sort du bureau.', breakdown: '' },
          { rule: 'Nous', example: 'sortons', translation: 'Nous sortons ensemble.', breakdown: 'Full stem in plural' },
          { rule: 'Vous', example: 'sortez', translation: 'Vous sortez souvent ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'sortent', translation: 'Ils sortent ce soir.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Dormir — to sleep',
        rules: [
          { rule: 'Je', example: 'dors', translation: 'Je dors huit heures.', breakdown: 'Drop last 3 letters: dormir → dor- → dors' },
          { rule: 'Tu', example: 'dors', translation: 'Tu dors bien ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'dort', translation: 'Le bébé dort.', breakdown: '' },
          { rule: 'Nous', example: 'dormons', translation: 'Nous dormons tard.', breakdown: 'Full stem in plural' },
          { rule: 'Vous', example: 'dormez', translation: 'Vous dormez assez ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'dorment', translation: 'Ils dorment encore.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — partir, sortir, dormir',
        tips: [
          'All three: drop the last 3 letters of the infinitive to get the singular stem',
          'partir → par- | sortir → sor- | dormir → dor-',
          'Singular endings: -s, -s, -t (pars/pars/part, sors/sors/sort, dors/dors/dort)',
          'Plural: restore full stem and add -ons, -ez, -ent (partons/sortez/dorment)',
        ]
      },
      {
        type: 'grammar',
        title: 'Mettre — to put / to place',
        rules: [
          { rule: 'Je', example: 'mets', translation: 'Je mets mon manteau.', breakdown: 'Single t in singular' },
          { rule: 'Tu', example: 'mets', translation: 'Tu mets la table ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'met', translation: 'Elle met son sac là.', breakdown: '' },
          { rule: 'Nous', example: 'mettons ⚠️', translation: 'Nous mettons nos affaires.', breakdown: 'Double tt in all plural forms' },
          { rule: 'Vous', example: 'mettez ⚠️', translation: 'Vous mettez vos chaussures ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'mettent ⚠️', translation: 'Ils mettent la table.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — mettre',
        tips: [
          'Singular: single t (mets, mets, met)',
          'Plural: double tt (mettons, mettez, mettent)',
          '"Mettre la table" = to set the table — very common French expression',
          'Related verbs follow the same pattern: permettre (to allow), promettre (to promise)',
        ]
      },
      {
        type: 'grammar',
        title: 'Lire — to read',
        rules: [
          { rule: 'Je', example: 'lis', translation: 'Je lis un roman.', breakdown: '' },
          { rule: 'Tu', example: 'lis', translation: 'Tu lis beaucoup ?', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'lit', translation: 'Il lit le journal.', breakdown: '' },
          { rule: 'Nous', example: 'lisons', translation: 'Nous lisons ensemble.', breakdown: '' },
          { rule: 'Vous', example: 'lisez', translation: 'Vous lisez quoi en ce moment ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'lisent', translation: 'Elles lisent des romans.', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Écrire — to write',
        rules: [
          { rule: 'Je / J\'', example: 'écris', translation: 'J\'écris une lettre.', breakdown: 'je → j\' before vowel (élision)' },
          { rule: 'Tu', example: 'écris', translation: 'Tu écris bien.', breakdown: '' },
          { rule: 'Il / Elle / On', example: 'écrit', translation: 'Elle écrit un email.', breakdown: '' },
          { rule: 'Nous', example: 'écrivons ⚠️', translation: 'Nous écrivons un rapport.', breakdown: 'Stem changes: écri- → écriv- in plural' },
          { rule: 'Vous', example: 'écrivez ⚠️', translation: 'Vous écrivez en français ?', breakdown: '' },
          { rule: 'Ils / Elles', example: 'écrivent ⚠️', translation: 'Ils écrivent chaque jour.', breakdown: '' },
        ]
      },
      {
        type: 'tips',
        title: 'Memory tip — lire & écrire',
        tips: [
          'Lire is the simpler of the two: lis, lis, lit, lisons, lisez, lisent',
          'Écrire changes stem: écri- (singular) → écriv- (plural)',
          '"J\'écris" uses élision (j\') because écrire starts with a vowel',
          'Related: décrire (to describe), inscrire (to register) — same pattern as écrire',
        ]
      },
      {
        type: 'tips',
        title: 'Quick-reference summary of all 12 verbs',
        tips: [
          'vouloir: veux/veux/veut — voulons/voulez/veulent',
          'pouvoir: peux/peux/peut — pouvons/pouvez/peuvent',
          'devoir: dois/dois/doit — devons/devez/doivent',
          'savoir: sais/sais/sait — savons/savez/savent',
          'connaître: connais/connais/connaît — connaissons/connaissez/connaissent',
          'voir: vois/vois/voit — voyons/voyez/voient',
          'partir: pars/pars/part — partons/partez/partent',
          'sortir: sors/sors/sort — sortons/sortez/sortent',
          'dormir: dors/dors/dort — dormons/dormez/dorment',
          'mettre: mets/mets/met — mettons/mettez/mettent',
          'lire: lis/lis/lit — lisons/lisez/lisent',
          'écrire: écris/écris/écrit — écrivons/écrivez/écrivent',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Ils ___ rester." (vouloir)', options: ['voulont', 'veulent', 'voulons', 'veut'], correct: 1, explanation: 'veulent — the ils/elles form of vouloir. The stem shifts back to veu- (NOT voul-). This is the most common error with vouloir.' },
      { type: 'multiple_choice', question: 'Which sentence is correct for "I know Marie"?', options: ['Je sais Marie.', 'Je connais Marie.', 'Je vois Marie.', 'Je peux Marie.'], correct: 1, explanation: 'Use connaître for people and places: Je connais Marie. Savoir is for facts and skills, not people.' },
      { type: 'multiple_choice', question: '"Nous ___ ensemble ce soir." (sortir)', options: ['sort', 'sortent', 'sortons', 'sortez'], correct: 2, explanation: 'Nous → sortons. Sortir restores full stem in plural: sor- + -tons = sortons.' },
      { type: 'fill_blank', question: '"Tu ___ bien ?" (dormir)', options: ['dormez', 'dorment', 'dors', 'dort'], correct: 2, explanation: 'Tu → dors. Drop last 3 letters of dormir: dorm-ir → dor- + -s.' },
      { type: 'multiple_choice', question: '"Ils ___ la table." (mettre)', options: ['mets', 'met', 'mettons', 'mettent'], correct: 3, explanation: 'Ils/Elles → mettent. Double-tt in all plural forms of mettre.' },
      { type: 'multiple_choice', question: '"Vous ___ en français ?" (écrire)', options: ['écrivons', 'écrivez', 'écrits', 'écrivent'], correct: 1, explanation: 'Vous → écrivez. The stem changes to écriv- in all plural forms of écrire.' },
      { type: 'translate', question: 'Translate: "She must leave at 8."', answer: 'Elle doit partir à 8h.', alternatives: ['Elle doit partir à huit heures.'], explanation: 'devoir + infinitive = must. Elle doit (she must) + partir (infinitive = to leave) + à 8h.' },
      { type: 'multiple_choice', question: '"Je ___ nager." Choose the right verb for "I know how to swim."', options: ['Je connais nager.', 'Je vois nager.', 'Je sais nager.', 'Je peux nager.'], correct: 2, explanation: 'Savoir + infinitive = to know how to do something. Je sais nager. (Connaître is never followed directly by an infinitive.)' },
    ],
    quiz: [
      { question: 'What is the ils/elles form of pouvoir?', options: ['pouvont', 'peuvont', 'peuvent', 'pouvent'], correct: 2, explanation: 'peuvent — same irregular ils pattern as veulent (vouloir). Stem shifts to peu-.' },
      { question: '"Il connaît" has a circumflex (î). Why?', options: ['All -aître verbs use î in the il/elle form', 'It changes the pronunciation to a long vowel', 'It\'s only for feminine subjects', 'It replaces the silent s from connaiss-'], correct: 0, explanation: 'Verbs ending in -aître (connaître, paraître) use î in the il/elle form: connaît, paraît. It\'s a spelling rule.' },
      { question: 'Which sentence is correct for "I know how to drive"?', options: ['Je connais conduire.', 'Je sais conduire.', 'Je peux conduire.', 'Je dois conduire.'], correct: 1, explanation: 'Savoir + infinitive = to know how to. Je sais conduire. (Je peux conduire means "I can drive" — possible but different meaning.)' },
      { question: 'What is the nous form of partir?', options: ['partissons', 'partons', 'partent', 'partisons'], correct: 1, explanation: 'partons — full stem par- restored in plural + -tons. Partir drops last 3 letters only for singular.' },
      { question: '"Nous lisons" comes from which verb?', options: ['lire', 'écrire', 'voir', 'mettre'], correct: 0, explanation: 'lisons = nous form of lire (to read). The stem is lis-.' },
    ]
  })
},

  ]; // end lessons array

  // ── Vocab cards (from notes) ──────────────────────────────────────────────
  const vocabCards = [
    // Days
    { level:'A1', word:'lundi', word_type:'noun (masc)', translation:'Monday', example_fr:'Aujourd\'hui, c\'est lundi.', example_en:'Today is Monday.' },
    { level:'A1', word:'mercredi', word_type:'noun (masc)', translation:'Wednesday', example_fr:'Le cours est mercredi.', example_en:'The class is on Wednesday.' },
    { level:'A1', word:'vendredi', word_type:'noun (masc)', translation:'Friday', example_fr:'Mon jour préféré est vendredi.', example_en:'My favourite day is Friday.' },
    // Numbers
    { level:'A1', word:'soixante-dix', word_type:'number', translation:'70', example_fr:'J\'ai soixante-dix ans.', example_en:'I am 70 years old.' },
    { level:'A1', word:'quatre-vingts', word_type:'number', translation:'80', example_fr:'Il y a quatre-vingts élèves.', example_en:'There are 80 students.' },
    { level:'A1', word:'quatre-vingt-dix', word_type:'number', translation:'90', example_fr:'Elle a quatre-vingt-dix ans.', example_en:'She is 90 years old.' },
    // Articles & nouns
    { level:'A1', word:'bonjour', word_type:'exclamation', translation:'hello / good day', example_fr:'Bonjour, je m\'appelle Osama.', example_en:'Hello, my name is Osama.' },
    { level:'A1', word:'enchanté(e)', word_type:'exclamation', translation:'pleased to meet you', example_fr:'Enchanté de vous rencontrer.', example_en:'Pleased to meet you.' },
    { level:'A1', word:'la maison', word_type:'noun (fem)', translation:'the house', example_fr:'Ma maison est à Oakville.', example_en:'My house is in Oakville.' },
    { level:'A1', word:'le café', word_type:'noun (masc)', translation:'the café / coffee', example_fr:'Je vais au café.', example_en:'I am going to the café.' },
    { level:'A1', word:'l\'école', word_type:'noun (fem)', translation:'the school', example_fr:'Elle va à l\'école.', example_en:'She goes to school.' },
    { level:'A1', word:'l\'hôpital', word_type:'noun (masc)', translation:'the hospital', example_fr:'Il est à l\'hôpital.', example_en:'He is at the hospital.' },
    // Possessives
    { level:'A1', word:'mon / ma / mes', word_type:'possessive adj', translation:'my', example_fr:'Mon livre, ma maison, mes amis.', example_en:'My book, my house, my friends.' },
    { level:'A1', word:'son / sa / ses', word_type:'possessive adj', translation:'his / her', example_fr:'Son père, sa mère, ses enfants.', example_en:'His/her father, mother, children.' },
    { level:'A1', word:'leur / leurs', word_type:'possessive adj', translation:'their', example_fr:'Leur maison, leurs enfants.', example_en:'Their house, their children.' },
    // Verbs
    { level:'A1', word:'avoir', word_type:'verb (irreg)', translation:'to have', example_fr:'J\'ai un livre.', example_en:'I have a book.' },
    { level:'A1', word:'être', word_type:'verb (irreg)', translation:'to be', example_fr:'Je suis étudiant.', example_en:'I am a student.' },
    { level:'A1', word:'aller', word_type:'verb (irreg)', translation:'to go', example_fr:'Je vais à l\'école.', example_en:'I go to school.' },
    { level:'A1', word:'faire', word_type:'verb (irreg)', translation:'to do / make', example_fr:'Il fait beau.', example_en:'The weather is nice.' },
    { level:'A1', word:'boire', word_type:'verb (irreg)', translation:'to drink', example_fr:'Je bois de l\'eau.', example_en:'I drink water.' },
    { level:'A1', word:'dire', word_type:'verb (irreg)', translation:'to say / tell', example_fr:'Tu dis bonjour.', example_en:'You say hello.' },
    { level:'A1', word:'prendre', word_type:'verb (irreg)', translation:'to take', example_fr:'Je prends le bus.', example_en:'I take the bus.' },
    { level:'A1', word:'comprendre', word_type:'verb (irreg)', translation:'to understand', example_fr:'Je comprends la leçon.', example_en:'I understand the lesson.' },
    { level:'A1', word:'apprendre', word_type:'verb (irreg)', translation:'to learn', example_fr:'J\'apprends le français.', example_en:'I am learning French.' },
    { level:'A1', word:'parler', word_type:'verb (-er)', translation:'to speak', example_fr:'Je parle français.', example_en:'I speak French.' },
    { level:'A1', word:'manger', word_type:'verb (-er)', translation:'to eat', example_fr:'Nous mangeons ensemble.', example_en:'We eat together.' },
    { level:'A1', word:'finir', word_type:'verb (-ir)', translation:'to finish', example_fr:'Tu finis tes devoirs.', example_en:'You finish your homework.' },
    // Prepositions
    { level:'A1', word:'chez', word_type:'preposition', translation:'at the home/place of', example_fr:'Je suis chez Marie.', example_en:'I am at Marie\'s place.' },
    { level:'A1', word:'depuis', word_type:'preposition', translation:'since / for (ongoing)', example_fr:'J\'apprends le français depuis six mois.', example_en:'I have been learning French for six months.' },
    { level:'A1', word:'à côté de', word_type:'preposition', translation:'next to / beside', example_fr:'La banque est à côté de la pharmacie.', example_en:'The bank is next to the pharmacy.' },
    { level:'A1', word:'derrière', word_type:'preposition', translation:'behind', example_fr:'Le jardin est derrière la maison.', example_en:'The garden is behind the house.' },
    { level:'A1', word:'devant', word_type:'preposition', translation:'in front of', example_fr:'Il attend devant l\'école.', example_en:'He waits in front of the school.' },
    // Avoir expressions
    { level:'A1', word:'avoir faim', word_type:'expression', translation:'to be hungry', example_fr:'J\'ai faim.', example_en:'I am hungry.' },
    { level:'A1', word:'avoir soif', word_type:'expression', translation:'to be thirsty', example_fr:'Tu as soif ?', example_en:'Are you thirsty?' },
    { level:'A1', word:'avoir raison', word_type:'expression', translation:'to be right', example_fr:'Vous avez raison.', example_en:'You are right.' },
    // Lesson 14 verbs
    { level:'A1', word:'vouloir', word_type:'verb (irreg)', translation:'to want', example_fr:'Je veux un café.', example_en:'I want a coffee.' },
    { level:'A1', word:'pouvoir', word_type:'verb (irreg)', translation:'can / to be able to', example_fr:'Tu peux m\'aider ?', example_en:'Can you help me?' },
    { level:'A1', word:'devoir', word_type:'verb (irreg)', translation:'must / to have to', example_fr:'Je dois partir.', example_en:'I must leave.' },
    { level:'A1', word:'savoir', word_type:'verb (irreg)', translation:'to know (fact/skill)', example_fr:'Je sais nager.', example_en:'I know how to swim.' },
    { level:'A1', word:'voir', word_type:'verb (irreg)', translation:'to see', example_fr:'Je vois la tour Eiffel.', example_en:'I see the Eiffel Tower.' },
    { level:'A1', word:'partir', word_type:'verb (-ir irreg)', translation:'to leave / go away', example_fr:'Le train part à midi.', example_en:'The train leaves at noon.' },
    { level:'A1', word:'sortir', word_type:'verb (-ir irreg)', translation:'to go out', example_fr:'Je sors ce soir.', example_en:'I am going out tonight.' },
    { level:'A1', word:'dormir', word_type:'verb (-ir irreg)', translation:'to sleep', example_fr:'Je dors huit heures par nuit.', example_en:'I sleep eight hours a night.' },
    { level:'A1', word:'mettre', word_type:'verb (irreg)', translation:'to put / to place', example_fr:'Je mets mon manteau.', example_en:'I put on my coat.' },
    { level:'A1', word:'lire', word_type:'verb (irreg)', translation:'to read', example_fr:'Je lis un roman.', example_en:'I am reading a novel.' },
    { level:'A1', word:'écrire', word_type:'verb (irreg)', translation:'to write', example_fr:'J\'écris une lettre.', example_en:'I am writing a letter.' },
    { level:'A1', word:'connaître', word_type:'verb (irreg)', translation:'to know (person/place)', example_fr:'Je connais bien Paris.', example_en:'I know Paris well.' },
  ];

  lessons.forEach(l => DB.insert('lessons', l));
  vocabCards.forEach(v => DB.insert('vocab_cards', v));
  console.log(`✅ Seeded ${lessons.length} lessons and ${vocabCards.length} vocab cards.`);
}

module.exports = { seedIfEmpty };
