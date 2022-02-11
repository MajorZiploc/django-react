import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Home from '@material-ui/icons/Home';
import Apps from '@material-ui/icons/Apps';
import Build from '@material-ui/icons/Build';
// import ContactMail from '@material-ui/icons/ContactMail';
import { makeStyles } from '@material-ui/core/styles';
import avatar from '../avatar.jpg';
import DataContext from '../context/DataContext';

import Footer from '../components/Footer';

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
  codeWars: {
    color: 'tan',
  },
  downloadResumeLink: {
    color: 'tan',
    marginLeft: 15,
  },
  alink: {
    color: 'inherit',
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
  { listIcon: <AssignmentInd />, listText: 'Work Experience', listPath: '/workexp' },
  { listIcon: <Apps />, listText: 'Open Source Projects', listPath: '/opensource' },
  { listIcon: <Build />, listText: 'Technical Summary', listPath: '/techsummary' },
  // { listIcon: <ContactMail />, listText: 'Contact', listPath: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [resumeData, setResumeData] = React.useState();
  const [auth, setAuth] = React.useState();
  const [movies, setMovies] = React.useState();
  const data = React.useContext(DataContext);

  React.useEffect(() => {
    (async () => {
      setResumeData(await data.resumeData);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      setAuth(await data.auth);
    })();
  }, [auth]);

  React.useEffect(() => {
    (async () => {
      if (auth) {
        console.log(auth.access);
        setMovies(await data.getMovies(auth.access));
      }
    })();
  }, [auth]);

  const classes = useStyles();

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
      {resumeData && (
        <Button variant='h5' className={classes.codeWars}>
          <a className={classes.alink} href={resumeData.header.codeWars}>
            Find me on Code Wars
          </a>
        </Button>
      )}
      <Divider />
      <br />
      <Link to='/resume.pdf' target='_blank' className={`${classes.downloadResumeLink}`} download>
        DOWNLOAD RESUME AS PDF
      </Link>
      <br />
      <br />
      <Link to='/resume_data.json' target='_blank' className={`${classes.downloadResumeLink}`} download>
        DOWNLOAD RESUME AS JSON
      </Link>
      <Divider />
    </Box>
  );

  return (
    <React.Fragment>
      <Box component='nav'>
        <AppBar position='static' className={classes.appbar}>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon className={classes.hamburger} />
            </IconButton>
            <Typography variant='h5' className={classes.title}>
              Portfolio
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor='left' onClose={() => setOpen(false)}>
        {sideList()}
        <Footer />
      </Drawer>
      {movies && movies.map(m => <p key={m.id}>{m.title}</p>)}
    </React.Fragment>
  );
};

export default Navbar;
