import axios from 'axios'

const baseUrl = "https://northwindrestapi-gmccb0cxcfgcg0a5.swedencentral-01.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }