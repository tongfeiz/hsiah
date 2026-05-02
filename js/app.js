/* ============================================
   HSIAH「夏」— Main Script
   ============================================ */

(function () {
  'use strict';

  const ROUTE_IDS = [
    'home',
    'products',
    'about',
    'project-mengqi',
    'project-huangyan',
    'project-echoes',
    'project-skopein',
    'project-tarantella',
  ];

  /* ---- Product Data (with images per collection) ---- */

  const PRODUCTS = [
    { id: 1,  name: 'OVERSIZED TEE',    price: 85,  collection: '夢棄少年',     img: 'photos/d1.jpg', color: '#161615' },
    { id: 2,  name: 'CARGO SHORTS',     price: 120, collection: '夢棄少年',     img: 'photos/d2.jpg', color: '#565657' },
    { id: 3,  name: 'WINDBREAKER',      price: 195, collection: '謊言以夏為終', img: 'photos/5$k1.jpg', color: '#132406' },
    { id: 4,  name: 'GRAPHIC HOODIE',   price: 150, collection: 'ECHOES', img: 'photos/e1.jpg', color: '#747259' },
    { id: 5,  name: 'WIDE LEG PANTS',   price: 135, collection: 'SKOPEIN FOBOS', img: 'photos/SKOPEIN FOBOS CAMPAIGN IG-01.png', color: '#9e7e70' },
    { id: 6,  name: 'MESH TANK',        price: 65,  collection: 'TARANTELLA',   img: 'photos/5$k4.jpg', color: '#0d2404' },
    { id: 7,  name: 'TECH VEST',        price: 175, collection: '謊言以夏為終', img: 'photos/5$k2.jpg', color: '#0f2806' },
    { id: 8,  name: 'STRUCTURED CAP',   price: 55,  collection: 'ECHOES', img: 'photos/e2.jpg', color: '#bbc9d0' },
    { id: 9,  name: 'DRAPED SHIRT',     price: 110, collection: 'TARANTELLA',   img: 'photos/5$k5.jpg', color: '#0d2404' },
    { id: 10, name: 'UTILITY JACKET',   price: 220, collection: 'SKOPEIN FOBOS', img: 'photos/SKOPEIN FOBOS CAMPAIGN IG-02.png', color: '#131416' },
    { id: 11, name: 'CROPPED HOODIE',   price: 130, collection: '夢棄少年',     img: 'photos/d3.jpg', color: '#4f4c4a' },
    { id: 12, name: 'SPLIT-HEM PANTS',  price: 145, collection: '謊言以夏為終', img: 'photos/5$k3.jpg', color: '#0d2205' },
  ];

  /* ---- DOM Cache ---- */

  const dom = {
    loader:            document.getElementById('loader'),
    heroVideo:         document.getElementById('heroVideo'),
    nav:               document.getElementById('nav'),
    menuBtn:           document.getElementById('menuBtn'),
    menu:              document.getElementById('menu'),
    overlay:           document.getElementById('transitionOverlay'),
    scrollWrap:        document.getElementById('scrollWrap'),
    productsGrid:      document.getElementById('productsGrid'),
    waitlistForm:      document.getElementById('waitlistForm'),
    contactForm:       document.getElementById('contactForm'),
    aboutContactForm:  document.getElementById('aboutContactForm'),
  };

  let currentPage   = 'home';
  let isTransitioning = false;
  let menuOpen       = false;

  /* ============================================
     LOADER
     ============================================ */

  function dismissLoader() {
    dom.loader.classList.add('loaded');
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
     LERP SMOOTH SCROLL
     ============================================ */

  const lerp = (a, b, t) => a + (b - a) * t;

  const smoothScroll = {
    current: 0,
    target: 0,
    ease: 0.08,
    enabled: false,
    rafId: null,

    init() {
      this.enabled = this.shouldUseLerp();
      if (this.enabled) {
        document.body.classList.add('lerp-active');
        this.setHeight();
        window.addEventListener('scroll', () => { this.target = window.scrollY; });
        window.addEventListener('resize', () => {
          const wasMobile = !this.enabled;
          this.enabled = this.shouldUseLerp();
          if (this.enabled && wasMobile) {
            document.body.classList.add('lerp-active');
            this.setHeight();
          } else if (!this.enabled) {
            document.body.classList.remove('lerp-active');
            document.body.style.height = '';
            dom.scrollWrap.style.transform = '';
          }
          if (this.enabled) this.setHeight();
        });
      }
      this.render();
    },

    isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    shouldUseLerp() {
      return window.innerWidth >= 1024 && !this.isTouchDevice();
    },

    setHeight() {
      const active = dom.scrollWrap.querySelector('.page.active');
      if (active) {
        document.body.style.height = active.offsetHeight + 'px';
      }
    },

    reset() {
      this.current = 0;
      this.target = 0;
      window.scrollTo(0, 0);
      if (this.enabled) {
        dom.scrollWrap.style.transform = 'translate3d(0,0,0)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.setHeight());
        });
      }
    },

    render() {
      if (this.enabled) {
        this.current = lerp(this.current, this.target, this.ease);
        if (Math.abs(this.current - this.target) < 0.5) this.current = this.target;
        dom.scrollWrap.style.transform = `translate3d(0,-${Math.round(this.current * 100) / 100}px,0)`;
      }
      this.rafId = requestAnimationFrame(() => this.render());
    },
  };

  /* ============================================
     ROUTER / PAGE TRANSITIONS
     ============================================ */

  function navigate(page) {
    if (page === currentPage || isTransitioning) return;
    isTransitioning = true;

    if (menuOpen) toggleMenu();

    dom.overlay.classList.add('active');

    setTimeout(() => {
      showPage(page);
    }, 380);

    dom.overlay.addEventListener('animationend', function handler() {
      dom.overlay.removeEventListener('animationend', handler);
      dom.overlay.classList.remove('active');
      isTransitioning = false;
    });
  }

  function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    const target = document.querySelector(`.page[data-page="${page}"]`);
    if (!target) return;

    target.style.display = 'block';
    target.classList.add('active');
    currentPage = page;
    window.location.hash = page;

    smoothScroll.reset();
    observeReveals();

    if (page === 'products') renderProducts();
  }

  /* ============================================
     MENU
     ============================================ */

  function toggleMenu() {
    menuOpen = !menuOpen;
    dom.menuBtn.classList.toggle('active', menuOpen);
    dom.menu.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }

  /* ============================================
     PRODUCTS RENDER
     ============================================ */

  function renderProducts() {
    dom.productsGrid.innerHTML = PRODUCTS.map((p, i) => `
      <div class="product-card" style="animation-delay:${i * 0.06}s">
        <div class="product-card__img" style="background-color:${p.color}; background-image:url('${p.img}')"></div>
        <p class="product-card__collection">${p.collection}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__price">$${p.price}</p>
      </div>
    `).join('');

    if (smoothScroll.enabled) {
      requestAnimationFrame(() => smoothScroll.setHeight());
    }
  }

  /* ============================================
     SCROLL REVEAL (IntersectionObserver)
     ============================================ */

  let revealObserver = null;

  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();

    const els = document.querySelectorAll('.page.active .reveal');
    if (!els.length) return;

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => {
      el.classList.remove('revealed');
      revealObserver.observe(el);
    });
  }

  /* ============================================
     NAV SCROLL STATE
     ============================================ */

  function onScroll() {
    const y = smoothScroll.enabled ? smoothScroll.current : window.scrollY;
    dom.nav.classList.toggle('scrolled', y > 50);
  }

  /* ============================================
     FORMS
     ============================================ */

  function handleWaitlist(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
      e.target.innerHTML = '<p class="waitlist-success">THANK YOU — YOU\'RE ON THE LIST.</p>';
    }
  }

  function handleContact(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input, textarea');
    inputs.forEach(i => { i.value = ''; });
    const btn = e.target.querySelector('button');
    btn.textContent = 'SENT ✓';
    setTimeout(() => { btn.textContent = 'SEND MESSAGE'; }, 2000);
  }

  /* ============================================
     EVENT LISTENERS
     ============================================ */

  function bindEvents() {
    dom.menuBtn.addEventListener('click', toggleMenu);

    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        navigate(page);
      });
    });

    if (dom.waitlistForm)     dom.waitlistForm.addEventListener('submit', handleWaitlist);
    if (dom.contactForm)      dom.contactForm.addEventListener('submit', handleContact);
    if (dom.aboutContactForm) dom.aboutContactForm.addEventListener('submit', handleContact);

    window.addEventListener('scroll', onScroll);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) toggleMenu();
    });
  }

  /* ============================================
     INIT
     ============================================ */

  function init() {
    const hash = window.location.hash.replace('#', '');
    const startPage = ROUTE_IDS.includes(hash) ? hash : 'home';

    document.querySelectorAll('.page').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });

    const target = document.querySelector(`.page[data-page="${startPage}"]`);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
      currentPage = startPage;
    }

    if (startPage === 'products') renderProducts();

    initHeroVideo();
    smoothScroll.init();
    observeReveals();
    bindEvents();
    onScroll();

    setTimeout(dismissLoader, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
