import axios from "axios";

import { API_BASE_URL, API_KEY } from "@env";

interface RequestParams {
  base_currency: string;
}

export const useApiFetch = () => {
  const httpClient = axios.create({
    baseURL: API_BASE_URL,
  });

  const getRequest = async (endPoint: string, params?: RequestParams) => {
    try {
      return await httpClient.get(endPoint, {
        params: {
          ...params,
          apikey: API_KEY,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { getRequest };
};
