import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import SanityImage from "../common/SanityImage";
import { useCoaches } from "../../hooks/useCoaches";

gsap.registerPlugin(ScrollTrigger);

const Coaches = () => {
  const sectionRef = useRef(null);
  const { data: coaches = [], loading } = useCoaches();
  const safeCoaches = Array.isArray(coaches) ? coaches : [];

  useEffect(() => {
    if (!loading && safeCoaches.length) {
      gsap.fromTo(
        ".coach-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "back.out(0.5)",
          scrollTrigger: {
            trigger: ".coaches-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, safeCoaches]);

  if (loading || !safeCoaches.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Notre Équipe"
          title="Vos"
          highlight="Coachs"
          subtitle="Des professionnels passionnés à votre écoute"
          number="03"
        />

        <div className="coaches-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeCoaches.map((coach) => (
            <div
              key={coach._id}
              className="coach-card group bg-white/5 rounded-2xl overflow-hidden border border-gym-border hover:border-gym-orange/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <SanityImage
                  source={coach.image}
                  alt={coach.name}
                  width={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-bg via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-gym-orange transition-colors duration-300">
                  {coach.name}
                </h3>
                {coach.role && (
                  <p className="text-gym-orange text-sm font-medium">
                    {coach.role}
                  </p>
                )}
                {coach.experience && (
                  <p className="text-white/30 text-xs mt-2">
                    {coach.experience} d'expérience
                  </p>
                )}

                {coach.specialties?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {coach.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 rounded-full bg-gym-orange/10 text-gym-orange"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Rencontrer l'équipe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Coaches;
