import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://ferbsystem.vercel.app/api',
});
