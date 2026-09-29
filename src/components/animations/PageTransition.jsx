import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    if (!container || !bar) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([container, bar], { clearProps: "all" });
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    // Thin orange progress bar — sweeps across the top
    tl.fromTo(
      bar,
      { scaleX: 0, transformOrigin: "left center", opacity: 1 },
      { scaleX: 1, duration: 0.35, ease: "power2.inOut" },
    )
      .to(bar, {
        transformOrigin: "right center",
        scaleX: 0,
        duration: 0.25,
        ease: "power2.in",
      })
      // Content fades + slides up
      .fromTo(
        container,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.35",
      );

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => tl.kill();
  }, [location.pathname]);

  return (
    <>
      {/* Top progress bar */}
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gym-orange z-[9999] pointer-events-none"
        style={{ transform: "scaleX(0)", opacity: 0 }}
        aria-hidden="true"
      />

      {/* Page content */}
      <div ref={containerRef} className="will-change-transform">
        {children}
      </div>
    </>
  );
};

export default PageTransition;
