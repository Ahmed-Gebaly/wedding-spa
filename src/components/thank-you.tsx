import { ArrowDown } from "lucide-react";

export default function ThankYou() {
  return (
    <section className="content-shell thank-you-shell py-10 pb-20 sm:py-16 sm:pb-28">
      <div className="thank-you-luxury-card p-6 text-center sm:p-10">
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
      </div>
    </section>
  );
}
