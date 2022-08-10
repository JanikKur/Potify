import React from 'react'
import '../assets/styles/pages/settings.css';

export default function Settings() {
    return (
        <main>
            <div className="user-informations">
                <h1 className="name-icon">J</h1>
                <h1 className="name">Janik Kurtz</h1>
            </div>
            <div className="settings">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" className="form-control" />
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
            </div>
        </main>
    )
}
