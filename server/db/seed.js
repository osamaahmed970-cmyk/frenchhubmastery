// server/db/seed.js
// FULL DETAILED LESSONS — A1 to B2
// Each lesson has: theory, pronunciation, rules, exceptions, examples, exercises, quiz, TEF tips

const DB = require('./database');

function seedIfEmpty() {
  if (DB.findAll('lessons').length > 0) return;
  console.log('🌱 Seeding full detailed lessons...');

  const lessons = [

// ═══════════════════════════════════════════════════════════════════
// A1 LESSONS
// ═══════════════════════════════════════════════════════════════════

{
  level: 'A1', sort_order: 1, duration_min: 30, xp_reward: 50,
  title: 'Greetings & Introductions',
  description: 'Learn how to greet people and introduce yourself in French — essential for any real conversation.',
  content: JSON.stringify({
    intro: `In French, choosing the right greeting depends on the situation — formal (work, strangers, officials) or informal (friends, family, peers). Getting this right matters on the TEF/TCF oral exam. In Canada, French is used in federal government services, IRCC offices, and across Ontario's bilingual institutions.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Core Greetings',
        items: [
          { fr: 'Bonjour', en: 'Hello / Good day', pron: 'bon-ZHOOR', note: 'Use any time of day — most common greeting', formal: true },
          { fr: 'Bonsoir', en: 'Good evening', pron: 'bon-SWAHR', note: 'Use after ~6pm', formal: true },
          { fr: 'Salut', en: 'Hi / Hey', pron: 'sa-LÜ', note: 'Informal only — never use with strangers or officials', formal: false },
          { fr: 'Allô', en: 'Hello (on phone)', pron: 'a-LO', note: 'Used specifically when answering the phone', formal: false },
          { fr: 'Au revoir', en: 'Goodbye', pron: 'oh ruh-VWAHR', note: 'Standard goodbye, formal and informal', formal: true },
          { fr: 'À bientôt', en: 'See you soon', pron: 'ah byan-TOH', note: 'When you expect to see the person again', formal: true },
          { fr: 'À demain', en: 'See you tomorrow', pron: 'ah duh-MAN', note: 'Specific to next day', formal: true },
          { fr: 'Bonne journée', en: 'Have a good day', pron: 'bon zhoor-NAY', note: 'Said when parting during the day', formal: true },
          { fr: 'Bonne soirée', en: 'Have a good evening', pron: 'bon swah-RAY', note: 'Said when parting in the evening', formal: true },
        ]
      },
      {
        type: 'grammar',
        title: 'How to Ask Someone\'s Name',
        rules: [
          { rule: 'Formal (to a stranger, official, elder)', example: 'Comment vous appelez-vous?', translation: 'What is your name?', breakdown: 'comment (how) + vous appelez-vous (do you call yourself)' },
          { rule: 'Informal (to a friend, child, peer)', example: 'Comment tu t\'appelles?', translation: 'What\'s your name?', breakdown: 'comment (how) + tu t\'appelles (do you call yourself)' },
          { rule: 'Reply (always the same)', example: 'Je m\'appelle Osama.', translation: 'My name is Osama.', breakdown: 'je (I) + m\'appelle (call myself) + name' },
        ]
      },
      {
        type: 'grammar',
        title: 'How to Ask "How Are You?"',
        rules: [
          { rule: 'Formal', example: 'Comment allez-vous?', translation: 'How are you?', breakdown: 'comment (how) + allez-vous (are you going)' },
          { rule: 'Informal', example: 'Comment vas-tu? / Ça va?', translation: 'How are you? / How\'s it going?', breakdown: 'Ça va is the most common informal option' },
          { rule: 'Replies', example: 'Très bien, merci. / Bien, merci. / Pas mal.', translation: 'Very well, thanks. / Fine, thanks. / Not bad.', breakdown: 'Always add "et vous?" (formal) or "et toi?" (informal) = "and you?"' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Polite Phrases — Essential for TEF',
        items: [
          { fr: 'S\'il vous plaît', en: 'Please (formal)', pron: 'seel voo PLAY', note: 'Use with strangers, officials, services', formal: true },
          { fr: 'S\'il te plaît', en: 'Please (informal)', pron: 'seel tuh PLAY', note: 'Use with friends and family', formal: false },
          { fr: 'Merci', en: 'Thank you', pron: 'mair-SEE', note: 'Works in all situations', formal: true },
          { fr: 'Merci beaucoup', en: 'Thank you very much', pron: 'mair-SEE bo-KOO', note: 'More emphatic thanks', formal: true },
          { fr: 'De rien', en: 'You\'re welcome', pron: 'duh RYAN', note: 'Standard response to merci', formal: true },
          { fr: 'Avec plaisir', en: 'With pleasure', pron: 'ah-VEK play-ZEER', note: 'More warm/elegant response to merci', formal: true },
          { fr: 'Excusez-moi', en: 'Excuse me (formal)', pron: 'ex-küz-ay MWAH', note: 'To get attention or apologize formally', formal: true },
          { fr: 'Pardon', en: 'Sorry / Pardon', pron: 'par-DON', note: 'When bumping into someone or didn\'t hear', formal: true },
          { fr: 'Je suis désolé(e)', en: 'I\'m sorry', pron: 'zhuh swee day-zo-LAY', note: 'Genuine apology. Add -e if you are female', formal: true },
          { fr: 'Enchanté(e)', en: 'Pleased to meet you', pron: 'on-shon-TAY', note: 'Said when meeting someone for the first time. Add -e if female', formal: true },
        ]
      },
      {
        type: 'grammar',
        title: 'Formal vs Informal — The Key Rule',
        explanation: `French has two "registers" — formal (vouvoyer, using "vous") and informal (tutoyer, using "tu"). This is one of the most important distinctions in French.`,
        rules: [
          { rule: 'Use VOUS (formal) with:', example: 'Strangers, people older than you, bosses, officials, IRCC officers, doctors, teachers', translation: '', breakdown: '' },
          { rule: 'Use TU (informal) with:', example: 'Friends, family, children, peers your own age who invite it', translation: '', breakdown: '' },
          { rule: 'When in doubt:', example: 'Always start with VOUS. Wait for the other person to say "On peut se tutoyer?" (Can we use tu?)', translation: '', breakdown: '' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Full Dialogue — At an IRCC Office in Mississauga',
        lines: [
          { speaker: 'Agent', fr: 'Bonjour, comment puis-je vous aider?', en: 'Hello, how can I help you?' },
          { speaker: 'Vous', fr: 'Bonjour. Je m\'appelle Osama Al-Ahmed. J\'ai un rendez-vous à dix heures.', en: 'Hello. My name is Osama Al-Ahmed. I have an appointment at ten o\'clock.' },
          { speaker: 'Agent', fr: 'Très bien. Comment allez-vous aujourd\'hui?', en: 'Very good. How are you today?' },
          { speaker: 'Vous', fr: 'Très bien, merci. Et vous?', en: 'Very well, thank you. And you?' },
          { speaker: 'Agent', fr: 'Bien, merci. Asseyez-vous, s\'il vous plaît.', en: 'Fine, thank you. Please have a seat.' },
          { speaker: 'Vous', fr: 'Merci beaucoup.', en: 'Thank you very much.' },
        ]
      },
      {
        type: 'tips',
        title: 'TEF/TCF Exam Tips',
        tips: [
          'In the oral exam, always greet the examiner with "Bonjour" + "Comment allez-vous?" — never "Salut"',
          'End your oral response with "Merci" or "C\'est tout" (That\'s all) to signal you\'re done',
          'Using "vous" instead of "tu" with the examiner shows language awareness — it\'s always correct',
          'Enchaîner (linking) greetings shows fluency: "Bonjour, je m\'appelle Osama, enchanté de vous rencontrer"',
          '"Bonjour" is used all day in Quebec and Ontario — not just in the morning like in English',
        ]
      },
      {
        type: 'pronunciation',
        title: 'Pronunciation Guide — Common Mistakes',
        notes: [
          { word: 'Bonjour', tip: 'The "j" is like the "s" in "measure" or "pleasure" — NOT like English "j" in "jump"' },
          { word: 'Merci', tip: 'The "r" is a soft gargle from the back of the throat — not a rolled r' },
          { word: 'Enchanté', tip: 'The "en" is a nasal sound — air goes through your nose. Like "on" in "song" but with lips forward' },
          { word: 'Vous', tip: '"Voo" — the "s" is silent. Never say "vooz" unless the next word starts with a vowel (liaison)' },
          { word: 'S\'il vous plaît', tip: 'Often said fast: "seel-voo-PLAY" — the "t" at the end of plaît is silent' },
        ]
      }
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'You arrive at an IRCC office at 2pm. You see an officer. What do you say first?',
        options: ['Salut!', 'Bonjour!', 'Bonsoir!', 'Allô!'],
        correct: 1,
        explanation: '"Bonjour" is correct — it\'s formal and used all day. "Salut" is too informal for an official. "Bonsoir" is only for evenings. "Allô" is only for phone calls.'
      },
      {
        type: 'multiple_choice',
        question: 'An officer asks "Comment allez-vous?" You reply "Très bien, merci." What should you add to be polite?',
        options: ['Au revoir!', 'Et vous?', 'S\'il vous plaît', 'Pardon'],
        correct: 1,
        explanation: 'Always bounce the question back with "Et vous?" (formal) or "Et toi?" (informal). This shows politeness and conversational awareness — important on TEF oral.'
      },
      {
        type: 'multiple_choice',
        question: 'Your French colleague (same age, same level) says "On peut se tutoyer?" What does this mean?',
        options: ['Can we speak French?', 'Can we use "tu" with each other?', 'Can we meet tomorrow?', 'Can we eat together?'],
        correct: 1,
        explanation: '"Se tutoyer" means to use the informal "tu" with each other. When someone asks this, they are inviting a more informal relationship.'
      },
      {
        type: 'fill_blank',
        question: 'Complete: "Bonjour, je _______ appelle Osama."',
        options: ['me', 'm\'', 'te', 'se'],
        correct: 1,
        explanation: '"Je m\'appelle" — the verb is "s\'appeler" (to be called). Before a vowel, "me" contracts to "m\'". This is called elision.'
      },
      {
        type: 'fill_blank',
        question: 'You meet someone for the first time. You say: "Bonjour, je m\'appelle Osama. _______!"',
        options: ['Au revoir', 'Enchanté', 'Pardon', 'Salut'],
        correct: 1,
        explanation: '"Enchanté" means "pleased to meet you" and is said when meeting someone for the first time. If you are female, say "Enchantée" (with an extra -e, though it sounds the same).'
      },
      {
        type: 'multiple_choice',
        question: 'Someone says "Merci beaucoup!" to you. What is the most elegant response?',
        options: ['Bonjour', 'Pardon', 'Avec plaisir', 'Bonsoir'],
        correct: 2,
        explanation: '"Avec plaisir" (with pleasure) is a warm, elegant response. "De rien" also works. Both are more refined than simply repeating "merci".'
      },
      {
        type: 'translate',
        question: 'Translate to French: "Good evening, my name is Osama, pleased to meet you."',
        answer: 'Bonsoir, je m\'appelle Osama, enchanté de vous rencontrer.',
        alternatives: ['Bonsoir, je m\'appelle Osama, enchanté.'],
        explanation: '"Bonsoir" for evening. "Je m\'appelle" for my name is. "Enchanté de vous rencontrer" = pleased to meet you (formal). Using "vous" is correct here as you are meeting someone new.'
      },
      {
        type: 'multiple_choice',
        question: 'It is 8pm. You are leaving a restaurant. What do you say to the waiter?',
        options: ['Bonne journée!', 'Bonne soirée!', 'À demain!', 'Bonjour!'],
        correct: 1,
        explanation: '"Bonne soirée" (good evening / enjoy your evening) is correct for departing in the evening. "Bonne journée" is for departing during the day. "À demain" only if you\'ll see them tomorrow.'
      }
    ],
    quiz: [
      { question: 'Which greeting is appropriate at 3pm with a bank manager?', options: ['Salut', 'Bonjour', 'Allô', 'Coucou'], correct: 1, explanation: 'Bonjour is formal and used all day.' },
      { question: 'How do you formally ask someone\'s name?', options: ['Comment tu t\'appelles?', 'T\'as quel nom?', 'Comment vous appelez-vous?', 'C\'est quoi ton nom?'], correct: 2, explanation: 'Formal = vous form: Comment vous appelez-vous?' },
      { question: 'Someone says "Ça va?" You reply...', options: ['Bonjour', 'Ça va bien, merci. Et toi?', 'Au revoir', 'Enchanté'], correct: 1, explanation: 'Reply with your state + bounce the question back with "Et toi?" (informal) or "Et vous?" (formal).' },
      { question: 'What does "Enchanté" mean?', options: ['Goodbye', 'Thank you', 'Pleased to meet you', 'Excuse me'], correct: 2, explanation: 'Enchanté(e) = pleased to meet you. Said when meeting someone for the first time.' },
      { question: '"Je suis désolée" — the speaker is...', options: ['Male', 'Female', 'Could be either', 'A child'], correct: 1, explanation: 'The extra -e at the end of désolée indicates the speaker is female. Désolé (no e) = male speaker.' },
    ]
  })
},

{
  level: 'A1', sort_order: 2, duration_min: 30, xp_reward: 50,
  title: 'Numbers 1–100',
  description: 'Master French numbers for prices, addresses, phone numbers, ages, and dates — all essential for daily life in Canada.',
  content: JSON.stringify({
    intro: `Numbers are used constantly in French — at the grocery store, giving your address to IRCC, stating your phone number, discussing prices, or saying your age. French numbers have some quirks (especially 70-99) that English speakers find tricky. Master these and you will handle any real-life situation in Ontario.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Numbers 1–20 (Must Memorize)',
        items: [
          { fr: '1 — un/une', en: 'one', pron: 'uhn / ün', note: 'un = masculine, une = feminine (un enfant, une personne)' },
          { fr: '2 — deux', en: 'two', pron: 'duh', note: 'The x is silent' },
          { fr: '3 — trois', en: 'three', pron: 'twah', note: '' },
          { fr: '4 — quatre', en: 'four', pron: 'KAT-ruh', note: '' },
          { fr: '5 — cinq', en: 'five', pron: 'sank', note: 'The q is pronounced' },
          { fr: '6 — six', en: 'six', pron: 'sees', note: 'x is silent alone; pronounced before a vowel' },
          { fr: '7 — sept', en: 'seven', pron: 'set', note: 'The p and t are both pronounced' },
          { fr: '8 — huit', en: 'eight', pron: 'weet', note: '' },
          { fr: '9 — neuf', en: 'nine', pron: 'nuhf', note: 'f is pronounced; before "heures" it sounds like "nuv"' },
          { fr: '10 — dix', en: 'ten', pron: 'dees', note: '' },
          { fr: '11 — onze', en: 'eleven', pron: 'onz', note: 'No liaison before onze' },
          { fr: '12 — douze', en: 'twelve', pron: 'dooz', note: '' },
          { fr: '13 — treize', en: 'thirteen', pron: 'trez', note: '' },
          { fr: '14 — quatorze', en: 'fourteen', pron: 'ka-TORZ', note: '' },
          { fr: '15 — quinze', en: 'fifteen', pron: 'kanz', note: '' },
          { fr: '16 — seize', en: 'sixteen', pron: 'sez', note: '' },
          { fr: '17 — dix-sept', en: 'seventeen', pron: 'dee-SET', note: 'Compound: dix + sept' },
          { fr: '18 — dix-huit', en: 'eighteen', pron: 'deez-WEET', note: 'Liaison: dix-z-huit' },
          { fr: '19 — dix-neuf', en: 'nineteen', pron: 'deez-NUHF', note: '' },
          { fr: '20 — vingt', en: 'twenty', pron: 'van', note: 'The gt is silent alone; pronounced in 21-29' },
        ]
      },
      {
        type: 'grammar',
        title: 'Numbers 21–69 — The Easy Part',
        rules: [
          { rule: '21', example: 'vingt et un', translation: 'twenty and one', breakdown: 'Note: "et" (and) is used ONLY in 21, 31, 41, 51, 61, 71' },
          { rule: '22–29', example: 'vingt-deux, vingt-trois... vingt-neuf', translation: 'twenty-two to twenty-nine', breakdown: 'Hyphen between vingt and the unit. No "et".' },
          { rule: '30', example: 'trente', translation: 'thirty', breakdown: '' },
          { rule: '40', example: 'quarante', translation: 'forty', breakdown: '' },
          { rule: '50', example: 'cinquante', translation: 'fifty', breakdown: '' },
          { rule: '60', example: 'soixante', translation: 'sixty', breakdown: '' },
          { rule: '65', example: 'soixante-cinq', translation: 'sixty-five', breakdown: 'soixante + hyphen + unit number' },
        ]
      },
      {
        type: 'grammar',
        title: '70–99 — The Tricky Part (Very Important!)',
        explanation: 'French counts differently from 70 onwards. Instead of "seventy", French says "sixty-ten" (soixante-dix). Instead of "eighty", it says "four-twenties" (quatre-vingts). This trips up many learners.',
        rules: [
          { rule: '70', example: 'soixante-dix', translation: 'sixty-ten (= 70)', breakdown: 'NOT septante (that\'s Belgian/Swiss French)' },
          { rule: '71', example: 'soixante et onze', translation: 'sixty and eleven', breakdown: '"et" is used here too — soixante ET onze' },
          { rule: '72–79', example: 'soixante-douze... soixante-dix-neuf', translation: '72 to 79', breakdown: 'soixante + 12, 13, 14... 19' },
          { rule: '80', example: 'quatre-vingts', translation: 'four-twenties (= 80)', breakdown: 'Note the s on vingts when standing alone' },
          { rule: '81–89', example: 'quatre-vingt-un... quatre-vingt-neuf', translation: '81 to 89', breakdown: 'No s on vingt when followed by another number. No "et".' },
          { rule: '90', example: 'quatre-vingt-dix', translation: 'four-twenty-ten (= 90)', breakdown: '' },
          { rule: '91–99', example: 'quatre-vingt-onze... quatre-vingt-dix-neuf', translation: '91 to 99', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: '100 and Beyond',
        rules: [
          { rule: '100', example: 'cent', translation: 'one hundred', breakdown: 'Just "cent" — not "un cent"' },
          { rule: '101–199', example: 'cent un, cent deux... cent quatre-vingt-dix-neuf', translation: '101 to 199', breakdown: 'cent + number, no hyphen, no "et"' },
          { rule: '200', example: 'deux cents', translation: 'two hundred', breakdown: 's on cents when it ends the number' },
          { rule: '201', example: 'deux cent un', translation: 'two hundred and one', breakdown: 'No s when followed by another number' },
          { rule: '1000', example: 'mille', translation: 'one thousand', breakdown: 'Never "un mille" — just "mille". Never has an s.' },
          { rule: '1,000,000', example: 'un million', translation: 'one million', breakdown: 'Takes "un" and can have an s: deux millions' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Real Life — Giving Your Phone Number in French',
        explanation: 'In French, phone numbers are read in pairs. The Canadian number 905-849-3271 would be said: neuf zéro cinq, huit quarante-neuf, trente-deux, soixante et onze.',
        lines: [
          { speaker: 'Réceptionniste', fr: 'Quel est votre numéro de téléphone?', en: 'What is your phone number?' },
          { speaker: 'Vous', fr: 'C\'est le neuf cent cinq, huit quarante-neuf, trente-deux, soixante et onze.', en: 'It\'s 905-849-32-71.' },
          { speaker: 'Réceptionniste', fr: 'Et votre code postal?', en: 'And your postal code?' },
          { speaker: 'Vous', fr: 'L six J, deux B trois.', en: 'L6J 2B3.' },
        ]
      },
      {
        type: 'tips',
        title: 'Canadian Context — Numbers in Daily Life',
        tips: [
          'Prices: "Ça coûte vingt-quatre dollars quatre-vingt-dix-neuf" = $24.99',
          'Ages: "J\'ai trente-cinq ans" — always use AVOIR (to have) for age, never être',
          'Addresses: "J\'habite au quatre-vingt-deux, rue Lakeshore" = 82 Lakeshore Rd',
          'Postal codes are read letter by letter, number by number in French',
          'On TEF, you may hear numbers in a listening passage — 70-99 are the most commonly tested',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'How do you say 75 in French?', options: ['septante-cinq', 'soixante-quinze', 'soixante-cinq', 'soixante-dix-cinq'], correct: 1, explanation: '75 = soixante (60) + quinze (15) = soixante-quinze. "Septante" is Belgian/Swiss French, not used in Canada.' },
      { type: 'multiple_choice', question: 'How do you say 81 in French?', options: ['quatre-vingts-un', 'quatre-vingt-et-un', 'quatre-vingt-un', 'huitante-un'], correct: 2, explanation: '81 = quatre-vingt-un. No "s" on vingt (because a number follows). No "et" (et is only for 21, 31, 41, 51, 61, 71).' },
      { type: 'multiple_choice', question: 'How old is someone who says "J\'ai quarante-deux ans"?', options: ['32', '42', '52', '22'], correct: 1, explanation: 'Quarante-deux = 42. Quarante = 40, deux = 2.' },
      { type: 'fill_blank', question: 'Complete: "Le bus coûte trois dollars _______-cinq cents." (The bus costs $3.95)', options: ['soixante', 'quatre-vingt', 'quatre-vingt-dix', 'septante'], correct: 2, explanation: '95 = quatre-vingt-quinze. So $3.95 = trois dollars quatre-vingt-quinze cents.' },
      { type: 'multiple_choice', question: 'How do you say 100 in French?', options: ['un cent', 'cent', 'cents', 'uno cent'], correct: 1, explanation: 'Just "cent" — no "un" before it. "Un" is only added before million/milliard.' },
      { type: 'multiple_choice', question: 'What is "quatre-vingts" as a number?', options: ['74', '79', '80', '84'], correct: 2, explanation: 'Quatre-vingts = four × twenty = 80. This is one of the most tested numbers on TEF.' },
      { type: 'multiple_choice', question: 'How do you say your age in French? (You are 35)', options: ['Je suis trente-cinq ans', 'J\'ai trente-cinq ans', 'J\'habite trente-cinq', 'Je fais trente-cinq ans'], correct: 1, explanation: 'Age always uses AVOIR: J\'ai [number] ans. Never "je suis [age]" — that\'s a very common mistake.' },
      { type: 'translate', question: 'Translate: "I live at 92 Lakeshore Road, Oakville."', answer: 'J\'habite au quatre-vingt-douze, rue Lakeshore, à Oakville.', alternatives: ['J\'habite au 92, rue Lakeshore, Oakville.'], explanation: '92 = quatre-vingt-douze. "Au" before the number = at the [number]. "Rue" = road/street.' },
    ],
    quiz: [
      { question: 'What is soixante-dix-sept?', options: ['67', '77', '87', '97'], correct: 1, explanation: 'soixante (60) + dix-sept (17) = 77' },
      { question: 'How do you say 91?', options: ['quatre-vingt-onze', 'quatre-vingts-onze', 'soixante-onze', 'quatre-vingt-et-onze'], correct: 0, explanation: 'quatre-vingt-onze = 80 + 11 = 91. No s, no et.' },
      { question: 'J\'ai _______ ans. (I am 28)', options: ['vingt-huit', 'vingt-et-huit', 'vingts-huit', 'deux-vingt'], correct: 0, explanation: 'vingt-huit = 28. No et between vingt and 2-9.' },
      { question: 'Deux cents = ?', options: ['20', '200', '2000', '202'], correct: 1, explanation: 'cent = 100, deux cents = 200.' },
      { question: 'Which is correct for 71?', options: ['soixante-onze', 'soixante et onze', 'septante-un', 'soixante-dix-un'], correct: 1, explanation: '71 = soixante ET onze. "et" is used here because 71 ends in 1.' },
    ]
  })
},

{
  level: 'A1', sort_order: 3, duration_min: 35, xp_reward: 60,
  title: 'Definite Articles: le, la, l\', les',
  description: 'Every French noun has a gender. The definite article (the) changes based on gender and number — master this foundation.',
  content: JSON.stringify({
    intro: `In English, "the" works for everything. In French, "the" has four forms: le, la, l', and les. Which one you use depends on the gender (masculine or feminine) and number (singular or plural) of the noun. This is one of the most fundamental rules in French — and one of the most commonly tested on TEF/TCF. Getting articles wrong affects your score even when everything else is correct.`,
    sections: [
      {
        type: 'grammar',
        title: 'The Four Forms of "The"',
        rules: [
          { rule: 'LE — masculine singular', example: 'le parc, le café, le bus, le lac', translation: 'the park, the café, the bus, the lake', breakdown: 'Used before masculine nouns starting with a consonant' },
          { rule: 'LA — feminine singular', example: 'la rue, la ville, la maison, la bibliothèque', translation: 'the street, the city, the house, the library', breakdown: 'Used before feminine nouns starting with a consonant' },
          { rule: 'L\' — before a vowel or silent h', example: 'l\'école, l\'hôpital, l\'université, l\'enfant', translation: 'the school, the hospital, the university, the child', breakdown: 'Replaces le OR la when the noun starts with a vowel (a,e,i,o,u) or silent h. Gender still matters for agreement later.' },
          { rule: 'LES — all plurals', example: 'les parcs, les rues, les enfants, les maisons', translation: 'the parks, the streets, the children, the houses', breakdown: 'Used for ALL plural nouns — masculine and feminine. Always les.' },
        ]
      },
      {
        type: 'grammar',
        title: 'How to Know the Gender of a Noun',
        explanation: 'There are no perfect rules, but these patterns help. When in doubt, learn the article WITH the word.',
        rules: [
          { rule: 'Usually MASCULINE:', example: '-age (le voyage), -ment (le gouvernement), -isme (le tourisme), most languages (le français), days/months/seasons', translation: '', breakdown: '' },
          { rule: 'Usually FEMININE:', example: '-tion (la nation), -sion (la décision), -té (la liberté), -ure (la voiture), -ette (la baguette), most countries ending in -e (la France, la Chine)', translation: '', breakdown: '' },
          { rule: 'Canada is masculine:', example: 'le Canada, le Québec, l\'Ontario', translation: 'Exception: la France BUT le Canada', breakdown: '' },
          { rule: 'BEST STRATEGY:', example: 'Always learn words with their article: "le parc" not just "parc"', translation: '', breakdown: 'This is what native speakers do from childhood' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Essential Nouns with Articles — Oakville Context',
        items: [
          { fr: 'le lac', en: 'the lake (Lake Ontario)', pron: 'luh LAK', note: 'masculine' },
          { fr: 'le parc', en: 'the park', pron: 'luh PARK', note: 'masculine' },
          { fr: 'le bus', en: 'the bus (GO Transit)', pron: 'luh BÜS', note: 'masculine' },
          { fr: 'le train', en: 'the train', pron: 'luh TRAN', note: 'masculine' },
          { fr: 'le travail', en: 'the work / job', pron: 'luh tra-VY', note: 'masculine' },
          { fr: 'le gouvernement', en: 'the government', pron: 'luh goov-ern-MON', note: 'masculine — important for immigration' },
          { fr: 'le formulaire', en: 'the form (document)', pron: 'luh form-ü-LAIR', note: 'masculine — IRCC forms' },
          { fr: 'la ville', en: 'the city / town', pron: 'lah VEEL', note: 'feminine' },
          { fr: 'la rue', en: 'the street', pron: 'lah RÜ', note: 'feminine' },
          { fr: 'la maison', en: 'the house', pron: 'lah may-ZON', note: 'feminine' },
          { fr: 'la bibliothèque', en: 'the library', pron: 'lah bib-lee-oh-TEK', note: 'feminine' },
          { fr: 'la famille', en: 'the family', pron: 'lah fa-MEE', note: 'feminine' },
          { fr: 'la demande', en: 'the application / request', pron: 'lah duh-MOND', note: 'feminine — important for IRCC' },
          { fr: 'l\'école (f)', en: 'the school', pron: 'leh-KOL', note: 'feminine — l\' before vowel' },
          { fr: 'l\'hôpital (m)', en: 'the hospital', pron: 'loh-pee-TAL', note: 'masculine — l\' before silent h' },
          { fr: 'l\'aéroport (m)', en: 'the airport', pron: 'lair-oh-POR', note: 'masculine — l\' before vowel' },
          { fr: 'les enfants', en: 'the children', pron: 'lez-on-FON', note: 'plural — liaison: les-z-enfants' },
          { fr: 'les magasins', en: 'the stores', pron: 'lay ma-ga-ZAN', note: 'plural masculine' },
        ]
      },
      {
        type: 'grammar',
        title: 'Contractions with Articles — À and De',
        explanation: 'When le or les follows the prepositions "à" (at/to) or "de" (of/from), they CONTRACT. This is mandatory — you cannot avoid it.',
        rules: [
          { rule: 'à + le = AU', example: 'Je vais au parc. (NOT à le parc)', translation: 'I go to the park.', breakdown: 'à + le → au. Always.' },
          { rule: 'à + les = AUX', example: 'Je parle aux enfants. (NOT à les enfants)', translation: 'I speak to the children.', breakdown: 'à + les → aux. Always.' },
          { rule: 'à + la = à la (no change)', example: 'Je vais à la bibliothèque.', translation: 'I go to the library.', breakdown: 'à + la stays as à la.' },
          { rule: 'à + l\' = à l\' (no change)', example: 'Je vais à l\'école.', translation: 'I go to the school.', breakdown: 'à + l\' stays as à l\'.' },
          { rule: 'de + le = DU', example: 'Je viens du Canada. (NOT de le Canada)', translation: 'I come from Canada.', breakdown: 'de + le → du. Always.' },
          { rule: 'de + les = DES', example: 'Les prix des magasins.', translation: 'The prices of the stores.', breakdown: 'de + les → des. (Different from indefinite des!)' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — In Oakville',
        lines: [
          { speaker: 'Ami', fr: 'Tu vas où ce weekend?', en: 'Where are you going this weekend?' },
          { speaker: 'Vous', fr: 'Je vais au parc avec les enfants. Et après, à la bibliothèque.', en: 'I\'m going to the park with the children. And after, to the library.' },
          { speaker: 'Ami', fr: 'Le parc du lac Ontario?', en: 'The Lake Ontario park?' },
          { speaker: 'Vous', fr: 'Oui, c\'est le plus beau parc de la ville!', en: 'Yes, it\'s the most beautiful park in the city!' },
        ]
      },
      {
        type: 'tips',
        title: 'TEF/TCF Tips',
        tips: [
          'Article errors are heavily penalized on TEF written production — check every noun',
          'When you learn a new noun, ALWAYS memorize it with its article: "le formulaire", not just "formulaire"',
          'Plural is always "les" — you never need to guess gender for plurals',
          'l\' hides the gender — watch for agreement elsewhere (adjectives, past participles)',
          'The contractions au/aux/du/des are not optional — using "à le" or "de le" is a serious error',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Choose the correct article: "___ gouvernement canadien"', options: ['La', 'Le', 'Les', 'L\''], correct: 1, explanation: '"Gouvernement" ends in -ment → masculine → le gouvernement.' },
      { type: 'multiple_choice', question: 'Choose: "___ école est fermée aujourd\'hui."', options: ['Le', 'La', 'L\'', 'Les'], correct: 2, explanation: '"École" starts with a vowel → l\'école. Even though école is feminine, we use l\' before the vowel.' },
      { type: 'multiple_choice', question: '"Je vais ___ parc." Choose the correct form.', options: ['à le', 'au', 'à la', 'aux'], correct: 1, explanation: 'à + le (parc is masculine) = AU. "à le" is NEVER correct — it must contract to "au".' },
      { type: 'multiple_choice', question: '"Les prix ___ magasins sont élevés." Choose the correct form.', options: ['du', 'de la', 'de les', 'des'], correct: 3, explanation: 'de + les = DES. "de les" is never correct — it must contract.' },
      { type: 'fill_blank', question: 'Complete: "Je viens ___ Canada et j\'habite dans ___ ville d\'Oakville."', options: ['du / la', 'de la / le', 'du / une', 'de / la'], correct: 0, explanation: '"du Canada" = de + le Canada (masculine). "la ville" = feminine noun.' },
      { type: 'multiple_choice', question: 'Which noun is feminine?', options: ['le formulaire', 'le train', 'la demande', 'le lac'], correct: 2, explanation: '"La demande" is feminine. The -ande ending and the article "la" confirm it. Important word for IRCC applications.' },
      { type: 'multiple_choice', question: '"___ enfants jouent au parc."', options: ['Le', 'La', 'L\'', 'Les'], correct: 3, explanation: '"Enfants" is plural → always "les". Never mind the gender for plurals.' },
      { type: 'translate', question: 'Translate: "The hospital is near the park."', answer: 'L\'hôpital est près du parc.', alternatives: ['L\'hôpital est près le parc.'], explanation: 'L\'hôpital (masculine, silent h → l\'). du parc = de + le parc (contraction required).' },
    ],
    quiz: [
      { question: 'What is the article for "bibliothèque" (library)?', options: ['le', 'la', 'l\'', 'les'], correct: 1, explanation: 'La bibliothèque — feminine noun starting with consonant.' },
      { question: 'Complete: "Je parle ___ professeur." (I speak to the teacher — masculine)', options: ['à le', 'au', 'à la', 'à l\''], correct: 1, explanation: 'à + le professeur = au professeur. Mandatory contraction.' },
      { question: 'Which sentence is correct?', options: ['Je vais à le marché', 'Je vais au marché', 'Je vais à la marché', 'Je vais aux marché'], correct: 1, explanation: 'au marché — à + le marché (masculine) = au.' },
      { question: '"___ université est grande." Choose the correct article.', options: ['Le', 'La', 'L\'', 'Les'], correct: 2, explanation: 'Université starts with a vowel → l\'université (feminine but still l\').' },
      { question: 'Complete: "Les prix ___ restaurants sont chers."', options: ['du', 'des', 'de la', 'de les'], correct: 1, explanation: 'de + les restaurants = des restaurants. "de les" is never used.' },
    ]
  })
},

{
  level: 'A1', sort_order: 4, duration_min: 30, xp_reward: 55,
  title: 'Indefinite Articles: un, une, des',
  description: 'Learn when to use "a / an / some" in French — and the important cases where articles disappear entirely.',
  content: JSON.stringify({
    intro: `While definite articles (le, la, les) refer to specific, known things ("the park"), indefinite articles (un, une, des) refer to non-specific things ("a park", "some parks"). In French, every countable noun needs an article — you cannot drop it like in English. Understanding when to use indefinite vs definite articles is crucial for TEF writing and speaking.`,
    sections: [
      {
        type: 'grammar',
        title: 'The Three Indefinite Articles',
        rules: [
          { rule: 'UN — masculine singular', example: 'un parc, un café, un formulaire, un appartement', translation: 'a park, a café, a form, an apartment', breakdown: '"A/an" for masculine nouns' },
          { rule: 'UNE — feminine singular', example: 'une maison, une ville, une demande, une carte', translation: 'a house, a city, an application, a card', breakdown: '"A/an" for feminine nouns' },
          { rule: 'DES — all plurals', example: 'des parcs, des maisons, des formulaires, des enfants', translation: 'some parks, some houses, some forms, some children', breakdown: '"Some" or just a plural. Used for both genders. Often not translated in English.' },
        ]
      },
      {
        type: 'grammar',
        title: 'Indefinite Articles After NEGATION — Critical Rule!',
        explanation: 'After a negation (ne...pas, ne...plus, ne...jamais), un/une/des ALL change to "de" (or "d\'" before a vowel). This is one of the most tested grammar rules on TEF.',
        rules: [
          { rule: 'Positive → Negative', example: 'J\'ai un appartement. → Je n\'ai pas d\'appartement.', translation: 'I have an apartment. → I don\'t have an apartment.', breakdown: 'un → de (before vowel: d\')' },
          { rule: 'Positive → Negative', example: 'J\'ai une voiture. → Je n\'ai pas de voiture.', translation: 'I have a car. → I don\'t have a car.', breakdown: 'une → de' },
          { rule: 'Positive → Negative', example: 'J\'ai des enfants. → Je n\'ai pas d\'enfants.', translation: 'I have children. → I don\'t have children.', breakdown: 'des → de (before vowel: d\')' },
          { rule: 'EXCEPTION: être (to be)', example: 'Ce n\'est pas un problème.', translation: 'It\'s not a problem.', breakdown: 'After être in negation, the article does NOT change to de.' },
        ]
      },
      {
        type: 'grammar',
        title: 'When Articles Disappear — Professions and Nationalities',
        explanation: 'In French, after the verb "être" (to be), no article is used before professions, nationalities, or religions. This surprises English learners.',
        rules: [
          { rule: 'Profession (no article)', example: 'Je suis médecin. / Elle est avocate.', translation: 'I am a doctor. / She is a lawyer.', breakdown: 'No article! NOT "je suis un médecin" (that\'s incorrect)' },
          { rule: 'Nationality (no article)', example: 'Il est canadien. / Je suis marocain.', translation: 'He is Canadian. / I am Moroccan.', breakdown: 'No article. Also note: lowercase for nationalities as adjectives.' },
          { rule: 'BUT with adjective — article returns', example: 'C\'est un bon médecin.', translation: 'He is a good doctor.', breakdown: 'When you add an adjective, the article comes back.' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Key Words with Indefinite Articles — Immigration Context',
        items: [
          { fr: 'un permis de travail', en: 'a work permit', pron: 'uhn pehr-mee duh tra-VY', note: 'masculine' },
          { fr: 'un passeport', en: 'a passport', pron: 'uhn pass-POR', note: 'masculine' },
          { fr: 'un rendez-vous', en: 'an appointment', pron: 'uhn ron-day-VOO', note: 'masculine' },
          { fr: 'un emploi', en: 'a job', pron: 'uhn om-PLWAH', note: 'masculine' },
          { fr: 'une résidence', en: 'a residence', pron: 'ün ray-zee-DONS', note: 'feminine' },
          { fr: 'une adresse', en: 'an address', pron: 'ün a-DRESS', note: 'feminine' },
          { fr: 'une pièce d\'identité', en: 'a piece of ID', pron: 'ün pee-ess dee-don-tee-TAY', note: 'feminine' },
          { fr: 'des documents', en: 'documents', pron: 'day dok-ü-MON', note: 'plural' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — At an IRCC Appointment',
        lines: [
          { speaker: 'Agent', fr: 'Avez-vous un passeport valide?', en: 'Do you have a valid passport?' },
          { speaker: 'Vous', fr: 'Oui, j\'ai un passeport canadien et un permis de travail.', en: 'Yes, I have a Canadian passport and a work permit.' },
          { speaker: 'Agent', fr: 'Avez-vous des enfants?', en: 'Do you have children?' },
          { speaker: 'Vous', fr: 'Oui, j\'ai deux enfants.', en: 'Yes, I have two children.' },
          { speaker: 'Agent', fr: 'Avez-vous une adresse permanente au Canada?', en: 'Do you have a permanent address in Canada?' },
          { speaker: 'Vous', fr: 'Oui, j\'habite au quatre-vingt-deux, rue Lakeshore, à Oakville.', en: 'Yes, I live at 82 Lakeshore Road, in Oakville.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Complete: "J\'ai ___ appartement à Oakville."', options: ['un', 'une', 'des', 'de'], correct: 0, explanation: '"Appartement" is masculine singular → un appartement.' },
      { type: 'multiple_choice', question: 'Complete: "Je n\'ai pas ___ voiture." (I don\'t have a car)', options: ['une', 'un', 'de', 'des'], correct: 2, explanation: 'After negation, une → de. Je n\'ai pas DE voiture.' },
      { type: 'multiple_choice', question: 'Complete: "Il est ___ ingénieur." (He is an engineer)', options: ['un', 'une', 'des', 'no article needed'], correct: 3, explanation: 'After être + profession, no article is used. "Il est ingénieur." NOT "il est un ingénieur".' },
      { type: 'multiple_choice', question: 'Complete: "J\'ai ___ documents à vous donner."', options: ['un', 'une', 'des', 'de'], correct: 2, explanation: '"Documents" is plural → des documents.' },
      { type: 'fill_blank', question: 'Je n\'ai pas ___ passeport. (I don\'t have a passport)', options: ['un', 'de', 'd\'', 'une'], correct: 2, explanation: 'After negation: pas de. Before vowel (passeport starts with p — consonant so it\'s "de", not "d\'"). Actually: pas de passeport.' },
      { type: 'multiple_choice', question: 'Which sentence is correct?', options: ['Elle est une médecin.', 'Elle est médecin.', 'Elle est la médecin.', 'Elle est des médecins.'], correct: 1, explanation: 'Profession after être: no article. "Elle est médecin." is correct.' },
      { type: 'multiple_choice', question: 'Complete: "C\'est ___ bon médecin." (He\'s a good doctor)', options: ['no article', 'un', 'une', 'des'], correct: 1, explanation: 'When an adjective is added, the article returns: "C\'est un bon médecin." (With adjective → article required)' },
    ],
    quiz: [
      { question: 'Complete: "Elle a ___ fille et ___ fils."', options: ['un/une', 'une/un', 'des/des', 'un/un'], correct: 1, explanation: '"Fille" is feminine → une. "Fils" is masculine → un.' },
      { question: 'Complete: "Je n\'ai pas ___ enfants."', options: ['des', 'de', 'd\'', 'les'], correct: 2, explanation: 'After negation: des → de. Before vowel (enfants): de → d\'. Je n\'ai pas d\'enfants.' },
      { question: '"Il est ___." (He is a lawyer)', options: ['un avocat', 'avocat', 'l\'avocat', 'des avocat'], correct: 1, explanation: 'Profession after être = no article. "Il est avocat."' },
      { question: 'Complete: "J\'ai ___ rendez-vous à l\'IRCC."', options: ['une', 'des', 'un', 'de'], correct: 2, explanation: '"Rendez-vous" is masculine singular → un rendez-vous.' },
      { question: 'Complete: "Ce n\'est pas ___ problème." (It\'s not a problem)', options: ['de', 'd\'', 'un', 'une'], correct: 2, explanation: 'Exception: after "être" in negation, the article does NOT change. "Ce n\'est pas UN problème."' },
    ]
  })
},

{
  level: 'A1', sort_order: 5, duration_min: 25, xp_reward: 45,
  title: 'Personal Pronouns',
  description: 'Master the subject pronouns je, tu, il, elle, nous, vous, ils, elles — the foundation of every French sentence.',
  content: JSON.stringify({
    intro: `Every French sentence needs a subject pronoun. Unlike English, French pronouns change the form of the verb — so knowing which pronoun to use is critical. French has distinct formal and informal "you" forms, which we covered in Lesson 1. Now we look at the complete system.`,
    sections: [
      {
        type: 'grammar',
        title: 'The 8 French Subject Pronouns',
        rules: [
          { rule: 'JE', example: 'Je parle français.', translation: 'I speak French.', breakdown: 'First person singular. Becomes "j\'" before a vowel: J\'habite à Oakville.' },
          { rule: 'TU', example: 'Tu parles français?', translation: 'Do you speak French?', breakdown: 'Second person singular INFORMAL. Use with friends, family, children, peers.' },
          { rule: 'IL', example: 'Il travaille à Burlington.', translation: 'He works in Burlington.', breakdown: 'Third person masculine singular. Also used for masculine things: Le bus — il est en retard.' },
          { rule: 'ELLE', example: 'Elle habite à Oakville.', translation: 'She lives in Oakville.', breakdown: 'Third person feminine singular. Also for feminine things: La ville — elle est belle.' },
          { rule: 'ON', example: 'On mange à midi.', translation: 'We eat at noon. / One eats at noon.', breakdown: 'Very common in spoken French instead of "nous". Always uses il/elle verb form.' },
          { rule: 'NOUS', example: 'Nous habitons au Canada.', translation: 'We live in Canada.', breakdown: 'First person plural. More formal than "on" in speech.' },
          { rule: 'VOUS', example: 'Vous parlez très bien français!', translation: 'You speak French very well!', breakdown: 'Second person plural OR formal singular. Use with strangers, officials, elders.' },
          { rule: 'ILS', example: 'Ils travaillent à Toronto.', translation: 'They work in Toronto.', breakdown: 'Third person MASCULINE plural. Also used for mixed groups (male+female together).' },
          { rule: 'ELLES', example: 'Elles sont médecins.', translation: 'They are doctors.', breakdown: 'Third person FEMININE plural. ONLY for all-female groups.' },
        ]
      },
      {
        type: 'grammar',
        title: 'The ON Pronoun — Very Important for Spoken French',
        explanation: 'In spoken and informal written French, "on" is used instead of "nous" about 90% of the time. On TEF oral, using "on" sounds natural. Using only "nous" sounds very formal.',
        rules: [
          { rule: 'On = nous (we) in conversation', example: 'On va au parc. (= Nous allons au parc.)', translation: 'We\'re going to the park.', breakdown: 'Same meaning, more natural in speech' },
          { rule: 'On = general "people" / "one"', example: 'En France, on mange à 20h.', translation: 'In France, people eat at 8pm.', breakdown: 'Like "you" or "one" in English generalizations' },
          { rule: 'Verb form with on', example: 'On parle, on mange, on est... (same as il/elle)', translation: '', breakdown: 'On always uses third-person singular verb form' },
        ]
      },
      {
        type: 'grammar',
        title: 'ILS vs ELLES — The Mixed Group Rule',
        rules: [
          { rule: '1 man + 99 women = ILS', example: 'Paul et Marie → Ils sont contents.', translation: 'Paul and Marie → They are happy.', breakdown: 'Any group with at least one male → ILS. French grammar is masculine-dominant.' },
          { rule: 'All women = ELLES', example: 'Marie, Sophie et Fatima → Elles sont médecins.', translation: 'Marie, Sophie and Fatima → They are doctors.', breakdown: 'ELLES only when the entire group is female.' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Pronoun Usage in Real Sentences',
        items: [
          { fr: 'Je m\'appelle Osama.', en: 'My name is Osama.', pron: 'zhuh ma-PEL o-ZA-ma', note: 'j\' before vowel in j\'habite, j\'ai, etc.' },
          { fr: 'Tu as quel âge?', en: 'How old are you? (informal)', pron: 'tü ah kel azh', note: 'tu = informal you' },
          { fr: 'Il / Elle est médecin.', en: 'He / She is a doctor.', pron: 'eel / el ay may-duh-SAN', note: 'No article after être + profession' },
          { fr: 'On habite à Oakville.', en: 'We live in Oakville.', pron: 'on a-BEET ah oak-VEEL', note: 'on = we in casual speech' },
          { fr: 'Vous avez un passeport?', en: 'Do you have a passport? (formal)', pron: 'vooz a-VAY uhn pass-POR', note: 'Liaison: vous-z-avez' },
          { fr: 'Ils viennent du Maroc.', en: 'They come from Morocco.', pron: 'eel vee-EN dü ma-ROK', note: 'ils = they (mixed or all-male)' },
        ]
      },
      {
        type: 'tips',
        title: 'TEF/TCF Tips',
        tips: [
          'On the oral exam, use "on" naturally instead of "nous" — it sounds more fluent',
          '"Vous" can be singular (formal) or plural — context makes it clear',
          'Never forget: "ils" for any mixed group, "elles" only for all-female',
          'Je becomes j\' before a vowel: j\'ai, j\'habite, j\'étudie — never "je ai"',
          'In writing (TEF), use "nous" for formal essays — "on" is more for informal/spoken',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Your boss asks you a question. You reply "_____ travaille depuis cinq ans ici." Which pronoun?', options: ['Tu', 'Je', 'Il', 'On'], correct: 1, explanation: 'You are talking about yourself → Je travaille depuis cinq ans ici.' },
      { type: 'multiple_choice', question: 'Paul and Marie go to the park. You say "___ vont au parc."', options: ['Elles', 'Elle', 'Ils', 'Il'], correct: 2, explanation: 'Mixed group (one male + one female) → ILS. Any male in the group = ils.' },
      { type: 'multiple_choice', question: 'In spoken French, instead of "Nous allons au marché" you would say:', options: ['Vous allons au marché', 'On va au marché', 'Tu vas au marché', 'Ils vont au marché'], correct: 1, explanation: 'On va = we go. In spoken French, "on" replaces "nous" most of the time. Note: on va (not on allons).' },
      { type: 'multiple_choice', question: '"Je" becomes "_____" before a vowel.', options: ['je', 'j\'', 'jé', 'ja'], correct: 1, explanation: 'Before a vowel or silent h, "je" drops the "e" and adds an apostrophe: j\'ai, j\'habite, j\'étudie.' },
      { type: 'multiple_choice', question: 'Three sisters — Sophie, Marie, and Fatima. Which pronoun?', options: ['Ils', 'On', 'Elles', 'Vous'], correct: 2, explanation: 'All three are female → ELLES. "Elles sont trois sœurs."' },
      { type: 'multiple_choice', question: 'You are speaking formally to a bank manager (one person). Which "you"?', options: ['tu', 'vous', 'on', 'ils'], correct: 1, explanation: '"Vous" is used for formal singular (one person you respect) AND plural (multiple people). Always "vous" with officials.' },
    ],
    quiz: [
      { question: 'Which pronoun replaces "Marie et Paul"?', options: ['elles', 'ils', 'elle', 'on'], correct: 1, explanation: 'Mixed group → ils.' },
      { question: 'In spoken French, "nous mangeons" becomes:', options: ['vous mangez', 'on mange', 'ils mangent', 'tu manges'], correct: 1, explanation: 'On mange = nous mangeons in casual speech.' },
      { question: 'Complete: "___ habite à Oakville." (I live in Oakville)', options: ['Je', 'J\'', 'Tu', 'Il'], correct: 1, explanation: 'Before "habite" (starts with h — silent), je → j\'.' },
      { question: 'Which pronoun is ONLY for all-female groups?', options: ['Ils', 'Elles', 'Vous', 'On'], correct: 1, explanation: 'ELLES is used only when every person in the group is female.' },
      { question: 'A stranger asks you something. You use _____ to address them.', options: ['tu', 'on', 'vous', 'ils'], correct: 2, explanation: 'Stranger = formal → vous.' },
    ]
  })
},

// A1 lessons 6-13 (abbreviated structure — same pattern)
{
  level: 'A1', sort_order: 6, duration_min: 30, xp_reward: 60,
  title: 'Adjectives: Gender & Agreement',
  description: 'French adjectives change form to match the gender and number of the noun they describe — learn the rules and most common adjectives.',
  content: JSON.stringify({
    intro: `In French, adjectives must AGREE with the noun they describe in gender (masculine/feminine) and number (singular/plural). This means the same adjective can have up to 4 forms. Adjective agreement errors are among the most common mistakes on TEF/TCF written tests.`,
    sections: [
      {
        type: 'grammar',
        title: 'The 4 Forms of a Regular Adjective',
        rules: [
          { rule: 'Masculine singular (base form)', example: 'un grand lac', translation: 'a big lake', breakdown: 'Base form — no changes' },
          { rule: 'Feminine singular (+e)', example: 'une grande ville', translation: 'a big city', breakdown: 'Add -e to masculine form' },
          { rule: 'Masculine plural (+s)', example: 'des grands lacs', translation: 'big lakes', breakdown: 'Add -s to masculine form' },
          { rule: 'Feminine plural (+es)', example: 'des grandes villes', translation: 'big cities', breakdown: 'Add -es to masculine form' },
        ]
      },
      {
        type: 'grammar',
        title: 'Special Patterns — Irregular Adjectives',
        rules: [
          { rule: 'Already ends in -e: no change', example: 'un livre rouge / une voiture rouge', translation: 'a red book / a red car', breakdown: 'If masculine already ends in -e, feminine is identical' },
          { rule: 'Ends in -x: feminine = -se', example: 'heureux → heureuse', translation: 'happy (m) → happy (f)', breakdown: 'Also: dangereux→dangereuse, délicieux→délicieuse' },
          { rule: 'Ends in -er: feminine = -ère', example: 'premier → première', translation: 'first (m) → first (f)', breakdown: 'Also: dernier→dernière, étranger→étrangère' },
          { rule: 'Ends in -eur: feminine = -euse or -rice', example: 'travailleur→travailleuse, créateur→créatrice', translation: 'hardworking, creative', breakdown: '' },
          { rule: 'Ends in -f: feminine = -ve', example: 'actif → active, sportif → sportive', translation: 'active, sporty', breakdown: 'Also: naïf→naïve' },
          { rule: 'Doubles consonant + e', example: 'bon→bonne, gros→grosse, bas→basse', translation: 'good, big, low', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'BANGS Adjectives — Come BEFORE the Noun',
        explanation: 'Most French adjectives come AFTER the noun (une voiture rouge). But a small group of common adjectives come BEFORE. Remember them with BANGS: Beauty, Age, Number, Goodness, Size.',
        rules: [
          { rule: 'Beauty', example: 'un beau lac, une belle ville, un joli parc', translation: 'a beautiful lake, a beautiful city, a pretty park', breakdown: '' },
          { rule: 'Age', example: 'un vieux quartier, une jeune femme, un ancien collègue', translation: 'an old neighbourhood, a young woman, a former colleague', breakdown: '' },
          { rule: 'Number (ordinal)', example: 'le premier janvier, la deuxième page', translation: 'January first, the second page', breakdown: '' },
          { rule: 'Goodness', example: 'un bon médecin, une mauvaise idée', translation: 'a good doctor, a bad idea', breakdown: '' },
          { rule: 'Size', example: 'un grand parc, une petite maison, un long chemin', translation: 'a big park, a small house, a long road', breakdown: '' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Essential Adjectives with All Forms',
        items: [
          { fr: 'grand / grande / grands / grandes', en: 'big, tall', pron: 'gron / grond', note: 'Very common — BANGS adjective (size) → before noun' },
          { fr: 'petit / petite / petits / petites', en: 'small, short', pron: 'puh-TEE / puh-TEET', note: 'BANGS (size) → before noun' },
          { fr: 'bon / bonne / bons / bonnes', en: 'good', pron: 'bon / bun', note: 'BANGS (goodness) → before noun. Doubles the n.' },
          { fr: 'mauvais / mauvaise', en: 'bad', pron: 'mo-VEH / mo-VEZ', note: 'BANGS → before noun' },
          { fr: 'beau / belle / beaux / belles', en: 'beautiful, handsome', pron: 'bo / bell', note: 'BANGS → before noun. Irregular!' },
          { fr: 'nouveau / nouvelle', en: 'new', pron: 'noo-VO / noo-VEL', note: 'BANGS → before noun. Like beau/belle.' },
          { fr: 'vieux / vieille', en: 'old', pron: 'vyuh / vyay', note: 'BANGS → before noun. Irregular!' },
          { fr: 'rouge / rouge', en: 'red (m & f same)', pron: 'roozh', note: 'After noun. Already ends in -e.' },
          { fr: 'bleu / bleue / bleus / bleues', en: 'blue', pron: 'bluh / bluh', note: 'After noun.' },
          { fr: 'canadien / canadienne', en: 'Canadian', pron: 'ka-na-DYAN / ka-na-DYEN', note: 'After noun. Doubles n in feminine.' },
          { fr: 'francophone / francophone', en: 'French-speaking', pron: 'fron-ko-FON', note: 'Same form m&f. Very useful for Canada context.' },
          { fr: 'bilingue / bilingue', en: 'bilingual', pron: 'bee-LANG', note: 'Same form m&f. Key for Canadian job applications.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: '"Une ___ femme" — which form of "jeune" (young)?', options: ['jeune', 'jeunes', 'jeun', 'jeunesse'], correct: 0, explanation: '"Jeune" already ends in -e, so masculine and feminine are identical: un jeune homme, une jeune femme.' },
      { type: 'multiple_choice', question: 'Where does the adjective go? "une ville ___" or "___ une ville"? (belle — beautiful)', options: ['une ville belle', 'une belle ville', 'both are correct', 'belle une ville'], correct: 1, explanation: '"Belle" is a BANGS adjective (Beauty) → it goes BEFORE the noun: une belle ville.' },
      { type: 'multiple_choice', question: '"Des voitures ___" (red cars) — correct form of rouge?', options: ['rouge', 'rouges', 'rougs', 'rouge-s'], correct: 1, explanation: 'Plural → add -s. "rouge" → "rouges". Since rouge already ends in -e, feminine is same. Plural adds -s.' },
      { type: 'fill_blank', question: '"Il est ___." (He is active — actif)', options: ['active', 'actif', 'actifs', 'actives'], correct: 1, explanation: '"Il" = masculine singular → actif. Feminine would be "active" (-f → -ve).' },
      { type: 'multiple_choice', question: '"Une ___ idée" — which form of "bon"?', options: ['bon', 'bonne', 'bons', 'bonnes'], correct: 1, explanation: '"Idée" is feminine → bonne. Bon doubles the n in feminine: bon → bonne.' },
    ],
    quiz: [
      { question: 'Which adjective form is correct: "des ___ enfants" (happy children — heureux)?', options: ['heureux', 'heureuse', 'heureuses', 'heureux (same)'], correct: 3, explanation: 'Adjectives ending in -x do not add -s in the plural: des enfants heureux.' },
      { question: 'Where does "grand" go?', options: ['after the noun', 'before the noun', 'either position', 'never with nouns'], correct: 1, explanation: '"Grand" is a BANGS adjective (Size) → before the noun: un grand appartement.' },
      { question: '"Une femme ___" (creative — créateur)', options: ['créateur', 'créatrice', 'créateure', 'créatrices'], correct: 1, explanation: 'créateur → créatrice (feminine). -eur → -rice for this type.' },
      { question: '"Le gouvernement ___." (new — nouveau)', options: ['nouveau', 'nouvelle', 'nouveaux', 'nouvelles'], correct: 0, explanation: '"Gouvernement" is masculine singular → nouveau.' },
      { question: 'Complete: "C\'est une ___ ville." (beautiful)', options: ['beau', 'belle', 'beaux', 'belles'], correct: 1, explanation: '"Ville" is feminine → belle. (beau→belle, irregular)' },
    ]
  })
},

{
  level: 'A1', sort_order: 7, duration_min: 20, xp_reward: 40,
  title: 'Days, Months & Dates',
  description: 'Learn to say days of the week, months of the year, and full dates — essential for making appointments and discussing schedules.',
  content: JSON.stringify({
    intro: `Dates and times appear constantly in real life — booking appointments at IRCC, discussing work schedules, filling in forms. In French, dates follow a different format than English, and days/months are written in lowercase.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Days of the Week — Les Jours de la Semaine',
        items: [
          { fr: 'lundi', en: 'Monday', pron: 'luhn-DEE', note: 'All days lowercase in French. Week starts Monday.' },
          { fr: 'mardi', en: 'Tuesday', pron: 'mar-DEE', note: '' },
          { fr: 'mercredi', en: 'Wednesday', pron: 'mair-kruh-DEE', note: '' },
          { fr: 'jeudi', en: 'Thursday', pron: 'zhuh-DEE', note: '' },
          { fr: 'vendredi', en: 'Friday', pron: 'von-druh-DEE', note: '' },
          { fr: 'samedi', en: 'Saturday', pron: 'sam-DEE', note: '' },
          { fr: 'dimanche', en: 'Sunday', pron: 'dee-MONSH', note: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Using Days — Important Patterns',
        rules: [
          { rule: 'A specific day (this Monday)', example: 'Lundi, je vais à l\'IRCC.', translation: 'On Monday, I\'m going to IRCC.', breakdown: 'No article — just the day name.' },
          { rule: 'Every week (every Monday)', example: 'Le lundi, je travaille à domicile.', translation: 'On Mondays (every Monday), I work from home.', breakdown: 'Add "le" before the day for habitual action.' },
          { rule: 'Next/Last + day', example: 'lundi prochain / lundi dernier', translation: 'next Monday / last Monday', breakdown: 'prochain = next, dernier = last. Adjective AFTER the day.' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Months of the Year — Les Mois de l\'Année',
        items: [
          { fr: 'janvier', en: 'January', pron: 'zhon-VYAY', note: 'All months lowercase' },
          { fr: 'février', en: 'February', pron: 'fayv-RYAY', note: '' },
          { fr: 'mars', en: 'March', pron: 'MARS', note: '' },
          { fr: 'avril', en: 'April', pron: 'a-VREEL', note: '' },
          { fr: 'mai', en: 'May', pron: 'MAY', note: '' },
          { fr: 'juin', en: 'June', pron: 'ZHWAN', note: '' },
          { fr: 'juillet', en: 'July', pron: 'zhwee-AY', note: '' },
          { fr: 'août', en: 'August', pron: 'OOT or OO', note: 'The t may or may not be pronounced' },
          { fr: 'septembre', en: 'September', pron: 'sep-TOM-bruh', note: '' },
          { fr: 'octobre', en: 'October', pron: 'ok-TO-bruh', note: '' },
          { fr: 'novembre', en: 'November', pron: 'no-VOM-bruh', note: '' },
          { fr: 'décembre', en: 'December', pron: 'day-SOM-bruh', note: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'How to Say Dates in French',
        rules: [
          { rule: 'The date format', example: 'le [number] [month] [year]', translation: '', breakdown: 'Day comes before month. Always use cardinal numbers (deux, trois...) EXCEPT for the first (premier).' },
          { rule: 'The first of the month', example: 'le premier janvier', translation: 'January 1st', breakdown: '"Premier" (first) for the 1st. All others use regular numbers.' },
          { rule: 'Other dates', example: 'le deux février, le quinze mars, le vingt-cinq décembre', translation: 'February 2nd, March 15th, December 25th', breakdown: 'le + number + month (+ year optional)' },
          { rule: 'With the year', example: 'le trois mai deux mille vingt-six', translation: 'May 3rd, 2026', breakdown: '2026 = deux mille vingt-six' },
          { rule: 'Asking the date', example: 'Quelle est la date aujourd\'hui? / On est le combien?', translation: 'What is today\'s date? / What\'s today\'s date? (informal)', breakdown: '' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Seasons — Les Saisons',
        items: [
          { fr: 'le printemps', en: 'spring', pron: 'luh pran-TON', note: 'au printemps = in spring' },
          { fr: 'l\'été', en: 'summer', pron: 'lay-TAY', note: 'en été = in summer' },
          { fr: 'l\'automne', en: 'autumn / fall', pron: 'loh-TUN', note: 'en automne = in fall. The mn is silent.' },
          { fr: 'l\'hiver', en: 'winter', pron: 'lee-VAIR', note: 'en hiver = in winter. Very relevant in Ontario!' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'How do you say "every Friday" in French?', options: ['Vendredi', 'Le vendredi', 'Les vendredis', 'Un vendredi'], correct: 1, explanation: '"Le vendredi" = every Friday (habitual). "Vendredi" alone = this specific Friday.' },
      { type: 'multiple_choice', question: 'How do you write "January 1st" in French?', options: ['le un janvier', 'le premier janvier', 'le première janvier', 'le 1 janvier'], correct: 1, explanation: '"Premier" (not "un") for the first of the month: le premier janvier.' },
      { type: 'multiple_choice', question: 'Your IRCC appointment is on March 15th, 2026. You say:', options: ['le quinze mars deux mille vingt-six', 'le quinzième mars deux mille vingt-six', 'le mars quinze deux mille vingt-six', 'quinze mars deux-mille-vingt-six'], correct: 0, explanation: '"le quinze mars deux mille vingt-six" — day + month + year. Use cardinal number (quinze), not ordinal.' },
      { type: 'multiple_choice', question: 'How do you say "in winter" in French?', options: ['au hiver', 'en hiver', 'dans hiver', 'le hiver'], correct: 1, explanation: '"En hiver" — winter, summer and fall use "en". Spring uses "au printemps".' },
    ],
    quiz: [
      { question: 'What day comes after mercredi?', options: ['mardi', 'jeudi', 'vendredi', 'lundi'], correct: 1, explanation: 'lundi, mardi, mercredi, JEUDI...' },
      { question: 'How do you say "on Mondays" (every Monday)?', options: ['lundi', 'le lundi', 'les lundis', 'un lundi'], correct: 1, explanation: '"Le lundi" = every Monday, habitually.' },
      { question: '"En ___" — which season uses "au" instead of "en"?', options: ['été', 'hiver', 'automne', 'printemps'], correct: 3, explanation: '"Au printemps" — spring is the only season that uses "au".' },
      { question: 'How do you write March 2nd?', options: ['le deux mars', 'le deuxième mars', 'le second mars', 'deux mars'], correct: 0, explanation: '"le deux mars" — cardinal number, with "le" before it.' },
      { question: 'What is "juillet"?', options: ['June', 'July', 'January', 'August'], correct: 1, explanation: 'Juillet = July. (juin = June)' },
    ]
  })
},

// A2 LESSONS
{
  level: 'A2', sort_order: 14, duration_min: 35, xp_reward: 70,
  title: 'Être: The Verb "To Be"',
  description: 'Master all conjugations of être — the most important verb in French, used for identity, location, descriptions, and forming past tenses.',
  content: JSON.stringify({
    intro: `"Être" (to be) is one of the two most important verbs in French (along with avoir). It is completely irregular — you must memorize it. Être is used for identity, profession, nationality, location, descriptions, and as an auxiliary in past tenses. Getting être wrong affects nearly every sentence you write or speak.`,
    sections: [
      {
        type: 'grammar',
        title: 'Complete Conjugation of ÊTRE — Present Tense',
        rules: [
          { rule: 'je suis', example: 'Je suis immigrant au Canada.', translation: 'I am an immigrant in Canada.', breakdown: 'suis = am' },
          { rule: 'tu es', example: 'Tu es très courageux.', translation: 'You are very courageous.', breakdown: 'es = are (informal)' },
          { rule: 'il/elle/on est', example: 'Il est médecin. / Elle est canadienne. / On est prêts.', translation: 'He is a doctor. / She is Canadian. / We are ready.', breakdown: 'est = is / are (with on)' },
          { rule: 'nous sommes', example: 'Nous sommes une famille francophone.', translation: 'We are a French-speaking family.', breakdown: 'sommes = are' },
          { rule: 'vous êtes', example: 'Vous êtes le responsable du dossier?', translation: 'Are you the person in charge of the file?', breakdown: 'êtes = are (formal/plural). Note the circumflex on ê.' },
          { rule: 'ils/elles sont', example: 'Ils sont en retard. / Elles sont médecins.', translation: 'They are late. / They are doctors.', breakdown: 'sont = are (plural)' },
        ]
      },
      {
        type: 'grammar',
        title: 'Uses of ÊTRE — When to Use It',
        rules: [
          { rule: '1. Identity / Profession', example: 'Je suis ingénieur. Elle est avocate.', translation: 'I am an engineer. She is a lawyer.', breakdown: 'No article before profession with être!' },
          { rule: '2. Nationality / Origin', example: 'Je suis marocain. Nous sommes canadiens.', translation: 'I am Moroccan. We are Canadian.', breakdown: 'Lowercase, no article, must agree in gender' },
          { rule: '3. Location', example: 'Je suis à Oakville. L\'IRCC est à Mississauga.', translation: 'I am in Oakville. IRCC is in Mississauga.', breakdown: 'Being physically located somewhere' },
          { rule: '4. Description', example: 'La ville est belle. Il est grand.', translation: 'The city is beautiful. He is tall.', breakdown: 'Describing characteristics' },
          { rule: '5. Date / Time', example: 'Nous sommes le lundi. Il est dix heures.', translation: 'It is Monday. It is 10 o\'clock.', breakdown: 'Nous sommes for date; il est for time' },
          { rule: '6. Auxiliary for past tense', example: 'Je suis allé au Canada. Elle est venue hier.', translation: 'I went to Canada. She came yesterday.', breakdown: 'Used with motion/state verbs in passé composé (B1 lesson)' },
        ]
      },
      {
        type: 'grammar',
        title: 'ÊTRE vs AVOIR for Age, Hunger, etc.',
        explanation: 'English uses "to be" for many expressions that French handles differently with "avoir" (to have). This is a very common mistake.',
        rules: [
          { rule: 'Age → AVOIR', example: 'J\'ai 35 ans. (NOT je suis 35 ans)', translation: 'I am 35 years old.', breakdown: 'Literally: I HAVE 35 years' },
          { rule: 'Hunger/Thirst → AVOIR', example: 'J\'ai faim. / J\'ai soif. (NOT je suis faim)', translation: 'I am hungry. / I am thirsty.', breakdown: 'Literally: I have hunger / I have thirst' },
          { rule: 'Hot/Cold (person) → AVOIR', example: 'J\'ai chaud. / J\'ai froid. (NOT je suis chaud)', translation: 'I am hot. / I am cold.', breakdown: 'Literally: I have heat / I have cold' },
          { rule: 'Weather → FAIRE or IL Y A', example: 'Il fait chaud. / Il y a du soleil.', translation: 'It is hot (weather). / It is sunny.', breakdown: 'Never "il est chaud" for weather' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — Job Interview at a Canadian Company',
        lines: [
          { speaker: 'Employeur', fr: 'Bonjour, vous êtes M. Al-Ahmed?', en: 'Hello, are you Mr. Al-Ahmed?' },
          { speaker: 'Vous', fr: 'Oui, je suis Osama Al-Ahmed. Enchanté.', en: 'Yes, I am Osama Al-Ahmed. Pleased to meet you.' },
          { speaker: 'Employeur', fr: 'Vous êtes d\'où, originellement?', en: 'Where are you originally from?' },
          { speaker: 'Vous', fr: 'Je suis d\'origine marocaine, mais je suis résident permanent au Canada depuis 2023.', en: 'I am of Moroccan origin, but I have been a permanent resident in Canada since 2023.' },
          { speaker: 'Employeur', fr: 'Vous êtes bilingue?', en: 'Are you bilingual?' },
          { speaker: 'Vous', fr: 'Oui, je suis francophone et je parle aussi anglais couramment.', en: 'Yes, I am a French speaker and I also speak English fluently.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Complete: "Nous _______ une famille canadienne."', options: ['sommes', 'êtes', 'sont', 'suis'], correct: 0, explanation: 'Nous → sommes. The conjugation of être for "nous" is sommes.' },
      { type: 'multiple_choice', question: 'Complete: "J\'ai faim. Je _______ aussi fatiguée."', options: ['ai', 'avoir', 'suis', 'es'], correct: 2, explanation: 'Fatigue (being tired) uses ÊTRE: je suis fatiguée. But hunger uses avoir (j\'ai faim).' },
      { type: 'multiple_choice', question: 'Complete: "Il _______ médecin à l\'hôpital d\'Oakville."', options: ['a', 'est', 'sont', 'suis'], correct: 1, explanation: 'Il → est. Profession after être: il est médecin (no article).' },
      { type: 'multiple_choice', question: 'How do you say "I am 42 years old"?', options: ['Je suis 42 ans', 'J\'ai 42 ans', 'Je fais 42 ans', 'Mes ans sont 42'], correct: 1, explanation: 'Age always uses AVOIR: J\'ai 42 ans.' },
      { type: 'multiple_choice', question: 'Complete: "Vous _______ le responsable du dossier?" (formal)', options: ['suis', 'es', 'êtes', 'sont'], correct: 2, explanation: 'Vous → êtes. Used here as formal singular (one person).' },
      { type: 'fill_blank', question: '"On _______ le lundi 30 avril." (Today is Monday April 30th)', options: ['est', 'sommes', 'sont', 'êtes'], correct: 0, explanation: 'With "on" → est (same as il/elle). But to say the date formally: "Nous sommes le lundi 30 avril" also works.' },
    ],
    quiz: [
      { question: 'What is the être form for "vous"?', options: ['sont', 'sommes', 'êtes', 'est'], correct: 2, explanation: 'vous êtes — note the circumflex accent on ê.' },
      { question: 'Complete: "Ils _______ en retard."', options: ['est', 'suis', 'sont', 'sommes'], correct: 2, explanation: 'Ils → sont.' },
      { question: '"J\'ai chaud" means:', options: ['I have heat (an object)', 'I am hot (temperature)', 'I am warm (personality)', 'The weather is hot'], correct: 1, explanation: '"J\'ai chaud" = I am hot/warm (as a person feeling the temperature). Uses avoir, not être.' },
      { question: 'Which is correct for profession?', options: ['Elle est une infirmière', 'Elle est infirmière', 'Elle a infirmière', 'Elle fait infirmière'], correct: 1, explanation: 'Profession after être: no article. "Elle est infirmière."' },
      { question: 'Complete: "Nous _______ à Oakville depuis deux ans."', options: ['sont', 'êtes', 'sommes', 'suis'], correct: 2, explanation: 'Nous → sommes.' },
    ]
  })
},

{
  level: 'A2', sort_order: 15, duration_min: 35, xp_reward: 70,
  title: 'Avoir: The Verb "To Have"',
  description: 'Master avoir — essential for possession, age, expressions, and forming the most common past tense in French.',
  content: JSON.stringify({
    intro: `"Avoir" (to have) is the second most important verb in French after être. It is completely irregular and must be memorized. Avoir is used for possession, age, many common expressions, and as the auxiliary verb in the passé composé (the most common past tense). You will use avoir in almost every conversation.`,
    sections: [
      {
        type: 'grammar',
        title: 'Complete Conjugation of AVOIR — Present Tense',
        rules: [
          { rule: 'j\'ai', example: 'J\'ai un passeport canadien.', translation: 'I have a Canadian passport.', breakdown: 'j\'ai = I have. Note: je → j\' before ai (vowel)' },
          { rule: 'tu as', example: 'Tu as quel âge?', translation: 'How old are you?', breakdown: 'tu as = you have' },
          { rule: 'il/elle/on a', example: 'Il a deux enfants. / Elle a un rendez-vous.', translation: 'He has two children. / She has an appointment.', breakdown: 'a = has' },
          { rule: 'nous avons', example: 'Nous avons une maison à Oakville.', translation: 'We have a house in Oakville.', breakdown: 'avons = have' },
          { rule: 'vous avez', example: 'Vous avez votre permis de travail?', translation: 'Do you have your work permit?', breakdown: 'avez = have (formal/plural)' },
          { rule: 'ils/elles ont', example: 'Ils ont trois enfants. / Elles ont des documents.', translation: 'They have three children. / They have documents.', breakdown: 'ont = have (plural). Note: t is silent alone but links in liaison.' },
        ]
      },
      {
        type: 'grammar',
        title: 'AVOIR Expressions — Must Know for TEF',
        rules: [
          { rule: 'avoir [age] ans', example: 'J\'ai trente-cinq ans.', translation: 'I am 35 years old.', breakdown: 'Never "je suis 35 ans"!' },
          { rule: 'avoir faim', example: 'J\'ai faim. On mange?', translation: 'I\'m hungry. Shall we eat?', breakdown: '' },
          { rule: 'avoir soif', example: 'Vous avez soif? Je peux vous offrir de l\'eau.', translation: 'Are you thirsty? I can offer you some water.', breakdown: '' },
          { rule: 'avoir chaud/froid', example: 'J\'ai froid en hiver à Oakville!', translation: 'I\'m cold in winter in Oakville!', breakdown: '' },
          { rule: 'avoir peur (de)', example: 'Il a peur de rater l\'examen TEF.', translation: 'He is afraid of failing the TEF exam.', breakdown: '' },
          { rule: 'avoir besoin (de)', example: 'J\'ai besoin d\'un interprète.', translation: 'I need an interpreter.', breakdown: 'Very useful at IRCC offices' },
          { rule: 'avoir envie (de)', example: 'J\'ai envie d\'étudier le français.', translation: 'I feel like / want to study French.', breakdown: '' },
          { rule: 'avoir l\'air', example: 'Vous avez l\'air fatigué.', translation: 'You look tired.', breakdown: 'Avoir l\'air + adjective' },
          { rule: 'avoir lieu', example: 'L\'examen a lieu le 15 mars.', translation: 'The exam takes place on March 15th.', breakdown: 'Very useful for talking about events' },
          { rule: 'avoir raison/tort', example: 'Vous avez raison! / Il a tort.', translation: 'You are right! / He is wrong.', breakdown: 'Never "vous êtes raison"' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — At a Clinic in Oakville',
        lines: [
          { speaker: 'Médecin', fr: 'Bonjour, vous avez quel âge?', en: 'Hello, how old are you?' },
          { speaker: 'Vous', fr: 'J\'ai quarante ans.', en: 'I am forty years old.' },
          { speaker: 'Médecin', fr: 'Vous avez des allergies?', en: 'Do you have any allergies?' },
          { speaker: 'Vous', fr: 'Non, je n\'ai pas d\'allergies.', en: 'No, I don\'t have any allergies.' },
          { speaker: 'Médecin', fr: 'Vous avez besoin d\'un médicament?', en: 'Do you need a medication?' },
          { speaker: 'Vous', fr: 'Oui, j\'ai besoin d\'un antibiotique, s\'il vous plaît.', en: 'Yes, I need an antibiotic, please.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Complete: "Vous _______ votre carte d\'identité?"', options: ['ai', 'as', 'avez', 'ont'], correct: 2, explanation: 'Vous → avez.' },
      { type: 'multiple_choice', question: '"I need a form" in French:', options: ['Je suis besoin d\'un formulaire', 'J\'ai besoin d\'un formulaire', 'Je veux besoin d\'un formulaire', 'J\'ai besoins d\'un formulaire'], correct: 1, explanation: '"Avoir besoin de" = to need. J\'ai besoin d\'un formulaire.' },
      { type: 'multiple_choice', question: 'Complete: "Ils _______ trois enfants."', options: ['a', 'ont', 'avons', 'avez'], correct: 1, explanation: 'Ils → ont.' },
      { type: 'multiple_choice', question: '"You are right!" in French:', options: ['Vous êtes raison!', 'Vous avez raison!', 'Vous faites raison!', 'Vous êtes correct!'], correct: 1, explanation: '"Avoir raison" = to be right. Vous avez raison!' },
      { type: 'fill_blank', question: '"J\'_______ peur de l\'examen." (I am afraid of the exam)', options: ['suis', 'ai', 'est', 'fait'], correct: 1, explanation: '"Avoir peur" = to be afraid. J\'ai peur.' },
    ],
    quiz: [
      { question: 'What is the avoir form for "nous"?', options: ['ont', 'avez', 'avons', 'ai'], correct: 2, explanation: 'nous avons' },
      { question: '"She has an appointment" in French:', options: ['Elle est un rendez-vous', 'Elle a un rendez-vous', 'Elle avoir un rendez-vous', 'Elle ont un rendez-vous'], correct: 1, explanation: 'elle a = she has' },
      { question: '"I am thirsty" in French:', options: ['Je suis soif', 'J\'ai soif', 'Je fais soif', 'J\'être soif'], correct: 1, explanation: '"Avoir soif" = to be thirsty. J\'ai soif.' },
      { question: '"The exam takes place on Friday" — which expression?', options: ['avoir lieu', 'avoir faim', 'avoir besoin', 'avoir l\'air'], correct: 0, explanation: '"Avoir lieu" = to take place. L\'examen a lieu vendredi.' },
      { question: 'Complete: "Tu _______ quel âge?"', options: ['ai', 'es', 'as', 'ont'], correct: 2, explanation: 'tu as — asking age informally.' },
    ]
  })
},

{
  level: 'A2', sort_order: 16, duration_min: 40, xp_reward: 75,
  title: 'Present Tense: -ER Verbs',
  description: 'Learn to conjugate the most common French verb group — over 90% of new verbs in French are -ER verbs.',
  content: JSON.stringify({
    intro: `-ER verbs are the largest and most regular group in French. If you master this pattern, you can conjugate thousands of words. This is the foundation of French grammar and heavily tested on TEF at all levels — even B2 tests basic accuracy.`,
    sections: [
      {
        type: 'grammar',
        title: 'The -ER Verb Pattern',
        explanation: 'To conjugate: remove -er from the infinitive, then add the correct ending.',
        rules: [
          { rule: 'je → -e', example: 'je parle, je mange, je travaille', translation: 'I speak, I eat, I work', breakdown: 'Drop -er, add -e. Silent ending.' },
          { rule: 'tu → -es', example: 'tu parles, tu manges, tu travailles', translation: 'you speak, you eat, you work', breakdown: 'Drop -er, add -es. Silent ending.' },
          { rule: 'il/elle/on → -e', example: 'il parle, elle mange, on travaille', translation: 'he speaks, she eats, we work', breakdown: 'Same as je — silent ending.' },
          { rule: 'nous → -ons', example: 'nous parlons, nous mangeons, nous travaillons', translation: 'we speak, we eat, we work', breakdown: 'The -ons IS pronounced.' },
          { rule: 'vous → -ez', example: 'vous parlez, vous mangez, vous travaillez', translation: 'you speak, you eat, you work', breakdown: 'The -ez IS pronounced (like "ay").' },
          { rule: 'ils/elles → -ent', example: 'ils parlent, elles mangent, ils travaillent', translation: 'they speak, they eat, they work', breakdown: '-ent is SILENT — exactly like the singular forms.' },
        ]
      },
      {
        type: 'grammar',
        title: 'Spelling Changes — Important Exceptions',
        rules: [
          { rule: 'Verbs ending in -ger (manger, voyager)', example: 'nous mangeons (NOT mangjons)', translation: 'we eat', breakdown: 'Add -e before -ons to keep the soft g sound.' },
          { rule: 'Verbs ending in -cer (commencer, avancer)', example: 'nous commençons (NOT commençons with hard c)', translation: 'we start/begin', breakdown: 'Cedilla (ç) before -ons to keep soft c sound.' },
          { rule: 'Verbs ending in -yer (payer, nettoyer)', example: 'je paie / tu paies / ils paient (y → i)', translation: 'I pay / you pay / they pay', breakdown: 'y changes to i in je/tu/il/ils forms.' },
          { rule: 'Verbs like acheter (e → è)', example: 'j\'achète / tu achètes / il achète', translation: 'I buy / you buy / he buys', breakdown: 'Accent grave on è in je/tu/il/ils forms.' },
          { rule: 'Verbs like appeler (double l)', example: 'j\'appelle / tu appelles / il appelle', translation: 'I call / you call / he calls', breakdown: 'Double the l in je/tu/il/ils forms.' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Essential -ER Verbs — Memorize These',
        items: [
          { fr: 'parler', en: 'to speak', pron: 'par-LAY', note: 'Je parle français. Very common.' },
          { fr: 'habiter', en: 'to live (reside)', pron: 'a-bee-TAY', note: 'J\'habite à Oakville.' },
          { fr: 'travailler', en: 'to work', pron: 'tra-vye-YAY', note: 'Je travaille à Burlington.' },
          { fr: 'manger', en: 'to eat', pron: 'mon-ZHAY', note: 'Nous mangeons (spelling change!)' },
          { fr: 'étudier', en: 'to study', pron: 'ay-tüd-YAY', note: 'J\'étudie le français.' },
          { fr: 'chercher', en: 'to look for', pron: 'shair-SHAY', note: 'Je cherche un emploi.' },
          { fr: 'aimer', en: 'to like / love', pron: 'ay-MAY', note: 'J\'aime le Canada.' },
          { fr: 'acheter', en: 'to buy', pron: 'ash-TAY', note: 'J\'achète (è in singular)' },
          { fr: 'demander', en: 'to ask for', pron: 'duh-mon-DAY', note: 'Je demande un formulaire.' },
          { fr: 'donner', en: 'to give', pron: 'do-NAY', note: 'Vous donnez votre passeport.' },
          { fr: 'payer', en: 'to pay', pron: 'pay-YAY', note: 'Je paie par carte. (y→i)' },
          { fr: 'rester', en: 'to stay / remain', pron: 'res-TAY', note: 'Je reste au Canada.' },
          { fr: 'voyager', en: 'to travel', pron: 'vwah-ya-ZHAY', note: 'Nous voyageons (spelling change!)' },
          { fr: 'commencer', en: 'to begin / start', pron: 'ko-mon-SAY', note: 'Nous commençons (ç!)' },
          { fr: 'porter', en: 'to wear / carry', pron: 'por-TAY', note: 'Elle porte un manteau.' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — Talking About Daily Life',
        lines: [
          { speaker: 'Collègue', fr: 'Vous habitez où?', en: 'Where do you live?' },
          { speaker: 'Vous', fr: 'J\'habite à Oakville. Je travaille à Burlington.', en: 'I live in Oakville. I work in Burlington.' },
          { speaker: 'Collègue', fr: 'Vous voyagez en bus?', en: 'Do you travel by bus?' },
          { speaker: 'Vous', fr: 'Non, je prends le train GO. Je cherche aussi un appartement plus proche du bureau.', en: 'No, I take the GO Train. I\'m also looking for an apartment closer to the office.' },
          { speaker: 'Collègue', fr: 'Vous parlez très bien français!', en: 'You speak French very well!' },
          { speaker: 'Vous', fr: 'Merci! J\'étudie le français depuis deux ans. J\'aime beaucoup cette langue.', en: 'Thank you! I\'ve been studying French for two years. I love this language very much.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Conjugate "parler" for "vous": "Vous _______ français?"', options: ['parle', 'parles', 'parlez', 'parlent'], correct: 2, explanation: 'Vous → -ez ending: vous parlez. The -ez is pronounced "ay".' },
      { type: 'multiple_choice', question: 'Conjugate "manger" for "nous": "Nous _______ à midi."', options: ['mangons', 'mangeons', 'mangez', 'mangent'], correct: 1, explanation: 'Nous + -ger verb → insert e: nous mangeons (to keep the soft g sound).' },
      { type: 'multiple_choice', question: '"They work at Loblaws" — ils _______ chez Loblaws.', options: ['travaille', 'travailles', 'travaillons', 'travaillent'], correct: 3, explanation: 'Ils → -ent ending: ils travaillent. The -ent is completely silent!' },
      { type: 'multiple_choice', question: '"I\'m looking for a job" in French:', options: ['Je cherche un emploi', 'Je cherches un emploi', 'Je cherchons un emploi', 'Je cherchez un emploi'], correct: 0, explanation: 'Je → -e ending: je cherche. No -s after je.' },
      { type: 'fill_blank', question: '"J\'_______ le français depuis un an." (I study French — étudier)', options: ['étudies', 'étudie', 'étudions', 'étudiez'], correct: 1, explanation: 'Je + étudier → j\'étudie. Je → -e ending. (j\' because next word starts with é)' },
      { type: 'multiple_choice', question: 'Which is the correct nous form of "commencer"?', options: ['commençons', 'commençons', 'commençons', 'commencons'], correct: 0, explanation: 'Nous commençons — the ç (cedilla) is required before -ons to maintain the soft c sound.' },
    ],
    quiz: [
      { question: 'What ending do ils/elles take for -ER verbs?', options: ['-e', '-es', '-ons', '-ent'], correct: 3, explanation: '-ent for ils/elles. Crucially, -ent is completely silent.' },
      { question: 'Complete: "Il _______ à Oakville." (habiter)', options: ['habitons', 'habites', 'habite', 'habitent'], correct: 2, explanation: 'il → -e: il habite.' },
      { question: 'What is special about "manger" in the nous form?', options: ['Nothing special', 'Add an e before -ons', 'Change to -ger', 'Drop the g'], correct: 1, explanation: 'nous mangeons — e inserted to keep soft g sound.' },
      { question: 'Complete: "Vous _______ un appartement?" (chercher)', options: ['cherche', 'cherches', 'cherchez', 'cherchent'], correct: 2, explanation: 'vous → -ez: vous cherchez.' },
      { question: 'Which form is silent at the end?', options: ['nous parlons', 'vous parlez', 'ils parlent', 'je parle'], correct: 2, explanation: 'ils parlent — the -ent ending is completely silent. Sounds like il parle.' },
    ]
  })
},

// B1 LESSONS
{
  level: 'B1', sort_order: 26, duration_min: 45, xp_reward: 90,
  title: 'Passé Composé with Avoir',
  description: 'Learn the most common past tense in French — how to talk about completed events using avoir as the auxiliary verb.',
  content: JSON.stringify({
    intro: `The passé composé is the main past tense used in spoken French and informal writing. It describes completed actions in the past. On the TEF/TCF, you must know when to use passé composé vs imparfait — this is one of the most heavily tested distinctions at B1-B2 level. This lesson covers passé composé with avoir (most verbs). The next lesson covers passé composé with être (motion/state verbs).`,
    sections: [
      {
        type: 'grammar',
        title: 'How to Form the Passé Composé',
        explanation: 'Passé composé = AVOIR or ÊTRE (present tense) + PAST PARTICIPLE. This lesson focuses on verbs that use AVOIR.',
        rules: [
          { rule: 'Step 1: Conjugate avoir in present', example: 'j\'ai, tu as, il a, nous avons, vous avez, ils ont', translation: '', breakdown: '' },
          { rule: 'Step 2: Form the past participle', example: '-ER verbs: parler → parlé | -IR verbs: finir → fini | -RE verbs: vendre → vendu', translation: '', breakdown: 'Remove infinitive ending, add the past participle ending' },
          { rule: 'Step 3: Combine them', example: 'J\'ai parlé. / Il a fini. / Nous avons vendu.', translation: 'I spoke. / He finished. / We sold.', breakdown: 'avoir form + past participle' },
        ]
      },
      {
        type: 'grammar',
        title: 'Regular Past Participles',
        rules: [
          { rule: '-ER verbs → -É', example: 'parler→parlé, manger→mangé, travailler→travaillé, étudier→étudié', translation: 'spoken, eaten, worked, studied', breakdown: 'Remove -er, add -é. Very straightforward.' },
          { rule: '-IR verbs → -I', example: 'finir→fini, choisir→choisi, réussir→réussi', translation: 'finished, chosen, succeeded', breakdown: 'Remove -ir, add -i.' },
          { rule: '-RE verbs → -U', example: 'vendre→vendu, répondre→répondu, attendre→attendu', translation: 'sold, answered, waited', breakdown: 'Remove -re, add -u.' },
        ]
      },
      {
        type: 'grammar',
        title: 'Irregular Past Participles — Must Memorize',
        rules: [
          { rule: 'avoir → eu', example: 'J\'ai eu un rendez-vous.', translation: 'I had an appointment.', breakdown: '' },
          { rule: 'être → été', example: 'J\'ai été médecin au Maroc.', translation: 'I was a doctor in Morocco.', breakdown: 'Note: être uses avoir as auxiliary here!' },
          { rule: 'faire → fait', example: 'Il a fait une demande.', translation: 'He submitted an application.', breakdown: 'Very common!' },
          { rule: 'prendre → pris', example: 'J\'ai pris le bus GO.', translation: 'I took the GO bus.', breakdown: '' },
          { rule: 'mettre → mis', example: 'Elle a mis les documents dans l\'enveloppe.', translation: 'She put the documents in the envelope.', breakdown: '' },
          { rule: 'voir → vu', example: 'Nous avons vu l\'agent d\'IRCC.', translation: 'We saw the IRCC officer.', breakdown: '' },
          { rule: 'lire → lu', example: 'J\'ai lu le formulaire.', translation: 'I read the form.', breakdown: '' },
          { rule: 'écrire → écrit', example: 'Il a écrit une lettre.', translation: 'He wrote a letter.', breakdown: '' },
          { rule: 'recevoir → reçu', example: 'J\'ai reçu une lettre d\'IRCC.', translation: 'I received a letter from IRCC.', breakdown: 'Very useful for immigration!' },
          { rule: 'pouvoir → pu', example: 'Il n\'a pas pu venir.', translation: 'He couldn\'t come.', breakdown: '' },
          { rule: 'vouloir → voulu', example: 'J\'ai voulu expliquer.', translation: 'I wanted to explain.', breakdown: '' },
          { rule: 'savoir → su', example: 'Elle a su la réponse.', translation: 'She knew the answer.', breakdown: '' },
          { rule: 'devoir → dû', example: 'J\'ai dû attendre deux heures.', translation: 'I had to wait two hours.', breakdown: '' },
          { rule: 'boire → bu', example: 'Il a bu un café.', translation: 'He drank a coffee.', breakdown: '' },
          { rule: 'croire → cru', example: 'Nous avons cru que...', translation: 'We believed that...', breakdown: '' },
        ]
      },
      {
        type: 'grammar',
        title: 'Negation in Passé Composé',
        rules: [
          { rule: 'ne...pas wraps the auxiliary', example: 'Je n\'ai pas parlé. / Il n\'a pas fini.', translation: 'I didn\'t speak. / He didn\'t finish.', breakdown: 'ne comes before avoir, pas comes after avoir — before the past participle.' },
          { rule: 'With other negatives', example: 'Je n\'ai jamais mangé là. / Il n\'a rien dit.', translation: 'I\'ve never eaten there. / He said nothing.', breakdown: 'jamais (never), rien (nothing), personne (nobody) — same position.' },
        ]
      },
      {
        type: 'grammar',
        title: 'When to Use Passé Composé',
        rules: [
          { rule: 'Completed actions', example: 'J\'ai soumis ma demande hier.', translation: 'I submitted my application yesterday.', breakdown: 'One completed event at a specific time' },
          { rule: 'A sequence of events', example: 'Je suis arrivé, j\'ai attendu, et j\'ai parlé à l\'agent.', translation: 'I arrived, I waited, and I spoke to the officer.', breakdown: 'Series of consecutive completed actions' },
          { rule: 'With time markers', example: 'hier (yesterday), la semaine dernière (last week), en 2023, ce matin (this morning)', translation: '', breakdown: 'These time words signal passé composé' },
        ]
      },
      {
        type: 'dialogue',
        title: 'Dialogue — Describing Your Day at IRCC',
        lines: [
          { speaker: 'Ami', fr: 'Comment s\'est passé ton rendez-vous à l\'IRCC?', en: 'How did your appointment at IRCC go?' },
          { speaker: 'Vous', fr: 'Ça a bien marché! J\'ai pris le train GO à huit heures.', en: 'It went well! I took the GO Train at eight.' },
          { speaker: 'Ami', fr: 'Tu as attendu longtemps?', en: 'Did you wait long?' },
          { speaker: 'Vous', fr: 'J\'ai attendu trente minutes. Ensuite, j\'ai parlé à une agente très sympa.', en: 'I waited thirty minutes. Then I spoke to a very nice officer.' },
          { speaker: 'Ami', fr: 'Tu as donné tous les documents?', en: 'Did you give all the documents?' },
          { speaker: 'Vous', fr: 'Oui, j\'ai donné mon passeport, mes formulaires et j\'ai reçu un récépissé.', en: 'Yes, I gave my passport, my forms and I received a receipt.' },
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Complete: "J\'_______ reçu une lettre d\'IRCC ce matin."', options: ['ai', 'suis', 'as', 'avez'], correct: 0, explanation: 'J\'ai reçu — je + avoir → j\'ai + past participle (reçu).' },
      { type: 'multiple_choice', question: 'What is the past participle of "faire"?', options: ['faisu', 'faisé', 'fait', 'fais'], correct: 2, explanation: 'faire → fait. One of the most important irregular past participles.' },
      { type: 'multiple_choice', question: '"He didn\'t study" in passé composé:', options: ['Il ne pas a étudié', 'Il n\'a pas étudié', 'Il n\'a pas étudier', 'Il pas a étudié'], correct: 1, explanation: 'Negation wraps the auxiliary: il n\'a pas + past participle (étudié).' },
      { type: 'multiple_choice', question: '"We submitted the application" — Nous _______ la demande.', options: ['avons soumis', 'sommes soumis', 'avons soumettre', 'avons soumise'], correct: 0, explanation: 'soumettre → soumis. Nous avons soumis. (Uses avoir, not être.)' },
      { type: 'fill_blank', question: '"J\'_______ lu tous les formulaires avant le rendez-vous."', options: ['ai', 'suis', 'avoir', 'a'], correct: 0, explanation: 'j\'ai lu — lire → lu. Uses avoir.' },
      { type: 'translate', question: 'Translate: "She received her permanent residence card last week."', answer: 'Elle a reçu sa carte de résidence permanente la semaine dernière.', alternatives: ['Elle a reçu sa carte de résident permanent la semaine dernière.'], explanation: 'recevoir → reçu. Elle a (avoir for she) + reçu. "La semaine dernière" = last week.' },
    ],
    quiz: [
      { question: 'What is the past participle of "prendre"?', options: ['prendu', 'pris', 'prené', 'prendé'], correct: 1, explanation: 'prendre → pris.' },
      { question: 'Complete: "Vous _______ votre passeport?" (Did you bring...  — apporter)', options: ['avez apporté', 'êtes apporté', 'avez apporter', 'avons apporté'], correct: 0, explanation: 'apporter → apporté (-ER verb). Vous avez apporté.' },
      { question: 'Where does "pas" go in negation?', options: ['After the past participle', 'Before "ne"', 'After the auxiliary (avoir/être)', 'Before the subject'], correct: 2, explanation: 'Je n\'ai [PAS] étudié — pas comes after avoir/être, before the past participle.' },
      { question: '"J\'ai été..." uses which auxiliary?', options: ['être', 'avoir', 'aller', 'faire'], correct: 1, explanation: 'Être in passé composé uses avoir: j\'ai été (I was/have been).' },
      { question: 'Which time word signals passé composé?', options: ['demain', 'maintenant', 'hier', 'bientôt'], correct: 2, explanation: '"Hier" (yesterday) signals a completed past action → passé composé.' },
    ]
  })
},

// B2 LESSON
{
  level: 'B2', sort_order: 38, duration_min: 55, xp_reward: 120,
  title: 'Expressing Opinions & Argumentation',
  description: 'Master the formal opinion phrases, argument structures, and connectors needed for TEF/TCF written and oral production at B2.',
  content: JSON.stringify({
    intro: `At B2 level, you are evaluated not just on accuracy but on the quality of your argumentation. The TEF written production and oral tasks require you to express nuanced opinions, support them with arguments, acknowledge counter-arguments, and conclude effectively. This lesson gives you the full toolkit for the TEF/TCF production sections.`,
    sections: [
      {
        type: 'vocabulary',
        title: 'Expressing Your Opinion — Formal Register',
        items: [
          { fr: 'À mon avis, / Selon moi,', en: 'In my opinion,', pron: 'ah mon a-VEE / suh-LON mwah', note: 'Most common. Use freely.' },
          { fr: 'Je suis d\'avis que + indicative', en: 'I am of the opinion that', pron: '', note: 'More formal. Je suis d\'avis que le bilinguisme est essentiel.' },
          { fr: 'Je considère que / J\'estime que', en: 'I consider that / I believe that', pron: '', note: 'Formal and weighted — use in essays' },
          { fr: 'Il me semble que + indicative', en: 'It seems to me that', pron: '', note: 'Adds nuance — not 100% certain' },
          { fr: 'Je suis convaincu(e) que', en: 'I am convinced that', pron: '', note: 'Strong conviction — good for TEF oral' },
          { fr: 'Force est de constater que', en: 'One must acknowledge that', pron: '', note: 'Very formal. Excellent for B2 essays.' },
          { fr: 'Je ne suis pas convaincu(e) que + subjunctive', en: 'I am not convinced that', pron: '', note: 'Doubt → triggers subjunctive' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Discourse Connectors — The Key to B2 Coherence',
        items: [
          { fr: 'D\'une part... d\'autre part...', en: 'On one hand... on the other hand...', pron: '', note: 'Classic structure for presenting two sides' },
          { fr: 'Premièrement / Deuxièmement / Enfin', en: 'Firstly / Secondly / Finally', pron: '', note: 'For ordered arguments' },
          { fr: 'En outre / De plus / Qui plus est', en: 'Furthermore / Moreover / What\'s more', pron: '', note: 'Adding an argument — increasingly emphatic' },
          { fr: 'Cependant / Néanmoins / Toutefois', en: 'However / Nevertheless / Yet', pron: '', note: 'Contrast — shows nuanced thinking' },
          { fr: 'En revanche / Par contre', en: 'On the other hand / In contrast', pron: '', note: '"Par contre" more informal; "en revanche" preferred in writing' },
          { fr: 'C\'est pourquoi / Par conséquent / Ainsi', en: 'That is why / Consequently / Thus', pron: '', note: 'Cause → effect. Very important for conclusions.' },
          { fr: 'En effet / Car / Puisque / Étant donné que', en: 'Indeed / Because / Since / Given that', pron: '', note: 'Explaining reasons — vary them!' },
          { fr: 'Bien que + subjunctive / Quoique + subjunctive', en: 'Although / Even though', pron: '', note: 'Concession — acknowledges opposing view. Requires subjunctive!' },
          { fr: 'En somme / En conclusion / Pour conclure / Tout compte fait', en: 'In sum / In conclusion / To conclude / All things considered', pron: '', note: 'Conclusion markers — use only once, at the end' },
        ]
      },
      {
        type: 'grammar',
        title: 'TEF Written Production Structure — The Formula',
        explanation: 'TEF written production tasks ask you to write 160-200 words (task 1) or 200+ words (task 2). Use this structure every time.',
        rules: [
          { rule: 'Introduction (2-3 sentences)', example: 'Présenter le sujet + annoncer votre plan', translation: 'La question de l\'immigration au Canada suscite de nombreux débats. Dans un premier temps, j\'examinerai les avantages; ensuite, j\'aborderai les difficultés.', breakdown: 'Name the topic. Announce your plan.' },
          { rule: 'Argument 1 (3-4 sentences)', example: 'Thèse + exemple + développement', translation: 'D\'une part, l\'immigration contribue considérablement à l\'économie canadienne. En effet, les immigrants occupent des postes essentiels dans les secteurs de la santé, de l\'éducation et du commerce.', breakdown: 'State your point. Give evidence. Develop.' },
          { rule: 'Argument 2 / Counterargument (3-4 sentences)', example: 'Cependant / Néanmoins + nuance', translation: 'Cependant, l\'intégration linguistique représente un défi majeur. Bien que le gouvernement offre des cours de langue gratuits, de nombreux nouveaux arrivants peinent à atteindre le niveau requis.', breakdown: 'Acknowledge complexity. Show nuanced thinking.' },
          { rule: 'Conclusion (2-3 sentences)', example: 'Synthèse + position finale', translation: 'En conclusion, l\'immigration constitue une richesse pour le Canada, à condition que les politiques d\'intégration soient renforcées. C\'est pourquoi je soutiens une approche équilibrée.', breakdown: 'Summarize. Give your final position clearly.' },
        ]
      },
      {
        type: 'vocabulary',
        title: 'Essential B2 Vocabulary — Canadian Immigration Context',
        items: [
          { fr: 'l\'intégration linguistique', en: 'linguistic integration', pron: '', note: '' },
          { fr: 'la main-d\'œuvre qualifiée', en: 'skilled workforce / labour', pron: '', note: '' },
          { fr: 'les politiques d\'immigration', en: 'immigration policies', pron: '', note: '' },
          { fr: 'le marché du travail', en: 'the job market / labour market', pron: '', note: '' },
          { fr: 'la cohésion sociale', en: 'social cohesion', pron: '', note: '' },
          { fr: 'le bilinguisme officiel', en: 'official bilingualism', pron: '', note: '' },
          { fr: 'l\'enrichissement culturel', en: 'cultural enrichment', pron: '', note: '' },
          { fr: 'les défis d\'adaptation', en: 'adaptation challenges', pron: '', note: '' },
          { fr: 'la reconnaissance des diplômes', en: 'credential recognition', pron: '', note: 'Very relevant for immigrants!' },
          { fr: 'la pénurie de main-d\'œuvre', en: 'labour shortage', pron: '', note: 'Common in Canadian news' },
        ]
      },
      {
        type: 'tips',
        title: 'TEF Oral Production — Scoring Tips',
        tips: [
          'Use connectors visibly — examiners are listening for cependant, en outre, c\'est pourquoi',
          'Always give a concrete example: "Par exemple, à Oakville, les entreprises cherchent des employés bilingues"',
          'Never say "Je pense pas" — say "Je ne pense pas" (written exam) or at least "Je pense pas que ce soit vrai" (oral, with subjunctive)',
          'End your oral presentation with a clear conclusion: "Pour conclure, je suis convaincu que..."',
          'Vary your opinion phrases — don\'t say "à mon avis" 5 times. Use: je considère que / il me semble que / force est de constater que',
          'Show register awareness — use "en revanche" not "par contre" in written production for higher marks',
        ]
      }
    ],
    exercises: [
      { type: 'multiple_choice', question: 'Which connector introduces a contrast?', options: ['En outre', 'Cependant', 'Par conséquent', 'En effet'], correct: 1, explanation: '"Cependant" = however/nevertheless — introduces a contrasting idea. "En outre" adds, "Par conséquent" shows consequence, "En effet" explains.' },
      { type: 'multiple_choice', question: 'Complete: "Bien que le Canada _______ une politique de bilinguisme, beaucoup de fonctionnaires ne parlent pas français."', options: ['a', 'ait', 'aura', 'avait'], correct: 1, explanation: '"Bien que" requires the SUBJUNCTIVE: ait (subjonctif of avoir). Bien que + subjunctive = although.' },
      { type: 'multiple_choice', question: 'Which phrase is most formal and appropriate for a TEF essay?', options: ['Je pense que', 'Je crois que', 'Force est de constater que', 'Je trouve que'], correct: 2, explanation: '"Force est de constater que" is highly formal and shows B2+ register. The others are more casual/neutral.' },
      { type: 'multiple_choice', question: 'In a TEF essay, which is better: "par contre" or "en revanche"?', options: ['par contre — it\'s clearer', 'en revanche — it\'s more formal', 'they are identical', 'neither should be used'], correct: 1, explanation: '"En revanche" is preferred in formal written French. "Par contre" is more oral/informal. Examiners notice this distinction.' },
      { type: 'translate', question: 'Translate: "Although integration is difficult, immigrants contribute enormously to Canadian society."', answer: 'Bien que l\'intégration soit difficile, les immigrants contribuent énormément à la société canadienne.', alternatives: ['Quoique l\'intégration soit difficile, les immigrants contribuent énormément à la société canadienne.'], explanation: '"Bien que/Quoique" + subjunctive (soit = subjonctif of être). "Contribuent" = present tense of contribuer.' },
      { type: 'multiple_choice', question: 'What is the correct conclusion connector?', options: ['D\'une part', 'En outre', 'Pour conclure', 'Cependant'], correct: 2, explanation: '"Pour conclure" = to conclude. Use at the start of your final paragraph. D\'une part introduces, en outre adds, cependant contrasts.' },
    ],
    quiz: [
      { question: 'Which connector shows a consequence?', options: ['Néanmoins', 'Par conséquent', 'D\'une part', 'Bien que'], correct: 1, explanation: '"Par conséquent" = consequently/therefore — shows cause and effect.' },
      { question: '"Bien que" requires which verb mood?', options: ['Indicative', 'Conditional', 'Subjunctive', 'Imperative'], correct: 2, explanation: '"Bien que" always triggers the subjunctive: Bien que ce soit difficile...' },
      { question: 'Which is NOT a way to express opinion in formal French?', options: ['À mon avis', 'Je trouve que', 'Je suis d\'avis que', 'Il me semble que'], correct: 1, explanation: '"Je trouve que" is informal/casual. The others are appropriate for TEF formal register.' },
      { question: 'What does "force est de constater que" mean?', options: ['I strongly disagree that', 'One must acknowledge that', 'It is forced to say that', 'Consequently we note that'], correct: 1, explanation: '"Force est de constater que" = one must acknowledge/note that. A very strong, formal expression.' },
      { question: 'In a TEF essay, where do you use "Pour conclure"?', options: ['At the beginning', 'When adding an argument', 'At the start of the final paragraph', 'When contrasting ideas'], correct: 2, explanation: '"Pour conclure" marks the conclusion paragraph — use it once, at the very end.' },
    ]
  })
},

  ]; // end lessons array

  lessons.forEach(l => DB.insert('lessons', l));

  // ── VOCAB CARDS ──────────────────────────────────────────────────────────────
  const vocab = [
    { level:'A1', word:'bonjour', word_type:'exclamation', translation:'hello / good day', example_fr:'Bonjour, je m\'appelle Osama.', example_en:'Hello, my name is Osama.' },
    { level:'A1', word:'au revoir', word_type:'exclamation', translation:'goodbye', example_fr:'Au revoir, bonne journée!', example_en:'Goodbye, have a good day!' },
    { level:'A1', word:'merci', word_type:'exclamation', translation:'thank you', example_fr:'Merci beaucoup pour votre aide.', example_en:'Thank you very much for your help.' },
    { level:'A1', word:'s\'il vous plaît', word_type:'phrase (formal)', translation:'please', example_fr:'Un café, s\'il vous plaît.', example_en:'A coffee, please.' },
    { level:'A1', word:'enchanté(e)', word_type:'exclamation', translation:'pleased to meet you', example_fr:'Enchanté de vous rencontrer.', example_en:'Pleased to meet you.' },
    { level:'A1', word:'la maison', word_type:'noun (feminine)', translation:'the house', example_fr:'Ma maison est à Oakville.', example_en:'My house is in Oakville.' },
    { level:'A1', word:'le travail', word_type:'noun (masculine)', translation:'the work / job', example_fr:'Je vais au travail en bus.', example_en:'I go to work by bus.' },
    { level:'A1', word:'la ville', word_type:'noun (feminine)', translation:'the city / town', example_fr:'Oakville est une belle ville.', example_en:'Oakville is a beautiful city.' },
    { level:'A1', word:'le quartier', word_type:'noun (masculine)', translation:'the neighbourhood', example_fr:'Mon quartier est tranquille.', example_en:'My neighbourhood is quiet.' },
    { level:'A1', word:'la famille', word_type:'noun (feminine)', translation:'the family', example_fr:'Ma famille habite au Canada.', example_en:'My family lives in Canada.' },
    { level:'A1', word:'l\'enfant', word_type:'noun (masc/fem)', translation:'the child', example_fr:'J\'ai deux enfants.', example_en:'I have two children.' },
    { level:'A1', word:'grand / grande', word_type:'adjective', translation:'big / tall', example_fr:'Le lac Ontario est très grand.', example_en:'Lake Ontario is very big.' },
    { level:'A1', word:'petit / petite', word_type:'adjective', translation:'small / short', example_fr:'J\'ai une petite voiture.', example_en:'I have a small car.' },
    { level:'A1', word:'beau / belle', word_type:'adjective', translation:'beautiful / handsome', example_fr:'C\'est une belle journée.', example_en:'It\'s a beautiful day.' },
    { level:'A1', word:'parler', word_type:'verb (-ER)', translation:'to speak', example_fr:'Je parle français et anglais.', example_en:'I speak French and English.' },
    { level:'A1', word:'habiter', word_type:'verb (-ER)', translation:'to live (somewhere)', example_fr:'J\'habite à Oakville depuis 2023.', example_en:'I have lived in Oakville since 2023.' },
    { level:'A1', word:'manger', word_type:'verb (-ER)', translation:'to eat', example_fr:'Je mange à midi.', example_en:'I eat at noon.' },
    { level:'A1', word:'avoir', word_type:'verb (irregular)', translation:'to have', example_fr:'J\'ai un passeport canadien.', example_en:'I have a Canadian passport.' },
    { level:'A1', word:'être', word_type:'verb (irregular)', translation:'to be', example_fr:'Je suis résident permanent.', example_en:'I am a permanent resident.' },
    { level:'A1', word:'aujourd\'hui', word_type:'adverb', translation:'today', example_fr:'Aujourd\'hui, j\'ai un rendez-vous.', example_en:'Today, I have an appointment.' },
    { level:'A2', word:'travailler', word_type:'verb (-ER)', translation:'to work', example_fr:'Je travaille à Burlington.', example_en:'I work in Burlington.' },
    { level:'A2', word:'chercher', word_type:'verb (-ER)', translation:'to look for', example_fr:'Je cherche un emploi bilingue.', example_en:'I am looking for a bilingual job.' },
    { level:'A2', word:'le rendez-vous', word_type:'noun (masculine)', translation:'the appointment / meeting', example_fr:'J\'ai un rendez-vous à l\'IRCC.', example_en:'I have an appointment at IRCC.' },
    { level:'A2', word:'le permis de travail', word_type:'noun (masculine)', translation:'the work permit', example_fr:'Mon permis de travail expire en décembre.', example_en:'My work permit expires in December.' },
    { level:'A2', word:'la demande', word_type:'noun (feminine)', translation:'the application / request', example_fr:'J\'ai soumis ma demande hier.', example_en:'I submitted my application yesterday.' },
    { level:'A2', word:'souvent', word_type:'adverb', translation:'often', example_fr:'Je vais souvent au parc.', example_en:'I often go to the park.' },
    { level:'A2', word:'quelquefois', word_type:'adverb', translation:'sometimes', example_fr:'Quelquefois je prends le GO Train.', example_en:'Sometimes I take the GO Train.' },
    { level:'A2', word:'avoir besoin de', word_type:'expression', translation:'to need', example_fr:'J\'ai besoin d\'un formulaire.', example_en:'I need a form.' },
    { level:'A2', word:'avoir raison', word_type:'expression', translation:'to be right', example_fr:'Vous avez raison!', example_en:'You are right!' },
    { level:'B1', word:'cependant', word_type:'conjunction', translation:'however / nevertheless', example_fr:'C\'est difficile; cependant, je persévère.', example_en:'It\'s difficult; however, I persevere.' },
    { level:'B1', word:'la résidence permanente', word_type:'noun (feminine)', translation:'permanent residency', example_fr:'J\'ai obtenu ma résidence permanente.', example_en:'I obtained my permanent residency.' },
    { level:'B1', word:'néanmoins', word_type:'adverb', translation:'nevertheless', example_fr:'Néanmoins, il continue ses efforts.', example_en:'Nevertheless, he continues his efforts.' },
    { level:'B1', word:'s\'améliorer', word_type:'verb (reflexive)', translation:'to improve oneself', example_fr:'Je m\'améliore en français chaque jour.', example_en:'I improve my French every day.' },
    { level:'B1', word:'pourtant', word_type:'adverb', translation:'yet / still / even so', example_fr:'Il est fatigué, pourtant il étudie.', example_en:'He is tired, yet he studies.' },
    { level:'B2', word:'à mon avis', word_type:'phrase', translation:'in my opinion', example_fr:'À mon avis, le bilinguisme est essentiel.', example_en:'In my opinion, bilingualism is essential.' },
    { level:'B2', word:'par conséquent', word_type:'conjunction', translation:'consequently / therefore', example_fr:'Il a bien préparé; par conséquent, il a réussi.', example_en:'He prepared well; consequently, he succeeded.' },
    { level:'B2', word:'la citoyenneté', word_type:'noun (feminine)', translation:'citizenship', example_fr:'Je veux obtenir la citoyenneté canadienne.', example_en:'I want to obtain Canadian citizenship.' },
    { level:'B2', word:'force est de constater', word_type:'phrase (formal)', translation:'one must acknowledge', example_fr:'Force est de constater que la situation s\'améliore.', example_en:'One must acknowledge that the situation is improving.' },
    { level:'B2', word:'en revanche', word_type:'conjunction (formal)', translation:'on the other hand / in contrast', example_fr:'En revanche, les coûts ont augmenté.', example_en:'On the other hand, costs have increased.' },
  ];

  vocab.forEach(v => DB.insert('vocab_cards', v));

  // ── GRAMMAR DRILLS ────────────────────────────────────────────────────────────
  const drills = [
    { level:'A1', category:'articles', question:'Je vais à ___ bibliothèque.', options:JSON.stringify(['le','la','les','l\'']), correct_idx:1, explanation:'"Bibliothèque" is feminine, starts with consonant → la bibliothèque.' },
    { level:'A1', category:'articles', question:'___ enfants jouent au parc.', options:JSON.stringify(['Le','La','Les','Un']), correct_idx:2, explanation:'"Les" is the plural definite article for ALL plural nouns.' },
    { level:'A1', category:'articles', question:'"Je vais ___ Canada." (to Canada)', options:JSON.stringify(['à la','au','à le','à']), correct_idx:1, explanation:'"Canada" is masculine → à + le = AU. Always contract.' },
    { level:'A1', category:'articles', question:'Je bois ___ eau. (some water)', options:JSON.stringify(['une','un','de l\'','des']), correct_idx:2, explanation:'"Eau" is feminine, starts with vowel → de l\'eau (partitive article).' },
    { level:'A1', category:'articles', question:'"Les prix ___ magasins sont élevés."', options:JSON.stringify(['du','de la','des','de les']), correct_idx:2, explanation:'de + les = DES. "de les" is never used in French.' },
    { level:'A1', category:'verbs', question:'Je ___ étudiant à Oakville.', options:JSON.stringify(['suis','es','est','êtes']), correct_idx:0, explanation:'Être: je → suis.' },
    { level:'A1', category:'verbs', question:'Nous ___ deux enfants.', options:JSON.stringify(['a','ai','avons','ont']), correct_idx:2, explanation:'Avoir: nous → avons.' },
    { level:'A1', category:'verbs', question:'Ils ___ au Canada depuis 2020.', options:JSON.stringify(['suis','sommes','sont','es']), correct_idx:2, explanation:'Être: ils → sont.' },
    { level:'A1', category:'verbs', question:'Vous ___ votre passeport?', options:JSON.stringify(['ai','as','avez','ont']), correct_idx:2, explanation:'Avoir: vous → avez.' },
    { level:'A1', category:'verbs', question:'"J\'___ faim." (I am hungry)', options:JSON.stringify(['suis','es','ai','est']), correct_idx:2, explanation:'"Avoir faim" = to be hungry. J\'ai faim. Never "je suis faim".' },
    { level:'A1', category:'pronouns', question:'Marie et Sophie travaillent ici. ___ sont médecins.', options:JSON.stringify(['Ils','Elle','Elles','On']), correct_idx:2, explanation:'Two females → ELLES.' },
    { level:'A1', category:'pronouns', question:'Paul et Marie vont au parc. ___ vont au parc.', options:JSON.stringify(['Elles','Elle','Ils','Il']), correct_idx:2, explanation:'Mixed group (male + female) → ILS. Any male = ils.' },
    { level:'A2', category:'verbs', question:'"Elle ___ le bus GO chaque matin." (prendre — to take)', options:JSON.stringify(['prend','prends','prenons','prenez']), correct_idx:0, explanation:'Prendre: je prends, tu prends, il/elle PREND, nous prenons, vous prenez, ils prennent.' },
    { level:'A2', category:'negation', question:'"Je ___ parle ___ anglais au bureau."', options:JSON.stringify(['ne/pas','n\'/pas','ne/point','pas/ne']), correct_idx:0, explanation:'ne...pas wraps the verb: Je NE parle PAS anglais.' },
    { level:'A2', category:'negation', question:'"Je n\'ai pas ___ voiture." (I don\'t have a car)', options:JSON.stringify(['une','un','de','des']), correct_idx:2, explanation:'After negation: un/une/des → DE. Je n\'ai pas DE voiture.' },
    { level:'A2', category:'negation', question:'"Il n\'a pas ___ enfants." (no children)', options:JSON.stringify(['des','de','d\'','les']), correct_idx:2, explanation:'After negation: des → de. Before vowel (enfants): de → d\'. Il n\'a pas D\'enfants.' },
    { level:'B1', category:'past', question:'"Hier, je ___ (aller) au marché."', options:JSON.stringify(['suis allé','ai allé','suis aller','allais']), correct_idx:0, explanation:'"Aller" uses être: je SUIS allé(e). Agreement required.' },
    { level:'B1', category:'past', question:'"Nous ___ (manger) au restaurant samedi."', options:JSON.stringify(['avons mangé','sommes mangés','avons manger','mangions']), correct_idx:0, explanation:'"Manger" uses avoir: nous avons mangé.' },
    { level:'B1', category:'past', question:'"J\'___ reçu la lettre." (recevoir → reçu)', options:JSON.stringify(['suis','ai','être','avoir']), correct_idx:1, explanation:'"Recevoir" uses avoir: j\'AI reçu.' },
    { level:'B1', category:'future', question:'"L\'année prochaine, je ___ (passer) le TEF."', options:JSON.stringify(['passerai','vais passe','passerais','ai passé']), correct_idx:0, explanation:'Futur simple: infinitive + -ai: je passerai.' },
    { level:'B2', category:'opinion', question:'"___ mon avis, le bilinguisme est essentiel."', options:JSON.stringify(['À','Selon','D\'après','De']), correct_idx:0, explanation:'"À mon avis" — most common formal opinion phrase.' },
    { level:'B2', category:'opinion', question:'"Bien ___ ce soit difficile, je continue."', options:JSON.stringify(['que','qui','quoi','dont']), correct_idx:0, explanation:'"Bien que" + subjunctive. The subjunctive form of "être" is "soit".' },
    { level:'B2', category:'connectors', question:'Which connector shows CONSEQUENCE?', options:JSON.stringify(['Cependant','Néanmoins','Par conséquent','En outre']), correct_idx:2, explanation:'"Par conséquent" = consequently/therefore. Shows cause → effect.' },
    { level:'B2', category:'connectors', question:'Which connector shows CONTRAST?', options:JSON.stringify(['En outre','De plus','Cependant','Car']), correct_idx:2, explanation:'"Cependant" = however. Introduces an opposing or nuancing idea.' },
  ];

  drills.forEach(d => DB.insert('grammar_drills', d));

  console.log(`✅ Seeded: ${lessons.length} full lessons, ${vocab.length} vocab cards, ${drills.length} drills`);
}

module.exports = { seedIfEmpty };
