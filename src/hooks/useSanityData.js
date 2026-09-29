import { useState, useEffect } from "react";
import { sanityClient } from "../lib/sanity";

export const useSanityData = (query, params = {}, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch(query, params);
        if (!cancelled) {
          setData(result ?? initialData);
          setError(null);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
};
