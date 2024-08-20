import axios from 'axios';
import { AxiosError } from 'node_modules/axios/index.ts';

interface urlCollection {
  [key: string]: string | undefined;
}

const BackendURL: urlCollection = {
  dev: 'http://127.0.0.1:5000/api/v1/',
  prod: 'https://api.deploy-io.dinesh-pr.online/api/v1/',
};

const BASE_URL = import.meta.env.VITE_ENV
  ? BackendURL[import.meta.env.VITE_ENV]
  : BackendURL['dev'];

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

const SetHeader = (key: string, value: string) => {
  instance.defaults.headers.common[key] = value;
};

const RemoveHeader = (key: string) => {
  delete instance.defaults.headers.common[key];
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const Request = async (
  method: RequestMethod,
  url: string,
  body?: unknown,
  params?: unknown,
) => {
  const requestOptions = {
    method: method,
    url: url,
    data: body,
    params: params,
  };

  const token = localStorage.getItem('tocopass');
  if (token) {
    SetHeader('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await instance.request(requestOptions);
    return response;
  } catch (error) {
    if (
      (error as AxiosError).response &&
      (error as AxiosError).response!.status === 498
    ) {
      localStorage.removeItem('tocopass');
      window.location.href = '/login';
    }

    throw error;
  }
};

export { SetHeader, RemoveHeader, Request };
