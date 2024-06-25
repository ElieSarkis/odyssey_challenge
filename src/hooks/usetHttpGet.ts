import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

//this is a reusable way for GET requests, allowing us to use it by selecting the appropriate URL
const useAxiosGet = <T>(
  axiosConfig: AxiosRequestConfig,
  cacheTime: number = 60000 // caching the data for 1 minute to avoid unnecessary api calls
): UseQueryResult<T, AxiosError> => {
  const queryResult = useQuery<T, AxiosError>(
    axiosConfig.url || '',
    async () => {
      const response = await axios.request<T>(axiosConfig);
      return response.data;
    },
    {
      staleTime: cacheTime,
      cacheTime: cacheTime,
    }
  );

  return queryResult;
};

export default useAxiosGet;
