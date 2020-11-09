import axios from 'axios';

// instance of axios
export default axios.create({
  baseURL: 'http://localhost:5000'
})
