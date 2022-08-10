import React from 'react'

export default function Login() {
    return (
        <main>
            <h2>Log In</h2>
            <form className="form">
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="form-control" />
                </div>
                <button type="submit" className="main-button">Log In</button>
            </form>
        </main>
    )
}
