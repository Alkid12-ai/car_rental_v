/**
 * Albanian (sq) dictionary — the reference locale.
 *
 * Rules:
 *  1. Plain serializable data only. No functions, no JSX. Dictionaries are
 *     passed from Server Components into Client Components, and a function
 *     cannot cross that boundary.
 *  2. Interpolation uses `{token}` placeholders resolved with
 *     `interpolate()` from `src/i18n/format.ts`.
 *  3. Plurals are handled by `pluralize()` / `Intl.PluralRules`, never by
 *     concatenation.
 *
 * `en.ts`, `it.ts` and `fr.ts` are typed as `Dictionary`, so adding a key here
 * is a compile error until every locale provides it — the type is the
 * completeness check, not a runtime warning.
 */
/**
 * Hand-written introductions for the most-booked cars, keyed by slug.
 * Declared outside the dictionary literal so it keeps an index signature —
 * inside `as const` it would only be addressable by literal key.
 */
const carOverrides: Record<string, string> = {
  "kia-rio-2014":
    "Kia Rio është ndër makinat më ekonomike të flotës. Me motorr nafte dhe transmision manual, konsumi mbetet shumë i ulët edhe në trafikun e Tiranës. Manovrim i lehtë, hapësirë e mirë bagazhi dhe kosto minimale për udhëtime çifti ose pune.",
  "toyota-auris-2009":
    "Toyota Auris, e njohur për besueshmërinë legjendare të Toyota-s. Versioni me motorr nafte ofron konsum shumë të ulët në udhëtime të gjata, duke e bërë zgjedhjen ideale për ture drejt bregdetit jugor ose për qytet. Gjendje e mirë teknike dhe mirëmbajtje e rregullt.",
  "hyundai-i20-2012":
    "Hyundai i20 është kompakte dhe shumë praktike për qytetin. Parkimi bëhet i lehtë edhe në rrugët më të ngushta të Tiranës dhe Durrësit, ndërsa konsumi i naftës mbetet i ulët. Zgjedhje e mirë për çifte ose familje të vogla me buxhet të kontrolluar.",
  "toyota-yaris-2010":
    "Toyota Yaris automatik — zgjedhja më komode për shoferët që preferojnë të mos merren me ndërrimin e shpejtësive. Shumë e kërkuar nga klientët ndërkombëtarë, ideale për trafikun e qytetit. E vogël nga jashtë, por e bollshme brenda dhe shumë e besueshme.",
  "toyota-yaris-2009":
    "Toyota Yaris me transmision manual, kompakte dhe ekonomike. Një makinë e provuar për qëndrueshmëri, me motorr benzinë të thjeshtë për mirëmbajtje. Zgjedhja praktike për udhëtime të shkurtra me kosto minimale.",
  "opel-meriva-2009":
    "Opel Meriva ofron hapësirë më të madhe se një kompakte e zakonshme, duke e bërë ideale për familje. Pozicioni i lartë i uljes jep dukshmëri të mirë në rrugë dhe hyrje-dalje komode për pasagjerët. Motorr nafte me konsum të matur edhe me bagazh të plotë.",
  "hyundai-starex-2012":
    "Hyundai Starex është minibus me 9 vende, ideal për grupe, familje të mëdha ose transferime nga aeroporti. Transmision automatik dhe motorr nafte për udhëtime të gjata komode. Hapësirë shumë e madhe bagazhi për grupe me valixhe.",
};

export const sq = {
  /** Page titles and meta descriptions */
  meta: {
    home: {
      title: "rentcardb — Makina me qera në Aeroportin e Rinasit & Durrës",
      description:
        "rentcardb ofron qira makine online me marrje nga Aeroporti Rinas dhe Durrës. Flotë prej {count} makinash, çmime nga {price}€/ditë dhe rezervim i shpejtë në 3 hapa.",
    },
    cars: {
      title: "Makinat me qera — flota e plotë",
      description:
        "Të gjitha makinat me qera në Aeroportin e Rinasit dhe Durrës. Filtro sipas kategorisë, transmisionit, karburantit dhe çmimit. Çmime nga {price}€/ditë me kilometrazh të pakufizuar.",
    },
    booking: {
      title: "Rezervo makinën online në 3 hapa",
      description:
        "Rezervo makinën me qera në Aeroportin e Rinasit ose në Durrës në 3 hapa të thjeshtë. Pa pagesë online — konfirmojmë disponueshmërinë me telefon.",
    },
    about: {
      title: "Rreth nesh — kush jemi dhe si punojmë",
      description:
        "rentcardb është kompani shqiptare e qirasë së makinave me pika në Aeroportin e Rinasit dhe Durrës. Flotë prej {count} makinash, çmime transparente dhe asistencë 24/7.",
    },
    contact: {
      title: "Kontakt — telefono ose shkruaj në WhatsApp",
      description:
        "Kontakto rentcardb: {phone}, {email}. Pika marrjeje në Aeroportin e Rinasit dhe në Durrës Qendër.",
    },
    carNotFound: "Makina nuk u gjet",
    /** Car detail meta: {name} {year} {price} {transmission} {seats} {fuel} {minDays} */
    carTitle: "{name} {year} me qera — {price}€/ditë",
    carDescription:
      "{name} {year} me qera në Shqipëri: {transmission}, {seats} vende, {fuel}. Marrje në Aeroportin e Rinasit ose Durrës. Min. {minDays} ditë.",
    notFoundTitle: "Faqja nuk u gjet",
  },

  nav: {
    cars: "Makinat",
    locations: "Lokacionet",
    howItWorks: "Si funksionon",
    about: "Rreth nesh",
    contact: "Kontakt",
    reserve: "Rezervo Tani",
    menu: "Menu",
    mainNav: "Navigimi kryesor",
    mobileNav: "Navigimi mobil",
    openMenu: "Hap menunë",
    homeLabel: "rentcardb — faqja kryesore",
    brandSub: "Rinas & Durrës",
    menuSubtitle: "Makina me qera në Aeroportin e Rinasit & Durrës.",
    themeToLight: "Aktivizo temën e ndritshme",
    themeToDark: "Aktivizo temën e errët",
    language: "Gjuha",
    changeLanguage: "Ndrysho gjuhën",
  },

  actions: {
    seeAll: "Shiko të gjitha",
    seeAllCars: "Shiko të gjitha makinat e disponueshme",
    details: "Detaje",
    book: "Rezervo",
    continue: "Vazhdo",
    back: "Kthehu",
    reset: "Pastro filtrat",
    clear: "Pastro",
    contact: "Kontakt",
    contactUs: "Na kontakto",
    viewCars: "Shiko makinat",
    home: "Faqja kryesore",
    otherCars: "Shiko makinat e tjera",
    bookThisCar: "Rezervo këtë makinë",
    askWhatsapp: "Pyet në WhatsApp",
  },

  hero: {
    badge: "Marrje në Aeroportin e Rinasit & Durrës Qendër",
    title: "Gjej makinën perfekte për udhëtimin tënd",
    subtitle: "{count} makina të disponueshme — nga {from}€ në ditë",
    statAvailable: "{count} makina të disponueshme",
    statPickup: "Marrje 24/7 në aeroport",
    statPrice: "Çmime nga {price}€ / ditë",
  },

  fleet: {
    eyebrow: "Flota",
    title: "Makinat më të kërkuara",
    description: "Modelet që klientët tanë zgjedhin më shpesh",
    pageTitle: "Makinat me qera",
    pageSubtitle:
      "{count} modele të disponueshme për marrje në Aeroportin e Rinasit dhe në Durrës. Çmime nga {price}€ në ditë, me kilometrazh të pakufizuar brenda Shqipërisë.",
    emptyTitle: "Nuk u gjet asnjë makinë",
    emptyBody:
      "Provoni të ndryshoni filtrat e kategorisë, transmisionit, karburantit ose çmimit për të parë më shumë rezultate.",
    minDays: "Min. {days} ditë",
    seatsShort: "{count} vende",
    /** Card meta line: "Min. 2 ditë · Ekonomike" */
    cardMeta: "Min. {days} ditë · {category}",
    perDay: "/ ditë",
    viewDetailsLabel: "{name} {year} — shiko detajet",
    imageAlt: "{name} {year} me qera në Shqipëri",
  },

  locations: {
    eyebrow: "Lokacionet",
    title: "Makina me qera në Shqipëri — Aeroporti Rinas dhe Durrës",
    seeAll: "Shiko të gjitha makinat e disponueshme",
    cardTitleRinas: "Rent a car në Aeroportin Rinas",
    cardTitleDurres: "Makina me qera në Durrës",
    cardEyebrowRinas: "24/7",
    cardEyebrowDurres: "Bregdeti",
    pageTitle: "Ku mund të marrësh makinën",
    pageDescription: "Dy pika marrjeje, të dyja me dorëzim fleksibël.",
    twoPoints: "Dy pika marrjeje",
    twoPointsDescription: "Takohemi në aeroport ose në qendër të Durrësit.",
  },

  howItWorks: {
    eyebrow: "3 hapa",
    title: "Si funksionon",
    description:
      "Rezervimi zgjat më pak se një minutë — pa regjistrim dhe pa paradhënie.",
    step1Title: "Rezervo online",
    step1Body:
      "Plotëso formularin në 3 hapa të thjeshtë — pa regjistrim dhe pa paradhënie.",
    step2Title: "Konfirmojmë me telefon",
    step2Body:
      "Ekipi ynë kontakton për të konfirmuar disponueshmërinë dhe detajet e marrjes.",
    step3Title: "Merr makinën",
    step3Body:
      "Takohemi në Aeroportin e Rinasit ose në Durrës. Dorëzim i shpejtë me dokumente.",
    step4Title: "Ktheje pa stres",
    step4Body:
      "Dorëzim në të njëjtën pikë ose në një pikë tjetër, me çmim transparent.",
  },

  transparency: {
    eyebrow: "Transparencë",
    title: "Çmimi përfshin gjithçka",
    description:
      "Pa kosto të fshehura. Kushtet e qerasë shpjegohen qartë përpara se të rezervosh.",
    includedTitle: "Çfarë përfshihet",
    includedBody: "Çdo qera vjen me mbrojtje dhe mbështetje të plotë.",
    requirementsTitle: "Kushtet e qerasë",
    requirementsBody: "Kërkesat minimale për të marrë makinën me qera.",
    whyTitle: "Pse rentcardb",
    whyBody:
      "{count} makina në flotë, çmime transparente dhe mbështetje në shqip e anglisht.",
    whyItem1: "Flotë e mirëmbajtur dhe e sigurt",
    whyItem2: "Kilometrazh i pakufizuar brenda Shqipërisë",
    whyItem3: "Asistencë rrugore 24/7",
    whyItem4: "Konfirmim i shpejtë me telefon ose WhatsApp",
  },

  faq: {
    eyebrow: "Pyetje të shpeshta",
    title: "Pyetje & përgjigje",
    description:
      "Nuk e gjen përgjigjen? Na shkruaj në WhatsApp — përgjigjemi brenda pak minutash.",
  },

  cta: {
    title: "Gati për udhëtimin tënd në Shqipëri?",
    body: "Rezervo online në 3 hapa ose na kontakto direkt. Makina të pret në Aeroportin e Rinasit ose në Durrës.",
    statFleet: "{count} makina në flotë",
    statPickup: "Marrje 24/7 në aeroport",
    statSupport: "Asistencë gjatë gjithë udhëtimit",
  },

  filters: {
    title: "Filtra",
    category: "Kategoria",
    transmission: "Transmisioni",
    fuel: "Karburanti",
    seats: "Vendet",
    maxPrice: "Çmimi maksimal",
    maxPriceAria: "Çmimi maksimal për ditë",
    pricePerDay: "{price}€/ditë",
    all: "Të gjitha",
    seatsCount: "{count} vende",
    sort: "Rendit",
    sortAria: "Rendit rezultatet",
    sortPopular: "Më të kërkuarat",
    sortPriceAsc: "Çmimi: i ulët → i lartë",
    sortPriceDesc: "Çmimi: i lartë → i ulët",
    sortNameAsc: "Emri: A → Z",
    resultOne: "{count} makinë e disponueshme",
    resultMany: "{count} makina të disponueshme",
  },

  carDetail: {
    breadcrumbHome: "Kryefaqja",
    breadcrumbCars: "Makinat",
    specsTitle: "Specifikimet",
    specTransmission: "Transmisioni",
    specSeats: "Vende",
    specSeatsValue: "{count} vende",
    specFuel: "Karburanti",
    specCategory: "Kategoria",
    specYear: "Viti",
    specMinDays: "Qera minimale",
    specMinDaysValue: "{count} ditë",
    featuresTitle: "Pajisjet dhe komoditeti",
    includedTitle: "Përshihet në çmim",
    requirementsTitle: "Kërkesat për qera",
    priceLabel: "Çmimi",
    perDay: "/ ditë",
    metaLine: "{fuel} · {transmission} · Qera minimale {days} ditë",
    noOnlinePayment:
      "Pa pagesë online. Konfirmojmë disponueshmërinë me telefon brenda pak minutash. Ose telefononi {phone}.",
    relatedTitle: "Makina të tjera të ngjashme",
    galleryLabel: "Galeria e fotografive",
    galleryPhoto: "Fotografia {index}",
    autoBadge: "Automatik",
    minDaysBadge: "Min. {days} ditë",
    whatsappMessage: "Përshëndetje! Jam i interesuar për {name} {year}.",
  },

  booking: {
    eyebrow: "Rezervim online",
    heroTitle: "Rezervo makinën në 3 hapa",
    heroSubtitle:
      "Zgjidh datat, zgjidh makinën dhe konfirmo. Nuk kërkohet pagesë online dhe nuk ka nevojë për regjistrim.",
    /** Field labels shared by the widget and the multi-step form */
    pickupPoint: "Pika e marrjes",
    dropoffPoint: "Pika e dorëzimit",
    pickupDate: "Data e marrjes",
    pickupTime: "Ora e marrjes",
    dropoffDate: "Data e dorëzimit",
    dropoffTime: "Ora e dorëzimit",
    driverAge: "Mosha e shoferit",
    promoCode: "Kod zbritjeje",
    promoPlaceholder: "Opsionale",
    choosePoint: "Zgjidh pikën",
    submit: "Rezervo",
    submitSearch: "Shiko disponueshmërinë",
    searching: "Duke kërkuar…",
    summaryDays: "{days} ditë",
    summaryChooseDates: "Zgjidh datat për të vazhduar",
    priceFinalStep: "· Çmimi final zgjidhet në hapin tjetër",
    step1: "Zgjidh datat",
    step2: "Zgjidh makinën",
    step3: "Konfirmo",
    stepCounter: "Hapi {step}: {label}",
    step1Title: "Zgjidh datat e qerasë",
    step1Body:
      "Qeraja minimale është {minDays} ditë. Çmimi llogaritet automatikisht në hapin tjetër.",
    step2Title: "Zgjidh makinën",
    step2Body: "{days} ditë qera · {from} → {to}",
    step3Title: "Konfirmo rezervimin",
    step3Body:
      "Nuk kërkohet pagesë online. Konfirmojmë disponueshmërinë me telefon brenda pak minutash.",
    daysRental: "{days} ditë qera",
    continueToCars: "Vazhdo",
    chooseCar: "Zgjidh një makinë për të vazhduar.",
    fullName: "Emri i plotë",
    phone: "Telefon",
    email: "Email",
    notes: "Shënime (opsionale)",
    notesPlaceholder: "Numri i fluturimit, kërkesa të veçanta…",
    confirmBooking: "Konfirmo rezervimin",
    summaryTitle: "Përmbledhje e rezervimit",
    summaryPickup: "Marrja",
    summaryPickupDate: "Data e marrjes",
    summaryDropoff: "Dorëzimi",
    summaryDropoffDate: "Data e dorëzimit",
    summaryDuration: "Kohëzgjatja",
    summaryCar: "Makina",
    summaryCarUnset: "E pazgjedhur",
    summaryTotal: "Totali",
    summaryDiscountNote:
      "Përshiherë çmimin e reduktuar javor ({price}€/ditë).",
    summaryFootnote:
      "Çmimi përfshin sigurimin bazë dhe asistencën rrugore. Depozita e sigurisë rimbursohet në kthim.",
    totalPerDay: "total · {price}€/ditë",
    successTitle: "Faleminderit, {name}!",
    successBody:
      "Kërkesa për rezervim u regjistrua me kodin {reference}. Ekipi i {phone} do t'ju kontaktojë brenda pak minutash për konfirmimin final.",
    sendWhatsapp: "Dërgo në WhatsApp",
    validationDates: "Data e dorëzimit duhet të jetë pas datës së marrjes.",
    validationMinDays: "Qeraja minimale është {minDays} ditë.",
    validationCustomer: "Plotësoni emrin, telefonin dhe email-in.",
    successToast: "Rezervimi u dërgua! Do t'ju kontaktojmë së shpejti.",
    whatsappMessage: "Përshëndetje! Konfirmim rezervimi {reference}.",
    /**
     * Multi-line hand-off to WhatsApp once the form is submitted. Kept as a
     * single template rather than assembled from fragments: field order and
     * separators differ between languages.
     * {reference} {car} {pickup} {dropoff} {from} {to} {fromTime} {toTime}
     * {days} {total} {name} {phone}
     */
    whatsappMessageFull:
      "Përshëndetje! Konfirmim rezervimi {reference}.\nMakina: {car}\nMarrja: {pickup} — {from} në {fromTime}\nDorëzimi: {dropoff} — {to} në {toTime}\nDitë: {days} · Totali: {total}€\nEmri: {name} · Tel: {phone}",
  },

  contact: {
    eyebrow: "Kontakt",
    heroTitle: "Jemi këtu për çdo pyetje",
    heroSubtitle:
      "Rezervime, ndryshime datash ose pyetje rreth flotës — na kontaktoni në telefon, WhatsApp ose email. Përgjigjemi brenda 30 minutash.",
    channelPhone: "Telefon",
    channelWhatsapp: "WhatsApp",
    channelEmail: "Email",
    phoneHours: "E hënë – e diel, 07:00 – 22:00",
    whatsappNote: "Përgjigje e shpejtë, edhe jashtë orarit",
    emailNote: "Përgjigjemi brenda 30 minutash",
    formTitle: "Dërgo një mesazh",
    formBody:
      "Plotësoni formularin dhe do t'ju kontaktojmë sa më shpejt. Për përgjigje të menjëhershme, shkruajini në WhatsApp.",
    formName: "Emri i plotë",
    formPhone: "Telefon",
    formEmail: "Email (opsionale)",
    formMessage: "Mesazhi",
    formMessagePlaceholder:
      "Përshkruani makinën e dëshiruar, datat dhe pikën e marrjes…",
    formFooter: "Përgjigjemi brenda 30 minutash · {email}",
    formSubmit: "Dërgo mesazhin",
    formSuccessTitle: "Faleminderit, {name}!",
    formSuccessBody:
      "Mesazhi u regjistrua. Ekipi ynë përgjigjet normalisht brenda 30 minutash gjatë orarit të punës.",
    formSuccessWhatsapp: "Dërgo edhe në WhatsApp",
    formAgain: "Dërgo mesazh tjetër",
    formValidation: "Plotësoni emrin, telefonin dhe mesazhin.",
    formSuccessToast: "Mesazhi u dërgua! Do t'ju kontaktojmë së shpejti.",
    planningTitle: "Duke planifikuar një udhëtim?",
    planningBody:
      "Rezervoni online në 3 hapa — pa regjistrim dhe pa paradhënie.",
    whatsappMessage: "Përshëndetje! Emri: {name}. Tel: {phone}. {message}",
  },

  about: {
    eyebrow: "Rreth nesh",
    heroTitle: "Kompani shqiptare, standarde evropiane",
    heroSubtitle:
      "Rentcardb ofron shërbim profesional të makinave me qera në Durrës dhe Aeroportin e Rinasit, me flotë të mirëmbajtur dhe çmime transparente.",
    storyTitle: "Nga një pikë në Durrës, në një flotë prej {count} makinash",
    storyP1:
      "rentcardb nisi si një shërbim i vogël qiraje në qendër të Durrësit, duke u fokusuar te klientët që mbërrinin me traget dhe kërkonin një makinë të thjeshtë, të pastër dhe të besueshme.",
    storyP2:
      "Me rritjen e numrit të turistëve që vizitojnë Shqipërinë, shtuam një pikë marrjeje 24/7 në Aeroportin Ndërkombëtar të Tiranës “Nënë Tereza” (Rinas). Sot flota numëron {count} makina, nga modele ekonomike deri te makina familjare dhe SUV, të gjitha me kilometrazh të pakufizuar brenda vendit.",
    storyP3:
      "Ajo që nuk ka ndryshuar është mënyra e punës: çmime të qarta, konfirmim i shpejtë dhe një njeri i vërtetë në telefon nëse diçka shkon keq gjatë udhëtimit.",
    statFleet: "Makina në flotë",
    statPoints: "Pika marrjeje",
    statPickup: "Marrje në aeroport",
    statSteps: "Hapa për rezervim",
    valuesEyebrow: "Vlerat tona",
    valuesTitle: "Pse klientët kthehen",
    valuesDescription: "Tre parime që drejtojnë çdo qera që bëjmë.",
    value1Title: "Siguria para së gjithash",
    value1Body:
      "Çdo makinë kalon kontroll periodik teknik dhe mirëmbahet nga mekanikë të certifikuar. Nuk kompromisojmë me sigurinë e klientëve tanë.",
    value2Title: "Çmime transparente",
    value2Body:
      "Çmimi që shihni është çmimi që paguani. Pa tarifa të fshehura, pa surpriza në momentin e kthimit të makinës.",
    value3Title: "Mbështetje reale, në kohë",
    value3Body:
      "Përgjigjemi në shqip, anglisht dhe italisht. Asistencë rrugore 24/7 kudo në Shqipëri gjatë gjithë qerasë.",
    processEyebrow: "Procesi",
    processTitle: "Rezervimi në 3 hapa",
    processDescription:
      "Pa regjistrim, pa paradhënie. Vetëm tre hapa dhe makina është e rezervuar.",
    requirementsTitle: "Çfarë të duhet për të marrë makinën",
    requirementsBody:
      "Procedura zgjat rreth 15 minuta. Sillni dokumentet e mëposhtme dhe makinën e keni gati për nisje.",
    questionsTitle: "Ke pyetje për flotën ose kushtet?",
    questionsBody: "Telefononi {phone} ose shkruajini në {email}.",
  },

  footer: {
    brandBlurb:
      "Shërbim profesional i makinave me qera në Durrës & Aeroportin e Rinasit.",
    linksTitle: "Linke",
    locationsTitle: "Lokacionet",
    contactTitle: "Kontakt",
    followTitle: "Na ndiq",
    allCars: "Të gjitha makinat",
    copyright: "© {year} {name}. Të gjitha të drejtat e rezervuara.",
    tagline: "Makina me qera në Shqipëri — Aeroporti Rinas & Durrës.",
  },

  notFound: {
    title: "Kjo faqe nuk u gjet",
    body: "Faqja që kërkuat mund të jetë zhvendosur ose nuk ekziston më. Provoni të shikoni flotën tonë të makinave ose kthehuni në faqen kryesore.",
  },

  whatsapp: {
    ariaLabel: "Na shkruaj në WhatsApp",
    label: "WhatsApp",
    defaultMessage: "Përshëndetje! Dëshiroj të rezervoj një makinë me qera.",
  },

  /** Vehicle attribute labels. Keys are the stable locale-neutral data keys. */
  attributes: {
    category: {
      economy: "Ekonomike",
      family: "Familjare",
      suv: "SUV",
      premium: "Premium",
      sportive: "Sportive",
      minibus: "Minibus",
    },
    fuel: {
      petrol: "Benzinë",
      diesel: "Naftë",
      petrolLpg: "Benzinë & Gaz",
    },
    transmission: {
      manual: "Manual",
      automatic: "Automatik",
    },
  },

  /** Driver age bands offered in the booking form */
  ageRanges: {
    young: "21 – 24 vjeç",
    standard: "25 – 65 vjeç",
    senior: "Mbi 65 vjeç",
  },

  /** Pickup-point labels. Street addresses stay in site.ts — those are data. */
  places: {
    rinas: {
      shortName: "Aeroporti Rinas",
      city: "Rinas, Tiranë",
      hours: "24/7",
    },
    durres: {
      shortName: "Durrës",
      city: "Durrës",
      hours: "07:00 – 22:00",
    },
  },

  /**
   * Per-car prose. Generated at render time rather than baked onto the car
   * record, so every locale gets its own sentences.
   */
  carCopy: {
    intro: {
      economy:
        "është një makinë ekonomike, e përshtatshme për udhëtime brenda qytetit dhe për kosto të kontrolluar",
      family:
        "ofron hapësirë dhe komoditet për familje, me bagazh të mjaftueshëm për udhëtime të gjata",
      suv: "është SUV i përshtatshëm për rrugët shqiptare, me pozicion të lartë drejtimi dhe hapësirë të bollshme",
      premium:
        "është model premium, ideal për udhëtime biznesi ose për klientë që kërkojnë komoditet më të lartë",
      sportive:
        "është model sportiv, me performancë dhe dinamikë drejtimi më të lartë se mesatarja",
      minibus:
        "është minibus me shumë vende, ideal për grupe, familje të mëdha dhe transferime nga aeroporti",
    },
    transmissionAuto:
      "Me transmision automatik, është shumë e rehatshme në trafikun e qytetit.",
    transmissionManual:
      "Me transmision manual, ofron kontroll të plotë dhe mirëmbajtje të thjeshtë.",
    /** {name} {year} {intro} {category} {seats} {fuel} {transmission} {minDays} */
    template:
      "{name} {year} {intro}. Kategoria {category} · {seats} vende · {fuel}. {transmission} Marrje në Aeroportin e Rinasit ose në Durrës, minimumi {minDays} ditë qera.",
    featureTransmissionAuto: "Transmision automatik",
    featureTransmissionManual: "Transmision manual",
    featureFuelDiesel: "Motorr nafte (konsum i ulët)",
    featureFuelPetrol: "Motorr benzinë",
    featureFuelPetrolLpg: "Motorr benzinë & gaz",
    featureSeats: "{count} vende",
    featureAc: "Ajër i kondicionuar",
    featureBluetooth: "Bluetooth & USB",
    featureSafety: "Airbag dhe ABS",
    overrides: carOverrides,
  },

  /** Long-form content */
  content: {
    bookingSteps: [
      {
        title: "Zgjidh datat",
        description:
          "Zgjidh pikën e marrjes, datën dhe orarin. Çmimi llogaritet automatikisht.",
      },
      {
        title: "Zgjidh makinën",
        description:
          "Shiko flotën e disponueshme dhe zgjidh modelin që i përshtatet udhëtimit tënd.",
      },
      {
        title: "Konfirmo",
        description:
          "Plotëso të dhënat e tua dhe konfirmo rezervimin. Të kontaktojmë brenda pak minutash.",
      },
    ],
    included: [
      "Sigurim i detyrueshëm (TPL)",
      "Kilometrazh i pakufizuar brenda Shqipërisë",
      "Asistencë rrugore 24/7",
      "Pastrim dhe dezinfektim para çdo qeraje",
      "Zëvendësim makine në rast defekti",
    ],
    requirements: [
      "Moshë minimale 21 vjeç (25 vjeç për kategoritë superiore)",
      "Patentë drejtimi e vlefshme, e lëshuar të paktën 1 vit më parë",
      "Pasaportë ose kartë identiteti e vlefshme",
      "Kartë krediti ose debiti në emër të shoferit",
      "Depozitë sigurie e rimbursueshme në kthim",
    ],
    faqs: [
      {
        question: "A mund ta marr makinën direkt në Aeroportin e Rinasit?",
        answer:
          "Po. Ofrojmë marrje 24/7 në Aeroportin e Rinasit, rreth 10 minuta nga terminali i mbërritjeve. Ekipi ynë do t'ju presë me një tabelë me emrin tuaj sapo të dilni nga terminali.",
      },
      {
        question: "Çfarë dokumentesh më duhen për të marrë makinën?",
        answer:
          "Një patentë drejtimi e vlefshme (e lëshuar të paktën 1 vit më parë), pasaportë ose kartë identiteti dhe një kartë krediti/debiti në emrin e shoferit për depozitën e sigurisë.",
      },
      {
        question: "A ka limit kilometrazhi?",
        answer:
          "Nuk ka limit kilometrazhi brenda Shqipërisë. Për dalje jashtë vendit, ju lutem na kontaktoni paraprakisht për të konfirmuar kushtet dhe sigurimin.",
      },
      {
        question: "A mund ta dorëzoj makinën në një pikë tjetër?",
        answer:
          "Po, dorëzimi në një lokacion të ndryshëm nga marrja është i mundur — për shembull marrje në Rinas dhe dorëzim në Durrës. Na kontaktoni për detajet.",
      },
      {
        question: "A pranohet pagesa me kartë krediti?",
        answer:
          "Po, pranojmë pagesë me kartë krediti/debiti dhe në cash. Depozita e sigurisë rimbursohet plotësisht në momentin e kthimit të makinës.",
      },
      {
        question: "Sa ditë është qeraja minimale?",
        answer:
          "Qeraja minimale në sezonin e lartë është 2 ditë. Për qera javore ofrojmë çmime të reduktuara.",
      },
    ],
    /** Localized marketing blurbs for each pickup point */
    locationRinasDescription:
      "Marrje 24/7 brenda 10 minutash nga terminali. Ideale për turistët dhe udhëtimet e biznesit — rezervo online dhe makina të pret kur ulesh.",
    locationRinasHighlights: [
      "Marrje dhe dorëzim 24 orë, çdo ditë",
      "10 minuta nga terminali i mbërritjeve",
      "Pa tarifë shtesë për fluturime të vonuara",
    ],
    locationDurresDescription:
      "Pika në Durrës për pushuesit në bregdetin shqiptar dhe vizitorët që mbërrijnë me traget. Çmime fleksibël për qera ditore dhe javore.",
    locationDurresHighlights: [
      "Pranë portit të Durrësit dhe plazheve",
      "Çmime të reduktuara për qera javore",
      "Dorëzim në hotel me kërkesë",
    ],
  },
} as const;

/**
 * Widens the `as const` literal types into plain `string` / `number`.
 *
 * This is what makes `Dictionary` a *contract* rather than a fingerprint of the
 * Albanian text. Without it, `nav.cars` would be typed as the literal
 * `"Makinat"`, and no other language could ever satisfy the type — which would
 * have made translation files impossible to write.
 *
 * The array branch stays `readonly` on purpose: under `as const` every array in
 * `sq` is a readonly tuple, and a readonly array is not assignable to a mutable
 * one. Widening to `T[]` would make `sq` itself fail to satisfy `Dictionary`.
 */
export type Localizable<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Localizable<U>[]
        : { [K in keyof T]: Localizable<T[K]> };

export type Dictionary = Localizable<typeof sq>;
