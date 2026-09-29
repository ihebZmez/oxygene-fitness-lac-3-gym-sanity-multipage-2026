import Corporate from "../components/sections/Corporate";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import Seo from "../components/seo/Seo";

export default function CorporatePage() {
  return (
    <div className="pt-24">
      <Seo
        title="Offres corporate & entreprise | Samurai Nouvelle Madina"
        description="Offres sport d'entreprise pour vos équipes : programmes fitness, coaching, wellness et activités sportives en entreprise."
        canonical="/corporate"
      />
      <Corporate />
      <Testimonials />
      <CTA />
    </div>
  );
}
