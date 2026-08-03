import Image from "next/image";

const qrItems = [
  {
    title: "Share a Voice Note",
    description: "Send us a blessing or memory as a WhatsApp audio message.",
    qr: "/qr/voice-note.svg",
    href: "https://wa.me/201000000000",
  },
  {
    title: "Share Your Photos",
    description: "Drop your photos from the night directly to our WhatsApp.",
    qr: "/qr/photo-drop.svg",
    href: "https://wa.me/201000000000",
  },
];

export default function Memories() {
  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 sm:p-10">
        <h3 className="text-center text-4xl sm:text-5xl">WhatsApp Memory QR Codes</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {qrItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--border-soft)] bg-white/80 p-5 transition hover:-translate-y-0.5"
            >
              <div className="mx-auto relative h-36 w-36 overflow-hidden rounded-xl border border-[var(--border-soft)]">
                <Image
                  src={item.qr}
                  alt={`${item.title} QR code`}
                  fill
                  sizes="144px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <h4 className="mt-4 text-center text-2xl">{item.title}</h4>
              <p className="mt-2 text-center text-sm text-[var(--ink-soft)]">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
