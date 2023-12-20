// @ts-check
export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

/** @type{(key: string, v: any) => void} */
export function setLocalStorageItem(key, v) {
  if (v == null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, v);
  }
}

/** @type{(v: string) => void} */
export function setAccessToken(v) {
  setLocalStorageItem('accessToken', v);
}

/** @type{(v: string) => void} */
export function setRefreshToken(v) {
  setLocalStorageItem('refreshToken', v);
}

export function getDefaultHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export function getDefaultAuthedHeaders() {
  return {
    ...getDefaultHeaders(),
    Authorization: `Bearer ${getAccessToken()}`,
  };
}

export const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

/** @type{(json: any) => string} */
export function jsonToQueryString(json) {
  const qps = Object.entries(json)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');
  return qps ? `?${qps}` : '';
}

/** @type {(str: string) => string} */
export const toCamel = str =>
  str
    .toLowerCase()
    .replace(/([-_ ][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', '').replace(' ', ''));

/** @type {(str: string) => string} */
export const toProperCase = str =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
