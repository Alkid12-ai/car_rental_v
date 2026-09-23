import type { Dictionary } from "./sq";

/**
 * Italian (it-IT) dictionary.
 *
 * Durrës and Rinas are written with their official names rather than the
 * Italian exonyms (Durazzo, Valona etc.) so that the visible text matches the
 * NAP data and what appears on Google Maps. An address that reads differently
 * from the map is a local-SEO liability, and Italian speakers recognise the
 * official names.
 *
 * ⚠️ Rental-specific legal wording — deposit, insurance, minimum age, driving
 * licence validity, cross-border rules — should be reviewed by a native speaker
 * before launch.
 */
export const it: Dictionary = {
  meta: {
    home: {
      title: "rentcardb — Noleggio auto all'Aeroporto di Rinas e a Durrës",
      description:
        "rentcardb offre noleggio auto online con ritiro all'Aeroporto di Rinas e a Durrës. Una flotta di {count} auto, prezzi da {price}€ al giorno e prenotazione rapida in 3 passi.",
    },
    cars: {
      title: "Auto a noleggio — la flotta completa",
      description:
        "Tutte le auto a noleggio all'Aeroporto di Rinas e a Durrës. Filtra per categoria, cambio, carburante e prezzo. Prezzi da {price}€ al giorno con chilometraggio illimitato.",
    },
    booking: {
      title: "Prenota la tua auto online in 3 passi",
      description:
        "Prenota un'auto a noleggio all'Aeroporto di Rinas o a Durrës in 3 semplici passi. Nessun pagamento online — confermiamo la disponibilità per telefono.",
    },
    about: {
      title: "Chi siamo — chi siamo e come lavoriamo",
      description:
        "rentcardb è una società albanese di noleggio auto con sedi all'Aeroporto di Rinas e a Durrës. Una flotta di {count} auto, prezzi trasparenti e assistenza 24/7.",
    },
    contact: {
      title: "Contatti — chiamaci o scrivici su WhatsApp",
      description:
        "Contatta rentcardb: {phone}, {email}. Punti di ritiro all'Aeroporto di Rinas e nel centro di Durrës.",
    },
    carNotFound: "Auto non trovata",
    carTitle: "{name} {year} a noleggio — {price}€ al giorno",
    carDescription:
      "{name} {year} a noleggio in Albania: {transmission}, {seats} posti, {fuel}. Ritiro all'Aeroporto di Rinas o a Durrës. Min. {minDays} giorni.",
    notFoundTitle: "Pagina non trovata",
  },

  nav: {
    cars: "Auto",
    locations: "Sedi",
    howItWorks: "Come funziona",
    about: "Chi siamo",
    contact: "Contatti",
    reserve: "Prenota ora",
    menu: "Menu",
    mainNav: "Navigazione principale",
    mobileNav: "Navigazione mobile",
    openMenu: "Apri il menu",
    homeLabel: "rentcardb — pagina iniziale",
    brandSub: "Rinas e Durrës",
    menuSubtitle: "Noleggio auto all'Aeroporto di Rinas e a Durrës.",
    themeToLight: "Attiva il tema chiaro",
    themeToDark: "Attiva il tema scuro",
    language: "Lingua",
    changeLanguage: "Cambia lingua",
  },

  actions: {
    seeAll: "Vedi tutte",
    seeAllCars: "Vedi tutte le auto disponibili",
    details: "Dettagli",
    book: "Prenota",
    continue: "Continua",
    back: "Indietro",
    reset: "Cancella i filtri",
    clear: "Cancella",
    contact: "Contatti",
    contactUs: "Contattaci",
    viewCars: "Vedi le auto",
    home: "Pagina iniziale",
    otherCars: "Vedi altre auto",
    bookThisCar: "Prenota questa auto",
    askWhatsapp: "Chiedi su WhatsApp",
  },

  hero: {
    badge: "Ritiro all'Aeroporto di Rinas e nel centro di Durrës",
    title: "Trova l'auto perfetta per il tuo viaggio",
    subtitle: "{count} auto disponibili — da {from}€ al giorno",
    statAvailable: "{count} auto disponibili",
    statPickup: "Ritiro in aeroporto 24/7",
    statPrice: "Prezzi da {price}€ / giorno",
  },

  fleet: {
    eyebrow: "Flotta",
    title: "Le auto più richieste",
    description: "I modelli che i nostri clienti scelgono più spesso",
    pageTitle: "Auto a noleggio",
    pageSubtitle:
      "{count} modelli disponibili per il ritiro all'Aeroporto di Rinas e a Durrës. Prezzi da {price}€ al giorno, con chilometraggio illimitato in Albania.",
    emptyTitle: "Nessuna auto trovata",
    emptyBody:
      "Prova a modificare i filtri di categoria, cambio, carburante o prezzo per vedere più risultati.",
    minDays: "Min. {days} giorni",
    seatsShort: "{count} posti",
    cardMeta: "Min. {days} giorni · {category}",
    perDay: "/ giorno",
    viewDetailsLabel: "{name} {year} — vedi i dettagli",
    imageAlt: "{name} {year} a noleggio in Albania",
  },

  locations: {
    eyebrow: "Sedi",
    title: "Noleggio auto in Albania — Aeroporto di Rinas e Durrës",
    seeAll: "Vedi tutte le auto disponibili",
    cardTitleRinas: "Noleggio auto all'Aeroporto di Rinas",
    cardTitleDurres: "Noleggio auto a Durrës",
    cardEyebrowRinas: "24/7",
    cardEyebrowDurres: "Costa",
    pageTitle: "Dove puoi ritirare l'auto",
    pageDescription: "Due punti di ritiro, entrambi con riconsegna flessibile.",
    twoPoints: "Due punti di ritiro",
    twoPointsDescription:
      "Ci incontriamo in aeroporto o nel centro di Durrës.",
  },

  howItWorks: {
    eyebrow: "3 passi",
    title: "Come funziona",
    description:
      "La prenotazione richiede meno di un minuto — senza registrazione e senza anticipo.",
    step1Title: "Prenota online",
    step1Body:
      "Compila il modulo in 3 semplici passi — senza registrazione e senza anticipo.",
    step2Title: "Confermiamo per telefono",
    step2Body:
      "Il nostro team ti chiama per confermare la disponibilità e i dettagli del ritiro.",
    step3Title: "Ritira l'auto",
    step3Body:
      "Ci incontriamo all'Aeroporto di Rinas o a Durrës. Consegna rapida con i documenti.",
    step4Title: "Restituisci senza stress",
    step4Body:
      "Riconsegna nello stesso punto o in un altro, a un prezzo trasparente.",
  },

  transparency: {
    eyebrow: "Trasparenza",
    title: "Il prezzo include tutto",
    description:
      "Nessun costo nascosto. Le condizioni di noleggio sono spiegate chiaramente prima di prenotare.",
    includedTitle: "Cosa è incluso",
    includedBody: "Ogni noleggio include copertura completa e assistenza.",
    requirementsTitle: "Requisiti di noleggio",
    requirementsBody: "I requisiti minimi per noleggiare un'auto.",
    whyTitle: "Perché rentcardb",
    whyBody:
      "{count} auto in flotta, prezzi trasparenti e assistenza in albanese e inglese.",
    whyItem1: "Una flotta ben mantenuta e sicura",
    whyItem2: "Chilometraggio illimitato in Albania",
    whyItem3: "Assistenza stradale 24/7",
    whyItem4: "Conferma rapida per telefono o WhatsApp",
  },

  faq: {
    eyebrow: "Domande frequenti",
    title: "Domande e risposte",
    description:
      "Non trovi la risposta? Scrivici su WhatsApp — rispondiamo in pochi minuti.",
  },

  cta: {
    title: "Pronto per il tuo viaggio in Albania?",
    body: "Prenota online in 3 passi o contattaci direttamente. L'auto ti aspetta all'Aeroporto di Rinas o a Durrës.",
    statFleet: "{count} auto in flotta",
    statPickup: "Ritiro in aeroporto 24/7",
    statSupport: "Assistenza per tutto il viaggio",
  },

  filters: {
    title: "Filtri",
    category: "Categoria",
    transmission: "Cambio",
    fuel: "Carburante",
    seats: "Posti",
    maxPrice: "Prezzo massimo",
    maxPriceAria: "Prezzo massimo al giorno",
    pricePerDay: "{price}€/giorno",
    all: "Tutte",
    seatsCount: "{count} posti",
    sort: "Ordina",
    sortAria: "Ordina i risultati",
    sortPopular: "Più richieste",
    sortPriceAsc: "Prezzo: crescente",
    sortPriceDesc: "Prezzo: decrescente",
    sortNameAsc: "Nome: A → Z",
    resultOne: "{count} auto disponibile",
    resultMany: "{count} auto disponibili",
  },

  carDetail: {
    breadcrumbHome: "Home",
    breadcrumbCars: "Auto",
    specsTitle: "Specifiche",
    specTransmission: "Cambio",
    specSeats: "Posti",
    specSeatsValue: "{count} posti",
    specFuel: "Carburante",
    specCategory: "Categoria",
    specYear: "Anno",
    specMinDays: "Noleggio minimo",
    specMinDaysValue: "{count} giorni",
    featuresTitle: "Dotazioni e comfort",
    includedTitle: "Incluso nel prezzo",
    requirementsTitle: "Requisiti di noleggio",
    priceLabel: "Prezzo",
    perDay: "/ giorno",
    metaLine: "{fuel} · {transmission} · Noleggio minimo {days} giorni",
    noOnlinePayment:
      "Nessun pagamento online. Confermiamo la disponibilità per telefono in pochi minuti. Oppure chiama il {phone}.",
    relatedTitle: "Auto simili",
    galleryLabel: "Galleria fotografica",
    galleryPhoto: "Foto {index}",
    autoBadge: "Automatico",
    minDaysBadge: "Min. {days} giorni",
    whatsappMessage: "Salve! Sono interessato alla {name} {year}.",
  },

  booking: {
    eyebrow: "Prenotazione online",
    heroTitle: "Prenota la tua auto in 3 passi",
    heroSubtitle:
      "Scegli le date, scegli l'auto e conferma. Nessun pagamento online e nessuna registrazione.",
    pickupPoint: "Punto di ritiro",
    dropoffPoint: "Punto di riconsegna",
    pickupDate: "Data di ritiro",
    pickupTime: "Ora di ritiro",
    dropoffDate: "Data di riconsegna",
    dropoffTime: "Ora di riconsegna",
    driverAge: "Età del conducente",
    promoCode: "Codice sconto",
    promoPlaceholder: "Opzionale",
    choosePoint: "Scegli un punto",
    submit: "Prenota",
    submitSearch: "Verifica la disponibilità",
    searching: "Ricerca in corso…",
    summaryDays: "{days} giorni",
    summaryChooseDates: "Scegli le date per continuare",
    priceFinalStep: "· Prezzo finale confermato nel passo successivo",
    step1: "Scegli le date",
    step2: "Scegli l'auto",
    step3: "Conferma",
    stepCounter: "Passo {step}: {label}",
    step1Title: "Scegli le date del noleggio",
    step1Body:
      "Il noleggio minimo è di {minDays} giorni. Il prezzo viene calcolato automaticamente nel passo successivo.",
    step2Title: "Scegli l'auto",
    step2Body: "{days} giorni di noleggio · {from} → {to}",
    step3Title: "Conferma la prenotazione",
    step3Body:
      "Nessun pagamento online richiesto. Confermiamo la disponibilità per telefono in pochi minuti.",
    daysRental: "{days} giorni di noleggio",
    continueToCars: "Continua",
    chooseCar: "Scegli un'auto per continuare.",
    fullName: "Nome e cognome",
    phone: "Telefono",
    email: "Email",
    notes: "Note (opzionale)",
    notesPlaceholder: "Numero del volo, richieste particolari…",
    confirmBooking: "Conferma la prenotazione",
    summaryTitle: "Riepilogo della prenotazione",
    summaryPickup: "Ritiro",
    summaryPickupDate: "Data di ritiro",
    summaryDropoff: "Riconsegna",
    summaryDropoffDate: "Data di riconsegna",
    summaryDuration: "Durata",
    summaryCar: "Auto",
    summaryCarUnset: "Non selezionata",
    summaryTotal: "Totale",
    summaryDiscountNote: "Include la tariffa settimanale ridotta ({price}€/giorno).",
    summaryFootnote:
      "Il prezzo include l'assicurazione base e l'assistenza stradale. La cauzione viene rimborsata alla riconsegna.",
    totalPerDay: "totale · {price}€/giorno",
    successTitle: "Grazie, {name}!",
    successBody:
      "La tua richiesta di prenotazione è stata registrata con il codice {reference}. Il nostro team al {phone} ti contatterà entro pochi minuti per la conferma finale.",
    sendWhatsapp: "Invia su WhatsApp",
    validationDates: "La data di riconsegna deve essere successiva a quella di ritiro.",
    validationMinDays: "Il noleggio minimo è di {minDays} giorni.",
    validationCustomer: "Inserisci nome, telefono ed email.",
    successToast: "Prenotazione inviata! Ti contatteremo a breve.",
    whatsappMessage: "Salve! Conferma prenotazione {reference}.",
    whatsappMessageFull:
      "Salve! Conferma prenotazione {reference}.\nAuto: {car}\nRitiro: {pickup} — {from} alle {fromTime}\nRiconsegna: {dropoff} — {to} alle {toTime}\nGiorni: {days} · Totale: {total}€\nNome: {name} · Tel: {phone}",
  },

  contact: {
    eyebrow: "Contatti",
    heroTitle: "Siamo qui per qualsiasi domanda",
    heroSubtitle:
      "Prenotazioni, modifiche di date o domande sulla flotta — contattaci per telefono, WhatsApp o email. Rispondiamo entro 30 minuti.",
    channelPhone: "Telefono",
    channelWhatsapp: "WhatsApp",
    channelEmail: "Email",
    phoneHours: "Lunedì – domenica, 07:00 – 22:00",
    whatsappNote: "Risposte rapide, anche fuori orario",
    emailNote: "Rispondiamo entro 30 minuti",
    formTitle: "Inviaci un messaggio",
    formBody:
      "Compila il modulo e ti ricontatteremo il prima possibile. Per una risposta immediata, scrivici su WhatsApp.",
    formName: "Nome e cognome",
    formPhone: "Telefono",
    formEmail: "Email (opzionale)",
    formMessage: "Messaggio",
    formMessagePlaceholder:
      "Descrivici l'auto che vorresti, le date e il punto di ritiro…",
    formFooter: "Rispondiamo entro 30 minuti · {email}",
    formSubmit: "Invia il messaggio",
    formSuccessTitle: "Grazie, {name}!",
    formSuccessBody:
      "Il tuo messaggio è stato registrato. Il nostro team risponde normalmente entro 30 minuti durante l'orario di lavoro.",
    formSuccessWhatsapp: "Invia anche su WhatsApp",
    formAgain: "Invia un altro messaggio",
    formValidation: "Inserisci nome, telefono e messaggio.",
    formSuccessToast: "Messaggio inviato! Ti contatteremo a breve.",
    planningTitle: "Stai pianificando un viaggio?",
    planningBody:
      "Prenota online in 3 passi — senza registrazione e senza anticipo.",
    whatsappMessage: "Salve! Nome: {name}. Tel: {phone}. {message}",
  },

  about: {
    eyebrow: "Chi siamo",
    heroTitle: "Azienda albanese, standard europei",
    heroSubtitle:
      "rentcardb offre un servizio professionale di noleggio auto a Durrës e all'Aeroporto di Rinas, con una flotta ben mantenuta e prezzi trasparenti.",
    storyTitle: "Da una sede a Durrës a una flotta di {count} auto",
    storyP1:
      "rentcardb è nata come piccolo servizio di noleggio nel centro di Durrës, rivolto ai clienti che arrivavano in traghetto e cercavano un'auto semplice, pulita e affidabile.",
    storyP2:
      "Con l'aumento dei turisti che visitano l'Albania, abbiamo aggiunto un punto di ritiro 24/7 all'Aeroporto Internazionale di Tirana “Nënë Tereza” (Rinas). Oggi la flotta conta {count} auto, dai modelli economici alle auto familiari e ai SUV, tutte con chilometraggio illimitato nel paese.",
    storyP3:
      "Quello che non è cambiato è il nostro modo di lavorare: prezzi chiari, conferma rapida e una persona reale al telefono se qualcosa va storto durante il viaggio.",
    statFleet: "Auto in flotta",
    statPoints: "Punti di ritiro",
    statPickup: "Ritiro in aeroporto",
    statSteps: "Passi per prenotare",
    valuesEyebrow: "I nostri valori",
    valuesTitle: "Perché i clienti tornano",
    valuesDescription: "Tre principi che guidano ogni noleggio.",
    value1Title: "La sicurezza prima di tutto",
    value1Body:
      "Ogni auto supera la revisione tecnica periodica ed è mantenuta da meccanici certificati. Non scendiamo a compromessi sulla sicurezza dei nostri clienti.",
    value2Title: "Prezzi trasparenti",
    value2Body:
      "Il prezzo che vedi è il prezzo che paghi. Nessun costo nascosto, nessuna sorpresa alla riconsegna dell'auto.",
    value3Title: "Assistenza reale, quando serve",
    value3Body:
      "Rispondiamo in albanese, inglese e italiano. Assistenza stradale 24/7 in tutta l'Albania per l'intera durata del noleggio.",
    processEyebrow: "Il processo",
    processTitle: "Prenotazione in 3 passi",
    processDescription:
      "Senza registrazione, senza anticipo. Solo tre passi e l'auto è tua.",
    requirementsTitle: "Cosa serve per ritirare l'auto",
    requirementsBody:
      "La consegna richiede circa 15 minuti. Porta i documenti elencati e l'auto è pronta a partire.",
    questionsTitle: "Hai domande sulla flotta o sulle condizioni?",
    questionsBody: "Chiama il {phone} o scrivi a {email}.",
  },

  footer: {
    brandBlurb:
      "Servizio professionale di noleggio auto a Durrës e all'Aeroporto di Rinas.",
    linksTitle: "Link",
    locationsTitle: "Sedi",
    contactTitle: "Contatti",
    followTitle: "Seguici",
    allCars: "Tutte le auto",
    copyright: "© {year} {name}. Tutti i diritti riservati.",
    tagline: "Noleggio auto in Albania — Aeroporto di Rinas e Durrës.",
  },

  notFound: {
    title: "Questa pagina non è stata trovata",
    body: "La pagina richiesta potrebbe essere stata spostata o non esistere più. Prova a sfogliare la nostra flotta o torna alla pagina iniziale.",
  },

  whatsapp: {
    ariaLabel: "Scrivici su WhatsApp",
    label: "WhatsApp",
    defaultMessage: "Salve! Vorrei prenotare un'auto a noleggio.",
  },

  attributes: {
    category: {
      economy: "Economica",
      family: "Familiare",
      suv: "SUV",
      premium: "Premium",
      sportive: "Sportiva",
      minibus: "Minibus",
    },
    fuel: {
      petrol: "Benzina",
      diesel: "Diesel",
      petrolLpg: "Benzina e GPL",
    },
    transmission: {
      manual: "Manuale",
      automatic: "Automatico",
    },
  },

  ageRanges: {
    young: "21 – 24 anni",
    standard: "25 – 65 anni",
    senior: "Oltre 65 anni",
  },

  places: {
    rinas: {
      shortName: "Aeroporto di Rinas",
      city: "Rinas, Tirana",
      hours: "24/7",
    },
    durres: {
      shortName: "Durrës",
      city: "Durrës",
      hours: "07:00 – 22:00",
    },
  },

  carCopy: {
    intro: {
      economy:
        "è un'auto economica, adatta agli spostamenti in città e a mantenere i costi bassi",
      family:
        "offre spazio e comfort per le famiglie, con bagagliaio sufficiente per i viaggi più lunghi",
      suv: "è un SUV adatto alle strade albanesi, con posizione di guida alta e molto spazio",
      premium:
        "è un modello premium, ideale per viaggi di lavoro o per chi cerca un comfort superiore",
      sportive:
        "è un modello sportivo, con prestazioni e dinamica di guida superiori alla media",
      minibus:
        "è un minibus con molti posti, ideale per gruppi, famiglie numerose e transfer dall'aeroporto",
    },
    transmissionAuto:
      "Con cambio automatico, è molto comoda nel traffico cittadino.",
    transmissionManual:
      "Con cambio manuale, offre pieno controllo e manutenzione semplice.",
    template:
      "{name} {year} {intro}. Categoria {category} · {seats} posti · {fuel}. {transmission} Ritiro all'Aeroporto di Rinas o a Durrës, minimo {minDays} giorni di noleggio.",
    featureTransmissionAuto: "Cambio automatico",
    featureTransmissionManual: "Cambio manuale",
    featureFuelDiesel: "Motore diesel (consumi ridotti)",
    featureFuelPetrol: "Motore a benzina",
    featureFuelPetrolLpg: "Motore benzina e GPL",
    featureSeats: "{count} posti",
    featureAc: "Aria condizionata",
    featureBluetooth: "Bluetooth e USB",
    featureSafety: "Airbag e ABS",
    overrides: {
      "kia-rio-2014":
        "La Kia Rio è una delle auto più economiche della flotta. Con motore diesel e cambio manuale, i consumi restano molto bassi anche nel traffico di Tirana. Facile da manovrare, buon spazio nel bagagliaio e costi minimi per una coppia o un viaggio di lavoro.",
      "toyota-auris-2009":
        "La Toyota Auris, nota per l'affidabilità leggendaria di Toyota. La versione diesel offre consumi molto bassi nei viaggi lunghi, rendendola ideale per tour verso la costa meridionale o in città. In buone condizioni tecniche e con manutenzione regolare.",
      "hyundai-i20-2012":
        "La Hyundai i20 è compatta e molto pratica in città. Parcheggiare è facile anche nelle strade più strette di Tirana e Durrës, mentre i consumi del diesel restano bassi. Una buona scelta per coppie o famiglie piccole con un budget controllato.",
      "toyota-yaris-2010":
        "La Toyota Yaris automatica — la scelta più comoda per chi preferisce non cambiare marcia. Molto richiesta dai clienti internazionali, ideale nel traffico cittadino. Piccola fuori ma spaziosa dentro, e molto affidabile.",
      "toyota-yaris-2009":
        "La Toyota Yaris con cambio manuale, compatta ed economica. Un'auto dalla durabilità comprovata, con un semplice motore a benzina facile da mantenere. La scelta pratica per i viaggi brevi al costo minimo.",
      "opel-meriva-2009":
        "L'Opel Meriva offre più spazio di una normale compatta, il che la rende ideale per le famiglie. La posizione di guida alta garantisce buona visibilità e accesso comodo per i passeggeri. Motore diesel con consumi misurati anche a bagagliaio pieno.",
      "hyundai-starex-2012":
        "La Hyundai Starex è un minibus da 9 posti, ideale per gruppi, famiglie numerose o transfer dall'aeroporto. Cambio automatico e motore diesel per viaggi lunghi confortevoli. Bagagliaio molto capiente per gruppi con valigie.",
    },
  },

  content: {
    bookingSteps: [
      {
        title: "Scegli le date",
        description:
          "Scegli il punto di ritiro, la data e l'orario. Il prezzo viene calcolato automaticamente.",
      },
      {
        title: "Scegli l'auto",
        description:
          "Consulta la flotta disponibile e scegli il modello adatto al tuo viaggio.",
      },
      {
        title: "Conferma",
        description:
          "Inserisci i tuoi dati e conferma la prenotazione. Ti contattiamo in pochi minuti.",
      },
    ],
    included: [
      "Assicurazione obbligatoria (RC auto)",
      "Chilometraggio illimitato in Albania",
      "Assistenza stradale 24/7",
      "Pulizia e disinfezione prima di ogni noleggio",
      "Auto sostitutiva in caso di guasto",
    ],
    requirements: [
      "Età minima 21 anni (25 per le categorie superiori)",
      "Patente di guida valida, conseguita da almeno 1 anno",
      "Passaporto o carta d'identità valida",
      "Carta di credito o debito intestata al conducente",
      "Cauzione rimborsabile, restituita alla riconsegna",
    ],
    faqs: [
      {
        question: "Posso ritirare l'auto direttamente all'Aeroporto di Rinas?",
        answer:
          "Sì. Offriamo il ritiro 24/7 all'Aeroporto di Rinas, a circa 10 minuti dal terminal degli arrivi. Il nostro team ti aspetterà con un cartello con il tuo nome appena esci dal terminal.",
      },
      {
        question: "Quali documenti servono per ritirare l'auto?",
        answer:
          "Una patente di guida valida (conseguita da almeno 1 anno), un passaporto o una carta d'identità e una carta di credito o debito intestata al conducente per la cauzione.",
      },
      {
        question: "C'è un limite di chilometraggio?",
        answer:
          "Non c'è limite di chilometraggio in Albania. Per i viaggi fuori dal paese, contattaci in anticipo per confermare le condizioni e la copertura assicurativa.",
      },
      {
        question: "Posso riconsegnare l'auto in un punto diverso?",
        answer:
          "Sì, la riconsegna in un punto diverso dal ritiro è possibile — per esempio ritiro a Rinas e riconsegna a Durrës. Contattaci per i dettagli.",
      },
      {
        question: "Accettate il pagamento con carta di credito?",
        answer:
          "Sì, accettiamo pagamenti con carta di credito e debito e in contanti. La cauzione viene rimborsata integralmente al momento della riconsegna dell'auto.",
      },
      {
        question: "Qual è il periodo di noleggio minimo?",
        answer:
          "Il noleggio minimo in alta stagione è di 2 giorni. Per i noleggi settimanali offriamo tariffe ridotte.",
      },
    ],
    locationRinasDescription:
      "Ritiro 24/7 a 10 minuti dal terminal. Ideale per turisti e viaggi di lavoro — prenota online e l'auto ti aspetta quando atterri.",
    locationRinasHighlights: [
      "Ritiro e riconsegna 24 ore su 24, tutti i giorni",
      "10 minuti dal terminal degli arrivi",
      "Nessun costo aggiuntivo per voli in ritardo",
    ],
    locationDurresDescription:
      "La nostra sede a Durrës per chi trascorre le vacanze sulla costa albanese e per i visitatori che arrivano in traghetto. Tariffe flessibili per noleggi giornalieri e settimanali.",
    locationDurresHighlights: [
      "Vicino al porto di Durrës e alle spiagge",
      "Tariffe ridotte per noleggi settimanali",
      "Consegna in hotel su richiesta",
    ],
  },
};
