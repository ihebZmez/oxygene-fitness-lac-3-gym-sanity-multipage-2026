import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import gymConfig from "../../config/gymConfig";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const Footer = () => {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();

  // Sanity siteSettings = primary source
  // gymConfig = fallback for missing values
  const site = {
    ...gymConfig,
    ...settings,

    // Sanity gymName first, then gymConfig.name
    gymName: settings?.gymName || gymConfig.name,

    // Sanity social values first, gymConfig values as fallback
    social: {
      ...gymConfig.social,
      ...settings?.social,
    },

    // Sanity hours first, gymConfig values as fallback
    hours: {
      ...gymConfig.hours,
      ...settings?.hours,
    },
  };

  // Only display social networks that actually have a URL
  const socialLinks = [
    {
      icon: Facebook,
      url: site.social?.facebook,
      label: "Facebook",
    },
    {
      icon: Instagram,
      url: site.social?.instagram,
      label: "Instagram",
    },
    {
      icon: Youtube,
      url: site.social?.youtube,
      label: "YouTube",
    },
    {
      icon: Linkedin,
      url: site.social?.linkedin,
      label: "LinkedIn",
    },
  ].filter((social) => social.url);

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/activites", label: t("nav.activities") },
    { path: "/tarifs", label: t("nav.pricing") },
    { path: "/planning", label: t("nav.schedule") },
    { path: "/contact", label: t("nav.contact") },
  ];

  // Avoid duplicating +216 if the number already contains it
  const phoneHref = site.phone
    ? `tel:${site.phone.replace(/\D/g, "").replace(/^216/, "+216")}`
    : null;

  return (
    <footer className="bg-gym-bg border-t border-gym-border py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-gym-orange flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-gym-bg" />
              </div>

              <span className="text-white text-xl font-bold tracking-wider uppercase">
                {site.gymName}
              </span>
            </div>

            <p className="text-white/40 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>

            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>

            <ul className="space-y-3">
              {/* Phone */}
              {site.phone && (
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Phone className="w-4 h-4 text-gym-orange flex-shrink-0" />

                  <a
                    href={phoneHref || "#"}
                    className="hover:text-white transition-colors"
                  >
                    {site.phone}
                  </a>
                </li>
              )}

              {/* Email */}
              {site.email && (
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Mail className="w-4 h-4 text-gym-orange flex-shrink-0" />

                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {site.email}
                  </a>
                </li>
              )}

              {/* Address */}
              {site.address && (
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <MapPin className="w-4 h-4 text-gym-orange flex-shrink-0" />

                  <span>{site.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Horaires</h4>

            <ul className="space-y-2 text-white/40 text-sm">
              {/* Monday - Friday */}
              {site.hours?.weekday && (
                <li className="flex justify-between gap-4">
                  <span>Lun – Ven</span>
                  <span>{site.hours.weekday}</span>
                </li>
              )}

              {/* Saturday */}
              {site.hours?.saturday && (
                <li className="flex justify-between gap-4">
                  <span>Samedi</span>
                  <span>{site.hours.saturday}</span>
                </li>
              )}

              {/* Sunday */}
              {site.hours?.sunday && (
                <li className="flex justify-between gap-4">
                  <span>Dimanche</span>
                  <span>{site.hours.sunday}</span>
                </li>
              )}
            </ul>

            {/* Social Networks */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/5 border border-gym-border flex items-center justify-center text-white/40 hover:text-gym-orange hover:border-gym-orange/30 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <SocialIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gym-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-sm">
            {t("footer.copyright", {
              gymName: site.gymName,
            })}
          </p>

          <p className="text-white/10 text-xs tracking-wider">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
