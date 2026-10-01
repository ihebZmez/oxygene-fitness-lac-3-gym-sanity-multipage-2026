import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_VOLUME = 0.25;

function BackgroundMusic() {
  const audioRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const isEnabledRef = useRef(true);
  const isStartingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const fadeTo = useCallback((targetVolume, pauseWhenDone = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
    }

    const startVolume = audio.volume;
    const duration = targetVolume > startVolume ? 900 : 450;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        fadeFrameRef.current = window.requestAnimationFrame(step);
      } else {
        fadeFrameRef.current = null;
        if (pauseWhenDone) audio.pause();
      }
    };

    fadeFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isEnabledRef.current) return;

    if (!audio.paused) {
      fadeTo(MUSIC_VOLUME);
      return;
    }
    if (isStartingRef.current) return;

    isStartingRef.current = true;
    audio.volume = 0;

    try {
      audio
        .play()
        .then(() => {
          isStartingRef.current = false;
          hasStartedRef.current = true;
          fadeTo(
            isEnabledRef.current ? MUSIC_VOLUME : 0,
            !isEnabledRef.current,
          );
        })
        .catch(() => {
          isStartingRef.current = false;
        });
    } catch {
      isStartingRef.current = false;
    }
  }, [fadeTo]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = 0;

    const handleInteraction = (event) => {
      if (event.target?.closest?.("[data-background-music-control]")) return;
      startMusic();
    };

    document.addEventListener("pointerdown", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("pointerdown", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      if (fadeFrameRef.current !== null) {
        window.cancelAnimationFrame(fadeFrameRef.current);
      }
    };
  }, [startMusic]);

  const toggleMusic = () => {
    if (isEnabled && !hasStartedRef.current && !isStartingRef.current) {
      startMusic();
      return;
    }

    const nextEnabled = !isEnabled;
    isEnabledRef.current = nextEnabled;
    setIsEnabled(nextEnabled);

    if (nextEnabled) {
      startMusic();
    } else {
      fadeTo(0, true);
    }
  };

  const Icon = isEnabled ? Volume2 : VolumeX;

  return (
    <>
      <audio
        ref={audioRef}
        src="/songs/Bad-Times-Welcome.mp3"
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-6 left-6 z-40"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          data-background-music-control
          onClick={toggleMusic}
          aria-pressed={isEnabled}
          aria-label={isEnabled ? "Turn music off" : "Turn music on"}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-xs font-medium text-white/85 shadow-lg backdrop-blur-md transition-colors hover:border-gym-orange/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gym-orange"
        >
          <Icon size={15} aria-hidden="true" />
          <span>Music {isEnabled ? "On" : "Off"}</span>
        </button>
      </div>
    </>
  );
}

export default BackgroundMusic;
