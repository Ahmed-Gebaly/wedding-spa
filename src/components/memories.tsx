import Image from "next/image";
import { ArrowDown, MessageCircle } from "lucide-react";
import LuxurySectionShell from "@/components/ui/luxury-section-shell";

const qrItems = [
  {
    title: "AHMED",
    subtitle: "Share via WhatsApp",
    href: "https://wa.me/201092951952?text=Hi%20Ahmed!%20I'd%20like%20to%20share%20the%20photos%20I%20captured%20during%20your%20wedding.%20Congratulations%20to%20you%20both!%20%F0%9F%A4%8D",
    cta: "SEND TO AHMED",
  },
  {
    title: "SALMA",
    subtitle: "Share via WhatsApp",
    href: "https://wa.me/201044469968?text=Hi%20Salma!%20I'd%20like%20to%20share%20the%20photos%20I%20captured%20during%20your%20wedding.%20Congratulations%20to%20you%20both!%20%F0%9F%A4%8D",
    cta: "SEND TO SALMA",
  },
];

export default function Memories() {
  return (
    <LuxurySectionShell sectionClassName="memories-shell" cardClassName="memories-luxury-card">
        <div className="memories-ornament-top">❦</div>
        <h3 className="memories-title">
          <span>Share Your</span>
          <span>Memories</span>
        </h3>

        <div className="memories-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <p className="memories-intro">
          Some of our favorite memories
          <br />
          will be the ones we never see.
          <br />
          If you captured a smile, a laugh,
          <br />
          a dance, or a quiet moment,
          <br />
          we&apos;d love to receive it.
        </p>

        <div className="memories-divider memories-divider-tight" aria-hidden="true">
          <span />
          <i>❖</i>
          <span />
        </div>

        <div className="memories-grid">
          {qrItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="memories-person-card"
            >
              <div className="memories-person-ornament">❦</div>
              <h4 className="memories-person-name">{item.title}</h4>

              <div className="memories-person-divider" aria-hidden="true">
                <span />
                <i>❖</i>
                <span />
              </div>

              <p className="memories-person-subtitle">• {item.subtitle} •</p>

              <div className="memories-qr-wrap">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=0&data=${encodeURIComponent(item.href)}`}
                  alt={`${item.title} WhatsApp QR code`}
                  width={360}
                  height={360}
                  unoptimized
                  className="memories-qr"
                />
                <span className="memories-qr-wa" aria-hidden="true">
                  <MessageCircle size={26} strokeWidth={2} />
                </span>
              </div>

              <span className="memories-send-btn">
                <MessageCircle size={20} strokeWidth={2} />
                {item.cta}
              </span>
            </a>
          ))}
        </div>

        <div className="memories-divider memories-divider-tight" aria-hidden="true">
          <span />
          <i>❖</i>
          <span />
        </div>

        <p className="memories-note">
          Every photo tells a story.
          <br />
          Thank you for being part of ours.
        </p>

        <p className="memories-love">♥</p>
        <div className="memories-ornament-bottom">❦</div>
        <div className="memories-arrow" aria-hidden="true">
          <ArrowDown size={28} strokeWidth={1.5} />
        </div>
    </LuxurySectionShell>
  );
}
