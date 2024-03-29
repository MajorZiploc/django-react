// @ts-check
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
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
  Alert,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import AddBoxTwoTone from '@mui/icons-material/AddBoxTwoTone';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import '../styles/GenericCrudTable.scss';
import { toProperCase } from '../utils';

/**
 * @typedef {import('../interfaces').AlertSettings} AlertSettings
 */

/**
 *
 * @template Data
 *
 * @param {import('../interfaces').GenericCrudTableProps<Data>} props
 * @returns {React.ReactElement}
 */
const GenericCrudTable = ({
  modelName,
  defaultModel,
  modelId = 'id',
  modelFields,
  modelData,
  modalToString,
  validatedModel,
  tableId,
  defaultSortColumn,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sortColumn, setSortColumn] = React.useState(defaultSortColumn);
  const [sortDesc, setSortDesc] = React.useState(false);
  /** @type {import('../interfaces').useState<AlertSettings>} */
  const [alertSettings, setAlertSettings] = React.useState({
    display: false,
    message: '',
    severity: 'error',
  });
  const [editMode, setEditMode] = React.useState(false);
  const componentMounted = React.useRef(true);
  const [models, setModels] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [filteredModels, setFilteredModels] = React.useState([]);
  const [enteredModel, setEnteredModel] = React.useState(defaultModel);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [modelCount, setModelCount] = React.useState(0);

  /** @type {(contents: Data[], sortColumn: string, sortDesc: boolean) => Data[]} */
  const tableSort = (contents, sortColumn, sortDesc) => {
    if (contents.length === 0) return [];
    const key = sortColumn;
    const sortedContents = contents.sort((obj1, obj2) => {
      const a = sortDesc ? obj2 : obj1;
      const b = sortDesc ? obj1 : obj2;
      return a[sortColumn] ? (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) : -1;
    });
    return typeof contents[0][key] !== 'boolean' ? sortedContents : sortedContents.reverse();
  };

  React.useEffect(() => {
    return () => {
      componentMounted.current = false;
    };
  }, []);

  /** @type {() => Promise<any>} */
  const UpdateModels = React.useCallback(async () => {
    setLoading(true);
    const modelsResult = await modelData
      .getModels()
      .catch(_e => {
        openAlert({ display: true, message: 'Listed models failed to load', severity: 'error' });
        return [];
      })
      .finally(() => {
        setLoading(false);
      });
    if (componentMounted.current) {
      setModels(modelsResult);
    }
  }, [modelData]);

  React.useEffect(() => {
    (async () => {
      await UpdateModels();
    })();
  }, [UpdateModels]);

  /** @type {(alertSettings: any) => void} */
  const openAlert = alertSettings => {
    if (componentMounted.current) {
      setAlertSettings(alertSettings);
    }
  };

  /** @type {() => void} */
  const closeAlert = () => {
    setAlertSettings({ display: false, message: alertSettings?.message, severity: alertSettings?.severity });
  };

  /** @type {(event: any, newPage: number) => void} */
  const handleChangePage = (_e, newPage) => {
    setCurrentPage(newPage);
  };

  /** @type {(event: any) => void} */
  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  /** @type {(Model?: Data) => Promise<any>} */
  const openModal = async (Model = defaultModel) => {
    setEnteredModel(Model);
    setShowModal(true);
  };

  /** @type {() => void} */
  const closeModal = () => {
    if (componentMounted.current) {
      setShowModal(false);
    }
  };

  /** @type {() => Promise<any>} */
  const handleDeleteModel = async () => {
    await handleModelAction(model => modelData.deleteModel(model[modelId]), 'delete');
  };

  /** @type {() => Promise<any>} */
  const handlePostOrPutModel = async () => {
    await handleModelAction(model =>
      model[modelId] === null || model[modelId] === undefined
        ? modelData.postModel(model)
        : modelData.putModel(model[modelId], model)
    );
  };

  /** @type {(action: (model: Data) => Promise<any>, alertMsgLabel?: string) => Promise<any>} */
  const handleModelAction = async (action, alertMsgLabel = undefined) => {
    setSubmitting(true);
    if (!enteredModel) {
      openAlert({ display: true, message: 'No model found', severity: 'error' });
      closeModal();
      return;
    }
    const { isValid, errorMessage } = validatedModel(enteredModel);
    if (!isValid) {
      openAlert({ display: true, message: errorMessage, severity: 'error' });
      return;
    }

    await action(enteredModel)
      .then(_e =>
        openAlert({
          display: true,
          message: `Successfully ${alertMsgLabel || (!enteredModel[modelId] ? 'adde' : 'update')}d ${modalToString(
            enteredModel
          )}`,
          severity: 'success',
        })
      )
      .catch(_e =>
        openAlert({
          display: true,
          message: `Failed to ${alertMsgLabel || (!enteredModel[modelId] ? 'add' : 'update')} ${modalToString(
            enteredModel
          )}`,
          severity: 'error',
        })
      )
      .finally(() => {
        closeModal();
        setSubmitting(false);
      });
    UpdateModels();
  };

  React.useEffect(() => {
    const filtered = models.filter(item =>
      searchTerm !== ''
        ? Object.entries(item)
            .filter(([key, _value]) => modelFields.map(mf => mf.name).includes(key))
            .some(([_key, value]) => (value + '').toLowerCase().includes(searchTerm))
        : true
    );
    setModelCount(filtered.length);
    setFilteredModels(filtered);
  }, [models, searchTerm, modelFields]);

  /** @type {(str: string) => void} */
  const setSortParams = column => {
    if (column === sortColumn) {
      setSortDesc(!sortDesc);
    } else {
      setSortColumn(column);
      setSortDesc(false);
    }
    setCurrentPage(0);
  };

  const alert = (
    <Snackbar
      id='modelsPageAlertSnackbar'
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alertSettings?.display}
      autoHideDuration={6000}
      onClose={closeAlert}
      className='alertBox'
    >
      <Alert onClose={closeAlert} severity={alertSettings?.severity}>
        {alertSettings?.message}
      </Alert>
    </Snackbar>
  );

  return (
    <div>
      {!showModal && alert}
      <Dialog onClose={closeModal} aria-labelledby='customized-dialog-title' open={showModal}>
        {showModal && alert}
        <DialogTitle id='customized-dialog-title'>
          {enteredModel && enteredModel[modelId] ? 'Edit' : 'Add'} {modelName}:
        </DialogTitle>
        <DialogContent dividers className='crudTableDialogContent'>
          {modelFields.map((mf, i) => {
            const label = toProperCase(mf.label);
            return (
              <TextField
                key={i}
                className='crudTableTextField'
                label={label}
                variant='outlined'
                size='small'
                value={(enteredModel && enteredModel[mf.name]) || ''}
                onChange={e => {
                  const newField = {};
                  newField[mf.label] = e.target.value;
                  setEnteredModel({ ...enteredModel, ...newField });
                }}
              />
            );
          })}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-evenly' }}>
          <Button disabled={submitting} onClick={closeModal}>
            Cancel
          </Button>
          {enteredModel && enteredModel[modelId] != null && (
            <Button disabled={submitting} onClick={async () => await handleDeleteModel()} color='secondary'>
              Delete
            </Button>
          )}
          <Button
            disabled={submitting}
            autoFocus
            type='submit'
            onClick={async () => await handlePostOrPutModel()}
            color='primary'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <div className='crudTableContainer'>
        <Paper id={tableId} className='crudTable'>
          <div className='crudTableHeader'>
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
                <FormControl variant='outlined' className='crudTableSelectField' size='small'>
                  <Tooltip title={`Add ${modelName}`}>
                    <IconButton onClick={async () => await openModal()}>
                      <AddBoxTwoTone color='primary' fontSize='large' />
                    </IconButton>
                  </Tooltip>
                </FormControl>
              </div>
            )}
            <div>
              <TextField
                className='crudTableTextField'
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

          {loading && <CircularProgress color='secondary' />}
          <TableContainer>
            <Table aria-labelledby='tableTitle' size='small' aria-label='enhanced table'>
              <TableHead>
                <TableRow>
                  {modelFields.map((mf, i) => (
                    <TableCell key={i}>
                      <TableSortLabel
                        active={sortColumn === mf.name}
                        direction={sortDesc ? 'desc' : 'asc'}
                        onClick={() => setSortParams(mf.name)}
                      >
                        {toProperCase(mf.label)}
                      </TableSortLabel>
                    </TableCell>
                  ))}

                  {editMode && (
                    <>
                      <TableCell>Actions</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableSort(filteredModels, sortColumn, sortDesc)
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow hover key={row[modelId]}>
                        {modelFields.map((mf, i) => (
                          <TableCell key={i} component='th' scope='row'>
                            {row[mf.name]}
                          </TableCell>
                        ))}
                        {editMode && (
                          <>
                            <TableCell>
                              <Tooltip title='Edit Model'>
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
            count={modelCount}
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
export default GenericCrudTable;
