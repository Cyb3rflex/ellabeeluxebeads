import os

# Create folders
folders = [
    "images/logo",
    "images/hero",
    "images/products",
    "images/categories",
    "images/gallery",
    "images/brand"
]
for f in folders:
    os.makedirs(f, exist_ok=True)

# Helper function to create luxury SVG graphic
def make_jewelry_svg(filename, title, subtitle, bg_color1, bg_color2, accent_color, bead_type="bracelet"):
    width = 800
    height = 800
    
    bead_shapes = ""
    if bead_type == "bracelet":
        bead_shapes = f"""
        <!-- Bracelet circle -->
        <circle cx="400" cy="380" r="160" fill="none" stroke="{accent_color}" stroke-width="2" stroke-dasharray="6,6" opacity="0.4"/>
        <g id="beads">
            <!-- Outer pearl & crystal ring -->
            <circle cx="400" cy="220" r="18" fill="url(#pearlGrad)"/>
            <circle cx="480" cy="240" r="16" fill="url(#goldGrad)"/>
            <circle cx="535" cy="300" r="17" fill="url(#gemGrad)"/>
            <circle cx="560" cy="380" r="20" fill="url(#pearlGrad)"/>
            <circle cx="535" cy="460" r="16" fill="url(#goldGrad)"/>
            <circle cx="480" cy="520" r="18" fill="url(#gemGrad)"/>
            <circle cx="400" cy="540" r="22" fill="url(#goldGrad)"/>
            <circle cx="320" cy="520" r="18" fill="url(#gemGrad)"/>
            <circle cx="265" cy="460" r="16" fill="url(#goldGrad)"/>
            <circle cx="240" cy="380" r="20" fill="url(#pearlGrad)"/>
            <circle cx="265" cy="300" r="17" fill="url(#gemGrad)"/>
            <circle cx="320" cy="240" r="16" fill="url(#goldGrad)"/>
            
            <!-- Charm Pendant -->
            <path d="M 395 560 L 405 560 L 400 595 Z" fill="{accent_color}"/>
            <circle cx="400" cy="610" r="14" fill="url(#goldGrad)"/>
            <circle cx="400" cy="610" r="8" fill="#FFF8F0"/>
        </g>
        """
    elif bead_type == "waist":
        bead_shapes = f"""
        <!-- Waist bead curves -->
        <path d="M 150 250 Q 400 450 650 250" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round" opacity="0.85"/>
        <path d="M 170 310 Q 400 530 630 310" fill="none" stroke="url(#gemGrad)" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
        <path d="M 200 370 Q 400 590 600 370" fill="none" stroke="url(#pearlGrad)" stroke-width="8" stroke-linecap="round"/>
        
        <!-- Hanging Gold Beads Accent -->
        <circle cx="400" cy="450" r="12" fill="url(#goldGrad)"/>
        <circle cx="400" cy="530" r="10" fill="url(#goldGrad)"/>
        <circle cx="400" cy="590" r="8" fill="url(#goldGrad)"/>
        """
    elif bead_type == "necklace":
        bead_shapes = f"""
        <!-- Layered Necklace -->
        <path d="M 220 200 Q 400 440 580 200" fill="none" stroke="url(#pearlGrad)" stroke-width="14" stroke-linecap="round"/>
        <path d="M 260 200 Q 400 510 540 200" fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M 300 200 Q 400 570 500 200" fill="none" stroke="url(#gemGrad)" stroke-width="6" stroke-linecap="round"/>
        
        <!-- Luxe Centerpiece -->
        <circle cx="400" cy="440" r="18" fill="url(#goldGrad)"/>
        <circle cx="400" cy="510" r="14" fill="url(#pearlGrad)"/>
        <circle cx="400" cy="570" r="10" fill="{accent_color}"/>
        """
    elif bead_type == "anklet":
        bead_shapes = f"""
        <!-- Anklet wave -->
        <path d="M 180 380 C 280 300, 360 460, 480 340 S 620 400, 620 400" fill="none" stroke="url(#goldGrad)" stroke-width="8" stroke-linecap="round"/>
        <path d="M 180 410 C 280 330, 360 490, 480 370 S 620 430, 620 430" fill="none" stroke="url(#gemGrad)" stroke-width="10" stroke-linecap="round"/>
        
        <!-- Dainty Charms -->
        <circle cx="340" cy="440" r="9" fill="url(#pearlGrad)"/>
        <circle cx="480" cy="370" r="11" fill="url(#goldGrad)"/>
        <polygon points="400,430 406,442 419,444 409,453 412,466 400,459 388,466 391,453 381,444 394,442" fill="{accent_color}"/>
        """
    elif bead_type == "ring":
        bead_shapes = f"""
        <!-- Ring Band -->
        <ellipse cx="400" cy="400" rx="120" ry="80" fill="none" stroke="url(#goldGrad)" stroke-width="18"/>
        <!-- Ring Gem Top -->
        <circle cx="400" cy="320" r="45" fill="url(#gemGrad)" stroke="url(#goldGrad)" stroke-width="6"/>
        <circle cx="400" cy="320" r="28" fill="url(#pearlGrad)"/>
        <circle cx="400" cy="320" r="12" fill="#FFFFFF"/>
        <!-- Accent Beads -->
        <circle cx="330" cy="335" r="12" fill="url(#goldGrad)"/>
        <circle cx="470" cy="335" r="12" fill="url(#goldGrad)"/>
        """
    elif bead_type == "gift":
        bead_shapes = f"""
        <!-- Gift Box & Beads Set -->
        <rect x="250" y="270" width="300" height="260" rx="16" fill="url(#gemGrad)" stroke="{accent_color}" stroke-width="4"/>
        <line x1="400" y1="270" x2="400" y2="530" stroke="url(#goldGrad)" stroke-width="16"/>
        <line x1="250" y1="400" x2="550" y2="400" stroke="url(#goldGrad)" stroke-width="16"/>
        
        <!-- Ribbon Bow -->
        <path d="M 400 270 C 340 210, 320 270, 400 270 Z" fill="url(#goldGrad)"/>
        <path d="M 400 270 C 460 210, 480 270, 400 270 Z" fill="url(#goldGrad)"/>
        <circle cx="400" cy="270" r="14" fill="{accent_color}"/>
        
        <!-- Beaded Strand cascading -->
        <path d="M 230 460 Q 400 620 570 460" fill="none" stroke="url(#pearlGrad)" stroke-width="10" stroke-linecap="round"/>
        """
    else: # custom or general
        bead_shapes = f"""
        <circle cx="400" cy="380" r="180" fill="none" stroke="{accent_color}" stroke-width="3" stroke-dasharray="8,8" opacity="0.5"/>
        <circle cx="400" cy="380" r="130" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.7"/>
        <g>
            <circle cx="400" cy="200" r="22" fill="url(#pearlGrad)"/>
            <circle cx="540" cy="290" r="20" fill="url(#goldGrad)"/>
            <circle cx="560" cy="460" r="22" fill="url(#gemGrad)"/>
            <circle cx="440" cy="560" r="24" fill="url(#pearlGrad)"/>
            <circle cx="280" cy="510" r="20" fill="url(#goldGrad)"/>
            <circle cx="240" cy="330" r="22" fill="url(#gemGrad)"/>
            
            <polygon points="400,340 412,365 439,369 419,388 424,415 400,402 376,415 381,388 361,369 388,365" fill="url(#goldGrad)"/>
        </g>
        """

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">
    <defs>
        <radialGradient id="bgGrad" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stop-color="{bg_color1}"/>
            <stop offset="65%" stop-color="{bg_color2}"/>
            <stop offset="100%" stop-color="#2D1E24"/>
        </radialGradient>
        <radialGradient id="pearlGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#FFF0F2"/>
            <stop offset="85%" stop-color="#E5C7CC"/>
            <stop offset="100%" stop-color="#C29BA2"/>
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F7E6B5"/>
            <stop offset="40%" stop-color="#D4AF37"/>
            <stop offset="75%" stop-color="#AA8222"/>
            <stop offset="100%" stop-color="#73530F"/>
        </linearGradient>
        <radialGradient id="gemGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFD6DE"/>
            <stop offset="45%" stop-color="#E38B98"/>
            <stop offset="80%" stop-color="#A84C5B"/>
            <stop offset="100%" stop-color="#5E1D27"/>
        </radialGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="glow"/>
            <feComposite in="SourceGraphic" in2="glow" operator="over"/>
        </filter>
        <pattern id="dotGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1.2" fill="{accent_color}" opacity="0.15"/>
        </pattern>
    </defs>
    
    <!-- Background -->
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    <rect width="100%" height="100%" fill="url(#dotGrid)"/>
    
    <!-- Decorative Luxury Frames -->
    <rect x="30" y="30" width="{width-60}" height="{height-60}" fill="none" stroke="{accent_color}" stroke-width="1.2" opacity="0.4" rx="12"/>
    <rect x="42" y="42" width="{width-84}" height="{height-84}" fill="none" stroke="{accent_color}" stroke-width="0.6" opacity="0.25" rx="8"/>
    
    <!-- Corner Flourishes -->
    <circle cx="30" cy="30" r="4" fill="{accent_color}"/>
    <circle cx="{width-30}" cy="30" r="4" fill="{accent_color}"/>
    <circle cx="30" cy="{height-30}" r="4" fill="{accent_color}"/>
    <circle cx="{width-30}" cy="{height-30}" r="4" fill="{accent_color}"/>
    
    <!-- Bead Art Component -->
    {bead_shapes}
    
    <!-- Elegant Overlay Banner for Title -->
    <g transform="translate(0, 640)">
        <rect x="80" y="10" width="640" height="100" rx="8" fill="#24171D" fill-opacity="0.88" stroke="{accent_color}" stroke-width="1"/>
        <text x="400" y="52" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="600" fill="#FFF7ED" letter-spacing="1.5">{title}</text>
        <text x="400" y="86" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="400" fill="#E2C889" letter-spacing="3">{subtitle.upper()}</text>
    </g>
</svg>"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(svg)

# 1. Categories
categories = [
    ("images/categories/bracelets.svg", "Bracelets", "Luxe Wrist Adornments", "#44242E", "#2B161D", "#D4AF37", "bracelet"),
    ("images/categories/waist-beads.svg", "Waist Beads", "Feminine Silhouette Strands", "#381E29", "#1F0F16", "#E89CA8", "waist"),
    ("images/categories/anklets.svg", "Anklets", "Dainty Ankle Chains", "#3B2129", "#241318", "#D4AF37", "anklet"),
    ("images/categories/necklaces.svg", "Necklaces", "Layered Statement Pieces", "#421C28", "#230C15", "#E2C889", "necklace"),
    ("images/categories/rings.svg", "Rings", "Beaded Statement Bands", "#361D24", "#1E0F13", "#D4AF37", "ring"),
    ("images/categories/custom-designs.svg", "Custom Designs", "Bespoke Personalized Sets", "#4A2733", "#28131A", "#E89CA8", "custom"),
    ("images/categories/gift-sets.svg", "Gift Sets", "Luxe Gift Boxes & Bundles", "#3F1E29", "#200E14", "#D4AF37", "gift"),
]
for cat in categories:
    make_jewelry_svg(cat[0], cat[1], cat[2], cat[3], cat[4], cat[5], cat[6])

# 2. Products (14 items)
products_meta = [
    ("images/products/product-1.svg", "Rose Pearl Bracelet", "Blush Pearls & 18K Gold Accent", "#43222B", "#251218", "#D4AF37", "bracelet"),
    ("images/products/product-1-b.svg", "Rose Pearl Bracelet (Alt)", "Side Profile & Clasp Detail", "#3E1E26", "#210F14", "#E89CA8", "bracelet"),
    ("images/products/product-2.svg", "Gold Aura Waist Beads", "Double Strand Tie-On Crystals", "#4A2830", "#281419", "#D4AF37", "waist"),
    ("images/products/product-2-b.svg", "Gold Aura Waist Beads (Alt)", "Worn View & Glow", "#3F1F27", "#220F15", "#E2C889", "waist"),
    ("images/products/product-3.svg", "Starlight Crystal Anklet", "Glistening Iridescent Beads", "#3A1F26", "#201014", "#D4AF37", "anklet"),
    ("images/products/product-4.svg", "Royale Choker Necklace", "Triple-Tier Pearl & Gold", "#48232F", "#2A111A", "#E89CA8", "necklace"),
    ("images/products/product-5.svg", "Blush Bloom Beaded Ring", "Dainty Quartz Flower Centerpiece", "#3D1E25", "#1F0E13", "#D4AF37", "ring"),
    ("images/products/product-6.svg", "Golden Glow Waist Beads", "Sun-Kissed African Glass Beads", "#4C2B35", "#2B161E", "#D4AF37", "waist"),
    ("images/products/product-7.svg", "Aphrodite Pearl Anklet", "Freshwater Pearls & Shell Charm", "#381D23", "#1D0C11", "#E89CA8", "anklet"),
    ("images/products/product-8.svg", "Imperial Gem Necklace", "Deep Plum & Ruby Crystal Drops", "#441D2B", "#230A14", "#D4AF37", "necklace"),
    ("images/products/product-9.svg", "Champagne Luxe Bracelet", "Faceted Champagne Crystals", "#402028", "#220F15", "#E2C889", "bracelet"),
    ("images/products/product-10.svg", "Sunset Glow Waist Beads", "Peach, Coral & Gold Shimmer", "#4E2632", "#2B111A", "#D4AF37", "waist"),
    ("images/products/product-11.svg", "Duchess Beaded Stack Ring", "Set of 3 Minimalist Elastic Rings", "#3B1E26", "#1E0E13", "#E89CA8", "ring"),
    ("images/products/product-12.svg", "Sweet Romance Gift Set", "Matching Bracelet, Ring & Earring", "#4B2431", "#271018", "#D4AF37", "gift"),
    ("images/products/product-13.svg", "Bridal Goddess Choker", "Couture Seed Bead Embroidery", "#3D1D27", "#210E15", "#E2C889", "necklace"),
    ("images/products/product-14.svg", "Bespoke Name & Charm Bead", "Personalized Custom Creation", "#482531", "#261219", "#E89CA8", "custom"),
]
for prod in products_meta:
    make_jewelry_svg(prod[0], prod[1], prod[2], prod[3], prod[4], prod[5], prod[6])

# 3. Hero & Brand & Gallery
hero_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%">
    <defs>
        <radialGradient id="heroBg" cx="60%" cy="40%" r="70%">
            <stop offset="0%" stop-color="#4A2633"/>
            <stop offset="60%" stop-color="#28131A"/>
            <stop offset="100%" stop-color="#14080C"/>
        </radialGradient>
        <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F9E8B8"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#8E6A1B"/>
        </linearGradient>
        <radialGradient id="heroPearl" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="60%" stop-color="#FADDE2"/>
            <stop offset="100%" stop-color="#C998A0"/>
        </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#heroBg)"/>
    
    <!-- Floating Sparkles -->
    <g opacity="0.6">
        <circle cx="200" cy="180" r="3" fill="#FFE2B8"/>
        <circle cx="850" cy="140" r="4" fill="#FFE2B8"/>
        <circle cx="1020" cy="420" r="2.5" fill="#FFE2B8"/>
        <circle cx="150" cy="650" r="3" fill="#FFE2B8"/>
        <circle cx="980" cy="680" r="4" fill="#FFE2B8"/>
    </g>
    
    <!-- Elegant Center Composition -->
    <g transform="translate(600, 380)">
        <!-- Layered Floating Strands -->
        <path d="M -300 -120 Q 0 240 300 -120" fill="none" stroke="url(#heroGold)" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
        <path d="M -240 -80 Q 0 320 240 -80" fill="none" stroke="url(#heroPearl)" stroke-width="16" stroke-linecap="round"/>
        <path d="M -180 -40 Q 0 400 180 -40" fill="none" stroke="#E38B98" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
        
        <!-- Center Gem Motif -->
        <circle cx="0" cy="240" r="28" fill="url(#heroGold)"/>
        <circle cx="0" cy="240" r="16" fill="#FFF8F0"/>
        <circle cx="0" cy="320" r="22" fill="url(#heroPearl)"/>
        <circle cx="0" cy="400" r="14" fill="url(#heroGold)"/>
    </g>
    
    <!-- Luxury Brand Signature Text in Hero -->
    <text x="600" y="680" text-anchor="middle" font-family="'Playfair Display', serif" font-size="34" font-style="italic" fill="#FAF5EF" letter-spacing="2">The Couture Handmade Bead Collection</text>
    <text x="600" y="720" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" font-weight="500" fill="#D4AF37" letter-spacing="5">LAGOS · LONDON · WORLDWIDE</text>
</svg>"""
with open("images/hero/hero-main.svg", "w", encoding="utf-8") as f:
    f.write(hero_svg)

# Brand story image
brand_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 800" width="100%" height="100%">
    <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3C1E28"/>
            <stop offset="100%" stop-color="#1A0A0F"/>
        </linearGradient>
        <linearGradient id="brandGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FCEAB8"/>
            <stop offset="100%" stop-color="#B88A22"/>
        </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#brandGrad)"/>
    <rect x="24" y="24" width="652" height="752" fill="none" stroke="url(#brandGold)" stroke-width="1.5" rx="8" opacity="0.6"/>
    
    <!-- Artisan Workshop Vector Art -->
    <circle cx="350" cy="330" r="160" fill="#2E141D" stroke="url(#brandGold)" stroke-width="2"/>
    <g transform="translate(350, 330)">
        <!-- Hands crafting beads motif -->
        <circle cx="0" cy="-60" r="14" fill="#FCEAB8"/>
        <circle cx="45" cy="-40" r="12" fill="#E89CA8"/>
        <circle cx="65" cy="5" r="15" fill="#FFFFFF"/>
        <circle cx="45" cy="50" r="12" fill="#FCEAB8"/>
        <circle cx="0" cy="70" r="16" fill="#E89CA8"/>
        <circle cx="-45" cy="50" r="12" fill="#FFFFFF"/>
        <circle cx="-65" cy="5" r="15" fill="#FCEAB8"/>
        <circle cx="-45" cy="-40" r="12" fill="#E89CA8"/>
        
        <!-- Needle and silk thread -->
        <line x1="-90" y1="-90" x2="90" y2="90" stroke="#FCEAB8" stroke-width="3"/>
        <circle cx="0" cy="0" r="28" fill="#B88A22"/>
        <text x="0" y="8" text-anchor="middle" font-family="'Playfair Display', serif" font-size="20" font-weight="700" fill="#FFF">✦</text>
    </g>
    
    <text x="350" y="580" text-anchor="middle" font-family="'Playfair Display', serif" font-size="30" font-weight="600" fill="#FFF7ED">Artisan Craftsmanship</text>
    <text x="350" y="620" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="13" fill="#D4AF37" letter-spacing="3">EVERY BEAD STRUNG WITH INTENTION</text>
    <text x="350" y="660" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="14" fill="#E8C5C8" opacity="0.8">Lagos, Nigeria</text>
</svg>"""
with open("images/brand/artisan-story.svg", "w", encoding="utf-8") as f:
    f.write(brand_svg)

# Instagram Gallery placeholders (6 items)
for i in range(1, 7):
    gal_titles = [
        ("Golden Hour Radiance", "Waist Beads & Sunset"),
        ("The Pearl Stack", "Layered Rose Bracelets"),
        ("Custom Bridal Order", "Custom Choker in Progress"),
        ("Anklet Magic", "Freshwater Pearls & Beach Days"),
        ("Packaging with Care", "Luxe Pink Satin Pouches"),
        ("Happy Client Glow", "Customer Styling Feature")
    ]
    title, sub = gal_titles[i-1]
    make_jewelry_svg(f"images/gallery/gallery-{i}.svg", title, sub, "#42212C", "#200E14", "#D4AF37", ["bracelet", "waist", "necklace", "anklet", "gift", "custom"][i-1])

# Logo SVG
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 60" width="320" height="60">
    <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F8E5B3"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#9C7720"/>
        </linearGradient>
    </defs>
    <!-- Monogram crown / bead icon -->
    <g transform="translate(6, 12)">
        <circle cx="16" cy="18" r="14" fill="none" stroke="url(#logoGold)" stroke-width="1.8"/>
        <circle cx="16" cy="18" r="8" fill="#E8AAB2" opacity="0.7"/>
        <circle cx="16" cy="6" r="3.5" fill="url(#logoGold)"/>
        <circle cx="6" cy="22" r="2.5" fill="url(#logoGold)"/>
        <circle cx="26" cy="22" r="2.5" fill="url(#logoGold)"/>
    </g>
    <!-- Brand Name typography -->
    <text x="46" y="32" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="700" fill="#2D1E24" letter-spacing="0.8">ElleBeeLuxeBeads</text>
    <text x="48" y="46" font-family="'Montserrat', sans-serif" font-size="7.5" font-weight="600" fill="#B88A22" letter-spacing="3.2">HANDMADE ACCESSOIRES</text>
</svg>"""
with open("images/logo/logo.svg", "w", encoding="utf-8") as f:
    f.write(logo_svg)

print("All luxury placeholder graphics generated successfully!")
