import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';

const auth = getAuth(app);
export const UserAuth = createContext(null);
const Auth = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const passReset = (email) =>{
        return sendPasswordResetEmail(auth,email);
    }

    const updateUser = (loggedUser, name, photo) => {
        setLoading(true)
        return updateProfile(loggedUser, {
            displayName: name, photoURL: photo
        })
    }

    const userVerify = ()=>{
        setLoading(true);
        return sendEmailVerification(auth.currentUser)
    }

    const logOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            // if (currentUser) {
            //     // const email= currentUser.email;
            //     axios.post("https://string-verse-server.vercel.app/jwt", {
            //         email: currentUser.email
            //     }).then(data => {
            //         // console.log(data.data.token);
            //         localStorage.setItem("access-token", data.data.token)
            //         setLoading(false)
            //     })
            // } else {
            //     setLoading(false)
            //     localStorage.removeItem("access-token")
            // }
        })
        return () => unsubscribe();
    }, [])

    const userInfo = {
        user,
        loading,
        signUp,
        signIn,
        passReset,
        googleIn,
        updateUser,
        userVerify,
        logOut
    }

    return (
        <UserAuth.Provider value={userInfo}>
            {children}
        </UserAuth.Provider>
    );
};

export default Auth;