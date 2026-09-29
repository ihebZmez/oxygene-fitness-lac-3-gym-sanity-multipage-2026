import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import ActivityCard from "../ui/ActivityCard";
import Button from "../ui/Button";
import { useActivities } from "../../hooks/useActivities";

gsap.registerPlugin(ScrollTrigger);

const Activities = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: activities = [], loading } = useActivities();
  const safeActivities = Array.isArray(activities) ? activities : [];

  useEffect(() => {
    if (!loading && safeActivities.length) {
      gsap.fromTo(
        ".activity-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".activities-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, safeActivities]);

  if (loading || !safeActivities.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg-light border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Nos Disciplines"
          title="Votre"
          highlight="Programme"
          subtitle="Des activités variées pour tous les niveaux"
          number="02"
        />

        <div className="activities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeActivities.slice(0, 6).map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/activites")}
          >
            Voir toutes les activités
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Activities;
