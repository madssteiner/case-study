import { AxiosProvider } from './application/axios';
import { UserProvider } from './application/users';
import { MainPage } from './presentation/main';
import { Environment } from './utils/environment';

export const App = () => {
  return (
    <AxiosProvider options={{ baseURL: Environment.BASE_URL }}>
      <UserProvider>
        <MainPage />
      </UserProvider>
    </AxiosProvider>
  );
};
