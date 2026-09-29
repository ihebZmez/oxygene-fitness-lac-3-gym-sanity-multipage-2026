import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../components/ui/SectionTitle";
import PricingCard from "../components/ui/PricingCard";
import { Check } from "lucide-react";
import Seo from "../components/seo/Seo";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "89",
    currency: "DT",
    period: "mois",
    features: [
      "Accès illimité à la salle",
      "Équipement cardio & force",
      "Vestiaires premium",
      "WiFi gratuit",
    ],
    isPopular: false,
    cta: "Commencer",
  },
  {
    id: "pro",
    name: "Pro",
    price: "149",
    currency: "DT",
    period: "mois",
    features: [
      "Tout Starter inclus",
      "Cours collectifs illimités",
      "Évaluation physique mensuelle",
      "Application de suivi",
      "Espace détente",
    ],
    isPopular: true,
    cta: "Choisir Pro",
  },
  {
    id: "premium",
    name: "Premium",
    price: "249",
    currency: "DT",
    period: "mois",
    features: [
      "Tout Pro inclus",
      "Coaching personnalisé",
      "Accès illimité aux cours",
      "Programme nutritionnel",
      "Massages de récupération",
      "Accès prioritaire",
    ],
    isPopular: false,
    cta: "Devenir Premium",
  },
];

const extraFeatures = [
  "Cours d'essai gratuit",
  "Programme personnalisé",
  "Suivi mensuel",
  "Événements exclusifs",
];

const PricingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const handleBookTrial = () => navigate("/contact");

  useGSAP(
    () => {
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
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="min-h-screen pt-8 pb-20 px-4 md:px-8 bg-gym-bg"
    >
      <Seo
        title="Tarifs salle de sport | Samurai Nouvelle Madina"
        description="Découvrez les abonnements et tarifs de Samurai Nouvelle Madina : accès gym, coaching, cours collectifs et offres premium."
        canonical="/tarifs"
      />
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge={t("pricing.badge")}
          title={t("pricing.title")}
          highlight={t("pricing.titleHighlight")}
          subtitle={t("pricing.subtitle")}
        />

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onBookTrial={handleBookTrial}
            />
          ))}
        </div>

        {/* Extra features */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-6 border border-gym-border">
            <h3 className="text-white font-bold text-center mb-6">
              Tous les abonnements incluent :
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extraFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <Check className="w-4 h-4 text-gym-orange flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/30 text-sm">
            Tous les abonnements incluent un essai gratuit de 7 jours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
