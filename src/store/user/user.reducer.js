import { USER_ACTION_TYPES } from './user.types';

// initial state of the user reducer
const INITIAL_STATE = {
    currentUser: null,
};

// create user reducer function
export const userReducer = (state = INITIAL_STATE, action) => {
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
            return state;
    }
};
