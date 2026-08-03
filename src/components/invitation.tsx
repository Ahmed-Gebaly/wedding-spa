import { weddingContent } from "@/content/wedding";

export default function Invitation() {
  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-7 text-center sm:p-12">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--wine)]">Invitation Card</p>
        <h3 className="mt-4 text-4xl sm:text-5xl">You Are Cordially Invited</h3>
        <p className="mx-auto mt-5 max-w-2xl text-[var(--ink-soft)]">
          With grateful hearts, {weddingContent.coupleNames} invite you to a {weddingContent.tone.toLowerCase()} celebration,
          where we begin this chapter surrounded by family, friendship, and blessings.
        </p>
      </div>
    </section>
  );
}
