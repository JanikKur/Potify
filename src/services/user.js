import axios from 'axios';
const backendLink = process.env.REACT_APP_BACKEND_URL + '/api/v1';

export async function validateUser() {
    return axios.get(`${backendLink}/user/validate`, {}, { withCredentials: true });
}

export async function loginUser(email, password) {
    let formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    return axios.post(`${backendLink}/user/login`, formData, { withCredentials: true });
}

export async function logoutUser() {
    return axios.delete(`${backendLink}/user/logout`, { withCredentials: true });
}

export async function registerUser(username, email, password) {
    let formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    return axios.post(`${backendLink}/user`, formData, { withCredentials: true });
}

export async function updateUser(userId, newData){
    let formData = new FormData();
    for (let elem in newData) {
        formData.append(elem, newData[elem]);
    }
    return axios.put(`${backendLink}/user/${userId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function subscribePodcast(podcastId){
    return axios.put(`${backendLink}/user/subscribepodcast/${podcastId}`, { withCredentials: true });
}

export async function unsubscribePodcast(podcastId){
    return axios.put(`${backendLink}/user/unsubscribepodcast/${podcastId}`, { withCredentials: true });
}