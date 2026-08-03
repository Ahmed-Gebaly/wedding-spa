const events = [
  {
    year: "2018",
    title: "A Serendipitous Meeting",
    text: "We met by chance at a friend's engagement dinner and talked until the lights were out.",
  },
  {
    year: "2020",
    title: "A Promise in Alexandria",
    text: "At sunrise by the sea, we promised to build a life filled with patience, joy, and purpose.",
  },
  {
    year: "2026",
    title: "The Yes",
    text: "A golden ring, a quiet rooftop, and a trembling yes that changed every tomorrow.",
  },
];

export default function Story() {
  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 sm:p-10">
        <h3 className="text-center text-4xl sm:text-5xl">Our Love Story</h3>
        <div className="mt-8 space-y-5">
          {events.map((event) => (
            <article key={event.year} className="rounded-2xl border border-[var(--border-soft)] bg-white/70 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--wine)]">{event.year}</p>
              <h4 className="mt-2 text-2xl">{event.title}</h4>
              <p className="mt-2 text-[var(--ink-soft)]">{event.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
