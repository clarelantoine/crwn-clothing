import { createContext, useEffect, useReducer, useState } from 'react';

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CART_ACTION_TYPES = {
    IS_CART_OPEN: 'IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const cartReducer = (state, action) => {
    // console.log('dispatched');
    const { type, payload } = action;

    console.log(payload);

    switch (type) {
        case CART_ACTION_TYPES.IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
        useReducer(cartReducer, INITIAL_STATE);

    // dispatch setIsCartOpen action
    const setIsCartOpen = (toggleCart) => {
        dispatch({
            type: CART_ACTION_TYPES.IS_CART_OPEN,
            payload: toggleCart,
        });
    };

    const updateCartItemsReducer = (newCartItems) => {
        // calculate cart total count every time cartItems is updated
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        //   calculate cart total price every time cartItems is updated
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        // dispatch new action with payload
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            },
        });
    };

    // handle add item to cart
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    // // handle remove item from cart
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    // handle clear item from cart
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
