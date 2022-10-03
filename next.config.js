/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    NEXT_PUBLIC_URL: "http://localhost:8000/api/v1/",
  },
};
