// @ts-check
import React from 'react';

/**
 * @typedef {any} Data
 */

/** @type {React.Context<Data>} */
const DataContext = React.createContext(null);
/** @type {React.Provider<Data>} */
export const DataProvider = DataContext.Provider;
export default DataContext;
