import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setCategoriesMap } from '../../store/categories/categories.action';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export default function Shop() {
    // access redux dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            // fetch the categories from firebase
            const categoryMap = await getCategoriesAndDocuments();

            // dispatch action to set the fetched categories data
            dispatch(setCategoriesMap(categoryMap));
        };
        getCategoriesMap();
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}
