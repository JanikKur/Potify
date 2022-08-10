import axios from 'axios';

export async function getPodcast(id){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/podcast/id/${id}`);
}