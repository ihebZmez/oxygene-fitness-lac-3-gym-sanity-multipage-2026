// src/pages/Home.jsx
import Hero from "../components/sections/Hero";
import Promotions from "../components/sections/Promotions";
import About from "../components/sections/About";
import Activities from "../components/sections/Activities";
import Coaches from "../components/sections/Coaches";
import PersonalTraining from "../components/sections/PersonalTraining";
import SchedulePreview from "../components/sections/SchedulePreview";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import Transformations from "../components/sections/Transformations";
import CTA from "../components/sections/CTA";
import Seo from "../components/seo/Seo";
import { isPackage1SiteVitrine } from "../config/packageMode";

const Home = () => {
  const package1SiteVitrine = isPackage1SiteVitrine();
  return (
    <>
      <Seo
        title="OXYGÈNE FITNESS – LAC 3 | Salle de sport à Tunis"
        description="Bouge ton corps, oxygène ton esprit. Découvrez OXYGÈNE FITNESS – LAC 3 : cours collectifs, fitness et coaching sportif à Lac 3, Tunis. Parking gratuit."
        canonical="/"
      />
      <Hero /> {/* 1. Hook */}
      {!package1SiteVitrine && <Promotions />} {/* 2. Urgency / offer */}
      <About /> {/* 3. Trust: who we are */}
      <Activities /> {/* 4. What we offer */}
      <Coaches /> {/* 5. The team */}
      {!package1SiteVitrine && (
        <PersonalTraining /> /* 6. Premium upsell (right after Coaches) */
      )}
      <SchedulePreview /> {/* 7. When — teaser */}
      <Pricing /> {/* 8. How much */}
      <Testimonials /> {/* 9. Proof: social */}
      {!package1SiteVitrine && <Transformations />} {/* 10. Proof: visual */}
      <CTA /> {/* 11. Close */}
    </>
  );
};

export default Home;
