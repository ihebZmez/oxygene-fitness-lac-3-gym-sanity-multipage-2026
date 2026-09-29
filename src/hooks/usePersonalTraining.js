import { useSanityData } from "./useSanityData";
import { PERSONAL_TRAINING_QUERY } from "../queries";

export const usePersonalTraining = () => useSanityData(PERSONAL_TRAINING_QUERY);
