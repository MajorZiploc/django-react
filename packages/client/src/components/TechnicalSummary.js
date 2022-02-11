import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DataContext from '../context/DataContext';

import frontEndBrushLight from '../images/front_end_brush_light.png';
import backEndCogLight from '../images/back_end_cog_light.png';
import testingCogClipboardLight from '../images/testing_cog_clipboard_light.png';
import headlessPumpkinLight from '../images/headless_pumpkin_light.png';
import codeBoxLight from '../images/code_box_light.png';
import devOpsCogsLight from '../images/devops_cogs_light.png';
import computerHammerWrenchLight from '../images/computer_hammer_wrench_light.png';
import operatingSystemsLight from '../images/operating_systems_light.png';

import devIconDarkTransparent from '../images/developer_icon_dark_transparent.jpeg';

const getImage = item =>
  // prettier-ignore
  item.title.match(/(Frontend)/i) ? frontEndBrushLight
  : item.title.match(/(Backend)/i) ? backEndCogLight
  : item.title.match(/(Testing)/i) ? testingCogClipboardLight
  : item.title.match(/(Headless)/i) ? headlessPumpkinLight
  : item.title.match(/(DevOps)/i) ? devOpsCogsLight
  : item.title.match(/(Languages)/i) ? codeBoxLight
  : item.title.match(/(Operating Systems)/i) ? operatingSystemsLight
  : item.title.match(/(Tooling)/i) ? computerHammerWrenchLight
  : devIconDarkTransparent;

const useStyles = makeStyles(_theme => ({
  mainContainer: {
    background: '#233',
    height: '100%',
  },
  cardContainer: {
    maxWidth: 360,
    margin: '3rem auto',
  },
  heading: {
    color: 'tomato',
    padding: '3rem 0',
    textTransform: 'uppercase',
  },
}));

const OpenSourceProjects = () => {
  const classes = useStyles();
  const data = React.useContext(DataContext);
  const [resumeData, setResumeData] = React.useState();

  React.useEffect(() => {
    (async () => {
      setResumeData(await data.resumeData);
    })();
  });

  return resumeData ? (
    <Box component='div' className={classes.mainContainer}>
      <Typography variant='h4' align='center' className={classes.heading}>
        Technical Summary
      </Typography>
      <Grid container justify='center'>
        {resumeData.technicalSkills.items.map((item, i) => (
          <Grid item xs={12} sm={8} md={4} key={i}>
            <Card className={classes.cardContainer}>
              <CardMedia component='img' alt={item.title} height='300' image={getImage(item)} />
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {item.tools.map(t => t.tool).join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default OpenSourceProjects;
