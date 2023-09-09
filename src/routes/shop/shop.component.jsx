import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';

export default function Shop() {
    // access redux dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch action to set the fetched categories data
        dispatch(fetchCategoriesAsync());
        // eslint-disable-next-line
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}
