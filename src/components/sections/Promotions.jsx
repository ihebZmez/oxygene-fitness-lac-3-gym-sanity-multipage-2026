import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Tag, Clock } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SanityImage from "../common/SanityImage";
import { usePromotions } from "../../hooks/usePromotions";

gsap.registerPlugin(ScrollTrigger);

// Accent → tailwind class map
const ACCENT = {
  orange: {
    text: "text-gym-orange",
    border: "border-gym-orange/40",
    bg: "bg-gym-orange/10",
    solid: "bg-gym-orange",
    glow: "shadow-gym-orange/20",
  },
  red: {
    text: "text-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    solid: "bg-red-500",
    glow: "shadow-red-500/20",
  },
  green: {
    text: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    solid: "bg-emerald-500",
    glow: "shadow-emerald-500/20",
  },
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    solid: "bg-purple-500",
    glow: "shadow-purple-500/20",
  },
};

const Promotions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: promotions, loading } = usePromotions();

  const safePromotions = Array.isArray(promotions) ? promotions : [];
  const hasData = safePromotions.length > 0;

  useEffect(() => {
    if (!loading && hasData) {
      gsap.fromTo(
        ".promo-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, hasData]);

  if (loading || !hasData) return null;

  const handleCta = (link) => {
    if (!link) return;
    if (link.startsWith("http") || link.startsWith("wa.me")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  // Split: highlight vs. regular
  const highlighted = safePromotions.filter((p) => p.highlight);
  const regular = safePromotions.filter((p) => !p.highlight);

  const renderCard = (promo, isLarge = false) => {
    const accent = ACCENT[promo.accent] || ACCENT.orange;

    return (
      <div
        key={promo._id}
        className={`promo-card group relative overflow-hidden rounded-2xl border ${accent.border} bg-gym-bg-light transition-all duration-500 hover:${accent.glow} hover:shadow-2xl ${
          isLarge ? "md:col-span-2" : ""
        }`}
      >
        {/* Background image (if provided) */}
        {promo.image && (
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <SanityImage
              source={promo.image}
              alt={promo.title}
              width={1200}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gym-bg/90 via-gym-bg/70 to-transparent" />

        {/* Content */}
        <div className={`relative p-6 md:p-8 ${isLarge ? "md:py-10" : ""}`}>
          {/* Badge */}
          {promo.badgeText && (
            <div
              className={`inline-flex items-center gap-1.5 ${accent.bg} ${accent.text} text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-4 border ${accent.border}`}
            >
              <Tag className="w-3 h-3" />
              {promo.badgeText}
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-bold text-white leading-tight ${
              isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            {promo.title}
          </h3>

          {/* Discount headline */}
          {promo.discountText && (
            <div
              className={`${accent.text} font-black tracking-tight mt-3 ${
                isLarge ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
              }`}
            >
              {promo.discountText}
            </div>
          )}

          {/* Subtitle */}
          {promo.subtitle && (
            <p
              className={`text-white/70 mt-3 ${
                isLarge ? "text-base md:text-lg" : "text-sm"
              }`}
            >
              {promo.subtitle}
            </p>
          )}

          {/* Description */}
          {promo.description && (
            <p className="text-white/40 text-sm mt-2 leading-relaxed max-w-xl">
              {promo.description}
            </p>
          )}

          {/* Expiry note */}
          {promo.endDate && (
            <div className="flex items-center gap-1.5 text-white/40 text-xs mt-4">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Valable jusqu'au{" "}
                {new Date(promo.endDate).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* CTA */}
          {promo.ctaLabel && (
            <button
              onClick={() => handleCta(promo.ctaLink)}
              className={`mt-6 inline-flex items-center gap-2 ${
                isLarge
                  ? accent.solid + " text-gym-bg"
                  : "text-white border border-white/20"
              } px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:gap-3 hover:scale-[1.02]`}
            >
              {promo.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Corner accent glow */}
        <div
          className={`absolute -top-16 -right-16 w-48 h-48 ${accent.bg} blur-3xl rounded-full opacity-60 pointer-events-none`}
        />
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Offres du moment"
          title="Profitez de nos"
          highlight="Promotions"
          subtitle="Des offres exclusives pour rejoindre Samurai Nouvelle Madina"
          number="00"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Highlighted offers (large) */}
          {highlighted.map((p) => renderCard(p, true))}

          {/* Regular offers */}
          {regular.map((p) => renderCard(p, false))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/30 text-xs mt-8">
          Offres non cumulables • Voir conditions en accueil
        </p>
      </div>
    </section>
  );
};

export default Promotions;
