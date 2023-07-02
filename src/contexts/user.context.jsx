import { createContext, useEffect, useState } from 'react';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// user context provider
export const UserProvider = ({ children }) => {
    // make use of useState to elevate our userContext value
    const [currentUser, setCurrentUser] = useState(null);
    // pass the useState value and function to our userContext provider
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        // subscribe/unsbscribe to the user's sign-in state
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                // if user not null, then create the user doc
                createUserDocumentFromAuth(user);
            }
            // set auth user to setCurrentUser
            setCurrentUser(user);
            // console.log(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
