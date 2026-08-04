import type { ReactNode } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

type LuxurySectionShellProps = {
  sectionClassName?: string;
  cardClassName?: string;
  children: ReactNode;
  backgroundImagePath?: string;
  backgroundImageSizes?: string;
};

export default function LuxurySectionShell({
  sectionClassName = "",
  cardClassName = "",
  children,
  backgroundImagePath = "/cinematic.png",
  backgroundImageSizes = "(max-width: 768px) 100vw, 72rem",
}: LuxurySectionShellProps) {
  return (
    <section className={`content-shell py-10 sm:py-16 ${sectionClassName}`.trim()}>
      <div className={`luxury-card relative overflow-hidden p-6 text-center sm:p-10 ${cardClassName}`.trim()}>
        <div className="luxury-background-layer" aria-hidden="true">
          <Image
            src={assetPath(backgroundImagePath)}
            alt=""
            fill
            sizes={backgroundImageSizes}
            className="luxury-background-image"
            priority={false}
          />
          <div className="luxury-background-vignette" />
          <div className="luxury-paper-glow" />
          <div className="luxury-paper-grain" />
        </div>
        {children}
      </div>
    </section>
  );
}
