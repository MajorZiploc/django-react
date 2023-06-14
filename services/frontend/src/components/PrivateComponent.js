// @ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

/**
 * @typedef {import('../interfaces').PrivateComponentProps} PrivateComponentProps
 */

/**
 * @type {React.FC<PrivateComponentProps>}
 * @returns {React.ReactElement}
 */
const PrivateComponent = ({ element }) => {
  const data = React.useContext(DataContext);
  return data.getAccessToken() ? element : <Navigate to='/login' />;
};

export default PrivateComponent;
