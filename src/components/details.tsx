import Image from "next/image";
import { CalendarDays, Clock3, MapPin, CalendarPlus } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import { assetPath } from "@/lib/asset-path";

function buildGoogleCalendarUrl() {
  const start = new Date(weddingContent.eventIsoDateTime);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const formatDate = (value: Date) => value.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", "Ahmed & Salma Wedding");
  url.searchParams.set("dates", `${formatDate(start)}/${formatDate(end)}`);
  url.searchParams.set("location", weddingContent.venueDisplay);
  url.searchParams.set("details", "Join us in celebrating our wedding day.");

  return url.toString();
}

export default function Details() {
  const eventDate = new Date(weddingContent.eventIsoDateTime);
  const dateLabel = eventDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const venueTitle =
    weddingContent.venueDisplay.toLowerCase().includes("attached later") ||
    weddingContent.venueDisplay.toLowerCase().includes("announced")
      ? "Venue will be announced"
      : weddingContent.venueDisplay;

  const venueSub = weddingContent.mapQuery ? `${weddingContent.mapQuery}, Egypt` : "Egypt";

  return (
    <section className="content-shell details-shell py-10 sm:py-16">
      <div className="details-luxury-card p-6 text-center sm:p-10">
        <div className="details-background-layer" aria-hidden="true">
          <Image
            src={assetPath("/cinematic.png")}
            alt=""
            fill
            sizes="100vw"
            className="details-background-image"
            priority={false}
          />
          <div className="details-background-vignette" />
          <div className="details-paper-glow" />
          <div className="details-paper-grain" />
        </div>

        <div className="details-ornament-top">❦</div>
        <h3 className="details-title">Wedding Details</h3>

        <div className="details-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <div className="details-list">
          <div className="details-item">
            <div className="details-icon-wrap">
              <CalendarDays size={48} strokeWidth={1.6} />
            </div>
            <div className="details-item-content">
              <p className="details-item-label">Date</p>
              <p className="details-item-main">{dateLabel}</p>
            </div>
          </div>

          <div className="details-separator" aria-hidden="true">
            <span />
            <i>❖</i>
            <span />
          </div>

          <div className="details-item">
            <div className="details-icon-wrap">
              <Clock3 size={48} strokeWidth={1.6} />
            </div>
            <div className="details-item-content">
              <p className="details-item-label">Time</p>
              <p className="details-item-main">{weddingContent.eventTime}</p>
            </div>
          </div>

          <div className="details-separator" aria-hidden="true">
            <span />
            <i>❖</i>
            <span />
          </div>

          <div className="details-item">
            <div className="details-icon-wrap">
              <MapPin size={48} strokeWidth={1.6} />
            </div>
            <div className="details-item-content">
              <p className="details-item-label">Venue</p>
              <p className="details-item-main">{venueTitle}</p>
              <p className="details-item-sub">{venueSub}</p>
            </div>
          </div>
        </div>

        <div className="details-separator" aria-hidden="true">
          <span />
          <i>❖</i>
          <span />
        </div>

        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="details-calendar-cta"
        >
          <CalendarPlus size={24} strokeWidth={1.8} />
          <span>Add to Calendar</span>
        </a>

        <p className="details-note">
          Add the event to your calendar
          <br />
          and never miss our special day.
        </p>

        <p className="details-love">♥</p>
        <div className="details-ornament-bottom">❦</div>
      </div>
    </section>
  );
}
