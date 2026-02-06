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
    couple: {
        id: "couple-sculpture",
        name: "Couple Sculpture",
        price: "299 SEK",
        tallyLink: "https://tally.so/r/rjPzVM",
        heroImage: "/images/PAR2.png",
        // Add more images here for the scroll experience
        gallery: [
            "/images/PAR1.png",
            "/images/PAR2.png",
            "/images/Par3.png",
            "/images/il_794xN.7710992691_av7o.avif"
        ]
    },

    // 2. CUSTOM CAR KEY TAG
    keytag: {
        id: "car-key-tag",
        name: "Custom Key Tag",
        price: "49 SEK",
        tallyLink: "https://tally.so/r/xXYOAG",
        heroImage: "images/NameplateCar.png",
        // Add more images here for the scroll experience
        gallery: [
            "images/NameplateCar.png",
            "images/NamePlatecars.png",
            "images/il_794xN.7712319889_j4v6.webp"
        ]
    }
};

// Make it available globally
window.FORM3D_CONTENT = FORM3D_CONTENT;
