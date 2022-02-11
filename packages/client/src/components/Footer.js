import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Email from '@material-ui/icons/Email';
import GitHub from '@material-ui/icons/GitHub';
import DataContext from '../context/DataContext';

const useStyles = makeStyles({
  bottomNavContainer: {
    background: '#222',
  },
  root: {
    '& .MuiSvgIcon-root': {
      'fill': 'tan',
      '&:hover': {
        fill: 'tomato',
        fontSize: '1.8rem',
      },
    },
  },
});

const Footer = () => {
  const classes = useStyles();
  const [resumeData, setResumeData] = React.useState();
  const data = React.useContext(DataContext);

  React.useEffect(() => {
    (async () => {
      setResumeData(await data.resumeData);
    })();
  }, [data.resumeData]);

  return resumeData ? (
    <BottomNavigation className={classes.bottomNavContainer}>
      <BottomNavigationAction icon={<LinkedIn />} className={classes.root} href={resumeData.header.linkedIn} />
      <BottomNavigationAction icon={<Email />} className={classes.root} href={`mailto:${resumeData.header.email}`} />
      <BottomNavigationAction icon={<GitHub />} className={classes.root} href={resumeData.header.github} />
    </BottomNavigation>
  ) : (
    <></>
  );
};
export default Footer;
