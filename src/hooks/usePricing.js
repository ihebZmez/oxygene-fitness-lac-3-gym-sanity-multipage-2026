import { useSanityData } from "./useSanityData";
import { PRICING_QUERY } from "../queries";

export const usePricing = () => useSanityData(PRICING_QUERY, {}, []);
