import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';

export default function Shop() {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}
