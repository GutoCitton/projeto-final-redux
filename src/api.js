import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://my-application-teste.herokuapp.com'
})