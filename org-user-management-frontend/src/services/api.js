import axios from 'axios';

// Create an Axios instance for backend API calls
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // your backend URL
});

export default api;
