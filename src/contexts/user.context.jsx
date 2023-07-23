import { createContext, useEffect, useReducer } from 'react';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// object of reducer action type
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// initial state of the user reducer
const INITIAL_STATE = {
    currentUser: null,
};

// create user reducer function
const userReducer = (state, action) => {
    // deconstruct the reducer action
    const { type, payload } = action;

    // swtich to matching type
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

// user context provider
export const UserProvider = ({ children }) => {
    // make use of useState to elevate our userContext value
    // const [currentUser, setCurrentUser] = useState(null);

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // destructure currentUser from reducer state
    const { currentUser } = state;

    // function to dispatch setCurrentUser
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    };

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

    // pass the value to our userContext provider
    const value = { currentUser, setCurrentUser };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
