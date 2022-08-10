import axios from 'axios';

export async function getAllPodcasts(){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/`);
}

export async function getPodcastById(id){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/id/${id}`);
}

export async function getPodcastByAuthor(id){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/author/${id}`);
}

export async function getPodcastByTitle(title){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/title/${title}`);
}