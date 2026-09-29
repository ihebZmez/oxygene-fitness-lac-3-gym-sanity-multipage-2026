import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TrendingDown,
  TrendingUp,
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import { useTransformations } from "../../hooks/useTransformations";

gsap.registerPlugin(ScrollTrigger);

const Transformations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: transformations, loading } = useTransformations();

  const safeData = Array.isArray(transformations) ? transformations : [];
  const hasData = safeData.length > 0;

  useEffect(() => {
    if (!loading && hasData) {
      gsap.fromTo(
        ".transfo-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
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

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Résultats réels"
          title="Leurs"
          highlight="Transformations"
          subtitle="Des membres comme vous. Des résultats concrets, mesurés dans le temps."
          number="07"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {safeData.map((t) => (
            <div
              key={t._id}
              className="transfo-card bg-gym-bg-light rounded-2xl border border-gym-border overflow-hidden hover:border-gym-orange/30 transition-all duration-500 group"
            >
              <div className="grid sm:grid-cols-2 gap-0">
                {/* Before/After slider */}
                <div className="p-4 sm:p-5">
                  <BeforeAfterSlider
                    before={t.beforeImage}
                    after={t.afterImage}
                    name={t.memberName}
                  />
                </div>

                {/* Info */}
                <div className="p-5 sm:pr-6 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-gym-orange transition-colors">
                          {t.memberName}
                        </h3>
                        {t.memberAge && (
                          <p className="text-white/40 text-xs">
                            {t.memberAge} ans
                          </p>
                        )}
                      </div>
                      {t.rating && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-gym-orange text-gym-orange"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Duration + Program */}
                    <div className="flex flex-wrap gap-2 text-[11px] mb-4">
                      <span className="px-2 py-0.5 rounded-full bg-gym-orange/10 text-gym-orange border border-gym-orange/20">
                        {t.duration}
                      </span>
                      {t.program && (
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                          {t.program}
                        </span>
                      )}
                    </div>

                    {/* Big result numbers */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      {t.weightLoss && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <TrendingDown className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-bold text-sm">
                            −{t.weightLoss} KG
                          </span>
                        </div>
                      )}
                      {t.muscleGain && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gym-orange/10 border border-gym-orange/20">
                          <TrendingUp className="w-4 h-4 text-gym-orange" />
                          <span className="text-gym-orange font-bold text-sm">
                            +{t.muscleGain} KG
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Result badges */}
                    {t.results?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {t.results.map((r, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quote */}
                    {t.quote && (
                      <div className="relative pl-4 mt-2">
                        <Quote className="absolute -left-0.5 top-0 w-3.5 h-3.5 text-gym-orange/50" />
                        <p className="text-white/60 text-sm leading-relaxed italic">
                          {t.quote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-gym-orange text-gym-bg px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gym-orange-light hover:gap-3 hover:shadow-lg hover:shadow-gym-orange/25"
          >
            Commencer ma transformation
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-white/30 text-xs mt-4">
            Résultats variables selon les individus · 1ʳᵉ séance offerte
          </p>
        </div>
      </div>
    </section>
  );
};

export default Transformations;
