import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { SkipForward } from "lucide-react";
import Button from "../ui/Button";
import gymConfig from "../../config/gymConfig";
import { useSiteSettings } from "../../hooks/useSiteSettings";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Config ────────────────────────────────────────────────
const POSTER_IMAGE = "/images/gym-hero-poster.jpg";
const POSTER_DURATION = 3000;
const VIDEOS = [
  "/videos/gym-hero-1.mp4",
  "/videos/gym-hero-2.mp4",
  "/videos/gym-hero-3.mp4",
];
// ──────────────────────────────────────────────────────────

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: settings } = useSiteSettings();

  const gymName = settings?.gymName || gymConfig.name;

  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Stable particle config (generated once, not on every render)
  const particlesRef = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.3 + 0.05,
    })),
  );

  // 1) Show poster for 3s, then reveal video
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), POSTER_DURATION);
    return () => clearTimeout(timer);
  }, []);

  // 2) Load + play whenever index changes
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const video = videoRef.current;
    video.load();
    video.play().catch(() => {
      // Autoplay blocked — poster remains visible
    });
  }, [currentVideoIndex, showVideo]);

  // 3) Auto-advance on end
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  // 4) Manual skip
  const skipVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    if (!showVideo) setShowVideo(true);
  };

  // 5) Jump via dot
  const goToVideo = (index) => {
    if (index === currentVideoIndex) return;
    setCurrentVideoIndex(index);
    if (!showVideo) setShowVideo(true);
  };

  const handleDiscover = () => navigate("/activites");
  const handleTrial = () => navigate("/contact");

  // Particles animation
  useEffect(() => {
    const particleEls = document.querySelectorAll(".hero-particle");
    particleEls.forEach((el) => {
      const dur = parseFloat(el.dataset.dur);
      const delay = parseFloat(el.dataset.delay);
      gsap.to(el, {
        y: `-=${20 + Math.random() * 30}`,
        x: `+=${(Math.random() - 0.5) * 20}`,
        opacity: 0,
        duration: dur,
        delay: delay,
        ease: "power1.out",
        repeat: -1,
        repeatDelay: Math.random() * 2,
        onRepeat: () =>
          gsap.set(el, {
            y: 0,
            x: 0,
            opacity: parseFloat(el.dataset.baseOpacity),
          }),
      });
    });
  }, []);

  // Main GSAP timeline
  useGSAP(
    () => {
      const titleSplit = new SplitText(".hero-title", { type: "words,chars" });
      const subtitleSplit = new SplitText(".hero-subtitle", { type: "words" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        0.3,
      )
        .fromTo(
          titleSplit.chars,
          { yPercent: 120, opacity: 0, rotateX: -45 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: { each: 0.03, from: "start" },
            ease: "expo.out",
          },
          0.6,
        )
        .fromTo(
          subtitleSplit.words,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.04,
          },
          1.4,
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          1.8,
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          2.2,
        );

      // Scroll-driven effects
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 1.15,
        ease: "none",
      });
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
        opacity: 0.9,
        ease: "none",
      });
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "15% top",
          end: "55% top",
          scrub: 1,
        },
        y: -60,
        opacity: 0,
        ease: "none",
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="hero-section relative min-h-screen w-full flex items-center overflow-hidden bg-gym-bg"
    >
      {/* Background: poster + video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={POSTER_IMAGE}
          alt="Samurai Nouvelle Madina - Salle de sport et fitness"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <video
          ref={videoRef}
          muted
          loop={false}
          playsInline
          preload="auto"
          poster={POSTER_IMAGE}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            opacity: showVideo ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        >
          <source src={VIDEOS[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="hero-image-overlay absolute inset-0 bg-gradient-to-r from-gym-bg/95 via-gym-bg/65 to-gym-bg/10" />
      </div>

      {/* Scroll overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-1 bg-gradient-to-b from-gym-bg/50 via-transparent to-gym-bg/70"
      />

      {/* Particles */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        {particlesRef.current.map((p) => (
          <div
            key={p.id}
            className="hero-particle absolute rounded-full bg-white/80"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
            data-dur={p.duration}
            data-delay={p.delay}
            data-base-opacity={p.opacity}
          />
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-8 z-2 w-20 h-px bg-gradient-to-r from-transparent to-gym-orange/30" />
      <div className="absolute bottom-1/4 right-8 z-2 w-20 h-px bg-gradient-to-l from-transparent to-gym-orange/30" />

      {/* Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 text-left px-5 sm:px-8 lg:px-12 max-w-7xl w-full mx-auto will-change-transform"
      >
        <div className="hero-badge inline-flex items-center gap-2 bg-gym-orange/10 border border-gym-orange/35 text-gym-orange text-xs font-extrabold tracking-[0.2em] uppercase px-4 py-2 rounded-sm mb-6 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-gym-orange animate-pulse" />
          {t("hero.badge")}
        </div>

        <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.82] text-white overflow-hidden perspective-800 max-w-5xl">
          {t("hero.title", { gymName })}
          <br />
          <span className="text-gym-orange inline-block">
            {t("hero.titleHighlight")}
          </span>
        </h1>

        <p className="hero-subtitle text-white/75 text-sm md:text-base max-w-lg mt-6 leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row items-start gap-3 mt-8">
          <Button variant="primary" size="lg" onClick={handleDiscover}>
            {t("hero.ctaPrimary")}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleTrial}>
            {t("hero.ctaSecondary")}
          </Button>
        </div>
      </div>

      {/* Video Switcher */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-3 py-2">
        <div className="flex items-center gap-1.5">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToVideo(i)}
              aria-label={`Vidéo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentVideoIndex
                  ? "w-6 bg-gym-orange"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <span className="w-px h-4 bg-white/15" />

        <button
          onClick={skipVideo}
          aria-label="Vidéo suivante"
          className="flex items-center gap-1.5 text-white/70 hover:text-white text-[10px] font-medium uppercase tracking-wider transition-colors"
        >
          <SkipForward className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Suivant</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-0.5 h-2 bg-gym-orange rounded-full animate-scroll-bounce" />
        </div>
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
          Défiler
        </span>
      </div>

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.3; }
        }
        .animate-scroll-bounce { animation: scroll-bounce 1.8s ease-in-out infinite; }
        .perspective-800 { perspective: 800px; }
      `}</style>
    </section>
  );
};

export default Hero;
