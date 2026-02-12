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

    // ════════════════════════════════════
    //  HOME & CATALOG BUILDERS
    // ════════════════════════════════════
    buildCatalog() {
      const container = document.getElementById('dynamic-catalog');
      const products = (window.FORM3D_PRODUCTS || []).filter(p => p.active !== false);
      const site = window.FORM3D_SITE || {};

      container.className = 'catalog-grid';
      container.innerHTML = products.map(p => this.catalogCard(p)).join('');

      const footer = document.getElementById('dynamic-footer');
      if (footer) footer.innerHTML = this.homeFooter(site);
    },

    catalogCard(p) {
      return `
        <a href="product/${p.slug}.html" class="catalog-card">
          <div class="catalog-visual">
            <img src="${p.thumbnail || p.heroImage}" alt="${p.name}" loading="lazy">
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

      // Hero Stats
      const sc = document.getElementById('dynamic-hero-stats');
      if (sc && site.heroStats) sc.innerHTML = this.renderHeroStats(site.heroStats);

      // Products
      const pc = document.getElementById('dynamic-products');
      if (pc) products.forEach((p, i) => pc.insertAdjacentHTML('beforeend', this.homeProductSection(p, i)));
      // ... rest of the method (How, Reviews, Trust, etc. remains same)
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
    homeProductSection(p, index) {
      const isRight = p.layout === 'right';
      const theme = this.getTheme(p.theme);
      const themeText = theme.textColor || '#BAE6FD';
      const themeGlow = theme.glow || 'rgba(255,255,255,0.05)';
      const mood = theme.mood || 'bold';

      // Mood-based title styles
      const titleStyle = mood === 'warm'
        ? `color:${themeText}; font-style:italic;`
        : `color:${themeText}; text-transform:uppercase; letter-spacing:-0.03em; font-weight:900;`;

      const i18nT = p.i18n?.title ? `data-i18n="${p.i18n.title}"` : '';
      const i18nS = p.i18n?.subtitle ? `data-i18n="${p.i18n.subtitle}"` : '';
      const i18nC = p.i18n?.cta ? `data-i18n="${p.i18n.cta}"` : '';

      return `
      <section class="scene scene-product scene-${theme.name || 'identity'} ${isRight ? 'layout-right' : 'layout-left'}"
               data-scene-theme="${theme.name || ''}"
               id="product-${p.id}"
               style="--product-glow:${themeGlow}; --product-accent:${themeText};">
        <div class="scene-inner product-grid">

          <!-- IMAGE -->
          <a href="product/${p.slug}.html" class="product-image-col moment-link" aria-label="View ${p.name}">
            <div class="moment-visual product-visual">
              <img src="${p.thumbnail || p.heroImage}" alt="${p.name}"
                   loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
              <div class="visual-overlay"></div>
            </div>
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          </a>

          <!-- TEXT -->
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

            <a href="product/${p.slug}.html" class="btn-experience product-cta" ${i18nC}>View Details →</a>
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


    // ─── SOCIAL PROOF / REVIEWS ────────
    homeReviews(sp) {
      return `
        <p class="section-label">Real Customers</p>
        <h2 class="section-heading">${sp.headline}</h2>
        <div class="reviews-grid">
          ${sp.reviews.map((r, i) => `
            <div class="review-card" style="--review-delay: ${i * 0.12}s">
              <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
              <p class="review-text">"${r.text}"</p>
              <span class="review-name">— ${r.name}</span>
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


    // ─── FOOTER ────────────────────────
    homeFooter(site) {
      return `
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">${site.brand}</span>
            <p class="footer-tagline" data-i18n="footer.tagline">Custom 3D printing, made local.</p>
          </div>
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
    //  PRODUCT PAGE BUILDER
    //  → Reads the slug from the page, finds the product,
    //    and generates a UNIQUE page with its own soul.
    // ════════════════════════════════════
    buildProductPage() {
      const root = document.getElementById('product-page-root');
      if (!root) return;

      const slug = root.getAttribute('data-product-slug');
      const products = window.FORM3D_PRODUCTS || [];
      const site = window.FORM3D_SITE || {};
      const product = products.find(p => p.slug === slug);

      if (!product) {
        root.innerHTML = '<p style="text-align:center;padding:4rem;">Product not found.</p>';
        return;
      }

      const theme = this.getTheme(product.theme);
      const mood = theme.mood || 'bold';
      const base = '../';

      // Set page theme
      document.body.setAttribute('data-theme', theme.name || 'identity');
      document.body.style.backgroundColor = theme.bg || 'var(--bg-deep)';
      document.title = `${product.name} | 3D Forma`;

      // Build full product page
      root.innerHTML = `

        <!-- ═══ HERO ═══ -->
        <!-- ═══ HERO ═══ -->
        <section class="pp-hero scene is-visible" id="hero-image" style="--hero-bg: ${theme.bg};">
          
          <!-- DYNAMIC BACKGROUND SLIDESHOW -->
          <div class="pp-hero-slideshow" id="hero-slideshow">
             <!-- Primary Hero Image -->
             <div class="pp-slide is-active" style="background-image: url('${base}${product.heroImage}');"></div>
             <!-- Gallery Images (First 3 for variety) -->
             ${product.gallery.slice(0, 3).map(img => `
                <div class="pp-slide" style="background-image: url('${base}${img}');"></div>
             `).join('')}
          </div>

          <!-- OVERLAY GRADIENT (For text readability) -->
          <div class="pp-hero-overlay"></div>

          <div class="pp-hero-inner">
            <div class="pp-hero-content">
              ${product.badge ? `<span class="pp-badge">${product.badge}</span>` : ''}
              <h1 class="pp-hero-title moment-title" style="color:${theme.textColor}">${product.name}</h1>
              <p class="pp-hero-subtitle moment-subtitle" style="color: rgba(255,255,255,0.9)">${product.subtitle}</p>
              
              <div class="pp-hero-price-row">
                <div class="pp-hero-price">
                  <span class="pp-price" style="color: #fff">${product.price}</span>
                  ${product.oldPrice ? `<span class="pp-old-price" style="color: rgba(255,255,255,0.6)">${product.oldPrice}</span>` : ''}
                </div>
                <a href="${product.tallyLink || site.whatsapp || '#'}" class="pp-hero-cta btn-primary" id="product-link">Order Now →</a>
              </div>
              
              ${product.priceNote ? `<p class="pp-price-note" style="color: rgba(255,255,255,0.7)">${product.priceNote}</p>` : ''}
            </div>
          </div>
        </section>

        <!-- ═══ TRUST STRIP ═══ -->
        ${product.psychology ? `
        <div class="pp-trust-strip scene is-visible">
          ${product.psychology.urgency ? `<span class="pp-trust-item"><span class="pill-icon">⏱</span> ${product.psychology.urgency}</span>` : ''}
          ${product.psychology.social ? `<span class="pp-trust-item"><span class="pill-icon">👥</span> ${product.psychology.social}</span>` : ''}
          ${product.psychology.trust ? `<span class="pp-trust-item"><span class="pill-icon">✓</span> ${product.psychology.trust}</span>` : ''}
        </div>` : ''}

        <!-- ═══ STORY ═══ -->
        ${product.story ? `
        <section class="pp-story scene">
          <div class="pp-story-inner">
            <h2 class="pp-story-headline" style="color:${theme.textColor}">${product.story.headline}</h2>
            <p class="pp-story-text">${product.story.text}</p>
          </div>
        </section>` : ''}

        <!-- ═══ FEATURES ═══ -->
        ${product.features ? `
        <section class="pp-features scene">
          <div class="pp-features-inner">
            <ul class="pp-feature-list">
              ${product.features.map(f => `
                <li class="pp-feature-item" style="--feat-color: ${theme.textColor}">
                  <span class="pp-feature-check" style="color:${theme.textColor}">✓</span>
                  <span>${f}</span>
                </li>`).join('')}
            </ul>
          </div>
        </section>` : ''}

        <!-- ═══ GALLERY ═══ -->
        <section class="pp-gallery scene" id="pp-gallery-section">
          <div class="pp-gallery-grid" id="product-gallery">
            ${product.gallery.map((img, i) => `
              <div class="pp-gallery-item moment-visual" style="--gal-delay: ${i * 0.06}s">
                <img src="${base}${img}" alt="${product.name} — view ${i + 1}" loading="lazy" decoding="async">
              </div>`).join('')}
          </div>
        </section>

        <!-- ═══ DETAILS ═══ -->
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

        <!-- ═══ AUDIENCE ═══ -->
        ${product.audience ? `
        <section class="pp-audience scene">
          <div class="pp-audience-inner">
            <p class="pp-audience-label">Who It's For</p>
            <p class="pp-audience-text" style="color:${theme.textColor}">${product.audience}</p>
          </div>
        </section>` : ''}

        <!-- ═══ FINAL CTA ═══ -->
        <section class="pp-final-cta scene">
          <div class="pp-final-inner">
            <p class="pp-final-price" id="product-price">${product.price}</p>
            <a href="${product.tallyLink || site.whatsapp || '#'}" class="pp-final-btn btn-primary">Order Now →</a>
            <p class="pp-final-note">You'll be redirected to our order form. We confirm within 24h.</p>
          </div>
        </section>

        <!-- ═══ BACK LINK ═══ -->
        <div class="pp-back">
          <a href="${base}index.html" class="pp-back-link">← Back to all products</a>
        </div>
      `;
    }

  };


  // ── Auto-init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => R.init());
  } else {
    R.init();
  }

  window.FORM3D_RENDERER = R;
})();
