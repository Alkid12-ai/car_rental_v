import type { Dictionary } from "./sq";

/**
 * English (en-GB) dictionary.
 *
 * Typed as `Dictionary`, so a missing key is a compile error rather than a
 * silent fall back to Albanian.
 *
 * ⚠️ Rental-specific legal wording — deposit, insurance, minimum age, driving
 * licence validity, cross-border rules — should be reviewed by a native speaker
 * before launch. These strings carry contractual meaning, not just tone.
 */
export const en: Dictionary = {
  meta: {
    home: {
      title: "rentcardb — Car rental at Rinas Airport & Durrës",
      description:
        "rentcardb offers online car hire with pickup from Rinas Airport and Durrës. A fleet of {count} cars, prices from {price}€ per day and a fast 3-step booking.",
    },
    cars: {
      title: "Cars for hire — the full fleet",
      description:
        "Every car available for hire at Rinas Airport and Durrës. Filter by category, transmission, fuel and price. Prices from {price}€ per day with unlimited mileage.",
    },
    booking: {
      title: "Book your car online in 3 steps",
      description:
        "Book a hire car at Rinas Airport or in Durrës in 3 simple steps. No online payment — we confirm availability by phone.",
    },
    about: {
      title: "About us — who we are and how we work",
      description:
        "rentcardb is an Albanian car rental company with locations at Rinas Airport and Durrës. A fleet of {count} cars, transparent pricing and 24/7 assistance.",
    },
    contact: {
      title: "Contact — call us or message on WhatsApp",
      description:
        "Get in touch with rentcardb: {phone}, {email}. Pickup points at Rinas Airport and Durrës city centre.",
    },
    carNotFound: "Car not found",
    carTitle: "{name} {year} for hire — {price}€ per day",
    carDescription:
      "{name} {year} for hire in Albania: {transmission}, {seats} seats, {fuel}. Pickup at Rinas Airport or Durrës. Min. {minDays} days.",
    notFoundTitle: "Page not found",
  },

  nav: {
    cars: "Cars",
    locations: "Locations",
    howItWorks: "How it works",
    about: "About us",
    contact: "Contact",
    reserve: "Book now",
    menu: "Menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    homeLabel: "rentcardb — homepage",
    brandSub: "Rinas & Durrës",
    menuSubtitle: "Car hire at Rinas Airport & Durrës.",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    language: "Language",
    changeLanguage: "Change language",
  },

  actions: {
    seeAll: "See all",
    seeAllCars: "See all available cars",
    details: "Details",
    book: "Book",
    continue: "Continue",
    back: "Back",
    reset: "Clear filters",
    clear: "Clear",
    contact: "Contact",
    contactUs: "Contact us",
    viewCars: "View cars",
    home: "Homepage",
    otherCars: "See other cars",
    bookThisCar: "Book this car",
    askWhatsapp: "Ask on WhatsApp",
  },

  hero: {
    badge: "Pickup at Rinas Airport & Durrës city centre",
    title: "Find the perfect car for your trip",
    subtitle: "{count} cars available — from {from}€ per day",
    statAvailable: "{count} cars available",
    statPickup: "24/7 airport pickup",
    statPrice: "Prices from {price}€ / day",
  },

  fleet: {
    eyebrow: "Fleet",
    title: "Most requested cars",
    description: "The models our customers choose most often",
    pageTitle: "Cars for hire",
    pageSubtitle:
      "{count} models available for pickup at Rinas Airport and in Durrës. Prices from {price}€ per day, with unlimited mileage within Albania.",
    emptyTitle: "No cars found",
    emptyBody:
      "Try changing the category, transmission, fuel or price filters to see more results.",
    minDays: "Min. {days} days",
    seatsShort: "{count} seats",
    cardMeta: "Min. {days} days · {category}",
    perDay: "/ day",
    viewDetailsLabel: "{name} {year} — view details",
    imageAlt: "{name} {year} for hire in Albania",
  },

  locations: {
    eyebrow: "Locations",
    title: "Car hire in Albania — Rinas Airport and Durrës",
    seeAll: "See all available cars",
    cardTitleRinas: "Car hire at Rinas Airport",
    cardTitleDurres: "Car hire in Durrës",
    cardEyebrowRinas: "24/7",
    cardEyebrowDurres: "Coast",
    pageTitle: "Where you can collect your car",
    pageDescription: "Two pickup points, both with flexible drop-off.",
    twoPoints: "Two pickup points",
    twoPointsDescription: "We meet you at the airport or in Durrës city centre.",
  },

  howItWorks: {
    eyebrow: "3 steps",
    title: "How it works",
    description:
      "Booking takes less than a minute — no sign-up and no prepayment.",
    step1Title: "Book online",
    step1Body:
      "Fill in the form in 3 simple steps — no sign-up and no prepayment.",
    step2Title: "We confirm by phone",
    step2Body:
      "Our team calls to confirm availability and the pickup details.",
    step3Title: "Collect the car",
    step3Body:
      "We meet you at Rinas Airport or in Durrës. Quick handover with documents.",
    step4Title: "Return with no stress",
    step4Body:
      "Drop off at the same point or a different one, at a transparent price.",
  },

  transparency: {
    eyebrow: "Transparency",
    title: "The price includes everything",
    description:
      "No hidden costs. The rental terms are explained clearly before you book.",
    includedTitle: "What's included",
    includedBody: "Every rental comes with full cover and support.",
    requirementsTitle: "Rental requirements",
    requirementsBody: "The minimum requirements to hire a car.",
    whyTitle: "Why rentcardb",
    whyBody:
      "{count} cars in the fleet, transparent pricing and support in Albanian and English.",
    whyItem1: "A well-maintained, safe fleet",
    whyItem2: "Unlimited mileage within Albania",
    whyItem3: "24/7 roadside assistance",
    whyItem4: "Fast confirmation by phone or WhatsApp",
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "Questions & answers",
    description:
      "Can't find your answer? Message us on WhatsApp — we reply within minutes.",
  },

  cta: {
    title: "Ready for your trip to Albania?",
    body: "Book online in 3 steps or contact us directly. Your car will be waiting at Rinas Airport or in Durrës.",
    statFleet: "{count} cars in the fleet",
    statPickup: "24/7 airport pickup",
    statSupport: "Support throughout your trip",
  },

  filters: {
    title: "Filters",
    category: "Category",
    transmission: "Transmission",
    fuel: "Fuel",
    seats: "Seats",
    maxPrice: "Maximum price",
    maxPriceAria: "Maximum price per day",
    pricePerDay: "{price}€/day",
    all: "All",
    seatsCount: "{count} seats",
    sort: "Sort",
    sortAria: "Sort results",
    sortPopular: "Most requested",
    sortPriceAsc: "Price: low → high",
    sortPriceDesc: "Price: high → low",
    sortNameAsc: "Name: A → Z",
    resultOne: "{count} car available",
    resultMany: "{count} cars available",
  },

  carDetail: {
    breadcrumbHome: "Home",
    breadcrumbCars: "Cars",
    specsTitle: "Specifications",
    specTransmission: "Transmission",
    specSeats: "Seats",
    specSeatsValue: "{count} seats",
    specFuel: "Fuel",
    specCategory: "Category",
    specYear: "Year",
    specMinDays: "Minimum rental",
    specMinDaysValue: "{count} days",
    featuresTitle: "Features and comfort",
    includedTitle: "Included in the price",
    requirementsTitle: "Rental requirements",
    priceLabel: "Price",
    perDay: "/ day",
    metaLine: "{fuel} · {transmission} · Minimum rental {days} days",
    noOnlinePayment:
      "No online payment. We confirm availability by phone within minutes. Or call {phone}.",
    relatedTitle: "Similar cars",
    galleryLabel: "Photo gallery",
    galleryPhoto: "Photo {index}",
    autoBadge: "Automatic",
    minDaysBadge: "Min. {days} days",
    whatsappMessage: "Hello! I'm interested in the {name} {year}.",
  },

  booking: {
    eyebrow: "Online booking",
    heroTitle: "Book your car in 3 steps",
    heroSubtitle:
      "Choose your dates, choose your car and confirm. No online payment and no account needed.",
    pickupPoint: "Pickup point",
    dropoffPoint: "Drop-off point",
    pickupDate: "Pickup date",
    pickupTime: "Pickup time",
    dropoffDate: "Drop-off date",
    dropoffTime: "Drop-off time",
    driverAge: "Driver age",
    promoCode: "Promo code",
    promoPlaceholder: "Optional",
    choosePoint: "Choose a point",
    submit: "Book",
    submitSearch: "Check availability",
    searching: "Searching…",
    summaryDays: "{days} days",
    summaryChooseDates: "Choose your dates to continue",
    priceFinalStep: "· Final price confirmed in the next step",
    step1: "Choose dates",
    step2: "Choose a car",
    step3: "Confirm",
    stepCounter: "Step {step}: {label}",
    step1Title: "Choose your rental dates",
    step1Body:
      "The minimum rental is {minDays} days. The price is calculated automatically in the next step.",
    step2Title: "Choose your car",
    step2Body: "{days} days rental · {from} → {to}",
    step3Title: "Confirm your booking",
    step3Body:
      "No online payment required. We confirm availability by phone within minutes.",
    daysRental: "{days} days rental",
    continueToCars: "Continue",
    chooseCar: "Choose a car to continue.",
    fullName: "Full name",
    phone: "Phone",
    email: "Email",
    notes: "Notes (optional)",
    notesPlaceholder: "Flight number, special requests…",
    confirmBooking: "Confirm booking",
    summaryTitle: "Booking summary",
    summaryPickup: "Pickup",
    summaryPickupDate: "Pickup date",
    summaryDropoff: "Drop-off",
    summaryDropoffDate: "Drop-off date",
    summaryDuration: "Duration",
    summaryCar: "Car",
    summaryCarUnset: "Not selected",
    summaryTotal: "Total",
    summaryDiscountNote: "Includes the reduced weekly rate ({price}€/day).",
    summaryFootnote:
      "The price includes basic insurance and roadside assistance. The security deposit is refunded on return.",
    totalPerDay: "total · {price}€/day",
    successTitle: "Thank you, {name}!",
    successBody:
      "Your booking request was registered under reference {reference}. Our team on {phone} will call you within a few minutes to confirm the final details.",
    sendWhatsapp: "Send on WhatsApp",
    validationDates: "The drop-off date must be after the pickup date.",
    validationMinDays: "The minimum rental is {minDays} days.",
    validationCustomer: "Please fill in your name, phone and email.",
    successToast: "Booking request sent! We'll be in touch shortly.",
    whatsappMessage: "Hello! Booking confirmation {reference}.",
    whatsappMessageFull:
      "Hello! Booking confirmation {reference}.\nCar: {car}\nPickup: {pickup} — {from} at {fromTime}\nDrop-off: {dropoff} — {to} at {toTime}\nDays: {days} · Total: {total}€\nName: {name} · Tel: {phone}",
  },

  contact: {
    eyebrow: "Contact",
    heroTitle: "We're here for any question",
    heroSubtitle:
      "Bookings, date changes or questions about the fleet — reach us by phone, WhatsApp or email. We reply within 30 minutes.",
    channelPhone: "Phone",
    channelWhatsapp: "WhatsApp",
    channelEmail: "Email",
    phoneHours: "Monday – Sunday, 07:00 – 22:00",
    whatsappNote: "Fast replies, even outside opening hours",
    emailNote: "We reply within 30 minutes",
    formTitle: "Send us a message",
    formBody:
      "Fill in the form and we'll get back to you as soon as possible. For an instant reply, message us on WhatsApp.",
    formName: "Full name",
    formPhone: "Phone",
    formEmail: "Email (optional)",
    formMessage: "Message",
    formMessagePlaceholder:
      "Tell us which car you'd like, your dates and your pickup point…",
    formFooter: "We reply within 30 minutes · {email}",
    formSubmit: "Send message",
    formSuccessTitle: "Thank you, {name}!",
    formSuccessBody:
      "Your message has been registered. Our team normally replies within 30 minutes during opening hours.",
    formSuccessWhatsapp: "Also send on WhatsApp",
    formAgain: "Send another message",
    formValidation: "Please fill in your name, phone and message.",
    formSuccessToast: "Message sent! We'll be in touch shortly.",
    planningTitle: "Planning a trip?",
    planningBody:
      "Book online in 3 steps — no account and no prepayment.",
    whatsappMessage: "Hello! Name: {name}. Tel: {phone}. {message}",
  },

  about: {
    eyebrow: "About us",
    heroTitle: "An Albanian company, European standards",
    heroSubtitle:
      "rentcardb provides professional car hire in Durrës and at Rinas Airport, with a well-maintained fleet and transparent pricing.",
    storyTitle: "From one location in Durrës to a fleet of {count} cars",
    storyP1:
      "rentcardb began as a small rental service in the centre of Durrës, focused on customers arriving by ferry who wanted a simple, clean and reliable car.",
    storyP2:
      "As more tourists began visiting Albania, we added a 24/7 pickup point at Tirana International Airport “Nënë Tereza” (Rinas). Today the fleet numbers {count} cars, from economy models to family cars and SUVs, all with unlimited mileage within the country.",
    storyP3:
      "What hasn't changed is the way we work: clear prices, fast confirmation and a real person on the phone if something goes wrong during your trip.",
    statFleet: "Cars in the fleet",
    statPoints: "Pickup points",
    statPickup: "Airport pickup",
    statSteps: "Steps to book",
    valuesEyebrow: "Our values",
    valuesTitle: "Why customers come back",
    valuesDescription: "Three principles behind every rental we do.",
    value1Title: "Safety first",
    value1Body:
      "Every car passes a periodic technical inspection and is serviced by certified mechanics. We don't compromise on our customers' safety.",
    value2Title: "Transparent pricing",
    value2Body:
      "The price you see is the price you pay. No hidden fees, no surprises when you return the car.",
    value3Title: "Real support, when you need it",
    value3Body:
      "We answer in Albanian, English and Italian. 24/7 roadside assistance anywhere in Albania for the whole rental.",
    processEyebrow: "The process",
    processTitle: "Booking in 3 steps",
    processDescription:
      "No account, no prepayment. Just three steps and the car is yours.",
    requirementsTitle: "What you need to collect the car",
    requirementsBody:
      "The handover takes about 15 minutes. Bring the documents below and the car is ready to go.",
    questionsTitle: "Questions about the fleet or the terms?",
    questionsBody: "Call {phone} or email {email}.",
  },

  footer: {
    brandBlurb:
      "Professional car hire in Durrës & at Rinas Airport.",
    linksTitle: "Links",
    locationsTitle: "Locations",
    contactTitle: "Contact",
    followTitle: "Follow us",
    allCars: "All cars",
    copyright: "© {year} {name}. All rights reserved.",
    tagline: "Car hire in Albania — Rinas Airport & Durrës.",
  },

  notFound: {
    title: "This page could not be found",
    body: "The page you requested may have moved or no longer exists. Try browsing our fleet or head back to the homepage.",
  },

  whatsapp: {
    ariaLabel: "Message us on WhatsApp",
    label: "WhatsApp",
    defaultMessage: "Hello! I'd like to book a hire car.",
  },

  attributes: {
    category: {
      economy: "Economy",
      family: "Family",
      suv: "SUV",
      premium: "Premium",
      sportive: "Sport",
      minibus: "Minibus",
    },
    fuel: {
      petrol: "Petrol",
      diesel: "Diesel",
      petrolLpg: "Petrol & LPG",
    },
    transmission: {
      manual: "Manual",
      automatic: "Automatic",
    },
  },

  ageRanges: {
    young: "21 – 24 years",
    standard: "25 – 65 years",
    senior: "Over 65",
  },

  places: {
    rinas: {
      shortName: "Rinas Airport",
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
        "is an economy car, well suited to driving in town and to keeping costs low",
      family:
        "offers space and comfort for families, with enough luggage room for longer trips",
      suv: "is an SUV suited to Albanian roads, with a high driving position and plenty of room",
      premium:
        "is a premium model, ideal for business trips or for customers who want a higher level of comfort",
      sportive:
        "is a sport model, with performance and driving dynamics above the average",
      minibus:
        "is a multi-seat minibus, ideal for groups, large families and airport transfers",
    },
    transmissionAuto:
      "With an automatic transmission, it is very comfortable in city traffic.",
    transmissionManual:
      "With a manual transmission, it offers full control and simple maintenance.",
    template:
      "{name} {year} {intro}. Category {category} · {seats} seats · {fuel}. {transmission} Pickup at Rinas Airport or in Durrës, minimum {minDays} days rental.",
    featureTransmissionAuto: "Automatic transmission",
    featureTransmissionManual: "Manual transmission",
    featureFuelDiesel: "Diesel engine (low consumption)",
    featureFuelPetrol: "Petrol engine",
    featureFuelPetrolLpg: "Petrol & LPG engine",
    featureSeats: "{count} seats",
    featureAc: "Air conditioning",
    featureBluetooth: "Bluetooth & USB",
    featureSafety: "Airbags and ABS",
    overrides: {
      "kia-rio-2014":
        "The Kia Rio is one of the most economical cars in the fleet. With a diesel engine and manual transmission, consumption stays very low even in Tirana traffic. Easy to manoeuvre, good boot space and minimal running costs for a couple or a business trip.",
      "toyota-auris-2009":
        "The Toyota Auris, known for Toyota's legendary reliability. The diesel version offers very low consumption on long journeys, making it ideal for tours to the southern coast or around town. In good technical condition with regular servicing.",
      "hyundai-i20-2012":
        "The Hyundai i20 is compact and very practical for the city. Parking is easy even on the narrow streets of Tirana and Durrës, while diesel consumption stays low. A good choice for couples or small families on a controlled budget.",
      "toyota-yaris-2010":
        "The automatic Toyota Yaris — the most comfortable choice for drivers who would rather not change gears. Very popular with international customers, ideal for city traffic. Small on the outside but roomy inside, and highly dependable.",
      "toyota-yaris-2009":
        "The Toyota Yaris with manual transmission, compact and economical. A car with proven durability and a simple petrol engine that is easy to maintain. The practical choice for short trips at minimum cost.",
      "opel-meriva-2009":
        "The Opel Meriva offers more space than an ordinary compact, making it ideal for families. The high seating position gives good visibility on the road and comfortable access for passengers. A diesel engine with measured consumption even with a full boot.",
      "hyundai-starex-2012":
        "The Hyundai Starex is a 9-seat minibus, ideal for groups, large families or airport transfers. Automatic transmission and a diesel engine for comfortable long journeys. A very large luggage space for groups travelling with suitcases.",
    },
  },

  content: {
    bookingSteps: [
      {
        title: "Choose your dates",
        description:
          "Pick your pickup point, date and time. The price is calculated automatically.",
      },
      {
        title: "Choose your car",
        description:
          "Browse the available fleet and pick the model that suits your trip.",
      },
      {
        title: "Confirm",
        description:
          "Enter your details and confirm the booking. We'll contact you within minutes.",
      },
    ],
    included: [
      "Compulsory third-party insurance (TPL)",
      "Unlimited mileage within Albania",
      "24/7 roadside assistance",
      "Cleaning and disinfection before every rental",
      "Replacement car in the event of a breakdown",
    ],
    requirements: [
      "Minimum age 21 (25 for premium categories)",
      "A valid driving licence held for at least 1 year",
      "A valid passport or identity card",
      "A credit or debit card in the driver's name",
      "A refundable security deposit, returned on drop-off",
    ],
    faqs: [
      {
        question: "Can I collect the car directly at Rinas Airport?",
        answer:
          "Yes. We offer 24/7 pickup at Rinas Airport, about 10 minutes from the arrivals terminal. Our team will be waiting with a sign showing your name as soon as you come through.",
      },
      {
        question: "What documents do I need to collect the car?",
        answer:
          "A valid driving licence (held for at least 1 year), a passport or identity card, and a credit or debit card in the driver's name for the security deposit.",
      },
      {
        question: "Is there a mileage limit?",
        answer:
          "There is no mileage limit within Albania. For trips outside the country, please contact us in advance so we can confirm the terms and insurance cover.",
      },
      {
        question: "Can I drop the car off at a different location?",
        answer:
          "Yes, dropping off at a different location from the pickup is possible — for example collecting at Rinas and returning in Durrës. Contact us for the details.",
      },
      {
        question: "Do you accept credit card payment?",
        answer:
          "Yes, we accept credit and debit card payments as well as cash. The security deposit is refunded in full when the car is returned.",
      },
      {
        question: "What is the minimum rental period?",
        answer:
          "The minimum rental in high season is 2 days. For weekly rentals we offer reduced rates.",
      },
    ],
    locationRinasDescription:
      "24/7 pickup within 10 minutes of the terminal. Ideal for tourists and business travellers — book online and the car is waiting when you land.",
    locationRinasHighlights: [
      "Pickup and drop-off 24 hours, every day",
      "10 minutes from the arrivals terminal",
      "No extra charge for delayed flights",
    ],
    locationDurresDescription:
      "Our Durrës location for holidaymakers on the Albanian coast and visitors arriving by ferry. Flexible rates for daily and weekly rentals.",
    locationDurresHighlights: [
      "Close to the port of Durrës and the beaches",
      "Reduced rates for weekly rentals",
      "Hotel delivery on request",
    ],
  },
};
