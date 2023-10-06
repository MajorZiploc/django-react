// @ts-check
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../utils';

/**
 * @typedef {import('../interfaces').PrivateComponentProps} PrivateComponentProps
 */

/**
 * @type {React.FC<PrivateComponentProps>}
 * @returns {React.ReactElement}
 */
const PrivateComponent = ({ element }) => {
  return getAccessToken() ? element : <Navigate to='/login' />;
};

export default PrivateComponent;
