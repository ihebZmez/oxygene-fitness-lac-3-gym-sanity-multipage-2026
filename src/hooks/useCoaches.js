import { useSanityData } from "./useSanityData";
import { COACHES_QUERY } from "../queries";

export const useCoaches = () => useSanityData(COACHES_QUERY, {}, []);
