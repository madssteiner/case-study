import {
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { FunctionComponent } from 'react';
import { useUsers } from '../application/users';
import { LanguageSelector } from '../components/LanguageSelector';
import { UserListItem } from '../components/UserListItem';
import { useTranslation } from '../translation';

const MINIMUM_LETTERS = 3;

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
  },
}));

export const MainPage: FunctionComponent = () => {
  const { translate } = useTranslation();
  const classes = useStyles();
  const { users, fetchUsers, isLoading } = useUsers();

  const [query, setQuery] = useState<string>('');

  const handleOnTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const isSearchDisabled = useMemo(() => {
    return query.length < MINIMUM_LETTERS;
  }, [query]);

  const handleOnClick = useCallback(() => {
    fetchUsers({ name: query });
  }, [fetchUsers, query]);

  return (
    <main className={classes.main}>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography style={{ margin: '12px' }}>{translate('APP_NAME')}</Typography>
            </Grid>
            <Grid item>
              <LanguageSelector />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Container maxWidth="md">
            <Grid container alignItems="center" style={{ gap: '18px' }}>
              <Grid item sm>
                <TextField
                  label={translate('INPUT_LABEL_NAME')}
                  fullWidth
                  value={query}
                  onChange={handleOnTextChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  style={{ height: '56px', minWidth: '120px' }}
                  disabled={isSearchDisabled}
                  onClick={handleOnClick}
                  variant="outlined"
                >
                  {translate('BUTTON_LABEL_SEARCH')}
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: '12px' }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <List>
                  {users?.map((user) => (
                    <UserListItem key={user.id} user={user} />
                  ))}
                </List>
              )}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </main>
  );
};
