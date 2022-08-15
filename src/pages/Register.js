import React, { useRef, useState } from 'react'
import {useUser} from '../contexts/UserContext';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function Register() {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const {registerUser} = useUser();

    async function submit(e) {
        e.preventDefault();
        setIsLoading(true);
        try{
            await registerUser(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
        }catch(err){
            setMessage(<Message message='Could not register, please try again'/>);
        }
        setIsLoading(false);
    }

    return (
        <main>
            <h2>Sign Up</h2>
            {message}
            <form onSubmit={e => !isLoading && submit(e)} className="form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Username" ref={usernameRef} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" ref={emailRef} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" ref={passwordRef} className="form-control" required/>
                </div>
                <button disabled={isLoading} type="submit" className="main-button">{isLoading ? <Loading/> : 'Sign Up'}</button>
            </form>
        </main>
    )
}
