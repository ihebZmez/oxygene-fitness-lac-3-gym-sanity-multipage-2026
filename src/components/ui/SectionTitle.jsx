import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({
  badge,
  title,
  highlight,
  subtitle,
  number,
  className = "",
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const titleEl = ref.current;
      if (!titleEl) return;

      const chars = titleEl.querySelectorAll(".title-char");
      const subtitleEl = titleEl.querySelector(".subtitle-text");
      const badgeEl = titleEl.querySelector(".badge-text");
      const numberEl = titleEl.querySelector(".section-number");

      if (badgeEl) {
        gsap.fromTo(
          badgeEl,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: badgeEl,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (numberEl) {
        gsap.fromTo(
          numberEl,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(0.6)",
            scrollTrigger: {
              trigger: numberEl,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (chars.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(0.7)",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (subtitleEl) {
        gsap.fromTo(
          subtitleEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            scrollTrigger: {
              trigger: subtitleEl,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`text-left mb-10 max-w-4xl ${className}`}>
      {badge && (
        <div className="badge-text inline-block mb-4">
          <div className="flex items-center gap-2 bg-gym-orange/10 backdrop-blur-sm border border-gym-orange/25 rounded-sm px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gym-orange animate-pulse"></span>
            <span className="text-gym-orange text-xs font-extrabold tracking-[0.16em] uppercase">
              {badge}
            </span>
          </div>
        </div>
      )}

      <div className="relative">
        {number && (
          <span className="section-number absolute -top-7 right-0 text-8xl font-bold leading-none text-white/[0.04] select-none">
            {number}
          </span>
        )}

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.92]">
          {title && (
            <span className="text-white">
              {title.split("").map((char, i) => (
                <span key={i} className="title-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          )}
          {highlight && (
            <span className="text-gym-orange">
              {highlight.split("").map((char, i) => (
                <span key={i} className="title-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          )}
        </h2>
      </div>

      {subtitle && (
        <p className="subtitle-text text-white/55 text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
