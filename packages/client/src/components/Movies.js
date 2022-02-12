import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataContext from '../context/DataContext';

const useStyles = makeStyles(_theme => ({
  title: {
    color: 'tan',
    paddingRight: 50,
  },
}));

const Movies = () => {
  const [auth, setAuth] = React.useState();
  const [movies, setMovies] = React.useState();
  const data = React.useContext(DataContext);

  React.useEffect(() => {
    (async () => {
      setAuth(await data.auth());
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (auth) {
        console.log(auth.access);
        setMovies(await data.getMovies(auth.access));
      }
    })();
  }, [auth]);

  const classes = useStyles();

  return (
    <React.Fragment>
      {movies &&
        movies.map(m => (
          <p className={classes.title} key={m.id}>
            {m.title}
          </p>
        ))}
    </React.Fragment>
  );
};

export default Movies;
