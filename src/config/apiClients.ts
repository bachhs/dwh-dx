import axios from 'axios';

export const govAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const omAxios = axios.create({
    baseURL: import.meta.env.VITE_OPEN_METADATA_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
