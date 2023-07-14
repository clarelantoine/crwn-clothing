import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryTitle, CategoryContainer } from './category.styles';

export default function Category() {
    // get params (category) from url (e.g /shop/hats)
    const { category } = useParams();

    // get the categories context
    const { categoriesMap } = useContext(CategoriesContext);

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
