import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataContext from '../context/DataContext';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    background: '#233',
  },
  timeLine: {
    'position': 'relative',
    'padding': '1rem',
    'margin': 'o auto',
    '&:before': {
      content: "''",
      position: 'absolute',
      height: '100%',
      border: '1px solid tan',
      right: '40px',
      top: 0,
    },
    '&:after': {
      content: "''",
      display: 'table',
      clear: 'both',
    },
    [theme.breakpoints.up('md')]: {
      'padding': '2rem',
      '&:before': {
        left: 'calc(50% - 1px)',
        right: 'auto',
      },
    },
  },
  timeLineItem: {
    'padding': '1rem',
    'borderBottom': '2px solid tan',
    'position': 'relative',
    'margin': '1rem 3rem 1rem 1rem',
    'clear': 'both',
    '&:after': {
      content: "''",
      position: 'absolute',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      right: '-0.625rem',
      top: 'calc(50% - 5px)',
      borderStyle: 'solid',
      borderColor: 'tomato tomato transparent transparent',
      borderWidth: '0.625rem',
      transform: 'rotate(45deg)',
    },
    [theme.breakpoints.up('md')]: {
      'width': '44%',
      'margin': '1rem',
      '&:nth-of-type(2n)': {
        float: 'right',
        margin: '1rem',
        borderColor: 'tan',
      },
      '&:nth-of-type(2n):before': {
        right: 'auto',
        left: '-0.625rem',
        borderColor: 'transparent transparent tomato tomato',
      },
    },
  },
  timeLineYear: {
    'textAlign': 'center',
    'maxWidth': '15.375rem',
    'margin': '0 3rem 0 auto',
    'fontSize': '1.8rem',
    'color': '#fff',
    'background': 'tomato',
    'lineHeight': 1,
    'padding': '0.5rem 1rem',
    '&:before': {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      'textAlign': 'center',
      'margin': '0 auto',
      '&:nth-of-type(2n)': {
        float: 'none',
        margin: '0 auto',
      },
      '&:nth-of-type(2n):before': {
        display: 'none',
      },
    },
  },
  heading: {
    color: 'tomato',
    padding: '3rem 0',
    textTransform: 'uppercase',
  },
  subHeading: {
    color: '#fff',
    padding: 0,
    textTransform: 'uppercase',
  },
  body1: {
    color: 'tomato',
  },
  subtitle1: {
    color: 'tan',
  },
  subtitle2: {
    color: 'tomato',
  },
}));

function getDateRangeFormated(dateRange) {
  const beginYear = new Date(dateRange.beginDate).getFullYear();
  var endYear = new Date(dateRange.endDate)?.getFullYear() ?? dateRange.endDate;
  endYear = isNaN(endYear) ? dateRange.endDate : endYear;
  return [beginYear === endYear, !endYear].some(b => b) ? beginYear : `${beginYear} - ${endYear}`;
}

const WorkExpEntry = ({ job }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant='h2' className={`${classes.timeLineYear} ${classes.timeLineItem}`}>
        {job.workDateRanges.map(getDateRangeFormated).join(' and ')}
      </Typography>
      <Box component='div' className={classes.timeLineItem}>
        <Typography variant='h5' align='center' className={classes.subHeading}>
          {job.title}
        </Typography>
        <Typography variant='body1' align='center' className={classes.body1}>
          {job.company}
        </Typography>
        {job.points &&
          job.points.map((point, i) => (
            <Typography key={i} variant='subtitle1' align='center' className={classes.subtitle1}>
              {point.text}
            </Typography>
          ))}
        <Typography variant='subtitle2' align='center' className={classes.subtitle2}>
          {job.timeDedicated}
          {job?.teamSize ? ` - Team size of ${job.teamSize}` : ''} - {job.location}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

const WorkExp = () => {
  const classes = useStyles();
  const [resumeData, setResumeData] = React.useState();
  const data = React.useContext(DataContext);

  React.useEffect(() => {
    (async () => {
      setResumeData(await data.resumeData);
    })();
  }, [data.resumeData]);

  return (
    <Box component='header' className={classes.mainContainer}>
      <Typography variant='h4' align='center' className={classes.heading}>
        Working Experience
      </Typography>

      <Box component='div' className={classes.timeLine}>
        {resumeData && resumeData.workExperience.jobs.map((job, i) => <WorkExpEntry key={i} job={job} />)}
      </Box>
    </Box>
  );
};

export default WorkExp;
