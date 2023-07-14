import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
    Image,
    AddToCartButton,
} from './product-card.styles';

export default function ProductCard({ product }) {
    // destructure the product
    const { name, price, imageUrl } = product;

    // get addItemToCart function from cart context
    const { addItemToCart } = useContext(CartContext);

    // handle click event to add product to cart
    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <Image src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <AddToCartButton
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to cart
            </AddToCartButton>
        </ProductCardContainer>
    );
}
