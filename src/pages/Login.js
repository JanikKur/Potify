import React from 'react'
import { useRef } from 'react';
import {useUser} from '../contexts/UserContext';

export default function Login() {

    const {loginUser} = useUser();

    const emailRef = useRef();
    const passwordRef = useRef();

    function submit(e){
        e.preventDefault();
        loginUser(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <main>
            <h2>Log In</h2>
            <form onSubmit={submit} className="form">
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" ref={emailRef} placeholder="E-Mail" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} placeholder="Password" className="form-control" required/>
                </div>
                <button type="submit" className="main-button">Log In</button>
            </form>
        </main>
    )
}
