import { useSelector } from 'react-redux';

import CategoryPreview from '../category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

export default function CategoriesPreview() {
    // select the categoriesMap from the global state
    const categoriesMap = useSelector(selectCategoriesMap);

    // create category preview cards based on the categories context
    return (
        <>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview
                        key={title}
                        title={title}
                        products={products}
                    />
                );
            })}
        </>
    );
}
