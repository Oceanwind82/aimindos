const os = require("os");

function getLanHosts() {
  const nets = os.networkInterfaces();
  const hosts = new Set(["localhost"]); // always allow localhost
  for (const ifaces of Object.values(nets)) {
    for (const ni of ifaces || []) {
      if (ni.family === "IPv4" && !ni.internal) hosts.add(ni.address);
    }
  }
  return Array.from(hosts);
}

/** @type {import('next').NextConfig} */
module.exports = {
  // 👇 this must be at the root, not inside `experimental`
  allowedDevOrigins: [
    ...getLanHosts(),        // e.g. "192.168.12.122"
    // or add explicit hosts if you prefer:
    // "192.168.12.122",
    // "imac.local",
  ],
  eslint: { ignoreDuringBuilds: true },
};
