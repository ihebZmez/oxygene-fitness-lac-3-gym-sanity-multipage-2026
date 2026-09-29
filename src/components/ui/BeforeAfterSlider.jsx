import { useRef, useState, useCallback, useEffect } from "react";
import SanityImage from "../common/SanityImage";

const BeforeAfterSlider = ({ before, after, name }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50); // percentage
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // ← new

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e) => {
    setDragging(true);
    setHasInteracted(true); // ← stop auto-slide once user touches it
    updatePosition(e.clientX ?? e.touches?.[0]?.clientX);
  };

  // Drag handling
  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging) return;
      updatePosition(e.clientX ?? e.touches?.[0]?.clientX);
    };
    const handleUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging, updatePosition]);

  // ── Auto-slide (stops as soon as the user interacts) ──
  useEffect(() => {
    if (dragging || hasInteracted) return;

    const id = setInterval(() => {
      setPosition((p) => (p >= 100 ? 0 : Math.min(100, p + 1)));
    }, 60);

    return () => clearInterval(id);
  }, [dragging, hasInteracted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-gym-bg"
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      {/* AFTER (full) */}
      <div className="absolute inset-0">
        <SanityImage
          source={after}
          alt={`${name} après`}
          width={800}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* BEFORE (clipped by position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <SanityImage
          source={before}
          alt={`${name} avant`}
          width={800}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider pointer-events-none">
        Avant
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gym-orange text-gym-bg text-[10px] font-bold uppercase tracking-wider pointer-events-none">
        Après
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gym-bg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 7l-4 5 4 5M16 7l4 5-4 5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
