import { useSanityData } from "./useSanityData";
import { TRANSFORMATIONS_QUERY } from "../queries";

export const useTransformations = () =>
  useSanityData(TRANSFORMATIONS_QUERY, {}, []);
