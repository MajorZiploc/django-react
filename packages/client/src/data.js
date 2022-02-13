import axios from 'axios';

class Data {
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
      .then(r => r.data);
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

  //
  //curl -X POST http://127.0.0.1:8000/api/v1/auth/token/ --data '{"username":"USERNAME", "password":"pass@Temp10"}' -H 'content-type: application/json' -H 'accept: application/json; indent=4'

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

  async getMovies(token) {
    return axios
      .get('/api/v1/movies/', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data.results);
  }

  // TODO: need to test
  async postMovie(movie, token) {
    return axios
      .post('/api/v1/movies/', movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data);
  }

  // TODO: need to test
  async getMovie(id, token) {
    return axios
      .get(`/api/v1/movies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data.results);
  }

  // TODO: need to test
  async putMovie(id, movie, token) {
    return axios
      .put(`/api/v1/movies/${id}`, movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data);
  }

  // TODO: need to test
  async patchMovie(id, movie, token) {
    return axios
      .patch(`/api/v1/movies/${id}`, movie, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data);
  }

  // TODO: need to test
  async deleteMovie(id, token) {
    return axios
      .delete(`/api/v1/movies/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(r => r.data);
  }
}

export const data = new Data();
