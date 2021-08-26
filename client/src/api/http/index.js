import axios from 'axios';
import CONSTANTS from '../../constants';
import AuthApi from './AuthApi';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

export const auth = new AuthApi(httpClient);

export default httpClient;
