// Site copy in the app's seven languages (en, fr, es, de, it, pt-PT, nl). The browser's
// languages pick one; anything else falls back to English. Runs before main.js splits words.
(() => {
  const T = {
    en: {
      title: "drafft: meet someone who gets your rhythm.",
      description: "drafft is the dating app for people who train. Singles who love sport as much as you do, and one more session in your week.",
      tagline: "Meet someone who gets your rhythm.",
      storeIosSmall: "Download on the", storeAndroidSmall: "Get it on",
      storeIosAria: "Download drafft on the App Store", storeAndroidAria: "Get drafft on Google Play",
      note: "Singles who love sport as much as you do, and one more session in your week.",
      storyAria: "How drafft works",
      cap1: "See who trains near you.", cap1Text: "Before you like, you already know which sports someone does and how often.",
      cap2: "A hello or a session, your pick.", cap2Text: "You already share a sport. There’s no better place to start.",
      cap3: "Propose a session.", cap3Text: "Sport, day, time and a short note. One tap to send.",
      cap4: "See you at 07:00.", cap4Text: "You warm up together. The conversation finds its own pace.",
      phoneAria: "The drafft app: you like Léa, it’s mutual, and you propose a run on Tuesday 29 September at 7:00.",
      discover: "Discover", running: "Running", climbing: "Climbing",
      sendInvite: "Send invite", scrollAria: "Scroll to see the app",
      statement: "It’s easier to talk side by side than face to face.",
      sportsTitle: "From run club to wing foil.",
      runClub: "Run club", cycling: "Cycling", tennis: "Tennis", padel: "Padel", swimming: "Swimming", hiking: "Hiking",
      strength: "Strength", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surfing", kitesurf: "Kitesurf", football: "Football", basketball: "Basketball", volleyball: "Volleyball", rowing: "Rowing",
      skateboarding: "Skateboarding", kayak: "Kayak", pilates: "Pilates", badminton: "Badminton", sailing: "Sailing", pickleball: "Pickleball",
      martialArts: "Martial arts", boxing: "Boxing", skiing: "Skiing", dance: "Dance", golf: "Golf", rugby: "Rugby",
      tempoLead: "The free app gets you matching and meeting. {tier} gets you there faster.",
      undo: "Undo any swipe", undoText: "Swiped too fast? Bring them back.",
      likedYou: "See who likes you", likedYouText: "Match in one tap.",
      unlimited: "Unlimited likes", unlimitedText: "No daily cap.",
      boost: "Weekly boost", boostText: "Thirty minutes up front for people training near you.",
      joinKicker: "You already speak the same language.", joinTitle: "See you at the start line?", joinText: "Free on iPhone and Android.",
      footer: "Meet someone who gets your rhythm.", howItWorks: "How it works",
    },
    fr: {
      title: "drafft\u00a0: rencontre quelqu’un qui comprend ton rythme.",
      description: "drafft, l’app de rencontre pour celles et ceux qui s’entraînent. Des célibataires qui aiment le sport autant que toi, et une séance de plus dans la semaine.",
      tagline: "Rencontre quelqu’un qui comprend ton rythme.",
      storeIosSmall: "Télécharger dans", storeAndroidSmall: "Disponible sur",
      storeIosAria: "Télécharger drafft dans l’App Store", storeAndroidAria: "Télécharger drafft sur Google Play",
      note: "Des célibataires qui aiment le sport autant que toi, et une séance de plus dans la semaine.",
      storyAria: "Comment marche drafft",
      cap1: "Découvre qui s’entraîne près de toi.", cap1Text: "Avant de liker, tu sais déjà quels sports la personne pratique et à quelle fréquence.",
      cap2: "Un mot ou une séance, au choix.", cap2Text: "Vous avez déjà un sport en commun. Pas de meilleur point de départ.",
      cap3: "Propose une séance.", cap3Text: "Sport, jour, heure et un petit mot. Un tap pour l’envoyer.",
      cap4: "Rendez-vous à 7 h.", cap4Text: "Vous vous échauffez ensemble. La conversation trouve son rythme toute seule.",
      phoneAria: "L’app drafft\u00a0: tu likes Léa, c’est réciproque, et tu lui proposes un run mardi 29 septembre à 7\u00a0h.",
      discover: "Découvrir", running: "Running", climbing: "Escalade",
      sendInvite: "Envoyer l’invitation", scrollAria: "Fais défiler pour voir l’app",
      statement: "On se parle plus facilement côte à côte que face à face.",
      sportsTitle: "Du run club au wing foil.",
      runClub: "Run club", cycling: "Vélo", tennis: "Tennis", padel: "Padel", swimming: "Natation", hiking: "Randonnée",
      strength: "Musculation", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surf", kitesurf: "Kitesurf", football: "Football", basketball: "Basket", volleyball: "Volley", rowing: "Aviron",
      skateboarding: "Skate", kayak: "Kayak", pilates: "Pilates", badminton: "Badminton", sailing: "Voile", pickleball: "Pickleball",
      martialArts: "Arts martiaux", boxing: "Boxe", skiing: "Ski", dance: "Danse", golf: "Golf", rugby: "Rugby",
      tempoLead: "L’app gratuite te permet de matcher et de rencontrer. {tier} t’y mène plus vite.",
      undo: "Annule n’importe quel swipe", undoText: "Swipé trop vite ? Fais revenir le profil.",
      likedYou: "Vois qui te like", likedYouText: "Matche en un tap.",
      unlimited: "Likes illimités", unlimitedText: "Aucune limite quotidienne.",
      boost: "Boost hebdomadaire", boostText: "Trente minutes en tête de pile autour de toi.",
      joinKicker: "Vous parlez déjà la même langue.", joinTitle: "On se retrouve sur la ligne de départ\u00a0?", joinText: "Gratuit sur iPhone et Android.",
      footer: "Rencontre quelqu’un qui comprend ton rythme.", howItWorks: "Comment ça marche",
    },
    es: {
      title: "drafft: conoce a alguien que entienda tu ritmo.",
      description: "drafft es la app de citas para quienes entrenan. Gente soltera que ama el deporte tanto como tú, y una sesión más en la semana.",
      tagline: "Conoce a alguien que entienda tu ritmo.",
      storeIosSmall: "Descárgalo en", storeAndroidSmall: "Disponible en",
      storeIosAria: "Descargar drafft en la App Store", storeAndroidAria: "Descargar drafft en Google Play",
      note: "Gente soltera que ama el deporte tanto como tú, y una sesión más en la semana.",
      storyAria: "Cómo funciona drafft",
      cap1: "Descubre quién entrena cerca de ti.", cap1Text: "Antes de dar like, ya sabes qué deportes practica la persona y con qué frecuencia.",
      cap2: "Un saludo o una sesión, tú eliges.", cap2Text: "Ya compartís un deporte. No hay mejor punto de partida.",
      cap3: "Propón una sesión.", cap3Text: "Deporte, día, hora y una nota corta. Un toque para enviarla.",
      cap4: "Nos vemos a las 7:00.", cap4Text: "Calentáis juntos. La conversación encuentra su ritmo sola.",
      phoneAria: "La app drafft: das like a Léa, es mutuo y le propones correr el martes 29 de septiembre a las 7:00.",
      discover: "Descubrir", running: "Running", climbing: "Escalada",
      sendInvite: "Enviar invitación", scrollAria: "Desplázate para ver la app",
      statement: "Se habla con más facilidad codo con codo que cara a cara.",
      sportsTitle: "Del run club al wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Tenis", padel: "Pádel", swimming: "Natación", hiking: "Senderismo",
      strength: "Fuerza", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surf", kitesurf: "Kitesurf", football: "Fútbol", basketball: "Baloncesto", volleyball: "Voleibol", rowing: "Remo",
      skateboarding: "Skate", kayak: "Kayak", pilates: "Pilates", badminton: "Bádminton", sailing: "Vela", pickleball: "Pickleball",
      martialArts: "Artes marciales", boxing: "Boxeo", skiing: "Esquí", dance: "Baile", golf: "Golf", rugby: "Rugby",
      tempoLead: "La app gratuita te lleva a hacer match y quedar. Con {tier} llegas antes.",
      undo: "Deshaz cualquier swipe", undoText: "¿Deslizaste demasiado rápido? Recupera el perfil.",
      likedYou: "Mira a quién le gustas", likedYouText: "Haz match con un toque.",
      unlimited: "Likes ilimitados", unlimitedText: "Sin límite diario.",
      boost: "Boost semanal", boostText: "Treinta minutos en primera fila para quien entrena cerca de ti.",
      joinKicker: "Ya habláis el mismo idioma.", joinTitle: "¿Nos vemos en la línea de salida?", joinText: "Gratis en iPhone y Android.",
      footer: "Conoce a alguien que entienda tu ritmo.", howItWorks: "Cómo funciona",
    },
    de: {
      title: "drafft: Triff jemanden, der deinen Rhythmus versteht.",
      description: "drafft ist die Dating-App für alle, die trainieren. Singles, die Sport so lieben wie du, und eine Session mehr in der Woche.",
      tagline: "Triff jemanden, der deinen Rhythmus versteht.",
      storeIosSmall: "Laden im", storeAndroidSmall: "Jetzt bei",
      storeIosAria: "drafft im App Store laden", storeAndroidAria: "drafft bei Google Play laden",
      note: "Singles, die Sport so lieben wie du, und eine Session mehr in der Woche.",
      storyAria: "So funktioniert drafft",
      cap1: "Entdecke, wer in deiner Nähe trainiert.", cap1Text: "Bevor du likst, weißt du schon, welche Sportarten die Person macht und wie oft.",
      cap2: "Ein Hallo oder eine Session, du entscheidest.", cap2Text: "Ihr habt schon einen Sport gemeinsam. Einen besseren Start gibt es nicht.",
      cap3: "Schlag eine Session vor.", cap3Text: "Sport, Tag, Uhrzeit und eine kurze Nachricht. Ein Tipp zum Senden.",
      cap4: "Bis um 7 Uhr.", cap4Text: "Ihr wärmt euch zusammen auf. Das Gespräch findet sein Tempo von selbst.",
      phoneAria: "Die drafft-App: Du likest Léa, ihr mögt euch beide, und du schlägst einen Lauf am Dienstag, 29. September, um 7 Uhr vor.",
      discover: "Entdecken", running: "Laufen", climbing: "Klettern",
      sendInvite: "Einladung senden", scrollAria: "Scrolle, um die App zu sehen",
      statement: "Nebeneinander redet es sich leichter als einander gegenüber.",
      sportsTitle: "Vom Run Club bis zum Wingfoil.",
      runClub: "Run Club", cycling: "Radfahren", tennis: "Tennis", padel: "Padel", swimming: "Schwimmen", hiking: "Wandern",
      strength: "Krafttraining", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surfen", kitesurf: "Kitesurfen", football: "Fußball", basketball: "Basketball", volleyball: "Volleyball", rowing: "Rudern",
      skateboarding: "Skateboarden", kayak: "Kajak", pilates: "Pilates", badminton: "Badminton", sailing: "Segeln", pickleball: "Pickleball",
      martialArts: "Kampfsport", boxing: "Boxen", skiing: "Skifahren", dance: "Tanzen", golf: "Golf", rugby: "Rugby",
      tempoLead: "Mit der kostenlosen App matchst du und triffst Leute. Mit {tier} geht es schneller.",
      undo: "Jeden Swipe rückgängig machen", undoText: "Zu schnell geswipt? Hol das Profil zurück.",
      likedYou: "Sieh, wer dich likt", likedYouText: "Matche mit einem Tipp.",
      unlimited: "Unbegrenzte Likes", unlimitedText: "Kein Tageslimit.",
      boost: "Wöchentlicher Boost", boostText: "Dreißig Minuten ganz vorn bei Leuten, die in deiner Nähe trainieren.",
      joinKicker: "Ihr sprecht schon dieselbe Sprache.", joinTitle: "Sehen wir uns an der Startlinie?", joinText: "Kostenlos für iPhone und Android.",
      footer: "Triff jemanden, der deinen Rhythmus versteht.", howItWorks: "So funktioniert’s",
    },
    it: {
      title: "drafft: incontra qualcuno che capisce il tuo ritmo.",
      description: "drafft è l’app di incontri per chi si allena. Single che amano lo sport quanto te, e una sessione in più nella settimana.",
      tagline: "Incontra qualcuno che capisce il tuo ritmo.",
      storeIosSmall: "Scarica su", storeAndroidSmall: "Disponibile su",
      storeIosAria: "Scarica drafft dall’App Store", storeAndroidAria: "Scarica drafft da Google Play",
      note: "Single che amano lo sport quanto te, e una sessione in più nella settimana.",
      storyAria: "Come funziona drafft",
      cap1: "Scopri chi si allena vicino a te.", cap1Text: "Prima di mettere like, sai già quali sport pratica la persona e quanto spesso.",
      cap2: "Un saluto o una sessione, a te la scelta.", cap2Text: "Avete già uno sport in comune. Non c’è punto di partenza migliore.",
      cap3: "Proponi una sessione.", cap3Text: "Sport, giorno, ora e una breve nota. Un tocco per inviarla.",
      cap4: "Ci vediamo alle 7:00.", cap4Text: "Vi riscaldate insieme. La conversazione trova il suo ritmo da sola.",
      phoneAria: "L’app drafft: metti like a Léa, è reciproco e le proponi una corsa martedì 29 settembre alle 7:00.",
      discover: "Scopri", running: "Corsa", climbing: "Arrampicata",
      sendInvite: "Invia invito", scrollAria: "Scorri per vedere l’app",
      statement: "Si parla più facilmente fianco a fianco che faccia a faccia.",
      sportsTitle: "Dal run club al wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Tennis", padel: "Padel", swimming: "Nuoto", hiking: "Escursionismo",
      strength: "Pesi", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surf", kitesurf: "Kitesurf", football: "Calcio", basketball: "Basket", volleyball: "Pallavolo", rowing: "Canottaggio",
      skateboarding: "Skateboard", kayak: "Kayak", pilates: "Pilates", badminton: "Badminton", sailing: "Vela", pickleball: "Pickleball",
      martialArts: "Arti marziali", boxing: "Boxe", skiing: "Sci", dance: "Danza", golf: "Golf", rugby: "Rugby",
      tempoLead: "L’app gratuita ti fa fare match e incontrare. Con {tier} ci arrivi prima.",
      undo: "Annulla qualsiasi swipe", undoText: "Swipe troppo veloce? Recupera il profilo.",
      likedYou: "Scopri a chi piaci", likedYouText: "Fai match con un tocco.",
      unlimited: "Like illimitati", unlimitedText: "Nessun limite giornaliero.",
      boost: "Boost settimanale", boostText: "Trenta minuti in prima fila per chi si allena vicino a te.",
      joinKicker: "Parlate già la stessa lingua.", joinTitle: "Ci vediamo sulla linea di partenza?", joinText: "Gratis su iPhone e Android.",
      footer: "Incontra qualcuno che capisce il tuo ritmo.", howItWorks: "Come funziona",
    },
    pt: {
      title: "drafft: conhece alguém que perceba o teu ritmo.",
      description: "O drafft é a app de encontros para quem treina. Pessoas solteiras que gostam de desporto tanto como tu, e mais uma sessão na semana.",
      tagline: "Conhece alguém que perceba o teu ritmo.",
      storeIosSmall: "Descarregar na", storeAndroidSmall: "Disponível no",
      storeIosAria: "Descarregar o drafft na App Store", storeAndroidAria: "Descarregar o drafft no Google Play",
      note: "Pessoas solteiras que gostam de desporto tanto como tu, e mais uma sessão na semana.",
      storyAria: "Como funciona o drafft",
      cap1: "Descobre quem treina perto de ti.", cap1Text: "Antes de dar like, já sabes que desportos a pessoa pratica e com que frequência.",
      cap2: "Um olá ou uma sessão, à tua escolha.", cap2Text: "Já têm um desporto em comum. Não há melhor ponto de partida.",
      cap3: "Propõe uma sessão.", cap3Text: "Desporto, dia, hora e uma nota curta. Um toque para enviar.",
      cap4: "Até às 7:00.", cap4Text: "Aquecem juntos. A conversa encontra o seu ritmo sozinha.",
      phoneAria: "A app drafft: dás like à Léa, é recíproco e propões-lhe uma corrida na terça-feira, 29 de setembro, às 7:00.",
      discover: "Descobrir", running: "Corrida", climbing: "Escalada",
      sendInvite: "Enviar convite", scrollAria: "Desliza para ver a app",
      statement: "Fala-se mais facilmente lado a lado do que cara a cara.",
      sportsTitle: "Do run club ao wing foil.",
      runClub: "Run club", cycling: "Ciclismo", tennis: "Ténis", padel: "Padel", swimming: "Natação", hiking: "Trilhos",
      strength: "Musculação", yoga: "Ioga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surf", kitesurf: "Kitesurf", football: "Futebol", basketball: "Basquetebol", volleyball: "Voleibol", rowing: "Remo",
      skateboarding: "Skate", kayak: "Caiaque", pilates: "Pilates", badminton: "Badminton", sailing: "Vela", pickleball: "Pickleball",
      martialArts: "Artes marciais", boxing: "Boxe", skiing: "Esqui", dance: "Dança", golf: "Golfe", rugby: "Râguebi",
      tempoLead: "A app gratuita põe-te a fazer match e a conhecer pessoas. Com o {tier} chegas lá mais depressa.",
      undo: "Anula qualquer swipe", undoText: "Deslizaste depressa demais? Recupera o perfil.",
      likedYou: "Vê quem gosta de ti", likedYouText: "Faz match com um toque.",
      unlimited: "Likes ilimitados", unlimitedText: "Sem limite diário.",
      boost: "Boost semanal", boostText: "Trinta minutos na linha da frente para quem treina perto de ti.",
      joinKicker: "Já falam a mesma língua.", joinTitle: "Vemo-nos na linha de partida?", joinText: "Grátis no iPhone e no Android.",
      footer: "Conhece alguém que perceba o teu ritmo.", howItWorks: "Como funciona",
    },
    nl: {
      title: "drafft: ontmoet iemand die jouw ritme begrijpt.",
      description: "drafft is de dating-app voor mensen die trainen. Singles die net zo van sport houden als jij, en één sessie extra in de week.",
      tagline: "Ontmoet iemand die jouw ritme begrijpt.",
      storeIosSmall: "Download in de", storeAndroidSmall: "Ontdek het op",
      storeIosAria: "Download drafft in de App Store", storeAndroidAria: "Download drafft op Google Play",
      note: "Singles die net zo van sport houden als jij, en één sessie extra in de week.",
      storyAria: "Zo werkt drafft",
      cap1: "Ontdek wie er bij jou in de buurt traint.", cap1Text: "Voordat je liket, weet je al welke sporten iemand doet en hoe vaak.",
      cap2: "Een hoi of een sessie, jij kiest.", cap2Text: "Jullie delen al een sport. Een beter startpunt bestaat niet.",
      cap3: "Stel een sessie voor.", cap3Text: "Sport, dag, tijd en een kort berichtje. Eén tik om te versturen.",
      cap4: "Tot 07:00.", cap4Text: "Jullie warmen samen op. Het gesprek vindt vanzelf zijn tempo.",
      phoneAria: "De drafft-app: je liket Léa, het is wederzijds en je stelt een run voor op dinsdag 29 september om 7:00.",
      discover: "Ontdekken", running: "Hardlopen", climbing: "Klimmen",
      sendInvite: "Uitnodiging sturen", scrollAria: "Scroll om de app te zien",
      statement: "Praten gaat makkelijker naast elkaar dan tegenover elkaar.",
      sportsTitle: "Van runclub tot wingfoil.",
      runClub: "Runclub", cycling: "Wielrennen", tennis: "Tennis", padel: "Padel", swimming: "Zwemmen", hiking: "Hiken",
      strength: "Krachttraining", yoga: "Yoga", trail: "Trail", hyrox: "Hyrox",
      surfing: "Surfen", kitesurf: "Kitesurfen", football: "Voetbal", basketball: "Basketbal", volleyball: "Volleybal", rowing: "Roeien",
      skateboarding: "Skateboarden", kayak: "Kajak", pilates: "Pilates", badminton: "Badminton", sailing: "Zeilen", pickleball: "Pickleball",
      martialArts: "Vechtsport", boxing: "Boksen", skiing: "Skiën", dance: "Dansen", golf: "Golf", rugby: "Rugby",
      tempoLead: "Met de gratis app match je en spreek je af. Met {tier} kom je er sneller.",
      undo: "Maak elke swipe ongedaan", undoText: "Te snel geswipet? Haal het profiel terug.",
      likedYou: "Zie wie jou leuk vindt", likedYouText: "Match met één tik.",
      unlimited: "Onbeperkt liken", unlimitedText: "Geen daglimiet.",
      boost: "Wekelijkse boost", boostText: "Dertig minuten vooraan bij mensen die in je buurt trainen.",
      joinKicker: "Jullie spreken al dezelfde taal.", joinTitle: "Zien we elkaar op de startlijn?", joinText: "Gratis op iPhone en Android.",
      footer: "Ontmoet iemand die jouw ritme begrijpt.", howItWorks: "Hoe het werkt",
    },
  };

  // In-phone copy: the app's own strings (Localizable.xcstrings) where they exist.
  const APP = {
    en: { tabLikes: "Likes", tabSessions: "Sessions", tabChats: "Chats", tabYou: "You", waiting: "Waiting", confirmed: "Confirmed",
      runningSession: "Running session", dayLong: "Tuesday 29 Sep", willPick: "Léa will pick a time or propose others.", addToCalendar: "Add to calendar",
      message: "Message", itsAMatch: "It’s mutual.", matchSub: "You and Léa both do Running.",
      sayHi: "Say hi", keepSwiping: "Back to Discover", trainWith: "Train with Léa", firstDateSession: "A sport, a day, a time.",
      sport: "Sport", when: "When", upTo3: "Up to 3 times", addTime: "Add a time", addAnother: "Add another", tue: "Tue", sep: "Sep",
      recapNone: "Running, no time yet", recapTime: "Running, Tue 29 Sep at 7:00", noPitch: "No note yet", sendInvite: "Propose a session", sent: "Sent" },
    fr: { tabLikes: "Likes", tabSessions: "Séances", tabChats: "Discussions", tabYou: "Toi", waiting: "En attente", confirmed: "Confirmée",
      runningSession: "Séance Running", dayLong: "Mardi 29 sept.", willPick: "Léa choisira un créneau ou en proposera d’autres.", addToCalendar: "Ajouter au calendrier",
      message: "Message", itsAMatch: "C’est réciproque.", matchSub: "Léa et toi, vous partagez un sport\u00a0: Running.",
      sayHi: "Dire bonjour", keepSwiping: "Retour à Découvrir", trainWith: "S’entraîner avec Léa", firstDateSession: "Un sport, un jour, une heure.",
      sport: "Sport", when: "Quand", upTo3: "Jusqu’à 3 créneaux", addTime: "Ajouter un créneau", addAnother: "Ajouter un autre", tue: "mar.", sep: "sept.",
      recapNone: "Running, pas encore de créneau", recapTime: "Running, mar. 29 sept. à 7:00", noPitch: "Pas encore de petit mot", sendInvite: "Proposer la séance", sent: "Envoyée" },
    es: { tabLikes: "Likes", tabSessions: "Sesiones", tabChats: "Chats", tabYou: "Tú", waiting: "En espera", confirmed: "Confirmada",
      runningSession: "Sesión de Running", dayLong: "Martes 29 sept.", willPick: "Léa elegirá un horario o propondrá otros.", addToCalendar: "Añadir al calendario",
      message: "Mensaje", itsAMatch: "Es mutuo.", matchSub: "Léa y tú practicáis Running.",
      sayHi: "Saludar", keepSwiping: "Volver a Descubrir", trainWith: "Entrena con Léa", firstDateSession: "Un deporte, un día, una hora.",
      sport: "Deporte", when: "Cuándo", upTo3: "Hasta 3 horas", addTime: "Añadir hora", addAnother: "Añadir otra", tue: "mar", sep: "sept",
      recapNone: "Running, aún sin horario", recapTime: "Running, mar 29 sept a las 7:00", noPitch: "Aún sin nota", sendInvite: "Proponer la sesión", sent: "Enviada" },
    de: { tabLikes: "Likes", tabSessions: "Sessions", tabChats: "Chats", tabYou: "Du", waiting: "Wartet", confirmed: "Bestätigt",
      runningSession: "Laufen-Session", dayLong: "Dienstag, 29. Sept.", willPick: "Léa wählt eine Zeit oder schlägt andere vor.", addToCalendar: "Zum Kalender hinzufügen",
      message: "Nachricht", itsAMatch: "Ihr mögt euch beide.", matchSub: "Du und Léa macht beide Laufen.",
      sayHi: "Sag Hallo", keepSwiping: "Zurück zu Entdecken", trainWith: "Mit Léa trainieren", firstDateSession: "Ein Sport, ein Tag, eine Uhrzeit.",
      sport: "Sport", when: "Wann", upTo3: "Bis zu 3 Zeiten", addTime: "Zeit hinzufügen", addAnother: "Weitere hinzufügen", tue: "Di.", sep: "Sept.",
      recapNone: "Laufen, noch keine Zeit", recapTime: "Laufen, Di., 29. Sept. um 7:00", noPitch: "Noch keine Notiz", sendInvite: "Session vorschlagen", sent: "Gesendet" },
    it: { tabLikes: "Like", tabSessions: "Sessioni", tabChats: "Chat", tabYou: "Tu", waiting: "In attesa", confirmed: "Confermata",
      runningSession: "Sessione di Corsa", dayLong: "Martedì 29 set", willPick: "Léa sceglierà un orario o ne proporrà altri.", addToCalendar: "Aggiungi al calendario",
      message: "Messaggio", itsAMatch: "È reciproco.", matchSub: "Tu e Léa fate entrambi Corsa.",
      sayHi: "Saluta", keepSwiping: "Torna a Scopri", trainWith: "Allenati con Léa", firstDateSession: "Uno sport, un giorno, un orario.",
      sport: "Sport", when: "Quando", upTo3: "Fino a 3 orari", addTime: "Aggiungi un orario", addAnother: "Aggiungi un altro", tue: "mar", sep: "set",
      recapNone: "Corsa, ancora nessun orario", recapTime: "Corsa, mar 29 set alle 7:00", noPitch: "Ancora nessuna nota", sendInvite: "Proponi la sessione", sent: "Inviato" },
    pt: { tabLikes: "Likes", tabSessions: "Sessões", tabChats: "Conversas", tabYou: "Tu", waiting: "À espera", confirmed: "Confirmada",
      runningSession: "Sessão de Corrida", dayLong: "Terça-feira, 29 set.", willPick: "Léa vai escolher um horário ou propor outros.", addToCalendar: "Adicionar ao calendário",
      message: "Mensagem", itsAMatch: "É recíproco.", matchSub: "Tu e Léa praticam Corrida.",
      sayHi: "Dizer olá", keepSwiping: "Voltar a Descobrir", trainWith: "Treinar com Léa", firstDateSession: "Um desporto, um dia, uma hora.",
      sport: "Desporto", when: "Quando", upTo3: "Até 3 horários", addTime: "Adicionar horário", addAnother: "Adicionar outro", tue: "ter.", sep: "set.",
      recapNone: "Corrida, ainda sem horário", recapTime: "Corrida, ter., 29 set. às 7:00", noPitch: "Ainda sem nota", sendInvite: "Propor a sessão", sent: "Enviado" },
    nl: { tabLikes: "Likes", tabSessions: "Sessies", tabChats: "Chats", tabYou: "Jij", waiting: "In afwachting", confirmed: "Bevestigd",
      runningSession: "Hardlopen-sessie", dayLong: "Dinsdag 29 sep", willPick: "Léa kiest een tijd of stelt andere voor.", addToCalendar: "Toevoegen aan agenda",
      message: "Bericht", itsAMatch: "Het is wederzijds.", matchSub: "Jij en Léa doen allebei Hardlopen.",
      sayHi: "Zeg hoi", keepSwiping: "Terug naar Ontdekken", trainWith: "Train met Léa", firstDateSession: "Een sport, een dag, een tijd.",
      sport: "Sport", when: "Wanneer", upTo3: "Tot 3 tijden", addTime: "Tijd toevoegen", addAnother: "Nog een toevoegen", tue: "di", sep: "sep",
      recapNone: "Hardlopen, nog geen tijd", recapTime: "Hardlopen, di 29 sep om 7:00", noPitch: "Nog geen berichtje", sendInvite: "Sessie voorstellen", sent: "Verstuurd" },
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
    pt: { m1: "Então, «fã do dia das subidas». Que ousadia.", m2: "Testado e aprovado. O canal tem subidas, certo?", m3: "É o sítio com menos subidas de Paris.", m4: "Mas gosto da confiança.", m5: "Então resolvemos isso no terreno.",
      legalNotice: "Aviso legal", privacy: "Política de privacidade", terms: "Termos de utilização" },
    nl: { m1: "Dus ‘fan van heuveldag’. Gedurfd.", m2: "Getest en bewezen. Het kanaal heeft toch heuvels?", m3: "Het is de vlakste plek van Parijs.", m4: "Maar ik hou van het zelfvertrouwen.", m5: "Dan beslechten we het op de weg.",
      legalNotice: "Juridische informatie", privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden" },
  };
  Object.keys(MORE).forEach((l) => Object.assign(T[l], MORE[l]));

  // Sentences that carry the drawn profile: {name} and {sport} are filled in below. Written so
  // the sport name needs no article or case in any language.
  const TPL = {
    en: { matchSub: "You and {name} both do {sport}.", sessionTitle: "{sport} session",
      trainWith: "Train with {name}", recapNone: "{sport}, no time yet", recapTime: "{sport}, Tue 29 Sep at 7:00",
      willPick: "{name} will pick a time or propose others.", phoneAria: "The drafft app: you like {name}, it’s mutual, and you propose a {sport} session on Tuesday 29 September at 7:00.",
      m1: "Your profile says you never skip a session. Bold claim.", m2: "Tested and proven. Want proof?", m3: "Obviously.", m4: "But I set the pace.", m5: "Deal. Let’s settle it on the ground." },
    fr: { matchSub: "{name} et toi, vous partagez un sport\u00a0: {sport}.", sessionTitle: "Séance {sport}",
      trainWith: "S’entraîner avec {name}", recapNone: "{sport}, pas encore de créneau", recapTime: "{sport}, mar. 29 sept. à 7:00",
      willPick: "{name} choisira un créneau ou en proposera d’autres.", phoneAria: "L’app drafft\u00a0: tu likes {name}, c’est réciproque, et tu proposes une séance (sport\u00a0: {sport}) mardi 29 septembre à 7\u00a0h.",
      m1: "Ton profil dit que tu ne rates jamais une séance. Culotté.", m2: "Testé et approuvé. Tu veux la preuve\u00a0?", m3: "Évidemment.", m4: "Mais c’est moi qui donne le rythme.", m5: "Marché conclu. On règle ça sur le terrain." },
    es: { matchSub: "{name} y tú practicáis {sport}.", sessionTitle: "Sesión de {sport}",
      trainWith: "Entrena con {name}", recapNone: "{sport}, aún sin horario", recapTime: "{sport}, mar 29 sept a las 7:00",
      willPick: "{name} elegirá un horario o propondrá otros.", phoneAria: "La app drafft: das like a {name}, es mutuo y le propones una sesión de {sport} el martes 29 de septiembre a las 7:00.",
      m1: "Tu perfil dice que nunca te saltas una sesión. Qué atrevido.", m2: "Probado y comprobado. ¿Quieres pruebas?", m3: "Obviamente.", m4: "Pero el ritmo lo marco yo.", m5: "Trato hecho. Lo resolvemos sobre el terreno." },
    de: { matchSub: "Du und {name} macht beide {sport}.", sessionTitle: "{sport}-Session",
      trainWith: "Mit {name} trainieren", recapNone: "{sport}, noch keine Zeit", recapTime: "{sport}, Di., 29. Sept. um 7:00",
      willPick: "{name} wählt eine Zeit oder schlägt andere vor.", phoneAria: "Die drafft-App: Du likest {name}, ihr mögt euch beide, und du schlägst eine {sport}-Session am Dienstag, 29. September, um 7 Uhr vor.",
      m1: "Laut deinem Profil lässt du nie eine Session aus. Mutige Ansage.", m2: "Getestet und bewiesen. Willst du einen Beweis?", m3: "Na klar.", m4: "Aber das Tempo bestimme ich.", m5: "Abgemacht. Wir klären das auf der Strecke." },
    it: { matchSub: "Tu e {name} fate entrambi {sport}.", sessionTitle: "Sessione di {sport}",
      trainWith: "Allenati con {name}", recapNone: "{sport}, ancora nessun orario", recapTime: "{sport}, mar 29 set alle 7:00",
      willPick: "{name} sceglierà un orario o ne proporrà altri.", phoneAria: "L’app drafft: metti like a {name}, è reciproco e proponi una sessione di {sport} martedì 29 settembre alle 7:00.",
      m1: "Il tuo profilo dice che non salti mai una sessione. Che coraggio.", m2: "Provato e approvato. Vuoi una prova?", m3: "Ovviamente.", m4: "Ma il ritmo lo decido io.", m5: "Affare fatto. Risolviamola sul campo." },
    pt: { matchSub: "Tu e {name} praticam {sport}.", sessionTitle: "Sessão de {sport}",
      trainWith: "Treinar com {name}", recapNone: "{sport}, ainda sem horário", recapTime: "{sport}, ter., 29 set. às 7:00",
      willPick: "{name} vai escolher um horário ou propor outros.", phoneAria: "A app drafft: dás like a {name}, é recíproco e propões uma sessão de {sport} na terça-feira, 29 de setembro, às 7:00.",
      m1: "O teu perfil diz que nunca faltas a uma sessão. Que ousadia.", m2: "Testado e aprovado. Queres provas?", m3: "Claro.", m4: "Mas o ritmo é meu.", m5: "Combinado. Resolvemos isso no terreno." },
    nl: { matchSub: "Jij en {name} doen allebei {sport}.", sessionTitle: "{sport}-sessie",
      trainWith: "Train met {name}", recapNone: "{sport}, nog geen tijd", recapTime: "{sport}, di 29 sep om 7:00",
      willPick: "{name} kiest een tijd of stelt andere voor.", phoneAria: "De drafft-app: je liket {name}, het is wederzijds en je stelt een {sport}-sessie voor op dinsdag 29 september om 7:00.",
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
  // Legal pages: /<page> is English, /<lang>/<page> every other language.
  if (lang !== "en") document.querySelectorAll("[data-legal]").forEach((a) => { a.href = `/${lang}${a.getAttribute("href")}`; });
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
    cyclist: { w: 3829, h: 2411, widths: [640, 1080, 1600, 2400, 3200], box: [28, 19, 65, 100] },
    mountaineer: { w: 6000, h: 4000, widths: [640, 1080, 1600, 2400, 3200], box: [20, 25, 95, 100] },
    skier: { w: 5655, h: 3770, widths: [640, 1080, 1600, 2400, 3200], box: [20, 10, 80, 100] },
  };

  const PEOPLE = [
    { photo: "climber", woman: true, name: "Inès", age: 27, area: "Paris 18e, 4 km", sports: ["climbing", "yoga"] },
    { photo: "gym", woman: true, name: "Camille", age: 31, area: "Paris 11e, 3 km", sports: ["strength", "running"] },
    { photo: "roadrunner", woman: true, name: "Maya", age: 28, area: "Paris 12e, 5 km", sports: ["running", "trail"] },
    { photo: "tennis", woman: true, name: "Chloé", age: 26, area: "Paris 16e, 3 km", sports: ["tennis", "running"] },
    { photo: "hiker", woman: false, name: "Noah", age: 30, area: "Paris 11e, 2 km", sports: ["hiking", "trail"] },
    { photo: "padel", woman: false, name: "Hugo", age: 32, area: "Paris 15e, 4 km", sports: ["padel", "running"] },
    { photo: "cyclist", woman: false, name: "Léo", age: 29, area: "Paris 10e, 3 km", sports: ["cycling", "running"] },
    { photo: "mountaineer", woman: false, name: "Rayan", age: 28, area: "Paris 19e, 4 km", sports: ["hiking", "trail"] },
    { photo: "skier", woman: true, name: "Léa", age: 29, area: "Paris 9e, 2 km", sports: ["hiking", "yoga"] },
  ];
  const ICON = { running: "ic-steps-outline", climbing: "ic-carabiner", strength: "ic-dumbbell-large", hyrox: "ic-stopwatch", hiking: "ic-hiking", cycling: "ic-bicycling", yoga: "ic-meditation", trail: "ic-landscape-2-outline", tennis: "ic-tennis", padel: "ic-padel" };
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
