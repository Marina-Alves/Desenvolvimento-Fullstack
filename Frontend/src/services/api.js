import axios from "axios";

export const BASE_URL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

export const listPessoas = () => axios.get(`${BASE_URL}/people`);

export const getPessoa = (id) => axios.get(`${BASE_URL}/people/${id}`);

export const createPessoa = (pessoa) => axios.post(`${BASE_URL}/people`, pessoa);

export const updatePessoa = (id, pessoa) => axios.put(`${BASE_URL}/people/${id}`, pessoa);

export const deletePessoa = (id) => axios.delete(`${BASE_URL}/people/${id}`);

export const deleteTelefone = (id) => axios.delete(`${BASE_URL}/phone/${id}`);
