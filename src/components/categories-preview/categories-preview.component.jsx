import { useSelector } from 'react-redux';

import CategoryPreview from '../category-preview/category-preview.component';
import {
    selectCategoriesIsLoading,
    selectCategoriesMap,
} from '../../store/categories/categories.selector';
import Spinner from '../spinner/spinner.component';

export default function CategoriesPreview() {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // create category preview cards based on the categories context
    return isLoading ? (
        <Spinner />
    ) : (
        Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
                <CategoryPreview
                    key={title}
                    title={title}
                    products={products}
                />
            );
        })
    );
}
