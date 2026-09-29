import { useSanityData } from "./useSanityData";
import { CORPORATE_QUERY } from "../queries";

export const useCorporate = () => useSanityData(CORPORATE_QUERY);
