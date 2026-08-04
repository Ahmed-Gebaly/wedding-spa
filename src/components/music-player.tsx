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
        src={assetPath("/music/wedding-theme.mp3")}
        loop
        preload="auto"
        muted
        onError={() => {
          setAudioAvailable(false);
        }}
      />
      {audioAvailable && visible ? (
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
