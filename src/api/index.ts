import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';


import { API_HOST } from '@/constants/requests';

type ErrorDetailsType = {
  source: Object;
  detail: string;
}

type ErrorServerResponse = {
  errors: ErrorDetailsType[];
};

interface AxiosRequestInterface<TParams = any> extends AxiosRequestConfig<any> {
  params?: TParams;
}

axios.defaults.baseURL = API_HOST;

const checkError = (e: AxiosError<ErrorServerResponse> | Error): never => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<ErrorServerResponse>;

    const { response } = error;

    if (response) {
      throw new Error(response.data.errors[0].detail);
    }
  }

  const error = e as Error;
  throw new Error(error.message);
};

export const get = async <TResponse = any, TParams = any>(
  url: string,
  config?: AxiosRequestInterface<TParams>,
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await axios.get<TResponse>(url, config);

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data as TResponse;
};

export const post = async <TResponse = any, TRequest = any, TParams = any>(
  url: string,
  requestBody: TRequest,
  config?: AxiosRequestInterface<TParams>,
): Promise<TResponse> => {
  let data: TResponse | null = null;

  try {
    const response = await axios.post<TResponse, AxiosResponse<TResponse>, TRequest>(
      url,
      requestBody,
      config,
    );

    data = response.data;
  } catch (e: any) {
    checkError(e);
  }

  return data as TResponse;
};

export { axios as api };