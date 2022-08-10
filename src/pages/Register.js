import React from 'react'

export default function Register() {
    return (
        <main>
            <h2>Sign Up</h2>
            <form className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="form-control" />
                </div>
                <button type="submit" className="main-button">Sign Up</button>
            </form>
        </main>
    )
}
