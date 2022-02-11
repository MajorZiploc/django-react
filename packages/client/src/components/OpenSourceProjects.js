import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataContext from '../context/DataContext';

import fsharpIconDark from '../images/fsharp_icon_dark.png';
import typescriptIconBlue from '../images/typescript_icon_blue.png';
import javascriptIconYellow from '../images/js_icon_yellow.png';
import powershellIconBlue from '../images/powershell_icon_blue.png';
import shellIconDarkTransparent from '../images/shell_icon_dark_transparent.png';
import pythonIconLight from '../images/python_icon_light.webp';
import devIconDarkTransparent from '../images/developer_icon_dark_transparent.jpeg';

const getImage = project =>
  // prettier-ignore
  project.mainLanguage.match(/(f#|fsharp)/i) ? fsharpIconDark
  : project.mainLanguage.match(/(\bts\b|typescript)/i) ? typescriptIconBlue
  : project.mainLanguage.match(/(\bjs\b|javascript)/i) ? javascriptIconYellow
  : project.mainLanguage.match(/(\bps\b|powershell)/i) ? powershellIconBlue
  : project.mainLanguage.match(/(\bpy\b|python)/i) ? pythonIconLight
  : project.mainLanguage.match(/(\bsh\b|shell)/i) ? shellIconDarkTransparent
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
        Open Source Projects
      </Typography>
      <Grid container justify='center'>
        {resumeData.openSourceProjects.items.map((project, i) => (
          <Grid item xs={12} sm={8} md={4} key={i}>
            <Card className={classes.cardContainer}>
              <CardActionArea href={project.codeLink}>
                <CardMedia component='img' alt={project.title} height='300' image={getImage(project)} />
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {project.description}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {project.availableOn ? `Available on: ${project.availableOn}` : ''}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Notable tooling: {[project.mainLanguage].concat(project.notableTooling.map(t => t.tool)).join(', ')}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {project.roles ? `Roles: ${project.roles.map(r => r.role).join(', ')}` : ''}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size='small' color='primary' href={project.codeLink}>
                  View Code
                </Button>
                {project.link && (
                  <Button size='small' color='primary' href={project.link}>
                    More
                  </Button>
                )}
              </CardActions>
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
