import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import { usePricing } from "../../hooks/usePricing";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: plans = [], loading } = usePricing();
  const safePlans = Array.isArray(plans) ? plans : [];

  useEffect(() => {
    if (!loading && safePlans.length > 0) {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, safePlans]);

  if (loading || !safePlans.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Nos Abonnements"
          title="Choisissez votre"
          highlight="Formule"
          subtitle="Des tarifs adaptés à vos besoins"
          number="05"
        />

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {safePlans.map((plan) => (
            <div
              key={plan._id}
              className={`pricing-card relative bg-gym-bg-light rounded-2xl p-6 border transition-all duration-500 ${
                plan.popular
                  ? "border-gym-orange shadow-lg shadow-gym-orange/10"
                  : "border-gym-border hover:border-gym-orange/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gym-orange text-gym-bg text-xs font-bold uppercase tracking-wider rounded-full">
                  Populaire
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gym-orange">
                    {plan.price}
                  </span>
                  <span className="text-white/40 text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {(plan.features || []).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-gym-orange flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/contact")}
                >
                  {plan.ctaLabel || "Réserver"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* In Pricing.jsx, after the grid */}
        <div className="mt-10 p-5 rounded-2xl bg-gym-orange/10 border border-gym-orange/20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div>
            <p className="text-white font-semibold text-sm">
              Vous êtes une entreprise ?
            </p>
            <p className="text-white/50 text-xs">
              Offres corporate sur mesure pour vos équipes.
            </p>
          </div>
          <button
            onClick={() => navigate("/corporate")}
            className="text-gym-orange text-xs font-bold uppercase tracking-wider hover:gap-2 inline-flex items-center gap-1 transition-all"
          >
            Découvrir <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
