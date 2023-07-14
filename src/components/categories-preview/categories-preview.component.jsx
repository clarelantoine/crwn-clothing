import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';

export default function CategoriesPreview() {
    // get categories -> categoriesMap context
    const { categoriesMap } = useContext(CategoriesContext);

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
