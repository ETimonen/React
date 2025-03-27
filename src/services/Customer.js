import axios from "axios";

const baseUrl = "https://localhost:7041/api/customers/"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }