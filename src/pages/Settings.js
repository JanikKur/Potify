import React, { useRef, useState } from 'react'
import '../assets/styles/pages/settings.css';
import {useUser} from '../contexts/UserContext';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function Settings() {

    
    const {currentUser, updateUserData, deleteUser} = useUser();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const oldPasswordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    async function submit(e){
        e.preventDefault();
        setIsLoading(true)
        try{
            await updateUserData({username: userNameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value, oldPassword: oldPasswordRef.current.value});
            setMessage(prev => <Message message='Updated successfully' />);
        }catch(err){
            setMessage(prev => <Message message='Could not update, please try again' />);
        }
        setIsLoading(false)
    }

    if(!currentUser) return null;
    return (
        <main>
            {message}
            <div className="user-informations">
                <h1 className="name-icon">{currentUser.username[0].toUpperCase()}</h1>
                <h1 className="name">{currentUser.username}</h1>
            </div>
            <form onSubmit={e => !isLoading && submit(e)} className="settings">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Username" ref={userNameRef} defaultValue={currentUser.username} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" ref={emailRef} defaultValue={currentUser.email} className="form-control" required/>
                </div>
                <details className="new-password-wrapper">
                    <summary>New Password</summary>
                    <div className="form">
                        <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" ref={oldPasswordRef} placeholder="Old Password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" ref={passwordRef} placeholder="New Password" className="form-control" />
                        </div>
                    </div>
                </details>
                <button disabled={isLoading} type='submit' className="main-button">{isLoading ? <Loading/> : 'Save'}</button>
                <button className="delete-button" onClick={(e) => {e.preventDefault(); window.confirm('Do you really want to delete your Account') && deleteUser()}}>Delete Account</button>
            </form>
        </main>
    )
}
