type Secrets = {
  BASE_URL: string | undefined;
};

const secrets: Secrets = {
  BASE_URL: '',
};

type Secret = keyof Secrets;

export const Environment = (Object.keys(secrets) as Array<Secret>).reduce(
  (acc, cur) => ({ ...acc, [cur]: process.env[`REACT_APP_${cur}`] }),
  {} as Secrets,
);
