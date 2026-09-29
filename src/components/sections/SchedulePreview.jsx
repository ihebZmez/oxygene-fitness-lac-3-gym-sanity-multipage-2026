import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import { useSchedule } from "../../hooks/useSchedule";

gsap.registerPlugin(ScrollTrigger);

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const SchedulePreview = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: scheduleRows, loading } = useSchedule();
  const safeRows = Array.isArray(scheduleRows) ? scheduleRows : [];

  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = safeRows.filter((r) => r.day === day);
    return acc;
  }, {});

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
  const todayClasses = scheduleByDay[todayCapitalized] || [];

  useEffect(() => {
    if (!loading && safeRows.length > 0) {
      gsap.fromTo(
        ".schedule-day",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".schedule-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, safeRows]);

  if (loading || safeRows.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg-light border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Planning Hebdomadaire"
          title="Votre"
          highlight="Routine"
          subtitle="Des cours adaptés à tous les emplois du temps"
          number="04"
        />

        {todayClasses.length > 0 && (
          <div className="mb-8 p-4 bg-gym-orange/10 rounded-2xl border border-gym-orange/20">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gym-orange font-bold text-sm uppercase tracking-wider">
                Aujourd'hui
              </span>
              <span className="text-white font-medium">{todayCapitalized}</span>
              <span className="text-white/30">·</span>
              <span className="text-white/40 text-sm">
                {todayClasses.length} cours
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {todayClasses.slice(0, 3).map((cls, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-white/5 rounded-full border border-gym-border text-white/60"
                >
                  {cls.time} · {cls.activity?.title}
                </span>
              ))}
              {todayClasses.length > 3 && (
                <span className="text-xs px-3 py-1 text-gym-orange">
                  +{todayClasses.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="schedule-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {days.map((day) => (
            <div
              key={day}
              className="schedule-day bg-white/5 rounded-xl p-4 border border-gym-border hover:border-gym-orange/30 transition-all duration-300"
            >
              <div className="text-center mb-3 pb-2 border-b border-gym-border">
                <span className="text-white/40 text-xs uppercase tracking-wider">
                  {day.substring(0, 3)}
                </span>
              </div>
              <div className="space-y-2">
                {(scheduleByDay[day] || []).map((cls, i) => (
                  <div key={i} className="text-center">
                    <div className="text-white/60 text-xs">{cls.time}</div>
                    <div className="text-white text-sm font-medium">
                      {cls.activity?.title}
                    </div>
                    {cls.coach?.name && (
                      <div className="text-white/20 text-[10px]">
                        {cls.coach.name}
                      </div>
                    )}
                  </div>
                ))}
                {!scheduleByDay[day]?.length && (
                  <div className="text-white/20 text-xs text-center">—</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/planning")}
          >
            Voir le planning complet
          </Button>
        </div>

        {/* Small Shop link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/shop")}
            className="text-white/40 text-xs uppercase tracking-wider hover:text-gym-orange transition-colors"
          >
            Shop & Partenaires →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SchedulePreview;
