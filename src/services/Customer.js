import axios from "axios";

const baseUrl = "https://northwindrestapi-gmccb0cxcfgcg0a5.swedencentral-01.azurewebsites.net/api/customers"

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

const create = newCustomer => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCustomer, config)
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
    return axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

export default { getAll, create, remove, update, setToken }