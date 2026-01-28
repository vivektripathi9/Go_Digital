# GO-DIGITAL Website - Section Order

## 📍 Complete Section Flow (Top to Bottom)

### 1. **Navigation Bar** (Fixed Position)
- **ID**: None (`.navbar`)
- **Content**: 
  - Logo: "GO-DIGITAL"
  - Menu Links: About | Projects | Contact
  - Hamburger Menu (Mobile)

---

### 2. **Hero Section**
- **ID**: `#home`
- **Class**: `.hero`
- **Content**:
  - Full-screen background video (`homepagevideo.mp4`)
  - Title: "GO-DIGITAL"
  - Subtitle: "GO-DIGITAL ENTERPRISES PVT LTD"
  - Description: "Real Estate Consulting"
  - Scroll indicator animation

---

### 3. **Driven Section**
- **ID**: `#driven`
- **Class**: `.driven-section`
- **Layout**: Split (Text Left | Video Right)
- **Content**:
  - Headline: "Real Estate"
  - Tagline: "As the world shifts, build a stronger foundation"
  - Video: `driven/real-estate_1440x810.mp4`
- **Note**: No top/bottom padding

---

### 4. **Projects Section** (Impact Created)
- **ID**: `#projects`
- **Class**: `.section`
- **Content**:
  - Title: "Impact Created"
  - Subtitle: "Signature Projects & Partnerships"
  - Description paragraph
  - **15 Project Cards**:
    1. Svasa Homes
    2. Prestige Leela Residences
    3. Embassy Grove
    4. Embassy Lake Terraces
    5. Sobha Clovelly & Sobha Royal Pavilion
    6. Tata Promont
    7. Puravankara & Provident
    8. Concorde Napa Valley & Concorde Anteras
    9. Siddh Sekha Marquis, NCC Lake Springs, VBHC
    10. Royal Indraprastha — POSCH, Cinnamon Citadel, Song of Wind
    11. Mirai, Brigade Meadows, Panorama
    12. USR Susowdha, Sowparnika
    13. Pride Wilasa, Shriram, Nambiar
    14. Mantri Serenity, Abhigna Misty Woods
    15. Amberstone, SLV Sai Gardens, Eartho Fiori, Eartho Giardenia
  - Summary Block: "Our Footprint in Premium Residences"

---

### 5. **About Us Section**
- **ID**: `#about`
- **Class**: `.about-section`
- **Layout**: Split (Left Rail Navigation | Right Scrollable Content)
- **Left Rail** (Fixed):
  - Title: "ABOUT"
  - **6 Service Navigation Items**:
    1. Strategic Consulting
    2. Residential Broking
    3. Advisory
    4. Investment Management
    5. Digital Marketing
    6. Sales & Marketing
- **Right Content** (Scrollable):
  - 6 Service Modules (one for each navigation item)
  - Each module contains title, subline, and description

---

### 6. **Our Approach Section - Part 1**
- **ID**: `#approach`
- **Class**: `.approach-section`
- **Layout**: Split (Text Left | Image Right)
- **Content**:
  - Label: "Tailored & Tenacious"
  - Headline: "Our Approach"
  - Main Title: "Client Is The King"
  - Intro paragraph
  - **2 Feature Boxes**:
    - Customer Satisfaction (with SVG icon)
    - Total Transparency (with SVG icon)
  - Image: `approach/business-meeting-office.jpg`

---

### 7. **Our Approach Section - Part 2**
- **ID**: `#approach-2`
- **Class**: `.approach-section-2`
- **Layout**: Split (Image Left | Text Right)
- **Content**:
  - Main Title: "Buildings Become Brands"
  - Intro paragraph
  - **2 Feature Boxes**:
    - Developer Associations (with SVG icon)
    - Project Mandates (with SVG icon)
  - Image: `approach/21604.jpg`

---

### 8. **Founder Section**
- **ID**: `#founder`
- **Class**: `.founder-section`
- **Layout**: Scroll-driven narrative
- **Content** (in order):
  1. **Founder Name Slide**: "KARAMALA PRADEEP"
     - Role: "Founder. Principal Consultant."
     - Experience: "20+ years shaping sales, strategy, and execution."
  2. **Expertise Slide 1**: Sales & Marketing
  3. **Expertise Slide 2**: Sales Operations
  4. **Expertise Slide 3**: Business Set-Up
  5. **Expertise Slide 4**: Digital Marketing, Sales Strategy & Execution
  6. **Expertise Slide 5**: Team Building
  7. **Expertise Slide 6**: Learning & Development
  8. **Narrative Slide**: Background story paragraph
  9. **Impact Slide**: "700 Cr in Sales Delivered" (with count-up animation)
  10. **Values Slide**: "Trust · Transparency · Integrity · Mutual Respect · Performance"

---

### 9. **Strategy Section**
- **ID**: `#strategy`
- **Class**: `.strategy-section`
- **Content**:
  - Label: "STRATEGY"
  - Headline: "How We Approach Growth"
  - **6 Strategy Items** (Grid Layout):
    1. Market Research (with image)
    2. Target Audience (with image)
    3. Value Proposition (with image)
    4. Marketing Channels (with image)
    5. Content Strategy (with image)
    6. Marketing Campaigns (with image)

---

### 10. **Scope of Work Section**
- **ID**: `#scope`
- **Class**: `.scope-section`
- **Content**:
  - Label: "SCOPE OF WORK"
  - Title: "Strategic Partnership"
  - Intro: "GO-DIGITAL ENTERPRISES PVT LTD"
  - Subtitle: "GO-DIGITAL will come onboard as Strategic Partner for Sales & Marketing."
  - **Two-Column Layout**:
    - **Left Column**:
      1. Campaigns (Digital & Local)
      3. Site Visit Fixing
      5. Negotiations and Closures
      7. Sale Agreements
      9. Registrations & Sale Deed
    - **Right Column**:
      2. Lead Generation & Connects
      4. Site Visit Execution
      6. Banking & Collections
      8. Legal Coordinations

---

### 11. **Contact Section**
- **ID**: `#contact`
- **Class**: `.contact-section`
- **Layout**: Split (Contact Info Left | Action Card Right)
- **Left Column** (Contact Identity):
  - Name: "Karamala Pradeep"
  - Title: "Founder & Principal Consultant"
  - Phone: +91 96868 01199
  - Email: karamalapradeep@go-digital.in
- **Right Column** (Action Card):
  - Title: "Work with GO-DIGITAL"
  - Description paragraph
  - Button: "Sign Up for a Consultation"
- **Bottom**: "Thank You" closure

---

### 12. **Footer**
- **Class**: `.footer`
- **Content**: 
  - Copyright: "© 2024 GO-DIGITAL ENTERPRISES PVT LTD. All rights reserved."

---

## 🔗 Navigation Links

The navbar contains links to:
- **About** → Scrolls to `#about` (About Us Section)
- **Projects** → Scrolls to `#projects` (Projects Section)
- **Contact** → Scrolls to `#contact` (Contact Section)

---

## 📱 Mobile Behavior

On mobile devices (≤768px):
- Sections stack vertically
- Multi-column layouts become single column
- Images/videos reorder (often appear first)
- Hamburger menu replaces horizontal menu
- Font sizes reduce proportionally
- Padding/spacing optimizes for smaller screens

---

**Last Updated**: Based on current `index.html` structure
