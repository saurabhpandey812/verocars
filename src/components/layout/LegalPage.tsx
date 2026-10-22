export type LegalSection = { h: string; p: string[] };
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <article className="wrap max-w-3xl py-12">
      <h1 className="display text-4xl sm:text-5xl md:text-6xl">{title}</h1>
      <p className="mt-4 text-mute">{intro}</p>
      <p className="mt-2 text-sm text-mute">Last updated: [date]. Items in [brackets] must be completed by the business and reviewed by a legal professional.</p>
      {sections.map((s) => (
        <section key={s.h} className="mt-10"><h2 className="display text-3xl">{s.h}</h2>{s.p.map((t) => <p key={t} className="mt-3 text-mute">{t}</p>)}</section>
      ))}
    </article>
  );
}
