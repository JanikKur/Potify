import React from 'react'

export default function AddEpisode() {
  return (
    <main>
        <h2>Add Episode</h2>
        <form className="add-podcast-form">
                <div className="form-group">
                    <label>Podcast</label>
                    <select className="form-control selection">
                        <option>Test1</option>
                        <option>Test2</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Description" className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>File</label>
                    <input type="file" />
                </div>
                <button className="main-button" type="submit">Add Episode</button>
        </form>
    </main>
  )
}
