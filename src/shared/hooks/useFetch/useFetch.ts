import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, DoFetch } from './type';

const useFetch = <T>(url: string): [ApiResponse<T>, DoFetch] => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<RequestInit>({});

  const doFetch: DoFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
    setResponse(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl + url, options);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data: T = await res.json();
        setResponse(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading, url, options]);

  return [{ isLoading, response, error }, doFetch];
};

export default useFetch;
