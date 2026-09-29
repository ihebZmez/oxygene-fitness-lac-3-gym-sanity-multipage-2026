import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Check, ArrowRight, Mail, Phone, Users } from "lucide-react";
import SanityImage from "../common/SanityImage";
import { useCorporate } from "../../hooks/useCorporate";

gsap.registerPlugin(ScrollTrigger);

const Corporate = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { data: corporate, loading } = useCorporate();

  useEffect(() => {
    if (!loading && corporate) {
      gsap.fromTo(
        ".corporate-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".corporate-service",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".corporate-services",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [loading, corporate]);

  if (loading || !corporate) return null;

  const handleCta = () => {
    if (corporate.ctaLink) {
      if (corporate.ctaLink.startsWith("http")) {
        window.open(corporate.ctaLink, "_blank");
      } else {
        navigate(corporate.ctaLink);
      }
    } else {
      navigate("/contact");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-gym-bg to-gym-bg-light border-b border-gym-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="corporate-content grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* ── LEFT: content ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/20 rounded-full px-4 py-1.5 mb-5">
              <Briefcase className="w-3.5 h-3.5 text-gym-orange" />
              <span className="text-gym-orange text-[10px] font-bold uppercase tracking-[0.2em]">
                Entreprises
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="text-white">{corporate.title}</span>
              {corporate.subtitle && (
                <>
                  <br />
                  <span className="text-gym-orange">{corporate.subtitle}</span>
                </>
              )}
            </h2>

            {/* Description */}
            {corporate.description && (
              <p className="text-white/50 text-sm md:text-base max-w-lg mb-6 leading-relaxed">
                {corporate.description}
              </p>
            )}

            {/* Benefits checklist */}
            {corporate.benefits?.length > 0 && (
              <div className="mb-8">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
                  Pour vos équipes :
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {corporate.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-gym-orange/15 border border-gym-orange/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-gym-orange" />
                      </div>
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services list */}
            {corporate.services?.length > 0 && (
              <div className="corporate-services space-y-3 mb-8">
                {corporate.services.map((service, i) => (
                  <div
                    key={i}
                    className="corporate-service flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-gym-border hover:border-gym-orange/30 transition-all duration-300 group"
                  >
                    {service.icon && (
                      <div className="w-10 h-10 rounded-lg bg-gym-orange/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-semibold text-sm">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-white/40 text-xs mt-1 leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pricing info */}
            {(corporate.startingPrice || corporate.minimumEmployees) && (
              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                {corporate.startingPrice && (
                  <div className="px-3 py-2 rounded-lg bg-gym-orange/10 border border-gym-orange/20">
                    <span className="text-gym-orange font-bold">
                      {corporate.startingPrice}
                    </span>
                  </div>
                )}
                {corporate.minimumEmployees && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-gym-border">
                    <Users className="w-4 h-4 text-white/40" />
                    <span className="text-white/60 text-xs">
                      Minimum {corporate.minimumEmployees} employés
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCta}
                className="inline-flex items-center justify-center gap-2 bg-gym-orange text-gym-bg px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gym-orange-light hover:gap-3 hover:shadow-lg hover:shadow-gym-orange/25"
              >
                {corporate.ctaLabel || "Nous contacter"}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct contact shortcuts */}
              <div className="flex items-center gap-3">
                {corporate.contactPhone && (
                  <a
                    href={`tel:${corporate.contactPhone}`}
                    aria-label="Appeler"
                    className="w-11 h-11 rounded-full bg-white/5 border border-gym-border flex items-center justify-center text-white/60 hover:text-gym-orange hover:border-gym-orange/40 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {corporate.contactEmail && (
                  <a
                    href={`mailto:${corporate.contactEmail}`}
                    aria-label="Email"
                    className="w-11 h-11 rounded-full bg-white/5 border border-gym-border flex items-center justify-center text-white/60 hover:text-gym-orange hover:border-gym-orange/40 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Small note */}
            <p className="text-white/25 text-xs mt-6">
              Devis personnalisé sous 48h · Facturation entreprise
            </p>
          </div>

          {/* ── RIGHT: image + partner logos ── */}
          <div className="relative">
            {corporate.image ? (
              <div className="relative rounded-2xl overflow-hidden border border-gym-border aspect-[4/5]">
                <SanityImage
                  source={corporate.image}
                  alt={corporate.title}
                  width={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-bg via-transparent to-transparent" />
              </div>
            ) : (
              <div className="rounded-2xl border border-gym-border aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                <Briefcase className="w-16 h-16 text-white/10" />
              </div>
            )}

            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
              <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-bold text-gym-orange">−32%</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">
                  Absentéisme
                </div>
              </div>
              <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-2xl font-bold text-gym-orange">+18%</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">
                  Productivité
                </div>
              </div>
            </div>

            {/* Partner logos strip */}
            {corporate.logoStrip?.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
                {corporate.logoStrip.map((logo, i) => (
                  <div
                    key={i}
                    className="h-10 px-3 rounded-lg bg-white/5 border border-gym-border flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <SanityImage
                      source={logo}
                      alt="Partner logo"
                      width={120}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Corporate;
