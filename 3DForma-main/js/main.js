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


    /** No-op: sticky bar is now rendered by renderer.js inside the product page root */
    initStickyBarForProductPages() {
      // Renderer injects the sticky bar as part of buildProductPage().
      // Nothing to do here — the scroll toggle in initScrollActions() handles show/hide.
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
