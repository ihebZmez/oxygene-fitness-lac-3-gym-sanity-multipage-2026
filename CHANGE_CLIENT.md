1. Core Theme / Colors
   src/index.css

2. Config File (Single Source of Truth)
   src/config/gymConfig.js

3. Logo & Static Branding
   File Action
   public/favicon.svg Replace with new client logo/favicon (red/white)
   src/assets/favicon.jpg Replace or delete
   public/vite.svg Replace with red/white version or remove
   index.html Update <title>, <meta name="description">, <link rel="icon">, Open Graph tags, favicon path
   public/robots.txt Update sitemap URL if domain changes
   public/sitemap.xml Update all URLs if domain changes

4. Fonts (Optional but recommended for rebrand)
   public/fonts/

5. Header / Footer
   src/components/layout/Navbar.jsx
   Swap any brand-name text.

   Update hover/active link colors to use --color-primary.

   Update the mobile menu background if it uses an old dark color.

   src/components/layout/Footer.jsx
   Logo, brand name, social links, address.

   Background color (dark red or white with red accent).

   Copyright year/name.

   src/components/layout/LanguageSwitcher.jsx
   Active language highlight → red.

6. Reusable UI Components (color sources)
   Update these once, and most of the site follows:

   File What to change
   src/components/ui/Button.jsx Primary variant → red bg, white text; hover → dark red
   src/components/ui/SectionTitle.jsx Accent bar / underline → red
   src/components/ui/PricingCard.jsx Featured card border, badge, CTA → red
   src/components/ui/ActivityCard.jsx Hover border / overlay → red
   src/components/ui/WhatsAppButton.jsx Could stay green (WhatsApp brand) or restyle — your call
   src/components/ui/BeforeAfterSlider.jsx Divider line / handle → red
   src/components/forms/ReservationForm.jsx Focus rings, submit button → red

7. Section Components
   Go through src/components/sections/*.jsx and update:

   Hero.jsx — overlay tint, CTA button, headline accent word (red).

   About.jsx — stat numbers, icons → red.

   Activities.jsx / Coaches.jsx — card hover states, headings underline.

   Pricing.jsx / Promotions.jsx — badges, "popular" ribbon → red.

   Testimonials.jsx — star icons (keep gold or make red), quote marks.

   CTA.jsx — background (solid red or red gradient).

   News.jsx — category tags → red.

   Corporate.jsx / PersonalTraining.jsx / ShopPartners.jsx / Transformations.jsx — accents.
