/* =====================================================================
   WOOLLEY WONDERS — main script
   Sections: Config, Product Data, State, 3D Hero, Scroll FX, Tilt,
             Rendering, Cart Logic, Modals, Forms + EmailJS
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. CONFIG — fill these in before going live
   --------------------------------------------------------------------- */
const CONFIG = {
  instagramHandle: "woolley_wonderss",
  whatsappNumber: "10000000000",

  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    orderTemplateId: "YOUR_EMAILJS_ORDER_TEMPLATE_ID",
    inquiryTemplateId: "YOUR_EMAILJS_INQUIRY_TEMPLATE_ID",
  },
};

if (window.emailjs && CONFIG.emailjs.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
  emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
}

/* ---------------------------------------------------------------------
   2. PRODUCT DATA — organized by categories
   --------------------------------------------------------------------- */
const PRODUCTS = [
  // ========== WEARABLES (5 items) ==========
  {
    id: "p1",
    name: "Cozy Knit Sweater",
    price: 128,
    image: "sweater.jpeg",
    category: "Wearables",
    badges: ["Best Seller", "Handmade"],
    desc: "A cloud-soft sweater hand-knitted from premium cotton yarn. Perfect for cozy days.",
    colors: ["#C98D82", "#EFDCC7", "#9CAE8C"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "p2",
    name: "Warm Winter Gloves",
    price: 48,
    image: "gloves.jpeg",
    category: "Wearables",
    badges: ["Handmade"],
    desc: "Hand-crocheted gloves with a textured pattern. Keep your hands warm in style.",
    colors: ["#3A2E28", "#C6A15B", "#9CAE8C"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "p3",
    name: "Classic Knit Tie",
    price: 38,
    image: "tie.jpeg",
    category: "Wearables",
    badges: ["Handmade"],
    desc: "A sophisticated crocheted tie with a subtle texture. Adds a unique touch to any outfit.",
    colors: ["#3A2E28", "#C98D82", "#9CAE8C"],
    sizes: ["One Size"],
  },
  {
    id: "p4",
    name: "Mesh Tie",
    price: 42,
    image: "tie2.jpeg",
    category: "Wearables",
    badges: ["Customizable"],
    desc: "A lightweight mesh tie with open stitch work. Breathable and perfect for warmer days.",
    colors: ["#C6A15B", "#3A2E28", "#EFDCC7"],
    sizes: ["One Size"],
  },
  {
    id: "p5",
    name: "Cardigan",
    price: 145,
    image: "Cardigan.jpeg",
    category: "Wearables",
    badges: ["Best Seller", "Handmade"],
    desc: "A beautifully crafted crochet cardigan. Soft, cozy, and perfect for layering.",
    colors: ["#C98D82", "#EFDCC7", "#9CAE8C"],
    sizes: ["S", "M", "L"],
  },

  // ========== FLORAL COLLECTION (6 items) ==========
  {
    id: "p6",
    name: "Rose Bouquet",
    price: 68,
    image: "rose_boquet.jpeg",
    category: "Floral Collection",
    badges: ["Best Seller", "Handmade"],
    desc: "A stunning hand-crocheted rose bouquet. Perfect as a gift or home decor.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p7",
    name: "Pink Tulip",
    price: 32,
    image: "pink_tulip.jpeg",
    category: "Floral Collection",
    badges: ["Handmade"],
    desc: "A delicate crocheted tulip in soft pink. Brings spring vibes all year round.",
    colors: ["#C98D82", "#EFDCC7", "#9CAE8C"],
    sizes: ["One Size"],
  },
  {
    id: "p8",
    name: "Red Rose",
    price: 38,
    image: "Roseee.jpeg",
    category: "Floral Collection",
    badges: ["Handmade"],
    desc: "A classic crocheted red rose. Timeless beauty that never fades.",
    colors: ["#C98D82", "#3A2E28", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p9",
    name: "Rose Pot",
    price: 42,
    image: "red_rose2.jpeg",
    category: "Floral Collection",
    badges: ["Handmade"],
    desc: "A beautiful crocheted rose in a pot. A charming addition to any space.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p10",
    name: "Single Rose",
    price: 28,
    image: "rose.jpeg",
    category: "Floral Collection",
    badges: ["Handmade"],
    desc: "A simple yet elegant single crocheted rose. Perfect for any occasion.",
    colors: ["#C98D82", "#C6A15B", "#3A2E28"],
    sizes: ["One Size"],
  },
  {
    id: "p11",
    name: "Sunflower",
    price: 35,
    image: "sunflower.jpeg",
    category: "Floral Collection",
    badges: ["Handmade"],
    desc: "A cheerful crocheted sunflower. Brings warmth and brightness wherever it goes.",
    colors: ["#C6A15B", "#C98D82", "#EFDCC7"],
    sizes: ["One Size"],
  },

  // ========== KEYCHAINS (5 items) ==========
  {
    id: "p12",
    name: "Chick Keychain II",
    price: 18,
    image: "chick2_keychain.jpeg",
    category: "Keychains",
    badges: ["Handmade"],
    desc: "A cute crocheted chick keychain with a cheerful expression and soft colors.",
    colors: ["#EFDCC7", "#9CAE8C", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p13",
    name: "Mini Flower Bouquet",
    price: 22,
    image: "keychain_bookeh.jpeg",
    category: "Keychains",
    badges: ["Handmade"],
    desc: "A charming mini flower bouquet keychain. Perfect for adding a touch of nature to your keys.",
    colors: ["#C6A15B", "#C98D82", "#9CAE8C"],
    sizes: ["One Size"],
  },
  {
    id: "p14",
    name: "Mini Octopus Keychain",
    price: 16,
    image: "octopus_keychain2.jpeg",
    category: "Keychains",
    badges: ["Handmade"],
    desc: "A miniature crocheted octopus keychain. Perfect for small bags and backpacks.",
    colors: ["#C98D82", "#EFDCC7", "#9CAE8C"],
    sizes: ["One Size"],
  },
  {
    id: "p15",
    name: "Sunflower Keychain",
    price: 20,
    image: "sunflower_keychain.jpeg",
    category: "Keychains",
    badges: ["Handmade"],
    desc: "A cheerful crocheted sunflower keychain. Brings sunshine wherever you go.",
    colors: ["#C6A15B", "#C98D82", "#3A2E28"],
    sizes: ["One Size"],
  },
  {
    id: "p16",
    name: "Daisy",
    price: 18,
    image: "Daisy.jpeg",
    category: "Keychains",
    badges: ["Handmade"],
    desc: "A lovely crocheted daisy flower. Simple, elegant, and perfect for any occasion.",
    colors: ["#EFDCC7", "#C6A15B", "#9CAE8C"],
    sizes: ["One Size"],
  },

  // ========== ACCESSORIES (6 items) ==========
  {
    id: "p17",
    name: "Gajra - Traditional Garland",
    price: 55,
    image: "gajra.jpeg",
    category: "Accessories",
    badges: ["Handmade"],
    desc: "A traditional crocheted gajra (flower garland). Perfect for special occasions and celebrations.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p18",
    name: "Rose Puff Gajra",
    price: 58,
    image: "Rose puff gajra.jpeg",
    category: "Accessories",
    badges: ["Handmade", "Customizable"],
    desc: "A beautiful rose puff gajra with soft, textured roses. Adds elegance to any traditional outfit.",
    colors: ["#C98D82", "#C6A15B", "#EFDCC7"],
    sizes: ["One Size"],
  },
  {
    id: "p19",
    name: "Paranda",
    price: 45,
    image: "paranda.jpeg",
    category: "Accessories",
    badges: ["Handmade"],
    desc: "A traditional crocheted paranda (hair tassel). Adds a pop of color and charm to your hairstyle.",
    colors: ["#C98D82", "#C6A15B", "#3A2E28"],
    sizes: ["One Size"],
  },
  {
    id: "p20",
    name: "Red Tulip Headband",
    price: 28,
    image: "tulip_headband.jpeg",
    category: "Accessories",
    badges: ["Handmade"],
    desc: "A beautiful headband featuring a red tulip. Comfortable, stylish, and perfect for any outfit.",
    colors: ["#C98D82", "#EFDCC7", "#3A2E28"],
    sizes: ["One Size"],
  },
  {
    id: "p21",
    name: "Hair Pins",
    price: 22,
    image: "pins.jpeg",
    category: "Accessories",
    badges: ["Handmade"],
    desc: "A set of hand-crocheted hair pins. Perfect for adding a touch of handmade beauty to your hair.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p22",
    name: "Daisy Headband",
    price: 28,
    image: "Daisy headband.jpeg",
    category: "Accessories",
    badges: ["Handmade"],
    desc: "A charming headband adorned with crocheted daisies. Sweet, comfortable, and perfect for spring.",
    colors: ["#EFDCC7", "#C6A15B", "#9CAE8C"],
    sizes: ["One Size"],
  },

  // ========== BAGS (4 items) ==========
  {
    id: "p23",
    name: "Daisy Dream Bag",
    price: 78,
    image: "Daisy Dream bag.jpeg",
    category: "Bags",
    badges: ["Handmade", "Customizable"],
    desc: "A beautiful crocheted bag with daisy flower details. Perfect for summer days and brightening any outfit.",
    colors: ["#EFDCC7", "#C6A15B", "#9CAE8C"],
    sizes: ["One Size"],
  },
  {
    id: "p24",
    name: "Pink Mini Wallet",
    price: 32,
    image: "pink mini wallet.jpeg",
    category: "Bags",
    badges: ["Handmade"],
    desc: "A cute mini wallet in soft pink. Compact and stylish for carrying your essentials.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p25",
    name: "Red Bunny Wallet",
    price: 38,
    image: "red bunny wallet.jpeg",
    category: "Bags",
    badges: ["Handmade"],
    desc: "An adorable red wallet with bunny ears detail. Makes a playful addition to your accessories.",
    colors: ["#C98D82", "#3A2E28", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p26",
    name: "Cherry Bow Bag",
    price: 82,
    image: "Cherry Bow bag.jpeg",
    category: "Bags",
    badges: ["Best Seller", "Handmade"],
    desc: "A charming bag featuring cherry and bow details. Sweet, stylish, and completely handmade.",
    colors: ["#C98D82", "#EFDCC7", "#3A2E28"],
    sizes: ["One Size"],
  },
];

/* ---------------------------------------------------------------------
   2b. HERO SLIDER IMAGES
   --------------------------------------------------------------------- */
const HERO_SLIDES = [
  "sweater.jpeg",
  "headphones_bunny.jpeg",
  "pearl_gajra.jpeg",
  "chick.jpeg",
  "rose_boquet.jpeg",
  "tie2.jpeg",
  "gajra2.jpeg",
  "octopus_keychain2.jpeg",
];

/* ---------------------------------------------------------------------
   3. STATE
   --------------------------------------------------------------------- */
const state = {
  cart: [],
  discount: 0,
  activeProduct: null,
  currentCategory: "All",
};

const fmt = (n) => `$${n.toFixed(2)}`;

/* ---------------------------------------------------------------------
   4. NAVBAR + MOBILE MENU
   --------------------------------------------------------------------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const mobileToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
mobileToggle.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
document.querySelectorAll("#mobile-menu a").forEach((a) =>
  a.addEventListener("click", () => mobileMenu.classList.add("hidden"))
);

/* ---------------------------------------------------------------------
   5. STITCH SCROLL PROGRESS
   --------------------------------------------------------------------- */
const stitchFg = document.getElementById("stitch-path-fg");
function updateStitchThread() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  const len = stitchFg.getTotalLength ? stitchFg.getTotalLength() : 300;
  stitchFg.style.strokeDasharray = `${len}`;
  stitchFg.style.strokeDashoffset = `${len * (1 - progress)}`;
}
window.addEventListener("scroll", updateStitchThread);
window.addEventListener("resize", updateStitchThread);
window.addEventListener("load", () => {
  const svg = document.getElementById("stitch-svg");
  const totalHeight = document.documentElement.scrollHeight;
  svg.setAttribute("viewBox", `0 0 28 ${totalHeight}`);
  let d = "M14,0 ";
  const loop = 60;
  for (let y = loop; y < totalHeight; y += loop) {
    d += `C24,${y - 40} 4,${y} 14,${y + 20} `;
  }
  document.getElementById("stitch-path-bg").setAttribute("d", d);
  stitchFg.setAttribute("d", d);
  updateStitchThread();
});

/* ---------------------------------------------------------------------
   6. 3D PARALLAX HERO EFFECT
   --------------------------------------------------------------------- */
function init3DHero() {
  const hero = document.getElementById("home");
  const slides = document.querySelectorAll(".hero-slide");
  if (!hero || slides.length === 0) return;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    slides.forEach((slide, i) => {
      const depth = (i + 1) * 0.02;
      const moveX = x * 20 * depth;
      const moveY = y * 20 * depth;
      slide.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    });
  });
  hero.addEventListener("mouseleave", () => {
    slides.forEach((slide) => {
      slide.style.transform = "translate(0, 0) scale(1)";
      slide.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    });
  });
}

/* ---------------------------------------------------------------------
   7. 3D FLOATING PARTICLES
   --------------------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  const colors = ["#C98D82", "#C6A15B", "#9CAE8C", "#EFDCC7"];
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = 3 + Math.random() * 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      opacity: ${0.15 + Math.random() * 0.25};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      box-shadow: 0 0 20px ${color}40;
    `;
    container.appendChild(particle);
    const duration = 15 + Math.random() * 20;
    const xMove = (Math.random() - 0.5) * 150;
    const yMove = (Math.random() - 0.5) * 150;
    gsap.to(particle, {
      x: xMove,
      y: yMove,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 10,
    });
    gsap.to(particle, {
      scale: 1.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.15,
      duration: 3 + Math.random() * 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 3,
    });
  }
}

/* ---------------------------------------------------------------------
   8. 3D TILT ON PRODUCT CARDS
   --------------------------------------------------------------------- */
function attachTilt(card) {
  const inner = card.querySelector(".product-card-inner");
  const image = card.querySelector(".product-image-wrap img");
  const maxTilt = 12;
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 1024) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -y * maxTilt * 2;
    const rotateY = x * maxTilt * 2;
    inner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(15px)`;
    if (image) {
      const imgX = x * 8;
      const imgY = y * 8;
      image.style.transform = `translate(${imgX}px, ${imgY}px) scale(1.05)`;
    }
    const glowX = (x + 0.5) * 100;
    const glowY = (y + 0.5) * 100;
    inner.style.setProperty('--glow-x', `${glowX}%`);
    inner.style.setProperty('--glow-y', `${glowY}%`);
  });
  card.addEventListener("mouseleave", () => {
    inner.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    inner.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
    if (image) {
      image.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      image.style.transform = "translate(0, 0) scale(1)";
    }
  });
}

/* ---------------------------------------------------------------------
   9. GSAP SCROLL REVEALS
   --------------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

function initReveals() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, scale: 0.95, rotationX: 5 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
    );
  });
  document.querySelectorAll(".product-card").forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 80, rotationX: 15, scale: 0.9 },
      { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1, delay: (i % 3) * 0.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } }
    );
  });
  document.querySelectorAll(".category-filter").forEach((el, i) => {
    const direction = i % 2 === 0 ? -50 : 50;
    gsap.fromTo(el,
      { opacity: 0, x: direction, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: "#category-filters", start: "top 85%", toggleActions: "play none none reverse" } }
    );
  });
}

/* ---------------------------------------------------------------------
   10. 3D FLOATING BADGE EFFECT
   --------------------------------------------------------------------- */
function initFloatingBadges() {
  document.querySelectorAll(".badge").forEach((badge) => {
    const randomDelay = Math.random() * 2;
    const randomDuration = 2 + Math.random() * 2;
    gsap.to(badge, { y: -3, scale: 1.05, duration: randomDuration, delay: randomDelay, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(badge, { rotation: 2, duration: randomDuration * 1.5, delay: randomDelay + 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
  });
}

/* ---------------------------------------------------------------------
   11. CATEGORY FILTER
   --------------------------------------------------------------------- */
function getCategories() {
  const cats = PRODUCTS.map(p => p.category);
  return ["All", ...new Set(cats)];
}

function filterProductsByCategory(category) {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/* ---------------------------------------------------------------------
   12. RENDER PRODUCT GRID
   --------------------------------------------------------------------- */
const badgeClassMap = {
  "Best Seller": "badge-bestseller",
  Customizable: "badge-customizable",
  Handmade: "badge-handmade",
};

function renderProducts(category = "All") {
  const grid = document.getElementById("product-grid");
  const filtered = filterProductsByCategory(category);
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-12 text-ink/50"><p class="text-lg">No products found in this category.</p></div>`;
    return;
  }
  grid.innerHTML = filtered.map((p) => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-card-inner" style="--glow-x: 50%; --glow-y: 50%;">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            ${p.badges.map((b) => `<span class="badge ${badgeClassMap[b]}">${b}</span>`).join("")}
          </div>
          <div class="quick-view-trigger" data-quickview="${p.id}">
            <span>Quick View</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-display text-lg mb-1">${p.name}</h3>
          <p class="text-rose-deep font-semibold mb-4">${fmt(p.price)}</p>
          <div class="flex gap-2">
            <button class="btn-glow flex-1 justify-center !py-2.5 !text-xs" data-add-cart="${p.id}">
              <span>Add to Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            <button class="btn-outline !py-2.5 !px-3.5" data-custom-request="${p.id}" aria-label="Custom Request">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20l7-11-7-6-7 6 7 11z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".product-card").forEach(attachTilt);
  grid.querySelectorAll("[data-add-cart]").forEach((btn) =>
    btn.addEventListener("click", (e) => { e.stopPropagation(); const id = btn.dataset.addCart; addToCart(id, e); })
  );
  grid.querySelectorAll("[data-quickview]").forEach((el) =>
    el.addEventListener("click", (e) => { e.stopPropagation(); openQuickView(el.dataset.quickview); })
  );
  grid.querySelectorAll("[data-custom-request]").forEach((btn) =>
    btn.addEventListener("click", (e) => { e.stopPropagation(); openCustomRequest(PRODUCTS.find((p) => p.id === btn.dataset.customRequest)); })
  );
  initReveals();
  initFloatingBadges();
}

function renderCategoryFilters() {
  const container = document.getElementById("category-filters");
  const categories = getCategories();
  container.innerHTML = categories.map(cat => `<button class="category-filter ${cat === "All" ? "active" : ""}" data-category="${cat}">${cat}</button>`).join("");
  container.querySelectorAll(".category-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      state.currentCategory = category;
      const cards = document.querySelectorAll(".product-card");
      if (cards.length > 0) {
        gsap.to(cards, { opacity: 0, y: 30, scale: 0.95, duration: 0.3, ease: "power2.in", onComplete: () => {
          container.querySelectorAll(".category-filter").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          renderProducts(category);
          const newCards = document.querySelectorAll(".product-card");
          gsap.fromTo(newCards, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" });
        }});
      } else {
        container.querySelectorAll(".category-filter").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(category);
      }
    });
  });
}

/* ---------------------------------------------------------------------
   13. NOTIFICATION SYSTEM
   --------------------------------------------------------------------- */
function showNotification(message) {
  const existing = document.querySelector(".notification-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "notification-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; background: #3A2E28; color: #FAF4EC;
    padding: 12px 24px; border-radius: 12px; font-size: 0.9rem; font-weight: 500;
    box-shadow: 0 10px 40px rgba(58, 46, 40, 0.3); z-index: 1000;
    opacity: 0; transform: translateY(20px); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    max-width: 90%;
  `;
  document.body.appendChild(toast);
  gsap.to(toast, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 });
  setTimeout(() => {
    gsap.to(toast, { opacity: 0, y: -20, duration: 0.4, ease: "power3.in", onComplete: () => toast.remove() });
  }, 2500);
}

/* ---------------------------------------------------------------------
   14. CART LOGIC
   --------------------------------------------------------------------- */
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCountEl = document.getElementById("cart-count");

function addToCart(productId, event, opts = {}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const key = `${productId}-${opts.color || "default"}-${opts.size || "default"}`;
  const existing = state.cart.find((i) => i.key === key);
  if (existing) { existing.qty += 1; } else {
    state.cart.push({ key, id: product.id, name: product.name, price: product.price, image: product.image, qty: 1, color: opts.color || null, size: opts.size || null });
  }
  renderCart();
  pulseCartBadge();
  showNotification(`${product.name} added to cart 🛒`);
  if (event) flyToCart(event, product.image);
}

function updateQty(key, delta) {
  const item = state.cart.find((i) => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter((i) => i.key !== key);
  renderCart();
}

function removeFromCart(key) {
  state.cart = state.cart.filter((i) => i.key !== key);
  renderCart();
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmt = subtotal * state.discount;
  const total = Math.max(subtotal - discountAmt, 0);
  return { subtotal, discountAmt, total };
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const emptyState = document.getElementById("cart-empty");
  if (state.cart.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    container.innerHTML = state.cart.map((i) => `
      <div class="cart-item" data-key="${i.key}">
        <img src="${i.image}" alt="${i.name}">
        <div class="flex-1">
          <div class="flex justify-between gap-2">
            <h4 class="font-semibold text-sm leading-tight">${i.name}</h4>
            <button class="text-ink/30 hover:text-rose-deep transition-colors" data-remove="${i.key}" aria-label="Remove">&times;</button>
          </div>
          <p class="text-xs text-ink/50 mt-0.5">${[i.color, i.size].filter(Boolean).join(" · ") || "Standard"}</p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <button class="qty-btn" data-qty-minus="${i.key}">−</button>
              <span class="text-sm w-4 text-center">${i.qty}</span>
              <button class="qty-btn" data-qty-plus="${i.key}">+</button>
            </div>
            <span class="text-sm font-semibold text-rose-deep">${fmt(i.price * i.qty)}</span>
          </div>
        </div>
      </div>
    `).join("");
  }
  container.querySelectorAll("[data-qty-plus]").forEach((b) => b.addEventListener("click", () => updateQty(b.dataset.qtyPlus, 1)));
  container.querySelectorAll("[data-qty-minus]").forEach((b) => b.addEventListener("click", () => updateQty(b.dataset.qtyMinus, -1)));
  container.querySelectorAll("[data-remove]").forEach((b) => b.addEventListener("click", () => removeFromCart(b.dataset.remove)));
  const { subtotal, discountAmt, total } = cartTotals();
  document.getElementById("cart-subtotal").textContent = fmt(subtotal);
  document.getElementById("cart-discount").textContent = `-${fmt(discountAmt)}`;
  document.getElementById("cart-total").textContent = fmt(total);
  document.getElementById("checkout-total").textContent = fmt(total);
  const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalItems;
}

function pulseCartBadge() {
  cartCountEl.classList.remove("pulse");
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add("pulse");
}

function flyToCart(event, imageSrc) {
  const flyLayer = document.getElementById("fly-layer");
  const cartBtn = document.getElementById("cart-toggle");
  const startRect = event.currentTarget.getBoundingClientRect();
  const endRect = cartBtn.getBoundingClientRect();
  const img = document.createElement("img");
  img.src = imageSrc;
  img.className = "fly-item";
  img.style.left = `${startRect.left + startRect.width / 2 - 20}px`;
  img.style.top = `${startRect.top + startRect.height / 2 - 20}px`;
  img.style.width = "40px";
  img.style.height = "40px";
  img.style.borderRadius = "50%";
  img.style.boxShadow = "0 20px 60px rgba(198, 161, 91, 0.5)";
  img.style.objectFit = "cover";
  flyLayer.appendChild(img);
  gsap.to(img, {
    left: endRect.left + endRect.width / 2 - 10,
    top: endRect.top + endRect.height / 2 - 10,
    width: 16, height: 16, opacity: 0.4, duration: 0.7, ease: "power2.in",
    onComplete: () => { gsap.to(img, { scale: 1.3, duration: 0.2, onComplete: () => img.remove() }); }
  });
}

function openCart() { cartDrawer.classList.add("active"); cartOverlay.classList.add("active"); }
function closeCart() { cartDrawer.classList.remove("active"); cartOverlay.classList.remove("active"); }
document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", () => { closeCart(); closeAllModals(); });

document.getElementById("promo-apply").addEventListener("click", () => {
  const code = document.getElementById("promo-input").value.trim().toUpperCase();
  const validCodes = { WOOLLY10: 0.1, WELCOME15: 0.15 };
  state.discount = validCodes[code] || 0;
  renderCart();
});

/* ---------------------------------------------------------------------
   15. QUICK VIEW MODAL
   --------------------------------------------------------------------- */
const quickviewModal = document.getElementById("quickview-modal");

function openQuickView(productId) {
  const p = PRODUCTS.find((pr) => pr.id === productId);
  if (!p) return;
  state.activeProduct = { ...p, selectedColor: p.colors[0], selectedSize: p.sizes[0] };
  document.getElementById("qv-image").src = p.image;
  document.getElementById("qv-image").alt = p.name;
  document.getElementById("qv-title").textContent = p.name;
  document.getElementById("qv-price").textContent = fmt(p.price);
  document.getElementById("qv-desc").textContent = p.desc;
  document.getElementById("qv-badges").innerHTML = p.badges.map((b) => `<span class="badge ${badgeClassMap[b]}">${b}</span>`).join("");
  document.getElementById("qv-colors").innerHTML = p.colors.map((c, i) => `<span class="swatch ${i === 0 ? "active" : ""}" style="background:${c}" data-color="${c}"></span>`).join("");
  document.getElementById("qv-sizes").innerHTML = p.sizes.map((s, i) => `<span class="size-pill ${i === 0 ? "active" : ""}" data-size="${s}">${s}</span>`).join("");
  document.querySelectorAll("#qv-colors .swatch").forEach((el) =>
    el.addEventListener("click", () => {
      document.querySelectorAll("#qv-colors .swatch").forEach((s) => s.classList.remove("active"));
      el.classList.add("active");
      state.activeProduct.selectedColor = el.dataset.color;
    })
  );
  document.querySelectorAll("#qv-sizes .size-pill").forEach((el) =>
    el.addEventListener("click", () => {
      document.querySelectorAll("#qv-sizes .size-pill").forEach((s) => s.classList.remove("active"));
      el.classList.add("active");
      state.activeProduct.selectedSize = el.dataset.size;
    })
  );
  openModal(quickviewModal);
}

document.getElementById("qv-add-cart").addEventListener("click", (e) => {
  if (!state.activeProduct) return;
  addToCart(state.activeProduct.id, e, { color: state.activeProduct.selectedColor, size: state.activeProduct.selectedSize });
  closeAllModals();
  openCart();
});

document.getElementById("qv-custom").addEventListener("click", () => {
  if (state.activeProduct) openCustomRequest(state.activeProduct);
});

/* ---------------------------------------------------------------------
   16. CUSTOM REQUEST -> Instagram DM (copy-to-clipboard + modal)
   --------------------------------------------------------------------- */
const customRequestModal = document.getElementById("custom-request-modal");
const customRequestPreview = document.getElementById("custom-request-preview");
const customRequestOpenDM = document.getElementById("custom-request-open-dm");
const customRequestCopyAgain = document.getElementById("custom-request-copy-again");
let pendingCustomRequestText = "";

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      resolve();
    } catch (err) { reject(err); }
  });
}

function openCustomRequestModal(text) {
  pendingCustomRequestText = text;
  customRequestPreview.textContent = text;
  const igUrl = `https://ig.me/m/${CONFIG.instagramHandle}`;
  const profileUrl = `https://www.instagram.com/${CONFIG.instagramHandle}/`;
  customRequestOpenDM.href = igUrl;
  customRequestOpenDM.dataset.fallback = profileUrl;
  copyText(text).then(() => showNotification("Message copied to clipboard 📋")).catch(() => showNotification("Couldn't auto-copy — you can copy it from the box below."));
  openModal(customRequestModal);
}

function openCustomRequest(product) {
  const text = `Hi! I'd love a custom version of the "${product.name}" ($${product.price.toFixed(2)}). Here's what I'm thinking: `;
  openCustomRequestModal(text);
}

document.getElementById("bespoke-cta").addEventListener("click", (e) => {
  e.preventDefault();
  const text = `Hi! I'd love to design a custom Woolley Wonders piece. `;
  openCustomRequestModal(text);
});

customRequestOpenDM.addEventListener("click", (e) => {
  e.preventDefault();
  const newWindow = window.open(customRequestOpenDM.href, "_blank");
  if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
    window.open(customRequestOpenDM.dataset.fallback, "_blank");
  }
});

customRequestCopyAgain.addEventListener("click", () => {
  copyText(pendingCustomRequestText).then(() => showNotification("Copied again 📋")).catch(() => showNotification("Copy failed — select the text manually."));
});

/* ---------------------------------------------------------------------
   17. MODAL HELPERS
   --------------------------------------------------------------------- */
function openModal(modalEl) { modalEl.classList.add("active"); }
function closeAllModals() { document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("active")); }
document.querySelectorAll("[data-close-modal]").forEach((btn) => btn.addEventListener("click", closeAllModals));
document.querySelectorAll(".modal-overlay").forEach((overlay) => overlay.addEventListener("click", (e) => { if (e.target === overlay) closeAllModals(); }));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeAllModals(); closeCart(); } });

const checkoutModal = document.getElementById("checkout-modal");
document.getElementById("checkout-open").addEventListener("click", () => {
  if (state.cart.length === 0) return;
  const { total } = cartTotals();
  document.getElementById("checkout-total").textContent = fmt(total);
  openModal(checkoutModal);
});

/* ---------------------------------------------------------------------
   18. BESPOKE INQUIRY FORM (EmailJS)
   --------------------------------------------------------------------- */
document.getElementById("bespoke-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("bespoke-status");
  const data = Object.fromEntries(new FormData(form).entries());
  if (!emailjsReady()) {
    status.textContent = "Email isn't configured yet — see README for EmailJS setup.";
    status.className = "text-sm text-center text-rose-deep";
    status.classList.remove("hidden");
    return;
  }
  try {
    setSubmitting(form, true);
    await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.inquiryTemplateId, {
      customer_name: data.name,
      customer_contact: data.contact,
      request_details: data.details,
    });
    status.textContent = "Inquiry sent! We'll reply within 48 hours.";
    status.className = "text-sm text-center text-sage-deep";
    status.classList.remove("hidden");
    form.reset();
  } catch (err) {
    status.textContent = "Something went wrong sending your inquiry. Please try again.";
    status.className = "text-sm text-center text-rose-deep";
    status.classList.remove("hidden");
  } finally { setSubmitting(form, false); }
});

/* ---------------------------------------------------------------------
   19. CHECKOUT FORM -> EmailJS order email
   --------------------------------------------------------------------- */
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("checkout-status");
  const data = Object.fromEntries(new FormData(form).entries());
  const { subtotal, discountAmt, total } = cartTotals();
  const itemsList = state.cart.map((i) => `${i.qty} × ${i.name}${i.color ? ` (${i.color})` : ""}${i.size ? ` [${i.size}]` : ""} — ${fmt(i.price * i.qty)}`).join("\n");
  const orderPayload = {
    customer_name: data.name,
    customer_email: data.email,
    customer_phone: data.phone,
    shipping_address: data.address,
    customization_notes: data.notes || "None",
    items_list: itemsList,
    subtotal: fmt(subtotal),
    discount: fmt(discountAmt),
    order_total: fmt(total),
    order_date: new Date().toLocaleString(),
  };
  if (!emailjsReady()) {
    status.textContent = "Email isn't configured yet — see README for EmailJS setup.";
    status.className = "text-sm text-center text-rose-deep";
    status.classList.remove("hidden");
    return;
  }
  try {
    setSubmitting(form, true);
    await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.orderTemplateId, orderPayload);
    status.textContent = "Order confirmed! A summary is on its way to your inbox.";
    status.className = "text-sm text-center text-sage-deep";
    status.classList.remove("hidden");
    state.cart = [];
    state.discount = 0;
    renderCart();
    form.reset();
    setTimeout(() => { closeAllModals(); closeCart(); status.classList.add("hidden"); }, 2200);
  } catch (err) {
    status.textContent = "Something went wrong sending your order. Please try again.";
    status.className = "text-sm text-center text-rose-deep";
    status.classList.remove("hidden");
  } finally { setSubmitting(form, false); }
});

function emailjsReady() {
  return window.emailjs && CONFIG.emailjs.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" && CONFIG.emailjs.serviceId !== "YOUR_EMAILJS_SERVICE_ID";
}

function setSubmitting(form, isSubmitting) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  btn.disabled = isSubmitting;
  btn.style.opacity = isSubmitting ? 0.6 : 1;
  btn.textContent = isSubmitting ? "Sending..." : btn.closest("#checkout-form") ? "Confirm Order" : "Send Inquiry";
}

/* ---------------------------------------------------------------------
   20. HERO SLIDER — smooth crossfade with Ken Burns
   --------------------------------------------------------------------- */
function initHeroSlider() {
  const sliderEl = document.getElementById("hero-slider");
  const dotsEl = document.getElementById("hero-dots");
  if (!sliderEl || !dotsEl || HERO_SLIDES.length === 0) return;

  sliderEl.innerHTML = HERO_SLIDES.map((url, i) =>
    `<div class="hero-slide${i === 0 ? " active" : ""}" style="background-image:url('${url}')"></div>`
  ).join("");
  dotsEl.innerHTML = HERO_SLIDES.map((_, i) => `<button class="hero-dot${i === 0 ? " active" : ""}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("");

  const slideEls = [...sliderEl.querySelectorAll(".hero-slide")];
  const dotEls = [...dotsEl.querySelectorAll(".hero-dot")];
  let current = 0;
  let timer = null;
  let animating = false;

  gsap.set(slideEls, { opacity: 0, scale: 1.08 });
  gsap.set(slideEls[0], { opacity: 1 });
  gsap.to(slideEls[0], { scale: 1, duration: 6, ease: "sine.out" });

  function goTo(index) {
    const next = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    if (next === current || animating) return;
    animating = true;

    const prevEl = slideEls[current];
    const nextEl = slideEls[next];

    gsap.killTweensOf([prevEl, nextEl]);
    gsap.set(nextEl, { scale: 1.08, zIndex: 2 });
    gsap.set(prevEl, { zIndex: 1 });
    gsap.to(prevEl, { opacity: 0, duration: 1, ease: "power2.inOut" });
    gsap.to(nextEl, { opacity: 1, duration: 1, ease: "power2.inOut", onComplete: () => { animating = false; } });
    gsap.to(nextEl, { scale: 1, duration: 6, ease: "sine.out" });

    dotEls.forEach((el, i) => el.classList.toggle("active", i === next));
    slideEls.forEach((el, i) => el.classList.toggle("active", i === next));
    current = next;
  }

  function startAutoplay() {
    clearInterval(timer);
    if (HERO_SLIDES.length > 1) {
      timer = setInterval(() => goTo(current + 1), 2500);
    }
  }

  dotEls.forEach((dot) => dot.addEventListener("click", () => { goTo(Number(dot.dataset.slide)); startAutoplay(); }));

  let touchStartX = null;
  sliderEl.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) { goTo(current + (delta < 0 ? 1 : -1)); startAutoplay(); }
    touchStartX = null;
  }, { passive: true });

  startAutoplay();
  init3DHero();
}

/* ---------------------------------------------------------------------
   21. SMOOTH PAGE TRANSITIONS & NAVIGATION (FIXED)
   --------------------------------------------------------------------- */
function initPageTransitions() {
  // Fade in page on load
  document.body.style.opacity = "0";
  gsap.to(document.body, {
    opacity: 1,
    duration: 0.8,
    ease: "power3.inOut",
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#" || href === "" || href === "#home") {
        e.preventDefault();
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      e.preventDefault();
      const targetId = href.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        // Use native smooth scroll for reliability
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      } else {
        console.warn(`Target "#${targetId}" not found`);
      }
    });
  });
}

/* ---------------------------------------------------------------------
   22. INIT
   --------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

const hero = document.getElementById("home");
if (hero) {
  const particlesDiv = document.createElement("div");
  particlesDiv.id = "particles-container";
  particlesDiv.style.cssText = `
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;
  `;
  hero.appendChild(particlesDiv);
}

renderProducts();
renderCategoryFilters();
initHeroSlider();
renderCart();
initParticles();
initPageTransitions();