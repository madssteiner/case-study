import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { FC, useMemo } from 'react';
import { createContext } from 'react';

interface AxiosContext {
  axios: AxiosInstance;
}

export interface AxiosContextProps {
  options?: AxiosRequestConfig;
}

const Context = createContext<AxiosContext>(null as any);

export const useAxios = () => useContext(Context);

export const AxiosProvider: FC<AxiosContextProps> = ({ children, options }) => {
  const http = useMemo(
    () =>
      axios.create({
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        ...options,
      }),
    [options],
  );

  const value: AxiosContext = {
    axios: http,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
