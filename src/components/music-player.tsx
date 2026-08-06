"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

type MusicPlayerProps = {
  visible?: boolean;
};

export default function MusicPlayer({ visible = true }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const audio = audioRef.current;
    let isUnmounted = false;

    const tryPlay = async (forceUnmuted: boolean) => {
      if (!audioRef.current || isUnmounted) {
        return;
      }

      const element = audioRef.current;
      element.volume = 1;
      element.muted = forceUnmuted ? false : true;

      try {
        await element.play();
        if (!isUnmounted) {
          setMuted(element.muted);
        }
      } catch {
        // Some browsers block audible autoplay until user interaction.
      }
    };

    // First attempt audible autoplay, then fallback to muted autoplay.
    void tryPlay(true).then(() => {
      if (audio.paused) {
        void tryPlay(false);
      }
    });

    const unlockAudio = () => {
      if (!audioRef.current) {
        return;
      }

      const element = audioRef.current;
      element.muted = false;
      setMuted(false);

      if (element.paused) {
        void element.play().catch(() => {
          // Keep retry loop active; button remains available.
        });
      }
    };

    const keepPlaying = () => {
      if (!audioRef.current) {
        return;
      }

      const element = audioRef.current;
      if (!element.paused) {
        return;
      }

      void element.play().catch(() => {
        // Retry continues periodically.
      });
    };

    const retryInterval = window.setInterval(keepPlaying, 3500);
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("focus", keepPlaying);
    document.addEventListener("visibilitychange", keepPlaying);
    audio.addEventListener("pause", keepPlaying);

    return () => {
      isUnmounted = true;
      window.clearInterval(retryInterval);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("focus", keepPlaying);
      document.removeEventListener("visibilitychange", keepPlaying);
      audio.removeEventListener("pause", keepPlaying);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) {
      return;
    }

    const nextMuted = !muted;
    audioRef.current.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && audioRef.current.paused) {
      void audioRef.current.play().catch(() => {
        // Browser policy may still require interaction; retries stay active.
      });
    }
  };

  return (
    <>
      <audio
        id="wedding-audio"
        ref={audioRef}
        src={assetPath("/music/song.m4a")}
        loop
        preload="auto"
        muted={muted}
      />
      {visible ? (
        <button
          type="button"
          aria-label={muted ? "Unmute wedding music" : "Mute wedding music"}
          onClick={toggleMute}
          className="fixed right-5 bottom-5 z-[100] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--wine)]/88 text-white shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-[12px] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_40px_rgba(0,0,0,0.2)] active:scale-[0.96]"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      ) : null}
    </>
  );
}
