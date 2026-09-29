import { useSanityData } from "./useSanityData";
import { NEWS_QUERY } from "../queries";

export const useNews = () => useSanityData(NEWS_QUERY, {}, []);
