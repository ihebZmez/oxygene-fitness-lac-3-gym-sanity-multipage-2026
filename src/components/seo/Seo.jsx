import { Helmet } from "react-helmet-async";
import { gymConfig } from "../../config/gymConfig";

const defaultTitle =
  "Samurai Nouvelle Madina | Salle de sport & fitness à Mourouj, Tunis";
const defaultDescription =
  "Samurai Nouvelle Madina est votre salle de sport premium à Mourouj, Tunis : musculation, cardio, coaching personnel, cours collectifs, coaching sportif et séance d'essai gratuite.";
const defaultKeywords =
  "salle de sport Mourouj, gym Tunis, fitness Tunis, musculation Mourouj, coaching personnel Tunis, cours collectifs Tunis, Samurai Nouvelle Madina";

const Seo = ({
  title = defaultTitle,
  description = defaultDescription,
  canonical = "/",
  image = `${gymConfig.siteUrl}/og-image.svg`,
  keywords = defaultKeywords,
  noIndex = false,
}) => {
  const canonicalUrl = `${gymConfig.siteUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`;

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
      <meta
        name="apple-mobile-web-app-title"
        content="Samurai Nouvelle Madina"
      />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={`${gymConfig.siteUrl}/`} hreflang="fr" />
      <link
        rel="alternate"
        href={`${gymConfig.siteUrl}/`}
        hreflang="x-default"
      />
      <link rel="alternate" href={`${gymConfig.siteUrl}/en/`} hreflang="en" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Samurai Nouvelle Madina" />
      <meta property="og:locale" content="fr_TN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
