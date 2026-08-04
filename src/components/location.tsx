import Image from "next/image";
import { ArrowDown, MapPin, Navigation } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import { assetPath } from "@/lib/asset-path";

export default function Location() {
  const mapSrc = weddingContent.mapEmbedSrc;
  const venueCity = weddingContent.mapQuery.includes(",")
    ? weddingContent.mapQuery.split(",").slice(1).join(",").trim()
    : weddingContent.mapQuery;

  return (
    <section className="content-shell location-shell py-10 sm:py-16">
      <div className="location-luxury-card p-6 text-center sm:p-10">
        <div className="location-background-layer" aria-hidden="true">
          <Image
            src={assetPath("/cinematic.png")}
            alt=""
            fill
            sizes="100vw"
            className="location-background-image"
            priority={false}
          />
          <div className="location-background-vignette" />
          <div className="location-paper-glow" />
          <div className="location-paper-grain" />
        </div>

        <div className="location-ornament-top">❦</div>
        <h3 className="location-title">Location</h3>

        <div className="location-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <div className="location-map-wrap">
          <div className="location-map-frame">
            <iframe
              title="Wedding venue location"
              src={mapSrc}
              className="location-map"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="location-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <h4 className="location-venue-title">{weddingContent.venueDisplay}</h4>

        <div className="location-divider location-divider-tight" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <p className="location-city-line">
          <MapPin size={20} strokeWidth={1.8} />
          <span>{venueCity || "Port Said, Egypt"}</span>
        </p>

        <div className="location-cta-wrap">
          <a
            href={weddingContent.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="location-cta"
          >
            <Navigation size={20} strokeWidth={1.8} />
            Get Directions
          </a>
        </div>

        <p className="location-note">
          We look forward to
          <br />
          welcoming you.
        </p>

        <p className="location-love">♥</p>
        <div className="location-ornament-bottom">❦</div>
        <div className="location-arrow" aria-hidden="true">
          <ArrowDown size={28} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
