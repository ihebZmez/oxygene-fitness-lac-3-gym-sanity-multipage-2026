import News from "../components/sections/News";
import CTA from "../components/sections/CTA";
import SectionTitle from "../components/ui/SectionTitle";
import Seo from "../components/seo/Seo";

export default function NewsPage() {
  return (
    <div className="pt-24 pb-20 bg-gym-bg">
      <Seo
        title="Actualités & conseils fitness | Samurai Nouvelle Madina"
        description="Suivez les actualités, conseils fitness et bonnes pratiques de Samurai Nouvelle Madina pour rester motivé et en forme."
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
