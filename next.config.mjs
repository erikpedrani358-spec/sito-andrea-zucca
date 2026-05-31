/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets only for now; formats tuned for performance.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
