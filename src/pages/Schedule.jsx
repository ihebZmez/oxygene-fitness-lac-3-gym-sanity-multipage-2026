import { useState, useEffect } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { useSchedule } from "../hooks/useSchedule";
import Seo from "../components/seo/Seo";

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const SchedulePage = () => {
  const { data: scheduleRows = [], loading } = useSchedule();
  const safeRows = Array.isArray(scheduleRows) ? scheduleRows : [];
  const [activeDay, setActiveDay] = useState("Lundi");

  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = safeRows.filter((r) => r.day === day);
    return acc;
  }, {});

  useEffect(() => {
    const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
    const capitalized = today.charAt(0).toUpperCase() + today.slice(1);
    if (days.includes(capitalized)) setActiveDay(capitalized);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/40">
        Chargement du planning...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 md:px-8 bg-gym-bg">
      <Seo
        title="Planning des cours collectifs à Lac 3 | OXYGÈNE FITNESS"
        description="Consultez le planning des cours collectifs d'OXYGÈNE FITNESS à Lac 3, Tunis : Cross Training, Boxe, Pilates, Cycling et danse."
        canonical="/planning"
      />
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Planning Hebdomadaire"
          title="Votre"
          highlight="Routine"
          subtitle="Des cours adaptés à tous les emplois du temps"
        />

        {/* Mobile day selector */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 md:hidden">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeDay === day
                  ? "bg-gym-orange text-gym-bg"
                  : "bg-white/5 text-white/60"
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-7 gap-3">
          {days.map((day) => (
            <div
              key={day}
              className={`bg-white/5 rounded-xl p-4 border transition-all duration-300 ${
                activeDay === day
                  ? "border-gym-orange/50"
                  : "border-gym-border hover:border-gym-orange/30"
              }`}
            >
              <div className="text-center mb-3 pb-2 border-b border-gym-border">
                <span className="text-white/40 text-xs uppercase tracking-wider">
                  {day}
                </span>
              </div>
              <div className="space-y-3">
                {(scheduleByDay[day] || []).map((cls, i) => (
                  <div key={i} className="text-center">
                    <div className="text-white/40 text-xs">{cls.time}</div>
                    <div className="text-white text-sm font-medium">
                      {cls.activity?.title}
                    </div>
                    {cls.coach?.name && (
                      <div className="text-gym-orange text-[10px]">
                        {cls.coach.name}
                      </div>
                    )}
                    {cls.level && (
                      <div className="text-white/20 text-[10px]">
                        {cls.level}
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

        {/* Mobile view */}
        <div className="md:hidden space-y-3">
          <div className="text-white/40 text-sm text-center mb-4">
            {activeDay}
          </div>
          {(scheduleByDay[activeDay] || []).map((cls, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-4 border border-gym-border flex items-center justify-between"
            >
              <div>
                <div className="text-white font-medium">
                  {cls.activity?.title}
                </div>
                {cls.coach?.name && (
                  <div className="text-white/40 text-xs">{cls.coach.name}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-gym-orange font-medium">{cls.time}</div>
                {cls.level && (
                  <div className="text-white/20 text-[10px]">{cls.level}</div>
                )}
              </div>
            </div>
          ))}
          {!scheduleByDay[activeDay]?.length && (
            <div className="text-white/30 text-center py-8">
              Aucun cours ce jour
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = "/contact")}
          >
            Réserver un cours
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
