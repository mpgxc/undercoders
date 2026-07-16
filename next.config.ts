import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cover images and the default OG image are authored as trusted, in-repo SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
