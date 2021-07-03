import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001'
});

instance.interceptors.request.use((request) => {
  if (
    localStorage.getItem('profile') &&
    JSON.parse(localStorage.getItem('profile')) !== null
  ) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return request;
});

export default instance;
