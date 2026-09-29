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

const Home = () => {
  return (
    <>
      <Seo
        title="Samurai Nouvelle Madina | Salle de sport & fitness à Mourouj, Tunis"
        description="Samurai Nouvelle Madina est votre salle de sport premium à Mourouj, Tunis. Musculation, cardio, coaching personnel, cours collectifs, coaching sportif et séance d'essai gratuite."
        canonical="/"
      />
      <Hero /> {/* 1. Hook */}
      <Promotions /> {/* 2. Urgency / offer */}
      <About /> {/* 3. Trust: who we are */}
      <Activities /> {/* 4. What we offer */}
      <Coaches /> {/* 5. The team */}
      <PersonalTraining /> {/* 6. Premium upsell (right after Coaches) */}
      <SchedulePreview /> {/* 7. When — teaser */}
      <Pricing /> {/* 8. How much */}
      <Testimonials /> {/* 9. Proof: social */}
      <Transformations /> {/* 10. Proof: visual */}
      <CTA /> {/* 11. Close */}
    </>
  );
};

export default Home;
