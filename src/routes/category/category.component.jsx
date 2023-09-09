import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import {
    selectCategoriesIsLoading,
    selectCategoriesMap,
} from '../../store/categories/categories.selector';

import { CategoryTitle, CategoryContainer } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

export default function Category() {
    // get params (category) from url (e.g /shop/hats)
    const { category } = useParams();

    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // products state
    const [products, setProducts] = useState(categoriesMap[category]);

    // re-render if category or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </CategoryContainer>
            )}
        </>
    );
}
