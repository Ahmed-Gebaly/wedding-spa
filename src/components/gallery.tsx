import Image from "next/image";

const photos = [
  "/images/photo-01.svg",
  "/images/photo-02.svg",
  "/images/photo-03.svg",
  "/images/photo-04.svg",
];

export default function Gallery() {
  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 sm:p-10">
        <h3 className="text-center text-4xl sm:text-5xl">Elegant Gallery</h3>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {photos.map((src, index) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={src}
                alt={`Wedding memory ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
