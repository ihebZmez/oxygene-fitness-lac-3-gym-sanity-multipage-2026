import News from "../components/sections/News";
import CTA from "../components/sections/CTA";
import SectionTitle from "../components/ui/SectionTitle";
import Seo from "../components/seo/Seo";

export default function NewsPage() {
  return (
    <div className="pt-24 pb-20 bg-gym-bg">
      <Seo
        title="Actualités fitness à Lac 3 | OXYGÈNE FITNESS"
        description="Suivez les actualités et conseils fitness d'OXYGÈNE FITNESS à Lac 3, Tunis. Bouge ton corps, oxygène ton esprit."
        canonical="/actualites"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          badge="Actualités"
          title="Ce qui se passe au"
          highlight="Club"
          subtitle="Nouvelles activités, événements et annonces de nos coachs"
        />
      </div>
      <News />
      <CTA />
    </div>
  );
}
