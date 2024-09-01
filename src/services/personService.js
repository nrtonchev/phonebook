import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (toCreate) => {
    const request = axios.post(baseUrl, toCreate);
    return request.then(response => response.data);
}

const update = (toUpdate) => {
    const request = axios.put(`${baseUrl}/${toUpdate.id}`, toUpdate);
    return request.then(response => response.data);
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default { getAll, create, update, remove}