import PersonalTraining from "../components/sections/PersonalTraining";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import Seo from "../components/seo/Seo";

export default function PersonalTrainingPage() {
  return (
    <div className="pt-24">
      <Seo
        title="Coaching sportif à Lac 3 | OXYGÈNE FITNESS"
        description="Progressez avec un coaching sportif à OXYGÈNE FITNESS – LAC 3, votre salle de sport à Lac 3, Tunis."
        canonical="/coaching-personnel"
      />
      <PersonalTraining />
      <Testimonials />
      <CTA />
    </div>
  );
}
