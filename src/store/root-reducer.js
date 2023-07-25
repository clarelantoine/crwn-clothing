import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/categories.reducer';

// create and export the root reducer
export const rootReducer = combineReducers({
    user: userReducer, // user reducer
    categories: categoriesReducer, // categories reducer
});
