import type { Dictionary } from "./sq";

/**
 * French (fr-FR) dictionary.
 *
 * Durrës and Rinas keep their official names so the visible text matches the
 * NAP data and Google Maps.
 *
 * ⚠️ Rental-specific legal wording — deposit, insurance, minimum age, driving
 * licence validity, cross-border rules — should be reviewed by a native speaker
 * before launch.
 */
export const fr: Dictionary = {
  meta: {
    home: {
      title: "rentcardb — Location de voitures à l'aéroport de Rinas et à Durrës",
      description:
        "rentcardb propose la location de voitures en ligne, avec prise en charge à l'aéroport de Rinas et à Durrës. Une flotte de {count} voitures, des tarifs à partir de {price}€ par jour et une réservation rapide en 3 étapes.",
    },
    cars: {
      title: "Voitures à louer — toute la flotte",
      description:
        "Toutes les voitures à louer à l'aéroport de Rinas et à Durrës. Filtrez par catégorie, boîte de vitesses, carburant et prix. Tarifs à partir de {price}€ par jour, kilométrage illimité.",
    },
    booking: {
      title: "Réservez votre voiture en ligne en 3 étapes",
      description:
        "Réservez une voiture à l'aéroport de Rinas ou à Durrës en 3 étapes simples. Aucun paiement en ligne — nous confirmons la disponibilité par téléphone.",
    },
    about: {
      title: "À propos — qui nous sommes et comment nous travaillons",
      description:
        "rentcardb est une société albanaise de location de voitures avec des agences à l'aéroport de Rinas et à Durrës. Une flotte de {count} voitures, des tarifs transparents et une assistance 24/7.",
    },
    contact: {
      title: "Contact — appelez-nous ou écrivez sur WhatsApp",
      description:
        "Contactez rentcardb : {phone}, {email}. Points de retrait à l'aéroport de Rinas et au centre-ville de Durrës.",
    },
    carNotFound: "Voiture introuvable",
    carTitle: "{name} {year} à louer — {price}€ par jour",
    carDescription:
      "{name} {year} à louer en Albanie : {transmission}, {seats} places, {fuel}. Prise en charge à l'aéroport de Rinas ou à Durrës. Min. {minDays} jours.",
    notFoundTitle: "Page introuvable",
  },

  nav: {
    cars: "Voitures",
    locations: "Agences",
    howItWorks: "Comment ça marche",
    about: "À propos",
    contact: "Contact",
    reserve: "Réserver",
    menu: "Menu",
    mainNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    homeLabel: "rentcardb — page d'accueil",
    brandSub: "Rinas et Durrës",
    menuSubtitle: "Location de voitures à l'aéroport de Rinas et à Durrës.",
    themeToLight: "Activer le thème clair",
    themeToDark: "Activer le thème sombre",
    language: "Langue",
    changeLanguage: "Changer de langue",
  },

  actions: {
    seeAll: "Voir tout",
    seeAllCars: "Voir toutes les voitures disponibles",
    details: "Détails",
    book: "Réserver",
    continue: "Continuer",
    back: "Retour",
    reset: "Effacer les filtres",
    clear: "Effacer",
    contact: "Contact",
    contactUs: "Nous contacter",
    viewCars: "Voir les voitures",
    home: "Page d'accueil",
    otherCars: "Voir d'autres voitures",
    bookThisCar: "Réserver cette voiture",
    askWhatsapp: "Demander sur WhatsApp",
  },

  hero: {
    badge: "Prise en charge à l'aéroport de Rinas et au centre de Durrës",
    title: "Trouvez la voiture idéale pour votre voyage",
    subtitle: "{count} voitures disponibles — à partir de {from}€ par jour",
    statAvailable: "{count} voitures disponibles",
    statPickup: "Prise en charge 24/7 à l'aéroport",
    statPrice: "Tarifs à partir de {price}€ / jour",
  },

  fleet: {
    eyebrow: "Flotte",
    title: "Les voitures les plus demandées",
    description: "Les modèles que nos clients choisissent le plus souvent",
    pageTitle: "Voitures à louer",
    pageSubtitle:
      "{count} modèles disponibles pour une prise en charge à l'aéroport de Rinas et à Durrës. Tarifs à partir de {price}€ par jour, avec kilométrage illimité en Albanie.",
    emptyTitle: "Aucune voiture trouvée",
    emptyBody:
      "Essayez de modifier les filtres de catégorie, de boîte de vitesses, de carburant ou de prix pour voir plus de résultats.",
    minDays: "Min. {days} jours",
    seatsShort: "{count} places",
    cardMeta: "Min. {days} jours · {category}",
    perDay: "/ jour",
    viewDetailsLabel: "{name} {year} — voir les détails",
    imageAlt: "{name} {year} à louer en Albanie",
  },

  locations: {
    eyebrow: "Agences",
    title: "Location de voitures en Albanie — aéroport de Rinas et Durrës",
    seeAll: "Voir toutes les voitures disponibles",
    cardTitleRinas: "Location de voitures à l'aéroport de Rinas",
    cardTitleDurres: "Location de voitures à Durrës",
    cardEyebrowRinas: "24/7",
    cardEyebrowDurres: "Côte",
    pageTitle: "Où récupérer votre voiture",
    pageDescription: "Deux points de retrait, tous deux avec restitution flexible.",
    twoPoints: "Deux points de retrait",
    twoPointsDescription:
      "Nous vous retrouvons à l'aéroport ou au centre-ville de Durrës.",
  },

  howItWorks: {
    eyebrow: "3 étapes",
    title: "Comment ça marche",
    description:
      "La réservation prend moins d'une minute — sans inscription et sans acompte.",
    step1Title: "Réservez en ligne",
    step1Body:
      "Remplissez le formulaire en 3 étapes simples — sans inscription et sans acompte.",
    step2Title: "Nous confirmons par téléphone",
    step2Body:
      "Notre équipe vous appelle pour confirmer la disponibilité et les détails du retrait.",
    step3Title: "Récupérez la voiture",
    step3Body:
      "Nous vous retrouvons à l'aéroport de Rinas ou à Durrës. Remise rapide avec les documents.",
    step4Title: "Rendez-la sereinement",
    step4Body:
      "Restitution au même point ou à un autre, à un tarif transparent.",
  },

  transparency: {
    eyebrow: "Transparence",
    title: "Le prix comprend tout",
    description:
      "Aucun frais caché. Les conditions de location sont expliquées clairement avant de réserver.",
    includedTitle: "Ce qui est inclus",
    includedBody: "Chaque location comprend une couverture complète et une assistance.",
    requirementsTitle: "Conditions de location",
    requirementsBody: "Les conditions minimales pour louer une voiture.",
    whyTitle: "Pourquoi rentcardb",
    whyBody:
      "{count} voitures dans la flotte, des tarifs transparents et une assistance en albanais et en anglais.",
    whyItem1: "Une flotte bien entretenue et sûre",
    whyItem2: "Kilométrage illimité en Albanie",
    whyItem3: "Assistance routière 24/7",
    whyItem4: "Confirmation rapide par téléphone ou WhatsApp",
  },

  faq: {
    eyebrow: "Questions fréquentes",
    title: "Questions et réponses",
    description:
      "Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp — nous répondons en quelques minutes.",
  },

  cta: {
    title: "Prêt pour votre voyage en Albanie ?",
    body: "Réservez en ligne en 3 étapes ou contactez-nous directement. Votre voiture vous attend à l'aéroport de Rinas ou à Durrës.",
    statFleet: "{count} voitures dans la flotte",
    statPickup: "Prise en charge 24/7 à l'aéroport",
    statSupport: "Assistance pendant tout le voyage",
  },

  filters: {
    title: "Filtres",
    category: "Catégorie",
    transmission: "Boîte de vitesses",
    fuel: "Carburant",
    seats: "Places",
    maxPrice: "Prix maximum",
    maxPriceAria: "Prix maximum par jour",
    pricePerDay: "{price}€/jour",
    all: "Toutes",
    seatsCount: "{count} places",
    sort: "Trier",
    sortAria: "Trier les résultats",
    sortPopular: "Les plus demandées",
    sortPriceAsc: "Prix : croissant",
    sortPriceDesc: "Prix : décroissant",
    sortNameAsc: "Nom : A → Z",
    resultOne: "{count} voiture disponible",
    resultMany: "{count} voitures disponibles",
  },

  carDetail: {
    breadcrumbHome: "Accueil",
    breadcrumbCars: "Voitures",
    specsTitle: "Caractéristiques",
    specTransmission: "Boîte de vitesses",
    specSeats: "Places",
    specSeatsValue: "{count} places",
    specFuel: "Carburant",
    specCategory: "Catégorie",
    specYear: "Année",
    specMinDays: "Location minimum",
    specMinDaysValue: "{count} jours",
    featuresTitle: "Équipements et confort",
    includedTitle: "Inclus dans le prix",
    requirementsTitle: "Conditions de location",
    priceLabel: "Prix",
    perDay: "/ jour",
    metaLine: "{fuel} · {transmission} · Location minimum {days} jours",
    noOnlinePayment:
      "Aucun paiement en ligne. Nous confirmons la disponibilité par téléphone en quelques minutes. Ou appelez le {phone}.",
    relatedTitle: "Voitures similaires",
    galleryLabel: "Galerie photos",
    galleryPhoto: "Photo {index}",
    autoBadge: "Automatique",
    minDaysBadge: "Min. {days} jours",
    whatsappMessage: "Bonjour ! Je suis intéressé par la {name} {year}.",
  },

  booking: {
    eyebrow: "Réservation en ligne",
    heroTitle: "Réservez votre voiture en 3 étapes",
    heroSubtitle:
      "Choisissez vos dates, choisissez votre voiture et confirmez. Aucun paiement en ligne et aucune inscription.",
    pickupPoint: "Point de retrait",
    dropoffPoint: "Point de restitution",
    pickupDate: "Date de retrait",
    pickupTime: "Heure de retrait",
    dropoffDate: "Date de restitution",
    dropoffTime: "Heure de restitution",
    driverAge: "Âge du conducteur",
    promoCode: "Code promotionnel",
    promoPlaceholder: "Facultatif",
    choosePoint: "Choisir un point",
    submit: "Réserver",
    submitSearch: "Vérifier la disponibilité",
    searching: "Recherche…",
    summaryDays: "{days} jours",
    summaryChooseDates: "Choisissez vos dates pour continuer",
    priceFinalStep: "· Prix final confirmé à l'étape suivante",
    step1: "Choisir les dates",
    step2: "Choisir la voiture",
    step3: "Confirmer",
    stepCounter: "Étape {step} : {label}",
    step1Title: "Choisissez vos dates de location",
    step1Body:
      "La location minimum est de {minDays} jours. Le prix est calculé automatiquement à l'étape suivante.",
    step2Title: "Choisissez votre voiture",
    step2Body: "{days} jours de location · {from} → {to}",
    step3Title: "Confirmez votre réservation",
    step3Body:
      "Aucun paiement en ligne requis. Nous confirmons la disponibilité par téléphone en quelques minutes.",
    daysRental: "{days} jours de location",
    continueToCars: "Continuer",
    chooseCar: "Choisissez une voiture pour continuer.",
    fullName: "Nom complet",
    phone: "Téléphone",
    email: "E-mail",
    notes: "Remarques (facultatif)",
    notesPlaceholder: "Numéro de vol, demandes particulières…",
    confirmBooking: "Confirmer la réservation",
    summaryTitle: "Récapitulatif de la réservation",
    summaryPickup: "Retrait",
    summaryPickupDate: "Date de retrait",
    summaryDropoff: "Restitution",
    summaryDropoffDate: "Date de restitution",
    summaryDuration: "Durée",
    summaryCar: "Voiture",
    summaryCarUnset: "Non sélectionnée",
    summaryTotal: "Total",
    summaryDiscountNote: "Comprend le tarif hebdomadaire réduit ({price}€/jour).",
    summaryFootnote:
      "Le prix comprend l'assurance de base et l'assistance routière. La caution est remboursée à la restitution.",
    totalPerDay: "total · {price}€/jour",
    successTitle: "Merci, {name} !",
    successBody:
      "Votre demande de réservation a été enregistrée sous la référence {reference}. Notre équipe au {phone} vous contactera dans quelques minutes pour la confirmation finale.",
    sendWhatsapp: "Envoyer sur WhatsApp",
    validationDates: "La date de restitution doit être postérieure à la date de retrait.",
    validationMinDays: "La location minimum est de {minDays} jours.",
    validationCustomer: "Veuillez indiquer votre nom, votre téléphone et votre e-mail.",
    successToast: "Réservation envoyée ! Nous vous contacterons bientôt.",
    whatsappMessage: "Bonjour ! Confirmation de réservation {reference}.",
    whatsappMessageFull:
      "Bonjour ! Confirmation de réservation {reference}.\nVoiture : {car}\nRetrait : {pickup} — {from} à {fromTime}\nRestitution : {dropoff} — {to} à {toTime}\nJours : {days} · Total : {total}€\nNom : {name} · Tél : {phone}",
  },

  contact: {
    eyebrow: "Contact",
    heroTitle: "Nous sommes là pour toute question",
    heroSubtitle:
      "Réservations, modifications de dates ou questions sur la flotte — contactez-nous par téléphone, WhatsApp ou e-mail. Nous répondons sous 30 minutes.",
    channelPhone: "Téléphone",
    channelWhatsapp: "WhatsApp",
    channelEmail: "E-mail",
    phoneHours: "Lundi – dimanche, 07h00 – 22h00",
    whatsappNote: "Réponses rapides, même en dehors des horaires",
    emailNote: "Nous répondons sous 30 minutes",
    formTitle: "Envoyez-nous un message",
    formBody:
      "Remplissez le formulaire et nous vous répondrons dans les plus brefs délais. Pour une réponse immédiate, écrivez-nous sur WhatsApp.",
    formName: "Nom complet",
    formPhone: "Téléphone",
    formEmail: "E-mail (facultatif)",
    formMessage: "Message",
    formMessagePlaceholder:
      "Décrivez la voiture souhaitée, vos dates et votre point de retrait…",
    formFooter: "Nous répondons sous 30 minutes · {email}",
    formSubmit: "Envoyer le message",
    formSuccessTitle: "Merci, {name} !",
    formSuccessBody:
      "Votre message a été enregistré. Notre équipe répond normalement sous 30 minutes pendant les heures d'ouverture.",
    formSuccessWhatsapp: "Envoyer aussi sur WhatsApp",
    formAgain: "Envoyer un autre message",
    formValidation: "Veuillez indiquer votre nom, votre téléphone et votre message.",
    formSuccessToast: "Message envoyé ! Nous vous contacterons bientôt.",
    planningTitle: "Vous préparez un voyage ?",
    planningBody:
      "Réservez en ligne en 3 étapes — sans inscription et sans acompte.",
    whatsappMessage: "Bonjour ! Nom : {name}. Tél : {phone}. {message}",
  },

  about: {
    eyebrow: "À propos",
    heroTitle: "Une entreprise albanaise, des standards européens",
    heroSubtitle:
      "rentcardb propose un service professionnel de location de voitures à Durrës et à l'aéroport de Rinas, avec une flotte bien entretenue et des tarifs transparents.",
    storyTitle: "D'une agence à Durrës à une flotte de {count} voitures",
    storyP1:
      "rentcardb a commencé comme un petit service de location au centre de Durrës, destiné aux clients arrivant par ferry et cherchant une voiture simple, propre et fiable.",
    storyP2:
      "Avec l'augmentation du nombre de touristes visitant l'Albanie, nous avons ajouté un point de retrait 24/7 à l'aéroport international de Tirana « Nënë Tereza » (Rinas). Aujourd'hui, la flotte compte {count} voitures, des modèles économiques aux voitures familiales et aux SUV, toutes avec kilométrage illimité dans le pays.",
    storyP3:
      "Ce qui n'a pas changé, c'est notre façon de travailler : des prix clairs, une confirmation rapide et une vraie personne au téléphone si quelque chose ne va pas pendant votre voyage.",
    statFleet: "Voitures dans la flotte",
    statPoints: "Points de retrait",
    statPickup: "Prise en charge à l'aéroport",
    statSteps: "Étapes de réservation",
    valuesEyebrow: "Nos valeurs",
    valuesTitle: "Pourquoi nos clients reviennent",
    valuesDescription: "Trois principes qui guident chacune de nos locations.",
    value1Title: "La sécurité avant tout",
    value1Body:
      "Chaque voiture passe un contrôle technique périodique et est entretenue par des mécaniciens certifiés. Nous ne transigeons pas avec la sécurité de nos clients.",
    value2Title: "Des tarifs transparents",
    value2Body:
      "Le prix que vous voyez est le prix que vous payez. Aucun frais caché, aucune surprise au moment de rendre la voiture.",
    value3Title: "Une vraie assistance, au bon moment",
    value3Body:
      "Nous répondons en albanais, en anglais et en italien. Assistance routière 24/7 partout en Albanie pendant toute la durée de la location.",
    processEyebrow: "Le processus",
    processTitle: "Réservation en 3 étapes",
    processDescription:
      "Sans inscription, sans acompte. Trois étapes et la voiture est à vous.",
    requirementsTitle: "Ce qu'il faut pour récupérer la voiture",
    requirementsBody:
      "La remise des clés prend environ 15 minutes. Apportez les documents ci-dessous et la voiture est prête à partir.",
    questionsTitle: "Des questions sur la flotte ou les conditions ?",
    questionsBody: "Appelez le {phone} ou écrivez à {email}.",
  },

  footer: {
    brandBlurb:
      "Service professionnel de location de voitures à Durrës et à l'aéroport de Rinas.",
    linksTitle: "Liens",
    locationsTitle: "Agences",
    contactTitle: "Contact",
    followTitle: "Suivez-nous",
    allCars: "Toutes les voitures",
    copyright: "© {year} {name}. Tous droits réservés.",
    tagline: "Location de voitures en Albanie — aéroport de Rinas et Durrës.",
  },

  notFound: {
    title: "Cette page est introuvable",
    body: "La page demandée a peut-être été déplacée ou n'existe plus. Parcourez notre flotte ou revenez à la page d'accueil.",
  },

  whatsapp: {
    ariaLabel: "Écrivez-nous sur WhatsApp",
    label: "WhatsApp",
    defaultMessage: "Bonjour ! Je souhaite louer une voiture.",
  },

  attributes: {
    category: {
      economy: "Économique",
      family: "Familiale",
      suv: "SUV",
      premium: "Premium",
      sportive: "Sportive",
      minibus: "Minibus",
    },
    fuel: {
      petrol: "Essence",
      diesel: "Diesel",
      petrolLpg: "Essence et GPL",
    },
    transmission: {
      manual: "Manuelle",
      automatic: "Automatique",
    },
  },

  ageRanges: {
    young: "21 – 24 ans",
    standard: "25 – 65 ans",
    senior: "Plus de 65 ans",
  },

  places: {
    rinas: {
      shortName: "Aéroport de Rinas",
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
        "est une voiture économique, adaptée aux déplacements en ville et à la maîtrise des coûts",
      family:
        "offre de l'espace et du confort pour les familles, avec un coffre suffisant pour les longs trajets",
      suv: "est un SUV adapté aux routes albanaises, avec une position de conduite haute et beaucoup d'espace",
      premium:
        "est un modèle premium, idéal pour les voyages d'affaires ou pour les clients recherchant un confort supérieur",
      sportive:
        "est un modèle sportif, avec des performances et une dynamique de conduite supérieures à la moyenne",
      minibus:
        "est un minibus à nombreuses places, idéal pour les groupes, les familles nombreuses et les transferts depuis l'aéroport",
    },
    transmissionAuto:
      "Avec une boîte automatique, elle est très confortable dans la circulation urbaine.",
    transmissionManual:
      "Avec une boîte manuelle, elle offre un contrôle total et un entretien simple.",
    template:
      "{name} {year} {intro}. Catégorie {category} · {seats} places · {fuel}. {transmission} Retrait à l'aéroport de Rinas ou à Durrës, minimum {minDays} jours de location.",
    featureTransmissionAuto: "Boîte automatique",
    featureTransmissionManual: "Boîte manuelle",
    featureFuelDiesel: "Moteur diesel (consommation réduite)",
    featureFuelPetrol: "Moteur essence",
    featureFuelPetrolLpg: "Moteur essence et GPL",
    featureSeats: "{count} places",
    featureAc: "Climatisation",
    featureBluetooth: "Bluetooth et USB",
    featureSafety: "Airbags et ABS",
    overrides: {
      "kia-rio-2014":
        "La Kia Rio est l'une des voitures les plus économiques de la flotte. Avec un moteur diesel et une boîte manuelle, la consommation reste très faible, même dans la circulation de Tirana. Facile à manœuvrer, bon volume de coffre et coûts d'utilisation minimes pour un couple ou un déplacement professionnel.",
      "toyota-auris-2009":
        "La Toyota Auris, connue pour la fiabilité légendaire de Toyota. La version diesel offre une consommation très faible sur les longs trajets, ce qui la rend idéale pour les circuits vers la côte sud ou en ville. En bon état technique et avec un entretien régulier.",
      "hyundai-i20-2012":
        "La Hyundai i20 est compacte et très pratique en ville. Le stationnement est facile même dans les rues étroites de Tirana et de Durrës, tandis que la consommation du diesel reste faible. Un bon choix pour les couples ou les petites familles à budget maîtrisé.",
      "toyota-yaris-2010":
        "La Toyota Yaris automatique — le choix le plus confortable pour les conducteurs qui préfèrent ne pas changer de vitesse. Très demandée par les clients internationaux, idéale dans la circulation urbaine. Petite à l'extérieur mais spacieuse à l'intérieur, et très fiable.",
      "toyota-yaris-2009":
        "La Toyota Yaris à boîte manuelle, compacte et économique. Une voiture à la durabilité éprouvée, avec un moteur essence simple à entretenir. Le choix pratique pour les courts trajets au coût minimum.",
      "opel-meriva-2009":
        "L'Opel Meriva offre plus d'espace qu'une compacte ordinaire, ce qui la rend idéale pour les familles. La position de conduite haute offre une bonne visibilité et un accès confortable pour les passagers. Un moteur diesel à la consommation maîtrisée, même avec un coffre plein.",
      "hyundai-starex-2012":
        "La Hyundai Starex est un minibus de 9 places, idéal pour les groupes, les familles nombreuses ou les transferts depuis l'aéroport. Boîte automatique et moteur diesel pour de longs trajets confortables. Un coffre très spacieux pour les groupes voyageant avec des valises.",
    },
  },

  content: {
    bookingSteps: [
      {
        title: "Choisissez les dates",
        description:
          "Choisissez votre point de retrait, la date et l'heure. Le prix est calculé automatiquement.",
      },
      {
        title: "Choisissez la voiture",
        description:
          "Parcourez la flotte disponible et choisissez le modèle adapté à votre voyage.",
      },
      {
        title: "Confirmez",
        description:
          "Saisissez vos coordonnées et confirmez la réservation. Nous vous contactons en quelques minutes.",
      },
    ],
    included: [
      "Assurance responsabilité civile obligatoire",
      "Kilométrage illimité en Albanie",
      "Assistance routière 24/7",
      "Nettoyage et désinfection avant chaque location",
      "Véhicule de remplacement en cas de panne",
    ],
    requirements: [
      "Âge minimum 21 ans (25 ans pour les catégories supérieures)",
      "Permis de conduire valide, obtenu depuis au moins 1 an",
      "Passeport ou carte d'identité en cours de validité",
      "Carte de crédit ou de débit au nom du conducteur",
      "Caution remboursable, restituée à la remise du véhicule",
    ],
    faqs: [
      {
        question: "Puis-je récupérer la voiture directement à l'aéroport de Rinas ?",
        answer:
          "Oui. Nous proposons une prise en charge 24/7 à l'aéroport de Rinas, à environ 10 minutes du terminal des arrivées. Notre équipe vous attendra avec une pancarte à votre nom dès votre sortie du terminal.",
      },
      {
        question: "Quels documents faut-il pour récupérer la voiture ?",
        answer:
          "Un permis de conduire valide (obtenu depuis au moins 1 an), un passeport ou une carte d'identité, et une carte de crédit ou de débit au nom du conducteur pour la caution.",
      },
      {
        question: "Y a-t-il une limite de kilométrage ?",
        answer:
          "Il n'y a aucune limite de kilométrage en Albanie. Pour les trajets hors du pays, contactez-nous à l'avance afin que nous puissions confirmer les conditions et la couverture d'assurance.",
      },
      {
        question: "Puis-je rendre la voiture à un autre endroit ?",
        answer:
          "Oui, la restitution à un endroit différent du retrait est possible — par exemple un retrait à Rinas et une restitution à Durrës. Contactez-nous pour les détails.",
      },
      {
        question: "Acceptez-vous le paiement par carte de crédit ?",
        answer:
          "Oui, nous acceptons les paiements par carte de crédit et de débit ainsi qu'en espèces. La caution est intégralement remboursée au moment de la restitution de la voiture.",
      },
      {
        question: "Quelle est la durée de location minimum ?",
        answer:
          "La location minimum en haute saison est de 2 jours. Pour les locations hebdomadaires, nous proposons des tarifs réduits.",
      },
    ],
    locationRinasDescription:
      "Prise en charge 24/7 à 10 minutes du terminal. Idéal pour les touristes et les voyages d'affaires — réservez en ligne et la voiture vous attend à l'atterrissage.",
    locationRinasHighlights: [
      "Prise en charge et restitution 24 heures sur 24, tous les jours",
      "10 minutes du terminal des arrivées",
      "Aucun frais supplémentaire pour les vols retardés",
    ],
    locationDurresDescription:
      "Notre agence de Durrës pour les vacanciers de la côte albanaise et les visiteurs arrivant par ferry. Tarifs flexibles pour les locations à la journée et à la semaine.",
    locationDurresHighlights: [
      "Près du port de Durrës et des plages",
      "Tarifs réduits pour les locations hebdomadaires",
      "Livraison à l'hôtel sur demande",
    ],
  },
};
