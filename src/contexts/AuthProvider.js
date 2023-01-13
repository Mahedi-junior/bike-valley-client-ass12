import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [gLoading, setGloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const providerLogin = provider => {
        setGloading(true)
        return signInWithPopup(auth, provider)
    }

    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const logOut = () => {
        localStorage.removeItem('accessToken');
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setGloading(false);
            setLoading(false);
        })

        return () => unsubscribe();
    },[])

    const authInfo = {user, createUser, signIn, providerLogin, updateUser, loading, setLoading, gLoading, setGloading, logOut}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;