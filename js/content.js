/**
 * ---------------------------------------------------------
 * 🔧 FORM3D - CONTENT CONTROL PANEL
 * ---------------------------------------------------------
 * This file controls the text, prices, links, and images for the entire site.
 * 
 * HOW TO EDIT:
 * 1. Change the text inside the quotes "".
 * 2. To add gallery images, just add more paths to the 'gallery' array.
 * 3. Save and refresh the page.
 */

const FORM3D_CONTENT = {
    // Global Links
    links: {
        whatsapp: "https://wa.me/yournumber",
        email: "3dformacorp@gmail.com"
    },

    // 1. ROMANTIC COUPLE SCULPTURE
  // 1. CHANGE THIS KEY FROM 'couple' TO 'coupleSculpture'
    coupleSculpture: {
        id: "couple-sculpture",
        name: "Couple Sculpture",
        price: "299 SEK",
        tallyLink: "https://tally.so/r/rjPzVM",
        heroImage: "/CoupleSculpture/PAR2.png",
        gallery: [
            "/CoupleSculpture/PAR1.png",
            "/CoupleSculpture/PAR2.png",
            "/CoupleSculpture/Par3.png",
            "/CoupleSculpture/il_794xN.7710992691_av7o.avif"
        ]
    },

    // 2. CHANGE THIS KEY FROM 'couple' TO 'coupleHeart'
    coupleHeart: {
        id: "couple-holding-heart",
        name: "Couple Holding Heart",
        price: "299 SEK",
        tallyLink: "https://tally.so/r/jaQbK1",
        heroImage: "/CoupleHoldingHands/chhwarm.png",
        gallery: [
            "/CoupleHoldingHands/chhblank.png",
            "/CoupleHoldingHands/chh.png",
            "/CoupleHoldingHands/chhwarm.png"
        ]
    },

    // 3. CUSTOM CAR KEY TAG (This one is fine)
    keytag: {
        id: "car-key-tag",
        name: "Custom Key Tag",
        price: "49 SEK",
        tallyLink: "https://tally.so/r/xXYOAG",
        heroImage: "Keytag/NameplateCar.png",
        gallery: [
            "KeyTag/NameplateCar.png",
            "KeyTag/NamePlatecars.png",
            "KeyTag/il_794xN.7712319889_j4v6.webp"
        ]
    },
    Figure3D: {
        id: "Figure3d",
        name: "Figure3d",
        price: "499 SEK",
        tallyLink: "https://tally.so/r/VL5jKN",
        heroImage: "3dFigure1/Figure3.png",
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
        ]
    }
};

window.FORM3D_CONTENT = FORM3D_CONTENT;