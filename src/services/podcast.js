import axios from 'axios';

export async function getAllPodcasts(){
    return await axios.get(`/api/v1/podcast/`);
}


export async function getTrendingPodcasts(){
    return axios.get(`/api/v1/podcast?sort=trends`);
}

export async function getPodcastById(id){
    return axios.get(`/api/v1/podcast/id/${id}`);
}

export async function getPodcastByIds(ids){
    return axios.get(`/api/v1/podcast/ids/${JSON.stringify(ids)}`);
}

export async function getPodcastByAuthor(id){
    return axios.get(`/api/v1/podcast/author/${id}`);
}

export async function getPodcastByTitle(title){
    return axios.get(`/api/v1/podcast/title/${title}`);
}

export async function addPodcast(title, description, genre, image){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('file', image);
    return axios.post(`/api/v1/podcast`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function addEpisode(podcastId, title, file){
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    return axios.put(`/api/v1/podcast/addEpisode/${podcastId}`, formData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}

export async function deletePodcast(podcastId){
    return axios.delete(`/api/v1/podcast/${podcastId}`, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
}