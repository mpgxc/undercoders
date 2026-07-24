import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ title: SITE_NAME, subtitle: SITE_DESCRIPTION });
}
