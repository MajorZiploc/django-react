export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setLocalStorageItem(key, v) {
  if (v == null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, v);
  }
}

export function setAccessToken(v) {
  setLocalStorageItem('accessToken', v);
}

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
