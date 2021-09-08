import { Avatar, Grid, ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import { SupervisedUserCircleOutlined } from '@material-ui/icons';
import { FC } from 'react';
import { User } from '../domain/user';
import { useTranslation } from '../translation';

type UserListItemProps = {
  user: User;
};

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const { translateDynamic } = useTranslation();

  return (
    <ListItem
      style={{ margin: '12px 0px', padding: '16px', border: '1px solid #CCC', borderRadius: '4px' }}
    >
      <ListItemAvatar>
        <Avatar>
          <SupervisedUserCircleOutlined></SupervisedUserCircleOutlined>
        </Avatar>
      </ListItemAvatar>
      <Grid container direction="row">
        <Grid item>
          <Typography style={{ minWidth: '200px', margin: '8px' }}>{user.name}</Typography>
        </Grid>
        <Grid item>
          <Typography style={{ minWidth: '340px', margin: '8px' }}>{user.email}</Typography>
        </Grid>
        <Grid item>
          <Typography style={{ minWidth: '100px', margin: '8px' }}>
            {translateDynamic(`USER_INFO_GENDER_${user.gender.toUpperCase()}`)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ minWidth: '100px', margin: '8px' }}>
            {translateDynamic(`USER_INFO_STATUS_${user.status.toUpperCase()}`)}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};
