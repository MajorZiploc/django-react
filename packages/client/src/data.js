import axios from 'axios';

class Data {
  constructor() {}

  clearAccessToken() {
    localStorage.setItem('accessToken', undefined);
  }

  clearRefreshToken() {
    localStorage.setItem('refreshToken', undefined);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(v) {
    localStorage.setItem('accessToken', v);
  }

  setRefreshToken(v) {
    localStorage.setItem('refreshToken', v);
  }

  // TODO: need to test
  async refreshAuth() {
    return axios
      .post(
        '/api/v1/auth/token/refresh/',
        {
          refresh: this.getRefreshToken(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      .then(r => {
        this.setAccessToken(r.data.access);
        return r.data;
      });
  }

  async login(username, password) {
    return axios
      .post(
        '/api/v1/auth/token/',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      .then(r => {
        this.setAccessToken(r.data.access);
        this.setRefreshToken(r.data.refresh);
        return r.data;
      });
  }

  async register(email, username, password) {
    return axios
      .post(
        '/api/v1/auth/register/',
        {
          email: email,
          username: username,
          password1: password,
          password2: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      .then(r => r.data);
  }

  //curl -X POST http://127.0.0.1:8000/api/v1/auth/token/ --data '{"username":"USERNAME", "password":"pass@Temp10"}' -H 'content-type: application/json' -H 'accept: application/json; indent=4'

  // TODO: remove this function
  async auth() {
    return axios
      .post(
        '/api/v1/auth/token/',
        {
          username: 'user1',
          password: 'pass@Temp10',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      .then(r => r.data);
  }

  async _getMoviesHelper() {
    return axios
      .get('/api/v1/movies/', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data.results);
  }

  async getMovies() {
    return await this._getMoviesHelper().catch(
      async _e => await this.refreshToken().then(async _r => await this._getMoviesHelper())
    );
  }

  async _postMovieHelper(movie) {
    return axios
      .post('/api/v1/movies/', movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data);
  }

  async postMovie(movie) {
    return await this._postMovieHelper(movie).catch(
      async _e => await this.refreshToken().then(async _r => await this._postMovieHelper(movie))
    );
  }

  // TODO: need to test
  async _getMovieHelper(id) {
    return axios
      .get(`/api/v1/movies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data.results);
  }

  async getMovie(id) {
    return await this._getMovieHelper(id).catch(
      async _e => await this.refreshToken().then(async _r => await this._getMovieHelper(id))
    );
  }

  async _putMovieHelper(id, movie) {
    return axios
      .put(`/api/v1/movies/${id}/`, movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data);
  }

  async putMovie(id, movie) {
    return await this._putMovieHelper(id, movie).catch(
      async _e => await this.refreshToken().then(async _r => await this._putMovieHelper(id, movie))
    );
  }

  // TODO: need to test
  async _patchMovieHelper(id, movie) {
    return axios
      .patch(`/api/v1/movies/${id}`, movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data);
  }

  async patchMovie(id, movie) {
    return await this._patchMovieHelper(id, movie).catch(
      async _e => await this.refreshToken().then(async _r => await this._patchMovieHelper(id, movie))
    );
  }

  async _deleteMovieHelper(id) {
    return axios
      .delete(`/api/v1/movies/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
      .then(r => r.data);
  }

  async deleteMovie(id) {
    return await this._deleteMovieHelper(id).catch(
      async _e => await this.refreshToken().then(async _r => await this._deleteMovieHelper(id))
    );
  }
}

export const data = new Data();
