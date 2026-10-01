export const isPackage1SiteVitrine = () =>
  String(import.meta.env.VITE_PACKAGE_1_SITE_VITRINE ?? "false")
    .trim()
    .toLowerCase() === "true";

export default isPackage1SiteVitrine;
