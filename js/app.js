/* ============================================
   HSIAH「夏」— Main Script
   ============================================ */

(function () {
  'use strict';

  const ROUTE_IDS = [
    'home',
    'products',
    'cart',
    'featured',
    'about',
    'project-mengqi',
    'project-huangyan',
    'project-echoes',
    'project-skopein',
    'project-tarantella',
  ];

  const FEATURED_DIR = 'photos/FEATURED/';

  const FEATURED_PHOTOS = [
    'Stalagmite_Installation_Performance_Chen_Lin.webp',
    '17.23_Magazine_Onyx_Photoshoot(2).webp',
    '17.23_Magazine_Onyx_Photoshoot.webp',
    '0159_1_Year_Anniversary_Collaboration.webp',
    '0159_1_Year_Anniversary_Collaboration(1).webp',
    'Prosienta_Photoshoot.webp',
    'Prosienta_Photoshoot(1).webp',
    '17.23_Magazine_Onyx_Photoshoot(1).webp',
    'Stalagmite_Installation_Performance_Chen_Lin(1).webp',
    'Stalagmite_Installation_Performance_Chen_Lin(2).webp',
  ];

  function getFeaturedColumnCount() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 920) return 2;
    if (w <= 1024) return 3;
    return 4;
  }

  /** Column-first DOM order so masonry reads left-to-right, row-by-row. */
  function reorderForMasonryColumns(items, cols) {
    if (cols <= 1) return items.slice();
    const n = items.length;
    const rows = Math.ceil(n / cols);
    const ordered = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const i = r * cols + c;
        if (i < n) ordered.push(items[i]);
      }
    }
    return ordered;
  }

  function formatFeaturedCaption(filename) {
    const base = filename.replace(/\.[^.]+$/, '').replace(/\(\d+\)$/, '');
    return base.replace(/_/g, ' ');
  }

  /* ---- Product Data (price values are HKD) ---- */

  const HKD_PER_GBP = 9.85;

  const PRODUCTS = [
    {
      slug: 'embroidered-logo-tee',
      name: 'Embroidered Logo Tee - Black',
      price: 398,
      stanza: 'stanza-i',
      img: 'photos/shopphotos/placeholderEmbroidered Logo Tee - Black .png',
      color: '#161615',
      details: ['Relaxed Unisex Fit', 'Embroidered Logo', 'All-over Fade'],
      information: ['100% Cotton'],
      sizes: [
        { label: 'S', stock: 30 },
        { label: 'M', stock: 50 },
        { label: 'L', stock: 20 },
      ],
      sizeGuide: {
        columns: ['S', 'M', 'L'],
        rows: [
          { label: 'FRONT CHEST', values: ['61CM', '63CM', '65CM'] },
          { label: 'LENGTH', values: ['62CM', '64CM', '66CM'] },
          { label: 'SLEEVE LENGTH', values: ['20.4CM', '21.2CM', '22CM'] },
          { label: 'SHOULDER', values: ['51CM', '52.5CM', '54CM'] },
        ],
      },
    },
    {
      slug: 'bodycon-logo-tank',
      name: 'Bodycon Logo Tank Top - Black/ Anthracite',
      price: 298,
      stanza: 'stanza-i',
      img: 'photos/shopphotos/placeholderBodycon Logo Tank Top.png',
      color: '#565657',
      details: ['Snow Washed Faded Details', 'DTG Printed Logo', 'Bodycon Fit', 'Slightly Cropped'],
      information: ['93.2% 315GSM Cotton', '6.8% Spandex'],
      sizes: [
        { label: 'S', stock: 15 },
        { label: 'M', stock: 10 },
        { label: 'L', stock: 5 },
      ],
      sizeGuide: {
        columns: ['S', 'M', 'L'],
        rows: [
          { label: 'FRONT CHEST', values: ['33CM', '35CM', '37CM'] },
          { label: 'LENGTH', values: ['43CM', '45CM', '47CM'] },
        ],
      },
    },
    {
      slug: 'chaotic-totem-bandana',
      name: 'Chaotic Totem Silk Bandana - Black/ Red',
      price: 298,
      stanza: 'stanza-i',
      img: 'photos/shopphotos/placeholderChaotic Totem Silk Bandana.png',
      color: '#747259',
      details: ['Oversized Bandana (57cm x 57cm)', 'Signature Totem Print Design'],
      information: ['100% Silk'],
      sizes: [{ label: 'FREE SIZE', stock: 50 }],
      sizeGuide: {
        columns: ['FREE SIZE'],
        rows: [
          { label: 'WIDTH', values: ['57CM'] },
          { label: 'LENGTH', values: ['57CM'] },
        ],
      },
    },
    {
      slug: 'teardrop-jeans',
      name: 'A FOOL WHO PAINTS TEARDROPS Jeans - Black',
      price: 1598,
      stanza: 'stanza-i',
      img: 'photos/shopphotos/placeholderA FOOL WHO PAINTS TEARDROPS Jeans.png',
      color: '#161615',
      details: [
        'Chunky Waistband Design',
        'Signature Asymmetrical and Slanted Back Pockets',
        'Signature Teardrop Silhouette',
        'Front Slant Pockets',
        'Hidden Button Closure',
      ],
      information: ['100% Cotton', '14oZ Denim'],
      sizes: [
        { label: 'XS', stock: 5 },
        { label: 'S', stock: 10 },
        { label: 'M', stock: 20 },
        { label: 'L', stock: 10 },
        { label: 'XL', stock: 5 },
      ],
      sizeGuide: {
        columns: ['XS', 'S', 'M', 'L', 'XL'],
        rows: [
          { label: 'WAIST', values: ['70CM', '75CM', '80CM', '85CM', '90CM'] },
          { label: 'LENGTH', values: ['96CM', '101CM', '106CM', '111CM', '116CM'] },
          { label: 'HIPS', values: ['103CM', '107CM', '111CM', '115CM', '119CM'] },
        ],
      },
    },
  ];

  const CART_STORAGE_KEY = 'hsiah-cart';

  const SHOP_SECTIONS = [
    {
      stanza: 'stanza-i',
      titleKey: 'shop.stanzaI',
      title: 'STANZA I SUMMER COLLECTION',
    },
  ];

  const i18n = window.HSIAH_I18N;
  const CURRENCY_STORAGE_KEY = 'hsiah-currency';
  let currentLocale = i18n ? i18n.getStoredLocale() : 'en';
  let currentCurrency = 'hk';

  function getStoredCurrency() {
    try {
      const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored === 'hk' || stored === 'uk') return stored;
    } catch (_) { /* ignore */ }
    return 'hk';
  }

  function setStoredCurrency(code) {
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, code);
    } catch (_) { /* ignore */ }
  }

  /* ---- DOM Cache ---- */

  const GATE_STORAGE_KEY = 'hsiah_gate_ok';
  const GATE_HASH = 'f891fff91bc7ac4e18deb84372b2dcab913d56fd882e7364a7b7aaadab0abe6e';

  const dom = {
    loader:            document.getElementById('loader'),
    gate:              document.getElementById('gate'),
    gateForm:          document.getElementById('gateForm'),
    gateInput:         document.getElementById('gateInput'),
    gateError:         document.getElementById('gateError'),
    heroVideo:         document.getElementById('heroVideo'),
    nav:               document.getElementById('nav'),
    menuBtn:           document.getElementById('menuBtn'),
    menu:              document.getElementById('menu'),
    projectLightbox:   document.getElementById('projectLightbox'),
    scrollWrap:        document.getElementById('scrollWrap'),
    shopSections:      document.getElementById('shopSections'),
    productDetail:     document.getElementById('productDetail'),
    cartContent:       document.getElementById('cartContent'),
    cartBagCount:      document.getElementById('cartBagCount'),
    featuredGrid:      document.getElementById('featuredGrid'),
    waitlistForm:      document.getElementById('waitlistForm'),
    contactForm:       document.getElementById('contactForm'),
    aboutContactForm:  document.getElementById('aboutContactForm'),
  };

  let currentPage   = 'home';
  let menuOpen       = false;
  let lightboxScrollEl = null;

  function isProjectPage(page) {
    return typeof page === 'string' && page.startsWith('project-');
  }

  function isProductRoute(page) {
    return typeof page === 'string' && page.startsWith('product-');
  }

  function getProductSlugFromRoute(page) {
    return isProductRoute(page) ? page.slice('product-'.length) : null;
  }

  function getProductBySlug(slug) {
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }

  function resolveRoute(hash) {
    if (!hash) return 'home';
    if (ROUTE_IDS.includes(hash)) return hash;
    const slug = hash.startsWith('product-') ? hash.slice('product-'.length) : null;
    if (slug && getProductBySlug(slug)) return hash;
    return 'home';
  }

  function getPageElement(page) {
    if (isProductRoute(page)) return document.querySelector('.page[data-page="product"]');
    return document.querySelector(`.page[data-page="${page}"]`);
  }

  function updateScrollMode(page) {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }

    const project = isProjectPage(page);
    if (project && window.innerWidth >= 1024) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = '';
      document.body.style.overflow = '';
    }
  }

  function t(key) {
    if (!i18n) return null;
    return i18n.t(key, currentLocale);
  }

  function hkdToGbp(hkd) {
    return Math.round(hkd / HKD_PER_GBP);
  }

  function formatProductPrice(hkd) {
    if (currentCurrency === 'uk') {
      return `£${hkdToGbp(hkd).toLocaleString('en-GB')}`;
    }
    return `HK$${hkd.toLocaleString('en-HK')}`;
  }

  function updateProductPrices() {
    document.querySelectorAll('[data-price-hkd]').forEach((el) => {
      const hkd = Number(el.dataset.priceHkd);
      if (!Number.isNaN(hkd)) el.textContent = formatProductPrice(hkd);
    });
  }

  function updateCurrencyNavLabel() {
    if (!i18n) return;
    const currencyKey = currentCurrency === 'uk' ? 'nav.currency.uk' : 'nav.currency.hk';
    const currencyLabel = document.querySelector('[data-util="currency"] .nav__dropdown-trigger span');
    if (currencyLabel) {
      currencyLabel.dataset.i18n = currencyKey;
      currencyLabel.textContent = i18n.t(currencyKey, currentLocale);
    }
  }

  function applyCurrency() {
    updateCurrencyNavLabel();
    updateProductPrices();
    if (currentPage === 'products') renderProducts();
    if (currentPage === 'cart') renderCart();
    const slug = getProductSlugFromRoute(currentPage);
    if (slug) renderProductDetail(slug);
    syncMenuUtilActiveState();
  }

  function setUtilTriggerText(trigger, label) {
    if (!trigger || label == null) return;
    const labelEl = trigger.querySelector('span');
    if (labelEl) {
      labelEl.textContent = label;
      return;
    }
    const chevron = trigger.querySelector('.nav__chevron');
    trigger.textContent = label + ' ';
    if (chevron) trigger.appendChild(chevron);
  }

  function applyLocale(locale) {
    if (!i18n) return;

    currentLocale = i18n.normalizeLocale(locale);
    i18n.setStoredLocale(currentLocale);
    document.documentElement.lang = currentLocale === 'en' ? 'en' : currentLocale;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = i18n.t(el.dataset.i18n, currentLocale);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const val = i18n.t(el.dataset.i18nHtml, currentLocale);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const val = i18n.t(el.dataset.i18nPlaceholder, currentLocale);
      if (val != null) el.placeholder = val;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const val = i18n.t(el.dataset.i18nAria, currentLocale);
      if (val != null) el.setAttribute('aria-label', val);
    });

    const langLabel = document.getElementById('langTriggerLabel');
    if (langLabel) {
      const langKey = currentLocale === 'zh-Hant'
        ? 'nav.lang.zhHant'
        : currentLocale === 'zh-Hans'
          ? 'nav.lang.zhHans'
          : 'nav.lang.en';
      langLabel.dataset.i18n = langKey;
      langLabel.textContent = i18n.t(langKey, currentLocale);
    }

    updateCurrencyNavLabel();
    updateProductPrices();
    if (currentPage === 'products') renderProducts();
    if (currentPage === 'cart') renderCart();
    const productSlug = getProductSlugFromRoute(currentPage);
    if (productSlug) renderProductDetail(productSlug);
    if (currentPage === 'featured') renderFeatured();
    updateCartBadge();
    updateFeaturedCaptions();
    syncMenuUtilActiveState();
  }

  function updateFeaturedCaptions() {
    if (!i18n || !dom.featuredGrid) return;
    dom.featuredGrid.querySelectorAll('.featured-masonry__caption').forEach((el) => {
      const key = el.dataset.i18nKey;
      if (key) {
        const val = i18n.t(key, currentLocale);
        if (val != null) el.textContent = val;
      }
    });
  }

  function setLocale(locale) {
    applyLocale(locale);
  }

  function resetPageScroll(pageEl) {
    window.scrollTo(0, 0);
    dom.scrollWrap.style.transform = '';
    const scrollEl = pageEl && pageEl.querySelector('.project-layout__scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
  }

  /* ============================================
     LOADER
     ============================================ */

  function dismissLoader() {
    dom.loader.classList.add('loaded');
  }

  /* ============================================
     SITE GATE
     ============================================ */

  function isGateUnlocked() {
    try {
      return sessionStorage.getItem(GATE_STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function unlockGate() {
    try {
      sessionStorage.setItem(GATE_STORAGE_KEY, '1');
    } catch (_) { /* ignore */ }
  }

  async function digestGateInput(value) {
    const data = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  function showGate() {
    if (!dom.gate) return;
    dom.gate.classList.add('active');
    dom.gate.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gate-open');
    dom.gateInput?.focus();
  }

  function hideGate() {
    if (!dom.gate) return;
    dom.gate.classList.remove('active');
    dom.gate.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gate-open');
  }

  function initGate() {
    if (!dom.gateForm || isGateUnlocked()) return;

    dom.gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = dom.gateInput.value;
      const hash = await digestGateInput(input);

      if (hash === GATE_HASH) {
        unlockGate();
        dom.gateError.hidden = true;
        hideGate();
        return;
      }

      dom.gateError.hidden = false;
      dom.gateInput.value = '';
      dom.gateInput.focus();
    });
  }

  function finishLoaderSequence() {
    dismissLoader();
    if (!isGateUnlocked()) {
      showGate();
    }
  }

  /* ============================================
     HERO VIDEO (random tv1-4)
     ============================================ */

  function initHeroVideo() {
    const videos = ['photos/tv1.mp4', 'photos/tv2.mp4', 'photos/tv3.mp4', 'photos/tv4.mp4'];
    const pick = videos[Math.floor(Math.random() * videos.length)];
    if (dom.heroVideo) {
      dom.heroVideo.src = pick;
      dom.heroVideo.load();
    }
  }

  /* ============================================
     ROUTER / PAGE TRANSITIONS
     ============================================ */

  function navigate(page) {
    if (page === currentPage) return;

    if (menuOpen) toggleMenu();
    closeNavDropdowns();

    showPage(page);
  }

  function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    const target = getPageElement(page);
    if (!target) return;

    target.style.display = 'block';
    target.classList.add('active');
    currentPage = page;
    window.location.hash = page;

    closeProjectLightbox();

    if (page === 'products') renderProducts();
    if (page === 'cart') renderCart();
    const slug = getProductSlugFromRoute(page);
    if (slug) renderProductDetail(slug);
    if (page === 'featured') renderFeatured();

    resetPageScroll(target);
    updateScrollMode(page);
    observeReveals();
  }

  /* ============================================
     NAV DROPDOWNS
     ============================================ */

  function closeNavDropdowns(except) {
    document.querySelectorAll('.nav__dropdown.open').forEach(dropdown => {
      if (dropdown !== except) {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.nav__dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initNavDropdowns() {
    document.querySelectorAll('.nav__dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav__dropdown-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        closeNavDropdowns();
        dropdown.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });

      dropdown.querySelectorAll('.nav__dropdown-link').forEach(item => {
        item.addEventListener('click', () => {
          if (item.tagName === 'BUTTON' && dropdown.classList.contains('nav__dropdown--util')) {
            if (item.dataset.lang) {
              setLocale(item.dataset.lang);
            } else if (item.dataset.currency) {
              currentCurrency = item.dataset.currency;
              setStoredCurrency(currentCurrency);
              applyCurrency();
            } else {
              setUtilTriggerText(trigger, item.textContent.trim());
            }
          }
          closeNavDropdowns();
        });
      });
    });

    document.addEventListener('click', () => closeNavDropdowns());
  }

  /* ============================================
     MENU
     ============================================ */

  function closeMenuPanels() {
    document.querySelectorAll('.menu__group.is-open').forEach((group) => {
      group.classList.remove('is-open');
      const toggle = group.querySelector('.menu__toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
    dom.menuBtn.classList.toggle('active', menuOpen);
    dom.menu.classList.toggle('active', menuOpen);
    dom.menuBtn.setAttribute('aria-expanded', String(menuOpen));
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) closeMenuPanels();
    updateScrollMode(currentPage);
  }

  function initMenuAccordions() {
    document.querySelectorAll('.menu__toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const group = toggle.closest('.menu__group');
        if (!group) return;
        const willOpen = !group.classList.contains('is-open');
        group.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
      });
    });
  }

  function initMenuUtils() {
    document.querySelectorAll('.menu__option[data-currency]').forEach((btn) => {
      btn.addEventListener('click', () => {
        currentCurrency = btn.dataset.currency;
        setStoredCurrency(currentCurrency);
        applyCurrency();
        syncMenuUtilActiveState();
      });
    });

    document.querySelectorAll('.menu__option[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLocale(btn.dataset.lang);
        syncMenuUtilActiveState();
      });
    });

    syncMenuUtilActiveState();
  }

  function syncMenuUtilActiveState() {
    document.querySelectorAll('.menu__option[data-currency]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.currency === currentCurrency);
    });
    document.querySelectorAll('.menu__option[data-lang]').forEach((btn) => {
      btn.classList.toggle('is-active', i18n && i18n.normalizeLocale(btn.dataset.lang) === currentLocale);
    });
  }

  /* ============================================
     PRODUCTS RENDER
     ============================================ */

  function productCardHtml(p, i) {
    return `
      <a class="product-card" href="#product-${p.slug}" data-page="product-${p.slug}" style="animation-delay:${i * 0.06}s">
        <div class="product-card__img" style="background-color:${p.color}; background-image:url('${p.img}')"></div>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__price" data-price-hkd="${p.price}">${formatProductPrice(p.price)}</p>
      </a>
    `;
  }

  function sizeGuideTableHtml(guide) {
    if (!guide?.rows?.length) return '';
    const cols = guide.columns || [];
    return `
      <table class="pdp-size-guide__table">
        <thead>
          <tr>
            <th scope="col"></th>
            ${cols.map((c) => `<th scope="col">${c}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${guide.rows.map((row) => `
            <tr>
              <th scope="row">${row.label}</th>
              ${row.values.map((v) => `<td>${v}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (_) { /* ignore */ }
  }

  function getCartTotalQuantity() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
  }

  function updateCartBadge() {
    if (!dom.cartBagCount) return;
    const count = getCartTotalQuantity();
    dom.cartBagCount.textContent = count > 99 ? '99+' : String(count);
    dom.cartBagCount.hidden = count < 1;
  }

  function addToCart(slug, size, quantity) {
    const cart = getCart();
    const existing = cart.find((item) => item.slug === slug && item.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ slug, size, quantity, addedAt: Date.now() });
    }
    saveCart(cart);
    updateCartBadge();
  }

  function removeFromCart(slug, size) {
    const cart = getCart().filter((item) => !(item.slug === slug && item.size === size));
    saveCart(cart);
    updateCartBadge();
  }

  function setCartItemQuantity(slug, size, quantity) {
    const cart = getCart();
    const item = cart.find((i) => i.slug === slug && i.size === size);
    if (!item) return;
    if (quantity < 1) {
      removeFromCart(slug, size);
      return;
    }
    const product = getProductBySlug(slug);
    const sizeData = product?.sizes.find((s) => s.label === size);
    const max = sizeData ? sizeData.stock : quantity;
    item.quantity = Math.min(quantity, max);
    saveCart(cart);
    updateCartBadge();
  }

  function getCartSubtotalHkd() {
    return getCart().reduce((sum, item) => {
      const product = getProductBySlug(item.slug);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function buildOrderMailtoBody(cart, email) {
    const lines = cart.map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return '';
      const lineTotal = product.price * item.quantity;
      return `${product.name}\n  Size: ${item.size}\n  Qty: ${item.quantity}\n  ${formatProductPrice(lineTotal)}`;
    }).filter(Boolean);
    return [
      'HSIAH Order Request',
      '',
      `Email: ${email}`,
      '',
      ...lines,
      '',
      `Subtotal: ${formatProductPrice(getCartSubtotalHkd())}`,
    ].join('\n');
  }

  let activeProductSlug = null;

  function bindProductDetailEvents(product) {
    if (!dom.productDetail) return;

    const root = dom.productDetail;
    const sizeBtns = root.querySelectorAll('.pdp-size__btn');
    const qtyInput = root.querySelector('.pdp-qty__input');
    const qtyMinus = root.querySelector('.pdp-qty__minus');
    const qtyPlus = root.querySelector('.pdp-qty__plus');
    const addBtn = root.querySelector('.pdp-add');
    const errEl = root.querySelector('.pdp-form__error');

    let selectedSize = product.sizes.length === 1 ? product.sizes[0].label : null;

    function getSelectedSizeData() {
      return product.sizes.find((s) => s.label === selectedSize) || null;
    }

    function updateQtyMax() {
      const sizeData = getSelectedSizeData();
      const max = sizeData ? sizeData.stock : 1;
      if (qtyInput) {
        qtyInput.max = String(max);
        if (Number(qtyInput.value) > max) qtyInput.value = String(max);
        if (Number(qtyInput.value) < 1) qtyInput.value = '1';
      }
    }

    function setSelectedSize(label) {
      selectedSize = label;
      sizeBtns.forEach((btn) => {
        const isActive = btn.dataset.size === label;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });
      updateQtyMax();
      if (errEl) errEl.textContent = '';
    }

    if (product.sizes.length === 1) {
      setSelectedSize(product.sizes[0].label);
    }

    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        setSelectedSize(btn.dataset.size);
      });
    });

    if (qtyMinus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        const next = Math.max(1, Number(qtyInput.value) - 1);
        qtyInput.value = String(next);
      });
    }

    if (qtyPlus && qtyInput) {
      qtyPlus.addEventListener('click', () => {
        const max = Number(qtyInput.max) || 1;
        const next = Math.min(max, Number(qtyInput.value) + 1);
        qtyInput.value = String(next);
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('change', () => {
        const max = Number(qtyInput.max) || 1;
        let val = Math.max(1, Math.min(max, Number(qtyInput.value) || 1));
        qtyInput.value = String(val);
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (!selectedSize) {
          if (errEl) errEl.textContent = t('pdp.selectSize') || 'Please select a size';
          return;
        }
        const sizeData = getSelectedSizeData();
        if (!sizeData || sizeData.stock < 1) return;

        const qty = Math.min(Number(qtyInput?.value) || 1, sizeData.stock);
        addToCart(product.slug, selectedSize, qty);
        if (errEl) errEl.textContent = '';
        navigate('products');
      });
    }
  }

  function renderProductDetail(slug) {
    if (!dom.productDetail) return;

    const product = getProductBySlug(slug);
    activeProductSlug = slug;

    if (!product) {
      dom.productDetail.innerHTML = `
        <p class="pdp-not-found reveal">${t('pdp.notFound') || 'Product not found.'}</p>
        <a class="pdp-back reveal" href="#products" data-page="products">${t('pdp.back') || '← BACK TO SHOP'}</a>
      `;
      observeReveals();
      return;
    }

    const sizeButtons = product.sizes.map((s) => {
      const soldOut = s.stock < 1;
      return `
        <button type="button" class="pdp-size__btn${soldOut ? ' is-disabled' : ''}"
          data-size="${s.label}" ${soldOut ? 'disabled' : ''}
          aria-pressed="false">
          ${s.label}${soldOut ? ` <span class="pdp-size__sold">(${t('pdp.soldOut') || 'SOLD OUT'})</span>` : ''}
        </button>
      `;
    }).join('');

    const defaultQtyMax = product.sizes.length === 1 ? product.sizes[0].stock : 1;

    dom.productDetail.innerHTML = `
      <div class="pdp reveal">
        <a class="pdp-back" href="#products" data-page="products" data-i18n="pdp.back">← BACK TO SHOP</a>
        <div class="pdp__layout">
          <div class="pdp__media">
            <div class="pdp__img" style="background-color:${product.color}; background-image:url('${product.img}')"></div>
          </div>
          <div class="pdp__info">
            <h1 class="pdp__title">${product.name}</h1>
            <p class="pdp__price" data-price-hkd="${product.price}">${formatProductPrice(product.price)}</p>

            <div class="pdp-block">
              <h2 class="pdp-block__title" data-i18n="pdp.details">Product Details</h2>
              <ul class="pdp-list">
                ${product.details.map((d) => `<li>${d}</li>`).join('')}
              </ul>
            </div>

            <div class="pdp-block">
              <h2 class="pdp-block__title" data-i18n="pdp.information">Product Information</h2>
              <ul class="pdp-list">
                ${product.information.map((d) => `<li>${d}</li>`).join('')}
              </ul>
            </div>

            <div class="pdp-block pdp-size-guide">
              <h2 class="pdp-block__title" data-i18n="pdp.sizeGuide">Size Guide</h2>
              <div class="pdp-size-guide__scroll">${sizeGuideTableHtml(product.sizeGuide)}</div>
            </div>

            <form class="pdp-form" id="pdpForm" onsubmit="return false">
              <div class="pdp-form__group">
                <span class="pdp-form__label" data-i18n="pdp.size">Size</span>
                <div class="pdp-size__options" role="group" aria-label="Size">${sizeButtons}</div>
              </div>
              <div class="pdp-form__group">
                <label class="pdp-form__label" for="pdpQty" data-i18n="pdp.quantity">Quantity</label>
                <div class="pdp-qty">
                  <button type="button" class="pdp-qty__btn pdp-qty__minus" aria-label="Decrease quantity">−</button>
                  <input type="number" class="pdp-qty__input" id="pdpQty" min="1" max="${defaultQtyMax}" value="1">
                  <button type="button" class="pdp-qty__btn pdp-qty__plus" aria-label="Increase quantity">+</button>
                </div>
              </div>
              <p class="pdp-form__error" aria-live="polite"></p>
              <button type="button" class="btn btn--red pdp-add" data-i18n="pdp.addToBag">ADD TO BAG</button>
            </form>
          </div>
        </div>
      </div>
    `;

    if (i18n) {
      dom.productDetail.querySelectorAll('[data-i18n]').forEach((el) => {
        const val = i18n.t(el.dataset.i18n, currentLocale);
        if (val != null) el.textContent = val;
      });
    }

    bindProductDetailEvents(product);
    observeReveals();
  }

  function renderProducts() {
    if (!dom.shopSections) return;

    dom.shopSections.innerHTML = SHOP_SECTIONS.map((section) => {
      const items = PRODUCTS.filter((p) => p.stanza === section.stanza);
      const descHtml = section.description?.length
        ? `<div class="shop-section__desc reveal">${section.description.map((para) => `<p>${para}</p>`).join('')}</div>`
        : '';

      const title = section.titleKey
        ? (t(section.titleKey) || section.title || '')
        : (section.title || '');

      return `
        <div class="shop-section">
          <h2 class="shop-section__title reveal">${title}</h2>
          ${descHtml}
          <div class="products-grid">
            ${items.map((p, i) => productCardHtml(p, i)).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (currentPage === 'products') observeReveals();
  }

  function applyCartI18n(root) {
    if (!i18n || !root) return;
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = i18n.t(el.dataset.i18n, currentLocale);
      if (val != null) el.textContent = val;
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const val = i18n.t(el.dataset.i18nPlaceholder, currentLocale);
      if (val != null) el.placeholder = val;
    });
  }

  function bindCartEvents() {
    if (!dom.cartContent) return;

    dom.cartContent.querySelectorAll('[data-cart-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.cartRemove, btn.dataset.cartSize);
        renderCart();
      });
    });

    dom.cartContent.querySelectorAll('[data-cart-qty]').forEach((input) => {
      input.addEventListener('change', () => {
        const qty = Math.max(1, Number(input.value) || 1);
        setCartItemQuantity(input.dataset.cartQty, input.dataset.cartSize, qty);
        renderCart();
      });
    });

    const form = dom.cartContent.querySelector('#cartCheckoutForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cart = getCart();
        if (!cart.length) return;

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim() || '';
        if (!email) {
          emailInput?.focus();
          return;
        }

        const subject = encodeURIComponent('HSIAH Order Request');
        const body = encodeURIComponent(buildOrderMailtoBody(cart, email));
        window.location.href = `mailto:HSIAHOFFICIAL@GMAIL.COM?subject=${subject}&body=${body}`;

        const success = dom.cartContent.querySelector('.cart-success');
        if (success) {
          success.hidden = false;
          form.hidden = true;
        }
      });
    }
  }

  function renderCart() {
    if (!dom.cartContent) return;

    const cart = getCart();

    if (!cart.length) {
      dom.cartContent.innerHTML = `
        <div class="cart reveal">
          <h1 class="cart__title" data-i18n="cart.title">BAG</h1>
          <p class="cart__empty" data-i18n="cart.empty">Your bag is empty.</p>
          <a class="btn" href="#products" data-page="products" data-i18n="cart.continue">CONTINUE SHOPPING</a>
        </div>
      `;
      applyCartI18n(dom.cartContent);
      observeReveals();
      return;
    }

    const subtotal = getCartSubtotalHkd();
    const lines = cart.map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return '';
      const lineTotal = product.price * item.quantity;
      const maxQty = product.sizes.find((s) => s.label === item.size)?.stock || item.quantity;
      return `
        <article class="cart-line">
          <a class="cart-line__media" href="#product-${product.slug}" data-page="product-${product.slug}"
            style="background-color:${product.color}; background-image:url('${product.img}')"></a>
          <div class="cart-line__info">
            <h2 class="cart-line__name">
              <a href="#product-${product.slug}" data-page="product-${product.slug}">${product.name}</a>
            </h2>
            <p class="cart-line__meta">
              <span data-i18n="cart.size">Size</span>: ${item.size}
            </p>
            <div class="cart-line__actions">
              <label class="cart-line__qty-label">
                <span data-i18n="cart.qty">Qty</span>
                <input type="number" class="cart-line__qty-input" min="1" max="${maxQty}" value="${item.quantity}"
                  data-cart-qty="${product.slug}" data-cart-size="${item.size}">
              </label>
              <button type="button" class="cart-line__remove" data-cart-remove="${product.slug}" data-cart-size="${item.size}"
                data-i18n="cart.remove">Remove</button>
            </div>
          </div>
          <p class="cart-line__price">${formatProductPrice(lineTotal)}</p>
        </article>
      `;
    }).join('');

    dom.cartContent.innerHTML = `
      <div class="cart reveal">
        <h1 class="cart__title" data-i18n="cart.title">BAG</h1>
        <div class="cart__lines">${lines}</div>
        <div class="cart__summary">
          <div class="cart__subtotal">
            <span data-i18n="cart.subtotal">Subtotal</span>
            <span class="cart__subtotal-value" data-price-hkd="${subtotal}">${formatProductPrice(subtotal)}</span>
          </div>
          <a class="cart__continue" href="#products" data-page="products" data-i18n="cart.continue">CONTINUE SHOPPING</a>
        </div>
        <div class="cart__checkout">
          <h2 class="cart__checkout-title" data-i18n="cart.checkout">CHECKOUT</h2>
          <p class="cart__checkout-note" data-i18n="cart.checkoutNote">Complete your order by email. We will confirm availability and send payment details.</p>
          <form class="cart-checkout-form" id="cartCheckoutForm">
            <input type="email" placeholder="EMAIL" data-i18n-placeholder="cart.email" required>
            <button type="submit" class="btn btn--red" data-i18n="cart.placeOrder">PLACE ORDER</button>
          </form>
          <p class="cart-success" hidden data-i18n="cart.orderPlaced">Thank you — your order request has been sent. We will be in touch shortly.</p>
        </div>
      </div>
    `;

    applyCartI18n(dom.cartContent);
    bindCartEvents();
    observeReveals();
  }

  /* ============================================
     FEATURED GRID
     ============================================ */

  let featuredResizeTimer = null;
  let featuredColumnCount = null;

  function renderFeatured() {
    if (!dom.featuredGrid) return;

    const cols = getFeaturedColumnCount();
    featuredColumnCount = cols;
    const photos = reorderForMasonryColumns(FEATURED_PHOTOS, cols);

    dom.featuredGrid.innerHTML = photos.map((file) => {
      const src = FEATURED_DIR + file;
      const captionKey = i18n ? i18n.getFeaturedCaptionKey(file) : null;
      const caption = captionKey ? (t(captionKey) || formatFeaturedCaption(file)) : formatFeaturedCaption(file);
      const captionAttr = captionKey ? ` data-i18n-key="${captionKey}"` : '';
      return `
        <article class="featured-masonry__item">
          <div class="featured-masonry__media">
            <img src="${src}" alt="${caption}" loading="lazy">
          </div>
          <p class="featured-masonry__caption"${captionAttr}>${caption}</p>
        </article>
      `;
    }).join('');

  }

  /* ============================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================ */

  let revealObserver = null;

  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();

    const activePage = document.querySelector('.page.active');
    const els = activePage ? activePage.querySelectorAll('.reveal') : [];
    if (!els.length) return;

    const scrollRoot = activePage.querySelector('.project-layout__scroll');

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      root: scrollRoot || null,
    });

    els.forEach(el => {
      el.classList.remove('revealed');
      revealObserver.observe(el);
    });
  }

  /* ============================================
     FORMS
     ============================================ */

  function handleWaitlist(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
      e.target.innerHTML = `<p class="waitlist-success">${t('home.waitlistSuccess') || 'THANK YOU — YOU\'RE ON THE LIST.'}</p>`;
    }
  }

  function handleContact(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, textarea');
    inputs.forEach(i => { i.value = ''; });
    const btn = e.target.querySelector('button');
    btn.textContent = t('form.sent') || 'SENT ✓';
    setTimeout(() => { btn.textContent = t('form.send') || 'SEND MESSAGE'; }, 2000);
  }

  /* ============================================
     PROJECT SIDEBAR SCROLL PROXY
     ============================================ */

  function getWheelDelta(e) {
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 16;
    else if (e.deltaMode === 2) delta *= window.innerHeight;
    return delta;
  }

  function handleProjectSidebarWheel(e) {
    if (!isProjectPage(currentPage) || window.innerWidth < 1024 || menuOpen) return;

    const activePage = dom.scrollWrap.querySelector('.page.active');
    if (!activePage) return;

    const scrollEl = activePage.querySelector('.project-layout__scroll');
    const sidebar = activePage.querySelector('.project-layout__side');
    if (!scrollEl || !sidebar || scrollEl.contains(e.target)) return;
    if (!sidebar.contains(e.target)) return;

    const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
    if (maxScroll <= 0) return;

    e.preventDefault();
    scrollEl.scrollTop += getWheelDelta(e);
  }

  /* ============================================
     PROJECT PHOTO LIGHTBOX
     ============================================ */

  function closeProjectLightbox() {
    if (!dom.projectLightbox) return;

    dom.projectLightbox.classList.remove('active');
    dom.projectLightbox.setAttribute('aria-hidden', 'true');

    const img = dom.projectLightbox.querySelector('.project-lightbox__img');
    if (img) {
      img.removeAttribute('src');
      img.alt = '';
    }

    if (lightboxScrollEl) {
      lightboxScrollEl.style.overflow = '';
      lightboxScrollEl = null;
    }

    document.body.style.overflow = '';
    updateScrollMode(currentPage);
  }

  function openProjectLightbox(img) {
    if (!dom.projectLightbox) return;

    const lightboxImg = dom.projectLightbox.querySelector('.project-lightbox__img');
    if (!lightboxImg) return;

    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';

    lightboxScrollEl = img.closest('.project-layout__scroll');
    if (lightboxScrollEl) lightboxScrollEl.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    dom.projectLightbox.classList.add('active');
    dom.projectLightbox.setAttribute('aria-hidden', 'false');
  }

  function handleProjectLightboxClick(e) {
    const img = e.target.closest('.project-grid__item img, .featured-masonry__media img');
    if (img && (isProjectPage(currentPage) || currentPage === 'featured')) {
      e.preventDefault();
      openProjectLightbox(img);
      return;
    }

    if (dom.projectLightbox && dom.projectLightbox.classList.contains('active') && dom.projectLightbox.contains(e.target)) {
      closeProjectLightbox();
    }
  }

  /* ============================================
     EVENT LISTENERS
     ============================================ */

  function bindEvents() {
    dom.menuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('wheel', handleProjectSidebarWheel, { passive: false });
    document.addEventListener('click', handleProjectLightboxClick);

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-page], button[data-page]');
      if (!link) return;
      e.preventDefault();
      navigate(link.dataset.page);
    });

    if (dom.waitlistForm)     dom.waitlistForm.addEventListener('submit', handleWaitlist);
    if (dom.contactForm)      dom.contactForm.addEventListener('submit', handleContact);
    if (dom.aboutContactForm) dom.aboutContactForm.addEventListener('submit', handleContact);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dom.projectLightbox && dom.projectLightbox.classList.contains('active')) {
          closeProjectLightbox();
          return;
        }
        if (menuOpen) toggleMenu();
        closeNavDropdowns();
      }
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      const page = resolveRoute(hash);
      if (page === currentPage) return;
      showPage(page);
    });

    window.addEventListener('resize', () => {
      updateScrollMode(currentPage);
      if (menuOpen && window.innerWidth > 920) toggleMenu();

      if (currentPage !== 'featured') return;
      clearTimeout(featuredResizeTimer);
      featuredResizeTimer = setTimeout(() => {
        const cols = getFeaturedColumnCount();
        if (cols !== featuredColumnCount) renderFeatured();
      }, 150);
    });
  }

  /* ============================================
     INIT
     ============================================ */

  function init() {
    const hash = window.location.hash.replace('#', '');
    const startPage = resolveRoute(hash);

    document.querySelectorAll('.page').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });

    const target = getPageElement(startPage);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
      currentPage = startPage;
    }

    if (startPage === 'products') renderProducts();
    if (startPage === 'cart') renderCart();
    const startSlug = getProductSlugFromRoute(startPage);
    if (startSlug) renderProductDetail(startSlug);
    if (startPage === 'featured') renderFeatured();

    initHeroVideo();
    updateScrollMode(startPage);
    observeReveals();
    initNavDropdowns();
    initMenuAccordions();
    initMenuUtils();
    bindEvents();
    initGate();
    currentCurrency = getStoredCurrency();
    applyLocale(currentLocale);
    updateCartBadge();

    setTimeout(finishLoaderSequence, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
