import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/constants";

/** Dimensões e tipo padrão de uma imagem Open Graph (link preview). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgInput = {
  title: string;
  tags?: string[];
  subtitle?: string;
};

/**
 * Renderiza um cartão de compartilhamento (PNG 1200×630) on-brand do Undercoders.
 * Usado pelas rotas de imagem `opengraph-image` — redes sociais exigem PNG/JPG
 * (não renderizam SVG), então gerar aqui garante o preview correto.
 */
export function renderOgImage({ title, tags = [], subtitle }: OgInput) {
  const footer = tags.length ? tags.join("   ·   ") : SITE_TAGLINE;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            fontWeight: 700,
            color: "#34d399",
          }}
        >
          &gt;_ undercoders
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#f8fafc",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 30,
                color: "#94a3b8",
                maxWidth: 960,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 120,
              height: 6,
              backgroundColor: "#10b981",
              marginRight: 24,
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: "#64748b" }}>
            {footer}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
