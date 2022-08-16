import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { remove } from '../utils/removeElement';
import { logoutUser, validateUser, loginUser as loginUserService, registerUser as registerUserService, updateUser, deleteUser as deleteUserService, subscribePodcast as subscribePodcastService, unsubscribePodcast as unsubscribePodcastService } from '../services/user';
const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}



export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser(currentUser);
        setLoading(false);
    }, [currentUser]);


    useEffect(() => {
        validateUser().then(res => {
            setCurrentUser(res.data.user);
        }).catch(err => {});
    }, []);

    async function logout() {
        try {
            await logoutUser();
            setCurrentUser(null);
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function loginUser(email, password) {
        if (!email || !password) {
            return;
        }
        try {
            const result = await loginUserService(email,password);
            if (result.status === 200) {
                setCurrentUser(prev => {return {...result.data}});
                navigate('/');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function registerUser(username, email, password) {
        if (!username || !email || !password) {
            return;
        }
        try {
            const result = await registerUserService(username, email, password);
            if (result.status === 201) {
                navigate('/login');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function updateUserData(newData) {
        if (!newData) {
            return;
        }
        try {
            const result = await updateUser(currentUser._id, newData);
            if (result.status === 200) {
                setCurrentUser(prev => {return {...prev, ...newData}});
                navigate('/settings');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async function deleteUser(){
        try{
            const result = await deleteUserService(currentUser._id);
            if (result.status === 200) {
                await logout();
                navigate('/');
            }
        }catch(err){
            throw new Error(err);
        }
    }

    async function subscribePodcast(podcastId) {
        try{
            await subscribePodcastService(podcastId);
            setCurrentUser(prev => {
                if(!prev.subscriptions.includes(podcastId)) {
                    prev.subscriptions.push(podcastId);
                }
                return {...prev};
            });
        }
        catch(err){
            throw new Error(err);
        }
    }

    async function unsubscribePodcast(podcastId) {
        try{
            await unsubscribePodcastService(podcastId);
            setCurrentUser(prev => {
                prev.subscriptions = remove(prev.subscriptions, podcastId);
                return {...prev};
            });
        }
        catch(err){
            throw new Error(err);
        }
    }

    
    async function toggleSubscription(podcastId){
        if(isSubscribed(podcastId)){
            unsubscribePodcast(podcastId);
        }
        else{
            subscribePodcast(podcastId);
        }
    }
    
    function isSubscribed(podcastId){
        return currentUser.subscriptions.includes(podcastId);
    }

    const value = {
        currentUser,
        setCurrentUser,
        logout,
        loginUser,
        registerUser,
        updateUserData,
        deleteUser,
        toggleSubscription,
        isSubscribed
    };

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    );
}