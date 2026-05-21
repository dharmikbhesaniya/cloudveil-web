import type { NextConfig } from "next";

const AGENT_LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llms-full.txt>; rel="service-doc"; type="text/plain"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Link", value: AGENT_LINK_HEADERS },
        ],
      },
    ];
  },
};

export default nextConfig;
