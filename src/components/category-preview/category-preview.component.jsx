import ProductCard from '../product-card/product-card.component';

import {
    CategoryPreviewContainer,
    TitleLink,
    Preview,
} from './category-preview.styles';

export default function CategoryPreview({ title, products }) {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={title}>{title.toUpperCase()}</TitleLink>
            </h2>
            <Preview>
                {products
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
}
