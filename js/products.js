/**
 * ═══════════════════════════════════════════════════════════
 *  🎯 FORM3D — PRODUCT CMS + THEME ENGINE
 * ═══════════════════════════════════════════════════════════
 *
 *  ╔══════════════════════════════════════════════════════╗
 *  ║  HOW TO USE:                                         ║
 *  ║                                                      ║
 *  ║  ✅ ADD product    → Copy any product, paste, edit    ║
 *  ║  ✅ REMOVE product → Delete it (or set active:false)  ║
 *  ║  ✅ REORDER        → Change the "order" number        ║
 *  ║  ✅ CHANGE THEME   → Just write: theme: "sunset"      ║
 *  ║                                                      ║
 *  ║  Save → Refresh → Done.                              ║
 *  ╚══════════════════════════════════════════════════════╝
 *
 *
 *  ─── AVAILABLE THEMES ───────────────────────────────────
 *
 *  WARM THEMES (italic titles, soft romantic feel):
 *    "ember"     — Rose / blush pink      ❤️  (for love & romance)
 *    "sunset"    — Amber / golden          🌅  (for warmth & nostalgia)
 *    "blossom"   — Soft pink / magenta     🌸  (for femininity & care)
 *    "honey"     — Deep gold / cream       🍯  (for luxury & comfort)
 *    "terracotta"— Earthy clay / sienna    🏺  (for handmade & organic)
 *
 *  BOLD THEMES (uppercase titles, sharp techy feel):
 *    "midnight"  — Electric blue / ice     ⚡  (for tech & precision)
 *    "neon"      — Cyan / hot green        💚  (for energy & gaming)
 *    "phantom"   — Cool grey / silver      🌫️  (for sleek & minimal)
 *    "royal"     — Purple / lavender       👑  (for premium & exclusive)
 *    "crimson"   — Blood red / fire        🔴  (for power & urgency)
 *
 *  PLAYFUL THEMES (rounded feel, friendly):
 *    "coral"     — Warm orange / peach     🧡  (for fun & creativity)
 *    "ocean"     — Deep teal / aqua        🌊  (for calm & trust)
 *    "forest"    — Emerald / sage          🌲  (for nature & eco)
 *    "aurora"    — Multi-gradient glow     🌌  (for magic & wonder)
 *
 *  HOW TO USE IN A PRODUCT:
 *    theme: "midnight"             ← just the name!
 *    theme: "sunset"               ← romantic warm feel
 *    theme: "neon"                 ← techy aggressive
 *
 *  WANT A CUSTOM THEME? Use an object instead:
 *    theme: { name: "custom", bg: "#1a1a2e", accent: "#e94560",
 *             glow: "rgba(233,69,96,0.15)", textColor: "#f5a5b8", mood: "bold" }
 *  ─────────────────────────────────────────────────────────
 */


/* ═══════════════════════════════════════════════════════════
   THEME PALETTE LIBRARY
   ═══════════════════════════════════════════════════════════ */

window.FORM3D_THEMES = {

    // ─── WARM (mood: "warm") ──────────────────────
    ember: {
        bg: "#1A1614",
        accent: "#D4B5A8",
        glow: "rgba(212, 181, 168, 0.15)",
        textColor: "#E8C4B8",
        mood: "warm"
    },
    sunset: {
        bg: "#1A1710",
        accent: "#F59E0B",
        glow: "rgba(245, 158, 11, 0.12)",
        textColor: "#FDE68A",
        mood: "warm"
    },
    blossom: {
        bg: "#1A1018",
        accent: "#EC4899",
        glow: "rgba(236, 72, 153, 0.12)",
        textColor: "#FBCFE8",
        mood: "warm"
    },
    honey: {
        bg: "#1A1810",
        accent: "#D97706",
        glow: "rgba(217, 119, 6, 0.12)",
        textColor: "#FCD34D",
        mood: "warm"
    },
    terracotta: {
        bg: "#1A1512",
        accent: "#C2703E",
        glow: "rgba(194, 112, 62, 0.12)",
        textColor: "#E8A87C",
        mood: "warm"
    },

    // ─── BOLD (mood: "bold") ──────────────────────
    midnight: {
        bg: "#0D1117",
        accent: "#38BDF8",
        glow: "rgba(56, 189, 248, 0.18)",
        textColor: "#BAE6FD",
        mood: "bold"
    },
    neon: {
        bg: "#0A1A14",
        accent: "#22D3EE",
        glow: "rgba(34, 211, 238, 0.15)",
        textColor: "#A5F3FC",
        mood: "bold"
    },
    phantom: {
        bg: "#111114",
        accent: "#94A3B8",
        glow: "rgba(148, 163, 184, 0.1)",
        textColor: "#CBD5E1",
        mood: "bold"
    },
    royal: {
        bg: "#13101A",
        accent: "#A78BFA",
        glow: "rgba(167, 139, 250, 0.15)",
        textColor: "#DDD6FE",
        mood: "bold"
    },
    crimson: {
        bg: "#1A0D0D",
        accent: "#EF4444",
        glow: "rgba(239, 68, 68, 0.15)",
        textColor: "#FCA5A5",
        mood: "bold"
    },

    // ─── PLAYFUL (mood: "playful") ────────────────
    coral: {
        bg: "#1A1412",
        accent: "#FB923C",
        glow: "rgba(251, 146, 60, 0.12)",
        textColor: "#FED7AA",
        mood: "playful"
    },
    ocean: {
        bg: "#0D1519",
        accent: "#14B8A6",
        glow: "rgba(20, 184, 166, 0.12)",
        textColor: "#99F6E4",
        mood: "playful"
    },
    forest: {
        bg: "#0F1A14",
        accent: "#34D399",
        glow: "rgba(52, 211, 153, 0.12)",
        textColor: "#A7F3D0",
        mood: "playful"
    },
    aurora: {
        bg: "#0E0E1A",
        accent: "#818CF8",
        glow: "rgba(129, 140, 248, 0.15)",
        textColor: "#C7D2FE",
        mood: "playful"
    }
};


/* ═══════════════════════════════════════════════════════════
   PRODUCTS
   ═══════════════════════════════════════════════════════════ */

window.FORM3D_PRODUCTS = [

    /* ─────────────────────────────────────────────
       1.  3D MINI-ME FIGURE
       ───────────────────────────────────────────── */
    {
        id: "Figure3D",
        slug: "Figure3D",
        active: true,
        order: 1,

        name: "3D Mini-Me",
        tagline: "Your likeness, immortalized",
        subtitle: "We turn your favorite photo into a stunning, hand-finished 3D figure. The most personal gift you'll ever give.",
        badge: "🔥 Most Popular",

        price: "499 SEK",
        priceNote: "Includes custom modeling + hand-finishing",
        oldPrice: "",

        tallyLink: "https://tally.so/r/VL5jKN",

        heroImage: "3dFigure1/Figure3.png",
        thumbnail: "3dFigure1/Figure1.png",
        gallery: [
            "3dFigure1/Figure7.png",
            "3dFigure1/Figure6.png",
            "3dFigure1/Figure5.png",
            "3dFigure1/c85d6002-ee6b-4268-aacc-c35b0adc5053_1770472200.png",
            "3dFigure1/Figure4.png",
            "3dFigure1/Figure3.png",
            "3dFigure1/WhatsApp Image 2026-02-07 at 1.59.40 PM.jpeg",
            "3dFigure1/WhatsApp Image 2026-01-24 at 5.32.37 PM.jpeg",
            "3dFigure1/Gemini_Generated_Image_iiw336iiw336iiw3 (1).png",
            "3dFigure1/Gemini_Generated_Image_6k4otz6k4otz6k4o (1).png",
            "3dFigure1/Figure2.png",
            "3dFigure1/Figure1.png",
            "3dFigure1/2b4093e0-eb02-4965-84b3-2bb5c5f6c6c7_1770472123.png"
        ],

        features: [
            "Custom-modeled from your photos",
            "Exquisite high-resolution detail",
            "Hand-finished, museum-quality surface",
            "Choose your pose and style"
        ],

        story: {
            headline: "From Photo to Masterpiece",
            text: "Imagine holding a miniature version of yourself — or someone you love. Every detail captured, every expression preserved. This isn't just a figurine. It's a moment frozen in time, crafted with obsessive precision from a single photograph. Place it on your desk, your shelf, or gift it to someone who deserves to be immortalized."
        },

        details: [
            {
                title: "How It Works",
                text: "Send us a clear photo. Our 3D artists model your likeness digitally, then we print it layer by layer with ultra-fine 0.1mm precision. Finally, each piece is hand-sanded and finished for a flawless, premium feel."
            },
            {
                title: "Materials & Size",
                text: "Printed in high-grade PLA+ on professional equipment. Standard height: ~15cm. Available in natural white, painted color, or metallic finish. Each piece takes 3–5 days to craft."
            }
        ],

        audience: "Perfect for birthdays, graduations, memorials, or just because you're awesome.",

        // ── THEME: just a name! ──
        theme: "midnight",

        layout: "right",

        psychology: {
            urgency: "Limited slots per week",
            social: "50+ happy customers",
            trust: "Hand-finished & inspected"
        },

        i18n: {
            title: "experience.identity.title",
            subtitle: "experience.identity.subtitle",
            cta: "figure.cta"
        }
    },

    /* ─────────────────────────────────────────────
       2.  COUPLE SCULPTURE
       ───────────────────────────────────────────── */
    {
        id: "couple-sculpture",
        slug: "couple-sculpture",
        active: true,
        order: 2,

        name: "Couple Sculpture",
        tagline: "Connection, captured",
        subtitle: "A delicate, elegant sculpture celebrating the bond between two people. Timeless love, frozen in 3D.",
        badge: "❤️ Perfect Gift",

        price: "299 SEK",
        priceNote: "Personalized with your names",
        oldPrice: "",

        tallyLink: "https://tally.so/r/rjPzVM",

        heroImage: "CoupleSculpture/PAR2.png",
        thumbnail: "CoupleSculpture/Par3.png",
        gallery: [
            "CoupleSculpture/PAR1.png",
            "CoupleSculpture/PAR2.png",
            "CoupleSculpture/Par3.png",
            "CoupleSculpture/il_794xN.7710992691_av7o.avif"
        ],

        features: [
            "Personalized with two names",
            "Optional special date engraving",
            "Available in multiple elegant colors",
            "Smooth, matte premium finish"
        ],

        story: {
            headline: "A Meaningful Keepsake",
            text: "Every curve and line in this sculpture is designed to evoke warmth and intimacy. It's not just decoration — it's a daily reminder of the love you share. Place it on a bedside table, a desk, or wherever you want to feel that connection. Some things are too beautiful to exist only in memory."
        },

        details: [
            {
                title: "Customization",
                text: "Make it truly yours: add both names in elegant script, plus an optional date — your anniversary, the day you met, or any moment worth remembering forever."
            },
            {
                title: "Materials & Size",
                text: "Crafted from high-quality, eco-friendly PLA filament. Approximately 15cm tall with a smooth, matte finish that feels premium to the touch. Available in White, Rose, Black, and Gold."
            }
        ],

        audience: "Perfect for anniversaries, Valentine's Day, weddings, or to say 'I love you' without words.",

        theme: "ember",

        layout: "left",

        psychology: {
            urgency: "Great for anniversaries",
            social: "Loved by couples",
            trust: "Eco-friendly PLA material"
        },

        i18n: {
            title: "experience.intimacy.title",
            subtitle: "experience.intimacy.subtitle",
            cta: "couple.cta"
        }
    },

    /* ─────────────────────────────────────────────
       3.  COUPLE HOLDING HEART
       ───────────────────────────────────────────── */
    {
        id: "couple-holding-heart",
        slug: "couple-holding-heart",
        active: true,
        order: 3,

        name: "Couple Holding Heart",
        tagline: "Love you can hold",
        subtitle: "Two figures, one heart. A symbol of togetherness crafted with care and intention.",
        badge: "💕 Valentine's Pick",

        price: "299 SEK",
        priceNote: "Customizable names & date",
        oldPrice: "",

        tallyLink: "https://tally.so/r/jaQbK1",

        heroImage: "CoupleHoldingHands/chhwarm.png",
        thumbnail: "CoupleHoldingHands/chhwarm.png",
        gallery: [
            "CoupleHoldingHands/chhblank.png",
            "CoupleHoldingHands/chh.png",
            "CoupleHoldingHands/chhwarm.png"
        ],

        features: [
            "Heart held between two figures",
            "Add both names on the base",
            "Warm, romantic color palette",
            "Smooth hand-finished surface"
        ],

        story: {
            headline: "Togetherness, Materialized",
            text: "Some feelings are too powerful for words alone. This piece captures the quiet beauty of being held — and holding someone in return. The heart between the two figures isn't just decoration. It's a promise. A reminder. A physical anchor for something invisible and infinite."
        },

        details: [
            {
                title: "The Perfect Gift",
                text: "Whether it's your first anniversary or your fiftieth, this sculpture speaks volumes. Your partner will see it every day and know: this was chosen with thought, not just convenience."
            },
            {
                title: "Quality & Craft",
                text: "Printed with premium PLA+ on professional-grade equipment. Each piece is hand-sanded for a silk-smooth surface. Approximately 14cm tall. Ships in a protective gift-ready box."
            }
        ],

        audience: "For lovers, newlyweds, long-distance couples, or anyone celebrating connection.",

        theme: "blossom",

        layout: "left",

        psychology: {
            urgency: "Handmade to order",
            social: "Top-rated gift idea",
            trust: "Premium finish guaranteed"
        },

        i18n: {
            title: "experience.intimacy.title",
            subtitle: "experience.intimacy.subtitle",
            cta: "couple.cta"
        }
    },

    /* ─────────────────────────────────────────────
       4.  CUSTOM CAR KEY TAG
       ───────────────────────────────────────────── */
    {
        id: "car-key-tag",
        slug: "car-key-tag",
        active: true,
        order: 4,

        name: "Custom Key Tag",
        tagline: "Your ride. Your identity.",
        subtitle: "A sleek, precision-crafted tag that makes your keys unmistakably yours. Bold, durable, personal.",
        badge: "🚗 Best Seller",

        price: "49 SEK",
        priceNote: "Includes your car model + name",
        oldPrice: "",

        tallyLink: "https://tally.so/r/xXYOAG",

        heroImage: "KeyTag/NameplateCar.png",
        thumbnail: "KeyTag/il_794xN.7712319889_j4v6.webp",
        gallery: [
            "KeyTag/NameplateCar.png",
            "KeyTag/NamePlatecars.png",
            "KeyTag/il_794xN.7712319889_j4v6.webp"
        ],

        features: [
            "Your car model or custom text",
            "Optional phone number on back",
            "Impact-resistant PETG material",
            "Lightweight, daily-carry tough"
        ],

        story: {
            headline: "Designed for Your Lifestyle",
            text: "Your keys go everywhere with you. They're the first thing you grab in the morning and the last thing you put down at night. This tag makes them feel intentional. Choose your car model — or any text — and carry a piece of identity with you everywhere. Clean. Bold. Unmistakably yours."
        },

        details: [
            {
                title: "Precision Personalization",
                text: "Choose from our catalog of car models (BMW, Mercedes, Tesla, Audi, and 50+ more) or enter any custom text. Add your name or phone number on the back for peace of mind."
            },
            {
                title: "Built to Last",
                text: "Made from impact-resistant PETG filament — water-resistant, temperature-stable, and designed for daily abuse. The raised text won't fade or wear off. Available in Carbon Black, Slate Grey, and Neon accents."
            }
        ],

        audience: "For car enthusiasts, petrolheads, or anyone who wants their keys to feel premium.",

        theme: "phantom",

        layout: "right",

        psychology: {
            urgency: "Ships within 48h",
            social: "100+ tags delivered",
            trust: "Durable PETG material"
        },

        i18n: {
            title: "experience.identity.title",
            subtitle: "experience.identity.subtitle",
            cta: "keytag.cta"
        }
    }

];


/* ═══════════════════════════════════════════════════════════
   GLOBAL SITE SETTINGS
   ═══════════════════════════════════════════════════════════ */

window.FORM3D_SITE = {
    brand: "3D Forma",
    email: "3dformacorp@gmail.com",
    whatsapp: "https://wa.me/yournumber",
    copyright: "© 2025 3D Forma. All rights reserved.",

    // ── HERO STATISTICS (shown on landing) ──
    heroStats: [
        { value: "100+", label: "Happy Customers" },
        { value: "3–5", label: "Days to Deliver" },
        { value: "100%", label: "Satisfaction Rate" }
    ],

    // ── SOCIAL PROOF ──
    socialProof: {
        headline: "Loved by Real People",
        reviews: [
            { name: "Sara L.", text: "My boyfriend LOVED the couple sculpture. The detail is incredible!", rating: 5 },
            { name: "Ahmed K.", text: "Best key tag I've ever had. Looks so premium for the price.", rating: 5 },
            { name: "Emma S.", text: "The 3D figure of my dad made him cry. Best birthday gift ever.", rating: 5 }
        ]
    },

    // ── TRUST BADGES ──
    trustBadges: [
        { icon: "🏠", title: "Local Production", desc: "Made in your community, not shipped overseas." },
        { icon: "🎨", title: "Fully Customizable", desc: "Every piece made to order with your personal details." },
        { icon: "✨", title: "Quality Materials", desc: "Premium, durable filaments that last for years." },
        { icon: "⚡", title: "Fast Response", desc: "We reply within hours. Smooth from order to pickup." }
    ],

    // ── HOW IT WORKS ──
    howItWorks: [
        { step: "01", title: "Choose Your Product", desc: "Browse our collection and find the perfect item." },
        { step: "02", title: "Customize & Order", desc: "Fill a simple form with names, colors, details." },
        { step: "03", title: "Pick Up Locally", desc: "Ready in 3–5 days. We notify you when it's done." }
    ],

    // ── GUARANTEE ──
    guarantee: {
        headline: "100% Satisfaction Promise",
        text: "Not happy with your order? We'll remake it or refund you. No questions asked."
    }
};
