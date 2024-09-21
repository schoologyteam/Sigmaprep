import axios from 'axios';
//console.log(`BACKEND_URL = ${BACKEND_URL}`);
export default axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
