# 06 — Conversion Flows

Every page leads to a booking or contact action.

| Source                     | CTA                 | Destination                       |
| -------------------------- | ------------------- | --------------------------------- |
| Hero                       | Réserver un essai   | `/contact`                        |
| Hero                       | Faire un essai      | `/contact`                        |
| Promotions                 | J'en profite        | `/contact` or partner link        |
| Activities                 | En savoir plus      | `/contact`                        |
| Coaches                    | Réserver une séance | `/contact`                        |
| Personal Training          | Réserver une séance | `/contact?type=personal-training` |
| Personal Training (mobile) | WhatsApp            | Pre-filled message                |
| Schedule                   | Réserver un cours   | `/contact`                        |
| Pricing                    | Choisir un plan     | `/contact`                        |
| Corporate                  | Nous contacter      | `/contact?type=corporate`         |
| Shop                       | Commander           | WhatsApp / external partner       |
| CTA Final                  | Réserver un essai   | `/contact`                        |

### Floating

- **WhatsApp button** — always visible, contextual messages
- **Scroll to top** — automatic on route change
