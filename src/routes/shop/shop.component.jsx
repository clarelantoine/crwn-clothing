import './shop.styles.scss';

import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

export default function Shop() {
    // get products context
    const { products } = useContext(ProductsContext);

    // create product cards based on the products context
    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
