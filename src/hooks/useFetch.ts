import axiosInstance from "@/lib/client/axios"
import { TypesOfAxoisResponse } from "@/types/axoisInstance.types";
import { useEffect, useState } from "react"

const useFetch = function (url: string, option = {}, dependencies: any[] = []) {
    const [data, setData] = useState<TypesOfAxoisResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [refetchIndex, setRefetchIndex] = useState<number>(0);
    const [error, setError] = useState<TypesOfAxoisResponse | null>(null);


    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(url, { ...option });
                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (error: any) {
                if (isMounted) {
                    console.error("useFetch error", error);
                    setData(null);
                    setError(error.response?.data || error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        if (url) fetchData();

        return () => {
            isMounted = false;
        };
    }, [...dependencies, refetchIndex]);



    function refetch() {
        setRefetchIndex(pre => pre + 1)
    }


    return { data, loading, error, refetch }
}

export default useFetch;