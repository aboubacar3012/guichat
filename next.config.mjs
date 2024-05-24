/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  images: {
    domains: ["api.dicebear.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
