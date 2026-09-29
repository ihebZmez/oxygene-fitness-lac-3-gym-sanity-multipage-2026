import { useRef } from "react";
import { Check } from "lucide-react";
import Button from "./Button";

const PricingCard = ({ plan, onBookTrial }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`pricing-card relative bg-gym-bg-light rounded-2xl p-6 border transition-all duration-500 ${
        plan.isPopular
          ? "border-gym-orange shadow-lg shadow-gym-orange/10"
          : "border-gym-border hover:border-gym-orange/30"
      }`}
    >
      {plan.isPopular && (
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
        <p className="text-white/30 text-xs mt-1">TTC</p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-gym-orange flex-shrink-0 mt-0.5" />
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          variant={plan.isPopular ? "primary" : "secondary"}
          size="lg"
          className="w-full"
          onClick={onBookTrial}
        >
          Réserver une séance
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
