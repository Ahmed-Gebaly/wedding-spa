import InvitationExperience from "@/components/invitation-experience";
import LenisProvider from "@/components/lenis-provider";
import MusicPlayer from "@/components/music-player";

export default function Home() {
  return (
    <LenisProvider>
      <MusicPlayer />
      <InvitationExperience />
    </LenisProvider>
  );
}
