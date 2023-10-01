// @ts-check
import React from 'react';
import DataContext from '../context/DataContext';
import GenericCrudTable from './GenericCrudTable';
import '../styles/Global.scss';

/**
 * @typedef {import('../interfaces').Movie} Movie
 * @typedef {import('../interfaces').GenericCrudTableProps<Partial<Movie>>} GenericCrudTableProps
 */

/**
 * @returns {React.ReactElement}
 */
const Movies = () => {
  const data = React.useContext(DataContext);
  const validatedMovie = enteredMovie => {
    var isValid = true;
    var errorMessage = '';
    if (!enteredMovie.title || enteredMovie.title.trim() === '') {
      isValid = false;
      errorMessage += 'Title must be filled.';
    }
    if (!enteredMovie.genre || enteredMovie.genre.trim() === '') {
      isValid = false;
      errorMessage += 'Genre must be filled.';
    }
    if (!enteredMovie.year || enteredMovie.year === '' || isNaN(Number(enteredMovie.year))) {
      isValid = false;
      errorMessage += 'Year must be a number.';
    }
    return { isValid, errorMessage };
  };

  /** @type {GenericCrudTableProps} */
  const crudTableProps = {
    modelName: 'Movie',
    defaultModel: {
      id: undefined,
      title: undefined,
      genre: undefined,
      year: undefined,
    },
    modelId: 'id',
    modalToString: model => model.title,
    modelFields: ['title', 'genre', 'year'],
    modelData: {
      deleteModel: data.deleteMovie.bind(data),
      postModel: data.postMovie.bind(data),
      putModel: data.putMovie.bind(data),
      getModels: data.getMovies.bind(data),
    },
    validatedModel: validatedMovie,
    tableId: 'moviesTable',
    defaultSortColumn: 'title',
  };

  return (
    <div className='pageStyles'>
      <GenericCrudTable {...crudTableProps} />
    </div>
  );
};

export default Movies;
