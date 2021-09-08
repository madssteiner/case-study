import { useCallback } from 'react';
import { createContext, FC, useContext, useState } from 'react';
import { User } from '../domain/user';
import { IResponse } from '../service/types';
import { useAxios } from './axios';

const HTTP_STATUS = {
  OK: 200,
};

interface UserContext {
  users: User[] | undefined;
  fetchUsers: (params?: { name?: string; page?: number }) => Promise<void> | void;
  isLoading: boolean;
}

interface UserProviderProps {}

const Context = createContext<UserContext>(null as any);

export const useUsers = () => useContext(Context);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { axios } = useAxios();

  const [users, setUsers] = useState<User[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(
    async (params?: { name?: string; page?: number }) => {
      setIsLoading(true);

      try {
        const response = await axios.get<IResponse<User[]>>('/users', { params });

        if (response.status === HTTP_STATUS.OK) {
          setUsers(response.data.data);
        }
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      setIsLoading(false);
    },
    [axios],
  );

  const value: UserContext = {
    users,
    fetchUsers,
    isLoading,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
