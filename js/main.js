/**
 * ═══════════════════════════════════════════════════════════
 *  FORM3D — EXPERIENCE ENGINE
 *  Handles: scroll reveals, parallax, sticky bar,
 *           theme switching, smooth scroll, loading states
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  const Experience = {
    observer: null,

    init() {
      this.initObserver();
      this.initParallax();
      this.handleLoading();
      this.initScrollActions();
      this.initSmoothScrollLinks();
      this.initStickyBarForProductPages();
      this.initHeroSlideshow();
      this.initGalleryInnovation();
    },

    /** 
     *  INNOVATION: 
     *  1. Magnetic Gallery Items (follow cursor slighty)
     *  2. FLIP Lightbox (seamless expansion)
     */
    initGalleryInnovation() {
      const gallery = document.getElementById('product-gallery');
      if (!gallery) return;

      // 1. Magnetic Hover
      const items = gallery.querySelectorAll('.pp-gallery-item');
      items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Sensitive movement
          item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
          item.classList.add('is-magnetic');
        });

        item.addEventListener('mouseleave', () => {
          item.style.transform = '';
          setTimeout(() => item.classList.remove('is-magnetic'), 300);
        });

        // 2. Lightbox Trigger
        item.addEventListener('click', (e) => {
          e.preventDefault(); // prevent navigation if link
          const img = item.querySelector('img');
          if (img) this.openLightbox(img);
        });
      });
    },

    openLightbox(sourceImg) {
      // Create Lightbox Container
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';

      // Clone Image for FLIP animation
      const clone = sourceImg.cloneNode();
      clone.className = 'lightbox-img';

      // Initial Position (FLIP - First)
      const rect = sourceImg.getBoundingClientRect();

      // Set initial styles to match source
      Object.assign(clone.style, {
        position: 'fixed',
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: '3000',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        objectFit: 'contain'
      });

      overlay.appendChild(clone);
      document.body.appendChild(overlay);

      // Force reflow
      requestAnimationFrame(() => {
        overlay.classList.add('is-open');
        // Target State (FLIP - Last)
        Object.assign(clone.style, {
          top: '50%',
          left: '50%',
          width: 'auto',
          height: 'auto',
          maxWidth: '90vw',
          maxHeight: '90vh',
          transform: 'translate(-50%, -50%)'
        });
      });

      // Close Handler
      const close = () => {
        overlay.classList.remove('is-open');
        const newRect = sourceImg.getBoundingClientRect();

        Object.assign(clone.style, {
          top: `${newRect.top}px`,
          left: `${newRect.left}px`,
          width: `${newRect.width}px`,
          height: `${newRect.height}px`,
          transform: 'translate(0, 0)',
          maxWidth: 'none',
          maxHeight: 'none'
        });

        setTimeout(() => {
          if (document.body.contains(overlay)) document.body.removeChild(overlay);
        }, 500);
      };

      overlay.onclick = close;
      // Escape key close
      document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', escapeHandler);
        }
      });
    },


    /** Dynamic Hero Slideshow (Ken Burns Effect) */
    initHeroSlideshow() {
      const slideshow = document.getElementById('hero-slideshow');
      if (!slideshow) return;

      const slides = slideshow.querySelectorAll('.pp-slide');
      if (slides.length <= 1) return;

      let current = 0;
      setInterval(() => {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
      }, 5000); // Switch every 5 seconds
    },


    /** IntersectionObserver — scroll reveal + theme switching */
    initObserver() {
      const options = {
        threshold: 0.05,
        rootMargin: '0px 0px -10% 0px'
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            // Theme switching on homepage
            const theme = entry.target.getAttribute('data-scene-theme');
            if (theme) {
              document.body.setAttribute('data-theme', theme);
            } else {
              const id = entry.target.id;
              if (['genesis', 'contact', 'how-it-works', 'why-us', 'reviews', 'guarantee'].includes(id)) {
                document.body.removeAttribute('data-theme');
              }
            }
          }
        });
      }, options);

      // Observe all scenes (including those added by renderer.js)
      this.observeAllScenes();
    },

    /** Observe/re-observe all .scene elements */
    observeAllScenes() {
      const scenes = document.querySelectorAll('.scene');
      scenes.forEach(scene => {
        if (!scene.classList.contains('is-observed')) {
          this.observer.observe(scene);
          scene.classList.add('is-observed');
        }
      });
    },


    /** Subtle parallax (desktop only, pointer: fine) */
    initParallax() {
      if (!window.matchMedia('(pointer: fine)').matches) return;

      document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;

        // Content parallax (subtle)
        const visuals = document.querySelectorAll('.is-visible .moment-visual img, .is-visible .product-visual img');
        visuals.forEach(img => {
          img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
        });

        // Cinematic Hero Parallax (stronger)
        const heroImg = document.getElementById('parallax-hero-img');
        if (heroImg) {
          heroImg.style.transform = `scale(1.1) translate(${x * 0.5}px, ${y * 0.5}px)`;
        }
      });
    },


    /** Sticky buy bar (product pages) */
    initScrollActions() {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const bar = document.querySelector('.sticky-buy-bar');
            if (bar) {
              bar.classList.toggle('is-visible', window.scrollY > 400);
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },


    /** Auto-create sticky bar on product pages */
    initStickyBarForProductPages() {
      const root = document.getElementById('product-page-root');
      if (!root) return;

      const slug = root.getAttribute('data-product-slug');
      const products = window.FORM3D_PRODUCTS || [];
      const site = window.FORM3D_SITE || {};
      const product = products.find(p => p.slug === slug);
      if (!product) return;

      const orderText = (window.I18n && window.I18n.getTranslation(product.i18n?.cta))
        || 'Order Now';

      const bar = document.createElement('div');
      bar.className = 'sticky-buy-bar';
      bar.innerHTML = `
        <div class="sticky-buy-info">
          <span class="sticky-buy-label">${product.name}</span>
          <span class="sticky-buy-price">${product.price}</span>
        </div>
        <a href="${product.tallyLink || site.whatsapp || '#'}" class="btn-buy-sticky">${orderText}</a>
      `;
      document.body.appendChild(bar);
    },


    /** Smooth scroll for anchor links */
    initSmoothScrollLinks() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },


    /** Loading state manager */
    handleLoading() {
      const reveal = () => {
        if (document.body.classList.contains('is-ready')) return;
        document.body.classList.remove('is-loading');
        document.body.classList.add('is-ready');

        // Reveal already present scenes
        const scenes = document.querySelectorAll('.scene');
        scenes.forEach(s => {
          if (s.getBoundingClientRect().top < window.innerHeight) {
            s.classList.add('is-visible');
          }
        });

        setTimeout(() => this.observeAllScenes(), 200);
      };

      // Reveal faster on DOMContentLoaded, don't wait for massive images to finish
      document.addEventListener('DOMContentLoaded', reveal);
      window.addEventListener('load', reveal); // Fallback

      // Immediate if already past DOMContentLoaded
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        reveal();
      }
    }
  };


  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Experience.init());
  } else {
    Experience.init();
  }

})();
