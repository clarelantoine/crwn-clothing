import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

// create products context and set default value (products) to an empty array
export const ProductsContext = createContext({
    products: [],
});

// create products provider
export const ProductsProvider = ({ children }) => {
    // useState and set default value to our products (shop-data.json)
    const [products, setProducts] = useState(PRODUCTS);

    // set value to state products value
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};
