/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
        port: "",
        pathname: "/get/*",
      },
      {
        protocol: "https",
        port: "",
        hostname: "cataas.com",
        pathname: "/cat/*",
      },
    ],
  },
};

export default nextConfig;
