export type LanguageCode = 'en' | 'ur' | 'ar' | 'es';
export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface GymProfile {
  name: string;
  shortAddress: string;
  fullAddress: string;
  cityCountry: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappUrl: string;
  googleRating: string;
  reviewCount: number;
  hoursWeekday: string;
  hoursSunday: string;
  googleMapsLink: string;
  googleMapsEmbedUrl: string;
}

export const GYM_PROFILE: GymProfile = {
  name: 'Center of Gravity Gym',
  shortAddress: '46, C.P. & Berar Society, Karachi',
  fullAddress: 'Plot 46, C.P. & Berar Society (C.P. & Berar CHS), Karachi, Sindh, Pakistan',
  cityCountry: 'Karachi, Pakistan',
  phoneDisplay: '+92 315 2269636',
  phoneRaw: '+923152269636',
  whatsappUrl: 'https://wa.me/923152269636',
  googleRating: '4.9',
  reviewCount: 148,
  hoursWeekday: 'Mon – Sat: 6:00 AM – 11:00 PM',
  hoursSunday: 'Sunday: Closed',
  googleMapsLink:
    'https://www.google.com/maps/search/?api=1&query=Center+of+Gravity+Gym+46+CP+Berar+Society+Karachi',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Center+of+Gravity+Gym,+46+CP+%26+Berar+Society,+Karachi,+Pakistan&output=embed',
};

export const HERO_IMAGE = '/src/assets/images/hero_gym_floor_1795603899971.jpg';

export interface TrainingZone {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  goalKey: string;
  featured?: boolean;
}

export const TRAINING_ZONES: TrainingZone[] = [
  {
    id: 'strength',
    index: '01',
    title: 'Strength & Free Weights',
    subtitle: 'Power racks · Calibrated plates · Dumbbells up to 50 kg',
    description:
      'Dedicated lifting platforms, competition-grade Olympic barbells, squat cages, and selectorized isolation stations built for progressive overload and hypertrophy.',
    highlights: [
      'Olympic squat racks & deadlift platforms',
      'Full knurled dumbbell rack (2.5 kg – 50 kg)',
      'Plate-loaded chest, back, and leg stations',
    ],
    image: '/src/assets/images/zone_strength_weights_1795603900389.jpg',
    goalKey: 'Strength & Muscle Gain',
    featured: true,
  },
  {
    id: 'cardio',
    index: '02',
    title: 'Cardio & Conditioning',
    subtitle: 'Commercial treadmills · Air bikes · Indoor sprint lane',
    description:
      'Climate-controlled endurance floor equipped with incline treadmills, assault air bikes, and rowing ergometers for fat loss and cardiovascular stamina.',
    highlights: [
      'High-incline commercial running decks',
      'Air resistance bikes & interval timers',
      'Heart-rate zone fat-burn programming',
    ],
    image: '/src/assets/images/zone_cardio_conditioning_1795603901200.jpg',
    goalKey: 'Fat Loss & Conditioning',
  },
  {
    id: 'functional',
    index: '03',
    title: 'Functional & HIIT Turf',
    subtitle: 'Kettlebells · Plyo boxes · Battle ropes',
    description:
      'High-energy athletic turf zone engineered for metabolic conditioning circuits, core stability, mobility drills, and explosive full-body power.',
    highlights: [
      'Cast-iron kettlebells & weighted sleds',
      'Plyometric jump boxes & battle ropes',
      'Guided small-group evening circuits',
    ],
    image: '/src/assets/images/zone_functional_hiit_1795603901177.jpg',
    goalKey: 'Functional & Athletic HIIT',
  },
  {
    id: 'coaching',
    index: '04',
    title: 'Personal Coaching',
    subtitle: 'Form audits · Custom splits · Nutrition guidance',
    description:
      'Hands-on floor coaching from experienced Karachi trainers who tailor every training block, rep tempo, and meal target to your body composition goals.',
    highlights: [
      'Bi-weekly body composition check-ins',
      'Injury-safe barbell & machine mechanics',
      'Practical Pakistani meal-plan frameworks',
    ],
    image: '/src/assets/images/zone_personal_coaching_1795603902247.jpg',
    goalKey: 'General Fitness & Coaching',
  },
];

export interface MembershipPlan {
  id: string;
  name: string;
  durationLabel: string;
  pricePkr: number;
  summary: string;
  features: string[];
  recommended?: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'starter',
    name: 'Starter Monthly',
    durationLabel: 'Per Month · Full Floor Access',
    pricePkr: 9000,
    summary: 'Complete daily access to all strength, free-weight, and cardio zones with floor trainer supervision.',
    features: [
      'Unlimited access Mon – Sat (6 AM – 11 PM)',
      'Strength, free weights & cardio floor',
      'Initial equipment orientation session',
      'Locker room & fresh drinking water access',
    ],
  },
  {
    id: 'transformation',
    name: '3-Month Transformation',
    durationLabel: 'Quarterly Plan · Save 17%',
    pricePkr: 22500,
    summary: 'Our most chosen package in C.P. & Berar Society for measurable fat loss, lean muscle, and structured accountability.',
    features: [
      'Full 90-day gym & HIIT turf access',
      'Custom 3-phase workout split',
      'Bi-weekly trainer check-ins & BMI tracking',
      'Practical nutrition & macro guidelines',
    ],
    recommended: true,
  },
  {
    id: 'annual-pro',
    name: 'Annual All-Access Pro',
    durationLabel: '12 Months · Priority Coaching',
    pricePkr: 75000,
    summary: 'Year-round athletic membership paired with personal assessment sessions and priority coach scheduling.',
    features: [
      '365-day priority floor & locker access',
      'Monthly 1-on-1 personal assessment',
      'Customized hypertrophy & strength roadmaps',
      '4 complimentary guest day passes for friends',
    ],
  },
];

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromPkr: number;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: '₨', rateFromPkr: 1, label: 'PKR ₨' },
  USD: { code: 'USD', symbol: '$', rateFromPkr: 0.0036, label: 'USD $' },
  GBP: { code: 'GBP', symbol: '£', rateFromPkr: 0.0028, label: 'GBP £' },
  EUR: { code: 'EUR', symbol: '€', rateFromPkr: 0.0033, label: 'EUR €' },
  AED: { code: 'AED', symbol: 'د.إ', rateFromPkr: 0.0132, label: 'AED د.إ' },
};

export function formatMembershipPrice(pricePkr: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  const converted = pricePkr * cfg.rateFromPkr;
  if (currency === 'PKR') {
    return `${cfg.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
  }
  return `${cfg.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}

export interface MemberReview {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  dateLabel: string;
  quote: string;
  outcome: string;
  avatar: string;
}

export const MEMBER_REVIEWS: MemberReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Siddiqui',
    neighborhood: 'C.P. & Berar Society, Karachi',
    rating: 5,
    dateLabel: 'Google Review · Verified Member',
    quote:
      'Cleanest workout floor in the Dhoraji and C.P. Berar neighborhood. The racks and dumbbells are always organized, ventilation is solid even during peak 7 PM hours, and the coaches actually correct your form instead of sitting on their phones.',
    outcome: 'Added 15 kg to squat working sets in 12 weeks',
    avatar: '/src/assets/images/avatar_member_hamza_1795603902363.jpg',
  },
  {
    id: 'rev-2',
    author: 'Ayesha Kamran',
    neighborhood: 'Bahadurabad, Karachi',
    rating: 5,
    dateLabel: 'Google Review · Verified Member',
    quote:
      'Very welcoming and respectful training atmosphere. Started with the 3-month plan after a long break—between the morning cardio floor and guided strength circuits, I dropped 7 kg consistently without feeling overwhelmed.',
    outcome: 'Lost 7 kg in 14 weeks with steady energy',
    avatar: '/src/assets/images/avatar_member_ayesha_1795603903856.jpg',
  },
  {
    id: 'rev-3',
    author: 'Saad Merchant',
    neighborhood: 'P.E.C.H.S., Karachi',
    rating: 5,
    dateLabel: 'Google Review · Verified Member',
    quote:
      'Being open from 6 AM to 11 PM six days a week makes it easy to stay consistent around work. Every machine works smoothly, no broken cables, and the WhatsApp desk responds fast whenever you have a question.',
    outcome: 'Trained 5 days/week consistently for 10 months',
    avatar: '/src/assets/images/avatar_member_saad_1795603903151.jpg',
  },
];

export interface TranslationBundle {
  dir: 'ltr' | 'rtl';
  nav: {
    home: string;
    zones: string;
    plans: string;
    bmi: string;
    location: string;
    trialCta: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    zonesTitle: string;
    zonesLead: string;
    plansTitle: string;
    plansLead: string;
    bmiTitle: string;
    bmiLead: string;
    bookingTitle: string;
    bookingLead: string;
    reviewsTitle: string;
    reviewsLead: string;
    locationTitle: string;
    locationLead: string;
  };
  actions: {
    selectFocus: string;
    choosePlan: string;
    submitTrial: string;
    whatsappDirect: string;
    getDirections: string;
    callGym: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationBundle> = {
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      zones: 'Zones',
      plans: 'Plans',
      bmi: 'BMI',
      location: 'Location',
      trialCta: 'Free Trial',
    },
    hero: {
      headline: 'Build Real Strength. Transform Your Body.',
      subheadline:
        'Karachi’s neighborhood strength and conditioning club in C.P. & Berar Society. Precision free weights, commercial cardio, functional HIIT turf, and hands-on coaching open 6:00 AM to 11:00 PM.',
      primaryCta: 'Book Free Trial Pass',
      secondaryCta: 'View Memberships',
    },
    sections: {
      zonesTitle: 'Training Zones & Programs',
      zonesLead: 'Four purpose-built floor zones maintained daily for serious strength work, fat loss, and athletic conditioning.',
      plansTitle: 'Transparent Membership Plans',
      plansLead: 'Straightforward monthly, quarterly, and annual access with zero hidden registration surprises.',
      bmiTitle: 'Body Mass Index & Goal Planner',
      bmiLead: 'Check your current BMI range in seconds and pair your profile with a tailored training focus.',
      bookingTitle: 'Claim Your Free Trial Pass',
      bookingLead: 'Reserve a complimentary floor session at Plot 46, C.P. & Berar Society and dispatch directly to our WhatsApp desk.',
      reviewsTitle: 'Verified Member Reviews',
      reviewsLead: 'Rated 4.9 out of 5 stars by dedicated members across C.P. & Berar Society, Dhoraji, and Bahadurabad.',
      locationTitle: 'Visit Our Gym in Karachi',
      locationLead: 'Drop by during operating hours for a guided floor tour or message us directly on WhatsApp.',
    },
    actions: {
      selectFocus: 'Train in This Zone',
      choosePlan: 'Choose Plan',
      submitTrial: 'Confirm Free Trial',
      whatsappDirect: 'Chat on WhatsApp',
      getDirections: 'Get Directions on Google Maps',
      callGym: 'Call +92 315 2269636',
    },
  },
  ur: {
    dir: 'rtl',
    nav: {
      home: 'ہوم',
      zones: 'زونز',
      plans: 'ممبرشپ',
      bmi: 'بی ایم آئی',
      location: 'لوکیشن',
      trialCta: 'مفت ٹرائل',
    },
    hero: {
      headline: 'حقیقی طاقت بنائیں۔ اپنی فٹنس بدلیں۔',
      subheadline:
        'سی پی اینڈ بیرار سوسائٹی کراچی میں جدید جم اور کنڈیشننگ کلب۔ فری ویٹس، کارڈیو، فنکشنل HIIT اور ماہر کوچنگ صبح 6 بجے سے رات 11 بجے تک۔',
      primaryCta: 'مفت ٹرائل بُک کریں',
      secondaryCta: 'پیکجز دیکھیں',
    },
    sections: {
      zonesTitle: 'ٹریننگ زونز اور پروگرامز',
      zonesLead: 'طاقت، وزن میں کمی اور فٹنس کے لیے چار مکمل اور منظم ٹریننگ زونز۔',
      plansTitle: 'ممبرشپ پلانز',
      plansLead: 'ماہانہ، سہ ماہی اور سالانہ ممبرشپ بغیر کسی خفیہ فیس کے۔',
      bmiTitle: 'بی ایم آئی کیلکولیٹر اور فٹنس ہدف',
      bmiLead: 'اپنا قد اور وزن درج کر کے فوری بی ایم آئی اور موزوں ٹریننگ پلان معلوم کریں۔',
      bookingTitle: 'مفت ٹرائل پاس حاصل کریں',
      bookingLead: 'اپنا نام اور وقت درج کریں اور واٹس ایپ کے ذریعے فوری تصدیق حاصل کریں۔',
      reviewsTitle: 'ممبرز کے مستند ریویوز',
      reviewsLead: 'گوگل میپس پر 4.9 اسٹار ریٹنگ کے ساتھ کراچی کے ممبرز کا اعتماد۔',
      locationTitle: 'ہمارا جم وزٹ کریں',
      locationLead: 'پلاٹ 46، سی پی اینڈ بیرار سوسائٹی کراچی میں تشریف لائیں یا واٹس ایپ پر رابطہ کریں۔',
    },
    actions: {
      selectFocus: 'اس زون کو منتخب کریں',
      choosePlan: 'پلان منتخب کریں',
      submitTrial: 'مفت ٹرائل بُک کریں',
      whatsappDirect: 'واٹس ایپ چیٹ',
      getDirections: 'گوگل میپس پر راستہ دیکھیں',
      callGym: 'کال کریں 2269636 315 92+',
    },
  },
  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      zones: 'المناطق',
      plans: 'الباقات',
      bmi: 'مؤشر الكتلة',
      location: 'الموقع',
      trialCta: 'تجربة مجانية',
    },
    hero: {
      headline: 'ابنِ قوة حقيقية. غيّر لياقتك.',
      subheadline:
        'نادي القوة واللياقة في جمعية C.P. & Berar بكراتشي. أوزان حرة احترافية، كارديو، تمارين HIIT، وتدريب شخصي من 6 صباحاً حتى 11 مساءً.',
      primaryCta: 'احجز حصة تجريبية مجانية',
      secondaryCta: 'عرض الباقات',
    },
    sections: {
      zonesTitle: 'مناطق وبرامج التدريب',
      zonesLead: 'أربع مناطق تدريبية مجهزة بالكامل لبناء العضلات وحرق الدهون ورفع اللياقة.',
      plansTitle: 'باقات العضوية',
      plansLead: 'خطط اشتراك شهرية وربع سنوية وسنوية واضحة وبدون رسوم خفية.',
      bmiTitle: 'حاسبة مؤشر كتلة الجسم',
      bmiLead: 'احسب مؤشر كتلة جسمك فوراً واحصل على توصية هدف تدريبي مخصصة.',
      bookingTitle: 'احجز تجربتك المجانية الآن',
      bookingLead: 'سجل بياناتك وأرسل طلب الحجز مباشرة إلى فريقنا عبر واتساب.',
      reviewsTitle: 'تقييمات الأعضاء الحقيقية',
      reviewsLead: 'تقييم 4.9 من 5 نجوم على خرائط جوجل في كراتشي.',
      locationTitle: 'زر نادينا في كراتشي',
      locationLead: 'قطعة 46، جمعية C.P. & Berar، كراتشي — تواصل معنا أو احصل على الاتجاهات.',
    },
    actions: {
      selectFocus: 'اختر هذا التخصص',
      choosePlan: 'اختر الباقة',
      submitTrial: 'تأكيد التجربة المجانية',
      whatsappDirect: 'تواصل عبر واتساب',
      getDirections: 'الاتجاهات على خرائط جوجل',
      callGym: 'اتصل 2269636 315 92+',
    },
  },
  es: {
    dir: 'ltr',
    nav: {
      home: 'Inicio',
      zones: 'Zonas',
      plans: 'Planes',
      bmi: 'IMC',
      location: 'Ubicación',
      trialCta: 'Prueba Gratis',
    },
    hero: {
      headline: 'Construye Fuerza Real. Transforma Tu Cuerpo.',
      subheadline:
        'Club de fuerza y acondicionamiento en C.P. & Berar Society, Karachi. Pesas libres, cardio comercial, zona HIIT y entrenadores certificados de 6:00 AM a 11:00 PM.',
      primaryCta: 'Reservar Prueba Gratis',
      secondaryCta: 'Ver Membresías',
    },
    sections: {
      zonesTitle: 'Zonas y Programas',
      zonesLead: 'Cuatro zonas especializadas mantenidas a diario para fuerza, pérdida de grasa y rendimiento.',
      plansTitle: 'Planes de Membresía',
      plansLead: 'Precios transparentes mensuales, trimestrales y anuales sin cargos ocultos.',
      bmiTitle: 'Calculadora de IMC y Objetivos',
      bmiLead: 'Calcula tu índice de masa corporal al instante y elige el programa ideal.',
      bookingTitle: 'Reserva Tu Pase de Prueba',
      bookingLead: 'Agenda tu sesión gratuita en Plot 46, C.P. & Berar Society y confírmala por WhatsApp.',
      reviewsTitle: 'Reseñas Reales en Google',
      reviewsLead: 'Calificación de 4.9 estrellas por miembros activos en Karachi.',
      locationTitle: 'Visita Nuestro Gimnasio',
      locationLead: 'Encuéntranos en C.P. & Berar Society o escríbenos directo por WhatsApp.',
    },
    actions: {
      selectFocus: 'Entrenar Aquí',
      choosePlan: 'Elegir Plan',
      submitTrial: 'Confirmar Prueba Gratis',
      whatsappDirect: 'Chat por WhatsApp',
      getDirections: 'Cómo Llegar en Google Maps',
      callGym: 'Llamar +92 315 2269636',
    },
  },
};
