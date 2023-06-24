import { createContext, useState } from 'react';

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

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
