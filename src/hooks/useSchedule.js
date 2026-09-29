import { useSanityData } from "./useSanityData";
import { SCHEDULE_QUERY } from "../queries";

export const useSchedule = () => useSanityData(SCHEDULE_QUERY, {}, []);
