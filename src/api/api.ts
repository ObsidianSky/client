import axios from 'axios';

const defaultParams = {

};

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

api.interceptors.request.use((config) => {
    const requestParams = config.params || {};

    config.params = Object.assign({}, defaultParams, requestParams);

    return config;
});

api.interceptors.response.use( (response) => {
    return response.data || response;
}, (error) => {
    const errorData = (error.response && error.response.data) || {};

    errorData.errorMessage = errorData.errorMessage || 'Unknown error. Try again later.';

    return Promise.reject(errorData);
});

export async function authenticate({email, password}: {email: string, password: string}): Promise<any> {
    return await api.post('/authentication/authenticate', { email, password });
}

export async function getChatList(memberId: { memberId: string }): Promise<any> {
    return await api.get(`/chat/${memberId}`);
}
