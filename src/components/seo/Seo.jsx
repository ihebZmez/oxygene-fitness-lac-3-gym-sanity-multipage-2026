import { Helmet } from "react-helmet-async";
import { gymConfig } from "../../config/gymConfig";

const defaultTitle = "OXYGÈNE FITNESS – LAC 3 | Salle de sport à Tunis";
const defaultDescription =
  "OXYGÈNE FITNESS – LAC 3, votre salle de sport à Lac 3, Tunis : cours collectifs, fitness et coaching sportif. Parking gratuit.";
const defaultKeywords =
  "Oxygène Fitness Lac 3, salle de sport Lac 3, salle de sport Les Berges du Lac, salle de sport Tunis Lac 3, fitness Lac 3, salle de fitness Tunis, salle de musculation Lac 3, club de sport Lac 3, cours collectifs Lac 3, coaching sportif Lac 3";

const Seo = ({
  title = defaultTitle,
  description = defaultDescription,
  canonical = "/",
  image = "/images/gym-hero-poster.jpg",
  keywords = defaultKeywords,
  noIndex = false,
}) => {
  const siteUrl = gymConfig.siteUrl || window.location.origin;
  const canonicalUrl = new URL(
    canonical.startsWith("/") ? canonical : `/${canonical}`,
    siteUrl,
  ).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={
          noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large"
        }
      />
      <meta name="theme-color" content={gymConfig.accentColor} />
      <meta name="apple-mobile-web-app-title" content={gymConfig.name} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={`${siteUrl}/`} hreflang="fr" />
      <link rel="alternate" href={`${siteUrl}/`} hreflang="x-default" />
      <link rel="alternate" href={`${siteUrl}/en/`} hreflang="en" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={gymConfig.name} />
      <meta property="og:locale" content="fr_TN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default Seo;
