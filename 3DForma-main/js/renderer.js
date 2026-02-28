/**
 * ═══════════════════════════════════════════════════════════
 *  🚀 FORM3D — DYNAMIC RENDERER + PRODUCT PAGE BUILDER
 * ═══════════════════════════════════════════════════════════
 *
 *  This engine reads products.js and builds:
 *    • Homepage product showcase sections
 *    • How-it-Works section
 *    • Social proof / reviews
 *    • Trust badges
 *    • Guarantee banner
 *    • Footer
 *    • FULL product pages (each with unique soul)
 *
 *  You NEVER need to edit this file. Just edit products.js.
 *
 *  PSYCHOLOGY APPLIED:
 *  ───────────────────
 *  1. Primacy Effect     → Best product first = anchors perception
 *  2. Social Proof       → Reviews + customer count
 *  3. Loss Aversion      → "Limited slots" / urgency pills
 *  4. Anchoring           → Price shown after emotional story
 *  5. Reciprocity        → Free guarantee = trust
 *  6. Cognitive Ease     → Clean layout, familiar patterns
 *  7. Serial Position    → CTA repeated at strategic intervals
 *  8. Endowed Progress   → How-it-Works makes process feel started
 *  9. Peak-End Rule      → Guarantee + email at the end = positive last impression
 */

(function () {
  'use strict';

  const R = {

    // ════════════════════════════════════
    //  ENTRY POINT
    // ════════════════════════════════════
    init() {
      const pc = document.getElementById('dynamic-products');
      const cc = document.getElementById('dynamic-catalog');
      const root = document.getElementById('product-page-root');

      if (pc) this.buildHomepage();
      if (cc) this.buildCatalog();
      if (root) this.buildProductPage(root);
    },

    // FIXED: Ensure proper base path detection for GitHub Pages
    getBasePath() {
      // Detect if we're in a product subdirectory
      const path = window.location.pathname;
      if (path.includes('/product/')) {
        return '../';
      }
      return './';
    },

    // ════════════════════════════════════
    //  HOME & CATALOG BUILDERS
    // ════════════════════════════════════
    buildCatalog() {
      const container = document.getElementById('dynamic-catalog');
      const products = (window.FORM3D_PRODUCTS || []).filter(p => p.active !== false);
      const site = window.FORM3D_SITE || {};
      const base = this.getBasePath();

      container.className = 'catalog-grid';
      container.innerHTML = products.map(p => this.catalogCard(p, base)).join('');

      const footer = document.getElementById('dynamic-footer');
      if (footer) footer.innerHTML = this.homeFooter(site);
    },

    catalogCard(p, base) {
      // FIXED: Use consistent relative paths
      const thumb = p.thumbnail || p.heroImage;
      // Ensure no leading slash and proper relative path
      const imgSrc = thumb.startsWith('http') ? thumb : base + thumb;

      return `
        <a href="${base}product/${p.slug}.html" class="catalog-card">
          <div class="catalog-visual">
            <img src="${imgSrc}" alt="${p.name}" loading="lazy">
          </div>
          <div class="catalog-info">
            <div class="catalog-meta">
              <span class="catalog-name">${p.name}</span>
              <span class="catalog-price">${p.price}</span>
            </div>
            <div class="catalog-cta-hint">View →</div>
          </div>
        </a>
      `;
    },

    buildHomepage() {
      const products = (window.FORM3D_PRODUCTS || [])
        .filter(p => p.active !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      const site = window.FORM3D_SITE || {};
      const base = this.getBasePath();

      const sc = document.getElementById('dynamic-hero-stats');
      if (sc && site.heroStats) sc.innerHTML = this.renderHeroStats(site.heroStats);

      const pc = document.getElementById('dynamic-products');
      if (pc) products.forEach((p, i) => pc.insertAdjacentHTML('beforeend', this.homeProductSection(p, i, base)));

      this.finishHomepage(site);
    },

    finishHomepage(site) {
      const hc = document.getElementById('dynamic-how');
      if (hc && site.howItWorks) hc.innerHTML = this.homeHowItWorks(site.howItWorks);

      const rc = document.getElementById('dynamic-reviews');
      if (rc && site.socialProof) rc.innerHTML = this.homeReviews(site.socialProof);

      const tc = document.getElementById('dynamic-trust');
      if (tc && site.trustBadges) tc.innerHTML = this.homeTrust(site.trustBadges);

      const gc = document.getElementById('dynamic-guarantee');
      if (gc && site.guarantee) gc.innerHTML = this.homeGuarantee(site.guarantee);

      const fc = document.getElementById('dynamic-footer');
      if (fc) fc.innerHTML = this.homeFooter(site);
    },

    renderHeroStats(stats) {
      return stats.map(s => `
        <div class="hero-stat">
          <span class="hero-stat-value">${s.value}</span>
          <span class="hero-stat-label">${s.label}</span>
        </div>
      `).join('');
    },

    /** Helper to get theme object from name or override */
    getTheme(themeInput) {
      if (typeof themeInput === 'string') {
        return window.FORM3D_THEMES?.[themeInput] || window.FORM3D_THEMES?.midnight;
      }
      return themeInput || window.FORM3D_THEMES?.midnight;
    },

    // ─── PRODUCT SECTION (homepage) ────
    homeProductSection(p, index, base) {
      const isRight = p.layout === 'right';
      const theme = this.getTheme(p.theme);
      const themeText = theme.textColor || '#BAE6FD';
      const themeGlow = theme.glow || 'rgba(255,255,255,0.05)';
      const mood = theme.mood || 'bold';

      const titleStyle = mood === 'warm'
        ? `color:${themeText}; font-style:italic;`
        : `color:${themeText}; text-transform:uppercase; letter-spacing:-0.03em; font-weight:900;`;

      const i18nT = p.i18n?.title ? `data-i18n="${p.i18n.title}"` : '';
      const i18nS = p.i18n?.subtitle ? `data-i18n="${p.i18n.subtitle}"` : '';
      const i18nC = p.i18n?.cta ? `data-i18n="${p.i18n.cta}"` : '';

      // FIXED: Proper image path handling
      const imgSrc = (p.thumbnail || p.heroImage).startsWith('http')
        ? (p.thumbnail || p.heroImage)
        : base + (p.thumbnail || p.heroImage);

      return `
      <section class="scene scene-product scene-${theme.name || 'identity'} ${isRight ? 'layout-right' : 'layout-left'}"
               data-scene-theme="${theme.name || ''}"
               id="product-${p.id}"
               style="--product-glow:${themeGlow}; --product-accent:${themeText};">
        <div class="scene-inner product-grid">
          <a href="${base}product/${p.slug}.html" class="product-image-col moment-link" aria-label="View ${p.name}">
            <div class="moment-visual product-visual">
              <img src="${imgSrc}" alt="${p.name}"
                   loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
              <div class="visual-overlay"></div>
            </div>
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          </a>
          <div class="product-text-col">
            <p class="product-tagline">${p.tagline}</p>
            <h2 class="moment-title product-title" ${i18nT} style="${titleStyle}">${p.name}</h2>
            <p class="moment-subtitle product-subtitle" ${i18nS}>${p.subtitle}</p>
            <div class="product-price-row">
              <span class="product-price">${p.price}</span>
              ${p.oldPrice ? `<span class="product-old-price">${p.oldPrice}</span>` : ''}
            </div>
            ${p.psychology ? `
            <div class="product-trust-pills">
              ${p.psychology.urgency ? `<span class="trust-pill"><span class="pill-icon">⏱</span> ${p.psychology.urgency}</span>` : ''}
              ${p.psychology.social ? `<span class="trust-pill"><span class="pill-icon">👥</span> ${p.psychology.social}</span>` : ''}
              ${p.psychology.trust ? `<span class="trust-pill"><span class="pill-icon">✓</span> ${p.psychology.trust}</span>` : ''}
            </div>` : ''}
            <a href="${base}product/${p.slug}.html" class="btn-experience product-cta" ${i18nC}>View Details →</a>
          </div>
        </div>
      </section>`;
    },


    // ─── HOW IT WORKS ──────────────────
    homeHowItWorks(steps) {
      return `
        <p class="section-label">Simple Process</p>
        <h2 class="section-heading" data-i18n="home.steps.title">How It Works</h2>
        <div class="steps-grid">
          ${steps.map((s, i) => `
            <div class="step-card" style="--step-delay: ${i * 0.1}s">
              <span class="step-number">${s.step}</span>
              <h3 class="step-title">${s.title}</h3>
              <p class="step-desc">${s.desc}</p>
            </div>`).join('')}
        </div>`;
    },


    // ─── SOCIAL PROOF / REVIEWS ─────────
    homeReviews(sp) {
      return `
        <p class="section-label">Real Customers</p>
        <h2 class="section-heading">${sp.headline}</h2>
        <div class="reviews-grid">
          ${sp.reviews.map((r, i) => `
            <div class="review-card" style="--review-delay: ${i * 0.12}s">
              <div class="review-stars">${'\u2605'.repeat(r.rating)}${'\u2606'.repeat(5 - r.rating)}</div>
              <p class="review-text">&#8220;${r.text}&#8221;</p>
              <span class="review-name">&#8212; ${r.name}</span>
            </div>`).join('')}
        </div>`;
    },


    // ─── TRUST BADGES ──────────────────
    homeTrust(badges) {
      return `
        <p class="section-label">Why Us</p>
        <h2 class="section-heading" data-i18n="home.trust.title">Why Choose Us</h2>
        <div class="trust-grid">
          ${badges.map((b, i) => `
            <div class="trust-card" style="--trust-delay: ${i * 0.08}s">
              <span class="trust-icon">${b.icon}</span>
              <h3 class="trust-title">${b.title}</h3>
              <p class="trust-desc">${b.desc}</p>
            </div>`).join('')}
        </div>`;
    },


    // ─── GUARANTEE ─────────────────────
    homeGuarantee(g) {
      return `
        <div class="guarantee-card">
          <span class="guarantee-icon">🛡️</span>
          <h3 class="guarantee-title">${g.headline}</h3>
          <p class="guarantee-text">${g.text}</p>
        </div>`;
    },


    // ─── FOOTER ──────────────────
    homeFooter(site) {
      const soc = site.social || {};
      const socialLinks = [
        soc.instagram ? {
          url: soc.instagram, label: 'Instagram', cls: 'social-ig',
          icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
        } : null,
        soc.tiktok ? {
          url: soc.tiktok, label: 'TikTok', cls: 'social-tt',
          icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.85 1.56v-3.4a4.85 4.85 0 0 1-1.07-.16z"/></svg>`
        } : null,
        soc.facebook ? {
          url: soc.facebook, label: 'Facebook', cls: 'social-fb',
          icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
        } : null
      ].filter(Boolean);

      return `
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">${site.brand}</span>
            <p class="footer-tagline" data-i18n="footer.tagline">Custom 3D printing, made local.</p>
          </div>

          ${socialLinks.length > 0 ? `
          <div class="footer-social">
            <p class="footer-social-label">Follow Our Journey</p>
            <div class="footer-social-links">
              ${socialLinks.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer"
                   class="footer-social-btn ${s.cls}" aria-label="Follow us on ${s.label}">
                  ${s.icon}
                  <span>${s.label}</span>
                </a>`).join('')}
            </div>
            <p class="footer-social-hint">See our work, get inspired &amp; stay updated &#10024;</p>
          </div>` : ''}

          <div class="footer-contact">
            <p class="footer-contact-label" data-i18n="order.contact">Questions? Contact us at</p>
            <a href="mailto:${site.email}" class="footer-email">${site.email}</a>
          </div>
          <div class="footer-bottom">
            <p class="footer-copy" data-i18n="footer.copyright">${site.copyright}</p>
          </div>
        </div>`;
    },


    // ════════════════════════════════════
    //  PRODUCT PAGE BUILDER — Premium Edition
    //  Cinematic hero, sticky sidebar, gallery lightbox, emotional layout.
    // ════════════════════════════════════
    buildProductPage() {
      const root = document.getElementById('product-page-root');
      if (!root) return;

      const slug = root.getAttribute('data-product-slug');
      const products = window.FORM3D_PRODUCTS || [];
      const site = window.FORM3D_SITE || {};
      const product = products.find(p => p.slug === slug);

      if (!product) {
        root.innerHTML = '<p style="text-align:center;padding:4rem;color:#666;">Product not found.</p>';
        return;
      }

      const theme = this.getTheme(product.theme);
      const mood = theme.mood || 'bold';
      // FIXED: Always use ../ from product pages
      const base = '../';
      const orderUrl = product.tallyLink || site.whatsapp || '#';
      const isWarm = mood === 'warm';

      document.body.setAttribute('data-theme', theme.name || 'identity');
      document.body.style.backgroundColor = theme.bg || '#0a0a0b';
      document.documentElement.style.setProperty('--hero-glow-color', theme.glow);
      document.title = `${product.name} | 3D Forma`;

      const sideFeatures = (product.features || []).slice(0, 4);

      // FIXED: Image path handling - ensure no double slashes
      const heroImg = product.heroImage.startsWith('http') ? product.heroImage : base + product.heroImage;
      const thumbImg = (product.thumbnail || product.heroImage).startsWith('http')
        ? (product.thumbnail || product.heroImage)
        : base + (product.thumbnail || product.heroImage);

      root.innerHTML = `
        <section class="pp-hero is-visible"
                 style="--hero-bg:${theme.bg}; --hero-glow:${theme.glow};
                        background-image: url('${heroImg}');">
          ${product.heroVideo ? `
          <video class="pp-hero-video" src="${base}${product.heroVideo}" autoplay loop muted playsinline 
                 poster="${heroImg}" preload="metadata" aria-hidden="true"></video>` : ''}
          <div class="pp-hero-inner">
            <div class="pp-hero-text">
              ${product.badge ? `<span class="pp-badge">${product.badge}</span>` : ''}
              <h1 class="pp-hero-title moment-title" style="color:${theme.textColor}; ${isWarm ? 'font-style:italic;' : 'text-transform:uppercase; letter-spacing:-0.04em;'}">${product.name}</h1>
              <p class="pp-hero-subtitle moment-subtitle">${product.subtitle}</p>
              <div class="pp-hero-ctas">
                <a href="${orderUrl}" class="pp-hero-cta btn-primary" id="product-link">Order Now &nbsp;→</a>
                <button class="pp-hero-cta-secondary" onclick="document.getElementById('pp-gallery-section').scrollIntoView({behavior:'smooth'})">Explore Gallery ↓</button>
              </div>
              ${product.priceNote ? `<p class="pp-price-note">${product.priceNote}</p>` : ''}
            </div>
            <div class="pp-hero-price-card">
              <p class="pp-price-card-label">Starting from</p>
              <p class="pp-price" style="color:${theme.textColor}">${product.price}</p>
              ${product.oldPrice ? `<p class="pp-old-price">${product.oldPrice}</p>` : ''}
              <a href="${orderUrl}" class="pp-price-card-btn" id="product-link-card">Order Now →</a>
              <p class="pp-price-card-note">Handmade locally &bull; Ready in 3–5 days</p>
            </div>
          </div>
        </section>
        ${product.psychology ? `
        <div class="pp-trust-strip is-visible">
          ${product.psychology.urgency ? `<span class="pp-trust-item"><span>⏱</span> ${product.psychology.urgency}</span>` : ''}
          ${product.psychology.social ? `<span class="pp-trust-item"><span>👥</span> ${product.psychology.social}</span>` : ''}
          ${product.psychology.trust ? `<span class="pp-trust-item"><span>✓</span>  ${product.psychology.trust}</span>` : ''}
          <span class="pp-trust-item"><span>🏠</span> Made locally in Sweden</span>
          <span class="pp-trust-item"><span>🎁</span> Gift-ready packaging</span>
        </div>` : ''}
        <div class="pp-content-layout">
          <div class="pp-main-col">
            <section class="pp-gallery scene" id="pp-gallery-section">
              <p class="pp-gallery-heading">Gallery</p>
              <div class="pp-gallery-grid" id="product-gallery">
                ${product.gallery.map((img, i) => {
        const imgPath = img.startsWith('http') ? img : base + img;
        return `
                  <div class="pp-gallery-item" data-index="${i}" onclick="FORM3D_RENDERER.openLightbox(${i})">
                    <img src="${imgPath}" alt="${product.name} — view ${i + 1}" loading="${i > 3 ? 'lazy' : 'eager'}" decoding="async">
                  </div>`;
      }).join('')}
              </div>
            </section>
            ${this.renderVideo(product.video, base, theme.textColor)}
            ${product.story ? `
            <section class="pp-story scene" id="pp-story">
              <div class="pp-story-inner">
                <p class="pp-story-eyebrow">The Story</p>
                <h2 class="pp-story-headline" style="color:${theme.textColor}">${product.story.headline}</h2>
                <p class="pp-story-text">${product.story.text}</p>
              </div>
            </section>` : ''}
            ${product.features && product.features.length ? `
            <section class="pp-features scene">
              <div class="pp-features-inner">
                <p class="pp-story-eyebrow">What You Get</p>
                <ul class="pp-feature-list">
                  ${product.features.map(f => `
                    <li class="pp-feature-item" style="--feat-check-color:${theme.textColor}">
                      <span class="pp-feature-check" style="color:${theme.textColor}">✓</span>
                      <span>${f}</span>
                    </li>`).join('')}
                </ul>
              </div>
            </section>` : ''}
            ${product.details && product.details.length ? `
            <section class="pp-details scene">
              <div class="pp-details-inner">
                ${product.details.map(d => `
                  <div class="pp-detail-block">
                    <h3 class="pp-detail-title" style="color:${theme.textColor}">${d.title}</h3>
                    <p class="pp-detail-text">${d.text}</p>
                  </div>`).join('')}
              </div>
            </section>` : ''}
            ${product.audience ? `
            <section class="pp-audience scene">
              <div class="pp-audience-inner">
                <span class="pp-audience-label">Who it's for</span>
                <p class="pp-audience-text" style="color:${theme.textColor}">${product.audience}</p>
              </div>
            </section>` : ''}
          </div>
          <div class="pp-sidebar-col" aria-label="Quick purchase">
            <div class="pp-sidebar-card">
              <p class="pp-sidebar-title">${product.name}</p>
              <p class="pp-sidebar-price" style="color:${theme.textColor}">${product.price}</p>
              ${product.priceNote ? `<p class="pp-sidebar-note">${product.priceNote}</p>` : ''}
              ${sideFeatures.length ? `
              <ul class="pp-sidebar-features" aria-label="Key features">
                ${sideFeatures.map(f => `<li class="pp-sidebar-feature" style="--feat-check-color:${theme.textColor}">${f}</li>`).join('')}
              </ul>` : ''}
              <a href="${orderUrl}" class="pp-sidebar-cta" id="sidebar-order-btn">Order this product →</a>
              <p class="pp-sidebar-social-proof">🏠 Made in Sweden &nbsp;·&nbsp; ⭐ 5-star rated</p>
            </div>
          </div>
        </div>
        <section class="pp-final-cta scene">
          <div class="pp-final-inner">
            <p class="pp-final-eyebrow">Ready to Order?</p>
            <p class="pp-final-price" style="color:${theme.textColor}" id="product-price">${product.price}</p>
            ${product.priceNote ? `<p class="pp-final-price-note">${product.priceNote}</p>` : ''}
            <a href="${orderUrl}" class="pp-final-btn btn-primary" id="final-order-btn">Order Now &nbsp;→</a>
            <p class="pp-final-note">
              You'll fill a short order form. We confirm &amp; get started within 24h.<br>
              <a href="${base}index.html">← See all products</a>
            </p>
          </div>
        </section>
        <div class="sticky-buy-bar" id="sticky-bar" aria-label="Purchase bar">
          <div class="sticky-buy-info">
            <span class="sticky-buy-label">${product.name}</span>
            <span class="sticky-buy-price" style="color:${theme.textColor}">${product.price}</span>
          </div>
          <a href="${orderUrl}" class="btn-buy-sticky" id="sticky-order-btn">Order →</a>
        </div>
        <div class="pp-lightbox" id="pp-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onclick="if(event.target===this) FORM3D_RENDERER.closeLightbox()">
          <button class="pp-lightbox-close" onclick="FORM3D_RENDERER.closeLightbox()" aria-label="Close">✕</button>
          <button class="pp-lightbox-nav pp-lightbox-prev" onclick="FORM3D_RENDERER.lightboxNav(-1)" aria-label="Previous">‹</button>
          <img class="pp-lightbox-img" id="pp-lightbox-img" src="" alt="Product image">
          <button class="pp-lightbox-nav pp-lightbox-next" onclick="FORM3D_RENDERER.lightboxNav(1)" aria-label="Next">›</button>
        </div>
      `;

      // FIXED: Store full paths for lightbox
      this._lightboxImages = product.gallery.map(img => img.startsWith('http') ? img : base + img);
      this._lightboxIndex = 0;

      if (product.heroVideo) {
        const vid = root.querySelector('.pp-hero-video');
        if (vid) {
          const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const isSlow = conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');

          if (prefersReduced || isSlow) {
            vid.remove();
          } else {
            vid.play().catch(err => console.log("Hero video autoplay prep:", err));
          }
        }
      }
    },


    // ─── LIGHTBOX CONTROLS ───────────────
    openLightbox(index) {
      this._lightboxIndex = index;
      const lb = document.getElementById('pp-lightbox');
      const img = document.getElementById('pp-lightbox-img');
      if (!lb || !img) return;
      img.src = this._lightboxImages[index];
      img.alt = `Product image ${index + 1}`;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
      const lb = document.getElementById('pp-lightbox');
      if (lb) lb.classList.remove('is-open');
      document.body.style.overflow = '';
    },

    lightboxNav(dir) {
      const total = this._lightboxImages.length;
      this._lightboxIndex = (this._lightboxIndex + dir + total) % total;
      const img = document.getElementById('pp-lightbox-img');
      if (img) img.src = this._lightboxImages[this._lightboxIndex];
    },

    // ─── VIDEO PLAYER HELPER ─────────────
    renderVideo(videoSrc, base, themeColor) {
      if (!videoSrc) return '';
      const isYouTube = videoSrc.includes('youtu');
      const isTikTok = videoSrc.includes('tiktok');
      const isExternal = isYouTube || isTikTok;

      let embedUrl = videoSrc;
      if (isYouTube) {
        embedUrl = videoSrc
          .replace('watch?v=', 'embed/')
          .replace('youtu.be/', 'youtube.com/embed/')
          .split('&')[0];
        embedUrl += '?autoplay=0&rel=0&modestbranding=1';
      }

      return `
        <section class="pp-video scene">
          <p class="pp-video-heading" style="color:${themeColor}">Watch It Come to Life</p>
          ${isExternal ? `
            <div class="pp-video-embed${isTikTok ? ' is-tiktok' : ''}">
              <iframe
                src="${embedUrl}"
                title="Product Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>` : `
            <div class="pp-video-local">
              <video
                src="${base}${videoSrc}"
                controls preload="metadata" playsinline
                class="pp-video-el"
              ></video>
            </div>`
        }
        </section>`;
    },
  };



  // ── Auto-init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => R.init());
  } else {
    R.init();
  }

  window.FORM3D_RENDERER = R;
})();
