import React, { useState } from 'react'
import { useRef } from 'react';
import {useUser} from '../contexts/UserContext';
import Loading from '../components/Loading';

export default function Login() {

    const {loginUser} = useUser();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    async function submit(e){
        e.preventDefault();
        setIsLoading(true);
        await loginUser(emailRef.current.value, passwordRef.current.value);
        setIsLoading(false);
    }

    return (
        <main>
            <h2>Log In</h2>
            <form onSubmit={e => !isLoading && submit(e)} className="form">
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" ref={emailRef} placeholder="E-Mail" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} placeholder="Password" className="form-control" required/>
                </div>
                <button disabled={isLoading} type="submit" className="main-button">{isLoading ? <Loading/> : 'Login In'}</button>
            </form>
        </main>
    )
}
