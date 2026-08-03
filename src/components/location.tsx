import { weddingContent } from "@/content/wedding";

export default function Location() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(weddingContent.mapQuery)}&t=&z=5&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 sm:p-10">
        <h3 className="text-center text-4xl sm:text-5xl">Location</h3>
        <p className="mt-4 text-center text-[var(--ink-soft)]">{weddingContent.venueDisplay}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border-soft)]">
          <iframe
            title="Wedding venue location"
            src={mapSrc}
            className="h-[300px] w-full sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-6 text-center">
          <a
            href={weddingContent.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-[var(--wine)] px-6 py-3 text-sm uppercase tracking-[0.16em] text-white"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
