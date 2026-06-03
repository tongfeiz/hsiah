/* ============================================
   HSIAH「夏」— Translations (en / zh-Hant / zh-Hans)
   Product names & people names are not keyed here.
   ============================================ */

window.HSIAH_I18N = (function () {
  'use strict';

  const LOCALES = ['en', 'zh-Hant', 'zh-Hans'];
  const DEFAULT_LOCALE = 'en';
  const STORAGE_KEY = 'hsiah-lang';

  function s(en, zhHant, zhHans) {
    return { en, 'zh-Hant': zhHant, 'zh-Hans': zhHans };
  }

  const STRINGS = {
    /* Nav */
    'nav.about': s('About', '關於', '关于'),
    'nav.shop': s('Shop', '商店', '商店'),
    'nav.featured': s('Featured', '精選', '精选'),
    'nav.archives': s('Archives', '典藏', '典藏'),
    'nav.contact': s('Contact', '聯絡', '联络'),
    'nav.account': s('Account', '帳戶', '账户'),
    'nav.signIn': s('Sign in', '登入', '登录'),
    'nav.currencyLabel': s('Currency', '貨幣', '货币'),
    'nav.languageLabel': s('Language', '語言', '语言'),
    'nav.currency.hk': s('Hong Kong | HKD $', '香港 | HKD $', '香港 | HKD $'),
    'nav.currency.uk': s('United Kingdom | GBP £', '英國 | GBP £', '英国 | GBP £'),
    'nav.lang.en': s('English', 'English', 'English'),
    'nav.lang.zhHant': s('Chinese Traditional', '繁體中文', '繁體中文'),
    'nav.lang.zhHans': s('Chinese Simplified', '简体中文', '简体中文'),

    /* Aria */
    'aria.menu': s('Menu', '選單', '菜单'),
    'aria.search': s('Search', '搜尋', '搜索'),
    'aria.account': s('Account', '帳戶', '账户'),
    'aria.bag': s('Shopping bag', '購物袋', '购物袋'),
    'aria.lightbox': s('Photo detail view', '相片詳情', '照片详情'),
    'aria.projectNav': s('Project navigation', '專案導覽', '项目导航'),

    /* Home */
    'home.shopNewCollection': s('SHOP NEW COLLECTION', '選購全新系列', '选购全新系列'),
    'home.viewAll': s('VIEW ALL PRODUCTS', '查看全部商品', '查看全部商品'),
    'home.lookbook': s('SUMMER LOOKBOOK', '夏日造型冊', '夏日造型册'),
    'home.lookbookSub': s('A visual narrative of the season.', '本季視覺敘事。', '本季视觉叙事。'),
    'home.collections': s('COLLECTIONS', '系列', '系列'),
    'home.waitlist': s('JOIN THE WAITLIST', '加入候補名單', '加入候补名单'),
    'home.waitlistSub': s('Be the first to know about new drops and exclusive access.', '搶先獲悉新品上架與專屬資訊。', '抢先获悉新品上架与专属资讯。'),
    'home.waitlistPlaceholder': s('ENTER YOUR EMAIL', '輸入電郵', '输入电邮'),
    'home.waitlistSuccess': s('THANK YOU — YOU\'RE ON THE LIST.', '感謝 — 你已成功加入名單。', '感谢 — 你已成功加入名单。'),
    'home.contact': s('CONTACT US', '聯絡我們', '联系我们'),
    'home.email': s('EMAIL', '電郵', '电邮'),
    'home.instagram': s('INSTAGRAM', 'INSTAGRAM', 'INSTAGRAM'),
    'home.location': s('LOCATION', '地點', '地点'),
    'home.worldwide': s('WORLDWIDE', '全球', '全球'),

    /* Forms */
    'form.name': s('NAME', '姓名', '姓名'),
    'form.email': s('EMAIL', '電郵', '电邮'),
    'form.message': s('MESSAGE', '訊息', '讯息'),
    'form.send': s('SEND MESSAGE', '傳送訊息', '发送讯息'),
    'form.sent': s('SENT ✓', '已傳送 ✓', '已发送 ✓'),

    /* Footer */
    'footer.rights': s('ALL RIGHTS RESERVED', '版權所有', '版权所有'),

    /* Pages */
    'page.featured': s('FEATURED', '精選', '精选'),
    'page.about': s('ABOUT', '關於', '关于'),
    'shop.stanzaI': s('STANZA I SUMMER COLLECTION', '第一詩章 · 夏日系列', '第一诗章 · 夏日系列'),

    /* Product detail */
    'pdp.back': s('← BACK TO SHOP', '← 返回商店', '← 返回商店'),
    'pdp.details': s('Product Details', '產品詳情', '产品详情'),
    'pdp.information': s('Product Information', '產品資訊', '产品资讯'),
    'pdp.sizeGuide': s('Size Guide', '尺碼指南', '尺码指南'),
    'pdp.size': s('Size', '尺碼', '尺码'),
    'pdp.quantity': s('Quantity', '數量', '数量'),
    'pdp.addToBag': s('ADD TO BAG', '加入購物袋', '加入购物袋'),
    'pdp.addedToBag': s('ADDED TO BAG', '已加入購物袋', '已加入购物袋'),
    'pdp.soldOut': s('SOLD OUT', '售罄', '售罄'),
    'pdp.selectSize': s('Please select a size', '請選擇尺碼', '请选择尺码'),
    'pdp.notFound': s('Product not found.', '找不到產品。', '找不到产品。'),

    /* Cart */
    'cart.title': s('BAG', '購物袋', '购物袋'),
    'cart.empty': s('Your bag is empty.', '購物袋是空的。', '购物袋是空的。'),
    'cart.continue': s('CONTINUE SHOPPING', '繼續購物', '继续购物'),
    'cart.size': s('Size', '尺碼', '尺码'),
    'cart.qty': s('Qty', '數量', '数量'),
    'cart.remove': s('Remove', '移除', '移除'),
    'cart.subtotal': s('Subtotal', '小計', '小计'),
    'cart.checkout': s('CHECKOUT', '結帳', '结账'),
    'cart.checkoutNote': s(
      'Complete your order by email. We will confirm availability and send payment details.',
      '請透過電郵完成訂單。我們將確認庫存並發送付款詳情。',
      '请透过电邮完成订单。我们将确认库存并发送付款详情。'
    ),
    'cart.email': s('EMAIL', '電郵', '电邮'),
    'cart.placeOrder': s('PLACE ORDER', '提交訂單', '提交订单'),
    'cart.orderPlaced': s(
      'Thank you — your order request has been sent. We will be in touch shortly.',
      '感謝 — 你的訂單請求已送出，我們將盡快聯絡你。',
      '感谢 — 你的订单请求已送出，我们将尽快联络你。'
    ),
    'cart.edit': s('Edit', '編輯', '编辑'),
    'about.getInTouch': s('GET IN TOUCH', '聯絡我們', '联系我们'),
    'about.quote': s('“Solace is found in the hallucinations of dreamers.”', '「慰藉，藏於追夢者的幻境之中。」', '「慰藉，藏于追梦者的幻境之中。」'),
    'about.body': s(
      'Established in 2025, HSIAH is the eponymous label of designer Theo Hsiah. Hsiah interprets silhouettes and clothing through a surrealist lens, blending blurry memories of culture, experiences, and moments throughout his life. Guided by a strong belief in drawing inspiration from the subconscious mind, Hsiah takes bizarre actions to curate his collections. With a strong devotion to digital and traditional pattern-cutting alongside craftsmanship, Hsiah explores fashion as a medium to curate a visual memoir of his life, to which he can find solace when his mind becomes lonely.',
      'HSIAH 於 2025 年創立，為設計師 Theo Hsiah 的同名品牌。Hsiah 以超現實視角詮釋輪廓與服裝，將文化、經歷與人生片段的模糊記憶交織融合。深信靈感源自潛意識，他以獨特方式策劃每個系列；結合數位與傳統立體剪裁及工藝，探索時尚作為人生視覺回憶錄的媒介，在孤寂時尋得慰藉。',
      'HSIAH 于 2025 年创立，为设计师 Theo Hsiah 的同名品牌。Hsiah 以超现实视角诠释轮廓与服装，将文化、经历与人生片段的模糊记忆交织融合。深信灵感源自潜意识，他以独特方式策划每个系列；结合数字与传统立体剪裁及工艺，探索时尚作为人生视觉回忆录的媒介，在孤寂时寻得慰藉。'
    ),

    /* Credits labels */
    'credits.garments': s('Garments.', '服裝.', '服装.'),
    'credits.graphics': s('Graphics.', '圖像.', '图像.'),
    'credits.model': s('Model.', '模特.', '模特.'),
    'credits.creativeDirection': s('Creative Direction.', '創意指導.', '创意指导.'),
    'credits.photography': s('Photography.', '攝影.', '摄影.'),
    'credits.editor': s('Editor.', '剪輯.', '剪辑.'),
    'credits.stylist': s('Stylist.', '造型.', '造型.'),
    'credits.assistant': s('Assistant.', '助理.', '助理.'),
    'credits.organizer': s('Organizer.', '策劃.', '策划.'),
    'credits.collections': s('Collections.', '系列.', '系列.'),
    'credits.performances': s('Performances.', '演出.', '演出.'),
    'credits.spatialExhibition': s('Spatial and Exhibition Design.', '空間與展覽設計.', '空间与展览设计.'),
    'credits.assist': s('Assist.', '協助.', '协助.'),
    'credits.location': s('Location.', '場地.', '场地.'),
    'credits.director': s('Director.', '導演.', '导演.'),
    'credits.dop': s('DoP.', '攝影指導.', '摄影指导.'),
    'credits.actress': s('Actress.', '演員.', '演员.'),
    'credits.productionDesign': s('Production Design.', '美術設計.', '美术设计.'),
    'credits.artAssist': s('Art Assist.', '美術助理.', '美术助理.'),
    'credits.composer': s('Composer.', '作曲.', '作曲.'),
    'credits.hmua': s('HMUA.', '妝髮.', '妆发.'),
    'credits.jewellery': s('Jewellery.', '珠寶.', '珠宝.'),
    'credits.performanceArtist': s('Performance Artist.', '表演藝術家.', '表演艺术家.'),

    /* Project notes & prose */
    'project.huangyan.note': s(
      'Collection in collaboration with California-based multidisciplinary artist Tongfei Zhu.',
      '與加州多元藝術家 Tongfei Zhu 合作之系列。',
      '与加州多元艺术家 Tongfei Zhu 合作之系列。'
    ),
    'project.echoes.p1': s(
      'ECHOES was a collaborative fashion showcase curated by Turkish Designer Feyza Berca Senturk at Galleria Objets in London. HSIAH was featured as one of the designers, debuting their recent collections alongside Feyza and Erika Kaija. A fusion of fashion, performance art, and culinary practices, Feyza harmonized these disciplines into a contemporary exhibition.',
      'ECHOES 為土耳其設計師 Feyza Berca Senturk 於倫敦 Galleria Objets 策劃的聯合時裝展演。HSIAH 作為參展設計師之一，與 Feyza 及 Erika Kaija 一同發表最新系列。Feyza 將時尚、表演藝術與烹飪實踐融為一體，呈現當代展覽。',
      'ECHOES 为土耳其设计师 Feyza Berca Senturk 于伦敦 Galleria Objets 策划的联合时装展演。HSIAH 作为参展设计师之一，与 Feyza 及 Erika Kaija 一同发表最新系列。Feyza 将时尚、表演艺术与烹饪实践融为一体，呈现当代展览。'
    ),
    'project.echoes.p2': s(
      'As per the showcase, HSIAH debuted its latest collections “夢棄少年” and “謊言以夏為終”, blending contemporary ideologies with cultural silhouettes.',
      '展演中，HSIAH 發表最新系列「夢棄少年」與「謊言以夏為終」，融合當代理念與文化輪廓。',
      '展演中，HSIAH 发表最新系列「梦弃少年」与「谎言以夏为终」，融合当代理念与文化轮廓。'
    ),
    'project.skopein.note': s(
      'A fashion short film done in collaboration with film brother duo Hwang Broz.',
      '與電影兄弟組合 Hwang Broz 合作之時尚短片。',
      '与电影兄弟组合 Hwang Broz 合作之时尚短片。'
    ),
    'project.skopein.footnote': s(
      'Film Equipment Provided by Shoot Blue',
      '拍攝器材由 Shoot Blue 提供',
      '拍摄器材由 Shoot Blue 提供'
    ),

    /* Featured captions */
    'featured.caption.stalagmite': s(
      'Stalagmite Installation Performance Chen Lin',
      '鐘乳石裝置演出 Chen Lin',
      '钟乳石装置演出 Chen Lin'
    ),
    'featured.caption.onyx2': s('17.23 Magazine Onyx Photoshoot', '17.23 雜誌 Onyx 拍攝', '17.23 杂志 Onyx 拍摄'),
    'featured.caption.onyx': s('17.23 Magazine Onyx Photoshoot', '17.23 雜誌 Onyx 拍攝', '17.23 杂志 Onyx 拍摄'),
    'featured.caption.anniversary': s('0159 1 Year Anniversary Collaboration', '0159 一週年合作', '0159 一周年合作'),
    'featured.caption.anniversary1': s('0159 1 Year Anniversary Collaboration', '0159 一週年合作', '0159 一周年合作'),
    'featured.caption.prosienta': s('Prosienta Photoshoot', 'Prosienta 拍攝', 'Prosienta 拍摄'),
    'featured.caption.prosienta1': s('Prosienta Photoshoot', 'Prosienta 拍攝', 'Prosienta 拍摄'),
    'featured.caption.onyx1': s('17.23 Magazine Onyx Photoshoot', '17.23 雜誌 Onyx 拍攝', '17.23 杂志 Onyx 拍摄'),
    'featured.caption.stalagmite1': s(
      'Stalagmite Installation Performance Chen Lin',
      '鐘乳石裝置演出 Chen Lin',
      '钟乳石装置演出 Chen Lin'
    ),
    'featured.caption.stalagmite2': s(
      'Stalagmite Installation Performance Chen Lin',
      '鐘乳石裝置演出 Chen Lin',
      '钟乳石装置演出 Chen Lin'
    ),
  };

  const FEATURED_CAPTION_KEYS = {
    'Stalagmite_Installation_Performance_Chen_Lin.webp': 'featured.caption.stalagmite',
    'Stalagmite_Installation_Performance_Chen_Lin(1).webp': 'featured.caption.stalagmite1',
    'Stalagmite_Installation_Performance_Chen_Lin(2).webp': 'featured.caption.stalagmite2',
    '17.23_Magazine_Onyx_Photoshoot.webp': 'featured.caption.onyx',
    '17.23_Magazine_Onyx_Photoshoot(1).webp': 'featured.caption.onyx1',
    '17.23_Magazine_Onyx_Photoshoot(2).webp': 'featured.caption.onyx2',
    '0159_1_Year_Anniversary_Collaboration.webp': 'featured.caption.anniversary',
    '0159_1_Year_Anniversary_Collaboration(1).webp': 'featured.caption.anniversary1',
    'Prosienta_Photoshoot.webp': 'featured.caption.prosienta',
    'Prosienta_Photoshoot(1).webp': 'featured.caption.prosienta1',
  };

  function normalizeLocale(locale) {
    if (locale === 'zh-Hant' || locale === 'zh-Hans') return locale;
    return DEFAULT_LOCALE;
  }

  function t(key, locale) {
    const loc = normalizeLocale(locale || DEFAULT_LOCALE);
    const entry = STRINGS[key];
    if (!entry) return null;
    return entry[loc] ?? entry.en ?? null;
  }

  function getStoredLocale() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (LOCALES.includes(stored)) return stored;
    } catch (_) { /* ignore */ }
    return DEFAULT_LOCALE;
  }

  function setStoredLocale(locale) {
    try {
      localStorage.setItem(STORAGE_KEY, normalizeLocale(locale));
    } catch (_) { /* ignore */ }
  }

  function getFeaturedCaptionKey(filename) {
    return FEATURED_CAPTION_KEYS[filename] || null;
  }

  return {
    LOCALES,
    DEFAULT_LOCALE,
    STORAGE_KEY,
    STRINGS,
    FEATURED_CAPTION_KEYS,
    normalizeLocale,
    t,
    getStoredLocale,
    setStoredLocale,
    getFeaturedCaptionKey,
  };
})();
