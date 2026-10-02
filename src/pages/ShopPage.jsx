import ShopPartners from "../components/sections/ShopPartners";
import CTA from "../components/sections/CTA";
import SectionTitle from "../components/ui/SectionTitle";
import Seo from "../components/seo/Seo";

export default function ShopPage() {
  return (
    <div className="pt-24 pb-20 bg-gym-bg">
      <Seo
        title="Boutique sport & accessoires | OXYGÈNE FITNESS – LAC 3"
        description="Découvrez la boutique sport d'OXYGÈNE FITNESS – LAC 3, votre club de sport à Tunis."
        canonical="/shop"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle
          badge="Shop & Partenaires"
          title="Recommandé par"
          highlight="nos coachs"
          subtitle="Produits testés et approuvés · Livraison via nos partenaires"
        />
      </div>
      <ShopPartners />
      <CTA />
    </div>
  );
}
