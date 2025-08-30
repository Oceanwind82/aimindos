/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    allowedDevOrigins: ["http://localhost:3000","http://192.168.12.122:3000"],
  },
};
export default nextConfig;


