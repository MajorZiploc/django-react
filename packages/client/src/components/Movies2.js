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

function tableSort(contents, sortColumn, sortDesc) {
  if (contents.length === 0) return [];
  const key = sortColumn;
  const sortedContents = contents.sort((obj1, obj2) => {
    const a = sortDesc ? obj2 : obj1;
    const b = sortDesc ? obj1 : obj2;
    return Reflect.get(a, sortColumn) ? (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) : -1;
  });
  return typeof contents[0][key] !== 'boolean' ? sortedContents : sortedContents.reverse();
}

function Movies2() {
  const classes = useStyles();
  const data = React.useContext(DataContext);
  const [auth, setAuth] = React.useState();
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
      setAuth(await data.auth());
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      UpdateMovies();
    })();
  }, [auth]);

  async function UpdateMovies() {
    if (auth) {
      const moviesResult = await data.getMovies(auth.access).catch(_e => {
        openAlert({ display: true, message: 'Listed movies failed to load', severity: 'error' });
        return [];
      });
      if (componentMounted.current) {
        setMovies(moviesResult);
      }
    }
  }

  function openAlert(alertSettings) {
    if (componentMounted.current) {
      setAlertSettings(alertSettings);
    }
  }

  function closeAlert() {
    setAlertSettings({ display: false, message: alertSettings?.message, severity: alertSettings?.severity });
  }

  function handleChangePage(_e, newPage) {
    setCurrentPage(newPage);
  }

  function handleChangeRowsPerPage(e) {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  }

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

  function closeModal() {
    if (componentMounted.current) {
      setShowModal(false);
    }
  }

  function validatedMovie() {
    var valid = true;
    var errorMessage = '';
    if (enteredMovie.title.trim() === '') {
      valid = false;
      errorMessage = 'Title must be filled';
    }
    if (!valid) {
      openAlert({ display: true, message: errorMessage, severity: 'error' });
    }
    return true;
  }

  async function handlePostMovie() {
    if (!enteredMovie) {
      openAlert({ display: true, message: 'No movie found', severity: 'error' });
      closeModal();
      return;
    }
    if (!validatedMovie()) {
      return;
    }

    if (auth) {
      await data
        .postMovie(enteredMovie, auth.access)
        .then(_e =>
          openAlert({
            display: true,
            message: `Successfully ${enteredMovie.id === 0 ? 'added' : 'updated'} title ${enteredMovie.title}`,
            severity: 'success',
          })
        )
        .catch(_e =>
          openAlert({
            display: true,
            message: `Failed to ${enteredMovie.id === 0 ? 'add' : 'update'} title ${enteredMovie.title}`,
            severity: 'error',
          })
        );
      UpdateMovies();
    }
    closeModal();
  }

  function handleSearch() {
    const filtered = movies.filter(item => (searchTerm !== '' ? item.title?.toLowerCase().includes(searchTerm) : true));
    movieCount = filtered.length;
    return filtered;
  }

  function setSortParams(column) {
    if (column === sortColumn) {
      setSortDesc(!sortDesc);
    } else {
      setSortColumn(column);
      setSortDesc(false);
    }
    setCurrentPage(0);
  }

  return (
    <div>
      <Snackbar
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
            onChange={e => setEnteredMovie({ ...enteredMovie, title: e.target.value.trim() })}
          />
          <TextField
            className={classes.genre}
            label='Genre'
            variant='outlined'
            size='small'
            value={enteredMovie?.genre}
            onChange={e => setEnteredMovie({ ...enteredMovie, genre: e.target.value.trim() })}
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
          <Button autoFocus onClick={async () => await handlePostMovie()} color='primary'>
            Confirm
          </Button>
          <Button onClick={closeModal} color='secondary'>
            Return
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
          <TableContainer>
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
                      <TableRow hover key={row.title}>
                        <TableCell component='th' scope='row'>
                          {row.title}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.genre}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <CheckCircleTwoToneIcon color='primary' />
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
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
export default Movies2;
