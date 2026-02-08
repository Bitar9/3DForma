/**
 * FORM3D - THE EXPERIENCE
 * Atmospheric interactions and content loading
 */

(function () {
  'use strict';

  // ========================================
  // CONTENT LOADER (The "Backend" Logic)
  // ========================================
  const ContentLoader = {
    init() {
      if (!window.FORM3D_CONTENT) return;

      this.populateCommonLinks();

      // Inside ContentLoader.init()

const path = window.location.pathname;

if (path.includes('couple-sculpture')) {
  // Update this to match the new key name
  this.populateProductPage(window.FORM3D_CONTENT.coupleSculpture);
  
} else if (path.includes('car-key-tag')) {
  this.populateProductPage(window.FORM3D_CONTENT.keytag);
  
} else if (path.includes('couple-holding-heart')) {
  // Update this to match the new key name (previously it was pointing to .couple)
  this.populateProductPage(window.FORM3D_CONTENT.coupleHeart);
} else if (path.includes('Figure3d')) {
  // Update this to match the new key name (previously it was pointing to .couple)
  this.populateProductPage(window.FORM3D_CONTENT.Figure3d);
}
    },

    populateCommonLinks() {
      const emailLink = document.querySelector('a[href^="mailto:"]');
      if (emailLink && window.FORM3D_CONTENT.links.email) {
        emailLink.href = `mailto:${window.FORM3D_CONTENT.links.email}`;
        emailLink.textContent = window.FORM3D_CONTENT.links.email;
      }
    },

    populateProductPage(data) {
      if (!data) return;

      // 1. Hero Image
      const hero = document.getElementById('hero-image');
      if (hero && data.heroImage) {
        // Handle path adjustment if in subfolder
        const imgPath = window.location.pathname.includes('product') ? `../${data.heroImage}` : data.heroImage;
        hero.style.backgroundImage = `linear-gradient(to bottom, transparent, var(--bg-deep, #080808)), url('${imgPath}')`;
      }

      // 2. Price
      const priceEl = document.getElementById('product-price');
      if (priceEl && data.price) {
        priceEl.textContent = `From ${data.price}`;
      }

      // 3. WhatsApp/Order Link
      const orderBtn = document.getElementById('product-link');
      if (orderBtn) {
        orderBtn.href = data.tallyLink || window.FORM3D_CONTENT.links.whatsapp;
      }

      // 4. Dynamic Gallery
      const gallery = document.getElementById('product-gallery');
      if (gallery && data.gallery && data.gallery.length > 0) {
        const baseDir = window.location.pathname.includes('product') ? '../' : '';

        data.gallery.forEach(img => {
          const div = document.createElement('div');
          div.className = 'moment-visual';
          div.style.aspectRatio = '1/1';
          div.innerHTML = `<img src="${baseDir}${img}" alt="Product detail" loading="lazy">`;
          gallery.appendChild(div);
        });
      }

      // 5. Create Sticky Buy Bar
      this.createStickyBar(data);
    },

    createStickyBar(data) {
      const existing = document.querySelector('.sticky-buy-bar');
      if (existing) existing.remove();

      const lang = window.I18n ? window.I18n.getCurrentLanguage() : 'en';
      const orderText = window.I18n && window.I18n.getTranslation('couple.cta') ? window.I18n.getTranslation('couple.cta') : 'Order Now';

      const bar = document.createElement('div');
      bar.className = 'sticky-buy-bar';
      bar.innerHTML = `
        <div class="sticky-buy-info">
          <span class="sticky-buy-label">${data.name}</span>
          <span class="sticky-buy-price">${data.price}</span>
        </div>
        <a href="${data.tallyLink || window.FORM3D_CONTENT.links.whatsapp}" class="btn-buy-sticky">${orderText}</a>
      `;
      document.body.appendChild(bar);
    }
  };

  // ========================================
  // INTERACTION ENGINE
  // ========================================
  const Experience = {
    scenes: null,
    observer: null,

    init() {
      this.scenes = document.querySelectorAll('.scene');
      this.initObserver();
      this.initParallax();
      this.handleLoading();
      this.initScrollActions();

      // Initialize Content Loading
      ContentLoader.init();

      console.log('Form3D: Experience Initialized');
    },

    initScrollActions() {
      window.addEventListener('scroll', () => {
        const stickyBar = document.querySelector('.sticky-buy-bar');
        if (!stickyBar) return;

        // Show sticky bar after scrolling past the hero (approx 300px)
        if (window.scrollY > 300) {
          stickyBar.classList.add('is-visible');
        } else {
          stickyBar.classList.remove('is-visible');
        }
      }, { passive: true });
    },

    initObserver() {
      const options = {
        threshold: 0.3,
        rootMargin: '0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Handle Theme Switching
            const theme = entry.target.getAttribute('data-scene-theme');
            if (theme) {
              document.body.setAttribute('data-theme', theme);
            } else {
              if (entry.target.id === 'genesis' || entry.target.id === 'contact') {
                document.body.removeAttribute('data-theme');
              }
            }
          }
        });
      }, options);

      this.scenes.forEach(scene => this.observer.observe(scene));
    },

    initParallax() {
      document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        const visuals = document.querySelectorAll('.is-visible .moment-visual img');
        visuals.forEach(img => {
          img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
      });
    },

    handleLoading() {
      window.addEventListener('load', () => {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');

        const firstScene = document.querySelector('.scene');
        if (firstScene) firstScene.classList.add('is-visible');
      });

      // Emergency fallback if load event was missed
      if (document.readyState === 'complete') {
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');
      }
    }
  };

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Experience.init());
  } else {
    Experience.init();
  }

  // Handle re-animation on language change
  window.addEventListener('languagechange', () => {
    // Optional: Refresh any dynamic text if needed
  });

})();
