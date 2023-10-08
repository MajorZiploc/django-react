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
// @ts-ignore
import avatar from '../avatar.jpg';
import '../styles/Navbar.scss';
// import { useDispatch } from 'react-redux';
// import { incrementByAmount, incrementByAmountAsync } from '../redux/reducers/counterReducer';

/**
 * @typedef {any} ResumeData
 * @typedef {any} MenuItem
 */

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
  // const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
  };

  const handleClickListItem = item => () => {
    setOpen(false);
    setActiveTab(item.listPath);
  };

  const sideList = () => (
    <Box className='menuSliderContainer' component='div'>
      <Avatar className='navBarAvatar' src={avatar} alt='Manyu Lakhotia' />
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.listPath}
            className={`navBarListItem ${item.listPath === activeTab ? 'navBarListItemActive' : ''}`}
            onClick={handleClickListItem(item)}
            component={Link}
            to={item.listPath}
          >
            <ListItemIcon className='navBarListItem'>{item.listIcon}</ListItemIcon>
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
        <AppBar position='static' className='appbar'>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon className='hamburger' />
            </IconButton>
            <Typography variant='h5' className='navBarTitle'>
              Movies
            </Typography>
            <Link
              id='logout'
              className='navBarTitle'
              to='/login'
              onClick={() => {
                onLogout();
                // dispatch(incrementByAmount(10));
                // (async () => {
                //   await incrementByAmountAsync(5)(dispatch);
                // })();
              }}
            >
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
