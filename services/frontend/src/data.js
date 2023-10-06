import axios from 'axios';
import {
  getRefreshToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  getDefaultHeaders,
  getDefaultAuthedHeaders,
  apiUrl,
} from './utils';

class Data {
  constructor() {}

  // TODO: need to test
  async refreshAuth() {
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

  async login(username, password) {
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

  async register(email, username, password, firstName, lastName) {
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
  async auth() {
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

  async _getMoviesHelper() {
    return axios
      .get(apiUrl + '/api/v1/movies/', {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data.results);
  }

  async getMovies() {
    return await this._getMoviesHelper().catch(
      async _e => await getRefreshToken().then(async _r => await this._getMoviesHelper())
    );
  }

  async _postMovieHelper(movie) {
    return axios
      .post(apiUrl + '/api/v1/movies/', movie, {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data);
  }

  async postMovie(movie) {
    return await this._postMovieHelper(movie).catch(
      async _e => await getRefreshToken().then(async _r => await this._postMovieHelper(movie))
    );
  }

  // TODO: need to test
  async _getMovieHelper(id) {
    return axios
      .get(apiUrl + `/api/v1/movies/${id}`, {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data.results);
  }

  async getMovie(id) {
    return await this._getMovieHelper(id).catch(
      async _e => await getRefreshToken().then(async _r => await this._getMovieHelper(id))
    );
  }

  async _putMovieHelper(id, movie) {
    return axios
      .put(apiUrl + `/api/v1/movies/${id}/`, movie, {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data);
  }

  async putMovie(id, movie) {
    return await this._putMovieHelper(id, movie).catch(
      async _e => await getRefreshToken().then(async _r => await this._putMovieHelper(id, movie))
    );
  }

  // TODO: need to test
  async _patchMovieHelper(id, movie) {
    return axios
      .patch(apiUrl + `/api/v1/movies/${id}`, movie, {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data);
  }

  async patchMovie(id, movie) {
    return await this._patchMovieHelper(id, movie).catch(
      async _e => await getRefreshToken().then(async _r => await this._patchMovieHelper(id, movie))
    );
  }

  async _deleteMovieHelper(id) {
    return axios
      .delete(apiUrl + `/api/v1/movies/${id}/`, {
        headers: getDefaultAuthedHeaders(),
      })
      .then(r => r.data);
  }

  async deleteMovie(id) {
    return await this._deleteMovieHelper(id).catch(
      async _e => await getRefreshToken().then(async _r => await this._deleteMovieHelper(id))
    );
  }
}

export const data = new Data();
