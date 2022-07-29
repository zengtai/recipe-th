/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`i0.wp.com`, `i1.wp.com`],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        path: false,
        process: false,
      };
    }
    return config;
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220729"; //
  },
  // basePath: "/webs/recipe/public/th",
  trailingSlash: true,
};

module.exports = nextConfig;
