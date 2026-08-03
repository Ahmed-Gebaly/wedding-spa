"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  useEffect(() => {
    if (!audioAvailable) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.muted = muted;
    }
  }, [audioAvailable, muted]);

  const toggleMute = () => {
    if (!audioRef.current) {
      return;
    }

    const nextMuted = !muted;
    audioRef.current.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <>
      <audio
        id="wedding-audio"
        ref={audioRef}
        src="/music/wedding-theme.mp3"
        loop
        preload="auto"
        muted
        onError={() => {
          setAudioAvailable(false);
        }}
      />
      {audioAvailable ? (
        <button
          type="button"
          aria-label={muted ? "Unmute wedding music" : "Mute wedding music"}
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--wine)] text-white shadow-lg transition hover:scale-105"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      ) : null}
    </>
  );
}
