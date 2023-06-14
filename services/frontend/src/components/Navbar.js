// @ts-check
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
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Home from '@mui/icons-material/Home';
import { makeStyles } from '@mui/styles';
// @ts-ignore
import avatar from '../avatar.jpg';

/**
 * @typedef {any} ResumeData
 * @typedef {any} MenuItem
 */

const useStyles = makeStyles(_theme => ({
  appbar: {
    background: '#222',
    margin: '0rem',
    position: 'fixed',
    zIndex: 100,
  },
  hamburger: {
    color: 'tomato',
  },
  title: {
    color: 'tan',
    paddingRight: '3.125rem',
  },
  codeWars: {
    color: 'tan',
    paddingLeft: '1rem',
  },
  generalLink: {
    color: 'tan',
    marginLeft: '0.938rem',
    fontSize: '0.875rem',
  },
  alink: {
    color: 'inherit',
  },
  menuSliderContainer: {
    width: '15.625rem',
    background: '#511',
    height: '100%',
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    width: '6.5rem',
    height: '6.5rem',
  },
  listItem: {
    'color': 'tan',
    '&:hover': {
      backgroundColor: '#631111',
    },
  },
  listItemActive: {
    backgroundColor: '#441111',
  },
}));

/** @type {string} */
const homeListPath = '/';

/** @type {MenuItem[]} */
const menuItems = [
  { listIcon: <Home />, listText: 'Home', listPath: '/' },
  { listIcon: <AssignmentIndIcon />, listText: 'Movies', listPath: '/movies' },
];

/** @type {() => string} */
const setInitActiveTab = () => {
  return (
    [...menuItems].reverse().find(menuItem => window.location.href.includes(menuItem.listPath))?.listPath ||
    homeListPath
  );
};

/**
 * @returns {React.ReactElement}
 */
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(setInitActiveTab());
  const classes = useStyles();

  const onLogout = () => {
    localStorage.clear();
  };

  const handleClickListItem = item => () => {
    setOpen(false);
    setActiveTab(item.listPath);
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component='div'>
      <Avatar className={classes.avatar} src={avatar} alt='Manyu Lakhotia' />
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.listPath}
            className={`${classes.listItem} ${item.listPath === activeTab ? classes.listItemActive : ''}`}
            onClick={handleClickListItem(item)}
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
