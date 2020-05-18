import axios from 'axios';


const BASE_URI = 'http://localhost:3000';

/**
 * TODO: requrest cancelation
 */
const instance = axios.create({
  baseURL: BASE_URI,
});


export default instance;
