import { useSanityData } from "./useSanityData";
import { ACTIVITIES_QUERY } from "../queries";

export const useActivities = () => useSanityData(ACTIVITIES_QUERY, {}, []);
