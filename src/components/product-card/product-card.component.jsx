import { useDispatch, useSelector } from 'react-redux';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
    Image,
    AddToCartButton,
} from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

export default function ProductCard({ product }) {
    // destructure the product
    const { name, price, imageUrl } = product;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // handle click event to add product to cart
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
