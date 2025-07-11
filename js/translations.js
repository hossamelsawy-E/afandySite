// Translation system
const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.blog": "Blog",

    // Hero
    "hero.title": "From passport to plane",
    "hero.title2": "we have got you",
    "hero.subtitle":
      "Professional visa and immigration services with 15+ years of experience. We make your travel dreams come true.",
    "hero.cta": "Start Your Journey",
    "hero.consultation": "Free Consultation",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive visa and immigration solutions tailored to your needs",
    "services.tourist": "Tourist Visas",
    "services.tourist.desc": "Explore the world with our tourist visa services for all major destinations.",
    "services.study": "Study Visas",
    "services.study.desc": "Pursue your education abroad with our comprehensive study visa assistance.",
    "services.immigration": "Immigration",
    "services.immigration.desc": "Permanent residency and citizenship services for your new life abroad.",
    "services.work": "Work Abroad",
    "services.work.desc": "Professional work visa services to advance your career internationally.",
    "services.consultation": "Consultations",
    "services.consultation.desc": "Expert advice and personalized consultation for all your visa needs.",

    // Process
    "process.title": "Simple 4-Step Process",
    "process.subtitle": "We make visa applications easy and stress-free",
    "process.step1": "Submit Request",
    "process.step1.desc": "Fill out our simple online form with your travel requirements",
    "process.step2": "Upload Documents",
    "process.step2.desc": "Securely upload all required documents through our platform",
    "process.step3": "Payment",
    "process.step3.desc": "Complete payment through our secure payment gateway",
    "process.step4": "Delivery",
    "process.step4.desc": "Receive your processed visa documents at your doorstep",

    // Contact
    "contact.title": "Get Started Today",
    "contact.subtitle": "Contact us for a free consultation and let us help you with your visa needs",
    "contact.name": "Full Name",
    "contact.country": "Country",
    "contact.phone": "Phone Number",
    "contact.whatsapp": "WhatsApp (Optional)",
    "contact.passport": "Upload Passport Copy",
    "contact.message": "Message",
    "contact.submit": "Submit Application",

    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Trusted by thousands of satisfied customers worldwide",

    // Blog
    "blog.title": "Latest News & Updates",
    "blog.subtitle": "Stay informed with the latest visa requirements and travel updates",
    "blog.readmore": "Read More",

    // Footer
    "footer.company": "AFANDY TRAVEL",
    "footer.description":
      "Your trusted partner for visa and immigration services worldwide with authentic Middle Eastern hospitality.",
    "footer.contact": "Contact Info",
    "footer.follow": "Follow Us",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    // Header
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.process": "العملية",
    "nav.contact": "اتصل بنا",
    "nav.blog": "المدونة",

    // Hero
    "hero.title": "من جواز السفر إلى الطائرة",
    "hero.title2": "نحن معك .",
    "hero.subtitle": "خدمات التأشيرات والهجرة المهنية مع أكثر من 15 عامًا من الخبرة. نحن نحقق أحلام سفرك.",
    "hero.cta": "ابدأ رحلتك",
    "hero.consultation": "استشارة مجانية",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "حلول شاملة للتأشيرات والهجرة مصممة خصيصًا لاحتياجاتك",
    "services.tourist": "تأشيرات سياحية",
    "services.tourist.desc": "استكشف العالم مع خدمات التأشيرات السياحية لجميع الوجهات الرئيسية.",
    "services.study": "تأشيرات دراسية",
    "services.study.desc": "تابع تعليمك في الخارج مع مساعدتنا الشاملة للتأشيرات الدراسية.",
    "services.immigration": "الهجرة",
    "services.immigration.desc": "خدمات الإقامة الدائمة والجنسية لحياتك الجديدة في الخارج.",
    "services.work": "العمل في الخارج",
    "services.work.desc": "خدمات تأشيرات العمل المهنية لتطوير مسيرتك المهنية دوليًا.",
    "services.consultation": "الاستشارات",
    "services.consultation.desc": "نصائح الخبراء والاستشارة الشخصية لجميع احتياجات التأشيرة.",

    // Process
    "process.title": "عملية بسيطة من 4 خطوات",
    "process.subtitle": "نجعل طلبات التأشيرة سهلة وخالية من التوتر",
    "process.step1": "تقديم الطلب",
    "process.step1.desc": "املأ نموذجنا البسيط عبر الإنترنت مع متطلبات سفرك",
    "process.step2": "رفع المستندات",
    "process.step2.desc": "ارفع جميع المستندات المطلوبة بأمان من خلال منصتنا",
    "process.step3": "الدفع",
    "process.step3.desc": "أكمل الدفع من خلال بوابة الدفع الآمنة",
    "process.step4": "التسليم",
    "process.step4.desc": "استلم مستندات التأشيرة المعالجة في عتبة بابك",

    // Contact
    "contact.title": "ابدأ اليوم",
    "contact.subtitle": "اتصل بنا للحصول على استشارة مجانية ودعنا نساعدك في احتياجات التأشيرة",
    "contact.name": "الاسم الكامل",
    "contact.country": "البلد",
    "contact.phone": "رقم الهاتف",
    "contact.whatsapp": "واتساب (اختياري)",
    "contact.passport": "رفع نسخة من جواز السفر",
    "contact.message": "الرسالة",
    "contact.submit": "تقديم الطلب",

    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "موثوق به من قبل آلاف العملاء الراضين في جميع أنحاء العالم",

    // Blog
    "blog.title": "آخر الأخبار والتحديثات",
    "blog.subtitle": "ابق على اطلاع بأحدث متطلبات التأشيرة وتحديثات السفر",
    "blog.readmore": "اقرأ المزيد",

    // Footer
    "footer.company": "أفندي للسفر",
    "footer.description":
      "شريكك الموثوق لخدمات التأشيرات والهجرة في جميع أنحاء العالم مع الضيافة الشرق أوسطية الأصيلة.",
    "footer.contact": "معلومات الاتصال",
    "footer.follow": "تابعنا",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
}

// Current language state
let currentLanguage = "en"

// Translation function
function t(key) {
  return translations[currentLanguage][key] || key
}

// Update all translatable elements
function updateTranslations() {
  const elements = document.querySelectorAll("[data-translate]")
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate")
    const translation = t(key)

    if (element.tagName === "INPUT" && element.type === "submit") {
      element.value = translation
    } else if (element.tagName === "INPUT" && element.placeholder !== undefined) {
      element.placeholder = translation
    } else {
      element.textContent = translation
    }
  })
}

// Toggle language function
function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en"

  // Update document attributes
  document.documentElement.lang = currentLanguage
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr"

  // Update body class for scrollbar positioning
  document.body.className = "scrollbar-right"

  // Update language toggle text
  const languageText = document.getElementById("language-text")
  if (languageText) {
    languageText.textContent = currentLanguage === "en" ? "العربية" : "English"
  }

  // Update all translations
  updateTranslations()

  // Update loading steps if loading screen is visible
  updateLoadingSteps()

  // Save language preference
  localStorage.setItem("preferred-language", currentLanguage)
}

// Initialize language from localStorage
function initializeLanguage() {
  const savedLanguage = localStorage.getItem("preferred-language")
  if (savedLanguage && savedLanguage !== currentLanguage) {
    currentLanguage = savedLanguage
    document.documentElement.lang = currentLanguage
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr"

    const languageText = document.getElementById("language-text")
    if (languageText) {
      languageText.textContent = currentLanguage === "en" ? "العربية" : "English"
    }
  }
  updateTranslations()
}

// Loading steps for different languages
const loadingSteps = {
  en: [
    "Initializing your journey...",
    "Connecting to global destinations...",
    "Preparing visa services...",
    "Almost ready to explore...",
    "Welcome to AFANDY TRAVEL!",
  ],
  ar: [
    "جاري تهيئة رحلتك...",
    "الاتصال بالوجهات العالمية...",
    "تحضير خدمات التأشيرات...",
    "تقريباً جاهز للاستكشاف...",
    "مرحباً بك في أفندي للسفر!",
  ],
}

// Update loading steps
function updateLoadingSteps() {
  const loadingStep = document.getElementById("loading-step")
  if (loadingStep && window.currentLoadingStep !== undefined) {
    const steps = loadingSteps[currentLanguage]
    if (steps && steps[window.currentLoadingStep]) {
      loadingStep.textContent = steps[window.currentLoadingStep]
    }
  }
}

// Export functions for global use
window.toggleLanguage = toggleLanguage
window.t = t
window.updateTranslations = updateTranslations
window.initializeLanguage = initializeLanguage
window.loadingSteps = loadingSteps
window.updateLoadingSteps = updateLoadingSteps
