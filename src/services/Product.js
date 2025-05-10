import axios from "axios";

const baseUrl = "https://localhost:7041/api/products"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newProd => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newProd, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.productId}`, object, config)
}

export default { getAll, create, remove, update, setToken }