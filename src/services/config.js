import Axios from 'axios'

export const http = Axios.create({
    baseURL: 'http://localhost:8000/api/accounts',
});