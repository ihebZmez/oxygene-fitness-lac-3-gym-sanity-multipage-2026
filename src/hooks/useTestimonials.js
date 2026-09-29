import { useSanityData } from "./useSanityData";
import { TESTIMONIALS_QUERY } from "../queries";

export const useTestimonials = () => useSanityData(TESTIMONIALS_QUERY, {}, []);
