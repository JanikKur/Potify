import React, { useRef } from 'react'
import {useUser} from '../contexts/UserContext';

export default function Register() {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {registerUser} = useUser();

    function submit(e) {
        e.preventDefault();
        registerUser(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
    }

    return (
        <main>
            <h2>Sign Up</h2>
            <form onSubmit={submit} className="form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Username" ref={usernameRef} className="form-control" />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" ref={emailRef} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" ref={passwordRef} className="form-control" />
                </div>
                <button type="submit" className="main-button">Sign Up</button>
            </form>
        </main>
    )
}
