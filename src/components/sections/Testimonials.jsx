import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../ui/SectionTitle";
import SanityImage from "../common/SanityImage";
import { Star, Play, Pause } from "lucide-react";
import { useTestimonials } from "../../hooks/useTestimonials";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const { data: testimonials = [], loading } = useTestimonials();
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const hasData = safeTestimonials.length > 0;

  const duplicated = safeTestimonials.length
    ? [...safeTestimonials, ...safeTestimonials, ...safeTestimonials]
    : [];

  useEffect(() => {
    if (!isPlaying || !hasData) return;

    const scroll = () => {
      if (carouselRef.current) {
        const cardWidth = 380;
        setCurrentIndex((prev) => {
          const next = prev + 0.01;
          if (next >= safeTestimonials.length * 2) {
            carouselRef.current.style.transform = `translateX(-${
              safeTestimonials.length * cardWidth
            }px)`;
            return safeTestimonials.length;
          }
          carouselRef.current.style.transform = `translateX(-${
            next * cardWidth
          }px)`;
          return next;
        });
      }
    };

    animationRef.current = setInterval(scroll, 50);
    return () => clearInterval(animationRef.current);
  }, [isPlaying, hasData, safeTestimonials.length]);

  if (loading || !hasData) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gym-bg-light border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          badge="Ils parlent de nous"
          title="Ce qu'ils disent"
          number="06"
        />

        <div
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div
            ref={carouselRef}
            className="flex gap-6 transition-transform duration-100 ease-linear"
            style={{ willChange: "transform" }}
          >
            {duplicated.map((t, idx) => (
              <div
                key={`${t._id}-${idx}`}
                className="flex-shrink-0 w-[360px] bg-white/5 rounded-2xl p-6 border border-gym-border hover:border-gym-orange/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gym-orange/20 overflow-hidden flex items-center justify-center">
                    {t.image ? (
                      <SanityImage
                        source={t.image}
                        alt={t.name}
                        width={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gym-orange">
                        {t.name?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    {t.role && (
                      <p className="text-gym-orange text-xs">{t.role}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gym-orange text-gym-orange"
                    />
                  ))}
                </div>

                <p className="text-white/60 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>

                {t.location && (
                  <div className="mt-4 pt-4 border-t border-gym-border">
                    <span className="text-white/20 text-xs">{t.location}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/5 border border-gym-border flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white/60" />
            ) : (
              <Play className="w-4 h-4 text-white/60" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
