import React from 'react'
import '../assets/styles/pages/addPodcast.css';

export default function AddPodcast() {
    return (
        <main>
            <h2>Add Podcast</h2>
            <form className="add-podcast-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Title" className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description" className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" placeholder="Genre" className="form-control" />
                </div>
                <button className="main-button" type="submit">Add Podcast</button>
            </form>
        </main>
    )
}
