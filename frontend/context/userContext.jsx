import React, { createContext, useState,useEffect } from 'react';
export const userProfile = createContext();


export const Userprovider = ({ children }) => {
    const [email, setEmail] = useState(() => {
        // Parse the stored value from localStorage if it exists
        const storeduser = localStorage.getItem('email');
        return storeduser ? JSON.parse(storeduser) : null;
    });

    useEffect(() => {
        if (email) {
            // Store the user in localStorage as a JSON string
            localStorage.setItem('email', JSON.stringify(email));
        } else {
            // Remove the user from localStorage when it's null
            localStorage.removeItem('email');
        }
    }, [email]);
        
    return (
        <userProfile.Provider value={{ email, setEmail}}>
            {children}
        </userProfile.Provider>
    );
};