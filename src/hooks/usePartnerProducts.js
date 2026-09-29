import { useSanityData } from "./useSanityData";
import { PARTNER_PRODUCTS_QUERY } from "../queries";

export const usePartnerProducts = () =>
  useSanityData(PARTNER_PRODUCTS_QUERY, {}, []);
