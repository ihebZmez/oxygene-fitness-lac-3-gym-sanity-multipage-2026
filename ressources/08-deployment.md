# 08 — Deployment

## Frontend — Vercel

1. Push repo to GitHub
2. Import project on vercel.com
3. Environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET=production`
4. Deploy and record the production URL assigned to the Oxygène Fitness site
5. Add URL to **Sanity CORS Origins** (allow credentials)

## Studio — Sanity Hosting

```bash
cd oxy-fit-lac
npx sanity deploy
```

Use the Studio URL assigned to this Sanity project.

Client Access
sanity.io/manage → your project → Members

Invite member → client email

Role: Editor

Client can now log in and edit all content.

Commands
bash
npm run dev # Local dev (frontend)
npm run studio # Local dev (Studio)
npm run build # Production build
npx sanity deploy # Deploy Studio
Pre-launch Checklist
□ EmailJS credentials set in ReservationForm
□ Production content seeded in Sanity
□ CORS origins include prod URL
□ Client invited as Editor
□ SEO meta verified per page
□ Mobile QA on 375 / 390 / 768 px
□ WhatsApp number correct
text

---
