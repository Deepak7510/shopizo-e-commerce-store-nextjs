import axiosInstance from "@/lib/client/axios";
import { TypeOfAxoisResponse } from "@/types/axoisInstance.types";
import { useEffect, useState, useCallback } from "react";

const useFetch = (url: string, options = {}, dependencies: any[] = []) => {
  const [data, setData] = useState<TypeOfAxoisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refetchIndex, setRefetchIndex] = useState<number>(0);
  const [error, setError] = useState<TypeOfAxoisResponse | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url, options);
      setData(response.data);
      setError(null);
    } catch (error: any) {
      console.error("useFetch error", error);
      setData(null);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    let isMounted = true;
    if (url && isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchData, refetchIndex, ...dependencies]);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
};

export default useFetch;
