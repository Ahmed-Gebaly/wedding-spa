import Image from "next/image";
import LuxuryActionLink from "@/components/ui/luxury-action-link";
import { assetPath } from "@/lib/asset-path";

type DirectionButtonProps = {
  href: string;
};

export default function DirectionButton({ href }: DirectionButtonProps) {
  return (
    <LuxuryActionLink href={href} target="_blank" rel="noopener noreferrer" className="timeline-direction-btn">
      <Image src={assetPath("/assets/icons/location-pin.svg")} alt="" width={16} height={16} className="timeline-direction-icon" />
      <span>GET DIRECTIONS</span>
      <Image src={assetPath("/assets/icons/arrow-right.svg")} alt="" width={16} height={16} className="timeline-direction-chevron" />
    </LuxuryActionLink>
  );
}
