import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../components/ui/SectionTitle";
import ReservationForm from "../components/forms/ReservationForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import gymConfig from "../config/gymConfig";
import { useSiteSettings } from "../hooks/useSiteSettings";
import Seo from "../components/seo/Seo";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { data: settings } = useSiteSettings();
  const site = {
    ...gymConfig,
    ...settings,
    gymName: settings?.gymName || gymConfig.name,
    social: { ...gymConfig.social, ...settings?.social },
    hours: { ...gymConfig.hours, ...settings?.hours },
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: site.phone,
      href: `tel:${site.phone}`,
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: t("contact.info.address"),
      value: site.address,
      href: null,
    },
    {
      icon: Clock,
      label: t("contact.info.hours"),
      value: `${site.hours.weekday} · ${site.hours.saturday}`,
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Facebook, url: site.social.facebook, label: "Facebook" },
    { icon: Instagram, url: site.social.instagram, label: "Instagram" },
    { icon: Youtube, url: site.social.youtube, label: "YouTube" },
    { icon: Linkedin, url: site.social.linkedin, label: "LinkedIn" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-info-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-info-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen pt-8 pb-20 px-4 md:px-8 bg-gym-bg"
    >
      <Seo
        title="Contact | OXYGÈNE FITNESS – LAC 3"
        description="Contactez OXYGÈNE FITNESS – LAC 3 au 20 053 053. Retrouvez votre salle de sport à Lac 3, Tunis, avec parking gratuit."
        canonical="/contact"
      />
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge={t("contact.badge")}
          title={t("contact.title")}
          highlight={t("contact.titleHighlight")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="contact-info-grid space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="contact-info-item flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-gym-border hover:border-gym-orange/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gym-orange/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-gym-orange" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wide">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white hover:text-gym-orange transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-gym-border">
              <h4 className="text-white/60 text-xs uppercase tracking-wide mb-4">
                {t("contact.social")}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-gym-border flex items-center justify-center text-white/40 hover:text-gym-orange hover:border-gym-orange/30 transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ReservationForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-gym-border h-110">
          <iframe
            src="https://www.google.com/maps?q=OXYG%C3%88NE%20FITNESS%20%E2%80%93%20LAC%203%2C%20Tunis%2C%20Tunisie&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${site.gymName} location`}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
