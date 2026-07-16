import Container from "@/app/_components/container";
import { GITHUB_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 ">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="font-mono text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <span className="text-brand-dark ">&gt;_</span>{" "}
            {SITE_NAME.toLowerCase()}
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <p className="text-lg text-center lg:text-left mb-6 lg:mb-0 lg:pr-8 lg:w-1/2 text-neutral-600 ">
              {SITE_TAGLINE}
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-3 bg-brand hover:bg-brand-dark border border-brand text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
