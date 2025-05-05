import axios from 'axios';
export default axios.create({
  baseURL: import.meta.env.MODE === 'development' ? null : 'https://api.quackprep.com/',
  withCredentials: true,
  headers: {
    // 'x-powered-by': 'axios',
    'Content-Type': 'application/json',
  },
});
