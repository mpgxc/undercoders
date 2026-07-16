import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="font-mono text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        <span className="text-brand-dark ">&gt;_</span>{" "}
        {SITE_NAME.toLowerCase()}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {SITE_TAGLINE} Textos sobre desenvolvimento de software, arquitetura de
        sistemas, padrões de projeto e{" "}
        <span className="text-brand-dark font-medium">
          inteligência artificial
        </span>
        .
      </h4>
    </section>
  );
}
