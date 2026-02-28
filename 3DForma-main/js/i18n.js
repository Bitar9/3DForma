/**
 * 3D PRINT BRAND - Internationalization System
 * Supports: English (en), Swedish (sv), Arabic (ar)
 * Features: Dynamic text switching, RTL layout support, localStorage persistence
 */

const I18n = (function () {
  'use strict';

  // Default language
  const DEFAULT_LANG = 'en';

  // Supported languages with their properties
  const LANGUAGES = {
    en: {
      code: 'en',
      name: 'English',
      dir: 'ltr',
      font: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    sv: {
      code: 'sv',
      name: 'Svenska',
      dir: 'ltr',
      font: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    ar: {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      font: "'Inter', -apple-system, 'Segoe UI', sans-serif"
    }
  };

  // Translation dictionary
  const TRANSLATIONS = {
    // Navigation & Common
    'nav.logo': {
      en: '3D Forma',
      sv: '3D Forma',
      ar: '3D Forma'
    },
    'nav.tagline': {
      en: 'Local 3D Printing',
      sv: 'Lokal 3D-printing',
      ar: 'طباعة ثلاثية الأبعاد محلية'
    },

    // Home Page - Hero
    'home.hero.label': {
      en: 'Custom 3D Printed Items',
      sv: 'Anpassade 3D-printade föremål',
      ar: 'عناصر مطبوعة ثلاثية الأبعاد مخصصة'
    },
    'home.hero.title': {
      en: 'Beautiful objects, made locally. Pick up when they\'re ready.',
      sv: 'Vackra föremål, tillverkade lokalt. Hämta när de är klara.',
      ar: 'أشياء جميلة، مصنوعة محلياً. استلمها عندما تكون جاهزة.'
    },
    'home.hero.description': {
      en: 'Personalized 3D printed gifts and accessories, crafted with care in your area. Simple ordering, local pickup, lasting quality.',
      sv: 'Personliga 3D-printade gåvor och tillbehör, tillverkade med omsorg i ditt område. Enkel beställning, lokal upphämtning, hållbar kvalitet.',
      ar: 'هدايا وإكسسوارات مطبوعة ثلاثية الأبعاد مخصصة، مصنوعة بعناية في منطقتك. طلب بسيط، استلام محلي، جودة دائمة.'
    },
    'home.hero.cta.primary': {
      en: 'Explore Products',
      sv: 'Utforska produkter',
      ar: 'استكشف المنتجات'
    },
    'home.hero.cta.secondary': {
      en: 'How It Works',
      sv: 'Så fungerar det',
      ar: 'كيف يعمل'
    },

    // Home Page - How It Works
    'home.steps.title': {
      en: 'How It Works',
      sv: 'Så fungerar det',
      ar: 'كيف يعمل'
    },
    'home.step1.title': {
      en: 'Choose Your Product',
      sv: 'Välj din produkt',
      ar: 'اختر منتجك'
    },
    'home.step1.description': {
      en: 'Browse our collection and find the perfect item for you or someone special.',
      sv: 'Bläddra i vår samling och hitta den perfekta produkten för dig eller någon speciell.',
      ar: 'تصفح مجموعتنا واعثر على العنصر المثالي لك أو لشخص مميز.'
    },
    'home.step2.title': {
      en: 'Submit Your Order',
      sv: 'Skicka din beställning',
      ar: 'أرسل طلبك'
    },
    'home.step2.description': {
      en: 'Fill out a simple form with your customization details. We\'ll confirm everything quickly.',
      sv: 'Fyll i ett enkelt formulär med dina anpassningsdetaljer. Vi bekräftar allt snabbt.',
      ar: 'املأ نموذجاً بسيطاً بتفاصيل التخصيص الخاصة بك. سنؤكد كل شيء بسرعة.'
    },
    'home.step3.title': {
      en: 'Pick Up Locally',
      sv: 'Hämta lokalt',
      ar: 'استلم محلياً'
    },
    'home.step3.description': {
      en: 'We\'ll notify you when your item is ready. Pick it up at a convenient location near you.',
      sv: 'Vi meddelar dig när din produkt är klar. Hämta den på ett bekvämt ställe nära dig.',
      ar: 'سنخطرك عندما يكون عنصرك جاهزاً. استلمه في موقع مناسب بالقرب منك.'
    },

    // Home Page - Featured Products
    'home.products.title': {
      en: 'Featured Products',
      sv: 'Utvalda produkter',
      ar: 'المنتجات المميزة'
    },
    'home.products.subtitle': {
      en: 'Thoughtfully designed, carefully crafted',
      sv: 'Genomtänkt designad, noggrant tillverkad',
      ar: 'مصممة بعناية، مصنوعة بدقة'
    },
    'product.couple.tag': {
      en: 'Sentimental Gift',
      sv: 'Känsloladdad gåva',
      ar: 'هدية عاطفية'
    },
    'product.couple.title': {
      en: 'Couple Sculpture',
      sv: 'Par-skulptur',
      ar: 'تمثال الزوجين'
    },
    'product.couple.description': {
      en: 'A timeless keepsake celebrating love and connection. Customizable with your names and special date.',
      sv: 'En tidlös minnessak som firar kärlek och anknytning. Anpassningsbar med dina namn och speciellt datum.',
      ar: 'تذكار خالد يحتفل بالحب والتواصل. قابل للتخصيص بأسمائك وتاريخك الخاص.'
    },
    'product.couple.cta': {
      en: 'View Details',
      sv: 'Visa detaljer',
      ar: 'عرض التفاصيل'
    },
    'product.keytag.tag': {
      en: 'Personal Accessory',
      sv: 'Personligt tillbehör',
      ar: 'إكسسوار شخصي'
    },
    'product.keytag.title': {
      en: 'Custom Key Tag',
      sv: 'Anpassad nyckelbricka',
      ar: 'علامة مفاتيح مخصصة'
    },
    'product.keytag.description': {
      en: 'Make your keys unmistakably yours. Precision-printed with your car model, name, or custom text.',
      sv: 'Gör dina nycklar omisskännligt dina. Precisionstryckt med din bilmodell, namn eller anpassad text.',
      ar: 'اجعل مفاتيحك لا تشبه إلاك. مطبوعة بدقة مع طراز سيارتك أو اسمك أو نص مخصص.'
    },
    'product.keytag.cta': {
      en: 'View Details',
      sv: 'Visa detaljer',
      ar: 'عرض التفاصيل'
    },

    // Home Page - Trust Section
    'home.trust.title': {
      en: 'Why Choose Us',
      sv: 'Varför välja oss',
      ar: 'لماذا تختارنا'
    },
    'home.trust.local.title': {
      en: 'Local Production',
      sv: 'Lokal produktion',
      ar: 'إنتاج محلي'
    },
    'home.trust.local.description': {
      en: 'Made in your community, not shipped from overseas. Support local craftsmanship.',
      sv: 'Tillverkad i ditt samhälle, inte skickad från utlandet. Stöd lokalt hantverk.',
      ar: 'مصنوع في مجتمعك، لا يتم شحنه من الخارج. دعم الحرفية المحلية.'
    },
    'home.trust.custom.title': {
      en: 'Fully Customizable',
      sv: 'Helt anpassningsbar',
      ar: 'قابل للتخصيص بالكامل'
    },
    'home.trust.custom.description': {
      en: 'Every piece is made to order with your personal details. No two are exactly alike.',
      sv: 'Varje del tillverkas på beställning med dina personliga detaljer. Inga två är exakt likadana.',
      ar: 'كل قطعة مصنوعة حسب الطلب مع تفاصيلك الشخصية. لا يوجد قطعتان متطابقتان تماماً.'
    },
    'home.trust.quality.title': {
      en: 'Quality Materials',
      sv: 'Kvalitetsmaterial',
      ar: 'مواد عالية الجودة'
    },
    'home.trust.quality.description': {
      en: 'We use premium, durable filaments that look great and last for years.',
      sv: 'Vi använder premium, hållbara filament som ser bra ut och håller i åratal.',
      ar: 'نستخدم خيوط ممتازة ودائمة تبدو رائعة وتدوم لسنوات.'
    },
    'home.trust.fast.title': {
      en: 'Fast Response',
      sv: 'Snabb respons',
      ar: 'استجابة سريعة'
    },
    'home.trust.fast.description': {
      en: 'Questions? We reply quickly. From order to pickup, the process is smooth and clear.',
      sv: 'Frågor? Vi svarar snabbt. Från beställning till upphämtning är processen smidig och tydlig.',
      ar: 'أسئلة؟ نرد بسرعة. من الطلب إلى الاستلام، العملية سلسة وواضحة.'
    },

    // Footer
    'footer.tagline': {
      en: 'Custom 3D printing, made local.',
      sv: 'Anpassad 3D-printing, tillverkad lokalt.',
      ar: 'طباعة ثلاثية الأبعاد مخصصة، مصنوعة محلياً.'
    },
    'footer.link.home': {
      en: 'Home',
      sv: 'Hem',
      ar: 'الرئيسية'
    },
    'footer.link.products': {
      en: 'Products',
      sv: 'Produkter',
      ar: 'المنتجات'
    },
    'footer.link.contact': {
      en: 'Contact',
      sv: 'Kontakt',
      ar: 'اتصل بنا'
    },
    'footer.copyright': {
      en: '© 2025 3D Forma. All rights reserved.',
      sv: '© 2025 3D Forma. Alla rättigheter förbehållna.',
      ar: '© 2025 3D Forma. جميع الحقوق محفوظة.'
    },

    // Product Page - Couple Sculpture
    'couple.tag': {
      en: 'Sentimental Gift',
      sv: 'Känsloladdad gåva',
      ar: 'هدية عاطفية'
    },
    'couple.title': {
      en: 'Couple Sculpture',
      sv: 'Par-skulptur',
      ar: 'تمثال الزوجين'
    },
    'couple.price': {
      en: 'From 249 SEK',
      sv: 'Från 249 kr',
      ar: 'ابتداءً من 249 كرونة'
    },
    'couple.description': {
      en: 'A delicate, elegant sculpture celebrating the bond between two people. This timeless piece captures the essence of love and connection — perfect for anniversaries, birthdays, Valentine\'s Day, or simply to say "I love you."',
      sv: 'En delikat, elegant skulptur som firar bandet mellan två människor. Denna tidlösa pjäs fångar kärlekens och anknytningens essens — perfekt för årsdagar, födelsedagar, alla hjärtans dag, eller helt enkelt för att säga "jag älskar dig".',
      ar: 'تمثال رقيق وأنيق يحتفل بالرابط بين شخصين. هذه القطعة الخالدة تلخص جوهر الحب والتواصل — مثالية للذكرى السنوية، أعياد الميلاد، عيد الحب، أو ببساطة لقول "أحبك".'
    },
    'couple.feature1': {
      en: 'Personalized with two names',
      sv: 'Personlig med två namn',
      ar: 'مخصص باسمين'
    },
    'couple.feature2': {
      en: 'Optional special date engraving',
      sv: 'Valfri gravyr av speciellt datum',
      ar: 'نقش تاريخ خياري'
    },
    'couple.feature3': {
      en: 'Available in multiple elegant colors',
      sv: 'Tillgänglig i flera eleganta färger',
      ar: 'متاح بألوان أنيقة متعددة'
    },
    'couple.cta': {
      en: 'Order Now',
      sv: 'Beställ nu',
      ar: 'اطلب الآن'
    },
    'couple.note': {
      en: 'You\'ll be redirected to our order form',
      sv: 'Du kommer att omdirigeras till vårt beställningsformulär',
      ar: 'سيتم توجيهك إلى نموذج الطلب الخاص بنا'
    },
    'couple.details.title1': {
      en: 'A Meaningful Keepsake',
      sv: 'En meningsfull minnessak',
      ar: 'تذكار ذو معنى'
    },
    'couple.details.text1': {
      en: 'Every curve and line in this sculpture is designed to evoke warmth and intimacy. It\'s not just a decorative object — it\'s a daily reminder of the love you share. Place it on a bedside table, desk, or shelf where you\'ll see it often.',
      sv: 'Varje kurva och linje i denna skulptur är designad för att väcka värme och intimitet. Det är inte bara ett dekorativt föremål — det är en daglig påminnelse om kärleken du delar. Placera den på ett sängbord, skrivbord eller hylla där du ser den ofta.',
      ar: 'كل منحنى وخط في هذا التمثال مصمم لإثارة الدفء والحميمية. إنه ليس مجرد كائن زخرفي — إنه تذكير يومي بالحب الذي تشاركانه. ضعه على طاولة bedside أو مكتب أو رف حيث تراه غالباً.'
    },
    'couple.details.title2': {
      en: 'Customization Options',
      sv: 'Anpassningsalternativ',
      ar: 'خيارات التخصيص'
    },
    'couple.details.text2': {
      en: 'Make it uniquely yours by adding both names in an elegant script. You can also include a special date — your anniversary, the day you met, or any moment worth remembering.',
      sv: 'Gör den unikt din genom att lägga till båda namnen i en elegant skrift. Du kan också inkludera ett speciellt datum — din årsdag, dagen ni träffades, eller vilken stund som helst värd att komma ihåg.',
      ar: 'اجعله فريداً لك بإضافة كلا الاسمين بخط أنيق. يمكنك أيضاً تضمين تاريخ خاص — ذكراكم السنوية، يوم التقيتم، أو أي لحظة تستحق التذكر.'
    },
    'couple.details.title3': {
      en: 'Materials & Size',
      sv: 'Material & storlek',
      ar: 'المواد والحجم'
    },
    'couple.details.text3': {
      en: 'Crafted from high-quality, eco-friendly PLA filament. The sculpture measures approximately 15cm in height and has a smooth, matte finish that feels premium to the touch.',
      sv: 'Tillverkad av högkvalitativ, miljövänlig PLA-filament. Skulpturen mäter cirka 15 cm i höjd och har en slät, matt finish som känns premium vid beröring.',
      ar: 'مصنوع من خيوط PLA عالية الجودة وصديقة للبيئة. يبلغ ارتفاع التمثال حوالي 15 سم وله نهاية ناعمة ومطفية تشعر بأنها ممتازة عند اللمس.'
    },

    // Product Page - Key Tag
    'keytag.tag': {
      en: 'Personal Accessory',
      sv: 'Personligt tillbehör',
      ar: 'إكسسوار شخصي'
    },
    'keytag.title': {
      en: 'Custom Car Key Tag',
      sv: 'Anpassad bilnyckelbricka',
      ar: 'علامة مفاتيح السيارة المخصصة'
    },
    'keytag.price': {
      en: 'From 89 SEK',
      sv: 'Från 89 kr',
      ar: 'ابتداءً من 89 كرونة'
    },
    'keytag.description': {
      en: 'A sleek, precision-crafted key tag that makes your keys instantly recognizable. Personalize with your car model, name, phone number, or any short text. Built to last with durable, high-quality materials.',
      sv: 'En snygg, precisionstillverkad nyckelbricka som gör dina nycklar omedelbart igenkännliga. Personifiera med din bilmodell, namn, telefonnummer eller valfri kort text. Byggd för att hålla med hållbara, högkvalitativa material.',
      ar: 'علامة مفاتيح أنيقة ومصنوعة بدقة تجعل مفاتيحك قابلة للتعرف عليها فوراً. قم بتخصيصها بطراز سيارتك أو اسمك أو رقم هاتفك أو أي نص قصير. مصنوعة لتدوم بمواد عالية الجودة ودائمة.'
    },
    'keytag.feature1': {
      en: 'Your car model or custom text',
      sv: 'Din bilmodell eller anpassad text',
      ar: 'طراز سيارتك أو نص مخصص'
    },
    'keytag.feature2': {
      en: 'Optional phone number on back',
      sv: 'Valfritt telefonnummer på baksidan',
      ar: 'رقم هاتف اختياري على الخلف'
    },
    'keytag.feature3': {
      en: 'Durable, lightweight construction',
      sv: 'Hållbar, lätt konstruktion',
      ar: 'بناء دائم وخفيف الوزن'
    },
    'keytag.cta': {
      en: 'Order Now',
      sv: 'Beställ nu',
      ar: 'اطلب الآن'
    },
    'keytag.note': {
      en: 'You\'ll be redirected to our order form',
      sv: 'Du kommer att omdirigeras till vårt beställningsformulär',
      ar: 'سيتم توجيهك إلى نموذج الطلب الخاص بنا'
    },
    'keytag.details.title1': {
      en: 'Designed for Your Lifestyle',
      sv: 'Designad för din livsstil',
      ar: 'مصمم لأسلوب حياتك'
    },
    'keytag.details.text1': {
      en: 'Your keys go everywhere with you. This key tag is designed to look good and perform well through daily use. The clean, modern aesthetic complements any key set without adding bulk.',
      sv: 'Dina nycklar följer med dig överallt. Denna nyckelbricka är designad för att se bra ut och prestera väl genom daglig användning. Den rena, moderna estetiken kompletterar alla nyckeluppsättningar utan att addera volym.',
      ar: 'مفاتيحك تذهب معك إلى كل مكان. علامة المفاتيح هذه مصممة لتبدو جيدة وتؤدي بشكل جيد من خلال الاستخدام اليومي. الجمالية النظيفة والحديثة تكمل أي مجموعة مفاتيح دون إضافة حجم.'
    },
    'keytag.details.title2': {
      en: 'Precision Personalization',
      sv: 'Precisionpersonalisering',
      ar: 'تخصيص دقيق'
    },
    'keytag.details.text2': {
      en: 'Choose your car model from our extensive list, or create something completely unique. Add your name, a short phrase, or your phone number on the back for peace of mind.',
      sv: 'Välj din bilmodell från vår omfattande lista, eller skapa något helt unikt. Lägg till ditt namn, en kort fras eller ditt telefonnummer på baksidan för sinnesro.',
      ar: 'اختر طراز سيارتك من قائمتنا الواسعة، أو أنشئ شيئاً فريداً تماماً. أضف اسمك أو عبارة قصيرة أو رقم هاتفك على الخلف لراحة البال.'
    },
    'keytag.details.title3': {
      en: 'Built to Last',
      sv: 'Byggd för att hålla',
      ar: 'مصنوعة لتدوم'
    },
    'keytag.details.text3': {
      en: 'Made from tough, impact-resistant PETG filament. Water-resistant, temperature-stable, and designed to withstand the wear and tear of daily life. The raised text won\'t fade or wear off.',
      sv: 'Tillverkad av tålig, stöttålig PETG-filament. Vattentålig, temperaturstabil och designad för att motstå slitage från dagligt liv. Den upphöjda texten bleknar eller slits inte av.',
      ar: 'مصنوعة من خيوط PETG الصعبة والمقاومة للصدمات. مقاومة للماء، مستقرة في درجة الحرارة، ومصممة لتحمل التآكل والتمزق من الحياة اليومية. النص المرتفع لن يبهت أو يتلاشى.'
    },
    'figure.tag': {
      en: 'Personalized Art',
      sv: 'Personlig konst',
      ar: 'فن مخصص'
    },
    'figure.title': {
      en: 'The 3D Mini-Me',
      sv: 'Din 3D-Figur',
      ar: 'تمثال 3D الخاص بك'
    },
    'figure.description': {
      en: 'Transform your favorite memory into a tangible masterpiece. Using advanced 3D modeling, we craft a detailed figure based on your photo.',
      sv: 'Förvandla ditt favoritminne till ett påtagligt mästerverk. Med avancerad 3D-modellering skapar vi en detaljerad figur baserad på ditt foto.',
      ar: 'حول ذكرياتك المفضلة إلى تحفة فنية ملموسة. باستخدام النمذجة ثلاثية الأبعاد المتقدمة، نصنع تمثالاً مفصلاً بناءً على صورتك.'
    },
    'figure.feature1': {
      en: '✓ Custom-modeled from your photos',
      sv: '✓ Specialmodellerad från dina foton',
      ar: '✓ مصممة خصيصاً من صورك'
    },
    'figure.feature2': {
      en: '✓ Exquisite high-resolution detail',
      sv: '✓ Utsökt högupplöst detaljrikedom',
      ar: '✓ تفاصيل رائعة عالية الدقة'
    },
    'figure.feature3': {
      en: '✓ Durable, museum-quality finish',
      sv: '✓ Hållbar finish av museikvalitet',
      ar: '✓ تشطيب متين وبجودة المتاحف'
    },
    'figure.cta': {
      en: 'Customize My Figure',
      sv: 'Anpassa min figur',
      ar: 'خصص تمثالي الآن'
    },
    'figure.price': {
      en: 'From 499 SEK',
      sv: 'Från 499 kr',
      ar: 'ابتداءً من 499 كرونة'
    },

    // Experience Specific
    'experience.genesis.title': {
      en: 'Crafting the intangible',
      sv: 'Skapar det immateriella',
      ar: 'صياغة غير الملموس'
    },
    'experience.genesis.subtitle': {
      en: '3D printing is the bridge between imagination and the objects you hold.',
      sv: '3D-utskrift är bron mellan fantasi och föremålen du håller i.',
      ar: 'الطباعة ثلاثية الأبعاد هي الجسر بين الخيال والأشياء التي تمسكها.'
    },
    'experience.intimacy.title': {
      en: 'Connection, captured',
      sv: 'Anslutning, fångad',
      ar: 'التواصل، مأسور'
    },
    'experience.intimacy.subtitle': {
      en: 'A quiet celebration of love, frozen in time and local craftsmanship.',
      sv: 'Ett tyst firande av kärlek, fruset i tid och lokalt hantverk.',
      ar: 'احتفال هادئ بالحب، مجمد في الوقت والحرفية المحلية.'
    },
    'experience.identity.title': {
      en: 'Boldly Show Your Identity!',
      sv: '3D',
      ar: 'لك بجرأة'
    },
    'experience.identity.subtitle': {
      en: 'Precise. Persistent. A statement of identity carred with you always.',
      sv: 'Precis. Ihärdig. Ett identitetsuttryck som du alltid bär med dig.',
      ar: 'دقيق. مستمر. بيان للهوية تحمله معك دائماً.'
    },
    'experience.scroll': {
      en: 'Scroll to feel',
      sv: 'Skrolla för att känna',
      ar: 'مرر لتشعر'
    },

    // Contact/Order
    'order.contact': {
      en: 'Questions? Contact us at',
      sv: 'Frågor? Kontakta oss på',
      ar: 'أسئلة؟ اتصل بنا على'
    }
  };

  // Current language state
  let currentLang = DEFAULT_LANG;

  /**
   * Initialize the i18n system
   */
  function init() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('3D Forma-language');
    if (savedLang && LANGUAGES[savedLang]) {
      currentLang = savedLang;
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (LANGUAGES[browserLang]) {
        currentLang = browserLang;
      }
    }

    // Apply initial language
    applyLanguage(currentLang);
    updateLanguageButtons();
  }

  /**
   * Set the active language
   * @param {string} lang - Language code
   */
  function setLanguage(lang) {
    if (!LANGUAGES[lang] || lang === currentLang) return;

    currentLang = lang;
    localStorage.setItem('3D Forma-language', lang);
    applyLanguage(lang);
    updateLanguageButtons();
  }

  /**
   * Apply language to the document
   * @param {string} lang - Language code
   */
  function applyLanguage(lang) {
    const langConfig = LANGUAGES[lang];

    // Set document direction (RTL for Arabic)
    document.documentElement.dir = langConfig.dir;
    document.documentElement.lang = lang;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = getTranslation(key, lang);

      if (translation) {
        // Check if element has HTML content
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: lang, direction: langConfig.dir }
    }));
  }

  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @param {string} lang - Language code (optional, defaults to current)
   * @returns {string|null} - Translated text or null
   */
  function getTranslation(key, lang = currentLang) {
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      return TRANSLATIONS[key][lang];
    }
    // Fallback to English
    if (TRANSLATIONS[key] && TRANSLATIONS[key][DEFAULT_LANG]) {
      return TRANSLATIONS[key][DEFAULT_LANG];
    }
    return null;
  }

  /**
   * Update language switcher button states
   */
  function updateLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', lang === currentLang);
      btn.setAttribute('aria-pressed', lang === currentLang);
    });
  }


  /**
   * Get current language
   * @returns {string} - Current language code
   */
  function getCurrentLanguage() {
    return currentLang;
  }

  /**
   * Get current direction
   * @returns {string} - 'ltr' or 'rtl'
   */
  function getDirection() {
    return LANGUAGES[currentLang].dir;
  }

  /**
   * Check if current direction is RTL
   * @returns {boolean}
   */
  function isRTL() {
    return LANGUAGES[currentLang].dir === 'rtl';
  }

  // Public API
  return {
    init,
    setLanguage,
    getTranslation,
    getCurrentLanguage,
    getDirection,
    isRTL,
    LANGUAGES
  };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  I18n.init();

  // Set up language button click handlers
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      I18n.setLanguage(lang);
    });
  });
});

// Export for global access
window.I18n = I18n;
