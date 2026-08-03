/* =====================================================================
   WOOLLEY WONDERS — main script
   Sections: Config, Product Data, State, 3D Hero, Scroll FX, Tilt,
             Rendering, Cart Logic, Modals, Forms + EmailJS
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. CONFIG — fill these in before going live
   --------------------------------------------------------------------- */
const CONFIG = {
  instagramHandle: "woolleywonders", // used for DM deep-links
  whatsappNumber: "10000000000",     // country code + number, digits only

  // EmailJS — see README for setup steps
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
   2. PRODUCT DATA — replace image URLs with your own product photos
   --------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Blush Bloom Cardigan",
    price: 128,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1000&auto=format&fit=crop",
    badges: ["Best Seller", "Handmade"],
    desc: "A cropped, cloud-soft cardigan looped from brushed cotton yarn in a warm blush tone.",
    colors: ["#C98D82", "#EFDCC7", "#9CAE8C"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "p2",
    name: "Sage Trellis Tote",
    price: 68,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
    badges: ["Customizable"],
    desc: "A structured market tote with an openwork trellis stitch, finished with leather straps.",
    colors: ["#9CAE8C", "#3A2E28", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p3",
    name: "Golden Hour Beanie",
    price: 38,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop",
    badges: ["Handmade"],
    desc: "A ribbed slouch beanie in a warm gold blend, lined for extra softness.",
    colors: ["#C6A15B", "#3A2E28", "#EFDCC7"],
    sizes: ["One Size"],
  },
  {
    id: "p4",
    name: "Cloud Nine Baby Blanket",
    price: 96,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=1000&auto=format&fit=crop",
    badges: ["Customizable", "Best Seller"],
    desc: "An heirloom-weight blanket in a gentle shell stitch — a sweet, lasting keepsake.",
    colors: ["#EFDCC7", "#C98D82", "#9CAE8C"],
    sizes: ["30x30\"", "36x36\""],
  },
  {
    id: "p5",
    name: "Rosewater Scrunchie Set",
    price: 24,
    image: "https://images.unsplash.com/photo-1620921575117-2b6c0f4a7a6c?q=80&w=1000&auto=format&fit=crop",
    badges: ["Handmade"],
    desc: "A set of three textured scrunchies in tonal rose shades — soft on hair, gentle on the planet.",
    colors: ["#C98D82", "#EFDCC7", "#C6A15B"],
    sizes: ["One Size"],
  },
  {
    id: "p6",
    name: "Willow Home Basket",
    price: 84,
    image: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?q=80&w=1000&auto=format&fit=crop",
    badges: ["Customizable"],
    desc: "A sculptural storage basket in chunky cotton rope, holds its shape beautifully.",
    colors: ["#3A2E28", "#9CAE8C", "#EFDCC7"],
    sizes: ["S", "M"],
  },
];

/* ---------------------------------------------------------------------
   3. STATE
   --------------------------------------------------------------------- */
const state = {
  cart: [], // { id, name, price, image, qty, color, size }
  discount: 0,
  activeProduct: null,
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
   5. STITCH SCROLL PROGRESS (signature element)
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
  // stretch the stitch path svg to full document height
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
   6. GSAP SCROLL REVEALS
   --------------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

function initReveals() {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  document.querySelectorAll(".product-card").forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );
  });
}

/* ---------------------------------------------------------------------
   7. 3D TILT ON PRODUCT CARDS
   --------------------------------------------------------------------- */
function attachTilt(card) {
  const inner = card.querySelector(".product-card-inner");
  const maxTilt = 8;
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transform = `rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(10px)`;
  });
  card.addEventListener("mouseleave", () => {
    inner.style.transform = `rotateY(0) rotateX(0) translateZ(0)`;
  });
}

/* ---------------------------------------------------------------------
   8. THREE.JS HERO — procedural yarn ball, reacts to cursor
   --------------------------------------------------------------------- */
function initHero3D() {
  const container = document.getElementById("hero-3d-canvas");
  if (!container || !window.THREE) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting — pulled back significantly; the previous intensities were
  // blowing the core out to near-white, washing out the strand colors.
  scene.add(new THREE.AmbientLight(0xfaf4ec, 0.55));
  const key = new THREE.PointLight(0xc6a15b, 0.75, 20);
  key.position.set(4, 4, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0xc98d82, 0.4, 20);
  fill.position.set(-4, -2, 3);
  scene.add(fill);

  // Yarn ball core
  const group = new THREE.Group();
  const coreGeo = new THREE.SphereGeometry(1.6, 32, 32);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xc98d82,
    roughness: 0.95,
    metalness: 0,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Wrapped "yarn" strands using torus rings at varied rotations —
  // matte (higher roughness, no metalness) so they read as fiber and
  // stay visible instead of catching a glare.
  const strandColors = [0xc6a15b, 0x9cae8c, 0xefdcc7, 0xb4756a];
  for (let i = 0; i < 26; i++) {
    const radius = 1.62 + Math.random() * 0.05;
    const tube = 0.028;
    const torusGeo = new THREE.TorusGeometry(radius, tube, 8, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: strandColors[i % strandColors.length],
      roughness: 0.88,
      metalness: 0,
    });
    const torus = new THREE.Mesh(torusGeo, mat);
    torus.rotation.x = Math.random() * Math.PI;
    torus.rotation.y = Math.random() * Math.PI;
    torus.rotation.z = Math.random() * Math.PI;
    group.add(torus);
  }

  scene.add(group);

  // ---------------------------------------------------------------------
  // Authentic ergonomic crochet hook — short metal head/hook portion
  // (aluminium-style, polished) fused to a long tapered ergonomic grip
  // (matte, dark warm tone), matching a real inline crochet hook rather
  // than a plain rod. Lives in the same scene as the yarn ball and
  // receives its own lagged cursor-driven motion.
  // ---------------------------------------------------------------------
  const hookGroup = new THREE.Group();

  // Polished metal — the working head/hook portion
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xd8b56e,
    roughness: 0.22,
    metalness: 0.75,
    emissive: 0x2a1a08,
    emissiveIntensity: 0.05,
  });
  // Matte ergonomic grip — dark, on-brand warm tone, contrasts with the metal
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x3a2e28,
    roughness: 0.75,
    metalness: 0.08,
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0xc98d82, // saturated rose, not white/cream — needs to stay visibly a thread
    roughness: 0.9,
    metalness: 0,
  });

  const gripLen = 1.55;
  const bottomY = -gripLen; // grip tapers to a point at the very bottom
  const collarY = 0; // where grip meets metal

  // ---- Ergonomic grip: a continuous revolved profile that narrows to a
  // point at the bottom, widens for a comfortable hold in the upper
  // third, then narrows again into the metal collar — matching a real
  // rubberized/aluminium ergonomic handle rather than a stacked rod. ----
  const gripProfile = [
    [0.0, bottomY],
    [0.02, bottomY + 0.05],
    [0.05, bottomY + 0.25],
    [0.075, bottomY + 0.55],
    [0.085, bottomY + 0.85], // widest point — the grip zone
    [0.082, bottomY + 1.05],
    [0.065, bottomY + 1.3],
    [0.04, bottomY + 1.46],
    [0.024, collarY], // narrows into the collar
  ];
  const gripGeo = new THREE.LatheGeometry(
    gripProfile.map(([r, y]) => new THREE.Vector2(r, y)),
    32
  );
  const grip = new THREE.Mesh(gripGeo, gripMat);
  hookGroup.add(grip);

  // Thumb rest — a distinct flat facet in the grip zone, where a hook is
  // naturally held between thumb and forefinger.
  const thumbFacet = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.016), gripMat);
  thumbFacet.position.set(0, bottomY + 0.85, 0.078);
  hookGroup.add(thumbFacet);

  // Metal collar/ferrule at the grip-to-metal transition
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.008, 12, 24), metalMat);
  collar.position.y = collarY;
  collar.rotation.x = Math.PI / 2;
  hookGroup.add(collar);

  // Smooth tapered metal neck rising from the collar to the head
  const neckLen = 0.26;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.022, neckLen, 20), metalMat);
  neck.position.y = collarY + neckLen / 2;
  hookGroup.add(neck);

  const headY = collarY + neckLen;

  // The head — a small bulge right before the throat/lip
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 16), metalMat);
  head.position.y = headY;
  hookGroup.add(head);

  // Inline throat notch — the cut groove where the yarn sits
  const throat = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.006, 10, 20), metalMat);
  throat.position.y = headY + 0.018;
  throat.rotation.x = Math.PI / 2;
  hookGroup.add(throat);

  // The hooked lip — small, tight curl that actually reads as a hook
  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.013, 14, 28, Math.PI * 1.3), metalMat);
  lip.position.set(0.008, headY + 0.038, 0);
  lip.rotation.set(Math.PI / 2, 0, Math.PI * 0.52);
  hookGroup.add(lip);

  // Fine point beyond the lip
  const point = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.04, 16), metalMat);
  point.position.set(0.042, headY + 0.06, 0);
  point.rotation.z = -0.35;
  hookGroup.add(point);

  const tipY = headY + 0.08;
  const tipWorldLocal = new THREE.Vector3(0.045, tipY, 0); // local coords near the lip/throat, used to route the working thread

  // A dedicated highlight + fill light keep the metal head glinting
  const hookGlint = new THREE.PointLight(0xffffff, 1.6, 8);
  hookGlint.position.set(-0.6, 1.0, 3.4);
  scene.add(hookGlint);
  const hookFill = new THREE.PointLight(0xefdcc7, 0.7, 8);
  hookFill.position.set(-1.8, -0.6, 1.6);
  scene.add(hookFill);

  // Positioned so it clears the yarn ball's on-screen silhouette entirely
  // (checked against the ball's projected edge, not just raw world
  // position — being closer to the camera than the ball means a modest
  // world-space offset isn't automatically enough) while also staying
  // inside the camera's visible frustum at every breakpoint.
  const HOOK_BASE_X = -1.4;
  const HOOK_BASE_Y = 0.15;
  const HOOK_BASE_Z = 1.85;
  const HOOK_BASE_TILT = -0.314; // ~18°, gentle diagonal
  hookGroup.position.set(HOOK_BASE_X, HOOK_BASE_Y, HOOK_BASE_Z);
  hookGroup.rotation.z = HOOK_BASE_TILT;
  hookGroup.scale.set(0.72, 0.72, 0.72);
  scene.add(hookGroup);

  // ---------------------------------------------------------------------
  // Active working thread — a single strand that appears to come off the
  // yarn ball, drapes with a natural sag rather than pulling taut in a
  // straight line, threads through the throat notch, and forms a small
  // working loop at the very tip, as if mid-stitch.
  // ---------------------------------------------------------------------
  const hookWorldMatrix = new THREE.Matrix4().compose(
    hookGroup.position,
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, HOOK_BASE_TILT)),
    hookGroup.scale
  );
  const throatWorld = new THREE.Vector3(0.01, headY + 0.018, 0).applyMatrix4(hookWorldMatrix);
  const tipWorld = tipWorldLocal.clone().applyMatrix4(hookWorldMatrix);

  const ballStart = new THREE.Vector3(-0.35, -0.45, 1.52); // on the ball's near-left surface, facing the hook
  const threadPoints = [
    ballStart,
    new THREE.Vector3(-0.75, -0.85, 1.65), // sags downward under its own weight
    new THREE.Vector3(-1.15, -0.95, 1.75),
    new THREE.Vector3(-1.35, -0.7, 1.8),
    throatWorld.clone().add(new THREE.Vector3(-0.06, 0.015, 0.02)), // approaches the throat
    throatWorld, // threads through the notch
    tipWorld.clone().add(new THREE.Vector3(0.02, 0.025, 0.02)),
    tipWorld.clone().add(new THREE.Vector3(0.055, 0.06, -0.02)), // small working loop at the tip
    tipWorld.clone().add(new THREE.Vector3(0.025, 0.08, 0.022)),
    tipWorld.clone().add(new THREE.Vector3(-0.018, 0.045, -0.014)),
  ];
  const workingThreadCurve = new THREE.CatmullRomCurve3(threadPoints, false, "catmullrom", 0.6);
  const workingThread = new THREE.Mesh(
    new THREE.TubeGeometry(workingThreadCurve, 80, 0.013, 8, false),
    threadMat
  );
  scene.add(workingThread);

  // Mouse tracking — the ball uses its own smoothing; the hook gets a
  // separate, slightly slower-lerped target so it lags behind and drifts
  // independently rather than moving in perfect lockstep with the ball.
  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  const hookTarget = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function animate() {
    requestAnimationFrame(animate);
    target.x += (mouse.x - target.x) * 0.04;
    target.y += (mouse.y - target.y) * 0.04;
    hookTarget.x += (mouse.x - hookTarget.x) * 0.05; // subtle spring/lag
    hookTarget.y += (mouse.y - hookTarget.y) * 0.05;

    // Yarn ball
    group.rotation.y += 0.004 + target.x * 0.01;
    group.rotation.x = target.y * 0.35;
    group.position.y = Math.sin(Date.now() * 0.001) * 0.15;

    // Hook — its own lagged target plus a phase-shifted bob, kept subtle
    // so it reads as gently anchored near the ball rather than drifting
    // freely in open space.
    hookGroup.rotation.z = HOOK_BASE_TILT + hookTarget.x * 0.06;
    hookGroup.rotation.x = hookTarget.y * 0.08;
    hookGroup.position.y = HOOK_BASE_Y + Math.sin(Date.now() * 0.001 + 1.4) * 0.04;
    hookGlint.position.y = 1.0 + Math.sin(Date.now() * 0.001 + 1.4) * 0.04;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ---------------------------------------------------------------------
   9. RENDER PRODUCT GRID
   --------------------------------------------------------------------- */
const badgeClassMap = {
  "Best Seller": "badge-bestseller",
  Customizable: "badge-customizable",
  Handmade: "badge-handmade",
};

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-card-inner">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            ${p.badges.map((b) => `<span class="badge ${badgeClassMap[b]}">${b}</span>`).join("")}
          </div>
          <div class="quick-view-trigger" data-quickview="${p.id}">Quick View</div>
        </div>
        <div class="p-5">
          <h3 class="font-display text-lg mb-1">${p.name}</h3>
          <p class="text-rose-deep font-semibold mb-4">${fmt(p.price)}</p>
          <div class="flex gap-2">
            <button class="btn-glow flex-1 justify-center !py-2.5 !text-xs" data-add-cart="${p.id}">Add to Cart</button>
            <button class="btn-outline !py-2.5 !px-3.5" data-custom-request="${p.id}" aria-label="Custom Request">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20l7-11-7-6-7 6 7 11z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>`
  ).join("");

  grid.querySelectorAll(".product-card").forEach(attachTilt);

  grid.querySelectorAll("[data-add-cart]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = btn.dataset.addCart;
      addToCart(id, e);
    })
  );
  grid.querySelectorAll("[data-quickview]").forEach((el) =>
    el.addEventListener("click", () => openQuickView(el.dataset.quickview))
  );
  grid.querySelectorAll("[data-custom-request]").forEach((btn) =>
    btn.addEventListener("click", () => openCustomRequest(PRODUCTS.find((p) => p.id === btn.dataset.customRequest)))
  );

  initReveals();
}

/* ---------------------------------------------------------------------
   10. CART LOGIC
   --------------------------------------------------------------------- */
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCountEl = document.getElementById("cart-count");

function addToCart(productId, event, opts = {}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const key = `${productId}-${opts.color || "default"}-${opts.size || "default"}`;
  const existing = state.cart.find((i) => i.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      key,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      color: opts.color || null,
      size: opts.size || null,
    });
  }

  renderCart();
  pulseCartBadge();
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
    container.innerHTML = state.cart
      .map(
        (i) => `
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
      </div>`
      )
      .join("");
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
  void cartCountEl.offsetWidth; // restart animation
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
  flyLayer.appendChild(img);

  gsap.to(img, {
    left: endRect.left + endRect.width / 2 - 10,
    top: endRect.top + endRect.height / 2 - 10,
    width: 16,
    height: 16,
    opacity: 0.4,
    duration: 0.7,
    ease: "power2.in",
    onComplete: () => img.remove(),
  });
}

function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}
function closeCart() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}
document.getElementById("cart-toggle").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", () => {
  closeCart();
  closeAllModals();
});

/* Promo code */
document.getElementById("promo-apply").addEventListener("click", () => {
  const code = document.getElementById("promo-input").value.trim().toUpperCase();
  const validCodes = { WOOLLY10: 0.1, WELCOME15: 0.15 };
  state.discount = validCodes[code] || 0;
  renderCart();
});


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
  document.getElementById("qv-badges").innerHTML = p.badges
    .map((b) => `<span class="badge ${badgeClassMap[b]}">${b}</span>`)
    .join("");

  document.getElementById("qv-colors").innerHTML = p.colors
    .map((c, i) => `<span class="swatch ${i === 0 ? "active" : ""}" style="background:${c}" data-color="${c}"></span>`)
    .join("");
  document.getElementById("qv-sizes").innerHTML = p.sizes
    .map((s, i) => `<span class="size-pill ${i === 0 ? "active" : ""}" data-size="${s}">${s}</span>`)
    .join("");

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
  addToCart(state.activeProduct.id, e, {
    color: state.activeProduct.selectedColor,
    size: state.activeProduct.selectedSize,
  });
  closeAllModals();
  openCart();
});

document.getElementById("qv-custom").addEventListener("click", () => {
  if (state.activeProduct) openCustomRequest(state.activeProduct);
});

function openCustomRequest(product) {
  const text = `Hi! I'd love a custom version of the "${product.name}" (${fmt(product.price)}). Here's what I'm thinking: `;
  const url = `https://ig.me/m/${CONFIG.instagramHandle}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

document.getElementById("bespoke-cta").addEventListener("click", (e) => {
  e.preventDefault();
  const url = `https://ig.me/m/${CONFIG.instagramHandle}?text=${encodeURIComponent("Hi! I'd love to design a custom Woolley Wonders piece. ")}`;
  window.open(url, "_blank");
});


function openModal(modalEl) {
  modalEl.classList.add("active");
}
function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("active"));
}
document.querySelectorAll("[data-close-modal]").forEach((btn) =>
  btn.addEventListener("click", closeAllModals)
);
document.querySelectorAll(".modal-overlay").forEach((overlay) =>
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAllModals();
  })
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
    closeCart();
  }
});

const checkoutModal = document.getElementById("checkout-modal");
document.getElementById("checkout-open").addEventListener("click", () => {
  if (state.cart.length === 0) return;
  const { total } = cartTotals();
  document.getElementById("checkout-total").textContent = fmt(total);
  openModal(checkoutModal);
});


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
  } finally {
    setSubmitting(form, false);
  }
});

/* ---------------------------------------------------------------------
   15. CHECKOUT FORM -> EmailJS order email
   --------------------------------------------------------------------- */
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById("checkout-status");
  const data = Object.fromEntries(new FormData(form).entries());
  const { subtotal, discountAmt, total } = cartTotals();

  const itemsList = state.cart
    .map((i) => `${i.qty} × ${i.name}${i.color ? ` (${i.color})` : ""}${i.size ? ` [${i.size}]` : ""} — ${fmt(i.price * i.qty)}`)
    .join("\n");

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

    setTimeout(() => {
      closeAllModals();
      closeCart();
      status.classList.add("hidden");
    }, 2200);
  } catch (err) {
    status.textContent = "Something went wrong sending your order. Please try again.";
    status.className = "text-sm text-center text-rose-deep";
    status.classList.remove("hidden");
  } finally {
    setSubmitting(form, false);
  }
});

function emailjsReady() {
  return (
    window.emailjs &&
    CONFIG.emailjs.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" &&
    CONFIG.emailjs.serviceId !== "YOUR_EMAILJS_SERVICE_ID"
  );
}

function setSubmitting(form, isSubmitting) {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  btn.disabled = isSubmitting;
  btn.style.opacity = isSubmitting ? 0.6 : 1;
  btn.textContent = isSubmitting
    ? "Sending..."
    : btn.closest("#checkout-form")
    ? "Confirm Order"
    : "Send Inquiry";
}

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
initHero3D();
renderCart();