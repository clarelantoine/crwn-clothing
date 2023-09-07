import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/categories.reducer';
import { cartReducer } from './cart/cart.reducer';

// create and export the root reducer
export const rootReducer = combineReducers({
    user: userReducer, // user reducer
    categories: categoriesReducer, // categories reducer
    cart: cartReducer, // cart reducer
});
