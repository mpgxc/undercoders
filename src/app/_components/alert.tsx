import Container from "@/app/_components/container";
import { GITHUB_URL } from "@/lib/constants";
import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn("border-b ", {
        "bg-neutral-800 border-neutral-800 text-white": preview,
        "bg-neutral-50 border-neutral-200": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              Esta página é uma pré-visualização.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-brand-light duration-200 transition-colors"
              >
                Clique aqui
              </a>{" "}
              para sair do modo de preview.
            </>
          ) : (
            <>
              O código-fonte deste blog está{" "}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-dark duration-200 transition-colors"
              >
                disponível no GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
