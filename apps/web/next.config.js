/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "liveblocks.io",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    outputFileTracingRoot:
      process.env.NODE_ENV === "production" ? undefined : "..",
  },
};
