import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ghemarback.cementech.cloud/**"),
    ],
  },
};

export default withNextIntl(nextConfig);