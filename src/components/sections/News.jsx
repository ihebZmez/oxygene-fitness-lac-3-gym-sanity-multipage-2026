import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, Phone } from "lucide-react";
import { useNews } from "../../hooks/useNews";
import SanityImage from "../common/SanityImage";
import LoadingSkeleton from "../common/LoadingSkeleton";

gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const sectionRef = useRef(null);
  const { data: newsItems = [], loading } = useNews();
  const safeNewsItems = Array.isArray(newsItems) ? newsItems : [];

  useEffect(() => {
    if (!loading && safeNewsItems.length > 0) {
      gsap.fromTo(
        ".news-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, safeNewsItems]);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-gym-bg border-b border-gym-border">
        <div className="max-w-7xl mx-auto">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (!safeNewsItems.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-8 bg-gym-bg border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <div className="flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/20 rounded-full px-5 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gym-orange animate-pulse" />
              <span className="text-gym-orange text-xs font-medium tracking-wide uppercase">
                À la une
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-white">Actualités du</span>{" "}
            <span className="text-gym-orange">Club</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeNewsItems.map((item) => (
            <div
              key={item._id}
              className="news-card bg-gym-bg-light rounded-2xl overflow-hidden border border-gym-border hover:border-gym-orange/30 transition-all duration-500 group"
            >
              <div className="relative h-56 overflow-hidden">
                <SanityImage
                  source={item.image}
                  alt={item.title}
                  width={800}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-bg via-transparent to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-gym-orange transition-colors">
                  {item.title}
                </h3>
                {item.coachName && (
                  <p className="text-gym-orange text-sm">
                    avec {item.coachName}
                  </p>
                )}
                <p className="text-white/50 text-sm mt-2">{item.description}</p>

                {item.icons?.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {item.icons.map((icon, i) => (
                      <span key={i} className="text-xl">
                        {icon}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gym-border flex items-center gap-3 text-sm">
                  {item.day && (
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Calendar className="w-4 h-4 text-gym-orange" />
                      <span>{item.day}</span>
                    </div>
                  )}
                  {item.time && (
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Clock className="w-4 h-4 text-gym-orange" />
                      <span>{item.time}</span>
                    </div>
                  )}
                </div>

                {item.phone && (
                  <a
                    href={`tel:${item.phone}`}
                    className="mt-4 w-full bg-gym-orange text-gym-bg py-2.5 rounded-full font-semibold text-sm hover:bg-gym-orange-light transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {item.ctaLabel || "Réservez votre place"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
