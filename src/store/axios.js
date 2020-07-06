import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.4:5000/api',
});

export default axiosInstance;
