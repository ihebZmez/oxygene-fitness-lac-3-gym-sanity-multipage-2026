import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserCheck,
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import SanityImage from "../common/SanityImage";
import { usePersonalTraining } from "../../hooks/usePersonalTraining";
import { useSiteSettings } from "../../hooks/useSiteSettings";

gsap.registerPlugin(ScrollTrigger);

const PersonalTraining = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: pt, loading } = usePersonalTraining();
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    if (!loading && pt) {
      gsap.fromTo(
        ".pt-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".pt-pillar",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pt-pillars",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".pt-package",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: ".pt-packages",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, pt]);

  if (loading || !pt) return null;

  const handleCta = () => {
    if (pt.ctaLink?.startsWith("http")) {
      window.open(pt.ctaLink, "_blank");
    } else {
      navigate(pt.ctaLink || "/contact");
    }
  };

  const handleWhatsApp = () => {
    const number = settings?.whatsapp?.replace(/[^0-9]/g, "");
    if (!number) return navigate("/contact");
    const msg =
      "Bonjour, je souhaite réserver une séance de coaching personnel.";
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-gym-bg-light to-gym-bg border-b border-gym-border overflow-hidden"
    >
      {/* Subtle orange glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gym-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Hero row: image + intro ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className="pt-left relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-gym-border aspect-[4/5]">
              {pt.image ? (
                <SanityImage
                  source={pt.image}
                  alt={pt.title}
                  width={900}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                  <UserCheck className="w-20 h-20 text-white/10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gym-bg/70 via-transparent to-transparent" />

              {/* Floating price tag */}
              {pt.startingPrice && (
                <div className="absolute bottom-5 left-5 px-4 py-3 bg-black/70 backdrop-blur-md rounded-xl border border-gym-orange/30">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">
                    À partir de
                  </div>
                  <div className="text-gym-orange font-bold text-lg">
                    {pt.startingPrice}
                  </div>
                </div>
              )}
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-l-2 border-b-2 border-gym-orange/30 rounded-bl-2xl pointer-events-none" />
          </div>

          {/* Copy */}
          <div className="pt-left order-1 lg:order-2">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/20 rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-gym-orange" />
              <span className="text-gym-orange text-[10px] font-bold uppercase tracking-[0.2em]">
                {pt.eyebrow || "Coaching Personnel"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] mb-4">
              <span className="text-white">{pt.title}</span>
            </h2>

            {pt.subtitle && (
              <p className="text-gym-orange text-lg md:text-xl font-medium mb-4">
                {pt.subtitle}
              </p>
            )}

            {pt.description && (
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                {pt.description}
              </p>
            )}

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCta}
                className="inline-flex items-center justify-center gap-2 bg-gym-orange text-gym-bg px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gym-orange-light hover:gap-3 hover:shadow-lg hover:shadow-gym-orange/25"
              >
                {pt.ctaLabel || "Réserver une séance"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-gym-border text-white/80 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:border-gym-orange/40 hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>

            {pt.note && <p className="text-white/30 text-xs mt-6">{pt.note}</p>}
          </div>
        </div>

        {/* ── Pillars (4 benefits) ── */}
        {pt.pillars?.length > 0 && (
          <div className="pt-pillars grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {pt.pillars.map((pillar, i) => (
              <div
                key={i}
                className="pt-pillar group p-5 rounded-2xl bg-white/5 border border-gym-border hover:border-gym-orange/40 transition-all duration-500"
              >
                {pillar.icon && (
                  <div className="w-12 h-12 rounded-xl bg-gym-orange/10 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-gym-orange/20 transition-all">
                    {pillar.icon}
                  </div>
                )}
                <h3 className="text-white font-bold text-sm mb-1">
                  {pillar.title}
                </h3>
                {pillar.description && (
                  <p className="text-white/40 text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Packages ── */}
        {pt.packages?.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Choisissez votre formule
              </h3>
              <p className="text-white/40 text-sm">
                Plus vous vous engagez, plus vous économisez
              </p>
            </div>

            <div className="pt-packages grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {pt.packages.map((pack, i) => (
                <div
                  key={i}
                  className={`pt-package relative rounded-2xl p-6 border transition-all duration-500 ${
                    pack.popular
                      ? "bg-gym-orange/10 border-gym-orange shadow-lg shadow-gym-orange/10"
                      : "bg-gym-bg-light border-gym-border hover:border-gym-orange/40"
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gym-orange text-gym-bg text-[10px] font-bold uppercase tracking-wider rounded-full">
                      Le plus choisi
                    </div>
                  )}

                  <h4 className="text-white font-bold text-lg mb-1">
                    {pack.name}
                  </h4>

                  {pack.sessions && (
                    <p className="text-gym-orange text-xs uppercase tracking-wider mb-4">
                      {pack.sessions}
                    </p>
                  )}

                  <div className="mb-5">
                    <span className="text-3xl font-bold text-white">
                      {pack.price}
                    </span>
                    {pack.perSession && (
                      <span className="text-white/40 text-xs ml-2">
                        ({pack.perSession}/séance)
                      </span>
                    )}
                  </div>

                  {pack.features?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {pack.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-xs text-white/60"
                        >
                          <Check className="w-3.5 h-3.5 text-gym-orange flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={handleCta}
                    className={`w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      pack.popular
                        ? "bg-gym-orange text-gym-bg hover:bg-gym-orange-light"
                        : "bg-white/5 text-white border border-white/10 hover:border-gym-orange/40"
                    }`}
                  >
                    {pack.ctaLabel || "Réserver"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PersonalTraining;
