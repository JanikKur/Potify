import React, { useRef, useState } from 'react'
import '../assets/styles/pages/addPodcast.css';
import { addPodcast } from '../services/podcast';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { isImageFile } from '../utils/checkPodcastFile';

export default function AddPodcast() {
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const genreRef = useRef();
    const imageRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        try{
            if(!isImageFile(imageRef.current.files[0])) throw new Error();
            await addPodcast(titleRef.current.value, descriptionRef.current.value, genreRef.current.value, imageRef.current.files[0]);
            setMessage(<Message message='Podcast added successfully' />);
        }catch(err){
            setMessage(<Message message='Could not add Podcast, please try again' />);
        }
        setIsLoading(false);
    }

    return (
        <main>
            <h2>Add Podcast</h2>
            {message}
            <form onSubmit={e => !isLoading && submit(e)} className="add-podcast-form">

                <div className="form-group">
                    <label>Title Image</label>
                    <input type="file" ref={imageRef} accept="image/*" required/>
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" pattern='[a-zA-Z0-9-]+'  placeholder="Title" ref={titleRef} className="form-control" required/>
                </div>
                
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" pattern='[a-zA-Z0-9-]+'  placeholder="Description" ref={descriptionRef} className="form-control" required/>
                </div>
                
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" pattern='[a-zA-Z0-9-]+'  placeholder="Genre" ref={genreRef} className="form-control" required/>
                </div>
                <button disabled={isLoading} className="main-button" type="submit">{isLoading ? <Loading/> : 'Add Podcast'}</button>
            </form>
        </main>
    )
}
