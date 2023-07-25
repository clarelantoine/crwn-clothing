import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

import { CategoryTitle, CategoryContainer } from './category.styles';

export default function Category() {
    // get params (category) from url (e.g /shop/hats)
    const { category } = useParams();

    // select the categoriesMap from the global state
    const categoriesMap = useSelector(selectCategoriesMap);

    // products state
    const [products, setProducts] = useState(categoriesMap[category]);

    // re-render if category or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryContainer>
        </>
    );
}
