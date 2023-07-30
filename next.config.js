/** @type {import('next').NextConfig} */
const nextConfig = {
//module.exports = {
  //reactStrictMode: true,
  images: {
    formats: ['image/avif','image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "www.thespruce.com",
        port: "",
        pathname: "/image/upload/**",
      }
    ],
  },
}

module.exports = nextConfig
