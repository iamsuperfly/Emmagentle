import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", ".local/**", ".cache/**", "artifacts/**", "lib/**", "scripts/**"],
  },
];

export default config;