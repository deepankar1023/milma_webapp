import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/', // Change this to your API base URL
});

export default api;
