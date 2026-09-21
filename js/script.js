/**
 * ============================================================================
 * ElleBeeLuxeBeads - Main JavaScript Controller
 * ============================================================================
 * Brand: ElleBeeLuxeBeads
 * Purpose: Catalogue, Lightweight Cart (localStorage) & WhatsApp Ordering Flow
 * Author: ElleBeeLuxeBeads Web Team
 * ============================================================================
 */

/* ============================================================================
   1. STORE CONFIGURATION
   (Edit your business details and WhatsApp number here)
   ============================================================================ */
const CONFIG = {
  // Replace with the owner's WhatsApp number (International format without '+' sign)
  // Example: "2349031382368" (Nigeria: 234 + 9031382368)
  whatsappNumber: "2349031382368",
  
  // Currency symbol displayed across the website
  currency: "₦",
  
  // Official Brand Name (Always spelled: ElleBeeLuxeBeads)
  brandName: "ElleBeeLuxeBeads",
  
  // Social and contact info
  instagramHandle: "ella_bee_luxe_beads",
  instagramUrl: "https://instagram.com/ella_bee_luxe_beads",
  email: "daniellaotene84@gmail.com",
  location: "Lagos, Nigeria",
  tagline: "Beautifully Beaded. Uniquely You."
};

/* ============================================================================
   2. PRODUCT CATALOGUE DATA
   (Easily add, edit or delete products here. Images should be in 'images/products/')
   ============================================================================ */
const PRODUCTS = [
  {
    id: 1,
    name: "Rose Pearl Bracelet",
    category: "Bracelets",
    price: 6500,
    image: "images/products/product-1.svg",
    gallery: [
      "images/products/product-1.svg",
      "images/products/product-1-b.svg"
    ],
    description: "A delicate handmade luxury bracelet featuring blush freshwater-look pearls, faceted rose crystal beads, and a 14K-gold electroplated accent charm.",
    badge: "Best Seller",
    isFeatured: true,
    details: {
      materials: "Blush Crystal Beads, Gold Accent Charm, Elastic Cord",
      sizing: "Standard 7 inches (Custom sizing available on request)",
      care: "Keep away from harsh perfumes, water, and lotions."
    }
  },
  {
    id: 2,
    name: "Gold Aura Waist Beads",
    category: "Waist Beads",
    price: 8500,
    image: "images/products/product-2.svg",
    gallery: [
      "images/products/product-2.svg",
      "images/products/product-2-b.svg"
    ],
    description: "Double-strand tie-on traditional waist beads crafted with glistening gold seed beads, warm champagne crystals, and reflective glass accents.",
    badge: "Signature",
    isFeatured: true,
    details: {
      materials: "High-grade Glass Seed Beads, Metallic Czech Crystals, Cotton Cord",
      sizing: "Up to 48 inches (Adjustable / Tie-on)",
      care: "Durable for daily wear and bathing."
    }
  },
  {
    id: 3,
    name: "Starlight Crystal Anklet",
    category: "Anklets",
    price: 5500,
    image: "images/products/product-3.svg",
    gallery: [
      "images/products/product-3.svg"
    ],
    description: "An ethereal and dainty ankle strand strung with iridescent starlight crystals and gold ball spacers that catch the light effortlessly.",
    badge: "New Arrival",
    isFeatured: true,
    details: {
      materials: "Iridescent Glass Crystals, Gold Spacers, Clasp Closure with Extender",
      sizing: "9.5 inches + 2-inch extender chain",
      care: "Remove before swimming or vigorous activity."
    }
  },
  {
    id: 4,
    name: "Royale Choker Necklace",
    category: "Necklaces",
    price: 14500,
    image: "images/products/product-4.svg",
    gallery: [
      "images/products/product-4.svg"
    ],
    description: "A show-stopping triple-tier collar choker combining creamy pearl spheres with intricate golden spacer filigree for high-fashion elegance.",
    badge: "Luxe Tier",
    isFeatured: true,
    details: {
      materials: "Lustrous Faux Pearls, Brass Gold Hardware, Lobster Clasp",
      sizing: "15 inches collar fit with adjustable chain",
      care: "Wipe with a soft dry cloth after wear."
    }
  },
  {
    id: 5,
    name: "Blush Bloom Beaded Ring",
    category: "Rings",
    price: 3500,
    image: "images/products/product-5.svg",
    gallery: [
      "images/products/product-5.svg"
    ],
    description: "Hand-woven floral rosette ring made of micro seed beads with a rose quartz crystal focal point. Stretchy and supremely comfortable.",
    badge: "Popular",
    isFeatured: true,
    details: {
      materials: "Miyuki Seed Beads, Elastic Cord, Center Stone",
      sizing: "Stretch fit fits US sizes 6 to 9",
      care: "Gentle handling recommended."
    }
  },
  {
    id: 6,
    name: "Golden Glow Waist Beads",
    category: "Waist Beads",
    price: 7500,
    image: "images/products/product-6.svg",
    gallery: [
      "images/products/product-6.svg"
    ],
    description: "Warm amber and metallic gold waist beads inspired by the Lagos sunset glow. Accentuates all body silhouettes with radiant warmth.",
    badge: "Best Seller",
    isFeatured: true,
    details: {
      materials: "Czech Glass Beads, Gold Foil Seed Beads, Heavy Duty Thread",
      sizing: "45 inches tie-on",
      care: "Water-friendly."
    }
  },
  {
    id: 7,
    name: "Aphrodite Pearl Anklet",
    category: "Anklets",
    price: 6000,
    image: "images/products/product-7.svg",
    gallery: [
      "images/products/product-7.svg"
    ],
    description: "Organic baroque-style faux pearls combined with gold sea-charm accents. Perfect for vacations, beach days, and effortless glam.",
    badge: "Trending",
    isFeatured: false,
    details: {
      materials: "Baroque Imitation Pearls, 14K Gold Plated Starfish Charm",
      sizing: "10 inches total length",
      care: "Store in the provided pouch."
    }
  },
  {
    id: 8,
    name: "Imperial Gem Necklace",
    category: "Necklaces",
    price: 16000,
    image: "images/products/product-8.svg",
    gallery: [
      "images/products/product-8.svg"
    ],
    description: "Rich plum and ruby red crystal teardrop beads cascading on a woven gold framework. Designed for traditional ceremonies and gala events.",
    badge: "Statement",
    isFeatured: false,
    details: {
      materials: "Faceted Glass Crystals, Gold Seed Beads, Sturdy Clasp",
      sizing: "18 inches princess length",
      care: "Avoid moisture and perfumes."
    }
  },
  {
    id: 9,
    name: "Champagne Luxe Bracelet",
    category: "Bracelets",
    price: 7000,
    image: "images/products/product-9.svg",
    gallery: [
      "images/products/product-9.svg"
    ],
    description: "Multi-faceted champagne crystal beads intertwined with brushed gold rondelles. Stacks seamlessly with watches and gold bangles.",
    badge: "Classic",
    isFeatured: false,
    details: {
      materials: "Champagne Crystals, Brushed Gold Rondelles",
      sizing: "7.2 inches elastic",
      care: "Wipe clean after use."
    }
  },
  {
    id: 10,
    name: "Sunset Glow Waist Beads",
    category: "Waist Beads",
    price: 8000,
    image: "images/products/product-10.svg",
    gallery: [
      "images/products/product-10.svg"
    ],
    description: "A rich mix of peach, coral, gold dust, and rose glass seed beads creating a subtle ombre gradient around the hips.",
    badge: "New",
    isFeatured: false,
    details: {
      materials: "Ombre Glass Beads, Nylon Strand",
      sizing: "50 inches tie-on",
      care: "Bathing safe."
    }
  },
  {
    id: 11,
    name: "Duchess Beaded Stack Ring",
    category: "Rings",
    price: 4500,
    image: "images/products/product-11.svg",
    gallery: [
      "images/products/product-11.svg"
    ],
    description: "Set of 3 minimalist stackable beaded rings in gold, pearl, and rose quartz tones. Wear together or style across different fingers.",
    badge: "Set of 3",
    isFeatured: false,
    details: {
      materials: "14K Gold Plated Micro Beads, Glass Pearls",
      sizing: "Stretch fit for size 5-8",
      care: "Roll gently onto fingers."
    }
  },
  {
    id: 12,
    name: "Sweet Romance Gift Set",
    category: "Gift Sets",
    price: 22000,
    image: "images/products/product-12.svg",
    gallery: [
      "images/products/product-12.svg"
    ],
    description: "A packaged luxury gift bundle containing the Rose Pearl Bracelet, Blush Bloom Ring, and matching drop earrings presented in our signature box.",
    badge: "Luxury Gift",
    isFeatured: true,
    details: {
      materials: "Matching Crystals, Pearls, and Gold Accents in Custom Box",
      sizing: "Standard One-Size Set",
      care: "Includes branded velvet jewelry pouch."
    }
  },
  {
    id: 13,
    name: "Bridal Goddess Choker",
    category: "Necklaces",
    price: 28000,
    image: "images/products/product-13.svg",
    gallery: [
      "images/products/product-13.svg"
    ],
    description: "Bespoke handcrafted bridal choker intricately hand-stitched with hundreds of micro glass pearls, crystal stones, and gold seed beads.",
    badge: "Couture",
    isFeatured: false,
    details: {
      materials: "Seed Beads, Crystal Cabochons, Satin Ribbon Tie Back",
      sizing: "Custom fit to bride's neck measurement",
      care: "Store flat in presentation box."
    }
  },
  {
    id: 14,
    name: "Bespoke Name & Charm Bead",
    category: "Custom Designs",
    price: 9500,
    image: "images/products/product-14.svg",
    gallery: [
      "images/products/product-14.svg"
    ],
    description: "Personalized custom bead strand featuring customized initial letters, birthstone crystals, or lucky charms curated for you.",
    badge: "Custom Order",
    isFeatured: false,
    details: {
      materials: "Custom Alphabet Charms, Personalized Color Selection",
      sizing: "Tailored to your exact size preferences",
      care: "Crafted on demand."
    }
  }
];

/* ============================================================================
   3. CART STATE MANAGEMENT (localStorage)
   ============================================================================ */
const CART_STORAGE_KEY = "ellebeeluxebeads_cart_v1";

function getCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to parse cart:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
  } catch (e) {
    console.error("Failed to save cart:", e);
  }
}

function addToCart(productId, quantity = 1, note = "") {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  if (!product) return;

  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    if (note) cart[existingIndex].note = note;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity,
      note: note
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to your bag! 💕`, "View Bag", () => openCartDrawer());
}

function updateCartQuantity(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === Number(productId));
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== Number(productId));
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== Number(productId));
  saveCart(cart);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function formatPrice(amount) {
  return `${CONFIG.currency}${amount.toLocaleString()}`;
}

/* ============================================================================
   4. UI RENDERING & CART DRAWER
   ============================================================================ */
function updateCartUI() {
  const count = getCartCount();
  const subtotal = getCartSubtotal();
  const cart = getCart();

  // Update header badges
  document.querySelectorAll(".cart-counter").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });

  // Render cart items in drawer if drawer exists
  const cartBody = document.getElementById("cartDrawerBody");
  const cartSubtotalEl = document.getElementById("cartDrawerSubtotal");
  const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");

  if (cartSubtotalEl) {
    cartSubtotalEl.textContent = formatPrice(subtotal);
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.disabled = cart.length === 0;
  }

  if (cartBody) {
    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-cart-icon">🛍️</div>
          <h3>Your bag is waiting for something beautiful. 💕</h3>
          <p>Explore our handcrafted bead designs and find pieces uniquely tailored to your style.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" onclick="closeCartDrawer()">Explore Collection</a>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-qty-mini">
              <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)" title="Decrease">−</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)" title="Increase">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
            </svg>
          </button>
        </div>
      `).join("");
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ============================================================================
   5. WHATSAPP ORDER GENERATOR (CORE FUNCTIONALITY)
   ============================================================================ */

/**
 * Creates the formatted WhatsApp message for Cart Checkout
 */
function sendCartOrderToWhatsApp(customerName = "", phone = "", note = "") {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty! 💕");
    return;
  }

  const subtotal = getCartSubtotal();
  const nameLine = customerName.trim() ? `My name is ${customerName.trim()}.\n\n` : "";

  let message = `Hello ${CONFIG.brandName}! 💕✨\n\n`;
  message += nameLine;
  message += `I'd like to place an order:\n\n`;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ${formatPrice(item.price)} (Subtotal: ${formatPrice(itemTotal)})\n\n`;
  });

  message += `Estimated Total: ${formatPrice(subtotal)}\n\n`;

  if (note.trim()) {
    message += `Special request / Sizing note:\n"${note.trim()}"\n\n`;
  }

  if (phone.trim()) {
    message += `My contact phone: ${phone.trim()}\n\n`;
  }

  message += `I'd like to know more about availability, sizing and delivery options.\n\n`;
  message += `Thank you! 💕`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

/**
 * Direct WhatsApp button for a single product ("Ask About This Product")
 */
function askAboutProduct(productId) {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  if (!product) return;

  const message = `Hello ${CONFIG.brandName}! 💕\n\nI'm interested in the "${product.name}" (${formatPrice(product.price)}).\n\nCould you please tell me more about its availability and sizing options?`;
  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

/**
 * Direct WhatsApp button for Custom Design requests
 */
function requestCustomDesign(customNote = "") {
  let message = `Hello ${CONFIG.brandName}! 💕✨\n\nI'd like to request a custom bead design.\n\n`;
  if (customNote.trim()) {
    message += `Here are my ideas / specifications:\n"${customNote.trim()}"\n\n`;
  }
  message += `I'd love to discuss color palettes, bead types, sizing, and pricing with you! 💕`;

  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

/**
 * General WhatsApp enquiry greeting
 */
function openGeneralWhatsApp() {
  const message = `Hello ${CONFIG.brandName}! 💕 I'd like to make an enquiry about your handmade bead designs.`;
  const encodedUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
}

/* ============================================================================
   6. ORDER REVIEW MODAL CONTROLS
   ============================================================================ */
function openOrderReviewModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Please add items to your bag first! 💕");
    return;
  }

  // Close the cart drawer
  closeCartDrawer();

  const modal = document.getElementById("orderReviewModal");
  const previewList = document.getElementById("orderModalList");
  const previewTotal = document.getElementById("orderModalTotal");

  if (previewList) {
    previewList.innerHTML = cart.map(item => `
      <div class="order-preview-row">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </div>
    `).join("");
  }

  if (previewTotal) {
    previewTotal.textContent = formatPrice(getCartSubtotal());
  }

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeOrderReviewModal() {
  const modal = document.getElementById("orderReviewModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function handleOrderReviewSubmit(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById("customerNameInput");
  const phoneInput = document.getElementById("customerPhoneInput");
  const noteInput = document.getElementById("customerNoteInput");

  const name = nameInput ? nameInput.value : "";
  const phone = phoneInput ? phoneInput.value : "";
  const note = noteInput ? noteInput.value : "";

  sendCartOrderToWhatsApp(name, phone, note);
  closeOrderReviewModal();
}

/* ============================================================================
   7. PRODUCT CARD GENERATOR (HOMEPAGE & SHOP)
   ============================================================================ */
function createProductCardHTML(product) {
  const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : "";

  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-thumb-box">
        ${badgeHTML}
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </a>
        <button class="product-quick-ask" onclick="askAboutProduct(${product.id})" title="Ask about this on WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      </div>
      <div class="product-details">
        <div>
          <span class="product-category-tag">${product.category}</span>
          <h3 class="product-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-desc-short">${product.description}</p>
        </div>
        <div>
          <div class="product-price-row">
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <div class="product-action-btns">
            <button class="btn-card-cart" onclick="addToCart(${product.id}, 1)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              Add to Bag
            </button>
            <a href="product.html?id=${product.id}" class="btn-card-view" title="View details">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* ============================================================================
   8. PAGE-SPECIFIC INITIALIZERS
   ============================================================================ */

// Init Homepage Featured Products
function initHomepage() {
  const featuredGrid = document.getElementById("featuredProductsGrid");
  if (!featuredGrid) return;

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 6);
  featuredGrid.innerHTML = featured.map(p => createProductCardHTML(p)).join("");
}

// Init Shop Page
function initShopPage() {
  const shopGrid = document.getElementById("shopProductsGrid");
  const filterPills = document.querySelectorAll(".filter-pill");
  const searchInput = document.getElementById("shopSearchInput");
  const sortSelect = document.getElementById("shopSortSelect");
  const productCountDisplay = document.getElementById("productCountDisplay");

  if (!shopGrid) return;

  let currentCategory = "All";
  let currentSearch = "";
  let currentSort = "featured";

  // Check URL query parameters for category
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");
  if (categoryParam) {
    currentCategory = categoryParam;
    filterPills.forEach(pill => {
      if (pill.getAttribute("data-category")?.toLowerCase() === categoryParam.toLowerCase()) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  function renderFilteredProducts() {
    let list = [...PRODUCTS];

    // Category filter
    if (currentCategory && currentCategory !== "All") {
      list = list.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Search filter
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (currentSort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: featured first, then id
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    // Update count display
    if (productCountDisplay) {
      productCountDisplay.textContent = `Showing ${list.length} beautiful design${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
      shopGrid.innerHTML = `
        <div class="empty-shop-state">
          <h3>No matching designs found ✨</h3>
          <p>Try searching for another bead style or reset your category filter.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 1rem" onclick="resetShopFilters()">Show All Designs</button>
        </div>
      `;
    } else {
      shopGrid.innerHTML = list.map(p => createProductCardHTML(p)).join("");
    }
  }

  // Event Listeners for Filters
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category") || "All";
      renderFilteredProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderFilteredProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderFilteredProducts();
    });
  }

  window.resetShopFilters = function() {
    currentCategory = "All";
    currentSearch = "";
    currentSort = "featured";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "featured";
    filterPills.forEach(p => {
      if (p.getAttribute("data-category") === "All") p.classList.add("active");
      else p.classList.remove("active");
    });
    renderFilteredProducts();
  };

  renderFilteredProducts();
}

// Init Product Details Page
function initProductDetailPage() {
  const container = document.getElementById("productDetailContainer");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  let selectedQty = 1;

  // Render product details
  document.title = `${product.name} | ${CONFIG.brandName}`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById("breadcrumbCategory");
  const breadcrumbProduct = document.getElementById("breadcrumbProduct");
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.category;
    breadcrumbCategory.href = `shop.html?category=${encodeURIComponent(product.category)}`;
  }
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = product.name;
  }

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  container.innerHTML = `
    <div class="product-detail-grid">
      <!-- Left: Image Gallery -->
      <div class="gallery-container">
        <div class="main-image-frame">
          <img id="detailMainImg" src="${galleryImages[0]}" alt="${product.name}" />
        </div>
        ${galleryImages.length > 1 ? `
          <div class="thumbnail-strip">
            ${galleryImages.map((img, idx) => `
              <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this)">
                <img src="${img}" alt="${product.name} view ${idx + 1}" />
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Right: Product Info & Actions -->
      <div class="product-info-panel">
        <div>
          <span class="product-meta-badge">✦ ${product.category} · Handcrafted in Lagos</span>
          <h1 class="product-detail-title">${product.name}</h1>
          <div class="product-detail-price">${formatPrice(product.price)}</div>
        </div>

        <p class="product-detail-desc">${product.description}</p>

        <div class="product-options-row">
          <label style="font-size:0.82rem;font-weight:600;text-transform:uppercase;color:var(--text-muted)">Quantity:</label>
          <div class="quantity-control">
            <button class="qty-btn" id="qtyMinusBtn">−</button>
            <span class="qty-display" id="qtyDisplay">1</span>
            <button class="qty-btn" id="qtyPlusBtn">+</button>
          </div>
        </div>

        <div class="detail-cta-stack">
          <button class="btn btn-primary btn-lg" id="detailAddToCartBtn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
            </svg>
            Add to Bag
          </button>
          <button class="btn btn-whatsapp-solid btn-lg" id="detailWhatsAppOrderBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </button>
          <a href="javascript:void(0)" class="ask-product-link" onclick="askAboutProduct(${product.id})">
            💬 Have questions about sizing or colors? Ask about this product
          </a>
        </div>

        <!-- Accordions for Details -->
        <div class="product-accordion">
          <div class="accordion-item open">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>Product Specifications</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-content">
              <p><strong>Materials:</strong> ${product.details?.materials || "High-grade glass and crystal beads, gold plated accents."}</p>
              <p style="margin-top:0.5rem"><strong>Sizing:</strong> ${product.details?.sizing || "Standard artisan sizing with custom adjustments available."}</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>Care & Longevity</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-content">
              <p>${product.details?.care || "To ensure longevity, avoid direct contact with water, heavy oils, and perfume. Store in the complimentary silk pouch."}</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>Delivery & Custom Options</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-content">
              <p>Handmade in Lagos, Nigeria. Doorstep delivery available nationwide and worldwide shipping on request. Custom color choices and length adjustments can be finalized directly on WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Image Switcher
  window.switchDetailImage = function(imgSrc, element) {
    const mainImg = document.getElementById("detailMainImg");
    if (mainImg) mainImg.src = imgSrc;
    document.querySelectorAll(".thumb-item").forEach(el => el.classList.remove("active"));
    if (element) element.classList.add("active");
  };

  // Quantity Handlers
  const qtyMinus = document.getElementById("qtyMinusBtn");
  const qtyPlus = document.getElementById("qtyPlusBtn");
  const qtyDisplay = document.getElementById("qtyDisplay");

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener("click", () => {
      if (selectedQty > 1) {
        selectedQty--;
        qtyDisplay.textContent = selectedQty;
      }
    });
    qtyPlus.addEventListener("click", () => {
      selectedQty++;
      qtyDisplay.textContent = selectedQty;
    });
  }

  // Add to Bag Button
  const addBtn = document.getElementById("detailAddToCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart(product.id, selectedQty);
    });
  }

  // Direct WhatsApp Order Button
  const waBtn = document.getElementById("detailWhatsAppOrderBtn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const msg = `Hello ${CONFIG.brandName}! 💕✨\n\nI'd like to order:\n• ${product.name} × ${selectedQty}\nPrice: ${formatPrice(product.price * selectedQty)}\n\nPlease let me know the payment and delivery details! 💕`;
      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    });
  }

  // Render Related Products
  const relatedGrid = document.getElementById("relatedProductsGrid");
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const displayList = related.length >= 2 ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = displayList.map(p => createProductCardHTML(p)).join("");
  }
}

// Accordion Toggle Helper
function toggleAccordion(button) {
  const item = button.closest(".accordion-item");
  if (item) {
    item.classList.toggle("open");
  }
}

// Interactive Custom Design Form (Contact Page)
function handleCustomDesignFormSubmit(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("customName")?.value || "";
  const beadType = document.getElementById("customBeadType")?.value || "Waist Beads";
  const colors = document.getElementById("customColors")?.value || "";
  const sizing = document.getElementById("customSize")?.value || "";
  const notes = document.getElementById("customNotes")?.value || "";

  let msg = `Hello ${CONFIG.brandName}! 💕✨\n\n`;
  if (name.trim()) msg += `My name is ${name.trim()}.\n\n`;
  msg += `I'd like to request a Custom Design:\n`;
  msg += `• Item Type: ${beadType}\n`;
  if (colors.trim()) msg += `• Preferred Colors / Stones: ${colors.trim()}\n`;
  if (sizing.trim()) msg += `• Sizing / Measurements: ${sizing.trim()}\n`;
  if (notes.trim()) msg += `• Additional Notes:\n"${notes.trim()}"\n\n`;
  msg += `Looking forward to crafting something gorgeous together! 💕`;

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

/* ============================================================================
   9. TOAST NOTIFICATIONS HELPER
   ============================================================================ */
function showToast(message, actionLabel = "", actionCallback = null) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>${message}</span>
    ${actionLabel ? `<button style="color:var(--gold-light);font-weight:700;font-size:0.8rem;text-transform:uppercase;border-bottom:1px solid var(--gold-light)" id="toastActionBtn">${actionLabel}</button>` : ''}
  `;

  container.appendChild(toast);

  if (actionLabel && actionCallback) {
    toast.querySelector("#toastActionBtn")?.addEventListener("click", () => {
      actionCallback();
      toast.remove();
    });
  }

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ============================================================================
   10. MOBILE NAVIGATION & GLOBAL LISTENERS
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial cart badge & items render
  updateCartUI();

  // 2. Mobile Nav Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  if (hamburgerBtn && mobileNavDrawer) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      mobileNavDrawer.classList.toggle("open");
    });
  }

  // 3. Cart Drawer Open / Close Triggers
  document.querySelectorAll(".open-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);

  // 4. Order Review Modal Triggers
  const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", openOrderReviewModal);
  }

  const orderModalCloseBtn = document.getElementById("orderModalCloseBtn");
  const orderReviewModal = document.getElementById("orderReviewModal");
  if (orderModalCloseBtn) orderModalCloseBtn.addEventListener("click", closeOrderReviewModal);
  if (orderReviewModal) {
    orderReviewModal.addEventListener("click", (e) => {
      if (e.target === orderReviewModal) closeOrderReviewModal();
    });
  }

  const orderReviewForm = document.getElementById("orderReviewForm");
  if (orderReviewForm) {
    orderReviewForm.addEventListener("submit", handleOrderReviewSubmit);
  }

  // 5. Header scroll elevation effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // 6. Page specific boots
  if (document.getElementById("featuredProductsGrid")) {
    initHomepage();
  }
  if (document.getElementById("shopProductsGrid")) {
    initShopPage();
  }
  if (document.getElementById("productDetailContainer")) {
    initProductDetailPage();
  }

  // 7. Custom Design Form listener on contact page
  const customForm = document.getElementById("customDesignForm");
  if (customForm) {
    customForm.addEventListener("submit", handleCustomDesignFormSubmit);
  }
});
