import React, { useRef } from 'react'
import '../assets/styles/pages/addPodcast.css';
import {useUser} from '../contexts/UserContext';
import { addPodcast } from '../services/podcast';

export default function AddPodcast() {


    const {currentUser} = useUser();
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const genreRef = useRef();
    const imageRef = useRef();

    function submit(e){
        e.preventDefault();
        addPodcast(titleRef.current.value, descriptionRef.current.value, genreRef.current.value, imageRef.current.files[0]);
    }

    return (
        <main>
            <h2>Add Podcast</h2>
            <form onSubmit={submit} className="add-podcast-form">

                <div className="form-group">
                    <label>Title Image</label>
                    <input type="file" ref={imageRef}/>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Title" ref={titleRef} className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description" ref={descriptionRef} className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" placeholder="Genre" ref={genreRef} className="form-control" />
                </div>
                <button className="main-button" type="submit">Add Podcast</button>
            </form>
        </main>
    )
}
