import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import DataContext from '../context/DataContext';
import { AddBoxTwoTone, EditTwoTone } from '@material-ui/icons';
import { jsonRefactor as jr } from 'json-test-utility';
import { Navigate } from 'react-router-dom';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectField: {
      margin: theme.spacing(1),
      minWidth: 130,
    },
    textField: {
      minWidth: 130,
      margin: theme.spacing(1),
    },
    button: {
      width: '5%',
      margin: theme.spacing(1),
    },
    table: {
      width: '66%',
      margin: theme.spacing(1),
    },
    tableHeader: {
      display: 'flex',
      width: '98%',
      margin: 'auto',
      justifyContent: 'space-between',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

const tableSort = (contents, sortColumn, sortDesc) => {
  if (contents.length === 0) return [];
  const key = sortColumn;
  const sortedContents = contents.sort((obj1, obj2) => {
    const a = sortDesc ? obj2 : obj1;
    const b = sortDesc ? obj1 : obj2;
    return Reflect.get(a, sortColumn) ? (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) : -1;
  });
  return typeof contents[0][key] !== 'boolean' ? sortedContents : sortedContents.reverse();
};

const Movies = () => {
  const classes = useStyles();
  const data = React.useContext(DataContext);
  const [showModal, setShowModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sortColumn, setSortColumn] = React.useState('title');
  const [sortDesc, setSortDesc] = React.useState(false);
  const [alertSettings, setAlertSettings] = React.useState({
    display: false,
    message: '',
    severity: 'error',
  });
  const [editMode, setEditMode] = React.useState(false);
  const componentMounted = React.useRef(true);
  const [movies, setMovies] = React.useState([]);
  const [enteredMovie, setEnteredMovie] = React.useState({
    id: 0,
    title: '',
    genre: '',
    year: '',
  });
  const [searchTerm, setSearchTerm] = React.useState('');

  let movieCount = 0;

  React.useEffect(() => {
    return () => {
      componentMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      await UpdateMovies();
    })();
  }, []);

  const UpdateMovies = async () => {
    const moviesResult = await data.getMovies().catch(_e => {
      openAlert({ display: true, message: 'Listed movies failed to load', severity: 'error' });
      return [];
    });
    if (componentMounted.current) {
      setMovies(moviesResult);
    }
  };

  const openAlert = alertSettings => {
    if (componentMounted.current) {
      setAlertSettings(alertSettings);
    }
  };

  const closeAlert = () => {
    setAlertSettings({ display: false, message: alertSettings?.message, severity: alertSettings?.severity });
  };

  const handleChangePage = (_e, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  async function openModal(
    Movie = {
      id: 0,
      title: '',
      genre: '',
      year: '',
    }
  ) {
    setEnteredMovie(Movie);
    setShowModal(true);
  }

  const closeModal = () => {
    if (componentMounted.current) {
      setShowModal(false);
    }
  };

  const validatedMovie = () => {
    var valid = true;
    var errorMessage = '';
    if (enteredMovie.title.trim() === '') {
      valid = false;
      errorMessage += 'Title must be filled.';
    }
    if (enteredMovie.genre.trim() === '') {
      valid = false;
      errorMessage += 'Genre must be filled.';
    }
    if (enteredMovie.year === '' || isNaN(Number(enteredMovie.year))) {
      valid = false;
      errorMessage += 'Year must be a number.';
    }
    if (!valid) {
      openAlert({ display: true, message: errorMessage, severity: 'error' });
    }
    return valid;
  };

  const handleDeleteMovie = async () => {
    handleMovieAction(movie => data.deleteMovie(movie.id), 'delete');
  };

  const handlePostOrPutMovie = async () => {
    handleMovieAction(movie => (movie.id === 0 ? data.postMovie(movie) : data.putMovie(movie.id, movie)));
  };

  const handleMovieAction = async (action, alertMsgLabel = undefined) => {
    if (!enteredMovie) {
      openAlert({ display: true, message: 'No movie found', severity: 'error' });
      closeModal();
      return;
    }
    if (!validatedMovie()) {
      return;
    }

    await action(enteredMovie)
      .then(_e =>
        openAlert({
          display: true,
          message: `Successfully ${alertMsgLabel ?? (enteredMovie.id === 0 ? 'adde' : 'update')}d title ${
            enteredMovie.title
          }`,
          severity: 'success',
        })
      )
      .catch(_e =>
        openAlert({
          display: true,
          message: `Failed to ${alertMsgLabel ?? (enteredMovie.id === 0 ? 'add' : 'update')} title ${
            enteredMovie.title
          }`,
          severity: 'error',
        })
      );
    UpdateMovies();
    closeModal();
  };

  const handleSearch = () => {
    const filtered = movies.filter(item =>
      searchTerm !== '' ? jr.toKeyValArray(item).some(kv => (kv.value + '').toLowerCase().includes(searchTerm)) : true
    );
    movieCount = filtered.length;
    return filtered;
  };

  const setSortParams = column => {
    if (column === sortColumn) {
      setSortDesc(!sortDesc);
    } else {
      setSortColumn(column);
      setSortDesc(false);
    }
    setCurrentPage(0);
  };

  return (
    <div>
      <Snackbar
        id='moviesPageAlertSnackbar'
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertSettings?.display}
        autoHideDuration={6000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity={alertSettings?.severity}>
          {alertSettings?.message}
        </Alert>
      </Snackbar>
      <Dialog onClose={closeModal} aria-labelledby='customized-dialog-title' open={showModal}>
        <DialogTitle id='customized-dialog-title'>{enteredMovie?.id !== 0 ? 'Edit' : 'Add'} Movie:</DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <TextField
            className={classes.textField}
            label='Movie Name'
            variant='outlined'
            size='small'
            value={enteredMovie?.title}
            onChange={e => setEnteredMovie({ ...enteredMovie, title: e.target.value })}
          />
          <TextField
            className={classes.genre}
            label='Genre'
            variant='outlined'
            size='small'
            value={enteredMovie?.genre}
            onChange={e => setEnteredMovie({ ...enteredMovie, genre: e.target.value })}
          />
          <TextField
            className={classes.textField}
            label='Year'
            variant='outlined'
            size='small'
            value={enteredMovie?.year}
            onChange={e => setEnteredMovie({ ...enteredMovie, year: e.target.value.trim() })}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-evenly' }}>
          <Button onClick={closeModal} color='default'>
            Cancel
          </Button>
          {enteredMovie?.id !== 0 && (
            <Button onClick={async () => await handleDeleteMovie()} color='secondary'>
              Delete
            </Button>
          )}
          <Button autoFocus onClick={async () => await handlePostOrPutMovie()} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.container}>
        <Paper className={classes.table}>
          <div className={classes.tableHeader}>
            <FormControlLabel
              value='start'
              control={<Switch color='primary' />}
              label='Edit'
              labelPlacement='start'
              checked={editMode}
              onChange={_e => {
                const newEditMode = !editMode;
                setEditMode(newEditMode);
              }}
            />
            {editMode && (
              <div>
                <FormControl variant='outlined' className={classes.selectField} size='small'></FormControl>
                <Tooltip title='Add Movie'>
                  <IconButton onClick={async () => await openModal()}>
                    <AddBoxTwoTone color='primary' fontSize='large' />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            <div>
              <TextField
                className={classes.textField}
                label='Search...'
                variant='outlined'
                size='small'
                onChange={e => {
                  setSearchTerm(e.target.value ? e.target.value.toLowerCase() : '');
                  setCurrentPage(0);
                }}
              />
            </div>
          </div>
          <TableContainer id='moviesTable'>
            <Table aria-labelledby='tableTitle' size='small' aria-label='enhanced table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === 'title'}
                      direction={sortDesc ? 'desc' : 'asc'}
                      onClick={() => setSortParams('title')}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === 'genre'}
                      direction={sortDesc ? 'desc' : 'asc'}
                      onClick={() => setSortParams('genre')}
                    >
                      Genre
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortColumn === 'year'}
                      direction={sortDesc ? 'desc' : 'asc'}
                      onClick={() => setSortParams('year')}
                    >
                      Year
                    </TableSortLabel>
                  </TableCell>
                  {editMode && (
                    <>
                      <TableCell>Actions</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableSort(handleSearch(), sortColumn, sortDesc)
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow hover key={row.id}>
                        <TableCell component='th' scope='row'>
                          {row.title}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.genre}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.year}
                        </TableCell>
                        {editMode && (
                          <>
                            <TableCell>
                              <Tooltip title='Edit Movie'>
                                <IconButton onClick={async () => await openModal(row)}>
                                  <EditTwoTone color='secondary' />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component='div'
            count={movieCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};
export default Movies;
