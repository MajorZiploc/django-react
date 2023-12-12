export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setAccessToken(v) {
  if (v == null) {
    localStorage.removeItem('accessToken');
  } else {
    localStorage.setItem('accessToken', v);
  }
}

export function setRefreshToken(v) {
  if (v == null) {
    localStorage.removeItem('refreshToken');
  } else {
    localStorage.setItem('refreshToken', v);
  }
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
