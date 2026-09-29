import { useSanityData } from "./useSanityData";
import { SITE_SETTINGS_QUERY } from "../queries";

export const useSiteSettings = () => useSanityData(SITE_SETTINGS_QUERY);
