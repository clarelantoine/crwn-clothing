import { createContext, useEffect, useState } from 'react';
import {
    // addCollectionAndDocuments,
    getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';
// import SHOP_DATA from '../shop-data.js';

// create categories context and set default value (categoriesMap) to an empty object
export const CategoriesContext = createContext({
    categoriesMap: {},
});

// create categories provider
export const CategoriesProvider = ({ children }) => {
    // useState and set an empty object as the default value of the categoriesMap
    const [categoriesMap, setCategoriesMap] = useState({});

    // get category map and set value to categoriesMap state
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            console.log(categoryMap);
        };
        getCategoriesMap();
    }, []);

    // import data to collection
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    //     console.log('done');
    // }, []);

    // set value to state categoriesMap value
    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};
