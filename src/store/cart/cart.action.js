import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

// add to cart helper logic
const addCartItem = (cartItems, productToAdd) => {
    // check if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return new array with updated cartItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// remove from cart helper logic
const removeCartItem = (cartItems, cartItemToRemove) => {
    // check if cartItems contains productToRemove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // if cart item quantity is equal to 1, then remove from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }

    // Else decrease the quantity of the item by 1
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

// clear item from cart helper logic
const clearCartItem = (cartItems, cartItemToClear) => {
    // check if cartItems contains productToRemove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToClear.id
    );

    // if cart item exist in the cart, then remove it
    if (existingCartItem) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToClear.id
        );
    }
};

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
