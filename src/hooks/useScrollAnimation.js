import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Animation options
 * @param {string} options.animation - Type of animation: 'fade-up', 'fade-in', 'scale-in', 'slide-in'
 * @param {number} options.delay - Animation delay in seconds
 * @param {number} options.duration - Animation duration in seconds
 * @param {string} options.ease - GSAP ease
 * @param {number} options.stagger - Stagger amount for children
 * @param {string} options.trigger - CSS selector for trigger element
 * @param {string} options.start - ScrollTrigger start position
 * @param {string} options.toggleActions - ScrollTrigger toggle actions
 */
export const useScrollAnimation = ({
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  stagger = 0,
  trigger = null,
  start = "top 85%",
  toggleActions = "play none none reverse",
} = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const animationConfigs = {
      "fade-up": {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      "fade-in": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      "scale-in": {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
      },
      "slide-in": {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
      },
    };

    const config = animationConfigs[animation] || animationConfigs["fade-up"];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger || element,
        start,
        toggleActions,
      },
    });

    if (stagger > 0) {
      const children =
        element.children || element.querySelectorAll(".stagger-item");
      tl.fromTo(
        children.length ? children : element,
        { ...config.from, stagger },
        { ...config.to, stagger, duration, ease, delay },
      );
    } else {
      tl.fromTo(element, config.from, { ...config.to, duration, ease, delay });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [
    animation,
    delay,
    duration,
    ease,
    stagger,
    trigger,
    start,
    toggleActions,
  ]);

  return elementRef;
};

export default useScrollAnimation;
