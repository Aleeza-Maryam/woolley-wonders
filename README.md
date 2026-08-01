# Woolley Wonders — Website

A luxury, interactive e-commerce site for handmade crochet. Built with HTML, Tailwind CSS (CDN), vanilla JS, Three.js, GSAP/ScrollTrigger, and EmailJS.

## Files
```
index.html     → structure & content
styles.css     → glassmorphism, glow, tilt, cart/modal styling, the gold "stitch thread" scroll indicator
script.js      → product data, cart, 3D hero scene, animations, EmailJS wiring
```

Open `index.html` directly in a browser to preview, or upload all three files to any static host (Netlify, Vercel, GitHub Pages, Shopify custom page, etc.) — no build step required.

---

## 1. Adding your own product photos

Open `script.js` and find the `PRODUCTS` array near the top. Each product has an `image` field — replace the placeholder Unsplash URLs with your own photos:

```js
{
  id: "p1",
  name: "Blush Bloom Cardigan",
  price: 128,
  image: "https://your-cdn.com/photos/blush-cardigan.jpg", // <-- swap this
  ...
}
```

You can host images anywhere (your own server, Cloudinary, Imgur, Google Drive with public sharing, etc.) as long as the URL is publicly accessible. To add more products, copy an existing object in the array and give it a unique `id`.

## 2. Adding a real 3D model (optional)

The hero currently uses a **procedural yarn ball built directly in Three.js** — no external file needed, so it works out of the box. If you'd rather use a custom 3D model (e.g. a modeled crochet hook or yarn skein from Blender/Spline):

**Option A — Spline (easiest, no code):**
1. Design or find a scene at [spline.design](https://spline.design).
2. Click **Export → Embed** and copy the generated `<iframe>` code.
3. In `index.html`, replace the `<div id="hero-3d-canvas"></div>` element with your Spline `<iframe>`, sized to fill its parent (`width: 100%; height: 100%; border: none;`).
4. You can then delete the `initHero3D()` call at the bottom of `script.js`, since Spline handles rendering itself.

**Option B — Your own `.glb`/`.gltf` model in Three.js:**
1. Host your `.glb` file somewhere public (same site, or a CDN).
2. In `index.html`, add the GLTFLoader script tag after the Three.js `<script>` tag:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js"></script>
   ```
3. In `script.js`, inside `initHero3D()`, replace the yarn-ball geometry block with:
   ```js
   const loader = new THREE.GLTFLoader();
   loader.load("https://your-cdn.com/models/yarn-ball.glb", (gltf) => {
     group.add(gltf.scene);
   });
   ```

---

## 3. Setting up EmailJS (order + inquiry emails)

EmailJS lets the site send emails straight from the browser — no backend server required.

**Step 1 — Create an account & service**
1. Sign up free at [emailjs.com](https://www.emailjs.com).
2. Go to **Email Services → Add New Service**, connect your email (Gmail, Outlook, etc.), and copy the **Service ID**.

**Step 2 — Create two email templates**
Go to **Email Templates → Create New Template**, and make two:

*Template 1 — Order confirmation* (used at checkout). Suggested content, using these variables:
```
New order from {{customer_name}}

Email: {{customer_email}}
Phone: {{customer_phone}}
Shipping address: {{shipping_address}}
Customization notes: {{customization_notes}}

Items:
{{items_list}}

Subtotal: {{subtotal}}
Discount: {{discount}}
Total: {{order_total}}
Order date: {{order_date}}
```
Copy this template's **Template ID**.

*Template 2 — Bespoke inquiry* (used on the "Bespoke Studio" quick form):
```
New bespoke inquiry from {{customer_name}}
Contact: {{customer_contact}}

Details:
{{request_details}}
```
Copy this template's **Template ID**.

**Step 3 — Get your public key**
Go to **Account → General**, copy your **Public Key**.

**Step 4 — Plug the keys into `script.js`**
At the top of `script.js`, update the `CONFIG` object:
```js
const CONFIG = {
  instagramHandle: "your_instagram_handle",
  whatsappNumber: "15551234567", // country code + number, no symbols

  emailjs: {
    publicKey: "your_public_key_here",
    serviceId: "your_service_id_here",
    orderTemplateId: "your_order_template_id_here",
    inquiryTemplateId: "your_inquiry_template_id_here",
  },
};
```

That's it — "Confirm Order" and "Send Inquiry" will now email your order/inquiry details directly to whatever inbox you connected in Step 1. EmailJS's free tier includes 200 emails/month, which is enough to test and launch; paid tiers raise that limit.

---

## 4. Instagram / WhatsApp custom requests

Custom Request buttons open an Instagram DM pre-filled with the product name and price, using:
```
https://ig.me/m/<your_handle>?text=<message>
```
Just set `instagramHandle` in the `CONFIG` object (step 4 above) — no other setup needed. If you'd rather route custom requests to WhatsApp instead, swap the `openCustomRequest()` function in `script.js` to build a `https://wa.me/<number>?text=<message>` link using `CONFIG.whatsappNumber`.

---

## 5. Promo codes

Two example codes are wired up in `script.js` (`WOOLLY10` → 10% off, `WELCOME15` → 15% off). Edit the `validCodes` object inside the `promo-apply` click handler to add your own.

## 6. Notes

- The cart currently resets on page reload (kept in memory only) — fine for a single checkout session. If you want it to persist across visits once the site is live on your own domain, you can add `localStorage` calls to `renderCart()`/`addToCart()`.
- All colors, fonts, and spacing are controlled via the Tailwind config block at the top of `index.html` and the CSS variables/classes in `styles.css` — change the `cream`, `blush`, `rose`, `sage`, `gold`, `ink` hex values there to adjust the palette globally.