// Site copy in the app's seven languages (en, fr, es, de, it, pt-PT, nl). The browser's
// languages pick one; anything else falls back to English. Runs before main.js splits words.
(() => {
  const T = {
    en: {
      title: "First dates that move.",
      description: "drafft is the dating app for people who train. Match on how you move, then meet for a session, not a drink.",
      tagline: "First dates that move.",
      storeIosSmall: "Download on the", storeAndroidSmall: "Get it on",
      storeIosAria: "Download drafft on the App Store", storeAndroidAria: "Get drafft on Google Play",
      note: "The dating app for people who train. Every match ends in a plan: a sport, a place, a time.",
      storyAria: "How drafft works",
      cap1: "Like how they move.", cap1Text: "Sports, level and weekly rhythm come first. Photos second.",
      cap2: "Match. Skip the small talk.", cap2Text: "A match leads to a plan, not a chat that fades out.",
      cap3: "Propose a session.", cap3Text: "Sport, day, time, place. One tap to send.",
      cap4: "See you at 07:00.", cap4Text: "The first date is the session. The talking comes easy.",
      phoneAria: "The drafft app: you like Léa, it’s a match, and you plan a run together on Tuesday 29 September at 07:00 at Canal Saint-Martin.",
      discover: "Discover", running: "Running", climbing: "Climbing",
      sendInvite: "Send invite", scrollAria: "Scroll to see the app",
      statement: "Profiles lead with how someone moves: their sports, their level, how often they train. You hear their voice before you meet. And every match ends in a plan.",
      sportsTitle: "From run club to wing foil.",
      runClub: "Run club", cycling: "Cycling", tennis: "Tennis", swimming: "Swimming", hiking: "Hiking",
      strength: "Strength", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "The free app gets you matching and meeting. {tier} gets you there faster.",
      undo: "Undo any swipe", undoText: "Swiped too fast? Bring them back.",
      likedYou: "See who liked you", likedYouText: "Match in one tap.",
      unlimited: "Unlimited likes", unlimitedText: "No daily cap.",
      boost: "Weekly boost", boostText: "Thirty minutes at the top of decks near you.",
      joinTitle: "Meet at the start line.", joinText: "Free on iPhone and Android.",
      footer: "Dating for people who train.", howItWorks: "How it works",
    },
    fr: {
      title: "Des premiers rendez-vous qui bougent.",
      description: "drafft, l’app de rencontre pour celles et ceux qui s’entraînent. Matche sur ta façon de bouger, puis retrouvez-vous pour une séance, pas pour un verre.",
      tagline: "Des premiers rendez-vous qui bougent.",
      storeIosSmall: "Télécharger dans", storeAndroidSmall: "Disponible sur",
      storeIosAria: "Télécharger drafft dans l’App Store", storeAndroidAria: "Télécharger drafft sur Google Play",
      note: "L’app de rencontre pour celles et ceux qui s’entraînent. Chaque match finit en plan : un sport, un lieu, une heure.",
      storyAria: "Comment marche drafft",
      cap1: "Like sa façon de bouger.", cap1Text: "Sports, niveau et rythme de la semaine d’abord. Les photos ensuite.",
      cap2: "Match. Zappe le small talk.", cap2Text: "Un match mène à un plan, pas à une conversation qui s’éteint.",
      cap3: "Propose une séance.", cap3Text: "Sport, jour, heure, lieu. Un tap pour l’envoyer.",
      cap4: "Rendez-vous à 7 h.", cap4Text: "Le premier rendez-vous, c’est la séance. La conversation vient toute seule.",
      phoneAria: "L’app drafft : tu likes Léa, c’est un match, et vous prévoyez un run ensemble mardi 29 septembre à 7 h au canal Saint-Martin.",
      discover: "Découvrir", running: "Running", climbing: "Escalade",
      sendInvite: "Envoyer l’invitation", scrollAria: "Fais défiler pour voir l’app",
      statement: "Les profils commencent par la façon dont quelqu’un bouge : ses sports, son niveau, la fréquence de ses entraînements. Tu entends sa voix avant la rencontre. Et chaque match finit en plan.",
      sportsTitle: "Du run club au wing foil.",
      runClub: "Run club", cycling: "Vélo", tennis: "Tennis", swimming: "Natation", hiking: "Randonnée",
      strength: "Musculation", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "L’app gratuite te permet de matcher et de rencontrer. {tier} t’y mène plus vite.",
      undo: "Annule n’importe quel swipe", undoText: "Swipé trop vite ? Fais revenir le profil.",
      likedYou: "Vois qui t’a liké", likedYouText: "Matche en un tap.",
      unlimited: "Likes illimités", unlimitedText: "Aucune limite quotidienne.",
      boost: "Boost hebdomadaire", boostText: "Trente minutes en tête des profils autour de toi.",
      joinTitle: "Rendez-vous sur la ligne de départ.", joinText: "Gratuit sur iPhone et Android.",
      footer: "Des rencontres pour celles et ceux qui s’entraînent.", howItWorks: "Comment ça marche",
    },
    es: {
      title: "Primeras citas en movimiento.",
      description: "drafft es la app de citas para quienes entrenan. Haz match por cómo te mueves y quedad para una sesión, no para una copa.",
      tagline: "Primeras citas en movimiento.",
      storeIosSmall: "Descárgalo en", storeAndroidSmall: "Disponible en",
      storeIosAria: "Descargar drafft en la App Store", storeAndroidAria: "Descargar drafft en Google Play",
      note: "La app de citas para quienes entrenan. Cada match termina en un plan: un deporte, un lugar, una hora.",
      storyAria: "Cómo funciona drafft",
      cap1: "Dale like a cómo se mueve.", cap1Text: "Deportes, nivel y ritmo semanal primero. Las fotos, después.",
      cap2: "Match. Sáltate la charla de rigor.", cap2Text: "Un match lleva a un plan, no a un chat que se apaga.",
      cap3: "Propón una sesión.", cap3Text: "Deporte, día, hora, lugar. Un toque para enviarla.",
      cap4: "Nos vemos a las 7:00.", cap4Text: "La primera cita es la sesión. La conversación sale sola.",
      phoneAria: "La app drafft: das like a Léa, hacéis match y quedáis para correr el martes 29 de septiembre a las 7:00 en el Canal Saint-Martin.",
      discover: "Descubrir", running: "Running", climbing: "Escalada",
      sendInvite: "Enviar invitación", scrollAria: "Desplázate para ver la app",
      statement: "Los perfiles empiezan por cómo se mueve cada persona: sus deportes, su nivel, cuántas veces entrena. Oyes su voz antes de quedar. Y cada match termina en un plan.",
      sportsTitle: "Del run club al wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Tenis", swimming: "Natación", hiking: "Senderismo",
      strength: "Fuerza", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "La app gratuita te lleva a hacer match y quedar. Con {tier} llegas antes.",
      undo: "Deshaz cualquier swipe", undoText: "¿Deslizaste demasiado rápido? Recupera el perfil.",
      likedYou: "Mira a quién le gustas", likedYouText: "Haz match con un toque.",
      unlimited: "Likes ilimitados", unlimitedText: "Sin límite diario.",
      boost: "Boost semanal", boostText: "Treinta minutos en lo más alto de los perfiles cerca de ti.",
      joinTitle: "Nos vemos en la línea de salida.", joinText: "Gratis en iPhone y Android.",
      footer: "Citas para quienes entrenan.", howItWorks: "Cómo funciona",
    },
    de: {
      title: "Erste Dates in Bewegung.",
      description: "drafft ist die Dating-App für alle, die trainieren. Matche danach, wie du dich bewegst, und trefft euch zu einer Session statt auf einen Drink.",
      tagline: "Erste Dates in Bewegung.",
      storeIosSmall: "Laden im", storeAndroidSmall: "Jetzt bei",
      storeIosAria: "drafft im App Store laden", storeAndroidAria: "drafft bei Google Play laden",
      note: "Die Dating-App für alle, die trainieren. Jedes Match endet mit einem Plan: ein Sport, ein Ort, eine Uhrzeit.",
      storyAria: "So funktioniert drafft",
      cap1: "Like, wie jemand sich bewegt.", cap1Text: "Sportarten, Level und Wochenrhythmus zuerst. Fotos danach.",
      cap2: "Match. Spar dir den Small Talk.", cap2Text: "Ein Match führt zu einem Plan, nicht zu einem Chat, der einschläft.",
      cap3: "Schlag eine Session vor.", cap3Text: "Sport, Tag, Uhrzeit, Ort. Ein Tipp zum Senden.",
      cap4: "Bis um 7 Uhr.", cap4Text: "Das erste Date ist die Session. Das Reden kommt von selbst.",
      phoneAria: "Die drafft-App: Du likest Léa, ihr habt ein Match und plant einen gemeinsamen Lauf am Dienstag, 29. September, um 7 Uhr am Canal Saint-Martin.",
      discover: "Entdecken", running: "Laufen", climbing: "Klettern",
      sendInvite: "Einladung senden", scrollAria: "Scrolle, um die App zu sehen",
      statement: "Profile zeigen zuerst, wie sich jemand bewegt: Sportarten, Level, wie oft trainiert wird. Du hörst die Stimme, bevor ihr euch trefft. Und jedes Match endet mit einem Plan.",
      sportsTitle: "Vom Run Club bis zum Wingfoil.",
      runClub: "Run Club", cycling: "Radfahren", tennis: "Tennis", swimming: "Schwimmen", hiking: "Wandern",
      strength: "Krafttraining", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "Mit der kostenlosen App matchst du und triffst Leute. Mit {tier} geht es schneller.",
      undo: "Jeden Swipe rückgängig machen", undoText: "Zu schnell geswipt? Hol das Profil zurück.",
      likedYou: "Sieh, wer dich geliket hat", likedYouText: "Matche mit einem Tipp.",
      unlimited: "Unbegrenzte Likes", unlimitedText: "Kein Tageslimit.",
      boost: "Wöchentlicher Boost", boostText: "Dreißig Minuten ganz oben bei Leuten in deiner Nähe.",
      joinTitle: "Wir sehen uns an der Startlinie.", joinText: "Kostenlos für iPhone und Android.",
      footer: "Dating für alle, die trainieren.", howItWorks: "So funktioniert’s",
    },
    it: {
      title: "Primi appuntamenti in movimento.",
      description: "drafft è l’app di incontri per chi si allena. Fai match in base a come ti muovi, poi vedetevi per una sessione, non per un drink.",
      tagline: "Primi appuntamenti in movimento.",
      storeIosSmall: "Scarica su", storeAndroidSmall: "Disponibile su",
      storeIosAria: "Scarica drafft dall’App Store", storeAndroidAria: "Scarica drafft da Google Play",
      note: "L’app di incontri per chi si allena. Ogni match finisce con un piano: uno sport, un luogo, un orario.",
      storyAria: "Come funziona drafft",
      cap1: "Metti like a come si muove.", cap1Text: "Sport, livello e ritmo settimanale prima di tutto. Le foto dopo.",
      cap2: "Match. Salta le chiacchiere.", cap2Text: "Un match porta a un piano, non a una chat che si spegne.",
      cap3: "Proponi una sessione.", cap3Text: "Sport, giorno, ora, luogo. Un tocco per inviarla.",
      cap4: "Ci vediamo alle 7:00.", cap4Text: "Il primo appuntamento è la sessione. La conversazione viene da sé.",
      phoneAria: "L’app drafft: metti like a Léa, è un match e organizzate una corsa insieme martedì 29 settembre alle 7:00 al Canal Saint-Martin.",
      discover: "Scopri", running: "Corsa", climbing: "Arrampicata",
      sendInvite: "Invia invito", scrollAria: "Scorri per vedere l’app",
      statement: "I profili partono da come si muove una persona: i suoi sport, il suo livello, quanto spesso si allena. Senti la sua voce prima di incontrarla. E ogni match finisce con un piano.",
      sportsTitle: "Dal run club al wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Tennis", swimming: "Nuoto", hiking: "Escursionismo",
      strength: "Pesi", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "L’app gratuita ti fa fare match e incontrare. Con {tier} ci arrivi prima.",
      undo: "Annulla qualsiasi swipe", undoText: "Swipe troppo veloce? Recupera il profilo.",
      likedYou: "Scopri a chi piaci", likedYouText: "Fai match con un tocco.",
      unlimited: "Like illimitati", unlimitedText: "Nessun limite giornaliero.",
      boost: "Boost settimanale", boostText: "Trenta minuti in cima ai profili vicino a te.",
      joinTitle: "Ci vediamo sulla linea di partenza.", joinText: "Gratis su iPhone e Android.",
      footer: "Incontri per chi si allena.", howItWorks: "Come funziona",
    },
    pt: {
      title: "Primeiros encontros em movimento.",
      description: "O drafft é a app de encontros para quem treina. Faz match pela forma como te mexes e encontrem-se para uma sessão, não para um copo.",
      tagline: "Primeiros encontros em movimento.",
      storeIosSmall: "Descarregar na", storeAndroidSmall: "Disponível no",
      storeIosAria: "Descarregar o drafft na App Store", storeAndroidAria: "Descarregar o drafft no Google Play",
      note: "A app de encontros para quem treina. Cada match acaba num plano: um desporto, um lugar, uma hora.",
      storyAria: "Como funciona o drafft",
      cap1: "Dá like à forma como se mexe.", cap1Text: "Desportos, nível e ritmo semanal primeiro. As fotos depois.",
      cap2: "Match. Salta a conversa de circunstância.", cap2Text: "Um match leva a um plano, não a uma conversa que se apaga.",
      cap3: "Propõe uma sessão.", cap3Text: "Desporto, dia, hora, local. Um toque para enviar.",
      cap4: "Até às 7:00.", cap4Text: "O primeiro encontro é a sessão. A conversa surge naturalmente.",
      phoneAria: "A app drafft: dás like à Léa, é um match e combinam uma corrida juntos na terça-feira, 29 de setembro, às 7:00, no Canal Saint-Martin.",
      discover: "Descobrir", running: "Corrida", climbing: "Escalada",
      sendInvite: "Enviar convite", scrollAria: "Desliza para ver a app",
      statement: "Os perfis começam pela forma como cada pessoa se mexe: os desportos, o nível, quantas vezes treina. Ouves a voz antes de se encontrarem. E cada match acaba num plano.",
      sportsTitle: "Do run club ao wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Ténis", swimming: "Natação", hiking: "Trilhos",
      strength: "Musculação", yoga: "Ioga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "A app gratuita põe-te a fazer match e a conhecer pessoas. Com o {tier} chegas lá mais depressa.",
      undo: "Anula qualquer swipe", undoText: "Deslizaste depressa demais? Recupera o perfil.",
      likedYou: "Vê quem gostou de ti", likedYouText: "Faz match com um toque.",
      unlimited: "Likes ilimitados", unlimitedText: "Sem limite diário.",
      boost: "Boost semanal", boostText: "Trinta minutos no topo dos perfis perto de ti.",
      joinTitle: "Encontramo-nos na linha de partida.", joinText: "Grátis no iPhone e no Android.",
      footer: "Encontros para quem treina.", howItWorks: "Como funciona",
    },
    nl: {
      title: "Eerste dates in beweging.",
      description: "drafft is de dating-app voor mensen die trainen. Match op hoe je beweegt en spreek af voor een sessie, niet voor een drankje.",
      tagline: "Eerste dates in beweging.",
      storeIosSmall: "Download in de", storeAndroidSmall: "Ontdek het op",
      storeIosAria: "Download drafft in de App Store", storeAndroidAria: "Download drafft op Google Play",
      note: "De dating-app voor mensen die trainen. Elke match eindigt in een plan: een sport, een plek, een tijd.",
      storyAria: "Zo werkt drafft",
      cap1: "Like hoe iemand beweegt.", cap1Text: "Sporten, niveau en weekritme eerst. Foto’s daarna.",
      cap2: "Match. Sla de small talk over.", cap2Text: "Een match leidt tot een plan, niet tot een chat die doodbloedt.",
      cap3: "Stel een sessie voor.", cap3Text: "Sport, dag, tijd, plek. Eén tik om te versturen.",
      cap4: "Tot 07:00.", cap4Text: "De eerste date is de sessie. Het praten gaat vanzelf.",
      phoneAria: "De drafft-app: je liket Léa, het is een match en jullie plannen samen een run op dinsdag 29 september om 07:00 bij het Canal Saint-Martin.",
      discover: "Ontdekken", running: "Hardlopen", climbing: "Klimmen",
      sendInvite: "Uitnodiging sturen", scrollAria: "Scroll om de app te zien",
      statement: "Profielen beginnen met hoe iemand beweegt: sporten, niveau, hoe vaak iemand traint. Je hoort iemands stem voordat jullie afspreken. En elke match eindigt in een plan.",
      sportsTitle: "Van runclub tot wingfoil.",
      runClub: "Runclub", cycling: "Wielrennen", tennis: "Tennis", swimming: "Zwemmen", hiking: "Hiken",
      strength: "Krachttraining", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      tempoLead: "Met de gratis app match je en spreek je af. Met {tier} kom je er sneller.",
      undo: "Maak elke swipe ongedaan", undoText: "Te snel geswipet? Haal het profiel terug.",
      likedYou: "Bekijk wie je heeft geliket", likedYouText: "Match met één tik.",
      unlimited: "Onbeperkt liken", unlimitedText: "Geen daglimiet.",
      boost: "Wekelijkse boost", boostText: "Dertig minuten bovenaan bij mensen in je buurt.",
      joinTitle: "Tot aan de startlijn.", joinText: "Gratis op iPhone en Android.",
      footer: "Daten voor mensen die trainen.", howItWorks: "Hoe het werkt",
    },
  };

  // In-phone copy: the app's own strings (Localizable.xcstrings) where they exist.
  const APP = {
    en: { tabLikes: "Likes", tabSessions: "Sessions", tabChats: "Chats", tabYou: "You", waiting: "Waiting", confirmed: "Confirmed",
      runningSession: "Running session", dayLong: "Tuesday 29 Sep", willPick: "Léa will pick a time or suggest others.", addToCalendar: "Add to calendar",
      message: "Message", itsAMatch: "It’s a match.", matchSub: "You and Léa both do Running. Skip the endless chat: make the first date a session.",
      sayHi: "Say hi", keepSwiping: "Keep swiping", trainWith: "Train with Léa", firstDateSession: "Make the first date a session.",
      sport: "Sport", when: "When", upTo3: "Up to 3 times", addTime: "Add a time", addAnother: "Add another", tue: "Tue", sep: "Sep",
      recapNone: "Running, no time yet", recapTime: "Running, Tue 29 Sep at 7:00", noPitch: "No pitch yet", sendInvite: "Send invite", sent: "Sent" },
    fr: { tabLikes: "Likes", tabSessions: "Séances", tabChats: "Discussions", tabYou: "Toi", waiting: "En attente", confirmed: "Confirmée",
      runningSession: "Séance Running", dayLong: "Mardi 29 sept.", willPick: "Léa choisira un créneau ou en proposera d’autres.", addToCalendar: "Ajouter au calendrier",
      message: "Message", itsAMatch: "C’est un match.", matchSub: "Léa et toi, vous faites tous les deux du Running. Pas besoin de discuter des semaines\u00a0: le premier rendez-vous, c’est une séance.",
      sayHi: "Dire bonjour", keepSwiping: "Continuer à swiper", trainWith: "S’entraîner avec Léa", firstDateSession: "Le premier rendez-vous, c’est une séance.",
      sport: "Sport", when: "Quand", upTo3: "Jusqu’à 3 créneaux", addTime: "Ajouter un créneau", addAnother: "Ajouter un autre", tue: "mar.", sep: "sept.",
      recapNone: "Running, pas encore d’heure", recapTime: "Running, mar. 29 sept. à 7:00", noPitch: "Pas encore d’accroche", sendInvite: "Envoyer l’invitation", sent: "Envoyée" },
    es: { tabLikes: "Likes", tabSessions: "Sesiones", tabChats: "Chats", tabYou: "Tú", waiting: "En espera", confirmed: "Confirmada",
      runningSession: "Sesión de Running", dayLong: "Martes 29 sept.", willPick: "Léa elegirá una hora o propondrá otras.", addToCalendar: "Añadir al calendario",
      message: "Mensaje", itsAMatch: "Es un match.", matchSub: "Léa y tú practicáis Running. Nada de chats eternos: la primera cita, una sesión juntos.",
      sayHi: "Saludar", keepSwiping: "Seguir deslizando", trainWith: "Entrena con Léa", firstDateSession: "La primera cita, una sesión juntos.",
      sport: "Deporte", when: "Cuándo", upTo3: "Hasta 3 horas", addTime: "Añadir hora", addAnother: "Añadir otra", tue: "mar", sep: "sept",
      recapNone: "Running, sin hora todavía", recapTime: "Running, mar 29 sept a las 7:00", noPitch: "Sin título todavía", sendInvite: "Enviar invitación", sent: "Enviada" },
    de: { tabLikes: "Likes", tabSessions: "Sessions", tabChats: "Chats", tabYou: "Du", waiting: "Wartet", confirmed: "Bestätigt",
      runningSession: "Laufen-Session", dayLong: "Dienstag, 29. Sept.", willPick: "Léa wählt eine Zeit oder schlägt andere vor.", addToCalendar: "Zum Kalender hinzufügen",
      message: "Nachricht", itsAMatch: "Ihr habt ein Match.", matchSub: "Du und Léa macht beide Laufen. Kein endloses Chatten: Das erste Date ist eine Session.",
      sayHi: "Sag Hallo", keepSwiping: "Weiter swipen", trainWith: "Mit Léa trainieren", firstDateSession: "Das erste Date ist eine Session.",
      sport: "Sport", when: "Wann", upTo3: "Bis zu 3 Zeiten", addTime: "Zeit hinzufügen", addAnother: "Weitere hinzufügen", tue: "Di.", sep: "Sept.",
      recapNone: "Laufen, noch keine Zeit", recapTime: "Laufen, Di., 29. Sept. um 7:00", noPitch: "Noch kein Vorschlag", sendInvite: "Einladung senden", sent: "Gesendet" },
    it: { tabLikes: "Like", tabSessions: "Sessioni", tabChats: "Chat", tabYou: "Tu", waiting: "In attesa", confirmed: "Confermata",
      runningSession: "Sessione di Corsa", dayLong: "Martedì 29 set", willPick: "Léa sceglierà un orario o ne proporrà altri.", addToCalendar: "Aggiungi al calendario",
      message: "Messaggio", itsAMatch: "È un match.", matchSub: "Tu e Léa fate entrambi Corsa. Niente chat infinite: il primo appuntamento è una sessione insieme.",
      sayHi: "Saluta", keepSwiping: "Continua a scorrere", trainWith: "Allenati con Léa", firstDateSession: "Il primo appuntamento è una sessione insieme.",
      sport: "Sport", when: "Quando", upTo3: "Fino a 3 orari", addTime: "Aggiungi un orario", addAnother: "Aggiungi un altro", tue: "mar", sep: "set",
      recapNone: "Corsa, nessun orario", recapTime: "Corsa, mar 29 set alle 7:00", noPitch: "Nessuna frase", sendInvite: "Invia invito", sent: "Inviato" },
    pt: { tabLikes: "Likes", tabSessions: "Sessões", tabChats: "Conversas", tabYou: "Tu", waiting: "À espera", confirmed: "Confirmada",
      runningSession: "Sessão de Corrida", dayLong: "Terça-feira, 29 set.", willPick: "A Léa vai escolher uma hora ou sugerir outras.", addToCalendar: "Adicionar ao calendário",
      message: "Mensagem", itsAMatch: "É um match.", matchSub: "Tu e a Léa praticam os dois Corrida. Nada de conversas sem fim: o primeiro encontro é uma sessão juntos.",
      sayHi: "Dizer olá", keepSwiping: "Continuar a deslizar", trainWith: "Treinar com Léa", firstDateSession: "O primeiro encontro é uma sessão juntos.",
      sport: "Desporto", when: "Quando", upTo3: "Até 3 horários", addTime: "Adicionar horário", addAnother: "Adicionar outro", tue: "ter.", sep: "set.",
      recapNone: "Corrida, ainda sem hora", recapTime: "Corrida, ter., 29 set. às 7:00", noPitch: "Ainda sem ideia", sendInvite: "Enviar convite", sent: "Enviado" },
    nl: { tabLikes: "Likes", tabSessions: "Sessies", tabChats: "Chats", tabYou: "Jij", waiting: "In afwachting", confirmed: "Bevestigd",
      runningSession: "Hardlopen-sessie", dayLong: "Dinsdag 29 sep", willPick: "Léa kiest een tijd of stelt andere voor.", addToCalendar: "Toevoegen aan agenda",
      message: "Bericht", itsAMatch: "Het is een match.", matchSub: "Jij en Léa doen allebei Hardlopen. Geen eindeloos chatten: je eerste date is een sessie samen.",
      sayHi: "Zeg hoi", keepSwiping: "Verder swipen", trainWith: "Train met Léa", firstDateSession: "Je eerste date is een sessie samen.",
      sport: "Sport", when: "Wanneer", upTo3: "Tot 3 tijden", addTime: "Tijd toevoegen", addAnother: "Nog een toevoegen", tue: "di", sep: "sep",
      recapNone: "Hardlopen, nog geen tijd", recapTime: "Hardlopen, di 29 sep om 7:00", noPitch: "Nog geen pitch", sendInvite: "Uitnodiging sturen", sent: "Verstuurd" },
  };
  Object.keys(APP).forEach((l) => Object.assign(T[l], APP[l]));

  // The chat before the invite (a bit of teasing, a bit of small talk) and the legal links.
  const MORE = {
    en: { m1: "So, “hill day enthusiast”. Bold claim.", m2: "Tested and proven. The canal has hills, right?", m3: "It’s the flattest place in Paris.", m4: "But I like the confidence.", m5: "Then let’s settle it on the ground.",
      legalNotice: "Legal notice", privacy: "Privacy policy", terms: "Terms of use" },
    fr: { m1: "Donc, «\u00a0fan des séances de côtes\u00a0». Culotté.", m2: "Testé et approuvé. Il y a des côtes au canal, non\u00a0?", m3: "C’est l’endroit le plus plat de Paris.", m4: "Mais j’aime bien l’assurance.", m5: "Alors réglons ça sur le terrain.",
      legalNotice: "Mentions légales", privacy: "Politique de confidentialité", terms: "Conditions d’utilisation" },
    es: { m1: "Así que «fan de los días de cuestas». Qué atrevido.", m2: "Probado y comprobado. El canal tiene cuestas, ¿no?", m3: "Es el sitio más llano de París.", m4: "Pero me gusta la seguridad.", m5: "Pues lo resolvemos sobre el terreno.",
      legalNotice: "Aviso legal", privacy: "Política de privacidad", terms: "Condiciones de uso" },
    de: { m1: "Also „Fan vom Hügeltag“. Mutige Ansage.", m2: "Getestet und bewiesen. Am Kanal gibt’s doch Hügel, oder?", m3: "Das ist der flachste Ort in Paris.", m4: "Aber das Selbstbewusstsein gefällt mir.", m5: "Dann klären wir das auf der Strecke.",
      legalNotice: "Impressum", privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen" },
    it: { m1: "Quindi «fan del giorno delle salite». Che coraggio.", m2: "Provato e approvato. Il canale ha delle salite, no?", m3: "È il posto più piatto di Parigi.", m4: "Però mi piace la sicurezza.", m5: "Allora risolviamola sul campo.",
      legalNotice: "Note legali", privacy: "Informativa sulla privacy", terms: "Termini di utilizzo" },
    pt: { m1: "Então, «fã do dia das subidas». Que ousadia.", m2: "Testado e aprovado. O canal tem subidas, certo?", m3: "É o sítio mais plano de Paris.", m4: "Mas gosto da confiança.", m5: "Então resolvemos isso no terreno.",
      legalNotice: "Aviso legal", privacy: "Política de privacidade", terms: "Termos de utilização" },
    nl: { m1: "Dus ‘fan van heuveldag’. Gedurfd.", m2: "Getest en bewezen. Het kanaal heeft toch heuvels?", m3: "Het is de vlakste plek van Parijs.", m4: "Maar ik hou van het zelfvertrouwen.", m5: "Dan beslechten we het op de weg.",
      legalNotice: "Juridische informatie", privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden" },
  };
  Object.keys(MORE).forEach((l) => Object.assign(T[l], MORE[l]));

  // Sentences that carry the drawn profile: {name} and {sport} are filled in below. Written so
  // the sport name needs no article or case in any language.
  const TPL = {
    en: { matchSub: "You and {name} both do {sport}. Skip the endless chat: make the first date a session.", sessionTitle: "{sport} session",
      trainWith: "Train with {name}", recapNone: "{sport}, no time yet", recapTime: "{sport}, Tue 29 Sep at 7:00",
      willPick: "{name} will pick a time or suggest others.", phoneAria: "The drafft app: you like {name}, it’s a match, and you plan a {sport} session together on Tuesday 29 September at 7:00.",
      m1: "Your profile says you never skip a session. Bold claim.", m2: "Tested and proven. Want proof?", m3: "Obviously.", m4: "But I set the pace.", m5: "Deal. Let’s settle it on the ground." },
    fr: { matchSub: "{name} et toi, même sport\u00a0: {sport}. Pas besoin de discuter des semaines\u00a0: le premier rendez-vous, c’est une séance.", sessionTitle: "Séance {sport}",
      trainWith: "S’entraîner avec {name}", recapNone: "{sport}, pas encore d’heure", recapTime: "{sport}, mar. 29 sept. à 7:00",
      willPick: "{name} choisira un créneau ou en proposera d’autres.", phoneAria: "L’app drafft\u00a0: tu likes {name}, c’est un match, et vous prévoyez une séance ensemble (sport\u00a0: {sport}) mardi 29 septembre à 7\u00a0h.",
      m1: "Ton profil dit que tu ne rates jamais une séance. Culotté.", m2: "Testé et approuvé. Tu veux la preuve\u00a0?", m3: "Évidemment.", m4: "Mais c’est moi qui donne le rythme.", m5: "Marché conclu. On règle ça sur le terrain." },
    es: { matchSub: "{name} y tú compartís deporte: {sport}. Nada de chats eternos: la primera cita, una sesión juntos.", sessionTitle: "Sesión de {sport}",
      trainWith: "Entrena con {name}", recapNone: "{sport}, sin hora todavía", recapTime: "{sport}, mar 29 sept a las 7:00",
      willPick: "{name} elegirá una hora o propondrá otras.", phoneAria: "La app drafft: das like a {name}, hacéis match y quedáis para una sesión de {sport} el martes 29 de septiembre a las 7:00.",
      m1: "Tu perfil dice que nunca te saltas una sesión. Qué atrevido.", m2: "Probado y comprobado. ¿Quieres pruebas?", m3: "Obviamente.", m4: "Pero el ritmo lo marco yo.", m5: "Trato hecho. Lo resolvemos sobre el terreno." },
    de: { matchSub: "Du und {name} teilt einen Sport: {sport}. Kein endloses Chatten: Das erste Date ist eine Session.", sessionTitle: "{sport}-Session",
      trainWith: "Mit {name} trainieren", recapNone: "{sport}, noch keine Zeit", recapTime: "{sport}, Di., 29. Sept. um 7:00",
      willPick: "{name} wählt eine Zeit oder schlägt andere vor.", phoneAria: "Die drafft-App: Du likest {name}, ihr habt ein Match und plant eine gemeinsame {sport}-Session am Dienstag, 29. September, um 7 Uhr.",
      m1: "Laut deinem Profil lässt du nie eine Session aus. Mutige Ansage.", m2: "Getestet und bewiesen. Willst du einen Beweis?", m3: "Na klar.", m4: "Aber das Tempo bestimme ich.", m5: "Abgemacht. Wir klären das auf der Strecke." },
    it: { matchSub: "Tu e {name} condividete uno sport: {sport}. Niente chat infinite: il primo appuntamento è una sessione insieme.", sessionTitle: "Sessione di {sport}",
      trainWith: "Allenati con {name}", recapNone: "{sport}, nessun orario", recapTime: "{sport}, mar 29 set alle 7:00",
      willPick: "{name} sceglierà un orario o ne proporrà altri.", phoneAria: "L’app drafft: metti like a {name}, è un match e organizzate una sessione di {sport} insieme martedì 29 settembre alle 7:00.",
      m1: "Il tuo profilo dice che non salti mai una sessione. Che coraggio.", m2: "Provato e approvato. Vuoi una prova?", m3: "Ovviamente.", m4: "Ma il ritmo lo decido io.", m5: "Affare fatto. Risolviamola sul campo." },
    pt: { matchSub: "Tu e {name} partilham um desporto: {sport}. Nada de conversas sem fim: o primeiro encontro é uma sessão juntos.", sessionTitle: "Sessão de {sport}",
      trainWith: "Treinar com {name}", recapNone: "{sport}, ainda sem hora", recapTime: "{sport}, ter., 29 set. às 7:00",
      willPick: "{name} vai escolher uma hora ou sugerir outras.", phoneAria: "A app drafft: dás like a {name}, é um match e combinam uma sessão de {sport} na terça-feira, 29 de setembro, às 7:00.",
      m1: "O teu perfil diz que nunca faltas a uma sessão. Que ousadia.", m2: "Testado e aprovado. Queres provas?", m3: "Claro.", m4: "Mas o ritmo é meu.", m5: "Combinado. Resolvemos isso no terreno." },
    nl: { matchSub: "Jij en {name} delen een sport: {sport}. Geen eindeloos chatten: je eerste date is een sessie samen.", sessionTitle: "{sport}-sessie",
      trainWith: "Train met {name}", recapNone: "{sport}, nog geen tijd", recapTime: "{sport}, di 29 sep om 7:00",
      willPick: "{name} kiest een tijd of stelt andere voor.", phoneAria: "De drafft-app: je liket {name}, het is een match en jullie plannen samen een {sport}-sessie op dinsdag 29 september om 7:00.",
      m1: "Volgens je profiel sla je nooit een sessie over. Gedurfd.", m2: "Getest en bewezen. Wil je bewijs?", m3: "Uiteraard.", m4: "Maar ik bepaal het tempo.", m5: "Deal. We beslechten het op de weg." },
  };
  Object.keys(TPL).forEach((l) => Object.assign(T[l], TPL[l]));

  // Older messages, above the ones that lead to the invite (they pass under the top blur).
  const EARLIER = {
    en: { p1: "Hey! Loved your voice intro.", p2: "Ha, thanks. It took 12 takes.", p3: "Mornings or evenings?", p4: "Mornings. Before the city wakes up." },
    fr: { p1: "Salut\u00a0! J’ai adoré ton intro vocale.", p2: "Merci\u00a0! Il m’a fallu 12 prises.", p3: "Plutôt matin ou soir\u00a0?", p4: "Matin. Avant que la ville se réveille." },
    es: { p1: "¡Hola! Me encantó tu intro de voz.", p2: "Ja, gracias. Necesité 12 tomas.", p3: "¿Mañanas o tardes?", p4: "Mañanas. Antes de que despierte la ciudad." },
    de: { p1: "Hey! Dein Sprach-Intro ist super.", p2: "Danke! Ich habe 12 Anläufe gebraucht.", p3: "Morgens oder abends?", p4: "Morgens. Bevor die Stadt aufwacht." },
    it: { p1: "Ciao! Adoro la tua intro vocale.", p2: "Grazie! Mi ci sono volute 12 prove.", p3: "Mattina o sera?", p4: "Mattina. Prima che la città si svegli." },
    pt: { p1: "Olá! Adorei a tua intro de voz.", p2: "Ahah, foram precisas 12 tentativas.", p3: "Manhãs ou noites?", p4: "Manhãs. Antes de a cidade acordar." },
    nl: { p1: "Hoi! Je voice-intro is top.", p2: "Haha, dank je. Twaalf pogingen.", p3: "Ochtend of avond?", p4: "Ochtend. Voordat de stad wakker wordt." },
  };
  Object.keys(EARLIER).forEach((l) => Object.assign(T[l], EARLIER[l]));

  const STEPS = {
    en: { prevStep: "Previous step", nextStep: "Next step" }, fr: { prevStep: "Étape précédente", nextStep: "Étape suivante" },
    es: { prevStep: "Paso anterior", nextStep: "Paso siguiente" }, de: { prevStep: "Vorheriger Schritt", nextStep: "Nächster Schritt" },
    it: { prevStep: "Passaggio precedente", nextStep: "Passaggio successivo" }, pt: { prevStep: "Passo anterior", nextStep: "Passo seguinte" },
    nl: { prevStep: "Vorige stap", nextStep: "Volgende stap" },
  };
  Object.keys(STEPS).forEach((l) => Object.assign(T[l], STEPS[l]));

  const HINT = {
    en: { hintScroll: "Scroll to continue", hintSwipe: "Swipe up to continue" },
    fr: { hintScroll: "Fais défiler pour continuer", hintSwipe: "Fais glisser vers le haut pour continuer" },
    es: { hintScroll: "Desplázate para continuar", hintSwipe: "Desliza hacia arriba para continuar" },
    de: { hintScroll: "Scrolle, um weiterzumachen", hintSwipe: "Nach oben wischen, um weiterzumachen" },
    it: { hintScroll: "Scorri per continuare", hintSwipe: "Scorri verso l’alto per continuare" },
    pt: { hintScroll: "Desliza para continuar", hintSwipe: "Desliza para cima para continuar" },
    nl: { hintScroll: "Scroll om verder te gaan", hintSwipe: "Veeg omhoog om verder te gaan" },
  };
  Object.keys(HINT).forEach((l) => Object.assign(T[l], HINT[l]));
  // Touch screens get the swipe wording (the hint's glyph follows in CSS).
  if (matchMedia("(pointer: coarse)").matches) document.querySelectorAll("[data-hint-text]").forEach((el) => { el.dataset.i18n = "hintSwipe"; });

  const pick = () => {
    for (const tag of navigator.languages || [navigator.language || "en"]) {
      const code = String(tag).toLowerCase().split("-")[0];
      if (T[code]) return code;
    }
    return "en";
  };
  const lang = pick();
  const t = T[lang];
  const root = document.documentElement;
  root.lang = lang === "pt" ? "pt-PT" : lang;
  const translate = () => {
  document.title = t.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.description);
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v) el.textContent = v; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { const v = t[el.dataset.i18nAria]; if (v) el.setAttribute("aria-label", v); });
  // The tier name keeps its markup: "drafft" one weight up, "tempo" in the accent.
  const tier = '<b class="brand-inline">drafft <span class="tempo-word">tempo</span></b>';
  document.querySelectorAll("[data-i18n-tier]").forEach((el) => {
    const v = t[el.dataset.i18nTier];
    if (!v) return;
    el.textContent = "";
    v.split("{tier}").forEach((part, i) => {
      if (i) el.insertAdjacentHTML("beforeend", tier);
      el.append(part);
    });
  });
  };
  translate();

  /* ================= The profile on top of the pile ================= */

  // A different person each visit. Photos are served in several widths (img/p/<slug>-<w>.webp);
  // each carries where its person stands in the frame (the card and full-screen framing in
  // main.js reads it: people don't stand in the same place in every photo); avatars use a face crop.
  // Cards behind are other people of the same gender, never the same photo twice.
  // box: where the person stands in the frame, in % (left, top, right, bottom), head included.
  const PHOTOS = {
    climber: { w: 4928, h: 3264, widths: [640, 1080, 1600, 2400, 3200], box: [24, 14, 90, 90] },
    gym: { w: 6414, h: 4276, widths: [640, 1080, 1600, 2400, 3200], box: [31, 12, 76, 96] },
    roadrunner: { w: 2400, h: 1600, widths: [640, 1080, 1600, 2400], box: [38, 12, 57, 85] },
    tennis: { w: 7008, h: 4672, widths: [640, 1080, 1600, 2400, 3200], box: [45, 27, 86, 100] },
    hiker: { w: 6000, h: 4000, widths: [640, 1080, 1600, 2400, 3200], box: [30, 38, 62, 100] },
    padel: { w: 3936, h: 2624, widths: [640, 1080, 1600, 2400, 3200], box: [30, 30, 62, 98] },
  };

  const PEOPLE = [
    { photo: "climber", woman: true, name: "Inès", age: 27, area: "Paris 18e, 4 km", sports: ["climbing", "yoga"] },
    { photo: "gym", woman: true, name: "Camille", age: 31, area: "Paris 11e, 3 km", sports: ["strength", "running"] },
    { photo: "roadrunner", woman: true, name: "Maya", age: 28, area: "Paris 12e, 5 km", sports: ["running", "trail"] },
    { photo: "tennis", woman: true, name: "Chloé", age: 26, area: "Paris 16e, 3 km", sports: ["tennis", "running"] },
    { photo: "hiker", woman: false, name: "Noah", age: 30, area: "Paris 11e, 2 km", sports: ["hiking", "trail"] },
    { photo: "padel", woman: false, name: "Hugo", age: 32, area: "Paris 15e, 4 km", sports: ["tennis", "running"] },
  ];
  const ICON = { running: "sf-run", climbing: "sf-climb", strength: "sf-strength", hyrox: "sf-hyrox", hiking: "sf-hiking", cycling: "sf-cycling", yoga: "sf-yoga", trail: "sf-trail", tennis: "sf-tennis" };
  const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
  // Anyone can lead. The pile always shows three cards and a fourth waits to step in when the
  // top one goes. Like PackPhotos, it keeps to the lead's gender while the pool allows and only
  // then mixes; never the same photo twice. "You" is someone left out of the pile.
  const top = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
  const same = shuffle(PEOPLE.filter((p) => p.woman === top.woman && p !== top));
  const other = shuffle(PEOPLE.filter((p) => p.woman !== top.woman));
  const [d1, d2, d3] = [...same, ...other].slice(0, 3);
  const viewer = other.find((p) => ![d1, d2, d3].includes(p)) || other[0];
  const sport = t[top.sports[0]], sport2 = t[top.sports[1]];
  const fill = (s) => s.replaceAll("{name}", top.name).replaceAll("{sport}", sport);
  const all = (sel, fn) => document.querySelectorAll(sel).forEach(fn);

  // Full-bleed width the cover crop needs: the widest of the viewport and its height at the
  // photo's ratio. The card reuses the same file, so the hand-off from full screen is seamless.
  const coverWidth = (ph) => Math.ceil(Math.max(innerWidth, innerHeight * ph.w / ph.h));
  const setPhoto = (img, person, sizes) => {
    const ph = PHOTOS[person.photo];
    img.srcset = ph.widths.map((w) => `img/p/${person.photo}-${w}.webp ${w}w`).join(", ");
    img.sizes = sizes(ph);
    img.src = `img/p/${person.photo}-${ph.widths[1]}.webp`;
    Object.assign(img.dataset, { w: ph.w, h: ph.h, box: ph.box.join(",") });
  };
  const setFace = (img, person) => { img.src = `img/p/${person.photo}-face.webp`; img.removeAttribute("srcset"); };
  const hero = (ph) => `${coverWidth(ph)}px`;

  all("[data-person-img]:not([data-avatar])", (el) => setPhoto(el, top, hero));
  all("[data-person-img][data-avatar]", (el) => setFace(el, top));
  all("[data-viewer-img]:not([data-avatar])", (el) => setPhoto(el, viewer, () => "340px"));
  all("[data-viewer-img][data-avatar]", (el) => setFace(el, viewer));
  all("[data-d1-img]", (el) => setPhoto(el, d1, () => "420px"));
  all("[data-d2-img]", (el) => setPhoto(el, d2, () => "420px"));
  all("[data-d3-img]", (el) => setPhoto(el, d3, () => "420px"));
  all("[data-name]", (el) => { el.textContent = top.name; });
  all("[data-age]", (el) => { el.textContent = top.age; });
  all("[data-area]", (el) => { el.textContent = top.area; });
  all("[data-sport-name]", (el) => { el.textContent = sport; });
  all("[data-sport2-name]", (el) => { el.textContent = sport2; });
  all("[data-sport-icon]", (el) => { el.setAttribute("href", `#${ICON[top.sports[0]]}`); });
  all("[data-sport2-icon]", (el) => { el.setAttribute("href", `#${ICON[top.sports[1]]}`); });
  all("[data-tpl]", (el) => { el.textContent = fill(t[el.dataset.tpl]); });
  // The cards behind the top one carry their own person too (name, age, area, sports), dressed
  // exactly like the top card, so the one that steps up is a real profile.
  const topCard = document.querySelector("[data-card]");
  [["[data-d1]", d1], ["[data-d2]", d2], ["[data-d3]", d3]].forEach(([sel, p]) => {
    const card = document.querySelector(sel);
    if (!card || !p || !topCard) return;
    const veil = card.querySelector(".veil");
    ["card__scrim", "card__top", "card__chips"].forEach((cls) => {
      const part = topCard.querySelector(`.${cls}`).cloneNode(true);
      part.querySelectorAll("*").forEach((e) => [...e.attributes].forEach((a) => { if (a.name.startsWith("data-")) e.removeAttribute(a.name); }));
      card.insertBefore(part, veil);
    });
    card.querySelector(".card__name").textContent = p.name;
    card.querySelector(".card__age span").textContent = p.age;
    card.querySelector(".card__area").textContent = p.area;
    const chips = card.querySelectorAll(".chip");
    p.sports.forEach((s, k) => {
      if (!chips[k]) return;
      chips[k].querySelector("span").textContent = t[s];
      chips[k].querySelector("use").setAttribute("href", `#${ICON[s]}`);
    });
  });

  all("[data-tpl-aria]", (el) => { el.setAttribute("aria-label", fill(t[el.dataset.tplAria])); });
})();
