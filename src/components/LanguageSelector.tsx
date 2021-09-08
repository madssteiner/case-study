/* eslint-disable react/jsx-no-bind */
import { MenuItem, Select, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { Languages, Locale, useTranslation } from '../translation';
import { flags } from '../utils/icons';

const CountryFlag: FC<{ country: string }> = ({ country }) => {
  return (
    <img
      src={flags[country as keyof typeof flags]}
      style={{ height: '32px', width: '32px', borderRadius: '50%' }}
    />
  );
};

export const LanguageSelector: FC = () => {
  const { translate, changeLanguage } = useTranslation();

  const [locale, setLocale] = useState<Locale>('en');

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const language = event.target.value as Locale;

      setLocale(language);

      changeLanguage(language);
    },
    [changeLanguage],
  );

  return (
    <Select
      style={{ margin: '12px', border: 'none' }}
      value={locale}
      onChange={handleOnChange}
      renderValue={(val) => <CountryFlag country={val as string} />}
      variant="outlined"
    >
      {Object.keys(Languages).map((key) => (
        <MenuItem
          key={key}
          value={key}
          style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}
        >
          <CountryFlag country={key as string} />
          <Typography>{translate(Languages[key as keyof typeof Languages])}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};
