import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Clock, Target } from "lucide-react";
import SanityImage from "../common/SanityImage";

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: "power2.out" });
    gsap.to(cardRef.current.querySelector(".card-content"), {
      y: -10,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector(".card-overlay"), {
      opacity: 1,
      duration: 0.4,
    });
    gsap.to(cardRef.current.querySelector(".card-arrow"), {
      x: 5,
      opacity: 1,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(cardRef.current.querySelector(".card-content"), {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(cardRef.current.querySelector(".card-overlay"), {
      opacity: 0,
      duration: 0.4,
    });
    gsap.to(cardRef.current.querySelector(".card-arrow"), {
      x: 0,
      opacity: 0.6,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      className="activity-card relative overflow-hidden rounded-2xl bg-gym-bg border border-gym-border cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate("/contact")}
    >
      <div className="relative h-56 overflow-hidden">
        <SanityImage
          source={activity.image}
          alt={activity.title}
          width={800}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-gym-bg via-transparent to-transparent opacity-0 transition-opacity duration-500" />

        {activity.icon && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gym-orange/20 backdrop-blur-sm flex items-center justify-center text-xl">
            {activity.icon}
          </div>
        )}
      </div>

      <div className="card-content p-6 relative">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gym-orange transition-colors duration-300">
          {activity.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {activity.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-white/30">
          {activity.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{activity.duration}</span>
            </div>
          )}
          {activity.level && (
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>{activity.level}</span>
            </div>
          )}
        </div>

        <div className="card-arrow flex items-center gap-2 text-gym-orange text-sm font-medium mt-4 opacity-60 transition-all duration-300">
          <span>En savoir plus</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none transition-all duration-500 group-hover:border-gym-orange/30" />
    </div>
  );
};

export default ActivityCard;
