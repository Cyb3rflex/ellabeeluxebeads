# ElleBeeLuxeBeads - Luxury Feminine E-Commerce Catalogue

A modern, feminine, luxury e-commerce catalogue website for **ElleBeeLuxeBeads** — a handmade bead and accessories brand based in Lagos, Nigeria. Built with vanilla HTML5, CSS3, and JavaScript, featuring a lightweight `localStorage` cart drawer and a seamless WhatsApp-based order flow with **no online payment gateway or user login required**.

---

## ✨ Features

- **Luxury Feminine Aesthetic**: Sophisticated palette (soft blush pink, dusty rose, warm ivory/cream, rich deep plum accents, champagne gold details).
- **Zero Backend / Zero Dependencies**: Pure static frontend ready to deploy on GitHub Pages, Netlify, or Vercel.
- **Dynamic JavaScript Catalogue**: 14+ curated products across 7 categories (*Bracelets, Waist Beads, Anklets, Necklaces, Rings, Custom Designs, Gift Sets*).
- **Live Search & Category Filtering**: Instant client-side filtering and price/name sorting on the dedicated Shop page.
- **Product Details Page (`product.html`)**: Dynamic loader via `?id=X`, multi-image gallery switcher, specs accordion, quantity selector, and related items.
- **Lightweight Shopping Bag (Cart Drawer)**: Slide-out drawer powered by `localStorage` with quantity updates and empty bag state.
- **1-Click WhatsApp Order Flow**: Automatically formats selected products, quantities, prices, estimated total, customer name, and special sizing notes into a pre-filled WhatsApp message.
- **"Ask About This Product"**: Direct 1-click WhatsApp inquiry on product cards and detail pages.
- **Interactive Custom Design Builder**: Form on the Contact page that compiles bespoke bead preferences into a direct WhatsApp message.
- **Fully Responsive & Accessible**: Pixel-perfect on mobile, tablet, laptop, and desktop viewports with sticky navigation and mobile drawer menu.

---

## 📁 File Structure

```text
ellabeeluxebeads/
│
├── index.html              # Homepage (Hero, Categories, Featured, Story, Custom Callout, Instagram Gallery, Testimonials)
├── shop.html               # Dedicated Shop catalogue (Category filter pills, Search, Sort, Product grid)
├── product.html            # Dedicated Product details page (Dynamic loader, Gallery switcher, Accordions, Related products)
├── about.html              # About & Brand Story page (Artisan story, Core pillars, 4-step craft process)
├── contact.html            # Contact page (WhatsApp direct card, Custom order builder form, FAQs)
│
├── css/
│   └── style.css           # Master CSS design system, animations, responsive media queries, and components
│
├── js/
│   └── script.js           # Centralized CONFIG, PRODUCTS database, localStorage Cart, and WhatsApp generators
│
├── images/                 # Organized asset directories (Includes high-resolution vector placeholders)
│   ├── logo/               # Brand logo graphics
│   ├── hero/               # Hero section banners
│   ├── products/           # Product catalogue images
│   ├── categories/         # Category card thumbnails
│   ├── gallery/            # Lookbook / Instagram gallery images
│   └── brand/              # Artisan workshop / brand imagery
│
└── README.md               # Complete setup, customization and deployment guide
```

---

## 🚀 1. How to Run the Website Locally

Since the site uses pure HTML, CSS, and Vanilla JavaScript, no build tools or package managers are required!

### Option A: Open directly in your browser
Double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

### Option B: Using a lightweight local server (Recommended for query parameters)
You can use Python's built-in server or VS Code Live Server:
```bash
# In the project root folder:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📱 2. Where to Change the WhatsApp Number

All WhatsApp links and messages are controlled by a single configuration object at the top of [`js/script.js`](file:///c:/Users/Cyberflex/Music/Documents/ellabeeluxebeads/js/script.js#L14-L31):

```javascript
// Open js/script.js and locate the CONFIG object (around line 14):
const CONFIG = {
  // Replace with the owner's WhatsApp number in international format (without '+')
  // Example for Nigeria: "2349031382368"
  whatsappNumber: "234XXXXXXXXXX",
  
  currency: "₦",
  brandName: "ElleBeeLuxeBeads",
  instagramHandle: "ella_bee_luxe_beads",
  email: "daniellaotene84@gmail.com",
  location: "Lagos, Nigeria"
};
```
> **Note**: Whenever you update `whatsappNumber` here, all buttons across the entire website (*Header button, Hero CTA, Cart Drawer checkout, Product detail inquiry, Floating button*) will automatically use your new number!

---

## 💎 3. Where to Add or Edit Products

All products are stored in the `PRODUCTS` array in [`js/script.js`](file:///c:/Users/Cyberflex/Music/Documents/ellabeeluxebeads/js/script.js#L36-L195).

### Example Product Structure:
```javascript
{
  id: 15,                               // Unique numerical ID
  name: "Emerald Empress Waist Beads", // Product title
  category: "Waist Beads",              // Category: Bracelets | Waist Beads | Anklets | Necklaces | Rings | Custom Designs | Gift Sets
  price: 9000,                          // Price in numbers (e.g. 9000 for ₦9,000)
  image: "images/products/emerald-waist.jpg", // Main thumbnail
  gallery: [                            // Optional extra views
    "images/products/emerald-waist.jpg",
    "images/products/emerald-waist-2.jpg"
  ],
  description: "Lustrous emerald green crystals with gold accents.",
  badge: "New Arrival",                 // e.g. "Best Seller", "Signature", "New", or ""
  isFeatured: true,                     // true to display on Homepage Featured section
  details: {
    materials: "Czech Emerald Glass, 14K Gold Fill Spacers",
    sizing: "48 inches adjustable tie-on",
    care: "Water-friendly and durable."
  }
}
```

---

## 🖼️ 4. Where to Add Real Product Images

Save your product photos directly inside the `images/products/` folder:

1. **Product Thumbnails**: Place your images (JPG, PNG, or WebP) into `images/products/` (e.g. `images/products/bracelet-01.jpg`).
2. **Category Thumbnails**: Place your category photos into `images/categories/` (e.g. `images/categories/bracelets.jpg`).
3. **Hero Banner**: Place your banner into `images/hero/` (e.g. `images/hero/hero-main.jpg`).
4. **Gallery Lookbook**: Place your Instagram lookbook photos into `images/gallery/` (e.g. `images/gallery/gallery-1.jpg`).

Then update the image paths in `js/script.js` or the respective HTML file.

---

## 💬 5. How the WhatsApp Ordering System Works

1. Customer browses the catalogue and adds designs to their shopping bag.
2. Clicking **"Order on WhatsApp"** opens an order review modal where the customer enters their name, optional phone, and sizing/customization notes.
3. Clicking **"Continue to WhatsApp"** creates an encoded WhatsApp URL:
   ```text
   https://wa.me/234XXXXXXXXXX?text=Hello%20ElleBeeLuxeBeads!%20%F0%9F%92%95%E2%9C%A8...
   ```
4. The owner receives a structured message with product names, quantities, individual prices, total price, and the customer's custom request.
5. The owner and customer finalize delivery address and bank transfer directly in the WhatsApp chat.

---

## 🌐 6. How to Deploy the Website

### Deploying to GitHub Pages (Free)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for ElleBeeLuxeBeads"
   ```
2. Create a repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/your-username/ellebeeluxebeads.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings** > **Pages** > Set Source to **Deploy from a branch (`main` / root)**.
4. Your website will be live at `https://your-username.github.io/ellebeeluxebeads/`.

### Deploying to Netlify / Vercel (Free)
- **Netlify**: Drag and drop the `ellabeeluxebeads` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Import your GitHub repository into Vercel with zero configuration required.

---

## 🛡️ Brand Guideline
The brand name must always be capitalized consistently as **ElleBeeLuxeBeads**.

© 2026 ElleBeeLuxeBeads. Handcrafted with love in Lagos, Nigeria.
