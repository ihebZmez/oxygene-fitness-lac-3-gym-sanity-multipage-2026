export const NEWS_QUERY = `*[_type == "news" && active == true] | order(publishedAt desc) {
  _id,
  title,
  coachName,
  description,
  image,
  icons,
  day,
  time,
  ctaLabel,
  phone,
  publishedAt
}`;

export const PRICING_QUERY = `*[_type == "pricingPlan" && active == true] | order(order asc) {
  _id,
  name,
  price,
  currency,
  period,
  features,
  popular,
  ctaLabel
}`;

export const ACTIVITIES_QUERY = `*[_type == "activity" && active == true] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  icon,
  category,
  level,
  duration
}`;

export const SCHEDULE_QUERY = `*[_type == "classSchedule" && active == true] | order(day asc, time asc) {
  _id,
  day,
  time,
  room,
  level,
  "activity": activity->{ title, icon, "slug": slug.current },
  "coach": coach->{ name, image }
}`;

export const COACHES_QUERY = `*[_type == "coach" && active == true] | order(order asc) {
  _id,
  name,
  role,
  image,
  specialties,
  experience,
  bio,
  instagram
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && active == true] | order(order asc) {
  _id,
  name,
  role,
  content,
  rating,
  image,
  location
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  gymName,
  tagline,
  phone,
  whatsapp,
  email,
  address,
  social,
  hours,
  heroPoster
}`;

export const PROMOTIONS_QUERY = `*[_type == "promotion" && active == true
  && (!defined(endDate) || endDate >= now())
] | order(highlight desc, order asc) {
  _id,
  title,
  subtitle,
  description,
  badgeText,
  discountText,
  image,
  ctaLabel,
  ctaLink,
  startDate,
  endDate,
  highlight,
  accent
}`;

export const TRANSFORMATIONS_QUERY = `*[_type == "transformation" && active == true && consent == true]
  | order(featured desc, order asc) {
  _id,
  memberName,
  memberAge,
  duration,
  program,
  beforeImage,
  afterImage,
  weightLoss,
  muscleGain,
  results,
  quote,
  rating,
  featured
}`;

export const CORPORATE_QUERY = `*[_type == "corporateOffer" && active == true] | order(order asc)[0] {
  _id,
  title,
  subtitle,
  description,
  benefits,
  services,
  image,
  logoStrip,
  startingPrice,
  minimumEmployees,
  ctaLabel,
  ctaLink,
  contactEmail,
  contactPhone
}`;

export const PARTNER_PRODUCTS_QUERY = `*[_type == "partnerProduct" && active == true]
  | order(featured desc, order asc) {
  _id,
  name,
  brand,
  category,
  description,
  image,
  priceLabel,
  discountLabel,
  ctaLabel,
  ctaType,
  ctaLink,
  whatsappMessage,
  partnerLogo,
  featured
}`;

export const PERSONAL_TRAINING_QUERY = `*[_type == "personalTraining" && active == true]
  | order(order asc)[0] {
  _id,
  eyebrow,
  title,
  subtitle,
  description,
  pillars,
  image,
  packages,
  startingPrice,
  ctaLabel,
  ctaLink,
  note
}`;
