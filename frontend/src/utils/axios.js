import axios from 'axios';


const BASE_URI = 'http://localhost:3000';

/**
 * TODO: requrest cancelation
 * TODO: move base uri to process env
 */
const instance = axios.create({
  baseURL: BASE_URI,
});


export default instance;
