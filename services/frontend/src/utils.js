export function toKeyValArray(json) {
  if (json === null || json === undefined) {
    return null;
  }
  return Object.keys(json).map(key => ({ key: key, value: json[key] }));
}

export function fromKeyValArray(keyValueArray) {
  if (keyValueArray === null || keyValueArray === undefined) {
    return null;
  }
  return keyValueArray.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  });
}

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

export const apiUrl = `${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_BACKEND_PORT}`;
