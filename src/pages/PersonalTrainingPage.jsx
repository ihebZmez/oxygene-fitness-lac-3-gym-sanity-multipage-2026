import PersonalTraining from "../components/sections/PersonalTraining";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import Seo from "../components/seo/Seo";

export default function PersonalTrainingPage() {
  return (
    <div className="pt-24">
      <Seo
        title="Coaching personnel | Samurai Nouvelle Madina"
        description="Profitez d'un coaching personnel personnalisé à Samurai Nouvelle Madina pour perdre du poids, prendre du muscle et améliorer votre forme."
        canonical="/coaching-personnel"
      />
      <PersonalTraining />
      <Testimonials />
      <CTA />
    </div>
  );
}
