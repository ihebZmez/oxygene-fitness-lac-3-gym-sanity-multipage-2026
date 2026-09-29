import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";
import gymConfig from "../../config/gymConfig";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const handleBookTrial = () => navigate("/contact");
  const handleContact = () => navigate("/contact");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".cta-title-line",
        { y: 100, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(0.7)",
        },
      )
        .fromTo(
          ".cta-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".cta-stats",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          ".cta-buttons",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(0.6)",
          },
          "-=0.2",
        );

      // Video scale on scroll
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.1,
        ease: "none",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
          poster="/images/cta-poster.jpg"
        >
          <source src="/videos/gym-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gym-bg/70 via-gym-bg/50 to-gym-bg/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-block px-5 py-1.5 rounded-full bg-gym-orange/20 border border-gym-orange/30">
            <span className="text-gym-orange text-xs font-medium tracking-wider animate-pulse">
              {t("cta.badge")}
            </span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <div className="cta-title-line overflow-hidden">
            <span className="inline-block text-white">{t("cta.title")}</span>
          </div>
          <div className="cta-title-line overflow-hidden">
            <span className="inline-block bg-gradient-to-r from-white via-gym-orange to-white bg-clip-text text-transparent">
              {t("cta.titleHighlight")}
            </span>
          </div>
        </h2>

        <p className="cta-subtitle text-white/60 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
          {t("cta.subtitle")}
        </p>

        {/* Stats */}
        <div className="cta-stats flex flex-wrap justify-center gap-6 md:gap-10 mt-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gym-orange">
              500+
            </div>
            <div className="text-white/30 text-xs uppercase tracking-wide">
              {t("cta.stats.members")}
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gym-orange">
              24
            </div>
            <div className="text-white/30 text-xs uppercase tracking-wide">
              {t("cta.stats.events")}
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gym-orange">
              98%
            </div>
            <div className="text-white/30 text-xs uppercase tracking-wide">
              {t("cta.stats.satisfaction")}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button variant="primary" size="lg" onClick={handleBookTrial}>
            {t("cta.ctaPrimary")}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleContact}>
            {t("cta.ctaSecondary")}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="cta-subtitle flex flex-wrap justify-center gap-4 mt-8 text-white/30 text-xs">
          <span>✓ Paiement sécurisé</span>
          <span>✓ Annulation gratuite</span>
          <span>✓ Support 7j/7</span>
        </div>
      </div>
    </section>
  );
};

export default CTA;
