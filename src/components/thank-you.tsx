import { ArrowDown } from "lucide-react";
import LuxurySectionShell from "@/components/ui/luxury-section-shell";

export default function ThankYou() {
  return (
    <LuxurySectionShell sectionClassName="thank-you-shell pb-20 sm:pb-28" cardClassName="thank-you-luxury-card">
        <div className="thank-you-ornament-top">❦</div>

        <p className="thank-you-eyebrow">Thank You</p>
        <h3 className="thank-you-title">
          We Cannot Wait
          <br />
          to Celebrate With You
        </h3>

        <div className="thank-you-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <p className="thank-you-note">
          Your presence is the greatest gift.
          <br />
          Thank you for being part of our journey
          <br />
          and this joyful day.
        </p>

        <p className="thank-you-love">♥</p>
        <div className="thank-you-ornament-bottom">❦</div>
        <div className="thank-you-arrow" aria-hidden="true">
          <ArrowDown size={28} strokeWidth={1.5} />
        </div>
    </LuxurySectionShell>
  );
}
