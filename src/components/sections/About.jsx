import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/Button"; // Fix: This should be SectionTitle
import { useSiteSettings } from "../../hooks/useSiteSettings";
import gymConfig from "../../config/gymConfig";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const gymName = settings?.gymName || gymConfig.name;
  const sectionRef = useRef(null);

  // Stats data
  const stats = [
    { value: "2500+", label: t("about.stats.members"), icon: "💪" },
    { value: "30+", label: t("about.stats.sessions"), icon: "🏋️" },
    { value: "12+", label: t("about.stats.events"), icon: "🎯" },
    { value: "7/7", label: t("about.stats.partners"), icon: "📅" },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Quote animation
      gsap.fromTo(
        ".about-quote",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about-quote",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge={t("about.badge")}
          title={t("about.title")}
          highlight={t("about.titleHighlight")}
          subtitle={t("about.subtitle")}
          number="01"
        />

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center p-6 bg-white/5 rounded-2xl border border-gym-border hover:border-gym-orange/30 transition-all duration-500 group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gym-orange mb-1">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="about-quote mt-16 text-center py-10 border-t border-b border-gym-border">
          <blockquote className="text-xl md:text-2xl font-light italic text-white/80 max-w-3xl mx-auto">
            "{t("about.quote")}"
          </blockquote>
          <p className="text-gym-orange mt-4 text-sm tracking-wide">
            {t("about.quoteAuthor", { gymName })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
