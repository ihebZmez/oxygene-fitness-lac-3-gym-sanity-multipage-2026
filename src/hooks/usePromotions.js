import { useSanityData } from "./useSanityData";
import { PROMOTIONS_QUERY } from "../queries";

export const usePromotions = () => useSanityData(PROMOTIONS_QUERY, {}, []);
