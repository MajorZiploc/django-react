import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Home from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import avatar from '../avatar.jpg';

const useStyles = makeStyles(theme => ({
  appbar: {
    background: '#222',
    margin: 0,
  },
  hamburger: {
    color: 'tomato',
  },
  title: {
    color: 'tan',
    paddingRight: 50,
  },
  menuSliderContainer: {
    width: 250,
    background: '#511',
    height: '100%',
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  listItem: {
    color: 'tan',
  },
}));

const menuItems = [
  { listIcon: <Home />, listText: 'Home', listPath: '/' },
  { listIcon: <AssignmentIndIcon />, listText: 'Movies', listPath: '/movies' },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const onLogout = () => {
    localStorage.clear();
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component='div'>
      <Avatar className={classes.avatar} src={avatar} alt='Manyu Lakhotia' />
      <Divider />
      <List>
        {menuItems.map((item, i) => (
          <ListItem
            button
            key={i}
            className={classes.listItem}
            onClick={() => setOpen(false)}
            component={Link}
            to={item.listPath}
          >
            <ListItemIcon className={classes.listItem}>{item.listIcon}</ListItemIcon>
            <ListItemText primary={item.listText} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <React.Fragment>
      <Box component='nav' id='nav'>
        <AppBar position='static' className={classes.appbar}>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon className={classes.hamburger} />
            </IconButton>
            <Typography variant='h5' className={classes.title}>
              Movies
            </Typography>
            <Link id='logout' className={classes.title} to='/login' onClick={() => onLogout()}>
              Logout
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor='left' onClose={() => setOpen(false)}>
        {sideList()}
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
