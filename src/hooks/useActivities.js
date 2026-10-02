import { useSanityData } from "./useSanityData";
import { ACTIVITIES_QUERY } from "../queries";
import { activitiesItems } from "../data/activities";

export const useActivities = () =>
  useSanityData(ACTIVITIES_QUERY, {}, activitiesItems);
