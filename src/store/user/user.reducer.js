import { USER_ACTION_TYPES } from './user.types';

// initial state of the user reducer
const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

// create user reducer function
export const userReducer = (state = INITIAL_STATE, action) => {
    // deconstruct the reducer action
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };

        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };

        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };

        default:
            return state;
    }
};
