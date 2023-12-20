// @ts-check
import React from 'react';
import GenericCrudTable from './GenericCrudTable';
import '../styles/Global.scss';
import * as data from '../data';

/**
 * @typedef {import('../interfaces').Movie} Movie
 * @typedef {import('../interfaces').GenericCrudTableProps<Partial<Movie>>} GenericCrudTableProps
 */

/**
 * @returns {React.ReactElement}
 */
const Movies = () => {
  const validatedMovie = enteredMovie => {
    var isValid = true;
    var errorPoints = [];
    if (!enteredMovie.title || enteredMovie.title.trim() === '') {
      isValid = false;
      errorPoints.push('Title must be filled.');
    }
    if (!enteredMovie.genre || enteredMovie.genre.trim() === '') {
      isValid = false;
      errorPoints.push('Genre must be filled.');
    }
    if (!enteredMovie.year || enteredMovie.year === '' || isNaN(Number(enteredMovie.year))) {
      isValid = false;
      errorPoints.push('Year must be a number.');
    }
    const errorMessage = (
      <ul>
        {errorPoints.map(errorPoint => (
          <li key={errorPoint}>{errorPoint}</li>
        ))}
      </ul>
    );
    return { isValid, errorMessage: errorPoints.length !== 0 ? errorMessage : null };
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
    modelFields: [
      { name: 'title', label: 'title' },
      { name: 'genre', label: 'genre' },
      { name: 'year', label: 'year' },
    ],
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
    <div className='background'>
      <div className='pageStyles'>
        <GenericCrudTable {...crudTableProps} />
      </div>
    </div>
  );
};

export default Movies;
