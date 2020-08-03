import axios from 'axios';


const BASE_URI = 'http://localhost:3000';

/**
 * TODO: requrest cancelation
 *
 * TODO: create app config with defined contants
 * TODO: move base uri config and import value based on process env
 */
const instance = axios.create({
  baseURL: BASE_URI,
});


export default instance;
