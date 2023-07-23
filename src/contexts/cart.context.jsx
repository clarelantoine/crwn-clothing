import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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

// create cart context
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

// create cart action type object
export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

// set up the initial reducer state object
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

// create the cart reducer function
const cartReducer = (state, action) => {
    // destructure the action object of the reducer
    const { type, payload } = action;

    // switch statement to handled different cases
    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
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
    // instanciate the cart reducer
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
        useReducer(cartReducer, INITIAL_STATE);

    // dispatch IsCartOpen action
    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    // dispatch cartItems ,cartCount ,cartTotal actions
    const updateCartItemsReducer = (newCartItems) => {
        // calculate cart total count every time cartItems is updated
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        // calculate cart total price every time cartItems is updated
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        const payload = {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };

        // dispatch new action with payload
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
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

    // create value object to pass to provider
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
