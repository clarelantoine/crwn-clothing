import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {
    CheckoutItemContainer,
    ImageContainer,
    Image,
    Name,
    Quantity,
    Price,
    Arrow,
    Value,
    RemoveButton,
} from './checkout-item.styles';

export default function CheckoutItem({ cartItem }) {
    // destructure the checkout item
    const { imageUrl, name, quantity, price } = cartItem;

    // get cart context
    const { addItemToCart, removeItemFromCart, clearItemFromCart } =
        useContext(CartContext);

    // handlers function
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}
