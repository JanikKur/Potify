import React from 'react'
import '../assets/styles/pages/settings.css';
import {useUser} from '../contexts/UserContext';

export default function Settings() {

    
    const {currentUser} = useUser();

    if(!currentUser) return null;
    return (
        <main>
            <div className="user-informations">
                <h1 className="name-icon">{currentUser.username[0].toUpperCase()}</h1>
                <h1 className="name">{currentUser.username}</h1>
            </div>
            <form className="settings">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Name" defaultValue={currentUser.username} className="form-control" />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" defaultValue={currentUser.email} className="form-control" />
                </div>
                <details className="new-password-wrapper">
                    <summary>New Password</summary>
                    <div className="form">
                        <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" placeholder="Old Password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" placeholder="New Password" className="form-control" />
                        </div>
                    </div>
                </details>
                <button className="main-button">Save</button>
                <button className="delete-button">Delete Account</button>
            </form>
        </main>
    )
}
