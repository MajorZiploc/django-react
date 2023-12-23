import axios from 'axios';
import {
  getRefreshToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getDefaultHeaders,
  getDefaultAuthedHeaders,
  apiUrl,
  frontendUrl,
} from './utils';

export async function refreshAuth() {
  return axios
    .post(
      apiUrl + '/api/v1/auth/token/refresh/',
      {
        refresh: getRefreshToken(),
      },
      {
        headers: getDefaultHeaders(),
      }
    )
    .then(r => {
      setAccessToken(r.data.access);
      return r.data;
    })
    .catch(err => {
      setAccessToken(null);
      setRefreshToken(null);
      throw err;
    });
}

export async function login(username, password) {
  setAccessToken(null);
  setRefreshToken(null);
  return axios
    .post(
      apiUrl + '/api/v1/auth/token/',
      {
        username: username,
        password: password,
      },
      {
        headers: getDefaultHeaders(),
      }
    )
    .then(r => {
      setAccessToken(r.data.access);
      setRefreshToken(r.data.refresh);
      return r.data;
    });
}

export async function register(email, username, password, firstName, lastName) {
  return axios
    .post(
      apiUrl + '/api/v1/auth/register/',
      {
        email: email,
        username: username,
        password: password,
        password2: password,
        first_name: firstName,
        last_name: lastName,
      },
      {
        headers: getDefaultHeaders(),
      }
    )
    .then(r => r.data);
}

//curl -X POST http://127.0.0.1:8000/api/v1/auth/token/ --data '{"username":"USERNAME", "password":"pass@Temp10"}' -H 'content-type: application/json' -H 'accept: application/json; indent=4'

// TODO: remove this function
export async function auth() {
  return axios
    .post(
      apiUrl + '/api/v1/auth/token/',
      {
        username: 'user1',
        password: 'pass@Temp10',
      },
      {
        headers: getDefaultHeaders(),
      }
    )
    .then(r => r.data);
}

export async function retry(apiCall) {
  return await refreshAuth()
    .then(async _r => await apiCall())
    .catch(_e => {
      if (_e?.request?.status === 401) {
        setAccessToken(null);
        setRefreshToken(null);
        window.location.href = frontendUrl;
      }
    });
}

async function _getMoviesHelper() {
  return axios
    .get(apiUrl + '/api/v1/integrations/movies/', {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data.results);
}

export async function getMovies() {
  return await _getMoviesHelper().catch(_e => retry(() => _getMoviesHelper()));
}

async function _postMovieHelper(movie) {
  return axios
    .post(apiUrl + '/api/v1/integrations/movies/', movie, {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data);
}

export async function postMovie(movie) {
  return await _postMovieHelper(movie).catch(_e => retry(() => _postMovieHelper(movie)));
}

// TODO: need to test
async function _getMovieHelper(id) {
  return axios
    .get(apiUrl + `/api/v1/integrations/movies/${id}`, {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data.results);
}

export async function getMovie(id) {
  return await _getMovieHelper(id).catch(_e => retry(() => _getMovieHelper(id)));
}

async function _putMovieHelper(id, movie) {
  return axios
    .put(apiUrl + `/api/v1/integrations/movies/${id}/`, movie, {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data);
}

export async function putMovie(id, movie) {
  return await _putMovieHelper(id, movie).catch(_e => retry(() => _putMovieHelper(id, movie)));
}

// TODO: need to test
async function _patchMovieHelper(id, movie) {
  return axios
    .patch(apiUrl + `/api/v1/integrations/movies/${id}`, movie, {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data);
}

export async function patchMovie(id, movie) {
  return await _patchMovieHelper(id, movie).catch(_e => retry(() => _patchMovieHelper(id, movie)));
}

async function _deleteMovieHelper(id) {
  return axios
    .delete(apiUrl + `/api/v1/integrations/movies/${id}/`, {
      headers: getDefaultAuthedHeaders(),
    })
    .then(r => r.data);
}

export async function deleteMovie(id) {
  return await _deleteMovieHelper(id).catch(_e => retry(() => _deleteMovieHelper(id)));
}
